import { Image, StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton'
import { useState } from 'react';
const { width, height } = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import Toast from 'react-native-simple-toast';


const RateUsScreen = ({ navigation }) => {
    const user = useSelector(selectUser)
    // console.log(user.image1);
    const [loading, setLoading] = useState(false);
    const [showPoppup, setShowPoppup] = useState(false);
    const [defaultRating, setDefaultRating] = useState(0);
    const [userRating, setUserRating] = useState(null)
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [ratingReasone, setRatingReasone] = useState({
        visible: false,
        reasone: null,
    })

    const CustomRatingBar = (size) => {
        // console.log(size);
        return (
            <View style={{
                justifyContent: size?.size ? 'flex-start' : 'center',
                flexDirection: 'row',
                marginTop: size?.size ? 0 : 30,
            }}>
                {maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => size?.size ? null : setDefaultRating(item)}>
                            {item <= defaultRating
                                ? <AntDesign name='star' color={COLORS.main} size={size?.size ? size?.size : 40} />
                                : <AntDesign name='staro' color={COLORS.main} size={size?.size ? size?.size : 40} />}
                            {/* <Image
                                style={{
                                    width: widthOne ? widthOne : 40,
                                    height: heightOne ? heightOne : 40,
                                    resizeMode: 'cover',
                                }}
                                source={
                                    item <= defaultRating
                                        ? { uri: starImageFilled }
                                        : { uri: starImageCorner }
                                }
                            /> */}
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const ShowRateUsModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPoppup}
                onRequestClose={() => {
                    setShowPoppup(!showPoppup);
                }}>
                <View style={{
                    height: height,
                    backgroundColor: COLORS.white
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingTop: 50
                    }}>
                        <View style={{ justifyContent: 'center', marginRight: -10 }}>
                            <Image source={require('../../assets/like2.png')} resizeMode='contain'
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Image source={require('../../assets/like3.png')} resizeMode='contain'
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <View style={{ justifyContent: 'center', marginLeft: -10 }}>
                            <Image source={require('../../assets/like1.png')} resizeMode='contain'
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 30,
                                }} />
                        </View>

                    </View>
                    <View style={{
                        alignItems: 'center',
                        paddingTop: 30,
                        paddingHorizontal: 40
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>Your opinion matters to us!</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: COLORS.gray,
                        }}>We work super hard to make Glose better you, and would love to know : how would you rate our</Text>
                    </View>
                    {ratingReasone?.visible ?
                        <View style={{
                            marginHorizontal: 20,
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.main
                            }}>Reasone :</Text>
                            <TextInput
                                value={ratingReasone?.reasone}
                                placeholder={'Enter reasone for less rating...'}
                                onChangeText={text => setRatingReasone({
                                    ...ratingReasone,
                                    reasone: text
                                })
                                }
                                placeholderTextColor={COLORS.gray}
                                selectionColor={COLORS.black}
                                underlineColor={COLORS.white}
                                activeUnderlineColor={COLORS.white}
                                style={{
                                    padding: 0,
                                    backgroundColor: COLORS.white,
                                    // width:'100%',
                                    elevation: 2,
                                    padding: 10,
                                    fontSize: 12,
                                    borderRadius: 10,
                                    textAlignVertical: 'top'
                                }}
                                multiline
                                numberOfLines={5}
                                editable={true}
                            />
                        </View>
                        :
                        <>
                            <CustomRatingBar />
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 12,
                                color: '#000',
                                marginTop: 15,
                            }}>
                                {/* To show the rating selected */}
                                {defaultRating} / {Math.max.apply(null, maxRating)}
                            </Text>
                        </>
                    }
                    <View style={{
                        marginTop: 30,
                        alignSelf: 'center'
                    }}>
                        <CustomeButton title={loading ? 'Please wait...' : 'Submit'} width={width / 2}
                            onpress={() => loading ? null : OnSubmitRates()}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            marginTop: 30,
                            alignSelf: 'center'
                        }}>
                        <Text style={{
                            color: COLORS.blue,

                        }}>No Thanks</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    const OnSubmitRates = () => {
        setLoading(true)
        if (defaultRating < 5) {
            if (ratingReasone?.visible && ratingReasone?.reasone && defaultRating > 0) {
                try {
                    const ref = firestore().collection('AppRating')
                        .doc(user?.uid)
                    // console.log('sunbmit rating here' , ratingReasone?.reasone , defaultRating);
                    if (userRating) {
                        ref.update({
                            'reasone': ratingReasone?.reasone,
                            'Ratings': defaultRating,
                            'uid': user?.uid
                        })
                        setLoading(false)
                        setRatingReasone({
                            ...ratingReasone,
                            visible: false,
                            reasone: null
                        })
                        setShowPoppup(false)
                    }
                    else {
                        ref.set({
                            'reasone': ratingReasone?.reasone,
                            'Ratings': defaultRating,
                            'uid': user?.uid
                        })
                        setLoading(false)
                        setRatingReasone({
                            ...ratingReasone,
                            visible: false,
                            reasone: null
                        })
                        setShowPoppup(false)
                    }
                }
                catch (e) {
                    console.log(e);
                    Toast.show(`Error :  ${e}`, Toast.LONG);
                    setLoading(false)
                    setRatingReasone({
                        ...ratingReasone,
                        visible: false,
                        reasone: null
                    })
                }
            }
            else if (!defaultRating || defaultRating < 0) {
                Toast.show('Please select rating first.', Toast.LONG);
                setLoading(false)
            }
            else if (!ratingReasone?.reasone && defaultRating > 0) {
                setRatingReasone({
                    ...ratingReasone,
                    visible: true,
                })
                Toast.show('Please enter your reasone for less rating.', Toast.LONG);
                setLoading(false)
            }
        }
        else {
            // console.log('sunbmit rating here and go to playstore');
            try {
                const ref = firestore().collection('AppRating')
                    .doc(user?.uid)
                // console.log('sunbmit rating here' , ratingReasone?.reasone , defaultRating);
                if (userRating) {
                    ref.update({
                        'reasone': ratingReasone?.reasone,
                        'Ratings': defaultRating,
                        'uid': user?.uid
                    })
                    setLoading(false)
                    setRatingReasone({
                        ...ratingReasone,
                        visible: false,
                        reasone: null
                    })
                    setShowPoppup(false)
                }
                else {
                    ref.set({
                        'reasone': ratingReasone?.reasone,
                        'Ratings': defaultRating,
                        'uid': user?.uid
                    })
                    setLoading(false)
                    setRatingReasone({
                        ...ratingReasone,
                        visible: false,
                        reasone: null
                    })
                    setShowPoppup(false)
                }
            }
            catch (e) {
                console.log(e);
                Toast.show(`Error :  ${e}`, Toast.LONG);
                setLoading(false)
                setRatingReasone({
                    ...ratingReasone,
                    visible: false,
                    reasone: null
                })
            }
        }
    }
    // console.log(userRating?.reasone);
    const GetUserRating = () => {
        setLoading(true)
        try {
            firestore().collection('AppRating')
                .doc(user?.uid)
                .onSnapshot(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        const Data = documentSnapshot.data()
                        setDefaultRating(Data?.Ratings)
                        setUserRating(Data)
                        setLoading(false)
                    }
                    else {
                        setShowPoppup(true)
                        setLoading(false)
                    }
                })
        }
        catch (e) {
            console.log(e);
            setShowPoppup(true)
            setLoading(false)
        }
    }
    // console.log(userRating);
    useEffect(() => {
        GetUserRating()
    }, [])
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <StatusBar backgroundColor={COLORS.black} />
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    height: 60
                }}>
                    <View style={{ width: '20%' }}>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Image source={require('../../assets/menu.png')} resizeMode='contain'
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
                        }}>Rate Us</Text>
                    </View>
                    <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingBottom: 100,
                    backgroundColor: COLORS.white
                }}>
                    {userRating?.Ratings ?
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.light,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                                height: 100,
                                marginHorizontal: 10
                            }}>
                                <View style={{
                                    marginHorizontal: 10,
                                    borderRadius: 50,
                                    width: 65,
                                }}>
                                    <Image source={{ uri: user.image1 }} resizeMode='cover'
                                        style={{
                                            width: 65,
                                            height: 65,
                                            borderRadius: 50,
                                        }} />
                                </View>

                                <View style={{
                                    width: '50%',
                                    // backgroundColor:COLORS.gray
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            color: COLORS.black,
                                            fontSize: 14,
                                        }}>{user?.Name}</Text>
                                    </View>
                                    <CustomRatingBar size={20} />
                                </View>
                                <TouchableOpacity style={{
                                    width: '20%',
                                    backgroundColor: COLORS.main,
                                    padding: 5,
                                    borderRadius: 5,
                                }}
                                    onPress={() => setShowPoppup(true)}
                                >
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 10,
                                        alignSelf: 'center'
                                    }}>Rate Us</Text>
                                </TouchableOpacity>
                            </View>
                            {userRating?.reasone &&
                                <View style={{
                                    paddingHorizontal: 20,
                                    marginBottom: 20,
                                }}>
                                    <Text style={{
                                        color: COLORS.main,
                                        fontSize: 12,
                                    }}>Reasone :</Text>
                                    <Text style={{
                                        color: COLORS.gray,
                                        fontSize: 12,
                                    }}>{userRating?.reasone}</Text>
                                </View>
                            }
                        </View>
                        :
                        <View style={{
                            height: 60,
                            alignSelf: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>No rating review available!</Text>
                        </View>
                    }
                    {ShowRateUsModal()}
                </View>
            </ScrollView>


            <Loader modal={loading} uploading={loading} />
        </SafeAreaView>
    )
}

export default RateUsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%',
    },
})