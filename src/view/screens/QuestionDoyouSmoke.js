import { Image, SafeAreaView, StatusBar, StyleSheet, ScrollView, Text, View, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';
import Slider from '@react-native-community/slider';
import { TextInput } from 'react-native-paper';
import SVGImg from '../../assets/tik.svg';


const smokeData = [
  {
    id: 0,
    name: 'Never'
  },
  {
    id: 1,
    name: 'Sometimes'
  }
  ,
  {
    id: 2,
    name: 'Socially'
  },
  {
    id: 3,
    name: 'Regularly'
  },
  {
    id: 4,
    name: 'Heavily'
  },
  {
    id: 5,
    name: 'Prefer not say'
  },
  {
    id: 6,
    name: 'Trying to quit'
  }
]



const QuestionDoyouSmoke = ({ navigation, route }) => {
  // const { PartnerDisability, Disability, DescribePartner, DescribeYou, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [height, setHeight] = useState();

  const [smoke, setSmoke] = useState(null);
  const [showSmoke, setShowsmoke] = useState(false);
  const [vape, setVape] = useState(null);
  const [showVape, setshowVape] = useState(false);
  const [marijauna, setMarijuana] = useState(null);
  const [showMarijauna, setshowMarijauna] = useState(false);
  const [drinks, setDrinks] = useState(null);
  const [showDrinks, setshowDrinks] = useState(false);
  const [drugs, setDrugs] = useState(null);
  const [showDrugs, setshowDrugs] = useState(false);





  const onPartnerAge = async () => {

    if (smoke && vape && marijauna && drinks && drugs) {
      console.log(smoke, vape, marijauna, drinks, drugs);
      navigation.navigate('QuestionConvertedReligion')
      // navigation.navigate('QuestionConvertedReligion', { filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      if (!smoke) {
        ToastAndroid.show("Please select smoke type!", ToastAndroid.SHORT);
      }
      else if (!vape) {
        ToastAndroid.show("Please select vape type!", ToastAndroid.SHORT);
      }
      else if (!marijauna) {
        ToastAndroid.show("Please select marijauna type!", ToastAndroid.SHORT);
      }
      else if (!drinks) {
        ToastAndroid.show("Please select drinks type!", ToastAndroid.SHORT);
      }
      else if (!drugs) {
        ToastAndroid.show("Please select drugs type!", ToastAndroid.SHORT);
      }
    }
  }

  const onSkip = async () => {
    console.log('test');
  }

  const onQuestionHeightPartnerScreen = () => {
    if (height) {
      // console.log(height);
      navigation.navigate('QuestionHeightPartnerScreen', { Height: height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Height!", ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>

            <View style={{
              paddingTop: 20,
              paddingHorizontal: 20
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>Do you Smoke?
              </Text>
            </View>

            <View style={{
              paddingTop: 20,
              alignItems: 'center',
            }}>
              <View style={{
                height: 50,
                width: '90%',
                backgroundColor: COLORS.light,
                borderRadius: 10,
                alignSelf: 'center',
                // paddingRight: 10,
                // marginLeft: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <TextInput
                  value={smoke ? smoke.name : smoke}
                  onChangeText={smoke => setSmoke(smoke)}
                  onPressIn={() => setShowsmoke(!showSmoke)}
                  style={{
                    width: '80%',
                    backgroundColor: COLORS.transparent,
                  }}
                  placeholder={'Select'}
                  placeholderTextColor={COLORS.gray}
                  selectionColor={COLORS.black}
                  underlineColor={COLORS.white}
                  activeUnderlineColor={COLORS.white}
                />
                <TouchableOpacity onPress={() => setShowsmoke(!showSmoke)} style={{
                  width: '10%',
                }}>
                  <Image source={require('../../assets/dropdown.png')} resizeMode="contain" style={{
                    color: COLORS.black
                  }} />
                </TouchableOpacity>
              </View>
              {showSmoke == true &&
                <View
                  style={{
                    elevation: 2,
                    backgroundColor: COLORS.white,
                    // height: 45,
                    justifyContent: 'center',
                    width: '90%',
                    borderRadius: 10,
                  }}>
                  {smokeData.map((item, index) => (
                    <View key={index} style={styles.dropdown}>
                      <TouchableOpacity
                        onPress={() => [setSmoke(item), setShowsmoke(false)]}
                        style={{
                          paddingHorizontal: 20,
                          flexDirection: 'row',
                        }}>
                        <View style={{ width: '90%' }}>
                          <Text style={{ color: COLORS.black }}>{item.name}</Text>
                        </View>
                        <View style={{
                          alignItems: 'flex-end'
                        }}>
                          {smoke?.id == index ? (
                            <SVGImg width={15} height={15} />
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              }
            </View>


            <View style={{
              paddingTop: 20,
              paddingHorizontal: 20
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>Do you use Vape?
              </Text>
            </View>

            <View style={{
              paddingTop: 20,
              alignItems: 'center',
            }}>
              <View style={{
                height: 50,
                width: '90%',
                backgroundColor: COLORS.light,
                borderRadius: 10,
                alignSelf: 'center',
                // paddingRight: 10,
                // marginLeft: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <TextInput
                  value={vape ? vape.name : vape}
                  onChangeText={vape => setVape(vape)}
                  onPressIn={() => setshowVape(!showVape)}
                  style={{
                    width: '80%',
                    backgroundColor: COLORS.transparent,
                  }}
                  placeholder={'Select'}
                  placeholderTextColor={COLORS.gray}
                  selectionColor={COLORS.black}
                  underlineColor={COLORS.white}
                  activeUnderlineColor={COLORS.white}
                />
                <TouchableOpacity onPress={() => setshowVape(!showVape)} style={{
                  width: '10%',
                }}>
                  <Image source={require('../../assets/dropdown.png')} resizeMode="contain" style={{
                    color: COLORS.black
                  }} />
                </TouchableOpacity>
              </View>
              {showVape == true &&
                <View
                  style={{
                    elevation: 2,
                    backgroundColor: COLORS.white,
                    // height: 45,
                    justifyContent: 'center',
                    width: '90%',
                    borderRadius: 10,
                  }}>
                  {smokeData.map((item, index) => (
                    <View key={index} style={styles.dropdown}>
                      <TouchableOpacity
                        onPress={() => [setVape(item), setshowVape(false)]}
                        style={{
                          paddingHorizontal: 20,
                          flexDirection: 'row',
                        }}>
                        <View style={{ width: '90%' }}>
                          <Text style={{ color: COLORS.black }}>{item.name}</Text>
                        </View>
                        <View style={{
                          alignItems: 'flex-end'
                        }}>
                          {vape?.id == index ? (
                            <SVGImg width={15} height={15} />
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              }
            </View>


            <View style={{
              paddingTop: 20,
              paddingHorizontal: 20
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>Do you use Marijauna?
              </Text>
            </View>

            <View style={{
              paddingTop: 20,
              alignItems: 'center',
            }}>
              <View style={{
                height: 50,
                width: '90%',
                backgroundColor: COLORS.light,
                borderRadius: 10,
                alignSelf: 'center',
                // paddingRight: 10,
                // marginLeft: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <TextInput
                  value={marijauna ? marijauna.name : marijauna}
                  onChangeText={marijauna => setMarijuana(marijauna)}
                  onPressIn={() => setshowMarijauna(!showMarijauna)}
                  style={{
                    width: '80%',
                    backgroundColor: COLORS.transparent,
                  }}
                  placeholder={'Select'}
                  placeholderTextColor={COLORS.gray}
                  selectionColor={COLORS.black}
                  underlineColor={COLORS.white}
                  activeUnderlineColor={COLORS.white}
                />
                <TouchableOpacity onPress={() => setshowMarijauna(!showMarijauna)} style={{
                  width: '10%',
                }}>
                  <Image source={require('../../assets/dropdown.png')} resizeMode="contain" style={{
                    color: COLORS.black
                  }} />
                </TouchableOpacity>
              </View>
              {showMarijauna == true &&
                <View
                  style={{
                    elevation: 2,
                    backgroundColor: COLORS.white,
                    // height: 45,
                    justifyContent: 'center',
                    width: '90%',
                    borderRadius: 10,
                  }}>
                  {smokeData.map((item, index) => (
                    <View key={index} style={styles.dropdown}>
                      <TouchableOpacity
                        onPress={() => [setMarijuana(item), setshowMarijauna(false)]}
                        style={{
                          paddingHorizontal: 20,
                          flexDirection: 'row',
                        }}>
                        <View style={{ width: '90%' }}>
                          <Text style={{ color: COLORS.black }}>{item.name}</Text>
                        </View>
                        <View style={{
                          alignItems: 'flex-end'
                        }}>
                          {marijauna?.id == index ? (
                            <SVGImg width={15} height={15} />
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              }
            </View>


            <View style={{
              paddingTop: 20,
              paddingHorizontal: 20
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>Do you Drugs?
              </Text>
            </View>

            <View style={{
              paddingTop: 20,
              alignItems: 'center',
            }}>
              <View style={{
                height: 50,
                width: '90%',
                backgroundColor: COLORS.light,
                borderRadius: 10,
                alignSelf: 'center',
                // paddingRight: 10,
                // marginLeft: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <TextInput
                  value={drugs ? drugs.name : drugs}
                  onChangeText={drugs => setDrugs(drugs)}
                  onPressIn={() => setshowDrugs(!showDrugs)}
                  style={{
                    width: '80%',
                    backgroundColor: COLORS.transparent,
                  }}
                  placeholder={'Select'}
                  placeholderTextColor={COLORS.gray}
                  selectionColor={COLORS.black}
                  underlineColor={COLORS.white}
                  activeUnderlineColor={COLORS.white}
                />
                <TouchableOpacity onPress={() => setshowDrugs(!showDrugs)} style={{
                  width: '10%',
                }}>
                  <Image source={require('../../assets/dropdown.png')} resizeMode="contain" style={{
                    color: COLORS.black
                  }} />
                </TouchableOpacity>
              </View>
              {showDrugs == true &&
                <View
                  style={{
                    elevation: 2,
                    backgroundColor: COLORS.white,
                    // height: 45,
                    justifyContent: 'center',
                    width: '90%',
                    borderRadius: 10,
                  }}>
                  {smokeData.map((item, index) => (
                    <View key={index} style={styles.dropdown}>
                      <TouchableOpacity
                        onPress={() => [setDrugs(item), setshowDrugs(!showDrugs)]}
                        style={{
                          paddingHorizontal: 20,
                          flexDirection: 'row',
                        }}>
                        <View style={{ width: '90%' }}>
                          <Text style={{ color: COLORS.black }}>{item.name}</Text>
                        </View>
                        <View style={{
                          alignItems: 'flex-end'
                        }}>
                          {drugs?.id == index ? (
                            <SVGImg width={15} height={15} />
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              }
            </View>





            <View style={{
              paddingTop: 20,
              paddingHorizontal: 20
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>Do you Drink?
              </Text>
            </View>
            <View style={{
              paddingTop: 20,
              alignItems: 'center',
            }}>
              <View style={{
                height: 50,
                width: '90%',
                backgroundColor: COLORS.light,
                borderRadius: 10,
                alignSelf: 'center',
                // paddingRight: 10,
                // marginLeft: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <TextInput
                  value={drinks ? drinks.name : drinks}
                  onChangeText={drinks => setDrinks(drinks)}
                  onPressIn={() => setshowDrinks(!showDrinks)}
                  style={{
                    width: '80%',
                    backgroundColor: COLORS.transparent,
                  }}
                  placeholder={'Select'}
                  placeholderTextColor={COLORS.gray}
                  selectionColor={COLORS.black}
                  underlineColor={COLORS.white}
                  activeUnderlineColor={COLORS.white}
                />
                <TouchableOpacity onPress={() => setshowDrinks(!showDrinks)} style={{
                  width: '10%',
                }}>
                  <Image source={require('../../assets/dropdown.png')} resizeMode="contain" style={{
                    color: COLORS.black
                  }} />
                </TouchableOpacity>
              </View>
              {showDrinks == true &&
                <View
                  style={{
                    elevation: 2,
                    backgroundColor: COLORS.white,
                    // height: 45,
                    justifyContent: 'center',
                    width: '90%',
                    borderRadius: 10,
                  }}>
                  {smokeData.map((item, index) => (
                    <View key={index} style={styles.dropdown}>
                      <TouchableOpacity
                        onPress={() => [setDrinks(item), setshowDrinks(false)]}
                        style={{
                          paddingHorizontal: 20,
                          flexDirection: 'row',
                        }}>
                        <View style={{ width: '90%' }}>
                          <Text style={{ color: COLORS.black }}>{item.name}</Text>
                        </View>
                        <View style={{
                          alignItems: 'flex-end'
                        }}>
                          {drinks?.id == index ? (
                            <SVGImg width={15} height={15} />
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              }
            </View>


          </View>


          {/* <View style={styles.footer}> */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 40
          }}>
            <View style={{
              marginHorizontal: 5
            }}>
              <CustomeButton width={170} onpress={() => onPartnerAge()}
                title={'Continue'} />
            </View>
            <CustomeButton width={170} bcolor={COLORS.light} onpress={() => onSkip()}
              title={'Skip'} />
          </View>

        </ScrollView>

      </View>


    </SafeAreaView>
  )
}

export default QuestionDoyouSmoke

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
    height: '100%',
  },
  contentContainer: {
    paddingTop: 20
    // height: '80%',
    // alignItems: 'center',
  },
  footer: {
    // height: '25%',
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
  dropdown: {
    // paddingHorizontal: 20,
    // elevation: 9,
    // backgroundColor: COLORS.white,
    height: 45,
    justifyContent: 'center',
    width: '100%',
  }
})