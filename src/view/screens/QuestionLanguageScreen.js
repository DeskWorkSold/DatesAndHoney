import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import SVGImg1 from '../../assets/arrowleft.svg';
import ProgressBar from '../components/ProgressBar';
import SVGNotify from '../../assets/notify.svg';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
const { width, height } = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { login } from '../../../redux/reducers/Reducers';

const TypeTestimonial = [
  {
    id: '1',
    name: 'English',
  },
  {
    id: '2',
    name: 'Spanish',
  },
  {
    id: '3',
    name: ' Italian',
  },
  {
    id: '4',
    name: 'Japanese',
  },
  {
    id: '5',
    name: 'Chinese',
  },
  {
    id: '6',
    name: 'Korean',
  },
  {
    id: '7',
    name: 'Hebrew',
  },
  {
    id: '8',
    name: 'Farsi',
  }
]



const QuestionLanguageScreen = ({ navigation, route }) => {
  // const { PartnerEthnicity, Ethnicity, PartnerBuildType, BuildType, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [search, setSearch] = useState(null);
  const [languages, setLanguages] = useState(TypeTestimonial);
  const [Templanguages, setTempLanguages] = useState(TypeTestimonial);
  const [selectedItems, setSelectedItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const dispatch = useDispatch();
  const userPhoneNumber = auth().currentUser.phoneNumber
  // console.log(route.params);

  const handleSelection = (item) => {
    const newSelectedItems = [...selectedItems, item];
    setSelectedItems(newSelectedItems);
  };

  const handleRemoval = (item) => {
    const newSelectedItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(newSelectedItems);
  };


  const onCilngyScreen = async () => {
    // onSelect(selectedItems);
    // console.log(selectedItems);
    // return
    // const FavFood = TypeTestimonial[selectedCategoryIndex].name
    // console.log(FavFood);
    if (!selectedItems.length == 0) {
      const data = {
        ...route?.params,
        languages: selectedItems,
        selection2: route?.params?.selection2 + 1,
      }
      navigation.navigate('QuestionInstagramScreen', data)
      // console.log(data);
      // navigation.navigate('QuestionInstagramScreen', { languages: selectedItems, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
    }
    else {
      ToastAndroid.show("Please select Languages!", ToastAndroid.SHORT);
    }
  }

  const onSkip = async () => {
    if (!selectedItems.length == 0) {
      const data = {
        ...route?.params,
        languages: selectedItems,
        selection2: route?.params?.selection2 + 1,
      }
      // console.log(data);
      // return
      try {
        setUploading(true)
        const imageUrl6 = await uploadImage();
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
        Data.Diet = data?.Diet
        Data.Drink = data?.Drink;
        Data.Drugs = data?.Drugs;
        Data.Education = data?.Education
        Data.Ethnicity = data?.Ethnicity;
        Data.Exercise = data?.Exercise;
        Data.ExerciseStatus = data?.ExerciseStatus;
        Data.FavFood = data?.FavFood;
        Data.Gender = data?.Gender;
        Data.GenderDetial = data?.GenderDetial;
        Data.Hieght = data?.Height;
        Data.Kids = data?.Kids;
        Data.KosherType = data?.KosherType;
        Data.Lookingfor = data?.Lookingfor;
        Data.Marijauna = data?.Marijauna;
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
    }
    else {
      ToastAndroid.show("Please select Language you speak to skip!", ToastAndroid.SHORT);
    }
    // tempArry.push(item.name)
    // console.log(tempArry);
    // navigation.navigate('QuestionInstagramScreen', { languages: null, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
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


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = languages.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      setTempLanguages(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setTempLanguages(languages);
      setSearch(text);
    }
  };

  const ListTestimonial = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <View
            key={index}
            activeOpacity={0.8}
            // onPress={() => setValue(index)}
            onPress={() => handleSelection(TypeTestimonial.name)}
            // style={styles.button}
            style={styles.itemContainer}
          >
            <TouchableOpacity
              style={{
                backgroundColor: selectedItems.includes(TypeTestimonial.name) ? COLORS.main : COLORS.transparent,
                borderWidth: selectedItems.includes(TypeTestimonial.name) ? 0 : 1,
                borderColor: selectedItems.includes(TypeTestimonial.name) ? COLORS.main : COLORS.gray,
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 5,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              onPress={() => handleSelection(TypeTestimonial.name)}>
              <View style={{
                flexDirection: 'row',
                paddingHorizontal: 5
              }}>
                <Text style={{color:COLORS.black, fontSize:12}}>{TypeTestimonial.name}</Text>
              </View>

              {selectedItems.includes(TypeTestimonial.name) ? (
                <TouchableOpacity onPress={() => handleRemoval(TypeTestimonial.name)}>
                  <Image source={cancle} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleRemoval(TypeTestimonial.name)}>
                  <Image source={require('../../assets/add2.png')} resizeMode='contain' style={{
                    color: COLORS.black
                  }} />
                </TouchableOpacity>
              )
              }
            </TouchableOpacity>
          </View >
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
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            height: 60

          }}>
            <View style={{
              flex: 1,
              // backgroundColor: COLORS.gray2
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              flex: 3,
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SVGNotify width={20} height={20} />
              <Text style={{
                color: COLORS.black,
                marginLeft: 5,
                fontSize: 12,
              }}>Phase two has been completed</Text>
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
          <View style={{
          }}>
            <Image source={require('../../assets/language.png')} resizeMode='contain' style={{
              height: height / 6,
              alignSelf: 'center'
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
              // textAlign: 'center',
            }}>What language you speak?</Text>
          </View>

          <View style={styles.NumberInput}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                marginRight: 5
              }} />
              <TextInput
                value={search}
                placeholder={'Search'}
                placeholderTextColor={COLORS.black}
                onChangeText={search => searchFilterFunction(search)
                }
                style={styles.TextInput}
              />
            </View>
          </View>


          <View style={{ paddingTop: 10, marginHorizontal: 20 }}>
            <ListTestimonial data={Templanguages} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>

          <View style={{
            paddingTop: 10,
            paddingHorizontal: 20
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
              Phase two has been completed. If you want to continue and complete phase three, click on "Continue." If you do not wish to proceed, you can skip phase three.
            </Text>
          </View>

          <View style={{
            paddingTop: 50,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
          }}>
            {uploading ?
              <CustomeButton
                title={'Please wait..'} bcolor={COLORS.white} width={width / 2.4} elevation={4} />
              :
              <View >
                <CustomeButton bcolor={COLORS.white} onpress={() => onSkip()}
                  title={'Skip'} width={width / 2.4} elevation={4} />
              </View>
            }
            <View style={{ marginBottom: 5 }}>
              <CustomeButton onpress={() => onCilngyScreen()}
                title={'Continue'} width={width / 2.4} />
            </View>

          </View>


          <View style={{
            paddingVertical: 10,
            // width: 310,
            alignItems: 'center',
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10,color:COLORS.black,  }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>


        </ScrollView>
      </View>

      <Loader modal={uploading} uploading={uploading} />
    </SafeAreaView >
  )
}

export default QuestionLanguageScreen

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
    // height: '60%',
    // alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    height: 45,
    // width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  Options: {
    marginTop: 0,
    justifyContent: 'center',
    width: 340,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    width: '88%',
    color:COLORS.black, fontSize:12
  },
  button: {
    flexDirection: 'row',
    height: 30,
    marginTop: 5,
    borderRadius: 10,
  },
  toggelbtn: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 40,
    paddingHorizontal: 5,
    justifyContent: 'space-between'
  },



  itemContainer: {
    flexDirection: 'row',
    height: 30,
    marginTop: 5,
    borderRadius: 10,
    // flexDirection: 'row',
    // // height: 30,

    // alignItems: 'center',
    // justifyContent: 'space-between',
    // // padding: 10,
    // // paddingHorizontal: 10,
    // margin: 5,
    // borderWidth: 1,
    // borderColor: '#ddd',
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
})