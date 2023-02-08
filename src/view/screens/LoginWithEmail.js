import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



const LoginWithEmail = ({ navigation }) => {
  const [name, setname] = useState();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const [inputemail, setInputEmail] = useState(false);
  const [inputpassword, setInputPassword] = useState(false);


  const EMAIL_REGEX = /@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const OnhandleSubmit = async (email, password) => {
    // console.log(email, password);
    if (email === '' || !email === EMAIL_REGEX.test(email)) {
      ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT)
      setInputEmail(true)
    }
    else if (password == '' || password.length < 3 || password == isNaN) {
      ToastAndroid.show('Please enter your First name', ToastAndroid.SHORT)
      setInputPassword(true)
    }
    else {
      setInputEmail(false);
      setInputPassword(false);
      RegesterUserWithEamil(email, password);
    }
  }

  const RegesterUserWithEamil = async (email, password) => {
    console.log('regester here');
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        ToastAndroid.show('Login Successfully!', ToastAndroid.SHORT)
        navigation.navigate('QuestionPhotoScreen')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          ToastAndroid.show('That email address is already in use!', ToastAndroid.SHORT)
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT)
        }

        console.error(error);
      });
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
            }}>What's is your Email?</Text>
          </View>


          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Enter active email address</Text>
          </View>


          <View style={{ marginTop: 60, }}>
            <View style={styles.NumberInput}>
              <TextInput
                value={email}
                error={inputemail}
                onFocus={() => setInputEmail(false)}
                placeholder={'Enter email address'}
                height={200}
                keyboardType='text'
                // error={inputfirstName}
                onChangeText={email => setemail(email)
                }
                style={styles.TextInput}
              />
            </View>
            <View style={styles.NumberInput}>
              <TextInput
                value={password}
                error={inputpassword}
                onFocus={() => setInputPassword(false)}
                placeholder={'Enter password'}
                // error={inputfirstName}
                secureTextEntry={true}
                onChangeText={password => setpassword(password)
                }
                style={styles.TextInput}
              />
            </View>
          </View>
        </View>


        <View style={styles.footer}>
          <View style={{
            paddingTop: 20,
          }}>
            <CustomeButton onpress={() => OnhandleSubmit(email, password)}
              title={'Continue'} />
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

export default LoginWithEmail

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%'
  },
  NumberInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    color: COLORS.gray,
    height: 40,
    width: 300,
    justifyContent: "center"
  },
})