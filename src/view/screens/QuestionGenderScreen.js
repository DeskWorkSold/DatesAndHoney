import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';
const { width, height } = Dimensions.get("window");



export const GenderData = [
  {
    id: '1',
    name: 'Male',
  },
  {
    id: '2',
    name: 'Female',
  },
  {
    id: '3',
    name: 'Non binary',
  },
  {
    id: '4',
    name: 'Trans Male to Female',
  },
  {
    id: '5',
    name: 'Trans Female to Male',
  },
]

export const GenderMore = [
  {
    id: '1',
    name: 'Straight',
  },
  {
    id: '2',
    name: 'Bisexual',
  },
  {
    id: '3',
    name: 'Gay',
  },
]

const QuestionGenderScreen = ({ navigation, route }) => {
  const { name, DateOfBirth, secName } = route.params;
  const [gender, setGender] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedDetailCategoryIndex, setSelectedDetailCategoryIndex] = useState(null);
  const [checked, setChecked] = React.useState('Apple'); //initial choice
  const [moreGender, setMoreGender] = React.useState(false); //initial choice

  // console.log(DateOfBirth);

  const onQuestionYourInterestScreen = () => {
    if (selectedCategoryIndex !== null) {
      // console.log(GenderData[selectedCategoryIndex].name);
      if (selectedCategoryIndex < 2 && selectedDetailCategoryIndex === null) {
        ToastAndroid.show("Please select your sub gender!", ToastAndroid.SHORT);
        return;
      }

      const selectedGender = GenderData[selectedCategoryIndex].name;
      const selectedPartnerGender = selectedCategoryIndex < 2 ? GenderMore[selectedDetailCategoryIndex].name : null;
      // console.log(selectedGender, selectedPartnerGender);
      // return
      navigation.navigate('LoginWithEmail', { GenderDetial: selectedPartnerGender, Gender: selectedGender, DateOfBirth: DateOfBirth, name: name, secName: secName })
    }
    else {
      ToastAndroid.show("Please select your gender!", ToastAndroid.SHORT)
    }
  }
  const SkipScreen = () => {
    console.log(GenderData[selectedCategoryIndex].name);
    const selectedGender = GenderData[selectedCategoryIndex].name;
    navigation.navigate('LoginWithEmail', { Gender: null, DateOfBirth: DateOfBirth, name: name, secName: secName, })
  }

  const onSelectGender = (j, i) => {
    setSelectedDetailCategoryIndex(i)
    // set
    setMoreGender(null)
  }

  const ListGender = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((gender, index) => (
          <View key={index}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => { setValue(index), setMoreGender(index) }}>
              <View style={{
                backgroundColor: value == index ? COLORS.main : COLORS.transparent,
                ...styles.NumberInput
              }}>
                <View style={{ width: '90%' }}>
                  {gender?.id == '4' ?
                    <Text style={{ color: COLORS.black, fontSize: 13, }}>Trans-Female</Text>
                    :
                    gender?.id == '5' ?
                      <Text style={{ color: COLORS.black, fontSize: 13, }}>Trans-Male</Text>
                      :
                      <Text style={{ color: COLORS.black }}>
                        {gender.name}
                      </Text>}
                </View>
                <View style={{
                  alignItems: 'flex-end',
                }}>
                  {value == index ? (
                    <SVGImg width={20} height={20} />
                  ) : (<View></View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            {moreGender == index && index < 2 && GenderData[selectedCategoryIndex]?.name == gender?.name &&
              <View style={{
                backgroundColor: COLORS.white,
                marginHorizontal: 20,
                // elevation:4,
                borderWidth: 1,
                borderColor: COLORS.light,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingHorizontal: 20
              }}>
                {GenderMore.map((j, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <TouchableOpacity
                      onPress={() => onSelectGender(j, i)}
                      style={{
                        height: 40,
                        justifyContent: 'center',
                        width: '90%'
                      }}>
                      <Text style={{ color: COLORS.gray, fontSize: 13, }}>{j?.name}</Text>
                    </TouchableOpacity>
                    <View style={{
                      alignItems: 'flex-end',
                    }}>
                      {selectedDetailCategoryIndex == i ? (
                        <SVGImg width={20} height={20} />
                      ) : (null
                      )}
                    </View>
                  </View>
                ))}
              </View>
            }
          </View>

        ))}

      </View>
    )
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={{
          alignItems: 'center',
          // justifyContent:'center',
          // paddingTop: 20,
          flexDirection: 'row',
          height: 60,
          justifyContent: 'center',
          paddingHorizontal: 20,

        }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{
            flex: 1,
            // backgroundColor: COLORS.gray2
          }}>
            <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
          </TouchableOpacity>
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

        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              paddingTop: 0,
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/gender.png')} resizeMode='contain' style={{
                // width: 150,
                height: height / 8,
              }} />
            </View>


            <View style={{
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black
              }}>What do you identify as?</Text>
            </View>


            {/* <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Enter the full name</Text>
          </View> */}

            <View style={{
              // alignItems: 'center'
            }}>
              <ListGender data={GenderData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>

            <View style={styles.footer}>

              <View style={{
                paddingTop: 20,
                marginBottom: 10,
              }}>
                <CustomeButton onpress={() => onQuestionYourInterestScreen()}
                  title={'Continue'} />
              </View>
              {/* <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => SkipScreen()}
                  title={'Skip'} bcolor={COLORS.light} />
              </View> */}

              <View style={{
                paddingBottom: 20,
                // width: 310,
                alignItems: 'center',
              }}>
                <Text style={{ textAlign: 'center', fontSize: 10 }}>
                  By continue you agree our Terms and Privacy Policy.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

      </View>
      {/* </View> */}



    </SafeAreaView >
  )
}

export default QuestionGenderScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '100%',
    // alignItems: 'center',
  },
  footer: {
    // height: '20%',
    paddingTop: 100,
    paddingBottom: 50,
    alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
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