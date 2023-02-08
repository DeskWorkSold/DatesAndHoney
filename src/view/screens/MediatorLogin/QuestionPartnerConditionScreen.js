import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';

export const detailReligion = [
  {
    id: '1',
    name: 'Someone to build - Is Educated',
  }, {
    id: '2',
    name: 'Someone to build - Is Not Educated',
  }
]

export const detailReligion2 = [
  {
    id: '1',
    name: 'Someone that already well - Is Educated',
  }, {
    id: '2',
    name: 'Someone that already well - Is Not Educated',
  }
]

const openData = [
  {
    id: '1',
    name: 'Im open to anything other things are more important to me',
  },
]



const MediatorQuestionPartnerConditionScreen = ({ navigation, route }) => {
  const { DealBreaker, DealMakers, Firstrefname, FirstRefemail, FirstRefnumber, Secrefname, SecRefemail, SecRefnumber, PartnerBuildType, BuildType, PartnerMaxHeight, PartnerMinHeight, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedCategoryIndex2, setSelectedCategoryIndex2] = useState(0);
  const [selectedCategoryIndex3, setSelectedCategoryIndex3] = useState(0);
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);
  const [showtick3, setShowtick3] = useState(false);
  const [openTo, setopenTo] = useState();

  const onLongestRelationshipScreen = () => {
    if (!openTo) {
      ToastAndroid.show("Please enter major deal makers!", ToastAndroid.SHORT);
    }
    else {
      // console.log(openTo);
      navigation.navigate('MediatorQuestionLongestRelationshipScreen', { OpenTo: openTo, DealBreaker: DealBreaker, DealMakers: DealMakers, Firstrefname: Firstrefname, FirstRefemail: FirstRefemail, FirstRefnumber: FirstRefnumber, Secrefname: Secrefname, SecRefemail: SecRefemail, SecRefnumber: SecRefnumber, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
  }


  const onSkipScreen = () => {
    console.log('Skip Screen');
    // navigation.navigate('QuestionLongestRelationshipScreen', { DealBreaker: null, DealMakers: null, Firstrefname: null, FirstRefemail: null, FirstRefnumber: null, Secrefname: null, SecRefemail: null, SecRefnumber: null, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Hieght, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PIntroandExtro: PIntroandExtro, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }

  const toggleDropdown = () => {
    setShowtick(!showtick)
    setShowOptions(!showOptions);
  };

  const toggleDropdown2 = () => {
    setShowtick2(!showtick2)
    setShowOptions2(!showOptions2);

  };

  const SomeOntoBuild = (index) => {
    setSelectedCategoryIndex(index)
    setopenTo(detailReligion[selectedCategoryIndex].name);
  };
  const SomeOnallreadyWelloff = (index) => {
    setSelectedCategoryIndex2(index)
    setopenTo(detailReligion2[selectedCategoryIndex2].name)
  };

  const openToAnything = (index) => {
    setSelectedCategoryIndex3(index);
    setopenTo(openData[selectedCategoryIndex3].name)
    setShowtick3(!showtick3)
  }


  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View style={{ height: 100 }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {detailReligion.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => SomeOntoBuild(index)}
              >
                <View style={styles.MoreaboutReligion}>

                  <View style={{ width: '90%' }}>
                    <Text style={{ color: COLORS.black }}>{item.name}</Text>
                  </View>
                  <View style={{
                    alignItems: 'flex-end'
                  }}>
                    {selectedCategoryIndex == index ? (
                      <Image source={require('../../../assets/tik.png')} resizeMode='contain' style={{
                        width: 20,
                        height: 20,
                      }} />
                    ) : (null
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

  const renderDropdown2 = () => {
    if (showOptions2) {
      return (
        <View style={{ height: 100 }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {detailReligion2.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => SomeOnallreadyWelloff(index)}
              >
                <View style={styles.MoreaboutReligion}>

                  <View style={{ width: '90%' }}>
                    <Text style={{ color: COLORS.black }}>{item.name}</Text>
                  </View>
                  <View style={{
                    alignItems: 'flex-end'
                  }}>
                    {selectedCategoryIndex2 == index ? (
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
            paddingTop: 10,
            flexDirection: 'row',
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
            paddingTop: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>What are you open to? </Text>
          </View>

          <TouchableOpacity onPress={toggleDropdown}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold', paddingRight: 5 }}>Someone to build Everything
                  with (career wise/business
                  and personal life)
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {renderDropdown()}

          <TouchableOpacity onPress={toggleDropdown2}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold', paddingRight: 5 }}>Someone that is already
                  well off
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {renderDropdown2()}

          {openData.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => openToAnything(index)}>
              <View style={styles.NumberInput}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: COLORS.black, paddingRight: 20 }}>{item.name}
                  </Text>
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  {showtick3 && (
                    <Image source={require('../../../assets/tik.png')} resizeMode='contain' style={{
                      width: 20,
                      height: 20
                    }} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}




        </View>


        <View style={{ height: '10%', alignItems: 'center' }}>

          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={170} onpress={() => onSkipScreen()}
                title={'Skip'} bcolor={COLORS.light} />
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={170} onpress={() => onLongestRelationshipScreen()}
                title={'Continue'} />
            </View>
          </View>
        </View>


      </View>



    </SafeAreaView>
  )
}

export default MediatorQuestionPartnerConditionScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: '100%'

  },
  contentContainer: {
    alignItems: 'center',
    height: '90%'
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
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
    height: 200,
    textAlignVertical: 'top',
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