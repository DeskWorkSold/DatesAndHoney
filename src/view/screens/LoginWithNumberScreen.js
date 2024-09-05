import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, ActivityIndicator, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { Picker } from '@react-native-picker/picker';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';




const LoginWithNumberScreen = ({ navigation }) => {
  // const [number, setNumber] = useState();
  // const [country, setCountry] = useState();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [uploading, setUploading] = useState(false);
  const [inputerror, setInputError] = useState(false);
  const phoneInput = useRef(null);

  const OnhandleSubmit = () => {
    if (phoneNumber == '' || phoneNumber.length < 12 || phoneNumber == isNaN) {
      if (phoneNumber == '') {
        ToastAndroid.show('Please enter your phone number', ToastAndroid.SHORT)
      }
      else if (phoneNumber.length < 12) {
        ToastAndroid.show('phone number should be 11 digits', ToastAndroid.SHORT)
      }
      else if (phoneNumber == isNaN) {
        ToastAndroid.show('Phone number is required', ToastAndroid.SHORT)
      }
    }
    else {
      setInputError(false);
      // NavCode(phoneNumber)
      // console.log(phoneNumber);
      sendOtpVerification(phoneNumber)
    }
  }

  const checkIfPhoneNumberExistsInUserApp = async (phoneNumber) => {
    // console.log(phoneNumber);
    const UserAppSnapshot = await firestore()
      .collection('Users')
      .where("userDetails.Category", "==", 'Mediator')
      .where("userDetails.Phonenumber", '==', phoneNumber)
      .get();

    return !UserAppSnapshot.empty;
  };


  const sendOtpVerification = async (phoneNumber) => {
    const user = auth()?.currentUser;
    if (user) {
      try {
        setUploading(true);
        await auth().signOut()
        const exists = await checkIfPhoneNumberExistsInUserApp(phoneNumber)
        if (exists) {
          ToastAndroid.show("This account is already used in the D&S Mediator app.", ToastAndroid.SHORT);
          setUploading(false)
        } else {
          const response = await auth().signInWithPhoneNumber(phoneNumber).then((res) => {
            navigation.navigate('LoginWithOTPScreen', { confirmation: res, phoneNum: phoneNumber });
            setUploading(false)
            ToastAndroid.show("OTP Send Successfully!", ToastAndroid.SHORT);
          });
        }
      } catch (error) {
        setUploading(false)
        console.log("OTP SEND ERROR" + error);
        ToastAndroid.show("OTP SEND ERROR" + error, ToastAndroid.SHORT);
      }
    }
    else {
      try {
        setUploading(true);
        const exists = await checkIfPhoneNumberExistsInUserApp(phoneNumber)
        if (exists) {
          ToastAndroid.show("This account is already used in the D&S Mediator app.", ToastAndroid.SHORT);
          setUploading(false)
        } else {
          const response = await auth().signInWithPhoneNumber(phoneNumber).then((res) => {
            navigation.navigate('LoginWithOTPScreen', { confirmation: res, phoneNum: phoneNumber });
            setUploading(false)
            ToastAndroid.show("OTP Send Successfully!", ToastAndroid.SHORT);
          });
        }
      } catch (error) {
        setUploading(false)
        console.log("OTP SEND ERROR" + error);
        ToastAndroid.show("OTP SEND ERROR" + error, ToastAndroid.SHORT);
      }
    }
  }

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);

    // Check if the entered phone number is valid
    if (phoneInput.current?.isValidNumber(text)) {
      Keyboard.dismiss(); // Automatically dismiss the keyboard
    }
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>


          <View style={{
            paddingTop: 50,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>What's your Number?</Text>
          </View>


          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>We'll send you a text to verify your identity</Text>
          </View>

          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="US"
            layout="first"
            // withShadow
            autoFocus
            containerStyle={styles.phoneNumberView}
            textContainerStyle={{ paddingVertical: 0 }}
            onChangeFormattedText={text => {
              handlePhoneNumberChange(text);
            }}
            textInputProps={{
              placeholder: 'Enter your phone number',
              placeholderTextColor: COLORS.gray, // Set the placeholder text color here
            }}
          />


          {/* <View style={styles.NumberInput}>
            <View>
              <Picker
                selectedValue={country}
                onValueChange={(itemValue, itemIndex) =>
                  setCountry(itemValue)
                }
                style={{
                  color: COLORS.gray,
                  height: 35,
                }}>
                <Picker.Item label="+92" value="+92" />
                <Picker.Item label="+442" value="+442" />
              </Picker>
            </View>
            <Text> | </Text>
            <TextInput
              // label={'Write your number'}
              // textColor={COLORS.gray}
              value={number}
              placeholder={'write your number'}
              // error={inputfirstName}
              keyboardType='number-pad'
              // onFocus={() => setInputFirstName(false)}
              // placeholderTextColor={COLORS.black}
              // mode='underline'
              // underlineColor={COLORS.gray}
              // activeUnderlineColor={COLORS.gray}
              onChangeText={number => setNumber(number)
              }
              style={styles.TextInput}
            />
          </View> */}


        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
          }}>
            {!uploading == true ? (
              <CustomeButton onpress={() => OnhandleSubmit()}
                title={'Continue'} />
            ) : (
              <View style={{
                backgroundColor: COLORS.main,
                width: 329,
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
              </View>
            )}
          </View>

          <View style={{
            paddingTop: 10,
            // width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default LoginWithNumberScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  contentContainer: {
    height: '80%'
  },
  footer: {
    height: '20%'
  },
  NumberInput: {
    paddingHorizontal: 20,
    marginTop: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  TextInput: {
    backgroundColor: COLORS.transparent,
    color: COLORS.gray,
    justifyContent: "center",
    borderBottomWidth: 1
  },
  phoneNumberView: {
    width: '90%',
    height: 50,
    backgroundColor: COLORS.transparent,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
    color:COLORS.black
  },
})