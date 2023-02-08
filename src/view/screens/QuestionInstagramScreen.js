import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';



const QuestionInstagramScreen = ({ navigation, route }) => {
  const { name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [instagram, setinstagram] = useState();


  const onOccupationScreen = () => {
    // console.log(instagram);
    if (instagram) {
      navigation.navigate('QuestionOccupationScreen', { InstaUsername: instagram, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please enter instagram user name!", ToastAndroid.SHORT);
    }
  }
  const SkipScreen = () => {
    navigation.navigate('QuestionOccupationScreen', { InstaUsername: null, Drink: null, Drugs: null, Marijauna: null, Vape: null, Smoke: null, Lookingfor: Lookingfor, PIntroandExtro: PIntroandExtro, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }


  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            paddingTop: 20,
            flexDirection: 'row',
          }}>
            <Image source={require('../../assets/insta.png')} resizeMode='contain' style={{
              width: 150,
            }} />

            <Image source={require('../../assets/instagram.png')} resizeMode='contain' style={{
              width: 150,
              position: 'absolute',
              marginTop: 80,
              marginLeft: 80
            }} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Do you want to connect your Instagram?</Text>
          </View>


          <View style={styles.NumberInput}>
            <TextInput
              value={instagram}
              placeholder={'Enter your username'}
              // error={inputfirstName}
              onChangeText={instagram => setinstagram(instagram)
              }
              style={styles.TextInput}
            />
          </View>


        </View>


        <View style={styles.footer}>

          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={170} onpress={() => SkipScreen()}
                title={'Skip'} bcolor={COLORS.light} />
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={170} onpress={() => onOccupationScreen()}
                title={'Continue'} />
            </View>
          </View>


        </View>



      </View>



    </SafeAreaView >
  )
}

export default QuestionInstagramScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '90%',
    alignItems: 'center',
  },
  footer: {
    height: '10%',
    alignItems: 'center',
  },
  NumberInput: {
    marginTop: 30,
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})