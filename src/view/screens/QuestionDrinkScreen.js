import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';
const { width, height } = Dimensions.get('window')

export const DrinksData = [
  {
    id: '1',
    name: 'Never',
  },
  {
    id: '2',
    name: 'Sometimes',
  },
  {
    id: '3',
    name: 'Socially',
  },
  {
    id: '4',
    name: 'Regularly',
  },
  {
    id: '5',
    name: 'Heavily',
  },
]

const QuestionDrinkScreen = ({ navigation, route }) => {
  const { email, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  // console.log(Drugs);


  const onInstagramScreen = () => {
    console.log(DrinksData[selectedCategoryIndex].name);
    const selectedPolitics = DrinksData[selectedCategoryIndex].name;
    if (selectedPolitics) {
      navigation.navigate('QuestionInstagramScreen', { Drink: selectedPolitics, email: email, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select do you use Drink!", ToastAndroid.SHORT);
    }
  }

  const SkipScreen = () => {
    navigation.navigate('QuestionInstagramScreen', { Drink: null, email: email, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }

  const ListDrinks = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {DrinksData.map((item, index) => (
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
                  <SVGImg width={20} height={20} />
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
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
            flexDirection: 'row',
            height: 40,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
            <View style={{
              flex: 1,
              // backgroundColor: COLORS.gray2
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              flex: 2,
              // backgroundColor: COLORS.gray,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 20
            }}>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: COLORS.gray2
            }}>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              paddingTop: 0,
              alignItems:'center'
            }}>
              <Image source={require('../../assets/drink2.png')} resizeMode='contain' style={{
                width: width / 2,
                height: height / 4,
              }} />
            </View>

 
            <View style={{
              // alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center',
              }}>Do you Drink?</Text>
            </View>


            <View style={{
              alignItems: 'center'
            }}>
              <ListDrinks data={DrinksData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>


            <View style={{
              alignSelf: 'center',
              paddingBottom: 5,
              paddingTop: 50
            }}>

              <View style={{
                // flexDirection: 'row'
                // paddingTop: 20,
                // alignItems: 'center'
              }}>
                <View style={{ marginBottom: 5 }}>
                  <CustomeButton onpress={() => onInstagramScreen()}
                    title={'Continue'} />
                </View>
                <View style={{ marginHorizontal: 0 }}>
                  <CustomeButton onpress={() => SkipScreen()}
                    title={'Skip'} bcolor={COLORS.light} />
                </View>

              </View>


            </View>

          </ScrollView>

        </View>
      </View>


    </SafeAreaView >
  )
}

export default QuestionDrinkScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '100%',
    // alignItems: 'center',
  },
  footer: {
    // height: '20%',
    // alignItems: 'center',
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