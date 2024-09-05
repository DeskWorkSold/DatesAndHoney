import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';

const dietData = [
  {
    id: '1',
    name: 'Vegitarian',
  },
  {
    id: '2',
    name: 'Pescatarian',
  },
  {
    id: '3',
    name: 'Very healthy',
  },
  {
    id: '4',
    name: 'Semi healthy',
  },
  {
    id: '5',
    name: 'Non-GMO Only',
  },
  {
    id: '6',
    name: 'Organic only',
  },
  {
    id: '7',
    name: 'I love to eat Everything',
  },
  {
    id: '8',
    name: 'Other',
  }
]



const MediatorQuestionDietScreen = ({ navigation, route }) => {
  const { ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, PartnerNature, Nature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  // console.log(ParentReligion , religionType , foodtype);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);


  const onPartnerDietScreen = () => {
    const Diet = dietData[selectedCategoryIndex].name
    console.log(Diet);
    if (Diet) {
      navigation.navigate('MediatorQuestionPartnerDietScreen', { Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Religion!", ToastAndroid.SHORT);
    }
  }

  const ListEducation = ({ data, value, setValue, cancle }) => {
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
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            paddingTop: 20,
          }}>
            <Image source={require('../../../assets/diet.png')} resizeMode='contain' style={{
              width: 220,
              height: 200,
            }} />
          </View>


          <View style={{
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Diet</Text>
          </View>
          <View style={{
            alignItems: 'center',
            paddingBottom: 10,
          }}>
            <Text style={{
              color: COLORS.black
            }}>(click all that apply)</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            <View>
              <ListEducation data={dietData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
            </View>


            <View style={{
              alignItems: 'center',
              paddingBottom: 5
            }}>
              <View style={{
                paddingTop: 50,
              }}>
                <CustomeButton onpress={() => onPartnerDietScreen()}
                  title={'Continue'} />
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
          </ScrollView>
        </View>
      </View>



    </SafeAreaView>
  )
}


export default MediatorQuestionDietScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
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
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})