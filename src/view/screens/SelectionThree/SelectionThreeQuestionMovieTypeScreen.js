import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import SVGImg from '../../../assets/tik.svg';
import SVGImg1 from '../../../assets/arrowleft.svg';
import ProgressBar from '../../components/ProgressBar';
const { width, height } = Dimensions.get('window')


const EducationData = [
  {
    id: '1',
    name: 'Action',
  },
  {
    id: '2',
    name: 'Documantries',
  },
  {
    id: '3',
    name: 'Drama',
  },
  {
    id: '4',
    name: 'Romantic',
  },
  {
    id: '5',
    name: 'Etc',
  },
  {
    id: '6',
    name: 'i dont like movies at all',
  },
]



const SelectionThreeQuestionMovieTypeScreen = ({ navigation, route }) => {
  const { LongestRelationship, InFiveYear, InTenYear, IntroandExtro, DealBreaker, DealMakers, InstaUsername, languages, PartnerEthnicity, Ethnicity, PartnerBuildType, BuildType, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState([]);
  const [checked, setChecked] = React.useState('Apple'); //initial choice

  // console.log(email, NextLongestRelationship, LongestRelationship, DealBreaker, DealMakers, PartnerBuildType, BuildType, EyeColor, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, languages, ExerciseStatus, Exercise, FavFood, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername);
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

  const onInBedScreen = () => {
    if (selectedCategoryIndex?.length > 0) {
      // const movieType = EducationData[selectedCategoryIndex].name;
      // console.log(movieType);
      const data = {
        ...route?.params,
        MovieType: selectedCategoryIndex,
        selection3: route?.params?.selection3 + 1,
      }
      navigation.navigate('SelectionThreeQuestionHairColorScreen', data)
      // try {
      //   setModal(true)
      //   setUploading(true)
      //   const imageUrl = await uploadImage();
      //   const imageUrl2 = await uploadImage2();
      //   const imageUrl3 = await uploadImage3();
      //   const imageUrl4 = await uploadImage4();
      //   const imageUrl5 = await uploadImage5();
      //   // const imageUrl6 = await uploadImage();
      //   var Data = new Object();
      //   Data.email = email;
      //   Data.Category = 'User';
      //   Data.filterMaxAge = filterMaxAge;
      //   Data.filterMinAge = filterMinAge;
      //   Data.ConvertedReligion = ConvertedReligion;
      //   Data.ConvertedReligionDetail = ConvertedReligionDetail;
      //   Data.languages = languages;
      //   Data.PartnerMinHeightType = PartnerMinHeightType;
      //   Data.PartnerMaxHeightType = PartnerMaxHeightType;
      //   Data.HairColor = HairColor;
      //   Data.EyeColor = EyeColor;
      //   Data.Clingy = clingy;
      //   Data.Cuddling = Cuddling;
      //   Data.InLife = InLife;
      //   Data.InBed = InBed;
      //   Data.MovieType = MovieType;
      //   Data.NextLongestRelationship = NextLongestRelationship;
      //   Data.LongestRelationship = LongestRelationship;
      //   Data.DealBreaker = DealBreaker;
      //   Data.DealMakers = DealMakers;
      //   Data.PartnerBuildType = PartnerBuildType;
      //   Data.BuildType = BuildType;
      //   Data.PartnerMaxHeight = PartnerMaxHeight;
      //   Data.PartnerMinHeight = PartnerMinHeight;
      //   Data.Hieght = Height;
      //   Data.Education = Education;
      //   Data.RelationshipType = RelationshipType;
      //   Data.Relagion = Relagion;
      //   Data.KosherType = KosherType ? KosherType : null;
      //   Data.foodtype = foodtype;
      //   Data.religionType = religionType;
      //   Data.ParentReligion = ParentReligion;
      //   Data.Diet = Diet;
      //   Data.FavFood = FavFood;
      //   Data.Exercise = Exercise;
      //   Data.ExerciseStatus = ExerciseStatus;
      //   Data.Name = name;
      //   Data.InstaUsername = InstaUsername;
      //   Data.Drink = Drink;
      //   Data.Drugs = Drugs;
      //   Data.Marijauna = Marijauna;
      //   Data.Vape = Vape;
      //   Data.Smoke = Smoke;
      //   Data.Lookingfor = Lookingfor;
      //   Data.Nature = IntroandExtro;
      //   Data.PartnerNature = PartnerNature;
      //   Data.PoliticalPartnerView = PoliticalPartnerView;
      //   Data.PoliticalView = PoliticalView;
      //   Data.Experince = Experince;
      //   Data.InTenYear = InTenYear;
      //   Data.Bio = Bio;
      //   Data.Kids = Kids;
      //   Data.PartnerGender = PartnerGender;
      //   Data.Gender = Gender;
      //   Data.Dates = DateOfBirth;
      //   Data.image5 = imageUrl5;
      //   Data.image4 = imageUrl4;
      //   Data.image3 = imageUrl3;
      //   Data.image2 = imageUrl2;
      //   Data.image1 = imageUrl;
      //   Data.CompanyType = CompanyType;
      //   Data.PositioninCompany = PositioninCompany;
      //   Data.CompanyName = CompanyName;
      //   Data.uid = CurrentUser
      //   Data.PhoneNumber = userPhoneNumber ? userPhoneNumber : null;
      //   Data.Location = {
      //     latitude: 24.9028039,
      //     longitude: 67.1145385,
      //   }
      //   // Data.filterGender = 'Female'
      //   // console.log('test data: ', Data);
      //   // return;
      //   // console.log(CurrentUser);
      //   firestore()
      //     .collection('Users').doc(CurrentUser).set({
      //       userDetails: Data
      //     }).then(() => {
      //       // redux
      //       AddToRedux(Data)
      //       ToastAndroid.show('Welcome to Honey and Dates', ToastAndroid.SHORT)
      //       navigation.navigate('QuestionCongratulationScreen')
      //       setModal(false)
      //       setUploading(false)
      //     })
      //   // setImage(null)
      //   setUploading(false)
      // } catch (error) {
      //   console.log('error test', error);
      // }
      // navigation.navigate('QuestionInBedScreen', { MovieType: movieType, LongestRelationship: LongestRelationship, InFiveYear: InFiveYear, InTenYear: InTenYear, IntroandExtro: IntroandExtro, DealBreaker: DealBreaker, DealMakers: DealMakers, InstaUsername: InstaUsername, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
    }
    else {
      ToastAndroid.show("Please select movie type!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionInBedScreen', { MovieType: null, LongestRelationship: LongestRelationship, InFiveYear: InFiveYear, InTenYear: InTenYear, IntroandExtro: IntroandExtro, DealBreaker: DealBreaker, DealMakers: DealMakers, InstaUsername: InstaUsername, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })

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
              flex: 1,
            }}>
              {/* <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} /> */}
            </View>
          </View>
          <ProgressBar progress={'75'} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              alignItems: 'center',
              paddingHorizontal: 60,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center'
              }}>What type of movies do you
                like to watch too?
              </Text>
              <Text style={{
                fontSize: 12,
                color: COLORS.gray,
              }}>(Select all that apply)</Text>
            </View>


            <View style={{ alignItems: 'center' }}>
              <ListEducation data={EducationData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
            </View>



            <View style={{
              alignItems: 'center',
              paddingBottom: 5,
              paddingTop: 40
              // height: '20%'
            }}>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onInBedScreen()}
                  title={'Continue'} width={width / 1.1} />
              </View>

              {/* <View style={{ marginHorizontal: 0 }}>
                <CustomeButton onpress={() => onSkip()}
                  title={'Skip'} bcolor={COLORS.light} />
              </View> */}

              <View style={{
                paddingTop: 5,
                width: 310,
              }}>
                <Text style={{ textAlign: 'center', fontSize: 10,color:COLORS.gray }}>
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


export default SelectionThreeQuestionMovieTypeScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
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