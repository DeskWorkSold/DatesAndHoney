import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import SVGImg1 from '../../../assets/arrowleft.svg';
import ProgressBar from '../../components/ProgressBar';
import AntDesign from 'react-native-vector-icons/AntDesign'
import SVGNotify from '../../../assets/notify.svg';
import Loader from '../../components/Loader';
import { useDispatch } from 'react-redux';
const { width, height } = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { login } from '../../../../redux/reducers/Reducers';

export const languagesArray = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ru', name: 'Russian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
  { code: 'bn', name: 'Bengali' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ur', name: 'Urdu' },
  { code: 'tr', name: 'Turkish' },
  { code: 'fa', name: 'Persian' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'si', name: 'Sinhala' },
  { code: 'pl', name: 'Polish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'el', name: 'Greek' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'cs', name: 'Czech' },
  { code: 'sk', name: 'Slovak' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'sr', name: 'Serbian' },
  { code: 'hr', name: 'Croatian' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'he', name: 'Hebrew' },
  { code: 'is', name: 'Icelandic' }
];




const SelectionTwoQuestionLanguageScreen = ({ navigation, route }) => {
  // const { PartnerEthnicity, Ethnicity, PartnerBuildType, BuildType, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [search, setSearch] = useState(null);
  const [languages, setLanguages] = useState(languagesArray);
  const [Templanguages, setTempLanguages] = useState(languagesArray);
  const [selectedItems, setSelectedItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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


  const SearchFunc = (e) => {
    if (e) {
      const newData = languages.length > 0 && languages.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = e.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setTempLanguages(newData)
      setSearch(e)
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setTempLanguages(languages)
      setSearch(e);
    }
  }



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
      // navigation.navigate('QuestionInstagramScreen', data)
      console.log(data);
      // navigation.navigate('QuestionInstagramScreen', { languages: selectedItems, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
    }
    else {
      ToastAndroid.show("Please select Languages!", ToastAndroid.SHORT);
    }
  }
  const onNext = () => {
    if (selectedItems) {
      // console.log(selectedItems?.name);
      // return
      const update = {
        ...route?.params,
        languages: selectedItems,
        selection2: route?.params?.selection2 + 1,
      }
      // // console.log(data2);
      // return
      navigation.navigate('SelectionThreeQuestionLongestRelationshipScreen', update)
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
        await firestore()
          .collection('Users').doc(CurrentUser).update({
            'userDetails.Bio': data?.Bio,
            'userDetails.BuildType': data?.BuildType,
            'userDetails.Clingy': data?.Clingy,
            'userDetails.CompanyName': data?.CompanyName,
            'userDetails.CompanyType': data?.CompanyType,
            'userDetails.CoupleOption': data?.CoupleOption,
            'userDetails.Cuddling': data?.Cuddling,
            'userDetails.Diet': data?.Diet,
            'userDetails.Education': data?.Education,
            'userDetails.Exercise': data?.Exercise,
            'userDetails.ExerciseStatus': data?.ExerciseStatus,
            'userDetails.FavFood': data?.FavFood,
            'userDetails.Hieght': data?.Height,
            'userDetails.Kids': data?.Kids,
            'userDetails.PositioninCompany': data?.PositioninCompany,
            'userDetails.RelationshipType': data?.RelationshipType,
            'userDetails.languages': data?.languages,
            'userDetails.SelectionTwo': data?.selection2,
          }).then(() => {
            setUploading(false)
            ToastAndroid.show('Phase Two Completed Succesfully!', ToastAndroid.SHORT)
            navigation.navigate('Home');
            setSelectedItems([])
          })
        // setUploading(false)
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


  // const searchFilterFunction = (text) => {
  //   // Check if searched text is not blank
  //   if (text) {
  //     const newData = languages.filter((item) => {
  //       const itemData = item.name ? item.name.toUpperCase()
  //         : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     // setFilteredDataSource(newData);
  //     setTempLanguages(newData);
  //     setSearch(text);
  //   } else {
  //     // Inserted text is blank
  //     // Update FilteredDataSource with masterDataSource
  //     setTempLanguages(languages);
  //     setSearch(text);
  //   }
  // };

  // const ListTestimonial = ({ data, value, setValue, cancle }) => {
  //   return (
  //     <View>
  //       {data.map((TypeTestimonial, index) => (
  //         <View
  //           key={index}
  //           activeOpacity={0.8}
  //           // onPress={() => setValue(index)}
  //           onPress={() => handleSelection(TypeTestimonial.name)}
  //           // style={styles.button}
  //           style={styles.itemContainer}
  //         >
  //           <TouchableOpacity
  //             style={{
  //               backgroundColor: selectedItems.includes(TypeTestimonial.name) ? COLORS.main : COLORS.transparent,
  //               borderWidth: selectedItems.includes(TypeTestimonial.name) ? 0 : 1,
  //               borderColor: selectedItems.includes(TypeTestimonial.name) ? COLORS.main : COLORS.gray,
  //               borderRadius: 10,
  //               paddingHorizontal: 15,
  //               paddingVertical: 5,
  //               alignItems: 'center',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between'
  //             }}
  //             onPress={() => handleSelection(TypeTestimonial.name)}>
  //             <View style={{
  //               flexDirection: 'row',
  //               paddingHorizontal: 5
  //             }}>
  //               <Text style={{ color: COLORS.gray }}>{TypeTestimonial.name}</Text>
  //             </View>

  //             {selectedItems.includes(TypeTestimonial.name) ? (
  //               <TouchableOpacity onPress={() => handleRemoval(TypeTestimonial.name)}>
  //                 <Image source={cancle} />
  //               </TouchableOpacity>
  //             ) : (
  //               <TouchableOpacity onPress={() => handleRemoval(TypeTestimonial.name)}>
  //                 <Image source={require('../../../assets/add2.png')} resizeMode='contain' style={{
  //                   color: COLORS.black
  //                 }} />
  //               </TouchableOpacity>
  //             )
  //             }
  //           </TouchableOpacity>
  //         </View >
  //       ))}

  //     </View>
  //   )
  // }
  const onSelectCategory = (props) => {
    if (setSelectedItems) {
      if (selectedItems?.includes(props?.name)) {
        setSelectedItems((prevValue) => prevValue.filter((item) => item !== props?.name));
      } else {
        setSelectedItems([...selectedItems, props?.name]);
      } 
    }
    setIsVisible(false);
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
        </View>
        <ProgressBar progress={'80'} />
        <View style={{
          height: '80%'
        }}>
          <View style={{
          }}>
            <Image source={require('../../../assets/language.png')} resizeMode='contain' style={{
              height: height / 6,
              alignSelf: 'center'
            }} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingHorizontal: 40,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>What language you speak?</Text>
          </View>

          <View style={styles.NumberInput}>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={styles.TextInput}>
                <Text style={{
                  color: selectedItems?.name ? COLORS.black : COLORS.gray
                }}>
                  {selectedItems?.length > 0 ? selectedItems?.join(', ') : 'Select Language'}
                </Text>
              </View>
              <AntDesign name={isVisible ? 'up' : 'down'} color={COLORS.black} size={20} />
            </TouchableOpacity>
          </View>

          {isVisible &&
            <View style={{
              marginHorizontal: 20,
              borderWidth: 1,
              maxHeight: 300,
              borderColor: COLORS.gray2,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              paddingHorizontal: 10
            }}>
              <TextInput
                placeholder={"Search"}
                value={search}
                // disabled={true}
                onChangeText={(text) => SearchFunc(text)}
                keyboardType="default"
                placeholderTextColor={COLORS.gray}
                // autoCapitalize="none"    
                // autoCompleteType="email"
                // error={!isEmailValid}
                outlineColor={COLORS.main}
                activeOutlineColor={COLORS.main}
                style={{
                  color: COLORS.black,
                  backgroundColor: COLORS.light,
                  // height: 35,
                  marginTop: 5,
                  fontSize: 12,
                  borderRadius: 5
                }}
              />
              <ScrollView showsVerticalScrollIndicator={false}>
                {Templanguages.length > 0 && Templanguages?.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => onSelectCategory(item)}
                    style={{
                      // height: 30,
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderColor: COLORS.gray2,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      backgroundColor: selectedItems?.includes(item?.name) ? COLORS.mainlight : COLORS.transparent
                    }}>
                    <Text style={{
                      color: COLORS.black,
                      // backgroundColor: COLORS.yellow,
                      fontSize: 12,
                      textAlign: 'left',
                      alignSelf: 'flex-start'
                    }}>
                      {item?.name}
                    </Text>
                    <Text style={{
                      color: COLORS.black,
                      // backgroundColor: COLORS.yellow,
                      fontSize: 12,
                      textAlign: 'left',
                      alignSelf: 'flex-start'
                    }}>
                      {item?.code}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

            </View>}



        </View>
        <View style={{
          height: '20%',
          // backgroundColor:COLORS.gray
        }}>

          <View style={{
            // paddingTop: 50,
            alignItems: 'center',
          }}>
            {uploading ?
              <CustomeButton
                title={'Please wait..'} width={width / 1.1} />
              :
              <View >
                <CustomeButton onpress={() => onNext()}
                  title={'Continue'} width={width / 1.1} />
              </View>
            }

          </View>


          <View style={{
            paddingVertical: 5,
            // width: 310,
            alignItems: 'center',
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10, color: COLORS.gray }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>

      </View>

      <Loader modal={uploading} uploading={uploading} />
    </SafeAreaView >
  )
}

export default SelectionTwoQuestionLanguageScreen

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
    paddingLeft: 10,
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
    color: COLORS.black
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