import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import SVGImg1 from '../../../assets/arrowleft.svg';
import { TextInput } from 'react-native-paper';
const { width, height } = Dimensions.get('window')
import SVGNotify from '../../../assets/notify.svg';
import SVGInfo from '../../../assets/info.svg';
import ProgressBar from '../../components/ProgressBar';


const SelectionThreeQuestionInstagramScreen = ({ navigation, route }) => {
  // const { languages, PartnerEthnicity, Ethnicity, PartnerBuildType, BuildType, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [instagram, setinstagram] = useState();
  const [instagramError, setinstagramError] = useState(false);

  // console.log(DateOfBirth);

  const onOccupationScreen = () => {
    // console.log(instagram);
    if (instagram) {
      const data = {
        ...route?.params,
        InstaUsername: instagram,
        selection3: 1,
      }
      navigation.navigate('SelectionThreeQuestionDealBreakandMakeScreen', data)
      // navigation.navigate('QuestionDealBreakandMakeScreen', { InstaUsername: instagram, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
    }
    else {
      ToastAndroid.show("Please enter instagram user name!", ToastAndroid.SHORT);
      setinstagramError(true)
    }
  }

  const onSkip = () => {
    const data = {
      ...route?.params,
      InstaUsername: null,
      selection3: 1,
    }
    navigation.navigate('SelectionThreeQuestionDealBreakandMakeScreen', data)

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
              // backgroundColor: COLORS.gray2
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              flex: 3,
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SVGNotify width={20} height={20} />
              <Text style={{
                color: COLORS.black,
                marginLeft: 5,
                fontSize: 12,
              }}>Response is not public</Text>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: COLORS.gray2
            }}>
            </View>
          </View>
          <ProgressBar progress={'20'} />


          <View style={{
            paddingTop: 0,
            flexDirection: 'row',
            alignSelf: 'center'
          }}>
            <Image source={require('../../../assets/insta.png')} resizeMode='contain' style={{
              height: height / 4,
            }} />

            <Image source={require('../../../assets/Socialmedia4.png')} resizeMode='contain' style={{
              width: 150,
              position: 'absolute',
              marginTop: 80,
              marginLeft: 40
            }} />
          </View>


          <View style={{
            alignItems: 'center',
            // paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>What's your Instagram?</Text>
          </View>


          <View style={styles.NumberInput}>
            <TextInput
              value={instagram}
              placeholder={'Enter your username'}
              placeholderTextColor={COLORS.gray}
              error={instagramError}
              onChangeText={instagram => setinstagram(instagram)
              }
              underlineColor={COLORS.white}
              activeUnderlineColor={COLORS.transparent}
              onFocus={() => setinstagramError(false)}
              style={styles.TextInput}
            />
          </View>


          <View style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginVertical: 10,
            justifyContent: 'center'
          }}>
            <SVGInfo width={20} height={20} />
            <Text style={{
              width: '90%',
              paddingLeft: 10,
              fontSize: 12,
              color: COLORS.gray
            }}>
              Optional, you might get invited to join our influencer program and have an opportunity to make money, might also get your approved sooner
            </Text>
          </View>





          <View style={{
            marginTop: '15%',
            paddingHorizontal: 20
            // alignItems: 'center'
            // flexDirection: 'row'
          }}>
            <View style={{ marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <CustomeButton onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light} width={width / 2.3} />
              <CustomeButton onpress={() => onOccupationScreen()}
                title={'Continue'} width={width / 2.3} />
            </View>
            {/* <View style={{ marginHorizontal: 5 }}>
              <CustomeButton onpress={() => SkipScreen()}
                title={'Skip'} bcolor={COLORS.light} />
            </View> */}
          </View>


        </View>



      </View>



    </SafeAreaView >
  )
}

export default SelectionThreeQuestionInstagramScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '80%',
    // alignItems: 'center',
  },
  footer: {
    height: '20%',
    alignItems: 'center',
  },
  NumberInput: {
    marginTop: 30,
    justifyContent: 'center',
    // alignSelf: 'center',
    // paddingHorizontal: 20,
    height: 45,
    marginHorizontal:20,
    // width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    fontSize: 12
  },
})