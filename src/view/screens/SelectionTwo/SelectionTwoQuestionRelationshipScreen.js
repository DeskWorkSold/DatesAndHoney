import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import SVGImg from '../../../assets/tik.svg';
import SVGImg1 from '../../../assets/arrowleft.svg';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { login } from '../../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import SVGNotify from '../../../assets/notify.svg';
import ProgressBar from '../../components/ProgressBar';
const { width, height } = Dimensions.get('window')
export const RelationshipTypeArray = [
  {
    id: '1',
    name: 'Platonic Relationship',
  },
  {
    id: '2',
    name: 'Polyamorous',
    subOptions: [
      {
        id: 1,
        name: 'Open'
      },
      {
        id: 2,
        name: 'Close'
      },
    ]
  },
  {
    id: '3',
    name: 'Monogamous',
  },
  {
    id: '4',
    name: 'Open relationship',
  },
  {
    id: '5',
    name: 'One night stand',
  },
  {
    id: '6',
    name: 'Regular FWB',
  },
  {
    id: '7',
    name: 'Life partner',
  },
  {
    id: '8',
    name: 'Short term Relationship',
  },
  {
    id: '9',
    name: 'Long term Relationship',
    subOptions: [
      {
        id: 1,
        name: 'Open'
      },
      {
        id: 2,
        name: 'Close'
      },
    ]
  },
]


const CoupleDate = [
  {
    id: '1',
    name: 'MFF',
  },
  {
    id: '2',
    name: 'MMF',
  },
  {
    id: '3',
    name: 'Not interested',
  },
]


const SelectionTwoQuestionRelationshipScreen = ({ navigation, route }) => {
  // const { Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState([]);
  const [selectedCoupleIndex, setSelectedCoupleIndex] = useState(null);
  const [subOption, setOption] = useState([]);
  const [typeOfRealtionship, setTypeOfRealtionship] = useState([]);
  // console.log(Education);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const userPhoneNumber = auth().currentUser.phoneNumber


  const handleSelection = (item) => {
    // console.log(
    //   selectedCategoryIndex.some(item => item?.name == item?.name),
    //   selectedCategoryIndex
    // );
    // return
    const isSelected = selectedCategoryIndex.some(i => i?.name === item?.name);

    if (isSelected) {
      // Item is already in the array, so remove it
      const newSelectedItems = selectedCategoryIndex.filter(i => i?.name !== item?.name);
      setSelectedCategoryIndex(newSelectedItems);

    }
    else {
      // Item is not in the array, so add it
      const newSelectedItems = [...selectedCategoryIndex, item];
      setSelectedCategoryIndex(newSelectedItems);
    }
  };

  const handleSubOption = (props, main) => {
    const isExist = selectedCategoryIndex.some(i => i?.name == main?.name);

    if (isExist) {
      const newSelectedCategoryIndex = selectedCategoryIndex.map(i => {
        if (i?.name === main?.name) {
          return {
            ...i,
            subOptions: props
          };
        }
        return i;
      });

      // Update the state with the new array
      setSelectedCategoryIndex(newSelectedCategoryIndex);
      return
      // console.log(newItem);
      // const itemExists = subOption.some(option =>
      //   option.main == newItem.main && option.subitem == newItem.subitem
      // );
      // // console.log(itemExists);
      // //       return

      // // If the item exists, remove it, otherwise add it
      // const updatedSubOption = itemExists
      //   ? subOption.filter(option =>
      //     !(option.main == newItem.main && option.subitem == newItem.subitem)
      //   )
      //   : [...subOption, newItem];

      // // Update the state with the new array
      // setOption(updatedSubOption);
      // console.log(subOption);
      // console.log(selectedCategoryIndex);
    }
    // setOption({
    //   main: TypeTestimonial,
    //   subOption: item
    // })
  }

  const handleCoupleSelection = (j, i) => {
    setSelectedCoupleIndex(i)
  }

  const handleOpen = (item) => {
    if (selectedCategoryIndex.includes(item)) {
      // Item is already in the array, so remove it
      const newSelectedItems = selectedCategoryIndex.filter((i) => i !== item);
      setSelectedCategoryIndex(newSelectedItems);

      const newSelectedItemsTwo = [...typeOfRealtionship, item];
      setTypeOfRealtionship(newSelectedItemsTwo);
    }
    // else {
    //   // Item is not in the array, so add it
    //   const newSelectedItems = [...selectedCategoryIndex, item];
    //   setSelectedCategoryIndex(newSelectedItems);
    // }
  };


  const onReligionScreen = async () => {
    // console.log(selectedCategoryIndex);
    // return
    if (selectedCategoryIndex?.length > 0 && selectedCoupleIndex !== null) {
      const selectitem = CoupleDate[selectedCoupleIndex].name;
      const update = {
        ...route?.params,
        RelationshipType: selectedCategoryIndex,
        CoupleOption: selectitem,
        selection1: route?.params?.selection1 + 1,
      }
      // const Occupation = occupation;
      // console.log(update);
      // return
      navigation.navigate('SelectionOneQuestionMultipleSubstance', update)
    }
    else {
      if (selectedCoupleIndex == null) {
        ToastAndroid.show("Please select throuple options!", ToastAndroid.SHORT);
      }
      else {
        ToastAndroid.show("Please select your relationship type you are looking for!", ToastAndroid.SHORT);
      }
    }
  }
  // const onSkip = async () => {
  //   const data = {
  //     ...route?.params,
  //     RelationshipType: typeOfRealtionship ? typeOfRealtionship : null,
  //   }
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
  //   // navigation.navigate('QuestionReligionScreen', { RelationshipType: [], Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender, })
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






  const ListRelationShips = ({ value, setValue }) => {
    return (
      <View>
        {RelationshipTypeArray.map((TypeTestimonial, index) => (
          <View key={index}>
            <TouchableOpacity
              // key={index}
              activeOpacity={0.8}
              onPress={() => handleSelection(TypeTestimonial)}
            >
              <View style={{
                // backgroundColor: value == index ? COLORS.main : COLORS.transparent,
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
                  {selectedCategoryIndex.some(item => item?.name === TypeTestimonial?.name) ? (
                    <SVGImg width={20} height={20} />
                  ) : (null
                  )}
                </View>
              </View>
            </TouchableOpacity>
            {selectedCategoryIndex.some(item => item?.name == TypeTestimonial?.name) && !['1', '3', '4', '5', '6', '7', '8'].includes(TypeTestimonial.id) && (
              <View style={{
                backgroundColor: COLORS.white,
                marginHorizontal: 20,
                // elevation:4,
                borderWidth: 1,
                borderColor: COLORS.light,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingHorizontal: 20
              }}>
                {TypeTestimonial?.subOptions?.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleSubOption(item, TypeTestimonial)}
                    style={{
                      height: 40,
                      justifyContent: 'center',
                      alignSelf: 'flex-start',
                      // backgroundColor: selectedCategoryIndex?.some(i => i?.name == TypeTestimonial?.name && i?.subOptions?.name == item?.name) ? COLORS.main : COLORS.transparent
                    }}>
                    <Text style={{ color: selectedCategoryIndex?.some(i => i?.name == TypeTestimonial?.name && i?.subOptions?.name == item?.name) ? COLORS.black : COLORS.gray, fontSize: 13, }}>{item?.name}</Text>
                  </TouchableOpacity>
                ))}

              </View>
            )}
          </View>
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
          height: 60,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 20,
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
            }}>Phase two has started.</Text>
          </View>
          <View style={{
            flex: 1,
            backgroundColor: COLORS.gray2
          }}>
          </View>
        </View>

        <ProgressBar progress={'80'} />


        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>

            <View style={{
              paddingTop: 0,
              alignItems: 'center',
              paddingHorizontal: 50,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center',
              }}>What type of relationship you are looking for?</Text>
            </View>
            <View style={{
              alignItems: 'center',
              paddingTop: 10,
            }}>
              <Text style={{
                color: COLORS.black
              }}>Select all that apply</Text>
            </View>
            <View>
              <ListRelationShips value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} />
            </View>


            <View style={{
              paddingTop: 20,
              alignItems: 'center',
              paddingHorizontal: 50,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center',
              }}>Throuple options</Text>
            </View>


            {CoupleDate.map((j, i) => (
              <TouchableOpacity

                key={i}
                activeOpacity={0.8}
                onPress={() => handleCoupleSelection(j, i)}
              >
                <View style={{
                  backgroundColor: selectedCoupleIndex == i ? COLORS.main : COLORS.transparent,
                  ...styles.NumberInput
                }}>
                  <View style={{ width: '90%' }}>
                    <Text style={{ color: COLORS.black }}>
                      {j.name}
                    </Text>
                  </View>
                  <View style={{
                    alignItems: 'flex-end'
                  }}>
                    {selectedCoupleIndex == i ? (
                      <SVGImg width={20} height={20} />
                    ) : (null
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <View style={{
              marginVertical: 50,
              alignItems: 'center',
              paddingBottom: 5,
              // height: '20%'
            }}>
              <View style={{
                marginBottom: 5
              }}>
                <CustomeButton onpress={() => onReligionScreen()}
                  title={'Continue'} width={width / 1.1} />
              </View>
              {/* {route?.params?.selection1 > 5 &&
                <CustomeButton onpress={() => onSkip()}
                  title={'Skip All'} bcolor={COLORS.light} />
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
        </ScrollView>
      </View>


      <Loader modal={uploading} uploading={uploading} />
    </SafeAreaView>
  )
}


export default SelectionTwoQuestionRelationshipScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
    // height: '100%',
    marginBottom: 100,
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