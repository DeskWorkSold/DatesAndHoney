import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import RadioForm from 'react-native-simple-radio-button';
import { RadioButton } from 'react-native-paper';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';

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
  },
  {
    id: '6',
    name: 'Curvy',
  }
]



const QuestionBuildTypePartnerScreen = ({ navigation, route }) => {
  const { BuildType, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState([]);

  // console.log(email, BuildType, EyeColor, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, languages, ExerciseStatus, Exercise, FavFood, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername);


  const handleSelection = (item) => {
    if (selectedCategoryIndex.includes(item)) {
      // Item is already in the array, so remove it
      const newSelectedItems = selectedCategoryIndex.filter((i) => i !== item);
      setSelectedCategoryIndex(newSelectedItems);

      const newSelectedItemsTwo = typeOfRealtionship.filter((i) => i !== item);
      setTypeOfRealtionship(newSelectedItemsTwo);
    }
    else {
      // Item is not in the array, so add it
      const newSelectedItems = [...selectedCategoryIndex, item];
      setSelectedCategoryIndex(newSelectedItems);
    }
  };



  const onReferenceEmailScreen = () => {
    if (selectedCategoryIndex?.length > 0) {
      // console.log(selectedCategoryIndex);
      // return
      navigation.navigate('QuestionEthnicityScreen', { PartnerBuildType: selectedCategoryIndex, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMaxHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
    }
    else {
      ToastAndroid.show("Please enter your Partner Build Type!", ToastAndroid.SHORT);
    }
  }
  
  const onSkip = () => {
    navigation.navigate('QuestionEthnicityScreen', { PartnerBuildType: [], BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMaxHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender  })
  }




  const ListEducation = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => handleSelection(TypeTestimonial.name)}>
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
                {selectedCategoryIndex.includes(TypeTestimonial.name) ? (
                  <SVGImg width={20} height={20} />
                ) : (null
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
            height: 60,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <View style={{
              flex: 1,
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              flex: 3,
              flexDirection: "row",
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/notify.png')} resizeMode='contain'
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
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{
              paddingTop: 10,
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/Pbuildtype.png')} resizeMode='contain' style={{
                width: 300,
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
              }}>Select the built type you
                would be open to dating?
              </Text>
            </View>


            <View style={{
              alignItems: 'center'
            }}>
              <ListEducation data={EducationData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>



            <View style={{
              alignItems: 'center',
              paddingBottom: 5,
              paddingTop: 70,
            }}>
              <View style={{
                marginBottom: 5
              }}>
                <CustomeButton onpress={() => onReferenceEmailScreen()}
                  title={'Continue'} />
              </View>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onSkip()}
                  title={'Skip'} bcolor={COLORS.light} />
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
          </ScrollView>
        </View>
      </View>



    </SafeAreaView>
  )
}


export default QuestionBuildTypePartnerScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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