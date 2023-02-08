import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton } from 'react-native-paper';

const AddCardScreen = ({ navigation }) => {
    const [cardHolder, setCardHolder] = useState();
    const [cardName, setCardName] = useState(); //initial choice
    const [ExpDate, setExpDate] = useState();
    const [cvc, setCvc] = useState();

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <ScrollView vertical showsVerticalScrollIndicator={false}>
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
                                }}>Add Cards</Text>
                            </View>

                            <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: -20
                        }}>
                            <Image source={require('../../assets/newcard.png')} resizeMode='cover'
                                style={{
                                    width: 380,
                                    height: 250,
                                }}
                            />
                        </View>

                        <View style={{ alignItems: 'center', marginTop: -10 }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Card Holder Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={cardName}
                                        placeholder={'Enter name'}
                                        keyboardType='email-address'
                                        onChangeText={cardName => setCardName(cardName)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Card Number </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={cardHolder}
                                        placeholder={'Enter number'}
                                        keyboardType='email-address'
                                        onChangeText={cardHolder => setCardHolder(cardHolder)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Exoiry Date</Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={ExpDate}
                                        placeholder={'MM / YY'}
                                        keyboardType='email-address'
                                        onChangeText={ExpDate => setExpDate(ExpDate)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> CVC</Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={cvc}
                                        placeholder={'Enter'}
                                        keyboardType='email-address'
                                        onChangeText={cvc => setCvc(cvc)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>





                        <View style={{
                            paddingTop: 20,
                            alignItems: 'center',
                            paddingBottom:50,
                            paddingTop:50
                        }}>
                            <CustomeButton onpress={() => navigation.navigate('PaymentOptionTwoScreen')}
                                title={'Check Out'} />
                        </View>
                    </View>

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