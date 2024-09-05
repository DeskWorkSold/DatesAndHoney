import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';

const RelationshipTypes = [
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



const MediatorQuestionRelationshipLookingScreen = ({ navigation, route }) => {
  const { Cuddling, InLife, InBed, MovieType, NextLongestRelationship, LongestRelationship, OpenTo, DealBreaker, DealMakers, Firstrefname, FirstRefemail, FirstRefnumber, Secrefname, SecRefemail, SecRefnumber, PartnerBuildType, BuildType, PartnerMaxHeight, PartnerMinHeight, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);


  const onReligionScreen = () => {
    const selectitem = RelationshipTypes[selectedCategoryIndex].name;
    console.log(selectitem);
    if (selectitem) {
      // const Occupation = occupation;
      navigation.navigate('MediatorQuestionClingyScreen', { RelationshipLookingType: selectitem, Cuddling: Cuddling, InLife: InLife, InBed: InBed, MovieType: MovieType, NextLongestRelationship: NextLongestRelationship, LongestRelationship: LongestRelationship, OpenTo: OpenTo, DealBreaker: DealBreaker, DealMakers: DealMakers, Firstrefname: Firstrefname, FirstRefemail: FirstRefemail, FirstRefnumber: FirstRefnumber, Secrefname: Secrefname, SecRefemail: SecRefemail, SecRefnumber: SecRefnumber, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your interest!", ToastAndroid.SHORT);
    }
  }

  const ListRelationShips = ({ value, setValue }) => {
    return (
      <View>
        {RelationshipTypes.map((TypeTestimonial, index) => (
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
                  <Image source={require('../../../assets/tik.png')} resizeMode='contain' style={{
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


        {/* <View style={styles.contentContainer}> */}


        <View style={{
          paddingTop: 40,
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
          }}>Select all that apply
          </Text>
        </View>

        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View>
            <ListRelationShips value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} />
          </View>

        {/* </View> */}


        <View style={{
          alignItems: 'center',
          paddingBottom: 55,
          marginTop:20
        }}>
          <CustomeButton onpress={() => onReligionScreen()}
            title={'Continue'} />

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



    </SafeAreaView>
  )
}


export default MediatorQuestionRelationshipLookingScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
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