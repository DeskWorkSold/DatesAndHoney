import { ActivityIndicator, Dimensions, Image, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SVGImg1 from '../../../../assets/diamond.svg';
import UserDetails from '../../../components/UserDetails';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../../../components/Loader';
import Message from '../../../../assets/message.svg';
import Group from '../../../../assets/Group.svg';
import SuggestMatche from '../../../components/SuggestMatche';
import messaging from '@react-native-firebase/messaging';

const { width, height } = Dimensions.get("window");

const CoordinatorBtn = [
  {
    id: '1',
    name: 'Your Clients',
  },
  {
    id: '2',
    name: 'Requests',
  }
];



const test = [
  {
    id: '1',
    name: 'Fahad Khan',
  }
  ,
  {
    id: '2',
    name: 'Ali Khan',
  },
  {
    id: '3',
    name: 'Raza Khan',
  }
]


const HomeScreen = ({ navigation }) => {
  const [coordinatorBtn, setCoordinatorBtn] = useState('Your Clients');
  const [value, setValueIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [isEnabled, setisEnabled] = useState(false);
  const [isEnabled2, setisEnabled2] = useState(false);

  const [reqUser, setReqUser] = useState(null);
  const [ClientUser, setClientUser] = useState(null);
  const [filterMatchUser, setFilterMatchUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [matcheModal, setMatchModal] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [suggestedMatch, setSuggestedMatch] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const [matchUsers, setMatchUsers] = useState(null);

  const [userTemp, setUserTemp] = useState(null);
  const [matchUserTemp, setMatchUserTemp] = useState(null);


  const CurrentUser = auth().currentUser.uid;

  // console.log(reqUser);



  const handleSlide = (index) => {
    // console.log('slide');
    setValueIndex(index)
    const viewPage = CoordinatorBtn[index].name
    setCoordinatorBtn(viewPage);
  };

  const fetchUser = async () => {
    setUploading(true)
    await firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log(documentSnapshot.data());
          const data = documentSnapshot.data().userDetails;
          if (data.MatchcoordinaterStatus != CurrentUser && !data.Category) {
            users.push(data);
          }
          // if (data.Category == 'Mediator') {
          // }
        })
        setReqUser(users.slice(0, 10))
      })
    setUploading(false)
  }
  const fetchClients = async () => {
    if (CurrentUser) {
      try {
        const userRef = firestore().collection('Users')
          .doc(CurrentUser)
        userRef.onSnapshot((querySnap) => {
          // console.log('doc exists: ', querySnap.data());
          if (!querySnap.data()?.Clients) {
            console.log('private chats not found');
            // console.log('private chat here');
          } else {
            const Clientsdata = []
            querySnap.data()?.Clients.map(user => {
              // console.log('total chats here', chats.ChatuserDetails.uid);
              Clientsdata.push(user.ClientUser)
            })
            setClientUser(Clientsdata)
          }
        })
      } catch (e) {
        console.log(e);
      }
    }
    else {
      ToastAndroid.show("Network error try again later!", ToastAndroid.SHORT);
      // dispatch(chatuser(null))
      // setChatUserDetail(null)
    }
  }

  const GetUserDetails = (item) => {
    if (item) {
      // console.log(item,'request user');
      // return
      setUserDetails(item);
      setModalVisible(true)
    }
    else {
      ToastAndroid.show("Network error try again later!", ToastAndroid.SHORT);
    }
  }
  const GetUserDetailsTwo = (item) => {
    // console.log(item);
    if (item) {
      // console.log(item);
      // return
      setUserDetails(item);
      setModalVisibleTwo(!modalVisibleTwo)
    }
    else {
      ToastAndroid.show("Network error try again later!", ToastAndroid.SHORT);
    }
  }

  const AcceptClientReq = async (userDetails) => {
    // console.log('accept', userDetails);
    // return;
    setUploading(true)
    await firestore()
      .collection('Users').doc(CurrentUser).update({
        Clients: firestore.FieldValue.arrayUnion({
          ClientUser: userDetails
        }),
      })
      .then(() => {
        console.log('client req accepted');
      });
    await firestore()
      .collection('Users').doc(userDetails.uid).update({
        'userDetails.MatchcoordinaterStatus': CurrentUser,
      })
      .then(() => {
        console.log('client req accepted');
        setModalVisible(false)
        // console.log('You like', Data.userDetails.Name);
        // navigation.navigate('MessagesScreen')
        setUploading(false)
      });
  }
  const DeclineClientReq = async (userDetails) => {
    // console.log('decline', userDetails.uid);
    // return;
    setUploading(true)
    await firestore()
      .collection('Users').doc(userDetails.uid).update({
        'userDetails.MatchcoordinaterStatus': 'rejected',
      })
      .then(() => {
        setModalVisible(false)
        setUploading(false)
      })
  }

  const onSelectedClient = (index) => {
    setMatchIndex(index)
    setSuggestedMatch(!suggestedMatch)
    // ser

    const Matchuser = ClientUser[index]
    // console.log(Matchuser);
    if (Matchuser) {
      setFilterMatchUser(Matchuser)
      getfilterMatchUsers(Matchuser)
    }
  }
  const OnMatchDetails = (item, itemtwo) => {
    // console.log(item , itemtwo);
    setUserTemp(item)
    setMatchUserTemp(itemtwo)
    setMatchModal(true)
  }


  const getfilterMatchUsers = async (filterMatchUser) => {
    // console.log(filterMatchUser.DescribePartner, filterMatchUser.Gender, filterMatchUser.NextLongestRelationship,
    //   filterMatchUser.PartnerBuildType, filterMatchUser.PartnerDiet, filterMatchUser.PartnerDisability, filterMatchUser.PartnerEthnicity,
    //   filterMatchUser.PartnerExercise, filterMatchUser.PartnerGender, filterMatchUser.PartnerMaxHeight, filterMatchUser.PartnerMinHeight,
    //   filterMatchUser.PartnerNature, filterMatchUser.PoliticalPartnerView, 'useEffect here');
    // console.log(filterMatchUser);
    setUploading(true)
    await firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log(documentSnapshot.data());
          const data = documentSnapshot.data().userDetails;

          if (filterMatchUser?.uid != data?.uid && data?.Category != 'Mediator' && filterMatchUser?.PartnerGender == data?.Gender && filterMatchUser?.PartnerMaxHeight >= data?.Hieght && filterMatchUser?.PartnerMinHeight <= data?.Hieght && filterMatchUser?.Relagion == data?.Relagion && filterMatchUser?.PartnerEthnicity == data?.Ethnicity && filterMatchUser?.PartnerNature == data?.Nature && filterMatchUser?.PartnerDisability == data?.Disability && filterMatchUser?.PartnerBuildType == data?.BuildType && filterMatchUser?.PartnerDiet == data?.Diet && filterMatchUser?.PoliticalPartnerView >= data?.PoliticalView && filterMatchUser?.DescribePartner == data?.DescribeYou && filterMatchUser?.PartnerExercise == data?.Exercise) {
            const updateData = {
              ...data,
              matchpercent: '100%',
            }
            users.push(updateData);

            // console.log(updateData, '100%');
          }
          else if (filterMatchUser?.uid != data?.uid && data?.Category != 'Mediator' && filterMatchUser?.PartnerGender == data?.Gender && filterMatchUser?.PartnerMaxHeight >= data?.Hieght && filterMatchUser?.PartnerMinHeight <= data?.Hieght && filterMatchUser?.Relagion == data?.Relagion && filterMatchUser?.PartnerEthnicity == data?.Ethnicity && filterMatchUser?.PartnerNature == data?.Nature && filterMatchUser?.PartnerDisability == data?.Disability && filterMatchUser?.PartnerBuildType == data?.BuildType && filterMatchUser?.PartnerDiet == data?.Diet && filterMatchUser?.PoliticalPartnerView >= data?.PoliticalView) {
            // users.push(data);
            const updateData = {
              ...data,
              matchpercent: '95%',
            }
            users.push(updateData);

            // console.log(updateData, '95%');
          }
          else if (filterMatchUser?.uid != data?.uid && data?.Category != 'Mediator' && filterMatchUser?.PartnerGender == data?.Gender && filterMatchUser?.PartnerMaxHeight >= data?.Hieght && filterMatchUser?.PartnerMinHeight <= data?.Hieght && filterMatchUser?.Relagion == data?.Relagion && filterMatchUser?.PartnerEthnicity == data?.Ethnicity && filterMatchUser?.PartnerNature == data?.Nature && filterMatchUser?.PartnerDisability == data?.Disability) {
            // users.push(data);
            const updateData = {
              ...data,
              matchpercent: '85%',
            }
            users.push(updateData);

            console.log(updateData, '85%');
          }
          else if (filterMatchUser?.uid != data?.uid && data?.Category != 'Mediator' && filterMatchUser?.PartnerGender == data?.Gender && filterMatchUser?.PartnerMaxHeight >= data?.Hieght && filterMatchUser?.PartnerMinHeight <= data?.Hieght && filterMatchUser?.Relagion == data?.Relagion && filterMatchUser?.PartnerEthnicity == data?.Ethnicity) {
            const updateData = {
              ...data,
              matchpercent: '75%',
            }
            users.push(updateData);
            // console.log(updateData, '75%');
          }
          else if (filterMatchUser?.uid != data?.uid && data?.Category != 'Mediator' && filterMatchUser?.PartnerGender == data?.Gender && filterMatchUser?.PartnerMaxHeight >= data?.Hieght && filterMatchUser?.PartnerMinHeight <= data?.Hieght) {
            const updateData = {
              ...data,
              matchpercent: '65%',
            }
            users.push(updateData);
            // console.log(updateData, '65%');
          }
          // if (data.Category == 'Mediator') {
          // }
        })
        setMatchUsers(users)
        // setReqUser(users.slice(0, 10))
      })
    // .then(() => {
    //   // setModalVisible(false)
    setUploading(false)
    // })
  }

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

  const NotificationPermission = () => {
    new Promise(async (resolve, reject) => {
      if (Platform.OS === 'ios') {
        try {
          const authStatus = await messaging().requestPermission();
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          if (enabled) {
            return resolve(authStatus);
          }
          reject('Permission not granted');
        } catch (error) {
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
            console.log('yes');
            GetFcmToken();
          }
          return reject('Location Permission denied');
        })
        .catch(error => {
          console.log('Ask Location permission error: ', error);
          return reject(error);
        });
    });
  }

  useEffect(() => {
    locationPermission();
    getCurrentLocation();

    fetchUser();
    fetchClients();
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

        <View style={styles.contentContainer}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: "space-between",
            width: '100%',
            // paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: COLORS.light
          }}>
            {CoordinatorBtn.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSlide(index)}
                style={{
                  // flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 0.5,
                  width: '50%',
                  // borderColor: value == index ? COLORS.main: COLORS.gray,
                  borderRadius: 10,
                  height: 46,
                  backgroundColor: value == index ? COLORS.main : COLORS.light
                }}
              >
                <Text style={{
                  fontFamily: '',
                  color: COLORS.black
                }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {coordinatorBtn == 'Your Clients' ?
          <View style={{ paddingHorizontal: 10, marginBottom: 100 }}>
            {!ClientUser == '' ?
              <ScrollView showsVerticalScrollIndicator={false}>
                {ClientUser.map((item, index) => (
                  // <Text key={index}>test</Text>
                  <View key={index}>
                    <View
                      style={{
                        backgroundColor: COLORS.white,
                        borderWidth: 5,
                        borderRadius: 20,
                        borderColor: COLORS.white,
                        // alignItems: 'center',
                        elevation: 5,
                        marginHorizontal: 15,
                        marginBottom: 20,
                        marginTop: 5,
                        paddingBottom: 20
                      }}>
                      <Image source={{ uri: item?.image1 }} resizeMode='cover'
                        style={{
                          height: 350,
                          width: '100%',
                          borderRadius: 20,
                          // paddingHorizontal: 10
                        }} />
                      <View>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 5,
                          paddingTop: 10
                        }}>
                          <Image source={require('../../../../assets/dot.png')} resizeMode='contain'
                            style={{
                              width: 5,
                              height: 5,
                              marginRight: 5
                            }} />
                          <Text style={{
                            fontSize: 20, fontWeight: 'bold',
                            color: COLORS.black,
                            marginRight: 5,
                          }}>{item?.Name &&
                            item?.Name?.charAt(0).toUpperCase() + item?.Name.slice(1)
                            }</Text>
                          <Text style={{
                            fontSize: 20,
                            color: COLORS.black,
                            marginRight: 5
                          }}>, 25</Text>
                          <Image source={require('../../../../assets/conform.png')} resizeMode='contain'
                            style={{
                              width: 20,
                              height: 20,
                            }} />
                        </View>
                      </View>
                      <View>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 5,
                          justifyContent: 'space-between'
                        }}>
                          <Text style={{
                            color: COLORS.black,
                            marginRight: 5
                          }}>Model at Instagaram</Text>
                          {matchIndex == index ?
                            <TouchableOpacity
                              onPress={() => GetUserDetailsTwo(item)}
                              style={{
                                color: COLORS.black,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 5,
                                backgroundColor: COLORS.main,
                                padding: 3,
                                paddingHorizontal: 8,
                                borderRadius: 5,
                                fontSize: 12,
                              }}>
                              <Text style={{
                                fontSize: 13,
                                color: COLORS.black,
                                // fontSize:12,
                              }}>More Details</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                              onPress={() => navigation.navigate('ChatingScreen', {
                                userName: item?.Name,
                                userImg: item?.image1,
                                uid: item?.uid,
                                chatUser: item,
                              })}
                              style={{
                                color: COLORS.black,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 5,
                                backgroundColor: COLORS.main,
                                padding: 3,
                                fontWeightL: 800,
                                paddingHorizontal: 8,
                                borderRadius: 5,
                                fontSize: 12,
                              }}>
                              <View style={{
                                paddingRight: 3,
                              }}>
                                <Message width={14} height={14} />
                              </View>
                              <Text style={{
                                fontSize: 13,
                                color: COLORS.black
                              }}>Chat</Text>
                            </TouchableOpacity>
                          }
                        </View>
                      </View>
                    </View>
                    <View style={{
                      alignItems: 'center',
                      marginTop: -30,
                      marginBottom: 0,
                    }}>
                      <TouchableOpacity
                        onPress={() => onSelectedClient(index)}
                        activeOpacity={0.8}
                        style={{
                          alignItems: 'center',
                          backgroundColor: COLORS.main,
                          padding: 4,
                          borderRadius: 50,
                          justifyContent: 'center',
                          width: 20,
                          height: 20,
                        }}>
                        {matchIndex == index ?
                          <Image source={require('../../../../assets/dropdown.png')} resizeMode='contain'
                            style={{ tintColor: COLORS.black, transform: [{ rotateZ: '-180deg' }] }} />
                          :
                          <Image source={require('../../../../assets/dropdown.png')} resizeMode='contain'
                            style={{
                              tintColor: COLORS.black
                            }} />
                        }
                      </TouchableOpacity>
                    </View>

                    {matchIndex == index &&
                      <View>
                        <View style={{
                          alignItems: 'center',
                          height: 40,
                          // backgroundColor:COLORS.main,
                          justifyContent: 'center'
                        }}>
                          <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: COLORS.black,
                          }}>Suggest Matches</Text>
                        </View>
                        {matchUsers ?
                          <>
                            {!matchUsers.length == 0 ?
                              <>
                                {
                                  matchUsers.map((itemtwo, index) => (
                                    <View
                                      key={index}
                                      style={{
                                        // width:'100%',
                                        marginBottom: 20,
                                        marginHorizontal: 20,
                                        paddingVertical: 20,
                                        backgroundColor: COLORS.white,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        elevation: 5,
                                      }}>
                                      <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                      }}>
                                        <View style={{
                                          alignItems: 'center',
                                          // width:'50%'
                                        }}>
                                          <Image source={{ uri: item?.image1 }} resizeMode='cover'
                                            style={{
                                              width: 60,
                                              height: 60,
                                              borderRadius: 50,
                                              borderWidth: 2,
                                              borderColor: COLORS.main
                                            }}
                                          />
                                          <View>
                                            <Text style={{
                                              color: COLORS.black
                                            }}>{item?.Name}</Text>
                                          </View>
                                        </View>
                                        <Text style={{
                                          color: COLORS.black,
                                          fontSize: 15,
                                          paddingHorizontal: 20,
                                        }}>&</Text>
                                        <View style={{
                                          alignItems: 'center',
                                          // width:'50%'
                                        }}>
                                          <Image source={{ uri: itemtwo?.image1 }} resizeMode='cover'
                                            style={{
                                              width: 60,
                                              height: 60,
                                              borderRadius: 50,
                                              borderWidth: 2,
                                              borderColor: COLORS.main,
                                            }}
                                          />
                                          <View>
                                            <Text style={{
                                              color: COLORS.black
                                            }}>{itemtwo?.Name}</Text>
                                          </View>
                                        </View>
                                      </View>

                                      <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        justifyContent: 'center',
                                        paddingVertical: 10,
                                      }}>
                                        <View style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                          <Group width={14} height={14} />
                                          <Text style={{
                                            color: COLORS.black,
                                            marginRight: 5,
                                            fontSize: 12,
                                          }}>{itemtwo?.matchpercent} match chances</Text>
                                        </View>
                                        <TouchableOpacity
                                          onPress={() => OnMatchDetails(item, itemtwo)}
                                          style={{
                                            color: COLORS.black,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginRight: 5,
                                            backgroundColor: COLORS.main,
                                            padding: 3,
                                            paddingHorizontal: 8,
                                            borderRadius: 5,
                                            fontSize: 12,
                                          }}>
                                          <Text style={{
                                            fontSize: 13,
                                            color: COLORS.black,
                                            // fontSize:12,
                                          }}>Match Details</Text>
                                        </TouchableOpacity>
                                      </View>

                                    </View>
                                  ))
                                }
                              </>
                              :
                              <View style={{
                                alignItems: 'center',
                                paddingVertical: 20,
                              }}>
                                <Text style={{
                                  fontSize: 12,
                                  color: COLORS.black,
                                }}>No Match Users Found</Text>
                              </View>
                            }
                          </>
                          :
                          <View style={{
                            alignItems: 'center',
                            paddingVertical: 20,
                          }}>
                            <ActivityIndicator size="large" color={COLORS.black} animating={uploading} />
                          </View>

                        }
                      </View>
                    }
                    {matcheModal == true && matchUserTemp != null && userTemp != null &&
                      <SuggestMatche navigation={navigation} suggestedData={matchUserTemp} data={userTemp} modal={matcheModal} setModal={setMatchModal} />
                    }
                  </View>
                ))}
              </ScrollView>
              :
              <View style={{ paddingHorizontal: 20, }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 13
                }}>No Clients found please go and check request panel!</Text>
              </View>
            }

            <UserDetails type={'Client Details'} data={userDetails} setData={setUserDetails} modal={modalVisibleTwo} setModal={setModalVisibleTwo} />
          </View>

          :
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ paddingBottom: 10, }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 5
              }}>
                <View>
                  <Text style={{ color: COLORS.black }}>Accept with template</Text>
                </View>
                <View>
                  <Switch
                    trackColor={{ false: COLORS.gray, true: COLORS.mainlight }}
                    thumbColor={isEnabled ? COLORS.main : '#f4f3f4'}
                    ios_backgroundColor={COLORS.main}
                    thumbTouchSize={{
                      width: 40, height: 40
                    }}
                    onValueChange={() => setisEnabled(!isEnabled)}
                    value={isEnabled}
                  />
                </View>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 5
              }}>
                <View>
                  <Text style={{ color: COLORS.black }}>Decline with template</Text>
                </View>
                <View>
                  <Switch
                    trackColor={{ false: COLORS.gray, true: COLORS.mainlight }}
                    thumbColor={isEnabled2 ? COLORS.main : '#f4f3f4'}
                    ios_backgroundColor={COLORS.main}
                    thumbTouchSize={{
                      width: 40, height: 40
                    }}
                    onValueChange={() => setisEnabled2(!isEnabled2)}
                    value={isEnabled2}
                  />
                </View>
              </View>
              <View style={{
                width: width / 1.3
              }}>
                <Text style={{
                  fontSize: 12
                }}>
                  Premade template should say thank for choosing me unfortunately i currently am only take on clients that i feel like would be good matches with my currant clients but im sure there are other concierges that would be a better fit and they can still match you with anyone i work with if they feel like your a good match for them.
                </Text>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginBottom: 300 }}>
                {!reqUser?.length == 0 ?
                  reqUser?.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        paddingVertical: 20,
                        elevation: 1,
                        backgroundColor: COLORS.white,
                        marginBottom: 3,
                        // backgroundColor: COLORS.blue
                      }}>
                      <View style={{
                        width: '25%',
                        // backgroundColor: COLORS.gray,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <TouchableOpacity
                          onPress={() => GetUserDetails(item)}
                          style={{
                            borderRadius: 50,
                            borderWidth: 4,
                            borderColor: COLORS.main
                          }}>
                          <Image source={{ uri: item.image1 }} resizeMode='cover' style={{
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                          }} />
                        </TouchableOpacity>
                      </View>
                      <View style={{
                        width: '75%',
                        // flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                      }}>
                        <View style={{
                          // backgroundColor: COLORS.dark,
                          width: '100%',
                          // width: width / 1.4,
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingBottom: 10
                        }}>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '80%',
                            // backgroundColor: COLORS.gray2
                          }}>
                            <View style={{
                              paddingRight: 5
                            }}>
                              <Text style={{
                                fontSize: 15,
                                fontWeight: '500',
                                color: COLORS.black
                              }}>{item.Name.split(' ',)[0]}</Text>
                            </View>
                            <View style={{ paddingRight: 5 }}>
                              <SVGImg1 width={20} height={20} />
                            </View>
                            <View style={{
                              // paddingLeft: 5
                            }}>
                              <Text style={{ fontSize: 12 }}>Diamonds +</Text>
                            </View>
                          </View>
                          <View style={{
                            width: '20%',
                            // paddingHorizontal: 5
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            // backgroundColor: COLORS.black,
                          }}>
                            <Text style={{
                              fontSize: 12,
                              color: COLORS.green
                            }}>Call</Text>
                          </View>
                        </View>
                        <View style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <TouchableOpacity
                            onPress={() => DeclineClientReq(item)}
                            style={{
                              width: '45%',
                              // paddingHorizontal: 40,
                              paddingVertical: 8,
                              borderRadius: 5,
                              backgroundColor: COLORS.black,
                            }}>
                            <Text style={{
                              color: COLORS.white,
                              fontSize: 12,
                              textAlign:'center'
                            }}>
                              Decline
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => AcceptClientReq(item)}
                            style={{
                              width: '45%',
                              // paddingHorizontal: 40,
                              paddingVertical: 8,
                              borderRadius: 5,
                              backgroundColor: COLORS.main,
                            }}>
                            <Text style={{
                              color: COLORS.black,
                              fontSize: 12,
                              textAlign:'center'
                            }}>
                              Accept
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
                  :
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: width,
                    height: height
                  }}>
                    <ActivityIndicator size="large" color={COLORS.main} animating={uploading} />
                  </View>
                }
              </View>

            </ScrollView>


            <UserDetails onpress={() => AcceptClientReq(userDetails)} type={'Request Details'} data={userDetails} setData={setUserDetails} modal={modalVisible} setModal={setModalVisible} />

            <Loader modal={uploading} uploading={uploading} />

          </View>
        }
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white
  },
  contentContainer: {
    // borderRadius:50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:COLORS.black
  },
})