import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import SVGImg from '../../../assets/tik.svg';
import SVGImg1 from '../../../assets/arrowleft.svg';
import ProgressBar from '../../components/ProgressBar';
const { width, height } = Dimensions.get('window')
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';

const EducationData = [
  {
    id: '1',
    name: 'None',
  },
  {
    id: '2',
    name: 'Few days',
  },
  {
    id: '3',
    name: 'Few Months',
  },
  {
    id: '4',
    name: '1 year',
  },
  {
    id: '5',
    name: '2 year',
  },
  {
    id: '6',
    name: '3 year +',
  },
]



const SelectionThreeQuestionLongestRelationshipScreen = ({ navigation, route }) => {
  // const { InFiveYear, InTenYear, IntroandExtro, DealBreaker, DealMakers, InstaUsername, languages, PartnerEthnicity, Ethnicity, PartnerBuildType, BuildType, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState([]);
  const [checked, setChecked] = React.useState('Apple'); //initial choice
  const CurrentUser = auth().currentUser.uid;
  const [uploading, setUploading] = useState(false);

  // console.log( email, DealBreaker, DealMakers, PartnerBuildType, BuildType, EyeColor, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height,  languages,  ExerciseStatus, Exercise, FavFood, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername);

  const handleSelection = (item) => {
    if (selectedCategoryIndex.includes(item)) {
      // Item is already in the array, so remove it
      const newSelectedItems = selectedCategoryIndex.filter((i) => i !== item);
      setSelectedCategoryIndex(newSelectedItems);

    }
    else {
      // Item is not in the array, so add it
      const newSelectedItems = [...selectedCategoryIndex, item];
      setSelectedCategoryIndex(newSelectedItems);
    }
  };

  const onNextRelationshipTimeScreen = async () => {
    if (selectedCategoryIndex?.length > 0) {
      // const LongestRelationship = EducationData[selectedCategoryIndex].name;
      const data = {
        ...route?.params,
        LongestRelationship: selectedCategoryIndex,
        selection2: route?.params?.selection2 + 1,
      }
      // console.log(data);
      //       return
      try {
        setUploading(true)
        await firestore()
          .collection('Users').doc(CurrentUser).update({
            'userDetails.CompanyName': data?.CompanyName,
            'userDetails.CompanyType': data?.CompanyType,
            'userDetails.Education': data?.Education,
            'userDetails.Hieght': data?.Height,
            'userDetails.Kids': data?.Kids,
            'userDetails.LongestRelationship': data?.LongestRelationship,
            'userDetails.PositioninCompany': data?.PositioninCompany,
            'userDetails.languages': data?.languages,
            'userDetails.SelectionTwo': data?.selection2,
            'userDetails.TotalSwipes.Swipe': 0,
          }).then(() => {
            setUploading(false)
            ToastAndroid.show('Phase Two Completed Succesfully!', ToastAndroid.SHORT)
            navigation.navigate('Home');
            // setSelectedItems([])
          })
        // setUploading(false)
      } catch (error) {
        setUploading(false)
        ToastAndroid.show('Error : ' + error, ToastAndroid.SHORT)
        console.log('error test', error);
      }
      return
    }
    else {
      ToastAndroid.show("Please select Longest Relationship!", ToastAndroid.SHORT);
    }
  }

  // const onSkip = () => {
  //   navigation.navigate('QuestionNextRelationshipTimeScreen', { LongestRelationship: null, InFiveYear: InFiveYear, InTenYear: InTenYear, IntroandExtro: IntroandExtro, DealBreaker: DealBreaker, DealMakers: DealMakers, InstaUsername: InstaUsername, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
  // }




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
                {selectedCategoryIndex?.includes(TypeTestimonial.name) ? (
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
      <View style={styles.container}>


        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                }}>Phase two has been completed</Text>
              </View>
              <View style={{
                flex: 1,
              }}>
                {/* <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} /> */}
              </View>
            </View>

            <ProgressBar progress={'100'} />


            <View style={{
              alignItems: 'center',
              paddingHorizontal: 50,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center'
              }}>What is the longest
                relationship you’ve had
              </Text>

              <Text style={{
                fontSize: 12,
                color: COLORS.gray,
              }}>(Select all that apply)</Text>
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
              paddingTop: 50
            }}>
              <View style={{
                // flexDirection: 'row'
              }}>
                <View style={{ marginBottom: 5 }}>
                  {uploading ?
                    <CustomeButton title={'Please wait...'} width={width / 1.1} />
                    :
                    <CustomeButton onpress={() => onNextRelationshipTimeScreen()}
                      title={'Complete'} width={width / 1.1} />
                  }
                </View>
                {/* <View style={{ marginHorizontal: 0 }}>
                  <CustomeButton onpress={() => onSkip()}
                    title={'Skip'} bcolor={COLORS.light} />
                </View> */}
              </View>

              <View style={{
                paddingTop: 5,
                width: 310,
              }}>
                <Text style={{ textAlign: 'center', fontSize: 10, color: COLORS.gray }}>
                  By continue you agree our Terms and Privacy Policy.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <Loader uploading={uploading} modal={uploading} />

    </SafeAreaView>
  )
}


export default SelectionThreeQuestionLongestRelationshipScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignItems: 'center',
    height: '100%'
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