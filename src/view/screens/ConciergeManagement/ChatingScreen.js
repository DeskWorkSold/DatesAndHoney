import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, ActivityIndicator, Dimensions, Modal, ToastAndroid, ScrollView, Pressable } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import COLORS from '../../../consts/Colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, PorposalCategory, selectChatuser, selectPorposalCategory, selectStatus, selectUser, status } from '../../../../redux/reducers/Reducers';
import Notifictaions from '../../components/Notifictaions';
import { IconButton, PaperProvider, Menu, TextInput, Divider, Button } from 'react-native-paper';
import SVGNotify from '../../../assets/notify.svg';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomeButton from '../../components/CustomeButton';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRef } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { set } from 'immer/dist/internal';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GoogleMapKey from '../../../consts/GoogleMapKey';
import axios from 'axios';
import Loader from '../../components/Loader';
import RateMediatorScreen from '../../components/RateMediatorScreen';
import Toast from 'react-native-simple-toast';
import Group from '../../../assets/Group.svg';
import Geocoder from 'react-native-geocoding';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CoordinatorBtn = [
    {
        id: '1',
        name: 'Chat',
    },
    {
        id: '2',
        name: 'Suggestion',
    },
    {
        id: '3',
        name: 'Profile',
    }
];


const ChatingScreen = ({ navigation, route }) => {
    const { data } = route?.params;
    const { rating } = route?.params;
    const { totalreviews } = route?.params;
    // console.log(rating);
    const userName = data?.Name;
    const userImg = data?.image1;
    const uid = data?.uid;
    // console.log('==>One', data.Name);
    const [messages, setMessages] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    // console.log('=====>',imageUrl);
    const reduxChatUser = useSelector(selectChatuser);


    const [category, setCategory] = useState(null);
    const [reason, setReason] = useState('');

    const [rendering, setRendering] = useState(false);
    const Currentuser = useSelector(selectUser);
    const [transferred, setTransferred] = useState(0);
    const [modal, setModal] = useState(false);
    const [sendPorposal, setSendPorposal] = useState();
    const [dates, setDates] = useState('');
    const [tempDates, setTempDates] = useState('');
    // console.log('tempDates ==> ', tempDates);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [time, setTime] = useState('');
    const [address, setAddressText] = useState();
    const [TimeVisibility, setTimeVisibility] = useState(false);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [actionTriggered, setActionTriggered] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [tempCancleDate, setTempCancleDates] = useState(null);
    const [pin, setPin] = useState({
        latitude: 24.9026764,
        longitude: 67.11445119999999,
    });
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const [modalType, setModalType] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [acceptedProposal, setAcceptedProposal] = useState();
    const [processDate, setProcessDate] = useState();
    const [yourArrival, setYourArrival] = useState();
    const [yourArrivalStatus, setYourArrivalStatus] = useState(true);
    const [nextTime, setNextTime] = useState();
    const [CurrentTime, setCurrentTime] = useState();
    const [SecondUserProposal, setSecondUserProposal] = useState();
    const [loading, setLoading] = useState(false);
    const [coordinatorBtn, setCoordinatorBtn] = useState('Chat');
    const [value, setValueIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [modalpoppup, setModalpoppup] = useState(false);
    const [likeduser, setLikedUser] = useState(false);

    const api = GoogleMapKey?.GOOGLE_MAP_KEY
    const dispatch = useDispatch()

    // const cat = useSelector(selectPorposalCategory)
    // console.log('=====>', api);

    // console.log('userName: ', userName);
    // console.log('userName: ', userImg);

    const [showhide, setShowHide] = useState(false)
    const [sendchat, setSendChat] = useState('')
    const [searchTextRef, setSearchTextRef] = useState('')
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [moreOptionsPoppup, setMoreOptionsPoppup] = useState(false);
    const [uploading, setUploading] = useState(false);

    // for rate user
    const [ReviewCoach, setReviewCoach] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const [showFilterType, setShowFilterType] = useState(null);
    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [datingCoachRating, setDatingCoachRating] = useState(null);
    const [newRating, setNewRating] = useState(0);
    const [comments, setComments] = useState(null);
    const [showModalContent, setShowModalContent] = useState({
        title: null,
        descrition: null,
        type: null
    });
    const [suggestedUser, setSuggestedUser] = useState([])

    const SubmitReview = async () => {
        // console.log('eretd');
        // return
        if (!newRating || !comments) {
            if (!newRating) {
                Toast.show(`Please select your rating before submit!`, Toast.LONG, {
                    backgroundColor: 'red',
                });
            }
            else if (!comments) {
                Toast.show(`Please enter your comments before submit!`, Toast.LONG, {
                    backgroundColor: 'red',
                });
            }
        }
        else {
            // console.log(newRating, comments, datingCoach[0].uid, 1,);
            setLoading(true)
            try {
                const ref = firestore().collection('Users').doc(data.uid)
                const refGet = await ref?.get()
                if (refGet?.exists) {
                    // console.log(refGet.data());
                    ref?.update({
                        Ratings: firestore.FieldValue.arrayUnion({
                            id: Math.random().toString(16).slice(2),
                            customerId: data.uid,
                            rating: newRating,
                            comments: comments,
                        })
                    })
                    setShowModalContent({
                        ...showModalContent,
                        title: 'Review Submitted',
                        descrition: `Your review has been submitted successfully, thanks for your review it will help others.`,
                        type: 'Success'
                    })
                    // setDefaultRating(newRating)
                    setModalpoppup(true)
                    setLoading(false)
                }
            } catch (e) {
                setLoading(false)
                console.log(e);
            }
            // console.log(newRating, comments, datingCoach[0].uid, 1);
        }
    }


    const handleMenuToggle = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleClearChat = () => {
        // Implement logic to clear the chat
        setMoreOptionsPoppup(true); // Hide the menu
        setActionTriggered('ACTION_1'); // Hide the menu
    };

    const handleDeleteUser = () => {
        // Implement logic to delete the user
        setMoreOptionsPoppup(true); // Hide the menu
        setActionTriggered('ACTION_2'); // Hide the menu
    };

    const handleSlide = (index) => {
        // console.log('slide');
        setValueIndex(index)
        const viewPage = CoordinatorBtn[index]?.name
        setCoordinatorBtn(viewPage);
    };

    const SwitchMode = (value) => (
        setShowHide(value)
    );
    async function recursiveDelete(docRef) {
        // Get all subcollections of the document
        const subcollections = await docRef.listCollections();

        // Delete all subcollections recursively
        for (const subcollection of subcollections) {
            await recursiveDelete(subcollection);
        }

        // Delete the document itself
        return docRef.delete();
    }
    const docid = uid > Currentuser?.uid ? Currentuser?.uid + "-" + uid : uid + "-" + Currentuser?.uid;

    // const OnDeleteUser = async () => {
    //     if (actionTriggered == 'ACTION_1') {
    //         // console.log(docid);
    //         // return
    //         setUploading(true)
    //         setMoreOptionsPoppup(false)
    //         setIsMenuVisible(false);
    //         setActionTriggered(null)
    //         try {
    //             const collectionRef = firestore().collection('chatrooms')
    //                 .doc(docid)
    //                 .collection('messages')

    //             await collectionRef.get().then((querySnapshot) => {
    //                 Promise.all(querySnapshot.docs.map((d) => d.ref.delete()));
    //                 // deletePromises.push(doc.ref.delete());
    //             });

    //             // await Promise.all(deletePromises);
    //             console.log('User chat deleted!');
    //             ToastAndroid.show('Coversation clear', ToastAndroid.SHORT)
    //             setUploading(false);
    //         } catch (e) {
    //             setUploading(false)
    //             ToastAndroid.show(`Error: ${e}`, ToastAndroid.SHORT)
    //         }
    //     }
    //     else if (actionTriggered == 'ACTION_2') {
    //         // console.log(Currentuser.uid , data);
    //         // return
    //         setUploading(true)
    //         setMoreOptionsPoppup(false)
    //         setIsMenuVisible(false);
    //         setActionTriggered(null)
    //         try {
    //             let Ref_firestore = firestore()
    //                 .collection('Users')
    //                 .doc(Currentuser?.uid)

    //             let GetData = await Ref_firestore.get()

    //             // console.log(GetData.data().PrivateChat);
    //             let UpdatePrivateChat = GetData.data()?.PrivateChat?.filter(item => item?.ChatuserDetails?.uid !== uid)

    //             // console.log(UpdatePrivateChat);
    //             await Ref_firestore.update({ PrivateChat: UpdatePrivateChat })
    //                 .then(() => {
    //                     setUploading(false)
    //                     navigation.goBack();
    //                     ToastAndroid.show('User removed from your matches!', ToastAndroid.SHORT)
    //                     console.log('User chat deleted!');
    //                 });
    //         } catch (e) {
    //             setUploading(false)
    //             ToastAndroid.show(`Error: ${e}`, ToastAndroid.SHORT)
    //         }
    //     }
    // }

    const ReadAllMessages = async (props) => {
        console.log(props._id);
        // return
        if (props?._id) {
            try {
                const messageRef = await firestore().collection('chatrooms')
                    .doc(docid)
                    .collection('messages')
                    .doc(props?._id)
                // return
                messageRef.update({
                    'read': true,
                })
            }
            catch (e) {
                console.log(e);
            }
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
    // const getUserSuggestion = async () => {
    //     // console.log(uid);
    //     try {
    //         const ref = firestore().collection('Users').doc(Currentuser?.uid)
    //         const documentSnapShot = await ref.get();
    //         if (documentSnapShot?.exists) {
    //             const Suggestions = documentSnapShot?.data()?.Suggestion
    //             const PrivateChat = documentSnapShot?.data()?.PrivateChat
    //             Suggestions.sort((a, b) => new Date(b.time) - new Date(a.time));
    //             let suggesteddata = []
    //             if (Suggestions?.length > 0) {
    //                 for (const element of Suggestions) {
    //                     if (element.AuthorUid == uid) {
    //                         const Suggestedid = element.SuggestedUserUid
    //                         // console.log(Suggestedid);
    //                         if (Suggestedid) {
    //                             const reftwo = firestore().collection('Users').doc(Suggestedid)
    //                             const documentSnapShotTwo = await reftwo.get()
    //                             if (documentSnapShotTwo.exists) {
    //                                 const newuser = documentSnapShotTwo?.data()?.userDetails
    //                                 // console.log(newuser);
    //                                 const address = await getAddressFromCoordinates(newuser?.Location?.latitude, newuser?.Location?.longitude)
    //                                 // console.log(address);
    //                                 const indexn = PrivateChat.findIndex(k => k?.ChatuserDetails?.uid == newuser?.uid);
    //                                 // console.log('==> :', indexn);
    //                                 suggesteddata.push({
    //                                     ...newuser,
    //                                     Address: address,
    //                                     match: element?.Suggestion?.matchpercent,
    //                                     liked: indexn !== -1 ? true : false,
    //                                 });
    //                             }
    //                         }
    //                     }
    //                 };
    //                 // console.log('===>  :', suggesteddata);
    //                 setSuggestedUser(suggesteddata)
    //             }
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const getUserSuggestion = async () => {
        try {
            const ref = firestore().collection('Users').doc(Currentuser?.uid);

            const unsubscribe = ref.onSnapshot((documentSnapShot) => {
                if (documentSnapShot?.exists) {
                    const Suggestions = documentSnapShot?.data()?.Suggestion;
                    const PrivateChat = documentSnapShot?.data()?.PrivateChat;

                    if (Suggestions) {
                        const suggesteddata = Suggestions
                            .filter(element => element.AuthorUid === uid)
                            .map(async element => {
                                const Suggestedid = element.SuggestedUserUid;

                                if (Suggestedid) {
                                    const reftwo = firestore().collection('Users').doc(Suggestedid);
                                    const documentSnapShotTwo = await reftwo.get();

                                    if (documentSnapShotTwo.exists) {
                                        const newuser = documentSnapShotTwo?.data()?.userDetails;
                                        const address = await getAddressFromCoordinates(newuser?.Location?.latitude, newuser?.Location?.longitude);
                                        let liked = false;

                                        if (Currentuser?.uid) {
                                            const PrivateChat = documentSnapShot?.data()?.PrivateChat || [];
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
                                setSuggestedUser(finalData);
                            })
                            .catch(error => {
                                console.error('Error fetching suggested data:', error);
                            });
                    }
                }
            });

            // Remember to store the unsubscribe function and call it when the component unmounts or you no longer need updates
            // This is essential to avoid memory leaks
            return () => {
                unsubscribe();
            };
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        getUserSuggestion()
        // getAllMessages()
        const messageRef = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")
        const unsubscribe = messageRef.onSnapshot(querySnap => {
            const allmsg = querySnap?.docs?.map(docSanp => {
                // console.log('date: ', uid);
                const data = docSanp?.data();
                if (data?.createdAt) {
                    console.log(data?.sentBy);
                    if (data?.sentBy == uid && data?.read == false) {
                        ReadAllMessages(data);
                        return {
                            ...docSanp?.data(),
                            read: true,
                            createdAt: docSanp?.data()?.createdAt?.toDate(),
                        }
                    }
                    return {
                        ...docSanp?.data(),
                        createdAt: docSanp?.data()?.createdAt?.toDate(),
                    }
                }
                else {
                    return {
                        ...docSanp?.data(),
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        // user: {
                        //     avatar: userImg,
                        // },
                    }
                }
            })

            // console.log('===>',allmsg);
            setMessages(allmsg)
        });

        return () => {
            unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
            setMessages([]); // Reset the messages state when the docid changes or component unmounts
        };

    }, [docid]);

    useEffect(() => {
        // filterProposals();
        // fetchDateModeProposals();
        YourArrival();
        ChatUserProposals()
        DatesServay();
    }, [messages])

    const DatesServay = () => {
        const d = new Date();
        const hour = 1000 * 60 * 60;
        const ctime = Math.round(d.getTime() / hour);
        const ptime = Math.round(d.getTime() / hour) + 3;
        firestore()
            .collection('Proposals')
            // .orderBy('createdAt', 'desc')
            .doc(Currentuser?.uid)
            // .limit(1)
            .onSnapshot(querySnapshot => {
                const test3 = [];
                // console.log(querySnapshot.data());
                if (querySnapshot?.data()) {
                    querySnapshot?.data()?.Proposals?.map(item => {
                        test3?.push(item);
                        // console.log('===zscas>', item);
                    })
                }
                test3.sort(function (a, b) {
                    return new Date(b?.createdAt?.toDate()?.toDateString() + " " + b?.createdAt?.toDate()?.toTimeString()) + new Date(a?.createdAt?.toDate().toDateString() + " " + a?.createdAt?.toDate()?.toTimeString());
                });

                // console.log(test3);

                test3?.map(a => {
                    // console.log(a);
                    var date = a?.ProposalTempDate;
                    const hour = 1000 * 60 * 60;
                    const Proposaltime = Math?.round(date?.toDate()?.getTime() / hour);
                    // console.log('adlj');
                    if (Proposaltime >= ctime && Proposaltime <= ptime && a?.PartnerArrival == true && a?.YourArrival == true && a?.active == 0 && !a?.Reviews) {
                        // console.log('====>', a);
                        setTimeout(() => {
                            navigation.navigate('DateServayScreen', { ProposalId: a?._id });
                            console.log('DateServayScreen');
                        }, 3000
                            //   1000 * 60 * 60
                        );
                    }
                })
            })
    }


    const YourArrival = async () => {
        const d = new Date();
        const hour = 1000 * 60 * 60;
        const ctime = Math.round(d.getTime() / hour);
        const ptime = Math.round(d.getTime() / hour) + 3;

        await
            firestore().collection('Proposals')
                .doc(Currentuser?.uid)
                .onSnapshot((querySnap) => {
                    // console.log(docSnapshot.data());
                    const Proposals = [];
                    const yourArrivald = []
                    if (querySnap?.data()) {
                        querySnap?.data()?.Proposals?.map(item => {
                            // console.log('===>',item);
                            // console.log(uid, Currentuser.uid);
                            if (item?.sentBy == uid && item?.sentTo == Currentuser?.uid) {
                                Proposals.push(item);
                                var date = item?.ProposalTempDate;
                                const hour = 1000 * 60 * 60;
                                const Proposaltime = Math?.round(date?.toDate()?.getTime() / hour);
                                const NProposaltime = Math?.round(date?.toDate()?.getTime() / hour) + 1;
                                const PProposaltime = Math?.round(date?.toDate()?.getTime() / hour) - 3;
                                // console.log(datetostring.toDateString() , date);
                                // console.log('====>', Proposaltime,
                                //     ptime,
                                //     ctime);
                                if (Proposaltime >= ctime && Proposaltime <= ptime && item?.active == 1 && !item?.CancleDate && d?.toDateString() == item?.ProposalDate) {
                                    // const data = item;
                                    // console.log(Proposaltime,
                                    //     ptime,
                                    //     ctime);
                                    dataupdated = {
                                        ...item,
                                        remainingTime: (Proposaltime - ctime >= 1 ? Proposaltime : ctime) - ctime,
                                        // remainingTime: ((Proposaltime - ctime >= 1 ? ctime : ctime - 1) - Proposaltime),
                                        // remainingTime: Proposaltime - (Proposaltime - NProposaltime >= 1 ? NProposaltime : Proposaltime),
                                    }
                                    // console.log(dataupdated);
                                    yourArrivald?.push(dataupdated);
                                }
                                else {
                                    console.log('===> your arrival codition false');
                                }
                            }

                        });

                    }
                    // console.log(yourArrivald);
                    setYourArrival(yourArrivald)
                    // setProcessDate(DatesProcess)
                    setAcceptedProposal(Proposals)
                })
    }

    const ChatUserProposals = async () => {
        const d = new Date();
        const hour = 1000 * 60 * 60;
        const ctime = Math.round(d.getTime() / hour);
        const ptime = Math.round(d.getTime() / hour) + 3;
        await
            firestore().collection('Proposals')
                .doc(uid)
                .onSnapshot((querySnap) => {
                    // console.log(docSnapshot.data());
                    const Proposals = [];
                    const yourArrivald = []
                    if (querySnap?.data()) {
                        querySnap?.data()?.Proposals?.map(item => {
                            // console.log('===>',item);
                            Proposals?.push(item);
                        });

                    }
                    setSecondUserProposal(Proposals)
                })
    }


    const onSend = useCallback((messages = []) => {
        let mymsg = null;
        if (!imageUrl == '') {
            console.log('send image');
            const msg = messages[0]
            mymsg = {
                ...msg,
                sentBy: Currentuser?.uid,
                sentTo: uid,
                createdAt: new Date(),
                image: imageUrl,
                sent: true,
                category: 'image',
                ProposalDate: '',
                ProposalTime: '',
                ProposalAddress: '',
                ProposalLocation: '',
                ProposalDescription: '',
                ProposalStatus: '',
                read: false,
            };
        }
        else {
            console.log('send text');
            const msg = messages[0]
            mymsg = {
                ...msg,
                sentBy: Currentuser?.uid,
                sentTo: uid,
                createdAt: new Date(),
                image: '',
                sent: true,
                category: category,
                ProposalDate: dates,
                ProposalTime: time,
                ProposalAddress: location,
                ProposalLocation: pin,
                ProposalDescription: description,
                ProposalStatus: false,
                read: false,
            };
        }
        // setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        const docid = uid > Currentuser?.uid ? Currentuser?.uid + "-" + uid : uid + "-" + Currentuser?.uid
        firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .doc(mymsg?._id)
            .set({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
            .then(() => {
                setImageUrl(null);
                setImageData(null);
                setCategory(null);
                SendPushNotify(uid, Currentuser, mymsg?.text, 'New Message')
                console.log('message send');
                // dispatch(PorposalCategory(null))
            })

    }, [docid])
    // const SendPushNotify = (uid, Currentuser, mymsg) => {
    //     // console.log(uid);
    //     // return
    //     firestore()
    //         .collection('token')
    //         .doc(uid)
    //         .get()
    //         .then(doc => {
    //             let token = doc?.data()?.token;
    //             console.log(token);

    //             // return
    //             if (token) {
    //                 var data = JSON.stringify({
    //                     notification: {
    //                         title: `New Message`,
    //                         body: `${Currentuser?.Name ? Currentuser?.Name : 'New User'}: ${mymsg ? mymsg : 'click to  open message'}`,
    //                     },
    //                     to: token,
    //                 });
    //                 let config = {
    //                     method: 'post',
    //                     url: 'https://fcm.googleapis.com/fcm/send',
    //                     headers: {
    //                         Authorization:
    //                             'key=AAAAjKV_1r4:APA91bH56x6Wf4dGGgy4pBN1FN2UBCanBAk3WPaW3gMU2sba7_Ou1xnAKL6i_bbcZx9LhShUrc_GTwkhnU-MRCWwOCvwi-Gj6Nj4eC_-8WWj8giBSCWkqfcb0H7BpcQgyC1X3lRyzGt4',
    //                         'Content-Type': 'application/json',
    //                     },
    //                     data: data,
    //                 };
    //                 axios(config)
    //                     .then(res => {
    //                         console.log('Here', res);
    //                     })
    //                     .catch(error => {
    //                         console.log(error);
    //                     });
    //             }
    //         });
    // }


    const fetchDateModeProposals = async () => {
        const d = new Date();
        const hour = 1000 * 60 * 60;
        const ctime = Math.round(d.getTime() / hour);
        const ptime = Math.round(d.getTime() / hour) + 3;
        // console.log('asdcasd',d);

        // const Proposals = [];
        const DatesProcess = [];

        messages.map(item => {
            if (item?.category && item?.ProposalStatus) {
                // console.log(item);
                // Proposals.push(item);
                var date = item?.ProposalTempDate;
                const hour = 1000 * 60 * 60;
                const Proposaltime = Math?.round(date?.toDate().getTime() / hour);
                const NProposaltime = Math?.round(date?.toDate().getTime() / hour) + 1;
                const PProposaltime = Math?.round(date?.toDate().getTime() / hour) - 3;
                if (NProposaltime >= ctime && !item?.CancleDate && item?.YourArrival == true && !item?.PartnerArrival && Proposaltime <= ptime && d.toDateString() == item?.ProposalDate) {
                    dataupdated = {
                        ...item,
                        remainingTime: ((Proposaltime - ctime >= 1 ? Proposaltime : Proposaltime) - ctime),
                        // remainingTime: Proposaltime - (Proposaltime - NProposaltime >= 1 ? NProposaltime : Proposaltime),
                    }
                    console.log(dataupdated);
                    DatesProcess?.push(dataupdated);
                }
                else {
                    console.log('===> codition false');
                }
            }
        })
        setProcessDate(DatesProcess)
        // setAcceptedProposal(Proposals)

        // await
        //     firestore().collection('Proposals')
        //         .doc(Currentuser.uid)
        //         .onSnapshot((querySnap) => {
        //             // const data = docSnapshot.data()
        //             if (querySnap.exists) {
        //                 const Proposals = [];
        //                 const DatesProcess = [];
        //                 querySnap.data().Proposals?.map(item => {
        //                     // console.log('===>',item);
        //                     Proposals.push(item);
        //                     var date = item.ProposalTempDate;
        //                     const hour = 1000 * 60 * 60;
        //                     const Proposaltime = Math?.round(date?.toDate().getTime() / hour);
        //                     const NProposaltime = Math?.round(date?.toDate().getTime() / hour) + 1;
        //                     const PProposaltime = Math?.round(date?.toDate().getTime() / hour) - 3;

        //                     // console.log(Proposaltime, ptime, ctime,)

        //                     if (Proposaltime >= ctime && !item.CancleDate && item.YourArrival == true && !item.PartnerArrival && Proposaltime <= ptime && d.toDateString() == item.ProposalDate) {
        //                         // console.log('====>', item);
        //                         // const data = item;
        //                         dataupdated = {
        //                             ...item,
        //                             remainingTime: ((Proposaltime - ctime >= 1 ? Proposaltime : Proposaltime) - ctime),

        //                             // remainingTime: Proposaltime - (Proposaltime - NProposaltime >= 1 ? NProposaltime : Proposaltime),
        //                         }
        //                         console.log(dataupdated);
        //                         DatesProcess?.push(dataupdated);
        //                     }
        //                     else {
        //                         console.log('===> codition false');
        //                     }
        //                 })
        //                 console.log('==========>', DatesProcess);
        //                 setProcessDate(DatesProcess)
        //                 setAcceptedProposal(Proposals)
        //             }
        //             else {
        //                 console.log('Test');
        //                 // setNoticeData('')
        //             }
        //             // return
        //             // const Proposals = [];
        //             // const DatesProcess = []
        //             // docSnapshot.forEach((documentSnapshot) => {
        //             //     Proposals?.push(documentSnapshot?.data());
        //             //     var date = documentSnapshot?.data().ProposalTempDate;
        //             //     const hour = 1000 * 60 * 60;
        //             //     const Proposaltime = Math?.round(date?.toDate().getTime() / hour);
        //             //     // console.log(datetostring.toDateString() , date);
        //             //     if (Proposaltime <= ptime && Proposaltime >= ctime && d.toDateString() == documentSnapshot?.data().ProposalDate) {
        //             //         // console.log('====>', Proposaltime, ptime, ctime);
        //             //         const data = documentSnapshot?.data();
        //             //         dataupdated = {
        //             //             ...data,
        //             //             remainingTime: (Proposaltime - (Proposaltime - ctime >= 1 ? ctime : ctime - 1)),
        //             //         }
        //             //         // console.log(dataupdated);
        //             //         DatesProcess?.push(dataupdated);
        //             //     }
        //             //     else {
        //             //         console.log('===> codition false');
        //             //     }
        //             // });
        //             // // console.log(DatesProcess);
        //             // setProcessDate(DatesProcess)
        //             // setAcceptedProposal(Proposals)
        //         })
        // console.log(acceptedProposal);
    }

    const onSendPorposal = () => {
        const test = 'Proposal'
        // setCategory('Proposal')
        // dispatch(PorposalCategory(test))
        if (!dates && !tempDates) {
            // console.log('aklxjn');
            ToastAndroid.show("Please select proposal Date!", ToastAndroid.SHORT);
        }
        else if (!time) {
            ToastAndroid.show("Please select proposal time!", ToastAndroid.SHORT);
        }
        else if (!description) {
            ToastAndroid.show("Please add proposal description!", ToastAndroid.SHORT);
        }
        else if (!pin) {
            ToastAndroid.show("Please add your location!", ToastAndroid.SHORT);
        }
        else if (!category) {
            ToastAndroid.show("Please your time again!", ToastAndroid.SHORT);
        }
        else {
            let mymsg = null;

            // console.log('======>', category);
            if (category == 'Proposal') {
                let pUid = Math?.random().toString(16).slice(2);

                const msg = messages[0]
                mymsg = {
                    ...msg,
                    _id: pUid,
                    sentBy: Currentuser?.uid,
                    sentTo: uid,
                    createdAt: new Date(),
                    image: '',
                    sent: true,
                    category: category,
                    ProposalDate: dates,
                    ProposalTempDate: tempDates,
                    ProposalTime: time,
                    ProposalAddress: location,
                    ProposalLocation: region,
                    ProposalDescription: description,
                    ProposalStatus: false,
                    text: null,
                    read: false,
                    user: {
                        _id: Currentuser?.uid,
                        avatar: Currentuser?.image1,
                    }
                };
                setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
                const docid = uid > Currentuser?.uid ? Currentuser?.uid + "-" + uid : uid + "-" + Currentuser?.uid
                // console.log(mymsg);

                firestore().collection('chatrooms')
                    .doc(docid)
                    .collection('messages')
                    .doc(mymsg?._id)
                    .set({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
                    .then(() => {
                        setImageUrl(null);
                        setImageData(null);
                        setCategory(null);
                        console.log('proposal send');
                        SendPushNotify(uid, Currentuser, mymsg?.ProposalAddress, 'New Message')

                        // dispatch(PorposalCategory(null))
                    })
            }
            setModal(false)
        }
    }

    // useEffect(() => {

    // }, [category])

    const YouArrivedTwo = (item, index) => {
        // console.log('testdfvsd');
        // return
        const test = [];
        acceptedProposal.map(a => {
            if (a?._id != item?._id) {
                test?.push(a);
            }
            else {
                const data = yourArrival[index];
                const updateAccepted = {
                    ...data,
                    YourArrival: true,
                    active: 0
                }
                test?.push(updateAccepted);
            }
        })

        // for chatuserproposal 
        const chatUser = [];
        SecondUserProposal?.map(a => {
            if (a?._id != item?._id) {
                chatUser.push(a);
            }
            else {
                const data2 = yourArrival[index];
                const ChatuserUpdate = {
                    ...data2,
                    PartnerArrival: true,
                    active: 0
                }
                chatUser?.push(ChatuserUpdate);
            }
        })

        if (!test?.length == 0 && !chatUser?.length == 0) {
            try {
                firestore()
                    .collection('Proposals')
                    .doc(Currentuser?.uid)
                    .set({
                        Proposals: test,
                    }, { merge: true })
                    .then(() => {
                        setTimeout(() => {
                            navigation.navigate('DateServayScreen', { ProposalId: item?._id });
                            console.log('DateServayScreen');
                        }, 3000
                            //   1000 * 60 * 60
                        );
                    })
                // .then(() => {
                //     console.log('Proposal Updated!');
                //     // console.log(item);
                // });
                firestore()
                    .collection('Proposals')
                    .doc(uid)
                    .set({
                        Proposals: chatUser,
                    }, { merge: true })
                    .then(() => {
                        console.log('chat user Proposal Updated!');
                        // console.log(item);
                    });
            }
            catch (e) {
                console.log('Error', e);
            }
        }
    }

    const YouArrived = (item, index) => {
        const test = [];
        acceptedProposal.map(a => {
            if (a?._id != item?._id) {
                test.push(a);
            }
            else {
                const data = yourArrival[index];
                const updateAccepted = {
                    ...data,
                    YourArrival: true
                }
                test.push(updateAccepted);
            }
        })

        // for chatuserproposal 
        const chatUser = [];
        SecondUserProposal.map(a => {
            if (a?._id != item?._id) {
                chatUser.push(a);
            }
            else {
                const data2 = yourArrival[index];
                const ChatuserUpdate = {
                    ...data2,
                    PartnerArrival: true
                }
                chatUser?.push(ChatuserUpdate);
            }
        })

        if (!test?.length == 0 && !chatUser?.length == 0) {
            // console.log(test);
            // console.log('=>', chatUser);
            // try {
            //     const userRef = firestore().collection('chatrooms')
            //         .doc(docid)
            //         .collection('messages')
            //         .doc(item._id)

            //     userRef.update({
            //         YourArrival: true,
            //     })
            //         .then(() => {
            //             // RefereshForm();
            //             // setDefaultAnimationDialog(false)
            //             // navigation.goBack();
            //             // console.log('Event deleted!');
            //             ToastAndroid.show('You are arrived!', ToastAndroid.SHORT)
            //         });
            // }
            // catch (e) {
            //     console.log('Error', e);
            // }
            try {
                firestore()
                    .collection('Proposals')
                    .doc(Currentuser?.uid)
                    .set({
                        Proposals: test,
                    }, { merge: true })
                    .then(() => {
                        console.log('Proposal Updated!');
                        // console.log(item);
                    });
                firestore()
                    .collection('Proposals')
                    .doc(uid)
                    .set({
                        Proposals: chatUser,
                    }, { merge: true })
                    .then(() => {
                        console.log('chat user Proposal Updated!');
                        // console.log(item);
                    });
            }
            catch (e) {
                console.log('Error', e);
            }
        }
        // return

        // if (!item == '') {
        //     const updatedata = { ...item, YourArrival: true }

        //     console.log(updatedata);
        //     return;
        //     firestore().collection('notification').doc(currentUser).update({
        //         Notices: updatedata
        //     }, { merge: true })
        // } else {
        //     console.log('noticeStatus not update');
        // }
        // return;
        // const userRef = firestore().collection('chatrooms')
        //     .doc(Currentuser.uid)

        // userRef.set({  
        //     'YourArrival': true,
        // })
    };

    const YouNotArrived = (item, index) => {
        // console.log('asljdhajcn');
        // return;
        const userRef = firestore().collection('Users')
            .doc(Currentuser?.uid)
        userRef.update({
            'userDetails.Flake': firestore.FieldValue.increment(1),
        }).then(() => {
            console.log('Flake Added!');
            // console.log(item);
        });
        // return;

        const test = [];
        acceptedProposal.map(a => {
            if (a?._id != item?._id) {
                test.push(a);
            }
            else {
                const data = yourArrival[index];
                const updateAccepted = {
                    ...data,
                    YourArrival: false,
                    CancleDate: true,
                    CancleDateType: 'Cancle',
                    active: 0,
                }
                test.push(updateAccepted);
            }
        })

        // for chatuserproposal 
        const chatUser = [];
        SecondUserProposal.map(a => {
            if (a?._id != item?._id) {
                chatUser.push(a);
            }
            else {
                const data2 = yourArrival[index];
                const ChatuserUpdate = {
                    ...data2,
                    PartnerArrival: false,
                    CancleDate: true,
                    active: 0,
                }
                chatUser.push(ChatuserUpdate);
            }
        })

        if (!test?.length == 0 && !chatUser?.length == 0) {
            try {
                firestore()
                    .collection('Proposals')
                    .doc(Currentuser?.uid)
                    .set({
                        Proposals: test,
                    }, { merge: true })
                    .then(() => {
                        console.log('Proposal Updatedss!');
                        // console.log(item);
                    });
                firestore()
                    .collection('Proposals')
                    .doc(uid)
                    .set({
                        Proposals: chatUser,
                    }, { merge: true })
                    .then(() => {
                        console.log('chat user Proposal Updated!');
                        // console.log(item);
                    });
            }
            catch (e) {
                console.log('Error', e);
            }
        }
        // if (!item == '') {
        //     const userRef = firestore().collection('chatrooms')
        //         .doc(docid)
        //         .collection('messages')
        //         .doc(item._id)

        //     userRef.update({
        //         YourArrival: false,
        //         CancleDate: true
        //     })
        //         .then(() => {
        //             // RefereshForm();
        //             // setDefaultAnimationDialog(false)
        //             // navigation.goBack();
        //             // console.log('Event deleted!');
        //             ToastAndroid.show('Date cancled!', ToastAndroid.SHORT)
        //             const userRef = firestore().collection('Users')
        //                 .doc(Currentuser.uid)
        //             userRef.update({
        //                 'userDetails.Flake': + 1,
        //             })
        //         });
        //     // firestore()
        //     //     .collection('Proposals')
        //     //     .doc(Currentuser.uid)
        //     //     .set({
        //     //         Proposals: test,
        //     //     }, { merge: true })
        //     //     .then(() => {
        //     //         console.log('Proposal Updated!');
        //     //         // console.log(item);
        //     //     });
        // }
        // const test = [];
        // messages.map(a => {
        //     if (a._id != item._id) {
        //         test.push(a);
        //     }
        // })


        // // const data = yourArrival[index];
        // // const updateAccepted = { ...data, YourArrival: true }
        // // test.push(updateAccepted);

        // // console.log(item);
        // const data = yourArrival[index];
        // const updateAccepted = { ...data, YourArrival: false, CancleDate: true }
        // // yourArrival[index] = updateAccepted;
        // test.push(updateAccepted);

        // console.log(test);

        // return;
        // if (!yourArrival.length == 0) {
        //     try {
        //         firestore()
        //             .collection('Proposals')
        //             .doc(Currentuser.uid)
        //             .set({
        //                 Proposals: test,
        //             }, { merge: true })

        //         const userRef = firestore().collection('Users')
        //             .doc(Currentuser.uid)
        //         userRef.update({
        //             'userDetails.Flake': + 1,
        //         })
        //     }
        //     catch (e) {
        //         console.log('Error', e);
        //     }
        // }
    }

    const PNoArrived = (item, index) => {
        const d = new Date();
        const hour = 1000 * 60 * 60;
        const ctime = Math?.round(d.getTime() / hour);
        const ntime = Math?.round(d.getTime() / hour) + 1;

        var date = item?.ProposalTempDate;
        const Proposaltime = Math?.round(date?.toDate()?.getTime() / hour);
        const NProposaltime = Math?.round(date?.toDate()?.getTime() / hour);
        // console.log(ntime, Proposaltime);

        const test = [];
        acceptedProposal.map(a => {
            if (a?._id != item?._id) {
                test?.push(a);
            }
            else {
                const data = yourArrival[index];
                const updateAccepted = {
                    ...data,
                    YourArrival: true,
                    CancleDate: true,
                }
                test?.push(updateAccepted);
            }
        })

        // for chatuserproposal 
        const chatUser = [];
        SecondUserProposal.map(a => {
            if (a?._id != item?._id) {
                chatUser.push(a);
            }
            else {
                const data2 = yourArrival[index];
                const ChatuserUpdate = {
                    ...data2,
                    PartnerArrival: true,
                    YourArrival: false,
                    CancleDate: true,
                }
                chatUser?.push(ChatuserUpdate);
            }
        })

        if (ctime >= NProposaltime) {
            // console.log('test');
            // return
            if (!test?.length == 0 && !chatUser?.length == 0) {
                try {
                    firestore()
                        .collection('Proposals')
                        .doc(Currentuser?.uid)
                        .set({
                            Proposals: test,
                        }, { merge: true })
                        .then(() => {
                            console.log('Proposal Updated!');
                            // console.log(item);
                        });
                    firestore()
                        .collection('Proposals')
                        .doc(uid)
                        .set({
                            Proposals: chatUser,
                        }, { merge: true })
                        .then(() => {
                            console.log('chat user Proposal Updated!');
                            const userRef = firestore().collection('Users')
                                .doc(uid)
                            userRef.update({
                                'userDetails.Flake': + 1,
                            })
                            // console.log(item);
                        });
                }
                catch (e) {
                    console.log('Error', e);
                }
            }

        }
        else {
            ToastAndroid.show(`Please wait for ${NProposaltime - ctime} hr to perform any action.`, ToastAndroid.SHORT)
            // console.log(item);
        }
    };
    const PArrived = (item, index) => {
        // console.log('parrive');
        // return;
        const d = new Date();
        const hour = 1000 * 60 * 60;
        const ctime = Math.round(d.getTime() / hour);
        const ntime = Math.round(d.getTime() / hour) + 1;

        var date = item?.ProposalTempDate;
        const Proposaltime = Math?.round(date?.toDate()?.getTime() / hour);
        const NProposaltime = Math?.round(date?.toDate()?.getTime() / hour);
        // console.log(ntime, Proposaltime);

        const test = [];
        acceptedProposal.map(a => {
            if (a?._id != item?._id) {
                test.push(a);
            }
            else {
                const data = yourArrival[index];
                const updateAccepted = {
                    ...data,
                    PartnerArrival: true,
                    CancleDate: false,
                    active: 0,
                }
                test.push(updateAccepted);
            }
        })

        // for chatuserproposal 
        const chatUser = [];
        SecondUserProposal.map(a => {
            if (a?._id != item?._id) {
                chatUser?.push(a);
            }
            else {
                const data2 = yourArrival[index];
                const ChatuserUpdate = {
                    ...data2,
                    PartnerArrival: true,
                    YourArrival: true,
                    CancleDate: false,
                    active: 0,
                }
                chatUser?.push(ChatuserUpdate);
            }
        })

        if (ctime >= NProposaltime) {
            // console.log('test');
            // return
            if (!test?.length == 0 && !chatUser?.length == 0) {
                try {
                    firestore()
                        .collection('Proposals')
                        .doc(Currentuser?.uid)
                        .set({
                            Proposals: test,
                        }, { merge: true })
                        .then(() => {
                            setTimeout(() => {
                                navigation.navigate('DateServayScreen', { ProposalId: item?._id });
                                console.log('DateServayScreen');
                            }, 3000
                                //   1000 * 60 * 60
                            );
                        })
                    // .then(() => {
                    //     console.log('Proposal Updated!');
                    //     // console.log(item);
                    // });
                    firestore()
                        .collection('Proposals')
                        .doc(uid)
                        .set({
                            Proposals: chatUser,
                        }, { merge: true })
                        .then(() => {
                            console.log('Partner Arrived!');
                            // const userRef = firestore().collection('Users')
                            //     .doc(uid)
                            // userRef.update({
                            //     'userDetails.Flake': + 1,
                            // })
                            // console.log(item);
                        });
                }
                catch (e) {
                    console.log('Error', e);
                }
            }

        }
        else {
            ToastAndroid.show(`Please wait for ${NProposaltime - ctime} hr to perform any action.`, ToastAndroid.SHORT)
            // console.log(item);
        }
        // console.log(item);
        // return;
        // if (!item == '') {
        //     const userRef = firestore().collection('chatrooms')
        //         .doc(docid)
        //         .collection('messages')
        //         .doc(item._id)

        //     userRef.update({
        //         YourArrival: true,
        //     })
        //         .then(() => {
        //             // RefereshForm();
        //             // setDefaultAnimationDialog(false)
        //             // navigation.goBack();
        //             // console.log('Event deleted!');
        //             ToastAndroid.show('You are arrived!', ToastAndroid.SHORT)
        //         });
        // firestore()
        //     .collection('Proposals')
        //     .doc(Currentuser.uid)
        //     .set({
        //         Proposals: test,
        //     }, { merge: true })
        //     .then(() => {
        //         console.log('Proposal Updated!');
        //         // console.log(item);
        //     });
        // }
        // }
        // else {
        //     ToastAndroid.show(`Please wait for ${NProposaltime - ctime} hr to perform any action.`, ToastAndroid.SHORT)
        //     // return
        // }

        // const itemDate = Math?.round(item?.ProposalTempDate?.toDate().getTime() / hour);
        // const itemDate2 = Math?.round(item?.ProposalTempDate?.toDate().getTime() / hour) + 1;
    }

    // const sendPorposalFuction = (pUid) => {
    //     let mymsg = null;
    //     console.log('send image');
    //     const msg = messages[0]
    //     mymsg = {
    //         ...msg._id = msg._id + 1,
    //         sentBy: Currentuser.uid,
    //         sentTo: uid,
    //         createdAt: new Date(),
    //         image: '',
    //         sent: true,
    //         category: category,
    //         ProposalDate: dates,
    //         ProposalTime: time,
    //         ProposalAddress: location,
    //         ProposalLocation: pin,
    //         ProposalDescription: description,
    //         ProposalStatus: false,
    //     };
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
    //     const docid = uid > Currentuser.uid ? Currentuser.uid + "-" + uid : uid + "-" + Currentuser.uid
    //     console.log(mymsg);
    //     return;
    // }




    const RejectProposal = (uid) => {
        // console.log('reject', uid);
        const userRef = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .doc(uid)

        userRef.delete()
            .then(() => {
                // RefereshForm();
                // setDefaultAnimationDialog(false)
                // navigation.goBack();
                // console.log('Event deleted!');
                ToastAndroid.show('Proposal Delete!', ToastAndroid.SHORT)
            });
    }
    const AcceptProposal = (uids) => {
        const date = new Date();
        // setCurrentTime(ctime)

        const userReftwo = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .doc(uids)

        userReftwo.update({
            // 'YourArrival': true,
            'ProposalStatus': true,
            'AcceptTime': date,
            'active': 1,
        }).then(() => {

            firestore().collection('chatrooms')
                .doc(docid)
                .collection('messages')
                .doc(uids)
                .onSnapshot(docSnapshot => {
                    const data = docSnapshot?.data()
                    // console.log('==============>',docSnapshot.data());
                    // return;
                    try {
                        firestore()
                            .collection('Proposals')
                            .doc(Currentuser?.uid)
                            .set({
                                Proposals: firestore.FieldValue.arrayUnion(data),
                            }, { merge: true })
                            .then(() => {
                                // console.log('Proposal submit!');
                                // console.log(item);
                            });
                        // for chat user 
                        firestore()
                            .collection('Proposals')
                            .doc(uid)
                            .set({
                                Proposals: firestore.FieldValue.arrayUnion(data),
                            }, { merge: true })
                            .then(() => {
                                // console.log('Proposal submit!');
                                // console.log(item);
                            });
                    }
                    catch (e) {
                        console.log(e);
                    }
                })
        })
        // console.log('accept', uid);
        // return;
    }



    const openCamera = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result?.didCancel && result?.didCancel == true) {
        } else {
            // console.log(result.assets[0].uri);
            setImageData(result);
            uploadImage(result);
        }
    };

    const uploadImage = async imageDataa => {
        const pathToFile = imageDataa?.assets[0]?.uri;
        // console.log(imageDataa.assets[0].uri);
        const reference = storage().ref(`Chats/${imageDataa?.assets[0]?.fileName}`);
        const task = reference.putFile(pathToFile);
        // const url = await reference.getDownloadURL();
        // console.log('url', url);
        // setImageUrl(url);
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await reference.getDownloadURL();
            // setImageUrl(url);
            SendToChat(url);
            // console.log('===>',url);
        } catch (e) {
            console.log(e);
        }
    };

    const SendToChat = (url) => {
        let mymsg = null;

        if (url) {
            let pUid = Math.random().toString(16).slice(2);

            const msg = messages[0]
            mymsg = {
                ...msg,
                _id: pUid,
                sentBy: Currentuser?.uid,
                sentTo: uid,
                createdAt: new Date(),
                image: url,
                sent: true,
                category: 'image',
                ProposalDate: '',
                ProposalTime: '',
                ProposalAddress: '',
                ProposalLocation: '',
                ProposalDescription: '',
                ProposalStatus: '',
                read: false,
                text: null,
                user: {
                    _id: Currentuser.uid,
                    avatar: Currentuser.image1,
                }
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
            const docid = uid > Currentuser?.uid ? Currentuser?.uid + "-" + uid : uid + "-" + Currentuser?.uid
            // console.log(mymsg);

            firestore().collection('chatrooms')
                .doc(docid)
                .collection('messages')
                .doc(mymsg?._id)
                .set({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
                .then(() => {
                    console.log('image send');
                    // dispatch(PorposalCategory(null))
                    SendPushNotify(uid, Currentuser, mymsg?.category, 'New Message')

                })
        }
        else {
            ToastAndroid.show("Network issue try again!", ToastAndroid.SHORT);
        }
    }

    const renderBubble = (props) => {
        // console.log(props.currentMessage.category);
        const filter = props?.currentMessage?.category
        // console.log(props.currentMessage.sentBy);
        // // console.log(Currentuser.uid);
        // console.log(props.currentMessage.text);
        if (filter == 'Proposal') {
            return (
                <Bubble
                    {...props}
                    wrapperStyle={{
                        right: {
                            backgroundColor: COLORS.white,
                            elevation: 3,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                            // height: 170,
                            // width: 250,
                        },
                        left: {
                            backgroundColor: COLORS.white,
                            elevation: 3,
                            borderBottomRightRadius: 15,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                            // height: 170,
                            // width: 250,
                        }
                    }}
                    textStyle={{
                        right: {
                            color: COLORS.main
                        },
                    }}
                />

            )
        }
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: COLORS.main,
                    }
                }}
                textStyle={{
                    right: {
                        color: COLORS.white,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                    },
                    left: {
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 0,
                    }
                }}
            />
        )
    }

    const myAttachmentFunction = () => {
        console.log('attachment');
    }

    const customtInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: "white",
                    borderColor: "#E8E8E8",
                    borderTopWidth: 1,
                    padding: 5,
                    height: 50,
                    color: COLORS.black,
                    // marginBottom:30
                }}
                color={COLORS.black}
                textInputStyle={{ color: COLORS.black }}
                placeholder="Type your message here..."
            />
        );
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date.toDateString());
        setDates(date.toDateString())
        hideDatePicker();
    };

    // const showDateModal = () => {
    //     setDateVisibility(true);
    //     // console.log('showdatemodal');
    // }
    // const hideDiscountStartDatePicker = () => {
    //     setDateVisibility(false);
    // };
    // const handleDiscountConfirmStartDate = date => {
    //     // console.warn('A date has been picked: ', date);
    //     setDiscountStartDate(moment(date).format('MM/DD/yy'))
    //     // setDiscountStartDate(moment(date).format('MM/DD/yy'));
    //     hideDiscountStartDatePicker();
    // };
    // const hideDatePicker = () => {
    //     setDateVisibility(false);
    // };
    // const handleConfirmDate = date => {
    //     setDate(moment(date).format('MM/DD/yy'));
    //     // console.log('date', date);
    //     // const test = moment(date).format('MM/DD/yy')
    //     // console.warn('A date has been picked: ', date);
    //     hideDatePicker();
    // };

    const showTimeModal = () => {
        setTimeVisibility(true)
        setCategory('Proposal')
    }
    const hideTimePicker = () => {
        setTimeVisibility(false);
    };
    const handleConfirmTime = date => {
        // console.warn('A date has been picked: ', date);
        setTempDates(date)
        const final = date?.toLocaleString('en-UK', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        setTime(final);
        hideTimePicker();
    };

    const OpenLocationModalView = () => {
        setLocationModalVisible(!locationModalVisible)
        setActionTriggered('ACTION_1');
    }


    const TempCancleDate = (item) => {
        setModal(true), setDeleteModal('DeleteModal')
        // console.log(item);
        setTempCancleDates(item)
    }

    const CancleDate = () => {
        setLoading(true)
        const test = []
        acceptedProposal?.map(a => {
            if (a?._id != tempCancleDate?._id) {
                test?.push(a);
            }
        })
        try {
            firestore()
                .collection('Proposals')
                .doc(Currentuser?.uid)
                .set({
                    Proposals: test,
                }, { merge: true })
                .then(() => {
                    ToastAndroid.show('Date canceled!', ToastAndroid.SHORT)
                    setLoading(false)
                    setModal(false)
                })
            firestore()
                .collection('Users')
                .doc(Currentuser?.uid)
                .update({
                    'userDetails.Flake': firestore.FieldValue.increment(1),
                })
        }
        catch (e) {
            console.log(e);
        }
        // console.log(test);
    }

    const OnSetLocation = () => {
        if (region) {
            console.log('selected pin', region);
            console.log('selected pin', location);
            // setLocation('location')
            // setAddressText(location)
            // return;
            setLocationModalVisible(false)
        }
        else {
            ToastAndroid.show("Please select location first!", ToastAndroid.SHORT);
        }
    }

    const OnRateUser = () => {
        setShowFilter(true)
        setShowFilterType('ACTION_2')
        setReviewCoach(data)
        // return (
        //     <RateMediatorScreen
        //         data={ReviewCoach}
        //         setShowFilter={setShowFilter}
        //         setShowFilterType={setShowFilterType}
        //         defaultRating={defaultRating}
        //         maxRating={maxRating}
        //         datingCoachRating={datingCoachRating}
        //         newRating={newRating}
        //         setNewRating={setNewRating}
        //         comments={comments}
        //         setComments={setComments}
        //         onpress={SubmitReview}
        //         loading={loading}
        //     />
        // )
    }

    const renderSend = props => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                height: 40,
            }}>
                {/* <TouchableOpacity
                    onPress={() => { setModal(true) }}
                    style={{
                        paddingLeft: 10
                    }}>
                    <Feather name="share" size={22} color={COLORS.black} />
                </TouchableOpacity> */}
                {imageUrl ? (
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            marginHorizontal: 5,
                        }}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                position: 'absolute',
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setImageUrl('');
                            }}>
                            <Image
                                source={require('../../../assets/cross.png')}
                                style={{ width: 16, height: 16, tintColor: COLORS.black }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : null}
                <TouchableOpacity
                    onPress={() => { openCamera() }}
                    style={{
                        paddingLeft: 5,
                        paddingRight: 10,
                    }}
                >
                    <Ionicons name='camera-outline' size={25} color={COLORS.black} />
                </TouchableOpacity>
                <Send {...props}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor:COLORS.black,
                        paddingRight: 5,
                        width: 25
                    }}>
                        <IconButton
                            icon='send-circle'
                            size={30}
                            iconColor={COLORS.main}
                        />
                    </View>
                </Send>
            </View>
        )
    }
    const goToMessages = () => {
        navigation.goBack()
        // uid
        // console.log('goback');
    }

    function scrollToBottomComponent() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <IconButton icon='chevron-double-down' size={36} iconColor={COLORS.main} />
            </View>
        );
    }
    function renderLoading() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size='large' color={COLORS.main} />
            </View>
        );
    }

    const refreshform = () => {
        setShowFilter(false)
        setShowFilterType(null)
        setReviewCoach(null)
        // setDatingCoach([])
        setNewRating(0)
        setComments(null)
        setModalpoppup(false)
        setShowModalContent({
            ...showModalContent,
            title: null,
            descrition: null,
            type: null
        })
    }

    const onSendLike = async (item) => {
        // console.log(Currentuser);
        // return
        try {
            setLoading(true)
            const ref = firestore().collection('Users').doc(Currentuser?.uid)
            const docSnapshot = await ref.get()
            if (docSnapshot.exists) {
                const pvtChat = docSnapshot.data()?.PrivateChat
                if (pvtChat?.length > 0) {
                    // const dataArray = documentSnapShot?.data()?.MoreRequestes
                    const index = pvtChat.findIndex(j => j?.ChatuserDetails?.uid == item?.uid);
                    if (index !== -1) {
                        pvtChat[index] = {
                            ...pvtChat[index], // Copy existing data
                            // You can update other fields here as well
                        };

                        await ref.update({
                            PrivateChat: pvtChat,
                        });
                    }
                    else {
                        await ref.update({
                            PrivateChat: firestore.FieldValue.arrayUnion({
                                ChatuserDetails: item
                            })
                        })
                    }
                }
                else {
                    await ref.update({
                        PrivateChat: [{
                            ChatuserDetails: item
                        }],
                    })
                }
                // setLikedUser(true)
                // if (!likeduser) {
                setLoading(false)
                setModalpoppup(true)
                setShowModalContent({
                    ...showModalContent,
                    title: 'Like Sended',
                    descrition: `Your like has been send successfully to ${item?.Name}`,
                    typ: 'success',
                })
                const newindex = suggestedUser.findIndex(j => j?.uid == item?.uid);
                let updatedsuggestion = {
                    ...item,
                    liked: true
                }
                suggestedUser[newindex] = updatedsuggestion
                // suggestedUser[newindex] = {
                //     ...suggestedUser[newindex], // Copy existing data
                //     liked: true,
                //     // You can update other fields here as well
                // };
                // setSuggestedUser(suggestedUser)
                // console.log(suggestedUser);
            }
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }

    function renderCustomePurposal(props) {
        // console.log(props.currentMessage.category);
        const uid = props?.currentMessage?._id;
        const myid = props?.currentMessage?.sentBy;
        const chatuserid = props?.currentMessage?.sentTo;
        const filter = props?.currentMessage?.category;
        const ProposalAddress = props?.currentMessage?.ProposalAddress;
        const ProposalDate = props?.currentMessage?.ProposalDate;
        const ProposalTime = props?.currentMessage?.ProposalTime;
        const ProposalStatus = props?.currentMessage?.ProposalStatus;
        // const filter = props.currentMessage.category;
        // const filter = props.currentMessage.category;
        // console.log(props.currentMessage.sentBy);a
        // console.log(props.currentMessage.sentBy);
        // console.log(props.currentMessage.text);
        return (
            <>
                {filter == 'Proposal' && Currentuser?.uid == myid &&
                    <View style={{
                        backgroundColor: COLORS.white,
                        // elevation:3,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: COLORS.black,
                                    paddingRight: 20
                                }}>Dating Porposal</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 12,
                                }}>6 days remaining</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../../assets/events.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalDate}</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../../assets/clock.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalTime}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../../assets/map.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalAddress}</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => RejectProposal(uid)}
                            activeOpacity={0.8}
                            style={{
                                backgroundColor: COLORS.black,
                                marginTop: 20,
                                borderRadius: 10,
                                padding: 10,
                                alignItems: 'center',
                            }}>
                            <Text style={{
                                color: COLORS.white
                            }}>Withdraw purposal</Text>
                        </TouchableOpacity>
                    </View>
                }

                {filter == 'Proposal' && Currentuser?.uid == chatuserid &&
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 15,
                        // elevation:3,
                        // borderBottomRightRadius: 0,
                        // borderBottomLeftRadius: 15,
                        // borderTopRightRadius: 15,
                        // borderTopLeftRadius: 15,
                        // height: 170,
                        // width: 250,
                        // width: 300,
                        // height: 150,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: COLORS.black,
                                    paddingRight: 20
                                }}>Dating Porposal</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 12,
                                }}>6 days remaining</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../../assets/events.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalDate}</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../../assets/clock.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalTime}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingRight: 5
                                }}>
                                    <Image source={require('../../../assets/map.png')} resizeMode="contain" style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                    }}>{ProposalAddress}</Text>
                                </View>
                            </View>
                        </View>
                        {ProposalStatus ?
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{
                                    backgroundColor: COLORS.black,
                                    marginTop: 20,
                                    borderRadius: 10,
                                    padding: 10,
                                    alignItems: 'center',
                                }}>
                                <Text style={{
                                    color: COLORS.white
                                }}>Cancle</Text>
                            </TouchableOpacity>
                            :
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity
                                    onPress={() => RejectProposal(uid)}
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: COLORS.transparent,
                                        borderWidth: 1,
                                        marginTop: 20,
                                        borderRadius: 10,
                                        padding: 10,
                                        alignItems: 'center',
                                        width: 120,
                                        marginHorizontal: 10
                                    }}>
                                    <Text style={{
                                        color: COLORS.black
                                    }}>Reject</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => AcceptProposal(uid)}

                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: COLORS.black,
                                        marginTop: 20,
                                        borderRadius: 10,
                                        padding: 10,
                                        alignItems: 'center',
                                        width: 120,
                                        marginHorizontal: 10
                                    }}>
                                    <Text style={{
                                        color: COLORS.white
                                    }}>Accepte</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                }
            </>
        )
    }


    const handleSubmission = async (modalType) => {
        // console.log(modalType);
        // return
        if (!reason || reason == '') {
            ToastAndroid.show("Please enter reasone!", ToastAndroid.SHORT);
        }
        else {
            setLoading(true)
            // if (modalType == 'unmatch') {
            //     console.log(`Handling ${modalType} with reason:`, reason);
            //     try {
            //         const ref = firestore().collection('UsersQuery').doc('2')
            //         const refdoc = await ref?.get()
            //         if (refdoc?.exists) {
            //             const Report = refdoc?.data()?.Unmatch
            //             const index = Report.findIndex(item => item?.from == Currentuser?.uid && item.to == uid);
            //             if (index != -1) {
            //                 OnDeleteUser()
            //                 ToastAndroid.show(`${userName} removed from your matches successfully`, ToastAndroid.SHORT);
            //                 SendPushNotify(uid, Currentuser, `Hase been remove you from match!`, 'Matched')
            //                 setModalVisible(false)
            //                 setReason(null)
            //                 setLoading(false)
            //                 return
            //             }
            //             else {
            //                 await ref?.set(
            //                     {
            //                         Unmatch: firestore.FieldValue.arrayUnion(
            //                             {
            //                                 from: Currentuser?.uid,
            //                                 to: uid,
            //                                 totalUnmatch: 1,
            //                                 Reasone: reason,
            //                                 UnmatchTime: new Date().toString()
            //                             }
            //                         ),
            //                     },
            //                     { merge: true },
            //                 )
            //                     .then(() => {
            //                         OnDeleteUser()
            //                         ToastAndroid.show(`${userName} removed from your matches successfully`, ToastAndroid.SHORT);
            //                         SendPushNotify(uid, Currentuser, `Hase been remove you from match!`, 'Matched')
            //                         setModalVisible(false)
            //                         setReason(null)
            //                         setLoading(false)
            //                     })
            //                 return
            //             }
            //         }
            //         else {
            //             await ref?.set({
            //                 Unmatch: [
            //                     {
            //                         from: Currentuser?.uid,
            //                         to: uid,
            //                         totalUnmatch: 1,
            //                         Reasone: reason,
            //                         UnmatchTime: new Date().toString()
            //                     }
            //                 ]
            //             })
            //                 .then(() => {
            //                     OnDeleteUser()
            //                     ToastAndroid.show(`${userName} removed from your matches successfully`, ToastAndroid.SHORT);
            //                     SendPushNotify(uid, Currentuser, `Hase been remove you from match!`, 'Matched')
            //                     setModalVisible(false)
            //                     setReason(null)
            //                     setLoading(false)
            //                 })
            //         }
            //     } catch (e) {
            //         ToastAndroid.show(`Error : ${e}`, ToastAndroid.SHORT);
            //         console.log(e);
            //         setLoading(false)
            //     }
            //     return
            // }
            if (modalType == 'Block') {
                // console.log(`Handling2 ${modalType} with reason:`, reason);
                try {
                    const mydoc = firestore().collection('Users').doc(Currentuser?.uid)
                    const mydocGet = await mydoc.get()
                    if (mydocGet?.exists) {
                        const BlockedUsers = mydocGet?.data()?.BlockedUsers ?? []
                        let checkUser = BlockedUsers?.some(item => item?.to == uid);
                        // const index = BlockedUsers?.length > 0 && BlockedUsers?.findIndex(item => item.to == uid)

                        // console.log(checkUser, Currentuser?.uid, BlockedUsers, '---');
                        // setLoading(false)
                        // OnDeleteUser(Currentuser);
                        // return
                        if (checkUser) {
                            // console.log('here');
                            setLoading(false)
                            // return
                            ToastAndroid.show(`${userName} Already Blocked`, ToastAndroid.SHORT);
                            OnDeleteUser(Currentuser)
                            // SendPushNotify(uid, Currentuser, `Block you!`, 'Blocked')
                            setModalVisible(false)
                            setReason(null)
                            return
                        }
                        else {
                            // console.log(mydocGet?.data());
                            try {
                                await mydoc.update({
                                    BlockedUsers: firestore.FieldValue.arrayUnion({
                                        BlockedTime: new Date().toString(),
                                        from: Currentuser?.uid,
                                        to: uid,
                                        totalBlocks: 1,
                                        Reason: reason,  // Corrected the typo in the field name
                                    }),
                                })
                                    .then(() => {
                                        ToastAndroid.show(`${userName} Blocked successfully`, ToastAndroid.SHORT);
                                        SendPushNotify(uid, Currentuser, 'Block you!', 'Blocked');
                                        OnDeleteUser(Currentuser);
                                        setModalVisible(false);
                                        setReason(null);
                                        setLoading(false);
                                    })

                                console.log('Update successful');
                            } catch (error) {
                                setLoading(false)
                                console.error('Error updating document:', error);
                            }
                            return
                        }
                    }
                    // console.log(Currentuser);
                    setLoading(false)
                } catch (e) {
                    ToastAndroid.show(`Error : ${e}`, ToastAndroid.SHORT);
                    console.log(e);
                    setLoading(false)
                }
                return
            }
            if (modalType == 'report') {
                try {
                    const ref = firestore().collection('UsersQuery').doc('1')
                    const refdoc = await ref?.get()
                    if (refdoc?.exists) {
                        const Report = refdoc?.data()?.Report
                        const index = Report.findIndex(item => item?.from == Currentuser?.uid && item.to == uid);
                        if (index != -1) {
                            ToastAndroid.show(`Report already sended to D&H Team!`, ToastAndroid.SHORT);
                            setModalVisible(false)
                            setReason(null)
                            setLoading(false)
                            return
                        }
                        else {
                            await ref?.set(
                                {
                                    Report: firestore.FieldValue.arrayUnion(
                                        {
                                            from: Currentuser?.uid,
                                            to: uid,
                                            totalReports: 1,
                                            Reasone: reason,
                                            reportTime: new Date().toString()
                                        }
                                    ),
                                },
                                { merge: true },
                            )
                                .then(() => {
                                    ToastAndroid.show(`Your Report for ${userName} hase Sended to D&H teams!`, ToastAndroid.SHORT);
                                    SendPushNotify(uid, Currentuser, `Hase been reported your Account!`, 'Reported')
                                    setModalVisible(false)
                                    setReason(null)
                                    setLoading(false)
                                })
                            return
                        }
                    }
                    else {
                        await ref?.set({
                            Report: [
                                {
                                    from: Currentuser?.uid,
                                    to: uid,
                                    totalReports: 1,
                                    Reasone: reason,
                                    reportTime: new Date().toString()
                                }
                            ]
                        })
                            .then(() => {
                                ToastAndroid.show(`Your Report for ${userName} hase Sended to D&H teams!`, ToastAndroid.SHORT);
                                SendPushNotify(uid, Currentuser, `Hase been reported your Account!`, 'Reported')
                                setModalVisible(false)
                                setReason(null)
                                setLoading(false)
                            })
                    }
                } catch (e) {
                    ToastAndroid.show(`Error : ${e}`, ToastAndroid.SHORT);
                    console.log(e);
                    setLoading(false)
                }
                return
            }
        }
        // Logic to handle submission based on the modal type (report, block, unmatch)

        // Additional logic as needed
    };


    const OnDeleteUser = async (Currentuser) => {
        const userUid = Currentuser?.uid;
        // console.log(userUid, uid);
        // return;
        try {


            // Reference to your 'Requestes' collection
            const requestsRef = firestore().collection('Requestes').doc(userUid);

            // Get the current document snapshot
            const documentSnapshot = await requestsRef.get();

            if (documentSnapshot?.exists) {
                const dataArray = documentSnapshot?.data()?.MoreRequestes ?? [];

                // Find the index of the coordinator to be removed
                const coordinatorIndex = dataArray?.length > 0 && dataArray.findIndex(item => item.sendby == uid && item.status == true);
                if (coordinatorIndex != -1) {
                    // Remove the coordinator from the array
                    dataArray.splice(coordinatorIndex, 1);

                    // console.log(dataArray);
                    // return
                    // Update the document with the modified array
                    await requestsRef.update({
                        MoreRequestes: dataArray,
                    }).then(async () => {
                        // console.log(`Coordinator with ID ${uid} removed successfully.`);
                        const requestsRefTwo = firestore().collection('Requestes').doc(uid);

                        // Get the current document snapshot
                        const documentSnapshotTwo = await requestsRefTwo.get();

                        if (documentSnapshotTwo?.exists) {
                            const dataArrayTwo = documentSnapshotTwo?.data()?.MoreRequestes ?? [];

                            // Find the index of the coordinator to be removed
                            const coordinatorIndexTwo = dataArrayTwo?.length > 0 && dataArrayTwo.findIndex(item => item.sendby == userUid && item.status == true);

                            if (coordinatorIndexTwo != -1) {
                                // Remove the coordinator from the array
                                dataArrayTwo.splice(coordinatorIndexTwo, 1);

                                // Update the document with the modified array
                                await requestsRefTwo.update({
                                    MoreRequestes: dataArrayTwo,
                                });

                                console.log(`Coordinator with ID ${userUid} removed successfully.`);
                                navigation?.goBack()
                            } else {
                                console.log(`Coordinator with ID ${userUid} not found in the list.`);
                            }
                            setLoading(false);
                        } else {
                            console.log(`Document for user with ID ${userUid} does not exist.`);
                            setLoading(false);
                        }
                    })

                } else {
                    console.log(`Coordinator with ID ${uid} not found in the list.`);
                }
                setLoading(false);
            } else {
                console.log(`Document for user with ID ${userUid} does not exist.`);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error removing match coordinator:', error);
            setLoading(false)
        }

    }
    const SendPushNotify = (uid, Currentuser, mymsg, title) => {
        // console.log(uid, Currentuser?.Name, mymsg);
        // return
        firestore()
            .collection('token')
            .doc(uid)
            .get()
            .then(doc => {
                let token = doc?.data()?.token;
                console.log(token);

                // return
                if (token) {
                    var data = JSON.stringify({
                        notification: {
                            title: `${title ? title : 'New Message'}`,
                            body: `${Currentuser?.Name ? Currentuser?.Name : 'New User'}: ${mymsg ? mymsg : 'click to  open message'}`,
                        },
                        to: token,
                    });
                    let config = {
                        method: 'post',
                        url: 'https://fcm.googleapis.com/fcm/send',
                        headers: {
                            Authorization:
                                'key=AAAAjKV_1r4:APA91bH56x6Wf4dGGgy4pBN1FN2UBCanBAk3WPaW3gMU2sba7_Ou1xnAKL6i_bbcZx9LhShUrc_GTwkhnU-MRCWwOCvwi-Gj6Nj4eC_-8WWj8giBSCWkqfcb0H7BpcQgyC1X3lRyzGt4',
                            'Content-Type': 'application/json',
                        },
                        data: data,
                    };
                    axios(config)
                        .then(res => {
                            console.log('Here', res);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <PaperProvider> */}
            <StatusBar backgroundColor={COLORS.black} />

            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    height: '10%',
                    backgroundColor: COLORS.white,
                }}>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={goToMessages} style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <AntDesign name="arrowleft" size={20} color={COLORS.black} />
                        </TouchableOpacity>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={{ uri: userImg }} resizeMode='cover'
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 50,
                                }}
                            />
                        </View>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>{userName}</Text>
                            {/* {data.LoginStatus == 'Online' &&
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <FontAwesome name='circle-o' size={15} color={COLORS.green} />
                                    <Text style={{
                                        color: COLORS.gray,
                                        fontSize: 13,
                                        paddingLeft: 5
                                    }}>Online</Text>
                                </View>
                            } */}
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => handleMenuToggle()}
                        style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                        <Feather name="more-vertical" size={20} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
                {isMenuVisible && (
                    <View style={{
                        position: 'absolute',
                        top: 60,
                        zIndex: 1,
                        right: 10,
                        backgroundColor: 'white',
                        borderRadius: 4,
                        padding: 5,
                        borderWidth: 1,
                        borderColor: COLORS.light,
                    }}>
                        <TouchableOpacity onPress={() => {
                            setModalType('report');
                            setModalVisible(true);
                        }}
                            style={{
                                paddingVertical: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: COLORS.gray2,
                                paddingHorizontal: 10
                            }}>
                            <Text style={{ fontSize: 12, color: COLORS.black }}>Report User</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => {
                            setModalType('unmatch');
                            setModalVisible(true);
                        }}
                            style={{
                                paddingVertical: 10,
                                borderBottomColor: COLORS.gray2,
                                paddingHorizontal: 10
                            }}
                        >
                            <Text style={{ fontSize: 12, color: COLORS.black }}>Unmatch User</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => {
                            setModalType('Block');
                            setModalVisible(true);
                        }}
                            style={{
                                paddingVertical: 10,
                                backgroundColor: 'red',
                                // borderBottomColor: COLORS.gray2,
                                paddingHorizontal: 10,
                                borderBottomLeftRadius: 3,
                                borderBottomRightRadius: 3
                            }}
                        >
                            <Text style={{ fontSize: 12, color: COLORS.white }}>Block User</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => handleDeleteUser()}
                            style={{
                                paddingVertical: 10,
                            }}
                        >
                            <Text>Delete User</Text>
                        </TouchableOpacity> */}
                    </View>
                )}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    backgroundColor: COLORS.white,
                }}>
                    {CoordinatorBtn.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSlide(index)}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                // width: '50%',
                                borderBottomColor: value == index ? COLORS.main : COLORS.gray2,
                                // borderRadius: 10,
                                height: 46,
                                // backgroundColor: value == index ? COLORS.main : COLORS.light
                            }}
                        >
                            <Text style={{
                                fontFamily: '',
                                color: value == index ? COLORS.main : COLORS.gray2,
                                fontSize: 12
                            }}>{item?.name}</Text>
                        </TouchableOpacity>
                    ))}
                    {/* <TouchableOpacity onPress={value => setShowHide(value)} style={{
                        width: '50%',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.main,
                        alignItems: 'center',
                        marginHorizontal: 5,
                        paddingBottom: 5
                    }}>
                        <Text style={{
                            color: COLORS.main,
                            fontSize: 16,
                        }}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowHide(true)} style={{
                        width: '50%',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.gray2,
                        alignItems: 'center',
                        marginHorizontal: 5,
                        paddingBottom: 5
                    }}>
                        <Text style={{
                            color: COLORS.gray2,
                            fontSize: 16,
                        }}>Date Mode</Text>
                    </TouchableOpacity> */}
                </View>

                {coordinatorBtn == 'Suggestion' ? (
                    <View>
                        {suggestedUser?.length > 0 ?
                            <View>
                                {suggestedUser?.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: windowWidth,
                                            backgroundColor: COLORS.light,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            justifyContent: 'space-between',
                                            marginBottom: 5,
                                        }}>
                                        <View style={{
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}>
                                            <View>
                                                <Image source={{ uri: item?.image1 }} resizeMode='cover' style={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 50,
                                                    borderWidth: 3,
                                                    borderColor: COLORS.main
                                                }} />
                                            </View>
                                            <View style={{
                                                paddingLeft: 10,
                                            }}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                    color: COLORS.black,
                                                    paddingBottom: 5,
                                                }}>
                                                    {item?.Name}
                                                </Text>
                                                <Text style={{
                                                    fontSize: 12,
                                                    paddingBottom: 5,
                                                    color: COLORS.black,
                                                }}>
                                                    {item?.Address ?
                                                        item?.Address.split(', ')[item?.Address.split(', ').length - 2] + ' , ' +
                                                        item?.Address.split(', ')[item?.Address.split(', ').length - 1]
                                                        :
                                                        'address cannot exist'
                                                    }
                                                </Text>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                    <Group width={14} height={14} />
                                                    <Text style={{
                                                        color: COLORS.black,
                                                        marginRight: 5,
                                                        fontSize: 12,
                                                        paddingLeft: 5,
                                                    }}>{item?.match} match</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => loading || item?.liked ? null : onSendLike(item)}
                                                style={{
                                                    padding: 10,
                                                    backgroundColor: COLORS.white,
                                                    borderRadius: 20,
                                                    elevation: 5
                                                }}>
                                                <AntDesign name='heart' size={20} color={item?.liked ? 'red' : COLORS.light} />
                                            </TouchableOpacity>


                                        </View>

                                    </View>

                                ))}
                            </View>
                            :
                            <View style={{
                                paddingHorizontal: 20,
                                height: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: COLORS.gray
                                }}>No relevant suggestions found.</Text>
                            </View>
                        }
                    </View>
                ) : coordinatorBtn == 'Profile' ? (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{
                            marginTop: 10,
                            marginHorizontal: 20,
                            marginBottom: 50,
                        }}>
                            <View>
                                <Image source={{ uri: data?.image1 }} resizeMode='cover' style={{
                                    height: windowHeight / 2.2,
                                    width: '100%',
                                    borderRadius: 10,
                                }} />
                            </View>
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 5,
                                    paddingTop: 10
                                }}>
                                    <Image source={require('../../../assets/dot.png')} resizeMode='contain'
                                        style={{
                                            width: 5,
                                            height: 5,
                                            marginRight: 5
                                        }} />
                                    <View>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: COLORS.black
                                        }}>{data?.Name}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    color: COLORS.black,
                                }}>Dating Coach</Text>
                                <View style={{
                                    padding: 5,
                                    backgroundColor: COLORS.main,
                                    borderRadius: 5,
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}>{data?.Address ?
                                        data?.Address.split(', ')[data?.Address.split(', ').length - 2] + ' , ' +
                                        data?.Address.split(', ')[data?.Address.split(', ').length - 1]
                                        :
                                        'location cannot exist'
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                            }}>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: COLORS.main,
                                    borderRadius: 3,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <AntDesign name='clockcircleo' color={COLORS.white} size={15} />
                                </View>
                                <Text style={{
                                    paddingHorizontal: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>
                                    Available Time :
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: "space-between",
                                width: '100%',
                                // paddingHorizontal: 10,
                                marginTop: 10,
                            }}>
                                <View
                                    style={{
                                        // marginTop: 20,
                                        width: '49%',
                                    }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}>Monday</Text>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        elevation: 2,
                                        borderRadius: 5,
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: COLORS.gray,
                                            paddingVertical: 10,
                                        }}>
                                            {data?.MondayOpen && data?.MondayOpen}
                                            {data?.MondayClose && ' To ' + data?.MondayClose}
                                            {/* {data?.MondayOpen + ' To ' + data?.MondayClose} */}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        // marginTop: 20,
                                        width: '49%',
                                    }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}>Tuesday</Text>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        elevation: 2,
                                        borderRadius: 5,
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: COLORS.gray,
                                            paddingVertical: 10,
                                        }}>
                                            {data?.TuesdayOpen && data?.TuesdayOpen}
                                            {data?.TuesdayClose && ' To ' + data?.TuesdayClose}
                                            {/* {data?.TuesdayOpen + ' To ' + data?.TuesdayClose} */}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                        width: '49%',
                                    }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}>Wednesday</Text>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        elevation: 2,
                                        borderRadius: 5,
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: COLORS.gray,
                                            paddingVertical: 10,
                                        }}>
                                            {data?.WednesdayOpen && data?.WednesdayOpen}
                                            {data?.WednesdayClose && ' To ' + data?.WednesdayClose}
                                            {/* {data?.WednesdayOpen + ' To ' + data?.WednesdayClose} */}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                        width: '49%',
                                    }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}>Thursday</Text>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        elevation: 2,
                                        borderRadius: 5,
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: COLORS.gray,
                                            paddingVertical: 10,
                                        }}>
                                            {data?.ThursdayOpen && data?.ThursdayOpen}
                                            {data?.ThursdayClose && ' To ' + data?.ThursdayClose}
                                            {/* {data?.ThursdayOpen + ' To ' + data?.ThursdayClose} */}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                        width: '49%',
                                    }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}>Friday</Text>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        elevation: 2,
                                        borderRadius: 5,
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: COLORS.gray,
                                            paddingVertical: 10,
                                        }}>
                                            {/* {data?.FridayOpen + ' To ' + data?.FridayClose} */}
                                            {data?.FridayOpen && data?.FridayOpen}
                                            {data?.FridayClose && ' To ' + data?.FridayClose}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                        width: '49%',
                                    }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}>Saturday</Text>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        elevation: 2,
                                        borderRadius: 5,
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: COLORS.gray,
                                            paddingVertical: 10,
                                        }}>
                                            {data?.SaturdayOpen && data?.SaturdayOpen}
                                            {data?.SaturdayClose && ' To ' + data?.SaturdayClose}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                        width: '49%',
                                    }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}>Sunday</Text>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        elevation: 2,
                                        borderRadius: 5,
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: COLORS.gray,
                                            paddingVertical: 10,
                                        }}>
                                            {data?.SundayOpen && data?.SundayOpen}
                                            {data?.SundayClose && ' To ' + data?.SundayClose}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                marginVertical: 30,
                                height: 50,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                elevation: 8,
                                justifyContent: 'space-between',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        // flex: 1,
                                        paddingHorizontal: 10,
                                        borderRightWidth: 1,
                                        borderRightColor: COLORS.green,
                                        alignItems: 'center'
                                    }}>
                                        <SVGNotify width={20} height={20} />
                                    </View>
                                    <View style={{
                                        // flex: 3,
                                        paddingHorizontal: 10,
                                    }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: COLORS.black,
                                            fontWeight: 'bold'
                                        }}>
                                            Concierge Service
                                        </Text>
                                    </View>
                                </View>
                                <View style={{
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black,
                                        borderBottomWidth: 1,
                                        borderBottomColor: COLORS.black
                                    }}>Donation Based</Text>
                                </View>
                            </View>
                            <View style={{
                                alignSelf: 'center'
                            }}>
                                <CustomeButton
                                    onpress={() => loading ? null : OnRateUser()}
                                    title={loading ? 'Please wait...' : `Rate ${data?.Name.split(' ')[0]}`}
                                    width={windowWidth / 1.1}
                                />
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                    <View style={{
                        flex: 1,
                        position: 'relative',
                        flexDirection: 'row',
                        backgroundColor: COLORS.white,
                        marginBottom: 20
                    }}>
                        <GiftedChat
                            messages={messages}
                            onSend={messages => onSend(messages)}
                            user={{
                                _id: Currentuser?.uid,
                                avatar: Currentuser?.image1,
                            }}
                            renderBubble={renderBubble}
                            // alwaysShowSend
                            renderInputToolbar={props => customtInputToolbar(props)}
                            renderSend={props => renderSend(props)}
                            // renderInputToolbar={renderInputToolbar}
                            scrollToBottomComponent={scrollToBottomComponent}
                            renderLoading={renderLoading}
                            renderCustomView={props => (
                                renderCustomePurposal(props)
                            )}
                        // renderActions={() => (
                        //     <View style={{ height: '100%', justifyContent: 'center', left: 5 }}>
                        //         <Icon name="attachment" onPress={() => myAttachmentFunction()} style={{ color: COLORS.gray }}
                        //             size={30} />
                        //             {/* <Text>tesst</Text> */}
                        //     </View>
                        // )}
                        />
                    </View>
                )}
                {/* <DateTimePickerModal
                    isVisible={DateVisibility}
                    mode="date"
                    // display='spinner'
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                /> */}
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                <DateTimePickerModal
                    isVisible={TimeVisibility}
                    mode="time"
                    // display='spinner'
                    onConfirm={handleConfirmTime}
                    onCancel={hideTimePicker}
                />



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(!modal);
                    }}
                >
                    {/* locationpopup  */}
                    <Modal
                        animationType='fade'
                        transparent={false}
                        visible={locationModalVisible}>
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
                                    marginTop: 20
                                }}>
                                    <GooglePlacesAutocomplete
                                        placeholder="Type a place"
                                        query={{
                                            key: api,
                                            // language: 'en',
                                            // components: "country:pk",
                                            types: "establishment",
                                            radius: 30000,
                                            location: `${region?.latitude}, ${region?.longitude}`
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
                                            console.log('======>data', data, '====>details', details)
                                            setRegion({
                                                latitude: details?.geometry?.location.lat,
                                                longitude: details?.geometry?.location.lng,
                                            })
                                            setLocation(data?.description)
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
                                                flex: 0, position: 'absolute', width: "100%", zIndex: 1,
                                                // marginHorizontal: 20,
                                                // marginTop: 10,
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
                                            latitude: region?.latitude,
                                            longitude: region?.longitude,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                    >
                                        {/* <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} /> */}
                                        <Marker
                                            coordinate={{
                                                latitude: region?.latitude,
                                                longitude: region?.longitude,
                                            }}
                                            // image={require('../../../assets/map.png')}
                                            draggable={true}
                                            onDragEnd={(e) => {
                                                console.log('Drag end', e?.nativeEvent?.coordinate)
                                                setRegion({
                                                    latitude: e?.nativeEvent?.coordinate?.latitude,
                                                    longitude: e?.nativeEvent?.coordinate?.longitude,
                                                })
                                            }}
                                            title={'Test Marker'}
                                            description={'This is description of marker'} >
                                            <Image
                                                source={require('../../../assets/map.png')}
                                                style={{ width: 26, height: 28 }}
                                                resizeMode="contain"
                                            />
                                        </Marker>
                                        <Circle center={region} radius={1000} />
                                        {/* <MapViewDirections
                                            origin={pin}
                                            destination={pin}
                                            apikey={GoogleMapKey.GOOGLE_MAP_KEY}
                                            strokeColor={COLORS.black}
                                            strokeWidth={3}
                                            optimizeWayPoints={true}
                                            mode='DRIVING'
                                            onReady={result => {
                                                console.log('===>', result);
                                                // setResult(result);
                                                // calculateDistance(result);
                                                // mapRef.current.fitToCoordinates(result.coordinates, {
                                                //     edgePadding: {
                                                //         right: 30,
                                                //         bottom: 50,
                                                //         left: 30,
                                                //         top: 50
                                                //     }
                                                // })
                                            }}
                                        /> */}
                                    </MapView>
                                    <View
                                        style={{
                                            position: 'absolute', //use absolute position to show button on top of the map
                                            top: '70%', //for center align
                                            alignSelf: 'center' //for align to right
                                        }}
                                    >
                                        <CustomeButton title={'Add Location'} onpress={() => OnSetLocation()} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>



                    {modal && deleteModal == "DeleteModal" ?

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 22,
                        }}>
                            <View style={{
                                margin: 20,
                                backgroundColor: 'white',
                                borderRadius: 20,
                                padding: 35,
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                width: '80%',
                                height: '30%',
                                justifyContent: 'center'
                            }}>
                                {!loading == true ?
                                    <>
                                        <Text style={{
                                            marginBottom: 10,
                                            color: COLORS.black,
                                            fontWeight: 'bold'
                                            // textAlign: 'center',
                                        }}>Cancle Date!</Text>
                                        <Text style={{
                                            marginBottom: 10,

                                        }}>
                                            If you cancel now, you will get flake on your profile. You can remove flakes for $10 pet flake. On your profile
                                        </Text>
                                        <View style={{
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                            flexDirection: 'row',
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => { setModal(false), setDeleteModal('') }}
                                                style={{
                                                    width: '50%',
                                                    borderWidth: 1,
                                                    borderColor: COLORS.black,
                                                    borderRadius: 10,
                                                    marginHorizontal: 5,
                                                    paddingVertical: 10,
                                                    alignItems: 'center',
                                                }}>
                                                <Text style={{
                                                    color: COLORS.black
                                                }}>
                                                    Back
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => CancleDate()}
                                                style={{
                                                    width: '50%',
                                                    borderWidth: 1,
                                                    borderColor: COLORS.black,
                                                    borderRadius: 10,
                                                    marginHorizontal: 5,
                                                    paddingVertical: 10,
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.black
                                                }}>
                                                <Text style={{
                                                    color: COLORS.white
                                                }}>
                                                    Cancle Date
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                    :
                                    <View style={{
                                    }}>
                                        <ActivityIndicator size="small" color={COLORS.main} animating={loading} />
                                    </View>
                                }

                            </View>
                        </View>
                        :
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            marginTop: 22,
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            elevation: 5,
                            height: windowHeight / 1.1,
                            backgroundColor: COLORS.white,
                        }}>
                            <View>
                                <View style={{
                                    height: windowHeight / 12,
                                    // backgroundColor: COLORS.main,
                                    // paddingHorizontal: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Entypo name='cross' size={25} color={COLORS.black} onPress={() => setModal(false)} />
                                    </View>
                                    <View style={{
                                        flex: 2,
                                        alignItems: 'center',
                                        // backgroundColor:COLORS.main
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: COLORS.black
                                        }}>
                                            Create a Proposal
                                        </Text>
                                    </View>
                                    <View style={{
                                        flex: 1
                                    }}>
                                        {/* <Entypo name='cross' size={25} color={COLORS.black} onPress={() => setModal(false)} /> */}
                                    </View>
                                </View>
                                <View style={{
                                    alignItems: 'center'
                                }}>
                                    <View style={{ width: '100%' }}>
                                        <Text style={{ color: COLORS.black, paddingBottom: 5 }}>Date</Text>
                                        <View style={{
                                            height: windowHeight / 15,
                                            backgroundColor: COLORS.white,
                                            borderRadius: 10,
                                            elevation: 4,
                                            paddingRight: 10,
                                            marginLeft: 2,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <TextInput
                                                value={dates}
                                                style={{
                                                    padding: 0,
                                                    backgroundColor: COLORS.transparent,
                                                }}
                                                placeholder={'Select Date'}
                                                placeholderTextColor={COLORS.gray}
                                                onChangeText={setDates}
                                                selectionColor={COLORS.black}
                                                underlineColor={COLORS.white}
                                                activeUnderlineColor={COLORS.white}
                                                onPressIn={showDatePicker}
                                            />
                                            <Image source={require('../../../assets/selectdate.png')} resizeMode='contain' style={{
                                                // tintColor: COLORS.black,
                                                width: 25,
                                                height: 25,
                                            }} />
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    alignItems: 'center'
                                }}>
                                    <View style={{ marginTop: 10, width: '100%' }}>
                                        <Text style={{ color: COLORS.black, paddingBottom: 5 }}>Time </Text>
                                        <View style={{
                                            height: windowHeight / 15,
                                            backgroundColor: COLORS.white,
                                            borderRadius: 10,
                                            elevation: 4,
                                            paddingRight: 10,
                                            marginLeft: 2,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <TextInput
                                                style={{
                                                    padding: 0,
                                                    backgroundColor: COLORS.transparent,
                                                }}
                                                placeholder={'Select Time'}
                                                value={time}
                                                placeholderTextColor={COLORS.gray}
                                                // error={dateOfBirthError}
                                                onChangeText={setTime}
                                                selectionColor={COLORS.black}
                                                underlineColor={COLORS.white}
                                                // activeOutlineColor={COLORS.fontColor}
                                                activeUnderlineColor={COLORS.white}
                                                // onFocus={() => { setDateOfBirthError(false) }}
                                                onPressIn={showTimeModal}
                                            />
                                            {/* <Image source={require('../../assets/selectdate.png')} resizeMode='contain' style={{
                                            // tintColor: COLORS.black,
                                            width: 25,
                                            height: 25,
                                        }}/> */}
                                        </View>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ marginTop: 10, width: '100%' }}>
                                        <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Location </Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingRight: 10,
                                            height: windowHeight / 15,
                                            // width: 340,
                                            backgroundColor: COLORS.white,
                                            borderRadius: 10,
                                            elevation: 4
                                        }}>
                                            <TextInput
                                                value={location}
                                                placeholder={'Add location of event'}
                                                onChangeText={location => setLocation(location)
                                                }
                                                placeholderTextColor={COLORS.gray}
                                                selectionColor={COLORS.black}
                                                underlineColor={COLORS.white}
                                                activeUnderlineColor={COLORS.white}
                                                style={{
                                                    paddingLeft: 0,
                                                    backgroundColor: COLORS.transparent,
                                                    width: '85%'
                                                }}
                                                onPressIn={OpenLocationModalView}
                                                editable={true}
                                            />
                                            <Image source={require('../../../assets/selectdate.png')} resizeMode='contain' style={{
                                                width: 25,
                                                height: 25,
                                            }} />
                                        </View>
                                    </View>
                                </View>

                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ marginTop: 10, width: '100%' }}>
                                        <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Description </Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            // paddingRight: 10,
                                            // height: 50,
                                            // width: 340,
                                            backgroundColor: COLORS.white,
                                            borderRadius: 10,
                                            elevation: 4
                                        }}>
                                            <TextInput
                                                value={description}
                                                placeholder={'Enter more details'}
                                                onChangeText={description => setDescription(description)
                                                }
                                                placeholderTextColor={COLORS.gray}
                                                selectionColor={COLORS.black}
                                                underlineColor={COLORS.white}
                                                activeUnderlineColor={COLORS.white}
                                                style={{
                                                    padding: 0,
                                                    backgroundColor: COLORS.transparent,
                                                }}
                                                multiline
                                                numberOfLines={3}
                                                editable={true}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    paddingTop: 20,
                                    flexDirection: 'row',
                                }}>
                                    <View style={{ marginHorizontal: 5 }}>
                                        <CustomeButton width={windowWidth / 3} onpress={() => setModal(false)}
                                            title={'Cancle'} bcolor={COLORS.light} />
                                    </View>
                                    <View style={{ marginHorizontal: 5 }}>
                                        <CustomeButton width={windowWidth / 2} onpress={() => onSendPorposal()}
                                            title={'Send Proposal'} />
                                    </View>

                                </View>
                            </View>
                        </View>
                    }
                </Modal>
            </View>




            <Modal
                animationType='fade'
                transparent={true}
                visible={moreOptionsPoppup}>
                <View>
                    {actionTriggered == "ACTION_1" ?
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.title}>Delete Conversation</Text>
                                <Text style={styles.description}>Are you sure you want to delete this conversation permanently?</Text>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity onPress={() => { setMoreOptionsPoppup(false), setActionTriggered(null), setIsMenuVisible(false) }} style={[styles.button, styles.cancelButton]}>
                                        <Text style={{
                                            color: COLORS.white,
                                        }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => OnDeleteUser()} style={[styles.button, styles.confirmButton]}>
                                        <Text style={{
                                            color: COLORS.white,
                                        }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.title}>Delete User</Text>
                                <Text style={styles.description}>Are you sure you want to delete this users permanently from your matches?</Text>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity onPress={() => { setMoreOptionsPoppup(false), setActionTriggered(null), setIsMenuVisible(false) }} style={[styles.button, styles.cancelButton]}>
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => OnDeleteUser()} style={[styles.button, styles.confirmButton]}>
                                        <Text style={{
                                            color: COLORS.white,
                                        }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            </Modal>


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
                    backgroundColor: COLORS.white,
                }}>
                    <ScrollView vertical showsVerticalScrollIndicator={false}>
                        {showFilterType == 'ACTION_2' ?
                            <RateMediatorScreen
                                data={ReviewCoach}
                                setShowFilter={setShowFilter}
                                setShowFilterType={setShowFilterType}
                                defaultRating={rating}
                                maxRating={maxRating}
                                datingCoachRating={totalreviews}
                                newRating={newRating}
                                setNewRating={setNewRating}
                                comments={comments}
                                setComments={setComments}
                                onpress={SubmitReview}
                                loading={loading}
                            />
                            : null}
                    </ScrollView>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalpoppup}
                onRequestClose={() => {
                    setModalpoppup(!modalpoppup);
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
                        <Image source={require('../../../assets/flakeremove.png')} resizeMode='contain' style={{
                            width: 50,
                            height: 50
                        }} />

                        <Text style={{
                            fontSize: 14,
                            color: COLORS.black,
                            fontWeight: 'bold'
                        }}>{showModalContent?.title}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: COLORS.gray,
                            textAlign: 'center'
                        }}>{showModalContent?.descrition}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setModalpoppup(false),
                                    refreshform()
                            }}
                            style={{
                                width: '90%',
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 10,
                                // height:30,
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                backgroundColor: COLORS.green
                            }}>
                            <Text style={{
                                color: COLORS.white,
                                fontSize: 12,
                            }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            <Modal
                transparent
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 10,
                        width: '80%',

                    }}>
                        <Text style={{
                            fontSize: 16,
                            // fontWeight: 'bold',
                            marginBottom: 10,
                            color: COLORS.black
                        }}>{`Please provide a reason for ${modalType}`}</Text>
                        {modalType == 'unmatch' ?
                            <>
                                {reduxChatUser?.length > 9 ?
                                    <>
                                        <Text style={{ fontSize: 14, color: COLORS.black }}>Pros :</Text>
                                        <TextInput
                                            multiline={true} // Set to true for multiline input
                                            numberOfLines={4}
                                            mode='outlined'
                                            placeholder={'Enter pros...'}
                                            value={reason}
                                            onChangeText={text => setReason(text)}
                                            // underlineColor={COLORS.transparent}
                                            outlineColor={COLORS.gray}
                                            activeOutlineColor={COLORS.main}
                                            style={{
                                                marginBottom: 10,
                                                fontSize: 12,
                                                color: COLORS.black,
                                            }}
                                        // multiline={true}
                                        />
                                    </>
                                    :
                                    <View style={{
                                        paddingHorizontal: 0,
                                        paddingVertical: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: COLORS.gray
                                        }}>Max 10 matches you have to unmatch to get more matches</Text>
                                    </View>
                                }</>

                            :
                            <TextInput
                                style={{
                                    // height: 40,
                                    // borderColor: 'gray',
                                    // borderWidth: 1,
                                    marginBottom: 10,
                                    paddingHorizontal: 0,
                                    // padding: 0,
                                    backgroundColor: COLORS.transparent,
                                    fontSize: 12,
                                    color: COLORS.black,
                                    width: '100%',
                                    marginBottom: 20,
                                }}
                                mode='outlined'
                                placeholder={'Enter reason...'}
                                value={reason}
                                onChangeText={text => setReason(text)}
                                // underlineColor={COLORS.transparent}
                                outlineColor={COLORS.gray}
                                activeOutlineColor={COLORS.main}
                            // multiline={true}
                            // style={{
                            //     padding: 0,
                            //     backgroundColor: COLORS.transparent,
                            //     fontSize: 12,
                            //     color: COLORS.black,
                            //     width: '100%',
                            //     marginBottom: 20,
                            // }}

                            />
                        }
                        {reduxChatUser?.length < 10 && modalType == 'unmatch' ?
                            <CustomeButton title={'Done'} width={'100%'} onpress={() => setModalVisible(false)} />
                            :
                            <View style={{
                                flexDirection: 'row',
                                // flexWrap:'wrap',
                                justifyContent: 'space-around',
                                width: '100%',
                                // backgroundColor:'red',
                            }}>
                                <TouchableOpacity
                                    onPress={() => loading ? null : handleSubmission(modalType)}
                                    style={{
                                        width: '45%',
                                        height: 50,
                                        backgroundColor: COLORS.main,
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        fontSize: 14,
                                        borderRadius: 10,
                                        color: COLORS.black,
                                    }}>{loading ? <ActivityIndicator size={'small'} color={COLORS.black} animating={loading} /> : 'Submit'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={{
                                        width: '45%',
                                        backgroundColor: COLORS.gray2,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        height: 50
                                    }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        fontSize: 14,
                                        color: COLORS.black,
                                    }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
            </Modal>
            <Loader uploading={uploading ? uploading : loading} modal={uploading ? uploading : loading} />
        </SafeAreaView>

    )
}

export default ChatingScreen

const styles = StyleSheet.create({
    container: {
        // alignItems:'center'
        backgroundColor: COLORS.white,
        flex: 1,
    },
    container2: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    contentContainer: {
        flex: 1,
        height: 400,
    },
    footer: {
        height: 120,
        width: '100%'
    },
    inputType: {
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderColor: COLORS.gray2,
        height: 40
    },
    map: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: windowHeight,
        width: windowWidth,
        borderRadius: 15,
    },
    containerStyle: {
        backgroundColor: 'white',
        zIndex: 1
    },

    textInputStyle: {
        zIndex: 1,
        width: '100%',
        padding: 5,
        color: COLORS.black,
        fontSize: 14,
        // backgroundColor: 'white',
        borderColor: 'grey',
        borderBottomWidth: 1.2,
        marginVertical: 5,
        // paddingHorizontal: 20,
    },

    modalContainer: {
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray,
        opacity: .9
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.black
    },
    description: {
        marginBottom: 20,
        color: COLORS.gray
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        width: '45%',
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: COLORS.gray2,
        alignItems: 'center',
    },
    confirmButton: {
        width: '45%',
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: 'red',
        alignItems: 'center',
    },

})
