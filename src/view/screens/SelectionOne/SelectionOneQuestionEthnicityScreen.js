import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import SVGImg from '../../../assets/tik.svg';
import SVGImg1 from '../../../assets/arrowleft.svg';
import Loader from '../../components/Loader';
import ProgressBar from '../../components/ProgressBar';
import { EthnicityData } from '../QuestionEthnicityScreen';
const { width, height } = Dimensions.get('window')

export const detailReligion = [
  {
    id: '1',
    name: 'North Korean',
  }, {
    id: '2',
    name: 'South Korean',
  },
]




const SelectionOneQuestionEthnicityScreen = ({ navigation, route }) => {

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);


  const onEthnicityPartnerScreen = () => {
    if (selectedCategoryIndex !== null) {
      const EthnicitySelected = EthnicityData[selectedCategoryIndex].name
      // console.log(EthnicitySelected);
      const update = {
        ...route?.params,
        Ethnicity: EthnicitySelected,
        selection1: route?.params?.selection1 + 1,
      }
      navigation.navigate('SelectionTwoQuestionRelationshipScreen', update)
    }
    else {
      ToastAndroid.show("Please select your Ethnicity!", ToastAndroid.SHORT);
    }
  }

  // const onSkip = () => {
  //   navigation.navigate('QuestionEthnicityPartnerScreen', { Ethnicity: null, PartnerBuildType: selectedCategoryIndex, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
  // }


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

      </View>
    )
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
            paddingHorizontal: 20,
            height: 60,
            alignItems: 'center',
            flexDirection: 'row',
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

          <ProgressBar progress={'60'} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{
            paddingTop: 0,
            alignItems: 'center',
            marginBottom: 10,
          }}>
            <Image source={require('../../../assets/ethnicity.png')} resizeMode='contain' style={{
              height: height / 7,
            }} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Ethnicity
            </Text>
          </View>
          <View style={{
            alignItems: 'center'
          }}>
            <ListEthnicity data={EthnicityData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
          </View>

          <View style={{
            marginVertical:40,
            alignItems: 'center',
          }}>
            <View style={{
            }}>
              <CustomeButton onpress={() => onEthnicityPartnerScreen()}
                title={'Continue'} width={width / 1.1} />
            </View>
            {/* <CustomeButton onpress={() => onSkip()}
                    title={'Skip'} bcolor={COLORS.light} /> */}

            <View style={{
              paddingTop: 5,
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10,color:COLORS.gray }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View >
    </SafeAreaView >
  )
}


export default SelectionOneQuestionEthnicityScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '36%',
    // alignItems: 'center',
    // backgroundColor:'red'
  },
  footer: {
    // height: '100%',
    // alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: height / 18,
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