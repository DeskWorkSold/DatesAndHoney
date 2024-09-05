import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, ProgressBarAndroid, ProgressBarIOS, Platform } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors'
import { useState } from 'react';
import CustomeButton from '../../../components/CustomeButton';
import { logout, mediatorLogin, selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Path from '../../../../assets/Path.svg';
// import Tik from '../../../../assets/tik.svg';
import MyIcon from '../../../../assets/tik.svg';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProfileScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(0.5);
    const mediator = useSelector(selectMediatorUser);
    const [name, setName] = useState(mediator?.userDetails?.Name);
    const [email, setEmail] = useState(mediator?.userDetails?.email);
    const [location, setLocation] = useState();
    const [about, setabout] = useState(mediator?.userDetails?.Bio);
    const dispatch = useDispatch();

    const OnLogOut = () => {
        // navigation.navigate('LoginScreen')
        try {
            auth()
                .signOut()
                .then(() =>
                    console.log('User signed out!'),
                    ToastAndroid.show('Signed out!', ToastAndroid.SHORT),
                    //   navigation.navigate('LoginScreen')
                );
            // const userData = await AsyncStorage.getItem('session');
            //   await AsyncStorage.removeItem('CurrentUserData')
            //   await AsyncStorage.removeItem('CurrentUser')
            dispatch(logout());
        }
        catch (exception) {
            return false;
        }
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>

                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={{
                        marginBottom: 200,
                        backgroundColor: COLORS.white,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            // backgroundColor: COLORS.gray,
                            //   paddingHorizontal: 20,
                            alignItems: 'stretch',
                            paddingBottom: 20
                        }}>
                            <View>
                                <View style={{
                                    borderWidth: 3,
                                    borderColor: COLORS.main,
                                    borderRadius: 100
                                }}>
                                    <Image source={{ uri: mediator.userDetails.image1 }} resizeMode='cover' style={{
                                        borderRadius: 80,
                                        width: 100,
                                        height: 100
                                    }} />
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    marginTop: -10,
                                    backgroundColor: COLORS.main,
                                    width: width / 8,
                                    borderRadius: 10,
                                }}>
                                    <Text style={{ color: COLORS.black, fontSize: 13, }}>
                                        100%
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                paddingLeft: 20
                            }}>
                                <View style={{
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: COLORS.black
                                    }}>
                                        {mediator?.userDetails?.Name &&
                                            mediator?.userDetails?.Name?.charAt(0).toUpperCase() + mediator?.userDetails?.Name.slice(1)
                                        }
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: COLORS.light,
                                    borderRadius: 5,
                                    width: '100%',
                                    padding: 5,
                                    paddingHorizontal: 10,
                                    marginTop: 5,
                                }}>
                                    <Text style={{ color: COLORS.black, fontSize: 13 }}>Match Cordenator</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{
                                justifyContent: 'center',
                                marginTop: 10,
                                paddingTop: 20,
                                paddingBottom: 30,
                                // height: 45,
                                width: width / 1.2,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                elevation: 5
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 20,
                                }}>
                                    <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: 'bold', paddingRight: 10, }}>Sign Up Progress</Text>
                                    <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>66%</Text>
                                </View>
                                <View style={{
                                    marginTop: 20,
                                    paddingHorizontal: 20,
                                    // alignItems: 'center',
                                    // backgroundColor: COLORS.gray,
                                    // height:50
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <View style={{
                                            paddingRight: 10,
                                        }}>
                                            <Image
                                                source={require('../../../../assets/tik.png')}
                                                style={{ width: 20, height: 20, tintColor: COLORS.main }}
                                            />
                                            <View style={{
                                                width: 1, height: 30, backgroundColor: COLORS.main, alignSelf: 'center'
                                            }}>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.black
                                            }}>Input Information</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <View style={{
                                            paddingRight: 10,
                                        }}>
                                            <Image
                                                source={require('../../../../assets/tik.png')}
                                                style={{ width: 20, height: 20, tintColor: COLORS.main }}
                                            />
                                            <View style={{
                                                width: 1, height: 30, backgroundColor: COLORS.main, alignSelf: 'center'
                                            }}>
                                            </View>
                                        </View>
                                        <View >
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.black
                                            }}>Sign Up</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <View style={{
                                            paddingRight: 10,
                                        }}>
                                            <Image
                                                source={require('../../../../assets/tik.png')}
                                                style={{ width: 20, height: 20, tintColor: COLORS.gray2 }}
                                            />
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.black
                                            }}>Get approved by Admin</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <View style={styles.NumberInput}>
                                    <View>
                                        <Text style={{ color: COLORS.black }}>Payment Type</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('PaymentType', { title: 'Payment Type' })}>
                                        <Path width={15} height={15} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 20 }}>
                                <View style={styles.NumberInput}>
                                    <View>
                                        <Text style={{ color: COLORS.black }}>Religions</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('ReligionsWorkWith', { titel: 'Payment Type' })}>
                                        <Path width={15} height={15} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 20 }}>
                                <View style={styles.NumberInput}>
                                    <View>
                                        <Text style={{ color: COLORS.black }}>Terms and Conditions</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('TermsAndCondition', { titel: 'Payment Type' })}>
                                        <Path width={15} height={15} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 20 }} >
                                <TouchableOpacity style={styles.NumberInput} onPress={() => OnLogOut()}>
                                    <View>
                                        <Text style={{ color: COLORS.black }}>Log Out</Text>
                                    </View>
                                    <View>
                                        <Path width={15} height={15} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        width: width,
        height: height,
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 45,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 5
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
    NumberInput2: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: 340,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4,
        marginTop: 5,
    },
    TextInput2: {
        paddingTop: 10,
        backgroundColor: COLORS.transparent,
        height: 200,
        textAlignVertical: 'top',
    },
})