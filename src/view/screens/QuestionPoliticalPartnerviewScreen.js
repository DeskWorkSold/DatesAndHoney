import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';


const PoliticalData = [
  {
    id: '1',
    name: 'Any',
  },
  {
    id: '2',
    name: 'Conservative',
  },
  {
    id: '3',
    name: 'Liberal',
  },
  {
    id: '4',
    name: 'Libertarians',
  },
  {
    id: '5',
    name: 'Non Political',
  },
  {
    id: '6',
    name: 'Middle of the Road',
  },
]

const QuestionPoliticalPartnerviewScreen = ({ navigation, route }) => {
  const { email, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear } = route.params;
  const [politicalpartner, setpoliticalpartner] = useState();
  // console.log(PoliticalView);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);


  const onIntroandExtro = () => {
    console.log(PoliticalData[selectedCategoryIndex].name);
    const selectedPolitics = PoliticalData[selectedCategoryIndex].name;
    if (selectedPolitics) {
      navigation.navigate('QuestionIntroandExtroScreen', { PoliticalPartnerView: selectedPolitics, email: email, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select Partner Political view!", ToastAndroid.SHORT);
    }
  }
  const onSkip = () => {
    navigation.navigate('QuestionIntroandExtroScreen', { PoliticalPartnerView: null, email: email, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }


  const ListPolitics = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {PoliticalData.map((political, index) => (
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
                  {political.name}
                </Text>
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
            paddingTop: 20,
            flexDirection: 'row',
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

          <ScrollView showsVerticalScrollIndicator={true}>

            <View style={styles.footer}>
              <View style={{
                paddingTop: 0,
              }}>
                <Image source={require('../../assets/vote.png')}
                  resizeMode='contain' style={{
                    width: 180,
                    height: 180
                  }} />
              </View>


              <View style={{
                alignItems: 'center',
                paddingVertical: 20,
                paddingHorizontal: 50,
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.black,
                  textAlign: 'center',
                }}>Which Political views are you okay with dating?</Text>
                <Text style={{
                  color: COLORS.black,
                  textAlign: 'center',
                }}>(Select all that apply)</Text>
              </View>

              {/* <View style={{
            alignItems: 'center',
            paddingHorizontal: 50,
          }}>
            
          </View> */}

              <View style={{
                alignItems: 'center'
              }}>
                <ListPolitics data={PoliticalData} value={selectedCategoryIndex}
                  setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
              </View>

              <View style={{
                alignItems: 'center',
                paddingBottom: 50
              }}>

                <View style={{
                  paddingTop: 60,
                }}>
                  <View style={{ marginBottom: 5 }}>
                    <CustomeButton onpress={() => onIntroandExtro()}
                      title={'Continue'} />
                  </View>
                  <View style={{ marginHorizontal: 0 }}>
                    <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
                      title={'Skip'} />
                  </View>
                </View>

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
          </ScrollView>

        </View>


      </View>



    </SafeAreaView>
  )
}

export default QuestionPoliticalPartnerviewScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '40%',
    // alignItems: 'center',
  },
  footer: {
    // height: '60%',
    marginBottom: 80,
    alignItems: 'center',
    paddingTop: 20,
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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