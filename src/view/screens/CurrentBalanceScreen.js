import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';

const CurrentBalanceScreen = ({ navigation }) => {
    const [name, setName] = useState();

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />

            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: COLORS.white,
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
                                }}>Current Balance</Text>
                            </View>

                            <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                            </View>
                        </View>


                        <View style={{
                            paddingHorizontal: 20,
                            paddingTop: 20,
                            alignItems: 'center'
                        }}>
                            <View>
                                <Image source={require('../../assets/balance.png')} resizeMode='contain'
                                    style={{
                                        width: 80,
                                        height: 80,
                                        tintColor: COLORS.black
                                    }} />
                            </View>
                            <View style={{
                                paddingVertical: 10
                            }}>
                                <Text>Current Balance</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: COLORS.black
                                }}>$424</Text>
                            </View>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 25,
                            paddingVertical: 20,
                            alignItems: 'center',
                        }}>
                            <View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: COLORS.black
                                }}>Details</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    paddingRight: 5
                                }}>This Month</Text>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/dropdown.png')} resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                backgroundColor: COLORS.white,
                                elevation: 5,
                                borderRadius: 10,
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                alignItems: 'center',
                                width: '49%'
                            }}>
                                <View>
                                    <Image source={require('../../assets/deposit.png')} resizeMode='contain'
                                        style={{
                                            height: 50,
                                            marginRight: 10
                                        }} />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        fontSize: 13,
                                        textAlign: 'center',
                                        paddingRight: 5
                                    }}>
                                        Deposit:
                                    </Text>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                        fontSize: 13,
                                        textAlign: 'center'
                                    }}>
                                        $424
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity 
                            onPress={() => navigation.navigate('PaymentOptionScreen')}
                            style={{
                                backgroundColor: COLORS.white,
                                elevation: 5,
                                borderRadius: 10,
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                alignItems: 'center',
                                width: '49%'
                            }}>
                                <View>
                                    <Image source={require('../../assets/spend.png')} resizeMode='contain'
                                        style={{
                                            height: 50,
                                            marginRight: 10,
                                        }} />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        fontSize: 13,
                                        textAlign: 'center',
                                        paddingRight: 5
                                    }}>
                                        Spent:
                                    </Text>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                        fontSize: 13,
                                        textAlign: 'center'
                                    }}>
                                        $424
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            paddingHorizontal: 25,
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                paddingBottom: 5
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>Add Balance</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View>
                                <View>
                                    <Text>Amount</Text>
                                </View>
                                <View style={styles.NumberInput}>
                                    <Text style={styles.TextInput}>
                                        $200
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        paddingTop: 20,
                        alignItems: 'center'
                    }}>
                        <CustomeButton onpress={() => navigation.navigate('')}
                            title={'Add $20'} />
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default CurrentBalanceScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%'
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
})