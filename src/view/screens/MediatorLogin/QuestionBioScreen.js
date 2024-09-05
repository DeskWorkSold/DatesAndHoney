import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import { TextInput } from 'react-native-paper';


const MediatorQuestionBioScreen = ({ navigation, route }) => {
  const { email, name } = route.params;
  const [bio, setbio] = useState();
  const [inputBio, setInputBio] = useState(false);

  const onQuestionProfessionally = () => {
    if (bio) {
      // console.log('bio', bio);
      // return
      navigation.navigate('MediatorDateOfBirthScreen', {
        bio: bio, email: email, name: name
      })
    }
    else {
      // Alert.alert('please enter bio')
      console.log('not found');
      setInputBio(true)
      ToastAndroid.show("Please enter your bio!", ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={{
            paddingTop: '10%'
          }}>
            <Image source={require('../../../assets/bio.png')}
              resizeMode='contain' />
          </View>


          <View style={{
            paddingTop: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Public Bio</Text>
          </View>


          <View style={{
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>(200 Characters)</Text>
          </View>

          <View style={{
            paddingTop: 20,
          }}>
            <TextInput
              // label='Description'
              placeholder='Type Here!'
              placeholderTextColor={COLORS.gray}
              value={bio}
              mode='outlined'
              multiline
              numberOfLines={4}
              error={inputBio}
              // onBlur={inputBio}
              onChangeText={(bio) => setbio(bio)}
              onFocus={() => setInputBio(false)}
              activeOutlineColor={COLORS.light}
              outlineColor={COLORS.light}
              style={styles.TextInput}
            />
          </View>




          {/* <View style={styles.footer}> */}

          <View style={{
            // paddingTop: 20,
            paddingTop: '20%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{
              marginRight: 2.5
            }}>
              <CustomeButton width={170} onpress={() => navigation.goBack()} title={'Back'} bcolor={COLORS.light} />
            </View>
            <View style={{
              marginLeft: 2.5
            }}>
              <CustomeButton width={170}  onpress={() => onQuestionProfessionally()}
                title={'Continue'} />
            </View>
          </View>

          <View style={{
            paddingTop: 10,
            // width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
          {/* </View> */}


        </View>
      </View>



    </SafeAreaView>
  )
}

export default MediatorQuestionBioScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,

  },
  contentContainer: {
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  footer: {
    // height: '20%'
  },
  NumberInput: {
    marginTop: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
  TextInput: {
    // padding: 10,
    backgroundColor: COLORS.light,
    // color: COLORS.gray,

    width: 320,
    // borderRadius: 30,
    height: 200,
    textAlignVertical: 'top',
  },
})