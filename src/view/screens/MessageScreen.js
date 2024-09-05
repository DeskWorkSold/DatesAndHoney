import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Modal, Dimensions } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import { chatuser, selectChatuser, selectUser } from '../../../redux/reducers/Reducers'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geocoder from 'react-native-geocoding'
import { useIsFocused } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
const { height, width } = Dimensions.get('window')
const Masseges = [
    {
        id: '1',
        userName: 'Srto h.',
        userImg: require('../../assets/like1.png'),
        messageText: 'having a good day?'
    },
    {
        id: '2',
        userName: 'Laite I',
        userImg: require('../../assets/like2.png'),
        messageText: 'Ok i am coming'
    },
    {
        id: '3',
        userName: 'Swertw',
        userImg: require('../../assets/profile3.png'),
        messageText: 'Typing...'
    },
    {
        id: '4',
        userName: 'Srto h.',
        userImg: require('../../assets/profile2.png'),
        messageText: 'having a good day back?'
    },
]

const MessageScreen = ({ navigation }) => {
    const reduxChatUser = useSelector(selectChatuser);
    const user = useSelector(selectUser);
    const [recentMessage, setRecentMessage] = useState();
    const [showModal, setShowModal] = useState({
        status: false,
        title: null,
        description: null,
    });
    const [unreadMessage, setUnreadMessage] = useState([]);
    const CurrentUser = auth()?.currentUser?.uid;
    const [ChatUserId, setChatUserId] = useState([]);
    const focus = useIsFocused()
    // console.log(user?.PackageId);

    const dispatch = useDispatch();


    const GetRecentMessages = async () => {
        if (reduxChatUser?.length > 0) {
            try {
                const updatedUserPromises = reduxChatUser.map(async (i) => {
                    const docid = i.uid > user.uid ? `${user.uid}-${i.uid}` : `${i.uid}-${user.uid}`;
                    const unreaded = [];
                    const recentmsg = [];

                    const messageRef = firestore()
                        .collection('chatrooms')
                        .doc(docid)
                        .collection('messages')
                        .orderBy('createdAt', 'desc');

                    const messageQuerySnapshot = await messageRef.get();

                    messageQuerySnapshot.docs.forEach(docSnap => {
                        const data2 = docSnap.data();
                        recentmsg.push(data2);

                        if (!data2.received && data2.sentBy == i.uid) {
                            unreaded.push(data2);
                        }
                    });

                    if (unreaded.length > 0 || recentmsg.length > 0) {
                        return {
                            ...i,
                            recentmsg: getRecentMessageText(recentmsg[0]),
                            unreadmsg: unreaded.length,
                            recentmsgtime: recentmsg[0]?.createdAt?.toDate()?.toString() || null
                        };
                    } else {
                        return i;
                    }
                });

                const updatedUser = await Promise.all(updatedUserPromises);

                const sortedUsers = updatedUser.sort((a, b) => {
                    const dateA = a.recentmsgtime ? new Date(a.recentmsgtime) : null;
                    const dateB = b.recentmsgtime ? new Date(b.recentmsgtime) : null;

                    // return dateB - dateA; // For descending order (newest to oldest)
                    if (dateA && dateB) {
                        // Both users have recentmsgtime, sort by date
                        return dateB - dateA; // For descending order (newest to oldest)
                    } else if (dateA) {
                        // Only user A has recentmsgtime, place A before B
                        return -1;
                    } else if (dateB) {
                        // Only user B has recentmsgtime, place B before A
                        return 1;
                    } else {
                        // Neither user has recentmsgtime, keep their order unchanged
                        return 0;
                    }
                });

                dispatch(chatuser(sortedUsers));
            } catch (error) {
                console.error('Error in GetRecentMessages:', error);
            }
        }
    };

    const getRecentMessageText = (message) => {
        if (!message) return 'No recent message';
        switch (message.category) {
            case 'Proposal':
                return 'Proposal attachment..';
            case 'image':
                return 'Image attachment..';
            default:
                return message.text || 'No recent message';
        }
    };

    // Is code mein maine await ka istemal messageRef ke liye kiya hai aur messageDocs mein await se promise ko resolve kiya hai. Isse Hermes engine mein arrow function ke async ke sath ju
    // const GetRecentMessages = async () => {

    // }

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
    const OnSelectConcriege = async (element) => {
        // console.log(element);
        // return
        if (user?.PackageId == '654' && element) {
            const address = await getAddressFromCoordinates(element?.Location?.latitude, element?.Location?.longitude)
            let update = {
                ...element,
                Address: address,
            }
            navigation.navigate('Concierge Management', {
                screen: 'ConciregeProfile',
                params: { data: update },
            });
        }
        else {
            setShowModal({
                ...showModal,
                status: true,
                title: 'Unlock Diamond Membership for Enhanced Concierge Services',
                description: 'Experience the pinnacle of concierge services with Diamond and Diamond+ membership. Elevate your matchmaking journey by gaining exclusive access to user match coordination and chat services on the concierge management platform. Upgrade now to find your ideal match effortlessly!'
            })
        }
    }

    useEffect(() => {
        GetRecentMessages();
        // fetchUsersUid()
    }, [focus])

    const onBuyNow = () => {
        navigation.navigate('Premium Membership')
        setShowModal({
            ...showModal,
            status: false,
            title: null,
            description: null
        })
    }




    const fetchUsersUid = () => {
        if (CurrentUser) {
            try {
                const userRef = firestore().collection('Users')
                    .doc(CurrentUser)
                userRef.onSnapshot((querySnap) => {
                    // console.log('doc exists: ', querySnap.data());
                    if (!querySnap.data()?.PrivateChat) {
                        // console.log('private chats not found');
                        // console.log('private chat here');
                    } else {
                        const ChatUid = []
                        querySnap.data()?.PrivateChat.map(chats => {
                            // console.log('total chats here', chats.ChatuserDetails.uid);
                            ChatUid.push(chats.ChatuserDetails.uid)
                        })
                        // console.log('===============================================>',ChatUid.reverse());
                        setChatUserId(ChatUid.reverse())
                    }
                })
            } catch (e) {
                console.log(e, 'fetchUsersUid');
            }
        }
    };


    // useEffect(() => {
    //     fetchMatchUsers(ChatUserId);
    //     // console.log(ChatUserId);
    // }, [ChatUserId]);

    // const fetchMatchUsers = async (ChatUserId) => {
    //     console.log('chat id', ChatUserId?.length);
    //     // return
    //     if (!user?.PackageId == '' && ChatUserId?.length > 0) {
    //         const Package = user?.PackageId;
    //         if (Package == 123) {
    //             // console.log(ChatUserId);
    //             try {
    //                 const MatchedUser = [];

    //                 // Use Promise.all to wait for all promises to resolve
    //                 await Promise.all(
    //                     ChatUserId.map(async (item) => {
    //                         const docSnapshot = await firestore().collection('Users').doc(item).get();

    //                         if (docSnapshot.exists && docSnapshot.data()?.PrivateChat) {
    //                             // let conciergeUser = null
    //                             const conciergeUser = [];
    //                             const userData = docSnapshot.data();
    //                             // console.log(userData , '==');

    //                             for (const secUser of userData.PrivateChat) {
    //                                 if (secUser.ChatuserDetails.uid === CurrentUser) {

    //                                     const ref = firestore().collection('Requestes').doc(userData.userDetails.uid);
    //                                     const documentSnapShot = await ref.get();

    //                                     if (documentSnapShot.exists) {
    //                                         const requests = documentSnapShot.data()?.MoreRequestes || [];

    //                                         const conciergeUsers = await Promise.all(
    //                                             requests.map(async (e) => {
    //                                                 if (e.status && e.type === 'Update') {
    //                                                     const userSnapshot = await firestore().collection('Users').doc(e.sendby).get();
    //                                                     if (userSnapshot.exists) {
    //                                                         const conuser = userSnapshot.data().userDetails;
    //                                                         return conuser;
    //                                                     }
    //                                                 }
    //                                                 return null;
    //                                             })
    //                                         );

    //                                         // Filter out null values
    //                                         const filteredConciergeUsers = conciergeUsers.filter((user) => user !== null);
    //                                         conciergeUser.push(...filteredConciergeUsers);
    //                                     }
    //                                 }
    //                             }
    //                             const dataupdated = {
    //                                 ...userData.userDetails,
    //                                 matchtimeStamp: new Date().toString(),
    //                                 conciergeUser: conciergeUser,
    //                             };
    //                             MatchedUser.push(dataupdated);
    //                         }
    //                     })
    //                 );

    //                 // console.log('====> ', MatchedUser, user?.uid);

    //                 const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
    //                 // setChatUserDetail(uniqueDataArray.slice(0, 5));
    //                 dispatch(chatuser(uniqueDataArray.slice(0, 5)));
    //             } catch (e) {
    //                 console.error(e, 'fetchMatchUsers');
    //             }

    //         }
    //         else if (Package == 456) {
    //             try {
    //                 const MatchedUser = [];

    //                 // Use Promise.all to wait for all promises to resolve
    //                 await Promise.all(
    //                     ChatUserId.map(async (item) => {
    //                         const docSnapshot = await firestore().collection('Users').doc(item).get();

    //                         if (docSnapshot.exists && docSnapshot.data()?.PrivateChat) {
    //                             // let conciergeUser = null
    //                             const conciergeUser = [];
    //                             const userData = docSnapshot.data();

    //                             for (const secUser of userData.PrivateChat) {
    //                                 if (secUser.ChatuserDetails.uid === CurrentUser) {

    //                                     const ref = firestore().collection('Requestes').doc(userData.userDetails.uid);
    //                                     const documentSnapShot = await ref.get();

    //                                     if (documentSnapShot.exists) {
    //                                         const requests = documentSnapShot.data()?.MoreRequestes || [];

    //                                         const conciergeUsers = await Promise.all(
    //                                             requests.map(async (e) => {
    //                                                 if (e.status && e.type === 'Update') {
    //                                                     const userSnapshot = await firestore().collection('Users').doc(e.sendby).get();
    //                                                     if (userSnapshot.exists) {
    //                                                         const conuser = userSnapshot.data().userDetails;
    //                                                         return conuser;
    //                                                     }
    //                                                 }
    //                                                 return null;
    //                                             })
    //                                         );

    //                                         // Filter out null values
    //                                         const filteredConciergeUsers = conciergeUsers.filter((user) => user !== null);
    //                                         conciergeUser.push(...filteredConciergeUsers);
    //                                     }
    //                                 }
    //                             }
    //                             const dataupdated = {
    //                                 ...userData.userDetails,
    //                                 matchtimeStamp: new Date().toString(),
    //                                 conciergeUser: conciergeUser,
    //                             };
    //                             MatchedUser.push(dataupdated);
    //                         }
    //                     })
    //                 );

    //                 // console.log('====> ', MatchedUser, user?.uid);

    //                 const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
    //                 // setChatUserDetail(uniqueDataArray.slice(0, 8));
    //                 dispatch(chatuser(uniqueDataArray.slice(0, 8)));
    //             } catch (e) {
    //                 console.error(e, 'fetchMatchUsers');
    //             }

    //         }
    //         else {
    //             try {
    //                 const MatchedUser = [];

    //                 // Use Promise.all to wait for all promises to resolve
    //                 await Promise.all(
    //                     ChatUserId.map(async (item) => {
    //                         const docSnapshot = await firestore().collection('Users').doc(item).get();

    //                         if (docSnapshot.exists && docSnapshot.data()?.PrivateChat) {
    //                             // let conciergeUser = null
    //                             const conciergeUser = [];
    //                             const userData = docSnapshot.data();

    //                             for (const secUser of userData.PrivateChat) {
    //                                 if (secUser.ChatuserDetails.uid === CurrentUser) {

    //                                     const ref = firestore().collection('Requestes').doc(userData.userDetails.uid);
    //                                     const documentSnapShot = await ref.get();

    //                                     if (documentSnapShot.exists) {
    //                                         const requests = documentSnapShot.data()?.MoreRequestes || [];

    //                                         const conciergeUsers = await Promise.all(
    //                                             requests.map(async (e) => {
    //                                                 if (e.status && e.type === 'Update') {
    //                                                     const userSnapshot = await firestore().collection('Users').doc(e.sendby).get();
    //                                                     if (userSnapshot.exists) {
    //                                                         const conuser = userSnapshot.data().userDetails;
    //                                                         return conuser;
    //                                                     }
    //                                                 }
    //                                                 return null;
    //                                             })
    //                                         );

    //                                         // Filter out null values
    //                                         const filteredConciergeUsers = conciergeUsers.filter((user) => user !== null);
    //                                         conciergeUser.push(...filteredConciergeUsers);
    //                                     }
    //                                 }
    //                             }
    //                             const dataupdated = {
    //                                 ...userData.userDetails,
    //                                 matchtimeStamp: new Date().toString(),
    //                                 conciergeUser: conciergeUser,
    //                             };
    //                             MatchedUser.push(dataupdated);
    //                         }
    //                     })
    //                 );

    //                 // console.log('====> ', MatchedUser, user?.uid);

    //                 const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
    //                 // setChatUserDetail(uniqueDataArray.slice(0, 10));
    //                 dispatch(chatuser(uniqueDataArray.slice(0, 10)));
    //             } catch (e) {
    //                 console.error(e, 'fetchMatchUsers');
    //             }

    //         }
    //     }
    //     else {
    //         try {
    //             const MatchedUser = [];

    //             // Use Promise.all to wait for all promises to resolve
    //             await Promise.all(
    //                 ChatUserId.map(async (item) => {
    //                     const docSnapshot = await firestore().collection('Users').doc(item).get();

    //                     if (docSnapshot.exists && docSnapshot.data()?.PrivateChat) {
    //                         // let conciergeUser = null
    //                         const conciergeUser = [];
    //                         const userData = docSnapshot.data();

    //                         for (const secUser of userData.PrivateChat) {
    //                             if (secUser.ChatuserDetails.uid === CurrentUser) {

    //                                 const ref = firestore().collection('Requestes').doc(userData.userDetails.uid);
    //                                 const documentSnapShot = await ref.get();

    //                                 if (documentSnapShot.exists) {
    //                                     const requests = documentSnapShot.data()?.MoreRequestes || [];

    //                                     const conciergeUsers = await Promise.all(
    //                                         requests.map(async (e) => {
    //                                             if (e.status && e.type === 'Update') {
    //                                                 const userSnapshot = await firestore().collection('Users').doc(e.sendby).get();
    //                                                 if (userSnapshot.exists) {
    //                                                     const conuser = userSnapshot.data().userDetails;
    //                                                     return conuser;
    //                                                 }
    //                                             }
    //                                             return null;
    //                                         })
    //                                     );

    //                                     // Filter out null values
    //                                     const filteredConciergeUsers = conciergeUsers.filter((user) => user !== null);
    //                                     conciergeUser.push(...filteredConciergeUsers);
    //                                 }
    //                             }
    //                         }
    //                         const dataupdated = {
    //                             ...userData.userDetails,
    //                             matchtimeStamp: new Date().toString(),
    //                             conciergeUser: conciergeUser,
    //                         };
    //                         MatchedUser.push(dataupdated);
    //                     }
    //                 })
    //             );

    //             // console.log('====> ', MatchedUser, user?.uid);

    //             const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
    //             // setChatUserDetail(uniqueDataArray.slice(0, 1));
    //             dispatch(chatuser(uniqueDataArray.slice(0, 1)));
    //         } catch (e) {
    //             console.error(e, 'fetchMatchUsers');
    //         }

    //     }
    // };
    const formatDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const now = new Date();

        const isToday = date.toDateString() === now.toDateString();
        const isYesterday = date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();

        if (isToday) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } else if (isYesterday) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-GB'); // Format as '07/05/2024'
        }
    };

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    padding: 10,
                    paddingTop: 20,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: COLORS.black
                    }}>Matching With You!
                        {reduxChatUser ? (
                            <Text style={{ fontWeight: '400', fontSize: 13, color: COLORS.gray }}>({reduxChatUser.length})</Text>
                        ) : (
                            <Text style={{ fontWeight: '400', fontSize: 13, color: COLORS.gray }}>(0)</Text>
                        )}
                    </Text>
                </View>
                <View style={{
                    // paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.light,
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            padding: 20,
                            width: 65,
                            height: 65,
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 60,
                        }}>
                            {reduxChatUser ? (
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 17,
                                    color: COLORS.black,
                                    textAlign: 'center'
                                }}>+{reduxChatUser.length}</Text>
                            ) : (
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 17,
                                    color: COLORS.black,
                                    textAlign: 'center'
                                }}>+0</Text>
                            )}
                        </View>
                        <Text style={{
                            fontWeight: 'bold',
                            color: COLORS.black,
                            fontSize: 12,
                        }}>Matches</Text>
                    </View>

                    {reduxChatUser?.length > 0 && (
                        <FlatList
                            data={reduxChatUser}
                            keyExtractor={(item, index) => String(index)}
                            // keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                // console.log(item.image1),
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={() =>
                                        navigation.navigate('ChatingScreen', {
                                            data: item
                                        })
                                    }
                                >
                                    <View style={{
                                        marginHorizontal: 10,
                                        backgroundColor: COLORS.main,
                                        borderRadius: 50,
                                    }}>
                                        {item.image1 ?
                                            <FastImage
                                                style={{
                                                    width: 65,
                                                    height: 65,
                                                    borderRadius: 50,
                                                }}
                                                source={{
                                                    uri: item.image1,
                                                    headers: { Authorization: 'someAuthToken' },
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                            // <Image source={{ uri: item.image1 }} resizeMode='cover'
                                            //     style={{
                                            //         width: 65,
                                            //         height: 65,
                                            //         borderRadius: 50,
                                            //     }} />
                                            :
                                            <Image source={require('../../assets/nopic.png')} resizeMode='cover'
                                                style={{
                                                    width: 65,
                                                    height: 65,
                                                    borderRadius: 50,
                                                }} />
                                        }
                                    </View>
                                    <Text style={{
                                        color: COLORS.gray,
                                        fontSize: 12,
                                    }}>{item.Name.split(' ')[0]}...</Text>
                                </TouchableOpacity>
                            )} />
                    )}
                    {/* <View style={{ alignItems: 'center' }}>
                        <View style={{
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 50,
                        }}>
                            <Image source={require('../../assets/like1.png')} resizeMode='contain'
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <Text>Srto h.</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 50,
                        }}>
                            <Image source={require('../../assets/like2.png')} resizeMode='contain'
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <Text>Laite I</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 50,
                        }}>
                            <Image source={require('../../assets/like3.png')} resizeMode='contain'
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <Text>Swertw</Text>
                    </View> */}
                </View>


                <View style={{
                    // paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: COLORS.white
                }}>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: COLORS.black,
                            fontSize: 14
                        }}>
                            Messages
                        </Text>
                    </View>

                    {reduxChatUser?.length > 0 ? (
                        <View style={{ marginBottom: 180 }}>
                            <FlatList
                                data={reduxChatUser}
                                vertical
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => String(index)}
                                style={{ marginBottom: 20 }}
                                renderItem={({ item }) => (
                                    // <ScrollView vertical showsVerticalScrollIndicator={false}>
                                    <View>
                                        <View
                                            style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: COLORS.light,
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() =>
                                                    navigation.navigate('ChatingScreen', {
                                                        data: item
                                                    })
                                                }
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    paddingVertical: 10,
                                                    height: 100,
                                                }}>
                                                <View style={{
                                                    marginHorizontal: 10,
                                                    borderRadius: 50,
                                                    width: '20%',
                                                }}>
                                                    {item?.image1 ?
                                                        <FastImage
                                                            style={{
                                                                width: 65,
                                                                height: 65,
                                                                borderRadius: 50,
                                                            }}
                                                            source={{
                                                                uri: item.image1,
                                                                headers: { Authorization: 'someAuthToken' },
                                                                priority: FastImage.priority.normal,
                                                            }}
                                                            resizeMode={FastImage.resizeMode.cover}
                                                        />
                                                        // <Image source={{ uri: item?.image1 }} resizeMode='cover'
                                                        //     style={{
                                                        //         width: 65,
                                                        //         height: 65,
                                                        //         borderRadius: 50,
                                                        //     }} />
                                                        :
                                                        <Image source={require('../../assets/nopic.png')} resizeMode='cover'
                                                            style={{
                                                                width: 65,
                                                                height: 65,
                                                                borderRadius: 50,
                                                            }} />
                                                    }
                                                </View>

                                                <View style={{
                                                    width: '50%',
                                                    // backgroundColor:COLORS.gray
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}>
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                            color: COLORS.black,
                                                            fontSize: 14,
                                                        }}>{item?.Name}</Text>
                                                    </View>
                                                    <Text style={{
                                                        color: COLORS.gray,
                                                        fontSize: 12,
                                                    }}>{item?.recentmsg ? item?.recentmsg : 'Say Hey..'}</Text>
                                                </View>
                                                <View style={{
                                                    width: '30%',
                                                    // backgroundColor: COLORS.gray,
                                                    alignItems: 'center'
                                                }}>
                                                    <View style={{
                                                        justifyContent: 'center', // Center the content vertically
                                                        alignItems: 'center', // Center the content horizontally
                                                        height: '50%',
                                                        // backgroundColor: COLORS.main
                                                    }}>
                                                        {item.recentmsgtime &&
                                                            <Text style={{
                                                                color: COLORS.gray,
                                                                fontSize: 10,
                                                            }}>{formatDate(item.recentmsgtime)}</Text>
                                                        }
                                                    </View>
                                                    <View style={{
                                                        height: '50%',
                                                    }}>
                                                        {item?.unreadmsg > 0 &&
                                                            <View style={{
                                                                width: 20,
                                                                height: 20,
                                                                borderRadius: 25, // To make it a circle
                                                                backgroundColor: COLORS.main,
                                                                justifyContent: 'center', // Center the content vertically
                                                                alignItems: 'center', // Center the content horizontally
                                                            }}>
                                                                <Text style={{
                                                                    color: COLORS.black,
                                                                    fontSize: 12,
                                                                }}>{item?.unreadmsg}</Text>
                                                            </View>
                                                        }
                                                    </View>

                                                    {/* <Image source={require('../../assets/star.png')} resizeMode="contain"
                                                        style={{
                                                            tintColor: COLORS.gray
                                                        }} /> */}
                                                </View>
                                            </TouchableOpacity>
                                            {item?.conciergeUser?.length > 0 ?
                                                <View style={{
                                                    marginBottom: 20
                                                }}>
                                                    {item?.conciergeUser?.map((e, i) => (
                                                        <TouchableOpacity
                                                            key={i}
                                                            onPress={() => OnSelectConcriege(e)}
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                height: 60,
                                                                // backgroundColor: COLORS.light,
                                                                borderTopColor: COLORS.light,
                                                                borderTopWidth: 1,
                                                                width: '80%',
                                                                alignSelf: 'center',
                                                            }}>
                                                            <View style={{
                                                                marginHorizontal: 10,
                                                                borderRadius: 50,
                                                                width: '20%',
                                                            }}>
                                                                {e?.image1 ?
                                                                    <Image source={{ uri: e?.image1 }} resizeMode='cover'
                                                                        style={{
                                                                            width: 45,
                                                                            height: 45,
                                                                            borderRadius: 50,
                                                                        }} />
                                                                    :
                                                                    <Image source={require('../../assets/nopic.png')} resizeMode='cover'
                                                                        style={{
                                                                            width: 45,
                                                                            height: 45,
                                                                            borderRadius: 50,
                                                                        }} />
                                                                }
                                                            </View>

                                                            <View style={{
                                                                width: '60%',
                                                                // backgroundColor:COLORS.gray
                                                            }}>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                }}>
                                                                    <Text style={{
                                                                        fontWeight: 'bold',
                                                                        color: COLORS.black,
                                                                        fontSize: 12,
                                                                    }}>{e?.Name}</Text>
                                                                </View>
                                                                <Text style={{
                                                                    color: COLORS.gray,
                                                                    fontSize: 10,
                                                                }}>{e?.MediatorType ? e?.MediatorType : 'Dating Coach'}</Text>
                                                            </View>
                                                            <View style={{
                                                                width: '20%'
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 10,
                                                                    color: COLORS.gray
                                                                }}>Chat</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ))}
                                                </View>
                                                :
                                                null}
                                        </View>

                                    </View>
                                    // </ScrollView>
                                )}
                            />
                        </View>
                    ) : (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.light,
                            height: 100,
                        }}>
                            <View style={{
                                marginHorizontal: 10,
                                borderRadius: 50,
                                width: '20%',
                            }}>
                                <Image source={require('../../assets/nouser.png')} resizeMode='contain'
                                    style={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: 30,
                                        tintColor: COLORS.gray
                                    }} />
                            </View>

                            <View style={{
                                width: '65%'
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>No user!</Text>
                                <Text style={{ color: COLORS.gray, fontSize: 12 }}>match not found to chat.</Text>
                            </View>

                            {/* <View style={{
                                width: '15%'
                            }}>
                                <Image source={require('../../assets/star.png')} resizeMode="contain"
                                    style={{
                                        tintColor: COLORS.gray
                                    }} />
                            </View> */}
                        </View>
                    )}

                    {user?.PackageId != 654 &&
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            // width:'80%
                        }}>
                            <View style={{
                                width: '100%',
                                // justifyContent:'center',
                                alignItems: 'center'
                                // backgroundColor:COLORS.gray
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: COLORS.gray
                                }}>If you want to match with more people, upgrade your
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Premium Membership')}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.main,
                                    }}>
                                        membership package.
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal?.status}
                onRequestClose={() => {
                    setShowModal({
                        ...showModal,
                        status: false
                    });
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: COLORS.gray,
                    opacity: 0.9
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: 'white',
                        opacity: 1,
                        borderRadius: 20,
                        padding: 25,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        paddingHorizontal: 40
                    }}>
                        {/* <Image source={require('../../../assets/flakeremove.png')} resizeMode='contain' style={{
                            width: 50,
                            height: 50
                        }} /> */}
                        <MaterialIcons color={'red'} name='error' size={40} />
                        <Text style={{
                            fontSize: 14,
                            color: COLORS.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>{showModal?.title}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: COLORS.gray,
                            textAlign: 'center'
                        }}>{showModal?.description}</Text>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <TouchableOpacity
                                onPress={() => setShowModal({
                                    ...showModal,
                                    status: false,
                                    title: null,
                                    description: null,
                                })}
                                style={{
                                    width: '45%',
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                    // height:30,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: COLORS.gray2
                                }}>
                                <Text style={{
                                    color: COLORS.gray,
                                    fontSize: 12,
                                }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => onBuyNow()}
                                style={{
                                    width: '45%',
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                    // height:30,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: COLORS.main
                                }}>
                                <Text style={{
                                    color: COLORS.white,
                                    fontSize: 12,
                                }}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    container: {
        // alignItems:'center'
        backgroundColor: COLORS.white,
        height: '100%'
    }
})