import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';

const RelationshipType = [
  {
    id: '1',
    name: 'Is your mom born Christian',
  },
  {
    id: '2',
    name: 'Is your dad born Christian',
  },
  {
    id: '3',
    name: 'Catholic',
  },
  {
    id: '4',
    name: 'Muslim',
  },
  {
    id: '5',
    name: 'Hinduism',
  },

  {
    id: '5',
    name: 'Buddhism',
  },

  {
    id: '5',
    name: 'Chinese traditional religion',
  },
]

export const detailReligion = [
  {
    id: '1',
    name: 'Yes, Blind',
  }, {
    id: '2',
    name: 'Yes, Deaf',
  },
  {
    id: '3',
    name: 'Yes, Wheel Chair',
  },
  {
    id: '4',
    name: 'Yes, Can be other',
  }
]

const Disability = [
  {
    id: '1',
    name: 'No',
  },
]



const QuestionDisabilityScreen = ({ navigation, route }) => {
  const { email, DescribePartner, DescribeYou, languages, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedDisabilityIndex, setDisabilityIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);
  const [Disable, setDisable] = useState();
  const [ServayCategory, setServayCategory] = useState();



  const onDisabilityPartnerScreen = () => {
    // setDisable(detailReligion[selectedCategoryIndex].name)
    // const detailReligion2 = detailReligion[selectedCategoryIndex].name
    // const Disability2 = Disability[selectedDisabilityIndex].name
    // console.log(ServayCategory ,Disable );
    // return;

    if (!ServayCategory) {
      ToastAndroid.show("Please select your Disability!", ToastAndroid.SHORT);
    }
    else {
      if (ServayCategory == 'Yes') {
        if (!Disable) {
          ToastAndroid.show("Please select type of disability!", ToastAndroid.SHORT);
        }
        else {
          navigation.navigate('QuestionDisabilityPartnerScreen', { Disability: Disable, email: email, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
        }
      }
      else {
        navigation.navigate('QuestionDisabilityPartnerScreen', { Disability: ServayCategory, email: email, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
      }
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionDisabilityPartnerScreen', { Disability: null, DescribePartner: DescribePartner, email: email, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }


  const toggleDropdown = () => {
    setShowtick(!showtick)
    setShowOptions(!showOptions);
  };

  const yesAbility = (index) => {
    setSelectedCategoryIndex(index)
    setDisable(detailReligion[index].name)
  }

  const toggleDropdown2 = (index) => {
    setDisabilityIndex(index)
    setDisable(Disability[selectedDisabilityIndex].name)
    setShowtick2(!showtick2)
  };


  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View style={{ height: 100 }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {detailReligion.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => yesAbility(index)}
              >
                <View style={styles.MoreaboutReligion}>

                  <View style={{ width: '90%' }}>
                    <Text style={{ color: COLORS.black }}>{item.name}</Text>
                  </View>
                  <View style={{
                    alignItems: 'flex-end'
                  }}>
                    {selectedCategoryIndex == index ? (
                      <SVGImg width={20} height={20} />
                    ) : (<View></View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    }
  };

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


          <View style={{
            paddingTop: 0,
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/disablility.png')} resizeMode='contain' style={{
              width: 250,
              height: 180,
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
              textAlign: 'center'
            }}>Any Disability
            </Text>
          </View>

          <TouchableOpacity onPress={() => { setServayCategory('Yes'), setShowOptions(!showOptions) }}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Yes</Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {ServayCategory == 'Yes' && (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                )}
              </View>
            </View>
          </TouchableOpacity>
          {ServayCategory == 'Yes' &&
            renderDropdown()
          }

          <TouchableOpacity onPress={() => setServayCategory('No')}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>No</Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {ServayCategory == 'No' && (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* {Disability.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => toggleDropdown2(index)}>
              <View style={styles.NumberInput}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>{item.name}</Text>
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  {showtick2 && (
                    <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                      width: 20,
                      height: 20
                    }} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))} */}

        </View>


        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          height: '20%'
        }}>
          <View style={{
            marginBottom: 5,
          }}>
            <CustomeButton onpress={() => onDisabilityPartnerScreen()}
              title={'Continue'} />
          </View>

          <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
            title={'Skip'} />

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
    </SafeAreaView>
  )
}


export default QuestionDisabilityScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '80%',
  },
  footer: {
    alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    backgroundColor: COLORS.transparent,
  },
  MoreaboutReligion: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light
  }
})