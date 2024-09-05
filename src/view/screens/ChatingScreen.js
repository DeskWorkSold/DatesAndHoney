import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, ActivityIndicator, Dimensions, Modal, ToastAndroid, ScrollView, Pressable } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabOne from '../components/HeaderTabOne';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SVGImg2 from '../../assets/dot.svg';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import SVGImg from '../../assets/conform.svg';
import SVGImg1 from '../../assets/diamond.svg';
import NonSmoker from '../../assets/NonSmoker.svg';
import Drinker from '../../assets/Drinker.svg';
import Kids from '../../assets/Kids.svg';
import Pets from '../../assets/Pets.svg';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import storage from '@react-native-firebase/storage';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import ImageView from "react-native-image-viewing";
import { useDispatch, useSelector } from 'react-redux';
import { login, PorposalCategory, selectChatuser, selectPorposalCategory, selectStatus, selectUser, status } from '../../../redux/reducers/Reducers';
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
import Loader from '../components/Loader';
import { useIsFocused } from '@react-navigation/native';
import { getPreciseDistance } from 'geolib';
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
        name: 'Date Mode',
    }
];


const ChatingScreen = ({ navigation, route }) => {
    const data = route?.params?.data;
    const userName = data?.Name;
    const userImg = data?.image1;
    const uid = data?.uid
    const reduxChatUser = useSelector(selectChatuser);
    const [secUser, setSecUser] = useState(null)
    const focus = useIsFocused()
    // console.log('==>One', data.uid);
    const [messages, setMessages] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [tempLoading, setTempLoading] = useState(false)
    // console.log('=====>',imageUrl);
    const [category, setCategory] = useState(null);

    const [rendering, setRendering] = useState(false);
    const [modalData, setModalData] = useState(null)
    const Currentuser = useSelector(selectUser);
    const [transferred, setTransferred] = useState(0);
    const [modal, setModal] = useState(false);
    const [sendPorposal, setSendPorposal] = useState();
    const [dates, setDates] = useState('');
    const [tempDates, setTempDates] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [time, setTime] = useState('');
    const [address, setAddressText] = useState();
    const [TimeVisibility, setTimeVisibility] = useState(false);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [actionTriggered, setActionTriggered] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [showImageView, setShowImageView] = useState(false)
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
    const [SecondUserProposal, setSecondUserProposal] = useState();
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
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [reason, setReason] = useState('');
    const [showhide, setShowHide] = useState(false)
    const [sendchat, setSendChat] = useState('')
    const [searchTextRef, setSearchTextRef] = useState('')
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [moreOptionsPoppup, setMoreOptionsPoppup] = useState(false);
    const [uploading, setUploading] = useState(false);
    const docid = data?.uid > Currentuser?.uid ? Currentuser?.uid + "-" + data?.uid : data?.uid + "-" + Currentuser?.uid;
    // console.log(docid, '===>');

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

    const OnDeleteUser = async () => {
        try {
            let Ref_firestore = firestore()
                .collection('Users')
                .doc(Currentuser?.uid)

            let GetData = await Ref_firestore.get()

            // console.log(GetData.data().PrivateChat);
            let UpdatePrivateChat = GetData.data()?.PrivateChat?.filter(item => item?.ChatuserDetails?.uid !== uid)

            // console.log(UpdatePrivateChat);
            await Ref_firestore.update({ PrivateChat: UpdatePrivateChat })
                .then(() => {
                    setUploading(false)
                    navigation.goBack();
                    // ToastAndroid.show('User removed from your matches!', ToastAndroid.SHORT)
                    console.log('User chat deleted!');
                });
        } catch (e) {
            setUploading(false)
            console.log(e);
            // ToastAndroid.show(`Error: ${e}`, ToastAndroid.SHORT)
        }

    }
    const openImageViewer = (index) => {
        // setCurrentIndex(index);
        setShowImageView(true);
    };

    const ReadAllMessages = async (props) => {
        // console.log(props._id);
        // return
        if (props?._id) {
            try {
                const messageRef = await firestore().collection('chatrooms')
                    .doc(docid)
                    .collection('messages')
                    .doc(props?._id)
                // return
                messageRef.update({
                    'received': true,
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
            // console.log(address);
            return address;
        } catch (error) {
            console.warn(error);
            return null;
        }
    };
    const GetUserDetails = async () => {
        setTempLoading(true)
        try {
            const ref = await firestore().collection('Users').doc(uid)
                .get()
            if (ref?.exists) {
                const data = ref.data()
                // console.log(data);

                const distance = parseFloat((getPreciseDistance(
                    { latitude: Currentuser?.Location?.latitude, longitude: Currentuser?.Location?.longitude },
                    { latitude: data?.userDetails?.Location?.latitude, longitude: data?.userDetails?.Location?.longitude },
                ) * 0.000621).toFixed(2));


                let test = getAddressFromCoordinates(data?.userDetails?.Location?.latitude, data?.userDetails?.Location?.longitude)
                    .then(address => {
                        const addressParts = address ? address.split(', ') : null;
                        const lastWord = addressParts[addressParts.length - 1];
                        const state = addressParts.length > 1 ? addressParts[addressParts.length - 2] : '';
                        const country = addressParts.length > 2 ? addressParts[addressParts.length - 3] : '';

                        const dateParts = data?.userDetails?.Dates.split('/');
                        const dob = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);
                        const totalyears = new Date().getFullYear() - dob.getFullYear();
                        const images = [];
                        for (let i = 1; i <= 6; i++) {
                            const image = data?.userDetails[`image${i}`];
                            if (image) {
                                images.push({ uri: image });
                            }
                        }
                        let userData = {
                            ...data?.userDetails,
                            distance: distance,
                            address: address,
                            city: lastWord,
                            ImagesArray: images,
                            country: country,
                            state: state,
                            years: totalyears,
                        }
                        let final = {
                            ...data,
                            userDetails: userData
                        }
                        // console.log(final, '===');
                        setSecUser(final)
                        setTempLoading(false)
                    })
            }
        } catch (err) {
            console.log(err?.message);
            setTempLoading(false)
        }
    }


    useEffect(() => {
        GetUserDetails()
    }, [])


    useEffect(() => {
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
                    // console.log(data?.sentBy);
                    if (data?.sentBy == uid && !data?.received) {
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
                            if ((item?.sentBy == data?.uid && item?.sentTo == Currentuser?.uid) || item?.sentBy == Currentuser?.uid && item?.sentTo == data?.uid) {
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
                    setYourArrival(yourArrivald)

                    Proposals?.sort(function (a, b) {
                        return new Date(b?.ProposalTempDate?.seconds * 1000 + b?.ProposalTempDate?.nanoseconds / 1000000) - new Date(a?.ProposalTempDate?.seconds * 1000 + a?.ProposalTempDate?.nanoseconds / 1000000)
                    })
                    console.log(Proposals);
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
                sentTo: data?.uid,
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
                sentTo: data?.uid,
                createdAt: new Date(),
                image: '',
                sent: true,
                category: null,
                ProposalDate: dates,
                ProposalTime: time,
                ProposalAddress: location,
                ProposalLocation: pin,
                ProposalDescription: description,
                ProposalStatus: false,
                read: false,
            };
        }
        // console.log(docid);
        // return
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
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

    }, [docid])

    const SendPushNotify = (uid, Currentuser, mymsg, title) => {
        // console.log(uid, Currentuser?.Name, mymsg);
        // return
        firestore()
            .collection('token')
            .doc(uid)
            .get()
            .then(doc => {
                let token = doc?.data()?.token;
                // console.log(tosken);

                // return
                if (token) {
                    var data = JSON.stringify({
                        notification: {
                            title: `${title ? title : 'New Message'}`,
                            body: `${Currentuser?.Name ? Currentuser?.Name : 'New User'}: ${mymsg ? mymsg : 'click to  open message'}`,
                            sound: 'default'
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
                setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
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
                        backgroundColor: COLORS.black,
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
                tickStyle={{
                    // color:'red',
                    display: Currentuser?.PackageId == '456' || Currentuser?.PackageId == '654' ? 'flex' : 'none'
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
                    padding: 2,
                    color: COLORS.green,
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

    const renderSend = props => {
        return (
            <>{props?.text ?
                <Send {...props}>
                    <View style={{
                        width: 35,
                        height: 35,
                        backgroundColor: COLORS.main,
                        borderRadius: 50,
                        marginRight: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Icon name="send" size={20} color={COLORS.white} />
                    </View>
                </Send>
                :
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => { setModal(true) }}
                        style={{
                            paddingLeft: 10
                        }}>
                        <Feather name="share" size={22} color={COLORS.black} />
                    </TouchableOpacity>
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
                                    source={require('../../assets/cross.png')}
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
                </View>}
            </>
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
                                {/* <Text style={{
                                    fontSize: 12,
                                    color: COLORS.gray
                                }}>6 days remaining</Text> */}
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
                                        color: COLORS.gray
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
                                        color: COLORS.gray
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
                                        color: COLORS.gray
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
                        {Currentuser?.PackageId == '456' || Currentuser?.PackageId == '654' ?
                            <View style={{
                                position: 'absolute',
                                zIndex: 10,
                                right: 10,
                                bottom: -15,
                            }}>
                                {props.currentMessage.received ? (
                                    <Text style={{ color: COLORS.black, fontSize: 12, }}>✓✓</Text>
                                ) : (
                                    <Text style={{ color: COLORS.black, fontSize: 12, }}>✓</Text>
                                )}
                            </View>
                            : null}
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
                                {/* <Text style={{
                                    fontSize: 12,
                                    color: COLORS.gray
                                }}>6 days remaining</Text> */}
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
                                        color: COLORS.gray
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
                                        color: COLORS.gray
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
                                        color: COLORS.gray
                                    }}>{ProposalAddress}</Text>
                                </View>
                            </View>
                        </View>
                        {ProposalStatus ?
                            <View
                                onPress={() => console.log('test')}
                                activeOpacity={0.8}
                                style={{
                                    backgroundColor: COLORS.green,
                                    marginTop: 20,
                                    borderRadius: 10,
                                    padding: 10,
                                    alignItems: 'center',
                                }}>
                                <Text style={{
                                    color: COLORS.white
                                }}>Accepted</Text>
                            </View>
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

    const handleSubmission = async (modalType) => {
        if (!reason || reason == '') {
            ToastAndroid.show("Please enter reasone!", ToastAndroid.SHORT);
        }
        else {
            setLoading(true)
            if (modalType == 'unmatch') {
                console.log(`Handling ${modalType} with reason:`, reason);
                try {
                    const ref = firestore().collection('UsersQuery').doc('2')
                    const refdoc = await ref?.get()
                    if (refdoc?.exists) {
                        const Report = refdoc?.data()?.Unmatch
                        const index = Report.findIndex(item => item?.from == Currentuser?.uid && item.to == uid);
                        if (index != -1) {
                            OnDeleteUser()
                            ToastAndroid.show(`${userName} removed from your matches successfully`, ToastAndroid.SHORT);
                            SendPushNotify(uid, Currentuser, `Hase been remove you from match!`, 'Match Removed')
                            setModalVisible(false)
                            setReason(null)
                            setLoading(false)
                            return
                        }
                        else {
                            await ref?.set(
                                {
                                    Unmatch: firestore.FieldValue.arrayUnion(
                                        {
                                            from: Currentuser?.uid,
                                            to: uid,
                                            totalUnmatch: 1,
                                            Reasone: reason,
                                            UnmatchTime: new Date().toString()
                                        }
                                    ),
                                },
                                { merge: true },
                            )
                                .then(() => {
                                    OnDeleteUser()
                                    ToastAndroid.show(`${userName} removed from your matches successfully`, ToastAndroid.SHORT);
                                    SendPushNotify(uid, Currentuser, `Hase been remove you from match!`, 'Match Removed')
                                    setModalVisible(false)
                                    setReason(null)
                                    setLoading(false)
                                })
                            return
                        }
                    }
                    else {
                        await ref?.set({
                            Unmatch: [
                                {
                                    from: Currentuser?.uid,
                                    to: uid,
                                    totalUnmatch: 1,
                                    Reasone: reason,
                                    UnmatchTime: new Date().toString()
                                }
                            ]
                        })
                            .then(() => {
                                OnDeleteUser()
                                ToastAndroid.show(`${userName} removed from your matches successfully`, ToastAndroid.SHORT);
                                SendPushNotify(uid, Currentuser, `Hase been remove you from match!`, 'Match Removed')
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
            if (modalType == 'Block') {
                // console.log(`Handling2 ${modalType} with reason:`, reason);
                try {
                    const mydoc = firestore().collection('Users').doc(Currentuser?.uid)
                    const mydocGet = await mydoc.get()
                    if (mydocGet?.exists) {
                        const BlockedUsers = mydocGet?.data()?.BlockedUsers
                        const index = BlockedUsers?.length > 0 && BlockedUsers?.findIndex(item => item.to == uid)
                        // console.log(index, '---');
                        if (index) {
                            // console.log('here');
                            setLoading(false)
                            // return
                            ToastAndroid.show(`${userName} Blocked successfully`, ToastAndroid.SHORT);
                            OnDeleteUser()
                            SendPushNotify(uid, Currentuser, `Block you!`, 'Blocked')
                            setModalVisible(false)
                            setReason(null)
                            return
                        }
                        else {
                            await mydoc?.set(
                                {
                                    BlockedUsers: firestore.FieldValue.arrayUnion(
                                        {
                                            from: Currentuser?.uid,
                                            to: uid,
                                            totalBlocks: 1,
                                            Reasone: reason,
                                            BlockedTime: new Date().toString()
                                        }
                                    ),
                                },
                                { merge: true },
                            )
                                .then(() => {
                                    ToastAndroid.show(`${userName} Blocked successfully`, ToastAndroid.SHORT);
                                    SendPushNotify(uid, Currentuser, `Block you!`, 'Blocked')
                                    OnDeleteUser()
                                    setModalVisible(false)
                                    setReason(null)
                                    setLoading(false)
                                })
                            return

                        }
                    }
                    // console.log(Currentuser);
                    setLoading(false)
                } catch {
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

    const SeeuserDetails = () => {
        console.log(!secUser);
        setDeleteModal('UserDetails')
        setModal(true);
        GetUserDetails()
        return
        if (secUser && !modal) {
            setDeleteModal('UserDetails')
            const images = [];
            for (let i = 1; i <= 6; i++) {
                const image = secUser?.userDetails[`image${i}`];
                if (image) {
                    images.push({ uri: image });
                }
            }
            // console.log('here is current card data: ', images);
            const updatedUserDetails = {
                ...secUser?.userDetails,
                ImagesArray: images
            };

            // Create a new user object with updated userDetails
            const updatedUser = {
                ...secUser,
                userDetails: updatedUserDetails
            };

            // console.log(updatedUser);
            setSecUser(updatedUser)
            setModal(true);
        }
        if (!secUser) {
            GetUserDetails()
        }
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
                        <TouchableOpacity onPress={() => SeeuserDetails()} style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            {userImg ?
                                <Image source={{ uri: userImg }} resizeMode='cover'
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                    }}
                                />
                                :
                                <Image source={require('../../assets/nopic.png')} resizeMode='cover'
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                    }} />
                            }
                        </TouchableOpacity>
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
                        right: 20,
                        backgroundColor: 'white',
                        borderRadius: 4,
                        padding: 0,
                        borderWidth: 1,
                        borderColor: COLORS.gray2,
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
                        <TouchableOpacity onPress={() => {
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
                        </TouchableOpacity>
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
                                                            <Text style={{
                                                                fontSize: 20,
                                                                fontWeight: 'bold',
                                                                color: COLORS.black,
                                                            }}>Your partner Arrived?</Text>
                                                        </View>
                                                        :
                                                        <View>
                                                            <Text style={{
                                                                fontSize: 20,
                                                                fontWeight: 'bold',
                                                                color: COLORS.black,
                                                            }}>Are you Arrived?</Text>
                                                        </View>
                                                    }
                                                </View>
                                                {!yourArrivalStatus ?
                                                    <>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            paddingTop: 10,
                                                            // paddingHorizontal:10,
                                                        }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center'
                                                            }}>
                                                                <View>
                                                                    <Text style={{
                                                                        fontSize: 12,
                                                                        paddingVertical: 15,
                                                                        color: COLORS.gray
                                                                    }}>Do you want to cancle this date?</Text>
                                                                </View>
                                                            </View>

                                                        </View>
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
                                                                    color: COLORS.black
                                                                }}>No</Text>
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
                                                                }}>Yes</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                    </>
                                                    :
                                                    <>
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
                                                                        color: COLORS.gray

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
                                                                        color: COLORS.gray

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
                                                                    color: COLORS.gray

                                                                }}>{item?.ProposalAddress}</Text>
                                                            </View>
                                                        </View>



                                                        {item?.YourArrival == true ?
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
                                                                    }}>No</Text>
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
                                                                    }}>Yes</Text>
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
                                                                        color: COLORS.black,
                                                                    }}>No</Text>
                                                                </TouchableOpacity>
                                                                {item?.PartnerArrival ?
                                                                    <TouchableOpacity
                                                                        onPress={() => YouArrivedTwo(item, index)}

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
                                                                        }}>Yes</Text>
                                                                    </TouchableOpacity>
                                                                    :
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
                                                                        }}>Yes</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        }
                                                        {item?.PartnerArrival &&
                                                            <View style={{
                                                                paddingTop: 5,
                                                                flexDirection: 'row',
                                                                alignItems: 'center'
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                    paddingRight: 5,
                                                                    color: COLORS.gray
                                                                }}>
                                                                    Your partner hase arrived!
                                                                </Text>
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                    color: 'red',
                                                                    color: COLORS.gray
                                                                }}>
                                                                    youre getting late
                                                                </Text>
                                                            </View>

                                                        }
                                                    </>
                                                }
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
                                backgroundColor: COLORS.white,
                                marginTop: 30,
                                marginHorizontal: 20,
                                borderRadius: 10,
                                elevation: 3,
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
                                    <Text style={{
                                        textAlign: 'center', fontSize: 13,
                                        color: COLORS.gray
                                    }}>Text your trusted friend or family member a link to
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
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 20
                                }}>
                                    {!acceptedProposal?.length == 0 ?
                                        <>
                                            {acceptedProposal?.map((item, index) => {
                                                console.log(item?.ProposalTempDate);
                                                const givenDate = new Date(item?.ProposalTempDate.seconds * 1000 + item?.ProposalTempDate.nanoseconds / 1000000);
                                                const currentDate = new Date();

                                                // console.log(givenDate > currentDate);
                                                return (
                                                    // console.log('==============', item),
                                                    <View
                                                        key={index}
                                                        style={{
                                                            paddingHorizontal: 20,
                                                            paddingVertical: 20,
                                                            backgroundColor: COLORS.white,
                                                            marginVertical: 10,
                                                            marginRight: 10,
                                                            borderRadius: 10,
                                                            elevation: 3,
                                                            // flex: 2,
                                                            width: 290,
                                                        }}>

                                                        {item?.CancleDate ? ( // Check if `CancleDate` exists
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
                                                        )
                                                            :
                                                            givenDate < currentDate ? (
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
                                                                    <Text style={{ color: COLORS.white, backgroundColor: COLORS.red, fontSize: 16, fontWeight: 'bold' }}>Proposal Expired</Text>
                                                                </View>
                                                            ) :
                                                                null
                                                        }
                                                        <View
                                                            style={{
                                                                opacity: item?.CancleDate ? 0.6 : givenDate < currentDate ? 0.6 : 1,
                                                            }}
                                                        >
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                            }}>
                                                                <View>
                                                                    <Text style={{
                                                                        fontSize: 16,
                                                                        fontWeight: 'bold',
                                                                        color: COLORS.black,
                                                                        paddingRight: 50
                                                                    }}>Dating Porposal</Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={{
                                                                        fontSize: 12,
                                                                        color: COLORS.gray
                                                                    }}>

                                                                    </Text>
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
                                                                            color: COLORS.gray
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
                                                                            color: COLORS.gray
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
                                                                    alignItems: 'center',
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
                                                                            color: COLORS.gray
                                                                        }}>{item?.ProposalAddress}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            {item?.CancleDate ?
                                                                <View
                                                                    activeOpacity={0.8}
                                                                    style={{
                                                                        backgroundColor: 'red',
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
                                                                    onPress={() => item?.CancleDate || givenDate < currentDate ? null : TempCancleDate(item)}
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
                                                )
                                            })}
                                        </>
                                        :
                                        <View style={{
                                            alignItems: 'center',
                                            paddingHorizontal: 0
                                        }}>
                                            <Text style={{ fontSize: 13, color: COLORS.gray }}>Dating proposal not found!</Text>
                                        </View>
                                    }
                                </View>
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
                            // renderInputToolbar={(props) => <CustomInputToolbar {...props} />}
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
                                            // console.log('======>data', data, '====>details', details)
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
                                                flex: 0, position: 'absolute', width: "90%", zIndex: 1,
                                                // marginHorizontal: 20,
                                                alignSelf: 'center',
                                                marginTop: 10,
                                            },
                                            listView: { backgroundColor: "white" },
                                            textInput: {
                                                color: '#333',
                                            },
                                            description: {
                                                color: '#000', // Set your desired list item text color here
                                            },
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
                                            color: COLORS.gray

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
                        modal && deleteModal == 'UserDetails' ?
                            <View style={{
                                flex: 1,
                                marginHorizontal: 0,
                                // alignItems: 'center'
                            }}>
                                <View style={{
                                    // marginTop: 0, 
                                    // paddingHorizontal: 20, 
                                    // backgroundColor: COLORS.white 
                                    width: '100%',
                                    marginBottom: 0,
                                    backgroundColor: COLORS.white,
                                    elevation: 5,
                                    borderRadius: 0,
                                    // paddingHorizontal: 10,
                                    paddingBottom: 20,
                                    marginTop: 0,
                                    // borderWidth: 5,
                                    borderColor: COLORS.white,
                                }}>
                                    {secUser?.userDetails?.uid == uid ?
                                        <ScrollView vertical showsVerticalScrollIndicator={false}>
                                            <View style={{
                                                borderRadius: 20,
                                            }}>
                                                <View style={{
                                                    // paddingTop: 10,
                                                    // marginTop:10
                                                    borderRadius: 20,
                                                }}>
                                                    <FastImage
                                                        style={{
                                                            height: 500,
                                                            width: '100%',
                                                        }}
                                                        source={{
                                                            uri: secUser?.userDetails.image1,
                                                            headers: { Authorization: 'someAuthToken' },
                                                            priority: FastImage.priority.normal,
                                                        }}
                                                        resizeMode={FastImage.resizeMode.cover}
                                                    />
                                                    <View style={{
                                                        position: 'absolute',
                                                        bottom: 50,
                                                        width: '100%',
                                                    }}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            paddingHorizontal: 5,
                                                            paddingVertical: 10,
                                                        }}>
                                                            {/* <Image source={require('../../assets/dot.png')} resizeMode='contain'
                                                    style={{
                                                        width: 5,
                                                        height: 5,
                                                        marginRight: 5
                                                    }} /> */}
                                                            <Text style={{
                                                                fontSize: 24, fontWeight: 'bold',
                                                                color: COLORS.white,
                                                                marginRight: 5
                                                            }} numberOfLines={1}>{secUser?.userDetails?.Name},</Text>
                                                            <View>
                                                                <Text style={{
                                                                    fontSize: 20,
                                                                    color: COLORS.white,
                                                                    marginRight: 5
                                                                }} numberOfLines={1}>{secUser?.userDetails?.years ? secUser?.userDetails?.years : 0}</Text>
                                                            </View>

                                                            <View style={{
                                                                alignItems: 'center',
                                                            }}>
                                                                <SVGImg width={20} height={20} />
                                                            </View>
                                                            {secUser?.userDetails?.PackageId == 654 &&
                                                                <>
                                                                    <View style={{
                                                                        alignItems: 'center',
                                                                        paddingHorizontal: 3
                                                                    }}>
                                                                        <SVGImg2 width={5} height={5} />
                                                                    </View>
                                                                    <SVGImg1 width={20} height={20} />
                                                                </>
                                                            }
                                                        </View>

                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            paddingHorizontal: 5,
                                                            justifyContent: 'space-between',

                                                        }}>
                                                            {secUser?.userDetails?.city &&
                                                                <View style={{ width: '50%', }}>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                                                        paddingVertical: 5,
                                                                        paddingHorizontal: 10,
                                                                        borderRadius: 30,
                                                                        alignSelf: 'flex-start'
                                                                    }}>
                                                                        <Ionicons name='location-outline' size={15} color={COLORS.white} />
                                                                        <Text style={{
                                                                            fontSize: 14,
                                                                            color: COLORS.white,
                                                                            marginLeft: 5,
                                                                        }} numberOfLines={1}>
                                                                            {secUser?.userDetails?.city ? secUser?.userDetails?.city : null}
                                                                        </Text>
                                                                    </View>
                                                                </View>}
                                                            <Text style={{
                                                                fontSize: 14,
                                                                color: COLORS.white,
                                                                paddingHorizontal: 10,
                                                                paddingVertical: 5,
                                                                borderRadius: 30,
                                                                backgroundColor: 'rgba(0,0,0,0.8)',
                                                            }} numberOfLines={1}>
                                                                {secUser?.userDetails?.distance ? Number(secUser?.userDetails?.distance).toFixed(0) : '00'} Miles Away</Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setModal(false);
                                                            setDeleteModal('')
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            margin: 20
                                                        }}>
                                                        <View style={{
                                                            width: 30, // Set width and height equal to create a circle 
                                                            height: 30,
                                                            borderRadius: 35, // Border radius should be half of width/height 
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderWidth: 1,
                                                            borderColor: COLORS.white
                                                        }}>
                                                            <AntDesign name='reload1' size={15} color={COLORS.white} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{
                                                    backgroundColor: COLORS.white,
                                                    borderRadius: 15,
                                                    // alignItems: 'center',
                                                    position: 'absolute',
                                                    top: 20,
                                                    right: 20,
                                                    padding: 10
                                                }}>
                                                    <Text style={{
                                                        color: COLORS.black,
                                                        // textAlign: 'center'
                                                        fontWeight: 'bold',
                                                        fontSize: 12
                                                    }}>
                                                        #flakemeter
                                                    </Text>
                                                    {secUser?.userDetails?.Flake == 1 &&
                                                        <View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}>
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    tintColor: COLORS.main,
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Text style={{ color: COLORS.black, fontSize: 12 }}>
                                                                    +{secUser?.userDetails?.Flake}
                                                                </Text>
                                                            </View>
                                                            <Text style={{
                                                                fontSize: 10,
                                                                color: COLORS.gray
                                                            }}>
                                                                I might flake on you haha😅
                                                            </Text>
                                                        </View>
                                                        // <Image source={require('../../assets/flake.png')} resizeMode='contain' />
                                                    }
                                                    {secUser?.userDetails?.Flake == 2 &&
                                                        <View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'

                                                            }}>
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    tintColor: COLORS.main,
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    tintColor: COLORS.main,
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Text style={{ color: COLORS.black, fontSize: 12 }}>
                                                                    +{secUser?.userDetails?.Flake}
                                                                </Text>
                                                            </View>
                                                            <Text style={{
                                                                fontSize: 10,
                                                                color: COLORS.gray

                                                            }}>
                                                                i'm Flaky haha 😜
                                                            </Text>
                                                        </View>
                                                    }
                                                    {secUser?.userDetails?.Flake >= 3 &&
                                                        <View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'

                                                            }}>
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    tintColor: COLORS.main,
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    tintColor: COLORS.main,
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    tintColor: COLORS.main,
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Text style={{ color: COLORS.black, fontSize: 12 }}>
                                                                    +{secUser?.userDetails?.Flake}
                                                                </Text>
                                                            </View>
                                                            <Text style={{
                                                                fontSize: 10,
                                                                color: COLORS.gray

                                                            }}>
                                                                i'm Extra flaky 👻
                                                            </Text>
                                                        </View>
                                                    }
                                                    {!secUser?.userDetails?.Flake &&
                                                        <View>

                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}>
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Image source={require('../../assets/flake.png')} resizeMode='contain' style={{
                                                                    width: 15,
                                                                    height: 15
                                                                }} />
                                                                <Text style={{ color: COLORS.black, fontSize: 12 }}>
                                                                    +0
                                                                </Text>
                                                            </View>
                                                            <Text style={{
                                                                fontSize: 10,
                                                                color: COLORS.gray
                                                            }}>
                                                                i'm not flaky 🙃
                                                            </Text>
                                                        </View>
                                                    }
                                                </View>


                                                {/* <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 5,
                                            paddingTop: 10
                                        }}>
                                            <Image source={require('../../assets/dot.png')} resizeMode='contain'
                                                style={{
                                                    width: 5,
                                                    height: 5,
                                                    marginRight: 5
                                                }} />
                                            <Text style={{
                                                fontSize: 20, fontWeight: 'bold',
                                                color: COLORS.black,
                                                marginRight: 5
                                            }}>{secUser?.userDetails?.Name}</Text>
                                            <Text style={{
                                                fontSize: 20,
                                                color: COLORS.black,
                                                marginRight: 5,
                                            }}>{secUser?.userDetails?.years ? secUser?.userDetails?.years : 0}</Text>
                                            <View>
                                                <SVGImg width={20} height={20} />
                                            </View>
                                            {secUser?.userDetails?.PackageId == 654 &&
                                                <>
                                                    <View style={{
                                                        alignItems: 'center',
                                                        paddingHorizontal: 3
                                                    }}>
                                                        <SVGImg2 width={5} height={5} />
                                                    </View>
                                                    <SVGImg1 width={20} height={20} />
                                                </>
                                            }
                                        </View>
                                    </View>


                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 5,
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                marginRight: 5,
                                            }}>{secUser?.userDetails?.city ? secUser?.userDetails?.city?.slice(0, 12) : null}</Text>
                                            <Text style={{
                                                color: COLORS.black,
                                                marginRight: 5,
                                                backgroundColor: COLORS.main,
                                                padding: 3,
                                                borderRadius: 5,
                                                fontSize: 10
                                            }}>{secUser?.userDetails?.distance} Miles Away</Text>
                                        </View>
                                    </View> */}

                                            </View>
                                            <View style={{
                                                paddingRight: 10
                                            }}>
                                                {secUser?.userDetails.Bio &&
                                                    <View style={{
                                                        paddingHorizontal: 10,
                                                        paddingVertical: 10,
                                                    }}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                                            <View style={{
                                                                backgroundColor: COLORS.main,
                                                                padding: 8,
                                                                borderRadius: 10,
                                                            }}>
                                                                <Image source={require('../../assets/modal/bio.png')} resizeMode='contain' style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    tintColor: COLORS.white
                                                                }} />
                                                            </View>
                                                            <Text style={{ paddingHorizontal: 10, fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>Bio</Text>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            width: windowWidth,
                                                        }}>
                                                            <View style={{ width: '85%' }}>
                                                                <Text style={{ paddingVertical: 10, fontSize: 13, color: COLORS.gray }}>
                                                                    {secUser?.userDetails.Bio ? secUser?.userDetails.Bio : 'Bio not found'}
                                                                </Text>
                                                            </View>
                                                            {/* <TouchableOpacity style={{ width: '25%' }}>
                      <Image source={require('../../assets/like2.png')} resizeMode='contain' />
                    </TouchableOpacity> */}
                                                        </View>
                                                    </View>
                                                }
                                                {secUser?.userDetails?.city || secUser?.userDetails?.state ?
                                                    <View>
                                                        <View style={{
                                                            marginHorizontal: 10,
                                                            paddingVertical: 10
                                                            // flexDirection: 'row',
                                                            // alignItems: 'center',
                                                        }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                marginBottom: 10
                                                            }}>
                                                                <View style={{
                                                                    backgroundColor: COLORS.main,
                                                                    padding: 8,
                                                                    borderRadius: 10,
                                                                }}>
                                                                    <Image source={require('../../assets/modal/address.png')} resizeMode='contain' style={{
                                                                        width: 15,
                                                                        height: 15,
                                                                        tintColor: COLORS.white
                                                                    }} />
                                                                </View>
                                                                <Text style={{ paddingHorizontal: 10, fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>Location</Text>
                                                            </View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                flexWrap: 'wrap',
                                                                alignItems: 'center',
                                                                paddingHorizontal: 0,
                                                            }}>
                                                                {secUser?.userDetails?.city || secUser?.userDetails?.state ?
                                                                    <View style={{
                                                                        paddingHorizontal: 10,
                                                                        marginRight: 5,
                                                                        // height: 40,
                                                                        paddingVertical: 10,
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        backgroundColor: COLORS.light,
                                                                        borderRadius: 30,
                                                                        marginBottom: 10,
                                                                    }}>
                                                                        <View style={{
                                                                            width: 20,
                                                                            height: 20,
                                                                            borderRadius: 30,
                                                                            backgroundColor: COLORS.green,
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center'
                                                                        }}>
                                                                            <Ionicons name='home' size={12} color={COLORS.white} />
                                                                        </View>
                                                                        <View>
                                                                            <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}> {secUser?.userDetails?.city}, {secUser?.userDetails?.state}</Text>
                                                                        </View>
                                                                    </View> : null}
                                                                {secUser?.userDetails?.country &&
                                                                    <View style={{
                                                                        paddingHorizontal: 10,
                                                                        marginRight: 5,
                                                                        paddingVertical: 10,
                                                                        // height: 40,
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        backgroundColor: COLORS.light,
                                                                        borderRadius: 30,
                                                                        marginBottom: 10,
                                                                    }}>
                                                                        <View style={{
                                                                            width: 20,
                                                                            height: 20,
                                                                            borderRadius: 30,
                                                                            backgroundColor: COLORS.green,
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center'
                                                                        }}>
                                                                            <MaterialIcons name='my-location' size={12} color={COLORS.white} />
                                                                        </View>
                                                                        <View>
                                                                            <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}> {secUser?.userDetails?.country}</Text>
                                                                        </View>
                                                                    </View>
                                                                }
                                                            </View>
                                                        </View>
                                                        {/* <View>
                                            <MapView
                                                style={styles.map1}
                                                initialRegion={{
                                                    latitude: secUser?.userDetails?.Location?.latitude,
                                                    longitude: secUser?.userDetails?.Location?.longitude,
                                                    latitudeDelta: 0.0922,
                                                    longitudeDelta: 0.0421,
                                                }}
                                            >
                                                <Marker
                                                    coordinate={{
                                                        latitude: secUser?.userDetails?.Location?.latitude,
                                                        longitude: secUser?.userDetails?.Location?.longitude,
                                                    }}
                                                    draggable
                                                    onDragEnd={
                                                        (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                                                    }
                                                    title={'Test Marker'}
                                                    description={`${secUser?.userDetails?.address}`} />
                                            </MapView>
                                        </View> */}
                                                    </View>
                                                    : null}

                                                <View>
                                                    <View style={{
                                                        paddingHorizontal: 10,
                                                        paddingVertical: 10,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}>
                                                        <View style={{
                                                            backgroundColor: COLORS.main,
                                                            padding: 8,
                                                            borderRadius: 10,
                                                        }}>
                                                            <Image source={require('../../assets/modal/info.png')} resizeMode='contain' style={{
                                                                width: 15,
                                                                height: 15,
                                                                tintColor: COLORS.white
                                                            }} />
                                                        </View>
                                                        <Text style={{ paddingHorizontal: 10, fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>
                                                            About
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                        marginHorizontal: 10,
                                                        alignItems: 'center',
                                                    }}>
                                                        {/* <TouchableOpacity style={{
                                                // width: '40%',
                                                paddingRight: 10,
                                                marginRight: 5,
                                                marginBottom: 10,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                // marginRight: 5,
                                            }}>
                                                <View>
                                                    <Image source={require('../../assets/modal/like2.png')} resizeMode='contain'
                                                        style={{
                                                            height: 40,
                                                            width: 40
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12, color:COLORS.gray }}>Single</Text>
                                                </View>
                                            </TouchableOpacity> */}
                                                        {secUser?.userDetails.Education &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Education width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails?.Education}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails.Hieght &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Height width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails?.Hieght} feets</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails.Gender &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Orientation width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails?.Gender}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails.languages &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Language width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails?.languages?.length > 0 ? secUser?.userDetails?.languages?.join(', ') : ''}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails.Drink &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Drinker width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails.Drink}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails.Kids &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Kids width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails.Kids}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails.IntroandExtro &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Image source={require('../../assets/modal/info5.png')} resizeMode='contain'
                                                                        style={{
                                                                            height: 20,
                                                                            width: 20,
                                                                            marginRight: 5,
                                                                        }} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray }}>{secUser?.userDetails.IntroandExtro}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails.Smoke &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <NonSmoker width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails.Smoke}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails.Ethnicity &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Ethnicity width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails.Ethnicity}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails.PoliticalView && secUser?.userDetails?.PoliticalViewStatus == "Public" &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <PoliticalViews width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails.PoliticalView}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails.Relagion && secUser.userDetails.RelagionStatus == "Public" &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Religion width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails.Relagion}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails?.RelationshipType?.length > 0 &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Orientation width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails?.RelationshipType?.length > 0 ? secUser?.userDetails?.RelationshipType?.map(item => item.name).join(', ') : secUser?.userDetails?.RelationshipType}</Text>
                                                                    {/* {console.log('Relationshiplenth here',secUser?.userDetails?.RelationshipType)} */}
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails?.languages?.length > 0 &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Orientation width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails?.languages?.length > 0 ? secUser?.userDetails?.languages?.join(', ') : secUser?.userDetails?.languages}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }

                                                        {secUser?.userDetails?.BuildType &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <BodyType width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails?.BuildType}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails?.FavFood?.length > 0 &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <FavoriteFood width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails?.FavFood?.length > 0 ? secUser?.userDetails?.FavFood?.join(', ') : secUser?.userDetails?.FavFood}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                        {secUser?.userDetails?.Exercise &&
                                                            <TouchableOpacity style={{
                                                                paddingHorizontal: 10,
                                                                marginRight: 5,
                                                                paddingVertical: 10,
                                                                // height: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: COLORS.light,
                                                                borderRadius: 30,
                                                                marginBottom: 10,
                                                            }}>
                                                                <View>
                                                                    <Exercise width={20} height={20} />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{secUser?.userDetails?.Exercise}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                    </View>
                                                </View>

                                                {secUser?.userDetails.image1 || secUser?.userDetails.image2 || secUser?.userDetails.image3 ?
                                                    <View>
                                                        <View style={{
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 20,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                            }}>
                                                                <View style={{
                                                                    backgroundColor: COLORS.main,
                                                                    padding: 8,
                                                                    borderRadius: 10,
                                                                }}>
                                                                    <Image source={require('../../assets/modal/gallery.png')} resizeMode='contain' style={{
                                                                        tintColor: COLORS.white,
                                                                        width: 15,
                                                                        height: 15,
                                                                    }} />
                                                                </View>
                                                                <Text style={{ paddingHorizontal: 10, fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>
                                                                    Gallery
                                                                </Text>
                                                            </View>
                                                        </View>

                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                paddingHorizontal: 10,
                                                            }}>
                                                                {secUser?.userDetails.image1 &&
                                                                    <TouchableOpacity
                                                                        // onPress={() => setUserProfilePicture({
                                                                        //     ...userProfilePicture,
                                                                        //     enable: true,
                                                                        //     image: secUser?.userDetails.image1
                                                                        // })}
                                                                        onPress={() => openImageViewer(secUser?.userDetails.image1)}
                                                                    >
                                                                        <FastImage
                                                                            style={{
                                                                                width: 250,
                                                                                height: 150,
                                                                                borderRadius: 20,
                                                                                marginRight: 10,
                                                                            }}
                                                                            source={{
                                                                                uri: secUser?.userDetails.image1,
                                                                                headers: { Authorization: 'someAuthToken' },
                                                                                priority: FastImage.priority.normal,
                                                                            }}
                                                                            resizeMode={FastImage.resizeMode.cover}
                                                                        />
                                                                        {/* <Image source={{ uri: secUser?.userDetails.image1 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                                    </TouchableOpacity>
                                                                }
                                                                {secUser?.userDetails.image2 &&
                                                                    <TouchableOpacity
                                                                        // onPress={() => setUserProfilePicture({
                                                                        //     ...userProfilePicture,
                                                                        //     enable: true,
                                                                        //     image: secUser?.userDetails.image2
                                                                        // })}
                                                                        onPress={() => openImageViewer(secUser?.userDetails.image2)}

                                                                    >
                                                                        <FastImage
                                                                            style={{
                                                                                width: 250,
                                                                                height: 150,
                                                                                borderRadius: 20,
                                                                                marginRight: 10,
                                                                            }}
                                                                            source={{
                                                                                uri: secUser?.userDetails.image2,
                                                                                headers: { Authorization: 'someAuthToken' },
                                                                                priority: FastImage.priority.normal,
                                                                            }}
                                                                            resizeMode={FastImage.resizeMode.cover}
                                                                        />
                                                                        {/* <Image source={{ uri: secUser?.userDetails.image2 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                                    </TouchableOpacity>
                                                                }
                                                                {secUser?.userDetails.image3 &&
                                                                    <TouchableOpacity
                                                                        // onPress={() => setUserProfilePicture({
                                                                        //     ...userProfilePicture,
                                                                        //     enable: true,
                                                                        //     image: secUser?.userDetails.image3
                                                                        // })}
                                                                        onPress={() => openImageViewer(secUser?.userDetails.image3)}

                                                                    >
                                                                        <FastImage
                                                                            style={{
                                                                                width: 250,
                                                                                height: 150,
                                                                                borderRadius: 20,
                                                                                marginRight: 10,
                                                                            }}
                                                                            source={{
                                                                                uri: secUser?.userDetails.image3,
                                                                                headers: { Authorization: 'someAuthToken' },
                                                                                priority: FastImage.priority.normal,
                                                                            }}
                                                                            resizeMode={FastImage.resizeMode.cover}
                                                                        />
                                                                        {/* <Image source={{ uri: secUser?.userDetails.image3 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                                    </TouchableOpacity>
                                                                }
                                                                {secUser?.userDetails.image4 &&
                                                                    <TouchableOpacity
                                                                        // onPress={() => setUserProfilePicture({
                                                                        //     ...userProfilePicture,
                                                                        //     enable: true,
                                                                        //     image: secUser?.userDetails.image4
                                                                        // })}
                                                                        onPress={() => openImageViewer(secUser?.userDetails.image4)}

                                                                    >
                                                                        <FastImage
                                                                            style={{
                                                                                width: 250,
                                                                                height: 150,
                                                                                borderRadius: 20,
                                                                                marginRight: 10,
                                                                            }}
                                                                            source={{
                                                                                uri: secUser?.userDetails.image4,
                                                                                headers: { Authorization: 'someAuthToken' },
                                                                                priority: FastImage.priority.normal,
                                                                            }}
                                                                            resizeMode={FastImage.resizeMode.cover}
                                                                        />
                                                                        {/* <Image source={{ uri: secUser?.userDetails.image4 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                                    </TouchableOpacity>
                                                                }
                                                                {secUser?.userDetails.image5 &&
                                                                    <TouchableOpacity
                                                                        // onPress={() => setUserProfilePicture({
                                                                        //     ...userProfilePicture,
                                                                        //     enable: true,
                                                                        //     image: secUser?.userDetails.image5
                                                                        // })}
                                                                        onPress={() => openImageViewer(secUser?.userDetails.image5)}

                                                                    >
                                                                        <FastImage
                                                                            style={{
                                                                                width: 250,
                                                                                height: 150,
                                                                                borderRadius: 20,
                                                                                marginRight: 10,
                                                                            }}
                                                                            source={{
                                                                                uri: secUser?.userDetails.image5,
                                                                                headers: { Authorization: 'someAuthToken' },
                                                                                priority: FastImage.priority.normal,
                                                                            }}
                                                                            resizeMode={FastImage.resizeMode.cover}
                                                                        />
                                                                        {/* <Image source={{ uri: secUser?.userDetails.image5 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                                    </TouchableOpacity>
                                                                }
                                                                {secUser?.userDetails.image6 &&
                                                                    <TouchableOpacity
                                                                        // onPress={() => setUserProfilePicture({
                                                                        //     ...userProfilePicture,
                                                                        //     enable: true,
                                                                        //     image: secUser?.userDetails.image6
                                                                        // })}
                                                                        onPress={() => openImageViewer(secUser?.userDetails.image6)}

                                                                    >
                                                                        <FastImage
                                                                            style={{
                                                                                width: 250,
                                                                                height: 150,
                                                                                borderRadius: 20,
                                                                                marginRight: 10,
                                                                            }}
                                                                            source={{
                                                                                uri: secUser?.userDetails.image6,
                                                                                headers: { Authorization: 'someAuthToken' },
                                                                                priority: FastImage.priority.normal,
                                                                            }}
                                                                            resizeMode={FastImage.resizeMode.cover}
                                                                        />
                                                                        {/* <Image source={{ uri: secUser?.userDetails.image6 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </ScrollView>


                                                        {/* ImagesArray */}
                                                        <ImageView
                                                            images={secUser?.userDetails?.ImagesArray?.length > 0 ? secUser?.userDetails?.ImagesArray : []}
                                                            imageIndex={0}
                                                            visible={showImageView}
                                                            onRequestClose={() => setShowImageView(false)}
                                                        />
                                                    </View>
                                                    : null}
                                                {secUser?.userDetails?.Interest?.length > 0 &&
                                                    <View>
                                                        <View style={{
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 20,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                            }}>
                                                                <Text style={{ paddingHorizontal: 10, fontSize: 14, fontWeight: 'bold', color: COLORS.black }}>
                                                                    I’m Interested in..
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            flexWrap: 'wrap',
                                                            marginHorizontal: 10,
                                                            alignItems: 'center',
                                                        }}>
                                                            {secUser?.userDetails?.Interest.map((item, index) => (
                                                                <TouchableOpacity key={index} style={{
                                                                    paddingHorizontal: 10,
                                                                    marginRight: 5,
                                                                    paddingVertical: 10,
                                                                    // height: 40,
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    backgroundColor: COLORS.light,
                                                                    borderRadius: 30,
                                                                    marginBottom: 10,
                                                                }}>
                                                                    <View>
                                                                        <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: 'bold' }}>{item}</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            ))}
                                                        </View>
                                                    </View>
                                                }
                                                {/* 
                                            <View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 50,
                                                    justifyContent: 'space-around',
                                                    marginTop: 10,
                                                }}>
                                                    <View style={{
                                                        top: 0,
                                                        padding: 20,
                                                        borderRadius: 30,
                                                        backgroundColor: COLORS.white,
                                                        elevation: 5,

                                                    }}>
                                                        <TouchableOpacity onPress={() => onSwipLeft()}>
                                                            <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{
                                                        padding: 20,
                                                        borderRadius: 40,
                                                        backgroundColor: 'red',
                                                        elevation: 9
                                                    }}>
                                                        <TouchableOpacity onPress={() => onSwipRight(secUser?.userDetails)}>
                                                            <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                                                style={{
                                                                    width: 40,
                                                                    height: 40,
                                                                }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{
                                                        padding: 20,
                                                        top: 0,
                                                        borderRadius: 30,
                                                        backgroundColor: COLORS.white,
                                                        elevation: 5,
                                                    }}>
                                                        <TouchableOpacity onPress={() => onChatBtn(secUser?.userDetails)}>

                                                            <Image source={require('../../assets/message.png')} resizeMode='contain'
                                                                style={{
                                                                    width: 20,
                                                                    height: 20
                                                                }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View> */}

                                                <View style={{
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 20,
                                                }}>
                                                    <View>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: COLORS.black }}>
                                                            Verification
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        marginVertical: 10,
                                                        marginBottom: 0,
                                                    }}>
                                                        <View style={{
                                                            padding: 8,
                                                            backgroundColor: COLORS.main,
                                                            borderRadius: 30,
                                                        }}>
                                                            <Image source={require('../../assets/modal/tick.png')} resizeMode='contain' style={{
                                                                width: 10,
                                                                height: 10,
                                                                tintColor: COLORS.white,
                                                            }} />
                                                        </View>
                                                        <Text style={{ paddingHorizontal: 10, fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>
                                                            {secUser?.userDetails.Name}’s photo-verified
                                                        </Text>
                                                    </View>
                                                </View>

                                            </View>
                                        </ScrollView>
                                        :
                                        <View style={{
                                            height: windowHeight,
                                            backgroundColor: COLORS.white,
                                            justifyContent: 'center'
                                        }}>
                                            {tempLoading ?
                                                <ActivityIndicator size={'large'} color={COLORS.main} animating={tempLoading} />
                                                :
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: COLORS.gray
                                                }}>
                                                    Oop! network error please try again!
                                                </Text>
                                            }
                                            {/* <Loader modal={modal} uploading={modal} /> */}
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
                                                        color: COLORS.gray

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
                                                        color: COLORS.gray
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
                                                        width: '85%',
                                                        color: COLORS.gray
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
                                                        color: COLORS.gray
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
                                        <Text style={{
                                            color: COLORS.gray

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
                    }
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
                        {modalType == 'unmatch' ?
                            <>
                                <Text style={{
                                    fontSize: 16,
                                    // fontWeight: 'bold',
                                    marginBottom: 10,
                                    color: COLORS.black
                                }}>{`Please provide a reason for ${modalType}`}</Text>
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
                                }
                            </>

                            :
                            <>
                                <Text style={{
                                    fontSize: 16,
                                    // fontWeight: 'bold',
                                    marginBottom: 10,
                                    color: COLORS.black
                                }}>{`Please provide a reason for ${modalType}`}</Text>
                                <TextInput
                                    style={{
                                        // height: 40,
                                        // borderColor: 'gray',
                                        // borderWidth: 1,
                                        marginBottom: 10,
                                        paddingHorizontal: 0,
                                        fontSize: 12,
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
                            </>
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




            <Loader uploading={uploading} modal={uploading} />
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
    },
    description: {
        marginBottom: 20,
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
