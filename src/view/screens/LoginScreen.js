import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import COLORS from '../../consts/Colors';
import CustomeButton from '../components/CustomeButton';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import SVGImg from '../../assets/logo.svg';
const { width, height } = Dimensions.get("window");
import Loader from '../components/Loader';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';



const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    GoogleSignin.configure({
        webClientId: '604072040126-h8dmu5km29t8co8shb2isrkjn4fniqj4.apps.googleusercontent.com',
    });

    // useEffect(() => {
    //     GoogleSignin.configure();
    // }, [])

    const checkIfPhoneNumberExistsInUserApp = async (uid) => {
        // console.log(phoneNumber);
        const UserAppSnapshot = await firestore()
            .collection('Users')
            .where("userDetails.Category", "==", 'Mediator')
            .where("userDetails.uid", '==', uid)
            .get();

        return !UserAppSnapshot.empty;
    };

    async function onGoogleSigninPress() {
        // console.log('test');
        try {
            setLoading(true)
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            await GoogleSignin.signOut();
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // console.log('Token: ', idToken);
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential)
                .then((data) => {
                    // console.log(data);
                    // afterGoogleLogin()
                    if (data) {
                        var uid = data?.user?.uid
                        checkIfPhoneNumberExistsInUserApp(uid)
                            .then((exists) => {
                                if (exists) {
                                    ToastAndroid.show("This account is already used in the D&H Crew app.", ToastAndroid.SHORT);
                                    setLoading(false)
                                } else {
                                    afterGoogleLogin()
                                }
                            })
                        return
                    }
                    else {
                        setLoading(false)
                        ToastAndroid.show("This account is already used in the D&H Crew app.", ToastAndroid.SHORT);
                    }
                    return
                });
        }
        catch (error) {
            setLoading(false)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // console.log('sign in cancelled');
                ToastAndroid.show('sign in cancelled' + error, ToastAndroid.SHORT);
            }
            else if (error.code === statusCodes.IN_PROGRESS) {
                // console.log('sign in is in progress already');
                ToastAndroid.show('sign in is in progress already' + error, ToastAndroid.SHORT);
            }
            else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // console.log('play services not available or outdateb');
                ToastAndroid.show('play services not available or outdateb' + error, ToastAndroid.SHORT);
            }
            else {
                // console.log('some other error');
                ToastAndroid.show('Please check your internet and try again ' + error, ToastAndroid.SHORT);
            }
        }
    }

    const afterGoogleLogin = () => {
        // console.log('after');
        setLoading(false)
        ToastAndroid.show('User Registered with Google Successfully!', ToastAndroid.SHORT);
        navigation.navigate('NameScreen')
    }



    const OnLogOut = async () => {
        // console.log('logout');
        try {
            auth()
                .signOut()
                .then(() =>
                    console.log('logout')
                );
        }
        catch (exception) {
            return false;
        }
    }
    // const user = auth().currentUser
    // useEffect(() => {
    //     if (user) {
    //         OnLogOut()
    //     }
    //     return () => {
    //         OnLogOut();
    //     }
    // }, [])

    return (
        <ImageBackground source={require('../../assets/loginbackground.png')} resizeMode="cover" style={StyleSheet.absoluteFillObject}>
            <View style={styles.overlay} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ height: height, justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                        <View style={{ paddingTop: 40 }}>
                            <SVGImg width={144} height={103} />
                        </View>
                        <View style={{
                            paddingTop: 20,
                            width: 310,
                            // paddingBottom:150,
                        }}>
                            <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 12 }}>
                                Your social life made sweeter
                            </Text>
                        </View>

                        <View style={{
                            paddingTop: 50,
                            width: 310,
                        }}>
                            <Text style={{ textAlign: 'center', color: COLORS.white }}>
                                Lets get started
                            </Text>
                        </View>

                        <View style={{ paddingTop: 20, }}>

                            <CustomeButton width={width / 1.1} onpress={() => navigation.navigate('LoginWithNumberScreen')} title={'Login with phone number'} />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 45,
                            paddingVertical: 35,
                        }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLORS.white }} />
                            <View>
                                <Text style={{
                                    width: 50,
                                    textAlign: 'center',
                                    color: COLORS.white,
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>Or</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLORS.white }} />
                        </View>

                        {/* <View style={{
                        paddingTop: 35,
                    }}>
                        <CustomeButton width={width / 1.1} color={COLORS.white} bcolor={COLORS.black} image={require('../../assets/apple.png')} title={'Continue with Apple'} />
                    </View> */}

                        {/* <View style={{
                        paddingTop: 15,
                    }}>
                        <CustomeButton width={width / 1.1} bcolor={COLORS.blue} color={COLORS.white} image={require('../../assets/facebook.png')} title={'Continue with Facebook'} />
                    </View> */}

                        <View style={{
                            paddingTop: 0,
                        }}>
                            <CustomeButton width={width / 1.1} color={COLORS.black} bcolor={COLORS.white} image={require('../../assets/google.png')} title={'Continue with Google'}
                                onpress={() => onGoogleSigninPress()} />
                        </View>

                        {/* <TouchableOpacity
                        onPress={() => navigation.navigate('MadiatorStack')}
                        style={{
                            paddingTop: 50,
                        }}>
                        <Text style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.white,
                            textAlign: 'center',
                            color: COLORS.white
                        }}>
                            Login as Mediator
                        </Text>
                    </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
            <Loader modal={loading} uploading={loading} />
        </ImageBackground>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    absoluteFillObject: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        // height:height,
        // width:width,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    }
})