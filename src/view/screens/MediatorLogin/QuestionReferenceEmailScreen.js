import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';



const MediatorQuestionReferenceEmailScreen = ({ navigation, route }) => {
  const { PartnerBuildType, BuildType, PartnerMaxHeight, PartnerMinHeight, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [firstRefname, setfirstRefname] = useState();
  const [firstRefemail, setfirstRefemail] = useState();
  const [firstRefnumber, setfirstRefNumber] = useState(0);
  const [SecRefname, setSecRefname] = useState();
  const [SecRefemail, setSecRefemail] = useState();
  const [SecRefnumber, setSecRefNumber] = useState(0);
  const Numregex = new RegExp("\\+\\d+$");



  const onDealBreakandMakeScreen = () => {
    if (!firstRefname || !firstRefemail || firstRefnumber.length < 13 || !firstRefnumber || !firstRefnumber === Numregex.test || !SecRefname || !SecRefemail || SecRefnumber.length < 13 || !SecRefnumber || !SecRefnumber === Numregex.test) {
      if (!firstRefname || !SecRefname) {
        ToastAndroid.show("Please enter both your Referances name!", ToastAndroid.SHORT);
      }
      else if (!firstRefemail || !SecRefemail) {
        ToastAndroid.show("Please enter both your Referances email!", ToastAndroid.SHORT);
      }
      else if (!firstRefnumber || !SecRefnumber) {
        ToastAndroid.show('Please enter your phone number', ToastAndroid.SHORT)
      }
      else if (firstRefnumber.length < 13 || SecRefnumber.length < 13) {
        ToastAndroid.show('Phone number should be 11 digits', ToastAndroid.SHORT)
      }
      else if (!firstRefnumber === Numregex.test(firstRefnumber) || !SecRefnumber === Numregex.test(SecRefnumber)) {
        ToastAndroid.show('Phone number must be starting with +', ToastAndroid.SHORT)
      }
    }
    else {
      // console.log(firstRefnumber);
      navigation.navigate('MediatorQuestionDealBreakandMakeScreen', { Firstrefname: firstRefname, FirstRefemail: firstRefemail, FirstRefnumber: firstRefnumber, Secrefname: SecRefname, SecRefemail: SecRefemail, SecRefnumber: SecRefnumber, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
  }


  const onSkipScreen = () => {
    console.log('Skip Screen');
    navigation.navigate('MediatorQuestionDealBreakandMakeScreen', { Firstrefname: null, FirstRefemail: null, FirstRefnumber: null, Secrefname: null, SecRefemail: null, SecRefnumber: null, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <ScrollView>
        <View style={styles.container}>

          <View style={{
            alignItems: 'center',
            paddingTop: 10,
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Image source={require('../../../assets/notify.png')} resizeMode='contain'
              style={{
                width: 15,
                height: 15,
              }} />
            <Text style={{
              color: COLORS.black,
              marginLeft: 5
            }}>Response is Not Public</Text>
          </View>


          <View style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>References input number
              and email of reference
            </Text>
          </View>

          <View style={{
            alignItems: 'center',
            paddingHorizontal: 70,
          }}>
            <Text style={{
              textAlign: 'center',
            }}>(Optional)
            </Text>
          </View>

          <View style={{ alignItems: 'flex-start', marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: COLORS.black
            }}> 1st Reference </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Name </Text>
              <View style={styles.NumberInput}>
                <TextInput
                  value={firstRefname}
                  placeholder={'Enter your name'}
                  onChangeText={firstRefname => setfirstRefname(firstRefname)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Email </Text>
              <View style={styles.NumberInput}>
                <TextInput
                  value={firstRefemail}
                  placeholder={'Enter your email'}
                  keyboardType='email-address'
                  onChangeText={firstRefemail => setfirstRefemail(firstRefemail)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>


          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Phone Number </Text>
              <View style={styles.NumberInput}>
                {/* <View>
                  <Image source={require('../../assets/USflag.png')} resizeMode='contain' style={{
                    marginRight: 10,
                    borderRadius: 3
                  }} />
                </View>
                <Text> | </Text> */}
                <TextInput
                  value={firstRefnumber}
                  placeholder={'Enter your number'}
                  keyboardType='number-pad'
                  onChangeText={firstRefnumber => setfirstRefNumber(firstRefnumber)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>


          <View style={{ alignItems: 'flex-start', marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: COLORS.black
            }}> 2st Reference </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Name </Text>
              <View style={styles.NumberInput}>
                <TextInput
                  value={SecRefname}
                  placeholder={'Enter your name'}
                  onChangeText={SecRefname => setSecRefname(SecRefname)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Email </Text>
              <View style={styles.NumberInput}>
                <TextInput
                  value={SecRefemail}
                  placeholder={'Enter your email'}
                  keyboardType='email-address'
                  onChangeText={SecRefemail => setSecRefemail(SecRefemail)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>


          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Phone Number </Text>
              <View style={styles.NumberInput}>
                {/* <View>
                  <Image source={require('../../assets/USflag.png')} resizeMode='contain' style={{
                    marginRight: 10,
                    borderRadius: 3
                  }} />
                </View>
                <Text> | </Text> */}
                <TextInput
                  value={SecRefnumber}
                  placeholder={'Enter your number'}
                  keyboardType='number-pad'
                  onChangeText={SecRefnumber => setSecRefNumber(SecRefnumber)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>


          <View style={{ alignItems: 'center' }}>

            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 50,
              paddingBottom: 10,
            }}>
              <View style={{ marginHorizontal: 5 }}>
                <CustomeButton width={170} onpress={() => onSkipScreen()}
                  title={'Skipp'} bcolor={COLORS.light} />
              </View>
              <View style={{ marginHorizontal: 5 }}>
                <CustomeButton width={170} onpress={() => onDealBreakandMakeScreen()}
                  title={'Continue'} />
              </View>
            </View>
          </View>

        </View>

      </ScrollView>



    </SafeAreaView >
  )
}

export default MediatorQuestionReferenceEmailScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '90%',
  },
  footer: {
    alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
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