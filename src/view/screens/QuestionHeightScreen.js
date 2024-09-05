import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity, Platform, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';
import Slider from '@react-native-community/slider';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { login } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import ProgressBar from '../components/ProgressBar';
const { height, width } = Dimensions.get('window');

// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import styled from 'styled-components/native'

// const SliderWrapper = styled.View`
//   margin: 20px;
//   width: 280px;
//   height: 300px;
//   justify-content: center;
// `

// const ViewContainer = styled.View`
//   align-self: center;
//   justify-content: center;
// `
// const LabelWrapper = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 20px 0;
// `

// const LabelText = styled.Text`
//   font-size: 20px;
// `


const QuestionHeightScreen = ({ navigation, route }) => {
  const { EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [yourHeight, setHeight] = useState(1);
  const [heighType, setHeightType] = useState(false);

  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])

  const multiSliderValuesChange = (values) => setMultiSliderValue(values)

  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const userPhoneNumber = auth().currentUser.phoneNumber
  // console.log(route.params);


  // console.log(
  //   PartnerDisability, Disability, DescribePartner, DescribeYou, languages, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername 
  // );


  const OnHeightChange = (value) => {
    const convertedValue = value * 15.0;
    // var feet = Math.floor(realFeet);
    // console.log(convertedValue.toFixed(1));
    // const convert = Math.floor(value * 15)
    setHeight(convertedValue.toFixed(1))
  }

  const onQuestionHeightPartnerScreen = () => {
    if (yourHeight && yourHeight >= 2) {
      console.log(yourHeight);
      const update = {
        ...route?.params,
        Height: yourHeight,
        selection2: route?.params?.selection2 + 1,
      }
      // // console.log(data2);
      // return
      navigation.navigate('QuestionBuildTypeScreen', update)
    }
    else {
      if (!yourHeight) {
        ToastAndroid.show("Please select your Height!", ToastAndroid.SHORT);
      }
      else if (yourHeight < 2) {
        ToastAndroid.show("Selected height must be grater 2ft!", ToastAndroid.SHORT);
      }
    }
  }

  const onSkip = async () => {
    const data = {
      ...route?.params,
      Height: null,
      selection2: route?.params?.selection2 + 1,
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
      Data.Height = data?.Height

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
    // navigation.navigate('QuestionHeightPartnerScreen', { Height: null, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })

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
              flex: 3,
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            </View>
            <View style={{
              flex: 1,
            }}>
            </View>
          </View>
          <ProgressBar progress={'84.7'} />
          <View style={{
            paddingTop: 0,
            alignItems: 'center',
          }}>
            <Image source={require('../../assets/height.png')}
              resizeMode='contain' style={{
                height: height / 6,
              }} />
          </View>

          <View style={{
            paddingTop: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              paddingHorizontal: 30,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Your Height?
            </Text>
          </View>

          <View style={{ paddingTop: 20 }}>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <View>
                <Text style={{color:COLORS.black, fontSize:12}}>
                  {yourHeight} ft
                </Text>
              </View>
              <TouchableOpacity onPress={() => setHeightType(!heighType)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{color:COLORS.black, fontSize:12}}>
                  feets
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>

              {/* <ViewContainer>
                <SliderWrapper>
                  <LabelWrapper>
                    <LabelText>{multiSliderValue[0]} </LabelText>
                    <LabelText>{multiSliderValue[1]}</LabelText>
                  </LabelWrapper>
                  <MultiSlider
                    markerStyle={{
                      ...Platform.select({
                        ios: {
                          height: 30,
                          width: 30,
                          shadowColor: COLORS.main,
                          shadowOffset: {
                            width: 0,
                            height: 3
                          },
                          shadowRadius: 1,
                          shadowOpacity: 0.1
                        },
                        android: {
                          height: 20,
                          width: 20,
                          borderRadius: 50,
                          backgroundColor: COLORS.main
                        }
                      })
                    }}
                    pressedMarkerStyle={{
                      ...Platform.select({
                        android: {
                          height: 30,
                          width: 30,
                          borderRadius: 20,
                          backgroundColor: COLORS.main
                        }
                      })
                    }}
                    selectedStyle={{
                      backgroundColor: COLORS.main
                    }}
                    trackStyle={{
                      backgroundColor: COLORS.gray2
                    }}
                    touchDimensions={{
                      height: 20,
                      width: 20,
                      borderRadius: 20,
                      slipDisplacement: 40
                    }}
                    values={[multiSliderValue[0], multiSliderValue[1]]}
                    sliderLength={280}
                    onValuesChange={multiSliderValuesChange}
                    min={0}
                    max={100}
                    allowOverlap={false}
                    minMarkerOverlapDistance={10}
                  />
                </SliderWrapper>
              </ViewContainer> */}


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
                value={Math.floor(yourHeight) / 15}
                onValueChange={(value) => OnHeightChange(value)}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>

          <View style={{
            marginBottom: 5
          }}>
            <CustomeButton onpress={() => onQuestionHeightPartnerScreen()}
              title={'Continue'} />
          </View>
          {/* {route?.params?.selection2 > 5 &&
            <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
              title={'Skip All'} />
          } */}
          <View style={{
            paddingTop: 10,
            // width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10, color:COLORS.black }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>


      </View>



    </SafeAreaView>
  )
}

export default QuestionHeightScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,

  },
  contentContainer: {
    height: '80%',
    // alignItems: 'center',
  },
  footer: {
    height: '20%',
    alignItems: 'center'
    // marginTop: '40%'
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
})