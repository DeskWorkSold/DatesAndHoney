import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import Loader from '../components/Loader';
const { width, height } = Dimensions.get("window");



const CELL_COUNT = 6

const LoginWithOTPScreen = ({ navigation, route }) => {
  const { confirmation, phoneNum } = route.params;
  // console.log('secscreen==>',confirmation);
  const [authUser, setAuthUser] = useState('');
  const [value, setValue] = useState('');
  const [uploading, setUploading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // const [number, setNumber] = useState();



  const getCodeHandler = () => {
    if (value == '') {
      ToastAndroid.show("Code cannot be empty", ToastAndroid.SHORT);
      return false;
    }
    else {
      onConfirmPressed();
      // console.log(value);
    }
  }

  const onConfirmPressed = async () => {
    // console.log('adcas');
    // return
    try {
      setUploading(true)
      const response = await confirmation?.confirm(value)
      setUploading(false);

      navigation.navigate('NameScreen');
      ToastAndroid.show('User Sign In Successfully', ToastAndroid.SHORT);
    }
    catch (error) {
      setUploading(false);
      ToastAndroid.show('Invalid code', ToastAndroid.SHORT);
      // ToastAndroid.show('Invalid code', ToastAndroid.SHORT); 
      // console.log('Invalid code: ' + error);
    }
  }

  function onAuthStateChanged(user) {
    // console.log('user: ', user);
    setAuthUser(user)
    if (user) {
      console.log('user login Succesfully', user);
      ToastAndroid.show('User Sign In Succesfully', ToastAndroid.SHORT);
      navigation.navigate('NameScreen')
    }

  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={{
            paddingTop: 40
          }}>
            <Image source={require('../../assets/otpverification.png')} resizeMode='contain' />
          </View>

          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Verification code</Text>
          </View>

          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Please enter the 6-digits code sent to</Text>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
            }}>
              <Text style={{
                color: COLORS.black,
                fontWeight: 'bold'
              }}>{phoneNum}</Text>

              <Text style={{
                color: COLORS.main,
                paddingLeft: 10,
              }}>edit</Text>
            </View>

          </View>

          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            placeholderTextColor={COLORS.gray} // Set the placeholder text color here
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





          {/* <OTPInputSection /> */}


          {/* <View style={styles.NumberInput}>
            <View style={{
              marginHorizontal: 5,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray,
              width: 50,
              alignItems: 'center',
            }}>
              <TextInput
                value={number}
                placeholder={'0'}
                keyboardType='number-pad'
                onChangeText={number => setNumber(number)
                }
                style={styles.TextInput}
              />
            </View>

            <View style={{
              marginHorizontal: 5,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray2,
              width: 50,
              alignItems: 'center',
            }}>
              <TextInput
                value={number}
                placeholder={'0'}
                keyboardType='number-pad'
                onChangeText={number => setNumber(number)
                }
                style={styles.TextInput}
              />
            </View>

            <View style={{
              marginHorizontal: 5,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray2,
              width: 50,
              alignItems: 'center',
            }}>
              <TextInput
                value={number}
                placeholder={'0'}
                keyboardType='number-pad'
                onChangeText={number => setNumber(number)
                }
                style={styles.TextInput}
              />
            </View>

            <View style={{
              marginHorizontal: 5,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray2,
              width: 50,
              alignItems: 'center',
            }}>
              <TextInput
                value={number}
                placeholder={'0'}
                keyboardType='number-pad'
                onChangeText={number => setNumber(number)
                }
                style={styles.TextInput}
              />
            </View>

            <View style={{
              marginHorizontal: 5,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray2,
              width: 50,
              alignItems: 'center',
            }}>
              <TextInput
                value={number}
                placeholder={'0'}
                keyboardType='number-pad'
                onChangeText={number => setNumber(number)
                }
                style={styles.TextInput}
              />
            </View>


          </View> */}


        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
          }}>
            {uploading ?
              <View style={{
                backgroundColor: COLORS.main,
                width: width / 1.2,
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: COLORS.transparent
              }}>
                <Text style={{
                  color: COLORS.black,
                }}>Please wait...</Text>
              </View>
              :
              <CustomeButton onpress={() => getCodeHandler()}
                title={'Continue'} />
            }
          </View>

          <View style={{
            paddingTop: 20,
            // width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>


      <Loader modal={uploading} uploading={uploading} />

    </SafeAreaView>
  )
}

export default LoginWithOTPScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%'
  },
  NumberInput: {
    marginTop: 60,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    color: COLORS.gray,
    height: 40,
    width: 15,
    justifyContent: "center",
    alignItems: 'center'
  },

  root: { flex: 1, padding: 10 },
  title: { textAlign: 'center', fontSize: 30, },
  codeFieldRoot: { marginTop: 20, },
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