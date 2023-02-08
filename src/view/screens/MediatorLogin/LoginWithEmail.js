import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



const MediatorLoginWithEmail = ({ navigation, route }) => {
  const { clingy, RelationshipLookingType, Cuddling, InLife, InBed, MovieType, NextLongestRelationship, LongestRelationship, OpenTo, DealBreaker, DealMakers, Firstrefname, FirstRefemail, FirstRefnumber, Secrefname, SecRefemail, SecRefnumber, PartnerBuildType, BuildType, PartnerMaxHeight, PartnerMinHeight, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  // console.log(Date);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const [inputemail, setInputEmail] = useState(false);
  const [inputpassword, setInputPassword] = useState(false);


  const EMAIL_REGEX = /@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const OnhandleSubmit = (email) => {
    // console.log(email, password);
    if (email === '' || !email === EMAIL_REGEX.test(email)) {
      ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT)
      setInputEmail(true)
    }
    else {
      navigation.navigate('MediatorQuestionRelationshipStatus', { email: email, clingy: clingy, RelationshipLookingType: RelationshipLookingType, Cuddling: Cuddling, InLife: InLife, InBed: InBed, MovieType: MovieType, NextLongestRelationship: NextLongestRelationship, LongestRelationship: LongestRelationship, OpenTo: OpenTo, DealBreaker: DealBreaker, DealMakers: DealMakers, Firstrefname: Firstrefname, FirstRefemail: FirstRefemail, FirstRefnumber: FirstRefnumber, Secrefname: Secrefname, SecRefemail: SecRefemail, SecRefnumber: SecRefnumber, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
  }

  // const RegesterUserWithEamil = async (email, password) => {
  //   console.log('regester here');
  //   await auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       console.log('User account created & signed in!');
  //       ToastAndroid.show('Login Successfully!', ToastAndroid.SHORT)
  //       navigation.navigate('QuestionPhotoScreen')
  //     })
  //     .catch(error => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         console.log('That email address is already in use!');
  //         ToastAndroid.show('That email address is already in use!', ToastAndroid.SHORT)
  //       }
  //       if (error.code === 'auth/invalid-email') {
  //         console.log('That email address is invalid!');
  //         ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT)
  //       }

  //       console.error(error);
  //     });
  // }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>


          <View style={{
            paddingTop: 50,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>What's is your Email?</Text>
          </View>


          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Enter active email address</Text>
          </View>


          <View style={{ marginTop: 60, }}>
            <View style={styles.NumberInput}>
              <TextInput
                value={email}
                error={inputemail}
                onFocus={() => setInputEmail(false)}
                placeholder={'Enter email address'}
                height={200}
                keyboardType='text'
                // error={inputfirstName}
                onChangeText={email => setemail(email)
                }
                style={styles.TextInput}
              />
            </View>
            {/* <View style={styles.NumberInput}>
              <TextInput
                value={password}
                error={inputpassword}
                onFocus={() => setInputPassword(false)}
                placeholder={'Enter password'}
                // error={inputfirstName}
                secureTextEntry={true}
                onChangeText={password => setpassword(password)
                }
                style={styles.TextInput}
              />
            </View> */}
          </View>
        </View>


        <View style={styles.footer}>
          <View style={{
            paddingTop: 20,
          }}>
            <CustomeButton onpress={() => OnhandleSubmit(email)}
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

export default MediatorLoginWithEmail

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%'
  },
  NumberInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    color: COLORS.gray,
    height: 40,
    width: 300,
    justifyContent: "center"
  },
})