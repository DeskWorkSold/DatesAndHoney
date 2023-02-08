import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const TypeTestimonial = [
  {
    id: '1',
    name: '#agriculture',
  },
  {
    id: '2',
    name: '#Social Media',
  },
  {
    id: '3',
    name: '#Business',
  },
  {
    id: '4',
    name: '#Personal Business',
  }
]

const PositionTestimonial = [
  {
    id: '1',
    name: '#CEO',
  },
  {
    id: '2',
    name: '#Worker',
  },
  {
    id: '3',
    name: '#Head of team',
  },
  {
    id: '4',
    name: '#Manager',
  }
]


const MediatorQuestionOccupationScreen = ({ navigation, route }) => {
  const { name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  console.log(InstaUsername);
  const [occupation, setoccupation] = useState();
  const [type, setType] = useState();
  const [position, setposition] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedPositionIndex, setSelectedPositionIndex] = useState(0);



  const onInterestScreen = () => {
    // QuestionInterestScreen
    const CompanyType = TypeTestimonial[selectedCategoryIndex].name;
    const PositioninCompany = PositionTestimonial[selectedPositionIndex].name;
    // console.log(CompanyType,PositioninCompany);
    if (occupation) {
      // const Occupation = occupation;
      navigation.navigate('MediatorQuestionInterestScreen', { CompanyName: occupation, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please enter company name!", ToastAndroid.SHORT);
    }
  }

  const SkipScreen = () => {
    navigation.navigate('MediatorQuestionInterestScreen', { CompanyName: null, PositioninCompany: null, CompanyType: null, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }


  const ListTestimonial = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              borderWidth: value == index ? 0 : 1,
              borderColor: value == index ? COLORS.main : COLORS.gray,
              ...styles.toggelbtn
            }}>
              <View style={{ width: '80%', alignItems: 'center' }}>
                <Text>{TypeTestimonial.name}</Text>
              </View>
              <View style={{ width: '20%', justifyContent: 'center' }}>
                {value == index ? (
                  <Image source={cancle} />
                ) : (
                  <Image source={require('../../../assets/add2.png')} resizeMode='contain' />
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


        <View style={{
          paddingTop: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image source={require('../../../assets/occupassion.png')} resizeMode='contain' style={{
            width: 200,
            height: 200
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
            textAlign: 'center',
          }}>Occupation</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          
          <View style={styles.Options}>
            <Text>(Optionals)</Text>
          </View>

          <View style={[styles.NumberInput, { marginTop: -0 }]}>
            <TextInput
              value={occupation}
              placeholder={'Company name or type'}
              // error={inputfirstName}
              onChangeText={occupation => setoccupation(occupation)
              }
              style={styles.TextInput}
            />
          </View>

          <View style={styles.NumberInput}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../../assets/search.png')} resizeMode='contain' style={{
                marginRight: 5
              }} />
              <TextInput
                value={type}
                placeholder={'Type of Company'}
                onChangeText={type => setType(type)
                }
                style={styles.TextInput}
              />
            </View>
            <View style={{
              alignItems: 'flex-end'
            }}>
              <Image source={require('../../../assets/add.png')} resizeMode='contain' style={{
                width: 20,
                height: 20
              }} />
            </View>
          </View>

          <View>
            <ListTestimonial data={TypeTestimonial} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
          </View>



          <View style={styles.NumberInput}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../../assets/search.png')} resizeMode='contain' style={{
                marginRight: 5
              }} />
              <TextInput
                value={position}
                placeholder={'Position in Company'}
                onChangeText={position => setposition(position)
                }
                style={styles.TextInput}
              />
            </View>
            <View style={{
              alignItems: 'flex-end'
            }}>
              <Image source={require('../../../assets/add.png')} resizeMode='contain' style={{
                width: 20,
                height: 20
              }} />
            </View>
          </View>

          <View>
            <ListTestimonial data={PositionTestimonial} value={selectedPositionIndex}
              setValue={setSelectedPositionIndex} cancle={require('../../../assets/cross.png')} />
          </View>


          <View style={{
            paddingTop: 50,
            paddingBottom: 10,
            flexDirection: 'row'
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={170} onpress={() => SkipScreen()}
                title={'Skip'} bcolor={COLORS.light} />
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={170} onpress={() => onInterestScreen()}
                title={'Continue'} />
            </View>

          </View>

        </ScrollView>
      </View>

    </SafeAreaView >
  )
}

export default MediatorQuestionOccupationScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: '100%',
  },
  contentContainer: {
    height: '40%',
    alignItems: 'center',
  },
  footer: {
    height: '60%',
    alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  Options: {
    marginTop: 0,
    justifyContent: 'center',
    width: 340,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    width: '88%'
  },
  toggelbtn: {
    flexDirection: 'row',
    height: 30,
    width: 180,
    marginVertical: 5,
    // backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  }
})