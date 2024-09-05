import { TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView, ToastAndroid, ActivityIndicator, ImageBackground, Dimensions, Modal, Platform, PermissionsAndroid, Alert, NativeModules } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AdditionalPackages, addToCart, BuyAdditionalPackages, Buypackages, ConciergeSendRequest, DepositAmount, FlakesBill, packages, removeFromCart, selectaddToCart, selectBuyAdditionalPackages, selectBuypackages, selectConciergeSendRequest, selectDepositAmount, selectEvents, selectFlakesBill, selectPackages, selectPaymentCardDetails, selectPaymentCards, selectPaymentMethod, selectTicketsAddToCard, selectUser, selectWalletAmount, TicketsAddtoCard, WalletAmount } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { addItemToCart } from '../../../redux/reducers/actions/action';
import { StackActions, useIsFocused } from '@react-navigation/native';
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
import { log } from 'react-native-reanimated';


const CheckoutScreenEvent = ({ navigation, route }) => {
    const { details } = route?.params;
    // const [TicketAddToCard, setTicketAddToCard] = useState(data); //initial choice
    const focus = useIsFocused()
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
    // console.log(AddToCard);
    const total = AddToCard?.map((item) => Number(item?.Totalprice)).reduce((perv, curr) => perv + curr, 0);
    const totalUSD = total?.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });



    const TicketAddToCard = useSelector(selectTicketsAddToCard)
    // console.log('===>', TicketAddToCard?.promoCode);
    const [isTicketPricesUpdated, setIsTicketPricesUpdated] = useState(false); // New state to track when ticket prices are updated

    const user = useSelector(selectUser)
    const [applycopun, setApplycopun] = useState(null); //initial choice
    const [promoterId, setPromoterId] = useState(null); //initial choice
    const [errorapplycoupon, setErrorApplyCoupon] = useState(false); //initial choice
    const [uploading, setUploading] = useState(false);
    const [uploadingTwo, setUploadingTwo] = useState(false);
    const [allAffiliateCode, setAllAffiliateCode] = useState(null);
    const [foodmenuPricing, setFoodmenuPricing] = useState(null);

    const updatePromoterWallet = async (data) => {
        const ref = await firestore()
            .collection('PromoteEvents')
            .doc(data?.euid).get()
        const refdoc = ref?.data()?.Promoters

        const querySnapshot = await firestore()
            .collection('Users')
            .where("userDetails.VipCode", '==', promoterId)
            .get();
        const userDetailsList = await Promise.all(querySnapshot.docs.map(async (doc) => {
            return doc.data()?.userDetails;
        }));
        const promoter = refdoc.find((res) => userDetailsList[0].uid == res?.promoterId)
        if (promoter?.promoterReward) {
            const promoterReward = parseFloat((data?.totalPrice * promoter?.promoterReward) / 100).toFixed(2);

            if (!querySnapshot?.empty) {
                querySnapshot.forEach(async (doc) => {
                    const userData = doc.data(); // Access data of each document
                    // console.log(userData?.userDetails?.uid);
                    // return
                    let walletforpromoter = {
                        expend: 0,
                        fare: 0,
                        currency: 'usd',
                        deposit: parseFloat(promoterReward),
                        type: 'promoterReward',
                        details: `Ticket purchase ${data?.title}. Discounts used: ${data?.appliedPromo > 0 && data?.membershipDiscount > 0 ? '2' : data?.appliedPromo > 0 || data?.membershipDiscount > 0 ? '1' : '0'}. Your reward: ${promoterReward} USD`,
                        date: new Date().toString(),
                        euid: data?.euid,
                        eventEnddate: data?.endDate,
                    };
                    // console.log(walletforpromoter);
                    // return
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
                        SendPushNotify(user, 'Ticket Sold!', `Check out the sold event rewards: ${data?.title}`);

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
    const getAdminPercentage = async (data) => {
        try {
            const ref = await firestore()
                .collection('Events')
                .doc(data?.euid) // Make sure promoter has euid
                .get();

            const refdoc = ref?.data()?.AdminPromitions;
            console.log(refdoc, 'p', data?.euid);
            if (refdoc?.isApproved) {
                return refdoc?.percentage || 0;
            } else {
                return 0; // Return 0 if not approved
            }
        } catch (err) {
            console.log(err);
            return 0; // Return 0 in case of an error
        }
    }
    const updateEventCoordinatorWallet = async (data2) => {
        const ref = await firestore()
            .collection('PromoteEvents')
            .doc(data2?.euid).get()
        const refdoc = ref?.data()?.Promoters

        const querySnapshot = await firestore()
            .collection('Users')
            .where("userDetails.VipCode", '==', promoterId)
            .get();
        const userDetailsList = await Promise.all(querySnapshot.docs.map(async (doc) => {
            return doc.data()?.userDetails;
        }));
        const promoter = refdoc.find((res) => userDetailsList[0]?.uid == res?.promoterId)
        if (promoter?.discountedReferral && promoter?.promoterReward) {
            // data2?.totalPricedata2?.totalPrice

            // const totaldiscountpercent = (data2.promoterReward ?? 0) + (data2?.discountedReferral ?? 0);
            let totaldiscountpercent = promoter?.addByCategory == 'Admin' ? await getAdminPercentage(data2) : (promoter.promoterReward * 100 + promoter?.discountedReferral * 100) / 100;
            const finalamount = parseFloat((data2?.totalPrice * totaldiscountpercent / 100)).toFixed(2);
            let sum = (data2?.totalPrice * 100 - finalamount * 100) / 100;
            let walletforEventCoordinator = {
                expend: 0,
                fare: 0,
                currency: 'usd',
                deposit: promoterId?.StartDate && promoterId?.ExpireDate ? data2?.totalPrice : sum,
                type: 'sell tickets',
                date: new Date().toString(),
                euid: data2?.euid,
                details: `Ticket Sold ${data2?.title}. Customer: ${user?.Name + ' ' + user?.SecName}. ${data2?.appliedPromo > 0 && data2?.membershipDiscount > 0 ? '2' : TicketAddToCard?.data2 > 0 || TicketAddToCard?.data2 > 0 ? '1' : '0'} discount used total ${totaldiscountpercent}% OFF. Your Total ${promoterId?.StartDate && promoterId?.ExpireDate ? data2?.totalPrice : sum}`,
                eventEnddate: data2?.endDate,
            };

            // console.log(walletforEventCoordinator);
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
                SendPushNotify(user, 'Ticket Sold!', `Check out the sold event tickets: ${data2?.title}`);

            } catch (e) {
                Toast.show(`Erorr : ${e}`, Toast.LONG);
            }
            // console.log(data2?.eventOrganizer);

            // console.log(walletforEventCoordinator, '-----evetcoor wallate1');
        }
        else {
            let totaldiscountpercent = 0
            let walletforEventCoordinator = {
                expend: 0,
                fare: 0,
                currency: 'usd',
                deposit: data2?.totalPrice,
                type: 'sell tickets',
                details: `Ticket Sold ${data2?.title}. Customer: ${user?.Name + '' + user?.SecName}. ${data2?.appliedPromo > 0 && data2?.membershipDiscount > 0 ? '2' : TicketAddToCard?.data2 > 0 || TicketAddToCard?.data2 > 0 ? '1' : '0'} discount used total ${totaldiscountpercent}% OFF. Your Total ${data2?.totalPrice}`,
                date: new Date().toString(),
                euid: data2?.euid,
                eventEnddate: data2?.endDate,
            };

            // console.log(walletforEventCoordinator, data2);
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
                SendPushNotify(user, 'Ticket Sold!', `Check out the sold event tickets: ${data2?.title}`);

            }
            catch (e) {
                Toast.show(`Erorr : ${e}`, Toast.LONG);
            }
            // console.log(walletforEventCoordinator, '===eventcoor wallate2');
        }
    }
    const SendPushNotify = async (currentUser, title, message, imageUrl) => {

        await firestore()
            .collection('token')
            .doc(currentUser?.uid)
            .get()
            .then(async doc => {
                let token = doc?.data()?.token ?? null;
                console.log(token);

                // return
                if (token) {
                    var data = JSON.stringify({
                        data: {
                            title: title || 'New Notification',
                            body: `${currentUser?.Name || 'New User'}: ${message || 'Click to open message'}`,
                            image_url: imageUrl || null, // Image URL
                        },
                        notification: {
                            title: title || 'Notification',
                            body: `${currentUser?.Name || 'New User'}: ${message || 'Click to open message'}`,
                            image_url: imageUrl || null,
                        },
                        to: token,
                    });
                    let config = {
                        method: 'post',
                        url: 'https://fcm.googleapis.com/fcm/send',
                        headers: {
                            Authorization:
                                'key=AAAAjKV_1r4:APA91bH56x6Wf4dGGgy4pBN1FN2UBCanBAk3WPaW3gMU2sba7_Ou1xnAKL6i_bbcZx9LhShUrc_GTwkhnU-MRCWwOCvwi-Gj6Nj4eC_-8WWj8giBSCWkqfcb0H7BpcQgyC1X3lRyzGt4',
                            'Content-Type': 'application/json',
                        },
                        data: data,
                        maxRedirects: 5, // Set this to follow up to 5
                    };
                    await axios(config)
                        .then(res => {
                            if (res.status === 200) {
                                console.log('Notification sent successfully:', res.data);
                            } else {
                                console.log(`Unexpected status code: ${res.status}`);
                            }
                        })

                        .catch(error => {
                            if (error.response && error.response.status === 301) {
                                console.log('Error: Resource moved permanently (301). Check the URL.', error.message);
                            } else {
                                console.log('Error:', error.message);
                            }
                        });
                }
            });
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


    // console.log(TicketAddToCard);

    const PayAmount = async () => {
        // console.log(user?.uid);
        // updateTicketsQty(TicketAddToCard)
        // updateEventCoordinatorWallet(TicketAddToCard)
        // updatePromoterWallet(TicketAddToCard)
        // updateEventCoordinatorWallet(TicketAddToCard)
        // return
        let time = new Date().toString()
        // return
        if (SelectedPaymentCards?.length > 0) {
            // SavePayCard(PaymentCardDetails)
            if (TicketAddToCard) {
                setUploading(true)
                // return
                // const id = TicketAddToCard.uid
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
                            details: `Ticket purchase ${TicketAddToCard?.title} ${TicketAddToCard?.appliedPromo > 0 && TicketAddToCard?.membershipDiscount > 0 ? '2' : TicketAddToCard?.appliedPromo > 0 || TicketAddToCard?.membershipDiscount > 0 ? '1' : '0'} discount used your total ${TicketAddToCard?.totalPricewithTaxes}`,
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
                                // return

                                const docRef = firestore().collection('SellTickets').doc(user?.uid);
                                const docSnapshot = await docRef.get().then(documentSnapshot => {
                                    // console.log('User exists: ', documentSnapshot.exists);

                                    if (documentSnapshot.exists) {
                                        console.log('User data: ', documentSnapshot.data());
                                        docRef.update({
                                            TicketsHistory: firestore.FieldValue.arrayUnion({
                                                TicketAddToCard: {
                                                    ...TicketAddToCard,
                                                    promoterId: TicketAddToCard?.promoterId || null
                                                },
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
                                                    TicketAddToCard: {
                                                        ...TicketAddToCard,
                                                        promoterId: TicketAddToCard?.promoterId || null
                                                    },
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
                        console.log('==>>:', e?.message, e);
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

    // const PayAmountMemberships = async () => {
    //     // await SavePayCard();
    //     if (SelectedPaymentCards?.length > 0) {
    //         SavePayCard(SelectedPaymentCards)
    //         const MembershipName = BuyMemberShips?.otherCategory.split(' ')[0]
    //         const updatedMembershipsDetail = {
    //             ...BuyMemberShips?.Prices,
    //             time: new Date().toISOString()
    //         }
    //         const totalBalance = parseFloat(walletAmount?.totalBalance);
    //         const price = parseFloat(updatedMembershipsDetail?.rate);
    //         if (totalBalance >= price) {
    //             setUploading(true)
    //             // console.log(updatedMembershipsDetail, walletAmount, walletAmount?.totalBalance - updatedMembershipsDetail?.rate);
    //             try {
    //                 let walletData = {
    //                     expend: updatedMembershipsDetail?.rate,
    //                     fare: 0,
    //                     currency: 'usd',
    //                     deposit: 0,
    //                     type: BuyMemberShips?.otherCategory,
    //                     date: new Date().toString(),
    //                     .collection('Wallet')
    //                 };
    //                 await firestore()
    //                     .doc(user?.uid)
    //                     .set(
    //                         {
    //                             wallet: firestore.FieldValue.arrayUnion(walletData),
    //                         },
    //                         { merge: true },
    //                     )
    //                     .then(async () => {
    //                         const useRef = await firestore().collection('Users')
    //                             .doc(user?.uid)
    //                         useRef.update({
    //                             'userDetails.AccountType': MembershipName,
    //                             'userDetails.PackageId': BuyMemberShips?.id,
    //                             'userDetails.MembershipDetails': updatedMembershipsDetail,
    //                         }).then(() => {
    //                             dispatch(packages(BuyMemberShips))
    //                             dispatch(Buypackages(''))
    //                             ToastAndroid.show(`${MembershipName} Membership hase been Purchased successfully`, ToastAndroid.SHORT)
    //                             // setLoading(true)
    //                             setShowModalContent({
    //                                 ...showModalContent,
    //                                 title: `${BuyMemberShips?.otherCategory}`,
    //                                 descrition: `${MembershipName} Membership hase been Purchased successfully`,
    //                                 type: 'Success'
    //                             })
    //                             setShowModal(true)
    //                             // console.log('Notices send!');
    //                             // navigation.navigate('PremiumMembershipScreen')
    //                             setUploading(false)
    //                             GetWalletAmount()
    //                         });

    //                     })
    //             } catch (e) {
    //                 setUploading(false)
    //                 Alert.alert('Error : ', e)
    //                 console.log(e);
    //             }
    //         }
    //         else {
    //             setShowModalContent({
    //                 ...showModalContent,
    //                 title: 'Insufficient Balance',
    //                 descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
    //                 type: 'InsufficientBalance'
    //             })
    //             setShowModal(true)
    //         }
    //     }

    //     // return
    //     // try {
    //     //     const ref = firestore().collection('Wallet').doc(user?.uid)
    //     //     const reftwo = await ref.get()
    //     //     if (reftwo?.exists) {
    //     //         const data = reftwo.data().PaymentDetails
    //     //     }
    //     //     else {
    //     //         setShowModalContent({
    //     //             ...showModalContent,
    //     //             title: 'Insufficient Balance',
    //     //             descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
    //     //             type: 'InsufficientBalance'
    //     //         })
    //     //         setShowModal(true)
    //     //     }
    //     // } catch (e) {
    //     //     console.log(e);
    //     // }

    //     // console.log(updatedMembershipsDetail);
    //     // return
    //     // setUploading(true)
    //     // try {
    //     //     const useRef = await firestore().collection('Users')
    //     //         .doc(user?.uid)
    //     //     useRef.update({
    //     //         'userDetails.AccountType': MembershipName,
    //     //         'userDetails.PackageId': BuyMemberShips?.id,
    //     //         'userDetails.MembershipDetails': updatedMembershipsDetail,
    //     //     }).then(() => {
    //     //         dispatch(packages(BuyMemberShips))
    //     //         dispatch(Buypackages(''))
    //     //         ToastAndroid.show(`${MembershipName} Membership hase been Purchased successfully`, ToastAndroid.SHORT)
    //     //         // console.log('Notices send!');
    //     //         navigation.navigate('PremiumMembershipScreen')
    //     //         setUploading(false)
    //     //     });
    //     // }
    //     // catch (e) {
    //     //     console.log(e);
    //     // }
    // }

    // const ShopeAgain = () => {
    //     if (AddToCard?.length > 0) {
    //         AddToCard?.map((e) => {
    //             dispatch(removeFromCart(e))
    //         })
    //         dispatch(TicketsAddtoCard(null))
    //         // console.log(AddToCard, '===> ')
    //         navigation?.navigate('Foodmenu', {
    //             EventsId: SelectedEvent,
    //         })
    //     }
    // }

    // const PayFlakeBillAmount = async () => {
    //     // console.log(FlakeBill?.Flake);
    //     // return
    //     if (SelectedPaymentCards?.length > 0) {
    //         if (FlakeBill) {
    //             const totalBalance = parseFloat(walletAmount?.totalBalance);
    //             const price = parseFloat(FlakeBill?.totalPricewithTaxes);
    //             if (totalBalance >= price) {
    //                 setUploading(true)
    //                 let walletData = {
    //                     expend: FlakeBill?.totalPricewithTaxes,
    //                     fare: 0,
    //                     currency: 'usd',
    //                     deposit: 0,
    //                     type: 'remove flake',
    //                     date: new Date().toString(),
    //                 };
    //                 // console.log(walletData);
    //                 // return
    //                 try {
    //                     await firestore()
    //                         .collection('Wallet')
    //                         .doc(user?.uid)
    //                         .set(
    //                             {
    //                                 wallet: firestore.FieldValue.arrayUnion(walletData),
    //                             },
    //                             { merge: true },
    //                         )
    //                         .then(async () => {
    //                             const number = FlakeBill?.Flake
    //                             // navigation.navigate('QuestionWantKidsScreen')
    //                             const userRef = await firestore().collection('Users')
    //                                 .doc(user.uid)
    //                             userRef.update({
    //                                 'userDetails.Flake': firestore.FieldValue.increment(-number),
    //                                 // 'userDetails.FlakeTime': FlakeBill?.FlakeTime
    //                             }).then(() => {
    //                                 setShowSuccessPoppup({
    //                                     ...showSuccessPoppup,
    //                                     Status: true,
    //                                     Title: 'Remove Flakes!',
    //                                     Detail: `Successfully: ${FlakeBill?.Flake} Flakes remove from your profile!!`,
    //                                 })
    //                                 // ToastAndroid.show(`Successfully: ${FlakeBill?.Flake} Flakes remove from your profile!!`, ToastAndroid.SHORT)
    //                                 dispatch(FlakesBill(null))
    //                                 // navigation.navigate('RemoveFlakeScreen')
    //                                 // console.log('Flake Added Delete!');
    //                                 // console.log(item);
    //                                 setUploading(false)
    //                                 GetWalletAmount()
    //                             });
    //                         })
    //                 } catch (e) {
    //                     setUploading(false)
    //                     Toast.show(`Error : ${e}`, Toast.LONG);
    //                     // Toast.
    //                 }
    //             }
    //             else {
    //                 setUploading(false)
    //                 setShowModalContent({
    //                     ...showModalContent,
    //                     title: 'Insufficient Balance',
    //                     descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
    //                     type: 'InsufficientBalance'
    //                 })
    //                 setShowModal(true)
    //             }
    //         }
    //         else {
    //             setUploading(false)
    //             ToastAndroid.show(`Network error please try agin!`, ToastAndroid.SHORT)
    //         }
    //     }
    //     else {
    //         Toast.show(`Please enter your payment card first`, Toast.LONG);
    //     }
    // }

    // const PayConciergeBillAmount = async () => {
    //     // console.log('hello', PaymentCardDetails?.stripeId, ConciergeRequestData?.price, ConciergeRequestData?.DateAndHoneyFee, ConciergeRequestData?.transactionFee);
    //     // return
    //     if (SelectedPaymentCards?.length > 0) {
    //         const totalBalance = parseFloat(walletAmount?.totalBalance);
    //         const price = parseFloat(ConciergeRequestData?.price);
    //         if (totalBalance >= price) {
    //             try {
    //                 setUploading(true)
    //                 const ref = firestore().collection('Requestes').doc(ConciergeRequestData?.sendto)
    //                 const documentSnapShot = await ref.get();
    //                 const requestData = {
    //                     display: true,
    //                     sendby: user?.uid,
    //                     sendto: ConciergeRequestData?.sendto,
    //                     servicetype: "Match coordinator",
    //                     type: 'Get',
    //                     status: false,
    //                     price: ConciergeRequestData?.price,
    //                     totalPricewithTaxes: ConciergeRequestData?.totalPricewithTaxes,
    //                     DateAndHoneyFee: ConciergeRequestData?.DateAndHoneyFee,
    //                     transactionFee: ConciergeRequestData?.transactionFee,
    //                     chargeid: PaymentCardDetails?.stripeId ? PaymentCardDetails?.stripeId : null,
    //                     // time: new Date().toString()
    //                 };
    //                 if (documentSnapShot?.exists) {
    //                     const dataArray = documentSnapShot?.data()?.MoreRequestes
    //                     const index = dataArray.findIndex(item => item.sendby == user?.uid);
    //                     if (index !== -1) {
    //                         dataArray[index] = {
    //                             ...dataArray[index], // Copy existing data
    //                             status: requestData.status, // Update status
    //                             display: requestData.display, // Update price
    //                             // You can update other fields here as well
    //                         };

    //                         await ref.update({
    //                             MoreRequestes: dataArray,
    //                         });
    //                     }
    //                     else {
    //                         await ref.update({
    //                             MoreRequestes: firestore.FieldValue.arrayUnion(requestData)
    //                         })
    //                     }
    //                     // setLoading(false)
    //                     // return
    //                 }
    //                 else {
    //                     await ref.set({
    //                         MoreRequestes: [requestData]
    //                     })
    //                 }
    //                 setUploading(false);
    //                 Toast.show(`Request sent to ${ConciergeRequestData?.mediatorName}`, Toast.LONG);
    //                 setShowModalContent({
    //                     ...showModalContent,
    //                     title: 'Request Sent!',
    //                     descrition: `Your request has been sent to ${ConciergeRequestData?.mediatorName} the Match Coordinator. Please wait for there response`,
    //                     type: 'Success',
    //                 })
    //                 setShowModal(true)
    //                 dispatch(ConciergeSendRequest(null))
    //                 GetWalletAmount()
    //             } catch (e) {
    //                 setUploading(false);
    //                 Toast.show(`Error : ${e}`, Toast.LONG)
    //                 // setLoading(false)
    //                 // setShowModal(false)
    //             }
    //         }
    //         else {
    //             setUploading(false)
    //             setShowModalContent({
    //                 ...showModalContent,
    //                 title: 'Insufficient Balance',
    //                 descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
    //                 type: 'InsufficientBalance'
    //             })
    //             setShowModal(true)
    //         }
    //     }
    //     else {
    //         Toast.show(`Please enter your payment card first`, Toast.LONG);
    //     }
    // }

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

    // const AdditionalPackagesFunc = async () => {
    //     // console.log(AdditionalPackag);
    //     // return
    //     if (SelectedPaymentCards?.length > 0) {
    //         setUploading(true)
    //         const totalBalance = parseFloat(walletAmount?.totalBalance);
    //         const price = parseFloat(AdditionalPackag?.Price);
    //         if (totalBalance >= price) {
    //             // console.log('hey', AdditionalPackag?.otherCategory);
    //             // return
    //             try {
    //                 let walletData = {
    //                     expend: AdditionalPackag?.Price,
    //                     fare: 0,
    //                     currency: 'usd',
    //                     deposit: 0,
    //                     type: AdditionalPackag?.otherCategory,
    //                     date: new Date().toString(),
    //                 };
    //                 await firestore()
    //                     .collection('Wallet')
    //                     .doc(user?.uid)
    //                     .set(
    //                         {
    //                             wallet: firestore.FieldValue.arrayUnion(walletData),
    //                         },
    //                         { merge: true },
    //                     )
    //                     .then(async () => {
    //                         SavePayCard(PaymentCardDetails)
    //                         const updatedMembershipsDetail = {
    //                             ...AdditionalPackag?.Prices,
    //                             limits: AdditionalPackag.limits,
    //                             time: new Date().toISOString(),
    //                             id: AdditionalPackag.id,
    //                             Title: AdditionalPackag.Title,
    //                         }
    //                         DownloadPdf(updatedMembershipsDetail)
    //                         const useRef = await firestore().collection('Users')
    //                             .doc(user?.uid)
    //                         {
    //                             updatedMembershipsDetail?.id == 5 ?
    //                                 useRef.update({
    //                                     // 'userDetails.AccountType': MembershipName,
    //                                     'userDetails.AdditionalPackageId': AdditionalPackag?.uid,
    //                                     'userDetails.FlakeInsurance': updatedMembershipsDetail,
    //                                 })
    //                                 :
    //                                 useRef.update({
    //                                     // 'userDetails.AccountType': MembershipName,
    //                                     'userDetails.AdditionalPackageId': AdditionalPackag?.uid,
    //                                     'userDetails.AdditionalPackageDetails': updatedMembershipsDetail,
    //                                 })
    //                         }
    //                         dispatch(AdditionalPackages(updatedMembershipsDetail))
    //                         dispatch(BuyAdditionalPackages(''))
    //                         ToastAndroid.show(`Additional Package for ${AdditionalPackag?.Title} hase been Purchased successfully`, ToastAndroid.SHORT)
    //                         setUploading(false)
    //                         setShowModalContent({
    //                             ...showModalContent,
    //                             title: `${AdditionalPackag?.Title}`,
    //                             descrition: `Additional Package for ${AdditionalPackag?.Title} hase been Purchased successfully.`,
    //                             type: 'Success'
    //                         })
    //                         setShowModal(true)
    //                         GetWalletAmount()
    //                     })
    //             }
    //             catch (e) {
    //                 console.log(e);
    //                 setUploading(false)
    //             }
    //         }
    //         else {
    //             setShowModalContent({
    //                 ...showModalContent,
    //                 title: 'Insufficient Balance',
    //                 descrition: `Your wallet does not have enough funds to complete this transaction. Please add funds to your wallet to proceed.`,
    //                 type: 'InsufficientBalance'
    //             })
    //             setShowModal(true)
    //             setUploading(false)
    //         }

    //     }
    //     else {
    //         setUploading(false)
    //         // SavePayCard(PaymentCardDetails)
    //     }

    // }

    // const updateObjectInArray = (array, newData) => {
    //     const index = array.findIndex((item) => item.paymentMethod === newData.paymentMethod);
    //     // array[index] = newData
    //     // console.log(array, newData);
    //     // return 
    //     if (index !== -1) {
    //         array[index].cardName = newData.cardName;
    //         array[index].cardNumber = newData.cardNumber;
    //         array[index].ExpMonth = newData.ExpMonth;
    //         array[index].ExpYear = newData.ExpYear;
    //         array[index].cvc = newData.cvc;
    //     }
    //     else {
    //         array.push(newData);
    //     }
    //     return array;
    // };

    const updateObjectInArrayTwo = (array, newData) => {
        const index = array.findIndex((item) => item?.cardNumber === newData?.cardNumber);

        if (index !== -1) {
            // Create a new array with the updated data
            return [
                ...array.slice(0, index), // Elements before the modified item
                {
                    ...array[index], // Existing properties of the item
                    ...newData // Properties from newData will overwrite existing ones
                },
                ...array.slice(index + 1) // Elements after the modified item
            ];
        } else {
            // If the item does not exist, add it to the array
            return [...array, newData];
        }
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

    const onApplyCouponThree = async () => {
        // console.log('admin', TicketAddToCard?.appliedPromo);
        // setUploadingTwo(false)
        // return
        if (!TicketAddToCard?.appliedPromo || TicketAddToCard?.appliedPromo == '') {
            try {
                const querySnapshot = await firestore().collection('SellTickets').doc(user?.uid).get();
                if (querySnapshot?.empty) {
                    console.log('empty');
                    setUploadingTwo(false)
                } else {
                    const ticketsHistory = querySnapshot.data()?.TicketsHistory || [];
                    if (ticketsHistory.some(
                        (item) =>
                            item?.TicketAddToCard?.euid === TicketAddToCard?.euid &&
                            item?.TicketAddToCard?.CouponCodeutilized === true &&
                            item?.TicketAddToCard?.CouponCode === applycopun
                    )) {
                        setUploadingTwo(false);
                        ToastAndroid.show(
                            'Sorry, this coupon code has already been used. Please try using a different code.',
                            ToastAndroid.SHORT
                        );
                        return;
                    }
                    if (promoterId?.discountPercent) {
                        const CheckUserPackage = promoterId?.validFor.some((j) => j?.pid == user?.PackageId)
                        // const totalAmount = TicketAddToCard?.membershipDiscount ? (TicketAddToCard?.Tickets?.pricePerTicket - TicketAddToCard?.membershipDiscount) : TicketAddToCard?.Tickets?.pricePerTicket;
                        // setUploadingTwo(false);
                        if (CheckUserPackage) {
                            const TransactionAmount = TicketAddToCard?.transactionFee;
                            // membershipDiscount = parseFloat((totalAmount * 5 / 100)).toFixed(2);

                            const appliedPromo = parseFloat((TransactionAmount * promoterId?.discountPercent) / 100).toFixed(2);
                            let sum = (TicketAddToCard?.totalPricewithTaxes - appliedPromo).toFixed(2);
                            // const promoterReward = parseFloat((data?.Tickets?.pricePerTicket * data?.promoterReward) / 100).toFixed(2);
                            // console.log('===:', appliedPromo, sum);
                            // return
                            // const result = parseFloat(totalAmount - appliedPromo).toFixed(2);
                            const updateTwo = {
                                ...TicketAddToCard,
                                totalPricewithTaxes: sum ? sum : null,
                                appliedPromo: appliedPromo ? appliedPromo : null,
                                appliedPromoPercent: promoterId?.discountPercent ? promoterId?.discountPercent : null,
                                promoterId: promoterId,
                                CouponCodeutilized: true,
                                CouponCode: applycopun ? applycopun : null,
                            };
                            // console.log('===>', updateTwo);
                            dispatch(TicketsAddtoCard(updateTwo));
                            ToastAndroid.show('Success: Coupon code applied successfully.', ToastAndroid.SHORT);
                            setUploadingTwo(false);
                            return
                            // return
                        }
                        else if (!CheckUserPackage) {
                            setUploadingTwo(false)
                            ToastAndroid.show('Coupon code not applicable.', ToastAndroid.SHORT);
                            setErrorApplyCoupon(true);
                            return
                        }

                    } else {
                        ToastAndroid.show('Coupon code already applied', ToastAndroid.SHORT);
                        setUploadingTwo(false);
                        return
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
            return
        }
        else {
            setUploadingTwo(false)
            ToastAndroid.show(`Promo code already applied`, ToastAndroid.SHORT);
        }
    }

    // useEffect(() => {
    //     // After ticket prices are updated, run the coupon check
    //     if (TicketAddToCard?.promoCode) {
    //         onApplyCouponAuto(TicketAddToCard?.promoCode);
    //     }
    // }, [isTicketPricesUpdated ,TicketAddToCard?.promoCode]); // This runs whenever `promoCode` in `TicketAddToCard` is updated




    // const onApplyCoupon = async () => {
    //     const today = new Date()
    //     if (TicketAddToCard) {
    //         // console.log(today.toLocaleDateString());
    //         if (applycopun) {
    //             setUploadingTwo(true)
    //             // return
    //             if (allAffiliateCode?.length > 0) {
    //                 let isValidCoupon = false;

    //                 allAffiliateCode?.map((item) => {
    //                     // const parts = item?.ExpireDate?.split("/");
    //                     // const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    //                     const [day, month, year] = item?.ExpireDate?.split("/").map(Number);
    //                     const currentDate = new Date();
    //                     const formattedDate = new Date(year, month - 1, day);

    //                     // console.log(item?.Eventid , TicketAddToCard?.euid , formattedDate >= today , item?.VipCode , applycopun)

    //                     if (item?.Eventid == TicketAddToCard?.euid && formattedDate >= today && item?.VipCode == applycopun && item?.StartDate && item?.type == 'event') {
    //                         // console.log(item?.Eventid == TicketAddToCard?.euid && formattedDate >= today && item?.VipCode == applycopun && item?.StartDate && item?.type == 'event');
    //                         // return
    //                         const parts2 = item?.StartDate?.split("/");
    //                         const formattedDate2 = new Date(`${parts2[2]}-${parts2[1]}-${parts2[0]}`);
    //                         if (formattedDate2 <= today) {
    //                             // console.log('hello');
    //                             isValidCoupon = true
    //                             setErrorApplyCoupon(false)
    //                             setPromoterId(item)
    //                             onApplyCouponThree();
    //                             return
    //                         }
    //                         return
    //                     }
    //                     if (item?.Eventid == TicketAddToCard?.euid && formattedDate >= today && item?.VipCode == applycopun) {
    //                         isValidCoupon = true;
    //                         setErrorApplyCoupon(false)
    //                         setPromoterId(item?.PromoterId ? item?.PromoterId : null)
    //                         // console.log(item);
    //                         onApplyCouponTwo();
    //                     }
    //                 });
    //                 if (!isValidCoupon) {
    //                     setUploadingTwo(false)
    //                     ToastAndroid.show('Coupon code not applicable.', ToastAndroid.SHORT);
    //                     setErrorApplyCoupon(true);
    //                 }
    //             }
    //             else {
    //                 setUploadingTwo(false)
    //                 ToastAndroid.show(`Coupon code not available.`, ToastAndroid.SHORT)
    //                 setErrorApplyCoupon(true)
    //             }
    //         }
    //         else {
    //             setUploadingTwo(false)
    //             ToastAndroid.show(`Coupon code cannot be empty!`, ToastAndroid.SHORT)
    //             setErrorApplyCoupon(true)
    //         }
    //     }
    // }


    const updateTicketPrices = () => {
        if (TicketAddToCard) {
            // console.log(user?.PackageId);
            const totalAmount = parseFloat(TicketAddToCard.totalPrice) || 0;
            // console.log(totalAmount, '======================');
            const feePercentage = 2.9;
            const additionalFee = 0.50;
            const DHFeePercentage = 7

            // Calculate the fee
            const Transfee = parseFloat((totalAmount * feePercentage / 100) + additionalFee).toFixed(2);
            const DAHfee = parseFloat((totalAmount * DHFeePercentage / 100)).toFixed(2);
            let membershipDiscount = 0;
            if (user?.PackageId == 123) {
                membershipDiscount = parseFloat((Transfee * 5 / 100)).toFixed(2);
            }
            else if (user?.PackageId == 456) {
                membershipDiscount = parseFloat((Transfee * 10 / 100)).toFixed(2);
            }
            else if (user?.PackageId == 654) {
                membershipDiscount = parseFloat((Transfee * 15 / 100)).toFixed(2);
            }
            // console.log(membershipDiscount, parseFloat(Transfee * 15 / 100).toFixed(2));

            const totalPriceWithTaxes = parseFloat((totalAmount + parseFloat(Transfee) + parseFloat(DAHfee)) - parseFloat(membershipDiscount)).toFixed(2);
            const formattedMembershipDiscount = membershipDiscount > 0 ? membershipDiscount : null;

            const update = {
                ...TicketAddToCard,
                totalPricewithTaxes: totalPriceWithTaxes,
                transactionFee: Transfee,
                DateAndHoneyFee: DAHfee,
                membershipDiscount: formattedMembershipDiscount,
            }
            // setTicketAddToCard(update)

            dispatch(TicketsAddtoCard(update))
            setIsTicketPricesUpdated(true);
        }
    }

    const updateTicketPriceswithPromo = () => {
        if (TicketAddToCard) {
            // console.log(user?.PackageId);
            const totalAmount = parseFloat(TicketAddToCard.totalPrice) || 0;
            // console.log(totalAmount, '======================');
            const feePercentage = 2.9;
            const additionalFee = 0.50;
            const DHFeePercentage = 7

            // Calculate the fee
            const Transfee = parseFloat((totalAmount * feePercentage / 100) + additionalFee).toFixed(2);
            const DAHfee = parseFloat((totalAmount * DHFeePercentage / 100)).toFixed(2);
            let membershipDiscount = 0;
            if (user?.PackageId == 123) {
                membershipDiscount = parseFloat((Transfee * 5 / 100)).toFixed(2);
            }
            else if (user?.PackageId == 456) {
                membershipDiscount = parseFloat((Transfee * 10 / 100)).toFixed(2);
            }
            else if (user?.PackageId == 654) {
                membershipDiscount = parseFloat((Transfee * 15 / 100)).toFixed(2);
            }
            // console.log(membershipDiscount, parseFloat(Transfee * 15 / 100).toFixed(2));

            const totalPriceWithTaxes = parseFloat((totalAmount + parseFloat(Transfee) + parseFloat(DAHfee)) - parseFloat(membershipDiscount)).toFixed(2);
            const formattedMembershipDiscount = membershipDiscount > 0 ? membershipDiscount : null;

            const updatedTicket = {
                ...TicketAddToCard,
                totalPricewithTaxes: totalPriceWithTaxes,
                transactionFee: Transfee,
                DateAndHoneyFee: DAHfee,
                membershipDiscount: formattedMembershipDiscount,
            }
            // setTicketAddToCard(update)
            onApplyCouponAuto(updatedTicket, TicketAddToCard?.promoCode)
            // setIsTicketPricesUpdated(true);
        }
    }
    const onApplyCouponAuto = async (updatedTicket, promoCode) => {
        const today = new Date();

        if (!updatedTicket || !promoCode) {
            setUploadingTwo(false);
            // ToastAndroid.show('Coupon code cannot be empty!', ToastAndroid.SHORT);
            console.log('Coupon code cannot be empty!');
            // setErrorApplyCoupon(true);
            return;
        }

        setUploadingTwo(true);

        if (!allAffiliateCode || allAffiliateCode.length === 0) {
            setUploadingTwo(false);
            // ToastAndroid.show('Coupon code not available.', ToastAndroid.SHORT);
            console.log('Coupon code not available.');
            // setErrorApplyCoupon(true);
            return;
        }

        let isValidCoupon = false;

        allAffiliateCode.forEach((item) => {
            const { Eventid, ExpireDate, VipCode, StartDate, type, PromoterId } = item;

            // Parse ExpireDate
            const [day, month, year] = ExpireDate.split("/").map(Number);
            const formattedExpireDate = new Date(year, month - 1, day);

            // Check if the coupon is valid for the event
            if (Eventid === updatedTicket?.euid && formattedExpireDate >= today && VipCode === promoCode) {
                isValidCoupon = true;
                setErrorApplyCoupon(false);
                setApplycopun(promoCode);
                setPromoterId(PromoterId || null);
                onApplyCouponTwo(updatedTicket, promoCode);
            }
        });

        if (!isValidCoupon) {
            setUploadingTwo(false);
            ToastAndroid.show('Coupon code not applicable.', ToastAndroid.SHORT);
            console.log('Coupon code not applicable.');
            // setErrorApplyCoupon(true);
        }
    };
    const onApplyCouponTwo = async (updatedTicket) => {
        // console.log(TicketAddToCard?.appliedPromo);
        if (updatedTicket?.appliedPromo) {
            setUploadingTwo(false);
            console.log('Discounted code already applied');
            // ToastAndroid.show('Discounted code already applied', ToastAndroid.SHORT);
            return;
        }

        try {
            const querySnapshot = await firestore().collection('SellTickets').doc(user?.uid).get();

            if (!querySnapshot.exists || !querySnapshot.data()?.TicketsHistory) {
                applyPromoCode(updatedTicket);

                return;
            }

            const ticketsHistory = querySnapshot.data().TicketsHistory;

            // Check if the coupon has already been used for this event
            const isCouponUsed = ticketsHistory.some(item =>
                item?.TicketAddToCard?.euid == TicketAddToCard?.euid &&
                item?.TicketAddToCard?.CouponCodeutilized == true &&
                item?.TicketAddToCard?.CouponCode == applycopun
            );

            if (isCouponUsed) {
                setUploadingTwo(false);
                ToastAndroid.show('Sorry, this coupon code has already been used. Please try using a different link.', ToastAndroid.SHORT);
                return;
            }

            // If the coupon hasn't been used, apply it
            applyPromoCode(updatedTicket);
        } catch (error) {
            setUploadingTwo(false);
            ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
        }
    };
    const applyPromoCode = async (updatedTicket) => {
        const ref = await firestore()
            .collection('PromoteEvents')
            .doc(updatedTicket?.euid).get()
        const refdoc = ref?.data()?.Promoters

        const querySnapshot = await firestore()
            .collection('Users')
            .where("userDetails.VipCode", '==', promoterId)
            .get();
        const userDetailsList = await Promise.all(querySnapshot.docs.map(async (doc) => {
            return doc.data()?.userDetails;
        }));
        const promoter = refdoc.find((res) => userDetailsList[0].uid == res?.promoterId)

        // console.log('jjello', refdoc , userDetailsList[0].VipCode);
        // return

        if (promoter?.discountedReferral) {
            const totalprice = updatedTicket?.totalPrice;
            const totalpriceWithtaxes = updatedTicket?.totalPricewithTaxes;
            const appliedPromo = parseFloat((totalprice * promoter?.discountedReferral) / 100).toFixed(2);
            const newTotalPrice = parseFloat(totalpriceWithtaxes - appliedPromo).toFixed(2);
            // console.log(newTotalPrice);
            const updateData = {
                ...updatedTicket,
                totalPricewithTaxes: newTotalPrice,
                appliedPromo: appliedPromo,
                promoterId: promoterId,
                CouponCodeutilized: true,
                CouponCode: applycopun,
                // membershipDiscount: update?.formattedMembershipDiscount,
            };
            // console.log(update?.formattedMembershipDiscount);
            // const update = {
            //     ...TicketAddToCard,
            //     totalPricewithTaxes: totalPriceWithTaxes,
            //     transactionFee: Transfee,
            //     DateAndHoneyFee: DAHfee,
            //     membershipDiscount: formattedMembershipDiscount,
            // }
            dispatch(TicketsAddtoCard(updateData));
            setUploadingTwo(false);
            ToastAndroid.show('Success: Discounted code applied successfully.', ToastAndroid.SHORT);
        } else {
            setUploadingTwo(false);
            // ToastAndroid.show('Coupon code already applied', ToastAndroid.SHORT);
        }
    };






    const GetAllAffiliateCode = async () => {
        const firestoreIp = await firestore().collection('AffiliateCode')
        // const querySnapshot = await firestore()
        // .collection('AffiliateCode')
        // .where('VipCode.Eventid', '==', TicketAddToCard?.uid)
        // .where('VipCode.PromoterId', '==', mediator?.userDetails?.VipCode)
        // .get()
        firestoreIp.onSnapshot(querSnapshot => {
            const data = []
            querSnapshot.forEach((documentSnapShot) => {
                data.push(documentSnapShot.data().VipCode)
            });
            setAllAffiliateCode(data)
        })
    }

    // const PaydepositAmount = async () => {
    //     // console.log('hey', PaymentCardDetails, depositAmount, SelectedPaymentCards);
    //     let customerData = new Object();
    //     customerData.amount = depositAmount?.Amount;
    //     customerData.customerId = PaymentCardDetails?.stripeId;
    //     // return
    //     if (SelectedPaymentCards?.length > 0) {
    //         setUploading(true)
    //         axios
    //             .post(`${Base_uri}dopayment`, customerData)
    //             .then(res => {
    //                 let data = res.data;
    //                 let { result, status } = data;
    //                 // console.log(data, 'dataaaaResponse');
    //                 if (!status) {
    //                     // setButtonLoader(false);
    //                     setUploading(false)
    //                     Toast.show(data.message, Toast.LONG);
    //                     return;
    //                 }
    //                 let walletData = {
    //                     expend: 0,
    //                     fare: 0,
    //                     currency: 'usd',
    //                     deposit: result.amount / 100,
    //                     date: new Date().toString(),
    //                 };
    //                 // console.log(walletData, 'walletData');
    //                 //   let id = auth().currentUser.uid;
    //                 try {
    //                     firestore()
    //                         .collection('Wallet')
    //                         .doc(user?.uid)
    //                         .set(
    //                             {
    //                                 wallet: firestore.FieldValue.arrayUnion(walletData),
    //                             },
    //                             { merge: true },
    //                         )
    //                         .then(() => {
    //                             setUploading(false)
    //                             setShowModalContent({
    //                                 ...showModalContent,
    //                                 title: 'Payment Successful',
    //                                 descrition: `Your payment has been successfully processed and the amount has been deposited into your account.`,
    //                                 type: 'Success'
    //                             })
    //                             setShowModal(true)
    //                             dispatch(DepositAmount(null))
    //                             GetWalletAmount()
    //                         })
    //                 }
    //                 catch (e) {
    //                     console.log(e);
    //                     setUploading(false)
    //                     Toast.show(`Error : ${e}`, Toast.LONG)
    //                 }
    //             })
    //             .catch(e => {
    //                 console.log('Eror :', e);
    //                 setUploading(false)
    //             })
    //     }
    //     else {
    //         setUploading(false)
    //         SavePayCard(PaymentCardDetails)
    //     }
    // }

    useEffect(() => {
        GetAllAffiliateCode();
    }, [focus])

    useEffect(() => {
        if (TicketAddToCard?.promoCode) {
            updateTicketPriceswithPromo();
            return
        }
        else {
            updateTicketPrices();
        }
    }, [focus])


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
        navigation?.navigate('EventTickets', { details: details })
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

                        <View>
                            {TicketAddToCard && TicketAddToCard?.promoCode ?
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
                                            editable={false}
                                        />
                                    </View>
                                    <View style={{
                                        width: '25%',
                                        height: 45,
                                        justifyContent: 'center',
                                        alignItems: 'flex-end',
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        backgroundColor: COLORS.green
                                    }}>
                                        <View
                                            // onPress={() => onApplyCoupon()}
                                            style={{
                                                paddingHorizontal: 20,
                                                paddingVertical: 10,
                                            }}>
                                            <Text style={{ color: COLORS.black, fontSize: 12 }}>Applied</Text>
                                        </View>

                                    </View>
                                </View>
                                : null
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
                                            <Text style={{ fontSize: 14, color: COLORS.black, marginRight: 5 }}>Ticket Price({TicketAddToCard?.Tickets?.qty})</Text>
                                            {/* <SVGNotify width={15} height={15} onPress={() => setTaxes(true)} /> */}
                                        </View>
                                        <Text style={{ fontSize: 14, color: COLORS.black }}>${TicketAddToCard?.totalPrice ? TicketAddToCard?.totalPrice : '00'}</Text>
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
                                            <Text style={{ fontSize: 14, color: COLORS.black, marginRight: 5 }}>Service Fee</Text>
                                            <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('TransactionFee') }} />
                                        </View>
                                        <Text style={{ color: COLORS.green, fontSize: 14 }}>${TicketAddToCard?.transactionFee ? TicketAddToCard?.transactionFee : '00'}</Text>
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
                                            <Text style={{ fontSize: 14, color: COLORS.black, marginRight: 5 }}>Dates and Honey Fee</Text>
                                            <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('DAHFee') }} />
                                        </View>
                                        <Text style={{ fontSize: 14, color: COLORS.green }}>${TicketAddToCard?.DateAndHoneyFee ? TicketAddToCard?.DateAndHoneyFee : '00'}</Text>
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
                                                <Text style={{ fontSize: 14, color: COLORS.black, marginRight: 5 }}>Promo or discount applied</Text>
                                                <Text style={{ fontSize: 14, color: COLORS.black }}>{TicketAddToCard?.appliedPromoPercent ? TicketAddToCard?.appliedPromoPercent : TicketAddToCard?.discountedReferral}%</Text>
                                                {/* <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('DAHFee') }} /> */}
                                            </View>
                                            <Text style={{ fontSize: 14, color: COLORS.black }}>-${TicketAddToCard?.appliedPromo ? TicketAddToCard?.appliedPromo : '00'}</Text>
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
                                                <Text style={{ fontSize: 14, color: COLORS.black, marginRight: 5 }}>Membership Discount</Text>
                                                <Text style={{ fontSize: 14, color: COLORS.black }}>
                                                    {user?.PackageId == 123 ? '5' : user?.PackageId == 456 ? '10' : user?.PackageId == 654 ? '15' : null}%
                                                </Text>
                                                {/* <SVGNotify width={15} height={15} onPress={() => { setTaxes(true), setTaxesType('DAHFee') }} /> */}
                                            </View>
                                            <Text style={{ fontSize: 14, color: COLORS.black }}>-${TicketAddToCard?.membershipDiscount}</Text>
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
                                        <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>${TicketAddToCard?.totalPricewithTaxes ? TicketAddToCard?.totalPricewithTaxes : '00'}</Text>
                                    </View>
                                </View>}

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
                                {TicketAddToCard &&
                                    <CustomeButton onpress={() => PayAmount()}
                                        title={`Pay Amount $${TicketAddToCard?.totalPricewithTaxes ? TicketAddToCard?.totalPricewithTaxes : TicketAddToCard?.totalPrice}`} width={width / 1.2} />
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

            {/* <Modal
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
            </Modal> */}

            {/* <Loader modal={loading} uploading={} /> */}
        </SafeAreaView>
    )
}

export default CheckoutScreenEvent

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