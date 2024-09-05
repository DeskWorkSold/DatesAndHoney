import { Image, StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, ToastAndroid, Dimensions, Modal } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import SVGSelect from '../../assets/tik.svg';
import COLORS from '../../consts/Colors';
import CustomeButton from './CustomeButton';
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Slider from '@react-native-community/slider';
import PhoneInput from 'react-native-phone-number-input';
import { useRef } from 'react';
import { selectUser } from '../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from './Loader';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const { width, height } = Dimensions.get('window');

const CELL_COUNT = 6

const EditUserCredentials = ({ title, image, data, filter, setModal, Modal }) => {
    const user = useSelector(selectUser);
    // const { title, image, value, filter } = route.params
    const [value2, setValue2] = useState(data);
    // const [editData2, setEditData2] = useState(data2);
    // console.log(value2);
    const [otpScreen, setotpScreen] = useState(false);
    const [otpResult, setotpResult] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [customDate, setCustomDate] = useState(null);
    const phoneInput = useRef(null);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const handleCodeChange = (code) => {
        // Handle OTP code change here (if needed)
        setOtpCode(code);
    };

    const updateName = (name) => {
        // console.log(data , value2);
        if (data !== value2) {
            setUploading(true)
            try {
                const userRef = firestore().collection('Users')
                    .doc(user.uid)
                userRef.update({
                    'userDetails.Name': name,
                }).then(() => {
                    setUploading(false)
                    setModal(false)
                    ToastAndroid.show(`Your new name updated!`, ToastAndroid.SHORT)
                })
            }
            catch (e) {
                setUploading(false)
                ToastAndroid.show(`Error: ${e}`, ToastAndroid.SHORT)
            }
        }
        else {
            ToastAndroid.show(`Please update your name to save changes.`, ToastAndroid.SHORT)
        }
    }
    const updateEmail = (email) => {
        if (data !== value2) {
            setUploading(true)
            try {
                const userRef = firestore().collection('Users')
                    .doc(user.uid)
                userRef.update({
                    'userDetails.email': email,
                }).then(() => {
                    setUploading(false)
                    setModal(false)
                    ToastAndroid.show(`Your new email updated!`, ToastAndroid.SHORT)
                })
            }
            catch (e) {
                setUploading(false)
                ToastAndroid.show(`Error: ${e}`, ToastAndroid.SHORT)
            }
        }
        else {
            ToastAndroid.show(`You have not changed your email.`, ToastAndroid.SHORT)

        }
    }

    const updatePhoneNumber = async (number) => {
        setUploading(true)
        try {
            const user = auth().currentUser;
            if (!user) {
                // Handle the case when the user is not logged in
                setUploading(false)
                setModal(false)
                return;
            }
            // const phoneNumber = getPhoneNumberFromUserInput();
            // const appVerifier = new auth.;
            // auth().currentUser.updatePhoneNumber(number, appVerifier)
            //     .then((confirmationResult) => {
            //         console.log(confirmationResult);
            //         // SMS sent. Prompt user to type the code from the message, then complete
            //         // verification by calling confirmationResult.confirm(code).
            //     })
            // return
            // Step 1: Send a verification code to the new phone number
            // console.log(number);
            // const recaptchaVerifier = new auth.RecaptchaVerifier(
            //     container, parameters, firebase.app());
            // recaptchaVerifier.render();
            // const phoneAuthProvider = new auth.PhoneAuthProvider(auth);
            // phoneAuthProvider.verifyPhoneNumber(user.phoneNumber, recaptchaVerifier)
            //     .then((verificationId) => {
            //         setotpResult(verificationId)
            //         console.log('Otp send successfully!', confirmationResult);
            //         setotpScreen(true)
            //     })
            //  Step 3: Once the user enters the verification code, sign in with the new phone number
            // var appVerifier = new auth.RecaptchaVerifier(
            //     "recaptcha-container",
            //     {
            //         size: "invisible"
            //     }
            // );
            const confirmationResult = await auth().verifyPhoneNumber(number)
            if (confirmationResult) {
                setotpResult(confirmationResult)
                console.log('Otp send successfully!', confirmationResult);
                setotpScreen(true)
                setUploading(false)
                return;
            }
        } catch (error) {
            setUploading(false)
            ToastAndroid.show(`Error updating phone number and details: , ${error.message}`, ToastAndroid.SHORT)
            console.error('Error updating phone number and details:', error.message);
        }
    }
    // 03366667645 574058 773386
    const ConfirmPhoneNumber = async (code, number) => {
        // console.log(otpResult?.verificationId, code, number);
        // return
        setUploading(true)
        if (code && otpResult) {
            try {
                const user = auth().currentUser;
                if (!user) {
                    // Handle the case when the user is not logged in
                    setUploading(false)
                    setModal(false)
                    return;
                }
                try {
                    const credential = await auth.PhoneAuthProvider.credential(otpResult?.verificationId, code);
                    // const response = await otpResult?.confirm(value)
                    setUploading(false)
                    setModal(false)
                    ToastAndroid.show(`Currently you cannot update phone number!`, ToastAndroid.SHORT)
                    // auth().updatePhoneNumber(credential)
                    // await auth().currentUser.updatePhoneNumber(number);
                    // setUser(userData.user);
                    // console.log(user.updatePhoneNumber(number) ,'=====', response);
                } catch (error) {
                    if (error.code == 'auth/invalid-verification-code') {
                        console.log('Invalid code.');
                        setUploading(false)
                        setModal(false)
                    } else {
                        console.log('Account linking error');
                        setUploading(false)
                        setModal(false)
                    }
                }
                // const credential = auth.PhoneAuthProvider.credential(otpResult, code);
                // console.log(credential);
                // return
                // let userData = await user.linkWithCredential(credential)
                // setUser(userData.user);

                // user.linkWithPhoneNumber(number)
                // const credentials = auth.PhoneAuthProvider.credential(
                //     otpResult, code
                // );
                // console.log(credentials);
                // await user.updateProfile(credentials);
                // console.log('Phone number updated successfully!', user, userData);
                // return
                // await firestore().collection('Users').doc(userId).update({
                //     'userDetails.PhoneNumber': value2,
                // }).then(() => {
                //     setModal(false)
                //     console.log('Phone number updated successfully!');
                //     ToastAndroid.show(`Phone number updated successfully!`, ToastAndroid.SHORT)
                // });
            } catch (error) {
                setUploading(false)
                setModal(false)
                console.error('Error updating phone number and details:', error.message);
            }
        }
        else {
            setUploading(false)
            setModal(false)
            ToastAndroid.show(`Verification code cannot be empty`, ToastAndroid.SHORT)
        }
    }
    return (
        <View style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: COLORS.white
        }}>
            {filter == 'Name' ?
                <View>
                    <View style={{
                        height: '70%',
                        // backgroundColor:COLORS.main
                    }}>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: 60,
                            justifyContent: 'center',
                            paddingHorizontal: 20,
                        }}>
                            <TouchableOpacity
                                onPress={() => setModal(false)}
                                style={{
                                    flex: 1,
                                }}>
                                <AntDesign name="arrowleft" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={{
                                flex: 2,
                                // backgroundColor: COLORS.gray,
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingHorizontal: 20
                            }}>
                            </View>
                            <View style={{
                                flex: 1,
                                backgroundColor: COLORS.gray2
                            }}>
                            </View>
                        </View>
                        {image &&
                            <View style={{
                                alignItems: 'center',
                            }}>
                                {image}
                            </View>
                        }
                        <View style={{
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>{title}</Text>
                        </View>
                        <View style={{
                            marginTop: 20
                        }}>
                            <View style={styles.NumberInput}>
                                <TextInput
                                    value={value2}
                                    placeholder={'Enter your name'}
                                    placeholderTextColor={COLORS.gray}
                                    keyboardType='email-address'
                                    onChangeText={value => setValue2(value)
                                    }
                                    style={styles.TextInput}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{
                        marginVertical: 30,
                        alignItems: 'center'
                    }}>
                        {uploading ?
                            <CustomeButton title={'Please wait...'} width={width / 1.1} />
                            :
                            <CustomeButton onpress={() => updateName(value2)}
                                title={'Confirm'} width={width / 1.1} />
                        }
                    </View>
                </View>
                :
                filter == 'Email' ?
                    <View>
                        <View style={{
                            height: '70%',
                            // backgroundColor:COLORS.main
                        }}>
                            <View style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                height: 60,
                                justifyContent: 'center',
                                paddingHorizontal: 20,
                            }}>
                                <TouchableOpacity
                                    onPress={() => setModal(false)}
                                    style={{
                                        flex: 1,
                                    }}>
                                    <AntDesign name="arrowleft" size={24} color="black" />
                                </TouchableOpacity>
                                <View style={{
                                    flex: 2,
                                    // backgroundColor: COLORS.gray,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingHorizontal: 20
                                }}>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: COLORS.gray2
                                }}>
                                </View>
                            </View>
                            {image &&
                                <View style={{
                                    alignItems: 'center',
                                }}>
                                    <Image source={image} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                </View>
                            }
                            <View style={{
                                alignItems: 'center',
                                marginTop: 20,
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>{title}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    paddingTop: 10,
                                    color: COLORS.black
                                }}>Enter active email address</Text>
                            </View>
                            <View style={{
                                marginTop: 20
                            }}>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={value2}
                                        placeholder={'Enter your email'}
                                        placeholderTextColor={COLORS.gray}
                                        keyboardType='email-address'
                                        onChangeText={text => setValue2(text)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            marginVertical: 30,
                            alignItems: 'center'
                        }}>
                            {uploading ?
                                <CustomeButton title={'Please wait...'} width={width / 1.1} />
                                :
                                <CustomeButton onpress={() => updateEmail(value2)}
                                    title={'Confirm'} width={width / 1.1} />
                            }
                        </View>
                    </View>
                    :
                    <View>
                        {!otpScreen ?
                            <>
                                <View style={{
                                    height: '70%'
                                }}>
                                    <View style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        height: 60,
                                        justifyContent: 'center',
                                        paddingHorizontal: 20,
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => setModal(false)}
                                            style={{
                                                flex: 1,
                                            }}>
                                            <AntDesign name="arrowleft" size={24} color="black" />
                                        </TouchableOpacity>
                                        <View style={{
                                            flex: 2,
                                            // backgroundColor: COLORS.gray,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            paddingHorizontal: 20
                                        }}>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            backgroundColor: COLORS.gray2
                                        }}>
                                        </View>
                                    </View>
                                    {image &&
                                        <View style={{
                                            alignItems: 'center',
                                        }}>
                                            <Image source={image} resizeMode='contain' style={{
                                                // width: 150,
                                                height: height / 8,
                                            }} />
                                        </View>
                                    }
                                    <View style={{
                                        alignItems: 'center',
                                        marginTop: 20,
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: COLORS.black
                                        }}>{title}</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            paddingTop: 10,
                                            color: COLORS.black
                                        }}>We'll send you an OTP to verify your identity</Text>
                                    </View>
                                    <View style={{
                                        alignSelf: 'center',
                                        marginTop: 20,
                                    }}>
                                        <PhoneInput
                                            ref={phoneInput}
                                            defaultValue={value2}
                                            defaultCode="US"
                                            layout="first"
                                            // disabled={true}
                                            // withShadow
                                            // autoFocus
                                            containerStyle={styles.phoneNumberView}
                                            textContainerStyle={{ paddingVertical: 0, borderRadius: 5, backgroundColor: COLORS.light }}
                                            onChangeFormattedText={text => {
                                                setValue2(text);
                                            }}
                                            flagButtonStyle={{ color: "black" }}
                                            textInputProps={{ placeholderTextColor: COLORS.gray }}
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    marginVertical: 30,
                                    alignItems: 'center'
                                }}>
                                    {uploading ?
                                        <CustomeButton
                                            title={'Please wait...'} width={width / 1.1} />
                                        :
                                        <CustomeButton onpress={() => updatePhoneNumber(value2)}
                                            title={'Verify Number'} width={width / 1.1} />
                                    }
                                </View>
                            </>
                            :
                            <>
                                <View style={{
                                    height: '70%'
                                }}>
                                    <View style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        height: 60,
                                        justifyContent: 'center',
                                        paddingHorizontal: 20,
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => setModal(false)}
                                            style={{
                                                flex: 1,
                                            }}>
                                            <AntDesign name="arrowleft" size={24} color="black" />
                                        </TouchableOpacity>
                                        <View style={{
                                            flex: 2,
                                            // backgroundColor: COLORS.gray,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            paddingHorizontal: 20
                                        }}>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            backgroundColor: COLORS.gray2
                                        }}>
                                        </View>
                                    </View>
                                    {image &&
                                        <View style={{
                                            alignItems: 'center',
                                        }}>
                                            <Image source={image} resizeMode='contain' style={{
                                                // width: 150,
                                                height: height / 8,
                                            }} />
                                        </View>
                                    }
                                    <View style={{
                                        alignItems: 'center',
                                        marginTop: 20,
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: COLORS.black
                                        }}>Verification code</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            paddingTop: 10,
                                            color: COLORS.black,
                                        }}>Please enter the 6-digits code sent to</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingTop: 10,
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontWeight: 'bold'
                                            }}>{value2}</Text>
                                            <Text style={{
                                                color: COLORS.main,
                                                paddingLeft: 10,
                                            }}>edit</Text>
                                        </View>
                                        <View style={{
                                            alignSelf: 'center',
                                            marginTop: 20,
                                        }}>
                                            <CodeField
                                                ref={ref}
                                                {...props}
                                                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                                value={value}
                                                onChangeText={setValue}
                                                cellCount={CELL_COUNT}
                                                rootStyle={styles.codeFieldRoot}
                                                keyboardType="number-pad"
                                                textContentType="oneTimeCode"
                                                renderCell={({ index, symbol, isFocused }) => (
                                                    <Text
                                                        key={index}
                                                        style={[styles.cell, isFocused && styles.focusCell]}
                                                        onLayout={getCellOnLayoutHandler(index)}>
                                                        {symbol || (isFocused ? <Cursor /> : null)}
                                                    </Text>
                                                )}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    marginVertical: 30,
                                    alignItems: 'center',
                                }}>
                                    {uploading ?
                                        <CustomeButton
                                            title={'Please wait...'} width={width / 1.1} />
                                        :
                                        <CustomeButton onpress={() => ConfirmPhoneNumber(value, value2)}
                                            title={'Confirm'} width={width / 1.1} />
                                    }
                                </View>
                            </>
                        }
                    </View>
            }

            <Loader modal={uploading} uploading={uploading} />
        </View>
    )
}

export default EditUserCredentials

const styles = StyleSheet.create({
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: 45,
        width: 340,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
        color: COLORS.black
    },
    itemContainer: {
        flexDirection: 'row',
        height: 30,
        marginTop: 5,
        borderRadius: 10,
        // flexDirection: 'row',
        // // height: 30,
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // // padding: 10,
        // // paddingHorizontal: 10,
        // margin: 5,
        // borderWidth: 1,
        // borderColor: '#ddd',
    },
    removeButton: {
        color: 'red',
        fontWeight: 'bold',
    },
    TextInputBio: {
        padding: 10,
        backgroundColor: COLORS.light,
        color: COLORS.gray,
        width: 320,
        borderRadius: 10,
        height: 200,
        textAlignVertical: 'top',
    },
    NumberInputDate: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
        // backgroundColor:COLORS.main
    },
    TextInputDate: {
        paddingVertical: 20,
        backgroundColor: COLORS.light,
        color: COLORS.gray,
        // height: 50,
        width: width / 1.1,
        borderRadius: 10,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: 'center',
    },
    CompanynameInput: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 45,
        width: width / 1.1,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    Companyname: {
        padding: 0,
        backgroundColor: COLORS.transparent,
        width: '88%',
    },
    button: {
        flexDirection: 'row',
        height: 30,
        marginTop: 5,
        borderRadius: 10,
    },

    TextInputDeals: {
        padding: 10,
        backgroundColor: COLORS.light,
        color: COLORS.gray,
        width: 320,
        borderRadius: 10,
        height: 200,
        textAlignVertical: 'top',
    },


    InstaUsername: {
        marginTop: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        // paddingHorizontal: 20,
        height: 45,
        width: 340,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    TextInputInstaUsername: {
        paddingHorizontal: 20,
        backgroundColor: COLORS.transparent,
    },

    phoneNumberView: {
        width: 340,
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.light,
        // marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light
    },


    //otp
    codeFieldRoot: { marginTop: 20 },
    cell: {
        color: COLORS.black,
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        marginHorizontal: 4,
        borderBottomWidth: 1,
        borderColor: COLORS.gray,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: COLORS.main,
    }
})