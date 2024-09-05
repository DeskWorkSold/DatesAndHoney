import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import { selectUser } from '../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import SVGImg1 from '../../../assets/arrowleft.svg';
const { height, width } = Dimensions.get('window')
import SVGImg from '../../../assets/tik.svg';
import ProgressBar from '../../components/ProgressBar';


export const convertdata = [
  {
    id: '1',
    name: 'No',
  },
  {
    id: '2',
    name: 'Yes',
  },
]



const SelectionOneQuestionConvertedReligion = ({ navigation, route }) => {
  // console.log(ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername);
  const [ServayCategory, setServayCategory] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);

  const [LisrtPros, setListPros] = useState(false);
  const [listCons, setListCons] = useState(false);
  const [acceptedProposal, setAcceptedProposal] = useState();
  const Currentuser = useSelector(selectUser);


  // console.log(route?.params?.foodtype);



  const onConvertedReligion = () => {
    if (!ServayCategory) {
      ToastAndroid.show("Please select converted religion!", ToastAndroid.SHORT);
    }
    else {
      if (ServayCategory == 'Yes') {
        if (!LisrtPros) {
          ToastAndroid.show("Please explain converted religion!", ToastAndroid.SHORT);
        }
        else {
          console.log('tesst2', ServayCategory, LisrtPros);
          const update = {
            ...route?.params,
            ConvertedReligionDetail: LisrtPros,
            ConvertedReligion: ServayCategory,
            selection1: route?.params?.selection1 + 1,
          }
          navigation.navigate('SelectionOneQuestionEthnicityScreen', update)
        }
      }
      else {
        console.log('tesst1', ServayCategory, LisrtPros);
        const update = {
          ...route?.params,
          ConvertedReligionDetail: LisrtPros,
          ConvertedReligion: ServayCategory,
          selection1: route?.params?.selection1 + 1,
        }
        navigation.navigate('SelectionOneQuestionEthnicityScreen', update)
        // navigation.navigate('QuestionDietScreen', { ConvertedReligionDetail: null, email: email, ConvertedReligion: ServayCategory, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
      }
    }
  }

  // const onSkip = () => {
  //   // navigation.navigate('QuestionDietScreen')
  //   navigation.navigate('QuestionDietScreen', { ConvertedReligionDetail: null, email: email, ConvertedReligion: null, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  // }



  const renderDropdown = () => {
    return (
      <View style={{
        paddingHorizontal: 20
      }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View>
            <View style={{
              paddingTop: 20,
              // flexDirection:'row'
              // alignItems: 'center',
            }}>
              <Text style={{
                color: COLORS.black
              }}>
                Please explain
              </Text>
              <Text style={{
                color: COLORS.black
              }}>
                (Your Mother, your mothers, etc.)
              </Text>
            </View>

            <View style={{
              paddingTop: 20,
            }}>
              <TextInput
                value={LisrtPros}
                onChangeText={LisrtPros => setListPros(LisrtPros)
                }
                placeholderTextColor={COLORS.gray}
                // onChangeText=()
                placeholder='Type Here!'
                multiline
                numberOfLines={8}
                style={styles.TextInput} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>

          <View style={{
            // paddingTop: 40,
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
            <View style={{ flex: 3, alignItems: 'center' }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center'
              }}>Any converted religion?</Text>
            </View>
            <View style={{ flex: 1, }} />
          </View>

          <ProgressBar progress={'45'} />


          <ScrollView showsVerticalScrollIndicator={false}>
            {convertdata?.map((TypeTestimonial, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => { setServayCategory(TypeTestimonial.name), setSelectedCategoryIndex(index) }}
                >
                  <View style={styles.NumberInput}>
                    <View style={{ width: '90%', }}>
                      <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>{TypeTestimonial.name}</Text>
                    </View>
                    <View style={{
                      alignItems: 'flex-end'
                    }}>
                      {selectedCategoryIndex == index && (
                        <SVGImg width={20} height={20} />

                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}


            {/* <TouchableOpacity onPress={() => { setServayCategory('Yes'), setShowOptions(!showOptions) }}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Yes</Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {ServayCategory == 'Yes' && (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                )}
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setServayCategory('No')}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>No</Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {ServayCategory == 'No' && (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                )}
              </View>
            </View>
          </TouchableOpacity> */}
            <View style={{
              marginHorizontal: 20
            }}>
              {ServayCategory == 'Yes' &&
                renderDropdown()
              }
            </View>

            <View style={{
              marginTop: '30%',
              // height: '30%',
              marginBottom: '20%',
              alignItems: 'center'
            }}>
              <View style={{
                marginBottom: 5
              }}>
                <CustomeButton onpress={() => onConvertedReligion()}
                  title={'Continue'} width={width / 1.1} />
              </View>
              {/* <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
                title={'Skip'} width={width/1.1} /> */}
              <Text style={{
                fontSize: 12,
                color: COLORS.gray
                // paddingTop: 10
              }}>
                By continue you agree our Terms and Privacy Policy
              </Text>
            </View>
          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  )
}


export default SelectionOneQuestionConvertedReligion

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignItems: 'center',
    marginBottom: 50,
    height: '100%',
    backgroundColor: COLORS.white
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
    height: height / 18,
    width: 340,
    alignSelf: 'center',
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.black,
    width: 320,
    borderRadius: 10,
    height: 200,
    textAlignVertical: 'top',
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