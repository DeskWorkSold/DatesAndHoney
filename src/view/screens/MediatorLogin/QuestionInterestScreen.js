import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const TypeTestimonial = [
  {
    id: '1',
    name: '#Soccer',
  },
  {
    id: '2',
    name: '#Baseball',
  },
  {
    id: '3',
    name: '#Sports',
  },
  {
    id: '4',
    name: '#Movie Watcher',
  },
  {
    id: '5',
    name: '#Dog Lover',
  }
]


const MediatorQuestionInterestScreen = ({ navigation, route }) => {
  const { CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, PartnerNature, Nature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [search, setsearch] = useState();
  console.log(CompanyName,PositioninCompany,CompanyType);


  const onEducationScreen = () => {
    const selectitem = TypeTestimonial[selectedCategoryIndex].name;
    console.log(selectitem);
    if (selectitem) {
      // const Occupation = occupation;
      navigation.navigate('MediatorQuestionEducationScreen', { Interest: selectitem, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your interest!", ToastAndroid.SHORT);
    }
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
          paddingTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image source={require('../../../assets/interest.png')} resizeMode='contain' style={{
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
          }}>What are your interests?</Text>
        </View>
        <View style={{
          alignItems: 'center',
          paddingHorizontal: 70,
        }}>
          <Text style={{
            color: COLORS.black,
            textAlign: 'center',
          }}>(Maximum 10)</Text>
        </View>

        <View style={styles.NumberInput}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Image source={require('../../../assets/search.png')} resizeMode='contain' style={{
              marginRight: 5
            }} />
            <TextInput
              value={search}
              placeholder={'Search'}
              onChangeText={search => setsearch(search)
              }
              style={styles.TextInput}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View >
            <ListTestimonial data={TypeTestimonial} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
          </View>

          <View style={{
            paddingTop: 100,
            flexDirection: 'row'
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton onpress={() => onEducationScreen()}
                title={'Continue'} />
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

        </ScrollView>
      </View>

    </SafeAreaView >
  )
}

export default MediatorQuestionInterestScreen

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
    // minWidth:120,
    maxWidth: 180,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10
  }
})