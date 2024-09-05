import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Modal, PermissionsAndroid, Platform, SafeAreaView, ScrollView, SectionList, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
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


const HomeScreen = ({ navigation }) => {
  // let afcode = Math.random().toString(16).slice(2);
  // const [code, setCode] = useState(afcode);
  const [staffCategoryIndex, setStaffCategoryIndex] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingTwo, setUploadingTwo] = useState(false);
  const [search, setSearch] = useState(null);
  const [selectUser, setSelectUser] = useState(null);

  const [TicketBuyUsersId, setTicketBuyUsersId] = useState(null);
  const [TicketBuyUsers, setTicketBuyUsers] = useState(null);
  console.log('==>', TicketBuyUsers?.length);
  const [TicketBuyUsersTemp, setTicketBuyUsersTemp] = useState(null);
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


  // const AttendeeDetails = (item) => {
  //   console.log(item)
  // }


  // const renderItem = ({ item }) => (
  //   <View style={styles.itemContainer}>
  //     <Text style={styles.itemHead}>{item?.Name}</Text>
  //     <Text style={styles.itemText}>{item?.TicketAddToCard?.Tickets?.ticketTitle}</Text>
  //   </View>
  // );


  // const renderSectionHeader = ({ section: { title } }) => (
  //   <View style={styles.sectionHeaderContainer}>
  //     <Text style={styles.sectionHeaderText}>{title}</Text>
  //   </View>
  // );


  // const data = TicketBuyUsersTemp.reduce((acc, contact) => {
  //   const firstLetter = contact?.Name?.charAt(0)?.toUpperCase();
  //   if (!acc[firstLetter]) {
  //     acc[firstLetter] = [];
  //   }
  //   acc[firstLetter]?.push(contact);
  //   return acc;
  // }, {});

  // const sections = Object.keys(data)?.sort()?.map((letter) => ({
  //   title: letter,
  //   data: data[letter],
  // }));


  const fetchRecentTickets = () => {
    setUploading(true)
    firestore()
      .collection('SellTickets')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const UserbuyTicket = []
        querySnapshot.forEach((documentSnapshot) => {
          const recentdata = documentSnapshot?.data();
          // console.log('hello' , recentdata);
          if (recentdata?.CheckIn == true && recentdata?.CheckedUserId == CurrentUser) {
            // UserbuyTicket?.push(recentdata)
            firestore()
              .collection('Users')
              .doc(recentdata?.useruid)
              .onSnapshot(querySnapshot => {
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
                setTicketBuyUsersTemp(UserbuyTicket)
                setTicketBuyUsers(UserbuyTicket)
                setUploading(false)
                // console.log('==>', UserbuyTicket.length);
              })
          }
          // setRecentData(Mat chedUser[0])
        })
        return
        if (UserbuyTicket?.length > 0) {
          let uniqueArr = UserbuyTicket;
          // console.log(uniqueArr); 
          // setTicketBuyUsersId(uniqueArr)
          if (uniqueArr?.length > 0) {
            // console.log('here');
            const dataOne = []
            uniqueArr?.map((item) => {
              // console.log(j);
              firestore()
                .collection('Users')
                .doc(item?.useruid)
                .onSnapshot(querySnapshot => {
                  if (querySnapshot.exists) {
                    const userData = querySnapshot.data()?.userDetails;
                    const concatenatedObj = { ...userData, ...item };
                    // console.log('===>123', concatenatedObj);
                    // return
                    // let newUpdate = [{ ...TicketBuyUsersTemp, data }]
                    dataOne.push(concatenatedObj)
                    // console.log(newSelectedItems);

                    // console.log('dataOne===>', dataOne);
                  }
                  else {
                    console.log('hello');
                  }
                  console.log('==>', dataOne);
                  setTicketBuyUsersTemp(dataOne)
                  setTicketBuyUsers(dataOne)
                  setUploading(false)
                })
            })
            // GetTicketBuyUser(TicketBuyUsersId);
          }
          else {
            ToastAndroid.show("Network issue, please check your internet!", ToastAndroid.SHORT);
            // setUploading(false)
          }
        }
        else {
          // console.log('yess');
          setUploading(false)
        }
      })
  }

  // function removeDuplicates(arr) {
  //   let result = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     if (!result.includes(arr[i])) {
  //       result.push(arr[i]);
  //     }
  //   }
  //   return result;
  // }



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


    const isScreenOpen = true;

    if (isScreenOpen) {
      fetchRecentTickets();
      // fetchUsers();
      locationPermission();
      getCurrentLocation();

      // NotificationPermission();
      GetFcmToken();
    }
    else {
      console.log('screen unmount');
    }

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

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = TicketBuyUsers.filter((item) => {
        const itemData = item.Name ? item.Name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      setTicketBuyUsersTemp(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setTicketBuyUsersTemp(TicketBuyUsers);
      setSearch(text);
    }
  };

  // const FlatListItemSeparator = () => {
  //   return (
  //     //Item Separator
  //     <View style={styles.listItemSeparatorStyle} />
  //   );
  // };

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
          <Image source={require('../../../../assets/search.png')} resizeMode='contain' style={{
            width: 20,
            height: 20,
          }} />
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


            <View>
              {TicketBuyUsers?.map((j, i) => (
                <Text>{j.Name}</Text>
              ))}
            </View>
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
  list: {
    backgroundColor: COLORS.main,
    borderRadius: 20,
  },
  listItemSeparatorStyle: {
    width: 20,
  },

  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  itemHead: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 16,
  }
  ,
  itemText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  sectionHeaderContainer: {
    paddingHorizontal: 20, backgroundColor: COLORS.white,
  },
  sectionHeaderText: {
    fontWeight: 'bold', color: COLORS.black,
    fontSize: 16,
  }
})