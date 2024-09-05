import { ActivityIndicator, Alert, Dimensions, Image, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../../../components/Loader';
import messaging from '@react-native-firebase/messaging';
import SVGVideo from '../../../../assets/Video.svg'
import SVGIdea from '../../../../assets/idea1.svg'
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

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
  const [progressmeter, setProgressMeter] = useState(60);
  const [uploading, setUploading] = useState(false);
  const [imageContent, setImageContent] = useState(null);
  const [VideoContent, setVideoContent] = useState(null);

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
  const mediator = useSelector(selectMediatorUser);


  const CurrentUser = auth().currentUser.uid;


  // console.log(reqUser);
  // .collection("PostContent")
  // .orderBy("", "desc")

  const fetchContent = async () => {
    setUploading(true)
    await firestore()
      .collection('PostContent')
      .orderBy("timeStamp", "desc")
      .onSnapshot(querySnapshot => {
        const IContent = [];
        const VContent = [];
        querySnapshot.forEach((documentSnapshot) => {
          const data = documentSnapshot.data();
          // console.log(data);
          if (data?.Oweruid == CurrentUser && data?.Active == 1 && data?.Type == 'Image') {
            // console.log('Image===>',data);
            IContent.push(data);
          }
          else if (data?.Oweruid == CurrentUser && data?.Active == 1 && data?.Type == 'Video') {
            // console.log('Video===>',data);
            VContent.push(data);
          }
        })
        setImageContent(IContent);
        setVideoContent(VContent);
        setUploading(false)
      })
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


  useEffect(() => {
    fetchContent();
    locationPermission();
    getCurrentLocation();

    // NotificationPermission();
    GetFcmToken();
    // checkPermission();

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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>

            <View style={{
              paddingVertical: 20,
            }}>
              <Text style={{
                fontSize: 20,
                color: COLORS.black,
                fontWeight: 'bold',
              }}>Upload New</Text>
            </View>

            <View style={{
              backgroundColor: COLORS.white,
              width: width / 1.1,
              paddingVertical: 10,
              elevation: 3,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
              <TouchableOpacity onPress={() => navigation.navigate('SubmitStack')}>
                <SVGVideo width={90} height={90} />
              </TouchableOpacity>
              <View style={{
                paddingHorizontal: 50,
                paddingVertical: 10,
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 12,
                  textAlign: 'center'
                }}>
                  Upload Videos,Photos, Reels
                  For social media such as
                  YouTube, Instagram etc
                </Text>
              </View>
            </View>

            <View style={{
              backgroundColor: '#FFFCEF',
              width: width / 1.1,
              paddingVertical: 10,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              flexDirection: 'row'
            }}>
              <SVGIdea width={40} height={40} />
              <Text style={{
                color: COLORS.black,
                width: '80%',
                paddingLeft: 10,
                fontSize: 12,
              }}>Submmit your content for a chance to be featured in our social media Pages</Text>
            </View>

            {uploading ?
              <View style={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ActivityIndicator size={'small'} color={COLORS.main} animating={uploading} />
              </View>
              :
              <>
                {imageContent?.length > 0 || VideoContent?.length > 0 ?
                  <>
                    {imageContent?.length > 0 &&
                      <View style={{
                        marginTop: 20,
                      }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => navigation.navigate('UploadedImages', { data: imageContent })}
                        >
                          <View style={{
                            backgroundColor: COLORS.transparent,
                            ...styles.NumberInput
                          }}>
                            <View style={{ width: '100%' }}>
                              <Text style={{ color: COLORS.black }}>
                                Uploaded Images
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    }
                    {VideoContent?.length > 0 &&
                      <View style={{
                        marginTop: 20,
                      }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => navigation.navigate('UploadedVideos', { data: VideoContent })}
                        >
                          <View style={{
                            backgroundColor: COLORS.transparent,
                            ...styles.NumberInput
                          }}>
                            <View style={{ width: '100%' }}>
                              <Text style={{ color: COLORS.black }}>
                                Uploaded Videos
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    }
                  </>
                  :
                  <View>
                    <Text style={{
                      fontSize: 12,
                      color: COLORS.gray,
                      paddingVertical: 20,
                    }}>None of the images and videos have been uploaded!</Text>
                  </View>
                }
              </>
            }




            <TouchableOpacity
              onPress={() => navigation.navigate('TermsandCondition')}
            >
              <Text style={{
                borderBottomWidth: 1,
                color: COLORS.black,
                fontSize: 16,
                marginTop: '50%'
              }}>Terms and Condition</Text>
            </TouchableOpacity>


          </View>
        </ScrollView>

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
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
    // backgroundColor:COLORS.black
  },
  NumberInput: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: width / 1.1,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    elevation: 4
  },
})