import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import SVGImg from '../../../assets/tik.svg';
import SVGImg1 from '../../../assets/arrowleft.svg';
import { useDispatch } from 'react-redux';  
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { login } from '../../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import ProgressBar from '../../components/ProgressBar';
const { height, width } = Dimensions.get('window')

const dietData = [
  {
    id: '1',
    name: 'Vegitarian',
  },
  {
    id: '2',
    name: 'Pescatarian',
  },
  {
    id: '3',
    name: 'Very healthy',
  },
  {
    id: '4',
    name: 'Semi healthy',
  },
  {
    id: '5',
    name: 'Non-GMO Only',
  },
  {
    id: '6',
    name: 'Organic only',
  },
  {
    id: '7',
    name: 'I love to eat Everything',
  },
  {
    id: '8',
    name: 'Other',
  }
]



const SelectionTwoQuestionDietScreen = ({ navigation, route }) => {
  const { Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  // console.log(KosherType, DateOfBirth);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState([]);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const userPhoneNumber = auth().currentUser.phoneNumber


  const onPartnerDietScreen = () => {
    if (selectedCategoryIndex?.length > 0) {
      const update = {
        ...route?.params,
        Diet: selectedCategoryIndex,
        selection2: route?.params?.selection2 + 1,
      }
      navigation.navigate('SelectionTwoQuestionFavFoodScreen', update)
    }
    else {
      ToastAndroid.show("Please select your Diet!", ToastAndroid.SHORT);
    }
  }

  const onSkip = async () => {
    const data = {
      ...route?.params,
      Diet: null,
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
    // navigation.navigate('QuestionFavFoodScreen', { Diet: null, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
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

  const ListEducation = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => handleSelection(TypeTestimonial.name)}>
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
                {selectedCategoryIndex.includes(TypeTestimonial.name) ? (
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
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 20,
            height: 60,
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
          <ProgressBar progress={'46.2'} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            paddingTop: 0,
            alignItems: 'center'
          }}>
            <Image source={require('../../../assets/diet.png')} resizeMode='contain' style={{
              height: height / 6,
            }} />
          </View>


          <View style={{
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Diet</Text>
          </View>
          <View style={{
            alignItems: 'center',
            paddingBottom: 10,
          }}>
            <Text style={{
              color: COLORS.black
            }}>(click all that apply)</Text>
          </View>


          <View style={{
            alignItems: 'center'
          }}>
            <ListEducation data={dietData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingBottom: 15
          }}>
            <View style={{
              paddingTop: 50,
            }}>
              <View style={{
                marginBottom: 5
              }}>
                <CustomeButton onpress={() => onPartnerDietScreen()}
                  title={'Continue'} width={width /1.1} />
              </View>
              {/* {route?.params?.selection2 > 5 &&
                <CustomeButton onpress={() => onSkip()}
                  title={'Skip All'} bcolor={COLORS.light} />
              } */}
            </View>

            <View style={{
              paddingTop: 5,
              width: 310,
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10,color:COLORS.gray }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>


      <Loader modal={uploading} uploading={uploading} />
    </SafeAreaView>
  )
}

export default SelectionTwoQuestionDietScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center'
    height:'100%',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignItems: 'center',
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
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})