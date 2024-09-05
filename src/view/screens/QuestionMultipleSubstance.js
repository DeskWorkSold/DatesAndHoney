import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';
import CustomeDropDwon from '../components/CustomeDropDwon';
import SubmitUserData from '../components/SubmitUserData';
import Loader from '../components/Loader';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { login } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import ProgressBar from '../components/ProgressBar';
import SVGNotify from '../../assets/notify.svg';

const { width, height } = Dimensions.get('window')

const Data = [
  {
    id: '1',
    name: 'Never',
  },
  {
    id: '2',
    name: 'Sometimes',
  },
  {
    id: '3',
    name: 'Socially',
  },
  {
    id: '3',
    name: 'Reglarly',
  },
  {
    id: '3',
    name: 'Heavily',
  },
  {
    id: '3',
    name: 'Prefer not say',
  },
]

const QuestionMultipleSubstance = ({ navigation, route }) => {
  const { image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [smokeVisibale, setSmokeVisibale] = useState(false);
  const [smokeData, setSmokeData] = useState(null);
  const [vapeVisibale, setVapeVisibale] = useState(false);
  const [vapeData, setVapeData] = useState(null);
  const [marijuanaVisibale, setMarijuanaVisibale] = useState(false);
  const [marijuanaData, setMarijuanaData] = useState(null);
  const [drugsVisibale, setDrugsVisibale] = useState(false);
  const [drugsData, setDrugsData] = useState(null);
  const [drinkVisibale, setDrinkVisibale] = useState(false);
  const [drinkData, setDrinkData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const dispatch = useDispatch();
  const userPhoneNumber = auth().currentUser.phoneNumber

  // console.log(route.params);

  const onSmokeScreen = () => {
    if (smokeData && vapeData && marijuanaData && drugsData && drinkData) {
      const update = {
        ...route?.params,
        Drink: drinkData,
        Drugs: drugsData,
        Marijauna: marijuanaData,
        Vape: vapeData,
        Smoke: smokeData,
        selection1: route?.params?.selection1 + 1,
      }
      // console.log(update);
      // return
      navigation.navigate('QuestionRelationshipScreen', update)
    }
    else {
      if (!smokeData) {
        ToastAndroid.show("Please select do you smoke!", ToastAndroid.SHORT);
      }
      else if (!vapeData) {
        ToastAndroid.show("Please select do you vape!", ToastAndroid.SHORT);
      }
      else if (!marijuanaData) {
        ToastAndroid.show("Please select do you marijuana!", ToastAndroid.SHORT);
      }
      else if (!drugsData) {
        ToastAndroid.show("Please select do you drugs!", ToastAndroid.SHORT);
      }
      else if (!drinkData) {
        ToastAndroid.show("Please select do you drink!", ToastAndroid.SHORT);
      }
    }
  }

  const SkipScreen = async () => {
    // if (smokeData && vapeData && marijuanaData && drugsData && drinkData) {
      const data = {
        ...route?.params,
        Drink: drinkData ?? null,
        Drugs: drugsData ?? null,
        Marijauna: marijuanaData ?? null,
        Vape: vapeData ?? null,
        Smoke: smokeData ?? null,
        selection1: route?.params?.selection1 + 1,
      }
      // console.log(data);

      // return
      try {
        setUploading(true)
        // const imageUrl6 = await uploadImage();
        const imageUrl = await uploadImage(data?.image1);
        const imageUrl2 = await uploadImage2(data?.image2);
        const imageUrl3 = await uploadImage3(data?.image3);
        const imageUrl4 = await uploadImage4(data?.image4);
        const imageUrl5 = await uploadImage5(data?.image5);
        var Data = new Object();
        Data.ConvertedReligion = data?.ConvertedReligion;
        Data.ConvertedReligionDetail = data?.ConvertedReligionDetail;
        Data.Dates = data?.DateOfBirth;
        Data.Drink = data?.Drink;
        Data.Drugs = data?.Drugs;
        Data.Ethnicity = data?.Ethnicity;
        Data.Gender = data?.Gender;
        Data.KosherType = data?.KosherType;
        Data.Lookingfor = data?.Lookingfor;
        Data.Marijauna = data?.Marijauna;
        Data.ParentReligion = data?.ParentReligion;
        Data.PoliticalView = data?.PoliticalView;
        Data.Relagion = data?.Relagion;
        Data.Smoke = data?.Smoke;
        Data.Vape = data?.Vape;
        Data.email = data?.email;
        Data.foodtype = data?.foodtype;
        Data.image1 = imageUrl;
        Data.image2 = imageUrl2;
        Data.image3 = imageUrl3;
        Data.image4 = imageUrl4;
        Data.image5 = imageUrl5;
        Data.Name = data?.name;
        Data.religionType = data?.religionType;
        Data.SelectionOne = data?.selection1;
        Data.GenderDetial = data?.GenderDetial;
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
      // return
      // navigation.navigate('QuestionEducationScreen', update)
    // }
    // else {
    //   if (!smokeData) {
    //     ToastAndroid.show("Please select do you smoke to skip!", ToastAndroid.SHORT);
    //   }
    //   else if (!vapeData) {
    //     ToastAndroid.show("Please select do you vape to skip!", ToastAndroid.SHORT);
    //   }
    //   else if (!marijuanaData) {
    //     ToastAndroid.show("Please select do you marijuana to skip!", ToastAndroid.SHORT);
    //   }
    //   else if (!drugsData) {
    //     ToastAndroid.show("Please select do you drugs to skip!", ToastAndroid.SHORT);
    //   }
    //   else if (!drinkData) {
    //     ToastAndroid.show("Please select do you drink!", ToastAndroid.SHORT);
    //   }
    // }
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


  const ListSmokeData = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {Data.map((item, index) => (
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
      backgroundColor: COLORS.white
    }}>
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
              flex: 4,
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SVGNotify width={20} height={20} />
              <Text style={{
                color: COLORS.black,
                marginLeft: 5,
                fontSize: 13
              }}>Phase one has been completed</Text>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: COLORS.gray2
            }}>
            </View>
          </View>
          <ProgressBar progress={'100'} />

        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.footer}>

            <CustomeDropDwon title={'Do you Smoke'} data={Data} value={smokeData} setValue={setSmokeData} valueVisibale={smokeVisibale} setValueVisibale={setSmokeVisibale} />

            <CustomeDropDwon title={'Do you use Vape?'} data={Data} value={vapeData} setValue={setVapeData} valueVisibale={vapeVisibale} setValueVisibale={setVapeVisibale} />

            <CustomeDropDwon title={'Do you use Marijauna?'} data={Data} value={marijuanaData} setValue={setMarijuanaData} valueVisibale={marijuanaVisibale} setValueVisibale={setMarijuanaVisibale} />

            <CustomeDropDwon title={'Do you Drugs?'} data={Data} value={drugsData} setValue={setDrugsData} valueVisibale={drugsVisibale} setValueVisibale={setDrugsVisibale} />

            <CustomeDropDwon title={'Do you Drink?'} data={Data} value={drinkData} setValue={setDrinkData} valueVisibale={drinkVisibale} setValueVisibale={setDrinkVisibale} />

            {/* <View style={{
              alignItems: 'center',
              paddingBottom: 50
            }}> */}

            <View style={{
              paddingTop: 10,
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
                Phase one has been completed. If you want to continue and complete phase two, click on "Continue." If you do not wish to proceed, you can skip phase two.
              </Text>
            </View>

            <View style={{
              paddingTop: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // backgroundColor:COLORS.main
            }}>
              {uploading ?
                <CustomeButton
                  title={'Please wait..'} bcolor={COLORS.white} width={width / 2.4} elevation={4} />
                :
                <CustomeButton onpress={() => SkipScreen()}
                  title={'Skip'} bcolor={COLORS.white} width={width / 2.4} elevation={4} />
              }
              <CustomeButton onpress={() => onSmokeScreen()}
                title={'Continue'} width={width / 2.4} />
            </View>

            <View style={{
              paddingTop: 5,
              // width: 310,
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10 }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>

            {/* </View> */}
          </View>

        </ScrollView>

      </View>

      <Loader uploading={uploading} modal={uploading} />
    </SafeAreaView>
  )
}

export default QuestionMultipleSubstance

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '40%',
    alignItems: 'center',
  },
  footer: {
    // height: '60%',
    marginBottom: 80,
    paddingHorizontal: 20
    // alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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