import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import { set } from 'react-native-reanimated';

const RelagionType = [
  {
    id: '1',
    name: 'Christian',
    onpress: 'QuestionMoreAboutChristianScreen'
  },
  {
    id: '2',
    name: 'Jewish',
    onpress: 'QuestionMoreAboutJewishScreen'
  },
  {
    id: '3',
    name: 'Catholic',
    onpress: 'QuestionMoreAboutCatholicScreen'
  },
  {
    id: '4',
    name: 'Muslim',
    onpress: 'QuestionMoreAboutMuslimScreen'
  },
  {
    id: '5',
    name: 'Hinduism',
  },

  {
    id: '5',
    name: 'Buddhism',
  },

  {
    id: '5',
    name: 'Chinese traditional religion',
  },
]

export const MoreAboutJewaish = [
  {
    id: '1',
    mom: 'Is your mom born Jewish',
  }, {
    id: '2',
    dad: 'Is your mom born Jewish',
  },
  {
    id: '3',
    Type1: 'Orthodox',
  }, {
    id: '4',
    Type2: 'Modren orthodox',
  },
  {
    id: '5',
    Type3: 'Conservative',
  }, {
    id: '6',
    Type4: 'Reformed',

  }, {
    id: '7',
    Type5: 'Just Jewish',
  }, {

    id: '8',
    Type6: 'Converted',
  }, {
    id: '9',
    Type7: 'Traditional',

  }, {
    id: '10',
    Type8: 'Secular',

  }
]



const QuestionReligionScreen = ({ navigation, route }) => {
  const { RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, PartnerNature, Nature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState('');
  const [showtick2, setShowtick2] = useState('');
  const [showtick3, setShowtick3] = useState('');
  const [showtick4, setShowtick4] = useState('');
  const [showtick5, setShowtick5] = useState('');
  const [showtick6, setShowtick6] = useState('');
  const [showtick7, setShowtick7] = useState('');
  const [Christian, setChristian] = useState('');
  const [Jewaish, setJewaish] = useState('');
  // console.log(Experince,Nature, PartnerNature);



  const onDietScreen = () => {
    const selectitem = RelagionType[selectedCategoryIndex].name;
    console.log(selectitem);
    if (selectitem) {
      navigation.navigate('QuestionDietScreen', { Relagion: selectitem, ParentReligion: null, religionType: null, foodtype: null, KosherType: null, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your religion!", ToastAndroid.SHORT);
    }
  }


  const ListReligions = ({ value, setValue }) => {
    return (
      <View>
        {RelagionType.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => MoreAboutReligion(TypeTestimonial, index)}
          // onPress={() => setValue(index)}
          >
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

  const MoreAboutReligion = (TypeTestimonial, index) => {
    setSelectedCategoryIndex(index)
    console.log(TypeTestimonial.onpress);
    if (TypeTestimonial.onpress) {
      navigation.navigate(TypeTestimonial.onpress, { Relagion: TypeTestimonial.name, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    // const selectitem = RelagionType[selectedCategoryIndex].name;
    // console.log(selectitem);
    // navigation.navigate(TypeTestimonial.onpress)
    // navigation.navigate('QuestionDietScreen')
    // console.log(selectedCategoryIndex);
    // if(selectedCategoryIndex == 1){
    //   {RelagionType.map(item , selectedCategoryIndex) => (
    //     navigation.navigate('QuestionMoreAboutReligionScreen', {
    //       name: restaurant.name,
    //       image: restaurant.image_url,
    //       price: restaurant.price,
    //       review: restaurant.review_count,
    //       rating: restaurant.rating,
    //       categories: restaurant.categories,
    //   )}
    // })
    // }else{
    //   console.log('select religion');
    // }
    // const selectedItem = selectedCategoryIndex;
    // {RelagionType.findIndex((item, selectedItem ) => {
    //   console.log('name : ', item.name);
    // })}
  }

  const OnChristian = () => {
    setChristian('Christian')
    setShowtick(!showtick)
    console.log(Christian);
  }
  const OnJewaish = () => {
    setJewaish('Jewaish')
    setShowtick2(!showtick2)
  }

  const toggleDropdown = () => {
    setShowOptions(!showOptions);
  };

  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View>
          <View style={{
            marginHorizontal: 20,
            paddingHorizontal: 20,
            justifyContent: 'center',
            height: 45,
            borderRadius: 5,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.light
          }}>
            <Text style={{ color: COLORS.black }}>Is your mom born Jewish</Text>
          </View>
          <View style={{
            marginHorizontal: 20,
            paddingHorizontal: 20,
            justifyContent: 'center',
            height: 45,
            width: 340,
            borderRadius: 5,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.light
          }}>
            <Text style={{ color: COLORS.black }}>Is your dad born Jewish</Text>
          </View>
          <View style={{
            marginHorizontal: 20,
            paddingHorizontal: 20,
            justifyContent: 'center',
            height: 45,
            width: 340,
            backgroundColor: COLORS.light,
            borderRadius: 5,
          }}>
            <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Type</Text>
          </View>
          <View style={{
            marginTop: 5,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            justifyContent: 'center',
            height: 45,
            width: 340,
            backgroundColor: COLORS.light,
            borderRadius: 5,
          }}>
            <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>How Kosher are you?</Text>
          </View>
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
            paddingTop: 40,
            alignItems: 'center',
            paddingHorizontal: 50,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>What is your religion?</Text>
          </View>

          <View>
            <ListReligions value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} />
          </View>

        </View>


        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          height: '15%'
        }}>
          <CustomeButton onpress={() => onDietScreen()}
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


export default QuestionReligionScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
    height: '85%'
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
})