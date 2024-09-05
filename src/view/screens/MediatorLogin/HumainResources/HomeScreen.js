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
    name: 'Event Staff',
    uid: '3',
  },
  {
    id: '2',
    name: 'Front Door POS',
    uid: '4',
  },
  {
    id: '3',
    name: 'Event Vendor',
    uid: '5',
  },
  {
    id: '4',
    name: 'Profile Optimizer',
    uid: '6',
  },
  {
    id: '5',
    name: 'Social Media Manager',
    uid: '7',
  },
  {
    id: '6',
    name: 'Content Producer',
    uid: '8',
  },
  {
    id: '7',
    name: 'Legal Team',
    uid: '9',
  },
  {
    id: '8',
    name: 'Talent Agency',
    uid: '10',
  },
  {
    id: '9',
    name: 'Event Coordinator',
    uid: '11',
  },
  {
    id: '10',
    // name: 'Concierge Onboarding',
    name: 'HR Manager',
    uid: '12',
  },
  {
    id: '11',
    // name: 'Concierge Onboarding',
    name: 'Influencer',
    uid: '1',
  },
  {
    id: '12',
    // name: 'Concierge Onboarding',
    name: 'Match Coordinator',
    uid: '2',
  },
];

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};


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

  const SendToAll = async (autoCode) => {
    // console.log(autoCode);
    // return
    const shareOptions = {
      title: 'Share via',
      // title: 'Promo Code: ' + autoCode,
      message: 'Referal Code: ' + autoCode,  //string
    };

    // return
    try {
      const ShareResponce = await Share.open(shareOptions)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log('Error2', err);
        });
    }
    catch (e) {
      console.log('Error', e);
    }
  }


  const fetchRestrictedUser = async () => {
    setUploading(true)
    await firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          const data = documentSnapshot.data().userDetails;
          if (data?.Category == 'Mediator' && !data?.PanelAccess && data?.uid != CurrentUser && !data?.AccessGiven == CurrentUser) {
            users.push(data)
          }
          else if (data.Category == 'Mediator' && !data.PanelAccess && data.uid != CurrentUser) {
            // console.log('==>1', data);
            users.push(data);
          }
        })
        setRUser(users)
        setRUserTemp(users)
        // console.log(users);
        setUploading(false)
      })
  }


  const searchFilterFunction = (text) => {
    if (text) {
      const newData = FilterTag.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setStaffCategory(newData);
      setSearch(text);
    } else {
      setStaffCategory(FilterTag);
      setSearch(text);
    }
  };

  const filterUserFunction = (text, index) => {
    setStaffCategoryIndex(index)
    if (text) {
      const test = [];
      const newData = rUser.filter((item) => {
        if (item.MediatorId == text.uid) {
          test.push(item);
        }
      });
      setRUserTemp(test)
    } else {
      setRUserTemp(rUser)
    }
  };

  const handleSelection = (item) => {
    const newSelectedItems = [...selectedItems, item];
    setSelectedItems(newSelectedItems);
  };

  const handleRemoval = (index, item) => {
    const newSelectedItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(newSelectedItems);
    console.log(selectedItems);
  };

  const onSelectUser = (index, item) => {
    // console.log(index);
    setSelectUser(index)
    const newSelectedItems = [...selectedItems, item];
    setSelectedItems(newSelectedItems);
    console.log(selectedItems);
  };

  const SelectAll = () => {
    // const newSelectedItems = [...selectedItems, item];
    setSelectedItems(rUserTemp);
  }
  const UnSelectAll = () => {
    setSelectedItems([]);
  }

  const SelectAllTwo = () => {
    // const newSelectedItems = [...selectedItems, item];
    setSelectedItems(rUserTemp);
  }
  const UnSelectAllTwo = () => {
    setSelectedItems([]);
  }



  const OnGiveAccesstoSelected = () => {
    if (selectedItems.length != 0) {
      console.log(selectedItems);
      setModal(true)
    }
    else {
      ToastAndroid.show("Please select staff!", ToastAndroid.SHORT);
    }
  }
  const GiveAccess = async () => {
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
    fetchRestrictedUser();
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
          }}>Manage Staff</Text>
        </View>

        <View style={{
          // marginHorizontal:20,
          alignSelf: 'center',
          marginTop: 20,
          width: '90%',
          backgroundColor: COLORS.light,
          borderRadius: 10,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <View>
            <Image source={require('../../../../assets/search.png')} resizeMode='contain' style={{
              width: 15,
              height: 15,
            }} />
          </View>
          <TextInput
            value={search}
            onChangeText={(text) => searchFilterFunction(text)}
            placeholder='Search or add tags'
            underlineColor={COLORS.transparent}
            activeUnderlineColor={COLORS.transparent}
            placeholderTextColor={COLORS.gray}
            style={{
              backgroundColor: COLORS.transparent,

            }}
          />
        </View>
        <View style={{
          marginTop: 10,
          paddingHorizontal: 20
        }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {staffCategory.map((item, index) => (
              <TouchableOpacity
                onPress={() => filterUserFunction(item, index)}
                key={index} style={{
                  borderWidth: 1,
                  marginRight: 5,
                  borderColor: COLORS.black,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <View style={{
                  // width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 10,
                  // backgroundColor: COLORS.main
                }}>
                  <Text style={{
                    color: COLORS.black,
                  }}>#</Text>
                  <Text style={{
                    paddingLeft: 5,
                    color: COLORS.black,
                  }}>{item.name}</Text>
                </View>
                {staffCategoryIndex == index ?
                  <TouchableOpacity onPress={() => filterUserFunction()}>
                    <Image source={require('../../../../assets/cancle.png')} resizeMode='contain'
                      style={{
                        width: 10,
                        height: 10,
                        fontWeight: 'bold',
                        tintColor: COLORS.black,
                      }} />
                  </TouchableOpacity>
                  :
                  <Image source={require('../../../../assets/cancle.png')} resizeMode='contain'
                    style={{
                      width: 10,
                      height: 10,
                      tintColor: COLORS.black,
                      transform: [{ rotateZ: '-45deg' }],
                    }} />
                }
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginVertical: 15,
          paddingHorizontal: 20
        }}>
          <TouchableOpacity
            onPress={() => UnSelectAll()}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              backgroundColor: COLORS.pink,
              marginRight: 5,
            }}>
            <Text style={{
              color: COLORS.white,
              fontSize: 12,
            }}>Unselect all</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SelectAll()}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              backgroundColor: COLORS.black,
              marginRight: 5,
            }}>
            <Text style={{
              color: COLORS.white,
              fontSize: 12,
            }}>Select all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            {uploading == false ?
              <View style={{
                // flex: 1,
                alignSelf: 'center',
                marginBottom: 40,
              }}>
                {!rUserTemp?.length == 0 ?
                  <>
                    {rUserTemp.map((item, index) => (
                      <ManageStaffCard item={item} key={index} bgcolor={COLORS.light} selectUser={selectUser} selectedItems={selectedItems}
                        handleRemoval={handleRemoval} onSelectUser={onSelectUser} radiobtn={true}
                      />
                    ))}
                  </>
                  :
                  <View>
                    <Text>Mediators not found</Text>
                  </View>
                }
              </View>
              :
              <View>
                <ActivityIndicator size="small" color={COLORS.main} animating={uploading} />
              </View>
            }

            {selectedItems?.length > 0 &&
              <View style={{
                position: 'relative',
                flex: 1,
                // backgroundColor:COLORS.main
              }}>
                <CustomeButton title={'Give Access to selected'} onpress={() => OnGiveAccesstoSelected()} />
              </View>
            }


          </View>
        </ScrollView>



        <Modal
          animationType="slide"
          transparent={false}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}
        >
          <View style={{
            height: height,
            backgroundColor: COLORS.light,
            // paddingVertical: 20,
            // marginHorizontal:20,
            // padding: 20
          }}>
            <View style={{
              paddingHorizontal: 20,
              padding: 20,
              flexDirection: 'row',
              backgroundColor: COLORS.white,
              alignItems: 'center',
              // paddingHorizontal: 20,
            }}>
              <TouchableOpacity
                onPress={() => setAdvFilter(!AdvFilter)}
                style={{
                  // elevation: 90,
                  flex: 1,
                }}>
                <SVGImg2 width={46} height={46} />
              </TouchableOpacity>
              <View style={{
                flex: 2,
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: 20,
                  color: COLORS.black,
                  fontWeight: 'bold'
                }}>Give Access</Text>
              </View>
              <View style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
                <TouchableOpacity onPress={() => setModal(false)}>
                  <Image source={require('../../../../assets/cancle.png')} resizeMode='contain'
                    style={{
                      width: 15,
                      height: 15,
                      fontWeight: 'bold',
                      tintColor: COLORS.black,
                    }} />
                </TouchableOpacity>
              </View>
            </View>

            {AdvFilter &&
              <View style={{
                backgroundColor: COLORS.white,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingVertical: 15,
                // paddingHorizontal: 20
              }}>
                <TouchableOpacity
                  onPress={() => UnSelectAllTwo()}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    backgroundColor: COLORS.pink,
                    marginRight: 5,
                  }}>
                  <Text style={{
                    color: COLORS.white,
                    fontSize: 12,
                  }}>Unselect all</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => SelectAllTwo()}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    backgroundColor: COLORS.black,
                    marginRight: 5,
                  }}>
                  <Text style={{
                    color: COLORS.white,
                    fontSize: 12,
                  }}>Select all</Text>
                </TouchableOpacity>
              </View>
            }



            {selectedItems.length != 0 ?
              <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={{
                  marginTop: 5,
                  // bottom:'50%'
                }}>
                  {selectedItems.map((item, index) => (
                    <ManageStaffCard item={item} index={index} bgcolor={COLORS.white} selectUser={selectUser} selectedItems={selectedItems}
                      handleRemoval={handleRemoval} onSelectUser={onSelectUser} radiobtn={true}
                    />
                  ))}
                </View>

                <View style={{
                  alignSelf: 'center',
                  top: 0,
                }}>
                  {uploadingTwo ?
                    <View style={{
                      backgroundColor: COLORS.main,
                      width: 350,
                      height: 50,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: COLORS.transparent
                    }}>
                      <Text style={{ color: COLORS.black }}>Please wait...</Text>
                    </View>
                    :
                    <CustomeButton title={'Give Access'} onpress={() => GiveAccess()} />
                  }
                </View>
              </ScrollView>
              :
              <View style={{
                paddingHorizontal: 20,
                flex: 1,
                backgroundColor: COLORS.white
              }}>
                <Text>no user found!...</Text>
              </View>
            }
          </View>




          <Loader modal={uploadingTwo} uploading={uploadingTwo} />

        </Modal>

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