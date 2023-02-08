import { ActivityIndicator, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, ADD_ITEM, selectUser } from '../../../redux/reducers/Reducers';
import SearchTab from '../components/SearchTab';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { useEffect } from 'react';
import CustomeButton from '../components/CustomeButton';

const data = [
    {
        id: 1,
        image: require('../../assets/food.png'),
        name: 'Chicken Biryani',
        price: 15.00,
        stars: 5.0,
    },
    {
        id: 2,
        image: require('../../assets/food.png'),
        name: 'Chicken Biryani',
        price: 15.00,
        stars: 5.0,
    },
    {
        id: 3,
        image: require('../../assets/food.png'),
        name: 'Chicken Biryani',
        price: 15.00,
        stars: 5.0,
    },
    {
        id: 4,
        image: require('../../assets/food.png'),
        name: 'Chicken Biryani',
        price: 15.00,
        stars: 5.0,
    },
    {
        id: 5,
        image: require('../../assets/food.png'),
        name: 'Chicken Biryani',
        price: 15.00,
        stars: 5.0,
    },
    {
        id: 6,
        image: require('../../assets/food.png'),
        name: 'Chicken Biryani',
        price: 15.00,
        stars: 5.0,
    },
]

const FoodmenuDetail = ({ navigation, route }) => {
    const { details } = route.params;
    // console.log(details);
    const [qty, setQty] = useState(1);
    const [search, setSearch] = useState();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState()
    const [foods, setFoods] = useState()
    const user = useSelector(selectUser);
    const dispatch = useDispatch();




    const handleDecrement = () => {
        // console.log('dec');
        if (qty > 1) {
            setQty(perv => perv - 1);
        }
    }

    const handleIncrement = () => {
        // console.log('inc');
        if (qty < 10) {
            setQty(perv => perv + 1);
        }
    }

    const fectchMenu = async () => {
        try {
            setLoading(true)
            await firestore()
                .collection('Foods')
                .get()
                .then(querySnapshot => {
                    // console.log('Total user: ', querySnapshot.size);
                    const menu = [];
                    const categoryfilter = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        // console.log(documentSnapshot.data().menu);
                        const arrydata = documentSnapshot.data().menu;
                        // const all2 = [].concat(arrydata);
                        // console.log(arrydata);
                        // const res = documentSnapshot.data().menu;
                        // res.map(())
                        menu.push(documentSnapshot.data().menu);
                        categoryfilter.push(documentSnapshot.data());
                        // categoryfilter.push(documentSnapshot.data().);
                        // menuid.push(documentSnapshot.id);
                    });
                    const merge3 = menu.flat(1);

                    // merge3.map(res => {
                    //     if (res.category == 'Burgers' || res.category == 'Pizzas' || res.category == 'Cakes') {
                    //         // console.log('===>',res);
                    //         categoryfilter.push(res);
                    //     }
                    // })
                    // console.log(categoryfilter);
                    setCategory(categoryfilter)
                    setFoods(merge3)
                    // setMembershipUid(membershipsuid)
                })
            setLoading(false)
        }
        catch (e) {
            console.log(e);
        }
    };


    const onOrderMenu = () => {
        // console.log('order here', details);
        var Data = new Object();
        Data.id = details.id;
        Data.category = details.category;
        Data.description = details.description;
        Data.image = details.image;
        Data.name = details.name;
        Data.price = details.price;
        Data.stars = details.stars;
        Data.qty = qty;
        if (qty > 1) {
            const totalprice = details.price * qty
            // console.log(totalprice.toFixed(2));
            Data.Totalprice = totalprice.toFixed(2)
        }
        else {
            const totalprice = details.price
            // console.log(totalprice);
            Data.Totalprice = totalprice
        }
        // console.log(Data);
        navigation.navigate('CartItems')
        // dispatch(addToCart(Data))
        // const selectItem = (item , checkboxValue) => dispatch({
        //     type: 'ADD_TO_CART',
        //     payload: { ...item, 
        //       restaurantName: restaurantName, 
        //       checkboxValue: checkboxValue},
        //   })
    }


    useEffect(() => {
        // fectchMenu();
        // console.log('test efftec', foods);
    }, [])
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '40%',
            }}>
                <ImageBackground source={{ uri: details.image }} resizeMode="cover" style={{ height: '100%', width: '100%' }}>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingVertical: 10, }}>
                        <Icon name='arrow-back' size={20} onPress={navigation.goBack} color={COLORS.main} />
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.detail}>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.black }}>{details.name}</Text>
                    {/* <View style={styles.IconContainer}>
                        <Icon name='favorite-border' color={COLORS.primary} size={23} />
                    </View> */}
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 5
                }}>
                    <Text style={{ fontSize: 12, paddingRight: 5, }}>24min</Text>
                    <View style={{
                        flexDirection: 'row',
                        // alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/star.png')} style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.main,
                            marginRight: 3
                        }} />
                        <Text style={{ fontSize: 12 }}>{details.stars}</Text>
                    </View>
                    <Text style={{
                        fontSize: 12,
                        paddingRight: 5,
                        marginLeft: 5,
                        color: COLORS.main,
                        backgroundColor: COLORS.mainlight,
                        textAlign: 'center',
                        padding: 5,
                        borderRadius: 5,
                    }}>Healthy</Text>
                </View>
                <Text style={{
                    color: COLORS.black,
                    fontSize: 15,
                    paddingTop: 10,
                }}>
                    Description
                </Text>
                <Text style={styles.detailText}>
                    {details.description}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 20,
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        width: '50%', flexDirection: 'row', height: 35, alignItems: 'center',
                        borderRadius: 10,
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => handleDecrement()}
                            style={{
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                // backgroundColor: COLORS.light,
                                alignItems: 'center',
                                width: '30%',
                                borderColor: COLORS.gray2,
                                borderWidth: 1,
                                justifyContent: 'center',
                                height: 35,
                                justifyContent: 'center',
                            }}>
                            <Text style={{
                                color: COLORS.main,
                                fontSize: 20,
                                marginRight: 5,
                                paddingLeft: 5,
                                fontSize: 20,
                            }}>-</Text>
                        </TouchableOpacity>
                        <View style={{
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: COLORS.gray2,
                            justifyContent: 'center',
                            backgroundColor: COLORS.white,
                            paddingHorizontal: 3,
                            fontSize: 15,
                            width: '40%',
                            height: 35,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: COLORS.main,
                                fontWeight: 'bold',
                                fontSize: 20,
                            }}>{qty}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleIncrement()}
                            style={{
                                borderWidth: 1,
                                borderColor: COLORS.gray2,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                // backgroundColor: COLORS.gray2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '30%',
                                height: 35,
                            }}>
                            <Text style={{
                                color: COLORS.main,
                                fontSize: 16,
                                marginRight: 5,
                                paddingLeft: 5,
                                fontSize: 20,
                            }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: COLORS.black
                        }}>
                            ${details.price}
                        </Text>
                    </View>
                </View>
                <View style={{ marginVertical: 40, alignItems: 'center' }}>
                    <CustomeButton title={'ADD TO CARD'} onpress={() => onOrderMenu()} />
                </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

export default FoodmenuDetail

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    detail: {
        marginTop: -40,
        height: '70%',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: COLORS.white,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    IconContainer: {
        backgroundColor: COLORS.white,
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailText: {
        // marginTop: 5,
        lineHeight: 22,
        fontSize: 12,
        // color: COLORS.black,
    },
    container: {
        height: '100%',
        backgroundColor: COLORS.white,
    },
    NumberInput: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 20,
        // paddingHorizontal: 20,
        // height: 45,
        width: '100%',
        // backgroundColor: COLORS.light,
        // borderRadius: 5,
        paddingBottom: 10
    },
})