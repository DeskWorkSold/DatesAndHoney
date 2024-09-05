import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';



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


const QuestionDrugsScreen = ({ navigation, route }) => {
  const { email, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  console.log(DateOfBirth);


  const onDrinkScreen = () => {
    console.log(MerijuanaData[selectedCategoryIndex].name);
    const selectedPolitics = MerijuanaData[selectedCategoryIndex].name;
    if (selectedPolitics) {
      navigation.navigate('QuestionDrinkScreen', { Drugs: selectedPolitics, email: email, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select do you use Drugs!", ToastAndroid.SHORT);
    }
  }

  const SkipScreen = () => {
    navigation.navigate('QuestionDrinkScreen', { Drugs: null, email: email, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
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
            paddingTop: 20,
            flexDirection: 'row',
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


          <View style={{
            alignItems: 'center',
            paddingTop: 10,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Do you use Drugs</Text>
          </View>


          <View>
            <ListMerijuana data={MerijuanaData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>

        </View>


        <View style={styles.footer}>
          <View style={{
            // flexDirection: 'row'
          }}>
            <View style={{ marginBottom: 5 }}>
              <CustomeButton onpress={() => onDrinkScreen()}
                title={'Continue'} />
            </View>
            <View style={{ marginHorizontal: 0 }}>
              <CustomeButton onpress={() => SkipScreen()}
                title={'Skip'} bcolor={COLORS.light} />
            </View>
          </View>
        </View>



      </View>



    </SafeAreaView >
  )
}

export default QuestionDrugsScreen

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
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
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