import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/reducers/Reducers';



const NameScreen = ({ navigation, route }) => {
  const { image1, image2, image3, image4, image5 } = route.params;
  const [name, setname] = useState('');
  // console.log(image1, image2, image3, image4, image5);

  const OnDateOnBirthScreen = (name) => {
    // console.log('test', name);
    if (name == '' || name.length < 5) {
      if (name == '') {
        ToastAndroid.show("Please enter your name!", ToastAndroid.SHORT);
      }
      else if (name.length < 5) {
        ToastAndroid.show("Fullname should be 5character log!", ToastAndroid.SHORT);
      }
    }
    else {
      // var Data = new Object();
      // Data.image1=image1;
      // Data.image2=image2;
      // Data.image3=image3;
      // Data.image4=image4;
      // Data.image5=image5;
      // Data.name=name;
      navigation.navigate('DateOfBirthScreen', { image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, name: name })
    }
    // dispatch({
    //   type: 'ADD_TO_USER',
    //   payload: { ...name },
    // })
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            paddingTop: 40
          }}>
            <Image source={require('../../assets/namescreen.png')} resizeMode='contain' />
          </View>


          <View style={{
            paddingTop: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>What's your Name?</Text>
          </View>


          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Enter the full name</Text>
          </View>

          <View style={styles.NumberInput}>
            <TextInput
              value={name}
              placeholder={'Fullname'}
              // error={inputfirstName}
              onChangeText={name => setname(name)
              }
              style={styles.TextInput}
            />
          </View>


        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
          }}>
            <CustomeButton onpress={() => OnDateOnBirthScreen(name)}
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

export default NameScreen

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