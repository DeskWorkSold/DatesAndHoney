import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView, ToastAndroid, Dimensions, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BuyAdditionalPackages, Buypackages, ConciergeSendRequest, DepositAmount, FlakesBill, PaymentCardDetails, PaymentMethod, TicketsAddtoCard, removeFromCart, selectPaymentCards, selectaddToCart } from '../../../redux/reducers/Reducers';
import SVGVemo from '../../assets/venmo.svg';
const { width, height } = Dimensions.get('window')
import Ionicons from 'react-native-vector-icons/Ionicons'

const PaymentType = [
    // {
    //     id: '1',
    //     img: require('../../assets/paypal.png'),
    //     name: 'Paypal'
    // },
    // {
    //     id: '2',
    //     img: require('../../assets/google.png'),
    //     name: 'Google Pay'
    // },
    // {
    //     id: '1',
    //     img: require('../../assets/venmo.png'),
    //     name: 'Venmo'
    // },
    {
        id: '1',
        img: require('../../assets/stripe2.png'),
        name: 'Stripe'
    },
]

const PaymentOptionScreen = ({ navigation, route }) => {
    // const { BuyTickets } = route.params;
    const [name, setName] = useState();
    const [checked, setChecked] = useState(false); //initial choice
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
    const [savedCard, setSavedCard] = useState(null)
    const dispatch = useDispatch()
    const SelectedPaymentCards = useSelector(selectPaymentCards)
    const AddToCard = useSelector(selectaddToCart)

    const AddYourCard = () => {
        if (selectedCategoryIndex !== null) {
            const paymentCard = PaymentType[selectedCategoryIndex].name
            dispatch(PaymentMethod(paymentCard))
            // console.log(paymentCard, BuyTickets);
            navigation.navigate('AddCardScreen', { data: PaymentType[selectedCategoryIndex] });
            // navigation.navigate('AddCardScreen')
        }
        else {
            ToastAndroid.show("Please select payment type!", ToastAndroid.SHORT);
        }
    }
    const CheckOutSaveCard = () => {
        // console.log('ere' , savedCard);
        // return
        if (savedCard) {
            dispatch(PaymentCardDetails(savedCard))
            dispatch(PaymentMethod('Stripe'))
            navigation.navigate('CheckoutScreen')
        }
    }

    const GoBack = () => {
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
        else{
            console.log('food item not found');
        }
        navigation?.goBack()
    }

    const ListPaymentTypes = ({ value, setValue }) => {
        return (
            <View>
                {PaymentType.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setValue(index)}
                        style={{
                            marginTop: 20,
                            marginHorizontal: 20,
                            borderRadius: 10,
                            backgroundColor: COLORS.white,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            elevation: 5,
                            padding: 20
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image source={item.img} resizeMode='contain'
                                style={{
                                    // paddingHorizontal: 20,
                                    width: 25,
                                    height: 25,
                                    borderRadius: 5,
                                }} />
                            <Text style={{
                                fontSize: 14,
                                paddingLeft: 10,
                                color: COLORS.black,
                            }}>
                                {item.name}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                // onPress={() => setChecked(!checked)}
                                style={styles.rbStyle}>
                                {value == index && <View style={styles.selected} />}
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: COLORS.white
        }}>
            <StatusBar backgroundColor={COLORS.black} />
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 60,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{ width: '20%' }}>
                                <TouchableOpacity
                                    onPress={() => GoBack()}
                                >
                                   <Ionicons name='arrow-back' size={20} color={COLORS.black} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '60%', alignItems: 'center', }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>Check Out</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                            </View>
                        </View>

                        <View style={{
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>
                                Save Cards
                            </Text>
                            {SelectedPaymentCards?.length > 0 &&
                                <TouchableOpacity onPress={() => AddYourCard()}>
                                    <Text style={{
                                        color: COLORS.bluedark,
                                        fontSize: 12,
                                        borderBottomColor: COLORS.bluedark,
                                        borderBottomWidth: 1,
                                    }}>Add New Card</Text>
                                </TouchableOpacity>
                            }
                        </View>

                        {SelectedPaymentCards?.length > 0 ?
                            <View style={{
                                marginHorizontal: 0,
                            }}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {SelectedPaymentCards.map((j, i) => (
                                        <ImageBackground
                                            source={require('../../assets/CardMask.png')}
                                            resizeMode='contain'
                                            key={i}
                                            style={{ width: '100%', height: '100%' }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => setSavedCard(j)}
                                                style={{
                                                    width: width / 1.4,
                                                    backgroundColor: COLORS.white,
                                                    paddingVertical: 10,
                                                    elevation: 9,
                                                    alignSelf: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 20,
                                                    marginVertical: 20,
                                                    marginLeft: 20,
                                                    marginRight: 4,
                                                    borderWidth: savedCard?.cardNumber == j?.cardNumber ? 1 : 0,
                                                    borderColor: COLORS.main
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
                                                        paddingBottom: 50
                                                    }}>
                                                        <View>
                                                            <View>
                                                                <Text style={{ fontSize: 12, color: COLORS.gray }}>Card Holder Name</Text>
                                                            </View>
                                                            <View>
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    fontWeight: 'bold',
                                                                    color: COLORS.black
                                                                }}>{j?.cardName}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            alignItems: 'center',
                                                        }}>
                                                            {j.paymentMethod == 'Stripe' &&
                                                                <>
                                                                    <Image source={require('../../assets/stripe2.png')} resizeMode='contain' style={{
                                                                        width: 25,
                                                                        height: 25,
                                                                        borderRadius: 5,
                                                                    }} />
                                                                    <Text style={{
                                                                        fontSize: 10,
                                                                        color:COLORS.gray
                                                                    }}>{j.paymentMethod}</Text>
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
                                                            <Text style={{ fontSize: 12,
                                                            color:COLORS.gray
                                                             }}>{'************' + j?.cardNumber}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontSize: 12, color:COLORS.gray }}>{j?.ExpMonth} / {j?.ExpYear}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    ))}
                                </ScrollView>
                            </View>
                            :
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: COLORS.white,
                                height: 80,
                                paddingHorizontal: 20,
                            }}>
                                <View style={{
                                    width: '70%',
                                }}>
                                    <Text style={{ fontSize: 12, color: COLORS.gray }}>
                                        Add a card to proceed payment through credit card
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => AddYourCard()}
                                    style={{
                                        width: '30%',
                                    }}>
                                    <View style={{
                                        paddingHorizontal: 10,
                                        padding: 10,
                                        backgroundColor: COLORS.main,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 12,
                                        }}>Add card</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{
                            paddingHorizontal: 20
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>
                                Other ways to pay
                            </Text>
                        </View>

                        {/* <View> */}
                        <ListPaymentTypes value={selectedCategoryIndex}
                            setValue={setSelectedCategoryIndex} />
                        {/* </View> */}


                    </View>

                    <View style={{
                        paddingTop: '20%',
                        alignItems: 'center',
                        // height: '15%'
                    }}>
                        <TouchableOpacity
                            onPress={() => CheckOutSaveCard()}
                            disabled={savedCard != null ? false : true}
                            activeOpacity={0.7}>
                            <View style={{
                                backgroundColor: COLORS.main,
                                width: width / 1.1,
                                height: 50,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: COLORS.transparent,
                                opacity: savedCard != null ? 1 : 0.3
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                }}>Check Out</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <CustomeButton
                            title={'Check Out'} bcolor={COLORS.main} onpress={() => onCongratsBuyTickets()} /> */}
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default PaymentOptionScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        // height: '85%'
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: 45,
        width: 340,
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
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