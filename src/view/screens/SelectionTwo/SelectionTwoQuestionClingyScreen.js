import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator, Modal, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useDispatch } from 'react-redux';
import { login } from '../../../../redux/reducers/Reducers';
import SVGImg from '../../../assets/tik.svg';
const { height, width } = Dimensions.get('window');
import SVGImg1 from '../../../assets/arrowleft.svg';
import ProgressBar from '../../components/ProgressBar';
import Loader from '../../components/Loader';


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



const SelectionTwoQuestionClingyScreen = ({ navigation, route }) => {
  const { Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;



  // console.log(email, Cuddling, InLife, InBed, MovieType, NextLongestRelationship, LongestRelationship, DealBreaker, DealMakers,  PartnerBuildType, BuildType, EyeColor, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, languages,  ExerciseStatus, Exercise, FavFood, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername);
  // console.log(Nature,PartnerNature);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [checked, setChecked] = React.useState(''); //initial choice
  const [clingy, setclingy] = useState('');
  const [modal, setModal] = useState(false);

  const CurrentUser = auth().currentUser.uid;
  const userPhoneNumber = auth().currentUser.phoneNumber
  // const [image, setImage] = useState(image1);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();



  const AddToRedux = (Data) => {
    // console.log('Redux data', Data);
    dispatch(login(Data))
  }

  const onCongratsScreen = async () => {
    if (clingy) {
      const data = {
        ...route?.params,
        Clingy: clingy,
        selection3: route?.params?.selection3 + 1,
      }
      // console.log(update, '===');
      try {
        setUploading(true)
        await firestore()
          .collection('Users').doc(CurrentUser).update({
            'userDetails.Clingy': data?.Clingy,
            'userDetails.Cuddling': data?.Cuddling,
            'userDetails.DealBreaker': data?.DealBreaker,
            'userDetails.DealMakers': data?.DealMakers,
            'userDetails.InFiveYear': data?.InFiveYear,
            'userDetails.InTenYear': data?.InTenYear,
            'userDetails.InstaUsername': data?.InstaUsername,
            'userDetails.SelectionThree': data?.selection3,
            'userDetails.TotalSwipes.Swipe': 0,
          }).then(() => {
            setUploading(false)
            // ToastAndroid.show('Phase Two Completed Succesfully!', ToastAndroid.SHORT)
            navigation.navigate('Home');
            // setSelectedItems([])
          })
        // setUploading(false)
      } catch (error) {
        setUploading(false)
        ToastAndroid.show('Error : ' + error, ToastAndroid.SHORT)
        console.log('error test', error);
      }
      // navigation.navigate('SelectionThreeQuestionProfessionallyScreen', update)
      // return;
      // try {
      //   setModal(true)
      //   setUploading(true)
      //   const imageUrl = await uploadImage();
      //   const imageUrl2 = await uploadImage2();
      //   const imageUrl3 = await uploadImage3();
      //   const imageUrl4 = await uploadImage4();
      //   const imageUrl5 = await uploadImage5();
      //   // const imageUrl6 = await uploadImage();
      //   var Data = new Object();
      //   Data.email = email;
      //   Data.Category = 'User';
      //   Data.filterMaxAge = filterMaxAge;
      //   Data.filterMinAge = filterMinAge;
      //   Data.ConvertedReligion = ConvertedReligion;
      //   Data.ConvertedReligionDetail = ConvertedReligionDetail;
      //   Data.languages = languages;
      //   Data.PartnerMinHeightType = PartnerMinHeightType;
      //   Data.PartnerMaxHeightType = PartnerMaxHeightType;
      //   Data.HairColor = HairColor;
      //   Data.EyeColor = EyeColor;
      //   Data.Clingy = clingy;
      //   Data.Cuddling = Cuddling;
      //   Data.InLife = InLife;
      //   Data.InBed = InBed;
      //   Data.MovieType = MovieType;
      //   Data.NextLongestRelationship = NextLongestRelationship;
      //   Data.LongestRelationship = LongestRelationship;
      //   Data.DealBreaker = DealBreaker;
      //   Data.DealMakers = DealMakers;
      //   Data.PartnerBuildType = PartnerBuildType;
      //   Data.BuildType = BuildType;
      //   Data.PartnerMaxHeight = PartnerMaxHeight;
      //   Data.PartnerMinHeight = PartnerMinHeight;
      //   Data.Hieght = Height;
      //   Data.Education = Education;
      //   Data.RelationshipType = RelationshipType;
      //   Data.Relagion = Relagion;
      //   Data.KosherType = KosherType ? KosherType : null;
      //   Data.foodtype = foodtype;
      //   Data.religionType = religionType;
      //   Data.ParentReligion = ParentReligion;
      //   Data.Diet = Diet;
      //   Data.FavFood = FavFood;
      //   Data.Exercise = Exercise;
      //   Data.ExerciseStatus = ExerciseStatus;
      //   Data.Name = name;
      //   Data.InstaUsername = InstaUsername;
      //   Data.Drink = Drink;
      //   Data.Drugs = Drugs;
      //   Data.Marijauna = Marijauna;
      //   Data.Vape = Vape;
      //   Data.Smoke = Smoke;
      //   Data.Lookingfor = Lookingfor;
      //   Data.Nature = IntroandExtro;
      //   Data.PartnerNature = PartnerNature;
      //   Data.PoliticalPartnerView = PoliticalPartnerView;
      //   Data.PoliticalView = PoliticalView;
      //   Data.Experince = Experince;
      //   Data.InTenYear = InTenYear;
      //   Data.Bio = Bio;
      //   Data.Kids = Kids;
      //   Data.PartnerGender = PartnerGender;
      //   Data.Gender = Gender;
      //   Data.Dates = DateOfBirth;
      //   Data.image5 = imageUrl5;
      //   Data.image4 = imageUrl4;
      //   Data.image3 = imageUrl3;
      //   Data.image2 = imageUrl2;
      //   Data.image1 = imageUrl;
      //   Data.CompanyType = CompanyType;
      //   Data.PositioninCompany = PositioninCompany;
      //   Data.CompanyName = CompanyName;
      //   Data.uid = CurrentUser
      //   Data.PhoneNumber = userPhoneNumber ? userPhoneNumber : null;
      //   Data.Location = {
      //     latitude: 24.9028039,
      //     longitude: 67.1145385,
      //   }
      //   // Data.filterGender = 'Female'
      //   // console.log('test data: ', Data);
      //   // return;
      //   // console.log(CurrentUser);
      //   firestore()
      //     .collection('Users').doc(CurrentUser).set({
      //       userDetails: Data
      //     }).then(() => {
      //       // redux
      //       AddToRedux(Data)
      //       ToastAndroid.show('Welcome to Honey and Dates', ToastAndroid.SHORT)
      //       navigation.navigate('QuestionCongratulationScreen')
      //       setModal(false)
      //       setUploading(false)
      //     })
      //   // setImage(null)
      //   setUploading(false)
      // } catch (error) {
      //   console.log('error test', error);
      // }
    }
    else {
      ToastAndroid.show("Please select Clingy Type!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    console.log('hello');
    // navigation.navigate('QuestionOccupationScreen', { Clingy: null, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
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

  const uploadImage2 = async () => {
    if (image2 == null) {
      return null;
    }
    const uploadUri = image2;
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
  const uploadImage3 = async () => {
    if (image3 == null) {
      return null;
    }
    const uploadUri = image3;
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
  const uploadImage4 = async () => {
    if (image4 == null) {
      return null;
    }
    const uploadUri = image4;
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
  const uploadImage5 = async () => {
    if (image5 == null) {
      return null;
    }
    const uploadUri = image5;
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
    setclingy(EducationData[index]?.name)
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
              flex: 4,
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image source={require('../../../assets/notify.png')} resizeMode='contain'
                style={{
                  width: 15,
                  height: 15,
                }} />
              <Text style={{
                color: COLORS.black,
                marginLeft: 5,
                fontSize: 12
              }}>Phase three hase been competed</Text>
            </View>
            <View style={{
              flex: 1,
            }}>
            </View>
          </View>
          <ProgressBar progress={'100'} />

          <View style={{
            alignItems: 'center',
            paddingHorizontal: 60,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Are you Clingy?
            </Text>
          </View>

          <View style={{
            // alignSelf: 'center'
          }}>
            <ListEducation data={EducationData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Other </Text>
              <View style={styles.NumberInput2}>
                <TextInput
                  value={clingy}
                  placeholderTextColor={COLORS.gray}
                  placeholder={'Write here'}
                  onChangeText={clingy => setclingy(clingy)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
            <Text style={{ color: COLORS.green, fontSize: 12, }}>Attention!</Text>
            <View style={{ paddingTop: 0, paddingRight: 50 }}>
              <Text style={{
                fontSize: 12,
                color: COLORS.gray
              }}>Being clingy is not a Bad thing it's
                preference Some couples Love it
                Some hate it. we Only use it for
                Preference in concierge service
                responses are Not public!</Text>
            </View>
          </View>


          <View style={{
            alignItems: 'center',
            paddingBottom: 5,
            marginTop: '15%'
          }}>
            <View style={{ marginHorizontal: 5 }}>
              {uploading ?
                <CustomeButton title={'Please wait...'} width={width / 1.1} />
                :
                <CustomeButton onpress={() => onCongratsScreen()}
                  title={'Complete'} width={width / 1.1} />
              }
            </View>
            {/* {route.params?.selection2 > 5 &&
              <View style={{ marginVertical: 5 }}>
                <CustomeButton
                  title={'Skip All'} bcolor={COLORS.light} onpress={() => onSkip()} />
              </View>
            } */}

            <View style={{
              paddingTop: 5,
              width: 310,
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10, color: COLORS.gray }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>
          </View>






        </View>
      </View>
      <Loader uploading={uploading} modal={uploading} />
    </SafeAreaView>
  )
}


export default SelectionTwoQuestionClingyScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignItems: 'center',
    height: '80%'
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
    // width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  NumberInput2: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
    // width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    color: COLORS.black
  },
})