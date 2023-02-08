import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/reducers/Reducers';



const EducationData = [
  {
    id: '1',
    name: 'Very I like to stay with my partner 24/7 even go to work together if possible',
  },
  {
    id: '2',
    name: 'I am not clingy at all',
  }
]



const QuestionClingyScreen = ({ navigation, route }) => {
  const {RelationshipLookingType, Cuddling, InLife, InBed, MovieType, NextLongestRelationship, LongestRelationship, OpenTo, DealBreaker, DealMakers, Firstrefname, FirstRefemail, FirstRefnumber, Secrefname, SecRefemail, SecRefnumber, PartnerBuildType, BuildType, PartnerMaxHeight, PartnerMinHeight, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, Dates, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  // console.log(image1);
  // console.log(Nature,PartnerNature);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [transferred, setTransferred] = useState(0);
  const [checked, setChecked] = React.useState(''); //initial choice
  const [clingy, setclingy] = useState('');
  const CurrentUser = auth().currentUser.uid;
  // const [image, setImage] = useState(image1);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();



  const AddToRedux = (Data) => {
    // console.log('Redux data', Data);
    dispatch(login(Data))
  }

  const onCongratsScreen = async () => {
    if (clingy) {
      // return;
      try {
        setUploading(true)
        const imageUrl = await uploadImage();
        var Data = new Object();
        Data.Clingy = clingy;
        Data.Interest = Interest;
        Data.Cuddling = Cuddling;
        Data.InLife = InLife;
        Data.InBed = InBed;
        Data.MovieType = MovieType;
        Data.NextLongestRelationship = NextLongestRelationship;
        Data.LongestRelationship = LongestRelationship;
        Data.OpenTo = OpenTo;
        Data.DealBreaker = DealBreaker;
        Data.DealMakers = DealMakers;
        Data.Firstrefname = Firstrefname;
        Data.FirstRefemail = FirstRefemail;
        Data.FirstRefnumber = FirstRefnumber;
        Data.Secrefname = Secrefname;
        Data.SecRefemail = SecRefemail;
        Data.SecRefnumber = SecRefnumber;
        Data.PartnerBuildType = PartnerBuildType;
        Data.BuildType = BuildType;
        Data.PartnerMaxHeight = PartnerMaxHeight;
        Data.PartnerMinHeight = PartnerMinHeight;
        Data.Hieght = Height;
        Data.PartnerDisability = PartnerDisability;
        Data.Disability = Disability;
        Data.DescribePartner = DescribePartner;
        Data.DescribeYou = DescribeYou;
        Data.Education = Education;
        Data.RelationshipType = RelationshipType;
        Data.Relagion = Relagion;
        Data.KosherType = KosherType;
        Data.foodtype = foodtype;
        Data.religionType = religionType;
        Data.relationshipLookingType = RelationshipLookingType;
        Data.ParentReligion = ParentReligion;
        Data.Diet = Diet;
        Data.PartnerDiet = PartnerDiet;
        Data.FavFood = FavFood;
        Data.Exercise = Exercise;
        Data.ExerciseStatus = ExerciseStatus;
        Data.PartnerExercise = PartnerExercise;
        Data.Ethnicity = Ethnicity;
        Data.PartnerEthnicity = PartnerEthnicity;
        Data.Name = name;
        Data.InstaUsername = InstaUsername;
        Data.Drink = Drink;
        Data.Drugs = Drugs;
        Data.Marijauna = Marijauna;
        Data.Vape = Vape;
        Data.Smoke = Smoke;
        Data.Lookingfor = Lookingfor;
        Data.Nature = Nature;
        Data.PartnerNature = PartnerNature;
        Data.PoliticalPartnerView = PoliticalPartnerView;
        Data.PoliticalView = PoliticalView;
        Data.Music = Music;
        Data.Experince = Experince;
        Data.Bio = Bio;
        Data.Kids = Kids;
        Data.PartnerGender = PartnerGender;
        Data.Gender = Gender;
        Data.Dates = Dates;
        Data.image5 = image5;
        Data.image4 = image4;
        Data.image3 = image3;
        Data.image2 = image2;
        Data.image1 = imageUrl;
        Data.CompanyType = CompanyType;
        Data.PositioninCompany = PositioninCompany;
        Data.CompanyName = CompanyName;
        Data.uid = CurrentUser
        // console.log('test data: ', Data);
        // return;
        // console.log(CurrentUser);
        firestore()
          .collection('Users').doc(CurrentUser).set({
            userDetails: Data
          }).then(() => {
            // redux
            AddToRedux(Data)
            ToastAndroid.show('Welcome to Honey and Dates', ToastAndroid.SHORT)
            navigation.navigate('QuestionCongratulationScreen')
          })
        // setImage(null)
        setUploading(false)
      } catch (error) {
        console.log('error test', error);
      }
    }
    else {
      ToastAndroid.show("Please select relationships!", ToastAndroid.SHORT);
    }
  }

  const uploadImage = async () => {
    if (image1 == null) {
      return null;
    }
    const uploadUri = image1;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    // setUploading(true);
    // setTransferred(0);

    const storageRef = storage().ref(`Users/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      // setUploading(false);
      // setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  const SelectedClingy = (index) => {
    setSelectedCategoryIndex(index)
    setclingy(EducationData[selectedCategoryIndex].name)
  }



  const ListEducation = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => SelectedClingy(index)}>
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
  return (
    <SafeAreaView>
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            alignItems: 'center',
            paddingTop: 10,
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Image source={require('../../assets/notify.png')} resizeMode='contain'
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
            paddingTop: 30,
            alignItems: 'center',
            paddingHorizontal: 60,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Are you Clingy?
            </Text>
          </View>

          <View>
            <ListEducation data={EducationData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Other </Text>
              <View style={styles.NumberInput2}>
                <TextInput
                  value={clingy}
                  placeholder={'Write here'}
                  onChangeText={clingy => setclingy(clingy)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
            <Text style={{ color: COLORS.green }}>Attention!</Text>
            <View style={{ paddingTop: 10, paddingRight: 50 }}>
              <Text>Being clingy is not a Bad thing it's
                preference Some couples Love it
                Some hate it. we Only use it for
                Preference in concierge service
                responses are Not public!</Text>
            </View>
          </View>

        </View>

        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          height: '10%'
        }}>
          <View style={{ marginHorizontal: 5 }}>
            {!uploading == true ? (
              <CustomeButton onpress={() => onCongratsScreen()}
                title={'Continue'} />
            ) : (
              <View style={{
                backgroundColor: COLORS.main,
                width: 329,
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
              </View>
            )}
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

    </SafeAreaView>
  )
}


export default QuestionClingyScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
    height: '90%'
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
    height: 50,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  NumberInput2: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})