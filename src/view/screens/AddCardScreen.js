import { TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView, ToastAndroid, Dimensions, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from 'react-redux';
import { PaymentCardDetails, PaymentCards, selectPaymentCardDetails, selectPaymentCards, selectPaymentMethod, selectUser } from '../../../redux/reducers/Reducers';
import axios from 'axios';
import { useStripe, CardField, CardForm, initPaymentSheet } from '@stripe/stripe-react-native';
import { initStripe } from '@stripe/stripe-react-native';
import { Base_uri } from '../../consts/Base_uri';
import { useEffect } from 'react';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window')

const AddCardScreen = ({ navigation, route }) => {
    // console.log(paymentMethod);
    const data = route?.params?.data
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const { createToken } = useStripe();
    const PaymentMethod = useSelector(selectPaymentMethod);
    const user = useSelector(selectUser)
    // console.log(data);
    const [allCardDetail, setAllDardDetails] = useState(null);
    const [cardHolder, setCardHolder] = useState(data?.cardNumber ? data?.cardNumber : null);
    const [cardName, setCardName] = useState(data?.cardName ? data?.cardName : null); //initial choice
    const [ExpDate, setExpDate] = useState(null);
    const [ExpMonth, setExpMonth] = useState(data?.ExpMonth ? data?.ExpMonth : null);
    const [ExpYear, setExpYear] = useState(data?.ExpYear ? data?.ExpYear : null);
    const [DateVisibility, setDateVisibility] = useState(false);
    const [cvc, setCvc] = useState(data?.cvc ? data?.cvc : null);
    const [InputcardHolder, setInputCardHolder] = useState(false);
    const [InputcardName, setInputCardName] = useState(false); //initial choice
    const [InputExpMonth, setInputExpMonth] = useState(false);
    const [InputExpYear, setInputExpYear] = useState(false);
    const [Inputcvc, setInputCvc] = useState(false);
    const [creatStripCompelet, setCreatStripCompelet] = useState(false);
    const dispatch = useDispatch();
    const userPaymentCards = useSelector(selectPaymentCards)
    // console.log(userPaymentCards);
    // const fetchPaymentSheetParams = async () => {
    //     try {
    //         const token = await createToken({
    //             type: 'Card',
    //             // card: allCardDetail,
    //             card: {
    //                 "brand": "Visa",
    //                 "complete": true,
    //                 "expiryMonth": ExpMonth,
    //                 "expiryYear": ExpYear,
    //                 "last4": cardHolder.slice(-4),
    //                 "validCVC": "Valid",
    //                 "validExpiryDate": "Valid",
    //                 "validNumber": "Valid"
    //             }
    //         })
    //         // console.log('Toke here ===> :', token.token.id);
    //         axios
    //             .post(`${Base_uri}createCustomer`, { token: token.token.id })
    //             .then(response => {
    //                 let { data } = response;
    //                 if (data?.status) {
    //                     console.log(data.customerId);
    //                     let savedCards = {
    //                         cardDetail: token,
    //                         otherDetails,
    //                         default: true,
    //                         token: token.id,
    //                         customerId: data?.customerId,
    //                         customerDetail: data?.customerDetail,
    //                     };

    //                     let id = auth().currentUser.uid;
    //                     firestore()
    //                         .collection('passengerCards')
    //                         .doc(id)
    //                         .set(
    //                             {
    //                                 savedCards: firestore.FieldValue.arrayUnion(savedCards),
    //                             },
    //                             { merge: true },
    //                         )
    //                         .then(res => {
    //                             //   setLoader(false);
    //                             //   setSavedCards(true);
    //                             ToastAndroid.show(
    //                                 language == 'english'
    //                                     ? english.cardVerified
    //                                     : slovak.cardVerified,
    //                                 ToastAndroid.SHORT,
    //                             );
    //                         })
    //                         .catch(error => {
    //                             //   setLoader(false);
    //                             ToastAndroid.show(error.message, ToastAndroid.SHORT);
    //                         });
    //                 }
    //             })
    //             .catch(error => {
    //                 // setLoader(false);
    //                 console.log('posterror : ', error);
    //             });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    const stripe = useStripe()
    const CreateStripUser = async (props) => {
        let Data = new Object();
        Data.cardName = cardName
        Data.cardNumber = allCardDetail?.last4
        Data.ExpMonth = allCardDetail?.expiryMonth
        Data.ExpYear = allCardDetail?.expiryYear
        Data.cvc = allCardDetail?.validCVC
        // console.log('testing...');
        // return
        try {
            const ref = firestore().collection('PaymentCards').doc(user?.uid)

            const token = await createToken({
                type: 'Card',
                card: allCardDetail,
            })
                .then(res => {
                    // console.log('====> :', res);
                    if (!res?.error) {
                        let token = res?.token;
                        axios
                            .post(`${Base_uri}createCustomer`, { token: token?.id })
                            .then(response => {
                                let { data } = response;
                                console.log(data, '===>');
                                if (data?.status) {
                                    // console.log('===> :',data.customerId);
                                    const update = {
                                        ...Data,
                                        stripeId: data.customerId
                                    }
                                    if (props == 'SecondTime') {
                                        ref.update({
                                            PaymentCardDetails: firestore.FieldValue.arrayUnion(update),
                                            uid: user?.uid
                                        })
                                        setLoading(false)
                                        setCreatStripCompelet(true)
                                        Toast.show(`Payment Card Save Success!`, Toast.LONG, {
                                            backgroundColor: 'green',
                                        });
                                        dispatch(PaymentCards([update]))
                                        // dispatch(PaymentCardDetails(update))
                                        console.log('card details', update);
                                        navigation.navigate('Home')
                                    }
                                    else if (props == 'firstTime') {
                                        ref.set({
                                            PaymentCardDetails: [update],
                                            uid: user?.uid
                                        })
                                        setLoading(false)
                                        setCreatStripCompelet(true)
                                        dispatch(PaymentCards([update]))
                                        // dispatch(PaymentCardDetails(update))
                                        // console.log('hello');
                                        console.log('card details', update);
                                        // navigation.goBack()
                                        navigation.navigate('Home')

                                    }
                                    // let savedCards = {
                                    //     cardDetail: token,
                                    //     otherDetails,
                                    //     default: true,
                                    //     token: token.id,
                                    //     customerId: data?.customerId,
                                    //     customerDetail: data?.customerDetail,
                                    // };

                                    // let id = auth().currentUser.uid;
                                    // firestore()
                                    //     .collection('passengerCards')
                                    //     .doc(id)
                                    //     .set(
                                    //         {
                                    //             savedCards: firestore.FieldValue.arrayUnion(savedCards),
                                    //         },
                                    //         { merge: true },
                                    //     )
                                    //     .then(res => {
                                    //         //   setLoader(false);
                                    //         //   setSavedCards(true);
                                    //         ToastAndroid.show(
                                    //             language == 'english'
                                    //                 ? english.cardVerified
                                    //                 : slovak.cardVerified,
                                    //             ToastAndroid.SHORT,
                                    //         );
                                    //     })
                                    //     .catch(error => {
                                    //         //   setLoader(false);
                                    //         ToastAndroid.show(error.message, ToastAndroid.SHORT);
                                    //     });
                                }
                                else if (!data?.status) {
                                    Toast.show(`Error : ${data?.error?.decline_code}`, Toast.LONG);
                                    setLoading(false)
                                }
                            })
                            .catch(error => {
                                setLoading(false)
                                // setLoader(false);
                                console.log('ServerError : ', error);
                                Toast.show(`Error : ${error}`, Toast.LONG);
                            });
                    }
                    else {
                        Toast.show(`Error : ${res?.error?.localizedMessage}`, Toast.LONG);
                        setLoading(false)
                        return
                    }
                })
                .catch(res => {
                    console.log('Error :', red);
                    setLoading(false)
                })
        } catch (e) {
            setLoading(false)
            console.log(e);
            Toast.show(`Error : ${e}`, Toast.LONG);
        }
    }

    const OnPaymentScreen = async () => {
        // console.log(allCardDetail, userPaymentCards);
        // return
        setLoading(true)
        if (allCardDetail && cardName) {
            if (userPaymentCards?.length > 0) {
                const doesExist = userPaymentCards.some(item => item.cardNumber == allCardDetail?.last4);
                // console.log(doesExist);
                if (doesExist) {
                    Toast.show(`This card already in used please enter new card details!`, Toast.LONG);
                    setLoading(false)
                }
                else {
                    CreateStripUser('SecondTime')
                }
            }
            else {
                CreateStripUser('firstTime')
            }
        }
        else {
            if (!cardName) {
                Toast.show(`Please enter card holder name!`, Toast.LONG);
                setInputCardName(true)
                setLoading(false)
            }
            else if (!allCardDetail) {
                Toast.show(`Please enter card details!`, Toast.LONG);
                setLoading(false)
            }
            setLoading(false)
        }

        return
        if (!cardName || !cardHolder || cardHolder?.length < 16 || cardHolder?.length > 16 || !ExpMonth || ExpMonth > 12 || !ExpYear || ExpYear?.length > 2 || !cvc) {
            if (!cardName) {
                ToastAndroid.show("Please enter card holder name!", ToastAndroid.SHORT);
                setInputCardName(true)
            }
            else if (!cardHolder || cardHolder?.length < 16 || cardHolder?.length > 16) {
                if (!cardHolder) {
                    ToastAndroid.show("Please enter card number!", ToastAndroid.SHORT);
                    setInputCardHolder(true)
                }
                else if (cardHolder?.length < 16 || cardHolder?.length > 16) {
                    ToastAndroid.show("Card number must be in 16 digits!!", ToastAndroid.SHORT);
                    setInputCardHolder(true)
                }
            }
            else if (!ExpMonth) {
                ToastAndroid.show("Please enter card expiry month!", ToastAndroid.SHORT);
                setInputExpMonth(true)
            }
            else if (ExpMonth > 12) {
                ToastAndroid.show("Please enter valid expiry month which is 12 or less!", ToastAndroid.SHORT);
                setInputExpMonth(true)
            }
            else if (!ExpYear) {
                ToastAndroid.show("Please enter card expiry year!", ToastAndroid.SHORT);
                setInputExpYear(true)
            }
            else if (ExpYear?.length > 2) {
                ToastAndroid.show("Please enter card valid expiry year in two digits!", ToastAndroid.SHORT);
                setInputExpYear(true)
            }
            else if (!cvc) {
                ToastAndroid.show("Please enter card cvc number!", ToastAndroid.SHORT);
                setInputCvc(true)
            }
        }
        else {

            let Data = new Object();
            Data.cardName = cardName
            Data.cardNumber = cardHolder
            Data.ExpMonth = ExpMonth
            Data.ExpYear = ExpYear
            Data.cvc = cvc


            // dispatch(PaymentCardDetails(Data))
            // console.log('hello');
            // navigation.navigate('CheckoutScreen')
        }
    }


    const showDateModal = () => {
        setDateVisibility(true);
    }
    const hideDiscountStartDatePicker = () => {
        setDateVisibility(false);
    };
    const handleDiscountConfirmStartDate = date => {
        setExpDate(moment(date).format('MM/DD/yy'));
        // console.warn('A date has been picked: ', date);
        // let data = new Date(date + "Z");

        // setExpDate(data);
        // hideDiscountStartDatePicker();
    };

    const fetchCardDetails = (cardDetails) => {
        if (cardDetails.complete) {
            setAllDardDetails(cardDetails)
            // CardField will automatically update the card details
            // However, you can also update your custom input fields here
            setCardHolder(cardDetails.number);
            setExpMonth(cardDetails.expiryMonth);
            setExpYear(cardDetails.expiryYear);
            setCvc(cardDetails.cvc);
        }
        else {
            setAllDardDetails(null)
            // CardField will automatically update the card details
            // However, you can also update your custom input fields here
            // setCardName(null);
            setCardHolder(null);
            setExpMonth(null);
            setExpYear(null);
            setCvc(null);
        }
    }


    useEffect(() => {
        // initializePaymentSheet();
        async function initialize() {
            await initStripe({
                publishableKey:
                    'pk_live_51NSEnYKK582q5wyAXZvmsElHHqPLAgqGckDA6hB56kmzGcc2mQhztlKFLCPr4WFedryOQphLPzD1DlAgqawX8UHe00CFeb967F',
            });
        }
        initialize().catch(console.error);
    }, []);



    // const fetchPaymentSheetParams = async () => {
    //     const response = await fetch(`${Base_uri}/payment-sheet`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     const { paymentIntent, ephemeralKey, customer } = await response.json();

    //     return {
    //         paymentIntent,
    //         ephemeralKey,
    //         customer,
    //     };
    // };

    // const initializePaymentSheet = async () => {
    //     const {
    //         paymentIntent,
    //         ephemeralKey,
    //         customer,
    //         publishableKey,
    //     } = await fetchPaymentSheetParams();

    //     const { error } = await initPaymentSheet({
    //         merchantDisplayName: "Example, Inc.",
    //         customerId: customer,
    //         customerEphemeralKeySecret: ephemeralKey,
    //         paymentIntentClientSecret: paymentIntent,
    //         // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
    //         //methods that complete payment after a delay, like SEPA Debit and Sofort.
    //         allowsDelayedPaymentMethods: true,
    //         defaultBillingDetails: {
    //             name: 'Jane Doe',
    //         }
    //     });
    //     if (!error) {
    //         setLoading(true);
    //     }
    // };
    // const openPaymentSheet = async () => {
    //     // const { error } = await initializePaymentSheet();
    //     const { error } = await initPaymentSheet({
    //         merchantDisplayName: "Example, Inc.",
    //         defaultBillingDetails: {
    //             email: 'foo@bar.com',
    //             address: {
    //                 country: 'US',
    //             },
    //         },
    //     });
    //     if (error) {
    //         Alert.alert(`Error code: ${error.code}`, error.message);
    //     } else {
    //         Alert.alert('Success', 'Your order is confirmed!');
    //     }
    // };


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <StatusBar backgroundColor={COLORS.black} />
            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={{
                    backgroundColor: COLORS.white,
                    marginBottom: 100,
                }}>
                    <View style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // backgroundColor:COLORS.gray2,
                            height: 60,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{ width: '20%' }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
                                        style={{
                                            height: 45,
                                            tintColor: COLORS.black
                                        }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '60%', alignItems: 'center', }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>Add Cards</Text>
                            </View>

                            <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                            </View>
                        </View>
                        <View style={{
                            height: '80%',
                        }}>
                            <View style={{
                                alignItems: 'center',
                                marginTop: -20
                            }}>
                                <View style={{
                                    width: '90%',
                                    backgroundColor: COLORS.white,
                                    paddingVertical: 20,
                                    elevation: 9,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                    marginVertical: 20
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
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        color: COLORS.black,
                                                    }}>{cardName ? cardName : 'Add new card'}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                alignItems: 'center'
                                            }}>
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
                                            {allCardDetail?.last4 ?
                                                <View>
                                                    <Text style={{
                                                        color: COLORS.gray
                                                    }}>{cardHolder ? cardHolder : `************${allCardDetail?.last4}`}</Text>
                                                </View>
                                                :
                                                <View>
                                                    <Text style={{
                                                        color: COLORS.gray
                                                    }}>{cardHolder ? cardHolder : `****************`}</Text>
                                                </View>
                                            }
                                            <View>
                                                <Text style={{
                                                    color: COLORS.gray
                                                }}> {ExpMonth ? ExpMonth : 'mm'}/{ExpYear ? ExpYear : 'yy'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: -10 }}>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: COLORS.black, paddingBottom: 5, fontSize: 12, }}> Card Holder Name </Text>
                                    <View style={styles.NumberInput}>
                                        <TextInput
                                            error={InputcardName}
                                            onFocus={() => setInputCardName(false)}
                                            activeUnderlineColor={COLORS.transparent}
                                            value={cardName}
                                            underlineColor={COLORS.transparent}
                                            placeholder={'Enter name'}
                                            placeholderTextColor={COLORS.gray}
                                            keyboardType='email-address'
                                            onChangeText={cardName => setCardName(cardName)
                                            }
                                            style={styles.TextInput}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                width: '100%',
                                // height: 50,
                                // borderWidth: 1,
                                // borderColor: '#ccc',
                                borderRadius: 8,
                                paddingHorizontal: 16,
                                marginBottom: 20,
                                backgroundColor: 'white',
                            }}>
                                <CardField
                                    postalCodeEnabled={false}
                                    placeholders={{
                                        number: '4242 4242 4242 4242',
                                        name: 'John Doe',
                                        expiry: 'MM/YY',
                                        cvc: 'CVC',
                                    }}
                                    placeholderTextColor={COLORS.gray} // Set the placeholder text color here
                                    cardStyle={{
                                        backgroundColor: COLORS.light,
                                        textColor: COLORS.black,
                                        fontSize: 12,
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 50,
                                        marginVertical: 0,
                                        borderWidth: 2,
                                        backgroundColor: COLORS.main,
                                        borderColor: COLORS.gray,
                                        color: COLORS.gray
                                    }}
                                    onCardChange={cardDetails => {
                                        fetchCardDetails(cardDetails)
                                        // Perform any additional actions you need with cardDetails
                                    }}
                                    onFocus={focusedField => {
                                        console.log('focusField', focusedField);
                                    }}
                                />
                            </View>
                            {/* <View style={{ alignItems: 'center', }}>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Card Number </Text>
                                    <View style={styles.NumberInput}>
                                        <TextInput
                                            activeUnderlineColor={COLORS.transparent}
                                            error={InputcardHolder}
                                            placeholderTextColor={COLORS.gray2}
                                            onFocus={() => setInputCardHolder(false)}
                                            value={cardHolder}
                                            placeholder={'Enter number'}
                                            underlineColor={COLORS.transparent}
                                            keyboardType='phone-pad'
                                            onChangeText={cardHolder => setCardHolder(cardHolder)
                                            }
                                            style={styles.TextInput}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: COLORS.black, paddingBottom: 5 }}>Expiry Month</Text>
                                    <View style={styles.NumberInput}>
                                        <TextInput
                                            error={InputExpMonth}
                                            onFocus={() => setInputExpMonth(false)}
                                            style={styles.TextInput}
                                            placeholder={'06'}
                                            value={ExpMonth}
                                            onChangeText={setExpMonth}
                                            // error={InputExpDate}
                                            activeUnderlineColor={COLORS.transparent}
                                            // onFocus={() => setInputExpDate(false)}
                                            placeholderTextColor={COLORS.gray2}
                                            underlineColor={COLORS.transparent}
                                        // keyboardType='email-address'
                                        // editable={true}
                                        // onPressIn={showDateModal}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: COLORS.black, paddingBottom: 5 }}>Expiry Year</Text>
                                    <View style={styles.NumberInput}>
                                        <TextInput
                                            error={InputExpYear}
                                            onFocus={() => setInputExpYear(false)}
                                            style={styles.TextInput}
                                            placeholder={'26'}
                                            value={ExpYear}
                                            onChangeText={setExpYear}
                                            // error={InputExpDate}
                                            activeUnderlineColor={COLORS.transparent}
                                            // onFocus={() => setInputExpDate(false)}
                                            placeholderTextColor={COLORS.gray2}
                                            underlineColor={COLORS.transparent}
                                        // keyboardType='email-address'
                                        // editable={true}
                                        // onPressIn={showDateModal}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: COLORS.black, paddingBottom: 5 }}>CVC</Text>
                                    <View style={styles.NumberInput}>
                                        <TextInput
                                            error={Inputcvc}
                                            activeUnderlineColor={COLORS.transparent}
                                            onFocus={() => setInputCvc(false)}
                                            value={cvc}
                                            placeholderTextColor={COLORS.gray2}
                                            underlineColor={COLORS.transparent}
                                            placeholder={'Enter'}
                                            keyboardType='email-address'
                                            onChangeText={cvc => setCvc(cvc)
                                            }
                                            style={styles.TextInput}
                                        />
                                    </View>
                                </View>
                            </View> */}
                        </View>
                        <View style={{
                            alignItems: 'center',
                            paddingBottom: 50,
                            paddingTop: 50,
                        }}>
                            {loading ?
                                <View style={{
                                    backgroundColor: COLORS.main,
                                    width: width / 1.1,
                                    height: 50,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // borderWidth: 1,
                                }}>
                                    <ActivityIndicator size={'small'} color={COLORS.white} animating={loading} />
                                </View>
                                :
                                <CustomeButton
                                    onpress={() => allCardDetail && cardName ? OnPaymentScreen() : null}
                                    title={allCardDetail && cardName && creatStripCompelet ? 'Success' : 'Done'}
                                    color={allCardDetail && cardName && creatStripCompelet ? COLORS.white : allCardDetail && cardName ? COLORS.white : COLORS.white}
                                    bcolor={allCardDetail && cardName && creatStripCompelet ? COLORS.green : allCardDetail && cardName ? COLORS.main : COLORS.gray2}
                                    width={width / 1.1}
                                    disable={allCardDetail && cardName ? false : true}
                                />
                            }
                        </View>
                    </View>
                    <DateTimePickerModal
                        isVisible={DateVisibility}
                        mode="date"
                        // display='spinner'
                        onConfirm={handleDiscountConfirmStartDate}
                        onCancel={hideDiscountStartDatePicker}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddCardScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%'
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 20,
        justifyContent: 'space-between',
        color: COLORS.light,
        height: 45,
        width: width / 1.1,
        backgroundColor: COLORS.light,
        // elevation: 5,
        // borderRadius: 5,
        marginBottom: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
        color: COLORS.gray,
        fontSize: 12,
        width: '100%'
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