import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';


const QuestionBioScreen = ({ navigation, route }) => {
  const { Kids, PartnerGender, name, image1, image2, image3, image4, image5, Date, Gender } = route.params;
  const [bio, setbio] = useState();

  const onQuestionProfessionally = () => {
    if(bio){
      // console.log('bio', bio);
      navigation.navigate('QuestionProfessionallyScreen', {
        Bio: bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids
      })
    }
    else{
      // Alert.alert('please enter bio')
      console.log('not found');
      ToastAndroid.show("Please enter your bio!", ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={{
            paddingTop: 10
          }}>
            <Image source={require('../../assets/bio.png')}
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
              placeholder='Type Here!'
              multiline
              numberOfLines={8}
              value={bio}
              onChangeText={bio => setbio(bio)}
              style={styles.TextInput} />
          </View>


        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
          }}>
            <CustomeButton onpress={() => onQuestionProfessionally()}
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

export default QuestionBioScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,

  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
    height: 200,
    textAlignVertical: 'top',
  },
})