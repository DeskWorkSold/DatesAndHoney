import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const TypeTestimonial = [
  {
    id: '1',
    name: '#Sushi',
  },
  {
    id: '2',
    name: '#Foodie i love Everything',
  },
  {
    id: '3',
    name: '#Italian',
  },
  {
    id: '4',
    name: '#Japanese',
  },
  {
    id: '5',
    name: '#Mitterrandian',
  },
  {
    id: '5',
    name: '#I love trying new food',
  },
  {
    id: '5',
    name: '#I hate trying new food',
  },
  {
    id: '5',
    name: '#I like simple bland food',
  }
]



const QuestionFavFoodScreen = ({ navigation, route }) => {
  const { PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);


  const onExersizeScreen = () => {
    const FavFood = TypeTestimonial[selectedCategoryIndex].name
    // console.log(FavFood);
    if (FavFood) {
      navigation.navigate('QuestionExersizeScreen', { FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Religion!", ToastAndroid.SHORT);
    }
  }

  const ListTestimonial = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}
            style={styles.button}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              borderWidth: value == index ? 0 : 1,
              borderColor: value == index ? COLORS.main : COLORS.gray,
              borderRadius: 10,
              paddingHorizontal: 10,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <View style={{ paddingLeft: 10 }}>
                <Text>{TypeTestimonial.name}</Text>
              </View>
              <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                {value == index ? (
                  <Image source={cancle} />
                ) : (
                  <Image source={require('../../assets/add2.png')} resizeMode='contain' />
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
          <Image source={require('../../assets/diet.png')} resizeMode='contain' style={{
            width: 220,
            height: 200,
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
          }}>Favourite Food</Text>
        </View>

        <View style={styles.NumberInput}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
              marginRight: 5
            }} />
            <TextInput
              value={name}
              placeholder={'Search'}
              onChangeText={name => setname(name)
              }
              style={styles.TextInput}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{ paddingTop: 10 }}>
            <ListTestimonial data={TypeTestimonial} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>

          <View style={{
            paddingTop: 50,
            flexDirection: 'row'
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton onpress={() => onExersizeScreen()}
                title={'Continue'} />
            </View>

          </View>

          <View style={{
            paddingVertical: 5,
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

export default QuestionFavFoodScreen

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
  button: {
    flexDirection: 'row',
    height: 30,
    marginTop: 5,
    borderRadius: 10,
  },
  toggelbtn: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 40,
    paddingHorizontal: 5,
    justifyContent: 'space-between'
  }
})