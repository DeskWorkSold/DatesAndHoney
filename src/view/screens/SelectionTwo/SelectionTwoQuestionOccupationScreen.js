import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react';
import COLORS from '../../../consts/Colors';
import CustomeButton from '../../components/CustomeButton';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import SVGImg1 from '../../../assets/arrowleft.svg';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { login } from '../../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import ProgressBar from '../../components/ProgressBar';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window')

const TypeTestimonial = [
  {
    id: '1',
    name: '#agriculture',
  },
  {
    id: '2',
    name: '#Social Media',
  },
  {
    id: '3',
    name: '#Business',
  },
  {
    id: '4',
    name: '#Personal Business',
  }
]

const PositionTestimonial = [
  {
    id: '1',
    name: '#CEO',
  },
  {
    id: '2',
    name: '#Worker',
  },
  {
    id: '3',
    name: '#Head of team',
  },
  {
    id: '4',
    name: '#Manager',
  }
]


const SelectionTwoQuestionOccupationScreen = ({ navigation, route }) => {
  const { Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [occupation, setoccupation] = useState(null);
  const [typeTestimonial, setTypeTestimonial] = useState(TypeTestimonial);
  const [temptypeTestimonial, setTempTypeTestimonial] = useState(TypeTestimonial);
  const [type, setType] = useState(null);
  const [position, setposition] = useState(null);
  const [positionTestimonial, setPositionTestimonial] = useState(PositionTestimonial);
  const [temppositionTestimonial, setTempPositionTestimonial] = useState(PositionTestimonial);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedPositionIndex, setSelectedPositionIndex] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const userPhoneNumber = auth().currentUser.phoneNumber
  // console.log(route.params);

  const searchFilterType = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = typeTestimonial.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      setTempTypeTestimonial(newData);
      setType(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setTempTypeTestimonial(typeTestimonial);
      setType(text);
    }
  };
  const searchFilterPosition = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = positionTestimonial.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      setTempPositionTestimonial(newData);
      setposition(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setTempPositionTestimonial(positionTestimonial);
      setposition(text);
    }
  };


  const onInterestScreen = () => {
    // QuestionInterestScreen
    // console.log(CompanyType,PositioninCompany);
    if (selectedCategoryIndex !== null && selectedPositionIndex !== null) {
      const CompanyType = TypeTestimonial[selectedCategoryIndex].name;
      const PositioninCompany = PositionTestimonial[selectedPositionIndex].name;
      // const Occupation = occupation;
      const update = {
        ...route?.params,
        CompanyName: occupation,
        PositioninCompany: PositioninCompany,
        CompanyType: CompanyType,
        selection2: route?.params?.selection2 + 1,
      }
      navigation.navigate('SelectionTwoQuestionHeightScreen', update)
    }
    else {
      if (selectedCategoryIndex == null) {
        ToastAndroid.show("Please select company type!", ToastAndroid.SHORT);
      }
      else if (selectedPositionIndex == null) {
        ToastAndroid.show("Please select company position!", ToastAndroid.SHORT);
      }
    }
  }

  const onSkip = () => {
    const update = {
      ...route?.params,
      CompanyName: null,
      PositioninCompany: null,
      CompanyType: null,
      selection2: route?.params?.selection2 + 1,
    }
    navigation.navigate('SelectionTwoQuestionHeightScreen', update)
  }
  // console.log(route?.params);

  const SkipScreen = async () => {
    const data = {
      ...route?.params,
      CompanyName: null,
      PositioninCompany: null,
      CompanyType: null,
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
    // navigation.navigate('QuestionInterestScreen', { CompanyName: null, email: email, PositioninCompany: null, CompanyType: null, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
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



  const ListTestimonial = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}
            style={styles.button}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              borderWidth: value == index ? 0 : 1,
              borderColor: value == index ? COLORS.main : COLORS.gray,
              // ...styles.toggelbtn
              borderRadius: 10,
              paddingHorizontal: 10,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ color: COLORS.gray }}>{TypeTestimonial.name}</Text>
              </View>
              <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                {value == index ? (
                  <Image source={cancle} />
                ) : (
                  <Image source={require('../../../assets/add2.png')} resizeMode='contain' />
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
        <ProgressBar progress={'45'} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            paddingTop: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image source={require('../../../assets/occupassion.png')} resizeMode='contain' style={{
              height: height / 6,
            }} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Occupation</Text>
          </View>

          <View style={{
            // alignItems: 'center',
            // paddingHorizontal:20
          }}>
            <View style={styles.Options}>
              <Text style={{ color: COLORS.gray }}>(Optionals)</Text>
            </View>
            <View style={{
              alignItems: 'center',
            }}>
              <View style={[styles.NumberInput, { marginTop: -0, }]}>
                <TextInput
                  value={occupation}
                  placeholder={'Company name or type'}
                  placeholderTextColor={COLORS.gray}
                  // error={inputfirstName}
                  onChangeText={occupation => setoccupation(occupation)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
            <View style={{
              alignItems: 'center',
            }}>
              <View style={styles.NumberInput}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image source={require('../../../assets/search.png')} resizeMode='contain' style={{
                    marginRight: 5,
                    width: 20,
                    height: 20
                  }} />
                  <TextInput
                    value={type}
                    placeholder={'Type of Company'}
                    placeholderTextColor={COLORS.gray}
                    onChangeText={type => searchFilterType(type)
                    }
                    style={styles.TextInput}
                  />
                </View>
                {/* <View style={{
                  alignItems: 'flex-end'
                }}>
                  <Image source={require('../../assets/add.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                </View> */}
              </View>
            </View>

            <View style={{
              paddingHorizontal: 20,
            }}>
              <ListTestimonial data={temptypeTestimonial} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
            </View>


            <View style={{
              alignItems: 'center',
            }}>
              <View style={styles.NumberInput}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image source={require('../../../assets/search.png')} resizeMode='contain' style={{
                    marginRight: 5,
                    width: 20,
                    height: 20
                  }} />
                  <TextInput
                    value={position}
                    placeholder={'Position in Company'}
                    placeholderTextColor={COLORS.gray}
                    onChangeText={position => searchFilterPosition(position)
                    }
                    style={styles.TextInput}
                  />
                </View>
                {/* <View style={{
                  alignItems: 'flex-end'
                }}>
                  <Image source={require('../../assets/add.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                </View> */}
              </View>
            </View>

            <View style={{
              paddingHorizontal: 20,
            }}>
              <ListTestimonial data={temppositionTestimonial} value={selectedPositionIndex}
                setValue={setSelectedPositionIndex} cancle={require('../../../assets/cross.png')} />
            </View>


            <View style={{
              paddingTop: 50,
              paddingBottom: 40,
              // alignItems: 'center'
              paddingHorizontal: 10,
            }}>
              <View style={{ marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <CustomeButton onpress={() => onInterestScreen()}
                  title={'Continue'} width={width / 2.2} />
                <CustomeButton onpress={() => onSkip()}
                  title={'Skip'} bcolor={COLORS.light} width={width / 2.2} />
              </View>
              {/* {route?.params?.selection2 > 4 &&
                <View style={{ marginHorizontal: 5 }}>
                  <CustomeButton onpress={() => SkipScreen()}
                    title={'Skip All'} bcolor={COLORS.light} />
                </View>
              } */}
              <View style={{
                paddingTop: 5,
              }}>
                <Text style={{ textAlign: 'center', fontSize: 10, color: COLORS.gray }}>
                  By continue you agree our Terms and Privacy Policy.
                </Text>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>


      <Loader modal={uploading} uploading={uploading} />
    </SafeAreaView >
  )
}

export default SelectionTwoQuestionOccupationScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: '100%',
  },
  contentContainer: {
    // height: '40%',
    alignItems: 'center',
  },
  footer: {
    height: '60%',
    alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: width / 1.1,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  Options: {
    marginTop: 0,
    // justifyContent: 'center',
    paddingLeft: 20,
    width: 340,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    width: '88%'
  },
  toggelbtn: {
    flexDirection: 'row',
    height: 30,
    width: 180,
    marginVertical: 5,
    // backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  button: {
    flexDirection: 'row',
    height: 30,
    marginTop: 5,
    borderRadius: 10,
  },
})