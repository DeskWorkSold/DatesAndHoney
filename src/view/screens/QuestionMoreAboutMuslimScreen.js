import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
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


const ParentType = [
  {
    id: '1',
    name: 'Mom born Muslim',
  },
  {
    id: '2',
    name: 'Dad born Muslim',
  },
  {
    id: '3',
    name: 'Both born Muslim',
  },
]

export const detailReligion = [
  {
    id: '1',
    name: 'Sunni - Hanafi',
  },
  {
    id: '2',
    name: 'Sunni - Shafi',
  },
  {
    id: '3',
    name: 'Sunni - Maliki',
  },
  {
    id: '4',
    name: 'Sunni - hanbali',
  },
  {
    id: '5',
    name: 'Shia',
  },
  {
    id: '6',
    name: 'Ibadi',
  },
  {
    id: '7',
    name: 'Other',
  },
  {
    id: '8',
    name: 'Not Sure',
  }

];

export const KosherTypeReligion = [
  {
    id: '1',
    name: 'Keeps Halal',
  }, {
    id: '2',
    name: 'Sometimes Halal',

  }, {
    id: '3',
    name: 'Never Halal',
  }
];



const QuestionMoreAboutMuslimScreen = ({ navigation, route }) => {
  const { Relagion, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  // console.log(Relagion);
  const [selectedParentIndex, setSelectedParentIndex] = useState(null);
  const [selectedReligionIndex, setSelectedReligionIndex] = useState(null);
  const [selectedFoodIndex, setSelectedFoodIndex] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const userPhoneNumber = auth().currentUser.phoneNumber
  // console.log(DateOfBirth);


  const onDietScreen = () => {
    // console.log(selectedParentIndex, selectedReligionIndex, selectedFoodIndex);
    // return
    if (selectedParentIndex !== null && selectedReligionIndex !== null && selectedFoodIndex !== null) {
      const ParentReligion = ParentType[selectedParentIndex].name
      const religionType = detailReligion[selectedReligionIndex].name;
      const foodtype = KosherTypeReligion[selectedFoodIndex].name;
      const update = {
        ...route?.params,
        ParentReligion: ParentReligion,
        religionType: religionType,
        KosherType: null,
        foodtype: foodtype,
        // selection1: route?.params?.selection1 + 1,
      }
      navigation.navigate('QuestionTypeofRelationScreen', update)
    }
    else {
      ToastAndroid.show("Please select your Religion Details!", ToastAndroid.SHORT);
    }
  }

  const onSkip = async () => {
    const data = {
      ...route?.params,
      ParentReligion: null,
      religionType: null,
      KosherType: null,
      foodtype: null,
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
    // navigation.navigate('QuestionConvertedReligion', { ParentReligion: null, religionType: null, KosherType: null, foodtype: null, Relagion: Relagion, ParentReligion: null, religionType: null, KosherType: null, foodtype: null, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
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

  const onJewaish = () => {
    setShowtick(!showtick)
  }
  const onJewaish2 = () => {
    setShowtick2(!showtick2)
  }
  const toggleDropdown = () => {
    setShowOptions(!showOptions);
  };
  const toggleDropdown2 = () => {
    setShowOptions2(!showOptions2);
  };


  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View style={{
          backgroundColor: COLORS.white,
          // elevation:4,
          borderWidth: 1,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderColor: COLORS.light,
          marginHorizontal: 20,
          width: 340,
          alignSelf: 'center'
        }}>
          {detailReligion.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setSelectedReligionIndex(index)}
            >
              <View style={styles.MoreaboutReligion}>

                <View style={{ width: '90%' }}>
                  <Text style={{ color: COLORS.black }}>{item.name}</Text>
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  {selectedReligionIndex == index ? (
                    <SVGImg width={20} height={20} />
                  ) : (<View></View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };



  const renderDropdown2 = () => {
    if (showOptions2) {
      return (
        <View style={{
          backgroundColor: COLORS.white,
          // elevation:4,
          borderWidth: 1,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderColor: COLORS.light,
          marginHorizontal: 20,
          width: 340,
          alignSelf: 'center',
        }}>
          {KosherTypeReligion.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setSelectedFoodIndex(index)}
            >
              <View style={styles.MoreaboutReligion}>

                <View style={{ width: '90%' }}>
                  <Text style={{ color: COLORS.black }}>{item.name}</Text>
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  {selectedFoodIndex == index ? (
                    <SVGImg width={20} height={20} />
                  ) : (<View></View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

  const ParentReligion = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {ParentType.map((item, index) => (
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
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white,
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.contentContainer}>

            <View style={{
              // paddingTop: 40,
              paddingHorizontal: 10,
              height: 60,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{
                flex: 1,
                // backgroundColor: COLORS.gray2
              }}>
                <SVGImg1 width={20} height={20}  />
              </TouchableOpacity>
              <View style={{ flex: 3 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.black,
                  textAlign: 'center'
                }}>More About Religion</Text>
              </View>
              <View style={{
                flex: 1,
                // backgroundColor: COLORS.gray2
              }}>
              </View>
            </View>

            {/* <ProgressBar progress={'57.3'} /> */}
            <View style={{
              alignSelf: 'center'
            }}>
              <ParentReligion data={ParentType} value={selectedParentIndex}
                setValue={setSelectedParentIndex} cancle={require('../../assets/cross.png')} />
            </View>

            {/* <TouchableOpacity activeOpacity={0.8} onPress={onJewaish}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  Is your mom born Muslim
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {showtick && (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                )}
              </View>
            </View>
          </TouchableOpacity>


          <TouchableOpacity activeOpacity={0.8} onPress={onJewaish2}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>Is your dad born Muslim</Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {showtick2 && (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                )}
              </View>
            </View>
          </TouchableOpacity> */}


            <TouchableOpacity onPress={toggleDropdown}>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Type</Text>
              </View>
            </TouchableOpacity>

            {renderDropdown()}


            <TouchableOpacity onPress={toggleDropdown2}>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Food Type</Text>
              </View>
            </TouchableOpacity>

            {renderDropdown2()}

            {/* <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Muslim</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Hinduism</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Buddhism</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Chainese traditional religion</Text>
              </View>
            </TouchableOpacity> */}


            <View style={{
              marginTop: '30%',
              alignItems: 'center',
              paddingBottom: 5,
            }}>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onDietScreen()}
                  title={'Continue'} />
              </View>
              {/* <CustomeButton onpress={() => onSkip()}
                title={'Skip All'} bcolor={COLORS.light} /> */}

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
        </ScrollView>

      </View>



      <Loader modal={uploading} uploading={uploading} />
    </SafeAreaView>
  )
}


export default QuestionMoreAboutMuslimScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '80%',
  },
  footer: {
    // alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    backgroundColor: COLORS.transparent,
  },
  MoreaboutReligion: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    // paddingHorizontal: 20,
    height: 45,
    // width: 340,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light
  }
})