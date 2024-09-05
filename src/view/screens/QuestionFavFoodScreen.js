import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import SVGImg1 from '../../assets/arrowleft.svg';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { login } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import ProgressBar from '../components/ProgressBar';
const { height, width } = Dimensions.get('window')

const TypeTestimonial = [
  {
    id: '1',
    name: '#Sushi',
  },
  {
    id: '2',
    name: '#Foodie i love Everything',
  },
  {
    id: '3',
    name: '#Italian',
  },
  {
    id: '4',
    name: '#Japanese',
  },
  {
    id: '5',
    name: '#Mitterrandian',
  },
  {
    id: '5',
    name: '#I love trying new food',
  },
  {
    id: '5',
    name: '#I hate trying new food',
  },
  {
    id: '5',
    name: '#I like simple bland food',
  }
]



const QuestionFavFoodScreen = ({ navigation, route }) => {
  // const { Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [search, setsearch] = useState();
  const [FavFood, setFavFood] = useState(TypeTestimonial);
  const [tempFavFood, settempFavFood] = useState(TypeTestimonial);
  const [selectedItems, setSelectedItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
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

  const searchFilterinterest = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = FavFood.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      settempFavFood(newData);
      setsearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      settempFavFood(FavFood);
      setsearch(text);
    }
  };


  const onExersizeScreen = () => {
    // const FavFood = TypeTestimonial[selectedCategoryIndex].name
    // console.log(FavFood);
    if (!selectedItems.length == 0) {
      const update = {
        ...route?.params,
        FavFood: selectedItems,
        selection2: route?.params?.selection2 + 1,
      }
      navigation.navigate('QuestionExersizeScreen', update)
    }
    else {
      ToastAndroid.show("Please select your Food!", ToastAndroid.SHORT);
    }
  }

  const onSkip = async () => {
    const data = {
      ...route?.params,
      FavFood: null,
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
      Data.FavFood = data?.FavFood;

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
    // navigation.navigate('QuestionExersizeScreen', { FavFood: null, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
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
          <View
            key={index}
            activeOpacity={0.8}
            // onPress={() => setValue(index)}
            onPress={() => handleSelection(TypeTestimonial.name)}
            // style={styles.button}
            style={styles.itemContainer}>
            <TouchableOpacity style={{
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
          </View>
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
          <ProgressBar progress={'53.9'} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            paddingTop: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image source={require('../../assets/diet.png')} resizeMode='contain' style={{
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
            }}>Favourite Food</Text>
          </View>

          <View style={styles.NumberInput}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                marginRight: 5,
                width:20,
                height:20
              }} />
              <TextInput
                value={search}
                placeholder={'Search'}
                placeholderTextColor={COLORS.gray}
                onChangeText={search => searchFilterinterest(search)
                }
                style={styles.TextInput}
              />
            </View>
          </View>


          <View style={{ paddingTop: 10, marginHorizontal: 20 }}>
            <ListTestimonial data={tempFavFood} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>


          <View style={{
            paddingTop: 80,
            // flexDirection: 'row'
            alignItems: 'center'
          }}>
            <View style={{ marginBottom: 5 }}>
              <CustomeButton onpress={() => onExersizeScreen()}
                title={'Continue'} />
            </View>
            {/* {route?.params?.selection2 > 5 &&
              <CustomeButton onpress={() => onSkip()}
                title={'Skip All'} bcolor={COLORS.light} />
            } */}

          </View>

          <View style={{
            paddingVertical: 5,
            // width: 310,
            paddingBottom: 50
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10,color:COLORS.black, }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>

        </ScrollView>
      </View>


      <Loader modal={uploading} uploading={uploading} />
    </SafeAreaView >
  )
}

export default QuestionFavFoodScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
    height: '100%',
  },
  contentContainer: {
    // height: '40%',
    // alignItems: 'center',
  },
  footer: {
    // height: '60%',
    alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 20,
    paddingHorizontal: 20,
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
    color:COLORS.black, 
    fontSize:12
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