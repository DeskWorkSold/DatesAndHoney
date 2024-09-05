import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Modal, Dimensions, Linking } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Share from 'react-native-share';
import { getApps, GetAppResult } from 'react-native-map-link';
import { useEffect } from 'react';
import GoogleMapKey from '../../consts/GoogleMapKey';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/reducers/Reducers';
import MapViewDirections from 'react-native-maps-directions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const DateModeScreen = ({ navigation }) => {
  const [availableApps, setAvailableApps] = useState([]);


  const [arrivalTime, setArrivalTime] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState();
  const [trackingTime, setTrackingTime] = useState('');
  const [actionTriggered, setActionTriggered] = useState(false);
  const [LocationModalVisible, setLocationModalVisible] = useState(false);
  const [ExpectedTimeVisibility, setExpectedTimeVisibility] = useState(false);
  const [TrackingTimeVisibility, setTrackingTimeVisibility] = useState(false);
  const [timeDuration, setTimeDuration] = useState(false);
  const [distanceDuration, setDistanceDuration] = useState(false);
  const [tempDates, setTempDates] = useState('');
  const [pin, setPin] = useState({
    latitude: 24.860966,
    longitude: 66.990501,
  });
  const api = GoogleMapKey?.GOOGLE_MAP_KEY
  const [region, setRegion] = useState({
    latitude: 24.902255,
    longitude: 67.1154162,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [searchTextRef, setSearchTextRef] = useState('')
  const user = useSelector(selectUser);


  useEffect(() => {
    (async () => {
      const result = await getApps({
        latitude: region.latitude,
        longitude: region.longitude,
        // title: 'The White House',
        googleForceLatLon: false,
        alwaysIncludeGoogle: true,
        appsWhiteList: ['google-maps'],
      });
      setAvailableApps(result);
    })();
  }, []);



  const OpenLocationModalView = () => {
    setLocationModalVisible(!LocationModalVisible)
    setActionTriggered('ACTION_1');
  }
  const OnSetLocation = () => {
    // console.log(pin);
    if (region) {
      console.log('selected pin', region);
      console.log('selected pin', location);
      setLocationModalVisible(false)
    }
    else {
      ToastAndroid.show("Please select location first!", ToastAndroid.SHORT);
    }
  }



  const showExpectedTimePicker = () => {
    setExpectedTimeVisibility(true)
    // setCategory('Proposal')
  }
  const hideExpectedTimePicker = () => {
    setExpectedTimeVisibility(false);
  };
  const handleConfirmExpectedTime = date => {
    // console.warn('A date has been picked: ', date);
    setTempDates(date)
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setArrivalTime(final);
    hideExpectedTimePicker();
  };
  const showTrackingTimePicker = () => {
    setTrackingTimeVisibility(true)
    // setCategory('Proposal')
  }
  const hideTrackingTimePicker = () => {
    setTrackingTimeVisibility(false);
  };
  const handleConfirmTrackingTime = date => {
    // console.warn('A date has been picked: ', date);
    // setTempDates(date)
    const final = date.toLocaleString('en-UK', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    setTrackingTime(final);
    hideTrackingTimePicker();
  };


  const onContinue = () => {
    if (!location, !trackingTime, !region, !arrivalTime) {
      if (!location) {
        ToastAndroid.show("Please select location first!", ToastAndroid.SHORT);
      }
      else if (!trackingTime) {
        ToastAndroid.show("Please select tracking Time first!", ToastAndroid.SHORT);
      }
      else if (!region) {
        ToastAndroid.show("Please select region first!", ToastAndroid.SHORT);
      }
      else if (!arrivalTime) {
        ToastAndroid.show("Please select arrival Time first!", ToastAndroid.SHORT);
      }
    }
    else {
      console.log('here', location);
      setActionTriggered('ACTION_2');
      setLocationModalVisible(!LocationModalVisible)
    }
  }
  const OnSendMessages = async () => {
    const url1 = Platform.select({
      ios: "maps:" + region.latitude + "," + region.longitude + "?q=",
      android: "geo:" + region.latitude + "," + region.longitude + "?q=",
    });
    const latLng = `${region.latitude},${region.longitude}`;
    const label = "";
    const url = Platform.select({
      ios: `${url1}${label}@${latLng}`,
      android: `${url1}${latLng}`,
    });
    // Linking.openURL('https://www.google.de/maps/@' + url)
    // console.log('https://www.google.de/maps/@' + url);
    const testurl = `https://www.google.com/maps/search/?api=1&query=${latLng}`
    // Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latLng}`);

    // const data = Linking.canOpenURL(url).then(supported => {
    //   if (supported) {
    //     // const browser_url =
    //     // "https://www.google.de/maps/@" + url
    //     // console.log('urll' , url);
    //     return Linking.openURL(url);

    //   } else {
    //     const browser_url =
    //       "https://www.google.de/maps/@" +
    //       region.latitude +
    //       "," +
    //       region.longitude;
    //     // return Linking.openURL(browser_url);
    //     console.log('browser_url', browser_url);
    //   }
    // });

    // 'https://www.google.de/maps/place/24%C2%B051'39.5%22N+66%C2%B059'25.8%22E/@24.8609709,66.9883123,17z/data=!4m4!3m3!8m2!3d24.860966!4d66.990501'

    const shareOptions = {
      title: 'Share Location',
      url: testurl,
      message:
        'Address: ' + location + ' ,Tracking Time ' + trackingTime + ' ,Arrival Time ' + arrivalTime,  //string
    };

    let Data = new Object();
    Data.message = location;
    Data.trackingTime = trackingTime;
    Data.region = region;
    Data.arrivalTime = arrivalTime;

    // console.log(shareOptions);
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

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      {/* <ScrollView> */}
      <View style={styles.container}>
        <View style={{
          alignItems: 'center',
          paddingTop: 20,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{
            flex: 1,
          }}>
            <Ionicons name='arrow-back' color={COLORS.black} size={20} />
          </TouchableOpacity>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.black,
            textAlign: 'center',
          }}>Date Mode
          </Text>
          <View style={{
            flex: 1,
          }}></View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: COLORS.black }}>Date Location </Text>
            <TouchableOpacity
              onPress={() => OpenLocationModalView()}
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <MapView
                style={styles.map1}
                initialRegion={{
                  latitude: 24.860966,
                  longitude: 66.990501,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                  draggable
                  onDragEnd={
                    (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                  title={'Test Marker'}
                  description={'This is description of marker'} />
              </MapView>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: COLORS.black }}> Where going for date? </Text>
            <View style={styles.NumberInput}>
              <TextInput
                value={location}
                placeholder={'Enter date location'}
                keyboardType='email-address'
                onChangeText={location => setLocation(location)
                }
                style={styles.TextInput}
                onPressIn={OpenLocationModalView}
              />
            </View>
          </View>
        </View>


        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: COLORS.black }}> Expected arrival time? </Text>
            <View style={styles.NumberInput}>
              <TextInput
                value={arrivalTime}
                placeholder={'Arrival time'}
                keyboardType='number-pad'
                onChangeText={arrivalTime => setArrivalTime(arrivalTime)
                }
                style={styles.TextInput}
                onPressIn={showExpectedTimePicker}
              />
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: COLORS.black }}> Tracking time </Text>
            <View style={styles.NumberInput}>
              <TextInput
                value={trackingTime}
                placeholder={'Time'}
                onChangeText={trackingTime => setTrackingTime(trackingTime)
                }
                style={styles.TextInput}
                onPressIn={showTrackingTimePicker}
              />
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>

          <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 50,
            paddingBottom: 10,
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton onpress={() => onContinue()}
                title={'Continue'} width={windowWidth / 1.1} />
            </View>
          </View>
        </View>


        <DateTimePickerModal
          isVisible={ExpectedTimeVisibility}
          mode="time"
          // display='spinner'
          onConfirm={handleConfirmExpectedTime}
          onCancel={hideExpectedTimePicker}
        />

        <DateTimePickerModal
          isVisible={TrackingTimeVisibility}
          mode="time"
          // display='spinner'
          onConfirm={handleConfirmTrackingTime}
          onCancel={hideTrackingTimePicker}
        />



        <Modal
          animationType="slide"
          transparent={false}
          visible={LocationModalVisible}
          onRequestClose={() => {
            setLocationModalVisible(!LocationModalVisible);
          }}
        >
          {actionTriggered === 'ACTION_1' ?
            <View style={{ alignItems: 'center', flex: 1 }}>
              <View style={{ marginTop: 0 }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  flex: 0,
                  height: 50
                }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                    }}
                    onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={20} onPress={() => setLocationModalVisible(false)} color={COLORS.black} />
                  </TouchableOpacity>
                  <View style={{
                    flex: 2,
                  }}>
                    <Text style={{
                      color: COLORS.black,
                      fontSize: 20,
                      fontWeight: 'bold'
                    }}> Add Location </Text>
                  </View>
                </View>
                <View style={{
                  flex: 1,
                  // marginTop: 20
                }}>
                  <GooglePlacesAutocomplete
                    placeholder="Enter a place"
                    query={{
                      key: api,
                      // language: 'en',
                      // components: "country:pk",
                      types: "establishment",
                      radius: 30000,
                      location: `${region.latitude}, ${region.longitude}`
                    }}
                    textInputProps={{
                      autoFocus: true,
                    }}
                    fetchDetails={true}
                    // ref={ref => setSearchTextRef(ref)}
                    // placeholder='Search'
                    // fetchDetails={true}
                    autoFocus={true}
                    // keyboardShouldPersistTaps={'handled'}
                    // listUnderlayColor={'transparent'}
                    // minLength={1} // minimum length of text to search
                    // returnKeyType={'search'}
                    // listViewDisplayed={'auto'}
                    GooglePlacesSearchQuery={{
                      rankby: "distance"
                    }}
                    // onFail={error => console.log(error)}
                    // onNotFound={() => console.log('no results')}
                    onPress={(data, details = null) => {
                      // console.log('======>data', data, '====>details', details)
                      setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                      })
                      setLocation(data.description)
                    }
                    }
                    // query={{
                    //     key: api,
                    //     language: 'en',
                    //     components: "country:pk",
                    //     types: "establishment",
                    //     radius: 30000,
                    //     location: `${region.latitude}, ${region.longitude}`
                    // }}
                    // nearbyPlacesAPI='GooglePlacesSearch'
                    styles={{
                      container: {
                        flex: 0, position: 'absolute', width: "90%", zIndex: 1,
                        // marginHorizontal: 20,
                        alignSelf: 'center',
                        marginTop: 10,
                      },
                      listView: { backgroundColor: "white" }
                    }}
                  // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                  // debounce={200}
                  />
                  <MapView
                    // ref={mapRef}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    initialRegion={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    {/* <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} /> */}
                    <Marker
                      coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                      }}
                      // image={require('../../../assets/map.png')}
                      draggable={true}
                      onDragEnd={(e) => {
                        console.log('Drag end', e.nativeEvent.coordinate)
                        setRegion({
                          latitude: e.nativeEvent.coordinate.latitude,
                          longitude: e.nativeEvent.coordinate.longitude,
                        })
                      }}
                      title={'Test Marker'}
                      description={'This is description of marker'} >
                      <Image
                        source={require('../../assets/map.png')}
                        style={{ width: 26, height: 28 }}
                        resizeMode="contain"
                      />
                    </Marker>
                    <Circle center={region} radius={1000} />
                  </MapView>
                  <View
                    style={{
                      position: 'absolute',//use absolute position to show button on top of the map
                      top: '70%', //for center align
                      alignSelf: 'center' //for align to right
                    }}
                  >
                    <CustomeButton title={'Add Location'} onpress={() => OnSetLocation()} />
                  </View>
                </View>
              </View>
            </View>
            :
            actionTriggered === 'ACTION_2' ?
              <View style={{ alignItems: 'center', flex: 1 }}>
                 <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  flex: 0,
                  height: 50
                }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                    }}
                    onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={20} onPress={() => setLocationModalVisible(false)} color={COLORS.black} />
                  </TouchableOpacity>
                  <View style={{
                    flex: 2,
                  }}>
                    <Text style={{
                      color: COLORS.black,
                      fontSize: 20,
                      fontWeight: 'bold'
                    }}> Share Location </Text>
                  </View>
                </View>
                <View style={{ marginTop: 0 }}>
                  <View style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapView
                      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                      initialRegion={{
                        latitude: user?.Location?.latitude ? user?.Location?.latitude : pin.latitude,
                        longitude: user?.Location?.longitude ? user?.Location?.longitude : pin.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      style={{
                        height: windowHeight,
                        width: windowWidth,
                        flex: 1
                      }}
                    >
                      {Object.keys(region).length > 0 &&
                        <MapViewDirections
                          origin={user.Location ? user.Location : pin}
                          destination={region}
                          apikey={api}
                          strokeWidth={6}
                          strokeColor={COLORS.gray}
                          optimizeWaypoints={true}
                          onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            setTimeDuration(`${result.duration.toFixed(2)} min.`)
                            setDistanceDuration(`${result.distance.toFixed(2)} km`)
                            // this.forceUpdate()
                          }}
                        />
                      }
                      <Marker
                        coordinate={region}
                      >
                        <Image
                          source={require('../../assets/map.png')}
                          style={{ width: 26, height: 28 }}
                          resizeMode="contain"
                        />
                      </Marker>
                      <Marker
                        coordinate={user.Location ? user.Location : pin}
                      >
                        <Image
                          source={require('../../assets/map.png')}
                          style={{ width: 26, height: 28 }}
                          resizeMode="contain"
                        />
                      </Marker>


                      <Circle center={user?.Location ? user?.Location : pin} radius={400} />
                    </MapView>



                    <View
                      style={{
                        position: 'absolute',//use absolute position to show button on top of the map
                        top: '60%', //for center align
                        alignSelf: 'center', //for align to right,
                        backgroundColor: COLORS.white,
                        color: COLORS.black,
                        width: windowWidth,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        height: '40%'
                      }}
                    >
                      <View style={{
                        // justifyContent:'center'
                        paddingHorizontal: 20,
                        paddingTop: 30
                      }}>
                        <View>
                          <Text style={{
                            fontSize: 12
                          }}>
                            Current Location of your Date
                          </Text>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            // height: 50
                            paddingVertical: 20
                          }}>
                            <Image source={require('../../assets/map.png')}
                              style={{ width: 16, height: 18, marginRight: 5 }}
                              resizeMode="contain"
                            />
                            <Text style={{ color: COLORS.black }}>
                              {location}
                            </Text>
                          </View>
                        </View>
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10
                        }}>
                          <Text style={{
                            fontSize: 12
                          }}>
                            Distance from you
                          </Text>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.main,
                            padding: 5,
                            borderRadius: 5
                          }}>
                            <Image source={require('../../assets/clock.png')}
                              style={{ width: 16, height: 18, marginRight: 5, tintColor: COLORS.black, color: COLORS.black }}
                              resizeMode="contain"
                            />
                            {!timeDuration ?
                              < Text style={{ color: COLORS.black }}>00:00 min</Text>
                              :
                              <Text style={{ color: COLORS.black }}>{timeDuration}</Text>
                            }
                          </View>
                        </View>
                        <View style={{
                          paddingVertical: 5,
                          marginBottom: 10,
                          flexDirection: 'row'
                        }}>
                          <Image source={require('../../assets/map.png')}
                            style={{ width: 16, height: 18, marginRight: 5 }}
                            resizeMode="contain"
                          />
                          {!distanceDuration ?
                            <Text style={{
                              color: COLORS.black
                            }}>
                              0.00 km
                            </Text>
                            :
                            <Text style={{
                              color: COLORS.black
                            }}>
                              {distanceDuration}
                            </Text>
                          }
                        </View>

                        <View style={{
                          alignItems: 'center'
                        }}>
                          <CustomeButton title={'Send Message'} onpress={() => OnSendMessages()} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              // <View>
              //   <Text>test</Text>
              // </View>
              : null}
        </Modal>
      </View >
      {/* </ScrollView> */}
    </SafeAreaView >
  )
}

export default DateModeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: '100%'
  },
  contentContainer: {
    height: '90%',
  },
  footer: {
    alignItems: 'center',
  },
  map1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: windowHeight / 5,
    width: windowWidth / 1.1,
    borderRadius: 15,
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: windowWidth / 1.1,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
  map: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: windowHeight,
    width: windowWidth,
    borderRadius: 15,
  },
})