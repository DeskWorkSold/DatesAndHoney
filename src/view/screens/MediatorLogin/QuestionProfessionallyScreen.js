import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';



const MediatorQuestionProfessionallyScreen = ({ navigation, route }) => {
  const { name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio } = route.params;
  // console.log(Bio);
  const [experince, setExperince] = useState();

  const onMusicSelect = () => {
    if (experince) {
      console.log(experince);
      navigation.navigate('MediatorQuestionMusicScreen', {
        Experince: experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids
      })
    }
    else {
      ToastAndroid.show("Please enter your experince!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    // console.log('asdj');
    // return
    navigation.navigate('MediatorQuestionMusicScreen', {
      Experince: null, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids
    })
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            alignItems: 'center',
            paddingTop: 40,
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Image source={require('../../../assets/notify.png')} resizeMode='contain'
              style={{
                width: 15,
                height: 15,
              }} />
            <Text style={{
              color: COLORS.black
            }}>Response is Not Public</Text>
          </View>


          <View style={{
            alignItems: 'center',
            paddingHorizontal: 50,
            paddingTop: 20,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Where do you see yourself professionally and personally in five years?</Text>
          </View>

          <View style={{
            paddingTop: 20,
          }}>
            <TextInput
              placeholder='Type Here!'
              multiline
              value={experince}
              numberOfLines={8}
              onChangeText={experince => setExperince(experince)}
              style={styles.TextInput} />
          </View>

        </View>

        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
            flexDirection: 'row'
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={180} onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light} />
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={180} onpress={() => onMusicSelect()}
                title={'Continue'} />
            </View>
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

export default MediatorQuestionProfessionallyScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%',
    alignItems: 'center'
  },
  NumberInput: {
    marginTop: 20,
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
    height: 200,
    textAlignVertical: 'top',
  },
})