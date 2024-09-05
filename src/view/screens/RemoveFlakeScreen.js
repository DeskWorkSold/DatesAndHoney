import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, Modal, ActivityIndicator, ToastAndroid, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { FlakesBill, selectPaymentCards, selectUser } from '../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const { width, height } = Dimensions.get('window')

const RemoveFlakeScreen = ({ navigation }) => {
    const [name, setName] = useState(null);
    const [showPoppup, setShowPoppup] = useState(false);
    const [uploading, setUploading] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const PaymentCards = useSelector(selectPaymentCards)
    // console.log(user);


    const RemoveFlakeScreen = () => {
        // const obj = new Object();
        // obj.Flake = name;
        // obj.FlakeTime = new Date().toString();
        // obj.TotalPrice = name * 20;
        // // console.log(obj);

        // navigation.navigate('CheckoutScreenFlakeRemove', {
        //     data: obj
        // })
        // return
        if (user.Flake >= 1) {
            // console.log(name >= 1 , name , user.Flake >= name);
            if (name >= 1 && name && user.Flake >= name) {
                console.log('RemoveFlake');
                const obj = new Object();
                obj.Flake = name;
                obj.FlakeTime = new Date().toString();
                obj.TotalPrice = name * 20;
                // console.log(obj);
                // return
                // dispatch(FlakesBill(obj))
                if (PaymentCards?.length > 0) {
                    navigation.navigate('CheckoutScreenFlakeRemove', {
                        data: obj
                    })
                }
                else {
                    navigation.navigate('PaymentOptionScreen')
                }
                // console.log(obj);
                // setUploading(true)
                // // navigation.navigate('QuestionWantKidsScreen')
                // const userRef = firestore().collection('Users')
                //     .doc(user.uid)
                // userRef.update({
                //     'userDetails.Flake': firestore.FieldValue.increment(-name),
                // }).then(() => {
                //     console.log('Flake Added!');
                //     setShowPoppup(true)
                //     setName('')
                //     // console.log(item);
                //     setUploading(false)
                // });
            }
            else {
                if (!name) {
                    ToastAndroid.show("Please enter number of flake you want to remove!", ToastAndroid.SHORT);
                }
                else if (name < 1) {
                    ToastAndroid.show("You cannot remove less then 1 flake", ToastAndroid.SHORT);
                }
                else if (user.Flake < name) {
                    ToastAndroid.show("You have entered more number flake which is not even on your profile!", ToastAndroid.SHORT);
                }
            }
        }
        else {
            ToastAndroid.show("You dont have any flake on your profile!", ToastAndroid.SHORT);
        }

    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        // height: '70%',
                        // backgroundColor:COLORS.main
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: COLORS.white,
                            height: 80
                        }}>
                            <View style={{ width: '20%' }}>
                                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                    <Image source={require('../../assets/menu.png')} resizeMode='contain'
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
                                }}>Flakes</Text>
                            </View>

                            <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                            </View>
                        </View>


                        <View style={{
                            paddingHorizontal: 20,
                            paddingTop: 20,
                        }}>
                            <View>
                                <Text style={{
                                    color: COLORS.gray,
                                    fontSize: 12
                                }}>
                                    Remove your flakes for $20 per flakes  or 5$ to remove with flak insurance. Flakes on your profile are added when you cancel date after certain time or do not reach date destination
                                </Text>
                            </View>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 25,
                            paddingVertical: 20,
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.light
                        }}>
                            <View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: COLORS.black
                                }}>Flake Meter</Text>
                                <Text style={{
                                    color: COLORS.gray,
                                    fontSize: 12
                                }}>Flakes on your profile</Text>
                            </View>

                            <View>
                                <Text style={{
                                    color: COLORS.black,
                                    textAlign: 'center'
                                }}>
                                    #flakemeter
                                </Text>
                                {user.Flake == 1 &&
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.main
                                        }} />
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                        <Text style={{
                                            color: COLORS.gray
                                        }}>
                                            +{user.Flake}
                                        </Text>
                                    </View>
                                    // <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                }
                                {user.Flake == 2 &&
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.main
                                        }} />
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.main
                                        }} />
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                        <Text style={{
                                            color: COLORS.gray
                                        }}>
                                            +{user.Flake}
                                        </Text>
                                    </View>
                                }
                                {user.Flake == 3 &&
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.main
                                        }} />
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.main
                                        }} />
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.main
                                        }} />
                                        <Text style={{
                                            color: COLORS.gray
                                        }}>
                                            +{user.Flake}
                                        </Text>
                                    </View>
                                }
                                {user.Flake > 3 &&
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.main
                                        }} />
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.main
                                        }} />
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.main
                                        }} />
                                        <Text style={{
                                            color: COLORS.gray
                                        }}>
                                            +{user.Flake}
                                        </Text>
                                    </View>
                                }
                                {user.Flake < 1 &&
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                        <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                        <Text style={{
                                            color: COLORS.gray
                                        }}>
                                            +0
                                        </Text>
                                    </View>

                                }
                                {/* <Image source={require('../../assets/flakemeter.png')} resizeMode='contain' /> */}
                            </View>
                        </View>

                        <View style={{
                            paddingHorizontal: 25,
                            paddingVertical: 5,
                        }}>
                            <View style={{
                                paddingBottom: 5
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>Remove Flakes</Text>
                            </View>
                            <View>
                                <Text style={{
                                    color: COLORS.gray,
                                    fontSize: 12
                                }}>No of flakes (min 1)</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={name}
                                        placeholder={'0'}
                                        placeholderTextColor={COLORS.gray}
                                        keyboardType='number-pad'
                                        onChangeText={name => setName(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        // height: '10%'
                    }}>
                        <View style={{
                            paddingTop: 100,
                            marginBottom: 50,
                            alignItems: 'center'
                        }}>
                            {!uploading == true ?
                                <CustomeButton onpress={() => RemoveFlakeScreen()}
                                    title={`Remove ${name ? name : 0} Flake`} width={width / 1.1} />
                                :
                                <View style={{
                                    backgroundColor: COLORS.main,
                                    width: width / 1.1,
                                    height: 50,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default RemoveFlakeScreen

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
        width: 340,
        padding: 0,
        backgroundColor: COLORS.transparent,
        color: COLORS.black
    },
})