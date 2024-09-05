import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import HeaderTabOne from '../components/HeaderTabOne';
import COLORS from '../../consts/Colors';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQty, incrementQty, selectPaymentCards, selectaddToCart } from '../../../redux/reducers/Reducers';
import CustomeButton from '../components/CustomeButton';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useEffect } from 'react';
const data = [
    {
        id: 1,
        name: 'Burgers',
        image: require('../../assets/food.png'),
        price: '166',
    },
    {
        id: 2,
        name: 'Chicken Burgers',
        image: require('../../assets/food.png'),
        price: '166',
    },
    {
        id: 3,
        name: 'Zinger Burgers',
        image: require('../../assets/food.png'),
        price: '166',
    },
]

const CartItems = ({ navigation }) => {
    const [qty, setQty] = useState();
    const [uploading, setUploading] = useState(false);
    const [platFormFee, setPlatFormFee] = useState(4);
    const dispatch = useDispatch();
    const PaymentCards = useSelector(selectPaymentCards)
    const AddToCard = useSelector(selectaddToCart)
    // console.log('==> :',AddToCard);

    // dispatch(addToCart([]))

    const total = AddToCard.map((item) => Number(item.Totalprice)).reduce((perv, curr) => perv + curr, 0);
    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    // const subtotal = platFormFee+totalUSD;
    // console.log(subtotal);




    const handleDecrement = (item) => {
        console.log('dec');
        dispatch(decrementQty(item))
    }

    const handleIncrement = (item) => {
        console.log('inc', item);
        dispatch(incrementQty(item))
    }
    // const PayAmount = () => {
    //     try {
    //         setUploading(true)
    //         const uid = Math.random().toString(16).slice(2);

    //         firestore().collection('orders').doc(uid).update({
    //             Order: AddToCard,
    //             uid: uid,
    //             totalUSD: totalUSD,
    //             createdAt: firestore.FieldValue.serverTimestamp(),
    //         });
    //         ToastAndroid.show("Your order hase been placed successfully!", ToastAndroid.SHORT);

    //         navigation.navigate("Foodmenu")
    //         setUploading(false)
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

    const PaymentOptionScreen = () => {
        // navigation.navigate("PaymentOptionScreenFood")
        if (PaymentCards?.length > 0) {
            navigation.navigate('CheckoutScreenFood')
        }
        else {
            navigation.navigate('PaymentOptionScreen')
        }
    }

    // useEffect(() => {
    //     dispatch(addToCart([]))
    // },[])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar backgroundColor={COLORS.black} />
            {/* <HeaderTabOne onpress={() => navigation.openDrawer()}
                // Lefticon={require('../../assets/menu3.png')} 
                Title={'Cart Items'}
            /> */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 60,
                paddingHorizontal: 20
            }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Foodmenu')}
                    style={{ flex: 1, }}>
                    <Ionicons name='arrow-back' size={20} color={COLORS.black} />
                </TouchableOpacity>
                <View style={{
                    flex: 2,
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black }}>Cart Items</Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
            <View style={styles.container}>
                {!AddToCard.length == 0 ?
                    <ScrollView vertical showsVerticalScrollIndicator={false}>
                        {AddToCard.map((item, index) => (
                            <View key={index} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                backgroundColor: COLORS.light,
                                marginBottom: 10
                            }}>
                                <View style={{
                                    borderRadius: 50,
                                    width: '20%',
                                }}>
                                    <Image source={{ uri: item?.image1 }} resizeMode='cover' style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 50,
                                        borderWidth: 2,
                                        borderColor: COLORS.main,
                                    }} />
                                </View>
                                <View style={{
                                    width: '60%',
                                }}>
                                    <Text style={{ color: COLORS.black, fontSize: 14, }}>{item?.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, }}>
                                        <TouchableOpacity
                                            onPress={() => handleDecrement(item)}
                                            style={{
                                                backgroundColor: COLORS.main,
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                width: 20
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 12,
                                                // marginRight: 5,
                                                // paddingRight: 5,
                                                textAlign: 'center',
                                                fontSize: 15,
                                            }}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={{
                                            // backgroundColor: COLORS.white,
                                            paddingHorizontal: 3,
                                            fontSize: 15,
                                            // width: 20,
                                            textAlign: 'center',
                                            color: COLORS.black
                                        }}>{item.qty}</Text>
                                        <TouchableOpacity
                                            onPress={() => handleIncrement(item)}
                                            style={{
                                                backgroundColor: COLORS.main,
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                width: 20
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 12,
                                                marginRight: 5,
                                                paddingLeft: 5,
                                                fontSize: 15,
                                            }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{
                                    width: '20%',
                                    alignItems: 'center'
                                }}>
                                    {/* <Text style={{
                                        fontSize: 12,
                                    }}>Per items</Text>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLORS.green,
                                        fontWeight: 'bold'
                                    }}>{item.PricePerItem}.00</Text> */}
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.gray
                                    }}>Total Price</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.green,
                                        fontWeight: 'bold'
                                    }}>${item?.Totalprice}.00</Text>
                                </View>
                            </View>
                        ))}


                        <View style={{
                            marginTop: 10,
                        }}>
                            {/* <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                paddingTop: 20,
                                paddingBottom: 10,
                                justifyContent: 'space-between',
                                borderBottomColor: COLORS.light,
                                borderBottomWidth: 1
                            }}>
                                <Text>Delivery Charges</Text>
                                <Text>$0</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                justifyContent: 'space-between',
                                borderBottomColor: COLORS.light,
                                borderBottomWidth: 1
                            }}>
                                <Text>Platform Fee</Text>
                                <Text style={{ color: COLORS.green }}>${platFormFee}.00</Text>
                            </View> */}
                            <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                justifyContent: 'space-between',
                                borderBottomColor: COLORS.light,
                                borderBottomWidth: 1
                            }}>
                                <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: 'bold' }}>Total</Text>
                                <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: 'bold' }}>{totalUSD}</Text>
                            </View>
                        </View>


                        <View style={{
                            alignItems: 'center',
                            marginVertical: 20,
                            marginTop: 50,
                            marginBottom: 200,
                        }}>
                            {!uploading == true ?
                                <CustomeButton onpress={() => PaymentOptionScreen()}
                                    title={'Check Out'} />
                                :
                                <View style={{
                                    backgroundColor: COLORS.main,
                                    width: 200,
                                    height: 50,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
                                </View>
                            }
                        </View>

                    </ScrollView>
                    :
                    <View style={{
                        alignItems: 'center',
                        paddingHorizontal: 20
                    }}>
                        <Text>No card in your card!</Text>
                    </View>
                }
            </View>
        </SafeAreaView>

    )
}

export default CartItems

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white
    }
})