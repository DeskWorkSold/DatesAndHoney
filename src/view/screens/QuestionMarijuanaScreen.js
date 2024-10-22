import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';

const MerijuanaData = [
  {
    id: '1',
    name: 'Yes',
  },
  {
    id: '2',
    name: 'No',
  },
  {
    id: '3',
    name: 'Prefer not say',
  },
]

const QuestionMarijuanaScreen = ({ navigation, route }) => {
  const { name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);


  const onDrugsScreen = () => {
    console.log(MerijuanaData[selectedCategoryIndex].name);
    const selectedPolitics = MerijuanaData[selectedCategoryIndex].name;
    if (selectedPolitics) {
      navigation.navigate('QuestionDrugsScreen', { Marijauna: selectedPolitics, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select do you use marijauna!", ToastAndroid.SHORT);
    }
  }

  const SkipScreen = () => {
    navigation.navigate('QuestionDrugsScreen', { Marijauna: null, Vape: null, Smoke: null, Lookingfor: Lookingfor, PIntroandExtro: PIntroandExtro, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }

  const ListMerijuana = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {MerijuanaData.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              ...styles.NumberInput
            }}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  {item.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end',
              }}>
                {value == index ? (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                ) : (<View></View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </View>
    )
  }



  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            paddingTop: 40,
          }}>
            <Image source={require('../../assets/marijuana.png')}
              resizeMode='contain' style={{
                width: 220,
              }} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Do you use Marijauna?</Text>
          </View>


          <View>
            <ListMerijuana data={MerijuanaData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>
        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 100,
            flexDirection: 'row'
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={170} onpress={() => SkipScreen()}
                title={'Skip'} bcolor={COLORS.light} />
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={170} onpress={() => onDrugsScreen()}
                title={'Continue'} />
            </View>

          </View>

          <View style={{
            paddingTop: 5,
            width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>



      </View>



    </SafeAreaView >
  )
}

export default QuestionMarijuanaScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '70%',
    alignItems: 'center',
  },
  footer: {
    height: '30%',
    alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
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