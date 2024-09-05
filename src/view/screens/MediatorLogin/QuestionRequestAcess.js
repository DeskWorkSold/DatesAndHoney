import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { mediatorLogin } from '../../../../redux/reducers/Reducers';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
const { height, width } = Dimensions.get('window');


const RelationshipTypes = [
  {
    id: '1',
    name: 'Talent agency/Influencer',
    onpress: 'QuestionRequestAcessOther'
  },
  {
    id: '2',
    name: 'Match Coordinator',
  },
]



const MediatorQuestionRequestAcess = ({ navigation, route }) => {
  const { image1, image2, image3, image4, image5, organization, HaveKids, relationshipStatus, bio, email, DateOfBirth, name } = route.params;
  // console.log(image1, image2, image3, image4, image5, organization, HaveKids, relationshipStatus, bio, email, DateOfBirth, name);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState();
  const [uploading, setUploading] = useState(0);
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser;
  const dispatch = useDispatch();
  // console.log(Education);

  const onReligionScreen = async () => {
    const selectitem = RelationshipTypes[selectedCategoryIndex]?.name;
    const category = 'Mediator'
    if (!selectitem == '') {
      // console.log(selectitem);
      if (selectitem == 'Match Coordinator') {
        try {
          setUploading(true)
          const imageUrl = await uploadImage();
          const imageUrl2 = await uploadImage2();
          const imageUrl3 = await uploadImage3();
          const imageUrl4 = await uploadImage4();
          const imageUrl5 = await uploadImage5();
          var Data = new Object();
          Data.Category = 'Mediator';
          Data.MediatorId = 2;
          Data.PanelAccess = false;
          Data.MediatorType = selectitem;
          Data.email = email;
          Data.image1 = imageUrl;
          Data.image2 = imageUrl2;
          Data.image3 = imageUrl3;
          Data.image4 = imageUrl4;
          Data.image5 = imageUrl5;
          Data.organization = organization;
          Data.Kids = HaveKids;
          Data.relationshipStatus = relationshipStatus;
          Data.Bio = bio;
          Data.Dates = DateOfBirth;
          Data.Name = name;
          Data.uid = CurrentUser.uid;
          Data.Phonenumber = CurrentUser.phoneNumber ? CurrentUser.phoneNumber : null;
          Data.Location = {
            latitude: 24.9028039,
            longitude: 67.1145385,
          }
          // console.log('test data: ', Data);
          // return;
          // console.log(CurrentUser);
          // dispatch(mediatorLogin(Data))
          firestore()
            .collection('Users').doc(CurrentUser.uid).set({
              userDetails: Data
            }).then(() => {
              dispatch(mediatorLogin(Data))
              // navigation.navigate('QuestionCongratulationScreen')
              // redux
              ToastAndroid.show('Welcome to Honey and Dates Match Coordinatior Panel', ToastAndroid.SHORT)
              setUploading(false)
            })
          // setImage(null)
        } catch (error) {
          console.log('error test2', error);
        }
      }
      else if (selectitem == 'Talent agency/Influencer') {
        try {
          setUploading(true)
          // console.log(selectitem);
          // return
          const imageUrl = await uploadImage();
          const imageUrl2 = await uploadImage2();
          const imageUrl3 = await uploadImage3();
          const imageUrl4 = await uploadImage4();
          const imageUrl5 = await uploadImage5();
          var Data = new Object();
          Data.RefCode = Math.random().toString(16).slice(2)
          Data.Category = 'Mediator';
          Data.MediatorId = 1;
          Data.PanelAccess = false;
          Data.MediatorType = selectitem;
          Data.email = email;
          Data.image1 = imageUrl;
          Data.image2 = imageUrl2;
          Data.image3 = imageUrl3;
          Data.image4 = imageUrl4;
          Data.image5 = imageUrl5;
          Data.organization = organization;
          Data.Kids = HaveKids;
          Data.relationshipStatus = relationshipStatus;
          Data.Bio = bio;
          Data.Dates = DateOfBirth;
          Data.Name = name;
          Data.uid = CurrentUser.uid;
          Data.Phonenumber = CurrentUser.phoneNumber ? CurrentUser.phoneNumber : null;
          Data.Location = {
            latitude: 24.9028039,
            longitude: 67.1145385,
          }
          // console.log('test data: ', Data);
          // return;
          // console.log(CurrentUser);
          // dispatch(mediatorLogin(Data))
          firestore()
            .collection('Users').doc(CurrentUser.uid).set({
              userDetails: Data
            }).then(() => {
              dispatch(mediatorLogin(Data))
              // navigation.navigate('QuestionCongratulationScreen')
              // redux
              ToastAndroid.show('Welcome to Honey and Dates Influencer Panel', ToastAndroid.SHORT)
              setUploading(false)
            })
          // setImage(null)
        } catch (error) {
          console.log('error test2', error);
        }
      }
      // return;
      // navigation.navigate('MediatorQuestionRequestAcess', { RequestAccessType: selectitem, HaveKids: HaveKids, relationshipStatus: relationshipStatus, bio: bio, email: email, DateOfBirth: DateOfBirth, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, })
    }
    else {
      ToastAndroid.show("Please select your request type!", ToastAndroid.SHORT);
    }
  }
  const onOther = () => {
    // const selectitem = RelationshipTypes[selectedCategoryIndex]?.name;
    // const category = 'Mediator'
    // if (!selectitem == '') {
    //   // console.log(selectitem);
    //   // return;
    navigation.navigate('MediatoreQuestionRequestAcessOther', { image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, organization: organization, HaveKids: HaveKids, relationshipStatus: relationshipStatus, bio: bio, email: email, DateOfBirth: DateOfBirth, name: name })
    // }
    // else {
    //   ToastAndroid.show("Please select your request type!", ToastAndroid.SHORT);
    // }
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
    filename = name + '.' + extension;

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
  // const AddToRedux = (Data) => {
  //   // console.log('Redux data', Data);
  // }

  const ListRelationShips = ({ value, setValue }) => {
    return (
      <View>
        {RelationshipTypes.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              ...styles.NumberInput
            }}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black, textAlign: 'center' }}>
                  {TypeTestimonial.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {value == index ? (
                  <Image source={require('../../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
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
            paddingTop: 40,
            alignItems: 'center',
            paddingHorizontal: 50,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Request access</Text>
          </View>
          <View style={{ paddingTop: 30 }}>
            <ListRelationShips value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} />
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 8,
            marginHorizontal: 20,
            backgroundColor: COLORS.white,
            elevation: 4,
            borderRadius: 10,
            marginTop: 20,
            width: width / 1.1,
          }}>
            <TextInput
              placeholder='Enter Code from admin'
              style={{
                flex: 2
              }}
            />
            <TouchableOpacity
              onPress={() => onOther()}
              style={{
                flex: 1,
                backgroundColor: COLORS.main,
                height: 35,
                borderRadius: 10,
                justifyContent: 'center'
              }}>
              <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: 13 }}>See Others</Text>
            </TouchableOpacity>
          </View>


        </View>


        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          height: '20%'
        }}>
          <View style={{
            alignItems: 'center',
            paddingBottom: 5,
            paddingTop: 20,
            // height: '30%',
            flexDirection: 'row',
          }}>
            <View style={{
              marginRight: 2.5
            }}>
              <CustomeButton width={170} onpress={() => navigation.goBack()} title={'Back'} bcolor={COLORS.light} />
            </View>
            <View style={{
              marginLeft: 2.5
            }}>
              {!uploading == true ? (
                <CustomeButton width={170} onpress={() => onReligionScreen()}
                  title={'Continue'} />
              ) : (
                <CustomeButton width={170}
                  title={'Please wait...'} />
              )}
            </View>
          </View>

          <View style={{
            paddingTop: 5,
            width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>


        <Loader modal={uploading} uploading={uploading} />
      </View>



    </SafeAreaView>
  )
}


export default MediatorQuestionRequestAcess

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
    height: '80%',
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
    width: width / 1.1,
    backgroundColor: COLORS.white,
    elevation: 4,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})