import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';
import auth from '@react-native-firebase/auth';
import Loader from '../components/Loader';
import { login } from '../../../redux/reducers/Reducers';
import { useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


export const DatesData = [
  {
    id: '1',
    name: 'Dates',
  },
  {
    id: '2',
    name: 'Dating and Events',
  },
  {
    id: '3',
    name: 'Events Only',
  },
]

const QuestionTypeofRelationScreen = ({ navigation, route }) => {
  const { email, name, DateOfBirth, Gender, GenderDetial } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);
  // console.log(DateOfBirth);
  const CurrentUser = auth()?.currentUser?.uid;
  const userPhoneNumber = auth()?.currentUser?.phoneNumber
  const dispatch = useDispatch();

  const onSmokeScreen = async () => {
    // console.log(DatesData[selectedCategoryIndex].name);
    if (selectedCategoryIndex !== null) {
      const selectedPolitics = DatesData[selectedCategoryIndex].name;
      await onSkip(selectedPolitics);
      // if (selectedPolitics == 'Events Only') {
      //   setUploading(true)
      //   await onSkip(selectedPolitics);
      // }
      // else {
      //   // const update = {
      //   //   ...route?.params,
      //   //   Lookingfor: selectedPolitics,
      //   // }
      //   setUploading(true)
      //   await onSkip(selectedPolitics);

      //   // navigation.navigate('QuestionPoliticalviewScreen', update)
      // }
    }
    else {
      ToastAndroid.show("Please select you are looking for!", ToastAndroid.SHORT);
    }
  }

  const onSkip = async (selectedPolitics) => {
    // const selectedPolitics = DatesData[selectedCategoryIndex].name;
    // console.log('skip all');
    // console.log(selectedPolitics, email, name, DateOfBirth, Gender);
    // console.log(route?.params);
    // return
    try {
      setUploading(true)
      const imageUrl = await uploadImage(route?.params?.image1);
      const imageUrl2 = await uploadImage2(route?.params?.image2);
      const imageUrl3 = await uploadImage3(route?.params?.image3);
      const imageUrl4 = await uploadImage4(route?.params?.image4);
      const imageUrl5 = await uploadImage5(route?.params?.image5);
      const imageUrl6 = await uploadImage6(route?.params?.image6);
      var Data = new Object();
      Data.Dates = route?.params?.DateOfBirth;
      Data.Gender = route?.params?.Gender;
      Data.GenderDetial = route?.params?.GenderDetial;
      Data.KosherType = route?.params?.KosherType;
      Data.ParentReligion = route?.params?.ParentReligion;
      Data.Relagion = route?.params?.Relagion;
      Data.RelagionStatus = route?.params?.RelagionStatus;
      Data.email = route?.params?.email;
      Data.foodtype = route?.params?.foodtype;
      Data.image1 = imageUrl;
      Data.image2 = imageUrl2;
      Data.image3 = imageUrl3;
      Data.image4 = imageUrl4;
      Data.image5 = imageUrl5;
      Data.image6 = imageUrl6;
      Data.Category = 'User';
      Data.Name = route?.params?.name;
      Data.religionType = route?.params?.religionType;
      Data.SecName = route?.params?.secName;
      Data.Lookingfor = selectedPolitics;
      Data.uid = CurrentUser;
      Data.SelectionOne = 0;
      Data.timeStamp = new Date().toString();
      Data.PhoneNumber = userPhoneNumber ? userPhoneNumber : null;
      Data.Location = {
        latitude: 24.9028039,
        longitude: 67.1145385,
      }
      // Data.filterGender = 'Female'
      // console.log('test data: ', Data);
      // return;
      await firestore()
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
  const uploadImage6 = async (uploadUri) => {
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

  // const SubmitUserDate = () => {
  //   const selectedPolitics = DatesData[selectedCategoryIndex].name;

  //   try {
  //     // setUploading(true)
  //     // const imageUrl6 = await uploadImage();
  //     var Data = new Object();
  //     Data.email = email;
  //     Data.Category = 'User';
  //     Data.filterMaxAge = null;
  //     Data.filterMinAge = null;
  //     Data.ConvertedReligion = null;
  //     Data.ConvertedReligionDetail = null;
  //     Data.languages = null;
  //     Data.PartnerMinHeightType = null;
  //     Data.PartnerMaxHeightType = null;
  //     Data.HairColor = null;
  //     Data.EyeColor = null;
  //     Data.Clingy = null;
  //     Data.Cuddling = null;
  //     Data.InLife = null;
  //     Data.InBed = null;
  //     Data.MovieType = null;
  //     Data.NextLongestRelationship = null;
  //     Data.LongestRelationship = null;
  //     Data.DealBreaker = null;
  //     Data.DealMakers = null;
  //     Data.PartnerBuildType = null;
  //     Data.BuildType = null;
  //     Data.PartnerMaxHeight = null;
  //     Data.PartnerMinHeight = null;
  //     Data.Hieght = null;
  //     Data.Education = null;
  //     Data.RelationshipType = null;
  //     Data.Relagion = null;
  //     Data.KosherType = null;
  //     Data.foodtype = null;
  //     Data.religionType = null;
  //     Data.ParentReligion = null;
  //     Data.Diet = null;
  //     Data.FavFood = null;
  //     Data.Exercise = null;
  //     Data.ExerciseStatus = null;
  //     Data.Name = name;
  //     Data.InstaUsername = null;
  //     Data.Drink = null;
  //     Data.Drugs = null;
  //     Data.Marijauna = null;
  //     Data.Vape = null;
  //     Data.Smoke = null;
  //     Data.Lookingfor = selectedPolitics;
  //     Data.Nature = null;
  //     Data.PartnerNature = null;
  //     Data.PoliticalPartnerView = null;
  //     Data.PoliticalView = null;
  //     Data.Experince = null;
  //     Data.InTenYear = null;
  //     Data.Bio = null;
  //     Data.Kids = null;
  //     Data.PartnerGender = null;
  //     Data.Gender = Gender;
  //     Data.Dates = DateOfBirth;
  //     Data.image5 = null;
  //     Data.image4 = null;
  //     Data.image3 = null;
  //     Data.image2 = null;
  //     Data.image1 = null;
  //     Data.CompanyType = null;
  //     Data.PositioninCompany = null;
  //     Data.CompanyName = null;
  //     Data.uid = CurrentUser
  //     Data.PhoneNumber = userPhoneNumber ? userPhoneNumber : null;
  //     Data.Location = {
  //       latitude: 24.9028039,
  //       longitude: 67.1145385,
  //     }
  //     // Data.filterGender = 'Female'
  //     console.log('test data: ', Data);
  //     return;
  //     // console.log(CurrentUser);
  //     firestore()
  //       .collection('Users').doc(CurrentUser).set({
  //         userDetails: Data
  //       }).then(() => {
  //         // redux
  //         AddToRedux(Data)
  //         ToastAndroid.show('Welcome to Honey and Dates', ToastAndroid.SHORT)
  //         navigation.navigate('QuestionCongratulationScreen')
  //         setUploading(false)
  //       })
  //     // setImage(null)
  //     setUploading(false)
  //   } catch (error) {
  //     setUploading(false)
  //     console.log('error test', error);
  //   }
  // }

  const ListDatesData = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {DatesData.map((item, index) => (
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
                  {item.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end',
              }}>
                {value == index ? (
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
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>
          <View style={{
            alignItems: 'center',
            paddingTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 20,

          }}>
            <View style={{
              flex: 1,
              // backgroundColor: COLORS.gray2
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              flex: 2,
              // backgroundColor: COLORS.gray,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 20
            }}>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: COLORS.gray2
            }}>
            </View>
          </View>

          <View style={{
            alignItems: 'center',
            paddingTop: 0,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>What are you looking for?</Text>
          </View>

          <View>
            <ListDatesData data={DatesData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>

        </View>





        <View style={styles.footer}>

          <View style={{
            marginBottom: 5
          }}>
            {uploading ?
              <CustomeButton title={'Please wait...'} />
              :
              <CustomeButton onpress={() => onSmokeScreen()}
                title={'Submit'} />
            }
          </View>
          {/* <View style={{ marginHorizontal: 0 }}>
            <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
              title={'Skip All'} />
          </View> */}

          <View style={{
            paddingTop: 10,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>
      {/* </View> */}


      <Loader uploading={uploading} modal={uploading} />
    </SafeAreaView>
  )
}

export default QuestionTypeofRelationScreen

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
    height: '20%',
    alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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