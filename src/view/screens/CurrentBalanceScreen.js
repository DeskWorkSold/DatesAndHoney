import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { DepositAmount, WalletAmount, selectUser, selectWalletAmount } from '../../../redux/reducers/Reducers';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
const { width } = Dimensions.get('window')

const CurrentBalanceScreen = ({ navigation }) => {
    const [name, setName] = useState();
    const [yearlyAmount, setYearlyAmount] = useState(false);
    const walletAmount = useSelector(selectWalletAmount);
    const [amount, setAmount] = useState({
        error: false,
        value: null
    });
    const dispatch = useDispatch()
    const user = useSelector(selectUser);

    const handleTextChange = (text) => {
        // Filter out non-numeric characters using a regular expression
        const numericValue = text.replace(/[^0-9]/g, '');

        // Update the state with the filtered numeric value
        // setInputValue(numericValue);
        setAmount({ ...amount, value: numericValue })
    };

    const Addamount = () => {
        if (amount?.value >= 2) {
            let Data = new Object();
            Data.Purpose = 'Deposit'
            Data.Amount = amount?.value
            // console.log(Data);
            // return
            dispatch(DepositAmount(Data))
            navigation.navigate('PaymentOptionScreenDeposit')
        }
        else {
            Toast.show(`You cannot deposit less then $2`, Toast.LONG);
        }
    }

    const calculateTotals = (transactions) => {
        const currentDate = new Date();

        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);

        const oneYearAgo = new Date(currentDate);
        oneYearAgo.setFullYear(currentDate.getFullYear() - 1);


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

            console.log(transactionDate);
            const isLastMonth = transactionDate >= oneMonthAgo && transactionDate <= currentDate;
            const isLastYear = transactionDate >= oneYearAgo && transactionDate <= currentDate;

            // totals.totalDeposit += transaction.deposit;
            // totals.totalExpend += transaction.expend
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
    useEffect(() => {
        GetWalletAmount()
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <StatusBar backgroundColor={COLORS.black} />

            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: COLORS.white,
                            height: 60,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{ width: '20%' }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
                                        style={{
                                            height: 45,
                                            color: COLORS.black
                                        }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '60%', alignItems: 'center', }}>
                                <Text style={{
                                    fontSize: 16,
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
                                <Text style={{ fontSize: 14, color: COLORS.gray }}>Current Balance</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: COLORS.black
                                }}>${walletAmount?.totalBalance ? walletAmount?.totalBalance : 0}</Text>
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
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>Details</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                {yearlyAmount ?
                                    <Text style={{
                                        color: COLORS.black,
                                        paddingRight: 5,
                                        fontSize: 12,
                                    }}>Current Year</Text>
                                    :
                                    <Text style={{
                                        color: COLORS.black,
                                        paddingRight: 5,
                                        fontSize: 12,
                                    }}>Current Month</Text>
                                }
                                <TouchableOpacity onPress={() => setYearlyAmount(!yearlyAmount)}>
                                    <FontAwesome5 name='exchange-alt' color={COLORS.black} size={15} style={{
                                        transform: yearlyAmount ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }]
                                    }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                            }}
                        >
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
                                        paddingRight: 5,
                                        color: COLORS.gray
                                    }}>
                                        Deposit:
                                    </Text>
                                    {yearlyAmount ?
                                        <Text style={{
                                            fontWeight: 'bold',
                                            color: COLORS.black,
                                            fontSize: 13,
                                            textAlign: 'center',
                                        }}>
                                            {walletAmount?.lastYearTotalDeposit ? `$${walletAmount?.lastYearTotalDeposit}` : '$00'}
                                        </Text>
                                        :
                                        <Text style={{
                                            fontWeight: 'bold',
                                            color: COLORS.black,
                                            fontSize: 13,
                                            textAlign: 'center'
                                        }}>
                                            {walletAmount?.lastMonthTotalDeposit ? `$${walletAmount?.lastMonthTotalDeposit}` : '$00'}
                                        </Text>
                                    }
                                </View>
                            </View>
                            <View
                                // onPress={() => navigation.navigate('PaymentOptionScreen')}
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
                                    paddingTop: 10,
                                }}>
                                    <Text style={{
                                        fontSize: 13,
                                        textAlign: 'center',
                                        paddingRight: 5,
                                        color: COLORS.gray
                                    }}>
                                        Spent:
                                    </Text>
                                    {yearlyAmount ?
                                        <Text style={{
                                            fontWeight: 'bold',
                                            color: COLORS.black,
                                            fontSize: 13,
                                            textAlign: 'center'
                                        }}>
                                            {walletAmount?.lastYearTotalExpend ? `$${walletAmount?.lastYearTotalExpend}` : '$00'}
                                        </Text>
                                        :
                                        <Text style={{
                                            fontWeight: 'bold',
                                            color: COLORS.black,
                                            fontSize: 13,
                                            textAlign: 'center'
                                        }}>
                                            {walletAmount?.lastMonthTotalExpend ? `$${walletAmount?.lastMonthTotalExpend}` : '$00'}
                                        </Text>
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={{
                            paddingHorizontal: 25,
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                paddingBottom: 5,
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>Add Balance</Text>
                            </View>
                        </View>
                        
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                {/* <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Card Number/ </Text> */}
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        activeUnderlineColor={COLORS.transparent}
                                        error={amount?.error}
                                        placeholderTextColor={COLORS.gray2}
                                        onFocus={() => setAmount({ ...amount, error: false })}
                                        value={amount?.value}
                                        placeholder={'Enter amount'}
                                        underlineColor={COLORS.transparent}
                                        onChangeText={amount => handleTextChange(amount)
                                        }
                                        style={styles.TextInput}
                                        keyboardType="numeric"
                                    />
                                    <Text style={{ fontSize: 12, color: COLORS.green }}>$</Text>
                                </View>
                            </View>
                        </View>
                        {/* <View style={{ alignItems: 'center' }}>
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
                        </View> */}
                    </View>

                    <View style={{
                        paddingTop: 20,
                        alignItems: 'center'
                    }}>
                        {amount?.value ?
                            <CustomeButton
                                onpress={() => Addamount()}
                                title={`Add $${amount?.value}`} />
                            :
                            <CustomeButton
                                bcolor={COLORS.gray}
                                color={COLORS.white}
                                title={`Add`} />
                        }
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
        height: '100%',
        marginBottom: 100,
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        height: 45,
        // width:'100%',
        // width: 340,
        width: width / 1.1,
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
        fontSize: 12,
        color: COLORS.black
    },
})