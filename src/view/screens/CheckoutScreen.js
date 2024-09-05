import { TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView, ToastAndroid, ActivityIndicator, ImageBackground, Dimensions, Modal, Platform, PermissionsAndroid, Alert, NativeModules } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AdditionalPackages, addToCart, BuyAdditionalPackages, Buypackages, ConciergeSendRequest, DepositAmount, FlakesBill, packages, removeFromCart, selectaddToCart, selectBuyAdditionalPackages, selectBuypackages, selectConciergeSendRequest, selectDepositAmount, selectEvents, selectFlakesBill, selectPackages, selectPaymentCardDetails, selectPaymentCards, selectPaymentMethod, selectTicketsAddToCard, selectUser, selectWalletAmount, TicketsAddtoCard, WalletAmount } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { addItemToCart } from '../../../redux/reducers/actions/action';
import { StackActions } from '@react-navigation/native';
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
import Ionicons from 'react-native-vector-icons/Ionicons'
import QRCode from 'react-native-qrcode-svg';



const CheckoutScreen = ({ navigation }) => {
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
    const BuyMemberShips = useSelector(selectBuypackages);
    const dispatch = useDispatch();
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
    // const dispatch = useDispatch();




    // for ecommerce 
    const AddToCard = useSelector(selectaddToCart)
    const total = AddToCard?.map((item) => Number(item?.Totalprice)).reduce((perv, curr) => perv + curr, 0);
    const totalUSD = total?.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });



    const TicketAddToCard = useSelector(selectTicketsAddToCard)
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
                            TicketModaldata: ticketsData,
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
                        type: 'InsufficientBalance'
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
        //         updateTicketsQty(TicketAddToCard)
        // return
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
                                    GetWalletAmount()
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
        // await SavePayCard();
        if (SelectedPaymentCards?.length > 0) {
            SavePayCard(SelectedPaymentCards)
            const MembershipName = BuyMemberShips?.otherCategory.split(' ')[0]
            const updatedMembershipsDetail = {
                ...BuyMemberShips?.Prices,
                time: new Date().toISOString()
            }
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

    const ShopeAgain = () => {
        if (AddToCard?.length > 0) {
            AddToCard?.map((e) => {
                dispatch(removeFromCart(e))
            })
            dispatch(TicketsAddtoCard(null))
            // console.log(AddToCard, '===> ')
            navigation?.navigate('Foodmenu', {
                EventsId: SelectedEvent,
            })
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
                                    GetWalletAmount()
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
                    GetWalletAmount()
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
        RefereshAllCards()
        if (AddToCard?.length > 0) {
            navigation.navigate('CurrentBalanceScreen');
            dispatch(addToCart(null))
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
            navigation.navigate('CurrentBalanceScreen')
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
                            GetWalletAmount()
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
                    dispatch(TicketsAddtoCard(updateTwo));
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
                //         dispatch(ticketsAddtoCard(updateTwo));
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
                //         dispatch(ticketsAddtoCard(updateTwo))
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
            // dispatch(addToCart(AddToCard))
            console.log(foodmenuPricing, AddToCard, '===>')
        }
        else if (TicketAddToCard) {
            let membershipDiscount
            // console.log(user?.PackageId);
            const totalAmount = TicketAddToCard?.totalPrice;
            // console.log(totalAmount , '======================');
            const feePercentage = 2.9;
            const additionalFee = 0.50;
            // Calculate the fee
            const Transfee = parseFloat((totalAmount * feePercentage / 100) + additionalFee).toFixed(2);
            const DAHfee = parseFloat((totalAmount * 7.5 / 100)).toFixed(2);
            let sum = (Transfee * 100 + DAHfee * 100 + totalAmount * 100) / 100;
            if (user?.PackageId == 123) {
                membershipDiscount = parseFloat((totalAmount * 5 / 100)).toFixed(2);
                sum = (sum - membershipDiscount).toFixed(2);
                // console.log(sum);
            }
            else if (user?.PackageId == 456) {
                membershipDiscount = parseFloat((totalAmount * 10 / 100)).toFixed(2);
                sum = (sum - membershipDiscount).toFixed(2);
                // console.log(sum);
            }
            else if (user?.PackageId == 654) {
                membershipDiscount = parseFloat((totalAmount * 15 / 100)).toFixed(2);
                sum = (sum - membershipDiscount).toFixed(2);
                // console.log(sum);
            }
            const update = {
                ...TicketAddToCard,
                totalPricewithTaxes: sum,
                transactionFee: Transfee,
                DateAndHoneyFee: DAHfee,
                membershipDiscount: membershipDiscount ? membershipDiscount : null,
            }
            dispatch(TicketsAddtoCard(update))
        }
        else if (FlakeBill) {
            const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // One month in milliseconds
            const oneYearInMillis = 365 * 24 * 60 * 60 * 1000; // One year in milliseconds
            const currentTime = Date.now();
            const Timestamp = new Date(user?.FlakeInsurance?.time).getTime();
            if (
                user?.FlakeInsurance &&
                ((user?.FlakeInsurance?.limits == '1 month' && currentTime - Timestamp <= oneMonthInMillis) ||
                    (user?.FlakeInsurance?.limits == '1 year' && currentTime - Timestamp <= oneYearInMillis))
            ) {
                const discountPrice = parseFloat((FlakeBill?.TotalPrice * 10 / 100)).toFixed(2);
                const finalAmount = FlakeBill?.TotalPrice - discountPrice;
                // const sum = (Transfee * 100 + DAHfee * 100 + totalAmount * 100) / 100;
                const update = {
                    ...FlakeBill,
                    totalPricewithTaxes: finalAmount,
                    discountPrice: discountPrice,
                }
                // console.log(update);
                dispatch(FlakesBill(update))
            }
            else {
                const update = {
                    ...FlakeBill,
                    totalPricewithTaxes: FlakeBill?.TotalPrice,
                }
                // console.log(update);
                dispatch(FlakesBill(update))
            }
            // const totalAmount = FlakeBill?.TotalPrice;
            // const feePercentage = 2.9;
            // const additionalFee = 0.50;
            // Calculate the fee
            // const Transfee = parseFloat((totalAmount * feePercentage / 100) + additionalFee).toFixed(2);
            // const DAHfee = parseFloat((totalAmount * 7.5 / 100)).toFixed(2);
            // const sum = (Transfee * 100 + DAHfee * 100 + totalAmount * 100) / 100;
        }
        else if (ConciergeRequestData) {
            console.log(ConciergeRequestData);
            const totalAmount = ConciergeRequestData?.price;
            const feePercentage = 2.9;
            const additionalFee = 0.50;
            // Calculate the fee
            const Transfee = parseFloat((totalAmount * feePercentage / 100) + additionalFee).toFixed(2);
            const DAHfee = parseFloat((totalAmount * 7.5 / 100)).toFixed(2);
            let sum = (Transfee * 100 + DAHfee * 100 + totalAmount * 100) / 100;
            const update = {
                ...ConciergeRequestData,
                totalPricewithTaxes: sum,
                transactionFee: Transfee,
                DateAndHoneyFee: DAHfee,
            }
            // console.log(update);
            dispatch(ConciergeSendRequest(update))
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
        // return
        if (SelectedPaymentCards?.length > 0) {
            setUploading(true)
            axios
                .post(`${Base_uri}dopayment`, customerData)
                .then(res => {
                    let data = res.data;
                    let { result, status } = data;
                    // console.log(data, 'dataaaaResponse');
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
                                dispatch(DepositAmount(null))
                                GetWalletAmount()
                            })
                    }
                    catch (e) {
                        console.log(e);
                        setUploading(false)
                        Toast.show(`Error : ${e}`, Toast.LONG)
                    }
                })
                .catch(e => {
                    console.log('Eror :', e);
                    setUploading(false)
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
        // return () => {
        //     updateTicketPrices();
        // };
    }, [])

    const captureScreenshot = async () => {
        // Use the captureScreen method to capture the entire screen
        if (AddToCard?.length > 0) {
            AddToCard?.map((e) => {
                dispatch(removeFromCart(e))
            })
            dispatch(TicketsAddtoCard(null))
            setFoodmenuPricing(null)
            setFoodOrderContent({
                enable: false,
                title: null,
                descrition: null,
                qr: null
            })
            navigation.goBack()
        }
    };

    const RefereshAllCards = () => {
        dispatch(TicketsAddtoCard(null))
        dispatch(FlakesBill(null))
        dispatch(ConciergeSendRequest(null))
        dispatch(Buypackages(''))
        dispatch(BuyAdditionalPackages(''))
        dispatch(DepositAmount(null))
        if (AddToCard?.length > 0) {
            AddToCard?.map((e) => {
                dispatch(removeFromCart(e))
            })
        }
        else {
            console.log('food item not found');
        }
    }

    const GoBack = () => {
        RefereshAllCards();
        navigation?.goBack()
    }
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
                                onPress={() => GoBack()}>
                                <Ionicons name='arrow-back' size={20} color={COLORS.black} />
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
                        {!AddToCard.length == 0 &&
                            <>
                                {AddToCard.map((item, index) => (
                                    <View key={index} style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '100%',
                                        paddingHorizontal: 20,
                                        paddingVertical: 20,
                                        backgroundColor: COLORS.light,
                                        marginBottom: 10
                                    }}>
                                        <View style={{
                                            borderRadius: 50,
                                            width: '20%',
                                        }}>
                                            <Image source={{ uri: item?.image1 }} resizeMode='cover' style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 50,
                                                borderWidth: 2,
                                                borderColor: COLORS.main,
                                            }} />
                                        </View>
                                        <View style={{
                                            width: '60%',
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                paddingLeft: 10
                                            }}>{item?.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, }}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                    color: COLORS.black,
                                                    paddingLeft: 10
                                                }}>
                                                    Qty:
                                                </Text>
                                                {/* <TouchableOpacity
                                            // onPress={() => handleDecrement(item)}
                                            style={{
                                                backgroundColor: COLORS.main,
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                width: 20
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 12,
                                                // marginRight: 5,
                                                // paddingRight: 5,
                                                textAlign: 'center',
                                                fontSize: 15,
                                            }}>-</Text>
                                        </TouchableOpacity> */}
                                                <Text style={{
                                                    // backgroundColor: COLORS.white,
                                                    paddingHorizontal: 3,
                                                    fontSize: 15,
                                                    width: 20,
                                                    textAlign: 'center',
                                                    color: COLORS.black
                                                }}>{item.qty}</Text>
                                                {/* <TouchableOpacity
                                            onPress={() => handleIncrement(item)}
                                            style={{
                                                backgroundColor: COLORS.main,
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                width: 20
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 12,
                                                marginRight: 5,
                                                paddingLeft: 5,
                                                fontSize: 15,
                                            }}>+</Text>
                                        </TouchableOpacity> */}
                                            </View>
                                        </View>
                                        <View style={{
                                            width: '20%',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.gray
                                            }}>Total Price</Text>
                                            <Text style={{
                                                fontSize: 15,
                                                color: COLORS.green,
                                                fontWeight: 'bold'
                                            }}>${item?.Totalprice}.00</Text>
                                        </View>
                                    </View>
                                ))}
                            </>
                        }
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
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: COLORS.gray
                                                    }}>Card Holder Name</Text>
                                                </View>
                                                <View>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        color: COLORS.black,
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
                                                            fontSize: 10,
                                                            color: COLORS.gray
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
                            {AddToCard?.length > 0 || TicketAddToCard ?
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 20,
                                    marginVertical: 5
                                }}>
                                    <View style={[styles.NumberInput, {
                                        borderBottomWidth: errorapplycoupon ? 1 : 0,
                                    }]}>
                                        <Image source={require('../../assets/coupn.png')} resizeMode='contain'
                                            style={{
                                                width: 20
                                            }} />
                                        <TextInput
                                            value={applycopun}
                                            placeholder={'Apply Coupon'}
                                            underlineColor={COLORS.transparent}
                                            placeholderTextColor={COLORS.gray}
                                            activeUnderlineColor={COLORS.transparent}
                                            // error={errorapplycoupon}
                                            onFocus={() => setErrorApplyCoupon(false)}
                                            keyboardType='email-address'
                                            onChangeText={applycopun => setApplycopun(applycopun)
                                            }
                                            style={styles.TextInput}
                                        />
                                    </View>
                                    <View style={{
                                        width: '25%',
                                        height: 45,
                                        justifyContent: 'center',
                                        alignItems: 'flex-end',
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        backgroundColor: COLORS.main
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => onApplyCoupon()}
                                            style={{
                                                paddingHorizontal: 20,
                                                paddingVertical: 10,
                                            }}>
                                            <Text style={{ color: COLORS.black, fontSize: 12 }}>Apply</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                : null
                            }

                            {!AddToCard.length == 0 && foodmenuPricing &&
                                <View>
                                    {/* <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Ticket Price</Text>
                                        </View>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>${TicketAddToCard?.totalPrice ? TicketAddToCard?.totalPrice : '00'}</Text>
                                    </View> */}

                                    {/* <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ fontSize: 14, color: COLORS.gray }}>Delivery Charges</Text>
                                        <Text style={{ fontSize: 14, color: COLORS.gray }}>$0</Text>
                                    </View> */}
                                    {/* <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ fontSize: 14, color: COLORS.gray }}>Platform Fee</Text>
                                        <Text style={{ color: COLORS.green, fontSize: 14 }}>${platFormFee}.00</Text>
                                    </View> */}
                                    {console.log(foodmenuPricing)}
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>Price</Text>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>${foodmenuPricing?.totalPrice ? foodmenuPricing?.totalPrice : '00'}</Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Transaction Fee</Text>
                                            <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('TransactionFee') }} />
                                        </View>
                                        <Text style={{ color: COLORS.green, fontSize: 12 }}>${foodmenuPricing?.transactionFee ? foodmenuPricing?.transactionFee : '00'}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Dates and Honey Fee</Text>
                                            <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('DAHFee') }} />
                                        </View>
                                        <Text style={{ fontSize: 12, color: COLORS.green }}>${foodmenuPricing?.DateAndHoneyFee ? foodmenuPricing?.DateAndHoneyFee : '00'}</Text>
                                    </View>
                                    {foodmenuPricing?.appliedPromo &&
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            justifyContent: 'space-between',
                                            borderBottomColor: COLORS.light,
                                            borderBottomWidth: 1,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Text style={{ fontSize: 14, color: COLORS.gray, marginRight: 5 }}>Promo or discount applied</Text>
                                                <Text style={{ fontSize: 14, color: COLORS.gray }}>{foodmenuPricing?.discountedReferral}%</Text>
                                                {/* <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('DAHFee') }} /> */}
                                            </View>
                                            <Text style={{ fontSize: 14, color: COLORS.gray }}>-${foodmenuPricing?.appliedPromo ? foodmenuPricing?.appliedPromo : '00'}</Text>
                                        </View>
                                    }
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: 'bold' }}>Total Price</Text>
                                        <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: 'bold' }}>${foodmenuPricing?.totalPricewithTaxes ? foodmenuPricing?.totalPricewithTaxes : '00'}</Text>
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

                            {AdditionalPackag &&
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1,
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>Additional Package :</Text>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>{AdditionalPackag?.otherCategory}</Text>
                                        {/* <Text style={{ fontSize: 12, color: COLORS.gray }}>{AdditionalPackag?.limits}</Text> */}
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingTop: 20,
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1,
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>Package Limits :</Text>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>{AdditionalPackag?.limits}</Text>
                                        {/* <Text style={{ fontSize: 12, color: COLORS.gray }}>{AdditionalPackag?.limits}</Text> */}
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
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>Price :</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'flex-end',
                                        }}>
                                            {/* <Text style={{
                                                fontSize: 10,
                                                paddingRight: 10,
                                                color: COLORS.gray,
                                                textDecorationLine: 'line-through',
                                                textDecorationStyle: 'solid',
                                            }}>${AdditionalPackag?.Prices?.discountedRate}</Text> */}
                                            <Text style={{
                                                color: COLORS.gray,
                                                fontSize: 12,
                                            }}>${AdditionalPackag?.Prices?.rate}</Text>
                                        </View>
                                    </View>
                                </View>
                            }

                            {TicketAddToCard &&
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
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Ticket Price</Text>
                                            {/* <SVGNotify width={15} height={15} onPress={() => setTaxes(true)} /> */}
                                        </View>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>${TicketAddToCard?.totalPrice ? TicketAddToCard?.totalPrice : '00'}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Transaction Fee</Text>
                                            <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('TransactionFee') }} />
                                        </View>
                                        <Text style={{ color: COLORS.green, fontSize: 12 }}>${TicketAddToCard?.transactionFee ? TicketAddToCard?.transactionFee : '00'}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Dates and Honey Fee</Text>
                                            <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('DAHFee') }} />
                                        </View>
                                        <Text style={{ fontSize: 12, color: COLORS.green }}>${TicketAddToCard?.DateAndHoneyFee ? TicketAddToCard?.DateAndHoneyFee : '00'}</Text>
                                    </View>
                                    {TicketAddToCard?.appliedPromo &&
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            justifyContent: 'space-between',
                                            borderBottomColor: COLORS.light,
                                            borderBottomWidth: 1,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Promo or discount applied</Text>
                                                <Text style={{ fontSize: 12, color: COLORS.gray }}>{TicketAddToCard?.discountedReferral}%</Text>
                                                {/* <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('DAHFee') }} /> */}
                                            </View>
                                            <Text style={{ fontSize: 12, color: COLORS.gray }}>-${TicketAddToCard?.appliedPromo ? TicketAddToCard?.appliedPromo : '00'}</Text>
                                        </View>
                                    }
                                    {TicketAddToCard?.membershipDiscount &&
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            justifyContent: 'space-between',
                                            borderBottomColor: COLORS.light,
                                            borderBottomWidth: 1,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Membership Discount</Text>
                                                <Text style={{ fontSize: 12, color: COLORS.gray }}>
                                                    {user?.PackageId == 123 ? '5' : user?.PackageId == 456 ? '10' : user?.PackageId == 654 ? '15' : null}%
                                                </Text>
                                                {/* <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('DAHFee') }} /> */}
                                            </View>
                                            <Text style={{ fontSize: 12, color: COLORS.gray }}>-${TicketAddToCard?.membershipDiscount}</Text>
                                        </View>
                                    }
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: 'bold' }}>Total</Text>
                                        <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: 'bold' }}>${TicketAddToCard?.totalPricewithTaxes ? TicketAddToCard?.totalPricewithTaxes : '00'}</Text>
                                    </View>
                                </View>}


                            {FlakeBill &&
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
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Remove Flakes ({FlakeBill?.Flake})</Text>
                                            {/* <SVGNotify width={15} height={15} onPress={() => setTaxes(true)} /> */}
                                        </View>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>${FlakeBill?.TotalPrice ? FlakeBill?.TotalPrice : '0'}</Text>
                                    </View>
                                    {FlakeBill?.discountPrice &&
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 20,
                                            paddingTop: 20,
                                            paddingBottom: 10,
                                            justifyContent: 'space-between',
                                            borderBottomColor: COLORS.light,
                                            borderBottomWidth: 1
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Flake Insurance(10%)</Text>
                                                {/* <SVGNotify width={15} height={15} onPress={() => setTaxes(true)} /> */
                                                    // console.log(FlakeBill, '===>')
                                                }
                                            </View>
                                            <Text style={{ fontSize: 12, color: COLORS.gray }}>-${FlakeBill?.discountPrice}</Text>
                                        </View>
                                    }

                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>Total</Text>
                                        <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>${FlakeBill?.totalPricewithTaxes ? FlakeBill?.totalPricewithTaxes : FlakeBill?.TotalPrice}</Text>
                                    </View>
                                </View>}

                            {ConciergeRequestData &&
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
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Mediator Fee</Text>
                                            {/* <SVGNotify width={15} height={15} onPress={() => setTaxes(true)} /> */}
                                        </View>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>${ConciergeRequestData?.price ? ConciergeRequestData?.price : '0'}</Text>
                                    </View>
                                    {ConciergeRequestData?.transactionFee &&
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            justifyContent: 'space-between',
                                            borderBottomColor: COLORS.light,
                                            borderBottomWidth: 1
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Transaction Fee</Text>
                                                <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('TransactionFee') }} />
                                            </View>
                                            <Text style={{ color: COLORS.green, fontSize: 12 }}>${ConciergeRequestData?.transactionFee ? ConciergeRequestData?.transactionFee : '00'}</Text>
                                        </View>
                                    }
                                    {ConciergeRequestData?.DateAndHoneyFee &&
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            justifyContent: 'space-between',
                                            borderBottomColor: COLORS.light,
                                            borderBottomWidth: 1,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Dates and Honey Fee</Text>
                                                <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('DAHFee') }} />
                                            </View>
                                            <Text style={{ fontSize: 12, color: COLORS.green }}>${ConciergeRequestData?.DateAndHoneyFee ? ConciergeRequestData?.DateAndHoneyFee : '00'}</Text>
                                        </View>
                                    }
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        justifyContent: 'space-between',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>Total</Text>
                                        <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>${ConciergeRequestData?.totalPricewithTaxes ? ConciergeRequestData?.totalPricewithTaxes : ConciergeRequestData?.price}</Text>
                                    </View>
                                </View>
                            }
                            {depositAmount &&
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
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 12, color: COLORS.gray, marginRight: 5 }}>Deposit Amount</Text>
                                        </View>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>${depositAmount?.Amount ? depositAmount?.Amount : '0'}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    </ScrollView>

                    <View style={{
                        paddingTop: 20,
                        alignItems: 'center',
                        paddingBottom: 100,
                        paddingTop: 100,
                        // height: '20%'
                    }}>
                        {!uploading == true ?
                            <>

                                {BuyMemberShips &&
                                    <CustomeButton onpress={() => PayAmountMemberships()}
                                        title={`Buy Memberships $${BuyMemberShips.Prices.rate}`} width={width / 1.2} />
                                }
                                {TicketAddToCard &&
                                    <CustomeButton onpress={() => PayAmount()}
                                        title={`Pay Amount $${TicketAddToCard?.totalPricewithTaxes ? TicketAddToCard?.totalPricewithTaxes : TicketAddToCard?.totalPrice}`} width={width / 1.2} />
                                }
                                {AdditionalPackag &&
                                    <CustomeButton onpress={() => AdditionalPackagesFunc()}
                                        title={`Pay Amount $${AdditionalPackag.Prices.rate}`} width={width / 1.2} />
                                }
                                {FlakeBill &&
                                    <CustomeButton onpress={() => PayFlakeBillAmount()}
                                        title={`Pay Amount $${FlakeBill?.totalPricewithTaxes ? FlakeBill?.totalPricewithTaxes : FlakeBill?.TotalPrice}`} width={width / 1.2} />
                                }
                                {depositAmount &&
                                    <CustomeButton onpress={() => PaydepositAmount()}
                                        title={`Deposit Amount $${depositAmount?.Amount ? depositAmount?.Amount : '00'}`} width={width / 1.2} />
                                }
                                {ConciergeRequestData &&
                                    <CustomeButton onpress={() => PayConciergeBillAmount()}
                                        title={`Pay Amount $${ConciergeRequestData?.totalPricewithTaxes ? ConciergeRequestData?.totalPricewithTaxes : ConciergeRequestData?.price}`} width={width / 1.2} />

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
                            color: COLORS.gray
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
                                        navigation.goBack()
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
                                <TouchableOpacity
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
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => captureScreenshot()}
                                    style={{
                                        width: '45%',
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

export default CheckoutScreen

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