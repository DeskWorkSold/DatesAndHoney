import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import SVGImg from '../../../assets/tik.svg';
import SVGImg1 from '../../../assets/arrowleft.svg';
import ProgressBar from '../../components/ProgressBar';
const { height, width } = Dimensions.get('window')


const EducationData = [
  {
    id: '1',
    name: 'All night',
  },
  {
    id: '2',
    name: 'Not at all',
  },
  {
    id: '3',
    name: 'Sometimes',
  },
  {
    id: '4',
    name: 'For a few hours before bed',
  }
]



const SelectionTwoQuestionCuddlingScreen = ({ navigation, route }) => {
  const { ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [checked, setChecked] = React.useState('Apple'); //initial choice


  // console.log(email, InLife, InBed, MovieType, NextLongestRelationship, LongestRelationship, DealBreaker, DealMakers, PartnerBuildType, BuildType, EyeColor, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, languages, ExerciseStatus, Exercise, FavFood,  Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername);


  const onClingyScreen = () => {
    if (selectedCategoryIndex !== null) {
      const Cuddling = EducationData[selectedCategoryIndex].name;
      const update = {
        ...route?.params,
        Cuddling: Cuddling,
        selection3: route?.params?.selection3 + 1,
      }
      // console.log(Cuddling);
      navigation.navigate('SelectionTwoQuestionClingyScreen', update)
    }
    else {
      ToastAndroid.show("Please select your cuddling!", ToastAndroid.SHORT);
    }
  }

  const onSkip = async () => {
    ToastAndroid.show('Cudiling skipping...', ToastAndroid.SHORT)

    // const data = {
    //   ...route?.params,
    //     Cuddling: null,
    //     selection2: route?.params?.selection2 + 1,
    // }
    // try {
    //   setUploading(true)
    //   // const imageUrl6 = await uploadImage();
    //   const imageUrl = await uploadImage(data?.image1);
    //   const imageUrl2 = await uploadImage2(data?.image2);
    //   const imageUrl3 = await uploadImage3(data?.image3);
    //   const imageUrl4 = await uploadImage4(data?.image4);
    //   const imageUrl5 = await uploadImage5(data?.image5);
    //   var Data = new Object();
    //   Data.email = data?.email;
    //   Data.Category = 'User';
    //   Data.filterMaxAge = data?.filterMaxAge;
    //   Data.filterMinAge = data?.filterMinAge;
    //   Data.Name = data?.name;
    //   Data.Drink = data?.Drink;
    //   Data.Drugs = data?.Drugs;
    //   Data.Marijauna = data?.Marijauna;
    //   Data.Vape = data?.Vape;
    //   Data.Smoke = data?.Smoke;
    //   Data.Lookingfor = data?.Lookingfor;
    //   Data.PoliticalView = data?.PoliticalView;
    //   Data.Bio = data?.Bio;
    //   Data.Kids = data?.Kids;
    //   Data.PartnerGender = data?.PartnerGender;
    //   Data.Gender = data?.Gender;
    //   Data.Dates = data?.DateOfBirth;
    //   Data.image5 = imageUrl5;
    //   Data.image4 = imageUrl4;
    //   Data.image3 = imageUrl3;
    //   Data.image2 = imageUrl2;
    //   Data.image1 = imageUrl;
    //   Data.uid = CurrentUser;
    //   Data.selection1 = data?.selection1;
    //   Data.PhoneNumber = userPhoneNumber ? userPhoneNumber : null;
    //   Data.Location = {
    //     latitude: 24.9028039,
    //     longitude: 67.1145385,
    //   }
    //   Data.Education = data?.Education;
    //   Data.RelationshipType = data?.RelationshipType;
    //   Data.Relagion = data?.Relagion;
    //   Data.ParentReligion = data?.ParentReligion;
    //   Data.ReligionType = data?.religionType;
    //   Data.KosherType = data?.KosherType;
    //   Data.foodtype = data?.foodtype;
    //   Data.Diet = data?.Diet;
    //   Data.FavFood = data?.FavFood;
    //   Data.ExerciseStatus = data?.ExerciseStatus;
    //   Data.Exercise = data?.Exercise;

    //   // Data.filterGender = 'Female'
    //   // console.log('test data: ', Data);
    //   // return;
    //   firestore()
    //     .collection('Users').doc(CurrentUser).set({
    //       userDetails: Data
    //     }).then(() => {
    //       setUploading(false)
    //       dispatch(login(Data))
    //       ToastAndroid.show('Welcome to Honey and Dates', ToastAndroid.SHORT)
    //       navigation.navigate('QuestionCongratulationScreen')
    //     })
    //   setUploading(false)
    // } catch (error) {
    //   setUploading(false)
    //   console.log('error test', error);
    // }

    // navigation.navigate('QuestionClingyScreen', { Cuddling: null, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
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
    <SafeAreaView>
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
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image source={require('../../../assets/notify.png')} resizeMode='contain'
                style={{
                  width: 15,
                  height: 15,
                }} />
              <Text style={{
                color: COLORS.black,
                marginLeft: 5
              }}>Response is not public</Text>
            </View>
            <View style={{
              flex: 1,
            }}>
              {/* <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} /> */}
            </View>
          </View>
          <ProgressBar progress={'80'} />

          <View style={{
            alignItems: 'center',
            paddingHorizontal: 60,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Do you like Cuddling
            </Text>
          </View>

          <View style={{
            // alignSelf: 'center',
          }}>
            <ListEducation data={EducationData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
          </View>


        </View>

        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          height: '25%'
        }}>
          <View style={{ marginBottom: 5 }}>
            <CustomeButton onpress={() => onClingyScreen()}
              title={'Continue'} width={width / 1.1} />
          </View>
          {/* {route?.params?.selection2 > 5 &&
            <View style={{ marginHorizontal: 0 }}>
              <CustomeButton onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light} />
            </View>
          } */}

          <View style={{
            paddingTop: 5,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10, color: COLORS.gray }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>

    </SafeAreaView>
  )
}


export default SelectionTwoQuestionCuddlingScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignItems: 'center',
    height: '75%'
  },
  footer: {
    alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    // marginHorizontal: 20,
    marginHorizontal:20,
    paddingHorizontal: 20,
    height: 45,
    // width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})