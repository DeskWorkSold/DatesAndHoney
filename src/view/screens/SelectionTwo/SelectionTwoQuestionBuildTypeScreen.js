import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react';
import COLORS from '../../../consts/Colors';
import CustomeButton from '../../components/CustomeButton';
import RadioForm from 'react-native-simple-radio-button';
import { RadioButton } from 'react-native-paper';
import SVGImg from '../../../assets/tik.svg';
import SVGImg1 from '../../../assets/arrowleft.svg';
import ProgressBar from '../../components/ProgressBar';
const { width, height } = Dimensions.get('window');

const EducationData = [
  {
    id: '1',
    name: 'Athletic/Fit',
  },
  {
    id: '2',
    name: 'BBW',
  },
  {
    id: '3',
    name: 'Mascular',
  },
  {
    id: '4',
    name: 'Slender',
  },
  {
    id: '5',
    name: 'Petite',
  }
]



const SelectionTwoQuestionBuildTypeScreen = ({ navigation, route }) => {
  const { PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  // console.log('heigth',Height);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  // console.log( email, EyeColor, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, languages,  ExerciseStatus, Exercise, FavFood,  Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView,  filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername);

  const onBuildTypePartnerScreen = () => {
    if (selectedCategoryIndex !== null) {
      const BuildType = EducationData[selectedCategoryIndex].name
      const update = {
        ...route?.params,
        BuildType: BuildType,
        selection2: route?.params?.selection2 + 1,
      }
      // console.log(BuildType);
      navigation.navigate('SelectionTwoQuestionLanguageScreen', update)
    }
    else {
      ToastAndroid.show("Please enter your build type!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    const data = {
      ...route?.params,
      BuildType: null,
    }
    navigation.navigate('QuestionBuildTypePartnerScreen', { BuildType: null, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
  }


  const ListEducation = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
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
                  {TypeTestimonial.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
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
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>
          <View style={{
            alignItems: 'center',
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            height: 60
          }}>
            <View style={{
              flex: 1,
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              flex: 3,
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Image source={require('../../../assets/notify.png')} resizeMode='contain'
                style={{
                  width: 15,
                  height: 15,
                }} />
              <Text style={{
                color: COLORS.black,
                marginLeft: 5
              }}>Response is Not Public</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'flex-end'
            }}>
              {/* <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} /> */}
            </View>
          </View>
          <ProgressBar progress={'92.4'} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Image source={require('../../../assets/buildtype.png')} resizeMode='contain' style={{
              height: height / 6,
            }} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Your Build Type
            </Text>
          </View>


          <View style={{
            alignItems: 'center'
          }}>
            <ListEducation data={EducationData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
          </View>



          <View style={{
            alignItems: 'center',
            paddingBottom: 5,
            paddingTop: 70,
          }}>
            <View style={{
              marginBottom: 5
            }}>
              <CustomeButton onpress={() => onBuildTypePartnerScreen()}
                title={'Continue'} width={width / 1.1} />
            </View>
            {/* <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onSkip()}
                  title={'Skip'} bcolor={COLORS.light} />
              </View> */}

            <View style={{
              paddingTop: 5,
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10 ,color:COLORS.gray}}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}


export default SelectionTwoQuestionBuildTypeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignItems: 'center',
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
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})