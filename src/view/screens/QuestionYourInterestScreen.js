import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';



const GenderData = [
  {
    id: '1',
    name: 'Male',
  },
  {
    id: '2',
    name: 'Female',
  },
  {
    id: '3',
    name: 'Non binaray',
  },
  {
    id: '4',
    name: 'Trans Male to Female',
  },
  {
    id: '5',
    name: 'Trans Female to Male',
  },
]

const QuestionYourInterestScreen = ({ navigation, route }) => {
  const { Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  // console.log(image5);
  const selection1 = 1;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [checked, setChecked] = React.useState('Apple'); //initial choice
  // console.log(DateOfBirth);


  const onQuestionWantKidsScreen = () => {
    if (selectedCategoryIndex !== null) {
      console.log(GenderData[selectedCategoryIndex].name);
      const selectedGender = GenderData[selectedCategoryIndex].name;
      const update = {
        ...route?.params,
        Drink: drinkData,
        Drugs: drugsData,
        Marijauna: marijuanaData,
        Vape: vapeData,
        Smoke: smokeData,
        selection2: 1,
      }
      navigation.navigate('QuestionPartnerAge', { PartnerGender: selectedGender, selection1: selection1, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender, })
    }
    else {
      ToastAndroid.show("Please select gender you are interested in!", ToastAndroid.SHORT);
    }
  }
  const onSkip = () => {
    console.log('skip');
    navigation.navigate('QuestionPartnerAge', { PartnerGender: null, selection1: selection1, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender, })
    // console.log(GenderData[selectedCategoryIndex].name);
    // const selectedGender = GenderData[selectedCategoryIndex].name;
    // navigation.navigate('QuestionClingyScreen', { RelationshipLookingType: null, Cuddling: null, InLife: null, InBed: null, MovieType: null, NextLongestRelationship: null, LongestRelationship: null, OpenTo: null, DealBreaker: null, DealMakers: null, Firstrefname: null, FirstRefemail: null, FirstRefnumber: null, Secrefname: null, SecRefemail: null, SecRefnumber: null, PartnerBuildType: null, BuildType: null, PartnerMaxHeight: null, PartnerMinHeight: null, Height: null, PartnerDisability: null, Disability: null, DescribePartner: null, DescribeYou: null, PartnerEthnicity: null, Ethnicity: null, PartnerExercise: null, ExerciseStatus: null, Exercise: null, FavFood: null, PartnerDiet: null, Diet: null, ParentReligion: null, religionType: null, foodtype: null, KosherType: null, Relagion: null, RelationshipType: null, Education: null, Interest: null, CompanyName: null, PositioninCompany: null, CompanyType: null, InstaUsername: null, Drink: null, Drugs: null, Marijauna: null, Vape: null, Smoke: null, Lookingfor: null, PartnerNature: null, Nature: null, PoliticalPartnerView: null, PoliticalView: null, Music: null, Experince: null, Bio: null, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: selectedGender, Kids: null })
  }

  const ListGender = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((gender, index) => (
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
                  {gender.name}
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


          <View style={{
            alignItems: 'center',
            paddingTop: 20,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Who are you interested in?</Text>
          </View>
          <View>
            <ListGender data={GenderData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>
        </View>





        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
            // flexDirection: 'row',
            marginHorizontal: 20
          }}>
            <View style={{ marginBottom: 5 }}>
              <CustomeButton onpress={() => onQuestionWantKidsScreen()}
                title={'Continue'} />
            </View>
            {/* <View>
              <CustomeButton onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light}/>
            </View> */}
          </View>

          <View style={{
            // paddingTop: 20,
            width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>
      {/* </View> */}



    </SafeAreaView>
  )
}

export default QuestionYourInterestScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '75%',
    alignItems: 'center',
  },
  footer: {
    height: '25%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  NumberInput: {
    marginTop: 20,
    flexDirection: 'row',
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