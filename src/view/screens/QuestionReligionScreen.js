import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import { set } from 'react-native-reanimated';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { login } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import ProgressBar from '../components/ProgressBar';
const { width, height } = Dimensions.get('window')

export const RelagionType = [
  {
    id: '1',
    name: 'Christian',
    onpress: 'QuestionMoreAboutChristianScreen'
  },
  {
    id: '2',
    name: 'Jewish',
    onpress: 'QuestionMoreAboutJewishScreen'
  },
  {
    id: '3',
    name: 'Catholic',
    onpress: 'QuestionMoreAboutCatholicScreen'
  },
  {
    id: '4',
    name: 'Muslim',
    onpress: 'QuestionMoreAboutMuslimScreen'
  },
  {
    id: '5',
    name: 'Hinduism',
  },

  {
    id: '6',
    name: 'Buddhism',
  },
  {
    id: '7',
    name: 'Chinese traditional religion',
  },
  {
    id: '8',
    name: 'Prefer not say',
  },
]

export const MoreAboutJewaish = [
  {
    id: '1',
    mom: 'Is your mom born Jewish',
  }, {
    id: '2',
    dad: 'Is your mom born Jewish',
  },
  {
    id: '3',
    Type1: 'Orthodox',
  }, {
    id: '4',
    Type2: 'Modren orthodox',
  },
  {
    id: '5',
    Type3: 'Conservative',
  }, {
    id: '6',
    Type4: 'Reformed',

  }, {
    id: '7',
    Type5: 'Just Jewish',
  }, {

    id: '8',
    Type6: 'Converted',
  }, {
    id: '9',
    Type7: 'Traditional',

  }, {
    id: '10',
    Type8: 'Secular',

  }
]



const QuestionReligionScreen = ({ navigation, route }) => {
  const { RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState('');
  const [religionType, setReligionType] = useState(null);

  const [showtick2, setShowtick2] = useState('');
  const [showtick3, setShowtick3] = useState('');
  const [showtick4, setShowtick4] = useState('');
  const [showtick5, setShowtick5] = useState('');
  const [showtick6, setShowtick6] = useState('');
  const [showtick7, setShowtick7] = useState('');
  const [Christian, setChristian] = useState('');
  const [Jewaish, setJewaish] = useState('');
  // console.log(PartnerNature, IntroandExtro,);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const userPhoneNumber = auth().currentUser.phoneNumber



  const onDietScreen = () => {
    // console.log(selectitem);
    if (selectedCategoryIndex && religionType) {
      const selectitem = RelagionType[selectedCategoryIndex]?.name;
      const update = {
        ...route?.params,
        Relagion: selectitem,
        RelagionStatus: religionType,
        ParentReligion: null,
        religionType: null,
        KosherType: null,
        foodtype: null,
        // selection1: route?.params?.selection1 + 2,
      }
      navigation.navigate('QuestionTypeofRelationScreen', update)
    }
    else {
      if (!religionType) {
        ToastAndroid.show("Please select your religion is public/Not!", ToastAndroid.SHORT);
        return
      }
      ToastAndroid.show("Please select your religion!", ToastAndroid.SHORT);
    }
  }

  const onSkip = async () => {
    const update = {
      ...route?.params,
      Relagion: null,
      ParentReligion: null,
      RelagionStatus: null,
      religionType: null,
      KosherType: null,
      foodtype: null,
      // selection1: route?.params?.selection1 + 2,
    }
    navigation.navigate('QuestionTypeofRelationScreen', update)
  }
  //   try {
  //     setUploading(true)
  //     // const imageUrl6 = await uploadImage();
  //     const imageUrl = await uploadImage(data?.image1);
  //     const imageUrl2 = await uploadImage2(data?.image2);
  //     const imageUrl3 = await uploadImage3(data?.image3);
  //     const imageUrl4 = await uploadImage4(data?.image4);
  //     const imageUrl5 = await uploadImage5(data?.image5);
  //     var Data = new Object();
  //     Data.email = data?.email;
  //     Data.Category = 'User';
  //     Data.filterMaxAge = data?.filterMaxAge;
  //     Data.filterMinAge = data?.filterMinAge;
  //     Data.Name = data?.name;
  //     Data.Drink = data?.Drink;
  //     Data.Drugs = data?.Drugs;
  //     Data.Marijauna = data?.Marijauna;
  //     Data.Vape = data?.Vape;
  //     Data.Smoke = data?.Smoke;
  //     Data.Lookingfor = data?.Lookingfor;
  //     Data.PoliticalView = data?.PoliticalView;
  //     Data.Bio = data?.Bio;
  //     Data.Kids = data?.Kids;
  //     Data.PartnerGender = data?.PartnerGender;
  //     Data.Gender = data?.Gender;
  //     Data.Dates = data?.DateOfBirth;
  //     Data.image5 = imageUrl5;
  //     Data.image4 = imageUrl4;
  //     Data.image3 = imageUrl3;
  //     Data.image2 = imageUrl2;
  //     Data.image1 = imageUrl;
  //     Data.uid = CurrentUser;
  //     Data.selection1 = data?.selection1;
  //     Data.PhoneNumber = userPhoneNumber ? userPhoneNumber : null;
  //     Data.Location = {
  //       latitude: 24.9028039,
  //       longitude: 67.1145385,
  //     }
  //     Data.Education = data?.Education;
  //     Data.RelationshipType = data?.RelationshipType;
  //     Data.Relagion = data?.Relagion;

  //     // Data.filterGender = 'Female'
  //     // console.log('test data: ', Data);
  //     // return;
  //     firestore()
  //       .collection('Users').doc(CurrentUser).set({
  //         userDetails: Data
  //       }).then(() => {
  //         setUploading(false)
  //         dispatch(login(Data))
  //         ToastAndroid.show('Welcome to Honey and Dates', ToastAndroid.SHORT)
  //         navigation.navigate('QuestionCongratulationScreen')
  //       })
  //     setUploading(false)
  //   } catch (error) {
  //     setUploading(false)
  //     console.log('error test', error);
  //   }
  //   // navigation.navigate('QuestionDietScreen', { Relagion: null, ParentReligion: null, religionType: null, KosherType: null, foodtype: null, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
  // }

  // const uploadImage = async (uploadUri) => {
  //   if (uploadUri == null) {
  //     return null;
  //   }
  //   // const uploadUri = uploadUri;
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  //   // Add timestamp to File Name
  //   const extension = filename.split('.').pop();
  //   const name = filename.split('.').slice(0, -1).join('.');
  //   filename = name + Date.now() + '.' + extension;

  //   // setUploading(true);
  //   // setTransferred(0);

  //   const storageRef = storage().ref(`Users/${filename}`);
  //   const task = storageRef.putFile(uploadUri);

  //   // Set transferred state
  //   task.on('state_changed', (taskSnapshot) => {
  //     const progress = Math.round(
  //       (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
  //     );
  //     setTransferred(progress);

  //   });

  //   try {
  //     await task;

  //     const url = await storageRef.getDownloadURL();
  //     // setUploading(false);
  //     // setImage(null);
  //     // Alert.alert(
  //     //   'Image uploaded!',
  //     //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
  //     // );
  //     return url;

  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }

  // };

  // const uploadImage2 = async (uploadUri) => {
  //   if (uploadUri == null) {
  //     return null;
  //   }
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  //   // Add timestamp to File Name
  //   const extension = filename.split('.').pop();
  //   const name = filename.split('.').slice(0, -1).join('.');
  //   filename = name + Date.now() + '.' + extension;

  //   // setUploading(true);
  //   // setTransferred(0);

  //   const storageRef = storage().ref(`Users/${filename}`);
  //   const task = storageRef.putFile(uploadUri);

  //   // Set transferred state
  //   task.on('state_changed', (taskSnapshot) => {
  //     const progress = Math.round(
  //       (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
  //     );
  //     setTransferred(progress);
  //   });

  //   try {
  //     await task;

  //     const url = await storageRef.getDownloadURL();
  //     // setUploading(false);
  //     // setImage(null);
  //     // Alert.alert(
  //     //   'Image uploaded!',
  //     //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
  //     // );
  //     return url;

  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }

  // };
  // const uploadImage3 = async (uploadUri) => {
  //   if (uploadUri == null) {
  //     return null;
  //   }
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  //   // Add timestamp to File Name
  //   const extension = filename.split('.').pop();
  //   const name = filename.split('.').slice(0, -1).join('.');
  //   filename = name + Date.now() + '.' + extension;

  //   // setUploading(true);
  //   // setTransferred(0);

  //   const storageRef = storage().ref(`Users/${filename}`);
  //   const task = storageRef.putFile(uploadUri);

  //   // Set transferred state
  //   task.on('state_changed', (taskSnapshot) => {
  //     const progress = Math.round(
  //       (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
  //     );
  //     setTransferred(progress);
  //   });

  //   try {
  //     await task;

  //     const url = await storageRef.getDownloadURL();
  //     // setUploading(false);
  //     // setImage(null);
  //     // Alert.alert(
  //     //   'Image uploaded!',
  //     //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
  //     // );
  //     return url;

  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }

  // };
  // const uploadImage4 = async (uploadUri) => {
  //   if (uploadUri == null) {
  //     return null;
  //   }
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  //   // Add timestamp to File Name
  //   const extension = filename.split('.').pop();
  //   const name = filename.split('.').slice(0, -1).join('.');
  //   filename = name + Date.now() + '.' + extension;

  //   // setUploading(true);
  //   // setTransferred(0);

  //   const storageRef = storage().ref(`Users/${filename}`);
  //   const task = storageRef.putFile(uploadUri);

  //   // Set transferred state
  //   task.on('state_changed', (taskSnapshot) => {
  //     const progress = Math.round(
  //       (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
  //     );
  //     setTransferred(progress);
  //   });

  //   try {
  //     await task;

  //     const url = await storageRef.getDownloadURL();
  //     // setUploading(false);
  //     // setImage(null);
  //     // Alert.alert(
  //     //   'Image uploaded!',
  //     //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
  //     // );
  //     return url;

  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }

  // };
  // const uploadImage5 = async (uploadUri) => {
  //   if (uploadUri == null) {
  //     return null;
  //   }
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  //   // Add timestamp to File Name
  //   const extension = filename.split('.').pop();
  //   const name = filename.split('.').slice(0, -1).join('.');
  //   filename = name + Date.now() + '.' + extension;

  //   // setUploading(true);
  //   // setTransferred(0);

  //   const storageRef = storage().ref(`Users/${filename}`);
  //   const task = storageRef.putFile(uploadUri);

  //   // Set transferred state
  //   task.on('state_changed', (taskSnapshot) => {
  //     const progress = Math.round(
  //       (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
  //     );
  //     setTransferred(progress);
  //   });

  //   try {
  //     await task;

  //     const url = await storageRef.getDownloadURL();
  //     // setUploading(false);
  //     // setImage(null);
  //     // Alert.alert(
  //     //   'Image uploaded!',
  //     //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
  //     // );
  //     return url;

  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }

  // };


  const ListReligions = ({ value, setValue }) => {
    return (
      <View>
        {RelagionType.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => MoreAboutReligion(TypeTestimonial, index)}
          // onPress={() => setValue(index)}
          >
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

  const MoreAboutReligion = (TypeTestimonial, index) => {
    setSelectedCategoryIndex(index)
    // console.log(TypeTestimonial.onpress);
    if (TypeTestimonial.onpress) {
      const update = {
        ...route?.params,
        Relagion: TypeTestimonial.name,
        // selection1: route?.params?.selection1 + 1,
      }
      // navigation.navigate(TypeTestimonial.onpress, update)
    }
    // const selectitem = RelagionType[selectedCategoryIndex].name;
    // console.log(selectitem);
    // navigation.navigate(TypeTestimonial.onpress)
    // navigation.navigate('QuestionDietScreen')
    // console.log(selectedCategoryIndex);
    // if(selectedCategoryIndex == 1){
    //   {RelagionType.map(item , selectedCategoryIndex) => (
    //     navigation.navigate('QuestionMoreAboutReligionScreen', {
    //       name: restaurant.name,
    //       image: restaurant.image_url,
    //       price: restaurant.price,
    //       review: restaurant.review_count,
    //       rating: restaurant.rating,
    //       categories: restaurant.categories,
    //   )}
    // })
    // }else{
    //   console.log('select religion');
    // }
    // const selectedItem = selectedCategoryIndex;
    // {RelagionType.findIndex((item, selectedItem ) => {
    //   console.log('name : ', item.name);
    // })}
  }

  const OnChristian = () => {
    setChristian('Christian')
    setShowtick(!showtick)
    console.log(Christian);
  }
  const OnJewaish = () => {
    setJewaish('Jewaish')
    setShowtick2(!showtick2)
  }

  const toggleDropdown = () => {
    setShowOptions(!showOptions);
  };




  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.contentContainer}>

            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 20,
              height: 60,
            }}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{
                flex: 1,
                // backgroundColor: COLORS.gray2
              }}>
                <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
              </TouchableOpacity>
              <View style={{ flex: 3 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.black,
                  textAlign: 'center'
                }}>What is your religion?</Text>
              </View>
              <View style={{
                flex: 1,
                // backgroundColor: COLORS.gray2
              }}>
              </View>
            </View>

            {/* <ProgressBar progress={'42.9'} /> */}

            <View style={{
              // alignItems: 'center'
            }}>
              <ListReligions value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} />
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
              {['Public', 'Not Public'].map((item, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setReligionType(item)}
                    style={{
                      alignItems: 'center',
                      marginHorizontal: 5
                    }}>
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 40,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: COLORS.main,
                    }}>
                      <View style={{
                        padding: 5,
                        borderRadius: 40,
                        width: 13,
                        height: 13,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: religionType === item ? COLORS.main : COLORS.transparent,
                      }}></View>
                    </View>
                    <Text style={{ color: COLORS.gray, fontSize: 12 }}>{item}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <View style={{
              alignItems: 'center',
              paddingTop: 20,
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between'
              // height: '20%'
            }}>
              <CustomeButton onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light} width={width / 2.3} />
              <View style={{
                marginBottom: 0
              }}>
                <CustomeButton onpress={() => onDietScreen()}
                  title={'Continue'} width={width / 2.3} />
              </View>

            </View>
            <View style={{
              paddingTop: 5,
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


export default QuestionReligionScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignSelf: 'center',
    height: '100%'
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
    height: 45,
    // width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    backgroundColor: COLORS.transparent,
  },
})