import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import HeaderTabOne from '../components/HeaderTabOne';
import COLORS from '../../consts/Colors';
import { useState } from 'react';

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

const CartItems = () => {
    const [qty, setQty] = useState();


    const handleDecrement = (item_id) => {
        console.log('dec');
    }

    const handleIncrement = (item_id) => {
        console.log('inc');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar backgroundColor={COLORS.black} />
            <HeaderTabOne onpress={() => navigation.openDrawer()}
                // Lefticon={require('../../assets/menu3.png')} 
                Title={'Cart Items'}
            />
            <View style={styles.container}>
                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    {data.map((item, index) => (
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
                                <Image source={require('../../assets/food.png')} resizeMode='cover' style={{
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
                                <Text style={{ color: COLORS.black }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, }}>
                                    <TouchableOpacity
                                        onPress={() => handleDecrement(item.id)}
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
                                        width: 20,
                                        textAlign: 'center',
                                    }}>0</Text>
                                    <TouchableOpacity
                                        onPress={() => handleIncrement(item.id)}
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
                                <Text style={{
                                    fontSize: 12,
                                }}>Per items</Text>
                                <Text style={{
                                    fontSize: 15,
                                    color: COLORS.green,
                                    fontWeight: 'bold'
                                }}>$166USD</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
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