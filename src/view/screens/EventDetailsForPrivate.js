import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, ScrollView, ActivityIndicator, StatusBar, Linking, ToastAndroid, Alert } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import { useState } from 'react';
import SearchTab from '../components/SearchTab';
import EventItems from '../components/EventItems';
import EventsCategory from '../components/EventsCategory';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { events, selectEvents, selectUser } from '../../../redux/reducers/Reducers'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTabOne from '../components/HeaderTabOne';
import { color } from 'react-native-reanimated';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
const { height, width } = Dimensions.get('window');
import SVGImg1 from '../../assets/arrowleft.svg';
import moment from 'moment'
import SVGNotify from '../../assets/notify.svg';
import QRCode from 'react-native-qrcode-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomeButton from '../components/CustomeButton';
import { TextInput } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import ImageView from "react-native-image-viewing";


const EventBtn = [
  {
    id: '1',
    name: 'Explore',
  },
  {
    id: '2',
    name: 'Your Events',
  }
];

export const CategoriesEvent = [
  {
    id: '1',
    name: 'New Events',
  },
  {
    id: '2',
    name: 'Todays Event',
  },
  {
    id: '3',
    name: 'Last Events',
  },
]



const EventDetailsForPrivate = ({ navigation, route }) => {
  const { eventId } = route.params;
  // const eventId = '81a7e0fcd11cb'
  // console.log(details);
  const regesterUser = useSelector(selectUser);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const [scan, setScan] = useState(false);
  const [result, setResult] = useState(null);
  const [showID, setShowID] = useState({
    enable: false,
    error: false,
    text: null
  });
  const focus = useIsFocused()
  const dispatch = useDispatch();
  const eventExist = useSelector(selectEvents);
  const [showImageView, setShowImageView] = useState(false)
  const [requestStatus, setRequestStatus] = useState(null); // 'pending', 'approved', 'rejected', 'requested'
  const [isLoading, setIsLoading] = useState(false);

  const GetEventDetail = async () => {
    try {
      setLoading(true)
      if (eventId) {
        const eventRef = await firestore().collection('Events').doc(eventId).get();
        if (eventRef.exists) {
          const data = eventRef.data()
          const images = [];
          // image1
          // secimageUrl
          // thirdimageUrl
          // fourthimageUrl
          // fifthimageUrl
          for (let i = 1; i <= 6; i++) {
            const image = data[`image${i}`];
            if (image) {
              images.push({ uri: image });
            }
          }
          setDetails({ ...data, ImagesArray: images })
          setLoading(false)
        }
      }
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  }
  const GetEventRequest = async () => {
    try {
      const eventRef = await firestore().collection('EventRequest').doc(eventId).get();
      if (eventRef.exists) {
        const EventRequets = eventRef.data()?.EventAccessRequets || []
        if (EventRequets?.length > 0) {
          const userReq = EventRequets.find(item => item?.requesterId == regesterUser?.uid);
          // console.log(userReq, EventRequets);
          setRequestStatus(userReq)
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    GetEventDetail()
    GetEventRequest()
  }, [focus])

  const openImageViewer = (index) => {
    // setCurrentIndex(index);
    setShowImageView(true);
  };

  const handleSlide = (index) => {
    // console.log('slide');
    setValueIndex(index)
    const viewPage = EventBtn[index].name
    setEvents(viewPage);
  };

  const ScanDoc = () => {
    console.log('scan now');
  }
  const onSuccess = (e) => {
    if (e) {
      setResult(e.data);
      setScan(false)
      // Linking.openURL(e.data).catch(err =>
      //   console.error('An error occured', err)
      // );
      VerifyScanDoc(e.data)
    }
    else {
      ToastAndroid.show("Please scan your Doc first!", ToastAndroid.SHORT);
    }
  }
  const startScan = () => {
    setShowID({ ...showID, enable: false });
    setScan(true)
    setResult(null);
  }
  const onCancleScan = () => {
    setScan(false);
    setResult(null);
  }

  const VerifyScanDoc = (props) => {
    if (!props || props == null) {
      ToastAndroid.show("Doc scan error please try again!", ToastAndroid.SHORT);
      // navigation.goBack()
    }
    else {
      // console.log('QR Result==> :', props);
      ToastAndroid.show("Doc scaned now buy tickets!", ToastAndroid.SHORT);
      navigation.navigate('EventTickets', { details: details, Doc: props })
    }
  }

  const OnBuyTickets = () => {
    navigation.navigate('EventTickets', { details: details, Doc: null })
    return
    if (!showID.enable) {
      setShowID({ ...showID, enable: true });
      ToastAndroid.show("Please enter DL or ID to continue", ToastAndroid.SHORT);
    }
    else {
      if (!showID?.text || showID?.text == '') {
        setShowID({ ...showID, error: true });
        ToastAndroid.show("Please enter DL or ID to continue", ToastAndroid.SHORT);
      }
      else {
        // console.log('yes');
        navigation.navigate('EventTickets', { details: details, Doc: showID?.text })
      }
    }
  };
  const requestAccess = async () => {
    // console.log(regesterUser?.uid);
    try {
      // setIsLoading(true)
      const ref = firestore().collection("EventRequest").doc(eventId)
      const refdoc = await ref.get()
      let EventRequets = [];

      if (refdoc?.exists) {
        EventRequets = refdoc.data()?.EventAccessRequets ?? []
        const index = EventRequets.findIndex(item => item?.requesterId == regesterUser?.uid);
        console.log(index);
        if (index > -1) {
          // Update the existing promoter
          EventRequets[index] = { ...EventRequets[index], isRequested: true, isRejected: false };
        } else {
          // Add the new promoter
          EventRequets.push({
            requesterId: regesterUser?.uid,
            isApproved: false,
            isRejected: false,
            isRequested: true
          });
        }
      }
      else {
        EventRequets.push({
          requesterId: regesterUser?.uid,
          isApproved: false,
          isRejected: false,
          isRequested: true
        });
      }
      await ref.set({ EventAccessRequets: EventRequets }, { merge: true });
      ToastAndroid.show(`Access request successfully send`, ToastAndroid.SHORT)
      setIsLoading(false);
      GetEventRequest()
    }
    catch (err) {
      ToastAndroid.show(`Error: ${err}`, ToastAndroid.SHORT)
      console.log(err);
      setIsLoading(false);
    }
  }
  const handleRequestAccess = async (props) => {
    Alert.alert(
      "Request Access",
      "Do you want to send the access request?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: requestAccess }
      ]
    );
  }

  // useEffect(() => {
  //   VerifyScanDoc();
  // }, [result])

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.black} />
        {/* <HeaderTabOne
          onpress={() => navigation.openDrawer()}
          onpress2={() => navigation.navigate('LikeScreen')}
          Lefticon={require('../../assets/goback.png')}
          Righticon={require('../../assets/goback.png')}
          Title={'Events Detail'}
        /> */}
        {!scan &&
          <View style={{
            height: '100%',
            // backgroundColor: COLORS.main
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              height: 60,
            }}>
              <TouchableOpacity onPress={() => navigation?.goBack()} style={{
                flex: 1
              }}>
                <SVGImg1 width={20} height={20} />
              </TouchableOpacity>
              <View style={{
                flex: 3,
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.black,
                }}>Events Details</Text>
              </View>
              <View style={{
                flex: 1
              }}>
              </View>
            </View>
            {details ?
              <ScrollView vertical showsVerticalScrollIndicator={false} >
                <View style={{
                  alignItems: 'center',
                  // paddingTop: 10,
                  paddingHorizontal: 20,
                }}>
                  <FastImage
                    style={{
                      width: '100%',
                      height: 200,
                      borderRadius: 10,
                      // marginRight: 10,
                    }}
                    source={{
                      uri: details?.image1,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  {/* <Image source={{ uri: details.image1 }} resizeMode='cover'
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 10,
                    // marginRight: 10,
                  }} /> */}
                </View>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingTop: 10,
                  paddingBottom: 5,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: width,
                }}>
                  <View style={{
                    width: width / 1.5,
                    // backgroundColor:COLORS.black
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: COLORS.black,
                      fontWeight: 'bold'
                    }}>{details.Title}</Text>
                  </View>
                  <View style={{
                    alignItems: 'flex-end'
                  }}>
                    <Text style={{
                      fontSize: 10,
                      color: COLORS.black
                    }}>Starting from</Text>
                    <Text style={{
                      fontSize: 12,
                      color: COLORS.black,
                      fontWeight: 'bold'
                    }}>{details?.EventStatus == 'Free' ? details?.EventStatus : `$${details.totalTicketPrice}`}</Text>
                  </View>
                </View>


                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: width,
                }}>
                  <View style={{
                    flexDirection: 'row',
                    width: '70%',
                    // backgroundColor:COLORS.main
                  }}>
                    <View style={{
                      justifyContent: 'center'
                    }}>
                      <Image source={require('../../assets/location.png')} resizeMode='contain' style={{
                        width: 15,
                        height: 15,
                        marginRight: 5
                      }} />
                    </View>
                    <View style={{
                      width: width / 1.8,
                      // backgroundColor:COLORS.gray
                    }}>
                      <Text style={{
                        fontSize: 10,
                        color: COLORS.black,
                      }}>{details.location ? details.location : 'Location not confirm'}</Text>
                    </View>
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    width: '30%',
                    // backgroundColor:COLORS.main,
                    // alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                    <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                      marginRight: 5,
                      width: 15,
                      height: 15,
                      tintColor: COLORS.black
                    }} />
                    <Text style={{
                      fontSize: 10,
                      color: COLORS.black,
                    }}>
                      {moment(details?.startDate, 'MM/DD/YYYY')?.format('D MMMM, YYYY')}
                      {/* {moment(details.startDate, 'DD/MM/YYYY').format('MM/DD/YYYY')} */}
                    </Text>
                  </View>
                </View>

                <View style={{
                  paddingHorizontal: 20,
                  paddingTop: 10,
                }}>
                  <Text style={{
                    color: COLORS.black,
                    fontSize: 14,
                  }}>Description</Text>
                </View>
                <View style={{
                  paddingHorizontal: 20,
                  // paddingTop:10,
                }}>
                  <Text style={{
                    fontSize: 12,
                  }}>{details.description}</Text>
                </View>

                <View style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                  <Text style={{
                    color: COLORS.black,
                    fontSize: 14,
                  }}>Picture</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                  }}>
                    <TouchableOpacity
                      onPress={() => openImageViewer(details?.image1)}
                    >
                      <FastImage
                        style={{
                          width: 150,
                          height: 80,
                          borderRadius: 10,
                          marginRight: 10,
                        }}
                        source={{
                          uri: details?.image1,
                          headers: { Authorization: 'someAuthToken' },
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </TouchableOpacity>
                    {details.secimageUrl &&
                      <TouchableOpacity
                        onPress={() => openImageViewer(details?.secimageUrl)}
                      >
                        <FastImage
                          style={{
                            width: 150,
                            height: 80,
                            borderRadius: 10,
                            marginRight: 10,
                          }}
                          source={{
                            uri: details?.secimageUrl,
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />

                      </TouchableOpacity>
                    }
                    {details.thirdimageUrl &&
                      <TouchableOpacity
                        onPress={() => openImageViewer(details.thirdimageUrl)}
                      >
                        <FastImage
                          style={{
                            width: 150,
                            height: 80,
                            borderRadius: 10,
                            marginRight: 10,
                          }}
                          source={{
                            uri: details?.thirdimageUrl,
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </TouchableOpacity>
                    }
                    {details.fourthimageUrl &&
                      <TouchableOpacity
                        onPress={() => openImageViewer(details.fourthimageUrl)}
                      >
                        <FastImage
                          style={{
                            width: 150,
                            height: 80,
                            borderRadius: 10,
                            marginRight: 10,
                          }}
                          source={{
                            uri: details?.fourthimageUrl,
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        /></TouchableOpacity>
                    }
                    {details.fifthimageUrl &&
                      <TouchableOpacity
                        onPress={() => openImageViewer(details.fifthimageUrl)}
                      >
                        <FastImage
                          style={{
                            width: 150,
                            height: 80,
                            borderRadius: 10,
                            marginRight: 10,
                          }}
                          source={{
                            uri: details?.fifthimageUrl,
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </TouchableOpacity>
                    }
                  </View>
                </ScrollView>
                {details?.EventStatus == 'Free' ?
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 20,
                    backgroundColor: COLORS.light,
                    paddingHorizontal: 20,
                    marginTop: 20,
                  }}>
                    <View style={{ width: '100%' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <SVGNotify width={15} height={15} />
                        <View style={{ width: '80%', paddingLeft: 10, paddingVertical: 10 }}>
                          <Text style={{
                            color: requestStatus?.isApproved && requestStatus?.isRequested && !requestStatus?.isRejected ? COLORS.green : requestStatus?.isRejected && !requestStatus?.isApproved && requestStatus?.isRequested ? 'red' : COLORS.black,
                            fontSize: 14
                          }}>
                            {!requestStatus && "Request access to join this private event"}
                            {requestStatus?.isApproved && requestStatus?.isRequested && !requestStatus?.isRejected && "You have been granted access to the event!"}
                            {requestStatus?.isRejected && !requestStatus?.isApproved && requestStatus?.isRequested && "Your request was rejected by the host"}
                            {requestStatus?.isRequested && !requestStatus?.isApproved && !requestStatus?.isRejected && "Your access request has been sent, awaiting approval"}
                          </Text>
                        </View>
                      </View>

                      {!requestStatus && details?.EventStatus == 'Free' && (
                        <CustomeButton title={isLoading ? <ActivityIndicator size={'small'} color={COLORS.black} animating={isLoading} /> : 'Request Access'}
                          onpress={() => handleRequestAccess()}
                        />
                      )}

                      {requestStatus?.isRejected && details?.EventStatus == 'Free' && (
                        <CustomeButton title={isLoading ? <ActivityIndicator size={'small'} color={COLORS.black} animating={isLoading} /> : 'Request Again'}
                          onpress={() => handleRequestAccess()}
                        />
                      )}
                    </View>
                  </View>
                  : null}
                {details?.EventStatus == 'Paid' &&
                  <View style={{
                    top: 20,
                    marginBottom: 200,
                    alignSelf: 'center',
                  }}>
                    <CustomeButton title={'Buy Tickets'} width={width / 1.1} bcolor={COLORS.main} onpress={() => OnBuyTickets()} />
                  </View>
                }

                <ImageView
                  images={details?.ImagesArray?.length > 0 ? details?.ImagesArray : []}
                  imageIndex={0}
                  visible={showImageView}
                  onRequestClose={() => setShowImageView(false)}
                />
              </ScrollView>
              :
              <View style={{
                height: height,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {loading ?
                  <ActivityIndicator size={'large'} color={COLORS.main} animating={loading} />
                  :
                  <Text style={{
                    color: COLORS.main,
                    fontSize: 12
                  }}>
                    Event cannot found!
                  </Text>
                }
              </View>
            }
          </View>
        }
        {scan &&
          <View style={{
            // height: height / 1.3, // desired height
            // justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              height: '8%',
              // flex: 1,
              // marginBottom: 30,
              // justifyContent: 'center',
              backgroundColor: COLORS.white,
            }}>
              <TouchableOpacity
                onPress={() =>
                  // navigation.navigate('EventTickets', { details: details.details.item })
                  setScan(false)
                }
                style={{ flex: 1 }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <View style={{ flex: 3, alignItems: 'center', }}>
                <Text style={styles.centerText}>
                  Scan your QRCode!
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  // navigation.navigate('EventTickets', { details: details.details.item })
                  onSuccess()
                }
                style={{ flex: 1, alignItems: 'flex-end' }}>
                {/* <AntDesign name="check" size={24} color="black" /> */}
              </TouchableOpacity>
            </View>
            <QRCodeScanner
              cameraStyle={{ width: width, height: '92%' }}
              reactivate={true}
              showMarker={true}
              ref={(node) => { scanner = node }}
              onRead={onSuccess}
              markerStyle={{
                borderColor: 'red',
                borderWidth: 2,
              }}
              flashMode={RNCamera.Constants.FlashMode.torch}

            />
          </View>
        }
      </View>



      {/* </View> */}
    </SafeAreaView >
  )
}

export default EventDetailsForPrivate

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
  centerText: {
    fontSize: 16,
    padding: 0,
    fontWeight: 'bold',
    color: COLORS.black
  },
  textBold: {
    fontWeight: '500',
    color: COLORS.black,
  },
  buttonText: {
    fontSize: 21,
    color: COLORS.black
  },
  buttonTouchable: {
    // padding: 16
  }

})