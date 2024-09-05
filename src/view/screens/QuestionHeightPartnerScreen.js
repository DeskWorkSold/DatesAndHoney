import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';
import Slider from '@react-native-community/slider';
const { width, height } = Dimensions.get('window')
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { login } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';


const QuestionHeightPartnerScreen = ({ navigation, route }) => {
  // const { Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [minHeight, setminHeight] = useState(1);
  const [maxHeight, setmaxHeight] = useState(15);
  const [heighType, setHeightType] = useState(false);
  const [heighType2, setHeightType2] = useState(false);

  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const userPhoneNumber = auth().currentUser.phoneNumber
  // console.log(email, Height, languages,  ExerciseStatus, Exercise, FavFood,  Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername );

  const onMinHeight = (minHeight) => {
    const convertedValue = minHeight * 15.0;
    setminHeight(convertedValue.toFixed(1))
  }

  const onMaxHeight = (maxHeight) => {
    const convertedValue = maxHeight * 15.0;
    setmaxHeight(convertedValue.toFixed(1))
  }

  const onQuestionBuildTypeScreen = () => {
    if (minHeight && maxHeight) {
      const update = {
        ...route?.params,
        PartnerMaxHeightType: 'feets',
        PartnerMinHeightType: 'feets',
        PartnerMinHeight: minHeight,
        PartnerMaxHeight: maxHeight,
        selection2: route?.params?.selection2 + 1,
      }
      navigation.navigate('QuestionBuildTypeScreen', update)
    }
    else {
      ToastAndroid.show("Please enter your partner expected Height!", ToastAndroid.SHORT);
    }
  }

  const onSkip = async () => {
    const data = {
      ...route?.params,
      PartnerMaxHeightType: null,
      PartnerMinHeightType: null,
      PartnerMinHeight: null,
      PartnerMaxHeight: null,
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
      Data.Interest = data?.Interest;
      Data.HairColor = data?.HairColor;
      Data.EyeColor = data?.EyeColor;
      Data.Height = data?.Height;
      Data.PartnerMaxHeightType = data?.PartnerMaxHeightType;
      Data.PartnerMinHeightType = data?.PartnerMinHeightType;
      Data.PartnerMinHeight = data?.PartnerMinHeight;
      Data.PartnerMaxHeight = data?.PartnerMaxHeight;

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
    // navigation.navigate('QuestionBuildTypeScreen', { PartnerMaxHeightType: null, PartnerMinHeightType: null, PartnerMaxHeight: null, PartnerMinHeight: null, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
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
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
            flexDirection: 'row',
            height: 40,
            justifyContent: 'center',
          }}>
            <View style={{
              flex: 1,
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
          </View>

          <View style={{
            paddingTop: 0,
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/height.png')}
              resizeMode='contain' style={{
                height: height / 6
              }} />
          </View>

          <View style={{
            paddingTop: 30,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 16,
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
                <Text> {minHeight}feets</Text>
              </View>
            </View>
            <Slider
              style={{ width: '100%', height: 40, }}
              minimumValue={0}
              maximumValue={1}
              thumbTouchSize={{
                width: 40, height: 40
              }}
              thumbTintColor={COLORS.main}
              minimumTrackTintColor={COLORS.main}
              maximumTrackTintColor={COLORS.gray}
              value={Math.floor(minHeight) / 15}
              onValueChange={(value) => onMinHeight(value)}
            />
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
                <Text>{maxHeight}feets</Text>
              </View>
            </View>
            <Slider
              style={{ width: '100%', height: 40, }}
              minimumValue={0}
              maximumValue={1}
              thumbTouchSize={{
                width: 40, height: 40
              }}
              thumbTintColor={COLORS.main}
              minimumTrackTintColor={COLORS.main}
              maximumTrackTintColor={COLORS.gray}
              value={Math.floor(maxHeight) / 15}
              onValueChange={(value) => onMaxHeight(value)}
            />
          </View>


        </View>


        {/* <View style={styles.footer}> */}

        <View style={{
          paddingTop: 20,
          height: '25%'
        }}>
          <View style={{
            marginBottom: 5
          }}>
            <CustomeButton width={width / 1.1} onpress={() => onQuestionBuildTypeScreen()}
              title={'Continue'} />
          </View>

          <CustomeButton onpress={() => onSkip()} width={width / 1.1}
            title={'Skip'} bcolor={COLORS.light} />

          <View style={{
            paddingTop: 10,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>


      </View>


      <Loader modal={uploading} uploading={uploading} />
    </SafeAreaView >
  )
}

export default QuestionHeightPartnerScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: '100%'

  },
  contentContainer: {
    height: '75%',
    // alignItems: 'center',
    paddingHorizontal: 20,
    // justifyContent: 'center'
  },
  footer: {
    marginTop: '40%'
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