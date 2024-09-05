import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';


export const detailReligion = [
  {
    id: '1',
    name: 'North Korean',
  }, {
    id: '2',
    name: 'South Korean',
  },
]
const EthnicityData = [
  {
    id: '1',
    name: 'American or Indian Native',
  },
  {
    id: '2',
    name: 'Asian',
  },
  {
    id: '3',
    name: 'Korean',
  },
  {
    id: '4',
    name: 'Chinese',
  },
  {
    id: '5',
    name: 'Malaysian',
  },
  {
    id: '6',
    name: 'Flipino',
  },
  {
    id: '7',
    name: 'Japanese',
  },
  {
    id: '8',
    name: 'Vietnamese',
  },
  {
    id: '9',
    name: 'Native Hawaian',
  },
  {
    id: '10',
    name: 'African',
  },
  {
    id: '11',
    name: 'African American',
  },
  {
    id: '12',
    name: 'Other',
  },
]



const QuestionEthnicityPartnerScreen = ({ navigation, route }) => {
  const { Ethnicity, PartnerBuildType, BuildType, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);


  const onDescribeYouScreen = () => {
    const PartnerEthnicitySelected = EthnicityData[selectedCategoryIndex].name
    console.log(PartnerEthnicitySelected);
    if (PartnerEthnicitySelected) {
      navigation.navigate('QuestionLanguageScreen', { PartnerEthnicity: PartnerEthnicitySelected, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
    }
    else {
      ToastAndroid.show("Please select your Partner Ethnicity!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionLanguageScreen', { PartnerEthnicity: null, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
  }

  const toggleDropdown = (data) => {
    console.log(data.name);
    setShowOptions(!showOptions);
  };



  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View style={{ height: 100, }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {detailReligion.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setSelectedCategoryIndex(index)}
              >
                <View style={styles.MoreaboutReligion}>

                  <View style={{ width: '90%' }}>
                    <Text style={{ color: COLORS.black }}>{item.name}</Text>
                  </View>
                  <View style={{
                    alignItems: 'flex-end'
                  }}>
                    {selectedCategoryIndex == index ? (
                      <SVGImg width={20} height={20} />
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

  // const ListEthnicity = () => {
  //   return (
  //     <View>
  //       {Ethnicity.map((data, index) => (
  //         <View key={index}>
  //           <TouchableOpacity onPress={() => data.onpress(data)}>
  //             <View style={styles.NumberInput}>
  //               <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>{data.name}</Text>
  //             </View>
  //           </TouchableOpacity>

  //           {renderDropdown()}
  //         </View>
  //       ))}

  //     </View>
  //   )
  // }

  const ListEthnicity = ({ data, value, setValue, cancle }) => {
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
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
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
              <Image source={require('../../assets/ethnicity.png')} resizeMode='contain' style={{
                width: 220,
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
              }}>Which Ethnicity’s are
                you open to dating?
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
                (Select all that apply)
              </Text>
            </View>


            <View style={styles.footer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                  alignItems: 'center'
                }}>
                  <ListEthnicity data={EthnicityData} value={selectedCategoryIndex}
                    setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
                </View>
                {/* <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  No Preferance
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  American or Indian Native
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  Asian
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleDropdown}>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Korean</Text>
              </View>
            </TouchableOpacity>
            {renderDropdown()}

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  Chinese
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  Malaysian
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  Filipino
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  Japanese
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  Vietnamese
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  Native Hawaian
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  African
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  African American
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>
                  Other
                </Text>
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
                    <CustomeButton onpress={() => onDescribeYouScreen()}
                      title={'Continue'} />
                  </View>
                  <CustomeButton onpress={() => onSkip()}
                    title={'Skip'} bcolor={COLORS.light} />

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


export default QuestionEthnicityPartnerScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '40%',
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