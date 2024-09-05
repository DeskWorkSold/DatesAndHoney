import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, ActivityIndicator, Dimensions, Modal, ToastAndroid, ScrollView, Pressable } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabOne from '../components/HeaderTabOne';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, PorposalCategory, selectPorposalCategory, selectStatus, selectUser, status } from '../../../redux/reducers/Reducers';
import Notifictaions from '../components/Notifictaions';
import { IconButton, PaperProvider, Menu, TextInput, Divider, Button } from 'react-native-paper';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomeButton from '../components/CustomeButton';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRef } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { set } from 'immer/dist/internal';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GoogleMapKey from '../../consts/GoogleMapKey';
import axios from 'axios';
import { selectChatuser } from '../../redux/reducers/Reducers';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CoordinatorBtn = [
    {
        id: '1',
        name: 'Chat',
    },
    {
        id: '2',
        name: 'Date Mode',
    }
];


const ChatingScreen = ({ navigation, route }) => {
    const { data } = route?.params;
    const userName = data?.Name;
    const userImg = data?.image1;
    const uid = data?.uid;
    const [messages, setMessages] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    // console.log('=====>',imageUrl);
    const [category, setCategory] = useState(null);

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
    const [acceptedProposal, setAcceptedProposal] = useState();
    const [processDate, setProcessDate] = useState();
    const [yourArrival, setYourArrival] = useState();
    const [yourArrivalStatus, setYourArrivalStatus] = useState(true);
    const [nextTime, setNextTime] = useState();
    const [CurrentTime, setCurrentTime] = useState();
    const [SecondUserProposal, setSecondUserProposal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [coordinatorBtn, setCoordinatorBtn] = useState('Chat');
    const [value, setValueIndex] = useState(0);
    const [visible, setVisible] = useState(false);

    const api = GoogleMapKey?.GOOGLE_MAP_KEY
    const dispatch = useDispatch()

    // const cat = useSelector(selectPorposalCategory)
    // console.log('=====>', api);

    // console.log('userName: ', userName);
    // console.log('userName: ', userImg);

    const [showhide, setShowHide] = useState(false)
    const [sendchat, setSendChat] = useState('')
    const [searchTextRef, setSearchTextRef] = useState('')
    const docid = uid > Currentuser?.uid ? Currentuser?.uid + "-" + uid : uid + "-" + Currentuser?.uid;

    const handleSlide = (index) => {
        // console.log('slide');
        setValueIndex(index)
        const viewPage = CoordinatorBtn[index]?.name
        setCoordinatorBtn(viewPage);
    };

    const SwitchMode = (value) => (
        setShowHide(value)
    );

    const ReadAllMessages = (props) => {
        // console.log(props);
        // return
        if (props?.length > 0) {
            // console.log('asdfdfas  ',props);
            props?.map((j, i) => {
                if (j?.sentBy == uid && j?.read == false) {
                    // console.log(j?._id);
                    // return
                    const messageRef = firestore().collection('chatrooms')
                        .doc(docid)
                        .collection('messages')
                        .doc(j?._id)
                    // return
                    messageRef.update({
                        'read': true,
                    })
                }
            })
        }
    }


    useEffect(() => {
        // getAllMessages()
        const messageRef = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")
        const unsubscribe = messageRef.onSnapshot(querySnap => {
            const allmsg = querySnap.docs.map(docSanp => {
                // console.log('date: ', docSanp.data());
                const data = docSanp.data();
                if (data.createdAt) {
                    return {
                        ...docSanp.data(),
                        createdAt: docSanp.data().createdAt.toDate(),
                    }
                } else {
                    return {
                        ...docSanp.data(),
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        // user: {
                        //     avatar: userImg,
                        // },
                    }
                }
            })
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
        // DatesServay();

        ReadAllMessages(messages)
    }, [messages])

    const YourArrival = async () => {
        const d = new Date();
        const hour = 1000 * 60 * 60;
        const ctime = Math.round(d.getTime() / hour);
        const ptime = Math.round(d.getTime() / hour) + 3;
        // console.log(Currentuser?.uid);
        await
            firestore().collection('Proposals')
                .doc(Currentuser?.uid)
                .onSnapshot((querySnap) => {
                    // console.log(docSnapshot.data());
                    const Proposals = [];
                    const yourArrivald = []
                    if (querySnap?.data()) {
                        querySnap?.data()?.Proposals?.map((item, i) => {
                            // console.log('===>',item);
                            // console.log(uid, Currentuser.uid);
                            if (item?.docid == docid) {
                                const updatedata = {
                                    ...item,
                                    index: i,
                                }
                                Proposals.push(updatedata);
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
                                        index: i,
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
        const msg = messages[0]
        const mymsg = {
            ...msg,
            sentBy: Currentuser?.uid,
            sentTo: uid,
            createdAt: new Date(),
            image: null,
            sent: true,
            category: 'text',
            read: false,
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        // const docid = uid > Currentuser?.uid ? Currentuser?.uid + "-" + uid : uid + "-" + Currentuser?.uid
        firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .doc(mymsg?._id)
            .set({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
            .then(() => {
                setImageUrl(null);
                setImageData(null);
                setCategory(null);
                SendPushNotify(uid, Currentuser, mymsg?.text)
                console.log('message send');
                // dispatch(PorposalCategory(null))
            })

    }, [])
    const SendPushNotify = (uid, Currentuser, mymsg) => {
        // console.log(uid);
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
                            title: `New Message`,
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
                // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

                setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
                // const docid = uid > Currentuser?.uid ? Currentuser?.uid + "-" + uid : uid + "-" + Currentuser?.uid
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
                        SendPushNotify(uid, Currentuser, mymsg?.ProposalAddress)

                        // dispatch(PorposalCategory(null))
                    })
            }
            setModal(false)
        }
    }

    // useEffect(() => {

    // }, [category])

    const YouArrivedTwo = (item, index) => {
        // console.log('testdfvsd' , item);
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
                        // setTimeout(() => {
                        //     navigation.navigate('DateServayScreen', { ProposalId: item?._id });
                        //     console.log('DateServayScreen');
                        // }, 3000
                        //     //   1000 * 60 * 60
                        // );
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


    function youArriveToArray(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                YourArrival: true
            };
        } else {
            array.push(object);
        }
        return array;
    }
    function youArriveToArrayTwo(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                PartnerArrival: true,
            };
        } else {
            array.push(object);
        }
        return array;
    }

    function youArriveToPartnerArrival(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                PartnerArrival: true,
                YourArrival: true,
                CancleDate: false,
                active: 0,

            };
        } else {
            array.push(object);
        }
        return array;
    }

    function youArriveToPartnerArrivalTwo(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                PartnerArrival: true,
                YourArrival: true,
                CancleDate: false,
                active: 0,
            };
        } else {
            array.push(object);
        }
        return array;
    }

    const YouArrived = (item, index) => {
        // console.log(item);
        // return
        acceptedProposal?.map((j, i) => {
            if (j?._id == item?._id && j?.PartnerArrival == true) {
                // console.log(j);
                const mainuser = youArriveToPartnerArrival(acceptedProposal, item);
                const chatUser = youArriveToPartnerArrivalTwo(SecondUserProposal, item);
                if (!mainuser?.length == 0 && !chatUser?.length == 0) {
                    try {
                        firestore()
                            .collection('Proposals')
                            .doc(Currentuser?.uid)
                            .set({
                                Proposals: mainuser,
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


            }
            else if (j?._id == item?._id) {
                console.log('here');
                const mainuser = youArriveToArray(acceptedProposal, item);
                const chatUser = youArriveToArrayTwo(SecondUserProposal, item);
                if (!mainuser?.length == 0 && !chatUser?.length == 0) {
                    try {
                        firestore()
                            .collection('Proposals')
                            .doc(Currentuser?.uid)
                            .set({
                                Proposals: mainuser,
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

            }
        })
        return
        const mainuser = youArriveToArray(acceptedProposal, item);
        // acceptedProposal.map(a => {
        //     if (a?._id != item?._id) {
        //         test.push(a);
        //     }
        //     else {
        //         const data = acceptedProposal[index];
        //         const updateAccepted = {
        //             ...data,
        //             YourArrival: true
        //         }
        //         test.push(updateAccepted);
        //     }
        // })

        // for chatuserproposal 
        // SecondUserProposal.map(a => {
        //     if (a?._id != item?._id) {
        //         chatUser.push(a);
        //     }
        //     else {
        //         const data2 = yourArrival[index];
        //         const ChatuserUpdate = {
        //             ...data2,
        //             PartnerArrival: true,
        //         }
        //         chatUser?.push(ChatuserUpdate);
        //     }
        // })

        if (!mainuser?.length == 0 && !chatUser?.length == 0) {
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

    function testToArray(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                YourArrival: false,
                CancleDate: true,
                CancleDateType: 'Cancle',
                active: 0,
            };
        } else {
            array.push(object);
        }
        return array;
    }
    function chatUserToArrayTwo(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                PartnerArrival: false,
                CancleDate: true,
                CancleDateType: 'Cancle',
                active: 0,
            };
        } else {
            array.push(object);
        }
        return array;
    }

    function YouNotArrivedOne(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                PartnerArrival: true,
                YourArrival: false,
                CancleDate: true,
                CancleDateType: 'Cancle',
                active: 0,
            };
        } else {
            array.push(object);
        }
        return array;
    }

    function YouNotArrivedTwo(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                PartnerArrival: false,
                YourArrival: true,
                CancleDate: true,
                CancleDateType: 'Cancle',
                active: 0,
            };
        } else {
            array.push(object);
        }
        return array;
    }

    const YouNotArrived = (item, index) => {
        // console.log('asljdhajcn',  item._id);
        // return;

        acceptedProposal?.map((j, i) => {
            if (j?._id == item?._id && j?.PartnerArrival == true) {
                // console.log(j);
                const firstuser = YouNotArrivedOne(acceptedProposal, item);
                const secUser = YouNotArrivedTwo(SecondUserProposal, item);
                if (!firstuser?.length == 0 && !secUser?.length == 0) {
                    // console.log(test);
                    // console.log(chatUser);
                    // console.log(SecondUserProposal);
                    // return
                    try {
                        firestore()
                            .collection('Proposals')
                            .doc(Currentuser?.uid)
                            .set({
                                Proposals: firstuser,
                            }, { merge: true })
                            .then(() => {
                                console.log('Proposal Updatedss!');
                                // console.log(item);
                            });
                        firestore()
                            .collection('Proposals')
                            .doc(uid)
                            .set({
                                Proposals: secUser,
                            }, { merge: true })
                            .then(() => {
                                console.log('chat user Proposal Updated!');
                                // console.log(item);
                            });

                        const userRef = firestore().collection('Users')
                            .doc(Currentuser?.uid)
                        userRef.update({
                            'userDetails.Flake': firestore.FieldValue.increment(1),
                        }).then(() => {
                            console.log('Flake Added!');
                            // console.log(item);
                        });
                    }
                    catch (e) {
                        console.log('Error', e);
                    }
                }
            }
            else if (j?._id == item?._id) {
                console.log('here');
                const test = testToArray(acceptedProposal, item);
                const chatUser = chatUserToArrayTwo(SecondUserProposal, item);
                if (!test?.length == 0 && !chatUser?.length == 0) {
                    // console.log(test);
                    // console.log(chatUser);
                    // console.log(SecondUserProposal);
                    // return
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

                        const userRef = firestore().collection('Users')
                            .doc(Currentuser?.uid)
                        userRef.update({
                            'userDetails.Flake': firestore.FieldValue.increment(1),
                        }).then(() => {
                            console.log('Flake Added!');
                            // console.log(item);
                        });
                    }
                    catch (e) {
                        console.log('Error', e);
                    }
                }

            }
        })
        return





        if (!test?.length == 0 && !chatUser?.length == 0) {
            // console.log(test);
            // console.log(chatUser);
            // console.log(SecondUserProposal);
            // return
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

                const userRef = firestore().collection('Users')
                    .doc(Currentuser?.uid)
                userRef.update({
                    'userDetails.Flake': firestore.FieldValue.increment(1),
                }).then(() => {
                    console.log('Flake Added!');
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

    const testOnes = (array, object) => {
        // console.log(array, object);
        // return
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                PartnerArrival: false,
                CancleDate: true,
                CancleDateType: 'Cancle',
                active: 0,
            };

            console.log('acas', array);
        } else {
            array.push(object);
        }
        return array;
    }

    function chatUserOne(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                YourArrival: false,
                PartnerArrival: true,
                CancleDate: true,
                active: 0,
                CancleDateType: 'Cancle',
            };
        } else {
            array.push(object);
        }
        return array;
    }

    const PNoArrived = (item, index) => {
        // console.log('hello' , acceptedProposal);
        const test = testOnes(acceptedProposal, item);
        const chatUser = chatUserOne(SecondUserProposal, item);


        const d = new Date();
        const hour = 1000 * 60 * 60;
        const ctime = Math?.round(d.getTime() / hour);
        const ntime = Math?.round(d.getTime() / hour) + 1;

        var date = item?.ProposalTempDate;
        const Proposaltime = Math?.round(date?.toDate()?.getTime() / hour);
        const NProposaltime = Math?.round(date?.toDate()?.getTime() / hour) - 1;
        // console.log(ntime, Proposaltime);

        // acceptedProposal.map(a => {
        //     if (a?._id != item?._id) {
        //         test?.push(a);
        //     }
        //     else {
        //         const data = yourArrival[index];
        //         const updateAccepted = {
        //             ...data,
        //             YourArrival: true,
        //             CancleDate: true,
        //         }
        //         test?.push(updateAccepted);
        //     }
        // })

        // for chatuserproposal 
        // SecondUserProposal.map(a => {
        //     if (a?._id != item?._id) {
        //         chatUser.push(a);
        //     }
        //     else {
        //         const data2 = yourArrival[index];
        //         const ChatuserUpdate = {
        //             ...data2,
        //             PartnerArrival: true,
        //             YourArrival: false,
        //             CancleDate: true,
        //         }
        //         chatUser?.push(ChatuserUpdate);
        //     }
        // })

        if (ctime >= NProposaltime) {
            // console.log('test');
            // return
            if (!test?.length == 0 && !chatUser?.length == 0) {
                // console.log(test);
                // console.log(chatUser);
                // return
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

    function testOne(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                YourArrival: true,
                PartnerArrival: true,
                CancleDate: false,
                active: 0,
            };
        } else {
            array.push(object);
        }
        return array;
    }
    function testTwo(array, object) {
        const index = array.findIndex(item => item._id === object._id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = {
                ...object,
                PartnerArrival: true,
                YourArrival: true,
                CancleDate: false,
                active: 0,
            };
        } else {
            array.push(object);
        }
        return array;
    }

    const PArrived = (item, index) => {
        // console.log('parrive');
        // return;
        const d = new Date();
        const hour = 1000 * 60 * 60;
        const ctime = Math.round(d.getTime() / hour);
        const ntime = Math.round(d.getTime() / hour) + 1;

        var date = item?.ProposalTempDate;
        const Proposaltime = Math?.round(date?.toDate()?.getTime() / hour);
        const NProposaltime = Math?.round(date?.toDate()?.getTime() / hour) - 1;
        // console.log(ntime, Proposaltime);

        const test = testOne(acceptedProposal, item);
        // acceptedProposal.map(a => {
        //     if (a?._id != item?._id) {
        //         test.push(a);
        //     }
        //     else {
        //         const data = yourArrival[index];
        //         const updateAccepted = {
        //             ...data,
        //             PartnerArrival: true,
        //             CancleDate: false,
        //             active: 0,
        //         }
        //         test.push(updateAccepted);
        //     }
        // })

        // for chatuserproposal 
        const chatUser = testTwo(SecondUserProposal, item);
        // SecondUserProposal.map(a => {
        //     if (a?._id != item?._id) {
        //         chatUser?.push(a);
        //     }
        //     else {
        //         const data2 = yourArrival[index];
        //         const ChatuserUpdate = {
        //             ...data2,
        //             PartnerArrival: true,
        //             YourArrival: true,
        //             CancleDate: false,
        //             active: 0,
        //         }
        //         chatUser?.push(ChatuserUpdate);
        //     }
        // })

        if (ctime >= NProposaltime) {
            // console.log('test');
            // return
            if (!test?.length == 0 && !chatUser?.length == 0) {
                // console.log(test);
                // console.log(chatUser);
                // return
                try {
                    firestore()
                        .collection('Proposals')
                        .doc(Currentuser?.uid)
                        .set({
                            Proposals: test,
                        }, { merge: true })
                        .then(() => {
                            // setTimeout(() => {
                            //     navigation.navigate('DateServayScreen', { ProposalId: item?._id });
                            //     console.log('DateServayScreen');
                            // }, 3000
                            //     //   1000 * 60 * 60
                            // );
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
                    const data = {
                        ...docSnapshot?.data(),
                        docid: docid
                    }
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
                    SendPushNotify(uid, Currentuser, mymsg?.category)

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
                    padding: 2
                }}
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

    const renderSend = props => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => { setModal(true) }}
                    style={{
                        paddingLeft: 10
                    }}>
                    <Entypo name='attachment' size={20} color={COLORS.black} />
                </TouchableOpacity>
                {/* {imageUrl ? (
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
                                source={require('../../assets/cross.png')}
                                style={{ width: 16, height: 16, tintColor: COLORS.black }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : null} */}
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
                                    <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
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
                                    <Image source={require('../../assets/clock.png')} resizeMode="contain" style={{
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
                                    <Image source={require('../../assets/map.png')} resizeMode="contain" style={{
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
                                    <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
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
                                    <Image source={require('../../assets/clock.png')} resizeMode="contain" style={{
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
                                    <Image source={require('../../assets/map.png')} resizeMode="contain" style={{
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
                                    }}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                }
            </>
        )
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
                            <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
                                style={{
                                    tintColor: COLORS.black
                                }}
                            />
                        </TouchableOpacity>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            {userImg ?
                                <Image source={{ uri: userImg }} resizeMode='contain'
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                    }}
                                />
                                :
                                <Image source={require('../assets/nopic.png')} resizeMode='cover'
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                    }} />
                            }
                        </View>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
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

                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={require('../../assets/moreoption.png')} resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.black
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
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
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                width: '50%',
                                borderBottomColor: value == index ? COLORS.main : COLORS.gray2,
                                // borderRadius: 10,
                                height: 46,
                                // backgroundColor: value == index ? COLORS.main : COLORS.light
                            }}
                        >
                            <Text style={{
                                fontFamily: '',
                                color: value == index ? COLORS.main : COLORS.gray2,
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

                {coordinatorBtn == 'Date Mode' ? (
                    <ScrollView showsVerticalScrollIndicator={true}>
                        <View style={{
                            paddingBottom: 100
                        }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {!yourArrival?.length == 0 ?
                                    <>
                                        {yourArrival?.map((item, index) => (
                                            // console.log('==============', item),
                                            <View
                                                key={index}
                                                style={{
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 10,
                                                    backgroundColor: COLORS.white,
                                                    marginVertical: 10,
                                                    marginHorizontal: 20,
                                                    width: windowWidth / 1.2,
                                                    borderRadius: 10,
                                                    elevation: 3,
                                                }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    {item?.YourArrival == true ?
                                                        <View>
                                                            <View>
                                                                <Text style={{
                                                                    fontSize: 20,
                                                                    fontWeight: 'bold',
                                                                    color: COLORS.black,
                                                                }}>Your partner Arrived?</Text>
                                                            </View>
                                                            <View>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    paddingTop: 10
                                                                }}>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        paddingRight: 10
                                                                    }}>
                                                                        <View style={{
                                                                            paddingRight: 5,
                                                                        }}>
                                                                            <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                                                                                width: 15,
                                                                                height: 15,
                                                                            }} />
                                                                        </View>
                                                                        <View>
                                                                            <Text style={{
                                                                                fontSize: 12,
                                                                            }}>{item?.ProposalDate}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <View style={{
                                                                            paddingRight: 5
                                                                        }}>
                                                                            <Image source={require('../../assets/clock.png')} resizeMode="contain" style={{
                                                                                width: 15,
                                                                                height: 15,
                                                                            }} />
                                                                        </View>
                                                                        <View>
                                                                            <Text style={{
                                                                                fontSize: 12,
                                                                            }}>{item?.remainingTime}hr remaining</Text>
                                                                        </View>
                                                                    </View>

                                                                </View>

                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    // backgroundColor:COLORS.main,
                                                                    width: '95%'
                                                                }}>
                                                                    <View style={{
                                                                        paddingRight: 5
                                                                    }}>
                                                                        <Image source={require('../../assets/map.png')} resizeMode="contain" style={{
                                                                            width: 15,
                                                                            height: 15,
                                                                        }} />
                                                                    </View>
                                                                    <View>
                                                                        <Text style={{
                                                                            fontSize: 12,
                                                                        }}>{item?.ProposalAddress}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}>
                                                                <TouchableOpacity
                                                                    onPress={() => PNoArrived(item, index)}
                                                                    activeOpacity={0.8}
                                                                    style={{
                                                                        backgroundColor: COLORS.transparent,
                                                                        borderWidth: 1,
                                                                        marginTop: 20,
                                                                        borderRadius: 10,
                                                                        padding: 10,
                                                                        alignItems: 'center',
                                                                        paddingHorizontal: 30,
                                                                        marginHorizontal: 10
                                                                    }}>
                                                                    <Text style={{
                                                                        color: COLORS.black
                                                                    }}>No3</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    onPress={() => PArrived(item, index)}

                                                                    activeOpacity={0.8}
                                                                    style={{
                                                                        backgroundColor: COLORS.black,
                                                                        marginTop: 20,
                                                                        borderRadius: 10,
                                                                        padding: 10,
                                                                        alignItems: 'center',
                                                                        paddingHorizontal: 30,
                                                                        marginHorizontal: 10
                                                                    }}>
                                                                    <Text style={{
                                                                        color: COLORS.white
                                                                    }}>Yes3</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        :
                                                        <View>
                                                            <View>
                                                                <Text style={{
                                                                    fontSize: 20,
                                                                    fontWeight: 'bold',
                                                                    color: COLORS.black,
                                                                }}>Are you Arrived?</Text>
                                                            </View>
                                                            {!yourArrivalStatus ?
                                                                <View>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between',
                                                                        paddingTop: 10
                                                                    }}>
                                                                        <View style={{
                                                                            flexDirection: 'row',
                                                                            alignItems: 'center',
                                                                            paddingRight: 10
                                                                        }}>
                                                                            <View style={{
                                                                                paddingRight: 5,
                                                                            }}>
                                                                                <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                                                                                    width: 15,
                                                                                    height: 15,
                                                                                }} />
                                                                            </View>
                                                                            <View>
                                                                                <Text style={{
                                                                                    fontSize: 12,
                                                                                }}>{item?.ProposalDate}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{
                                                                            flexDirection: 'row',
                                                                            alignItems: 'center'
                                                                        }}>
                                                                            <View style={{
                                                                                paddingRight: 5
                                                                            }}>
                                                                                <Image source={require('../../assets/clock.png')} resizeMode="contain" style={{
                                                                                    width: 15,
                                                                                    height: 15,
                                                                                }} />
                                                                            </View>
                                                                            <View>
                                                                                <Text style={{
                                                                                    fontSize: 12,
                                                                                }}>{item?.remainingTime}hr remaining</Text>
                                                                            </View>
                                                                        </View>

                                                                    </View>

                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        // backgroundColor:COLORS.main,
                                                                        width: '95%'
                                                                    }}>
                                                                        <View style={{
                                                                            paddingRight: 5
                                                                        }}>
                                                                            <Image source={require('../../assets/map.png')} resizeMode="contain" style={{
                                                                                width: 15,
                                                                                height: 15,
                                                                            }} />
                                                                        </View>
                                                                        <View>
                                                                            <Text style={{
                                                                                fontSize: 12,
                                                                            }}>{item?.ProposalAddress}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                :
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    paddingTop: 10,
                                                                }}>
                                                                    <View>
                                                                        <Text style={{
                                                                            fontSize: 12,
                                                                            // paddingVertical: 15,
                                                                        }}>If you cancel now, you will get flake on your profile. You can remove flakes for $20 per flake. On your profile</Text>
                                                                    </View>
                                                                </View>
                                                            }

                                                            {!yourArrivalStatus ?
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => setYourArrivalStatus(true)}
                                                                        activeOpacity={0.8}
                                                                        style={{
                                                                            backgroundColor: COLORS.transparent,
                                                                            borderWidth: 1,
                                                                            marginTop: 20,
                                                                            borderRadius: 10,
                                                                            padding: 10,
                                                                            alignItems: 'center',
                                                                            paddingHorizontal: 30,
                                                                            marginHorizontal: 10
                                                                        }}>
                                                                        <Text style={{
                                                                            color: COLORS.black,
                                                                        }}>No1</Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        onPress={() => YouArrived(item, index)}

                                                                        activeOpacity={0.8}
                                                                        style={{
                                                                            backgroundColor: COLORS.black,
                                                                            marginTop: 20,
                                                                            borderRadius: 10,
                                                                            padding: 10,
                                                                            alignItems: 'center',
                                                                            paddingHorizontal: 30,
                                                                            marginHorizontal: 10
                                                                        }}>
                                                                        <Text style={{
                                                                            color: COLORS.white
                                                                        }}>Yes1</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                                :
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => setYourArrivalStatus(false)}
                                                                        activeOpacity={0.8}
                                                                        style={{
                                                                            backgroundColor: COLORS.transparent,
                                                                            borderWidth: 1,
                                                                            marginTop: 20,
                                                                            borderRadius: 10,
                                                                            padding: 10,
                                                                            alignItems: 'center',
                                                                            paddingHorizontal: 30,
                                                                            marginHorizontal: 10
                                                                        }}>
                                                                        <Text style={{
                                                                            color: COLORS.black
                                                                        }}>No2</Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        onPress={() => YouNotArrived(item, index)}

                                                                        activeOpacity={0.8}
                                                                        style={{
                                                                            backgroundColor: COLORS.black,
                                                                            marginTop: 20,
                                                                            borderRadius: 10,
                                                                            padding: 10,
                                                                            alignItems: 'center',
                                                                            paddingHorizontal: 30,
                                                                            marginHorizontal: 10
                                                                        }}>
                                                                        <Text style={{
                                                                            color: COLORS.white
                                                                        }}>Yes2</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            }
                                                            <>
                                                                {item?.PartnerArrival &&
                                                                    <View style={{
                                                                        paddingTop: 5,
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <Text style={{
                                                                            fontSize: 12,
                                                                            paddingRight: 5
                                                                        }}>
                                                                            Your partner hase arrived!
                                                                        </Text>
                                                                        <Text style={{
                                                                            fontSize: 12,
                                                                            color: 'red'
                                                                        }}>
                                                                            youre getting late
                                                                        </Text>
                                                                    </View>

                                                                }
                                                            </>
                                                        </View>
                                                    }
                                                </View>
                                            </View>
                                        ))}
                                    </>
                                    :
                                    null
                                    // <>
                                    //     {processDate?.map((item, index) => (
                                    //         // console.log('==============', item),
                                    //         <View
                                    //             key={index}
                                    //             style={{
                                    //                 paddingHorizontal: 20,
                                    //                 paddingVertical: 10,
                                    //                 backgroundColor: COLORS.white,
                                    //                 marginVertical: 10,
                                    //                 marginHorizontal: 20,
                                    //                 borderRadius: 10,
                                    //                 elevation: 3,
                                    //             }}>
                                    //             <View style={{
                                    //                 flexDirection: 'row',
                                    //                 alignItems: 'center',
                                    //                 justifyContent: 'space-between'
                                    //             }}>
                                    //                 <View>
                                    //                     <Text style={{
                                    //                         fontSize: 20,
                                    //                         fontWeight: 'bold',
                                    //                         color: COLORS.black,
                                    //                     }}>Your Partner Arrived?</Text>
                                    //                 </View>
                                    //             </View>
                                    //             <View style={{
                                    //                 flexDirection: 'row',
                                    //                 alignItems: 'center',
                                    //                 justifyContent: 'space-between',
                                    //                 paddingTop: 10
                                    //             }}>
                                    //                 <View style={{
                                    //                     flexDirection: 'row',
                                    //                     alignItems: 'center',
                                    //                     paddingRight: 10
                                    //                 }}>
                                    //                     <View style={{
                                    //                         paddingRight: 5
                                    //                     }}>
                                    //                         <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                                    //                             width: 15,
                                    //                             height: 15,
                                    //                         }} />
                                    //                     </View>
                                    //                     <View>
                                    //                         <Text style={{
                                    //                             fontSize: 12,
                                    //                         }}>{item?.ProposalDate}</Text>
                                    //                     </View>
                                    //                 </View>
                                    //                 <View style={{
                                    //                     flexDirection: 'row',
                                    //                     alignItems: 'center'
                                    //                 }}>
                                    //                     <View style={{
                                    //                         paddingRight: 5
                                    //                     }}>
                                    //                         <Image source={require('../../assets/clock.png')} resizeMode="contain" style={{
                                    //                             width: 15,
                                    //                             height: 15,
                                    //                         }} />
                                    //                     </View>
                                    //                     <View>
                                    //                         <Text style={{
                                    //                             fontSize: 12,
                                    //                         }}>{item.remainingTime}hr remaining</Text>
                                    //                     </View>
                                    //                 </View>

                                    //             </View>

                                    //             <View style={{
                                    //                 flexDirection: 'row',
                                    //                 alignItems: 'center',
                                    //                 justifyContent: 'space-between',
                                    //                 paddingTop: 10
                                    //             }}>
                                    //                 <View style={{
                                    //                     flexDirection: 'row',
                                    //                     alignItems: 'center'
                                    //                 }}>
                                    //                     <View style={{
                                    //                         paddingRight: 5
                                    //                     }}>
                                    //                         <Image source={require('../../assets/map.png')} resizeMode="contain" style={{
                                    //                             width: 15,
                                    //                             height: 15,
                                    //                         }} />
                                    //                     </View>
                                    //                     <View>
                                    //                         <Text style={{
                                    //                             fontSize: 12,
                                    //                         }}>{item.ProposalAddress}</Text>
                                    //                     </View>
                                    //                 </View>
                                    //             </View>
                                    //             <View style={{
                                    //                 flexDirection: 'row',
                                    //                 alignItems: 'center',
                                    //                 justifyContent: 'center'
                                    //             }}>
                                    //                 <TouchableOpacity
                                    //                     onPress={() => PNoArrived(item, index)}
                                    //                     activeOpacity={0.8}
                                    //                     style={{
                                    //                         backgroundColor: COLORS.transparent,
                                    //                         borderWidth: 1,
                                    //                         marginTop: 20,
                                    //                         borderRadius: 10,
                                    //                         padding: 10,
                                    //                         alignItems: 'center',
                                    //                         paddingHorizontal: 30,
                                    //                         marginHorizontal: 10
                                    //                     }}>
                                    //                     <Text style={{
                                    //                         color: COLORS.black
                                    //                     }}>No</Text>
                                    //                 </TouchableOpacity>
                                    //                 <TouchableOpacity
                                    //                     onPress={() => PArrived(item, index)}

                                    //                     activeOpacity={0.8}
                                    //                     style={{
                                    //                         backgroundColor: COLORS.black,
                                    //                         marginTop: 20,
                                    //                         borderRadius: 10,
                                    //                         padding: 10,
                                    //                         alignItems: 'center',
                                    //                         paddingHorizontal: 30,
                                    //                         marginHorizontal: 10
                                    //                     }}>
                                    //                     <Text style={{
                                    //                         color: COLORS.white
                                    //                     }}>Yes</Text>
                                    //                 </TouchableOpacity>
                                    //             </View>
                                    //         </View>
                                    //     ))}
                                    // </>
                                }

                            </ScrollView>
                            <View style={{
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                backgroundColor: COLORS.light,
                                marginTop: 30,
                                marginHorizontal: 20,
                                borderRadius: 10,
                                // elevation: 3,
                            }}>
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: 10
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: COLORS.black
                                    }}>Date mode</Text>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ textAlign: 'center', fontSize: 13 }}>Text your trusted friend or family member a link to
                                        your live Location During date mode</Text>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('DateModeScreen')}
                                        style={{
                                            marginVertical: 10,
                                            backgroundColor: COLORS.main,
                                            paddingHorizontal: 10,
                                            paddingVertical: 5,
                                            borderRadius: 5,
                                            alignItems: 'center',
                                            width: '50%',
                                        }}>
                                        <Text style={{ color: COLORS.black, fontSize: 13 }}>Request tracking</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={{
                                marginTop: 20,
                                paddingHorizontal: 20
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black,
                                    fontWeight: 'bold'
                                }}>Dates</Text>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {!acceptedProposal?.length == 0 ?
                                    <>
                                        {acceptedProposal?.map((item, index) => (
                                            // console.log('==============', item),
                                            <View
                                                key={index}
                                                style={{
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 20,
                                                    backgroundColor: COLORS.white,
                                                    marginVertical: 10,
                                                    marginHorizontal: 20,
                                                    borderRadius: 10,
                                                    elevation: 3,
                                                    width: windowWidth / 1.2,
                                                }}>

                                                {item?.CancleDate && ( // Check if `CancleDate` exists
                                                    <View style={{ // Overlay label style
                                                        position: 'absolute',
                                                        top: '50%',
                                                        alignSelf: 'center',
                                                        opacity: 10,
                                                        // left: '50%',
                                                        // transform: [{ translateX: -50 }, { translateY: -50 }],
                                                        backgroundColor: COLORS.black,
                                                        padding: 5,
                                                        borderRadius: 5,
                                                        zIndex: 1,
                                                    }}>
                                                        <Text style={{ color: COLORS.white, backgroundColor: COLORS.red, fontSize: 16, fontWeight: 'bold' }}>Date Canceled</Text>
                                                    </View>
                                                )}
                                                <View
                                                    style={{
                                                        opacity: item?.CancleDate ? 0.6 : 1,
                                                    }}
                                                >
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        width: '100%'
                                                        // justifyContent: 'space-between',
                                                    }}>
                                                        <View style={{ width: '60%', backgroundColor: COLORS.white }}>
                                                            <Text style={{
                                                                fontSize: 16,
                                                                fontWeight: 'bold',
                                                                color: COLORS.black,
                                                                // paddingRight: 50
                                                            }}>Dating Porposal</Text>
                                                        </View>
                                                        <View style={{ width: '40%', alignItems: 'flex-end' }}>
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
                                                                <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                }} />
                                                            </View>
                                                            <View>
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                }}>{item?.ProposalDate}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                                            <View style={{
                                                                paddingRight: 5
                                                            }}>
                                                                <Image source={require('../../assets/clock.png')} resizeMode="contain" style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                }} />
                                                            </View>
                                                            <View>
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                }}>{item?.ProposalTime}</Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        paddingTop: 10,
                                                        width: '95%'
                                                    }}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                                            <View style={{
                                                                paddingRight: 5
                                                            }}>
                                                                <Image source={require('../../assets/map.png')} resizeMode="contain" style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                }} />
                                                            </View>
                                                            <View>
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                }}>{item?.ProposalAddress}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    {item?.CancleDate ?
                                                        <View
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
                                                            }}>Canceled</Text>
                                                        </View>
                                                        :
                                                        <TouchableOpacity
                                                            onPress={() => TempCancleDate(item)}
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
                                                    }
                                                </View>
                                            </View>
                                        ))}
                                    </>
                                    :
                                    <View style={{
                                        alignItems: 'center',
                                        paddingHorizontal: 20
                                    }}>
                                        <Text style={{ fontSize: 13, color: COLORS.gray }}>No Dates Proposal Found!</Text>
                                    </View>
                                }

                            </ScrollView>

                        </View>
                    </ScrollView>
                ) : (
                    <View style={{
                        flex: 1,
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
                            alwaysShowSend
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
                                                source={require('../../assets/map.png')}
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
                                            <Image source={require('../../assets/selectdate.png')} resizeMode='contain' style={{
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
                                            <Image source={require('../../assets/selectdate.png')} resizeMode='contain' style={{
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
        // height: 60
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
})
