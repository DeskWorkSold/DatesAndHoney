import { ActivityIndicator, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/reducers/Reducers';
import SearchTab from '../components/SearchTab';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';

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

const Foodmenu = ({ navigation, route }) => {
    // const { BuyTickets, paymentCard } = route.params;
    const [search, setSearch] = useState();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState()
    const [foods, setFoods] = useState()
    const user = useSelector(selectUser);

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
    }


    useEffect(() => {
        fectchMenu();
        // console.log('test efftec', foods);
    }, [])
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 10,
                    justifyContent: 'space-between',
                }}>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: 12, marginRight: 3 }}>Your Location</Text>
                            <Image source={require('../../assets/dropdown.png')} resizeMode="contain"
                                style={{ width: 10, height: 10, }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: COLORS.black }}>Karachi, Pakistan</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{
                            backgroundColor: COLORS.mainlight,
                            padding: 10,
                            borderRadius: 10,
                        }}>
                            <Image source={require('../../assets/bell.png')} resizeMode='contain' style={{
                                width: 20,
                                height: 20,
                            }} />
                        </View>
                    </View>
                </View>

                <View style={styles.NumberInput}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '75%',
                        height: 45,
                        alignItems: 'center',
                        marginRight: 5,
                        // justifyContent: 'center',
                        paddingHorizontal: 20,
                        backgroundColor: COLORS.light,
                        borderRadius: 10,
                        // borderBottomLeftRadius: 10,
                    }}>
                        <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                            marginRight: 5,
                            width: 15,
                            height: 15,
                            tintColor: COLORS.gray
                        }} />
                        <TextInput
                            value={search}
                            placeholder={'Search'}
                            onChangeText={search => setSearch(search)
                            }
                            style={styles.TextInput}
                        />
                    </View>
                    <TouchableOpacity style={{
                        alignItems: 'flex-end',
                        backgroundColor: COLORS.main,
                        width: '15%',
                        height: 45,
                        borderRadius: 10,
                        // borderBottomRightRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image source={require('../../assets/filter.png')} resizeMode='contain' style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black
                        }} />
                    </TouchableOpacity>
                </View>

                {foods ?
                    <ScrollView verticcal showsVerticalScrollIndicator={false}>
                        <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingTop: 10,
                            paddingBottom: 20
                        }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {category ?
                                    <>
                                        {category.map((item, index) => (
                                            // console.log(item.menu),
                                            <TouchableOpacity key={index} style={{
                                                marginRight: 10,
                                                borderRadius: 10,
                                                backgroundColor: '#FFE8E0',
                                                // paddingHorizontal: 10,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingLeft: 10,
                                                height: 40,
                                                width: 120,
                                                justifyContent: 'space-between'
                                            }}>
                                                <Text style={{ color: '#FF4201', fontSize: 12, fontWeight: 'bold' }}>{item.category}</Text>
                                                <Image source={{ uri: item.image }} resizeMode="cover" style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 10,
                                                    // padding:15,
                                                    justifyContent: 'center',
                                                }} />
                                            </TouchableOpacity>
                                        ))}
                                    </>
                                    :
                                    null}
                            </ScrollView>
                        </View>


                        <View style={{
                            paddingHorizontal: 20,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Menu</Text>
                        </View>

                        <View style={{ paddingHorizontal: 20, }}>
                            {foods ?
                                <View style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: "space-between",
                                    width: '100%',
                                    marginBottom: 50
                                }}>
                                    {foods.map((item, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                marginTop: 20,
                                                width: '45%',
                                                backgroundColor: COLORS.white,
                                                marginBottom: 5,
                                                borderRadius: 10,
                                                // elevation:8
                                            }}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('FoodmenuDetail', { details: item })}
                                                style={{
                                                    width: '100%',
                                                }}>
                                                <Image source={{ uri: item.image }} resizeMode='contain' style={{
                                                    width: '100%',
                                                    height: 120
                                                }} />
                                            </TouchableOpacity>
                                            <View style={{
                                                width: '100%',
                                                // backgroundColor:COLORS.main,
                                                paddingLeft: 20,
                                                marginVertical: 3,
                                            }}>
                                                <Text style={{
                                                    color: COLORS.black,
                                                    fontSize: 15
                                                }}>{item.name}</Text>
                                            </View>
                                            <View style={{
                                                width: '70%',
                                                paddingHorizontal: 20,
                                                flexDirection: 'row',
                                                marginBottom: 3,
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{ paddingRight: 5, fontSize: 12, }}>15min</Text>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Image source={require('../../assets/star.png')} style={{
                                                        width: 15,
                                                        height: 15,
                                                        tintColor: COLORS.main,
                                                        marginRight: 3
                                                    }} />
                                                    <Text style={{ fontSize: 12 }}>{item.stars}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                width: '100%',
                                                flexDirection: 'row',
                                                marginBottom: 3,
                                                paddingHorizontal: 20
                                            }}>
                                                <View style={{
                                                    width: '70%',
                                                    // backgroundColor: COLORS.gray
                                                }}>
                                                    <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>${item.price}</Text>
                                                </View>
                                                <TouchableOpacity style={{
                                                    width: '30%',
                                                    backgroundColor: COLORS.main,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    paddingVertical: 5,
                                                    borderRadius: 5,
                                                    marginTop: -10
                                                }}>
                                                    <Image source={require('../../assets/whishlist.png')} style={{
                                                        width: 15,
                                                        height: 15,
                                                        tintColor: COLORS.black,
                                                        marginRight: 3
                                                    }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    ))}

                                </View>
                                :
                                <Text>loading...</Text>
                            }
                        </View>

                    </ScrollView>
                    :
                    <View style={{
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}>
                        <ActivityIndicator size="small" color={COLORS.main} animating={loading} />
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default Foodmenu

const styles = StyleSheet.create({
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