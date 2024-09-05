import { Dimensions, Image, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import CustomeButton from '../../../components/CustomeButton';
import Loader from '../../../components/Loader';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const btns = [
    {
        id: 1,
        name: 'Recommended',
        price: 18,
        tag: 'Per month',
        detail: 'When entering $18 you will become featured as Included Concierge and will be featured if you enter more clients, they will have to pay the whole amount addition to their subscription to the app.',
        type: 'details'
    },
    {
        id: 2,
        name: 'Enter Monthly Fee',
        price: '',
        tag: '',
        detail: '',
        type: 'amount'
    }
]

const PaymentTypeDetail = ({ navigation, route }) => {
    const { title } = route.params
    const mediatoruser = useSelector(selectMediatorUser);
    const [uploading, setUploading] = useState(false);
    const [btnindex, setBtnindex] = useState(null);
    const [price, setPrice] = useState(0);
    const [priceIndex, setPriceIndex] = useState(1);
    const [monthlyrate, setMonthlyRate] = useState();

    const onSelectBtn = (index) => {
        if (index == 0) {
            setBtnindex(index)
            setMonthlyRate('18')
        }
        else {
            setMonthlyRate(null)
            setBtnindex(index)
        }
    }


    const handleDecrement = () => {
        // console.log('dec');
        setPriceIndex(0)
        if (price > 1) {
            setPrice(perv => perv - 1);
        }
    }

    const handleIncrement = () => {
        // console.log('inc');
        setPriceIndex(1)
        if (price < 100000) {
            setPrice(perv => perv + 1);
        }
    }

    const OnSubmitRates = async () => {
        if (monthlyrate == 18) {
            console.log(monthlyrate, 'here');
            await firestore()
                .collection('Users').doc(mediatoruser.userDetails.uid).update({
                    'userDetails.MonthlyRates': monthlyrate
                })
                .then(() => {
                    setUploading(false)
                    ToastAndroid.show("Monthly rates updated!", ToastAndroid.SHORT);
                    console.log('Monthly rates updated');
                });
        }
        else {
            if (price < 1) {
                ToastAndroid.show("Please enter your monthly rates first!", ToastAndroid.SHORT);
            }
            setUploading(true)
            await firestore()
                .collection('Users').doc(mediatoruser.userDetails.uid).update({
                    'userDetails.MonthlyRates': price
                })
                .then(() => {
                    setUploading(false)
                    ToastAndroid.show("Monthly rates updated!", ToastAndroid.SHORT);
                    console.log('Monthly rates updated');
                });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <View style={{
                    height: height / 1.5,
                }}>
                    <View style={{
                        alignItems: 'center',
                        // backgroundColor:COLORS.gray,
                        height: height / 4,
                        justifyContent: 'flex-end'
                    }}>
                        <Image source={require('../../../../assets/paymenttype.png')} resizeMode='contain' style={
                            {
                                width: width / 1.4
                            }
                        } />
                    </View>
                    <View style={{
                        alignItems: 'center',
                        paddingVertical: 20,
                        paddingHorizontal: 60,
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.black
                        }}>Enter your monthly rate</Text>
                    </View>
                    {btns.map((item, index) => (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => onSelectBtn(index)}
                                    style={[styles.NumberInput, { borderWidth: 1, borderColor: btnindex == index ? COLORS.main : COLORS.transparent }]}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <View>
                                            <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14 }}>{item.name}</Text>
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                color: COLORS.black,
                                                fontSize: 16,
                                                paddingHorizontal: 3,
                                            }}>{item.price}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ textAlign: 'center', fontSize: 14 }}>{item.tag}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        {item.type == 'details' &&
                                            <Text style={{
                                                fontSize: 10,
                                                textAlign: 'center',
                                            }}>
                                                When entering $18 you will become featured as Included Concierge and will be featured if you enter more clients, they will have to pay the whole amount addition to their subscription to the app.
                                            </Text>
                                        }
                                        {item.type == 'amount' &&
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                elevation: 1,
                                                // paddingVertical: 5,
                                                marginTop: 10,
                                                borderRadius: 5,
                                                backgroundColor: COLORS.light
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => handleDecrement()}
                                                    style={{
                                                        // width: '20%',
                                                        paddingHorizontal: 10,
                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        elevation: 1,
                                                        // paddingHorizontal:3,
                                                        backgroundColor: priceIndex == 0 ? COLORS.main : COLORS.white,
                                                    }}>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        color: COLORS.black
                                                    }}>-</Text>
                                                </TouchableOpacity>
                                                <View style={{
                                                    paddingHorizontal: 30,
                                                    // flex: 4,
                                                    // paddingHorizontal:20,
                                                    // width: '30%',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.light,
                                                }}>
                                                    <Text style={{
                                                        fontSize: 13,
                                                        color: COLORS.black,
                                                        fontWeight: 'bold',
                                                    }}>${price}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => handleIncrement()}
                                                    style={{
                                                        paddingHorizontal: 10,
                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        elevation: 1,
                                                        // paddingHorizontal:3,
                                                        backgroundColor: priceIndex == 1 ? COLORS.main : COLORS.white,

                                                    }}>
                                                    <Text style={{
                                                        color: COLORS.black,
                                                        fontSize: 14,
                                                    }}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}


                </View>
                <View style={{
                    height: height / 0.5,
                    paddingHorizontal: 20,
                    alignSelf: 'center',
                    paddingVertical: 20,
                    marginTop: 20,
                }}>
                    <CustomeButton title={'Done'} onpress={() => OnSubmitRates()} />
                </View>
                <Loader modal={uploading} uploading={uploading} />
            </View>
        </SafeAreaView>
    )
}

export default PaymentTypeDetail

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        height: height / 1.5,
        // backgroundColor:COLORS.gray
    },
    NumberInput: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        // height: 45,
        paddingVertical: 19,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4
    },
})