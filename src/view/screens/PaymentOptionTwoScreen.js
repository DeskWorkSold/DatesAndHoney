import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton } from 'react-native-paper';

const PaymentOptionTwoScreen = ({ navigation }) => {
    const [cardHolder, setCardHolder] = useState();
    const [cardName, setCardName] = useState(); //initial choice
    const [ExpDate, setExpDate] = useState();
    const [cvc, setCvc] = useState();

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={{
                backgroundColor: COLORS.white
            }}>
                <View style={styles.container}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // backgroundColor:COLORS.gray2,
                        height: 80,
                        paddingHorizontal: 20,
                    }}>
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
                                    style={{
                                        height: 45,
                                        color: COLORS.black
                                    }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '60%', alignItems: 'center', }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Payment Methods</Text>
                        </View>

                        <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                        </View>
                    </View>

                    <View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{
                                alignItems: 'center',
                                marginTop: -20
                            }}>
                                <Image source={require('../../assets/subcard.png')} resizeMode='cover'
                                    style={{
                                        width: 280,
                                        height: 220,
                                    }}
                                />
                            </View>
                            <View style={{
                                alignItems: 'center',
                                marginTop: -20
                            }}>
                                <Image source={require('../../assets/subcard.png')} resizeMode='cover'
                                    style={{
                                        width: 280,
                                        height: 220,
                                    }}
                                />
                            </View>
                        </ScrollView>
                    </View>

                    <View>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                color: COLORS.black
                            }}>Other ways to pay</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{
                                marginTop: 10,
                                marginRight: 10,
                                paddingVertical: 20,
                                paddingHorizontal: 40,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: COLORS.main,
                                backgroundColor: COLORS.white,
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/paypal.png')} resizeMode='contain'
                                    style={{
                                        height: 50,
                                        width: 30
                                    }} />
                                <Text style={{
                                    paddingTop: 10
                                }}>Paypal</Text>
                            </View>
                            <View style={{
                                marginTop: 10,
                                marginRight: 10,
                                paddingVertical: 20,
                                paddingHorizontal: 30,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: COLORS.main,
                                backgroundColor: COLORS.white,
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/applepay.png')} resizeMode='contain'
                                    style={{
                                        height: 50,
                                    }}
                                />
                                <Text style={{
                                    paddingTop: 10
                                }}>Apple Pay</Text>
                            </View>
                            <View style={{
                                marginTop: 10,
                                marginRight: 10,
                                paddingVertical: 20,
                                paddingHorizontal: 30,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: COLORS.main,
                                backgroundColor: COLORS.white,
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/stripe.png')} resizeMode='contain'
                                    style={{
                                        height: 50,
                                    }}
                                />
                                <Text style={{
                                    paddingTop: 10
                                }}>Stripe Pay</Text>
                            </View>
                        </ScrollView>
                    </View>


                </View>

                <View style={{
                    paddingTop: 20,
                    alignItems: 'center',
                    paddingBottom: 50,
                    paddingTop: 50,
                    height: '20%'
                }}>
                    <CustomeButton onpress={() => navigation.navigate('CheckoutScreen')}
                        title={'Check Out'} />
                </View>
            </View>


        </SafeAreaView>
    )
}

export default PaymentOptionTwoScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '80%',
        paddingHorizontal: 20
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