import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import SVGImg1 from '../../../../assets/tik.svg';
import CustomeButton from '../../../components/CustomeButton';
import firestore from '@react-native-firebase/firestore';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import Wallet from '../../../../assets/Wallet.svg';
import Balance from '../../../../assets/balance.svg';
import Deposit from '../../../../assets/deposit.svg';
import { TextInput } from 'react-native-paper';
import PaymentTypes from '../../../components/PaymentTypes';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const payments = [
    {
        id: 1,
        name: 'Paypal',
        img: require('../../../../assets/paypal.png')
    },
    {
        id: 2,
        name: 'Apple Pay',
        img: require('../../../../assets/applepay.png')
    },
    {
        id: 1,
        name: 'Venmo',
        img: require('../../../../assets/venmo.png')
    }
]

const AccountScreen = ({ navigation }) => {
    const mediatoruser = useSelector(selectMediatorUser);
    const [modal, setModal] = useState(mediatoruser.userDetails.TermAndCondition ? false : true);
    const [uploading, setUploading] = useState(false);
    const [amount, setAmount] = useState(null);
    const [accountName, setAccountName] = useState(null);
    const [accountNumber, setAccountNumber] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState();


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <Loader modal={uploading} uploading={uploading} />
                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={{
                        marginBottom:50
                    }}>

                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: COLORS.white,
                                height: 80,
                                paddingHorizontal: 20,
                            }}>
                                <View style={{ flex: 1, alignItems: 'center', }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: COLORS.black
                                    }}>Current Balance</Text>
                                </View>
                            </View>


                            <View style={{
                                paddingHorizontal: 20,
                                paddingTop: 20,
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Wallet width={80} height={80} />
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
                                        <Image source={require('../../../../assets/dropdown.png')} resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                width: width
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
                                        <Balance width={50} height={50} />
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
                                        <Deposit width={50} height={50} />
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
                                    }}>Withdraw Money</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingBottom: 5
                                    }}>
                                        <Text style={{ fontSize: 12, color: COLORS.black }}>Amount</Text>
                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>(min $20)</Text>
                                    </View>
                                    <View style={styles.NumberInput}>
                                        <TextInput
                                            placeholder='enter your amount'
                                            placeholderTextColor={COLORS.gray2}
                                            value={amount}
                                            onChangeText={(text) => setAmount(text)}
                                            activeUnderlineColor={COLORS.transparent}
                                            underlineColor={COLORS.transparent}
                                            style={styles.TextInput}
                                        />
                                    </View>
                                </View>
                            </View>


                            <View style={{ paddingVertical: 10 }}>
                                <View>
                                    <View style={{
                                        paddingBottom: 5,
                                        paddingHorizontal: 20
                                    }}>
                                        <Text style={{ fontSize: 12, color: COLORS.black }}>Withdraw to</Text>
                                    </View>
                                    <View style={{
                                        // paddingHorizontal:20wid
                                        width: width / 1.1,
                                        alignSelf: 'center'
                                    }}>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                            <PaymentTypes data={payments} width={width / 3.5} value={selectedPayment} setValue={setSelectedPayment} />
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>


                            <View style={{ paddingVertical: 10 }}>
                                <View>
                                    <View style={{
                                        paddingBottom: 5,
                                        paddingHorizontal: 20
                                    }}>
                                        <Text style={{ fontSize: 12, color: COLORS.black }}>Account Name</Text>
                                    </View>
                                    <View style={styles.NumberInput}>
                                        <TextInput
                                            placeholder='enter your name'
                                            placeholderTextColor={COLORS.gray2}
                                            value={accountName}
                                            onChangeText={(text) => setAccountName(text)}
                                            activeUnderlineColor={COLORS.transparent}
                                            underlineColor={COLORS.transparent}
                                            style={styles.TextInput}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{ paddingVertical: 10 }}>
                                <View>
                                    <View style={{
                                        paddingBottom: 5,
                                        paddingHorizontal: 20
                                    }}>
                                        <Text style={{ fontSize: 12, color: COLORS.black }}>Account Number</Text>
                                    </View>
                                    <View style={styles.NumberInput}>
                                        <TextInput
                                            placeholder='enter account number'
                                            placeholderTextColor={COLORS.gray2}
                                            value={accountNumber}
                                            onChangeText={(text) => setAccountNumber(text)}
                                            activeUnderlineColor={COLORS.transparent}
                                            underlineColor={COLORS.transparent}
                                            style={styles.TextInput}
                                        />
                                    </View>
                                </View>
                            </View>



                        </View>

                        <View style={{
                            paddingTop: 20,
                            alignItems: 'center'
                        }}>
                            <CustomeButton width={width/1.1}
                                title={'Pending'} />
                        </View>


                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:'center',
        // paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: 45,
        width: width / 1.1,
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        // padding: 0,
        backgroundColor: COLORS.transparent,
    },
})