import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/notify.svg';
import SVGImg1 from '../../assets/arrowleft.svg';
import ProgressBar from '../components/ProgressBar';
const { width, height } = Dimensions.get('window')

const QuestionProfessionallyScreen = ({ navigation, route }) => {
  const { IntroandExtro, DealBreaker, DealMakers, InstaUsername, languages, PartnerEthnicity, Ethnicity, PartnerBuildType, BuildType, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [experince, setExperince] = useState(null);
  const [experince2, setExperince2] = useState(null);
  // console.log(DateOfBirth);

  const onMusicSelect = () => {
    if (experince && experince2) {
      // console.log(experince, experince2);
      const data = {
        ...route?.params,
        InFiveYear: experince,
        InTenYear: experince2,
        selection3: route?.params?.selection3 + 1,
      }
      navigation.navigate('QuestionLongestRelationshipScreen', data)
      // navigation.navigate('QuestionPartnerAge', {
      //   InFiveYear: experince, InTenYear: experince2, IntroandExtro: IntroandExtro, DealBreaker: DealBreaker, DealMakers: DealMakers, InstaUsername: InstaUsername, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender
      // })
    }
    else {
      if (!experince) {
        ToastAndroid.show("Please enter you see your self in five years", ToastAndroid.SHORT);
      }
      else if (!experince2) {
        ToastAndroid.show("Please enter you see your self in ten years", ToastAndroid.SHORT);
      }
      else {
        ToastAndroid.show("Please enter both experinces!", ToastAndroid.SHORT);
      }
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionPartnerAge', {
      InFiveYear: null, InTenYear: null, IntroandExtro: IntroandExtro, DealBreaker: DealBreaker, DealMakers: DealMakers, InstaUsername: InstaUsername, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender
    })
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={true}>
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
                // backgroundColor: COLORS.gray2
              }}>
                <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
              </View>
              <View style={{
                flex: 4,
                justifyContent:'center',
                // backgroundColor: COLORS.gray,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20
              }}>
                <SVGImg width={19} height={19} />
                <Text style={{
                  color: COLORS.black,
                  paddingLeft: 5,
                  textAlign: 'center',
                  fontSize:12,
                }}>Response is Not Public</Text>
              </View>
              <View style={{
                flex: 1,
                backgroundColor: COLORS.gray2
              }}>
              </View>
            </View>

            <ProgressBar progress={'50'} />


            <View style={{
              alignItems: 'center',
              paddingHorizontal: 50,
              paddingTop: 20,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center',
              }}>Where do you see yourself professionally and personally in five years?</Text>
            </View>

            <View style={{
              paddingTop: 20,
              alignSelf: 'center'
            }}>
              <TextInput
                placeholder='Type Here!'
                placeholderTextColor={COLORS.gray}
                multiline
                value={experince}
                numberOfLines={4}
                onChangeText={experince => setExperince(experince)}
                style={styles.TextInput} />
            </View>


            <View style={{
              alignItems: 'center',
              paddingHorizontal: 50,
              paddingTop: 20,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center',
              }}>Where do you see yourself
                professionally  and personally
                in ten years?</Text>
            </View>

            <View style={{
              paddingTop: 20,
              alignSelf: 'center'
            }}>
              <TextInput
                placeholder='Type Here!'
                placeholderTextColor={COLORS.gray}
                multiline
                value={experince2}
                numberOfLines={4}
                onChangeText={experince2 => setExperince2(experince2)}
                style={styles.TextInput} />
            </View>

          </View>

          <View style={styles.footer}>

            <View style={{
              paddingTop: 20,
              // flexDirection: 'row'
            }}>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onMusicSelect()}
                  title={'Continue'} width={width / 1.1} />
              </View>
              {/* <View>
                <CustomeButton onpress={() => onSkip()}
                  title={'Skip'} bcolor={COLORS.light} />
              </View> */}
            </View>

            <View style={{
              paddingVertical: 10,
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10 ,color:COLORS.black, }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>



    </SafeAreaView>
  )
}

export default QuestionProfessionallyScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '75%',
    // alignItems: 'center',
  },
  footer: {
    marginTop: 20,
    // height: '25%',
    alignItems: 'center'
  },
  NumberInput: {
    marginTop: 20,
    justifyContent: 'center',
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
    color: COLORS.black,
    width: 320,
    borderRadius: 10,
    height: 100,
    textAlignVertical: 'top',
  },
})