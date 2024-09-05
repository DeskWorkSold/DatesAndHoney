import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';


export const detailReligion = [
  {
    id: '1',
    name: 'NoPreferance',
  }, {
    id: '2',
    name: 'South Korean',
  },
]

const DescribeyouData = [
  {
    id: '1',
    name: 'Loyal',
  },
  {
    id: '2',
    name: 'Charismatic',
  },
  {
    id: '3',
    name: 'Kind',
  },
  {
    id: '4',
    name: 'Talkative',
  },
  {
    id: '5',
    name: 'Shay',
  },
  {
    id: '6',
    name: 'Honest',
  },
  {
    id: '7',
    name: 'Funny',
  },
  {
    id: '8',
    name: 'Ambitious',
  },
  {
    id: '9',
    name: 'Family oriented',
  },
]




const QuestionDescribeYouScreen = ({ navigation, route }) => {
  const { email, languages, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState('');


  const onDescribePartnerScreen = () => {
    const DescribeYou = DescribeyouData[selectedCategoryIndex].name
    console.log(DescribeYou);
    if (DescribeYou) {
      navigation.navigate('QuestionDescribePartnerScreen', { DescribeYou: DescribeYou, email: email, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Ethnicity!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionDescribePartnerScreen', { DescribeYou: null, email: email, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })

  }


  const toggleDropdown = (data) => {
    console.log(data.name);
    setShowOptions(!showOptions);
  };

  const ShowSelection = (data) => {
    console.log(data);
    // if (data == '') {
    //   setShowtick(true);
    // }
    setShowtick(data);
    // setShowtick(!data);
  };

  // const renderDropdown = () => {
  //   if (showOptions) {
  //     return (
  //       <View style={{ height: 100, }}>
  //         <ScrollView showsVerticalScrollIndicator={false}>

  //           {detailReligion.map((item, index) => (
  //             <TouchableOpacity
  //               key={index}
  //               activeOpacity={0.8}
  //               onPress={() => setSelectedCategoryIndex(index)}
  //             >
  //               <View style={styles.MoreaboutReligion}>

  //                 <View style={{ width: '90%' }}>
  //                   <Text style={{ color: COLORS.black }}>{item.name}</Text>
  //                 </View>
  //                 <View style={{
  //                   alignItems: 'flex-end'
  //                 }}>
  //                   {selectedCategoryIndex == index ? (
  //                     <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
  //                       width: 20,
  //                       height: 20
  //                     }} />
  //                   ) : (<View></View>
  //                   )}
  //                 </View>
  //               </View>
  //             </TouchableOpacity>
  //           ))}
  //         </ScrollView>
  //       </View>
  //     );
  //   }
  // };

  const ListDiscribe = ({ data, value, setValue, cancle }) => {
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

<ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            paddingTop: 0,
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/describe2.png')} resizeMode='contain' style={{
              width: 250,
              height: 180,
            }} />
          </View>



          <View style={{
            alignItems: 'center',
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>What best describe you

            </Text>
          </View>
          <View style={{
            alignItems: 'center',
            paddingHorizontal: 70,
          }}>
            <Text style={{
              color: COLORS.black,
              textAlign: 'center'
            }}>
              (pick Max 3)
            </Text>
          </View>


        <View style={styles.footer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              alignItems: 'center'
            }}>
              <ListDiscribe data={DescribeyouData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>


            {/* <TouchableOpacity onPress={() => setShowtick9(!showtick9)}>
              <View style={styles.NumberInput}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: COLORS.black }}>
                    Family oriented
                  </Text>
                </View>
                {showtick9 && (
                  <View style={{ width: '10%', justifyContent: 'center' }}>
                    <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                  </View>
                )}
              </View>
            </TouchableOpacity> */}



            <View style={{
              paddingTop: 40,
              alignItems: 'center',
              paddingBottom: 5,
            }}>
              <View style={{
                marginBottom: 5
              }}>
                <CustomeButton onpress={() => onDescribePartnerScreen()}
                  title={'Continue'} />
              </View>
              <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
                title={'Skip'} />

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
        </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}


export default QuestionDescribeYouScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '36%',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  footer: {
    height: '100%',
    // alignItems: 'center',
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
    backgroundColor: COLORS.transparent,
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