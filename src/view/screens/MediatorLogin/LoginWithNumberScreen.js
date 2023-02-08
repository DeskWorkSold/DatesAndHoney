import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import { Picker } from '@react-native-picker/picker';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';




const MediatorLoginWithNumberScreen = ({ navigation }) => {
  // const [number, setNumber] = useState();
  // const [country, setCountry] = useState();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [uploading, setUploading] = useState(false);
  const [inputerror, setInputError] = useState(false);
  const phoneInput = useRef(null);
  const [userType, setUserType] = useState('Mediator');


  const OnhandleSubmit = () => {
    if (phoneNumber == '' || phoneNumber.length < 13 || phoneNumber == isNaN) {
      if (phoneNumber == '') {
        ToastAndroid.show('Please enter your phone number', ToastAndroid.SHORT)
      }
      else if (phoneNumber.length < 13) {
        ToastAndroid.show('phone number should be 10 digits', ToastAndroid.SHORT)
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

  const sendOtpVerification = async (phoneNumber) => {
    // navigation.navigate('LoginWithOTPScreen')
    // console.log(phoneNumber);
    // return;
    try {
      setUploading(true);
      // const credential = auth().phoneaut(
      //   phoneNumber,
      //   userType 
      // );
      const response = await auth().signInWithPhoneNumber(phoneNumber).then((res) => {
        console.log('===>', res);
        navigation.navigate('MediatorLoginWithOTPScreen', { confirmation: res, phoneNum: phoneNumber });
      });
      ToastAndroid.show("OTP Send Successfully!", ToastAndroid.SHORT);
      setUploading(false)
    } catch (error) {
      console.log("OTP SEND ERROR " + error);
      ToastAndroid.show("OTP SEND ERROR " + error, ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView>
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
            }}>We'll send you a OTP to verify your identity</Text>
          </View>

          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="PK"
            layout="first"
            // withShadow
            autoFocus
            containerStyle={styles.phoneNumberView}
            textContainerStyle={{ paddingVertical: 0 }}
            onChangeFormattedText={text => {
              setPhoneNumber(text);
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
            paddingTop: 20,
            width: 310,
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

export default MediatorLoginWithNumberScreen

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
    borderBottomColor: COLORS.light
  },
})