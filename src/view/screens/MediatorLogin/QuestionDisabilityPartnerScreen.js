import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';


export const detailReligion = [
  {
    id: '1',
    name: 'Blind',
  }, {
    id: '2',
    name: 'Deaf',
  },
  {
    id: '3',
    name: 'Wheel Chair',
  },
  {
    id: '4',
    name: 'Can be other',
  }
]

const DisabilityData = [
  {
    id: '1',
    name: 'No',
  },
]


const MediatorQuestionDisabilityPartnerScreen = ({ navigation, route }) => {
  const { Disability, DescribePartner, DescribeYou, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedDisabilityIndex, setDisabilityIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);
  const [Disable, setDisable] = useState();


  const onQuestionHeightScreen = () => {
    console.log(Disable);
    if (Disable) {
      navigation.navigate('MediatorQuestionHeightScreen', { PartnerDisability: Disable, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Disability!", ToastAndroid.SHORT);
    }
  }

  const toggleDropdown = () => {
    setShowtick(!showtick)
    setShowOptions(!showOptions);
  };

  const yesAbility = (index) => {
    setSelectedCategoryIndex(index)
    setDisable(detailReligion[index].name)
  }

  const toggleDropdown2 = (index) => {
    setDisabilityIndex(index)
    setDisable(DisabilityData[selectedDisabilityIndex].name)
    setShowtick2(!showtick2)
  };


  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View style={{ height: 100 }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {detailReligion.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => yesAbility(index)}
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
            paddingTop: 30,
            alignItems: 'center'
          }}>
            <Image source={require('../../../assets/disablility.png')} resizeMode='contain' style={{
              width: 250,
              height: 180,
            }} />
          </View>
          <View style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Are you open to dating with
              someone with disabilities?
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

          <TouchableOpacity onPress={toggleDropdown}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Yes</Text>
              </View>
            </View>
          </TouchableOpacity>

          {renderDropdown()}

          {DisabilityData.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => toggleDropdown2(index)}>
              <View style={styles.NumberInput}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>{item.name}</Text>
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  {showtick2 && (
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


        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          height: '15%'
        }}>
          <CustomeButton onpress={() => onQuestionHeightScreen()}
            title={'Continue'} />

          <View style={{
            paddingTop: 5,
            width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  )
}


export default MediatorQuestionDisabilityPartnerScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '85%',
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