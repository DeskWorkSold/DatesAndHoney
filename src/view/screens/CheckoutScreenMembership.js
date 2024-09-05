import { TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView, ToastAndroid, ActivityIndicator, ImageBackground, Dimensions, Modal, Platform, PermissionsAndroid, Alert, NativeModules } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AdditionalPackages, addToCart, BuyAdditionalPackages, Buypackages, ConciergeSendRequest, FlakesBill, packages, removeFromCart, selectaddToCart, selectAffiliatePrices, selectBuyAdditionalPackages, selectBuypackages, selectConciergeSendRequest, selectDepositAmount, selectEvents, selectFlakesBill, selectPackages, selectPaymentCardDetails, selectPaymentCards, selectPaymentMethod, selectTicketsAddToCard, selectUser, selectWalletAmount, TicketsAddtoCard, WalletAmount } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { addItemToCart } from '../../../redux/reducers/actions/action';
import RNRestart from 'react-native-restart';
import { CommonActions, StackActions, useFocusEffect } from '@react-navigation/native';
import { useEffect } from 'react';
import SVGNotify from '../../assets/notify.svg';
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../components/Loader';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Base_uri } from '../../consts/Base_uri';
import QRCode from 'react-native-qrcode-svg';


const CheckoutScreenMembership = ({ navigation, route }) => {
    const { data } = route.params;
    // console.log(data , '===>'); 
    const FlakeBill = useSelector(selectFlakesBill)
    const SelectedEvent = useSelector(selectEvents);
    const SelectedPaymentCards = useSelector(selectPaymentCards);
    const PaymentCardDetails = useSelector(selectPaymentCardDetails);
    const ConciergeRequestData = useSelector(selectConciergeSendRequest)
    const PaymentMethod = useSelector(selectPaymentMethod);
    const walletAmount = useSelector(selectWalletAmount);
    // console.log('========> :',ConciergeRequestData);
    // const userPaymentCards = useSelector(selectPaymentCards)
    const depositAmount = useSelector(selectDepositAmount);
    const [platFormFee, setPlatFormFee] = useState(4);
    const BuyMemberShips = data;
    // console.log(BuyMemberShips);
    const dicpatch = useDispatch();
    const AdditionalPackag = useSelector(selectBuyAdditionalPackages);
    const [transactionFee, setTransactionFee] = useState(null);
    const [DateAndHoneyFee, setDateAndHoneyFee] = useState(null);
    const [taxes, setTaxes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalContent, setShowModalContent] = useState({
        title: null,
        descrition: null,
        type: null
    });
    // const [showFoodOrder, setShowFoodOrderModal] = useState(false);
    const [FoodOrderContent, setFoodOrderContent] = useState({
        enable: false,
        title: null,
        descrition: null,
        qr: null,
    });
    const [taxesType, setTaxesType] = useState(null);
    const [showSuccessPoppup, setShowSuccessPoppup] = useState({
        Status: false,
        Title: null,
        Detail: null
    });
    // const EventsId = SelectedEvent.item.uid;
    // console.log(SelectedPaymentCards);
    const dispatch = useDispatch();




    // for ecommerce 
    const AddToCard = useSelector(selectaddToCart)
    const total = AddToCard?.map((item) => Number(item?.Totalprice)).reduce((perv, curr) => perv + curr, 0);
    const totalUSD = total?.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    const TicketAddToCard = useSelector(selectTicketsAddToCard)
    const AffiliatePrices = useSelector(selectAffiliatePrices)
    // console.log('===>',TicketAddToCard);
    const user = useSelector(selectUser)
    const [applycopun, setApplycopun] = useState(null); //initial choice
    const [promoterId, setPromoterId] = useState(null); //initial choice
    const [errorapplycoupon, setErrorApplyCoupon] = useState(false); //initial choice
    const [uploading, setUploading] = useState(false);
    const [uploadingTwo, setUploadingTwo] = useState(false);
    const [allAffiliateCode, setAllAffiliateCode] = useState(null);
    const [foodmenuPricing, setFoodmenuPricing] = useState(null);

    const updatePromoterWallet = async (data) => {
        if (promoterId && data?.promoterReward) {
            const promoterReward = parseFloat((data?.Tickets?.pricePerTicket * data?.promoterReward) / 100).toFixed(2);
            // console.log( '===> :',promoterReward , promoterId);
            const querySnapshot = await firestore()
                .collection('Users')
                .where("userDetails.VipCode", '==', promoterId)
                .get();
            if (!querySnapshot?.empty) {
                querySnapshot.forEach(async (doc) => {
                    const userData = doc.data(); // Access data of each document
                    // console.log(userData?.userDetails?.uid);
                    // return
                    let walletforpromoter = {
                        expend: 0,
                        fare: 0,
                        currency: 'usd',
                        deposit: promoterReward,
                        type: 'promoterReward',
                        date: new Date().toString(),
                        euid: data?.euid,
                        eventEnddate: data?.endDate,
                    };
                    try {
                        await firestore()
                            .collection('Wallet')
                            .doc(userData?.userDetails?.uid)
                            .set(
                                {
                                    wallet: firestore.FieldValue.arrayUnion(walletforpromoter),
                                },
                                { merge: true },
                            )
                    } catch (e) {
                        Toast.show(`Erorr : ${e}`, Toast.LONG);
                    }
                    // console.log('===> :', walletforpromoter);
                });
            }
        }
        else {
            console.log('not exist');
        }

    }

    const updateEventCoordinatorWallet = async (data2) => {
        if (promoterId) {
            // const totaldiscountpercent = (data2.promoterReward ?? 0) + (data2?.discountedReferral ?? 0);
            let totaldiscountpercent = (data2.promoterReward * 100 + data2?.discountedReferral * 100) / 100;
            const finalamount = parseFloat((data2?.Tickets?.pricePerTicket * totaldiscountpercent / 100)).toFixed(2);
            let sum = (data2?.Tickets?.pricePerTicket * 100 - finalamount * 100) / 100;
            let walletforEventCoordinator = {
                expend: 0,
                fare: 0,
                currency: 'usd',
                deposit: sum,
                type: 'sell tickets',
                date: new Date().toString(),
                euid: data2?.euid,
                eventEnddate: data2?.endDate,
            };
            // return
            try {
                await firestore()
                    .collection('Wallet')
                    .doc(data2?.eventOrganizer)
                    .set(
                        {
                            wallet: firestore.FieldValue.arrayUnion(walletforEventCoordinator),
                        },
                        { merge: true },
                    )
            } catch (e) {
                Toast.show(`Erorr : ${e}`, Toast.LONG);
            }
            // console.log(data2?.eventOrganizer);

            // console.log(walletforEventCoordinator, '-----evetcoor wallate1');
        }
        else {
            let walletforEventCoordinator = {
                expend: 0,
                fare: 0,
                currency: 'usd',
                deposit: data2?.Tickets?.pricePerTicket,
                type: 'sell tickets',
                date: new Date().toString(),
                euid: data2?.euid,
                eventEnddate: data2?.endDate,
            };
            // return
            try {
                await firestore()
                    .collection('Wallet')
                    .doc(data2?.eventOrganizer)
                    .set(
                        {
                            wallet: firestore.FieldValue.arrayUnion(walletforEventCoordinator),
                        },
                        { merge: true },
                    )
            }
            catch (e) {
                Toast.show(`Erorr : ${e}`, Toast.LONG);
            }
            // console.log(walletforEventCoordinator, '===eventcoor wallate2');
        }
    }

    const updateTicketsQty = async (TicketAddToCard) => {
        // console.log(TicketAddToCard?.Tickets?.index);
        if (TicketAddToCard) {
            try {
                const ref = firestore().collection('Events').doc(TicketAddToCard?.euid)
                const docref = await ref.get()
                if (docref?.exists) {
                    const ticketsData = docref.data()?.TicketModaldata
                    const doesExist = ticketsData.findIndex(item => item.index == TicketAddToCard?.Tickets?.index);
                    if (doesExist !== -1) {
                        ticketsData[doesExist] = {
                            ...ticketsData[doesExist], // Copy existing data
                            totalTickets: ticketsData[doesExist]?.totalTickets - TicketAddToCard?.TicketsQty,
                            // You can update other fields here as well
                        };
                        // console.log(ticketsData);
                        await ref.update({
                            MoreRequestes: ticketsData,
                        });
                    }

                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const updateWallet = async (amount, id) => {
        // console.log(amount, id);
        let walletData = {
            expend: 0,
            fare: 0,
            currency: 'usd',
            deposit: amount,
            type: 'sell foods',
            eventEnddate: SelectedEvent?.endDate,
            date: new Date().toString(),
        };
        try {
            await firestore()
                .collection('Wallet')
                .doc(id)
                .set(
                    {
                        wallet: firestore.FieldValue.arrayUnion(walletData),
                    },
                    { merge: true },
                )
        }
        catch (e) {
            console.log(e);
        }
    }
    const sendAmountToFoodMediatorWallet = (array) => {
        if (array?.length > 0) {
            const ownerTotals = {};

            // Iterate through the foodArray and calculate total prices for each owner
            array?.forEach((foodItem) => {
                const ownerUid = foodItem.owneruid;
                const totalPrice = parseFloat(foodItem.Totalprice);

                // Check if the owner's total is already tracked, if not, initialize it
                if (!ownerTotals[ownerUid]) {
                    ownerTotals[ownerUid] = 0;
                }

                ownerTotals[ownerUid] += totalPrice;
            });

            for (const ownerUid in ownerTotals) {
                if (Object.hasOwnProperty.call(ownerTotals, ownerUid)) {
                    const totalAmount = ownerTotals[ownerUid];
                    updateWallet(totalAmount, ownerUid)
                    // console.log(`Sending ${totalAmount} to owner with UID ${ownerUid}` ,array );

                }
            }
        }
    }

    const updateFoodsQty = async (foods) => {
        // console.log(foods);
        if (foods?.length > 0) {
            foods?.map(async (e) => {
                // console.log(e?.qty);
                try {
                    const ref = firestore().collection('Foods').doc(e?.uid)
                    const docref = await ref.get()
                    // console.log(docref?.data());
                    if (docref?.exists) {
                        const foodsData = docref.data()
                        if (foodsData?.uid == e?.uid) {
                            // console.log('hello');
                            await ref.update({
                                'quantity': foodsData.quantity - e?.qty,
                            });
                        }
                        // const doesExist = foodsData.filter(item => item.uid == e?.uid);

                    }
                }
                catch (e) {
                    console.log(e);
                }
            })
        }
    }

    const BuyFood = async () => {
        // console.log(PaymentCardDetails);
        let time = new Date().toString()
        // return
        if (SelectedPaymentCards?.length > 0 && foodmenuPricing) {
            if (!AddToCard?.length == 0) {
                const totalBalance = parseFloat(walletAmount?.totalBalance);
                const price = parseFloat(foodmenuPricing?.totalPricewithTaxes);
                // return
                if (totalBalance >= price) {
                    setUploading(true);
                    // console.log(AddToCard, foodmenuPricing);
                    try {
                        const ids = Math.random().toString(16).slice(2);

                        let walletData = {
                            expend: foodmenuPricing?.totalPricewithTaxes,
                            fare: 0,
                            currency: 'usd',
                            deposit: 0,
                            type: 'purchase foods',
                            date: time,
                        };

                        // console.log(itemNamesArray);
                        // return
                        await firestore()
                            .collection('Wallet')
                            .doc(user?.uid)
                            .set(
                                {
                                    wallet: firestore.FieldValue.arrayUnion(walletData),
                                },
                                { merge: true },
                            )
                            .then(async () => {
                                sendAmountToFoodMediatorWallet(AddToCard)
                                SavePayCard(PaymentCardDetails)
                                updateFoodsQty(AddToCard)
                                const orderDetails = {
                                    OrderDetails: AddToCard,
                                    uid: ids,
                                    createdAt: time,
                                    totalPrice: foodmenuPricing?.totalPrice,
                                    DateAndHoneyFee: foodmenuPricing?.DateAndHoneyFee,
                                    transactionFee: foodmenuPricing?.transactionFee,
                                    totalPricewithTaxes: foodmenuPricing?.totalPricewithTaxes,
                                    status: true,
                                };

                                console.log(orderDetails);
                                const docRef = firestore().collection('orders').doc(user?.uid);
                                const docSnapshot = await docRef.get()
                                // console.log('User exists: ', documentSnapshot.exists);
                                if (docSnapshot.exists) {
                                    // console.log('User data: ', documentSnapshot.data());
                                    docRef.update({
                                        OrdersHistory: firestore.FieldValue.arrayUnion(orderDetails)
                                    })
                                }
                                else {
                                    docRef.set({
                                        OrdersHistory: [orderDetails],
                                    });
                                }
                                // dispatch(TicketsAddtoCard(null));
                                ToastAndroid.show('Tickets Purchase successfully', ToastAndroid.SHORT);
                                setUploading(false);
                                const itemNamesArray = AddToCard.map(item => item.name);
                                setFoodOrderContent({
                                    enable: true,
                                    title: 'Payment Completed',
                                    descrition: `Your payment for ${itemNamesArray.join(', ')} has been completed`,
                                    qr: ids,
                                })
                                //     await docRef.set({
                                //         TicketsHistory: [
                                //             {
                                //                 TicketAddToCard,
                                //                 createdAt: time,
                                //                 useruid: user?.uid,
                                //                 status: 'Done'
                                //             }
                                //         ]
                                //     });
                                // }
                                // else {
                                //     await docRef.update({
                                //         TicketsHistory: firestore.FieldValue.arrayUnion({
                                //             TicketAddToCard,
                                //             createdAt: time,
                                //             useruid: user?.uid,
                                //             status: 'Done'
                                //         })
                                //     });
                                // }
                                // ToastAndroid.show('Tickets Purchase successfully', ToastAndroid.SHORT);
                                // navigation.navigate('EventTicketsBuy', {
                                //     BuyTickets: TicketAddToCard,
                                //     paymentCard: Data,
                                //     useruid: user?.uid,
                                // });
                                // dispatch(ticketsAddtoCard(null));
                                // setUploading(false);

                            })
                    }
                    catch (e) {
                        setUploading(false)
                        console.log('==>>:', e);
                    }
                }
                else {
                    setUploading(false)
                    setShowModalContent({
                        ...showModalContent,
                        title: 'Insufficient Balance',
                        descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
                        type: 'InsufficientBalance',
                    })
                    setShowModal(true)
                }
                return
                // SavePayCard(PaymentCardDetails)
                // setUploading(true)
                // console.log(
                //     'AddToCard', AddToCard,
                //     ' user?.uid', user?.uid,
                //     'user?.Name', user?.Name,
                //     'SelectedEvent?.uid,', SelectedEvent?.uid,
                //     'uid', uid,
                //     'Data', Data,
                //     'totalUSD', totalUSD,
                //     // 'time', time,
                // );
                // return
                // const ids = Math.random().toString(16).slice(2);
                // try {
                //     setUploading(false)
                //     await firestore()
                //         .collection('orders')
                //         .doc(ids)
                //         .set({
                //             Order: AddToCard,
                //             useruid: user?.uid,
                //             userName: user?.Name,
                //             // userPhoneNumber: user.PhoneNumber,
                //             eid: SelectedEvent?.uid,
                //             uid: ids,
                //             PaymentInfo: Data,
                //             totalAmount: totalUSD,
                //             createdAt: time,
                //         })
                //         .then(() => {
                //             ToastAndroid.show('Your Food Order Successfully Placed', ToastAndroid.SHORT)
                //             dispatch(addToCart(''))
                //             navigation.navigate('EventsScreen');
                //             // console.log('Your Food Order Successfully Placed');
                //         })
                //     setUploading(false)
                // } catch (error) {
                //     console.log('error test1', error);
                // }
            }
        }
        else { }
    }

    const PayAmount = async () => {
        // console.log(PaymentCardDetails);
        let time = new Date().toString()
        // return
        if (SelectedPaymentCards?.length > 0) {
            // SavePayCard(PaymentCardDetails)
            if (TicketAddToCard) {
                // console.log('==>  :', TicketAddToCard?.Tickets?.ticketTitle , TicketAddToCard?.endDate, TicketAddToCard?.location);
                setUploading(true)
                // return
                // return
                const id = TicketAddToCard.uid
                const totalBalance = parseFloat(walletAmount?.totalBalance);
                const price = parseFloat(TicketAddToCard?.totalPricewithTaxes);
                if (totalBalance >= price) {
                    // console.log('hey', AdditionalPackag?.otherCategory);
                    // return
                    try {
                        let walletData = {
                            expend: TicketAddToCard?.totalPricewithTaxes,
                            fare: 0,
                            currency: 'usd',
                            deposit: 0,
                            type: 'purchase tickets',
                            date: new Date().toString(),
                        };
                        // console.log(walletData);
                        // return
                        await firestore()
                            .collection('Wallet')
                            .doc(user?.uid)
                            .set(
                                {
                                    wallet: firestore.FieldValue.arrayUnion(walletData),
                                },
                                { merge: true },
                            )
                            .then(async () => {
                                updatePromoterWallet(TicketAddToCard)
                                updateEventCoordinatorWallet(TicketAddToCard)
                                SavePayCard(PaymentCardDetails)
                                updateTicketsQty(TicketAddToCard)

                                const docRef = firestore().collection('SellTickets').doc(user?.uid);
                                const docSnapshot = await docRef.get().then(documentSnapshot => {
                                    // console.log('User exists: ', documentSnapshot.exists);
                                    if (documentSnapshot.exists) {
                                        // console.log('User data: ', documentSnapshot.data());
                                        docRef.update({
                                            TicketsHistory: firestore.FieldValue.arrayUnion({
                                                TicketAddToCard,
                                                createdAt: time,
                                                useruid: user?.uid,
                                                status: false
                                            })
                                        }).then(() => {
                                            dispatch(TicketsAddtoCard(null));
                                        });
                                    }
                                    else {
                                        docRef.set({
                                            TicketsHistory: [
                                                {
                                                    TicketAddToCard,
                                                    createdAt: time,
                                                    useruid: user?.uid,
                                                    status: 'Done'
                                                }
                                            ]
                                        }).then(() => {
                                            dispatch(TicketsAddtoCard(null));
                                        });
                                    }
                                    ToastAndroid.show('Tickets Purchase successfully', ToastAndroid.SHORT);
                                    setUploading(false);
                                    navigation.navigate('EventTicketsBuy', {
                                        BuyTickets: TicketAddToCard,
                                        paymentCard: PaymentCardDetails,
                                        useruid: user?.uid,
                                    });
                                });
                                //     await docRef.set({
                                //         TicketsHistory: [
                                //             {
                                //                 TicketAddToCard,
                                //                 createdAt: time,
                                //                 useruid: user?.uid,
                                //                 status: 'Done'
                                //             }
                                //         ]
                                //     });
                                // }
                                // else {
                                //     await docRef.update({
                                //         TicketsHistory: firestore.FieldValue.arrayUnion({
                                //             TicketAddToCard,
                                //             createdAt: time,
                                //             useruid: user?.uid,
                                //             status: 'Done'
                                //         })
                                //     });
                                // }
                                // ToastAndroid.show('Tickets Purchase successfully', ToastAndroid.SHORT);
                                // navigation.navigate('EventTicketsBuy', {
                                //     BuyTickets: TicketAddToCard,
                                //     paymentCard: Data,
                                //     useruid: user?.uid,
                                // });
                                // dispatch(ticketsAddtoCard(null));
                                // setUploading(false);

                            })
                    }
                    catch (e) {
                        setUploading(false)
                        console.log('==>>:', e);
                    }
                }
                else {
                    setUploading(false)
                    setShowModalContent({
                        ...showModalContent,
                        title: 'Insufficient Balance',
                        descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
                        type: 'InsufficientBalance'
                    })
                    setShowModal(true)
                }
                // try {
                //     setUploading(true)
                //     const docRef = firestore().collection('SellTickets').doc(user?.uid);
                //     const docSnapshot = await docRef.get().then(documentSnapshot => {
                //         // console.log('User exists: ', documentSnapshot.exists);
                //         if (documentSnapshot.exists) {
                //             console.log('User data: ', documentSnapshot.data());
                //             docRef.update({
                //                 TicketsHistory: firestore.FieldValue.arrayUnion({
                //                     TicketAddToCard,
                //                     createdAt: time,
                //                     useruid: user?.uid,
                //                     status: false
                //                 })
                //             });
                //         }
                //         else {
                //             docRef.set({
                //                 TicketsHistory: [
                //                     {
                //                         TicketAddToCard,
                //                         createdAt: time,
                //                         useruid: user?.uid,
                //                         status: 'Done'
                //                     }
                //                 ]
                //             });
                //         }
                //         ToastAndroid.show('Tickets Purchase successfully', ToastAndroid.SHORT);
                //         navigation.navigate('EventTicketsBuy', {
                //             BuyTickets: TicketAddToCard,
                //             paymentCard: Data,
                //             useruid: user?.uid,
                //         });
                //         dispatch(ticketsAddtoCard(null));
                //         setUploading(false);
                //     });
                //     // console.log('zsc',docSnapshot.empty);
                //     return
                //     // if (!docSnapshot?.empty) {
                //     //     await docRef.set({
                //     //         TicketsHistory: [
                //     //             {
                //     //                 TicketAddToCard,
                //     //                 createdAt: time,
                //     //                 useruid: user?.uid,
                //     //                 status: 'Done'
                //     //             }
                //     //         ]
                //     //     });
                //     // }
                //     // else {
                //     //     await docRef.update({
                //     //         TicketsHistory: firestore.FieldValue.arrayUnion({
                //     //             TicketAddToCard,
                //     //             createdAt: time,
                //     //             useruid: user?.uid,
                //     //             status: 'Done'
                //     //         })
                //     //     });
                //     // }
                //     // ToastAndroid.show('Tickets Purchase successfully', ToastAndroid.SHORT);
                //     // navigation.navigate('EventTicketsBuy', {
                //     //     BuyTickets: TicketAddToCard,
                //     //     paymentCard: Data,
                //     //     useruid: user?.uid,
                //     // });
                //     // dispatch(ticketsAddtoCard(null));
                //     // setUploading(false);
                // } catch (error) {
                //     setUploading(false)
                //     console.log('error test1', error);
                // }
            }
            else {
                ToastAndroid.show('Network error please try again', ToastAndroid.SHORT);
                setUploading(false)
                // const id = TicketAddToCard.uid
                // try {
                //     setUploading(true)
                //     await firestore()
                //         .collection('SellTickets')
                //         .doc(id)
                //         .set(cls

                //             {
                //                 PaymentInfo: Data,
                //                 createdAt: time,
                //                 TicketAddToCard,
                //                 useruid: user?.uid,
                //                 status: 'Done'
                //             },
                //         )
                //         .then(() => {
                //             ToastAndroid.show('Tickets Purchase successfully', ToastAndroid.SHORT)
                //             navigation.navigate('EventTicketsBuy', {
                //                 BuyTickets: TicketAddToCard,
                //                 paymentCard: Data,
                //                 // createdDate: createdDate,
                //                 // createdTime: createdTime,
                //                 useruid: user?.uid
                //             })
                //             dispatch(ticketsAddtoCard(null))
                //         })
                //     // // setImage(null)
                //     setUploading(false)
                // } catch (error) {
                //     console.log('error test1', error);
                // }
            }
        }
        else {
            Toast.show(`Please enter your payment card first`, Toast.LONG);
        }
    }

    const PayAmountMemberships = async () => {
        // updateRefferalProgram(data)
        // updateRefferalProgram(data)
        // return
        // await SavePayCard();
        if (SelectedPaymentCards?.length > 0) {
            SavePayCard(SelectedPaymentCards)
            const MembershipName = BuyMemberShips?.otherCategory.split(' ')[0]
            const updatedMembershipsDetail = {
                ...BuyMemberShips?.Prices,
                time: new Date().toISOString(),
            }
            console.log(BuyMemberShips?.Prices, BuyMemberShips, '=================================');
            const totalBalance = parseFloat(walletAmount?.totalBalance);
            const price = parseFloat(updatedMembershipsDetail?.rate);
            if (totalBalance >= price) {
                setUploading(true)
                // console.log(updatedMembershipsDetail, walletAmount, walletAmount?.totalBalance - updatedMembershipsDetail?.rate);
                try {
                    let walletData = {
                        expend: updatedMembershipsDetail?.rate,
                        fare: 0,
                        currency: 'usd',
                        deposit: 0,
                        type: BuyMemberShips?.otherCategory,
                        date: new Date().toString(),
                    };
                    await firestore()
                        .collection('Wallet')
                        .doc(user?.uid)
                        .set(
                            {
                                wallet: firestore.FieldValue.arrayUnion(walletData),
                            },
                            { merge: true },
                        )
                        .then(async () => {
                            const useRef = await firestore().collection('Users')
                                .doc(user?.uid)
                            useRef.update({
                                'userDetails.AccountType': MembershipName,
                                'userDetails.PackageId': BuyMemberShips?.id,
                                'userDetails.MembershipDetails': updatedMembershipsDetail,
                            }).then(() => {
                                updateRefferalProgram(data)
                                dispatch(packages(BuyMemberShips))
                                dispatch(Buypackages(''))
                                ToastAndroid.show(`${MembershipName} Membership hase been Purchased successfully`, ToastAndroid.SHORT)
                                // setLoading(true)
                                setShowModalContent({
                                    ...showModalContent,
                                    title: `${BuyMemberShips?.otherCategory}`,
                                    descrition: `${MembershipName} Membership hase been Purchased successfully`,
                                    type: 'Success'
                                })
                                setShowModal(true)
                                // console.log('Notices send!');
                                // navigation.navigate('PremiumMembershipScreen')
                                setUploading(false)
                                GetWalletAmount()
                            });

                        })
                } catch (e) {
                    setUploading(false)
                    Alert.alert('Error : ', e)
                    console.log(e);
                }
            }
            else {
                setShowModalContent({
                    ...showModalContent,
                    title: 'Insufficient Balance',
                    descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
                    type: 'InsufficientBalance'
                })
                setShowModal(true)
            }
        }

        // return
        // try {
        //     const ref = firestore().collection('Wallet').doc(user?.uid)
        //     const reftwo = await ref.get()
        //     if (reftwo?.exists) {
        //         const data = reftwo.data().PaymentDetails
        //     }
        //     else {
        //         setShowModalContent({
        //             ...showModalContent,
        //             title: 'Insufficient Balance',
        //             descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
        //             type: 'InsufficientBalance'
        //         })
        //         setShowModal(true)
        //     }
        // } catch (e) {
        //     console.log(e);
        // }

        // console.log(updatedMembershipsDetail);
        // return
        // setUploading(true)
        // try {
        //     const useRef = await firestore().collection('Users')
        //         .doc(user?.uid)
        //     useRef.update({
        //         'userDetails.AccountType': MembershipName,
        //         'userDetails.PackageId': BuyMemberShips?.id,
        //         'userDetails.MembershipDetails': updatedMembershipsDetail,
        //     }).then(() => {
        //         dispatch(packages(BuyMemberShips))
        //         dispatch(Buypackages(''))
        //         ToastAndroid.show(`${MembershipName} Membership hase been Purchased successfully`, ToastAndroid.SHORT)
        //         // console.log('Notices send!');
        //         navigation.navigate('PremiumMembershipScreen')
        //         setUploading(false)
        //     });
        // }
        // catch (e) {
        //     console.log(e);
        // }
    }
    function addNumbers(a, b) {
        const precision = 10; // Adjust the precision as needed
        return Math.round((Number(a) + Number(b)) * Math.pow(10, precision)) / Math.pow(10, precision);
    }
    const updateRefferalProgram = async (data) => {
        // console.log(AffiliatePrices?.tairFour?.percent, AffiliatePrices?.tairThree?.percent, AffiliatePrices?.tairTwo?.percent, AffiliatePrices?.tairOne?.percent);
        // return
        const tenPercent = (AffiliatePrices?.tairOne?.percent / 100) * data?.Prices?.rate;
        const fivePercent = (AffiliatePrices?.tairTwo?.percent / 100) * data?.Prices?.rate;
        const ninePercent = (AffiliatePrices?.tairFour?.percent / 100) * data?.Prices?.rate;
        const twofivePercent = (AffiliatePrices?.tairThree?.percent / 100) * data?.Prices?.rate;
        // parseFloat((totalAmount * 7.5 / 100)).toFixed(2)
        // console.log('reeferal programs' , tenPercent, ninePercent, fivePercent, twofivePercent);
        // return
        try {
            if (user?.Refferals) {
                const refferalsDoc = firestore().collection('Users').doc(user?.Refferals?.uid);

                if (user?.Refferals?.typeId == 0 && user?.Refferals?.uid && user?.Refferals?.level) {
                    // console.log(user?.Refferals?.uid, 'In-house Talent Agency onboarding 10%');
                    const reftair0 = await refferalsDoc.get();
                    if (reftair0?.exists) {
                        const findrefferal0 = reftair0?.data()?.userDetails?.Refferals;
                        let amountupdate = addNumbers(findrefferal0?.earn?.amount || 0, tenPercent);
                        await refferalsDoc.update({
                            'userDetails.Refferals': {
                                ...findrefferal0,
                                earn: {
                                    date: new Date().toString(),
                                    amount: amountupdate?.toFixed(2),
                                },
                            },
                        });

                        // Update wallet information
                        await firestore().collection('Wallet').doc(user?.Refferals?.uid).set(
                            {
                                wallet: firestore.FieldValue.arrayUnion({
                                    expend: 0,
                                    fare: 0,
                                    currency: 'usd',
                                    deposit: tenPercent.toFixed(2),
                                    type: '10% referral amount for customer subscription',
                                    date: new Date().toString(),
                                    eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
                                }),
                            },
                            { merge: true },
                        );

                    }
                }
                else if (user?.Refferals?.level && user?.Refferals?.typeId == 1) {
                    const reftair1 = await refferalsDoc.get();
                    let tair = 1;
                    if (reftair1?.exists) {
                        tair = 2;
                        const findrefferal = reftair1?.data()?.userDetails?.Refferals
                        if ((findrefferal?.level != null || findrefferal?.typeId == 1 || findrefferal?.typeId == 0 || findrefferal?.typeId != null) && tair <= 3) {
                            // console.log(user?.Refferals?.uid, '10%');
                            // return
                            let amountupdate = addNumbers(findrefferal?.earn?.amount || 0, tenPercent);
                            await refferalsDoc.update({
                                'userDetails.Refferals': {
                                    ...findrefferal,
                                    earn: {
                                        date: new Date().toString(),
                                        amount: amountupdate?.toFixed(2),
                                        // amount: (findrefferal?.earn?.amount || 0) + tenPercent,
                                    },
                                },
                            });
                            // Update wallet information for first level
                            await firestore().collection('Wallet').doc(user?.Refferals?.uid).set(
                                {
                                    wallet: firestore.FieldValue.arrayUnion({
                                        expend: 0,
                                        fare: 0,
                                        currency: 'usd',
                                        deposit: tenPercent.toFixed(2),
                                        type: '10% referral amount for customer subscription',
                                        date: new Date().toString(),
                                        eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
                                    }),
                                },
                                { merge: true },
                            );


                            if (findrefferal?.level && (findrefferal?.typeId == 1 || findrefferal?.typeId == 0) && tair <= 2) {
                                // console.log(findrefferal?.uid, '5%');
                                const reftair2 = await firestore().collection('Users').doc(findrefferal?.uid).get();
                                if (reftair2?.exists) {
                                    const findrefferal2 = reftair2?.data()?.userDetails?.Refferals
                                    // const findrefferal3 = reftair3?.data()?.userDetails?.Refferals
                                    let amountupdate = addNumbers(findrefferal2?.earn?.amount || 0, fivePercent);
                                    await firestore().collection('Users').doc(findrefferal?.uid).update({
                                        'userDetails.Refferals': {
                                            ...findrefferal2,
                                            earn: {
                                                date: new Date().toString(),
                                                amount: amountupdate.toFixed(2),
                                                // amount: (findrefferal2?.earn?.amount || 0) + fivePercent,
                                            },
                                        },
                                    })
                                    await firestore().collection('Wallet').doc(findrefferal?.uid).set(
                                        {
                                            wallet: firestore.FieldValue.arrayUnion({
                                                expend: 0,
                                                fare: 0,
                                                currency: 'usd',
                                                deposit: fivePercent.toFixed(2),
                                                type: '5% referral amount for customer subscription',
                                                date: new Date().toString(),
                                                eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
                                            }),
                                        },
                                        { merge: true },
                                    );
                                }
                                const reftair3 = await firestore().collection('Users').doc(findrefferal?.uid).get();
                                if (reftair3?.exists) {
                                    tair = 3;
                                    const findrefferal3 = reftair3?.data()?.userDetails?.Refferals
                                    if (findrefferal3?.level && findrefferal3?.typeId == 0 && tair <= 3) {
                                        // console.log(findrefferal2?.uid, '2.5%');
                                        const onbraoduserrefferal = firestore().collection('Users').doc(findrefferal3?.uid)
                                        const onbraoduserrefferalget = await onbraoduserrefferal?.get()
                                        if (onbraoduserrefferalget?.exists) {
                                            const findrefferal4 = onbraoduserrefferalget?.data()?.userDetails?.Refferals;
                                            // let amountupdate = (findrefferal4?.earn?.amount || 0) + twofivePercent;
                                            let amountupdate = addNumbers(findrefferal4?.earn?.amount || 0, twofivePercent);

                                            await onbraoduserrefferal.update({
                                                'userDetails.Refferals': {
                                                    level: null,
                                                    type: null,
                                                    typeId: null,
                                                    uid: null,
                                                    earn: {
                                                        date: new Date().toString(),
                                                        amount: amountupdate.toFixed(2),
                                                        // amount: (findrefferal4?.earn?.amount || 0) + twofivePercent,
                                                    },
                                                },
                                            })
                                            await firestore().collection('Wallet').doc(findrefferal3?.uid).set(
                                                {
                                                    wallet: firestore.FieldValue.arrayUnion({
                                                        expend: 0,
                                                        fare: 0,
                                                        currency: 'usd',
                                                        deposit: twofivePercent.toFixed(2),
                                                        type: '2.5% referral amount for customer subscription',
                                                        date: new Date().toString(),
                                                        eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
                                                    }),
                                                },
                                                { merge: true },
                                            );
                                        }

                                    }
                                }
                                // const reftair1 = await firestore().collection('Users').doc(user?.Refferals?.uid).get();
                            }
                            // if (findrefferal?.level && findrefferal?.typeId == 0 && tair <= 3) {
                            //     console.log(findrefferal?.uid, '5% onborad agency');
                            //     const reftair2 = await firestore().collection('Users').doc(findrefferal?.uid).get();
                            //     console.log(findrefferal?.uid, 'Agency onboarding 10%');
                            // }
                        }
                        else {
                            // let amountupdate = (findrefferal?.earn?.amount || 0) + ninePercent
                            let amountupdate = addNumbers(findrefferal?.earn?.amount || 0, ninePercent);

                            await refferalsDoc.update({
                                'userDetails.Refferals': {
                                    ...findrefferal,
                                    earn: {
                                        date: new Date().toString(),
                                        amount: amountupdate.toFixed(2),
                                        // amount: (findrefferal?.earn?.amount || 0) + ninePercent,
                                    },
                                },
                            });
                            await firestore().collection('Wallet').doc(user?.Refferals?.uid).set(
                                {
                                    wallet: firestore.FieldValue.arrayUnion({
                                        expend: 0,
                                        fare: 0,
                                        currency: 'usd',
                                        deposit: ninePercent.toFixed(2),
                                        type: '9% referral amount for customer subscription',
                                        date: new Date().toString(),
                                        eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
                                    }),
                                },
                                { merge: true },
                            );
                            // console.log(user?.Refferals?.uid, '9%');
                        }
                        // if (!findrefferal?.level || !findrefferal?.typeId == 2 || !findrefferal?.typeId == 1)
                    }
                    // console.log(user?.Refferals?.level);
                }

            }
        } catch (e) {
            ToastAndroid.show(`Error : ${e}`, ToastAndroid.SHORT);
            console.log(e);
        }
    }

    const ShopeAgain = () => {
        if (AddToCard?.length > 0) {
            AddToCard?.map((e) => {
                dispatch(removeFromCart(e))
            })
            dicpatch(TicketsAddtoCard(null))
            // console.log(AddToCard, '===> ')
            navigation?.navigate('Foodmenu', {
                EventsId: SelectedEvent,
            })
            // navigation.dispatch(
            //     CommonActions.reset({
            //       index: 4, // Index of the food menu screen in the stack
            //       routes: [
            //         { name: 'Foodmenu' }, // Replace 'Home' with the actual route name of your food menu screen
            //         {props : SelectedEvent }
            //         // { name: 'Checkout' }, // Replace 'Checkout' with the actual route name of your checkout screen
            //       ],
            //     })
            //   );
        }
    }

    const PayFlakeBillAmount = async () => {
        // console.log(FlakeBill?.Flake);
        // return
        if (SelectedPaymentCards?.length > 0) {
            if (FlakeBill) {
                const totalBalance = parseFloat(walletAmount?.totalBalance);
                const price = parseFloat(FlakeBill?.totalPricewithTaxes);
                if (totalBalance >= price) {
                    setUploading(true)
                    let walletData = {
                        expend: FlakeBill?.totalPricewithTaxes,
                        fare: 0,
                        currency: 'usd',
                        deposit: 0,
                        type: 'remove flake',
                        date: new Date().toString(),
                    };
                    // console.log(walletData);
                    // return
                    try {
                        await firestore()
                            .collection('Wallet')
                            .doc(user?.uid)
                            .set(
                                {
                                    wallet: firestore.FieldValue.arrayUnion(walletData),
                                },
                                { merge: true },
                            )
                            .then(async () => {
                                const number = FlakeBill?.Flake
                                // navigation.navigate('QuestionWantKidsScreen')
                                const userRef = await firestore().collection('Users')
                                    .doc(user.uid)
                                userRef.update({
                                    'userDetails.Flake': firestore.FieldValue.increment(-number),
                                    // 'userDetails.FlakeTime': FlakeBill?.FlakeTime
                                }).then(() => {
                                    setShowSuccessPoppup({
                                        ...showSuccessPoppup,
                                        Status: true,
                                        Title: 'Remove Flakes!',
                                        Detail: `Successfully: ${FlakeBill?.Flake} Flakes remove from your profile!!`,
                                    })
                                    // ToastAndroid.show(`Successfully: ${FlakeBill?.Flake} Flakes remove from your profile!!`, ToastAndroid.SHORT)
                                    dispatch(FlakesBill(null))
                                    // navigation.navigate('RemoveFlakeScreen')
                                    // console.log('Flake Added Delete!');
                                    // console.log(item);
                                    setUploading(false)
                                });
                            })
                    } catch (e) {
                        setUploading(false)
                        Toast.show(`Error : ${e}`, Toast.LONG);
                        // Toast.
                    }
                }
                else {
                    setUploading(false)
                    setShowModalContent({
                        ...showModalContent,
                        title: 'Insufficient Balance',
                        descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
                        type: 'InsufficientBalance'
                    })
                    setShowModal(true)
                }
            }
            else {
                setUploading(false)
                ToastAndroid.show(`Network error please try agin!`, ToastAndroid.SHORT)
            }
        }
        else {
            Toast.show(`Please enter your payment card first`, Toast.LONG);
        }
    }

    const PayConciergeBillAmount = async () => {
        // console.log('hello', PaymentCardDetails?.stripeId, ConciergeRequestData?.price, ConciergeRequestData?.DateAndHoneyFee, ConciergeRequestData?.transactionFee);
        // return
        if (SelectedPaymentCards?.length > 0) {
            const totalBalance = parseFloat(walletAmount?.totalBalance);
            const price = parseFloat(ConciergeRequestData?.price);
            if (totalBalance >= price) {
                try {
                    setUploading(true)
                    const ref = firestore().collection('Requestes').doc(ConciergeRequestData?.sendto)
                    const documentSnapShot = await ref.get();
                    const requestData = {
                        display: true,
                        sendby: user?.uid,
                        sendto: ConciergeRequestData?.sendto,
                        servicetype: "Match coordinator",
                        type: 'Get',
                        status: false,
                        price: ConciergeRequestData?.price,
                        totalPricewithTaxes: ConciergeRequestData?.totalPricewithTaxes,
                        DateAndHoneyFee: ConciergeRequestData?.DateAndHoneyFee,
                        transactionFee: ConciergeRequestData?.transactionFee,
                        chargeid: PaymentCardDetails?.stripeId ? PaymentCardDetails?.stripeId : null,
                        // time: new Date().toString()
                    };
                    if (documentSnapShot?.exists) {
                        const dataArray = documentSnapShot?.data()?.MoreRequestes
                        const index = dataArray.findIndex(item => item.sendby == user?.uid);
                        if (index !== -1) {
                            dataArray[index] = {
                                ...dataArray[index], // Copy existing data
                                status: requestData.status, // Update status
                                display: requestData.display, // Update price
                                // You can update other fields here as well
                            };

                            await ref.update({
                                MoreRequestes: dataArray,
                            });
                        }
                        else {
                            await ref.update({
                                MoreRequestes: firestore.FieldValue.arrayUnion(requestData)
                            })
                        }
                        // setLoading(false)
                        // return
                    }
                    else {
                        await ref.set({
                            MoreRequestes: [requestData]
                        })
                    }
                    setUploading(false);
                    Toast.show(`Request sent to ${ConciergeRequestData?.mediatorName}`, Toast.LONG);
                    setShowModalContent({
                        ...showModalContent,
                        title: 'Request Sent!',
                        descrition: `Your request has been sent to ${ConciergeRequestData?.mediatorName} the Match Coordinator. Please wait for there response`,
                        type: 'Success',
                    })
                    setShowModal(true)
                    dispatch(ConciergeSendRequest(null))
                } catch (e) {
                    setUploading(false);
                    Toast.show(`Error : ${e}`, Toast.LONG)
                    // setLoading(false)
                    // setShowModal(false)
                }
            }
            else {
                setUploading(false)
                setShowModalContent({
                    ...showModalContent,
                    title: 'Insufficient Balance',
                    descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
                    type: 'InsufficientBalance'
                })
                setShowModal(true)
            }
        }
        else {
            Toast.show(`Please enter your payment card first`, Toast.LONG);
        }
    }

    const afterPayConciergeBillAmount = () => {
        // console.log(TicketAddToCard);
        if (AddToCard?.length > 0) {
            navigation.navigate('CurrentBalanceScreen');
            dicpatch(addToCart(null))
            // selectaddToCart
            // console.log(';skh');
        }
        else if (TicketAddToCard) {
            dispatch(TicketsAddtoCard(null));
            navigation.navigate('CurrentBalanceScreen');
        }
        else if (BuyMemberShips) {
            // console.log('here');
            navigation.replace('CurrentBalanceScreen');
            // dispatch(packages(BuyMemberShips))
            dispatch(Buypackages(''))
        }
        else if (ConciergeRequestData) {
            dispatch(ConciergeSendRequest(null))
            // navigation.replace('Concirege')
            navigation.replace('CurrentBalanceScreen')
        }
        else {
            navigation.replace('CurrentBalanceScreen')
        }
    }


    const OnSuccessConfirm = () => {
        setShowSuccessPoppup({
            ...showSuccessPoppup,
            Status: false,
            Title: null,
            Detail: null,
        })
        navigation.goBack()
    }

    const DownloadPdf = async (props) => {
        console.log(props);
        if (props?.id == 4 || props?.id == 1) {
            // console.log(props);
            if (Platform.OS === 'ios') {
                downloadImage(props);
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            title: 'Storage Permission Required',
                            message:
                                'App needs access to your storage to download Photos',
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        // Once user grant the permission start downloading
                        console.log('Storage Permission Granted.');
                        downloadImage(props);
                    } else {
                        // If permission denied then show alert
                        alert('Storage Permission Not Granted');
                    }
                } catch (err) {
                    // To handle permission related exception
                    console.warn(err);
                }
            }
        }
    }


    const downloadImage = async (item, index) => {

        if (item) {
            let date = new Date();
            let image_URL = 'https://firebasestorage.googleapis.com/v0/b/datesandhoney-50496.appspot.com/o/Content%2Fblank%20(1).pdf?alt=media&token=b12786cb-25f3-4125-8fd8-e71b4aa2a06f';
            // let ext = getExtention(image_URL);
            // ext = '.' + ext[0];
            const { config, fs } = RNFetchBlob;
            let fileDir = fs.dirs.DownloadDir;
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    // Related to the Android only
                    useDownloadManager: true,
                    notification: true,
                    path:
                        fileDir +
                        '/download_' +
                        Math.floor(date.getTime() + date.getSeconds() / 2) +
                        '.pdf',
                    description: 'file download',
                },
            };
            config(options)
                .fetch('GET', image_URL)
                .then(res => {
                    console.log('The file save to :', res.path());
                    alert('Pdf file downloaded successully')
                })
        }
    }

    const AdditionalPackagesFunc = async () => {
        // console.log(AdditionalPackag);
        // return
        if (SelectedPaymentCards?.length > 0) {
            setUploading(true)
            const totalBalance = parseFloat(walletAmount?.totalBalance);
            const price = parseFloat(AdditionalPackag?.Price);
            if (totalBalance >= price) {
                // console.log('hey', AdditionalPackag?.otherCategory);
                // return
                try {
                    let walletData = {
                        expend: AdditionalPackag?.Price,
                        fare: 0,
                        currency: 'usd',
                        deposit: 0,
                        type: AdditionalPackag?.otherCategory,
                        date: new Date().toString(),
                    };
                    await firestore()
                        .collection('Wallet')
                        .doc(user?.uid)
                        .set(
                            {
                                wallet: firestore.FieldValue.arrayUnion(walletData),
                            },
                            { merge: true },
                        )
                        .then(async () => {
                            SavePayCard(PaymentCardDetails)
                            const updatedMembershipsDetail = {
                                ...AdditionalPackag?.Prices,
                                limits: AdditionalPackag.limits,
                                time: new Date().toISOString(),
                                id: AdditionalPackag.id,
                                Title: AdditionalPackag.Title,
                            }
                            DownloadPdf(updatedMembershipsDetail)
                            const useRef = await firestore().collection('Users')
                                .doc(user?.uid)
                            {
                                updatedMembershipsDetail?.id == 5 ?
                                    useRef.update({
                                        // 'userDetails.AccountType': MembershipName,
                                        'userDetails.AdditionalPackageId': AdditionalPackag?.uid,
                                        'userDetails.FlakeInsurance': updatedMembershipsDetail,
                                    })
                                    :
                                    useRef.update({
                                        // 'userDetails.AccountType': MembershipName,
                                        'userDetails.AdditionalPackageId': AdditionalPackag?.uid,
                                        'userDetails.AdditionalPackageDetails': updatedMembershipsDetail,
                                    })
                            }
                            dispatch(AdditionalPackages(updatedMembershipsDetail))
                            dispatch(BuyAdditionalPackages(''))
                            ToastAndroid.show(`Additional Package for ${AdditionalPackag?.Title} hase been Purchased successfully`, ToastAndroid.SHORT)
                            setUploading(false)
                            setShowModalContent({
                                ...showModalContent,
                                title: `${AdditionalPackag?.Title}`,
                                descrition: `Additional Package for ${AdditionalPackag?.Title} hase been Purchased successfully.`,
                                type: 'Success'
                            })
                            setShowModal(true)
                        })
                }
                catch (e) {
                    console.log(e);
                    setUploading(false)
                }
            }
            else {
                setShowModalContent({
                    ...showModalContent,
                    title: 'Insufficient Balance',
                    descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
                    type: 'InsufficientBalance'
                })
                setShowModal(true)
                setUploading(false)
            }

        }
        else {
            setUploading(false)
            // SavePayCard(PaymentCardDetails)
        }

    }

    const updateObjectInArray = (array, newData) => {
        const index = array.findIndex((item) => item.paymentMethod === newData.paymentMethod);
        // array[index] = newData
        // console.log(array, newData);
        // return 
        if (index !== -1) {
            array[index].cardName = newData.cardName;
            array[index].cardNumber = newData.cardNumber;
            array[index].ExpMonth = newData.ExpMonth;
            array[index].ExpYear = newData.ExpYear;
            array[index].cvc = newData.cvc;
        }
        else {
            array.push(newData);
        }
        return array;
    };

    const updateObjectInArrayTwo = (array, newData) => {
        const index = array.findIndex((item) => item.cardNumber === newData.cardNumber);
        // array[index] = newData
        // console.log(array, newData);
        // return 
        if (index !== -1) {
            array[index].cardName = newData.cardName;
            array[index].cardNumber = newData.cardNumber;
            array[index].ExpMonth = newData.ExpMonth;
            array[index].ExpYear = newData.ExpYear;
            array[index].cvc = newData.cvc;
            array[index].stripeId = newData.stripeId;
        }
        else {
            array.push(newData);
        }
        return array;
    };

    const SavePayCard = async (Data) => {
        // console.log(Data);
        // return
        if (SelectedPaymentCards?.length > 0) {
            // setUploading(true)
            const updatedPaymentCards = updateObjectInArrayTwo(SelectedPaymentCards, Data);
            // console.log(updatedPaymentCards);
            try {
                const docRef = firestore().collection('PaymentCards').doc(user?.uid);
                await docRef.update({ PaymentCardDetails: updatedPaymentCards });
                console.log('Object updated');
                // setUploading(false)
            }
            catch (e) {
                // setUploading(false)
                ToastAndroid.show("Error:" + e, ToastAndroid.SHORT);
            }
        }
        else {
            // setUploading(true)
            try {
                await firestore()
                    .collection('PaymentCards')
                    .doc(user?.uid)
                    .set({
                        PaymentCardDetails: [
                            Data
                        ],
                        uid: user?.uid
                    })
                    .then(() => {
                        // setUploading(false)
                        // console.log('submit');
                        // navigation.navigate('MediatorAccountScreen')
                        ToastAndroid.show("Payment card added successfully!", ToastAndroid.SHORT);
                    })
            }
            catch (e) {
                setUploading(false)
                ToastAndroid.show("Error:" + e, ToastAndroid.SHORT);
            }
        }
        return
    }

    const onApplyCouponTwo = async () => {
        try {
            const querySnapshot = await firestore().collection('SellTickets').doc(user?.uid).get();
            if (querySnapshot?.empty) {
                console.log('empty');
                setUploadingTwo(false)
            } else {
                const ticketsHistory = querySnapshot.data()?.TicketsHistory || [];
                if (
                    ticketsHistory.some(
                        (item) =>
                            item?.TicketAddToCard?.euid === TicketAddToCard?.euid &&
                            item?.TicketAddToCard?.CouponCodeutilized === true &&
                            item?.TicketAddToCard?.CouponCode === applycopun
                    )
                ) {
                    setUploadingTwo(false);
                    ToastAndroid.show(
                        'Sorry, this coupon code has already been used. Please try using a different code.',
                        ToastAndroid.SHORT
                    );
                    return;
                }
                if (!TicketAddToCard.appliedPromo && TicketAddToCard?.discountedReferral) {
                    // const totalAmount = TicketAddToCard?.membershipDiscount ? (TicketAddToCard?.Tickets?.pricePerTicket - TicketAddToCard?.membershipDiscount) : TicketAddToCard?.Tickets?.pricePerTicket;
                    // setUploadingTwo(false);
                    const totalAmount = TicketAddToCard?.Tickets?.pricePerTicket;
                    // membershipDiscount = parseFloat((totalAmount * 5 / 100)).toFixed(2);

                    const appliedPromo = parseFloat((totalAmount * TicketAddToCard?.discountedReferral) / 100).toFixed(2);
                    let sum = (TicketAddToCard?.totalPricewithTaxes - appliedPromo).toFixed(2);
                    // console.log('===:', appliedPromo, sum);
                    // return
                    // const result = parseFloat(totalAmount - appliedPromo).toFixed(2);
                    const updateTwo = {
                        ...TicketAddToCard,
                        totalPricewithTaxes: sum ? sum : null,
                        appliedPromo: appliedPromo ? appliedPromo : null,
                        CouponCodeutilized: true,
                        CouponCode: applycopun ? applycopun : null,
                    };
                    dicpatch(TicketsAddtoCard(updateTwo));
                    setUploadingTwo(false);
                    ToastAndroid.show('Success: Coupon code applied successfully.', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Coupon code already applied', ToastAndroid.SHORT);
                    setUploadingTwo(false);
                }
                // if (querySnapshot?.data()?.TicketsHistory) {
                //     querySnapshot?.data()?.TicketsHistory?.map((item) => {
                //         if (item?.TicketAddToCard?.euid == TicketAddToCard?.euid && item?.TicketAddToCard?.CouponCodeutilized == true && item?.TicketAddToCard?.CouponCode == applycopun) {
                //             setUploadingTwo(false)
                //             ToastAndroid.show('Sorry, this coupon code has already been used. Please try using a different code.', ToastAndroid.SHORT);
                //         }
                //     });
                //     if (!TicketAddToCard.appliedPromo && TicketAddToCard?.discountedReferral) {
                //         const totalAmount = TicketAddToCard?.totalPricewithTaxes;
                //         const appliedPromo = parseFloat((totalAmount * TicketAddToCard?.discountedReferral) / 100).toFixed(2);
                //         const result = parseFloat(totalAmount - (totalAmount * (TicketAddToCard?.discountedReferral / 100))).toFixed(2);
                //         const updateTwo = {
                //             ...TicketAddToCard,
                //             totalPricewithTaxes: result ? result : null,
                //             appliedPromo: appliedPromo ? appliedPromo : null,
                //             CouponCodeutilized: true,
                //             CouponCode: applycopun ? applycopun : null,
                //         };
                //         dicpatch(ticketsAddtoCard(updateTwo));
                //         setUploadingTwo(false);
                //         ToastAndroid.show('Success: Coupon code applied successfully.', ToastAndroid.SHORT)
                //     }
                //     else {
                //         setUploadingTwo(false)
                //         ToastAndroid.show('Coupon code already applied', ToastAndroid.SHORT);
                //     }
                // }
                // else {
                //     if (!TicketAddToCard.appliedPromo && TicketAddToCard?.discountedReferral) {
                //         const totalAmount = TicketAddToCard?.totalPricewithTaxes;
                //         const appliedPromo = parseFloat((totalAmount * TicketAddToCard?.discountedReferral) / 100).toFixed(2)
                //         const result = parseFloat(totalAmount - (totalAmount * (TicketAddToCard?.discountedReferral / 100))).toFixed(2);
                //         const updateTwo = {
                //             ...TicketAddToCard,
                //             totalPricewithTaxes: result ? result : null,
                //             appliedPromo: appliedPromo ? appliedPromo : null,
                //             CouponCodeutilized: true,
                //             CouponCode: applycopun ? applycopun : null,
                //         }
                //         dicpatch(ticketsAddtoCard(updateTwo))
                //         setUploadingTwo(false)
                //         ToastAndroid.show('Success: Coupon code applied successfully.', ToastAndroid.SHORT)
                //     }
                //     else {
                //         // console.log(updateTwo);
                //         ToastAndroid.show('Coupon code already applied', ToastAndroid.SHORT);
                //         setUploadingTwo(false)
                //     }
                // }
            }
        }
        catch (e) {
            setUploadingTwo(false)
            ToastAndroid.show(`Error: ${e.message}`, ToastAndroid.SHORT);
        }
    }

    const onApplyCoupon = async () => {
        const today = new Date()
        if (TicketAddToCard) {
            // console.log(today.toLocaleDateString());
            if (applycopun) {
                setUploadingTwo(true)
                // return
                if (allAffiliateCode?.length > 0) {
                    let isValidCoupon = false;

                    allAffiliateCode?.map((item) => {
                        const parts = item.ExpireDate.split("/");
                        const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                        // console.log(formattedDate >= today, item?.VipCode == applycopun);
                        if (item?.Eventid == TicketAddToCard?.euid && formattedDate >= today && item?.VipCode == applycopun) {
                            isValidCoupon = true;
                            setErrorApplyCoupon(false)
                            setPromoterId(item?.PromoterId ? item?.PromoterId : null)
                            // console.log(item);
                            onApplyCouponTwo();
                        }
                    });
                    if (!isValidCoupon) {
                        setUploadingTwo(false)
                        ToastAndroid.show('Coupon code not applicable.', ToastAndroid.SHORT);
                        setErrorApplyCoupon(true);
                    }
                }
                else {
                    setUploadingTwo(false)
                    ToastAndroid.show(`Coupon code not available.`, ToastAndroid.SHORT)
                    setErrorApplyCoupon(true)
                }
            }
            else {
                setUploadingTwo(false)
                ToastAndroid.show(`Coupon code cannot be empty!`, ToastAndroid.SHORT)
                setErrorApplyCoupon(true)
            }
        }
    }


    const updateTicketPrices = () => {
        if (AddToCard?.length > 0) {
            // console.log(AddToCard);
            const totalSum = AddToCard.reduce((sum, item) => sum + parseInt(item.Totalprice, 10), 0);
            const feePercentage = 2.9;
            const additionalFee = 0.50;

            const Transfee = parseFloat((totalSum * feePercentage / 100) + additionalFee).toFixed(2);
            const DAHfee = parseFloat((totalSum * 7.5 / 100)).toFixed(2);
            let sum = (Transfee * 100 + DAHfee * 100 + totalSum * 100) / 100;
            // Calculate the fee
            // const Transfee = (totalSum * feePercentage / 100) + additionalFee;
            // const DAHfee = totalSum * 7.5 / 100;
            // Calculate the total price with taxes
            // const sum = totalSum + Transfee + DAHfee;
            // Create the update object
            const update = {
                // ...AddToCard, // Assuming you want to update the first item in the array
                // menu: AddToCard,
                totalPrice: totalSum,
                totalPricewithTaxes: sum,
                transactionFee: Transfee,
                DateAndHoneyFee: DAHfee,
            };
            setFoodmenuPricing(update)
            // dicpatch(addToCart(AddToCard))
            console.log(foodmenuPricing, AddToCard, '===>')
        }
    }

    const GetAllAffiliateCode = async () => {
        const firestoreIp = await firestore().collection('AffiliateCode')
        firestoreIp.onSnapshot(querSnapshot => {
            const data = []
            querSnapshot.forEach((documentSnapShot) => {
                data.push(documentSnapShot.data().VipCode)
            });
            setAllAffiliateCode(data)
        })
    }

    const PaydepositAmount = async () => {
        // console.log('hey', PaymentCardDetails, depositAmount, SelectedPaymentCards);
        let customerData = new Object();
        customerData.amount = depositAmount?.Amount;
        customerData.customerId = PaymentCardDetails?.stripeId;

        if (SelectedPaymentCards?.length > 0) {
            setUploading(true)
            axios
                .post(`${Base_uri}dopayment`, customerData)
                .then(res => {
                    let data = res.data;
                    let { result, status } = data;

                    console.log(data, 'dataaaaResponse');

                    if (!status) {
                        // setButtonLoader(false);
                        setUploading(false)
                        Toast.show(data.message, Toast.LONG);
                        return;
                    }
                    let walletData = {
                        expend: 0,
                        fare: 0,
                        currency: 'usd',
                        deposit: result.amount / 100,
                        date: new Date().toString(),
                    };
                    // console.log(walletData, 'walletData');
                    //   let id = auth().currentUser.uid;
                    try {
                        firestore()
                            .collection('Wallet')
                            .doc(user?.uid)
                            .set(
                                {
                                    wallet: firestore.FieldValue.arrayUnion(walletData),
                                },
                                { merge: true },
                            )
                            .then(() => {
                                setUploading(false)
                                setShowModalContent({
                                    ...showModalContent,
                                    title: 'Payment Successful',
                                    descrition: `Your payment has been successfully processed and the amount has been deposited into your account.`,
                                    type: 'Success'
                                })
                                setShowModal(true)
                                GetWalletAmount()
                            })
                    }
                    catch (e) {
                        console.log(e);
                        setUploading(false)
                        Toast.show(`Error : ${e}`, Toast.LONG)
                    }
                })
        }
        else {
            setUploading(false)
            SavePayCard(PaymentCardDetails)
        }
    }

    useEffect(() => {
        GetAllAffiliateCode();
    }, [])

    useEffect(() => {
        updateTicketPrices();
        return () => {
            updateTicketPrices();
        };
    }, [])
    // useFocusEffect(
    // );
    const currentDate = new Date();

    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const calculateTotals = (transactions) => {
        const totals = {
            totalDeposit: 0.0,
            totalExpend: 0.0,
            totalBalance: 0.0,
            lastMonthTotalDeposit: 0.0,
            lastMonthTotalExpend: 0.0,
            lastYearTotalDeposit: 0.0,
            lastYearTotalExpend: 0.0,
        };

        transactions.forEach((transaction) => {
            const transactionDate = new Date(transaction.date);
            const isLastMonth = transactionDate >= oneMonthAgo && transactionDate <= currentDate;
            const isLastYear = transactionDate >= oneYearAgo && transactionDate <= currentDate;

            // totals.totalDeposit += transaction.deposit;
            // totals.totalExpend += transaction.expend;
            const deposit = parseFloat(transaction.deposit);
            const expend = parseFloat(transaction.expend);

            if (!isNaN(deposit)) {
                totals.totalDeposit += deposit;
                if (isLastMonth) {
                    totals.lastMonthTotalDeposit += deposit;
                }
                if (isLastYear) {
                    totals.lastYearTotalDeposit += deposit;
                }
            }

            if (!isNaN(expend)) {
                totals.totalExpend += expend;
                if (isLastMonth) {
                    totals.lastMonthTotalExpend += expend;
                }
                if (isLastYear) {
                    totals.lastYearTotalExpend += expend;
                }
            }
        });

        totals.totalBalance = (totals.totalDeposit - totals.totalExpend).toFixed(2);
        totals.lastYearTotalExpend = totals.lastYearTotalExpend.toFixed(2);
        totals.lastMonthTotalExpend = totals.lastMonthTotalExpend.toFixed(2);
        totals.lastMonthTotalDeposit = totals.lastMonthTotalDeposit.toFixed(2);
        totals.lastYearTotalDeposit = totals.lastYearTotalDeposit.toFixed(2);

        return totals;
    };


    const GetWalletAmount = async () => {
        try {
            let ref = firestore().collection('Wallet').doc(user?.uid)
            let refGet = await ref.get()
            if (refGet?.exists) {
                const data = refGet.data()?.wallet
                // console.log('===>  Wallet', data);
                if (data?.length > 0) {
                    const totals = calculateTotals(data);
                    // console.log(totals, '========>:');
                    dispatch(WalletAmount(totals))
                }

            }
        } catch (e) {
            console.log(e);
        }
    }
    // React.useCallback(() => {
    //     updateTicketPrices();
    //     // Perform any necessary actions when the screen is focused
    //     // For example, you can update the component's state or fetch data
    // }, [AddToCard])
    const captureScreenshot = async () => {
        // Use the captureScreen method to capture the entire screen
        if (AddToCard?.length > 0) {
            AddToCard?.map((e) => {
                dispatch(removeFromCart(e))
            })
            dicpatch(TicketsAddtoCard(null))
            setFoodmenuPricing(null)
            setFoodOrderContent({
                enable: false,
                title: null,
                descrition: null,
                qr: null
            })
            navigation.goBack()
            RNRestart.Restart()
        }
    };

    // console.log(AdditionalPackag);
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>

                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // backgroundColor:COLORS.gray2,
                        height: 60,
                        paddingHorizontal: 20,
                    }}>
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}>
                                <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
                                    style={{
                                        // height: 45,
                                        color: COLORS.black
                                    }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '60%', alignItems: 'center', }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Checkout</Text>
                        </View>

                        <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                        </View>
                    </View>
                    <ScrollView>
                        <View>
                            {PaymentCardDetails &&
                                <View style={{
                                    width: width / 1.1,
                                    backgroundColor: COLORS.white,
                                    paddingVertical: 20,
                                    elevation: 9,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                    marginVertical: 20,
                                    // paddingHorizontal:20,
                                }}>
                                    <View style={{
                                        // alignItems: 'center',
                                        // marginTop: -20
                                        paddingHorizontal: 20
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingBottom: 80
                                        }}>
                                            <View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>Card Holder Name</Text>
                                                </View>
                                                <View>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        color: COLORS.black
                                                    }}>{PaymentCardDetails?.cardName}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                alignItems: 'center'
                                            }}>
                                                {/* {PaymentMethod == 'Paypal' &&
                                                <>
                                                    <Image source={require('../../assets/paypal.png')} resizeMode='contain' />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            }
                                            {PaymentMethod == 'Google Pay' &&
                                                <>
                                                    <Image source={require('../../assets/google.png')} resizeMode='contain' />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            }
                                            {PaymentMethod == 'Venmo' &&
                                                <>
                                                    <Image source={require('../../assets/venmo.png')} resizeMode='contain' />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            } */}
                                                {PaymentMethod == 'Stripe' &&
                                                    <>
                                                        <Image source={require('../../assets/stripe2.png')} resizeMode='contain' style={{
                                                            width: 25,
                                                            height: 25,
                                                            borderRadius: 5,
                                                        }} />
                                                        <Text style={{
                                                            fontSize: 10
                                                        }}>{PaymentMethod}</Text>
                                                    </>
                                                }
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                            <View>
                                                <Text style={{ fontSize: 12, color: COLORS.gray }}>{PaymentCardDetails?.cardNumber ? '************' + PaymentCardDetails?.cardNumber : '************'}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 12, color: COLORS.gray }}>{PaymentCardDetails?.ExpMonth ? PaymentCardDetails?.ExpMonth : 'mm'} / {PaymentCardDetails?.ExpYear ? PaymentCardDetails?.ExpYear : 'yy'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            }

                            {BuyMemberShips &&
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ fontSize: 12, color: COLORS.black }}>Membership :</Text>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>{BuyMemberShips?.otherCategory}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ fontSize: 12, color: COLORS.black }}>Limits :</Text>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>{BuyMemberShips?.Prices?.limits}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1,
                                    }}>
                                        <Text style={{ fontSize: 12, color: COLORS.black }}>Price :</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'flex-end',
                                        }}>
                                            <Text style={{
                                                fontSize: 10,
                                                paddingRight: 10,
                                                color: COLORS.gray,
                                                textDecorationLine: 'line-through',
                                                textDecorationStyle: 'solid',
                                            }}>${BuyMemberShips?.Prices?.discountedRate}</Text>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 12,
                                            }}>${BuyMemberShips?.Prices?.rate}</Text>
                                        </View>
                                    </View>
                                </View>
                            }

                        </View>
                    </ScrollView>

                    <View style={{
                        paddingTop: 20,
                        alignItems: 'center',
                        paddingBottom: 100,
                        paddingTop: 90,
                        // height: '20%'
                    }}>
                        {!uploading == true ?
                            <>
                                {BuyMemberShips &&
                                    <CustomeButton onpress={() => PayAmountMemberships()}
                                        title={`Buy Memberships $${BuyMemberShips.Prices.rate}`} width={width / 1.2} />
                                }
                            </>
                            :
                            <View style={{
                                backgroundColor: COLORS.main,
                                width: width / 1.2,
                                height: 50,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
                            </View>
                        }
                    </View>
                </ScrollView>


                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={taxes}
                    onRequestClose={() => {
                        setTaxes(!taxes);
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: COLORS.gray,
                        opacity: 0.95
                        // alignItems: 'center',
                    }}>
                        <View style={{
                            margin: 20,
                            backgroundColor: COLORS.white,
                            borderRadius: 20,
                            padding: 25,
                            alignItems: 'center',
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}>
                            {taxesType == 'TransactionFee' ?
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                    }}>
                                        <View style={{ flex: 1 }} />
                                        <View style={{
                                            flex: 3,
                                        }}>
                                            <Text style={{
                                                // marginBottom: 10,
                                                textAlign: 'center',
                                                fontSize: 16,
                                                color: COLORS.black,
                                                fontWeight: 'bold'
                                            }}>
                                                Fee
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => { setTaxes(false), setTaxesType(null) }}
                                            style={{ flex: 1, alignItems: 'flex-end' }}
                                        >
                                            <AntDesign name="close" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                            color: COLORS.gray,
                                            // paddingHorizontal:20,
                                        }}>A $0.50 + 2.9% Fee is charge from our payment provider.</Text>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                            color: COLORS.gray,
                                            top: 5,
                                            // paddingHorizontal:20,
                                        }}>Dates and Honey's 7.5% Admin Fee helps manage this platform.</Text>
                                    </View>
                                    <View style={{
                                        alignSelf: 'center',
                                        top: 10,
                                    }}>
                                        <CustomeButton title={'Fair enough'} width={width / 1.5} onpress={() => { setTaxes(false), setTaxesType(null) }} />
                                    </View>

                                </View>
                                :
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                    }}>
                                        <View style={{ flex: 1 }} />
                                        <View style={{
                                            flex: 3,
                                        }}>
                                            <Text style={{
                                                // marginBottom: 10,
                                                textAlign: 'center',
                                                fontSize: 16,
                                                color: COLORS.black,
                                                fontWeight: 'bold'
                                            }}>
                                                Fee
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => { setTaxes(false), setTaxesType(null) }}
                                            style={{ flex: 1, alignItems: 'flex-end' }}
                                        >
                                            <AntDesign name="close" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                            color: COLORS.gray,
                                            // paddingHorizontal:20,
                                        }}>A $0.50 + 2.9% Fee is charge from our payment provider.</Text>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                            color: COLORS.gray,
                                            top: 5,
                                            // paddingHorizontal:20,
                                        }}>Dates and Honey's 7.5% Admin Fee helps manage this platform.</Text>
                                    </View>
                                    <View style={{
                                        alignSelf: 'center',
                                        top: 10,
                                    }}>
                                        <CustomeButton title={'Fair enough'} width={width / 1.5} onpress={() => { setTaxes(false), setTaxesType(null) }} />
                                    </View>

                                </View>
                            }
                        </View>
                    </View>

                </Modal>


                <Loader modal={uploadingTwo} uploading={uploadingTwo} />
            </View>



            <Modal
                animationType="slide"
                transparent={true}
                visible={showSuccessPoppup?.Status}
                onRequestClose={() => {
                    setShowSuccessPoppup({ ...showSuccessPoppup, Status: false });
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: COLORS.gray,
                    opacity: .95
                    // alignItems: 'center',
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        padding: 25,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                        <Image source={require('../../assets/flakeremove.png')} resizeMode='contain' style={{
                            width: 50,
                            height: 50
                        }} />
                        <Text style={{
                            marginBottom: 10,
                            color: COLORS.black,
                            fontWeight: 'bold'
                            // textAlign: 'center',
                        }}>{showSuccessPoppup.Title}</Text>
                        <Text style={{
                            marginBottom: 10,
                            textAlign: 'center',
                        }}>
                            {showSuccessPoppup.Detail}
                        </Text>
                        <TouchableOpacity
                            onPress={() => OnSuccessConfirm()}
                            style={{
                                // borderColor: COLORS.black,
                                width: '100%',
                                borderRadius: 10,
                                marginHorizontal: 5,
                                paddingVertical: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.main
                            }}>
                            <Text style={{
                                color: COLORS.black,
                            }}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>




            <Modal
                animationType='fade'
                visible={showModal}
                transparent={true}
                onRequestClose={() => {
                    setShowModal(false)
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: COLORS.gray,
                    opacity: 0.9
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: 'white',
                        opacity: 1,
                        borderRadius: 20,
                        padding: 25,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        paddingHorizontal: 30
                    }}>
                        {showModalContent?.type == 'Success' ?
                            <Image source={require('../../assets/flakeremove.png')} resizeMode='contain' style={{
                                width: 50,
                                height: 50,
                            }} />
                            :
                            <MaterialIcons color={'red'} name='error' size={40} />

                        }
                        <Text style={{
                            fontSize: 14,
                            color: COLORS.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingVertical: 10,
                        }}>{showModalContent?.title}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: COLORS.gray,
                            textAlign: 'center'
                        }}>{showModalContent?.descrition}</Text>
                        {showModalContent?.type == 'Success' ?
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModal(false),
                                        navigation.goBack(),
                                        RNRestart.Restart()

                                }}
                                style={{
                                    // width:90,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                    // height:30,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: showModalContent?.type == 'Success' ? COLORS.green : 'red'
                                }}>
                                {showModalContent?.type == 'Success' ?
                                    <Text style={{
                                        color: COLORS.white,
                                        fontSize: 12,
                                    }}>Completed</Text>
                                    :
                                    <Text style={{
                                        color: COLORS.white,
                                        fontSize: 12,
                                    }}>Continue</Text>
                                }
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => !loading ? afterPayConciergeBillAmount() : setShowModal(false)}
                                style={{
                                    // width:90,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                    // height:30,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: showModalContent?.type == 'Success' ? COLORS.green : COLORS.main,
                                }}>
                                {loading ?
                                    <ActivityIndicator animating={loading} size={'small'} color={COLORS.white} />
                                    :
                                    <Text style={{
                                        color: COLORS.white,
                                        fontSize: 12,
                                    }}>Add funds</Text>
                                }
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </Modal>

            <Modal
                animationType='fade'
                visible={FoodOrderContent?.enable}
                transparent={true}
                onRequestClose={() => {
                    setFoodOrderContent({
                        ...showModalContent,
                        enable: false
                    })
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: COLORS.gray,
                    opacity: 0.9
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: 'white',
                        opacity: 1,
                        borderRadius: 20,
                        padding: 25,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        paddingHorizontal: 30
                    }}>
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <Image source={require('../../assets/flakeremove.png')} resizeMode='contain' style={{
                                width: 60,
                                height: 60,
                                alignSelf: 'center'
                            }} />
                            <View>
                                <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: 'bold', textAlign: 'center' }}>{FoodOrderContent?.title}</Text>
                            </View>
                            <View>
                                <Text style={{ paddingVertical: 5, fontSize: 12, color: COLORS.gray, textAlign: 'center' }}>{FoodOrderContent?.descrition}</Text>
                            </View>
                            <View>
                                <Text style={{ paddingVertical: 5, fontSize: 14, color: COLORS.black, textAlign: 'center' }}>Your Qrcode</Text>
                            </View>
                            <View>
                                <Text style={{ paddingVertical: 5, fontSize: 12, color: COLORS.gray, textAlign: 'center' }}>(Take screenshot and Scan at vendor location)</Text>
                            </View>
                            <View style={{
                                alignSelf: 'center'
                            }}>
                                {FoodOrderContent?.qr ?
                                    <QRCode
                                        value={FoodOrderContent?.qr}
                                        // logo={{ uri: base64Logo }}
                                        logoSize={20}
                                        logoBackgroundColor='transparent'
                                        color="black"
                                        backgroundColor="white"
                                        size={100}
                                    />
                                    :
                                    <QRCode
                                        value={'12412432vscv'}
                                        // logo={{ uri: base64Logo }}
                                        logoSize={20}
                                        logoBackgroundColor='transparent'
                                        color="black"
                                        backgroundColor="white"
                                        size={100}
                                    />
                                }
                            </View>
                            <View style={{
                                // width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                // backgroundColor:COLORS.main
                            }}>
                                {/* <TouchableOpacity
                                    onPress={() => ShopeAgain()}
                                    style={{
                                        width: '45%',
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 10,
                                        // height:30,
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        backgroundColor: COLORS.gray2,
                                    }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black
                                    }}>Shope</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    onPress={() => captureScreenshot()}
                                    style={{
                                        width: '100%',
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        alignSelf: 'flex-end',
                                        justifyContent: 'center',
                                        marginTop: 10,
                                        // height:30,
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        backgroundColor: COLORS.green
                                    }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.white
                                    }}>Completed</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* <Loader modal={loading} uploading={} /> */}
        </SafeAreaView>
    )
}

export default CheckoutScreenMembership

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        // height: '80%',
        // paddingHorizontal: 20
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomColor: 'red',
        height: 45,
        width: '70%',
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        paddingLeft: 5,
        fontSize: 12,
        width: '100%',
        backgroundColor: COLORS.transparent,
    },
    rbStyle: {
        height: 22,
        width: 22,
        borderRadius: 110,
        borderWidth: 2,
        borderColor: COLORS.gray2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        width: 15,
        height: 15,
        margin: 10,
        borderRadius: 55,
        backgroundColor: COLORS.main,
    },
})