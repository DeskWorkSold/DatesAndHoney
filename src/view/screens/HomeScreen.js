import { StatusBar, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, Dimensions, Modal, ScrollView, ImageBackground, Alert, PermissionsAndroid, Platform, Button, ToastAndroid, YellowBox, LogBox } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabOne from '../components/HeaderTabOne';
import Swiper from 'react-native-deck-swiper';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { AffiliatePrices, AllUsers, BuyAdditionalPackages, Buypackages, ConciergeSendRequest, DepositAmount, FlakesBill, Myevents, PaymentCards, TicketsAddtoCard, UsersLikedYou, WalletAmount, chatuser, login, removeFromCart, selectAffiliatePrices, selectAllUsers, selectChatuser, selectPackages, selectUser, selectWalletAmount, selectaddToCart } from '../../../redux/reducers/Reducers'
import Notifictaions from '../../view/components/Notifictaions';
// import Slider from '@react-native-community/slider';
import SVGImg from '../../assets/conform.svg';
import SVGImg1 from '../../assets/diamond.svg';
import ImageView from "react-native-image-viewing";
import SVGImg2 from '../../assets/dot.svg';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { getPreciseDistance } from 'geolib';
import GoogleMapKey from '../../consts/GoogleMapKey';
const { height, width } = Dimensions.get('window');
import messaging from '@react-native-firebase/messaging';
import CustomeButton from '../components/CustomeButton';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Status from '../../assets/Status.svg';
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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RNRestart from 'react-native-restart';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import { useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getPurchaseHistory, useIAP } from 'react-native-iap';
import FastImage from 'react-native-fast-image';
import { SendPushNotifyMatch } from '../components/SendPushNotify';

Geocoder.init(GoogleMapKey?.GOOGLE_MAP_KEY); // use a valid API key
// console.log('google api ==> ',GoogleMapKey.GOOGLE_MAP_KEY);

const SliderWrapper = styled.View`
  margin: 0px;
  width: 100%;
  height: 80px;
  justify-content: center;
`

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
  margin-top: 20px;
`
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;`

const LabelText = styled.Text`
  font-size: 12px;
  color:${COLORS.gray}
`

const filteruser = [
    {
        id: 1,
        name: 'Male',
        value: 'Male',
    },
    {
        id: 2,
        name: 'Female',
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
        name: 'Religion',
        image: <Religion width={40} height={40} />,
        array: [
            {
                id: '1',
                name: 'Christian',
                category: 'Relagion',
            },
            {
                id: '2',
                name: 'Jewish',
                category: 'Relagion',
            },
            {
                id: '3',
                name: 'Catholic',
                category: 'Relagion',
            },
            {
                id: '4',
                name: 'Muslim',
                category: 'Relagion',
            },
            {
                id: '5',
                name: 'Hinduism',
                category: 'Relagion',
            },

            {
                id: '6',
                name: 'Buddhism',
                category: 'Relagion',
            },

            {
                id: '7',
                name: 'Chinese traditional religion',
                category: 'Relagion',
            },
            {
                id: '8',
                name: 'Others',
                category: 'Relagion',
            },
        ]
    },
    {
        id: 2,
        name: 'Political Views',
        image: <PoliticalViews width={40} height={40} />,
        array: [
            {
                id: '1',
                name: 'Conservative',
                category: 'PoliticalView',
            },
            {
                id: '2',
                name: 'Liberal',
                category: 'PoliticalView',
            },
            {
                id: '3',
                name: 'Libertarians',
                category: 'PoliticalView',
            },
            {
                id: '4',
                name: 'Non Political',
                category: 'PoliticalView',
            },
            {
                id: '5',
                name: 'Middle of the Road',
                category: 'PoliticalView',
            },
        ]
    },
    {
        id: 3,
        name: 'Ethnicity',
        image: <Ethnicity width={40} height={40} />,
        array: [
            {
                id: '1',
                name: 'Asian',
                category: 'Ethnicity',
            },
            {
                id: '2',
                name: 'East Asian',
                category: 'Ethnicity',
            },
            {
                id: '3',
                name: 'South Asian',
                category: 'Ethnicity',
            },
            {
                id: '4',
                name: 'Southeast Asian',
                category: 'Ethnicity',
            },
            {
                id: '5',
                name: 'Black/African-descent',
                category: 'Ethnicity',
            },
            {
                id: '6',
                name: 'Hispanic/Latino',
                category: 'Ethnicity',
            },
            {
                id: '7',
                name: 'Middle Eastern',
                category: 'Ethnicity',
            },
            {
                id: '8',
                name: 'Indigenous/Aboriginal',
                category: 'Ethnicity',
            },
            {
                id: '9',
                name: 'Pacific Islander',
                category: 'Ethnicity',
            },
            {
                id: '10',
                name: 'Persian',
                category: 'Ethnicity',
            },
            {
                id: '11',
                name: 'White/Caucasian',
                category: 'Ethnicity',
            },
            {
                id: '12',
                name: 'Other ethnicity',
                category: 'Ethnicity',
            },
        ]
    },
    {
        id: 4,
        name: 'Smoke',
        image: <NonSmoker width={40} height={40} />,
        array: [
            {
                id: '1',
                name: 'Never',
                category: 'Smoke',
            },
            {
                id: '2',
                name: 'Sometimes',
                category: 'Smoke',
            },
            {
                id: '3',
                name: 'Socially',
                category: 'Smoke',
            },
            {
                id: '3',
                name: 'Reglarly',
                category: 'Smoke',
            },
            {
                id: '3',
                name: 'Heavily',
                category: 'Smoke',
            },
            {
                id: '3',
                name: 'Prefer not say',
                category: 'Smoke',
            },
        ]
    },
    {
        id: 5,
        name: 'Drink',
        image: <Drinker width={40} height={40} />,
        array: [
            {
                id: '1',
                name: 'Never',
                category: 'Drink',
            },
            {
                id: '2',
                name: 'Sometimes',
                category: 'Drink',
            },
            {
                id: '3',
                name: 'Socially',
                category: 'Drink',
            },
            {
                id: '3',
                name: 'Reglarly',
                category: 'Drink',
            },
            {
                id: '3',
                name: 'Heavily',
                category: 'Drink',
            },
            {
                id: '3',
                name: 'Prefer not say',
                category: 'Drink',
            },
        ]
    },
    // {
    //     id: 1,
    //     name: 'Single',
    //     image: <Status width={40} height={40} />
    // },
    {
        id: 6,
        name: 'Kids',
        image: <Kids width={40} height={40} />,
        array: [
            {
                id: '1',
                name: 'I want children',
                category: 'Kids',
            },
            {
                id: '2',
                name: 'I have children',
                category: 'Kids',
            },
            {
                id: '3',
                name: 'Have kids, open to having more',
                category: 'Kids',
            },
            {
                id: '4',
                name: 'I dont ever want children',
                category: 'Kids',
            },
            {
                id: '5',
                name: 'I want to adopt children',
                category: 'Kids',
            },
        ]
    },
    // {
    //     id: 5,
    //     name: 'Pets',
    //     image: <Pets width={40} height={40} />
    // },
    {
        id: 7,
        name: 'Relationship',
        image: <Orientation width={40} height={40} />,
        array: [
            {
                id: '1',
                name: 'Platonic Relationship',
                category: 'RelationshipType',
            },
            {
                id: '2',
                name: 'Polyamorous',
                category: 'RelationshipType',
            },
            {
                id: '3',
                name: 'Monogamous',
                category: 'RelationshipType',
            },
            {
                id: '4',
                name: 'Open relationship',
                category: 'RelationshipType',
            },
            {
                id: '5',
                name: 'One night stand',
                category: 'RelationshipType',
            },
            {
                id: '6',
                name: 'Regular FWB',
                category: 'RelationshipType',
            },
            {
                id: '7',
                name: 'Life partner',
                category: 'RelationshipType',
            },
            {
                id: '8',
                name: 'Short term Relationship',
                category: 'RelationshipType',
            },
            {
                id: '9',
                name: 'Long term Relationship',
                category: 'RelationshipType',
            },
        ]
    },
    {
        id: 8,
        name: 'Language',
        image: <Language width={40} height={40} />,
        array: [
            {
                id: '1',
                name: 'English',
                category: 'languages',
            },
            {
                id: '2',
                name: 'Spanish',
                category: 'languages',
            },
            {
                id: '3',
                name: 'French',
                category: 'languages',
            },
            {
                id: '4',
                name: 'German',
                category: 'languages',
            },
            {
                id: '5',
                name: 'Italian',
                category: 'languages',
            },
            {
                id: '6',
                name: 'Chinese',
                category: 'languages',
            },
            {
                id: '7',
                name: 'Japanese',
                category: 'languages',
            },
            {
                id: '8',
                name: 'Korean',
                category: 'languages',
            },
            {
                id: '9',
                name: 'Russian',
                category: 'languages',
            },
            {
                id: '10',
                name: 'Portuguese',
                category: 'languages',
            },
            {
                id: '11',
                name: 'Hindi',
                category: 'languages',
            },
            {
                id: '12',
                name: 'Arabic',
                category: 'languages',
            },
            {
                id: '13',
                name: 'Bengali',
                category: 'languages',
            },
            {
                id: '14',
                name: 'Punjabi',
                category: 'languages',
            },
            {
                id: '15',
                name: 'Urdu',
                category: 'languages',
            },
            {
                id: '16',
                name: 'Turkish',
                category: 'languages',
            },
            {
                id: '17',
                name: 'Persian',
                category: 'languages',
            },
            {
                id: '18',
                name: 'Vietnamese',
                category: 'languages',
            },
            {
                id: '19',
                name: 'Thai',
                category: 'languages',
            },
            {
                id: '20',
                name: 'Indonesian',
                category: 'languages',
            },
            {
                id: '21',
                name: 'Malay',
                category: 'languages',
            },
            {
                id: '22',
                name: 'Tagalog',
                category: 'languages',
            },
            {
                id: '23',
                name: 'Tamil',
                category: 'languages',
            },
            {
                id: '24',
                name: 'Telugu',
                category: 'languages',
            },
            {
                id: '25',
                name: 'Marathi',
                category: 'languages',
            },
            {
                id: '26',
                name: 'Gujarati',
                category: 'languages',
            },
            {
                id: '27',
                name: 'Kannada',
                category: 'languages',
            },
            {
                id: '28',
                name: 'Malayalam',
                category: 'languages',
            },
            {
                id: '29',
                name: 'Sinhala',
                category: 'languages',
            },
            {
                id: '30',
                name: 'Polish',
                category: 'languages',
            },
            {
                id: '31',
                name: 'Ukrainian',
                category: 'languages',
            },
            {
                id: '32',
                name: 'Romanian',
                category: 'languages',
            },
            {
                id: '33',
                name: 'Dutch',
                category: 'languages',
            },
            {
                id: '34',
                name: 'Greek',
                category: 'languages',
            },
            {
                id: '35',
                name: 'Swedish',
                category: 'languages',
            },
            {
                id: '36',
                name: 'Danish',
                category: 'languages',
            },
            {
                id: '37',
                name: 'Finnish',
                category: 'languages',
            },
            {
                id: '38',
                name: 'Norwegian',
                category: 'languages',
            },
            {
                id: '39',
                name: 'Hungarian',
                category: 'languages',
            },
            {
                id: '40',
                name: 'Czech',
                category: 'languages',
            },
            {
                id: '41',
                name: 'Slovak',
                category: 'languages',
            },
            {
                id: '42',
                name: 'Bulgarian',
                category: 'languages',
            },
            {
                id: '43',
                name: 'Serbian',
                category: 'languages',
            },
            {
                id: '44',
                name: 'Croatian',
                category: 'languages',
            },
            {
                id: '45',
                name: 'Slovenian',
                category: 'languages',
            },
            {
                id: '46',
                name: 'Hebrew',
                category: 'languages',
            },
            {
                id: '47',
                name: 'Icelandic',
                category: 'languages',
            },
        ]
    },
    {
        id: 9,
        name: 'Height',
        image: <Height width={40} height={40} />,
        array: []
    },
    {
        id: 10,
        name: 'Education',
        image: <Education width={40} height={40} />,
        array: [
            {
                id: '1',
                name: 'High School',
                category: 'Education',
            },
            {
                id: '2',
                name: 'Some Collage',
                category: 'Education',
            },
            {
                id: '3',
                name: 'Bachelors',
                category: 'Education',
            },
            {
                id: '4',
                name: 'Master',
                category: 'Education',
            },
            {
                id: '5',
                name: 'Trade School',
                category: 'Education',
            },
            {
                id: '6',
                name: 'Graduation',
                category: 'Education',
            },
            {
                id: '7',
                name: 'Other',
                category: 'Education',
            },
            {
                id: '8',
                name: 'Prefer not say',
                category: 'Education',
            }
        ]
    },
    // {
    //     id: 9,
    //     name: 'Personality',
    //     image: <Personality width={40} height={40} />
    // },

    // {
    //     id: 13,
    //     name: 'Any Disability',
    //     image: <PoliticalViews width={40} height={40} />
    // },
    {
        id: 11,
        name: 'Body Type',
        image: <BodyType width={40} height={40} />,
        array: [
            {
                id: '1',
                name: 'Athletic/Fit',
                category: 'BuildType',
            },
            {
                id: '2',
                name: 'BBW',
                category: 'BuildType',
            },
            {
                id: '3',
                name: 'Mascular',
                category: 'BuildType',
            },
            {
                id: '4',
                name: 'Slender',
                category: 'BuildType',
            },
            {
                id: '5',
                name: 'Petite',
                category: 'BuildType',
            }
        ]
    },
    // {
    //     id: 15,
    //     name: 'Music',
    //     image: <Music width={40} height={40} />
    // },
    {
        id: 12,
        name: 'Favourite Food',
        image: <FavoriteFood width={40} height={40} />,
        array: [
            {
                id: '1',
                name: '#Sushi',
                category: 'FavFood',
            },
            {
                id: '2',
                name: '#Foodie i love Everything',
                category: 'FavFood',
            },
            {
                id: '3',
                name: '#Italian',
                category: 'FavFood',
            },
            {
                id: '4',
                name: '#Japanese',
                category: 'FavFood',
            },
            {
                id: '5',
                name: '#Mitterrandian',
                category: 'FavFood',
            },
            {
                id: '6',
                name: '#I love trying new food',
                category: 'FavFood',
            },
            {
                id: '7',
                name: '#I hate trying new food',
                category: 'FavFood',
            },
            {
                id: '8',
                name: '#I like simple bland food',
                category: 'FavFood',
            }
        ]
    },
    {
        id: 13,
        name: 'Exercise',
        image: <Exercise width={40} height={40} />,
        array: [
            {
                id: '1',
                name: '1 twice week',
                category: 'Exercise',
            },
            {
                id: '2',
                name: 'Once a week',
                category: 'Exercise',
            },
            {
                id: '3',
                name: 'Every other day',
                category: 'Exercise',
            },
            {
                id: '4',
                name: 'Daily',
                category: 'Exercise',
            },
            {
                id: '5',
                name: 'Barely',
                category: 'Exercise',
            },
            {
                id: '6',
                name: 'Not at all',
                category: 'Exercise',
            },
        ]
    },
]

function StatusCard({ text }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: COLORS.black }}>{text}</Text>
        </View>
    );
};

function RenderModal({ data }) {
    // console.log(data);
    // return (
    //   <View style={styles.cardsText}>
    //     <Text>{data.name}</Text>
    //   </View>
    // );
};

const HomeScreen = ({ navigation }) => {
    const [initialRender, setInitialRender] = useState(false);
    const [swiper, setSwiper] = useState(null);
    const [users, setUsers] = useState();
    const walletAmount = useSelector(selectWalletAmount);
    const AFPrices = useSelector(selectAffiliatePrices)
    const AddToCard = useSelector(selectaddToCart)
    const [usersBackUp, setUsersBackUp] = useState();
    const [multiSliderValue, setMultiSliderValue] = useState([18, 100])
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState();
    const [modalData, setModalData] = useState();
    const [modalDataUid, setModalDataUid] = useState();
    const [swapLeft, setSwapLeft] = useState([]);
    const [swipedAllCards, setswipedAllCards] = useState(false);
    const [swipeDirection, setswipeDirection] = useState('');
    const [cardIndex, setcardIndex] = useState(0);
    const [distance, setDistance] = useState(0);
    const [ChatUserId, setChatUserId] = useState();
    const focus = useIsFocused()
    const [ChatUserDetail, setChatUserDetail] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [recentMessage, setRecentMessage] = useState([]);
    const [unreadMessage, setUnreadMessage] = useState([]);
    const [actionTrigger, setActionTrigger] = useState([]);
    const [refferalInput, setRefferalInput] = useState(null);
    const [refferalInputError, setRefferalInputError] = useState(false);
    const [updatePackagesStatus, setUpdatePackagesStatus] = useState(false);
    // const [unreadMessage, setUnreadMessage] = useState([]);
    const user = useSelector(selectUser);
    // console.log(user?.Gender);
    const userPackage = useSelector(selectPackages);
    const CurrentUser = auth()?.currentUser?.uid;
    const chatUser = useSelector(selectChatuser);
    const dispatch = useDispatch();
    const Tabnavigation = useNavigation(); // Access the navigation object
    const [showPoppup, setShowPoppup] = useState(false);
    const [showPoppupDetial, setShowPoppupDetail] = useState(null);
    const [swipeCount, setSwipeCount] = useState(0);
    const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);
    const [filterAdvanceData, setFilterAdvanceData] = useState(filterAdvance);
    const [filterAdvanceIndex, setFilterAdvanceIndex] = useState({
        enable: false,
        index: null,
    });
    const [selectMinMaxAge, setSelectMinMaxAge] = useState('minage');
    const [selectMinMaxHieght, setSelectMinMaxHieght] = useState('min');
    const [minimumAge, setminimumAgeRange] = useState(0);
    const [maximumAge, setmaximumAgeRange] = useState(0);
    // const [distance, setDistance] = useState(0);
    const [FilterModaldata, setFilterModaldata] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [modal, setModal] = useState({
        enable: false,
        title: null,
        description: null,
        type: false
    });
    const [selectGender, setSelectGender] = useState(null);
    const [disableLeftSwipe, setdisableLeftSwipe] = useState(false);
    const [disableRightSwipe, setdisableRightSwipe] = useState(false);
    const [selectedAdvFilter, setSelectedAdvFilter] = useState({
        PoliticalView: null,
        Relagion: null,
        Ethnicity: null,
        Smoke: null,
        Drink: null,
        Kids: null,
        RelationshipType: null,
        languages: null,
        MinHieght: null,
        MaxHieght: null,
        Education: null,
        BuildType: null,
        FavFood: null,
        Exercise: null,
    });
    const [userProfilePicture, setUserProfilePicture] = useState({
        enable: false,
        image: null
    })


    const multiSliderValuesChange = (values) => {
        if (values[0] < 18) {
            // If so, set the value of the first marker to 17 and keep the second marker unchanged
            setMultiSliderValue([18, values[1]]);
        } else {
            // Otherwise, update the slider's values normally
            setMultiSliderValue(values);
        }
    }
    const alluser = useSelector(selectAllUsers)
    // console.log('=====================>', selectGender);

    // const ByMemeberShips = (item) => {
    //     var Data = new Object();
    //     Data.discountPercentage = item.discountPercentage;
    //     Data.discountPrice = item.discountPrice;
    //     Data.id = item.id;
    //     Data.name = item.name;
    //     Data.numberOfCards = item.numberOfCards;
    //     Data.numberOfChats = item.numberOfChats;
    //     Data.otherCategory = item.otherCategory;
    //     Data.rate = item.rate;
    //     Data.status = item.status;
    //     Data.description = item.description;
    //     // console.log('test data: ', Data);
    //     dispatch(packages(Data))
    //     // console.log(MembershipName);
    //     // console.log(item.id);
    //     const MembershipName = item.otherCategory.split(' ')[0]
    //     const useRef = firestore().collection('Users')
    //         .doc(CurrentUser)
    //     useRef.update({
    //         'userDetails.AccountType': MembershipName,
    //         'userDetails.PackageId': item.id,
    //     }).then(() => {
    //         setBuyPack(true)
    //         // console.log('Notices send!');
    //     });
    // }
    // const fetchMemberships = async () => {
    //     setUploading(true)
    //     try {
    //         // console.log('hello');
    //         await firestore()
    //             .collection('Package')
    //             .get()
    //             .then(querySnapshot => {
    //                 // console.log('Total user: ', querySnapshot.size);
    //                 const membership = [];
    //                 const membershipsuid = [];
    //                 querySnapshot.forEach((documentSnapshot) => {
    //                     // console.log('memberships ID: ', documentSnapshot.id, documentSnapshot.data());
    //                     membership.push(documentSnapshot.data());
    //                     membershipsuid.push(documentSnapshot.id);
    //                 });
    //                 setMemberships(membership)
    //                 setMembershipUid(membershipsuid)
    //             })
    //         // console.log('membershipData: ', memberships);

    //     } catch (e) {
    //         console.log(e);
    //     }
    //     setUploading(false)
    // };

    const OnCancleFilter = () => {
        setShowPoppup(false);
        setShowPoppupDetail(null)
        setUsers(alluser)
    }

    const isValidFilters = (filterMinAge, filterMaxAge, filterDistance, selectGender) => {
        if (!selectGender) {
            ToastAndroid.show("Please select the gender you're looking for!", ToastAndroid.SHORT);
            return false;
        }

        if (filterMinAge < 18) {
            ToastAndroid.show("Minimum age must be at least 18 years!", ToastAndroid.SHORT);
            return false;
        }

        if (filterMaxAge <= 18) {
            ToastAndroid.show("Maximum age must be greater than 18 years!", ToastAndroid.SHORT);
            return false;
        }

        if (filterDistance < 20) {
            ToastAndroid.show("Distance must be at least 20 miles!", ToastAndroid.SHORT);
            return false;
        }

        return true;
    }


    const getFilterValues = () => {
        const filterMinAge = multiSliderValue[0];
        const filterMaxAge = multiSliderValue[1];
        const filterDistance = Math.floor(distance * 500);
        const Gender = selectGender; // Assuming this value is already defined

        return { filterMinAge, filterMaxAge, filterDistance, Gender };
    }

    const isFilterCategory = (category) => {
        const validCategories = ['Relagion', 'PoliticalView', 'Ethnicity', 'Smoke', 'Drink', 'Kids', 'RelationshipType', 'languages', 'Education', 'BuildType', 'FavFood', 'Exercise'];
        return validCategories.includes(category);
    }

    const getSelectedValues = () => {
        const selectedValues = {};
        let update
        const selectedObject = filterAdvanceData?.flatMap((item) => {
            const selectedSubItems = item.array.filter((subitem) => {
                return subitem.selected && isFilterCategory(subitem.category);
            });

            // console.log(selectedSubItems , '[[[');
            if (selectedSubItems.length > 1) {
                selectedValues[selectedSubItems[0].category] = selectedSubItems.map(subitem => subitem.name);
            } else if (selectedSubItems.length === 1) {
                // If only one item is selected, store it as a string (like before)
                selectedValues[selectedSubItems[0].category] = selectedSubItems[0].name;
            }

            return selectedSubItems;
            // return item.array.filter((subitem) => {
            //     if (subitem.selected && isFilterCategory(subitem.category)) {
            //         selectedValues[subitem.category] = subitem.name;
            //         return true;
            //     }
            //     return false;
            // });
        });

        // Check if MinHeight and MaxHeight are selected
        if (selectedAdvFilter.MinHieght > 1 && selectedAdvFilter.MaxHieght > 1) {
            update = {
                ...selectedValues,
                MinHeight: selectedAdvFilter.MinHieght,
                MaxHieght: selectedAdvFilter.MaxHieght,
            }
        }
        else {
            update = {
                ...selectedValues,
            }
        }
        // Check if any filter is selected
        // const anyFilterSelected = selectedObject.length > 0;


        return { selectedValues, selectedObject, update };
    }

    const filterUsers = (filterMinAge, filterMaxAge, filterDistance, selectGender) => {
        return usersBackUp?.filter((e) => {
            const userDetails = e?.userDetails;
            return (
                (selectGender == 'Both' || userDetails?.Gender == selectGender) &&
                userDetails?.years >= filterMinAge &&
                userDetails?.years <= filterMaxAge &&
                userDetails?.distance <= filterDistance
            );
        });
    }

    const ApplyFilter = async () => {
        // const filterMinAge = multiSliderValue[0]
        // const filterMaxAge = multiSliderValue[1]
        // const filterDistance = Math.floor(distance * 5000)
        const { filterMinAge, filterMaxAge, filterDistance, Gender } = getFilterValues();
        // console.log(filterDistance);
        // return
        if (!isValidFilters(filterMinAge, filterMaxAge, filterDistance, selectGender)) {
            return;
        }

        else {
            // console.log('hello');
            // const tempSelectedValues = {};

            // const selectedObject = filterAdvanceData?.flatMap((item) =>
            //     item.array.filter((subitem, i) => {
            //         if (subitem.selected === true) {
            //             if (
            //                 subitem?.category == 'Relagion' ||
            //                 subitem?.category == 'PoliticalView' ||
            //                 subitem?.category == 'Ethnicity' ||
            //                 subitem?.category == 'Smoke' ||
            //                 subitem?.category == 'Drink' ||
            //                 subitem?.category == 'Kids' ||
            //                 subitem?.category == 'RelationshipType' ||
            //                 subitem?.category == 'languages' ||
            //                 subitem?.category == 'Education' ||
            //                 subitem?.category == 'BuildType' ||
            //                 subitem?.category == 'FavFood' ||
            //                 subitem?.category == 'Exercise'
            //             ) {
            //                 // tempSelectedValues[subitem?.category] = subitem?.name;
            //                 return true
            //             }
            //             else {
            //                 return true
            //             }
            //         }
            //     })
            // );
            const { selectedValues, selectedObject, update } = await getSelectedValues();
            // console.log(selectedObject, selectedObject?.length > 0 || Object?.keys(update)?.length > 0, 'hellooo');
            // return
            if (selectedObject?.length > 0 || Object?.keys(update)?.length > 0) {
                // console.log('advance filter');  
                // let update;
                // if (selectedAdvFilter.MinHieght > 1 && selectedAdvFilter.MaxHieght > 1) {
                //     update = {
                //         ...selectedValues,
                //         MinHeight: selectedAdvFilter.MinHieght,
                //         MaxHieght: selectedAdvFilter.MaxHieght,
                //     }
                // }
                // else {
                //     update = {
                //         ...selectedValues,
                //     }
                // }
                setSelectedAdvFilter(update);
                const data = await filterUsers(filterMinAge, filterMaxAge, filterDistance, selectGender);

                // console.log(update);
                // return
                let filter
                let allUsers = []
                const filteredUsers = data?.filter((user) => {
                    const userDetails = user?.userDetails;
                    filter = [{ ...update }]
                    return filter.every((e) => {
                        return (
                            (e?.Relagion == null || e?.Relagion?.includes(userDetails?.Relagion)) &&
                            (e?.PoliticalView == null || userDetails?.PoliticalView == e?.PoliticalView) &&
                            (e?.Ethnicity == null || userDetails?.Ethnicity == e?.Ethnicity) &&
                            (e?.Smoke == null || userDetails?.Smoke == e?.Smoke) &&
                            (e?.Drink == null || userDetails?.Drink == e?.Drink) &&
                            (e?.Kids == null || userDetails?.Kids == e?.Kids) &&
                            (e?.RelationshipType == null || userDetails?.RelationshipType?.includes(e?.RelationshipType)) &&
                            (e?.languages == null || userDetails?.languages?.includes(e?.languages)) &&
                            (e?.MinHieght == null || userDetails?.Hieght >= e?.MinHieght) &&
                            (e?.MaxHieght == null || userDetails?.Hieght <= e?.MaxHieght) &&
                            (e?.Education == null || userDetails?.Education == e?.Education) &&
                            (e?.BuildType == null || userDetails?.BuildType == e?.BuildType) &&
                            (e?.FavFood == null || userDetails?.FavFood?.includes(e?.FavFood)) &&
                            (e?.Exercise == null || userDetails?.Exercise == e?.Exercise)
                            // e?.PoliticalView && (e?.PoliticalView == user?.userDetails?.PoliticalView)
                        );
                    });

                });

                // console.log(filteredUsers, filter);
                // return
                const newadvfriends = await AdvPotentialFriends(filteredUsers, selectGender)
                const sorting = newadvfriends?.length > 0 ? newadvfriends.sort((a, b) => a?.userDetails?.distance - b?.userDetails?.distance) : newadvfriends;
                // console.log(allUsers, "user")
                // return
                setUsers(sorting)
                setShowPoppup(false);
                setShowPoppupDetail(null)
            }
            else {
                const data = await filterUsers(filterMinAge, filterMaxAge, filterDistance, selectGender);

                const newadvfriends = await AdvPotentialFriends(data, selectGender)
                const sorting = newadvfriends?.length > 0 ? newadvfriends.sort((a, b) => a?.userDetails?.distance - b?.userDetails?.distance) : newadvfriends;

                console.log('new adv friends  :', sorting);
                // return
                setUsers(sorting)
                setShowPoppup(false);
                setShowPoppupDetail(null)
            }
            // console.log(selectedAdvFilter);
            // return
            // if (selectedObject?.length > 0) {
            //     // const updatedUsers = await Promise.all(allUsers);
            //     // console.log('filteredUsers:', updatedUsers.length, users?.length);
            // }
            // else {
            //     if (users?.length > 0) {
            //         return
            //         setUsers(
            //             users?.filter((e, i) => {
            //                 if (
            //                     e?.userDetails?.Gender === selectGender &&
            //                     e?.userDetails?.years >= filterMinAge &&
            //                     e?.userDetails?.years <= filterMaxAge &&
            //                     e?.userDetails?.distance >= filterDistance
            //                 ) {
            //                     return true;
            //                 }
            //                 return false;
            //             })
            //         )
            //         OnCancleFilter();

            //         console.log(users);
            //     }
            //     // setUsers(users?.length > 0 &&
            //     //     users.map((e, i) => {
            //     //         console.log(e);
            //     //     })
            //     // )
            // }
            // // console.log(
            // //     // filterAdvance,
            // //     selectGender,
            // //     filterMinAge,
            // //     filterMaxAge,
            // //     filterDistance,
            // //     selectedObject,
            // //     // find
            // //     //   updatedArray
            // //     // FilterModaldata
            // // )

            // return
            // // setUploading(true)
            // // const userRef = await firestore().collection('Users')
            // //     .doc(user.uid)
            // // userRef.update({
            // //     'userDetails.filterMinAge': filterMinAge,
            // //     'userDetails.filterGender': filterGender.value,
            // //     'userDetails.filterDistance': filterDistance,
            // //     'userDetails.filterMaxAge': filterMaxAge,
            // //     'userDetails.filterAdvance': FilterModaldata?.length > 0 ? FilterModaldata?.map(({ id, name }) => ({ id, name })) : [],
            // // }).then(() => {
            // //     setShowFilter(false);
            // //     // console.log('filter updated');
            // //     ToastAndroid.show('Filter applied!', ToastAndroid.SHORT);
            // //     setUploading(false);
            // //     OnCancleFilter();
            // // })
        }
    }

    const AdvPotentialFriends = (allProfiles, selectGender) => {
        // const userMainGender = 'Male';
        const userMainGender = user.Gender;
        // const userSubGender = 'Straight';
        const userSubGender = user.GenderDetial;
        // console.log(selectGender);
        return allProfiles.filter(profile => {
            if (userMainGender === 'Male') {
                if (userSubGender === 'Bisexual') {
                    return (selectGender == 'Both' && (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'))) || (selectGender == 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (selectGender == 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'));
                } else if (userSubGender === 'Straight') {
                    return (selectGender == 'Both' && (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'))) || (selectGender == 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (selectGender == 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'));
                } else if (userSubGender === 'Gay') {
                    return (selectGender == 'Both' && (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'))) || (selectGender == 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (selectGender == 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'));
                }
            } else if (userMainGender === 'Female') {
                if (userSubGender === 'Bisexual') {
                    return (selectGender == 'Both' && (selectGender == 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (selectGender == 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'))) || (selectGender == 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (selectGender == 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'));
                } else if (userSubGender === 'Straight') {
                    return (selectGender == 'Both' && (selectGender == 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (selectGender == 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'))) || (selectGender == 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (selectGender == 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'));
                } else if (userSubGender === 'Gay') {
                    return (selectGender == 'Both' && (selectGender == 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (selectGender == 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'))) || (selectGender == 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight')) || (selectGender == 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Gay'));
                }
            } else if (userMainGender === 'Non binary') {
                return (selectGender == 'Both' && (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay'))) || (selectGender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay')) || (selectGender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay'));
                // if (userSubGender === 'Straight') {
                //     return (selectGender == 'Both' && (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay'))) || (selectGender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay')) || (selectGender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay'));
                // } else if (userSubGender === 'Bisexual') {
                //     return (selectGender == 'Both' && (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay'))) || (selectGender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay')) || (selectGender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay'));
                // } else if (userSubGender === 'Gay') {
                //     return (selectGender == 'Both' && (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay'))) || (selectGender === 'Male' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay')) || (selectGender === 'Female' && (profile?.userDetails?.GenderDetial === 'Bisexual' || profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Gay'));
                // }
            } else if (userMainGender === 'Trans Male to Female') {
                return (selectGender == 'Both' && (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial !== 'Straight')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial !== 'Straight'))) || (selectGender === 'Male' && profile?.userDetails?.GenderDetial !== 'Straight') || (selectGender === 'Female' && profile?.userDetails?.GenderDetial !== 'Straight') || false;
            } else if (userMainGender === 'Trans Female to Male') {
                return (selectGender == 'Both' && (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial !== 'Straight')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial !== 'Straight'))) || (selectGender === 'Male' && profile?.userDetails?.GenderDetial !== 'Straight') || (selectGender === 'Female' && profile?.userDetails?.GenderDetial !== 'Straight') || false;
            }
            return false;
        });
    }

    const onCheckFilteration = () => {
        if (!user?.PackageId) {
            // console.log(!user?.PackageId, 'if');
            // return
            setFilterAdvanceData(filterAdvanceData.map((item, index) => {
                if (index < 1) {
                    return {
                        ...item,
                        open: true, // Set 'open' to true for the first two elements, and false for the rest
                    };
                }
                else {
                    return {
                        ...item,
                        open: false
                    }
                }
            }));
        }
        else if (user?.PackageId == 123) {
            // console.log(user?.PackageId == 123, 'else if');
            // return
            setFilterAdvanceData(filterAdvanceData.map((item, index) => {
                if (index < 2) {
                    return {
                        ...item,
                        open: true, // Set 'open' to true for the first two elements, and false for the rest
                    };
                }
                else {
                    return {
                        ...item,
                        open: false
                    }
                }
            }));
        }
        else if (user?.PackageId > 123) {
            // console.log(!user?.PackageId , 'else');
            // return
            setFilterAdvanceData(filterAdvanceData.map((item, index) => {
                return {
                    ...item,
                    open: true, // Set 'open' to true for the first two elements, and false for the rest
                };
            }));
        }
    }

    const onSelectFilterMain = (item, index) => {
        // console.log(item);
        const selectedObjects = filterAdvanceData.filter((item) => item.selected === true);

        // return
        if (item?.open && (selectedObjects?.length < 3 || selectedObjects?.some(res => res.id == item.id))) {
            if (filterAdvanceIndex?.index == index) {
                setFilterAdvanceIndex({ ...filterAdvanceIndex, enable: !filterAdvanceIndex.enable, index: index })
                return
            }
            setFilterAdvanceIndex({ ...filterAdvanceIndex, index: index })
            setSelectedAdvFilter({ ...selectedAdvFilter, MinHieght: null, MaxHieght: null })
            // console.log(item);
            // return
            let myItem = item?.array?.map((e, i) => {
                return {
                    ...e,
                    selected: false
                }
            })
            setFilterAdvanceData(filterAdvanceData && filterAdvanceData.length > 0 && filterAdvanceData?.map((e, i) => {
                if (e.id == item.id) {
                    return {
                        ...e,
                        selected: false,
                        array: myItem,
                    }
                } else {
                    return e
                }
            }))
        }
        else {
            if (!user?.PackageId) {
                ToastAndroid.show('You need to buy a Membership packages before applay any advance filter!', ToastAndroid.SHORT);
            }
            else if (user?.PackageId == 123) {
                ToastAndroid.show('You need to buy a Gold package before applay more then two advance filter!', ToastAndroid.SHORT);
            }
            else if (selectedObjects?.length < 3 || selectedObjects?.some(res => res.id != item.id)) {
                Toast.show('You can use 3 advance filter at a time (use the ones most important)', Toast.SHORT);
                // setFilterAdvanceIndex({ ...filterAdvanceIndex, enable: false })
                return
            }
        }
    }

    const handleSelectionRelagion = (item2, item) => {
        let myItem = item.array.map((e, i) => {
            if (e.id == item2.id) {
                return {
                    ...e,
                    selected: e?.selected ? false : true
                }
            }
            return e;
            // else {
            //     return {
            //         ...e,
            //         selected: false
            //     }
            // }
        })
        const filter = myItem.filter(res => res?.selected)
        // console.log(filter?.length);
        if (filter?.length == 0) {
            setFilterAdvanceData(filterAdvanceData && filterAdvanceData.length > 0 && filterAdvanceData?.map((e, i) => {
                if (e.id == item.id) {
                    return {
                        ...e,
                        array: myItem,
                        selected: false
                    }
                } else {
                    return e
                }
            }))
            setFilterAdvanceIndex({ ...filterAdvanceIndex, enable: false, index: null })
            // setFilterAdvanceIndex({ ...filterAdvanceIndex, enable: !filterAdvanceIndex.enable, index: index })
        }
        else {
            setFilterAdvanceData(filterAdvanceData && filterAdvanceData.length > 0 && filterAdvanceData?.map((e, i) => {
                if (e.id == item.id) {
                    return {
                        ...e,
                        array: myItem,
                        selected: true
                    }
                } else {
                    return e
                }
            }))
        }
    };
    const handleSelection = (item2, item) => {
        let myItem = item.array.map((e, i) => {
            if (e.id == item2.id) {
                return {
                    ...e,
                    selected: e?.selected ? false : true
                }
            }
            // return e;
            else {
                return {
                    ...e,
                    selected: false
                }
            }
        })
        // console.log(myItem);
        const filter = myItem?.filter(res => res?.selected)
        // console.log(filter?.length);
        if (filter?.length == 0) {
            setFilterAdvanceData(filterAdvanceData && filterAdvanceData.length > 0 && filterAdvanceData?.map((e, i) => {
                if (e.id == item.id) {
                    return {
                        ...e,
                        array: myItem,
                        selected: false
                    }
                } else {
                    return e
                }
            }))
            setFilterAdvanceIndex({ ...filterAdvanceIndex, enable: false, index: null })
            // setFilterAdvanceIndex({ ...filterAdvanceIndex, enable: !filterAdvanceIndex.enable, index: index })
        }
        else {
            setFilterAdvanceData(filterAdvanceData && filterAdvanceData.length > 0 && filterAdvanceData?.map((e, i) => {
                if (e.id == item.id) {
                    return {
                        ...e,
                        array: myItem,
                        selected: true
                    }
                } else {
                    return e
                }
            }))
        }
    };

    const SelectedAdvanceFilterHeight = () => {
        // const LessHeight = (selectedAdvFilter.MinHieght * 100).toFixed(0);
        // const MaxHeight = (selectedAdvFilter.MaxHieght * 100).toFixed(1);
        // console.log(LessHeight,MaxHeight );
        // return
        const selectedObjects = filterAdvanceData.filter((item) => item.selected === true);
        if (selectedObjects?.length < 3) {
            if (selectedAdvFilter.MinHieght > 1 && selectedAdvFilter.MinHieght < selectedAdvFilter.MaxHieght && selectedAdvFilter.MaxHieght < 15) {
                setFilterAdvanceData(filterAdvanceData && filterAdvanceData.length > 0 && filterAdvanceData?.map((e, i) => {
                    if (e.id == 9) {
                        return {
                            ...e,
                            selected: true
                        }
                    } else {
                        return e
                    }
                }))
                setFilterAdvanceIndex({ ...filterAdvanceIndex, enable: false, index: null })
            }
            else {
                if (selectedAdvFilter.MinHieght > selectedAdvFilter.MaxHieght) {
                    ToastAndroid.show('Selected min height must be less then max height', ToastAndroid.SHORT);
                }
                else if (selectedAdvFilter.MinHieght < 1 || selectedAdvFilter.MaxHieght > 15) {
                    ToastAndroid.show('Selected height must be in between 1 to 15 feets', ToastAndroid.SHORT);
                }
            }
        }
        else {
            ToastAndroid.show('Use only 3 filters ones most important to you !', ToastAndroid.SHORT);
        }
    }

    const SelectedAdvanceFilter = (item2, item) => {
        const selectedObjects = filterAdvanceData.filter((item) => item.selected === true);
        // console.log(selectedObjects.length);
        // if (selectedObjects?.length < 3) {
        if (item.id == 1) {
            handleSelectionRelagion(item2, item);
        }
        if (item.id != 1) {
            handleSelection(item2, item);
        }
        // setFilterAdvanceIndex({ ...filterAdvanceIndex, enable: false, index: null })
        // }
        // else {
        //     ToastAndroid.show('Use only 3 filters ones most important to you !', ToastAndroid.SHORT);
        // }
        // return
        // // console.log(user?.PackageId);
        // if (user?.PackageId == 654) {
        //     handleSelection(update);
        //     setSelectedAdvFilter({ ...selectedAdvFilter, PoliticalView: item2?.name })
        //     // setFilterAdvanceIndex({ ...filterAdvanceIndex, enable: false, index: null })
        // }
        // else if (filterAdvanceData?.length < 3) {
        //     handleSelection(update);
        //     setSelectedAdvFilter({ ...selectedAdvFilter, PoliticalView: item2?.name })
        //     // setFilterAdvanceIndex({ ...filterAdvanceIndex, enable: false, index: null })
        // }
    };

    // console.log(filterAdvanceData, "<===FilteradvanceDdata")


    const fetchUsersUid = async () => {
        if (CurrentUser) {
            try {
                const ref = firestore().collection('Users')
                    .doc(CurrentUser)
                const userRef = await ref?.get()
                if (userRef?.exists) {
                    // console.log('doc exists: ', querySnap.data());
                    if (!userRef.data()?.PrivateChat) {
                        // console.log('private chats not found');
                        // console.log('private chat here');
                    } else {
                        const ChatUid = []
                        userRef.data()?.PrivateChat.map(chats => {
                            // console.log('total chats here', chats.ChatuserDetails.uid);
                            ChatUid.push(chats.ChatuserDetails.uid)
                        })
                        console.log('===============================================>', ChatUid.reverse());
                        setChatUserId(ChatUid.reverse())
                    }
                }
            } catch (e) {
                console.log(e, 'fetchUsersUid');
            }
        }
        else {
            dispatch(chatuser(null))
            setChatUserDetail(null)
        }
    };

    const fetchLockUser = async (ChatUserId) => {
        // console.log('lock user here');
        if (!ChatUserId == '') {
            try {
                const LockedUser = []
                ChatUserId.map(item => {
                    firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                        // console.log('Match User: ', documentSnapshot.data());
                        if (docSnapshot.data()?.PrivateChat) {
                            const UserDetailLock = docSnapshot.data().userDetails.UserLock;
                            // console.log('LockUser: ',userdetails);
                            if (UserDetailLock == true) {
                                docSnapshot.data()?.PrivateChat.map(secUser => {
                                    if (secUser.ChatuserDetails.uid == CurrentUser) {
                                        // console.log('Lockeduser', docSnapshot.data().userDetails);
                                        LockedUser.push(docSnapshot.data().userDetails)
                                    }
                                    else {
                                        console.log('no locked user found');
                                        // LockedUser.push('')
                                    }
                                })
                            }
                            dispatch(chatuser(LockedUser.slice(0, 2)))
                            setChatUserDetail(LockedUser.slice(0, 2))
                        }
                        else {
                            console.log('data not found');
                            setChatUserDetail('')
                        }
                    })
                });
            } catch (e) {
                console.log('fetchLockUser', e);
            }
        } else {
            setChatUserDetail('')
        }
    }

    const fetchMatchUsers = async (ChatUserId) => {
        // console.log('chat id', ChatUserId);
        const Package = user?.PackageId;
        if (!Package == '') {
            if (Package == 123) {
                if (!ChatUserId == '') {
                    // console.log(ChatUserId);
                    try {
                        const MatchedUser = [];

                        // Use Promise.all to wait for all promises to resolve
                        await Promise.all(
                            ChatUserId.map(async (item) => {
                                const docSnapshot = await firestore().collection('Users').doc(item).get();

                                if (docSnapshot.exists && docSnapshot.data()?.PrivateChat) {
                                    // let conciergeUser = null
                                    const conciergeUser = [];
                                    const userData = docSnapshot.data();

                                    for (const secUser of userData.PrivateChat) {
                                        if (secUser.ChatuserDetails.uid === CurrentUser) {

                                            const ref = firestore().collection('Requestes').doc(userData.userDetails.uid);
                                            const documentSnapShot = await ref.get();

                                            if (documentSnapShot.exists) {
                                                const requests = documentSnapShot.data()?.MoreRequestes || [];

                                                const conciergeUsers = await Promise.all(
                                                    requests.map(async (e) => {
                                                        if (e.status && e.type === 'Update') {
                                                            const userSnapshot = await firestore().collection('Users').doc(e.sendby).get();
                                                            if (userSnapshot.exists) {
                                                                const conuser = userSnapshot.data().userDetails;
                                                                return conuser;
                                                            }
                                                        }
                                                        return null;
                                                    })
                                                );

                                                // Filter out null values
                                                const filteredConciergeUsers = conciergeUsers.filter((user) => user !== null);
                                                conciergeUser.push(...filteredConciergeUsers);
                                            }
                                            const dataupdated = {
                                                ...userData.userDetails,
                                                matchtimeStamp: new Date().toString(),
                                                conciergeUser: conciergeUser,
                                            };
                                            MatchedUser.push(dataupdated);
                                        }
                                    }
                                } else {
                                    console.log('Data not found for user:', item);
                                }
                            })
                        );

                        // console.log('====> ', MatchedUser, user?.uid);

                        const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
                        setChatUserDetail(uniqueDataArray.slice(0, 10));
                        dispatch(chatuser(uniqueDataArray.slice(0, 10)));
                    } catch (e) {
                        console.error(e, 'fetchMatchUsers');
                    }
                    // try {
                    //     const MatchedUser = []
                    //     const promises = ChatUserId.map(item => {
                    //         console.log(item);
                    //         return new Promise(resolve => {
                    //             firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                    //                 if (docSnapshot.data()?.PrivateChat) {

                    //                     docSnapshot.data()?.PrivateChat.map(async secUser => {
                    //                         if (secUser.ChatuserDetails.uid == CurrentUser) {
                    //                             let conciergeUser
                    //                             const ref = firestore().collection('Requestes').doc(docSnapshot.data()?.userDetails?.uid)
                    //                             const documentSnapShot = await ref.get();
                    //                             if (documentSnapShot?.exists) {
                    //                                 const requests = documentSnapShot.data()?.MoreRequestes
                    //                                 if (requests?.length) {
                    //                                     const promes = requests?.map(async (e, i) => {
                    //                                         if (e.status && e.type == 'Update') {
                    //                                             const ref = firestore().collection('Users').doc(e.sendby)
                    //                                             const documentSnap = await ref.get();
                    //                                             if (documentSnap?.exists) {
                    //                                                 const conuser = documentSnap?.data().userDetails
                    //                                                 return conuser
                    //                                             }
                    //                                             else {
                    //                                                 return null; // Handle case where document does not exist
                    //                                             }
                    //                                         }
                    //                                     })
                    //                                     const conciergeUsers = await Promise.all(promes);
                    //                                     conciergeUser = conciergeUsers.filter(user => user !== null); // Filter out null values
                    //                                 }
                    //                             }
                    //                             const dataupdated = {
                    //                                 ...docSnapshot.data().userDetails,
                    //                                 matchtimeStamp: new Date().toString(),
                    //                                 conciergeUser: conciergeUser

                    //                             };
                    //                             MatchedUser.push(dataupdated);
                    //                             resolve();
                    //                         }
                    //                     });
                    //                 } else {
                    //                     console.log('data not found');
                    //                     setChatUserDetail('');
                    //                     resolve();
                    //                 }
                    //             });

                    //         });
                    //     });
                    //     await Promise.all(promises)
                    //     const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());

                    //     setChatUserDetail(uniqueDataArray.slice(0, 5));
                    //     dispatch(chatuser(uniqueDataArray.slice(0, 5)));

                    // } catch (e) {
                    //     console.log(e);
                    // }
                }
            }
            else if (Package == 456) {
                if (!ChatUserId == '') {
                    try {
                        const MatchedUser = [];

                        // Use Promise.all to wait for all promises to resolve
                        await Promise.all(
                            ChatUserId.map(async (item) => {
                                const docSnapshot = await firestore().collection('Users').doc(item).get();

                                if (docSnapshot.exists && docSnapshot.data()?.PrivateChat) {
                                    // let conciergeUser = null
                                    const conciergeUser = [];
                                    const userData = docSnapshot.data();

                                    for (const secUser of userData.PrivateChat) {
                                        if (secUser.ChatuserDetails.uid === CurrentUser) {

                                            const ref = firestore().collection('Requestes').doc(userData.userDetails.uid);
                                            const documentSnapShot = await ref.get();

                                            if (documentSnapShot.exists) {
                                                const requests = documentSnapShot.data()?.MoreRequestes || [];

                                                const conciergeUsers = await Promise.all(
                                                    requests.map(async (e) => {
                                                        if (e.status && e.type === 'Update') {
                                                            const userSnapshot = await firestore().collection('Users').doc(e.sendby).get();
                                                            if (userSnapshot.exists) {
                                                                const conuser = userSnapshot.data().userDetails;
                                                                return conuser;
                                                            }
                                                        }
                                                        return null;
                                                    })
                                                );

                                                // Filter out null values
                                                const filteredConciergeUsers = conciergeUsers.filter((user) => user !== null);
                                                conciergeUser.push(...filteredConciergeUsers);
                                            }
                                            const dataupdated = {
                                                ...userData.userDetails,
                                                matchtimeStamp: new Date().toString(),
                                                conciergeUser: conciergeUser,
                                            };
                                            MatchedUser.push(dataupdated);
                                        }
                                    }
                                } else {
                                    console.log('Data not found for user:', item);
                                }
                            })
                        );

                        // console.log('====> ', MatchedUser, user?.uid);

                        const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
                        setChatUserDetail(uniqueDataArray.slice(0, 10));
                        dispatch(chatuser(uniqueDataArray.slice(0, 10)));
                    } catch (e) {
                        console.error(e, 'fetchMatchUsers');
                    }
                    // try {
                    //     const MatchedUser = []
                    //     const promises = ChatUserId.map(item => {
                    //         console.log(item);
                    //         return new Promise(resolve => {
                    //             firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                    //                 if (docSnapshot.data()?.PrivateChat) {

                    //                     docSnapshot.data()?.PrivateChat.map(async secUser => {
                    //                         if (secUser.ChatuserDetails.uid == CurrentUser) {
                    //                             let conciergeUser
                    //                             const ref = firestore().collection('Requestes').doc(docSnapshot.data()?.userDetails?.uid)
                    //                             const documentSnapShot = await ref.get();
                    //                             if (documentSnapShot?.exists) {
                    //                                 const requests = documentSnapShot.data()?.MoreRequestes
                    //                                 if (requests?.length) {
                    //                                     const promes = requests?.map(async (e, i) => {
                    //                                         if (e.status && e.type == 'Update') {
                    //                                             const ref = firestore().collection('Users').doc(e.sendby)
                    //                                             const documentSnap = await ref.get();
                    //                                             if (documentSnap?.exists) {
                    //                                                 const conuser = documentSnap?.data().userDetails
                    //                                                 return conuser
                    //                                             }
                    //                                             else {
                    //                                                 return null; // Handle case where document does not exist
                    //                                             }
                    //                                         }
                    //                                     })
                    //                                     const conciergeUsers = await Promise.all(promes);
                    //                                     conciergeUser = conciergeUsers.filter(user => user !== null); // Filter out null values
                    //                                 }
                    //                             }
                    //                             const dataupdated = {
                    //                                 ...docSnapshot.data().userDetails,
                    //                                 matchtimeStamp: new Date().toString(),
                    //                                 conciergeUser: conciergeUser
                    //                             };
                    //                             MatchedUser.push(dataupdated);
                    //                             resolve();
                    //                         }
                    //                     });
                    //                 } else {
                    //                     console.log('data not found');
                    //                     setChatUserDetail('');
                    //                     resolve();
                    //                 }
                    //             });
                    //         });
                    //     });
                    //     await Promise.all(promises)
                    //     const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
                    //     // console.log(uniqueDataArray, '====> ');
                    //     // const uniqueArray = Array.from(new Set(MatchedUser.map(JSON.stringify))).map(JSON.parse);
                    //     setChatUserDetail(uniqueDataArray.slice(0, 10));
                    //     dispatch(chatuser(uniqueDataArray.slice(0, 10)));

                    // } catch (e) {
                    //     console.log(e);
                    // }
                }
            }
            else {
                if (!ChatUserId == '') {
                    try {
                        const MatchedUser = [];

                        // Use Promise.all to wait for all promises to resolve
                        await Promise.all(
                            ChatUserId.map(async (item) => {
                                const docSnapshot = await firestore().collection('Users').doc(item).get();

                                if (docSnapshot.exists && docSnapshot.data()?.PrivateChat) {
                                    // let conciergeUser = null
                                    const conciergeUser = [];
                                    const userData = docSnapshot.data();

                                    for (const secUser of userData.PrivateChat) {
                                        if (secUser.ChatuserDetails.uid === CurrentUser) {


                                            const ref = firestore().collection('Requestes').doc(userData.userDetails.uid);
                                            const documentSnapShot = await ref.get();

                                            if (documentSnapShot.exists) {
                                                const requests = documentSnapShot.data()?.MoreRequestes || [];

                                                const conciergeUsers = await Promise.all(
                                                    requests.map(async (e) => {
                                                        if (e.status && e.type === 'Update') {
                                                            const userSnapshot = await firestore().collection('Users').doc(e.sendby).get();
                                                            if (userSnapshot.exists) {
                                                                const conuser = userSnapshot.data().userDetails;
                                                                return conuser;
                                                            }
                                                        }
                                                        return null;
                                                    })
                                                );

                                                // Filter out null values
                                                const filteredConciergeUsers = conciergeUsers.filter((user) => user !== null);
                                                conciergeUser.push(...filteredConciergeUsers);
                                            }

                                            const dataupdated = {
                                                ...userData.userDetails,
                                                matchtimeStamp: new Date().toString(),
                                                conciergeUser: conciergeUser,
                                            };
                                            MatchedUser.push(dataupdated);
                                        }
                                    }

                                } else {
                                    console.log('Data not found for user:', item);
                                }
                            })
                        );

                        // console.log('====> ', MatchedUser, user?.uid);

                        const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
                        setChatUserDetail(uniqueDataArray.slice(0, 20));
                        dispatch(chatuser(uniqueDataArray.slice(0, 20)));
                    } catch (e) {
                        console.error(e, 'fetchMatchUsers');
                    }
                    // try {
                    //     const MatchedUser = []
                    //     const promises = ChatUserId.map(item => {
                    //         // console.log(item);
                    //         return new Promise(resolve => {
                    //             firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                    //                 if (docSnapshot.data()?.PrivateChat) {

                    //                     docSnapshot.data()?.PrivateChat.map(async secUser => {
                    //                         if (secUser.ChatuserDetails.uid == CurrentUser) {
                    //                             // console.log(docSnapshot.data()?.userDetails?.uid , '----->')
                    //                             let conciergeUser = null
                    //                             const ref = firestore().collection('Requestes').doc(docSnapshot.data()?.userDetails?.uid)
                    //                             const documentSnapShot = await ref.get();
                    //                             // let arraynew
                    //                             if (documentSnapShot?.exists) {
                    //                                 const requests = documentSnapShot.data()?.MoreRequestes
                    //                                 if (requests?.length) {
                    //                                     arraynew = []
                    //                                     const promes = requests?.map(async (e, i) => {
                    //                                         if (e.status && e.type == 'Update') {
                    //                                             const ref = firestore().collection('Users').doc(e.sendby)
                    //                                             const documentSnap = await ref.get();
                    //                                             if (documentSnap?.exists) {
                    //                                                 const conuser = documentSnap?.data().userDetails
                    //                                                 // arraynew.push(conuser)
                    //                                                 return conuser
                    //                                             }
                    //                                             else {
                    //                                                 return null; // Handle case where document does not exist
                    //                                             }
                    //                                         }
                    //                                     })
                    //                                     const conciergeUsers = await Promise.all(promes);
                    //                                     // console.log(conciergeUsers, 'promes');
                    //                                     conciergeUser = conciergeUsers?.filter(user => user !== null); // Filter out null values
                    //                                 }
                    //                             }
                    //                             // console.log(conciergeUser, 'arrnew');
                    //                             const dataupdated = {
                    //                                 ...docSnapshot.data().userDetails,
                    //                                 matchtimeStamp: new Date().toString(),
                    //                                 conciergeUser: conciergeUser?.length > 0 ? conciergeUser : []
                    //                             };
                    //                             // console.log('=== > :', dataupdated);
                    //                             MatchedUser.push(dataupdated);
                    //                             resolve();
                    //                         }
                    //                     });
                    //                 } else {
                    //                     console.log('data not found');
                    //                     setChatUserDetail('');
                    //                     resolve();
                    //                 }
                    //             });
                    //         });
                    //     });
                    //     await Promise.all(promises)
                    //     console.log('====> ', MatchedUser, user?.uid);
                    //     const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
                    //     // console.log(uniqueDataArray, '====> ');
                    //     // const uniqueArray = Array.from(new Set(MatchedUser.map(JSON.stringify))).map(JSON.parse);
                    //     setChatUserDetail(uniqueDataArray);
                    //     dispatch(chatuser(uniqueDataArray));

                    // } catch (e) {
                    //     console.log(e);
                    // }
                }
            }
        }
        else {
            // console.log('===>',ChatUserId);
            if (!ChatUserId == '') {
                try {
                    const MatchedUser = [];

                    // Use Promise.all to wait for all promises to resolve
                    await Promise.all(
                        ChatUserId.map(async (item) => {
                            const docSnapshot = await firestore().collection('Users').doc(item).get();

                            if (docSnapshot.exists && docSnapshot.data()?.PrivateChat) {
                                // let conciergeUser = null
                                const conciergeUser = [];
                                let userData = docSnapshot.data();

                                for (const secUser of userData.PrivateChat) {
                                    if (secUser.ChatuserDetails.uid === CurrentUser) {

                                        const ref = firestore().collection('Requestes').doc(userData.userDetails.uid);
                                        const documentSnapShot = await ref.get();

                                        if (documentSnapShot.exists) {
                                            const requests = documentSnapShot.data()?.MoreRequestes || [];

                                            const conciergeUsers = await Promise.all(
                                                requests.map(async (e) => {
                                                    if (e.status && e.type === 'Update') {
                                                        const userSnapshot = await firestore().collection('Users').doc(e.sendby).get();
                                                        if (userSnapshot.exists) {
                                                            const conuser = userSnapshot.data().userDetails;
                                                            return conuser;
                                                        }
                                                    }
                                                    return null;
                                                })
                                            );

                                            // Filter out null values
                                            const filteredConciergeUsers = conciergeUsers.filter((user) => user !== null);
                                            conciergeUser.push(...filteredConciergeUsers);
                                        }
                                        const dataupdated = {
                                            ...userData.userDetails,
                                            matchtimeStamp: new Date().toString(),
                                            conciergeUser: conciergeUser,
                                        };
                                        MatchedUser.push(dataupdated);
                                    }
                                }
                            } else {
                                console.log('Data not found for user:', item);
                            }
                        })
                    );

                    // console.log('====> ', MatchedUser, user?.uid);

                    const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
                    setChatUserDetail(uniqueDataArray.slice(0, 10));
                    dispatch(chatuser(uniqueDataArray.slice(0, 10)));
                } catch (e) {
                    console.error(e, 'fetchMatchUsers');
                }
                // try {
                //     const MatchedUser = []
                //     const promises = ChatUserId.map(item => {
                //         console.log('docSnapshot.data()?.userDetails?.uid', '=====>');

                //         return new Promise(resolve => {
                //             firestore().collection('Users').doc(item).onSnapshot(docSnapshot => {
                //                 if (docSnapshot.data()?.PrivateChat) {

                //                     docSnapshot.data()?.PrivateChat.map(async secUser => {
                //                         if (secUser.ChatuserDetails.uid == CurrentUser) {
                //                             let conciergeUser
                //                             // console.log(docSnapshot.data()?.userDetails?.uid);
                //                             const ref = firestore().collection('Requestes').doc(docSnapshot.data()?.userDetails?.uid)
                //                             const documentSnapShot = await ref.get();
                //                             if (documentSnapShot?.exists) {
                //                                 const requests = documentSnapShot.data()?.MoreRequestes
                //                                 if (requests?.length) {
                //                                     const promes = requests?.map(async (e, i) => {
                //                                         if (e.status && e.type == 'Update') {
                //                                             const ref = firestore().collection('Users').doc(e.sendby)
                //                                             const documentSnap = await ref.get();
                //                                             if (documentSnap?.exists) {
                //                                                 const conuser = documentSnap?.data().userDetails
                //                                                 return conuser
                //                                             }
                //                                             else {
                //                                                 return null; // Handle case where document does not exist
                //                                             }
                //                                         }
                //                                     })
                //                                     const conciergeUsers = await Promise.all(promes);
                //                                     conciergeUser = conciergeUsers.filter(user => user !== null); // Filter out null values
                //                                 }
                //                             }
                //                             // console.log(conciergeUser, 'here is conciergeUser ================');
                //                             const dataupdated = {
                //                                 ...docSnapshot.data().userDetails,
                //                                 matchtimeStamp: new Date().toString(),
                //                                 conciergeUser: conciergeUser
                //                             };
                //                             MatchedUser.push(dataupdated);
                //                             resolve();
                //                         }
                //                     });
                //                 } else {
                //                     console.log('data not found');
                //                     setChatUserDetail('');
                //                     resolve();
                //                 }
                //             });

                //         });
                //     });
                //     await Promise.all(promises)
                //     const uniqueDataArray = Array.from(new Map(MatchedUser.map(item => [item.uid, item])).values());
                //     setChatUserDetail(uniqueDataArray.slice(0, 1));
                //     dispatch(chatuser(uniqueDataArray.slice(0, 1)));

                // } catch (e) {
                //     console.log(e);
                // }
            }
        }
    };


    const fetchChatuserMain = () => {
        // console.log('testing: ', userData.userLock);
        if (user.userLock == true) {
            fetchLockUser(ChatUserId);
        } else {
            fetchMatchUsers(ChatUserId);
            // console.log('else');
        }
    }


    const fetchusersMain = async () => {
        // console.log(user.SelectionOne);
        if (user?.SelectionOne >= 6) {
            fetchAllUsers();
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


    // const now = new Date();
    // const oneDayInMillis = 24 * 60 * 60 * 1000;
    // const isPackageValid = pkg =>
    //     (pkg?.id == 1 || pkg?.id == 2)
    // new Date(pkg.time) >= now &&
    // new Date(pkg.time).getTime() - now.getTime() <= oneDayInMillis;

    const fetchAllUsers = async () => {
        setUploading(true)
        try {
            // const Package = userPackage.id;
            const mydoc = firestore().collection('Users').doc(user?.uid)
            const mydocGet = await mydoc.get()

            const DeletedUsers = mydocGet?.data()?.BlockedUsers?.length > 0 ? mydocGet?.data()?.BlockedUsers : []
            const matchUsers = mydocGet?.data()?.PrivateChat?.length > 0 ? mydocGet?.data()?.PrivateChat : []

            const querySnapshot = await firestore()
                .collection('Users')
                .where("userDetails.uid", '!=', user.uid)
                .get();
            // console.log('Total user: ', !querySnapshot?.empty);
            if (!querySnapshot?.empty) {
                // const users = [];
                const modalDataUid = [];
                const promises = [];
                querySnapshot.forEach((documentSnapshot) => {
                    const data = documentSnapshot.data().userDetails;
                    let checkUser = DeletedUsers?.some(item => item?.to == data?.uid);
                    let checkmatchUser = matchUsers?.some(item => item?.ChatuserDetails?.uid == data?.uid);
                    // console.log(!checkUser, '=====================>');
                    if (data?.Category == 'User' && !checkUser && !checkmatchUser) {
                        const distance = parseFloat((getPreciseDistance(
                            { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                            { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                        ) * 0.000621).toFixed(2));

                        // console.log(typeof distance , '=================');

                        promises.push(getAddressFromCoordinates(data?.Location?.latitude, data?.Location?.longitude)
                            .then(address => {
                                const addressParts = address ? address.split(', ') : null;
                                const lastWord = addressParts[addressParts.length - 1];
                                const state = addressParts.length > 1 ? addressParts[addressParts.length - 2] : '';
                                const country = addressParts.length > 2 ? addressParts[addressParts.length - 3] : '';

                                const dateParts = data.Dates.split('/');
                                const dob = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);
                                const totalyears = new Date().getFullYear() - dob.getFullYear();
                                // console.log('=================',address);
                                return {
                                    ...documentSnapshot.data(),
                                    userDetails: {
                                        ...documentSnapshot.data().userDetails,
                                        distance: distance,
                                        address: address,
                                        city: lastWord,
                                        country: country,
                                        state: state,
                                        years: totalyears,
                                    }
                                };
                            })
                            .catch(error => {
                                // console.warn("Error fetching address:", error);
                                // const addressParts = address.split(', ');
                                // const lastWord = addressParts[addressParts.length - 1];
                                const totalyears = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                                return {
                                    ...documentSnapshot.data(),
                                    userDetails: {
                                        ...documentSnapshot.data().userDetails,
                                        distance: distance,
                                        city: null,
                                        address: null,
                                        country: null,
                                        years: totalyears,
                                    }
                                };
                            }));
                        // const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
                        // Rest of your forEach loop code...
                        // users.push(update);
                        modalDataUid.push(documentSnapshot.id);

                        // console.log('===>>>' , userDetails);
                    }
                });

                const updatedUsers = await Promise.all(promises);

                updatedUsers.sort((a, b) => a?.userDetails?.distance - b?.userDetails?.distance);


                // console.log(updatedUsers , '-------------------');
                // return
                const customSort = (a, b) => {
                    const oneDayInMillis = 24 * 60 * 60 * 1000; // One day in milliseconds
                    const currentTime = Date.now();
                    const aTimestamp = new Date(a?.userDetails?.AdditionalPackageDetails?.time).getTime();
                    const bTimestamp = new Date(b?.userDetails?.AdditionalPackageDetails?.time).getTime();

                    const aHasPackage = a?.userDetails?.AdditionalPackageDetails && (a?.userDetails?.AdditionalPackageDetails?.id == 1 || a?.userDetails?.AdditionalPackageDetails?.id == 2) && currentTime - aTimestamp <= oneDayInMillis;
                    const bHasPackage = b?.userDetails?.AdditionalPackageDetails && (b?.userDetails?.AdditionalPackageDetails?.id == 1 || b?.userDetails?.AdditionalPackageDetails?.id == 2) && currentTime - bTimestamp <= oneDayInMillis;
                    if (aHasPackage && !bHasPackage) {
                        return -1; // a comes before b
                    } else if (!aHasPackage && bHasPackage) {
                        return 1; // b comes before a
                    } else {
                        return 0; // no change in order
                    }
                };
                // Apply sorting to users array
                const sortedUsers = [...updatedUsers].sort(customSort);

                const GenderFilterUsers = await potentialFriends(sortedUsers)
                let filter = GenderFilterUsers?.filter(res => res?.userDetails?.distance <= 120)
                // console.log(filter, '====>120:');
                // console.log(GenderFilterUsers, '====>GenderFilter:');
                setUsers(filter);
                dispatch(AllUsers(filter))
                setUsersBackUp(updatedUsers)
                setUploading(false)
                setModalDataUid(modalDataUid);
                setDistance(.24)
                // console.log(updatedUsers[0].userDetails.distance);
            } else {
                setUploading(false)
                ToastAndroid.show('Network error please try again', ToastAndroid.SHORT);
                // Handle case when there are no documents that match the filters
                console.log("No documents found.");
                setUsers([]);
                setModalDataUid([]);
            }
        }
        catch (e) {
            ToastAndroid.show(`Error: ${e}`, ToastAndroid.SHORT);
            setUploading(false)
            console.log("Error fetchAllUsers : ", e);
        }
    };

    const potentialFriends = (allProfiles) => {
        // const userMainGender = 'Non binary';
        const userMainGender = user.Gender;
        // const userSubGender = 'Gay';
        const userSubGender = user.GenderDetial;
        return allProfiles.filter(profile => {
            if (userMainGender === 'Male') {
                if (userSubGender === 'Bisexual') {
                    return (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Non binary') || (profile?.userDetails?.Gender === 'Trans Male to Female') || (profile?.userDetails?.Gender === 'Trans Female to Male');
                } else if (userSubGender === 'Straight') {
                    return profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual');
                }
                else if (userSubGender === 'Gay') {
                    return (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Non binary') || (profile?.userDetails?.Gender === 'Trans Male to Female') || (profile?.userDetails?.Gender === 'Trans Female to Male');
                }
            }
            else if (userMainGender === 'Female') {
                if (userSubGender === 'Bisexual') {
                    return (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Non binary') || (profile?.userDetails?.Gender === 'Trans Male to Female') || (profile?.userDetails?.Gender === 'Trans Female to Male');
                } else if (userSubGender === 'Straight') {
                    return profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual');
                } else if (userSubGender === 'Gay') {
                    return (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Non binary') || (profile?.userDetails?.Gender === 'Trans Male to Female') || (profile?.userDetails?.Gender === 'Trans Female to Male');
                }
            }
            else if (userMainGender === 'Non binary') {
                return (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Non binary') || (profile?.userDetails?.Gender === 'Trans Male to Female') || (profile?.userDetails?.Gender === 'Trans Female to Male');
                // if (userSubGender === 'Straight') {
                //     return profile?.userDetails?.GenderDetial === 'Gay' || profile?.userDetails?.GenderDetial === 'Bisexual';
                // } else if (userSubGender === 'Bisexual') {
                //     return profile?.userDetails?.GenderDetial === 'Gay' || profile?.userDetails?.GenderDetial === 'Bisexual';
                // } else if (userSubGender === 'Gay') {
                //     return profile?.userDetails?.GenderDetial === 'Gay' || profile?.userDetails?.GenderDetial === 'Bisexual';
                // }
            }
            else if (userMainGender === 'Trans Male to Female') {
                return (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Non binary') || (profile?.userDetails?.Gender === 'Trans Male to Female') || (profile?.userDetails?.Gender === 'Trans Female to Male');
                // return profile?.userDetails?.GenderDetial === 'Gay' || profile?.userDetails?.GenderDetial === 'Bisexual';
            } else if (userMainGender === 'Trans Female to Male') {
                return (profile?.userDetails?.Gender === 'Male' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Female' && (profile?.userDetails?.GenderDetial === 'Straight' || profile?.userDetails?.GenderDetial === 'Bisexual')) || (profile?.userDetails?.Gender === 'Non binary') || (profile?.userDetails?.Gender === 'Trans Male to Female') || (profile?.userDetails?.Gender === 'Trans Female to Male');
                // return profile?.userDetails?.GenderDetial === 'Gay' || profile?.userDetails?.GenderDetial === 'Bisexual';
            }

            return false;
        });
    }

    // const fetchAllUsers = async () => {
    //     // console.log('packages',userPackage);
    //     if (!userPackage == '') {
    //         const Package = userPackage.id;
    //         // for basic package 
    //         let distance
    //         if (Package == 123) {
    //             await firestore()
    //                 .collection('Users')
    //                 .where("userDetails.uid", '!=', user.uid)
    //                 // .limit(2)
    //                 .onSnapshot(querySnapshot => {
    //                     // console.log('Total user: ', querySnapshot.size);
    //                     const users = [];
    //                     const modalDataUid = [];
    //                     querySnapshot.forEach((documentSnapshot) => {
    //                         const data = documentSnapshot.data().userDetails;
    //                         const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
    //                         // if (data?.Location?.latitude && data?.Location?.longitude) {
    //                         //     distance = getPreciseDistance(
    //                         //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
    //                         //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
    //                         //     ) * 0.000621;
    //                         // }
    //                         // const distance = geolib.getPreciseDistance(user?.Location, data?.Location) * 0.000621


    //                         if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
    //                             if (years >= user.filterMinAge && years <= user.filterMaxAge
    //                                 // || distance > 0 ? distance : 0 <= user.filterDistance
    //                             ) {
    //                                 // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                             else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                         }
    //                         else if (user.filterGender == 'Both') {
    //                             if (years >= user.filterMinAge && years <= user.filterMaxAge
    //                                 // || distance > 0 ? distance : 0 <= user.filterDistance
    //                             ) {
    //                                 // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                             else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                             // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
    //                             // users.push(documentSnapshot.data());
    //                         }
    //                     });
    //                     setUsers(users)
    //                     setModalDataUid(modalDataUid)
    //                 })
    //             // console.log('FemaleUsers: ', users);
    //         }
    //         else if (Package == 456) {
    //             // console.log('female filter', Package);
    //             await firestore()
    //                 .collection('Users')
    //                 .where("userDetails.uid", '!=', user.uid)
    //                 // .limit(3)
    //                 .onSnapshot(querySnapshot => {
    //                     // console.log('Total user: ', querySnapshot.size);
    //                     const users = [];
    //                     const modalDataUid = [];
    //                     querySnapshot.forEach((documentSnapshot) => {
    //                         const data = documentSnapshot.data().userDetails;
    //                         const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
    //                         // if (data?.Location?.latitude && data?.Location?.longitude) {
    //                         //     distance = getPreciseDistance(
    //                         //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
    //                         //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
    //                         //     ) * 0.000621;
    //                         // }
    //                         // const distance = geolib.getPreciseDistance(user?.Location, data?.Location) * 0.000621
    //                         if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
    //                             if (years >= user.filterMinAge && years <= user.filterMaxAge
    //                                 // || distance > 0 ? distance : 0 <= user.filterDistance
    //                             ) {
    //                                 // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                             else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                                 // console.log(documentSnapshot.data());
    //                             }
    //                         }
    //                         else if (user.filterGender == 'Both') {
    //                             if (years >= user.filterMinAge && years <= user.filterMaxAge
    //                                 // || distance > 0 ? distance : 0 <= user.filterDistance
    //                             ) {
    //                                 // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                             else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                             // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
    //                             // users.push(documentSnapshot.data());
    //                         }
    //                     });
    //                     setUsers(users)
    //                     setModalDataUid(modalDataUid)
    //                 })
    //         }
    //         // for premium package 
    //         else {
    //             await firestore()
    //                 .collection('Users')
    //                 .where("userDetails.uid", '!=', user.uid)
    //                 // .limit(25)
    //                 .onSnapshot(querySnapshot => {
    //                     // console.log('Total user: ', querySnapshot.size);
    //                     const users = [];
    //                     const modalDataUid = [];
    //                     querySnapshot.forEach((documentSnapshot) => {
    //                         const data = documentSnapshot.data().userDetails;
    //                         const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
    //                         // if (data?.Location?.latitude && data?.Location?.longitude) {
    //                         //     distance = getPreciseDistance(
    //                         //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
    //                         //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
    //                         //     ) * 0.000621;
    //                         // }
    //                         if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
    //                             // console.log(distance); 
    //                             if (years >= user.filterMinAge && years <= user.filterMaxAge
    //                                 // || distance > 0 ? distance : 0 <= user.filterDistance
    //                             ) {
    //                                 // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                             else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                         }
    //                         else if (user.filterGender == 'Both') {
    //                             if (years >= user.filterMinAge && years <= user.filterMaxAge
    //                                 // || distance > 0 ? distance : 0 <= user?.filterDistance
    //                             ) {
    //                                 // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                             else if (!user.filterMinAge || !user.filterMinAge || !user.filterDistance) {
    //                                 users.push(documentSnapshot.data());
    //                                 modalDataUid.push(documentSnapshot.id);
    //                             }
    //                             // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
    //                             // users.push(documentSnapshot.data());
    //                         }
    //                     });
    //                     setUsers(users)
    //                     setModalDataUid(modalDataUid)
    //                 })
    //         }
    //     }
    //     else {
    //         try {
    //             await firestore()
    //                 .collection('Users')
    //                 .where("userDetails.uid", '!=', user.uid)
    //                 // .limit(1)
    //                 .onSnapshot(querySnapshot => {
    //                     // console.log('Total user: ', querySnapshot.size);
    //                     const users = [];
    //                     const modalDataUid = [];
    //                     querySnapshot.forEach((documentSnapshot) => {
    //                         const data = documentSnapshot.data().userDetails;
    //                         const years = new Date().getFullYear() - new Date(data.Dates).getFullYear();
    //                         // if (data?.Location?.latitude && data?.Location?.longitude) {
    //                         //     distance = getPreciseDistance(
    //                         //         { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
    //                         //         { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
    //                         //     ) * 0.000621;
    //                         // }
    //                         // console.log(distance);
    //                         if (data.Gender == 'Female') {
    //                             // console.log('asdjk'); 
    //                             if (data.Gender == `${user.filterGender ? user.filterGender : "Female"}`) {
    //                                 if (years >= user.filterMinAge || years <= user.filterMaxAge
    //                                     // || distance > 0 ? distance : 0 <= user?.filterDistance
    //                                 ) {
    //                                     // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
    //                                     users.push(documentSnapshot.data());
    //                                     modalDataUid.push(documentSnapshot.id);
    //                                     // console.log('yetduh');
    //                                 }
    //                                 else if (!user.filterMinAge || !user.filterMaxAge || !user.filterDistance) {
    //                                     // console.log('User ID=======================2: ', documentSnapshot.id, documentSnapshot.data());
    //                                     users.push(documentSnapshot.data());
    //                                     modalDataUid.push(documentSnapshot.id);
    //                                     // console.log('etg');
    //                                 }
    //                             }
    //                             else if (user.filterGender == 'Both') {
    //                                 if (years >= user.filterMinAge || years <= user.filterMaxAge
    //                                     // || distance > 0 ? distance : 0 <= user?.filterDistance
    //                                 ) {
    //                                     // console.log('User ID=======================1: ', documentSnapshot.id, documentSnapshot.data());
    //                                     users.push(documentSnapshot.data());
    //                                     modalDataUid.push(documentSnapshot.id);
    //                                 }
    //                                 else if (!user.filterMinAge || !user.filterMaxAge || !user.filterDistance) {
    //                                     users.push(documentSnapshot.data());
    //                                     modalDataUid.push(documentSnapshot.id);
    //                                 }
    //                                 // console.log('User ID=======================: ', documentSnapshot.id, documentSnapshot.data());
    //                                 // users.push(documentSnapshot.data());
    //                             }
    //                         }
    //                     });
    //                     setUsers(users)
    //                     setModalDataUid(modalDataUid)
    //                 })
    //             // console.log('FemaleUsers: ', users);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };
    // }

    // const CheckConnection = () => {
    //     NetInfo.addEventListener(state => {
    //         if (state.isConnected) {
    //             fetchusersMain();
    //             fetchUsersUid();
    //             locationPermission();
    //             getCurrentLocation();
    //             GetFcmToken();
    //             // user is online, do something here
    //         } else {
    //             // user is offline, show network error screen
    //             // for example:
    //             navigation.navigate('NetworkErrorScreen');
    //         }
    //     });
    // }

    const DatesServay = () => {
        const d = new Date();
        const hour = 1000 * 60 * 60;
        const ctime = Math.round(d.getTime() / hour);
        try {
            firestore()
                .collection('Proposals')
                // .orderBy('createdAt', 'desc')
                .doc(CurrentUser)
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
                        const Proposaltime = Math?.round(date?.toDate()?.getTime() / hour);
                        // console.log('adlj', a.CancleDate , a.YourArrival , a.PartnerArrival ,Proposaltime >= ctime );
                        if (Proposaltime >= ctime && a?.PartnerArrival == true && a?.YourArrival == true && a?.active == 0 && !a?.Reviews) {
                            // console.log('====>', a);
                            setTimeout(() => {
                                navigation.navigate('DateServayScreen', { ProposalId: a?._id });
                                // console.log('DateServayScreen');
                            }, 3000
                                //   1000 * 60 * 60
                            );
                        }
                    })
                })
        }
        catch (e) {
            console.log(e, 'DatesServay');
        }
    }


    const fetchUsersLikedYou = async () => {
        const userGender = user.Gender
        // console.log(userGender);
        // return
        fetchLikedUserMale();
    }
    const fetchLikedUserMale = async () => {
        const likedUser = [];
        try {
            const mydoc = firestore().collection('Users').doc(user?.uid)
            const mydocGet = await mydoc.get()

            const DeletedUsers = mydocGet?.data()?.BlockedUsers?.length > 0 ? mydocGet?.data()?.BlockedUsers : []
            const matchUsers = mydocGet?.data()?.PrivateChat?.length > 0 ? mydocGet?.data()?.PrivateChat : []


            const querySnapshot = await firestore()
                .collection('Users')
                .where("userDetails.uid", '!=', user?.uid)
                // .where("userDetails.Category", '==', 'User')
                // .where("PrivateChat", "array-contains", { ChatuserDetails: { uid: user?.uid } })
                .get();

            querySnapshot.forEach(documentSnapshot => {
                let checkmatchUser = matchUsers?.some(item => item?.ChatuserDetails?.uid == documentSnapshot?.data()?.userDetails?.uid);
                let checkUser = DeletedUsers?.some(item => item?.to == documentSnapshot?.data()?.userDetails?.uid);

                if (documentSnapshot?.data()?.userDetails?.Category == 'User' && !checkmatchUser && !checkUser) {
                    if (documentSnapshot?.data()?.PrivateChat) {
                        documentSnapshot?.data()?.PrivateChat?.map(LikedUser => {
                            if (LikedUser?.ChatuserDetails?.uid == user?.uid) {
                                // console.log(documentSnapshot?.data()?.userDetails?.uid);
                                // return
                                const data = documentSnapshot.data().userDetails
                                const distance = (getPreciseDistance(
                                    { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                                    { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                                ) * 0.000621).toFixed(2);
                                const totalyears = new Date().getFullYear() - new Date(data?.Dates).getFullYear();
                                let updatedData = {
                                    ...data,
                                    distance: distance,
                                    address: 'address not available',
                                    country: 'country not available',
                                    years: totalyears,
                                };
                                likedUser.push(updatedData)
                            } else {
                                // console.log(s'no like found');
                            }
                        })
                    }
                }
            });
            const uniqueDataArray = Array.from(new Map(likedUser.map(item => [item.uid, item])).values());

            // console.log(uniqueDataArray, '=========================');

            dispatch(UsersLikedYou(uniqueDataArray));
        } catch (error) {
            console.error("Error fetching liked users:", error);
        }
    }
    const fetchLikedUserFemale = async () => {
        const likedUser = [];
        await firestore()
            .collection('Users')
            .where("userDetails.Gender", '==', "Female")
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach((documentSnapshot) => {
                    if (documentSnapshot.data()?.PrivateChat) {
                        documentSnapshot.data()?.PrivateChat.map(LikedUser => {
                            if (LikedUser?.ChatuserDetails?.uid == user?.uid) {
                                likedUser.push(documentSnapshot.data()?.userDetails);
                            } else {
                                // console.log('no like found');
                            }
                        });
                    }
                });
                dispatch(UsersLikedYou(likedUser));
            });
    };


    const GetPaymentCards = () => {
        // console.log('user?.uid===================' , user)
        try {
            const useRef = firestore().collection('PaymentCards')
                .doc(user?.uid)
                .onSnapshot(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        const CardDetails = documentSnapshot.data()?.PaymentCardDetails;
                        if (CardDetails?.length > 0) {
                            dispatch(PaymentCards(CardDetails));
                            // const SingleCard = PaymentCardDetails.find(j => j?.paymentMethod === Data?.paymentMethod);
                            // console.log('==> newpaymentcard',CardDetails);
                        }
                        else {
                            console.log('text');
                        }
                    }
                })
        }
        catch (e) {
            console.log(e, 'GetPaymentCards');
        }
    }

    const getAffiliatePrice = async () => {
        // console.log('hellOoo');
        try {
            const ref = firestore().collection('AffiliatePricing').doc('1')
            const refdoc = await ref?.get()
            if (refdoc?.exists) {
                const tairFour = refdoc?.data()
                // console.log(tairFour);s
                dispatch(AffiliatePrices(tairFour))
            }
        } catch (e) {
            console.log(e);
        }
    }



    // const updateMembershipStatus = async (amount) => {
    //     // console.log(!user || !user.AccountType || !user.PackageId || !user.MembershipDetails);
    //     if (!user || !user.AccountType || !user.PackageId || !user.MembershipDetails) {
    //         return;
    //     }

    //     const { id: membershipId, limits, time: membershipTime } = user.MembershipDetails;


    //     const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
    //     const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;
    //     const currentTime = Date.now();
    //     const membershipTimestamp = new Date(membershipTime).getTime();

    //     if (
    //         (limits === '1 month' && currentTime - membershipTimestamp > oneMonthInMillis) ||
    //         (limits === '1 year' && currentTime - membershipTimestamp > oneYearInMillis)
    //     ) {
    //         const packageDoc = await firestore().collection('Package').doc(user.PackageId).get();
    //         const membershipRate = packageDoc?.data()?.Prices?.find(item => item.id === membershipId)?.rate;
    //         if (!membershipRate) {
    //             return;
    //         }
    //         let walletData = await firestore().collection('Wallet').doc(user?.uid).get()
    //         const data = walletData?.exists ? walletData.data()?.wallet : null
    //         const CalculateWallet = data ? calculateTotals(data) : null;
    //         const walletAmountAvailable = CalculateWallet ? CalculateWallet?.totalBalance : null;
    //         // console.log('===============>', membershipRate, walletAmountAvailable, parseFloat(membershipRate) <= parseFloat(walletAmountAvailable));
    //         // return

    //         if (parseFloat(membershipRate) <= parseFloat(walletAmountAvailable)) {
    //             const updatedMembership = {
    //                 ...user.MembershipDetails,
    //                 time: new Date().toISOString(),
    //             };

    //             try {
    //                 const userRef = firestore().collection('Users').doc(user.uid);
    //                 await userRef.update({
    //                     'userDetails.MembershipDetails': updatedMembership,
    //                 });

    //                 const walletData = {
    //                     expend: membershipRate,
    //                     fare: 0,
    //                     currency: 'usd',
    //                     deposit: 0,
    //                     type: membershipId == 3 ? `${user.AccountType} & Diamond+ Membership` : user.AccountType,
    //                     date: new Date().toString(),
    //                 };

    //                 await firestore().collection('Wallet').doc(user.uid).set(
    //                     {
    //                         wallet: firestore.FieldValue.arrayUnion(walletData),
    //                     },
    //                     { merge: true }
    //                 ).then(() => {
    //                     updateRefferalProgram();
    //                 })
    //                 return
    //                 // Log success or perform additional actions if needed
    //             } catch (error) {
    //                 Toast.show(`Error updateMembershipStatus: ${error}`, Toast.LONG);
    //                 return
    //             }
    //             return;
    //         }
    //         if (parseFloat(membershipRate) > parseFloat(walletAmountAvailable)) {
    //             try {
    //                 const userRef = await firestore().collection('Users')
    //                     .doc(user.uid)
    //                 userRef.update({
    //                     'userDetails.AccountType': null,
    //                     'userDetails.PackageId': null,
    //                     'userDetails.MembershipDetails': null,
    //                     // 'userDetails.FlakeTime': FlakeBill?.FlakeTime
    //                 }).then(() => {
    //                     setShowPoppup(true),
    //                         setShowPoppupDetail('ACTION_8')
    //                 })
    //                 return
    //             } catch (e) {
    //                 console.log('Erorr updateMembershipStatus', e);
    //                 return
    //             }
    //             return
    //         }
    //     }
    // }

    const updateRefferalProgram = async () => {
        // parseFloat((totalAmount * 7.5 / 100)).toFixed(2)
        try {
            const AfRef = await firestore().collection('AffiliatePricing').doc('1').get()
            const AfPricing = AfRef?.data()
            const tenPercent = (AfPricing?.tairOne?.percent / 100) * user?.MembershipDetails?.rate;
            const fivePercent = (AfPricing?.tairTwo?.percent / 100) * user?.MembershipDetails?.rate;
            const ninePercent = (AfPricing?.tairFour?.percent / 100) * user?.MembershipDetails?.rate;
            const twofivePercent = (AfPricing?.tairThree?.percent / 100) * user?.MembershipDetails?.rate;
            // console.log('reeferal programs', tenPercent, ninePercent, fivePercent, twofivePercent);
            // return
            if (user?.Refferals) {
                const refferalsDoc = firestore().collection('Users').doc(user?.Refferals?.uid);

                if (user?.Refferals?.typeId === 0 && user?.Refferals?.uid && user?.Refferals?.level) {
                    // console.log(user?.Refferals?.uid, 'In-house Talent Agency onboarding 10%');
                    const reftair0 = await refferalsDoc.get();
                    if (reftair0?.exists) {
                        const findrefferal0 = reftair0?.data()?.userDetails?.Refferals
                        let amountupdate = addNumbers(findrefferal0?.earn?.amount || 0, tenPercent);
                        await refferalsDoc.update({
                            'userDetails.Refferals': {
                                ...findrefferal0,
                                earn: {
                                    date: new Date().toString(),
                                    amount: amountupdate?.toFixed(2),
                                },
                            },
                        });

                        // Update wallet information
                        await firestore().collection('Wallet').doc(user?.Refferals?.uid).set(
                            {
                                wallet: firestore.FieldValue.arrayUnion({
                                    expend: 0,
                                    fare: 0,
                                    currency: 'usd',
                                    deposit: tenPercent.toFixed(2),
                                    type: '10% referral amount for customer subscription',
                                    date: new Date().toString(),
                                    eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
                                }),
                            },
                            { merge: true },
                        );

                    }
                }
                else if (user?.Refferals?.level && user?.Refferals?.typeId == 1) {
                    const reftair1 = await refferalsDoc.get();
                    let tair = 1;
                    if (reftair1?.exists) {
                        tair = 2;
                        const findrefferal = reftair1?.data()?.userDetails?.Refferals
                        if ((findrefferal?.level != null || findrefferal?.typeId == 1 || findrefferal?.typeId == 0 || findrefferal?.typeId != null) && tair <= 3) {
                            // console.log(user?.Refferals?.uid, '10%');
                            // return
                            let amountupdate = addNumbers(findrefferal?.earn?.amount || 0, tenPercent);
                            await refferalsDoc.update({
                                'userDetails.Refferals': {
                                    ...findrefferal,
                                    earn: {
                                        date: new Date().toString(),
                                        amount: amountupdate?.toFixed(2),
                                        // amount: (findrefferal?.earn?.amount || 0) + tenPercent,
                                    },
                                },
                            });
                            // Update wallet information for first level
                            await firestore().collection('Wallet').doc(user?.Refferals?.uid).set(
                                {
                                    wallet: firestore.FieldValue.arrayUnion({
                                        expend: 0,
                                        fare: 0,
                                        currency: 'usd',
                                        deposit: tenPercent.toFixed(2),
                                        type: '10% referral amount for customer subscription',
                                        date: new Date().toString(),
                                        eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
                                    }),
                                },
                                { merge: true },
                            );


                            if (findrefferal?.level && (findrefferal?.typeId == 1 || findrefferal?.typeId == 0) && tair <= 2) {
                                // console.log(findrefferal?.uid, '5%');
                                const reftair2 = await firestore().collection('Users').doc(findrefferal?.uid).get();
                                if (reftair2?.exists) {
                                    const findrefferal2 = reftair2?.data()?.userDetails?.Refferals
                                    // const findrefferal3 = reftair3?.data()?.userDetails?.Refferals
                                    let amountupdate = addNumbers(findrefferal2?.earn?.amount || 0, fivePercent);
                                    await firestore().collection('Users').doc(findrefferal?.uid).update({
                                        'userDetails.Refferals': {
                                            ...findrefferal2,
                                            earn: {
                                                date: new Date().toString(),
                                                amount: amountupdate.toFixed(2),
                                                // amount: (findrefferal2?.earn?.amount || 0) + fivePercent,
                                            },
                                        },
                                    })
                                    await firestore().collection('Wallet').doc(findrefferal?.uid).set(
                                        {
                                            wallet: firestore.FieldValue.arrayUnion({
                                                expend: 0,
                                                fare: 0,
                                                currency: 'usd',
                                                deposit: fivePercent.toFixed(2),
                                                type: '5% referral amount for customer subscription',
                                                date: new Date().toString(),
                                                eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
                                            }),
                                        },
                                        { merge: true },
                                    );
                                }
                                const reftair3 = await firestore().collection('Users').doc(findrefferal?.uid).get();
                                if (reftair3?.exists) {
                                    tair = 3;
                                    const findrefferal3 = reftair3?.data()?.userDetails?.Refferals
                                    if (findrefferal3?.level && findrefferal3?.typeId == 0 && tair <= 3) {
                                        // console.log(findrefferal2?.uid, '2.5%');
                                        const onbraoduserrefferal = firestore().collection('Users').doc(findrefferal3?.uid)
                                        const onbraoduserrefferalget = await onbraoduserrefferal?.get()
                                        if (onbraoduserrefferalget?.exists) {
                                            const findrefferal4 = onbraoduserrefferalget?.data()?.userDetails?.Refferals;
                                            // let amountupdate = (findrefferal4?.earn?.amount || 0) + twofivePercent;
                                            let amountupdate = addNumbers(findrefferal4?.earn?.amount || 0, twofivePercent);

                                            await onbraoduserrefferal.update({
                                                'userDetails.Refferals': {
                                                    level: null,
                                                    type: null,
                                                    typeId: null,
                                                    uid: null,
                                                    earn: {
                                                        date: new Date().toString(),
                                                        amount: amountupdate.toFixed(2),
                                                        // amount: (findrefferal4?.earn?.amount || 0) + twofivePercent,
                                                    },
                                                },
                                            })
                                            await firestore().collection('Wallet').doc(findrefferal3?.uid).set(
                                                {
                                                    wallet: firestore.FieldValue.arrayUnion({
                                                        expend: 0,
                                                        fare: 0,
                                                        currency: 'usd',
                                                        deposit: twofivePercent.toFixed(2),
                                                        type: '2.5% referral amount for customer subscription',
                                                        date: new Date().toString(),
                                                        eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
                                                    }),
                                                },
                                                { merge: true },
                                            );
                                        }

                                    }
                                }
                                // const reftair1 = await firestore().collection('Users').doc(user?.Refferals?.uid).get();
                            }
                            // if (findrefferal?.level && findrefferal?.typeId == 0 && tair <= 3) {
                            //     console.log(findrefferal?.uid, '5% onborad agency');
                            //     const reftair2 = await firestore().collection('Users').doc(findrefferal?.uid).get();
                            //     console.log(findrefferal?.uid, 'Agency onboarding 10%');
                            // }
                        }
                        else {
                            // let amountupdate = (findrefferal?.earn?.amount || 0) + ninePercent
                            let amountupdate = addNumbers(findrefferal?.earn?.amount || 0, ninePercent);

                            await refferalsDoc.update({
                                'userDetails.Refferals': {
                                    ...findrefferal,
                                    earn: {
                                        date: new Date().toString(),
                                        amount: amountupdate.toFixed(2),
                                        // amount: (findrefferal?.earn?.amount || 0) + ninePercent,
                                    },
                                },
                            });
                            await firestore().collection('Wallet').doc(user?.Refferals?.uid).set(
                                {
                                    wallet: firestore.FieldValue.arrayUnion({
                                        expend: 0,
                                        fare: 0,
                                        currency: 'usd',
                                        deposit: ninePercent.toFixed(2),
                                        type: '9% referral amount for customer subscription',
                                        date: new Date().toString(),
                                        eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
                                    }),
                                },
                                { merge: true },
                            );
                            // console.log(user?.Refferals?.uid, '9%');
                        }
                        // if (!findrefferal?.level || !findrefferal?.typeId == 2 || !findrefferal?.typeId == 1)
                    }
                    // console.log(user?.Refferals?.level);
                }

            }
        } catch (e) {
            ToastAndroid.show(`Error : ${e}`, ToastAndroid.SHORT);
            console.log(e, 'updateRefferalProgram');
        }
    }

    function addNumbers(a, b) {
        const precision = 10; // Adjust the precision as needed
        return Math.round((Number(a) + Number(b)) * Math.pow(10, precision)) / Math.pow(10, precision);
    }

    // const updateFlakeInsurance = async (amount) => {
    //     if (!user?.FlakeInsurance) {
    //         return;
    //     }

    //     const { time, limits, id } = user.FlakeInsurance;
    //     const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
    //     const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;
    //     const currentTime = Date.now();
    //     const timestamp = new Date(time).getTime();
    //     // console.log(timestamp);
    //     if (
    //         (limits === '1 month' && currentTime - timestamp > oneMonthInMillis) ||
    //         (limits === '1 year' && currentTime - timestamp > oneYearInMillis)
    //     ) {
    //         const packageDoc = await firestore().collection('Package').doc('789').get();
    //         const insuranceInfo = packageDoc?.data()?.AdditionalPackages?.find(item => item.id === id);

    //         if (!insuranceInfo) {
    //             return;
    //         }
    //         let walletData = await firestore().collection('Wallet').doc(user?.uid).get()
    //         const data = walletData?.exists ? walletData.data()?.wallet : null
    //         const CalculateWallet = data ? calculateTotals(data) : null;
    //         const walletAmountAvailable = CalculateWallet ? CalculateWallet?.totalBalance : null;

    //         // const walletAmountAvailable = parseFloat(walletAmount?.totalBalance);
    //         const insuranceRate = limits === '1 month' ? insuranceInfo?.Price : insuranceInfo?.PriceTwo;
    //         console.log(insuranceRate && parseFloat(insuranceRate) <= parseFloat(walletAmountAvailable), insuranceRate && parseFloat(insuranceRate) > parseFloat(walletAmountAvailable), insuranceRate, walletAmountAvailable, '=============1========');
    //         // return
    //         if (insuranceRate && parseFloat(insuranceRate) <= parseFloat(walletAmountAvailable)) {
    //             const userRef = firestore().collection('Users').doc(user.uid);

    //             try {
    //                 // Update user details with new insurance rate and time
    //                 await userRef.update({
    //                     'userDetails.FlakeInsurance.rate': insuranceRate,
    //                     'userDetails.FlakeInsurance.time': new Date().toISOString(),
    //                 });

    //                 // Create wallet entry
    //                 const walletData = {
    //                     expend: insuranceRate,
    //                     fare: 0,
    //                     currency: 'usd',
    //                     deposit: 0,
    //                     type: 'Flake Insurance',
    //                     date: new Date().toString(),
    //                 };

    //                 // Check if the wallet entry already exists
    //                 const walletEntryExists = await firestore()
    //                     .collection('Wallet')
    //                     .doc(user?.uid)
    //                     .get();

    //                 if (walletEntryExists.exists) {
    //                     // Update existing wallet entry
    //                     await firestore()
    //                         .collection('Wallet')
    //                         .doc(user?.uid)
    //                         .update({
    //                             wallet: firestore.FieldValue.arrayUnion(walletData),
    //                         });
    //                 } else {
    //                     // Create a new wallet entry if it doesn't exist
    //                     await firestore()
    //                         .collection('Wallet')
    //                         .doc(user?.uid)
    //                         .set({
    //                             wallet: [walletData],
    //                         });
    //                 }
    //                 return
    //                 // Log success or perform additional actions if needed
    //             } catch (error) {
    //                 Toast.show(`Error updateFlakeInsurance: ${error}`, Toast.LONG);
    //             }

    //             return;
    //         }

    //         if (insuranceRate && parseFloat(insuranceRate) > parseFloat(walletAmountAvailable)) {
    //             try {
    //                 const userRef = await firestore().collection('Users').doc(user.uid);
    //                 // Remove FlakeInsurance details if the rate is greater than the available balance
    //                 await userRef.update({
    //                     'userDetails.FlakeInsurance': null,
    //                 });

    //                 setShowPoppup(true);
    //                 setShowPoppupDetail('ACTION_9');
    //             } catch (e) {
    //                 console.log('Error updateFlakeInsurance', e);
    //             }

    //             return;
    //         }
    //         return
    //     }
    //     return
    // }

    // const updateConciergeService = async (amount) => {
    //     try {
    //         if (!user?.ConciergeService) {
    //             return;
    //         }

    //         const { DCId, timeStamp } = user.ConciergeService;
    //         const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
    //         const twoDayInMillis = 2 * 24 * 60 * 60 * 1000;
    //         const currentTime = Date.now();

    //         // Fetch user details from Firestore
    //         const userRef = firestore().collection('Users').doc(DCId);
    //         const userDoc = await userRef.get();
    //         const conciergeUserTime = userDoc?.data()?.userDetails;

    //         if (conciergeUserTime?.MonthlyRatesType === 'Donation') {
    //             // Handle Donation type separately if needed
    //             return;
    //         }

    //         if (conciergeUserTime?.MonthlyRatesType === 'Monthly') {
    //             const timeDifference = currentTime - new Date(timeStamp).getTime();

    //             // Notify the user that the Concierge package is about to expire
    //             // if (timeDifference >= oneMonthInMillis - twoDayInMillis && timeDifference < oneMonthInMillis) {
    //             //     SendPushNotify(user?.uid, 'Concierge Package Expiring Soon', 'Your Concierge package is about to expire. Renew now to continue enjoying the service!');
    //             //     return;
    //             // }

    //             if (timeDifference >= oneMonthInMillis) {
    //                 let walletData = await firestore().collection('Wallet').doc(user?.uid).get()

    //                 const data = walletData?.exists ? walletData.data()?.wallet : null
    //                 const CalculateWallet = data ? calculateTotals(data) : null;
    //                 const walletAmountAvailable = CalculateWallet ? CalculateWallet?.totalBalance : null;

    //                 // const walletAmountAvailable = parseFloat(walletAmount?.totalBalance);
    //                 const ConciergePrice = conciergeUserTime?.MonthlyRates;

    //                 console.log('============================Concriege', ConciergePrice && parseFloat(ConciergePrice) > parseFloat(walletAmountAvailable), ConciergePrice && parseFloat(ConciergePrice) <= parseFloat(walletAmountAvailable), parseFloat(ConciergePrice), parseFloat(walletAmountAvailable));

    //                 if (user?.PackageId == 654 && user?.MembershipDetails?.id == 3 && user?.MembershipDetails?.limits == 'unlimited'
    //                 ) {
    //                     await handleSuccessfulConciergeUpdate(user?.uid, ConciergePrice, DCId);
    //                     return
    //                 }
    //                 // return
    //                 if (ConciergePrice && parseFloat(ConciergePrice) > parseFloat(walletAmountAvailable)) {
    //                     // Handle the case where the Concierge fee is greater than the available balance
    //                     // Remove ConciergeService details and update requestes
    //                     await handleInsufficientBalance(user, conciergeUserTime);
    //                     return;
    //                 }

    //                 if (ConciergePrice && parseFloat(ConciergePrice) <= parseFloat(walletAmountAvailable)) {
    //                     // Update user details and create wallet entry
    //                     await handleSuccessfulConciergeUpdate(user?.uid, ConciergePrice, DCId);
    //                     return
    //                 }
    //                 return
    //             }
    //         }
    //     } catch (error) {
    //         Toast.show(`Error updateConciergeService: ${error}`, Toast.LONG);
    //     }
    // }

    async function handleInsufficientBalance(user, conciergeUserTime) {
        try {
            const userRef = await firestore().collection('Users').doc(user.uid);
            // Remove ConciergeService details if the rate is greater than the available balance
            await userRef.update({
                'userDetails.ConciergeService': null,
            });

            // Update requestes by removing entries related to Concierge
            await updateRequestes(user, conciergeUserTime);

            setShowPoppup(true);
            setShowPoppupDetail('ACTION_10');
        } catch (e) {
            console.log('Error handling insufficient balance:', e);
        }
    }

    async function updateRequestes(user, conciergeUserTime) {
        try {
            const RequestesRef = firestore().collection('Requestes');
            const myRef = RequestesRef?.doc(user?.uid);
            const ConciergeRef = RequestesRef?.doc(conciergeUserTime?.uid);

            const myRequestesDoc = await myRef?.get();
            const conciergeRequestesDoc = await ConciergeRef?.get();

            const myfilterRequestes = myRequestesDoc?.data().MoreRequestes?.filter(item => item?.sendby !== conciergeUserTime?.uid);
            const ConciergefilterRequestes = conciergeRequestesDoc?.data()?.MoreRequestes?.filter(item => item?.sendby !== user?.uid);

            // Update my requestes
            await myRef.update({
                MoreRequestes: myfilterRequestes,
            });
            // Update concierge requestes
            await ConciergeRef.update({
                MoreRequestes: ConciergefilterRequestes,
            });
        } catch (error) {
            console.log('Error updating requestes:', error);
        }
    }

    async function handleSuccessfulConciergeUpdate(userId, ConciergePrice, DCId) {
        try {
            // Update user details with new ConciergeService timestamp
            await firestore().collection('Users').doc(userId).update({
                'userDetails.ConciergeService.timeStamp': new Date().toISOString(),
            });

            // Create wallet entry
            const walletData = {
                expend: ConciergePrice.toString(),
                fare: 0,
                currency: 'usd',
                deposit: 0,
                type: 'Concierge Fee',
                date: new Date().toString(),
            };

            if (user?.PackageId == 654 && user?.MembershipDetails?.id == 3 && user?.MembershipDetails?.limits == 'unlimited'
            ) {
                await firestore()
                    .collection('Wallet')
                    .doc(DCId)
                    .set(
                        {
                            wallet: firestore.FieldValue.arrayUnion({
                                expend: '0',
                                fare: 0,
                                currency: 'usd',
                                deposit: ConciergePrice.toString(),
                                type: 'Concierge Service Fee',
                                date: new Date().toString(),
                            }),
                        },
                        { merge: true },
                    )
                return
            }
            else {
                await firestore()
                    .collection('Wallet')
                    .doc(userId)
                    .set(
                        {
                            wallet: firestore.FieldValue.arrayUnion(walletData),
                        },
                        { merge: true },
                    ).then(async () => {
                        await firestore()
                            .collection('Wallet')
                            .doc(DCId)
                            .set(
                                {
                                    wallet: firestore.FieldValue.arrayUnion({
                                        expend: '0',
                                        fare: 0,
                                        currency: 'usd',
                                        deposit: ConciergePrice.toString(),
                                        type: 'Concierge Service Fee',
                                        date: new Date().toString(),
                                    }),
                                },
                                { merge: true },
                            )
                    })
            }

            // Check if the wallet entry already exists
            console.log('Updated successfully ====>');
        } catch (error) {
            console.log('Error handling successful Concierge update:', error);
        }
    }

    const SendPushNotify = (uid, title, mymsg) => {
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
                            title: `${title}`,
                            body: `${mymsg}`,
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


    useEffect(() => {
        GetPaymentCards();
        // console.log(userPackage);
        DatesServay();
        onCheckFilteration();
        GetWalletAmount();
        Refereshcards();
        CheckAdditionalPackages();

    }, [userPackage, user])


    useEffect(() => {
        fetchusersMain()
        // console.log('Effect is running');
        const fetchData = async () => {
            await fetchUsersUid();
            await fetchUsersLikedYou();
            // await fetchusersMain();
            await locationPermission();
            await getCurrentLocation();
            await GetFcmToken();
            await fetchMyEvents();
            await AskRefferalCode();
            await getAffiliatePrice();
            // await updateMembershipStatus(walletAmount?.totalBalance);
            // await updateFlakeInsurance(walletAmount?.totalBalance);
            // await updateConciergeService(walletAmount?.totalBalance);
        }
        if (!initialRender) {
            fetchData();
            setInitialRender(true);
        }

    }, [focus]);


    async function onAuthStateChanged(user) {
        // console.log('user: ', user);
        if (user) {
            // await updateFlakeInsurance(user?.uid)
            // await updateConciergeService(user?.uid)
            firestore().collection('Users')
                .doc(user.uid)
                .onSnapshot(async documentSnapshot => {
                    // console.log(documentSnapshot.exists);
                    if (documentSnapshot.exists) {
                        const data = documentSnapshot.data().userDetails
                        // console.log(data);
                        if (data.Category == 'Mediator') {
                            console.log(user.uid);
                            // dispatch(mediatorLogin(documentSnapshot.data()))
                            // MediatorUserLogin(user.uid);
                            return
                        }
                        else {
                            // await updateMembershipStatus(data)
                            dispatch(login(data))
                            // dispatchLoginUser(data)
                            return
                        }
                    }
                });
        }
    }


    useEffect(() => {
        onAuthStateChanged(user)
    }, [focus])


    useEffect(() => {
        fetchChatuserMain();
        // console.log(ChatUserId);
    }, [ChatUserId]);


    const AskRefferalCode = async () => {
        try {
            // await AsyncStorage.removeItem('refferalCode');

            let data = await AsyncStorage.getItem('refferalCode');
            data = JSON.parse(data);
            // console.log('====================================> : ', data);
            if (!data?.status && !user?.Refferals?.level) {
                setModal({
                    ...modal,
                    enable: true,
                    title: 'Unlock Exclusive Rewards with a VIP Code!',
                    type: true
                })
            }
        } catch (e) {
            console.log(e);
        }
        // console.log('askrefferal');
    }


    const onSkipRefferal = async () => {
        try {
            // Serialize the object to JSON before storing in AsyncStorage
            await AsyncStorage.setItem('refferalCode', JSON.stringify({
                status: true
            }));
            setModal({
                ...modal,
                enable: false,
                title: null,
                description: null,
                type: false,
            })
        } catch (error) {
            console.error('Error in onSkipRefferal:', error);
        }
    }


    const onSubmitRefferal = async () => {
        if (!refferalInput) {
            ToastAndroid.show('Please enter referral code to continue!', ToastAndroid.SHORT);
            setRefferalInputError(true);
            return;
        }
        try {
            setUploading(true)
            const ref = firestore().collection('Users');
            const refdoc = await ref?.get();
            if (!refdoc?.empty) {
                const foundUser = refdoc?.docs.find((doc) => {
                    const userDetails = doc?.data()?.userDetails;

                    // console.log(userDetails?.Category === 'Mediator', userDetails?.MediatorId , 1, userDetails?.VipCode , refferalInput);
                    return (
                        (userDetails?.Category === 'Mediator' && userDetails?.MediatorId === 1 && userDetails?.VipCode === refferalInput) ||
                        (userDetails?.Category === 'Mediator' && userDetails?.MediatorId === 10 && userDetails?.VipCode === refferalInput)
                    );
                });
                if (foundUser) {
                    // const Checkexit = doc?.data()?.Refferals;
                    // const index = Checkexit?.findIndex(item => item.uid == data?.uid);
                    // if (index !== -1) {
                    //     Checkexit[index] = {
                    //         ...Checkexit[index], // Copy existing data
                    //         level: data?.VipCode,
                    //         type: data?.MediatorId == 1 ? 'influencer' : data?.MediatorId == 10 ? 'In-house Talent Agency onboarding' : 'Customer',
                    //         typeId: data?.MediatorId == 1 ? 1 : data?.MediatorId == 10 ? 0 : 2,
                    //         date: new Date().toString(),
                    //         // You can update other fields here as well
                    //     };
                    //     await ref.doc(user?.uid).update({
                    //         'userDetails.Refferals': Checkexit
                    //     }).then(async (res) => {
                    //         const documentSnapShot = await ref.doc(data?.uid).get();
                    //         if (documentSnapShot?.exists) {
                    //             const dataArray = documentSnapShot?.data()?.Refferals
                    //             if (dataArray?.length > 0) {
                    //                 const index = dataArray.findIndex(item => item?.level == refferalInput);
                    //                 if (index !== -1) {
                    //                     dataArray[index] = {
                    //                         ...dataArray[index], // Copy existing data
                    //                         level: null,
                    //                         type: user?.MediatorId == 1 ? 'influencer' : user?.MediatorId == 10 ? 'In-house Talent Agency onboarding' : 'Customer',
                    //                         typeId: user?.MediatorId == 1 ? 1 : user?.MediatorId == 10 ? 0 : 2,
                    //                         uid: user?.uid,
                    //                         date: new Date().toString(),
                    //                         // You can update other fields here as well
                    //                     };
                    //                     await ref.doc(data?.uid).set({
                    //                         Refferals: dataArray,
                    //                     }).then(async (res) => {
                    //                         setUploading(false)
                    //                         ToastAndroid.show('Refferal code add successfully', ToastAndroid.SHORT);
                    //                         onSkipRefferal();
                    //                     })
                    //                 }
                    //                 else {
                    //                     await ref.doc(data?.uid).set({
                    //                         Refferals: firestore.FieldValue.arrayUnion({
                    //                             level: null,
                    //                             type: user?.MediatorId == 1 ? 'influencer' : user?.MediatorId == 10 ? 'In-house Talent Agency onboarding' : 'Customer',
                    //                             typeId: user?.MediatorId == 1 ? 1 : user?.MediatorId == 10 ? 0 : 2,
                    //                             uid: user?.uid,
                    //                             date: new Date().toString(),
                    //                         })
                    //                     }, { merge: true }).then(async (res) => {
                    //                         setUploading(false)
                    //                         ToastAndroid.show('Refferal code add successfully', ToastAndroid.SHORT);
                    //                         onSkipRefferal();
                    //                     })
                    //                 }
                    //             }
                    //             else {
                    //                 await ref.doc(data?.uid).set({
                    //                     Refferals: firestore.FieldValue.arrayUnion({
                    //                         level: null,
                    //                         type: user?.MediatorId == 1 ? 'influencer' : user?.MediatorId == 10 ? 'In-house Talent Agency onboarding' : 'Customer',
                    //                         typeId: user?.MediatorId == 1 ? 1 : user?.MediatorId == 10 ? 0 : 2,
                    //                         uid: user?.uid,
                    //                         date: new Date().toString(),
                    //                     })
                    //                 }, { merge: true }).then(async (res) => {
                    //                     setUploading(false)
                    //                     ToastAndroid.show('Refferal code add successfully', ToastAndroid.SHORT);
                    //                     onSkipRefferal();
                    //                 })
                    //             }
                    //         }
                    //     })
                    // }
                    // else {
                    const data = foundUser.data().userDetails
                    let updated = {
                        level: data?.VipCode,
                        type: data?.MediatorId == 1 ? 'influencer' : data?.MediatorId == 10 ? 'In-house Talent Agency onboarding' : 'Customer',
                        typeId: data?.MediatorId == 1 ? 1 : data?.MediatorId == 10 ? 0 : 2,
                        uid: data?.uid,
                        date: new Date().toString(),
                    }

                    await ref.doc(user?.uid).update({
                        'userDetails.Refferals': updated
                    }).then(async (res) => {
                        const documentSnapShot = await ref.doc(data?.uid).get();
                        if (documentSnapShot?.exists) {
                            const dataArray = documentSnapShot?.data()?.Refferals
                            if (dataArray?.length > 0) {
                                const index = dataArray.findIndex(item => item?.uid == user?.uid);
                                if (index !== -1) {
                                    dataArray[index] = {
                                        ...dataArray[index], // Copy existing data
                                        level: null,
                                        type: user?.MediatorId == 1 ? 'influencer' : user?.MediatorId == 10 ? 'In-house Talent Agency onboarding' : 'Customer',
                                        typeId: user?.MediatorId == 1 ? 1 : user?.MediatorId == 10 ? 0 : 2,
                                        uid: user?.uid,
                                        date: new Date().toString(),
                                        // You can update other fields here as well
                                    };
                                    await ref.doc(data?.uid).update({
                                        Refferals: dataArray,
                                    }).then(async (res) => {
                                        setUploading(false)
                                        ToastAndroid.show('Refferal code add successfully', ToastAndroid.SHORT);
                                        onSkipRefferal();
                                    })
                                }
                                else {
                                    await ref.doc(data?.uid).update({
                                        Refferals: firestore.FieldValue.arrayUnion({
                                            level: null,
                                            type: user?.MediatorId == 1 ? 'influencer' : user?.MediatorId == 10 ? 'In-house Talent Agency onboarding' : 'Customer',
                                            typeId: user?.MediatorId == 1 ? 1 : user?.MediatorId == 10 ? 0 : 2,
                                            uid: user?.uid,
                                            date: new Date().toString(),
                                        })
                                    }, { merge: true }).then(async (res) => {
                                        setUploading(false)
                                        ToastAndroid.show('Refferal code add successfully', ToastAndroid.SHORT);
                                        onSkipRefferal();
                                    })
                                }
                            }
                            else {
                                await ref.doc(data?.uid).set({
                                    Refferals: firestore.FieldValue.arrayUnion({
                                        level: null,
                                        type: user?.MediatorId == 1 ? 'influencer' : user?.MediatorId == 10 ? 'In-house Talent Agency onboarding' : 'Customer',
                                        typeId: user?.MediatorId == 1 ? 1 : user?.MediatorId == 10 ? 0 : 2,
                                        uid: user?.uid,
                                        date: new Date().toString(),
                                    })
                                }, { merge: true }).then(async (res) => {
                                    setUploading(false)
                                    ToastAndroid.show('Refferal code add successfully', ToastAndroid.SHORT);
                                    onSkipRefferal();
                                })
                            }
                        }
                    })

                    // }
                    //   if (foundUser?.data()?.userDetails?.VipCode !== mediator?.userDetails?.VipCode) {
                    // console.log(foundUser.data().userDetails);
                    // console.log('==' , updated);
                    return;

                    //   else {
                    //     setUploading(false)
                    //     ToastAndroid.show(
                    //       "Sorry, you can't use your own referral code. Share the app with your friends and ask them to use your code to earn rewards!",
                    //       ToastAndroid.SHORT
                    //     );
                    //     setRefferalInputError(true);
                    //   }
                } else {
                    setUploading(false)
                    ToastAndroid.show('Incorrect referral code!', ToastAndroid.SHORT);
                    setRefferalInputError(true);
                }
            }
        } catch (e) {
            setUploading(false)
            console.log(e);
            ToastAndroid.show(`Error: ${e}`, ToastAndroid.SHORT);
        }
    };


    const Refereshcards = () => {
        dispatch(TicketsAddtoCard(null))
        dispatch(FlakesBill(null))
        dispatch(ConciergeSendRequest(null))
        dispatch(Buypackages(''))
        dispatch(BuyAdditionalPackages(''))
        dispatch(DepositAmount(null))
        if (AddToCard?.length > 0) {
            AddToCard?.map((e) => {
                dispatch(removeFromCart(e))
            })
        }
        else {
            console.log('food item not found');
        }
    }

    const currentDate = new Date();

    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    const calculateTotals = (transactions) => {
        const totals = {
            totalDeposit: 0.0,
            totalExpend: 0.0,
            totalBalance: 0.0,
            lastMonthTotalDeposit: 0.0,
            lastMonthTotalExpend: 0.0,
            lastYearTotalDeposit: 0.0,
            lastYearTotalExpend: 0.0,
        };

        transactions.forEach((transaction) => {
            const transactionDate = new Date(transaction.date);
            const isLastMonth = transactionDate >= oneMonthAgo && transactionDate <= currentDate;
            const isLastYear = transactionDate >= oneYearAgo && transactionDate <= currentDate;

            // totals.totalDeposit += transaction.deposit;
            // totals.totalExpend += transaction.expend;
            const deposit = parseFloat(transaction.deposit);
            const expend = parseFloat(transaction.expend);

            if (!isNaN(deposit)) {
                totals.totalDeposit += deposit;
                if (isLastMonth) {
                    totals.lastMonthTotalDeposit += deposit;
                }
                if (isLastYear) {
                    totals.lastYearTotalDeposit += deposit;
                }
            }

            if (!isNaN(expend)) {
                totals.totalExpend += expend;
                if (isLastMonth) {
                    totals.lastMonthTotalExpend += expend;
                }
                if (isLastYear) {
                    totals.lastYearTotalExpend += expend;
                }
            }
        });

        totals.totalBalance = (totals.totalDeposit - totals.totalExpend).toFixed(2);
        totals.lastYearTotalExpend = totals.lastYearTotalExpend.toFixed(2);
        totals.lastMonthTotalExpend = totals.lastMonthTotalExpend.toFixed(2);
        totals.lastMonthTotalDeposit = totals.lastMonthTotalDeposit.toFixed(2);
        totals.lastYearTotalDeposit = totals.lastYearTotalDeposit.toFixed(2);

        return totals;
    };

    const GetWalletAmount = async () => {
        try {
            let ref = firestore().collection('Wallet').doc(user?.uid)
            let refGet = await ref.get()
            if (refGet?.exists) {
                const data = refGet.data()?.wallet
                // console.log('===>  Wallet', data);
                if (data?.length > 0) {
                    const totals = calculateTotals(data);
                    // console.log(totals, '========>:');
                    dispatch(WalletAmount(totals))
                }

            }
        } catch (e) {
            console.log(e);
        }
    }

    const CheckAdditionalPackages = async () => {
        // console.log('additionalPackages');
        if (user?.AdditionalPackageId && user?.AdditionalPackageDetails) {
            // console.log('membershipstatus' , user);
            const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // One month in milliseconds
            const oneYearInMillis = 365 * 24 * 60 * 60 * 1000; // One year in milliseconds
            const oneDayInMillis = 24 * 60 * 60 * 1000; // One day in milliseconds
            const currentTime = Date.now();
            const Timestamp = new Date(user?.AdditionalPackageDetails?.time).getTime();
            if (
                (user?.AdditionalPackageDetails?.limits == '1 day' && currentTime - Timestamp > oneDayInMillis)
            ) {
                const userRef = await firestore().collection('Users')
                    .doc(user.uid)
                userRef.update({
                    'userDetails.AdditionalPackageId': null,
                    'userDetails.AdditionalPackageDetails': null,
                    // 'userDetails.FlakeTime': FlakeBill?.FlakeTime
                })
            }
        }
    }


    const fetchMyEvents = async () => {
        try {
            const snapshot = await firestore()
                .collection('SellTickets')
                .doc(user?.uid)
                .get();

            const ticketsHistory = snapshot?.data()?.TicketsHistory;
            if (ticketsHistory?.length > 0) {
                const uniqueEventIds = [...new Set(ticketsHistory.map(item => item?.TicketAddToCard?.euid))];
                const eventDataPromises = uniqueEventIds.map(async eventId => {
                    const eventSnapshot = await firestore()
                        .collection('Events')
                        .doc(eventId)
                        .get();

                    if (eventSnapshot.exists) {
                        return eventSnapshot.data();
                    } else {
                        console.log(`Event with ID ${eventId} not found`);
                        return null;
                    }
                });
                const eventData = await Promise.all(eventDataPromises);

                const validEventData = eventData.filter(item => item !== null);

                // console.log(validEventData?.length , '-=====>');
                dispatch(Myevents(validEventData));
            }
        } catch (e) {
            console.log(e);
        }
        // return
        // let EveId = []
        // await firestore()
        //     .collection('SellTickets')
        //     .doc(user?.uid)
        //     // .limit(1)
        //     .onSnapshot(querySnapshot => {
        //         // console.log('chatUser here  : ', querySnapshot?.data());
        //         if (querySnapshot?.data()?.TicketsHistory) {
        //             querySnapshot?.data()?.TicketsHistory?.map((item) => {
        //                 // console.log('kzjckja',item?.TicketAddToCard?.euid);
        //                 EveId.push(item?.TicketAddToCard?.euid)
        //             })
        //         }
        //         if (EveId?.length > 0) {
        //             // setLoadingforMe(true)
        //             const removeDublication = EveId?.filter((item,
        //                 index) => EveId?.indexOf(item) === index);
        //             // console.log('====>', removeDublication);
        //             // return
        //             let data = [];
        //             removeDublication?.map(async (j) => {
        //                 // console.log(j);
        //                 try {
        //                     const getdata = await firestore()
        //                         .collection('Events')
        //                         .doc(j)
        //                         .get();

        //                     if (getdata.exists) {
        //                         data.push(getdata.data());
        //                     } else {
        //                         console.log('Document not found');
        //                     }
        //                 } catch (error) {
        //                     console.error('Error fetching data:', error);
        //                 }
        //                 dispatch(Myevents(data))
        //             })
        //         }
        //     })
    }

    const openSettingsModal = (cardIndex) => {
        const test = users[cardIndex]
        const images = [];
        for (let i = 1; i <= 6; i++) {
            const image = test.userDetails[`image${i}`];
            if (image) {
                images.push({ uri: image });
            }
        }
        // console.log('here is current card data: ', images);
        const updatedUserDetails = {
            ...test.userDetails,
            ImagesArray: images
        };

        // Create a new user object with updated userDetails
        const updatedUser = {
            ...test,
            userDetails: updatedUserDetails
        };
        setModalData(updatedUser);
        setModalVisible(!modalVisible);
        // cardData = cards[cardIndex]
        // console.log('modal data', updatedUser);
    }
    const OpenForChating = (cardIndex) => {
        // console.log(`on swiped right guester , ${swipeCount}`)
        const Data = users[cardIndex];
        const DataId = Data?.userDetails?.uid;

        let newDate = new Date();
        let convertSwipeDate = new Date(user?.TotalSwipes?.creatTimeStamp)
        const momentDate = moment(convertSwipeDate, 'DD/MM/YYYY');
        const SwipeDate = momentDate.toDate().toDateString();

        const handleSubmitChatUser = () => {
            SubmitChatUSer(Data, DataId);
            MatchUsers(Data, DataId);
            setModalVisible(false);
            UpdateUserSwips(swipeCount);
        };

        const handlePopup = (popupDetail) => {
            setShowPoppup(true);
            setShowPoppupDetail(popupDetail);
        };

        const handleSwipe = (popupDetail) => {
            setdisableRightSwipe(true);
            handlePopup(popupDetail);
        };

        const isSwipeLimitExceeded = (limit) => user?.TotalSwipes?.Swipe > limit;
        const isPackageMatch = (packageId) => (Data?.userDetails?.PackageId == 654 && packageId == 654) || (Data?.userDetails?.PackageId < 654 || !Data?.userDetails?.PackageId);


        const commonSwipeActions = (limit, popupDetail) => {
            if (isSwipeLimitExceeded(limit)) {
                handleSwipe(popupDetail);
            } else {
                setdisableRightSwipe(false);
                handleSubmitChatUser();
            }
        };

        const handlePackageConditions = (limit, popupDetail) => {
            if (isSwipeLimitExceeded(limit) && newDate.toDateString() == SwipeDate) {
                handleSwipe(popupDetail);
            } else {
                setdisableRightSwipe(false);
                handleSubmitChatUser();
            }
        };

        if (!user?.SelectionTwo || user?.SelectionTwo < 6) {
            if (isPackageMatch(user?.PackageId)) {
                handlePackageConditions(24, 'ACTION_1');
            }
            else {
                // console.log('99');
                handleSwipe('ACTION_6');
                setdisableRightSwipe(false);
            }
        } else if (!user?.SelectionThree || user?.SelectionThree < 5) {
            if (isPackageMatch(user?.PackageId)) {
                handlePackageConditions(24, 'ACTION_2');
            }
            else {
                // console.log('99');
                handleSwipe('ACTION_6');
                setdisableRightSwipe(false);
            }
            // console.log('heeee');
        } else {
            switch (user?.PackageId) {
                case undefined:
                    if (isPackageMatch(user?.PackageId)) {
                        handlePackageConditions(24, 'ACTION_3');
                        // console.log('hhhhhee');
                    }
                    else {
                        // console.log('99');
                        handleSwipe('ACTION_6');
                        setdisableRightSwipe(false);
                    }
                    break;
                case '123':
                    if (isPackageMatch(user?.PackageId)) {
                        handlePackageConditions(34, 'ACTION_4');
                    }
                    else {
                        // console.log('99');
                        handleSwipe('ACTION_6');
                        setdisableRightSwipe(false);
                    }
                    break;
                case '456':
                    if (isPackageMatch(user?.PackageId)) {
                        handlePackageConditions(44, 'ACTION_5');
                    }
                    else {
                        // console.log('99');
                        handleSwipe('ACTION_6');
                        setdisableRightSwipe(false);
                    }
                    break;
                case '654':
                    setdisableRightSwipe(false);
                    handleSubmitChatUser();
                    break;
                default:
                    if (isPackageMatch(user?.PackageId)) {
                        setdisableRightSwipe(false);
                        handleSubmitChatUser();
                    } else {
                        // console.log('99');
                        handleSwipe('ACTION_6');
                        setdisableRightSwipe(false);
                    }
                    break;
            }
        }




        return

        // if (user?.SelectionTwo < 6 || !user?.SelectionTwo) {
        //     if (user?.TotalSwipes?.Swipe > 24) {
        //         setdisableRightSwipe(true)
        //         setShowPoppup(true)
        //         setShowPoppupDetail('ACTION_1')
        //     }
        //     else {
        //         setdisableRightSwipe(false)
        //         if (cardIndex) {
        //             if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false);
        //                 UpdateUserSwips(swipeCount);
        //             } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false);
        //                 UpdateUserSwips(swipeCount)
        //             } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                 console.log('=====> :im here ');
        //                 setShowPoppup(true);
        //                 setShowPoppupDetail('ACTION_6');
        //                 UpdateUserSwips(swipeCount)
        //             }
        //         }
        //         else {
        //             if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false)
        //                 UpdateUserSwips(swipeCount)
        //                 // swiper.swipeRight()
        //             } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false)
        //                 UpdateUserSwips(swipeCount)
        //                 // swiper.swipeRight()
        //             } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                 setShowPoppup(true);
        //                 setShowPoppupDetail('ACTION_6');
        //                 setModalVisible(false)
        //                 // swiper.swipeRight()
        //                 UpdateUserSwips(swipeCount)
        //             }
        //         }
        //     }
        // }
        // else if (user?.SelectionThree < 5 || !user?.SelectionThree) {
        //     if (user?.TotalSwipes?.Swipe > 24) {
        //         setdisableRightSwipe(true)
        //         setShowPoppup(true)
        //         setShowPoppupDetail('ACTION_2')
        //     }
        //     else {
        //         setdisableRightSwipe(false)
        //         if (cardIndex) {
        //             if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false)
        //                 UpdateUserSwips(swipeCount)
        //             } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false)
        //                 UpdateUserSwips(swipeCount)
        //             } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                 setShowPoppup(true);
        //                 setShowPoppupDetail('ACTION_6');
        //                 UpdateUserSwips(swipeCount)
        //             }
        //         }
        //         else {
        //             if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false)
        //                 UpdateUserSwips(swipeCount)
        //                 // swiper.swipeRight()
        //             } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false)
        //                 UpdateUserSwips(swipeCount)
        //                 // swiper.swipeRight()
        //             } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                 setShowPoppup(true);
        //                 setShowPoppupDetail('ACTION_6');
        //                 setModalVisible(false)
        //                 // swiper.swipeRight()
        //                 UpdateUserSwips(swipeCount)
        //             }
        //         }
        //     }
        // }
        // else {
        //     // console.log(SwipeDate,newDate.toDateString(),Data?.userDetails?.PackageId,user?.PackageId , '==== >123 :');
        //     // return
        //     // console.log('here', Data?.userDetails);
        //     // return
        //     if (!user?.PackageId) {
        //         if (user?.TotalSwipes?.Swipe > 24 && newDate.toDateString() == SwipeDate) {
        //             setdisableRightSwipe(true)
        //             setShowPoppup(true)
        //             setShowPoppupDetail('ACTION_3')
        //         }
        //         else {
        //             setdisableRightSwipe(false)
        //             if (cardIndex) {
        //                 if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                 } else if (Data?.userDetails?.PackageId < 654 || !Data?.userDetails?.PackageId) {
        //                     // console.log('dimaond', Data?.userDetails?.PackageId);
        //                     // return
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                 } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                     // console.log('test conditions ==> ',Data?.userDetails?.PackageId == 654 && user?.PackageId != 654);
        //                     // return
        //                     setShowPoppup(true);
        //                     setShowPoppupDetail('ACTION_6');
        //                     UpdateUserSwips(swipeCount)
        //                     // swiper.swipeRight()
        //                 }
        //             }
        //             else {
        //                 if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                     // swiper.swipeRight()
        //                 } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                     // console.log('normal', Data);
        //                     // return
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                     // swiper.swipeRight()

        //                 } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                     // console.log('dimaond', Data?.userDetails?.PackageId);
        //                     // return
        //                     setShowPoppup(true);
        //                     setShowPoppupDetail('ACTION_6');
        //                     setModalVisible(false)
        //                     // swiper.swipeRight()
        //                     UpdateUserSwips(swipeCount)
        //                 }
        //             }
        //         }
        //     }
        //     else if (user?.PackageId == 123) {
        //         if (user?.TotalSwipes?.Swipe > 34 && newDate.toDateString() == SwipeDate) {
        //             setdisableRightSwipe(true)
        //             setShowPoppup(true)
        //             setShowPoppupDetail('ACTION_4')
        //         }
        //         else {
        //             setdisableRightSwipe(false)
        //             if (cardIndex) {
        //                 if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                 } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                 } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                     setShowPoppup(true);
        //                     setShowPoppupDetail('ACTION_6');
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                 }

        //             }
        //             else {
        //                 if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                     // swiper.swipeRight()
        //                 } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount);
        //                     // swiper.swipeRight();
        //                 } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                     setShowPoppup(true);
        //                     setShowPoppupDetail('ACTION_6');
        //                     setModalVisible(false)
        //                     // swiper.swipeRight()
        //                     UpdateUserSwips(swipeCount)
        //                 }
        //             }
        //         }
        //     }
        //     else if (user?.PackageId == 456) {
        //         if (user?.TotalSwipes?.Swipe > 44 && newDate.toDateString() == SwipeDate) {
        //             setdisableRightSwipe(true)
        //             setShowPoppup(true)
        //             setShowPoppupDetail('ACTION_5')
        //         }
        //         else {
        //             setdisableRightSwipe(false)
        //             if (cardIndex) {
        //                 if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                 } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                 } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                     setShowPoppup(true);
        //                     setShowPoppupDetail('ACTION_6');
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                 }
        //             }
        //             else {
        //                 if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                     // swiper.swipeRight()
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                 } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                     // swiper.swipeRight()
        //                     SubmitChatUSer(Data, DataId);
        //                     MatchUsers(Data, DataId);
        //                     setModalVisible(false)
        //                     UpdateUserSwips(swipeCount)
        //                 } else if (Data?.userDetails?.PackageId === 654 && user?.PackageId != 654) {
        //                     setShowPoppup(true);
        //                     setShowPoppupDetail('ACTION_6');
        //                     setModalVisible(false)
        //                     // swiper.swipeRight()
        //                     UpdateUserSwips(swipeCount)
        //                 }
        //             }
        //         }
        //     }
        //     else if (user?.PackageId == 654) {
        //         setdisableRightSwipe(false)
        //         // console.log('=====> :', Data, DataId);
        //         // return
        //         if (cardIndex) {
        //             if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                 // console.log('yes');
        //                 // return
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false)
        //                 UpdateUserSwips(swipeCount)
        //             } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false)
        //                 UpdateUserSwips(swipeCount)
        //             } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                 setShowPoppup(true);
        //                 setShowPoppupDetail('ACTION_6');
        //                 setModalVisible(false)
        //                 UpdateUserSwips(swipeCount)
        //             }
        //         }
        //         else {
        //             // console.log('yes' , Data?.userDetails?.PackageId , user?.PackageId);
        //             //     return
        //             if (Data?.userDetails?.PackageId == 654 && user?.PackageId == 654) {
        //                 // swiper.swipeRight()
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false)
        //                 UpdateUserSwips(swipeCount)
        //             } else if (!Data?.userDetails?.PackageId || Data?.userDetails?.PackageId < 654) {
        //                 // swiper.swipeRight();
        //                 SubmitChatUSer(Data, DataId);
        //                 MatchUsers(Data, DataId);
        //                 setModalVisible(false);
        //                 UpdateUserSwips(swipeCount);
        //             } else if (Data?.userDetails?.PackageId == 654 && user?.PackageId != 654) {
        //                 setShowPoppup(true);
        //                 setShowPoppupDetail('ACTION_6');
        //                 setModalVisible(false)
        //                 // swiper.swipeRight()
        //                 UpdateUserSwips(swipeCount)
        //             }
        //         }
        //     }
        // }
        // SendToChatUSer(CurrentuserData, DataId);
        // navigation.navigate('Message')
    }
    const onSwipRight = (props) => {
        // console.log(user, '=======>');
        // return
        let newDate = new Date();
        let convertSwipeDate = new Date(user?.TotalSwipes?.creatTimeStamp)
        const momentDate = moment(convertSwipeDate, 'DD/MM/YYYY');
        const SwipeDate = momentDate.toDate().toDateString();
        const Data = props

        const handlePopup = (popupDetail) => {
            setShowPoppup(true);
            setShowPoppupDetail(popupDetail);
        };

        const handleSwipe = (popupDetail) => {
            setdisableRightSwipe(true);
            handlePopup(popupDetail);
        };

        const isSwipeLimitExceeded = (limit) => user?.TotalSwipes?.Swipe > limit;
        const isPackageMatch = (packageId) => (Data?.userDetails?.PackageId == 654 && packageId == 654) || (Data?.userDetails?.PackageId < 654 || !Data?.userDetails?.PackageId);


        // const commonSwipeActions = (limit, popupDetail) => {
        //     if (isSwipeLimitExceeded(limit)) {
        //         handleSwipe(popupDetail);
        //     } else {
        //         setdisableRightSwipe(false);
        //         swiper?.swipeRight()
        //     }
        // };

        const performSwipeAction = (limit, popupDetail) => {
            if (isSwipeLimitExceeded(limit) && newDate.toDateString() == SwipeDate) {
                handleSwipe(popupDetail);
            } else {
                setdisableRightSwipe(false);
                swiper.swipeRight()
            }
        };
        const handleUserConditions = (limit, popupDetail, selection) => {
            // console.log(limit, popupDetail, selection);
            // return
            if (selection) {
                if (isPackageMatch(user?.PackageId)) {
                    performSwipeAction(limit, popupDetail);
                } else {
                    handleSwipe('ACTION_6');
                    setdisableRightSwipe(false);
                }
            }
        }

        if (!user?.SelectionTwo || user?.SelectionTwo < 6) {
            handleUserConditions(24, 'ACTION_1', !user?.SelectionTwo || user?.SelectionTwo < 6);
            // if (isPackageMatch(user?.PackageId)) {
            //     commonSwipeActions(24, 'ACTION_1');
            // }
            // else {
            //     console.log('sectiontwo');
            //     handleSwipe('ACTION_6');
            //     setdisableRightSwipe(false);
            // }
        } else if (!user?.SelectionThree || user?.SelectionThree < 5) {
            handleUserConditions(24, 'ACTION_2', !user?.SelectionThree || user?.SelectionThree < 5);
            // if (isPackageMatch(user?.PackageId)) {
            //     commonSwipeActions(24, 'ACTION_2');
            // }
            // else {
            //     console.log('selctionthree');
            //     handleSwipe('ACTION_6');
            //     setdisableRightSwipe(false);
            // }
        } else {
            switch (user?.PackageId) {
                case undefined:
                    handleUserConditions(24, 'ACTION_3', true);
                    break;
                case '123':
                    handleUserConditions(34, 'ACTION_4', true);
                    break;
                case '456':
                    handleUserConditions(44, 'ACTION_5', true);
                    break;
                case '654':
                    // console.log('654');
                    setdisableRightSwipe(false);
                    swiper.swipeRight()
                    break;
                default:
                    if (isPackageMatch(user?.PackageId)) {
                        // console.log('default');
                        setdisableRightSwipe(false);
                        swiper.swipeRight()
                    } else {
                        // console.log('else default');
                        handleSwipe('ACTION_6');
                        setdisableRightSwipe(false);
                    }
                    break;
            }
        }
    }
    const onSwipLeft = async (props) => {
        // const Data = users[cardIndex];
        // const DataId = Data?.userDetails?.uid;
        // console.log(swiper, '===>');

        let newDate = new Date();
        let convertSwipeDate = new Date(user?.TotalSwipes?.creatTimeStamp)
        const momentDate = moment(convertSwipeDate, 'DD/MM/YYYY');
        const SwipeDate = momentDate.toDate().toDateString();

        const handleSubmitChatUser = async () => {
            if (props) {
                setdisableLeftSwipe(false)
                await UpdateUserSwips(swipeCount)
            }
            else {
                setModalVisible(false)
                setdisableLeftSwipe(false)
                swiper.swipeLeft()
                await UpdateUserSwips(swipeCount)
            }
            // SubmitChatUSer(Data, DataId);
            // MatchUsers(Data, DataId);
            // setModalVisible(false);
            // UpdateUserSwips(swipeCount);
        };

        const handlePopup = (popupDetail) => {
            setShowPoppup(true);
            setShowPoppupDetail(popupDetail);
        };

        const handleSwipe = (popupDetail) => {
            setdisableLeftSwipe(true);
            handlePopup(popupDetail);
        };

        const isSwipeLimitExceeded = (limit) => user?.TotalSwipes?.Swipe > limit;
        // const isPackageMatch = (packageId) => (Data?.userDetails?.PackageId == 654 && packageId == 654) || (Data?.userDetails?.PackageId < 654 || !Data?.userDetails?.PackageId);

        const commonSwipeActions = (limit, popupDetail) => {
            if (isSwipeLimitExceeded(limit)) {
                handleSwipe(popupDetail);
            } else {
                setdisableLeftSwipe(false);
                handleSubmitChatUser();
            }
        };

        const handlePackageConditions = (limit, popupDetail) => {
            if (isSwipeLimitExceeded(limit) && newDate.toDateString() == SwipeDate) {
                handleSwipe(popupDetail);
            } else {
                setdisableLeftSwipe(false);
                handleSubmitChatUser();
            }
        };

        if (!user?.SelectionTwo || user?.SelectionTwo < 6) {
            commonSwipeActions(24, 'ACTION_1');
        } else if (!user?.SelectionThree || user?.SelectionThree < 5) {
            commonSwipeActions(24, 'ACTION_2');
            // console.log('heeee');
        } else {
            // console.log(user?.PackageId);
            switch (user?.PackageId) {
                case undefined:
                    handlePackageConditions(24, 'ACTION_3');
                    // console.log('hhhhhee');
                    break;
                case '123':
                    handlePackageConditions(34, 'ACTION_4');
                    // console.log(user?.PackageId, '=');
                    // return
                    break;
                case '456':
                    handlePackageConditions(44, 'ACTION_5');
                    // console.log('456');
                    break;
                case '654':
                    setdisableLeftSwipe(false);
                    handleSubmitChatUser();
                    // console.log('645');
                    break;
                default:
                    setdisableLeftSwipe(false);
                    handleSubmitChatUser();
                    // console.log('default');
                    break;
            }
        }
        return
        // console.log(`on swiped left btn , ${swipeCount}`)
    }

    const SubmitChatUSer = (Data, DataId) => {
        if (!Data == '') {
            // console.log('Submit data', DataId);
            // return;
            firestore()
                .collection('Users').doc(CurrentUser).update({
                    PrivateChat: firestore.FieldValue.arrayUnion({
                        ChatuserDetails: Data.userDetails
                    }),
                })
                .then(() => {
                    // console.log('You like', Data.userDetails.Name);
                    // navigation.navigate('MessagesScreen')
                    Notifictaions(
                        Docuser = DataId,
                        noticeStatus = 'Unread',
                        tag = 'likes you',
                        type = 'Swap',
                        RequestStatus = 'Unaccepted',
                        noticeID = CurrentUser,
                        NoticeName = user.Name,
                    )
                });
        } else {
            console.log('card user not found!!');
        }
    }

    const MatchUsers = (Data, DataId) => {
        // console.log('===> ', Data, DataId);
        // return
        if (!DataId == '') {
            try {
                firestore().collection('Users').doc(DataId).onSnapshot(docSnapshot => {
                    if (docSnapshot.data()?.PrivateChat) {
                        docSnapshot.data()?.PrivateChat.map(chats => {
                            if (chats?.ChatuserDetails?.uid == CurrentUser) {
                                SendPushNotifyMatch(Data?.userDetails, user)
                                // console.log('test');
                                navigation.navigate('CongratsMatchScreen', { Data: Data?.userDetails, });
                                fetchUsersUid()
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

    const onSwiped = (type) => {
        console.log(`on swiped ${type} guester , ${swipeCount}`)
        // onSwipLeft()
    }

    const onSwipedAllCards = () => {
        setswipedAllCards(true)
    };

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

    // console.log(user);


    const getCurrentLocation = () => {
        // console.log('ppppppppppppppppppppppppppp');
        Geolocation.getCurrentPosition(
            position => {
                const cords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    // heading: position.coords.heading,
                };
                // console.log(cords, '000000000000000000000');
                firestore()
                    .collection('Users').doc(CurrentUser).update({
                        'userDetails.Location': cords,
                    })
                // console.log('===>', cords);
                // resolve(cords);
            },
            error => { console.log('Error Location', error) }
        );
    }

    const locationPermission = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let permissionGranted = false;

                if (Platform.OS === 'ios') {
                    const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
                    permissionGranted = permissionStatus === 'granted';
                } else {
                    const permissionStatus = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    );
                    permissionGranted = permissionStatus === PermissionsAndroid.RESULTS.GRANTED;
                }

                if (permissionGranted) {
                    resolve('granted');
                    getCurrentLocation();
                } else {
                    reject('Location Permission denied');
                    askForPermissionAgain();
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    const askForPermissionAgain = async () => {
        try {
            let permissionGranted = false;

            if (Platform.OS === 'ios') {
                const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
                permissionGranted = permissionStatus === 'granted';
            } else {
                const permissionStatus = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                permissionGranted = permissionStatus === PermissionsAndroid.RESULTS.GRANTED;
            }

            if (permissionGranted) {
                getCurrentLocation();
            } else {
                console.log('Location Permission denied again');
            }
        } catch (error) {
            console.log('Error asking for location permission again:', error);
        }
    };


    const openDrawerScreen = () => {
        setModalVisible(false)
        navigation.openDrawer()
    }
    const openLikeScreen = () => {
        setModalVisible(false)
        setShowPoppup(true)
        setShowPoppupDetail('OpenFilter')
        // setModalVisible(false)
        // navigation.navigate('LikeScreen')
    }

    const UpdateUserSwips = (swipeCount) => {
        let currentDate = new Date();
        if (user?.TotalSwipes) {
            let convertSwipeDate = new Date(user?.TotalSwipes?.creatTimeStamp)
            const momentDate = moment(convertSwipeDate, 'DD/MM/YYYY');
            const SwipeDate = momentDate.toDate().toDateString();

            if (SwipeDate == currentDate?.toDateString()) {
                const useRef = firestore().collection('Users')
                    .doc(CurrentUser)
                useRef.update({
                    // 'userDetails.TotalSwipes.creatTimeStamp': new Date().toString(),
                    'userDetails.TotalSwipes.Swipe': user?.TotalSwipes?.Swipe + 1,
                }).then(() => {
                    // setBuyPack(true)
                    // console.log('Notices send!');
                });
            }
            else {
                const useRef = firestore().collection('Users')
                    .doc(CurrentUser)
                useRef.update({
                    'userDetails.TotalSwipes.creatTimeStamp': new Date().toString(),
                    'userDetails.TotalSwipes.Swipe': 1,
                }).then(() => {
                    // setBuyPack(true)
                    // console.log('Notices send!');
                });
            }
        }
        else {
            const useRef = firestore().collection('Users')
                .doc(CurrentUser)
            useRef.update({
                'userDetails.TotalSwipes.creatTimeStamp': new Date().toString(),
                'userDetails.TotalSwipes.Swipe': 1,
            }).then(() => {
                // setBuyPack(true)
                // console.log('Notices send!');
            });
        }
    }


    const onSwipBottom = async (props) => {
        let newDate = new Date();
        let convertSwipeDate = new Date(user?.TotalSwipes?.creatTimeStamp)
        const momentDate = moment(convertSwipeDate, 'DD/MM/YYYY');
        const SwipeDate = momentDate.toDate().toDateString();

        if (user?.SelectionTwo < 12 || !user?.SelectionTwo) {
            if (user?.TotalSwipes?.Swipe > 4) {
                setdisableLeftSwipe(true)
                setShowPoppup(true)
                setShowPoppupDetail('ACTION_1')
            }
            else {
                setdisableLeftSwipe(false)
                if (props) {
                    setModalVisible(false)
                    await UpdateUserSwips(swipeCount)
                }
                else {
                    swiper.swipeBottom()
                    setModalVisible(false)
                    await UpdateUserSwips(swipeCount)
                }
            }
        }
        else if (user?.SelectionThree < 5 || !user?.SelectionThree) {
            if (user?.TotalSwipes?.Swipe > 9) {
                setdisableLeftSwipe(true)
                setShowPoppup(true)
                setShowPoppupDetail('ACTION_2')
            }
            else {
                setdisableLeftSwipe(false)
                if (props) {
                    setModalVisible(false)
                    await UpdateUserSwips(swipeCount)
                }
                else {
                    swiper.swipeBottom()
                    setModalVisible(false)
                    await UpdateUserSwips(swipeCount)
                }
            }
        }
        else {
            if (!user?.PackageId) {
                // console.log('test conditions ==> ',user?.TotalSwipes?.Swipe > 10);
                // return
                if (user?.TotalSwipes?.Swipe > 9 && newDate.toDateString() == SwipeDate) {
                    setdisableLeftSwipe(true)
                    setShowPoppup(true)
                    setShowPoppupDetail('ACTION_3')
                }
                else {
                    setdisableLeftSwipe(false)
                    if (props) {
                        setModalVisible(false)
                        await UpdateUserSwips(swipeCount)
                    }
                    else {
                        swiper.swipeBottom()
                        setModalVisible(false)
                        await UpdateUserSwips(swipeCount)
                    }
                }
            }
            else if (user?.PackageId == 123) {
                if (user?.TotalSwipes?.Swipe > 14 && newDate.toDateString() == SwipeDate) {
                    setdisableLeftSwipe(true)
                    setShowPoppup(true)
                    setShowPoppupDetail('ACTION_4')
                }
                else {
                    setdisableLeftSwipe(false)
                    if (props) {
                        setModalVisible(false)
                        await UpdateUserSwips(swipeCount)
                    }
                    else {
                        swiper.swipeBottom()
                        setModalVisible(false)
                        await UpdateUserSwips(swipeCount)
                    }
                }
            }
            else if (user?.PackageId == 456) {
                if (user?.TotalSwipes?.Swipe > 39 && newDate.toDateString() == SwipeDate) {
                    setdisableLeftSwipe(true)
                    setShowPoppup(true)
                    setShowPoppupDetail('ACTION_5')
                }
                else {
                    setdisableLeftSwipe(false)
                    if (props) {
                        setModalVisible(false)
                        await UpdateUserSwips(swipeCount)
                    }
                    else {
                        swiper.swipeBottom()
                        setModalVisible(false)
                        await UpdateUserSwips(swipeCount)
                    }
                }
            }
            else if (user?.PackageId == 654) {
                setdisableLeftSwipe(false)
                if (props) {
                    setModalVisible(false)
                    await UpdateUserSwips(swipeCount)
                }
                else {
                    swiper.swipeBottom()
                    setModalVisible(false)
                    await UpdateUserSwips(swipeCount)
                }
            }
        }
        // console.log(`on swiped left btn , ${swipeCount}`)
    }


    const onSwipTop = () => {
        let newDate = new Date();
        let convertSwipeDate = new Date(user?.TotalSwipes?.creatTimeStamp)
        const momentDate = moment(convertSwipeDate, 'DD/MM/YYYY');
        const SwipeDate = momentDate.toDate().toDateString();
        if (disableRightSwipe) {
            // swiper.swipeRight()
            // console.log(user?.PackageId);
            // return
            if (!user?.PackageId && user?.TotalSwipes?.Swipe < 10) {
                setdisableRightSwipe(false)
                swiper.swipeTop()
            }
            else if (user?.PackageId == 123 && user?.TotalSwipes?.Swipe < 15) {
                setdisableRightSwipe(false)
                swiper.swipeTop()
            }
            else if (user?.PackageId == 456 && user?.TotalSwipes?.Swipe < 40) {
                setdisableRightSwipe(false)
                swiper.swipeTop()
            }
            else if (user?.PackageId == 654) {
                setdisableRightSwipe(false)
                swiper.swipeTop()
            }
            else {
                setShowPoppup(true)
                setShowPoppupDetail('ACTION_7')
            }
            // else if (newDate.toDateString() != SwipeDate) {
            //     setdisableRightSwipe(false)
            //     swiper.swipeRight()
            // }
        }
        else {
            swiper.swipeTop()
        }
        return
        setSwipeCount(swipeCount + 1);
        if (user?.SelectionTwo < 12 || !user?.SelectionTwo) {
            if (swipeCount > 15) {
                setShowPoppup(true)
                setShowPoppupDetail('ACTION_1')
            }
            else {
                swiper.swipeRight()
                setModalVisible(false)
            }
        }
        else if (user?.SelectionThree < 5 || !user?.SelectionThree) {
            if (swipeCount > 25) {
                setShowPoppup(true)
                setShowPoppupDetail('ACTION_2')
            }
            else {
                swiper.swipeRight()
                setModalVisible(false)
            }
        }
        else {
            swiper.swipeRight()
            setModalVisible(false)
        }
        // console.log(`on swiped right btn , ${swipeCount}`)
    }



    const onChatBtn = (props) => {
        const data = users[swiper?.state?.firstCardIndex]?.userDetails

        setShowPoppup(true)
        setShowPoppupDetail('ACTION_11')


        // if (swiper.current) {
        //     const activeCardIndex = swiper.current.getCardIndex();
        //     const activeCardData = swiper.current.getCardData(activeCardIndex);
        //     // Use the activeCardData as needed
        //     console.log(activeCardData);
        //   }
        // navigation.navigate('ChatingScreen', {
        //     data: props?.userDetails
        // })
    }

    const onPhaseTwo = async () => {
        // console.log('phase one');
        await navigation.navigate('SelectionTwo')

        setShowPoppup(false)
        setShowPoppupDetail(null)
        setSwipeCount(0)
    }
    const onPhaseThree = async () => {
        // console.log('phase two');
        await navigation.navigate('SelectionThree')

        setShowPoppup(false)
        setShowPoppupDetail(null)
        setSwipeCount(0)
    }
    const useSwiper = useRef(null);

    const reloadApp = () => {
        // setInitialRender(false);
        fetchusersMain()
        // RNRestart.Restart()
    };


    function RenderCard({ data, navigation }) {
        const user2 = useSelector(selectUser);
        // console.log('===>',user2.Location?.latitude);
        // console.log('===>',data?.userDetails?.Location.latitude);
        const [flake, setFlake] = useState('')
        // const distance = getPreciseDistance(
        //     { latitude: user2?.Location?.latitude, longitude: user2?.Location?.longitude, },
        //     { latitude: data?.userDetails?.Location.latitude, longitude: data?.userDetails?.Location.longitude }
        // ) * 0.000621;

        return (
            <View style={{
                marginTop: -0.07 * height,
                height: 0.73 * height,
                width: 0.95 * width,
                // marginLeft:-5,
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                ...Platform.select({
                    ios: {
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                    },
                    android: {
                        elevation: 9,
                    },
                }),
                borderRadius: 25,
                position: 'absolute',
                // paddingHorizontal: 5
            }}>
                <View style={{
                    paddingTop: 0, height: '100%',
                }}>
                    {data?.userDetails?.image1 ?
                        <FastImage
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 20,
                            }}
                            source={{
                                uri: data?.userDetails?.image1,
                                headers: { Authorization: 'someAuthToken' },
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        :
                        <FastImage
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 20
                            }}
                            source={{
                                uri: data?.userDetails?.image1
                                    ? data?.userDetails?.image1
                                    : data?.userDetails?.image2
                                        ? data?.userDetails?.image2
                                        : data?.userDetails?.image3
                                            ? data?.userDetails?.image3
                                            : data?.userDetails?.image4
                                                ? data?.userDetails?.image4
                                                : data?.userDetails?.image5
                                                    ? data?.userDetails?.image5
                                                    : data?.userDetails?.image6,
                                headers: { Authorization: 'someAuthToken' },
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        // <Image
                        //     source={{ uri: data?.userDetails?.image1 }}
                        //     resizeMode='cover'
                        //     style={{
                        //         height: '100%',
                        //         width: '100%',
                        //     }}
                        // />
                        // <Image source={{ uri: data?.userDetails?.image1 }} resizeMode='cover'
                        //     style={{
                        //         height: '100%',
                        //         borderRadius: 20,
                        //         width: '100%',
                        //         paddingHorizontal: 10
                        //     }}
                        // />
                    }
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 15,
                        // marginTop: height / 3,
                        // alignItems: 'center',
                        position: 'absolute',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        right: 10,
                        top: 10
                        // marginLeft: 15
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            // textAlign: 'center'
                            fontWeight: 'bold',
                            fontSize: 12
                        }}>
                            #flakemeter
                        </Text>
                        {data?.userDetails?.Flake == 1 &&
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
                                        +{data?.userDetails?.Flake}
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
                        {data?.userDetails?.Flake == 2 &&
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
                                        +{data?.userDetails?.Flake}
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
                        {data?.userDetails?.Flake >= 3 &&
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
                                        +{data?.userDetails?.Flake}
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
                        {!data?.userDetails?.Flake &&
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
                </View>
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
                        }} numberOfLines={1}>{data?.userDetails?.Name},</Text>
                        <View>
                            <Text style={{
                                fontSize: 20,
                                color: COLORS.white,
                                marginRight: 5
                            }} numberOfLines={1}>{data?.userDetails?.years ? data?.userDetails?.years : 0}</Text>
                        </View>
                        {/* <Image source={require('../../assets/conform.png')} resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                            }} /> */}
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <SVGImg width={20} height={20} />
                        </View>
                        {data?.userDetails?.PackageId == 654 &&
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
                        {data?.userDetails?.city &&
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
                                        {data?.userDetails?.city ? data?.userDetails?.city : null}
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
                            {data?.userDetails?.distance ? Number(data?.userDetails?.distance).toFixed(0) : '00'} Miles Away</Text>
                    </View>
                </View>


                {/* <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 70,
                    justifyContent: 'space-between',
                    position: 'absolute',
                    bottom: -30,
                    width: '100%'
                    // marginTop: -20
                }}>
                    <TouchableOpacity onPress={() => onSwipLeft()}
                        style={{
                            padding: 15,
                            borderRadius: 30,
                            backgroundColor: COLORS.white,
                            ...Platform.select({
                                ios: {
                                    shadowColor: 'black',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 3,
                                },
                                android: {
                                    elevation: 9,
                                },
                            }),
                        }}>
                        <View
                        >
                            <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                style={{
                                    width: 15,
                                    height: 15
                                }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSwipRight(data)} style={{
                        padding: 15,
                        borderRadius: 40,
                        backgroundColor: 'red',
                        ...Platform.select({
                            ios: {
                                shadowColor: 'black',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 3,
                            },
                            android: {
                                elevation: 9,
                            },
                        }),
                    }}>
                        <TouchableOpacity onPress={() => onSwipRight(data)}>
                            <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 40
                                }} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onChatBtn(data)} style={{
                        padding: 15,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        ...Platform.select({
                            ios: {
                                shadowColor: 'black',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 3,
                            },
                            android: {
                                elevation: 9,
                            },
                        }),
                    }}>
                        <TouchableOpacity onPress={() => onChatBtn(data)}>
                            <Image source={require('../../assets/message.png')} resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20
                                }} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }
    const [showImageView, setShowImageView] = useState(false)
    const openImageViewer = (index) => {
        // setCurrentIndex(index);
        setShowImageView(true);
    };
    // const handleOnSwipedLeft = () => useSwiper.swipeLeft()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar backgroundColor={COLORS.black} />
            <HeaderTabOne
                onpress={() => openDrawerScreen()}
                onpress2={() => openLikeScreen()}
                Lefticon={require('../../assets/menu3.png')}
                Righticon={require('../../assets/menu2.png')}
                logo={require('../../assets/splashlogo.png')}
            />
            {user?.SelectionOne >= 6 ?
                <>
                    <View style={{
                        height: 0.73 * height,
                        width: 1 * width,
                        justifyContent: 'flex-start',
                        // backgroundColor: COLORS.main,
                    }}>
                        {users?.length > 0 ? (
                            <View style={{
                                // backgroundColor: COLORS.white
                            }}>
                                <Swiper
                                    ref={setSwiper}
                                    // onSwiped={() => onSwiped('general')}
                                    onSwipedRight={(cardIndex) => OpenForChating(cardIndex)}
                                    onSwipedLeft={() => onSwipLeft('left')}
                                    disableLeftSwipe={disableLeftSwipe}
                                    disableRightSwipe={disableRightSwipe}
                                    disableTopSwipe={true}
                                    disableBottomSwipe={true}
                                    // onSwipedBottom={() => onSwipBottom('bottom')}
                                    cards={users}
                                    renderCard={(cards) => <RenderCard data={cards} navigation={navigation} />}
                                    cardIndex={0}
                                    onTapCard={(cardIndex) => openSettingsModal(cardIndex)}
                                    infinite
                                    showSecondCard={false}
                                    onSwipedAll={onSwipedAllCards}
                                    // stackSize={3}
                                    stackSeparation={0}
                                    overlayLabels={{
                                        bottom: {
                                            title: 'NOPE',
                                            style: {
                                                label: {
                                                    backgroundColor: 'black',
                                                    borderColor: 'black',
                                                    color: 'white',
                                                    borderWidth: 1
                                                },
                                                wrapper: {
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }
                                            }
                                        },
                                        left: {
                                            title: 'NOPE',
                                            style: {
                                                label: {
                                                    backgroundColor: 'black',
                                                    borderColor: 'black',
                                                    color: 'white',
                                                    borderWidth: 1,
                                                },
                                                wrapper: {
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-end',
                                                    justifyContent: 'flex-start',
                                                    marginTop: 30,
                                                    marginLeft: -30
                                                }
                                            }
                                        },
                                        right: {
                                            title: 'LIKE',
                                            style: {
                                                label: {
                                                    backgroundColor: 'red',
                                                    borderColor: 'red',
                                                    color: 'white',
                                                    borderWidth: 1,
                                                },
                                                wrapper: {
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'flex-start',
                                                    marginTop: 30,
                                                    marginLeft: 30,
                                                }
                                            }
                                        },
                                        top: {
                                            title: 'LIKE',
                                            style: {
                                                label: {
                                                    backgroundColor: 'red',
                                                    borderColor: 'red',
                                                    color: 'white',
                                                    borderWidth: 1,
                                                },
                                                wrapper: {
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }
                                            }
                                        }
                                    }}
                                    animateOverlayLabelsOpacity
                                    animateCardOpacity
                                    swipeBackCard
                                />

                                {/* <View style={{
                                    // top: -0.03 * height,
                                    position: 'absolute',
                                    // bottom: -10,
                                    width: '100%',
                                    bottom:20
                                }}> */}

                                {/* </View> */}

                            </View>

                        ) : (
                            <View style={{
                                borderRadius: 10,
                                alignItems: 'center',
                                height: height,
                                justifyContent: 'center',
                                marginTop: -60,
                            }}>
                                {uploading ?
                                    <Image source={require('../../assets/gif/d&H5.gif')} resizeMode='contain' style={{
                                        width: 200,
                                        height: 100
                                    }} />
                                    :
                                    <TouchableOpacity onPress={() => reloadApp()} style={{
                                        // alignSelf:'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        }}>No Match Found</Text>
                                        <Text style={{
                                            color: COLORS.gray,
                                            fontSize: 12,
                                        }}>Invite friends to join and expand your search</Text>
                                    </TouchableOpacity>
                                    // <View style={{
                                    //     // alignSelf:'center',
                                    //     alignItems: 'center'
                                    // }}>
                                    //     <Text style={{
                                    //         color: COLORS.black,
                                    //         fontSize: 16,
                                    //         fontWeight: 'bold',
                                    //     }}>No Result Found</Text>
                                    //     <Text style={{
                                    //         color: COLORS.gray,
                                    //         fontSize: 12,
                                    //     }}>We did not find any users for your search</Text>
                                    //     <TouchableOpacity
                                    //         onPress={() => reloadApp()}
                                    //         style={{
                                    //             width: 70,
                                    //             marginTop: 10,
                                    //             height: 30,
                                    //             borderRadius: 5,
                                    //             backgroundColor: COLORS.main,
                                    //             alignItems: 'center',
                                    //             justifyContent: 'center'
                                    //         }}>
                                    //         <Text style={{
                                    //             color: COLORS.black,
                                    //             fontSize: 14,
                                    //         }}>Reload</Text>
                                    //     </TouchableOpacity>
                                    // </View>
                                }
                            </View>
                        )}
                    </View>
                    <>
                        {users?.length > 0 &&
                            <View style={{
                                top: -0.04 * height,
                                // position: 'absolute',
                                // bottom: -10,
                                width: '100%',
                                // bottom:20
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 80,
                                    justifyContent: 'space-between',
                                    // marginTop: -20
                                }}>
                                    <View style={{
                                        padding: 15,
                                        borderRadius: 30,
                                        backgroundColor: COLORS.white,
                                        ...Platform.select({
                                            ios: {
                                                shadowColor: 'black',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 3,
                                            },
                                            android: {
                                                elevation: 9,
                                            },
                                        }),
                                    }}>
                                        {/* onLeft={swiper.swipeLeft()} onRight={swiper.swipeRight()} */}
                                        <TouchableOpacity onPress={() => onSwipLeft()}>
                                            <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                                style={{
                                                    width: 15,
                                                    height: 15
                                                }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        padding: 15,
                                        borderRadius: 40,
                                        backgroundColor: 'red',
                                        ...Platform.select({
                                            ios: {
                                                shadowColor: 'black',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 3,
                                            },
                                            android: {
                                                elevation: 9,
                                            },
                                        }),
                                    }}>
                                        <TouchableOpacity onPress={() => onSwipRight()}>
                                            <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                                style={{
                                                    width: 40,
                                                    height: 40
                                                }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        padding: 15,
                                        borderRadius: 30,
                                        backgroundColor: COLORS.white,
                                        ...Platform.select({
                                            ios: {
                                                shadowColor: 'black',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 3,
                                            },
                                            android: {
                                                elevation: 9,
                                            },
                                        }),
                                    }}>
                                        <TouchableOpacity onPress={() => onChatBtn()}>
                                            <Image source={require('../../assets/message.png')} resizeMode='contain'
                                                style={{
                                                    width: 20,
                                                    height: 20
                                                }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            // <View></View>
                        }
                    </>
                </>
                :
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingTop: 50
                    }}>
                        <View style={{ justifyContent: 'center', marginRight: -10 }}>
                            <Image source={require('../../assets/like2.png')} resizeMode='contain'
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Image source={require('../../assets/like3.png')} resizeMode='contain'
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <View style={{ justifyContent: 'center', marginLeft: -10 }}>
                            <Image source={require('../../assets/like1.png')} resizeMode='contain'
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 30,
                                }} />
                        </View>

                    </View>
                    <View style={{
                        alignItems: 'center',
                        paddingTop: 30,
                        paddingHorizontal: 40
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>Unlock Dates Mode?</Text>
                        <Text style={{
                            textAlign: 'center',
                            color: COLORS.gray
                        }}>To unlock the Dates Mode feature to gain access user profiles, matches and chats. By answering a few questions, you can unlock this incredible feature and dive into the captivating world of dates, events!</Text>
                    </View>
                    <View style={{
                        marginTop: 30,
                        alignSelf: 'center'
                    }}>
                        <CustomeButton title={'Continue'} width={width / 1.2}
                            onpress={() => navigation.navigate('SelectionOne')}
                        />
                    </View>

                </View>
            }
            {modalData ? (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    {/* <HeaderTabOne
                        onpress={() => openDrawerScreen()}
                        onpress2={() => openLikeScreen()}
                        Lefticon={require('../../assets/menu3.png')}
                        Righticon={require('../../assets/menu2.png')}
                        logo={require('../../assets/splashlogo.png')}
                    /> */}
                    <View style={{
                        marginHorizontal: 0,
                        alignItems: 'center'
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
                            <ScrollView vertical showsVerticalScrollIndicator={false}>
                                <View style={{
                                    borderRadius: 20,
                                }}>
                                    <View style={{
                                        // paddingTop: 10,
                                        // marginTop:10
                                        borderRadius: 20,
                                    }}>
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => setShowImageView(true)}>
                                            <FastImage
                                                style={{
                                                    height: 500,
                                                    width: '100%',
                                                    // borderTopRightRadius: 20,
                                                    // borderTopLeftRadius: 20,
                                                }}
                                                source={{
                                                    uri: modalData.userDetails.image1,
                                                    headers: { Authorization: 'someAuthToken' },
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                        </TouchableOpacity>
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
                                                }} numberOfLines={1}>{modalData?.userDetails?.Name},</Text>
                                                <View>
                                                    <Text style={{
                                                        fontSize: 20,
                                                        color: COLORS.white,
                                                        marginRight: 5
                                                    }} numberOfLines={1}>{modalData?.userDetails?.years ? modalData?.userDetails?.years : 0}</Text>
                                                </View>

                                                <View style={{
                                                    alignItems: 'center',
                                                }}>
                                                    <SVGImg width={20} height={20} />
                                                </View>
                                                {modalData?.userDetails?.PackageId == 654 &&
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
                                                {modalData?.userDetails?.city &&
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
                                                                {modalData?.userDetails?.city ? modalData?.userDetails?.city : null}
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
                                                    {modalData?.userDetails?.distance ? Number(modalData?.userDetails?.distance).toFixed(0) : '00'} Miles Away</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => setModalVisible(!modalVisible)}
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
                                        {modalData?.userDetails?.Flake == 1 &&
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
                                                        +{modalData?.userDetails?.Flake}
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
                                        {modalData?.userDetails?.Flake == 2 &&
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
                                                        +{modalData?.userDetails?.Flake}
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
                                        {modalData?.userDetails?.Flake >= 3 &&
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
                                                        +{modalData?.userDetails?.Flake}
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
                                        {!modalData?.userDetails?.Flake &&
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
                                            }}>{modalData?.userDetails?.Name}</Text>
                                            <Text style={{
                                                fontSize: 20,
                                                color: COLORS.black,
                                                marginRight: 5,
                                            }}>{modalData?.userDetails?.years ? modalData?.userDetails?.years : 0}</Text>
                                            <View>
                                                <SVGImg width={20} height={20} />
                                            </View>
                                            {modalData?.userDetails?.PackageId == 654 &&
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
                                            }}>{modalData?.userDetails?.city ? modalData?.userDetails?.city?.slice(0, 12) : null}</Text>
                                            <Text style={{
                                                color: COLORS.black,
                                                marginRight: 5,
                                                backgroundColor: COLORS.main,
                                                padding: 3,
                                                borderRadius: 5,
                                                fontSize: 10
                                            }}>{modalData?.userDetails?.distance} Miles Away</Text>
                                        </View>
                                    </View> */}

                                </View>
                                <View style={{
                                    paddingRight: 10
                                }}>
                                    {modalData.userDetails.Bio &&
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
                                                width: width,
                                            }}>
                                                <View style={{ width: '85%' }}>
                                                    <Text style={{ paddingVertical: 10, fontSize: 13, color: COLORS.gray }}>
                                                        {modalData.userDetails.Bio ? modalData.userDetails.Bio : 'Bio not found'}
                                                    </Text>
                                                </View>
                                                {/* <TouchableOpacity style={{ width: '25%' }}>
                      <Image source={require('../../assets/like2.png')} resizeMode='contain' />
                    </TouchableOpacity> */}
                                            </View>
                                        </View>
                                    }
                                    {modalData?.userDetails?.city || modalData?.userDetails?.state ?
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
                                                    {modalData?.userDetails?.city || modalData?.userDetails?.state ?
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
                                                                <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}> {modalData?.userDetails?.city}, {modalData?.userDetails?.state}</Text>
                                                            </View>
                                                        </View> : null}
                                                    {modalData?.userDetails?.country &&
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
                                                                <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}> {modalData?.userDetails?.country}</Text>
                                                            </View>
                                                        </View>
                                                    }
                                                </View>
                                            </View>
                                            {/* <View>
                                            <MapView
                                                style={styles.map1}
                                                initialRegion={{
                                                    latitude: modalData?.userDetails?.Location?.latitude,
                                                    longitude: modalData?.userDetails?.Location?.longitude,
                                                    latitudeDelta: 0.0922,
                                                    longitudeDelta: 0.0421,
                                                }}
                                            >
                                                <Marker
                                                    coordinate={{
                                                        latitude: modalData?.userDetails?.Location?.latitude,
                                                        longitude: modalData?.userDetails?.Location?.longitude,
                                                    }}
                                                    draggable
                                                    onDragEnd={
                                                        (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                                                    }
                                                    title={'Test Marker'}
                                                    description={`${modalData?.userDetails?.address}`} />
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
                                            {modalData.userDetails.Education &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData?.userDetails?.Education}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Hieght &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData?.userDetails?.Hieght} feets</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Gender &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData?.userDetails?.Gender}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.languages &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData?.userDetails?.languages?.length > 0 ? modalData?.userDetails?.languages?.join(', ') : ''}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Drink &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData.userDetails.Drink}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Kids &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData.userDetails.Kids}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.IntroandExtro &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>{modalData.userDetails.IntroandExtro}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Smoke &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData.userDetails.Smoke}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Ethnicity &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData.userDetails.Ethnicity}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.PoliticalView && modalData.userDetails.PoliticalViewStatus == "Public" &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData.userDetails.PoliticalView}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData.userDetails.Relagion && modalData.userDetails.RelagionStatus == "Public" &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData.userDetails.Relagion}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData?.userDetails?.RelationshipType?.length > 0 &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData?.userDetails?.RelationshipType?.length > 0 ? modalData?.userDetails?.RelationshipType?.map(item => item.name).join(', ') : modalData?.userDetails?.RelationshipType}</Text>
                                                        {/* {console.log('Relationshiplenth here',modalData?.userDetails?.RelationshipType)} */}
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData?.userDetails?.languages?.length > 0 &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData?.userDetails?.languages?.length > 0 ? modalData?.userDetails?.languages?.join(', ') : modalData?.userDetails?.languages}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }

                                            {modalData?.userDetails?.BuildType &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData?.userDetails?.BuildType}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData?.userDetails?.FavFood?.length > 0 &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData?.userDetails?.FavFood?.length > 0 ? modalData?.userDetails?.FavFood?.join(', ') : modalData?.userDetails?.FavFood}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {modalData?.userDetails?.Exercise &&
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
                                                        <Text style={{ fontSize: 12, color: COLORS.gray, paddingLeft: 5 }}>{modalData?.userDetails?.Exercise}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>

                                    {modalData.userDetails.image1 || modalData.userDetails.image2 || modalData.userDetails.image3 ?
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
                                                    {modalData.userDetails.image1 &&
                                                        <TouchableOpacity
                                                            // onPress={() => setUserProfilePicture({
                                                            //     ...userProfilePicture,
                                                            //     enable: true,
                                                            //     image: modalData.userDetails.image1
                                                            // })}
                                                            onPress={() => openImageViewer(modalData.userDetails.image1)}
                                                        >
                                                            <FastImage
                                                                style={{
                                                                    width: 250,
                                                                    height: 150,
                                                                    borderRadius: 20,
                                                                    marginRight: 10,
                                                                }}
                                                                source={{
                                                                    uri: modalData.userDetails.image1,
                                                                    headers: { Authorization: 'someAuthToken' },
                                                                    priority: FastImage.priority.normal,
                                                                }}
                                                                resizeMode={FastImage.resizeMode.cover}
                                                            />
                                                            {/* <Image source={{ uri: modalData.userDetails.image1 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                        </TouchableOpacity>
                                                    }
                                                    {modalData.userDetails.image2 &&
                                                        <TouchableOpacity
                                                            // onPress={() => setUserProfilePicture({
                                                            //     ...userProfilePicture,
                                                            //     enable: true,
                                                            //     image: modalData.userDetails.image2
                                                            // })}
                                                            onPress={() => openImageViewer(modalData.userDetails.image2)}

                                                        >
                                                            <FastImage
                                                                style={{
                                                                    width: 250,
                                                                    height: 150,
                                                                    borderRadius: 20,
                                                                    marginRight: 10,
                                                                }}
                                                                source={{
                                                                    uri: modalData.userDetails.image2,
                                                                    headers: { Authorization: 'someAuthToken' },
                                                                    priority: FastImage.priority.normal,
                                                                }}
                                                                resizeMode={FastImage.resizeMode.cover}
                                                            />
                                                            {/* <Image source={{ uri: modalData.userDetails.image2 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                        </TouchableOpacity>
                                                    }
                                                    {modalData.userDetails.image3 &&
                                                        <TouchableOpacity
                                                            // onPress={() => setUserProfilePicture({
                                                            //     ...userProfilePicture,
                                                            //     enable: true,
                                                            //     image: modalData.userDetails.image3
                                                            // })}
                                                            onPress={() => openImageViewer(modalData.userDetails.image3)}

                                                        >
                                                            <FastImage
                                                                style={{
                                                                    width: 250,
                                                                    height: 150,
                                                                    borderRadius: 20,
                                                                    marginRight: 10,
                                                                }}
                                                                source={{
                                                                    uri: modalData.userDetails.image3,
                                                                    headers: { Authorization: 'someAuthToken' },
                                                                    priority: FastImage.priority.normal,
                                                                }}
                                                                resizeMode={FastImage.resizeMode.cover}
                                                            />
                                                            {/* <Image source={{ uri: modalData.userDetails.image3 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                        </TouchableOpacity>
                                                    }
                                                    {modalData.userDetails.image4 &&
                                                        <TouchableOpacity
                                                            // onPress={() => setUserProfilePicture({
                                                            //     ...userProfilePicture,
                                                            //     enable: true,
                                                            //     image: modalData.userDetails.image4
                                                            // })}
                                                            onPress={() => openImageViewer(modalData.userDetails.image4)}

                                                        >
                                                            <FastImage
                                                                style={{
                                                                    width: 250,
                                                                    height: 150,
                                                                    borderRadius: 20,
                                                                    marginRight: 10,
                                                                }}
                                                                source={{
                                                                    uri: modalData.userDetails.image4,
                                                                    headers: { Authorization: 'someAuthToken' },
                                                                    priority: FastImage.priority.normal,
                                                                }}
                                                                resizeMode={FastImage.resizeMode.cover}
                                                            />
                                                            {/* <Image source={{ uri: modalData.userDetails.image4 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                        </TouchableOpacity>
                                                    }
                                                    {modalData.userDetails.image5 &&
                                                        <TouchableOpacity
                                                            // onPress={() => setUserProfilePicture({
                                                            //     ...userProfilePicture,
                                                            //     enable: true,
                                                            //     image: modalData.userDetails.image5
                                                            // })}
                                                            onPress={() => openImageViewer(modalData.userDetails.image5)}

                                                        >
                                                            <FastImage
                                                                style={{
                                                                    width: 250,
                                                                    height: 150,
                                                                    borderRadius: 20,
                                                                    marginRight: 10,
                                                                }}
                                                                source={{
                                                                    uri: modalData.userDetails.image5,
                                                                    headers: { Authorization: 'someAuthToken' },
                                                                    priority: FastImage.priority.normal,
                                                                }}
                                                                resizeMode={FastImage.resizeMode.cover}
                                                            />
                                                            {/* <Image source={{ uri: modalData.userDetails.image5 }} resizeMode='cover' style={{
                                                            width: 250,
                                                            height: 150,
                                                            borderRadius: 20,
                                                            marginRight: 10,
                                                        }} /> */}
                                                        </TouchableOpacity>
                                                    }
                                                    {modalData.userDetails.image6 &&
                                                        <TouchableOpacity
                                                            // onPress={() => setUserProfilePicture({
                                                            //     ...userProfilePicture,
                                                            //     enable: true,
                                                            //     image: modalData.userDetails.image6
                                                            // })}
                                                            onPress={() => openImageViewer(modalData.userDetails.image6)}

                                                        >
                                                            <FastImage
                                                                style={{
                                                                    width: 250,
                                                                    height: 150,
                                                                    borderRadius: 20,
                                                                    marginRight: 10,
                                                                }}
                                                                source={{
                                                                    uri: modalData.userDetails.image6,
                                                                    headers: { Authorization: 'someAuthToken' },
                                                                    priority: FastImage.priority.normal,
                                                                }}
                                                                resizeMode={FastImage.resizeMode.cover}
                                                            />
                                                            {/* <Image source={{ uri: modalData.userDetails.image6 }} resizeMode='cover' style={{
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
                                                images={modalData?.userDetails?.ImagesArray?.length > 0 ? modalData?.userDetails?.ImagesArray : []}
                                                imageIndex={0}
                                                visible={showImageView}
                                                onRequestClose={() => setShowImageView(false)}
                                            />
                                        </View>
                                        : null}
                                    {modalData?.userDetails?.Interest?.length > 0 &&
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
                                                {modalData?.userDetails?.Interest.map((item, index) => (
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
                                                <TouchableOpacity onPress={() => onSwipRight(modalData)}>
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
                                                <TouchableOpacity onPress={() => onChatBtn(modalData)}>

                                                    <Image source={require('../../assets/message.png')} resizeMode='contain'
                                                        style={{
                                                            width: 20,
                                                            height: 20
                                                        }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

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
                                                {modalData.userDetails.Name}’s photo-verified
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                            </ScrollView>

                        </View>
                    </View>
                </Modal >
            ) :
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    {actionTrigger == 'ACTION_1' ?
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
                                <Text style={{
                                    marginBottom: 10,
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    textAlign: 'center',
                                }}>Allow ‘Dates & Honey’ to use
                                    your location</Text>
                                <Text style={{
                                    marginBottom: 10,
                                    textAlign: 'center',
                                    fontSize: 12,
                                    color: COLORS.black
                                }}>
                                    We will use your location to find people
                                    nearby you.
                                </Text>
                                <Image source={require('../../assets/currentloc.png')} resizeMode='cover' />
                                <TouchableOpacity
                                    onPress={() => { setModalVisible(false), setActionTrigger(null) }}
                                    style={{
                                        borderBottomColor: COLORS.gray2,
                                        borderBottomWidth: 1,
                                        width: width / 1.2,
                                        marginHorizontal: 20,
                                        paddingVertical: 10,
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{
                                        color: '#2A3182'
                                    }}>
                                        Allow Once
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { setModalVisible(false), setActionTrigger(null) }}
                                    style={{
                                        // borderColor: COLORS.black,
                                        borderBottomColor: COLORS.gray2,
                                        borderBottomWidth: 1,
                                        width: width / 1.2,
                                        marginHorizontal: 20,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // backgroundColor: COLORS.main
                                    }}>
                                    <Text style={{
                                        color: '#2A3182'
                                    }}>
                                        Allow while using the app
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null}
                </Modal>
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={showPoppup}
                onRequestClose={() => {
                    setShowPoppup(!showPoppup);
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: COLORS.gray,
                    opacity: 0.95
                }}>
                    {showPoppupDetial == 'OpenFilter' ?
                        <View style={{
                            height: windowHeight,
                            backgroundColor: COLORS.white
                        }}>
                            <ScrollView vertical showsVerticalScrollIndicator={false}>
                                <View>
                                    <View style={{
                                        paddingHorizontal: 20,
                                        height: 60,
                                        // backgroundColor:COLORS.main,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <TouchableOpacity onPress={() => ApplyFilter()}>
                                            <Image source={require('../../assets/right.png')} resizeMode='contain' style={{
                                                tintColor: COLORS.black,
                                                width: 20,
                                                height: 20,
                                            }} />
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: COLORS.black
                                            }}>
                                                Filter
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => OnCancleFilter()}>
                                            <Image source={require('../../assets/cross.png')} resizeMode='contain' style={{
                                                tintColor: COLORS.black,
                                                width: 15,
                                                height: 15,
                                            }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        paddingHorizontal: 20,
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: COLORS.black,

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
                                                onPress={() => setSelectGender(item?.value)}
                                                style={{
                                                    borderWidth: selectGender == item?.value ? 1 : 0,
                                                    borderColor: selectGender == item?.value ? '#2A3182' : null,
                                                    borderRadius: 10,
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 15,
                                                    width: '33%'
                                                }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    fontSize: 14,
                                                    color: selectGender == item?.value ? '#2A3182' : COLORS.gray
                                                }}>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    {/* <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                            paddingTop: 20,
                                        }}>
                                            <View style={{
                                                flex: 1,
                                            }}>
                                                <Text style={{
                                                    fontSize: 14,
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
                                                        fontSize: 14,
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
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        color: COLORS.black
                                                    }}>{Math.floor(maximumAge * 100)}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View> */}
                                    <ViewContainer>
                                        <SliderWrapper>
                                            <LabelWrapper>
                                                <LabelText>{multiSliderValue[0]}</LabelText>
                                                {/* <LabelText>Budget range</LabelText> */}
                                                <Text style={{ fontSize: 14, color: COLORS.black }}>Age Range</Text>
                                                <LabelText>{multiSliderValue[1]}</LabelText>
                                            </LabelWrapper>
                                            <MultiSlider
                                                markerStyle={{
                                                    ...Platform.select({
                                                        ios: {
                                                            height: 30,
                                                            width: 30,
                                                            shadowColor: COLORS.main,
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 3
                                                            },
                                                            shadowRadius: 1,
                                                            shadowOpacity: 0.1
                                                        },
                                                        android: {
                                                            height: 15,
                                                            width: 15,
                                                            borderRadius: 50,
                                                            backgroundColor: COLORS.main
                                                        }
                                                    })
                                                }}
                                                pressedMarkerStyle={{
                                                    ...Platform.select({
                                                        android: {
                                                            height: 30,
                                                            width: 30,
                                                            borderRadius: 20,
                                                            backgroundColor: COLORS.main
                                                        }
                                                    })
                                                }}
                                                selectedStyle={{
                                                    backgroundColor: COLORS.main
                                                }}
                                                trackStyle={{
                                                    backgroundColor: COLORS.gray2
                                                }}
                                                touchDimensions={{
                                                    height: 20,
                                                    width: 20,
                                                    borderRadius: 20,
                                                    slipDisplacement: 40,
                                                }}
                                                values={[multiSliderValue[0], multiSliderValue[1]]}
                                                sliderLength={width / 1.2}
                                                onValuesChange={multiSliderValuesChange}
                                                min={18}
                                                max={100}
                                                allowOverlap={false}
                                                minMarkerOverlapDistance={40}
                                            />
                                        </SliderWrapper>
                                    </ViewContainer>
                                    {/* {selectMinMaxAge == 'maxage' ?
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
                                        } */}

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
                                                fontSize: 14,
                                                // fontWeight: 'bold',
                                                color: COLORS.black
                                            }}>Distance({distance ? Math.floor(distance * 500) : 0} miles)</Text>
                                        </View>
                                        <View style={{
                                        }}>
                                            {/* <Text style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                color: COLORS.black
                                            }}>Whole country</Text> */}
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

                                    {/* {!FilterModaldata.length == 0 &&
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
                                        } */}

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
                                                fontSize: 14
                                            }}>Advanced filters</Text>
                                        </View>
                                        <View style={{
                                            paddingHorizontal: 20,
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.gray
                                            }}>Mix and Match, but we suggest you use only 3 filters (use the ones most important to you) All filter available when subscribed to Gold membership</Text>
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
                                            <AntDesign name='up' size={15} color={COLORS.black} />
                                            :
                                            <AntDesign name='down' size={15} color={COLORS.black} />
                                        }
                                    </TouchableOpacity>

                                    {showAdvanceFilter == true &&
                                        filterAdvanceData.map((item, index) => (
                                            <View key={index}>
                                                <TouchableOpacity
                                                    onPress={() => onSelectFilterMain(item, index)}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        paddingHorizontal: 20,
                                                        marginBottom: 5,
                                                        height: height / 12,
                                                        backgroundColor: item.selected ? COLORS.mainlight : null,
                                                        opacity: item?.open == true ? 1 : .5
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
                                                        alignItems: 'flex-start',
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: COLORS.black,
                                                        }}>
                                                            {item.name}
                                                        </Text>
                                                        {item?.selected == true ?
                                                            <Text style={{
                                                                fontSize: 14,
                                                                color: COLORS.gray,
                                                            }}>
                                                                {item?.array?.filter(item => item.selected === true)
                                                                    .map(item => item.name).join(', ')}
                                                            </Text>
                                                            : null
                                                        }
                                                    </View>
                                                    <View style={{
                                                        flex: 1,
                                                        alignItems: 'flex-end'
                                                    }}>
                                                        {filterAdvanceIndex.enable && filterAdvanceIndex.index == index ?
                                                            <Image source={require('../../assets/back.png')} resizeMode='contain' style={{
                                                                width: 15,
                                                                height: 15,
                                                                tintColor: COLORS.black,
                                                                transform: [{ rotateZ: '90deg' }]
                                                            }} />
                                                            :
                                                            <Image source={require('../../assets/back.png')} resizeMode='contain' style={{
                                                                width: 15,
                                                                height: 15,
                                                                tintColor: COLORS.black
                                                            }} />
                                                        }
                                                    </View>
                                                </TouchableOpacity>
                                                {filterAdvanceIndex.enable && filterAdvanceIndex.index == index &&
                                                    <View>
                                                        {item?.array?.length > 0 ?
                                                            <View>
                                                                {item?.array?.map((item2, index) => (
                                                                    <TouchableOpacity
                                                                        key={index}
                                                                        onPress={() => SelectedAdvanceFilter(item2, item)}
                                                                        style={{
                                                                            height: 50,
                                                                            justifyContent: 'space-between',
                                                                            paddingHorizontal: 20,
                                                                            borderColor: COLORS.gray2,
                                                                            borderTopWidth: .5,
                                                                            borderBottomWidth: .5,
                                                                            flexDirection: 'row',
                                                                            alignItems: 'center',
                                                                            // backgroundColor: COLORS.main,
                                                                        }}>
                                                                        <Text style={{
                                                                            fontSize: 13,
                                                                            color: COLORS.black,
                                                                        }}>{item2.name}</Text>
                                                                        {item2?.selected == true &&
                                                                            <Image source={require('../../assets/right.png')} resizeMode='contain' style={{
                                                                                tintColor: COLORS.black,
                                                                                width: 10,
                                                                                height: 10,
                                                                            }} />
                                                                        }
                                                                    </TouchableOpacity>
                                                                ))}
                                                            </View>
                                                            :
                                                            // null
                                                            <View>
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
                                                                            fontSize: 14,
                                                                            // fontWeight: 'bold',
                                                                            color: COLORS.black
                                                                        }}>Height Range</Text>
                                                                    </View>
                                                                    <View style={{
                                                                        flex: 1,
                                                                        alignItems: 'center',
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'flex-end'
                                                                    }}>
                                                                        <TouchableOpacity onPress={() => setSelectMinMaxHieght('min')}
                                                                            style={{
                                                                                // backgroundColor: COLORS.main,
                                                                                // paddingHorizontal: 3,
                                                                                // borderRadius: 4
                                                                            }}>
                                                                            <Text style={{
                                                                                fontSize: 16,
                                                                                color: COLORS.black,
                                                                                fontWeight: 'bold'
                                                                            }}>{selectedAdvFilter?.MinHieght ? selectedAdvFilter?.MinHieght : 0}</Text>
                                                                        </TouchableOpacity>
                                                                        <Text style={{ color: COLORS.black }}> - </Text>
                                                                        <TouchableOpacity onPress={() => setSelectMinMaxHieght('max')}
                                                                            style={{
                                                                                // backgroundColor: COLORS.main,
                                                                                // paddingHorizontal: 3,
                                                                                // borderRadius: 4
                                                                            }}>
                                                                            <Text style={{
                                                                                fontSize: 16,
                                                                                fontWeight: 'bold',
                                                                                color: COLORS.black
                                                                            }}>{selectedAdvFilter?.MaxHieght ? selectedAdvFilter?.MaxHieght : 0}</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                                {selectMinMaxHieght == 'max' ?
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        paddingHorizontal: 10,
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
                                                                            value={Math.floor(selectedAdvFilter?.MaxHieght) / 15}
                                                                            onValueChange={(value) => setSelectedAdvFilter({
                                                                                ...selectedAdvFilter,
                                                                                MaxHieght: (value * 15.0).toFixed(1)
                                                                            })}
                                                                        />
                                                                    </View>
                                                                    :
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        paddingHorizontal: 10,
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
                                                                            value={Math.floor(selectedAdvFilter?.MinHieght) / 15}
                                                                            onValueChange={(value) => setSelectedAdvFilter({
                                                                                ...selectedAdvFilter,
                                                                                MinHieght: (value * 15.0).toFixed(1)
                                                                            })}
                                                                        />
                                                                    </View>
                                                                }
                                                                <TouchableOpacity
                                                                    onPress={() => SelectedAdvanceFilterHeight()}
                                                                    style={{
                                                                        width: windowWidth / 4,
                                                                        height: 30,
                                                                        backgroundColor: COLORS.main,
                                                                        borderRadius: 5,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        alignSelf: 'flex-end',
                                                                        marginHorizontal: 20
                                                                    }}>
                                                                    <Text style={{
                                                                        color: COLORS.black,
                                                                        fontSize: 12,
                                                                    }}>Confirm</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        }
                                                    </View>
                                                }
                                            </View>
                                        ))
                                    }


                                    <View style={{
                                        paddingVertical: 5, alignItems: 'center',
                                        paddingTop: '30%',
                                        marginBottom: 40,
                                        // paddingHorizontal: 0
                                    }}>
                                        <View style={{
                                            paddingHorizontal: 20,
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.gray
                                            }}>
                                                Answer these questions on your own profile
                                                to use these filters
                                            </Text>
                                        </View>
                                        {!uploading == true ?
                                            <CustomeButton onpress={() => ApplyFilter()} title={'Apply'}
                                                bcolor={COLORS.main} border={COLORS.white} width={width / 1.1} />
                                            :
                                            <View style={{
                                                backgroundColor: COLORS.main,
                                                width: width / 1.1,
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
                        :
                        showPoppupDetial == 'ACTION_2' ?
                            <View style={{
                                margin: 20,
                                backgroundColor: 'white',
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
                            }}>
                                {/* <Image source={require('../../assets/flakeremove.png')} resizeMode='contain' style={{
                                width: 90,
                                height: 90
                            }} /> */}
                                <Text style={{
                                    marginBottom: 10,
                                    color: COLORS.black,
                                    fontWeight: 'bold'
                                    // textAlign: 'center',
                                }}>Unlock more Swips?</Text>
                                <Text style={{
                                    marginBottom: 10,
                                    textAlign: 'center',
                                    fontSize: 12,
                                    color: COLORS.black
                                }}>
                                    To unlock more swips. Please complete phase three questions so you can unlock this incredible feature and dive into the captivating world of dates and events!
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => { setShowPoppup(false), setShowPoppupDetail(null) }}
                                        style={{
                                            // borderColor: COLORS.black,
                                            width: '45%',
                                            borderRadius: 10,
                                            marginHorizontal: 5,
                                            paddingVertical: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: COLORS.light
                                        }}>
                                        <Text style={{
                                            color: COLORS.black,
                                        }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => onPhaseThree()}
                                        style={{
                                            // borderColor: COLORS.black,
                                            width: '45%',
                                            borderRadius: 10,
                                            marginHorizontal: 5,
                                            paddingVertical: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: COLORS.main
                                        }}>
                                        <Text style={{
                                            color: COLORS.black,
                                        }}>
                                            Continue
                                        </Text>
                                    </TouchableOpacity>
                                    {/* <CustomeButton bcolor={COLORS.light} title={'Cancle'} onpress={() => setShowPoppup(false)} width={width / 3} />
                                <CustomeButton title={'Continue'} onpress={() => setShowPoppup(false)} width={width / 3} /> */}

                                </View>
                            </View>
                            :
                            showPoppupDetial == 'ACTION_3' ?
                                <View style={{
                                    margin: 20,
                                    backgroundColor: COLORS.white,
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
                                }}>
                                    <Text style={{
                                        marginBottom: 10,
                                        color: COLORS.black,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}>Boost Your Experience with a Membership Package!</Text>
                                    <Text style={{
                                        marginBottom: 10,
                                        textAlign: 'center',
                                        fontSize: 12,
                                        color: COLORS.black
                                    }}>
                                        Elevate your journey with us by unlocking our exclusive membership packages. Haven't purchased a membership yet? Dive in now and explore a world of enhanced features, more swipes. Upgrade your experience today!
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => { setShowPoppup(false), setShowPoppupDetail(null) }}
                                            style={{
                                                // borderColor: COLORS.black,
                                                width: '45%',
                                                borderRadius: 10,
                                                marginHorizontal: 5,
                                                paddingVertical: 10,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: COLORS.gray2
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                            }}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowPoppup(false),
                                                    setShowPoppupDetail(null),
                                                    navigation.navigate('Premium Membership')
                                            }}
                                            style={{
                                                // borderColor: COLORS.black,
                                                width: '45%',
                                                borderRadius: 10,
                                                marginHorizontal: 5,
                                                paddingVertical: 10,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: COLORS.main
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                            }}>
                                                Continue
                                            </Text>
                                        </TouchableOpacity>
                                        {/* <CustomeButton bcolor={COLORS.light} title={'Cancle'} onpress={() => setShowPoppup(false)} width={width / 3} />
                                <CustomeButton title={'Continue'} onpress={() => setShowPoppup(false)} width={width / 3} /> */}
                                    </View>
                                </View>
                                :
                                showPoppupDetial == 'ACTION_4' ?
                                    <View style={{
                                        margin: 20,
                                        backgroundColor: 'white',
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
                                    }}>
                                        <Text style={{
                                            marginBottom: 10,
                                            color: COLORS.black,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }}>Boost Your Experience with a GOLD Membership Package!</Text>
                                        <Text style={{
                                            marginBottom: 10,
                                            textAlign: 'center',
                                            fontSize: 12,
                                            color: COLORS.black
                                        }}>
                                            Elevate your journey with us by unlocking our exclusive GOLD membership packages. Dive in now and get more swipes explore a world of enhanced features  and more. Upgrade your experience today!
                                        </Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => { setShowPoppup(false), setShowPoppupDetail(null) }}
                                                style={{
                                                    // borderColor: COLORS.black,
                                                    width: '45%',
                                                    borderRadius: 10,
                                                    marginHorizontal: 5,
                                                    paddingVertical: 10,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: COLORS.gray2
                                                }}>
                                                <Text style={{
                                                    color: COLORS.black,
                                                }}>
                                                    Cancel
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setShowPoppup(false),
                                                        setShowPoppupDetail(null),
                                                        navigation.navigate('Premium Membership')
                                                }}
                                                style={{
                                                    // borderColor: COLORS.black,
                                                    width: '45%',
                                                    borderRadius: 10,
                                                    marginHorizontal: 5,
                                                    paddingVertical: 10,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: COLORS.main
                                                }}>
                                                <Text style={{
                                                    color: COLORS.black,
                                                }}>
                                                    Continue
                                                </Text>
                                            </TouchableOpacity>
                                            {/* <CustomeButton bcolor={COLORS.light} title={'Cancle'} onpress={() => setShowPoppup(false)} width={width / 3} />
                                    <CustomeButton title={'Continue'} onpress={() => setShowPoppup(false)} width={width / 3} /> */}

                                        </View>
                                    </View>
                                    :
                                    showPoppupDetial == 'ACTION_5' ?
                                        <View style={{
                                            margin: 20,
                                            backgroundColor: 'white',
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
                                        }}>
                                            <Text style={{
                                                marginBottom: 10,
                                                color: COLORS.black,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                            }}>Boost Your Experience with a Diamond and Diamond+ Membership Package!</Text>
                                            <Text style={{
                                                marginBottom: 10,
                                                textAlign: 'center',
                                                fontSize: 12,
                                                color: COLORS.black
                                            }}>
                                                Elevate your journey with us by unlocking our exclusive Diamond and Diamond+ membership packages. Dive in now and get unlimited swipes explore a world of enhanced features  and more. Upgrade your experience today!
                                            </Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => { setShowPoppup(false), setShowPoppupDetail(null) }}
                                                    style={{
                                                        // borderColor: COLORS.black,
                                                        width: '45%',
                                                        borderRadius: 10,
                                                        marginHorizontal: 5,
                                                        paddingVertical: 10,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: COLORS.gray2
                                                    }}>
                                                    <Text style={{
                                                        color: COLORS.black,
                                                    }}>
                                                        Cancel
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowPoppup(false),
                                                            setShowPoppupDetail(null),
                                                            navigation.navigate('Premium Membership')
                                                    }}
                                                    style={{
                                                        // borderColor: COLORS.black,
                                                        width: '45%',
                                                        borderRadius: 10,
                                                        marginHorizontal: 5,
                                                        paddingVertical: 10,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: COLORS.main
                                                    }}>
                                                    <Text style={{
                                                        color: COLORS.black,
                                                    }}>
                                                        Continue
                                                    </Text>
                                                </TouchableOpacity>
                                                {/* <CustomeButton bcolor={COLORS.light} title={'Cancle'} onpress={() => setShowPoppup(false)} width={width / 3} />
                                    <CustomeButton title={'Continue'} onpress={() => setShowPoppup(false)} width={width / 3} /> */}

                                            </View>
                                        </View>
                                        :
                                        showPoppupDetial == 'ACTION_6' ?
                                            <View style={{
                                                margin: 20,
                                                backgroundColor: 'white',
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
                                            }}>
                                                <Text style={{
                                                    marginBottom: 10,
                                                    color: COLORS.black,
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                }}>Upgrade to Diamond Membership for Sending Likes to Diamond Users!</Text>
                                                <Text style={{
                                                    marginBottom: 10,
                                                    textAlign: 'center',
                                                    fontSize: 12,
                                                    color: COLORS.black
                                                }}>
                                                    To send likes to diamond users, you need to upgrade your membership to Diamond. Upgrade now and unlock the ability to send likes to diamond members and enjoy enhanced features!
                                                </Text>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setShowPoppup(false),
                                                                setShowPoppupDetail(null)
                                                        }}
                                                        style={{
                                                            // borderColor: COLORS.black,
                                                            width: '45%',
                                                            borderRadius: 10,
                                                            marginHorizontal: 5,
                                                            paddingVertical: 10,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: COLORS.gray2
                                                        }}>
                                                        <Text style={{
                                                            color: COLORS.black,
                                                        }}>
                                                            Cancel
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setShowPoppup(false),
                                                                setShowPoppupDetail(null),
                                                                navigation.navigate('Premium Membership')
                                                        }}
                                                        style={{
                                                            // borderColor: COLORS.black,
                                                            width: '45%',
                                                            borderRadius: 10,
                                                            marginHorizontal: 5,
                                                            paddingVertical: 10,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: COLORS.main
                                                        }}>
                                                        <Text style={{
                                                            color: COLORS.black,
                                                        }}>
                                                            Continue
                                                        </Text>
                                                    </TouchableOpacity>
                                                    {/* <CustomeButton bcolor={COLORS.light} title={'Cancle'} onpress={() => setShowPoppup(false)} width={width / 3} />
                                    <CustomeButton title={'Continue'} onpress={() => setShowPoppup(false)} width={width / 3} /> */}

                                                </View>
                                            </View>
                                            :
                                            showPoppupDetial == 'ACTION_7' ?
                                                <View style={{
                                                    margin: 20,
                                                    backgroundColor: 'white',
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
                                                }}>
                                                    <Text style={{
                                                        marginBottom: 10,
                                                        color: COLORS.black,
                                                        fontWeight: 'bold',
                                                        // textAlign: 'center',
                                                    }}>Upgrade Your Membership Package for More Swiping Power!</Text>
                                                    <Text style={{
                                                        marginBottom: 10,
                                                        // textAlign: 'center',
                                                        fontSize: 12,
                                                        // paddingkHorizontal:20,
                                                        color: COLORS.black,
                                                        // textAlign: 'center'
                                                    }}>
                                                        Swipes limit exceeded, If you've exhausted your today's total swipes and want more, upgrade your membership package.                                                    </Text>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setShowPoppup(false),
                                                                    setShowPoppupDetail(null)
                                                            }}
                                                            style={{
                                                                // borderColor: COLORS.black,
                                                                width: '45%',
                                                                borderRadius: 10,
                                                                marginHorizontal: 5,
                                                                paddingVertical: 10,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                backgroundColor: COLORS.light
                                                            }}>
                                                            <Text style={{
                                                                color: COLORS.black,
                                                            }}>
                                                                Cancel
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setShowPoppup(false),
                                                                    setShowPoppupDetail(null),
                                                                    navigation.navigate('Premium Membership')
                                                            }}
                                                            style={{
                                                                // borderColor: COLORS.black,
                                                                width: '45%',
                                                                borderRadius: 10,
                                                                marginHorizontal: 5,
                                                                paddingVertical: 10,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                backgroundColor: COLORS.main
                                                            }}>
                                                            <Text style={{
                                                                color: COLORS.black,
                                                            }}>
                                                                Continue
                                                            </Text>
                                                        </TouchableOpacity>
                                                        {/* <CustomeButton bcolor={COLORS.light} title={'Cancle'} onpress={() => setShowPoppup(false)} width={width / 3} />
                                    <CustomeButton title={'Continue'} onpress={() => setShowPoppup(false)} width={width / 3} /> */}

                                                    </View>
                                                </View>
                                                :
                                                showPoppupDetial == 'ACTION_8' ?
                                                    <View style={{
                                                        margin: 20,
                                                        backgroundColor: 'white',
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
                                                    }}>
                                                        <Text style={{
                                                            marginBottom: 10,
                                                            color: COLORS.black,
                                                            fontWeight: 'bold',
                                                            textAlign: 'center',
                                                        }}>Membership Expired!</Text>
                                                        <Text style={{
                                                            marginBottom: 10,
                                                            textAlign: 'center',
                                                            fontSize: 12,
                                                            color: COLORS.black
                                                        }}>
                                                            Your membership has expired. Renew your membership to continue enjoying the benefits.
                                                        </Text>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                        }}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setShowPoppup(false),
                                                                        setShowPoppupDetail(null)
                                                                }}
                                                                style={{
                                                                    // borderColor: COLORS.black,
                                                                    width: '45%',
                                                                    borderRadius: 10,
                                                                    marginHorizontal: 5,
                                                                    paddingVertical: 10,
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    backgroundColor: COLORS.light
                                                                }}>
                                                                <Text style={{
                                                                    color: COLORS.black,
                                                                }}>
                                                                    Cancel
                                                                </Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setShowPoppup(false),
                                                                        setShowPoppupDetail(null),
                                                                        navigation.navigate('Premium Membership')
                                                                }}
                                                                style={{
                                                                    // borderColor: COLORS.black,
                                                                    width: '45%',
                                                                    borderRadius: 10,
                                                                    marginHorizontal: 5,
                                                                    paddingVertical: 10,
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    backgroundColor: COLORS.main
                                                                }}>
                                                                <Text style={{
                                                                    color: COLORS.black,
                                                                }}>
                                                                    Continue
                                                                </Text>
                                                            </TouchableOpacity>
                                                            {/* <CustomeButton bcolor={COLORS.light} title={'Cancle'} onpress={() => setShowPoppup(false)} width={width / 3} />
                                    <CustomeButton title={'Continue'} onpress={() => setShowPoppup(false)} width={width / 3} /> */}

                                                        </View>
                                                    </View>
                                                    :
                                                    showPoppupDetial == 'ACTION_9' ?
                                                        <View style={{
                                                            margin: 20,
                                                            backgroundColor: 'white',
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
                                                        }}>
                                                            <Text style={{
                                                                marginBottom: 10,
                                                                color: COLORS.black,
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                            }}>Flake Insurance!</Text>
                                                            <Text style={{
                                                                marginBottom: 10,
                                                                textAlign: 'center',
                                                                fontSize: 12,
                                                                color: COLORS.black
                                                            }}>
                                                                Your falke insurance has expired. Renew your Flake Insurance to continue enjoying the benefits.
                                                            </Text>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                            }}>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setShowPoppup(false),
                                                                            setShowPoppupDetail(null)
                                                                    }}
                                                                    style={{
                                                                        // borderColor: COLORS.black,
                                                                        width: '45%',
                                                                        borderRadius: 10,
                                                                        marginHorizontal: 5,
                                                                        paddingVertical: 10,
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        backgroundColor: COLORS.light
                                                                    }}>
                                                                    <Text style={{
                                                                        color: COLORS.black,
                                                                    }}>
                                                                        Cancel
                                                                    </Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setShowPoppup(false),
                                                                            setShowPoppupDetail(null),
                                                                            navigation.navigate('Premium Membership')
                                                                    }}
                                                                    style={{
                                                                        // borderColor: COLORS.black,
                                                                        width: '45%',
                                                                        borderRadius: 10,
                                                                        marginHorizontal: 5,
                                                                        paddingVertical: 10,
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        backgroundColor: COLORS.main
                                                                    }}>
                                                                    <Text style={{
                                                                        color: COLORS.black,
                                                                    }}>
                                                                        Continue
                                                                    </Text>
                                                                </TouchableOpacity>
                                                                {/* <CustomeButton bcolor={COLORS.light} title={'Cancle'} onpress={() => setShowPoppup(false)} width={width / 3} />
                                    <CustomeButton title={'Continue'} onpress={() => setShowPoppup(false)} width={width / 3} /> */}

                                                            </View>
                                                        </View>
                                                        :
                                                        showPoppupDetial == 'ACTION_10' ?
                                                            <View style={{
                                                                margin: 20,
                                                                backgroundColor: 'white',
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
                                                            }}>
                                                                <Text style={{
                                                                    marginBottom: 10,
                                                                    color: COLORS.black,
                                                                    fontWeight: 'bold',
                                                                    textAlign: 'center',
                                                                }}>Concierge Management!</Text>
                                                                <Text style={{
                                                                    marginBottom: 10,
                                                                    textAlign: 'center',
                                                                    fontSize: 12,
                                                                    color: COLORS.black
                                                                }}>
                                                                    Your concierge package has expired. Renew your concierge pacakge to continue enjoying the benefits.
                                                                </Text>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            setShowPoppup(false),
                                                                                setShowPoppupDetail(null)
                                                                        }}
                                                                        style={{
                                                                            // borderColor: COLORS.black,
                                                                            width: '45%',
                                                                            borderRadius: 10,
                                                                            marginHorizontal: 5,
                                                                            paddingVertical: 10,
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            backgroundColor: COLORS.light
                                                                        }}>
                                                                        <Text style={{
                                                                            color: COLORS.black,
                                                                        }}>
                                                                            Cancel
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            setShowPoppup(false),
                                                                                setShowPoppupDetail(null),
                                                                                navigation.navigate('Concierge Management')
                                                                        }}
                                                                        style={{
                                                                            // borderColor: COLORS.black,
                                                                            width: '45%',
                                                                            borderRadius: 10,
                                                                            marginHorizontal: 5,
                                                                            paddingVertical: 10,
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            backgroundColor: COLORS.main
                                                                        }}>
                                                                        <Text style={{
                                                                            color: COLORS.black,
                                                                        }}>
                                                                            Continue
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    {/* <CustomeButton bcolor={COLORS.light} title={'Cancle'} onpress={() => setShowPoppup(false)} width={width / 3} />
                                    <CustomeButton title={'Continue'} onpress={() => setShowPoppup(false)} width={width / 3} /> */}

                                                                </View>
                                                            </View>
                                                            :
                                                            showPoppupDetial == 'ACTION_11' ?
                                                                <View style={{
                                                                    margin: 20,
                                                                    backgroundColor: 'white',
                                                                    borderRadius: 20,
                                                                    padding: 25,
                                                                    // alignItems: 'center',
                                                                    shadowColor: '#000',
                                                                    shadowOffset: {
                                                                        width: 0,
                                                                        height: 2,
                                                                    },
                                                                    shadowOpacity: 0.25,
                                                                    shadowRadius: 4,
                                                                    elevation: 5,
                                                                }}>
                                                                    <TouchableOpacity onPress={() => { setShowPoppup(false), setShowPoppupDetail(null) }} style={{
                                                                        alignItems: 'flex-end',
                                                                        position: 'absolute',
                                                                        top: 20,
                                                                        right: 20
                                                                    }}>
                                                                        <AntDesign name='close' color={COLORS.black} size={20} />
                                                                    </TouchableOpacity>
                                                                    <Image source={
                                                                        require('../../assets/attention.png')
                                                                    } style={{
                                                                        width: 70,
                                                                        height: 70,
                                                                        alignSelf: 'center'
                                                                    }} />
                                                                    <View style={{
                                                                        paddingTop: 10,
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <Text style={{
                                                                            fontSize: 16,
                                                                            color: COLORS.black,
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                            Attention Please!
                                                                        </Text>

                                                                        <Text style={{
                                                                            fontSize: 14,
                                                                            color: COLORS.gray,
                                                                            textAlign: 'center',
                                                                            paddingTop: 5
                                                                        }}>
                                                                            To chat with this person, you need to swipe right on their profile first.
                                                                            This ensures mutual interest before initiating a conversation.</Text>
                                                                    </View>
                                                                </View>
                                                                :
                                                                <View style={{
                                                                    margin: 20,
                                                                    backgroundColor: 'white',
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
                                                                }}>
                                                                    {/* <Image source={require('../../assets/flakeremove.png')} resizeMode='contain' style={{
                                width: 90,
                                height: 90
                            }} /> */}
                                                                    <Text style={{
                                                                        marginBottom: 10,
                                                                        color: COLORS.black,
                                                                        fontWeight: 'bold'
                                                                        // textAlign: 'center',
                                                                    }}>Unlock more Swips?</Text>
                                                                    <Text style={{
                                                                        marginBottom: 10,
                                                                        textAlign: 'center',
                                                                        fontSize: 12,
                                                                        color: COLORS.black
                                                                    }}>
                                                                        To unlock more swips. Please complete phase two questions so you can unlock this incredible feature and dive into the captivating world of dates and events!
                                                                    </Text>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between',

                                                                    }}>
                                                                        <TouchableOpacity
                                                                            onPress={() => { setShowPoppup(false), setShowPoppupDetail(null) }}
                                                                            style={{
                                                                                // borderColor: COLORS.black,
                                                                                width: '45%',
                                                                                borderRadius: 10,
                                                                                marginHorizontal: 5,
                                                                                paddingVertical: 10,
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                backgroundColor: COLORS.light
                                                                            }}>
                                                                            <Text style={{
                                                                                color: COLORS.black,
                                                                            }}>
                                                                                Cancel
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity
                                                                            onPress={() => onPhaseTwo()}
                                                                            style={{
                                                                                // borderColor: COLORS.black,
                                                                                width: '45%',
                                                                                borderRadius: 10,
                                                                                marginHorizontal: 5,
                                                                                paddingVertical: 10,
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                backgroundColor: COLORS.main
                                                                            }}>
                                                                            <Text style={{
                                                                                color: COLORS.black,
                                                                            }}>
                                                                                Continue
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                    }
                </View>

            </Modal>
            <Modal
                animationType="fade"
                transparent
                visible={userProfilePicture?.enable}
                onRequestClose={() => {
                    setUserProfilePicture({ ...userProfilePicture, enable: false });
                }}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setUserProfilePicture({ ...userProfilePicture, enable: false, image: null })}>
                        <AntDesign name="close" size={30} color={COLORS.black} />
                    </TouchableOpacity>
                    <FastImage
                        style={styles.fullImage}
                        source={{
                            uri: userProfilePicture?.image,
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    {/* <Image source={{ uri: userProfilePicture?.image }} resizeMode='contain'
                        style={styles.fullImage} /> */}
                </View>
            </Modal>
            {/* <Loader uploading={!uploading} modal={!uploading} /> */}
            <Modal
                animationType="fade"
                transparent
                visible={modal?.enable}
                onRequestClose={() => {
                    setModal({ ...modal, enable: false });
                }}>
                <View style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                }}>
                    <ScrollView>
                        <View style={{
                            // height: '90%', // Adjust the height as needed
                            margin: 20,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            overflow: 'hidden',
                            zIndex: 5,
                            // justifyContent:'space-between'
                        }}>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                // justifyContent: 'space-between',
                                paddingTop: 30,
                                // paddingHorizontal: 20,
                            }}>
                                <View style={{
                                    alignItems: 'center'
                                }}>
                                    <Image source={require('../../assets/refferal.png')} resizeMode='contain' style={{
                                        width: width / 1.5,
                                        height: height / 3.5,
                                        // backgroundColor:COLORS.gray
                                    }} />
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                        paddingBottom: 20
                                    }}>
                                        {modal?.title}
                                    </Text>
                                </View>
                                <TextInput
                                    // editable={nameEdit}
                                    error={refferalInputError}
                                    onFocus={() => setRefferalInputError(false)}
                                    value={refferalInput}
                                    placeholder={'Enter invite or VIP code'}
                                    placeholderTextColor={COLORS.gray}
                                    keyboardType='email-address'
                                    onChangeText={text => setRefferalInput(text)}
                                    underlineColor={COLORS.transparent}
                                    activeUnderlineColor={COLORS.transparent}
                                    style={{
                                        backgroundColor: COLORS.light,
                                        width: '100%',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '30%',
                            justifyContent: 'space-between',
                        }}>
                            <CustomeButton bcolor={COLORS.light} title={'Skip'} width={width / 2.5} onpress={() => onSkipRefferal()} />

                            <CustomeButton bcolor={COLORS.main} title={uploading ? <ActivityIndicator size={'small'} color={COLORS.white} /> : 'Continue'} width={width / 2.5} onpress={() => !uploading ? onSubmitRefferal() : null} />
                        </View>
                    </ScrollView>
                    {/* <Text style={{
                        color:COLORS.main
                    }}>test</Text> */}
                </View>
            </Modal>
        </SafeAreaView >
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 250,
    },
    infoContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    ageDistance: {
        fontSize: 16,
    },
    container: {
        // alignItems: 'center',
        // justifyContent:'center'
        // height: height,
        // width: width,
        // flex:1,
        backgroundColor: COLORS.white,
        alignContent: 'center',
        justifyContent: 'center',
    },
    map1: {
        alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 20,
        height: windowHeight / 5,
        width: '95%',
        borderRadius: 15,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '80%',
        height: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 10,
        zIndex: 1,
    },
})