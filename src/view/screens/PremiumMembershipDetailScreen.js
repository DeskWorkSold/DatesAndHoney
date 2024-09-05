import { Alert, Dimensions, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { useState } from 'react';
import COLORS from '../../consts/Colors';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Buypackages, packages, selectAffiliatePrices, selectPaymentCards, selectUser } from '../../../redux/reducers/Reducers';
import CustomeButton from '../components/CustomeButton';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import RNRestart from 'react-native-restart';
import { ActivityIndicator } from 'react-native-paper';
import {
    requestPurchase,
    finishTransaction,
    purchaseUpdatedListener,
    purchaseErrorListener,
    requestSubscription
} from "react-native-iap";
import { useEffect } from 'react';
const { width, height } = Dimensions.get("window");


const Slide = ({ item }) => {
    return (
        <View style={{
            alignSelf: 'center',
            alignItems: 'center',
            height: height * 0.40,
            width: width,
            marginTop: '10%',
            backgroundColor: COLORS.white
        }}>
            <View style={{
                backgroundColor: COLORS.white,
                // alignItems: 'center',
                elevation: 5,
                marginVertical: 10,
                alignContent: 'center',
                borderRadius: 80,
                height: height / 9,
                width: width / 4.5,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image source={{ uri: item?.image }}
                    style={{ height: 50, width: 50, resizeMode: 'contain' }}
                />
            </View>
            <Text style={styles.title}>
                {item.name}
            </Text>
            <Text style={styles.subtitle}>
                {item.Details}
            </Text>
        </View>
    )
}

const PremiumMembershipDetailScreen = ({ navigation, route }) => {
    const { data, data2 } = route?.params;
    const pricing = data2?.subscriptionOfferDetails
    // console.log(pricing[0].pricingPhases, '000');
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [selectMemberships, setSelectMemberships] = useState(null);
    const [loading, setLoading] = useState(false);
    const PaymentCards = useSelector(selectPaymentCards)
    const ref = React.useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const AffiliatePrices = useSelector(selectAffiliatePrices)
    var test


    // console.log(data?.id, user?.PackageId);
    const Footer = () => {
        return (
            <View style={{
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                // height: height * 0.60,
                backgroundColor: COLORS.white

            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                    {data?.Service1.map((_, index) => (
                        <View key={index} style={[styles.indicator,
                        currentSlideIndex == index && {
                            backgroundColor: COLORS.main,
                            width: 25,
                        },
                        ]} />
                    ))
                    }
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: "space-between",
                        width: '100%',
                        paddingHorizontal: 10,
                    }}>
                        {pricing?.map((item, index) => {
                            // console.log(user?.MembershipDetails?.id, item?.id, data?.id, user?.PackageId);
                            // console.log(item?.pricingPhases.pricingPhaseList[0]);
                            const unlimited = item?.pricingPhases.pricingPhaseList[0]
                            return (
                                <View
                                    key={index}
                                    style={{
                                        marginTop: 20,
                                        // width: width / 2.5,
                                        marginHorizontal: 5,
                                        // opacity: user?.MembershipDetails?.id == item?.id && data?.id == user?.PackageId ? 0.7 : 1,
                                        // backgroundColor:COLORS.gray
                                    }}>
                                    <View style={{
                                        // bottom:-5,
                                        // width: '60%',
                                        backgroundColor: COLORS.main,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        padding: 5,
                                        paddingHorizontal: 10,
                                        borderRadius: 10,
                                    }}>
                                        {item?.basePlanId == 'diamondsubscriptionunlimited' ?
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 12
                                            }}>Limited Time Offer</Text>
                                            :
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 12,
                                            }}>On Sale</Text>
                                        }
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => loading ? null : [onSelectMembership(item), setSelectMemberships(item)]}
                                        style={{
                                            top: -8,
                                            borderWidth: 1,
                                            // elevation: 5,
                                            borderColor: COLORS.main,
                                            width: item?.basePlanId == 'diamondsubscriptionunlimited' ? width / 1.5 : width / 2.5,
                                            paddingHorizontal: 30,
                                            // paddingHorizontal:100,
                                            backgroundColor: COLORS.transparent,
                                            height: height / 5,
                                            // paddingVertical:20,
                                            borderRadius: 20,
                                            // paddingHorizontal: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        {item?.basePlanId == 'diamondsubscriptionunlimited' ?
                                            <View style={{
                                                // width:'70%'
                                            }}>
                                                <View>
                                                    <Text style={{
                                                        // width:'50%',
                                                        color: COLORS.black,
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}>{unlimited?.formattedPrice} for Year</Text>
                                                </View>
                                                <View >
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: COLORS.gray,
                                                        textAlign: 'center',
                                                        // width:'50%'
                                                    }}>
                                                        Auto entered into Diamond + club
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: COLORS.gray,
                                                        textAlign: 'center',
                                                        // width:'50%'
                                                    }}>
                                                        Note: Concierge service is free for 1 year, after it will cost $20/ month
                                                    </Text>
                                                </View>
                                            </View>
                                            :
                                            <View>
                                                <View>
                                                    <Text style={{
                                                        color: COLORS.gray,
                                                        fontSize: 12,
                                                        // textDecorationLine: 'line-through',
                                                        textDecorationStyle: 'solid',
                                                        textAlign: 'center'
                                                    }}>{item?.pricingPhases?.pricingPhaseList[0]?.priceCurrencyCode}</Text>
                                                </View>
                                                <View>
                                                    <Text style={{
                                                        color: COLORS.black,
                                                        fontSize: 20,
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}>{item?.pricingPhases?.pricingPhaseList[0]?.formattedPrice}</Text>
                                                </View>
                                                <View>
                                                    {index == 0 &&
                                                        <Text style={{
                                                            color: COLORS.gray,
                                                            fontSize: 16,
                                                            textAlign: 'center'
                                                        }}>One Month</Text>
                                                    }
                                                    {index == 1 &&
                                                        <Text style={{
                                                            color: COLORS.gray,
                                                            fontSize: 16,
                                                            textAlign: 'center'
                                                        }}>One Year</Text>
                                                    }
                                                </View>
                                            </View>
                                        }
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>

                {/* {selectMemberships &&
                    <TouchableOpacity
                        // onPress={() => ByMemeberShips()}
                        style={{
                            backgroundColor: COLORS.main,
                            width: width / 1.1,
                            height: 50,
                            borderRadius: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            elevation: 0,
                            borderColor: COLORS.transparent,
                        }}>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: 16,
                        }}>${selectMemberships.rate} Buy Now</Text>
                    </TouchableOpacity>
                }

                {!selectMemberships && user?.PackageId &&
                    <View style={{
                        alignSelf: 'center',
                        marginTop: 20
                    }}>
                        <CustomeButton title={loading ? <ActivityIndicator color={COLORS.white} size={'small'} animating={loading} /> : `Cancle ${user?.AccountType} Membership`} bcolor={'red'} color={COLORS.white} onpress={() => Alert.alert(
                            'Cancel Membership',
                            'Are you sure you want to cancel your membership?',
                            [
                                {
                                    text: 'No, Keep Membership',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Yes, Cancel',
                                    // onPress: () => CancleMembership(),
                                },
                            ],
                            { cancelable: false }
                        )} />
                    </View>
                } */}
            </View>
        )
    }
    const fetchExchangeRates = async () => {
        // Fetch exchange rates from the API
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }
            const data = await response.json();
            // console.log(data?.rates);
            return data.rates;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            return {}; // Return empty object or handle error as needed
        }
    }
    const convertPriceToUSD = async (priceAmount, currencyCode) => {
        // Fetch exchange rates
        const exchangeRates = await fetchExchangeRates()
            .then(rates => {
                // console.log(rates);
                const exchangeRate = rates[currencyCode]; // Get exchange rate for the given currency code
                const priceInUSD = priceAmount / exchangeRate;
                // console.log(priceInUSD.toFixed(2), priceAmount, exchangeRate);
                return priceInUSD.toFixed(2);
                // Now you can use the exchange rates data here
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
            });
        return exchangeRates
        // console.log(exchangeRates);
        // Convert price to USD
    }


    const MemeberShipBysuccessfully = async (item) => {
        try {
            const prices = item?.pricingPhases?.pricingPhaseList[0];
            const priceInMicros = parseFloat(prices?.priceAmountMicros);
            const priceInCurrency = priceInMicros / 1000000;
            const priceInUSD = await convertPriceToUSD(priceInCurrency, prices?.priceCurrencyCode);

            const PackageId = data2?.productId == 'silversubscription1' ? 123 : data2?.productId == 'goldsubscription1' ? 456 : 654;
            const MembershipName = data2?.name.split(' ')[0];
            const billingPeriodId = prices?.billingPeriod == "P1M" ? '1' : prices?.billingPeriod == "P1Y" ? '2' : '3';
            const billingPeriod = prices?.billingPeriod == "P1M" ? '1 month' : prices?.billingPeriod == "P1Y" ? '1 year' : 'unlimited';

            const updatedMembershipsDetail = {
                id: item?.basePlanId == 'diamondsubscriptionunlimited' ? '3' : billingPeriodId,
                subscriptionid: data2?.productId,
                limits: item?.basePlanId == 'diamondsubscriptionunlimited' ? 'unlimited' : billingPeriod,
                rate: priceInUSD.toString(),
                time: new Date().toISOString(),
                basePlanId: item?.basePlanId
            };

            await firestore().collection('Users').doc(user?.uid).update({
                'userDetails.AccountType': MembershipName,
                'userDetails.PackageId': PackageId?.toString(),
                'userDetails.MembershipDetails': updatedMembershipsDetail,
            });

            // Update referral program, dispatch actions, and show success message
            await updateRefferalProgram(updatedMembershipsDetail);
            dispatch(packages(updatedMembershipsDetail));
            dispatch(Buypackages(''));
            ToastAndroid.show(`${MembershipName} Membership has been purchased successfully`, ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error during membership purchase:', error.message);
            ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
        }
    }

    const updateRefferalProgram = async (data) => {
        // console.log(AffiliatePrices?.tairFour?.percent, AffiliatePrices?.tairThree?.percent, AffiliatePrices?.tairTwo?.percent, AffiliatePrices?.tairOne?.percent);
        // return
        const tenPercent = (AffiliatePrices?.tairOne?.percent / 100) * data?.rate;
        const fivePercent = (AffiliatePrices?.tairTwo?.percent / 100) * data?.rate;
        const ninePercent = (AffiliatePrices?.tairFour?.percent / 100) * data?.rate;
        const twofivePercent = (AffiliatePrices?.tairThree?.percent / 100) * data?.rate;
        // parseFloat((totalAmount * 7.5 / 100)).toFixed(2)
        // console.log('reeferal programs', tenPercent, ninePercent, fivePercent, twofivePercent);
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

    const onSelectMembership = async (item) => {
        try {
            test = item;
            const offerToken = item.offerToken;
            const sku = data2?.productId;

            const purchase = await requestSubscription({
                sku,
                ...(offerToken && {
                    subscriptionOffers: [{ sku, offerToken }],
                }),
            });

            // The purchase is successful, finish the transaction and update user data
            if (purchase) {
                await finishTransaction({ purchase, isConsumable: false });
                await MemeberShipBysuccessfully(item);
            }
        } catch (error) {
            console.error("An error occurred while making purchase:", error);
            // ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
        }

    }
    // const CancleMembership = async () => {
    //     setLoading(true)
    //     try {
    //         const userRef = await firestore().collection('Users')
    //             .doc(user.uid)
    //         userRef.update({
    //             'userDetails.AccountType': null,
    //             'userDetails.PackageId': null,
    //             'userDetails.MembershipDetails': null,
    //             // 'userDetails.FlakeTime': FlakeBill?.FlakeTime
    //         }).then(() => {
    //             Toast.show(`Membership cancle successfully`, Toast.LONG);
    //             setLoading(false)
    //             RNRestart.Restart()
    //             // navigation.goBack()
    //         })
    //     } catch (e) {
    //         setLoading(false)
    //         Toast.show(`Error: ${e}`, Toast.LONG);
    //     }
    // }



    const UpdateCurrentSlidesIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        // console.log(contentOffsetX)
        const currentIndex = Math.round(contentOffsetX / width);
        // console.log(currentIndex)
        setCurrentSlideIndex(currentIndex)
    }

    useEffect(() => {
        // const purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
        //     if (purchase.purchaseStateAndroid === 'Purchased') {
        //       // Purchase successful, grant access to the purchased item
        //       console.log('Purchase successful:', purchase.productId);
        //     } else if (purchase.purchaseStateAndroid === 'Restored') {
        //       // Purchase restored, grant access to the restored item
        //       console.log('Purchase restored:', purchase.productId);
        //     }
        //   });
        const purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
            const receipt = purchase.transactionReceipt;
            if (receipt) {
                try {
                    await finishTransaction({ purchase, isConsumable: false });
                    await MemeberShipBysuccessfully(test);
                } catch (error) {
                    console.error("An error occurred while completing transaction", error);
                }
            }
        });

        const purchaseErrorSubscription = purchaseErrorListener((error) =>
            console.error('Purchase error', error.message));


        return () => {
            purchaseUpdateSubscription.remove();
            purchaseErrorSubscription.remove();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={{
                backgroundColor: COLORS.white,
                // flex: 1,
                // justifyContent: "center"
                // marginVertical:20
            }}>
                <View style={{
                    width: width / 1.1,
                    alignSelf: 'center',
                    // backgroundColor:COLORS.main,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // heightL: 70,
                    paddingVertical: 10,
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            flex: 1,
                        }}>
                        <Image source={require('../../assets/close.png')} resizeMode='contain' style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.black
                        }} />
                    </TouchableOpacity>
                    <View style={{
                        flex: 4,
                        // backgroundColor:COLORS.black,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: COLORS.black
                        }}>{data2?.name}</Text>
                        {/* {data?.id == 123 &&
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Silver Level</Text>
                        }
                        {data?.id == 456 &&
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Gold Level</Text>
                        }
                        {data?.id == 654 &&
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Diamond Level</Text>
                        } */}
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                    </View>
                </View>
                <FlatList
                    ref={ref}
                    onMomentumScrollEnd={UpdateCurrentSlidesIndex}
                    pagingEnabled
                    data={data?.Service1}
                    contentContainerStyle={{ height: height * 0.45 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slide item={item} />} />
                <Footer />
            </View>
        </SafeAreaView>

    )
}


export default PremiumMembershipDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        fontSize: 16,
        marginTop: 20,
        color: COLORS.black,
        fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: '50%',
        fontFamily: 'Poppins',
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: 12,
        marginTop: 10,
        maxWidth: '50%',
        textAlign: 'center',
        fontFamily: 'Roboto',
        lineHeight: 23,
    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: COLORS.light,
        marginHorizontal: 3,
        borderRadius: 2,
    },
    // btn: {
    //     flex: 1,
    //     height: 50,
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderColor: COLORS.main,
    //     backgroundColor: COLORS.transparent,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // btn2: {
    //     flex: 1,
    //     height: 50,
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderColor: COLORS.main,
    //     backgroundColor: COLORS.main,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // }
})