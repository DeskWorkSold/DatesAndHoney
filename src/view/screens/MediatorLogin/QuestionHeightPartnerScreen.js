import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';



const MediatorQuestionHeightPartnerScreen = ({ navigation, route }) => {
  const { Height, PartnerDisability, Disability, DescribePartner, DescribeYou, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [minHeight, setminHeight] = useState();
  const [maxHeight, setmaxHeight] = useState();


  const onMinHeight = (minHeight) => {
    let newText = '';
    let numbers = '0123456789.';

    for (var i = 0; i < minHeight.length; i++) {
      if (numbers.indexOf(minHeight[i]) > -1) {
        newText = newText + minHeight[i];
      }
      else {
        alert("please enter numbers only");
      }
    }
    setminHeight(newText);
  }
  const onMaxHeight = (maxHeight) => {
    let newText = '';
    let numbers = '0123456789.';

    for (var i = 0; i < maxHeight.length; i++) {
      if (numbers.indexOf(maxHeight[i]) > -1) {
        newText = newText + maxHeight[i];
      }
      else {
        alert("please enter numbers only");
      }
    }
    setmaxHeight(newText);
  }

  const onQuestionBuildTypeScreen = () => {
    if (minHeight && maxHeight) {
      console.log(minHeight, maxHeight);
      navigation.navigate('MediatorQuestionBuildTypeScreen', { PartnerMaxHeight: maxHeight, PartnerMinHeight: minHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please enter min and max Height!", ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            paddingTop: 20
          }}>
            <Image source={require('../../../assets/height.png')}
              resizeMode='contain' style={{
                height: 230
              }} />
          </View>

          <View style={{
            paddingTop: 30,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              paddingHorizontal: 30,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Select the height Range you
              would be open to dating?
            </Text>
          </View>


          <View style={{
            paddingTop: 20,
          }}>
            <View style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{ color: COLORS.black }}>Minimum</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/HIcon.png')} resizeMode='contain'
                  style={{
                    width: 15,
                    height: 15,
                    marginRight: 2
                  }} />
                <Text>Inches</Text>
              </View>
            </View>
            <TextInput
              value={minHeight}
              keyboardType='numeric'
              onChangeText={minHeight => onMinHeight(minHeight)}
              placeholder='Enter minimum height!'
              style={styles.TextInput} />
          </View>

          <View style={{
            paddingTop: 20,
          }}>
            <View style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{ color: COLORS.black }}>Maximum</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/HIcon.png')} resizeMode='contain'
                  style={{
                    width: 15,
                    height: 15,
                    marginRight: 2
                  }} />
                <Text>Inches</Text>
              </View>
            </View>
            <TextInput
              keyboardType='numeric'
              value={maxHeight}
              onChangeText={maxHeight => onMaxHeight(maxHeight)}
              placeholder='Enter maximum height!'
              style={styles.TextInput} />
          </View>


        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
          }}>
            <CustomeButton onpress={() => onQuestionBuildTypeScreen()}
              title={'Continue'} />
          </View>

          <View style={{
            paddingTop: 20,
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

export default MediatorQuestionHeightPartnerScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,

  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%'
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
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
  },
})