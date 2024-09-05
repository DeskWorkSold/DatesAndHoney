import { ActivityIndicator, Alert, Dimensions, Image, Modal, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../../../components/Loader';
import Twitter from '../../../../assets/Twitter.svg';
import Facebook from '../../../../assets/Facebook.svg';
import WhatsApp from '../../../../assets/WhatsApp.svg';
import Reddit from '../../../../assets/Reddit.svg';
import Linkedin from '../../../../assets/Linkedin.svg';
import TikTok from '../../../../assets/TikTok.svg';
import CopyLink from '../../../../assets/copy.svg';
import Share from 'react-native-share';
// import Facebook from '../../../../assets/Facebook.svg';
// import Facebook from '../../../../assets/Facebook.svg';
import SuggestMatche from '../../../components/SuggestMatche';
import messaging from '@react-native-firebase/messaging';
import SVGImg2 from '../../../../assets/filtermenu.svg'
import Edite from '../../../../assets/edit.svg'
import Send from '../../../../assets/send.svg'
import { BarChart, ProgressChart } from 'react-native-chart-kit';
import Speedometer from '../../../components/Speedometer';
import { RadioButton, TextInput } from 'react-native-paper';
import CustomeButton from '../../../components/CustomeButton';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import HeaderTabOne from '../../../components/HeaderTabOne';
import ManageStaffCard from '../../../components/ManageStaffCard';

const { width, height } = Dimensions.get("window");

const FilterTag = [
  {
    id: '1',
    Title: 'Smoe Van',
    description: require('../../../../assets/profile1.png'),
  },
  {
    id: '2',
    Title: 'Smoe Van',
    description: require('../../../../assets/profile1.png'),
  },
  {
    id: '3',
    Title: 'Smoe Van',
    description: require('../../../../assets/profile1.png'),
  },
];


const HomeScreen = ({ navigation }) => {
  // let afcode = Math.random().toString(16).slice(2);
  // const [code, setCode] = useState(afcode);
  const [staffCategory, setStaffCategory] = useState(FilterTag);
  const [staffCategoryIndex, setStaffCategoryIndex] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingTwo, setUploadingTwo] = useState(false);
  const [search, setSearch] = useState(null);
  const [selectUser, setSelectUser] = useState(null);

  const [rUser, setRUser] = useState(null);
  const [rUserTemp, setRUserTemp] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [AdvFilter, setAdvFilter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [matcheModal, setMatchModal] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [suggestedMatch, setSuggestedMatch] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const [matchUsers, setMatchUsers] = useState(null);

  const [userTemp, setUserTemp] = useState(null);
  const [matchUserTemp, setMatchUserTemp] = useState(null);
  const mediator = useSelector(selectMediatorUser);


  const CurrentUser = auth().currentUser.uid;

  const fetchUsers = async () => {
    setUploadingTwo(true)
    await firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          const data = documentSnapshot.data().userDetails;
          if (data.uid != CurrentUser && data.PackageId ==
            654) {
            users.push(data);
            // console.log(data);
          }
          // if (data.Category == 'Mediator') {
          // }
        })
        // console.log(users);
        setUploadingTwo(false)
        setRUser(users.slice(0, 5))
      })
  }


  // console.log(reqUser);

  const GetFcmToken = () => {
    //get device token
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          messaging()
            .getToken()
            .then(fcmToken => {
              if (fcmToken) {
                // console.log(fcmToken);
                firestore()
                  .collection('token')
                  .doc(CurrentUser)
                  .set({
                    token: fcmToken,
                    create_date: new Date(),
                  })
                  .then(() => {
                    console.log('token succssfully saved');
                  })
                  .catch(error => {
                    console.log(error);
                  });
              } else {
                console.log("user doesn't have a device token yet");
              }
            });
        } else {
          console.log('Permission Denied');
        }
      });
  }


  const OnSubmitNote = async () => {
    // console.log('test');
    if (selectedItems.length != 0) {

      // const newArray = mediator.AccessGiven

      if (mediator?.AccessGiven) {
        setUploadingTwo(true)
        const combinedArray = mediator.AccessGiven.concat(selectedItems);

        const uniqueArray = combinedArray.filter((item, index) => {
          return combinedArray.indexOf(item) === index;
        });
        await firestore()
          .collection('Users').doc(CurrentUser).update({
            AccessGiven: uniqueArray,
          })
          .then(() => {
            ToastAndroid.show("Added to your record!", ToastAndroid.SHORT);
            setUploadingTwo(false)
            setModal(false)
          });
        selectedItems.map((j, i) => {
          firestore()
            .collection('Users').doc(j.uid).update({
              'userDetails.AccessGiven': CurrentUser,
              'userDetails.PanelAccess': true,
            })
            .then(() => {
              console.log('Access given to user');
            });
        })
      }
      else if (!mediator?.AccessGiven) {
        setUploadingTwo(true)

        await firestore()
          .collection('Users').doc(CurrentUser).update({
            AccessGiven: selectedItems,
          })
          .then(() => {
            ToastAndroid.show("Added to your record!", ToastAndroid.SHORT);
            setUploadingTwo(false)
            setModal(false)
          });
        selectedItems.map((j, i) => {
          firestore()
            .collection('Users').doc(j.uid).update({
              'userDetails.AccessGiven': CurrentUser,
              'userDetails.PanelAccess': true,
            })
            .then(() => {
              console.log('Access given to user');
            });
        })
      }

      // setModal(true)
    }
    else {
      ToastAndroid.show("Please select staff!", ToastAndroid.SHORT);
    }
  }



  useEffect(() => {
    fetchUsers();
    locationPermission();
    getCurrentLocation();

    // NotificationPermission();
    GetFcmToken();

  }, [])

  // useEffect(() => {
  //   getfilterMatchUsers();
  // }, [filterMatchUser])

  const locationPermission = () => {
    new Promise(async (resolve, reject) => {
      if (Platform.OS === 'ios') {
        try {
          const permissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
          );
          if (permissionStatus === 'granted') {
            return resolve('granted');
          }
          reject('Permission not granted');
        } catch (error) {
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
          }
          return reject('Location Permission denied');
        })
        .catch(error => {
          console.log('Ask Location permission error: ', error);
          return reject(error);
        });
    });
  }

  const getCurrentLocation = () => {
    setTimeout(() => {
      Geolocation.getCurrentPosition(
        position => {
          const cords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            // heading: position.coords.heading,
          };
          firestore()
            .collection('Users').doc(CurrentUser).update({
              'userDetails.Location': cords,
            })
          // console.log('===>', cords);
          // resolve(cords);
        },
        error => { console.log(error) }
      );
    }, 5000);
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>
        <View>
          <Text style={{
            fontSize: 20,
            textAlign: 'center',
            color: COLORS.black,
            fontWeight: 'bold',
          }}>Premium Clients</Text>
        </View>


        <View style={{
          marginTop: 10,
          // paddingHorizontal: 20
        }}>
          <ScrollView vertical showsVerticalScrollIndicator={false} >
            <View style={{
              marginTop: 20,
              marginBottom: 70
            }}>
              {!uploading ?
                <>
                  {rUser ?
                    <>
                      {rUser.map((item, index) => (
                        <View
                          // onPress={() => filterUserFunction(item, index)}
                          key={index} style={{
                            width: width,
                            alignSelf: 'center',
                            // borderWidth: 1,
                            marginBottom: 10,
                            backgroundColor: COLORS.white,
                            elevation: 1,
                            // justifyContent: 'center',
                          }}>
                          <View style={{
                            // width: '90%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 20,
                            width: '100%',
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.light
                          }}>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>

                              <View style={{
                                borderWidth: 3,
                                borderColor: COLORS.main,
                                borderRadius: 100,
                              }}>
                                <Image source={{ uri: item.image1 }} resizeMode='cover' style={{
                                  borderRadius: 80,
                                  width: 50,
                                  height: 50
                                }} />
                              </View>
                              <Text style={{
                                color: COLORS.black,
                                marginHorizontal: 20,
                                fontSize: 16,
                              }}>{item.Name}</Text>
                            </View>
                            <View style={{
                              flex: 1,
                              alignItems: 'flex-end'
                            }}>
                              <TouchableOpacity
                                onPress={() => navigation.navigate('SuggestionScreen', {
                                  data: item,
                                  id: index
                                })}
                                style={{
                                  backgroundColor: COLORS.main,
                                  paddingVertical: 7,
                                  paddingHorizontal: 15,
                                  borderRadius: 5,
                                }}>
                                <Text style={{
                                  fontSize: 12,
                                  color: COLORS.black
                                }}>Profile</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      ))}
                    </>
                    :
                    <View style={{
                      alignSelf: 'center',
                      padding: 20
                    }}>
                      <ActivityIndicator color={COLORS.main} animating={uploadingTwo} />
                    </View>
                  }
                </>
                :
                <View style={{
                  alignSelf: 'center',
                  padding: 20
                }}>
                  <Text>No users found</Text>
                </View>
              }
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {

    height: '100%',
    backgroundColor: COLORS.white,
    paddingVertical: 20,
  },
  contentContainer: {
    // borderRadius:50,
    // flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
    // backgroundColor:COLORS.black
  },
})