import { ActivityIndicator, Alert, Dimensions, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabTwo from '../components/HeaderTabTwo';
import { useDispatch, useSelector } from 'react-redux';
import { Buypackages, packages, selectChatuser, selectUser, selectWalletAmount } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import SVGRocket from '../../assets/ROCKET.svg';
import SVGProfile from '../../assets/PROFILEoptimization.svg';
import SVGDownload from '../../assets/BOOK.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SVGCup from '../../assets/cup.svg';
import ProgressBar from '../components/ProgressBar';
import Speedometer from '../components/Speedometer';
import ProgressCircle from '../components/ProgressCircle';
import FastImage from 'react-native-fast-image';
import Loader from '../components/Loader';

const { height, width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const reduxChatUser = useSelector(selectChatuser);
  const walletAmount = useSelector(selectWalletAmount);

  const [memberships, setMemberships] = useState();
  const [modal, setModal] = useState(false);
  const [actionTriggered, setActionTriggered] = useState(false);
  const [image, setImage] = useState(null);
  const [additionalPackages, setAdditionalPackages] = useState(false);
  // console.log(reduxChatUser);
  const [membershipUid, setMembershipUid] = useState();
  const [uploading, setUploading] = useState(false);
  const [buyPack, setBuyPack] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [YourMatches, setYourMatches] = useState(0);

  // console.log(reduxChatUser?.length , '===> ');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  const DeleteImageFromDatabase = async (props) => {
    // console.log(props?.type);
    const imageType = props?.type
    // return
    try {
      setUploading(true)
      const userRef = firestore().collection('Users').doc(user.uid);
      let updateField = '';

      if (imageType === 'image1') {
        updateField = 'userDetails.image1';
      } else if (imageType === 'image2') {
        updateField = 'userDetails.image2';
      }
      else if (imageType === 'image3') {
        updateField = 'userDetails.image3';
      }
      else if (imageType === 'image4') {
        updateField = 'userDetails.image4';
      }
      else if (imageType === 'image5') {
        updateField = 'userDetails.image5';
      }
      else if (imageType === 'image6') {
        updateField = 'userDetails.image6';
      }


      if (updateField) {
        await userRef.update({
          [updateField]: null,
        });
        ToastAndroid.show('Image Deleted Successfully', ToastAndroid.LONG);
        setModal(false);
        setImage(null);
        setUploading(false)
      } else {
        setUploading(false)
        console.log('Invalid image type');
      }
    } catch (error) {
      setUploading(false)
      console.error('Error deleting image: ', error);
      ToastAndroid.show('Failed to delete image', ToastAndroid.LONG);
    }
  }

  const onDeleteImage = (props) => {
    // console.log(props);
    // return
    Alert.alert(
      "Delete Image",
      "Are you sure you want to delete this image?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => DeleteImageFromDatabase(props),
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  }



  const GetMatchPercentage = () => {
    if (reduxChatUser?.length > 0) {
      var Percentage = (reduxChatUser?.length / 100) * 100;
      // console.log('===> :',Percentage);
      if (Percentage > 100) {
        setYourMatches('100')
      }
      else {
        setYourMatches(Percentage)
      }
    }
  }

  const fetchMemberships = async () => {
    setUploading(true)
    try {
      // console.log('hello');
      await firestore()
        .collection('Package')
        .get()
        .then(querySnapshot => {
          // console.log('Total user: ', querySnapshot.size);
          const membership = [];
          const membershipsuid = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log('memberships ID: ', documentSnapshot.id, documentSnapshot.data());
            membership.push(documentSnapshot.data());
            membershipsuid.push(documentSnapshot.id);
          });
          setMemberships(membership)
          setMembershipUid(membershipsuid)
        })
      // console.log('membershipData: ', memberships);

    } catch (e) {
      console.log(e);
    }
    setUploading(false)
  };

  const ByMemeberShips = (item) => {
    var Data = new Object();
    Data.discountPercentage = item.discountPercentage;
    Data.discountPrice = item.discountPrice;
    Data.id = item.id;
    Data.name = item.name;
    Data.numberOfCards = item.numberOfCards;
    Data.numberOfChats = item.numberOfChats;
    Data.otherCategory = item.otherCategory;
    Data.rate = item.rate;
    Data.status = item.status;
    // console.log('test data: ', Data);
    // return;
    dispatch(Buypackages(Data))
    // console.log(item.id);
    // const MembershipName = item.otherCategory.split(' ')[0]
    // // console.log(MembershipName);
    // const useRef = firestore().collection('Users')
    //   .doc(user.uid)
    // useRef.update({
    //   'userDetails.AccountType': MembershipName,
    //   'userDetails.PackageId': item.id,
    // }).then(() => {
    //   setBuyPack(true)
    //   // console.log('Notices send!');
    // });
    navigation.navigate('PaymentOptionScreen')
  }
  const uploadImage = async (tempImage, names) => {
    if (tempImage == null) {
      ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
      return null;
    }
    setModal(true)
    const uploadUri = tempImage;
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
    if (names == 'image1') {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image1': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
    else if (names == 'image2') {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image2': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
    else if (names == 'image3') {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image3': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
    else if (names == 'image4') {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image4': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
    else if (names == 'image5') {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image5': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
    else {
      try {
        await task;

        const url = await storageRef.getDownloadURL();
        if (url) {
          const useRef = firestore().collection('Users')
            .doc(user?.uid)
          useRef.update({
            'userDetails.image6': url,
          }).then(() => {
            ToastAndroid.show('image uploaded successfull', ToastAndroid.SHORT)
            setModal(false)
            setActionTriggered(null)
            setUploading(false)
          });
        }
        else {
          ToastAndroid.show('Network issue please try again!!', ToastAndroid.SHORT)
        }
        return url;

      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }

  const pickImage1 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image1'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
    // setImage1(result.assets[0].uri);
  }
  const pickImage2 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image2'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
    // setImage1(result.assets[0].uri);
  }
  const pickImage3 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image3'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
  }
  const pickImage4 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image4'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
  }
  const pickImage5 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image5'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
  }
  const pickImage6 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const tempImage = result.assets[0].uri;
    const names = 'image6'
    setActionTriggered('UploadImage')
    setUploading(true)
    uploadImage(tempImage, names)
  }



  useEffect(() => {
    fetchMemberships();
    GetMatchPercentage()
  }, []);

  // console.log(walletAmount);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <HeaderTabTwo navigation={navigation} onpress={() => navigation.navigate('SettingScreen')} />
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={{
            marginBottom: 200,
            backgroundColor: COLORS.white,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingBottom: 10
            }}>
              <View style={{
                borderWidth: 3,
                borderColor: COLORS.main,
                borderRadius: 50
              }}>
                {user.image1 ? (
                  <FastImage
                    style={{
                      borderRadius: 50,
                      width: 90,
                      height: 90
                    }}
                    source={{
                      uri: user.image1,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  // <Image source={{ uri: user.image1 }} resizeMode='cover' style={{
                  //   borderRadius: 50,
                  //   width: 90,
                  //   height: 90
                  // }} />
                ) : (
                  <Image source={require('../../assets/nopic.png')} resizeMode='contain' style={{
                    borderRadius: 30,
                    width: 80,
                    height: 80
                  }} />
                )}
              </View>
              <View style={{
                paddingRight: 20,
                paddingLeft: 10,
                justifyContent: 'center',
              }}>
                {user ? (
                  <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.black
                  }}>{user.Name}</Text>
                ) : (
                  <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.black
                  }}>Jan dohn</Text>
                )}
                <View style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  // alignItems: 'center',
                  justifyContent: 'flex-start',
                  backgroundColor: COLORS.light,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  // width: 120
                }}>
                  <SVGCup width={20} height={20} />
                  <Text style={{ color: COLORS.black, fontSize: 12, paddingHorizontal: 5 }}>Want to date</Text>
                </View>
              </View>
            </View>

            <View style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              alignContent: 'stretch',
              alignItems: 'center',
              maxWidth: '100%',
              margin: 'auto',
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
              <View style={{
                flexDirection: 'row',
                width: '70%',
                height: 200,
                paddingRight: 5
              }}>
                {user.image1 ?
                  <TouchableOpacity
                    // onPress={pickImage1}
                    onPress={() => {
                      setModal(true), setImage({
                        img: user.image1,
                        type: 'image1'
                      })
                    }}
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: user.image1,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    {/* <Image source={{ uri: user.image1 }} resizeMode='cover' style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }} /> */}
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => pickImage1()}
                    // onPress={pickImage1}
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Image source={require('../../assets/uploadimage.png')} style={{
                      width: 30,
                      height: 30,
                    }} />
                    <Text style={{
                      width: '70%',
                      color: COLORS.gray
                    }}>
                      Click to add image
                    </Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={{
                flexDirection: 'column',
                width: '30%',
                height: 200,
                justifyContent: 'space-between'
              }}>
                {user.image2 ?
                  <TouchableOpacity
                    // onPress={pickImage2}
                    onPress={() => {
                      setModal(true), setImage({
                        img: user.image2,
                        type: 'image2'
                      })
                    }}
                    style={{
                      height: 98,
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <FastImage
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: user.image2,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    {/* <Image source={{ uri: user.image2 }} resizeMode='cover' style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }} /> */}
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => pickImage2()}
                    style={{
                      height: 98,
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={require('../../assets/add.png')} style={{
                      width: 20,
                      height: 20,
                    }} />
                  </TouchableOpacity>
                }

                {user.image3 ?
                  <TouchableOpacity
                    // onPress={pickImage3}
                    onPress={() => {
                      setModal(true), setImage({
                        img: user.image3,
                        type: 'image3'
                      })
                    }}
                    style={{
                      height: 98,
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <FastImage
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: user.image3,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    {/* <Image source={{ uri: user.image3 }} resizeMode='cover' style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }} /> */}
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => pickImage3()}
                    style={{
                      height: 98,
                      backgroundColor: COLORS.mainlight,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={require('../../assets/add.png')} style={{
                      width: 20,
                      height: 20,
                    }} />
                  </TouchableOpacity>
                }
              </View>
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              width: width,
              paddingHorizontal: 20,
              marginTop: 5,
              flexWrap: 'nowrap',
              // justifyContent: 'flex-end',
              alignContent: 'stretch',
              alignItems: 'center',
              maxWidth: '100%',
              margin: 'auto',
              // backgroundColor:COLORS.gray,
              // marginHorizontal:20
              // paddingHorizontal: 20,
              // paddingTop: 20,
            }}>
              {user.image4 ?
                <TouchableOpacity
                  onPress={() => {
                    setModal(true), setImage({
                      img: user.image4,
                      type: 'image4'
                    })
                  }}
                  // onPress={pickImage4}
                  style={{
                    height: 98,
                    width: '33%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <FastImage
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: user.image4,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  {/* <Image source={{ uri: user.image4 }} resizeMode='cover' style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }} /> */}
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => pickImage4()}
                  style={{
                    height: 98,
                    width: '34%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../../assets/add.png')} style={{
                    width: 20,
                    height: 20,
                  }} />
                </TouchableOpacity>
              }

              {user.image5 ?
                <TouchableOpacity
                  // onPress={pickImage5}
                  onPress={() => {
                    setModal(true), setImage({
                      img: user.image5,
                      type: 'image5'
                    })
                  }}
                  style={{
                    height: 98,
                    width: '33%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <FastImage
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: user.image5,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  {/* <Image source={{ uri: user.image5 }} resizeMode='cover' style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }} /> */}
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => pickImage5()}
                  style={{
                    height: 98,
                    width: '34%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../../assets/add.png')} style={{
                    width: 20,
                    height: 20,
                  }} />
                </TouchableOpacity>
              }


              {user.image6 ?
                <TouchableOpacity
                  // onPress={pickImage5}
                  onPress={() => {
                    setModal(true), setImage({
                      img: user.image6,
                      type: 'image6'
                    })
                  }}
                  style={{
                    height: 98,
                    width: '30%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <FastImage
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: user.image6,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  {/* <Image source={{ uri: user.image6 }} resizeMode='cover' style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }} /> */}
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => pickImage6()}
                  style={{
                    height: 98,
                    width: '30%',
                    marginRight: 5,
                    backgroundColor: COLORS.mainlight,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../../assets/add.png')} style={{
                    width: 20,
                    height: 20,
                  }} />
                </TouchableOpacity>
              }
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 20
            }}>
              {/* <View style={{
                flexDirection: 'row',
                backgroundColor: COLORS.white,
                elevation: 5,
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignItems: 'center',
                // height: 70,
                width: '49%'
              }}>
                <View>
                  <ProgressCircle percentage={YourMatches} radius={25} />
                </View>
                <View style={{
                  paddingLeft: 5
                }}>
                  <Text style={{
                    fontSize: 12,
                    color: COLORS.black,
                  }}>
                    Your Matches
                  </Text>
                  {YourMatches > '80' ?
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                    Very High
                  </Text>
                  :
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                    Very Low
                  </Text>
                  }
                </View>
              </View> */}

              <TouchableOpacity
                onPress={() => navigation.navigate('CurrentBalanceScreen')}
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.white,
                  elevation: 5,
                  borderRadius: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  alignItems: 'center',
                  height: 70,
                  width: '100%'
                }}>
                <View>
                  <Image source={require('../../assets/credit.png')} resizeMode='contain'
                    style={{
                      width: 50,
                      marginRight: 10
                    }} />
                </View>
                <View style={{
                  paddingHorizontal: 20
                }}>
                  <Text style={{
                    fontSize: 12,
                    color: COLORS.black,
                  }}>
                    Credits
                  </Text>
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    fontSize: 12
                  }}>
                    {walletAmount?.totalBalance ? `$${walletAmount?.totalBalance}` : '0'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingTop: 20
            }}>
              <View style={{
                height: 60,
                borderRadius: 10,
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: COLORS.light,
                flexDirection: 'row',
              }}>
                <View style={{
                  paddingRight: 30
                }}>
                  <Text style={{
                    fontSize: 14,
                    color: COLORS.gray
                  }}>
                    What type of relationship you
                    are looking for?
                  </Text>
                </View>
                <View>
                  <Image source={require('../../assets/back.png')} resizeMode='contain' />
                </View>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
              <View style={{
                height: 60,
                borderRadius: 10,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                backgroundColor: COLORS.light,
                flexDirection: 'row',
              }}>
                <View style={{
                  paddingRight: 20
                }}>
                  <Text style={{
                    fontSize: 14,
                    color: COLORS.gray
                  }}>
                    Are you introvert or extrovert?
                  </Text>
                </View>
                <View>
                  <Image source={require('../../assets/back.png')} resizeMode='contain' />
                </View>
              </View>
            </View> */}

            <View style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              paddingVertical: 20,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.light,
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: COLORS.black
                }}>Flake Meter</Text>
                <Text style={{
                  color: COLORS.gray,
                  fontSize: 12,
                }}>Flakes on your profile</Text>
              </View>
              <View>
                <Text style={{
                  color: COLORS.black,
                  textAlign: 'center',
                  fontSize: 14,
                }}>
                  #flakemeter
                </Text>
                {user.Flake == 1 &&
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Text style={{
                      color: COLORS.gray,
                      fontSize: 14,
                    }}>
                      +{user.Flake}
                    </Text>
                  </View>
                  // <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                }
                {user.Flake == 2 &&
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Text style={{
                      color: COLORS.gray,
                      fontSize: 14,
                    }}>
                      +{user.Flake}
                    </Text>
                  </View>
                }
                {user.Flake == 3 &&
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Text style={{
                      color: COLORS.gray,
                      fontSize: 14,
                    }}>
                      +{user.Flake}
                    </Text>
                  </View>
                }
                {user.Flake > 3 &&
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                      tintColor: COLORS.main
                    }} />
                    <Text style={{
                      color: COLORS.gray,
                      fontSize: 14,
                    }}>
                      +{user.Flake}
                    </Text>
                  </View>
                }
                {user.Flake < 1 &&
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                    <Text style={{
                      color: COLORS.gray,
                      fontSize: 14,
                    }}>
                      +0
                    </Text>
                  </View>
                }
                {/* <Image source={require('../../assets/flakemeter.png')} resizeMode='contain' /> */}
              </View>
            </View>

            <View style={{
              padding: 20,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.light,
              marginBottom: 50,
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                  fontSize: 14,
                }}>Want to remove flakes</Text>
              </View>
              <View style={{
                paddingHorizontal: 50,
                paddingBottom: 10,
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: COLORS.gray
                }}>You can remove flakes by paying
                  $20 per flake now</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('RemoveFlakeScreen')}
                activeOpacity={0.8} style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: COLORS.main,
                  borderRadius: 10,
                }}>
                <Text style={{ color: COLORS.black, fontSize: 12 }}>Remove Flakes</Text>
              </TouchableOpacity>
            </View>

            {/* <View>
              {additionalPackages ?
                <>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 20
                  }}>
                    <Text style={{
                      color: COLORS.black,
                      fontWeight: 'bold',
                      fontSize: 16
                    }}>Memberships</Text>
                    <TouchableOpacity onPress={() => setAdditionalPackages(!additionalPackages)}>
                      <Text style={{
                        color: COLORS.blue, borderBottomColor: COLORS.blue,
                        borderBottomWidth: 1,
                      }}>Additional Packages</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    marginBottom: 50,
                    // paddingHorizontal: 20
                  }}>
                    <View style={{
                      paddingHorizontal: 20,
                      backgroundColor: COLORS.white,
                      paddingVertical: 20,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: COLORS.light
                    }}>
                      <View>
                        <Text style={{
                          color: COLORS.black
                        }}>Starter Package (Recommended)</Text>
                      </View>
                      <View style={{
                        flexDirection: 'row',
                      }}>
                        <View style={{
                          width: '50%',
                          // backgroundColor:COLORS.main
                        }}>
                          <Text style={{
                            fontSize: 12,
                            paddingTop: 10
                          }}>- 3 Pages E-Book</Text>
                          <Text style={{
                            fontSize: 12,
                            paddingTop: 5
                          }}>- Profile optimization</Text>
                          <Text style={{
                            fontSize: 12,
                            paddingTop: 5,
                          }}>- 1 boost</Text>
                        </View>
                        <View style={{
                          width: '50%',
                          // backgroundColor:COLORS.main,
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end'
                        }}>
                          <Text style={{
                            color: COLORS.black,
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: COLORS.main,
                            fontWeight: 'bold',
                          }}>Buy  for $28.99</Text>
                        </View>

                      </View>
                    </View>


                    <View style={{
                      paddingHorizontal: 20,
                      backgroundColor: COLORS.white,
                      paddingVertical: 20,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: COLORS.light,
                    }}>
                      <View style={{
                        flexDirection: 'row',
                      }}>
                        <View style={{
                          width: '25%',
                          // backgroundColor:COLORS.main,
                          // alignItems:'center',
                          justifyContent: 'center'
                        }}>
                          <SVGRocket width={70} height={70} />
                        </View>
                        <View style={{
                          width: '40%',
                          // backgroundColor:COLORS.main
                        }}>
                          <View>
                            <Text style={{
                              color: COLORS.black
                            }}>Boost your profile</Text>
                          </View>
                          <Text style={{
                            fontSize: 12,
                            paddingTop: 10
                          }}>boost your profile and
                            get seen 30x more</Text>
                        </View>
                        <View style={{
                          width: '35%',
                          // backgroundColor:COLORS.main,
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end'
                        }}>
                          <Text style={{
                            color: COLORS.black,
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: COLORS.main,
                            fontWeight: 'bold',
                            fontSize: 12,
                          }}>Buy  for $8.99</Text>
                        </View>

                      </View>
                    </View>


                    <View style={{
                      paddingHorizontal: 20,
                      backgroundColor: COLORS.white,
                      paddingVertical: 20,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: COLORS.light,
                    }}>
                      <View style={{
                        flexDirection: 'row',
                      }}>
                        <View style={{
                          width: '25%',
                          // backgroundColor:COLORS.main,
                          // alignItems:'center',
                          justifyContent: 'center'
                        }}>
                          <SVGProfile width={70} height={70} />
                        </View>
                        <View style={{
                          width: '40%',
                          // backgroundColor:COLORS.main
                        }}>
                          <View>
                            <Text style={{
                              color: COLORS.black
                            }}>Profile Optimization</Text>
                          </View>
                          <Text style={{
                            fontSize: 12,
                            paddingTop: 10
                          }}>Profile optimizer will suggest your profile.</Text>
                        </View>
                        <View style={{
                          width: '35%',
                          // backgroundColor:COLORS.main,
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end'
                        }}>
                          <Text style={{
                            color: COLORS.black,
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: COLORS.main,
                            fontWeight: 'bold',
                            fontSize: 12,
                          }}>Buy  for $28.99</Text>
                        </View>

                      </View>
                    </View>

                    <View style={{
                      paddingHorizontal: 20,
                      backgroundColor: COLORS.white,
                      paddingVertical: 20,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: COLORS.light,
                    }}>
                      <View style={{
                        flexDirection: 'row',
                      }}>
                        <View style={{
                          width: '25%',
                          // backgroundColor:COLORS.main,
                          // alignItems:'center',
                          justifyContent: 'center'
                        }}>
                          <SVGDownload width={70} height={70} />
                        </View>
                        <View style={{
                          width: '40%',
                          // backgroundColor:COLORS.main
                        }}>
                          <View>
                            <Text style={{
                              color: COLORS.black
                            }}>Download E-Book</Text>
                          </View>
                          <Text style={{
                            fontSize: 12,
                            paddingTop: 10
                          }}>3 pages e-book on how to date better.</Text>
                        </View>
                        <View style={{
                          width: '35%',
                          // backgroundColor:COLORS.main,
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end'
                        }}>
                          <Text style={{
                            color: COLORS.black,
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: COLORS.main,
                            fontWeight: 'bold',
                            fontSize: 12,
                          }}>Buy  for $10</Text>
                        </View>

                      </View>
                    </View>

                    <View style={{
                      paddingHorizontal: 20,
                      backgroundColor: COLORS.white,
                      paddingVertical: 20,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: COLORS.light,
                    }}>
                      <View style={{
                        flexDirection: 'row',
                      }}>
                        <View style={{
                          width: '25%',
                          // backgroundColor:COLORS.main,
                          // alignItems:'center',
                          justifyContent: 'center'
                        }}>
                          <SVGFlake width={70} height={70} />
                        </View>
                        <View style={{
                          width: '40%',
                          // backgroundColor:COLORS.main
                        }}>
                          <View>
                            <Text style={{
                              color: COLORS.black
                            }}>Flake Insurance</Text>
                          </View>
                          <Text style={{
                            fontSize: 12,
                            paddingTop: 10
                          }}>Human will verify that flakes are real / no acidity flakes. If you get flaked on Or often flake you also get 10% off flake removal fee</Text>
                        </View>
                        <View style={{
                          width: '35%',
                          // backgroundColor:COLORS.main,
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end'
                        }}>
                          <Text style={{
                            color: COLORS.black,
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: COLORS.white,
                            borderWidth: 1,
                            borderColor: COLORS.main,
                            fontWeight: 'bold',
                            fontSize: 12,
                            marginVertical: 10,
                          }}>$24/ month</Text>
                          <Text style={{
                            color: COLORS.black,
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: COLORS.main,
                            fontWeight: 'bold',
                            fontSize: 12,
                          }}>$149/ year</Text>
                        </View>

                      </View>
                    </View>


                  </View>
                </>

                :
                <>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 20
                  }}>
                    <Text style={{
                      color: COLORS.black,
                      fontWeight: 'bold',
                      fontSize: 16
                    }}>Additional Packages</Text>
                    <TouchableOpacity onPress={() => setAdditionalPackages(!additionalPackages)}>
                      <Text style={{
                        color: COLORS.blue, borderBottomColor: COLORS.blue,
                        borderBottomWidth: 1,
                      }}>Memberships</Text>
                    </TouchableOpacity>
                  </View>
                  {memberships ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {memberships.map((item, index) => (
                        <View key={index} style={{ marginVertical: 10 }}>
                          <View style={{
                            marginHorizontal: 10,
                            marginLeft: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            width: width / 1.2,
                            marginBottom: 50,
                          }}>
                            <View style={{
                              backgroundColor: COLORS.white,
                              width: '100%',
                              borderRadius: 20,
                              elevation: 5,
                            }}>
                              <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                alignItems: 'center'
                              }}>
                                <Text style={{
                                  color: COLORS.black,
                                  fontWeight: 'bold',
                                  fontSize: 15,
                                  width: '70%',
                                  // backgroundColor:COLORS.black
                                }}>{item.otherCategory}</Text>
                                {!item.discountPrice == '' ? (
                                  <Text style={{
                                    color: COLORS.black, fontSize: 12,
                                    width: '30%',
                                    alignItems: 'flex-end'
                                  }}>{item.discountPrice} OFF {item.discountPercentage}%</Text>
                                ) : (
                                  <Text style={{ color: COLORS.black, fontSize: 12, }}>${item.rate}/Month</Text>
                                )}
                              </View>
                              <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                              }}>
                                <View style={{
                                  width: '70%',
                                  // backgroundColor:COLORS.main
                                }}>
                                  <Text style={{
                                    color: COLORS.black,
                                    fontSize: 13
                                  }}>{item.name}</Text>
                                </View>
                                <Image source={require('../../assets/Premium.png')} resizeMode='contain'
                                  style={{
                                    width: 50,
                                    height: 50
                                  }} />
                              </View>
                              <View style={{
                                paddingHorizontal: 20,
                                paddingBottom: 20,
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start'
                              }}>
                                <TouchableOpacity activeOpacity={0.8} style={{
                                  paddingHorizontal: 20,
                                  paddingVertical: 10,
                                  backgroundColor: COLORS.main,
                                  borderRadius: 10,
                                  alignItems: 'center'
                                }}>
                                  <Text style={{ color: COLORS.black, fontSize: 13 }}>View more</Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                            <View style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingVertical: 20,
                              borderBottomColor: COLORS.light,
                              borderBottomWidth: 1,
                              width: '100%',
                            }}>
                              <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                fontWeight: 'bold',
                              }}>
                                What's in {item.otherCategory}
                              </Text>
                            </View>

                            <View>
                              <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                                <View style={{
                                  flexDirection: 'row',
                                  width: "80%"
                                }}>
                                  <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
                                    <Image source={require('../../assets/unlock.png')} resizeMode='contain' />
                                  </View>
                                  <View style={{ paddingRight: 30 }}>
                                    <Text>Unlock Political and religion filter</Text>
                                  </View>
                                </View>

                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                  <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                                </View>
                              </View>

                              <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                justifyContent: 'space-between',
                              }}>
                                <View style={{
                                  flexDirection: 'row',
                                }}>
                                  <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                    <Image source={require('../../assets/totlikes.png')} resizeMode='contain' />
                                  </View>
                                  <View style={{ paddingRight: 10 }}>
                                    <Text>15 likes Per Day</Text>
                                  </View>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                  <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                                </View>
                              </View>

                              <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                justifyContent: 'space-between',
                              }}>
                                <View style={{
                                  flexDirection: 'row',
                                }}>
                                  <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                    <Image source={require('../../assets/matches.png')} resizeMode='contain' />
                                  </View>
                                  <View style={{ paddingRight: 30 }}>
                                    <Text>10 Max Matches</Text>
                                  </View>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                  <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                                </View>
                              </View>
                              <View style={{
                                padding: 20,
                              }}>
                                <TouchableOpacity
                                  onPress={() => ByMemeberShips(item, membershipUid)}
                                  activeOpacity={0.8} style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: COLORS.main,
                                    borderRadius: 10,
                                    alignItems: 'center'
                                  }}>
                                  <Text style={{ color: COLORS.black, fontSize: 15 }}>Current Membership</Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                          </View>
                        </View>

                      ))}
                    </ScrollView>
                  ) : (
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}>
                      <ActivityIndicator size="small" color={COLORS.main} animating={uploading} />
                    </View>
                  )}
                </>

              }
            </View> */}


          </View>


          <Modal
            animationType='fade'
            transparent={true}
            visible={modal}>
            <>
              {actionTriggered == 'UploadImage' ?
                <View style={{
                  width: width,
                  height: height,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  opacity: .9
                }}>
                  <ActivityIndicator size="large" color={COLORS.main} animating={uploading} />
                </View>
                :
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginTop: 22,
                  backgroundColor: 'black',
                  // opacity: .9
                }}>
                  <View style={{
                    // margin: 20,
                    backgroundColor: 'black',
                    borderRadius: 20,
                    // padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    width: '100%',
                    height: height / 1.6,
                    justifyContent: 'center'
                  }}>
                    <FastImage
                      style={{
                        height: '100%',
                        width: '100%',
                        // borderRadius: 20,
                      }}
                      source={{
                        uri: image?.img,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    {/* <Image source={{ uri: image }} resizeMode="cover" style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                    }} /> */}
                  </View>

                  <TouchableOpacity onPress={() => { setModal(false), setImage(null) }}
                    style={{
                      position: 'absolute',
                      left: 20,
                      top: 20
                    }}>
                    <AntDesign name='close' color={COLORS.white} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDeleteImage(image)}
                    style={{
                      position: 'absolute',
                      right: 20,
                      top: 20
                    }}>
                    <MaterialCommunityIcons name='delete-empty-outline' color={COLORS.white} size={30} />
                  </TouchableOpacity>


                  <Loader uploading={uploading} modal={uploading} />
                </View>
              }
            </>
          </Modal>

        </ScrollView>





      </View >
    </SafeAreaView >
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})