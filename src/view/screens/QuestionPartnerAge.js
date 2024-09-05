import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';
import Slider from '@react-native-community/slider';


const QuestionPartnerAge = ({ navigation, route }) => {
  const { PartnerGender, selection1, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [height, setHeight] = useState();
  const [heighType, setHeightType] = useState(false);
  const [selectMinMaxAge, setSelectMinMaxAge] = useState('minage');
  const [minimumAge, setminimumAgeRange] = useState(17);
  const [maximumAge, setmaximumAgeRange] = useState(120);
// console.log(route.params);


  const onPartnerAge = async () => {
    // const filterMinAge = Math.floor(minimumAge * 100)
    // const filterMaxAge = Math.floor(maximumAge * 100)
    // console.log(minimumAge , maximumAge);
    // return
    if (minimumAge > 16 && maximumAge > 20) {
      navigation.navigate('QuestionWantKidsScreen', {
        filterMinAge: minimumAge, filterMaxAge: maximumAge, PartnerGender: PartnerGender, selection1: selection1 + 1, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender,
      })
    }
    else {
      if (minimumAge <= 16) {
        ToastAndroid.show("Partner minimum age start from 17 year!", ToastAndroid.SHORT);
      }
      else if (maximumAge < 20) {
        ToastAndroid.show("Partner maximum age start from 20 year!", ToastAndroid.SHORT);
      }
    }
  }
  const onSkip = async () => {
    console.log('test');
    navigation.navigate('QuestionWantKidsScreen', {
      filterMinAge: null, filterMaxAge: null, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender,
    })
  }

  // const onQuestionHeightPartnerScreen = () => {
  //   if (height) {
  //     // console.log(height);
  //     navigation.navigate('QuestionHeightPartnerScreen', { Height: height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  //   }
  //   else {
  //     ToastAndroid.show("Please select your Height!", ToastAndroid.SHORT);
  //   }
  // }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            paddingTop: 20,
            alignItems: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20
          }}>
            <View>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              paddingHorizontal: 20
            }}>
              <Text style={{
                fontSize: 20,
                paddingHorizontal: 30,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center'
              }}>What age do want your
                partner to have?
              </Text>
            </View>
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 30,
            paddingTop: 20,
          }}>
            <View style={{
              flex: 1,
              // paddingHorizontal: 10
            }}>
              <Text style={{
                fontSize: 16,
                // fontWeight: 'bold',
                color: COLORS.black
              }}>Age Range</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}>
              <TouchableOpacity onPress={() => setSelectMinMaxAge('minage')}
                style={{
                  // backgroundColor: COLORS.main,
                  // paddingHorizontal: 3,
                  // borderRadius: 4
                }}>
                <Text style={{
                  fontSize: 20,
                  color: COLORS.black,
                  fontWeight: 'bold'
                }}>{Math.floor(minimumAge * 1)}</Text>
              </TouchableOpacity>
              <Text> - </Text>
              <TouchableOpacity onPress={() => setSelectMinMaxAge('maxage')}
                style={{
                  // backgroundColor: COLORS.main,
                  // paddingHorizontal: 3,
                  // borderRadius: 4
                }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.black
                }}>{Math.floor(maximumAge * 1)}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {selectMinMaxAge == 'maxage' ?
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Slider
                style={{ width: '100%', height: 40, }}
                minimumValue={0}
                maximumValue={1}
                thumbTouchSize={{
                  width: 40, height: 40
                }}
                thumbTintColor={COLORS.main}
                minimumTrackTintColor={COLORS.main}
                maximumTrackTintColor={COLORS.gray}
                value={Math.floor(maximumAge) / 120}
                onValueChange={(value) => setmaximumAgeRange(Math.floor(value * 120))}
              />
            </View>
            :
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Slider
                style={{ width: '100%', height: 40, }}
                minimumValue={0}
                maximumValue={1}
                thumbTouchSize={{
                  width: 40, height: 40
                }}
                thumbTintColor={COLORS.main}
                minimumTrackTintColor={COLORS.main}
                maximumTrackTintColor={COLORS.gray}
                value={Math.floor(minimumAge) / 120}
                onValueChange={(value) => setminimumAgeRange(Math.floor(value * 120))}
              />
            </View>
          }
        </View>
      </View>


      <View style={styles.footer}>

        <View style={{
          paddingTop: 20,
        }}>
          <CustomeButton onpress={() => onPartnerAge()}
            title={'Continue'} />
        </View>
        {/* <View style={{
          paddingTop: 10,
        }}>
          <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
            title={'Skip'} />
        </View> */}

        <View style={{
          paddingTop: 20,
          width: 310,
        }}>
          <Text style={{ textAlign: 'center', fontSize: 10 }}>
            By continue you agree our Terms and Privacy Policy.
          </Text>
        </View>
      </View>


    </SafeAreaView>
  )
}

export default QuestionPartnerAge

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: '75%',
  },
  contentContainer: {
    // height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '25%',
    alignItems: 'center'
    // marginTop: '40%'
  },
  NumberInput: {
    marginTop: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  TextInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
})