import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';

export const RelationshipTypes = [
  {
    id: '1',
    name: 'Platonic Relationship',
  },
  {
    id: '2',
    name: 'Long term Relationship',
  },
  {
    id: '3',
    name: 'Short term Relationship',
  },
  {
    id: '4',
    name: 'One night stand',
  },
  {
    id: '5',
    name: 'Polymerous',
  },
  {
    id: '6',
    name: 'Monogamous',
  },
  {
    id: '7',
    name: 'Open relationship',
  },
  {
    id: '8',
    name: 'Regular FWB',
  },
  {
    id: '9',
    name: 'Life partner',
  },
]



const QuestionRelationshipLookingScreen = ({ navigation, route }) => {
  const { email, Cuddling, InLife, InBed, MovieType, NextLongestRelationship, LongestRelationship, OpenTo, DealBreaker, DealMakers, Firstrefname, FirstRefemail, FirstRefnumber, Secrefname, SecRefemail, SecRefnumber, PartnerBuildType, BuildType, EyeColor, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, languages, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  console.log(DateOfBirth);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);


  const onReligionScreen = () => {
    const selectitem = RelationshipTypes[selectedCategoryIndex].name;
    console.log(selectitem);
    if (selectitem) {
      // const Occupation = occupation;
      navigation.navigate('QuestionClingyScreen', { RelationshipLookingType: selectitem, email: email, Cuddling: Cuddling, InLife: InLife, InBed: InBed, MovieType: MovieType, NextLongestRelationship: NextLongestRelationship, LongestRelationship: LongestRelationship, OpenTo: OpenTo, DealBreaker: DealBreaker, DealMakers: DealMakers, Firstrefname: Firstrefname, FirstRefemail: FirstRefemail, FirstRefnumber: FirstRefnumber, Secrefname: Secrefname, SecRefemail: SecRefemail, SecRefnumber: SecRefnumber, PartnerBuildType: PartnerBuildType, BuildType: BuildType, EyeColor: EyeColor, HairColor: HairColor, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your interest!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    // const Occupation = occupation;
    navigation.navigate('QuestionClingyScreen', { RelationshipLookingType: null, email: email, Cuddling: Cuddling, InLife: InLife, InBed: InBed, MovieType: MovieType, NextLongestRelationship: NextLongestRelationship, LongestRelationship: LongestRelationship, OpenTo: OpenTo, DealBreaker: DealBreaker, DealMakers: DealMakers, Firstrefname: Firstrefname, FirstRefemail: FirstRefemail, FirstRefnumber: FirstRefnumber, Secrefname: Secrefname, SecRefemail: SecRefemail, SecRefnumber: SecRefnumber, PartnerBuildType: PartnerBuildType, BuildType: BuildType, EyeColor: EyeColor, HairColor: HairColor, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }

  const ListRelationShips = ({ value, setValue }) => {
    return (
      <View>
        {RelationshipTypes?.map((TypeTestimonial, index) => (
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
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>
          <View style={{
            alignItems: 'center',
            paddingTop: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <View style={{
              flex: 1,
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
          </View>


          <View style={{
            paddingTop: 10,
            alignItems: 'center',
            paddingHorizontal: 50,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>What type of relationship you are looking for?</Text>
          </View>
          <View style={{
            alignItems: 'center',
            paddingTop: 10
          }}>
            <Text style={{
              color: COLORS.black
            }}>Select all that apply</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              alignItems: 'center'
            }}>
              <ListRelationShips value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} />
            </View>



            <View style={{
              alignItems: 'center',
              paddingBottom: 5,
              paddingTop: 40
              // height: '15%'
            }}>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onReligionScreen()}
                  title={'Continue'} />
              </View>

              <CustomeButton onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light} />

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


export default QuestionRelationshipLookingScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignItems: 'center',
    height: '100%',
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