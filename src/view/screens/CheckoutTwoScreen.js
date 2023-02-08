import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton } from 'react-native-paper';

const CheckoutTwoScreen = ({ navigation }) => {
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
                            }}>Checkout</Text>
                        </View>

                        <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                        </View>
                    </View>


                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth:1,
                        borderRadius:10,
                        borderColor:COLORS.main,
                        marginHorizontal:10,
                        height: 60,
                        paddingHorizontal: 20,
                        marginBottom:20
                    }}>
                        <Image source={require('../../assets/paypal.png')} resizeMode='contain'
                            style={{
                                height: 25,
                                width: 25
                            }} />

                        <View style={{
                            paddingLeft:20
                        }}>
                            <Text style={{
                                color:COLORS.black,
                                fontWeight:'bold'
                            }}>Paypal</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10
                    }}>
                        <View style={styles.NumberInput}>
                            <Image source={require('../../assets/coupn.png')} resizeMode='contain'
                                style={{
                                    width: 20
                                }} />
                            <TextInput
                                value={cardName}
                                placeholder={'Apply Coupon'}
                                // error={inputfirstName}
                                keyboardType='number-pad'
                                onChangeText={cardName => setCardName(cardName)
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
                            <TouchableOpacity style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                            }}>
                                <Text style={{ color: COLORS.black }}>Apply</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


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
                            <Text>Flakes</Text>
                            <Text>$30</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            justifyContent: 'space-between',
                            borderBottomColor: COLORS.light,
                            borderBottomWidth: 1
                        }}>
                            <Text>Coupon</Text>
                            <Text style={{ color: COLORS.green }}>-$3.5</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            justifyContent: 'space-between',
                            borderBottomColor: COLORS.light,
                            borderBottomWidth: 1
                        }}>
                            <Text style={{
                                color:COLORS.black
                            }}>Total</Text>
                            <Text style={{
                                color:COLORS.black
                            }}>$26.5</Text>
                        </View>
                    </View>



                </View>

                <View style={{
                    paddingTop: 20,
                    alignItems: 'center',
                    paddingBottom: 50,
                    paddingTop: 50,
                    height: '20%'
                }}>
                    <CustomeButton onpress={() => navigation.navigate('')}
                        title={'Pay Amount $26.5'} />
                </View>
            </View>


        </SafeAreaView>
    )
}

export default CheckoutTwoScreen

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
        height: 45,
        width: '70%',
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        paddingLeft: 5,
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