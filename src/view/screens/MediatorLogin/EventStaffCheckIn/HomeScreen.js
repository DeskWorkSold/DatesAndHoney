import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Modal, PermissionsAndroid, Platform, SafeAreaView, ScrollView, SectionList, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';
import { RadioButton, TextInput } from 'react-native-paper';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get("window");

const contacts = [
  { id: '1', name: 'Anghel, Jason', slogan: 'Early Bird' },
  { id: '2', name: 'Bob', slogan: 'Early Bird' },
  { id: '3', name: 'Charlie', slogan: 'Early Bird' },
  { id: '4', name: 'David', slogan: 'Early Bird' },
  { id: '5', name: 'Emily', slogan: 'Early Bird' },
  { id: '6', name: 'Frank', slogan: 'Early Bird' },
  { id: '7', name: 'Grace', slogan: 'Early Bird' },
  { id: '8', name: 'Henry', slogan: 'Early Bird' },
  { id: '9', name: 'Isaac', slogan: 'Early Bird' },
  { id: '10', name: 'Jack', slogan: 'Early Bird' },
  { id: '11', name: 'Kate', slogan: 'Early Bird' },
  { id: '12', name: 'Lucy', slogan: 'Early Bird' },
  { id: '13', name: 'Mike', slogan: 'Early Bird' },
  { id: '14', name: 'Nancy', slogan: 'Early Bird' },
  { id: '15', name: 'Olivia', slogan: 'Early Bird' },
  { id: '16', name: 'Peter', slogan: 'Early Bird' },
  { id: '17', name: 'Quincy', slogan: 'Early Bird' },
  { id: '18', name: 'Rachel', slogan: 'Early Bird' },
  { id: '19', name: 'Sarah', slogan: 'Early Bird' },
  { id: '20', name: 'Tom', slogan: 'Early Bird' },
  { id: '21', name: 'Uma', slogan: 'Early Bird' },
  { id: '22', name: 'Victor', slogan: 'Early Bird' },
  { id: '23', name: 'Wendy', slogan: 'Early Bird' },
  { id: '24', name: 'Xavier', slogan: 'Early Bird' },
  { id: '25', name: 'Yvonne', slogan: 'Early Bird' },
  { id: '26', name: 'Zoe', slogan: 'Early Bird' },
  { id: '27', name: 'Zoe Two', slogan: 'Early Bird' },
];



const ContactList = ({ contacts }) => {
  // Step 1: Sort the array alphabetically
  const sortedContacts = contacts.sort((a, b) =>
    a.Name.localeCompare(b.Name)
  );

  // Step 2: Group contacts by alphabet
  const groupedContacts = sortedContacts.reduce((result, contact) => {
    const firstLetter = contact.Name.charAt(0).toUpperCase();
    if (!result[firstLetter]) {
      result[firstLetter] = [];
    }
    result[firstLetter].push(contact);
    return result;
  }, {});

  // Step 3: Render grouped contacts in SectionList
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderItem = ({ item }) => (
    <View style={{
      backgroundColor: COLORS.white,
      marginHorizontal: 20,
      marginBottom: 5,
      borderRadius: 10,
      elevation: 4,
      justifyContent: 'center',
      padding: 10,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black
      }}>{item.Name}</Text>
      <Text style={{
        fontSize: 13,
        color: COLORS.gray
      }}>{item?.TicketAddToCard?.Tickets?.ticketTitle}</Text>
    </View>
  );

  const sections = Object.keys(groupedContacts).map((key) => ({
    title: key,
    data: groupedContacts[key],
  }));

  return (
    <SectionList
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};


const HomeScreen = ({ navigation }) => {
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState(null);
  const [checkInUsers, setCheckInUsers] = useState(null);
  const [tempCheckInUsers, setTempCheckInUsers] = useState(null);
  const mediator = useSelector(selectMediatorUser);

  const CurrentUser = auth().currentUser.uid;


  const FetchCheckIn = () => {
    setUploading(true)
    const UserbuyTicket = [];

    firestore()
      .collection('SellTickets')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const promises = [];
        querySnapshot.forEach((documentSnapshot) => {
          const recentdata = documentSnapshot?.data();
          // console.log('hello' , recentdata);
          if (recentdata?.CheckIn == true && recentdata?.CheckedUserId == CurrentUser) {
            // UserbuyTicket?.push(recentdata)
            const promise = firestore()
              .collection('Users')
              .doc(recentdata?.useruid)
              .get()
              .then(querySnapshot => {
                if (querySnapshot.exists) {
                  const userData = querySnapshot.data()?.userDetails;
                  const concatenatedObj = { ...userData, ...recentdata };
                  // console.log('===>123', concatenatedObj);
                  // return
                  // let newUpdate = [{ ...TicketBuyUsersTemp, data }]
                  UserbuyTicket.push(concatenatedObj)
                  // console.log(newSelectedItems);
                  // console.log('dataOne===>', dataOne);
                }
                else {
                  console.log('user not exist');
                }
              })
              .catch(error => {
                console.log('Error fetching user data:', error);
              });
            promises.push(promise);
          }
          // setRecentData(Mat chedUser[0])
        });
        Promise.all(promises)
          .then(() => {
            // console.log(UserbuyTicket);
            setTempCheckInUsers(UserbuyTicket);
            setCheckInUsers(UserbuyTicket);
            setUploading(false)
          })
          .catch(error => {
            console.log('Error in Promise.all:', error);
          });
      });
  }

  function removeDuplicates(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (!result.includes(arr[i])) {
        result.push(arr[i]);
      }
    }
    return result;
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


  useEffect(() => {
    FetchCheckIn();
    locationPermission();
    getCurrentLocation();

    GetFcmToken();

  }, [])
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

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = checkInUsers.filter((item) => {
        const itemData = item.Name ? item.Name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      setTempCheckInUsers(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setTempCheckInUsers(checkInUsers);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>
        <View>
          <Text style={{
            fontSize: 20,
            textAlign: 'center',
            color: COLORS.black,
            fontWeight: 'bold',
          }}>Check-ins on this device</Text>
        </View>

        <View style={{
          backgroundColor: COLORS.light,
          marginHorizontal: 20,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          marginVertical: 10,
        }}>
          <View style={{
            width: '10%',
            alignItems: 'center',
            // backgroundColor:COLORS.main
          }}>
            <Image source={require('../../../../assets/search.png')} resizeMode='contain' style={{
              width: 20,
              height: 20,
            }} />
          </View>
          <TextInput
            placeholder='Search for attendees'
            placeholderTextColor={COLORS.gray}
            value={search}
            underlineColor={COLORS.transparent}
            activeUnderlineColor={COLORS.transparent}
            onChangeText={(search) => searchFilterFunction(search)}
            style={{
              width: '90%',
              backgroundColor: COLORS.transparent
            }}
          />
        </View>
        {uploading ?
          <View style={{
            padding: 20,
            alignItems: 'center'
          }}>
            <ActivityIndicator size="small" color={COLORS.main} animating={uploading} />
          </View>
          :
          <>
            {tempCheckInUsers?.length > 0 ?
              <View>
                <ContactList contacts={tempCheckInUsers} />
              </View>
              :
              <View style={{
                padding: 20,
                alignItems: 'center'
              }}>
                <Text>No check-In users found!</Text>
                {/* <ActivityIndicator size="small" color={COLORS.main} animating={uploadingTwo} /> */}
              </View>
            }
          </>
        }
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white,
    marginVertical: 20,
    flex: 1,
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 16,
    color: COLORS.black
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    padding: 8,
    marginHorizontal: 20,
  },
  itemHead: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
})