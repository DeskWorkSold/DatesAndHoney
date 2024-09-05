import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { login } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import ProgressBar from '../components/ProgressBar';
import SVGNotify from '../../assets/notify.svg';
const { width, height } = Dimensions.get('window')


const GenderData = [
  {
    id: '1',
    name: 'amber',
  },
  {
    id: '2',
    name: 'blue',
  },
  {
    id: '3',
    name: 'brown',
  },
  {
    id: '4',
    name: 'gray',
  },
  {
    id: '5',
    name: 'green',
  },
  {
    id: '6',
    name: 'hazel',
  },
  {
    id: '7',
    name: 'red',
  },
]


const QuestionEyeColorScreen = ({ navigation, route }) => {
  const { HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [gender, setGender] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState([]);
  const [checked, setChecked] = React.useState('Apple'); //initial choice
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const userPhoneNumber = auth().currentUser.phoneNumber
  // console.log(email, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, languages, ExerciseStatus, Exercise, FavFood, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education,  CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername);

  const onLanguageScreen = async () => {
    // console.log(GenderData[selectedCategoryIndex].name);
    if (selectedCategoryIndex?.length > 0) {
      // const selectedEye = GenderData[selectedCategoryIndex].name;
      const data = {
        ...route?.params,
        EyeColor: selectedCategoryIndex,
        selection3: route?.params?.selection3 + 1,
      }
      try {
        setUploading(true)
        // const imageUrl6 = await uploadImage();
        const imageUrl = await uploadImage(data?.image1);
        const imageUrl2 = await uploadImage2(data?.image2);
        const imageUrl3 = await uploadImage3(data?.image3);
        const imageUrl4 = await uploadImage4(data?.image4);
        const imageUrl5 = await uploadImage5(data?.image5);
        var Data = new Object();
        Data.Bio = data?.Bio;
        Data.BuildType = data?.BuildType;
        Data.Clingy = data?.Clingy;
        Data.CompanyName = data?.CompanyName;
        Data.CompanyType = data?.CompanyType;
        Data.ConvertedReligion = data?.ConvertedReligion;
        Data.ConvertedReligionDetail = data?.ConvertedReligionDetail;
        Data.CoupleOption = data?.CoupleOption;
        Data.Cuddling = data?.Cuddling;
        Data.Dates = data?.DateOfBirth;
        Data.DealBreaker = data?.DealBreaker;
        Data.DealMakers = data?.DealMakers;
        Data.Diet = data?.Diet
        Data.Drink = data?.Drink;
        Data.Drugs = data?.Drugs;
        Data.Education = data?.Education
        Data.Ethnicity = data?.Ethnicity;
        Data.Exercise = data?.Exercise;
        Data.ExerciseStatus = data?.ExerciseStatus;
        Data.EyeColor = data?.EyeColor;
        Data.FavFood = data?.FavFood;
        Data.Gender = data?.Gender;
        Data.GenderDetial = data?.GenderDetial;
        Data.HairColor = data?.HairColor;
        Data.Hieght = data?.Height;
        Data.InFiveYear = data?.InFiveYear;
        Data.InTenYear = data?.InTenYear;
        Data.InstaUsername = data?.InstaUsername;
        Data.IntroandExtro = data?.IntroandExtro;
        Data.Kids = data?.Kids;
        Data.KosherType = data?.KosherType;
        Data.LongestRelationship = data?.LongestRelationship;
        Data.Lookingfor = data?.Lookingfor;
        Data.Marijauna = data?.Marijauna;
        Data.MovieType = data?.MovieType;
        Data.ParentReligion = data?.ParentReligion;
        Data.PoliticalView = data?.PoliticalView;
        Data.PositioninCompany = data?.PositioninCompany;
        Data.Relagion = data?.Relagion;
        Data.RelationshipType = data?.RelationshipType;
        Data.Smoke = data?.Smoke;
        Data.Vape = data?.Vape;
        Data.email = data?.email;
        Data.foodtype = data?.foodtype;
        Data.image1 = imageUrl;
        Data.image2 = imageUrl2;
        Data.image3 = imageUrl3;
        Data.image4 = imageUrl4;
        Data.image5 = imageUrl5;
        Data.languages = data?.languages;
        Data.Name = data?.name;
        Data.religionType = data?.religionType;
        Data.SelectionOne = data?.selection1;
        Data.SelectionTwo = data?.selection2;
        Data.SelectionThree = data?.selection3;
        Data.Category = 'User';
        Data.uid = CurrentUser;
        Data.PhoneNumber = userPhoneNumber ? userPhoneNumber : null;
        Data.Location = {
          latitude: 24.9028039,
          longitude: 67.1145385,
        }
        Data.timeStamp = new Date().toString();
        // Data.filterGender = 'Female'
        // console.log('test data: ', Data);
        // return;
        firestore()
          .collection('Users').doc(CurrentUser).set({
            userDetails: Data
          }).then(() => {
            setUploading(false)
            dispatch(login(Data))
            ToastAndroid.show('Welcome to Honey and Dates', ToastAndroid.SHORT)
            navigation.navigate('QuestionCongratulationScreen')
          })
        setUploading(false)
      } catch (error) {
        setUploading(false)
        ToastAndroid.show('Error : ' + error, ToastAndroid.SHORT)
        console.log('error test', error);
      }
      // navigation.navigate('QuestionHeightScreen', update)
    }
    else {
      ToastAndroid.show("Please select your eye color!", ToastAndroid.SHORT);
    }
    // navigation.navigate('QuestionLanguageScreen')
  }

  const onSkip = async () => {
    const data = {
      ...route?.params,
      EyeColor: null,
    }
    try {
      setUploading(true)
      // const imageUrl6 = await uploadImage();
      const imageUrl = await uploadImage(data?.image1);
      const imageUrl2 = await uploadImage2(data?.image2);
      const imageUrl3 = await uploadImage3(data?.image3);
      const imageUrl4 = await uploadImage4(data?.image4);
      const imageUrl5 = await uploadImage5(data?.image5);
      var Data = new Object();
      Data.email = data?.email;
      Data.Category = 'User';
      Data.filterMaxAge = data?.filterMaxAge;
      Data.filterMinAge = data?.filterMinAge;
      Data.Name = data?.name;
      Data.Drink = data?.Drink;
      Data.Drugs = data?.Drugs;
      Data.Marijauna = data?.Marijauna;
      Data.Vape = data?.Vape;
      Data.Smoke = data?.Smoke;
      Data.Lookingfor = data?.Lookingfor;
      Data.PoliticalView = data?.PoliticalView;
      Data.Bio = data?.Bio;
      Data.Kids = data?.Kids;
      Data.PartnerGender = data?.PartnerGender;
      Data.Gender = data?.Gender;
      Data.Dates = data?.DateOfBirth;
      Data.image5 = imageUrl5;
      Data.image4 = imageUrl4;
      Data.image3 = imageUrl3;
      Data.image2 = imageUrl2;
      Data.image1 = imageUrl;
      Data.uid = CurrentUser;
      Data.selection1 = data?.selection1;
      Data.PhoneNumber = userPhoneNumber ? userPhoneNumber : null;
      Data.Location = {
        latitude: 24.9028039,
        longitude: 67.1145385,
      }
      Data.Education = data?.Education;
      Data.RelationshipType = data?.RelationshipType;
      Data.Relagion = data?.Relagion;
      Data.ParentReligion = data?.ParentReligion;
      Data.ReligionType = data?.religionType;
      Data.KosherType = data?.KosherType;
      Data.foodtype = data?.foodtype;
      Data.Diet = data?.Diet;
      Data.Clingy = data?.Clingy;
      Data.FavFood = data?.FavFood;
      Data.ExerciseStatus = data?.ExerciseStatus;
      Data.Exercise = data?.Exercise;
      Data.Cuddling = data?.Cuddling;
      Data.CompanyName = data?.CompanyName;
      Data.PositioninCompany = data?.PositioninCompany;
      Data.CompanyType = data?.CompanyType;
      Data.Interest = data?.Interest
      Data.HairColor = data?.HairColor
      Data.EyeColor = data?.EyeColor

      // Data.filterGender = 'Female'
      // console.log('test data: ', Data);
      // return;
      firestore()
        .collection('Users').doc(CurrentUser).set({
          userDetails: Data
        }).then(() => {
          setUploading(false)
          dispatch(login(Data))
          ToastAndroid.show('Welcome to Honey and Dates', ToastAndroid.SHORT)
          navigation.navigate('QuestionCongratulationScreen')
        })
      setUploading(false)
    } catch (error) {
      setUploading(false)
      console.log('error test', error);
    }
    // navigation.navigate('QuestionHeightScreen', { EyeColor: null, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
    // navigation.navigate('QuestionLanguageScreen')
  }

  const uploadImage = async (uploadUri) => {
    if (uploadUri == null) {
      return null;
    }
    // const uploadUri = uploadUri;
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
      const progress = Math.round(
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      );
      setTransferred(progress);

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

  const uploadImage2 = async (uploadUri) => {
    if (uploadUri == null) {
      return null;
    }
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
      const progress = Math.round(
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      );
      setTransferred(progress);
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
  const uploadImage3 = async (uploadUri) => {
    if (uploadUri == null) {
      return null;
    }
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
      const progress = Math.round(
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      );
      setTransferred(progress);
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
  const uploadImage4 = async (uploadUri) => {
    if (uploadUri == null) {
      return null;
    }
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
      const progress = Math.round(
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      );
      setTransferred(progress);
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
  const uploadImage5 = async (uploadUri) => {
    if (uploadUri == null) {
      return null;
    }
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
      const progress = Math.round(
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      );
      setTransferred(progress);
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

  const handleSelection = (item) => {
    if (selectedCategoryIndex.includes(item)) {
      // Item is already in the array, so remove it
      const newSelectedItems = selectedCategoryIndex.filter((i) => i !== item);
      setSelectedCategoryIndex(newSelectedItems);

    }
    else {
      // Item is not in the array, so add it
      const newSelectedItems = [...selectedCategoryIndex, item];
      setSelectedCategoryIndex(newSelectedItems);
    }
  };

  const ListGender = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((gender, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() =>  handleSelection(gender.name)}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              ...styles.NumberInput
            }}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  {gender.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end',
              }}>
                {selectedCategoryIndex.includes(gender.name) ? (
                  <SVGImg width={20} height={20} />
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
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <View style={{
              alignItems: 'center',
              height: 60,
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'center'

            }}>
              <View style={{
                flex: 1,
              }}>
                <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
              </View>
              <View style={{
                flex: 4,
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <SVGNotify width={20} height={20} />
                <Text style={{
                  color: COLORS.black,
                  marginLeft: 5,
                  fontSize: 12,
                }}>Phase three has been completed</Text>
              </View>

              <View style={{
                flex: 1,
              }}>
                {/* <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} /> */}
              </View>
            </View>

            <ProgressBar progress={'100'} />


            <View style={{
              paddingTop: 0,
              paddingHorizontal: 20
            }}>
              <Image source={require('../../assets/eyecolor.png')} resizeMode='contain' style={{
                height: height / 7,
              }} />
            </View>


            <View style={{
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black
              }}>What color of eye do
                you have?</Text>
            </View>
            <View>
              <Text style={{color:COLORS.black, fontSize:12,}}>
                You can select any one
              </Text>
            </View>


            <View>
              <ListGender data={GenderData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>

          </View>
          <View style={{
            paddingTop: 10,
            paddingHorizontal: 20,
          }}>
            <Text style={{
              color: COLORS.green,
              fontWeight: 'bold',
              fontSize: 12,
            }}>Attention!</Text>
            <Text style={{
              fontSize: 12,
              color: COLORS.gray,
            }}>
              All Phases has been completed.
            </Text>
          </View>

          <View style={styles.footer}>

            <View style={{
              paddingTop: 100,
              // flexDirection: 'row',
            }}>
              <View style={{
                marginBottom: 10,
              }}>
                {uploading ?
                  <CustomeButton
                    title={'Please wait...'} />
                  :
                  <CustomeButton onpress={() => onLanguageScreen()}
                    title={'Complete'} />
                }
              </View>
            </View>

            <View style={{
              paddingTop: 5,
              width: 310,
              paddingBottom: 20
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10 }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>
          </View>



        </ScrollView>
      </View>

      <Loader uploading={uploading} modal={uploading} />
    </SafeAreaView>
  )
}

export default QuestionEyeColorScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '75%',
    // backgroundColor: COLORS.black,
    alignItems: 'center',
  },
  footer: {
    height: '25%',
    alignItems: 'center',
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