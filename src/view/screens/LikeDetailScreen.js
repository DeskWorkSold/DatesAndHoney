import { ActivityIndicator, Dimensions, FlatList, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderTabOne from '../components/HeaderTabOne';
import COLORS from '../../consts/Colors';
import CustomeButton from '../components/CustomeButton'
import LikesCard from '../components/LikesCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { selectAllUsers, selectChatuser, selectUser, selectUsersLikedYou } from '../../../redux/reducers/Reducers';
import { BlurView } from "@react-native-community/blur";
import SVGImg2 from '../../assets/diamond.svg';
import SVGImg1 from '../../assets/menu.svg';
import Status from '../../assets/Status.svg';
import NonSmoker from '../../assets/NonSmoker.svg';
import Drinker from '../../assets/Drinker.svg';
import Kids from '../../assets/Kids.svg';
import Pets from '../../assets/Pets.svg';
import Orientation from '../../assets/Orientation.svg';
import Language from '../../assets/Language.svg';
import Height from '../../assets/Height.svg';
import Personality from '../../assets/Personality.svg';
import Education from '../../assets/Education.svg';
import Religion from '../../assets/Religion.svg';
import PoliticalViews from '../../assets/PoliticalViews.svg';
import FavoriteFood from '../../assets/FavoriteFood.svg';
import Exercise from '../../assets/Exercise.svg';
import Ethnicity from '../../assets/Ethnicity.svg';
import Music from '../../assets/Music.svg';
import BodyType from '../../assets/BodyType.svg';
import Slider from '@react-native-community/slider';
import Notifictaions from '../components/Notifictaions';
import Geocoder from 'react-native-geocoding';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import { SendPushNotifyMatch } from '../components/SendPushNotify';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const filteruser = [
  {
    id: 1,
    name: 'Guys',
    value: 'Male',
  },
  {
    id: 2,
    name: 'Girls',
    value: 'Female',
  },
  {
    id: 3,
    name: 'Both',
    value: 'Both',
  },
]

const filterAdvance = [
  {
    id: 1,
    name: 'Single',
    image: <Status width={40} height={40} />
  },
  {
    id: 2,
    name: 'Non Smoker',
    image: <NonSmoker width={40} height={40} />
  },
  {
    id: 3,
    name: 'Drinker',
    image: <Drinker width={40} height={40} />
  },
  {
    id: 4,
    name: 'Kids',
    image: <Kids width={40} height={40} />
  },
  {
    id: 5,
    name: 'Pets',
    image: <Pets width={40} height={40} />
  },
  {
    id: 6,
    name: 'Orintation',
    image: <Orientation width={40} height={40} />
  },
  {
    id: 7,
    name: 'Language',
    image: <Language width={40} height={40} />
  },
  {
    id: 8,
    name: 'Height',
    image: <Height width={40} height={40} />
  },
  {
    id: 9,
    name: 'Personality',
    image: <Personality width={40} height={40} />
  },
  {
    id: 10,
    name: 'Education',
    image: <Education width={40} height={40} />
  },
  {
    id: 11,
    name: 'Religion',
    image: <Religion width={40} height={40} />
  },
  {
    id: 12,
    name: 'Political Views',
    image: <PoliticalViews width={40} height={40} />
  },
  {
    id: 13,
    name: 'Any Disability',
    image: <PoliticalViews width={40} height={40} />
  },
  {
    id: 14,
    name: 'Your Body Type',
    image: <BodyType width={40} height={40} />
  },
  {
    id: 15,
    name: 'Music',
    image: <Music width={40} height={40} />
  },
  {
    id: 16,
    name: 'Favourite Food',
    image: <FavoriteFood width={40} height={40} />
  },
  {
    id: 17,
    name: 'Exercise',
    image: <Exercise width={40} height={40} />
  },
]

const LikeDetailScreen = ({ navigation }) => {
  const [likedusers, setLikedUser] = useState(null);
  const [premiumUsers, setPremiumUsers] = useState(null);
  const [modalDataUid, setModalDataUid] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);
  const [segmentedButtons, setSegmentedButtons] = useState(false);
  const [selectGender, setSelectGender] = useState(1);
  const [selectMinMaxAge, setSelectMinMaxAge] = useState('minage');
  const [FilterModaldata, setFilterModaldata] = useState([]);
  const [uploadingPremium, setUploadingPremium] = useState({
    one: false,
    two: false,
  });
  const [uploading, setUploading] = useState(false);
  const [usersFromAi, setUsersFromAI] = useState(null);
  const [usersFromAiTwo, setUsersFromAITwo] = useState(null);
  const [usersFromAiThree, setUsersFromAIThree] = useState([]);
  const [minimumAge, setminimumAgeRange] = useState(0);
  const [maximumAge, setmaximumAgeRange] = useState(0);
  const [distance, setDistance] = useState(0);
  const user = useSelector(selectUser)
  const MatchUser = useSelector(selectChatuser);
  const usersLikedYou = useSelector(selectUsersLikedYou)
  const allusers = useSelector(selectAllUsers)
  const focus = useIsFocused()

  // console.log(allusers?.length);

  // const fetchLikedUser = async () => {
  //   const userGender = user.Gender
  //   // console.log(userGender);
  //   if (userGender == 'Male') {
  //     fetchLikedUserFemale();
  //   }
  //   else {
  //     fetchLikedUserMale();
  //   }
  // }

  // const fetchLikedUserMale = async () => {
  //   const likedUser = [];
  //   await firestore()
  //     .collection('Users')
  //     .where("userDetails.Gender", '==', "Male")
  //     .onSnapshot(querySnapshot => {
  //       // console.log('Total user: ', querySnapshot.size);
  //       const modalDataUid = [];
  //       querySnapshot.forEach((documentSnapshot) => {
  //         // console.log('User ID: ', documentSnapshot.data());
  //         if (documentSnapshot.data()?.PrivateChat) {
  //           // console.log(documentSnapshot.data()?.PrivateChat);
  //           documentSnapshot.data()?.PrivateChat.map(LikedUser => {
  //             if (LikedUser.ChatuserDetails.uid == user.uid) {
  //               likedUser.push(documentSnapshot.data().userDetails)
  //               // console.log('test', documentSnapshot.data().userDetails);
  //             } else {
  //               console.log('no like found');
  //               // setChatUserDetail('')
  //             }
  //           })
  //           // console.log('final', likedUser);
  //           // users.push(documentSnapshot.data().userDetails);
  //           // modalDataUid.push(documentSnapshot.id);
  //         }
  //       });
  //       setLikedUser(likedUser)
  //       setModalDataUid(modalDataUid)
  //     })
  //   // console.log('==>' , likedusers);
  // }


  // const fetchLikedUserFemale = async () => {
  //   const likedUser = [];
  //   await firestore()
  //     .collection('Users')
  //     .where("userDetails.Gender", '==', "Female")
  //     .onSnapshot(querySnapshot => {
  //       // console.log('Total user: ', querySnapshot.size);
  //       const modalDataUid = [];
  //       querySnapshot.forEach((documentSnapshot) => {
  //         // console.log('User ID: ', documentSnapshot.data());
  //         if (documentSnapshot.data()?.PrivateChat) {
  //           // console.log(documentSnapshot.data()?.PrivateChat);
  //           documentSnapshot.data()?.PrivateChat.map(LikedUser => {
  //             if (LikedUser.ChatuserDetails.uid == user.uid) {
  //               likedUser.push(documentSnapshot.data().userDetails)
  //               // console.log('test', documentSnapshot.data().userDetails);
  //             } else {
  //               console.log('no like found');
  //               // setChatUserDetail('')
  //             }
  //           })
  //           // console.log('final', likedUser);
  //           // users.push(documentSnapshot.data().userDetails);
  //           // modalDataUid.push(documentSnapshot.id);
  //         }
  //       });
  //       setLikedUser(likedUser)
  //       console.log(likedUser);
  //       setModalDataUid(modalDataUid)
  //     })
  //   // console.log('==>' , likedusers);
  // }

  const MatchUsers = (Data, DataId) => {
    // console.log('===> ', Data, DataId);
    // return
    if (!DataId == '') {
      try {
        firestore().collection('Users').doc(DataId).onSnapshot(docSnapshot => {
          if (docSnapshot.data()?.PrivateChat) {
            docSnapshot.data()?.PrivateChat.map(chats => {
              if (chats?.ChatuserDetails?.uid == user?.uid) {
                SendPushNotifyMatch(Data, user)
                // console.log('test');
                navigation.navigate('CongratsMatchScreen', { Data: Data, });

                // Notifictaions(
                //     Docuser = CurrentUser,
                //     noticeStatus = 'Unread',
                //     tag = 'is your match founded',
                //     type = 'Swap',
                //     RequestStatus = 'Accepted',
                //     noticeID = DataId,
                //     NoticeName = Data.userDetails.Name,
                // )
                // Notifictaions(
                //     Docuser = DataId,
                //     noticeStatus = 'Unread',
                //     tag = 'is your match founded',
                //     type = 'Swap',
                //     RequestStatus = 'Accepted',
                //     noticeID = CurrentUser,
                //     NoticeName = user.Name,
                // )
                // console.log('notices send both-hand');
              } else {
                console.log('no match found');
              }
            })
          } else {
            console.log('data not found');
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('Match not found');
    }
  };

  const fetchPremiumUser = async () => {
    setUploadingPremium({ ...uploadingPremium, one: true })
    try {
      const mydoc = firestore().collection('Users').doc(user?.uid)
      const mydocGet = await mydoc.get()

      const DeletedUsers = mydocGet?.data()?.BlockedUsers?.length > 0 ? mydocGet?.data()?.BlockedUsers : []
      const matchUsers = mydocGet?.data()?.PrivateChat?.length > 0 ? mydocGet?.data()?.PrivateChat : []


      const aiUserBot = [];
      allusers?.forEach((documentSnapshot) => {
        const data = documentSnapshot.userDetails
        let checkmatchUser = matchUsers?.some(item => item?.ChatuserDetails?.uid == data?.uid);
        let checkUser = DeletedUsers?.some(item => item?.to == data?.uid);

        // console.log(data.uid !== user?.uid, data?.Category !== 'Mediator', user?.Gender !== data?.Gender, user?.Relagion == data?.Relagion);
        // console.log(user?.uid !== data?.uid, data?.Category != 'Mediator', user?.DescribePartner == data?.DescribeYou, user?.PartnerGender == data?.Gender, user?.PartnerMaxHeight >= data?.Hieght, user?.PartnerMinHeight <= data?.Hieght, user?.Relagion == data?.Relagion, user?.PartnerDisability == data?.Disability, 'ajhcb');
        // return
        if (data.uid !== user?.uid && data?.Category == 'User' && data?.Gender != user?.Gender && !checkmatchUser && !checkUser) {
          const updateData = {
            ...data,
            matchpercent: '50%',
          }
          aiUserBot.push(updateData);
        }
      })
      setUsersFromAI(aiUserBot.slice(0, 4))
      // console.log('AI :', aiUserBot);
      setUploadingPremium({ ...uploadingPremium, one: false })
    }
    catch (err) {
      // ToastAndroid.show(`${err}`, ToastAndroid.SHORT);
      console.log(err);
    }
  }

  const fetchPremiumUserTwo = async () => {
    try {
      const mydoc = firestore().collection('Users').doc(user?.uid)
      const mydocGet = await mydoc.get()

      const DeletedUsers = mydocGet?.data()?.BlockedUsers?.length > 0 ? mydocGet?.data()?.BlockedUsers : []
      const matchUsers = mydocGet?.data()?.PrivateChat?.length > 0 ? mydocGet?.data()?.PrivateChat : []


      setUploadingPremium({ ...uploadingPremium, two: true })
      const suggestUser = [];
      allusers?.forEach((documentSnapshot) => {
        const data = documentSnapshot.userDetails
        let checkmatchUser = matchUsers?.some(item => item?.ChatuserDetails?.uid == data?.uid);
        let checkUser = DeletedUsers?.some(item => item?.to == data?.uid);
        if (data.uid !== user?.uid && data?.Category == 'User' && user?.Relagion == data?.Relagion && !checkmatchUser && !checkUser) {
          const updateData = {
            ...data,
            matchpercent: '85%',
          }
          suggestUser.push(updateData);
        }
      })
      setUsersFromAITwo(suggestUser.slice(0, 4))
      setUploadingPremium({ ...uploadingPremium, two: false })
    }
    catch (err) {
      console.log(err);
      // ToastAndroid.show(`${err}`, ToastAndroid.SHORT);
    }
  }

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const json = await Geocoder.from(latitude, longitude)
      const address = json.results[0].formatted_address;
      // console.log( typeof address);
      return address;
    } catch (error) {
      console.warn(error);
      return 'Error fetching address';
    }
  };

  const fetchConcrigeSuggestion = () => {
    try {
      const ref = firestore().collection('Users').doc(user?.uid);

      const unsubscribe = ref.onSnapshot((documentSnapShot) => {
        if (documentSnapShot?.exists) {
          const Suggestions = documentSnapShot?.data()?.Suggestion;

          if (Suggestions) {
            const suggesteddata = Suggestions
              .map(async element => {
                const Suggestedid = element.SuggestedUserUid;
                const PrivateChat = documentSnapShot?.data()?.PrivateChat || [];

                if (Suggestedid) {
                  const reftwo = firestore().collection('Users').doc(Suggestedid);
                  const documentSnapShotTwo = await reftwo.get();

                  if (documentSnapShotTwo.exists) {
                    const newuser = documentSnapShotTwo?.data()?.userDetails;
                    const address = await getAddressFromCoordinates(newuser?.Location?.latitude, newuser?.Location?.longitude);
                    let liked = false;

                    if (user?.uid) {
                      const indexn = PrivateChat.findIndex(k => k?.ChatuserDetails?.uid == newuser?.uid);
                      liked = indexn !== -1;
                    }

                    return {
                      ...newuser,
                      Address: address,
                      match: element?.Suggestion?.matchpercent,
                      liked: liked,
                    };
                  }
                }
                return null;
              });

            Promise.all(suggesteddata)
              .then(filteredData => {
                const finalData = filteredData.filter(Boolean);

                // console.log(filteredData);
                // setSuggestedUser(finalData);
                setUsersFromAIThree(filteredData)
              })
              .catch(error => {
                console.error('Error fetching suggested data:', error);
              });
          }
        }
      })
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    // fetchLikedUser();
    fetchPremiumUser();
    fetchPremiumUserTwo();
    fetchConcrigeSuggestion();
  }, [focus])


  const ApplyFilter = async () => {
    const filterGender = filteruser[selectGender]
    const filterMinAge = Math.floor(minimumAge * 100)
    const filterMaxAge = Math.floor(maximumAge * 100)
    const filterDistance = Math.floor(distance * 500)

    if (filterMinAge < 17 || filterMaxAge <= 18 || filterDistance < 20 || !filterGender) {
      if (!filterGender) {
        ToastAndroid.show("Please select gender you looking for!", ToastAndroid.SHORT);
      }
      else if (filterDistance < 20) {
        ToastAndroid.show("Distance must be 20miles atleast!", ToastAndroid.SHORT);
      }
      else if (filterMinAge < 17) {
        ToastAndroid.show("Minimum age must be 17 years atleast!", ToastAndroid.SHORT);
      }
      else if (filterMaxAge <= 18) {
        ToastAndroid.show("Maximum age must be lest then 18 years!", ToastAndroid.SHORT);
      }
    }
    else {
      // console.log(
      //   // filterAdvance,
      //   filterMinAge,
      //   filterGender.value,
      //   filterDistance,
      //   filterMaxAge,
      //   updatedArray
      //   // FilterModaldata
      // )
      // return
      setUploading(true)
      const userRef = await firestore().collection('Users')
        .doc(user.uid)
      userRef.update({
        'userDetails.filterMinAge': filterMinAge,
        'userDetails.filterGender': filterGender.value,
        'userDetails.filterDistance': filterDistance,
        'userDetails.filterMaxAge': filterMaxAge,
        'userDetails.filterAdvance': FilterModaldata?.length > 0 ? FilterModaldata?.map(({ id, name }) => ({ id, name })) : [],
      }).then(() => {
        setShowFilter(false);
        // console.log('filter updated');
        ToastAndroid.show('Filter applied!', ToastAndroid.SHORT);
        setUploading(false);
        OnCancleFilter();
      })
    }
  }

  const SelectedAdvanceFilter = (item) => {
    // console.log(item);
    // console.log(user?.PackageId);
    if (!FilterModaldata?.includes(item)) {
      if (user?.PackageId == 654) {
        FilterModaldata.push(item);
      }
      else if (FilterModaldata?.length < 3) {
        FilterModaldata.push(item);
      }
      else if (FilterModaldata?.length >= 3) {
        ToastAndroid.show('You need to buy a Premium package before applay more then three advance filter!', ToastAndroid.SHORT);
      }
    }
    else {
      ToastAndroid.show('This filter already applied!', ToastAndroid.SHORT);
      console.log('already exists, so it wont be pushed');
    }
  }

  const OnPremiumPress = (props) => {
    if (props == 1) {
      if (user?.PackageId == 654 || user?.PackageId == 456) {
        ToastAndroid.show('Please upgrade your membership package to send messages!', ToastAndroid.SHORT);
      }
      else {
        ToastAndroid.show('Please upgrade your membership package to send messages!', ToastAndroid.SHORT);
      }
    }
    else {
      ToastAndroid.show('Please upgrade your membership package to like users', ToastAndroid.SHORT);
    }
  }


  const onLikeCard = async (item) => {
    // console.log(user.uid, item);
    // return
    if (!item?.PackageId || item?.PackageId <= user?.PackageId) {
      await firestore()
        .collection('Users').doc(user.uid).update({
          PrivateChat: firestore.FieldValue.arrayUnion({
            ChatuserDetails: item
          }),
        })
        .then(() => {
          console.log('You like', item.Name);
          ToastAndroid.show(`Youre like send to ${item.Name}`, ToastAndroid.SHORT);
          // navigation.navigate('MessagesScreen')
          // Notifictaions(
          //   Docuser = item.uid,
          //   noticeStatus = 'Unread',
          //   tag = 'likes you',
          //   type = 'Swap',
          //   RequestStatus = 'Unaccepted',
          //   noticeID = user.uid,
          //   NoticeName = user.Name,
          // )
          MatchUsers(item, item.uid)
        });
      return
    }
    if (item?.PackageId && item?.PackageId > user?.PackageId) {
      ToastAndroid.show(`Please upgrade your membership to like ${item?.AccountType} users`, ToastAndroid.SHORT);
      return
    }
  }

  const onChatCard = async (item) => {
    // console.log(user);
    await firestore()
      .collection('Users').doc(user.uid)
      .onSnapshot(querySnapshot => {
        // console.log(querySnapshot.data()?.PrivateChat);
        if (querySnapshot.data()?.PrivateChat) {
          querySnapshot.data()?.PrivateChat?.map((j) => {
            // console.log(j.ChatuserDetails.uid);
            if (j?.ChatuserDetails?.uid == item?.uid) {
              // navigation.navigate('c')
              navigation.navigate('ChatingScreen', {
                data: item
              })
              // console.log(j?.ChatuserDetails?.uid, item?.uid);
            }
            else {
              ToastAndroid.show(`Please Like them back before start chating.`, ToastAndroid.SHORT);
            }
          })
        }
      })
  }

  const onChatPremium = async (item) => {
    // console.log(item.uid);
    // return
    const userDoc = await firestore().collection('Users').doc(user.uid).get();
    if (userDoc.exists) {
      const privateChat = userDoc.data()?.PrivateChat;
      if (privateChat) {
        const chatUserDetails = privateChat.find(j => j?.ChatuserDetails?.uid === item?.uid);
        if (chatUserDetails) {
          const itemDoc = await firestore().collection('Users').doc(item.uid).get();
          if (itemDoc.exists) {
            const itemPrivateChat = itemDoc.data()?.PrivateChat;
            if (itemPrivateChat) {
              const likedUser = itemPrivateChat.find(f => f?.ChatuserDetails?.uid === user?.uid);
              if (likedUser) {
                navigation.navigate('ChatingScreen', {
                  data: item
                });
                return;
              } else {
                ToastAndroid.show(`Please wait till your partner likes you back.`, ToastAndroid.SHORT);
                return;
              }
            }
            else {
              ToastAndroid.show(`Please wait till your partner likes you back.`, ToastAndroid.SHORT);
              return;
            }
          }
        }
        else {
          ToastAndroid.show(`Please send Like before starting a chat.`, ToastAndroid.SHORT);
          return;
        }
      }
    }
  }


  const OnCancleFilter = () => {
    setSelectGender(1)
    setminimumAgeRange(0)
    setmaximumAgeRange(0)
    setDistance(0)
    setFilterModaldata([])
    setShowFilter(false)
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={{
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        height: 70,
      }}>
        <View style={{
          flex: 1, paddingHorizontal: 0,
          // backgroundColor: COLORS.gray,
        }}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
          >
            <SVGImg1 width={46} height={46} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: COLORS.black
          }}>Liked you</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Message')}
          >
            <Text style={{
              // fontWeight: 'bold',
              // fontSize: 20,
              color: '#2A3182'
            }}>Matches</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>


        <ScrollView showsVerticalScrollIndicator={false} vertical>
          <View style={{
            backgroundColor: COLORS.white,
            paddingBottom: 20,
            marginBottom: 300,
            height: '92%'
          }}>
            <View style={{
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 20,
              paddingHorizontal: 40,
              zIndex: 5
            }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 12,
                color: COLORS.gray
              }}>These people would like to Chat with you.Like
                them back to start a conservation.</Text>
            </View>

            <View style={{
              marginHorizontal: 20,
              padding: 20,
              alignItems: 'center',
              borderRadius: 10,
              elevation: 5,
              backgroundColor: COLORS.light,
              zIndex: 5
            }}>
              <View>
                {user?.PackageId == 654 || user?.PackageId == 654 || user?.PackageId == 123 ?
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    paddingVertical: 5,
                    fontSize: 12
                  }}>You have unlocked Silver membership!</Text>
                  :
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    paddingVertical: 5,
                    fontSize: 12
                  }}>Upgrade to Silver to Unlock</Text>
                }
              </View>
              {user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ?
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: COLORS.main,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/Crown.png')} resizeMode="contain" style={{
                    width: 22.14,
                    height: 14.79,
                  }} />
                  <Text style={{
                    color: COLORS.black,
                    fontSize: 12,
                    fontWeight: 'bold',
                    paddingLeft: 5
                  }}>Upgraded</Text>
                </View>
                :
                <TouchableOpacity
                  onPress={() => navigation.navigate('Premium Membership')}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: COLORS.main,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/Crown.png')} resizeMode="contain" style={{
                    width: 22.14,
                    height: 14.79,
                  }} />
                  <Text style={{
                    color: COLORS.black,
                    fontSize: 12,
                    fontWeight: 'bold',
                    paddingLeft: 5
                  }}>Upgrade</Text>
                </TouchableOpacity>
              }
            </View>


            {/* {showMatch &&

              <View style={{
                paddingHorizontal: 0,
              }}>
                <View style={{
                  paddingTop: 20,
                  width: '30%',
                  paddingLeft: 20,
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    fontFamily: 'Roboto-Medium',
                    color: COLORS.main,
                    borderBottomColor: COLORS.main,
                    borderBottomWidth: 0.5,
                    textAlign: 'center'
                  }}>Your Matches</Text>
                </View>

                {MatchUser?.length > 0 ? (
                  // <View style={{ height: 170, width:'100%' }}>
                  <>
                    {MatchUser.map((item, index) => (
                      <View key={index} style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.gray2,
                        width: '100%',
                        // backgroundColor:COLORS.main,
                        height: 85,
                      }}>
                        <View style={{
                          marginHorizontal: 10,
                          borderRadius: 50,
                          width: '15%',
                        }}>
                          <Image source={{ uri: item.image1 }} resizeMode='contain'
                            style={{
                              width: 45,
                              height: 45,
                              borderRadius: 10,
                            }} />
                        </View>

                        <View style={{
                          width: '45%',
                          justifyContent: 'center',
                        }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{
                              fontWeight: 'bold',
                              color: COLORS.black,
                              paddingRight: 10,
                            }}>{item.Name}</Text>
                            <Text>now</Text>
                          </View>
                          <Text>6:13PM</Text>
                        </View>
                        <View style={{
                          // width: '40%',
                          // paddingHorizontal: 20
                        }}>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('CongratsMatchScreen', {
                              userName: item.Name,
                              userImg: item.image1,
                              uid: item.uid,
                            })}
                            style={{
                              padding: 5,
                              borderRadius: 20,
                              borderWidth: 1,
                              elevation: 5,
                              backgroundColor: COLORS.white,
                              borderColor: COLORS.light,
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <Text style={{
                              paddingHorizontal: 5,
                              textAlign: 'center',
                              fontSize: 10,
                              // width: '80%',
                              color: 'red',
                            }}>Match Found!</Text>
                            <Image source={require('../../assets/heart.png')} resizeMode='contain'
                              style={{
                                tintColor: 'red',
                                width: 20,
                                height: 20,
                              }} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </>
                  // </View>
                ) : (
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    paddingVertical: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.gray2,
                    width: '100%',
                    // backgroundColor:COLORS.main,
                    height: 85,
                  }}>
                    <Text>
                      (No Matches)Liked them back to get your matches..
                    </Text>
                  </View>
                )}
              </View>
            } */}


            <View style={{
              // alignItems: 'center',
              // justifyContent:'center',
              paddingHorizontal: 10,
            }}>
              {usersLikedYou?.length > 0 ? (
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: "space-between",
                  width: '100%',
                  paddingHorizontal: 10,
                }}>
                  {usersLikedYou?.slice(0, 4)?.map((item, index) => (
                    <View key={index}
                      style={{
                        marginTop: 20,
                        width: '46%',
                        // flex:1,
                        marginHorizontal: 5,
                      }}>
                      <TouchableOpacity
                        disabled={user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ? false : true}
                        activeOpacity={0.8}
                        style={{
                          height: 200,
                          // opacity: user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ? 1 : 0.3,
                          // width: '100%',
                          borderRadius: 10,
                          backgroundColor: COLORS.white,
                          elevation: 5,
                          zIndex: user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ? 5 : 2
                        }}>
                        <View>
                          <FastImage
                            style={{
                              height: 150,
                              width: '100%',
                              borderRadius: 10,
                            }}
                            source={{
                              uri: item.image1,
                              headers: { Authorization: 'someAuthToken' },
                              priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                          {user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ?
                            null
                            :
                            <BlurView
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                zIndex: 3,
                              }}
                              blurType="light"
                              blurAmount={10}
                              reducedTransparencyFallbackColor="white"
                            />
                          }
                          {/* <Image source={{ uri: item.image1 }} resizeMode='cover'
                            blurRadius={user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ? 0 : 30}
                            style={{
                              height: 150,
                              width: '100%',
                              borderRadius: 10,
                            }}
                          /> */}
                          <View style={{
                            position: 'absolute',
                            marginTop: 110,
                            paddingHorizontal: 5,
                            flexDirection:'row'
                          }}>
                            <Text style={{
                              color: COLORS.white,
                              fontWeight: 'bold',
                            }}>{item.Name}</Text>
                            {item?.PackageId == 654 &&
                              <SVGImg2 width={20} height={20} />
                            }
                          </View>
                          {user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ?
                            null
                            :
                            <BlurView
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                              }}
                              blurType="light" // or "dark" or "extraLight"
                              blurAmount={10} // Adjust this value to control the blur intensity
                            />
                          }
                        </View>

                        <View style={{
                          flexDirection: 'row',
                          paddingHorizontal: 20,
                          paddingVertical: 5,
                          justifyContent: 'center',
                          // zIndex: 2
                        }}>
                          <TouchableOpacity
                            disabled={user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ? false : true}
                            onPress={() => onChatCard(item)}
                            style={{
                              padding: 5,
                              marginHorizontal: 10,
                              borderRadius: 20,
                              borderWidth: 1,
                              elevation: user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ? 5 : 0,
                              backgroundColor: COLORS.white,
                              borderColor: COLORS.light,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image source={require('../../assets/message.png')} resizeMode='contain'
                              style={{
                                width: 20,
                                height: 20,
                              }} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            disabled={user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ? false : true}
                            onPress={() => onLikeCard(item)}
                            style={{
                              padding: 5,
                              borderRadius: 20,
                              borderWidth: 1,
                              marginHorizontal: 10,
                              elevation: user?.PackageId == 654 || user?.PackageId == 456 || user?.PackageId == 123 ? 5 : 0,
                              backgroundColor: COLORS.white,
                              borderColor: COLORS.light,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image source={require('../../assets/heart2.png')} resizeMode='contain'
                              style={{
                                tintColor: 'red',
                                width: 20,
                                height: 20,
                              }} />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  width: '100%',
                }}>
                  <Text style={{
                    fontSize: 12,
                    color: COLORS.gray,
                  }}>
                    User's not found who's like to chat with you..
                  </Text>
                </View>
              )}

            </View>
            <View style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              zIndex: 5
            }}>
              <View style={{
                padding: 0
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>Bot matches from AI</Text>
              </View>
              <View>
                <Text style={{
                  paddingBottom: 20,
                  paddingTop: 5,
                  fontSize: 12,
                  color: COLORS.gray
                }}>Suggested by AI based on your profile</Text>
              </View>
            </View>
            <View style={{
              marginHorizontal: 20,
              padding: 20,
              alignItems: 'center',
              borderRadius: 10,
              elevation: 5,
              backgroundColor: COLORS.light,
              zIndex: 5
            }}>
              <View>
                {user?.PackageId == 654 || user?.PackageId == 456 ?
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    paddingVertical: 5,
                    fontSize: 12
                  }}>You have unlocked Gold membership!</Text>
                  :
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    paddingVertical: 5,
                    fontSize: 12,
                  }}>Upgrade to Gold to Unlock</Text>
                }
              </View>
              {user?.PackageId == 654 || user?.PackageId == 456 ?
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: COLORS.main,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/Crown.png')} resizeMode="contain" style={{
                    width: 22.14,
                    height: 14.79,
                  }} />
                  <Text style={{
                    color: COLORS.black,
                    fontSize: 13,
                    fontWeight: 'bold',
                    paddingLeft: 5,
                    fontSize: 12,
                  }}>Upgraded</Text>
                </View>
                :
                <TouchableOpacity
                  onPress={() => navigation.navigate('Premium Membership')}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: COLORS.main,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/Crown.png')} resizeMode="contain" style={{
                    width: 22.14,
                    height: 14.79,
                  }} />
                  <Text style={{
                    color: COLORS.black,
                    fontSize: 13,
                    fontWeight: 'bold',
                    paddingLeft: 5,
                    fontSize: 12
                  }}>Upgrade</Text>
                </TouchableOpacity>
              }
            </View>

            <View style={{
              paddingHorizontal: 10,
            }}>
              {!uploadingPremium.one ?
                <>
                  {usersFromAi?.length > 0 ? (
                    <View style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: "space-between",
                      width: '100%',
                      paddingHorizontal: 10,
                    }}>
                      {usersFromAi?.slice(0, 2)?.map((item, index) => (
                        <View key={index}
                          style={{
                            marginTop: 20,
                            width: '46%',
                            // flex: 1,
                            marginHorizontal: 5,
                          }}>
                          <TouchableOpacity
                            disabled={user?.PackageId == 654 || user?.PackageId == 456 ? false : true}
                            activeOpacity={0.8}
                            style={{
                              height: 200,
                              // width: '46%',
                              // width: '100%',
                              borderRadius: 10,
                              backgroundColor: COLORS.white,
                              elevation: 5,
                              // opacity: user?.PackageId == 654 || user?.PackageId == 456 ? 1 : 0.3,
                              zIndex: user?.PackageId == 654 || user?.PackageId == 456 ? 5 : 2,
                            }}>
                            <View>
                              <FastImage
                                style={{
                                  height: 150,
                                  width: '100%',
                                  borderRadius: 10,
                                }}
                                source={{
                                  uri: item.image1,
                                  headers: { Authorization: 'someAuthToken' },
                                  priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                              {user?.PackageId == 654 || user?.PackageId == 456 ?
                                null
                                :
                                <BlurView
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    zIndex: 3,
                                  }}
                                  blurType="light"
                                  blurAmount={10}
                                  reducedTransparencyFallbackColor="white"
                                />
                              }
                              <View style={{
                                position: 'absolute',
                                marginTop: 110,
                                paddingHorizontal: 5,
                                flexDirection: 'row',
                                alignItems: 'center'
                              }}>
                                <Text style={{
                                  color: COLORS.white,
                                  fontWeight: 'bold',
                                }}>{item.Name}</Text>
                                {item?.PackageId == 654 &&
                                  <SVGImg2 width={20} height={20} />
                                }
                              </View>


                            </View>

                            <View style={{
                              flexDirection: 'row',
                              paddingHorizontal: 20,
                              paddingVertical: 5,
                              justifyContent: 'center'
                            }}>
                              <TouchableOpacity
                                disabled={user?.PackageId == 654 || user?.PackageId == 456 ? false : true}
                                onPress={() => onChatPremium(item)}
                                style={{
                                  padding: 5,
                                  marginHorizontal: 10,
                                  borderRadius: 20,
                                  borderWidth: 1,
                                  elevation: user?.PackageId == 654 || user?.PackageId == 456 ? 5 : 0,
                                  backgroundColor: COLORS.white,
                                  borderColor: COLORS.light,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image source={require('../../assets/message.png')} resizeMode='contain'
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                disabled={user?.PackageId == 654 || user?.PackageId == 456 ? false : true}
                                onPress={() => onLikeCard(item)}
                                style={{
                                  padding: 5,
                                  borderRadius: 20,
                                  borderWidth: 1,
                                  marginHorizontal: 10,
                                  elevation: user?.PackageId == 654 || user?.PackageId == 456 ? 5 : 0,
                                  backgroundColor: COLORS.white,
                                  borderColor: COLORS.light,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                  style={{
                                    tintColor: 'red',
                                    width: 20,
                                    height: 20,
                                  }} />
                              </TouchableOpacity>
                            </View>



                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View style={{
                      alignItems: 'center',
                      paddingVertical: 15,
                      marginHorizontal: 10,
                    }}>
                      <Text style={{
                        fontSize: 12,
                        color: COLORS.gray
                      }}>
                        Suggestions not found from AI.
                      </Text>
                    </View>
                  )}
                </>
                :
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                  // padding:20
                  height: 70,
                  justifyContent: 'center'
                }}>
                  <ActivityIndicator size={'large'} color={COLORS.main} animating={uploadingPremium.one} />
                </View>
              }
            </View>


            <View style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              zIndex: 5
            }}>
              <View style={{
                padding: 0
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>Suggested Options</Text>
              </View>
              <View>
                <Text style={{
                  paddingBottom: 20,
                  paddingTop: 5,
                  fontSize: 12,
                  color: COLORS.gray
                }}>Suggested by Our concierge Team and Other Members
                  Never by Bots or Ai</Text>
              </View>
            </View>
            <View style={{
              marginHorizontal: 20,
              padding: 20,
              alignItems: 'center',
              borderRadius: 10,
              elevation: 5,
              backgroundColor: COLORS.light,
              zIndex: 5
            }}>
              {user?.PackageId == 654 ?
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                  fontSize: 12
                }}>You have unlocked Diamond membership!</Text>
                :
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                  fontSize: 12
                }}>Upgrade to Diamond to Unlock</Text>
              }
              <View>
                {user?.PackageId == 654 ?
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      backgroundColor: COLORS.main,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}>
                    <Image source={require('../../assets/Crown.png')} resizeMode="contain" style={{
                      width: 22.14,
                      height: 14.79,
                    }} />
                    <Text style={{
                      color: COLORS.black,
                      fontSize: 12,
                      fontWeight: 'bold',
                      paddingLeft: 5
                    }}>Upgraded</Text>
                  </View>
                  :
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Premium Membership')}
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      backgroundColor: COLORS.main,
                      borderRadius: 10,
                      alignItems: 'center'
                    }}>
                    <Image source={require('../../assets/Crown.png')} resizeMode="contain" style={{
                      width: 22.14,
                      height: 14.79,
                    }} />
                    <Text style={{
                      color: COLORS.black,
                      fontSize: 12,
                      fontWeight: 'bold',
                      paddingLeft: 5
                    }}>Upgrade</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>

            <View style={{
              paddingHorizontal: 10,
            }}>
              {!uploadingPremium.two ?
                <>
                  {usersFromAiThree?.length > 0 ?
                    <View style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'center'
                    }}>
                      {usersFromAiThree.map((item, index) => (
                        <View key={index}
                          style={{
                            marginTop: 20,
                            width: '46%',
                            marginHorizontal: 5,
                          }}>
                          <TouchableOpacity
                            disabled={user?.PackageId == 654 ? false : true}
                            activeOpacity={0.8}
                            style={{
                              height: 200,
                              // width: '100%',
                              borderRadius: 10,
                              backgroundColor: COLORS.white,
                              elevation: 5,
                              // opacity: user?.PackageId == 654 ? 20 : 0.3,
                              zIndex: user?.PackageId == 654 ? 5 : 2
                            }}>
                            <View>
                              <FastImage
                                style={{
                                  height: 150,
                                  width: '100%',
                                  borderRadius: 10,
                                }}
                                source={{
                                  uri: item.image1,
                                  headers: { Authorization: 'someAuthToken' },
                                  priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                              {user?.PackageId == 654 ?
                                null
                                :
                                <BlurView
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    zIndex: 3,
                                  }}
                                  blurType="light"
                                  blurAmount={10}
                                  reducedTransparencyFallbackColor="white"
                                />
                              }
                              <View style={{
                                position: 'absolute',
                                marginTop: 110,
                                paddingHorizontal: 5,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                                <Text style={{
                                  color: COLORS.white,
                                  fontWeight: 'bold',
                                }}>{item.Name}</Text>
                                {item?.PackageId == 654 &&
                                  <SVGImg2 width={20} height={20} />
                                }
                              </View>

                            </View>
                            <View style={{
                              flexDirection: 'row',
                              paddingHorizontal: 20,
                              paddingVertical: 5,
                              justifyContent: 'center'
                            }}>
                              <TouchableOpacity
                                disabled={user?.PackageId == 654 ? false : true}
                                onPress={() => onChatPremium(item)}
                                style={{
                                  padding: 5,
                                  marginHorizontal: 10,
                                  borderRadius: 20,
                                  borderWidth: 1,
                                  elevation: user?.PackageId == 654 ? 5 : 0, backgroundColor: COLORS.white,
                                  borderColor: COLORS.light,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image source={require('../../assets/message.png')} resizeMode='contain'
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                disabled={user?.PackageId == 654 ? false : true}
                                onPress={() => item?.liked ? ToastAndroid.show('Liked Sended', ToastAndroid.SHORT) : onLikeCard(item)}
                                style={{
                                  padding: 5,
                                  borderRadius: 20,
                                  borderWidth: 1,
                                  marginHorizontal: 10,
                                  elevation: user?.PackageId == 654 ? 5 : 0, backgroundColor: COLORS.white,
                                  borderColor: COLORS.light,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                  style={{
                                    tintColor: 'red',
                                    width: 20,
                                    height: 20,
                                  }} />
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                    :
                    <>
                      {usersFromAiTwo?.length > 0 ? (
                        <View style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: "space-between",
                          width: '100%',
                          paddingHorizontal: 10,
                        }}>
                          {usersFromAiTwo?.slice(0, 2)?.map((item, index) => (
                            <View key={index}
                              style={{
                                marginTop: 20,
                                width: '46%',
                                // flex:1,
                                marginHorizontal: 5,
                              }}>
                              <TouchableOpacity
                                disabled={user?.PackageId == 654 ? false : true}
                                activeOpacity={0.8}
                                style={{
                                  height: 200,
                                  // width: '100%',
                                  borderRadius: 10,
                                  backgroundColor: COLORS.white,
                                  elevation: 5,
                                  // opacity: user?.PackageId == 654 ? 20 : 0.3,
                                  zIndex: user?.PackageId == 654 ? 5 : 2
                                }}>
                                <View>
                                  <FastImage
                                    style={{
                                      height: 150,
                                      width: '100%',
                                      borderRadius: 10,
                                    }}
                                    source={{
                                      uri: item.image1,
                                      headers: { Authorization: 'someAuthToken' },
                                      priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                  />
                                  {user?.PackageId == 654 || user?.PackageId == 456 ?
                                    null
                                    :
                                    <BlurView
                                      style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        zIndex: 3,
                                      }}
                                      blurType="light"
                                      blurAmount={10}
                                      reducedTransparencyFallbackColor="white"
                                    />
                                  }
                                  <View style={{
                                    position: 'absolute',
                                    marginTop: 110,
                                    paddingHorizontal: 5,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                  }}>
                                    <Text style={{
                                      color: COLORS.white,
                                      fontWeight: 'bold',
                                    }}>{item.Name}</Text>
                                    {item?.PackageId == 654 &&
                                      <SVGImg2 width={20} height={20} />
                                    }
                                  </View>
                                  {user?.PackageId == 654 ?
                                    null :
                                    <BlurView
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                      }}
                                      blurType="light" // or "dark" or "extraLight"
                                      blurAmount={10} // Adjust this value to control the blur intensity
                                    />
                                  }
                                </View>
                                <View style={{
                                  flexDirection: 'row',
                                  paddingHorizontal: 20,
                                  paddingVertical: 5,
                                  justifyContent: 'center',
                                  zIndex: user?.PackageId == 654 ? 5 : 0,
                                }}>
                                  <TouchableOpacity
                                    disabled={user?.PackageId == 654 ? false : true}
                                    onPress={() => onChatPremium(item)}
                                    style={{
                                      padding: 5,
                                      marginHorizontal: 10,
                                      borderRadius: 20,
                                      borderWidth: 1,
                                      elevation: user?.PackageId == 654 ? 5 : 0, backgroundColor: COLORS.white,
                                      borderColor: COLORS.light,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Image source={require('../../assets/message.png')} resizeMode='contain'
                                      style={{
                                        width: 20,
                                        height: 20,
                                      }} />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    disabled={user?.PackageId == 654 ? false : true}
                                    onPress={() => onLikeCard(item)}
                                    style={{
                                      padding: 5,
                                      borderRadius: 20,
                                      borderWidth: 1,
                                      marginHorizontal: 10,
                                      elevation: user?.PackageId == 654 ? 5 : 0, backgroundColor: COLORS.white,
                                      borderColor: COLORS.light,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                      style={{
                                        tintColor: 'red',
                                        width: 20,
                                        height: 20,
                                      }} />
                                  </TouchableOpacity>
                                </View>
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      ) : (
                        <View style={{
                          alignItems: 'center',
                          paddingVertical: 15,
                          marginHorizontal: 10,
                        }}>
                          <Text style={{
                            fontSize: 12,
                            color: COLORS.gray
                          }}>
                            Suggestions not found from concierge team and others.
                          </Text>
                        </View>
                      )}
                    </>
                  }
                </>
                :
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                  // padding:20
                  height: 70,
                  justifyContent: 'center'
                }}>
                  <ActivityIndicator size={'small'} color={COLORS.main} animating={uploadingPremium.two} />
                </View>
              }
            </View>
            {/* 
            <View style={{
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LikesCard image={require('../../assets/profile6.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
                <LikesCard image={require('../../assets/profile4.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
              </View>
            </View>

            <View style={{
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LikesCard image={require('../../assets/profile6.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
                <LikesCard image={require('../../assets/profile4.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
              </View>
            </View> */}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showFilter}
            onRequestClose={() => {
              setShowFilter(!showFilter);
            }}
          >
            <View style={{
              height: windowHeight,
              backgroundColor: COLORS.white
            }}>
              <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View>
                  <View style={{
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <TouchableOpacity onPress={() => ApplyFilter()}>
                      <Image source={require('../../assets/right.png')} resizeMode='contain' style={{
                        tintColor: COLORS.black
                      }} />
                    </TouchableOpacity>
                    <View>
                      <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: COLORS.black
                      }}>
                        Filter
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => OnCancleFilter()}>
                      <Image source={require('../../assets/cross.png')} resizeMode='contain' style={{
                        tintColor: COLORS.black
                      }} />
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    paddingHorizontal: 20,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: COLORS.black
                    }}>
                      I'm interested in
                    </Text>
                  </View>
                  <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: COLORS.gray2,
                    marginHorizontal: 20,
                  }}>
                    {filteruser.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectGender(index)}
                        style={{
                          borderWidth: selectGender == index ? 1 : 0,
                          borderColor: selectGender == index ? '#2A3182' : null,
                          borderRadius: 10,
                          paddingHorizontal: 20,
                          paddingVertical: 15,
                          width: '33%'
                        }}>
                        <Text style={{
                          textAlign: 'center',
                          color: COLORS.black
                        }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                  }}>
                    <View style={{
                      flex: 1,
                    }}>
                      <Text style={{
                        fontSize: 16,
                        // fontWeight: 'bold',
                        color: COLORS.black
                      }}>Age Range</Text>
                    </View>
                    <View style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                    }}>
                      <TouchableOpacity onPress={() => setSelectMinMaxAge('minage')}
                        style={{
                          // backgroundColor: COLORS.main,
                          // paddingHorizontal: 3,
                          // borderRadius: 4
                        }}>
                        <Text style={{
                          fontSize: 20,
                          color: COLORS.black,
                          fontWeight: 'bold'
                        }}>{Math.floor(minimumAge * 100)}</Text>
                      </TouchableOpacity>
                      <Text style={{ color: COLORS.black }}> - </Text>
                      <TouchableOpacity onPress={() => setSelectMinMaxAge('maxage')}
                        style={{
                          // backgroundColor: COLORS.main,
                          // paddingHorizontal: 3,
                          // borderRadius: 4
                        }}>
                        <Text style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: COLORS.black
                        }}>{Math.floor(maximumAge * 100)}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {selectMinMaxAge == 'maxage' ?
                    <View style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Slider
                        style={{ width: '100%', height: 40, }}
                        minimumValue={0}
                        maximumValue={1}
                        thumbTouchSize={{
                          width: 40, height: 40
                        }}
                        thumbTintColor={COLORS.main}
                        minimumTrackTintColor={COLORS.main}
                        maximumTrackTintColor={COLORS.gray}
                        value={maximumAge}
                        onValueChange={(value) => setmaximumAgeRange(value)}
                      />
                    </View>
                    :
                    <View style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Slider
                        style={{ width: '100%', height: 40, }}
                        minimumValue={0}
                        maximumValue={1}
                        thumbTouchSize={{
                          width: 40, height: 40
                        }}
                        thumbTintColor={COLORS.main}
                        minimumTrackTintColor={COLORS.main}
                        maximumTrackTintColor={COLORS.gray}
                        value={minimumAge}
                        onValueChange={(value) => setminimumAgeRange(value)}
                      />
                    </View>
                  }

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    justifyContent: 'space-between'
                  }}>
                    <View style={{
                    }}>
                      <Text style={{
                        fontSize: 16,
                        // fontWeight: 'bold',
                        color: COLORS.black
                      }}>Distance(miles) {Math.floor(distance * 500)}</Text>
                    </View>
                    <View style={{
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.black
                      }}>Whole country</Text>
                    </View>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Slider
                      style={{ width: '100%', height: 40, }}
                      minimumValue={0}
                      maximumValue={1}
                      thumbTouchSize={{
                        width: 40, height: 40
                      }}
                      thumbTintColor={COLORS.main}
                      minimumTrackTintColor={COLORS.main}
                      maximumTrackTintColor={COLORS.gray}
                      value={distance}
                      onValueChange={(value) => setDistance(value)}
                    />
                  </View>

                  {!FilterModaldata.length == 0 &&
                    <>
                      {FilterModaldata.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                          }}>
                          <View style={{
                            flex: 1
                          }}>
                            {item?.image}
                          </View>
                          <View style={{
                            flex: 4,
                            alignItems: 'flex-start'
                          }}>
                            <Text style={{
                              fontSize: 16,
                              color: COLORS.black
                            }}>
                              {item.name}
                            </Text>
                          </View>
                          <View style={{
                            flex: 1,
                            alignItems: 'flex-end'
                          }}>
                            <Image source={require('../../assets/back.png')} resizeMode='contain' style={{
                              width: 20,
                              height: 20,
                              tintColor: COLORS.black
                            }} />
                          </View>
                        </View>
                      ))}
                    </>
                  }

                  <View style={{
                    backgroundColor: COLORS.light,
                    justifyContent: 'center',
                    paddingVertical: 20,
                    marginTop: 20
                  }}>
                    <View style={{
                      paddingHorizontal: 20,
                    }}>
                      <Text style={{
                        color: COLORS.black,
                        fontSize: 20
                      }}>Advanced fillters</Text>
                    </View>
                    <View style={{
                      paddingHorizontal: 20,
                    }}>
                      <Text style={{
                        fontSize: 13,
                        color: COLORS.gray
                      }}>Mix and match up to 3 filters, or use them all
                        at once with Premium</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => setShowAdvanceFilter(!showAdvanceFilter)}
                    style={{
                      marginHorizontal: 20,
                      marginTop: -10,
                      alignItems: 'center',
                      alignSelf: 'center',
                      // padding:5,
                      borderRadius: 30,
                      backgroundColor: COLORS.main,
                      width: 30,
                      height: 30,
                      justifyContent: 'center'
                    }}>
                    {showAdvanceFilter ?
                      <Image source={require('../../assets/dropdown.png')} resizeMode='contain'
                        style={{ transform: [{ rotateZ: '-180deg' }] }}
                      />
                      :
                      <Image source={require('../../assets/dropdown.png')} resizeMode='contain' />
                    }
                  </TouchableOpacity>

                  {showAdvanceFilter == true &&
                    filterAdvance.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => SelectedAdvanceFilter(item)}
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: 20,
                          marginBottom: 20,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: '25%',
                            // backgroundColor:COLORS.black
                          }}
                        //   onPress={() => navigation.navigate('SubmitStack')}
                        >
                          {item?.image}
                        </TouchableOpacity>
                        <View style={{
                          flex: 4,
                          alignItems: 'flex-start'
                        }}>
                          <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                          }}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={{
                          flex: 1,
                          alignItems: 'flex-end'
                        }}>
                          <Image source={require('../../assets/back.png')} resizeMode='contain' style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black
                          }} />
                        </View>
                      </TouchableOpacity>
                    ))
                  }


                  <View style={{
                    paddingVertical: 5, alignItems: 'center',
                    paddingTop: '30%',
                    marginBottom: 40,
                    paddingHorizontal: 20
                  }}>
                    <View>
                      <Text style={{ color: COLORS.gray }}>
                        Answer these questions on your own profile
                        to use these filters
                      </Text>
                    </View>
                    {!uploading == true ?
                      <CustomeButton onpress={() => ApplyFilter()} title={'Apply'}
                        bcolor={COLORS.main} border={COLORS.white} />
                      :
                      <View style={{
                        backgroundColor: COLORS.main,
                        width: 329,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
                      </View>
                    }
                  </View>

                </View>
              </ScrollView>
            </View>
          </Modal>
        </ScrollView>
      </View >
    </SafeAreaView >
  )
}

export default LikeDetailScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})