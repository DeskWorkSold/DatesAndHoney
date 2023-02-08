import { Image, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import COLORS from '../../consts/Colors';
import CustomeButton from '../components/CustomeButton';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


const LoginScreen = ({ navigation }) => {


    GoogleSignin.configure({
        webClientId: '604072040126-h8dmu5km29t8co8shb2isrkjn4fniqj4.apps.googleusercontent.com',
    });

    // useEffect(() => {
    //     GoogleSignin.configure();
    // }, [])

    async function onGoogleSigninPress() {
        // console.log('test');
        try {
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
                    afterGoogleLogin()
                });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('sign in cancelled');
            }
            else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('sign in is in progress already');
            }
            else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdateb');
            }
            else {
                console.log('some other error');
            }
        }

    }
    const afterGoogleLogin = () => {
        // console.log('after');
        ToastAndroid.show('User Registered Successfully Login to continue', ToastAndroid.SHORT);
        navigation.navigate('QuestionPhotoScreen')
    }


    return (
        <ImageBackground source={require('../../assets/loginbackground.png')} resizeMode="cover" style={StyleSheet.absoluteFillObject}>
            <View style={styles.overlay} />

            <View style={{ alignItems: 'center' }}>
                <View style={{ paddingTop: 40 }}>
                    <Image source={require('../../assets/logo.png')} resizeMode="contain" style={{
                        width: 124,
                        height: 92,
                    }} />
                </View>

                <View style={{
                    paddingTop: 20,
                    width: 310,
                    // paddingBottom:150,
                }}>
                    <Text style={{ textAlign: 'center', color: COLORS.white }}>
                        The only dating app designed to help you find your soulmate. Filled with different types of events, designed for young professionals & couples
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

                <View style={{
                    paddingTop:20,
                }}>
                    <CustomeButton onpress={() => navigation.navigate('LoginWithNumberScreen')} title={'Login with phone number'} />
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 45,
                    paddingTop: 35
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

                <View style={{
                    paddingTop: 35,
                }}>
                    <CustomeButton color={COLORS.white} bcolor={COLORS.black} image={require('../../assets/apple.png')} title={'Continue with Apple'} />
                </View>

                <View style={{
                    paddingTop: 15,
                }}>
                    <CustomeButton color={COLORS.white} bcolor={COLORS.blue} image={require('../../assets/facebook.png')} title={'Continue with Facebook'} />
                </View>

                <View style={{
                    paddingTop: 15,
                }}>
                    <CustomeButton color={COLORS.black} bcolor={COLORS.white} image={require('../../assets/google.png')} title={'Continue with Google'}
                        onpress={() => onGoogleSigninPress()} />
                </View>


                <TouchableOpacity
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
                </TouchableOpacity>


            </View>
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
        bottom: 0
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})