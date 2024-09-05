import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';

const SmokeData = [
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
    id: '3',
    name: 'Reglarly',
  },
  {
    id: '3',
    name: 'Heavily',
  },
  {
    id: '3',
    name: 'Prefer not say',
  },
]

const QuestionSmokeScreen = ({ navigation, route }) => {
  const { email, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  console.log(DateOfBirth);

  const onSmokeScreen = () => {
    console.log(SmokeData[selectedCategoryIndex].name);
    const selectedPolitics = SmokeData[selectedCategoryIndex].name;
    if (selectedPolitics) {
      navigation.navigate('QuestionVapeScreen', { Smoke: selectedPolitics, email: email, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select do you smoke!", ToastAndroid.SHORT);
    }
  }
  const SkipScreen = () => {
    navigation.navigate('QuestionVapeScreen', { Smoke: null, Lookingfor: Lookingfor, email: email, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }


  const ListSmokeData = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {SmokeData.map((item, index) => (
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

        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.footer}>

            <View style={{
              paddingTop: 0,
            }}>
              <Image source={require('../../assets/smoke2.png')}
                resizeMode='contain' style={{
                  width: 200,
                  height: 180,
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
              }}>Do you Smoke?</Text>
            </View>




            <View style={{
              alignItems: 'center'
            }}>
              <ListSmokeData data={SmokeData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>


            <View style={{
              alignItems: 'center',
              paddingBottom: 50
            }}>

              <View style={{
                paddingTop: 50,
                // flexDirection: 'row'
              }}>
                <View style={{ marginBottom: 5 }}>
                  <CustomeButton onpress={() => onSmokeScreen()}
                    title={'Continue'} />
                </View>
                <View style={{ marginHorizontal: 0 }}>
                  <CustomeButton onpress={() => SkipScreen()}
                    title={'Skip'} bcolor={COLORS.light} />
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

        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default QuestionSmokeScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '40%',
    alignItems: 'center',
  },
  footer: {
    // height: '60%',
    marginBottom:80,
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