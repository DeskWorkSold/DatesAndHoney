import { Dimensions, Image, Modal, SafeAreaView, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import COLORS from '../../../consts/Colors';
import { useState } from 'react';
import Menu2 from '../../../assets/menu2.svg';
import SVGTik from '../../../assets/tik.svg'
import CustomeButton from '../../components/CustomeButton';
import SVGImg1 from '../../../assets/menu.svg';
import Slider from '@react-native-community/slider';
const { width, height } = Dimensions.get("window");
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styled from 'styled-components/native'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/reducers/Reducers';
import Toast from 'react-native-simple-toast';
import Loader from '../../components/Loader';
import Geocoder from 'react-native-geocoding';
import AntDesign from 'react-native-vector-icons/AntDesign'
import RateMediatorScreen from '../../components/RateMediatorScreen';
import RangeSlider from 'rn-range-slider';
import { useCallback } from 'react';
import { getPreciseDistance } from 'geolib';
import FastImage from 'react-native-fast-image';

const SliderWrapper = styled.View`
  margin: 0px;
  width: 100%;
  height: 80px;
  justify-content: center;
`

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
`
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;`

const LabelText = styled.Text`
  font-size: 12px;
  color:${COLORS.black}
`
const RelagionType = [
    {
        id: '1',
        name: 'Christian',
        onpress: 'QuestionMoreAboutChristianScreen'
    },
    {
        id: '2',
        name: 'Jewish',
        onpress: 'QuestionMoreAboutJewishScreen'
    },
    {
        id: '3',
        name: 'Catholic',
        onpress: 'QuestionMoreAboutCatholicScreen'
    },
    {
        id: '4',
        name: 'Muslim',
        onpress: 'QuestionMoreAboutMuslimScreen'
    },
    {
        id: '5',
        name: 'Hinduism',
    },

    {
        id: '6',
        name: 'Buddhism',
    },

    {
        id: '7',
        name: 'Chinese traditional religion',
    },
    {
        id: '8',
        name: 'Others',
    },
]


const OccupationType = [
    {
        id: '1',
        name: 'Dating Coach',
        onpress: 'QuestionMoreAboutChristianScreen'
    },
    {
        id: '2',
        name: 'matchmaker',
        onpress: 'QuestionMoreAboutJewishScreen'
    },
    {
        id: '3',
        name: 'Religious Figure',
        onpress: 'QuestionMoreAboutCatholicScreen'
    },
    {
        id: '4',
        name: 'Psychologist',
        onpress: 'QuestionMoreAboutMuslimScreen'
    },
    {
        id: '5',
        name: 'Other',
    },

    {
        id: '6',
        name: 'life Coach',
    },

    {
        id: '7',
        name: 'MFT',
    },
]


const CoordinatorBtn = [
    {
        id: '1',
        name: 'Your Concierges',
    },
    {
        id: '2',
        name: 'Select New',
    }
];


const Concirege = ({ navigation }) => {
    const [coordinatorBtn, setCoordinatorBtn] = useState('Your Concierges');
    const [value, setValueIndex] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [showFilterType, setShowFilterType] = useState(null);
    const [ReviewCoach, setReviewCoach] = useState(null);
    const [showReligion, setShowReligion] = useState(false);
    const [filterReligion, setFilterReligion] = useState(null);
    const [search, setSearch] = useState(null);
    const [distance, setDistance] = useState(0);
    const [meterMatch, setMeterMatch] = useState(0);
    const [budgetSlider, setBudgetSlider] = useState(0);
    const [budgetEnd, setBudgetEnd] = useState(0);
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
    const user = useSelector(selectUser)
    const [showOccupation, setShowOccupation] = useState(false);
    const [conciergeUsers, setConciergeUsers] = useState([]);
    const [conciergeUsersFilter, setConciergeUsersFilter] = useState([]);
    const [recommended, setRecommended] = useState(false);
    const [loading, setLoading] = useState(false);
    const [datingCoach, setDatingCoach] = useState([]);
    const [datingCoachRating, setDatingCoachRating] = useState(null);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [defaultRating, setDefaultRating] = useState(0);
    const [newRating, setNewRating] = useState(0);
    const [comments, setComments] = useState(null);
    const [modalpoppup, setModalpoppup] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [conciergeTags, setConciergeTags] = useState({
        temp: [],
        main: []
    });
    const multiSliderValuesChange = (values) => setMultiSliderValue(values)
    const [showModalContent, setShowModalContent] = useState({
        title: null,
        descrition: null,
        type: null
    });
    // const renderThumb = useCallback(() => <Thumb />, []);
    // const renderRail = useCallback(() => <Rail />, []);
    // const renderRailSelected = useCallback(() => <RailSelected />, []);
    // const renderLabel = useCallback(value => <Label text={value} />, []);
    // const renderNotch = useCallback(() => <Notch />, []);
    // const handleValueChange = useCallback((low, high) => {
    //     setLow(low);
    //     setHigh(high);
    // }, []);
    // const budgetEnd

    const SearchTagsFuntion = (props) => {
        // console.log('==>', props);
        if (props) {
            const newData = conciergeTags?.main.filter((item) => {
                const itemData = item ? item?.toUpperCase()
                    : ''.toUpperCase();
                const textData = props?.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            // setFilteredDataSource(newData);
            // console.log(newData);
            setConciergeTags({
                ...conciergeTags,
                temp: newData
            });
            setSearch(props);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setConciergeTags({
                ...conciergeTags,
                temp: []
            });
            setSearch(props);
        }
        return
        // setSearch(props)
    }

    // console.log(selectedTags);

    const selectMulipleTags = (props) => {
        if (selectedTags?.includes(props)) {
            const newSelectedItems = selectedTags?.filter((i) => i !== props);
            setSelectedTags(newSelectedItems);
        }
        else {
            const newSelectedItems = [...selectedTags, props];
            setSelectedTags(newSelectedItems);
        }
    }
    // console.log(conciergeTags?.temp);
    const CustomRatingBar = (size, type) => {
        console.log(size);
        return (
            <View style={{
                justifyContent: size?.size ? 'flex-start' : 'center',
                flexDirection: 'row',
                marginTop: size?.size ? 0 : 30,
            }}>
                {maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => size.type ? setNewRating(item) : null}>
                            {size.type ?
                                <>
                                    {item <= newRating
                                        ? <AntDesign name='star' color={COLORS.main} size={size?.size ? size?.size : 40} />
                                        : <AntDesign name='staro' color={COLORS.main} size={size?.size ? size?.size : 40} />}
                                </>
                                :
                                <>
                                    {item <= defaultRating
                                        ? <AntDesign name='star' color={COLORS.main} size={size?.size ? size?.size : 40} />
                                        : <AntDesign name='staro' color={COLORS.main} size={size?.size ? size?.size : 40} />}
                                </>
                            }
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };
    const handleSlide = (index) => {
        // console.log('slide');
        setValueIndex(index)
        const viewPage = CoordinatorBtn[index].name
        setCoordinatorBtn(viewPage);
    };

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const json = await Geocoder.from(latitude, longitude)
            const address = json.results[0].formatted_address;
            // console.log(address);
            return address;
        } catch (error) {
            console.warn(error);
            return 'Error fetching address';
        }
    };

    // console.log(user?.BlockedUsers);
    const GetMatchCoordinator = async () => {
        setLoading(true)
        try {
            const LoginUserref = await firestore().collection('Users').doc(user?.uid)
                .get();
            const ref = await firestore().collection('Users')
                .get();
            if (!ref?.empty) {
                const cUsers = [];
                const promises = [];
                ref.forEach(element => {
                    const data = element?.data().userDetails;
                    const BlockUsers = LoginUserref?.data()?.BlockedUsers ?? []
                    let checkUser = BlockUsers?.some(item => item?.to == data?.uid);
                    let checkUserReligion = !data?.FilterReligion || data?.FilterReligion === 'All' || (data?.FilterReligion && data?.FilterReligion == user?.Relagion);
                    // console.log(data?.MediatorId == 2 && data?.MediatorType == 'Match Coordinator' && data?.Category == 'Mediator' && data?.PanelAccess && !checkUser && checkUserReligion, '=========================');

                    if (data?.MediatorId == 2 && data?.MediatorType == 'Match Coordinator' && data?.Category == 'Mediator' && data?.PanelAccess && !checkUser && checkUserReligion) {
                        const distance = (getPreciseDistance(
                            { latitude: user?.Location?.latitude, longitude: user?.Location?.longitude },
                            { latitude: data?.Location?.latitude, longitude: data?.Location?.longitude },
                        ) * 0.000621).toFixed(2);
                        // console.log('==> :',distance);
                        const promise = getAddressFromCoordinates(data?.Location?.latitude, data?.Location?.longitude)
                            .then(address => {
                                // console.log(address);
                                const addressParts = address.split(', ');
                                const lastWord = addressParts[addressParts.length - 1];
                                const updated = {
                                    ...data,
                                    Address: address,
                                    country: lastWord,
                                    distance: distance
                                }
                                // console.log(updated);
                                cUsers.push(updated)
                            })
                            .catch(error => {
                                const updated = {
                                    ...data,
                                    address: 'address not available',
                                };
                                cUsers.push(updated)
                            })
                        promises.push(promise);
                        // console.log('========> :', cUsers);
                        // setConciergeUsers(cUsers)
                        // setLoading(false)
                    }
                });
                await Promise.all(promises);
                setConciergeUsers(cUsers);
                setConciergeUsersFilter(cUsers)
                setLoading(false);
                // console.log(conciergeUsers?.length , 'Heloooo');
            }
        }
        catch (e) {
            console.log(e);
            setLoading(false)
            Toast.show(`Error : ${e}`, Toast.LONG);
        }
    }

    const GetYourMatchCoordinator = async () => {
        // console.log(user?.uid);
        setLoading(true)
        try {
            const ref = firestore().collection('Requestes').doc(user?.uid)
            const doc = await ref.onSnapshot(async (documentSnapShot) => {
                if (documentSnapShot?.exists) {
                    const dataArray = documentSnapShot?.data()?.MoreRequestes

                    const doesExist = dataArray.some(item => item.sendto == user?.uid && item?.status == true);
                    // console.log('=----------', doesExist);
                    if (doesExist) {
                        let datingcoachpush = []
                        let ratingpush
                        const promises = dataArray.map(async (element) => {
                            const data = element?.sendby;
                            if (data) {
                                const reftwo = firestore().collection('Users').doc(data)
                                const documentSnapShotTwo = await reftwo.get();
                                if (documentSnapShotTwo?.exists) {
                                    const dataArray = documentSnapShotTwo?.data()?.userDetails
                                    // console.log(dataArray?.Location?.latitude,'====');
                                    const promise = getAddressFromCoordinates(dataArray?.Location?.latitude, dataArray?.Location?.longitude)
                                        .then(address => {
                                            console.log(address);
                                            const addressParts = address.split(', ');
                                            const lastWord = addressParts[addressParts.length - 1];
                                            const updated = {
                                                ...dataArray,
                                                Address: address,
                                                country: lastWord,
                                            }
                                            // console.log(updated);
                                            // cUsers.push(updated)
                                            datingcoachpush.push(updated)
                                        })
                                        .catch(error => {
                                            const updated = {
                                                ...dataArray,
                                                address: 'address not available',
                                            };
                                            // cUsers.push(updated)
                                            datingcoachpush.push(updated)
                                        })
                                    ratingpush = documentSnapShotTwo?.data()?.Ratings
                                    return promise;
                                }
                                // console.log(data);
                                // console.log('==>',datingcoachpush);
                            }
                        })
                        await Promise.all(promises);
                        if (ratingpush?.length > 0) {
                            let maxRatingObject = Math.max(...ratingpush?.map(item => item?.rating));
                            console.log('here im', ratingpush.length, maxRatingObject);
                            setDefaultRating(maxRatingObject)
                            setDatingCoachRating(ratingpush?.length)
                        }
                        setDatingCoach(datingcoachpush)

                        setLoading(false)
                    }
                    else {
                        setDatingCoach([])
                        setLoading(false)
                    }
                }
            });
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }


    const GetConcriegeTags = async () => {
        try {
            const ref = firestore()
                .collection("Users")
                .where("userDetails.tags.allTags", ">=", [])
            // .where("userDetails.Category", "==", "User")
            const refdoc = await ref?.get();
            const uniqueTagsSet = new Set();

            if (!refdoc?.empty) {
                const doc = refdoc?.docs?.forEach((item) => {
                    const data = item?.data()?.userDetails
                    if (data?.Category == 'Mediator') {
                        const alltags = data?.tags?.allTags ?? []
                        // console.log(alltags);
                        alltags.forEach(tag => uniqueTagsSet.add(tag));

                    }
                });
                const uniqueTagsArray = Array.from(uniqueTagsSet);
                // console.log(uniqueTagsArray);
                setConciergeTags({
                    ...conciergeTags,
                    main: uniqueTagsArray,
                })

            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        GetMatchCoordinator()
        GetYourMatchCoordinator()
        GetConcriegeTags()
    }, [])

    useEffect(() => {
        if (recommended == true) {
            setMultiSliderValue([0, 100])
            // setDistance(5000)
            setDistance(1)
            console.log(distance);
        }
    }, [recommended])

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
                const ref = firestore().collection('Users').doc(datingCoach[0].uid)
                const refGet = await ref?.get()
                if (refGet?.exists) {
                    // console.log(refGet.data());
                    ref?.update({
                        Ratings: firestore.FieldValue.arrayUnion({
                            id: Math.random().toString(16).slice(2),
                            customerId: datingCoach[0].uid,
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
    const cancleFilter = () => {
        setShowFilter(false)
        setMultiSliderValue([0, 100])
        setDistance(0)
        setRecommended(false)
        setConciergeUsers(conciergeUsersFilter)
    }
    const applyFilter = () => {
        const filterDistance = Math.floor(distance * 5000)
        // console.log(filterDistance);
        if (filterDistance < 1) {
            Toast.show(`Please select distance your looking for!`, Toast.LONG, {
                backgroundColor: 'red',
            });
        }
        else {
            const [startValue, endValue] = multiSliderValue; // Start and End values from multiSliderValue
            // const tags = selectedTags;
            if (selectedTags?.length > 0) {
                const data = conciergeUsersFilter?.filter((e) => {
                    const checkTags = selectedTags?.some(tag => e?.tags?.allTags?.includes(tag));
                    if (
                        checkTags &&
                        e?.distance <= filterDistance &&
                        (e?.MonthlyRates >= startValue && e?.MonthlyRates <= endValue)
                    ) {
                        return true;
                    }
                    return false;
                    // console.log(checkTags , e?.uid);
                })
                setConciergeUsers(data)
                setShowFilter(false)
                setSelectedTags([])
            }
            else {
                const data = conciergeUsersFilter?.filter((e) => {
                    if (
                        e?.distance <= filterDistance &&
                        (e?.MonthlyRates >= startValue && e?.MonthlyRates <= endValue)
                    ) {
                        return true;
                    }
                    return false;
                })
                // console.log(data);
                setConciergeUsers(data)
                setShowFilter(false)
                setSelectedTags([])
            }
        }
    }

    if (user?.PackageId != '654') {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}>
                <View style={{
                    flex: 1,
                    // padding: 20,
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    // backgroundColor: '#f9f9f9',
                }}>
                    <View style={{
                        height: '20%',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            height: 60,
                        }}>
                            <TouchableOpacity
                                onPress={() => navigation.openDrawer()}
                                activeOpacity={0.8}
                                style={{
                                    flex: 1,
                                }}>
                                <SVGImg1 width={46} height={46} />
                            </TouchableOpacity>
                            <View style={{
                                flex: 2,
                                alignItems: 'center'
                            }}><Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>Concierge Management</Text></View>
                            <View style={{
                                flex: 1,
                            }}></View>
                        </View>
                    </View>
                    <View style={{
                        height: '60%',
                        alignItems: 'center',
                        paddingHorizontal: 20
                    }}>
                        <View style={{
                            marginBottom: 40
                        }}>
                            <AntDesign name='warning' size={130} color={COLORS.main} />
                        </View>
                        <Text style={{
                            fontSize: 16,
                            color: '#333',
                            textAlign: 'center',
                            marginBottom: 10,

                        }}>
                            This feature is not available for your current package.
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#666',
                            textAlign: 'center',
                            marginBottom: 20,
                        }}>
                            Upgrade to our premium package to access the concierge management service where you can pay and get a match coordinator service.
                        </Text>
                    </View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <CustomeButton title={'Upgrade Now'} onpress={() => navigation.navigate('Premium Membership')} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    height: 60,
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        activeOpacity={0.8}
                        style={{
                            flex: 1,
                        }}>
                        <SVGImg1 width={46} height={46} />
                    </TouchableOpacity>
                    <View style={{
                        flex: 2,
                        alignItems: 'center'
                    }}><Text style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: 'bold'
                    }}>Concierge Management</Text></View>
                    <View style={{
                        flex: 1,
                    }}></View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: "space-between",
                        width: '100%',
                        // paddingHorizontal: 10,
                        borderRadius: 10,
                        backgroundColor: COLORS.light
                    }}>
                        {CoordinatorBtn.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSlide(index)}
                                style={{
                                    // flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // borderWidth: 0.5,
                                    width: '50%',
                                    // borderColor: value == index ? COLORS.main: COLORS.gray,
                                    borderRadius: 10,
                                    height: 46,
                                    backgroundColor: value == index ? COLORS.main : COLORS.light
                                }}
                            >
                                <Text style={{
                                    fontFamily: '',
                                    color: COLORS.black
                                }}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>


                {coordinatorBtn == 'Your Concierges' ?
                    <View style={{
                        height: '100%',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        marginVertical: 40
                    }}>
                        {datingCoach?.length > 0 ?
                            <View style={{
                                top: -20
                            }}>
                                {datingCoach?.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: width,
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
                                            <TouchableOpacity
                                            // onPress={() => navigation.navigate('ConciregeProfile', {
                                            //     data: item
                                            // })}
                                            >
                                                <FastImage
                                                    style={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: 50,
                                                        borderWidth: 3,
                                                        borderColor: COLORS.main
                                                    }}
                                                    source={{
                                                        uri: item?.image1,
                                                        headers: { Authorization: 'someAuthToken' },
                                                        priority: FastImage.priority.normal,
                                                    }}
                                                    resizeMode={FastImage.resizeMode.cover}
                                                />
                                                {/* <Image source={{ uri: item?.image1 }} resizeMode='cover' style={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 50,
                                                    borderWidth: 3,
                                                    borderColor: COLORS.main
                                                }} /> */}
                                            </TouchableOpacity>
                                            <View style={{
                                                paddingLeft: 10,
                                            }}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                    color: COLORS.black,
                                                    paddingBottom: 5,
                                                }}>{item?.Name}</Text>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: COLORS.black
                                                }}>{item?.MediatorType == 'Match Coordinator' ? 'Dating Coach' : item?.MediatorType}</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('ChatingScreen', {
                                                    data: item,
                                                    rating: defaultRating,
                                                    totalreviews: datingCoachRating,
                                                })}
                                                style={{
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 5,
                                                    backgroundColor: COLORS.main,
                                                    borderRadius: 5,
                                                }}>
                                                <Text style={{
                                                    fontSize: 10,
                                                    color: COLORS.black
                                                }}>Chat</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => { setShowFilter(true), setShowFilterType('ACTION_2'), setReviewCoach(item) }}
                                            >
                                                <Text style={{
                                                    fontSize: 10,
                                                    top: 5,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: COLORS?.green,
                                                    color: COLORS.green,
                                                }}>
                                                    Rate {item?.Name.split(' ')[0]}
                                                </Text>
                                            </TouchableOpacity>

                                        </View>

                                    </View>
                                ))}
                            </View>
                            :
                            <View>
                                <View>
                                    <Image source={require('../../../assets/dateservay.png')} resizeMode='contain' style={{
                                        height: height / 5,
                                        alignSelf: 'center'
                                    }} />
                                </View>
                                <View style={{
                                    padding: 20,
                                    backgroundColor: COLORS.light,
                                    marginTop: 30,
                                    width: width / 1.2,
                                    // marginHorizontal: 20,
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
                                        }}>You have no Concierge</Text>
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontSize: 13, color: COLORS.gray }}>Select a concierge service now</Text>
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => { setValueIndex(1), setCoordinatorBtn('Select New') }}
                                            style={{
                                                marginVertical: 10,
                                                backgroundColor: COLORS.main,
                                                paddingHorizontal: 20,
                                                paddingVertical: 5,
                                                borderRadius: 5,
                                                alignItems: 'center',
                                            }}>
                                            <Text style={{ color: COLORS.black, fontSize: 13, fontWeight: 'bold' }}>Select Now</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>

                    :
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 40,
                            // paddingHorizontal: 20,
                            // backgroundColor:COLORS.main,
                        }}>
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 3, alignItems: 'center' }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: COLORS.black,
                                    fontSize: 14,
                                }}>Select your Concierge</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowFilter(true), setShowFilterType('ACTION_1') }}
                                style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Menu2 width={40} height={40} />
                            </TouchableOpacity>
                        </View>
                        {conciergeUsers?.length > 0 ?
                            <View>
                                {conciergeUsers?.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
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
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('ConciregeProfile', {
                                                    data: item
                                                })}
                                            >
                                                <FastImage
                                                    style={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: 50,
                                                        borderWidth: 3,
                                                        borderColor: COLORS.main
                                                    }}
                                                    source={{
                                                        uri: item?.image1,
                                                        headers: { Authorization: 'someAuthToken' },
                                                        priority: FastImage.priority.normal,
                                                    }}
                                                    resizeMode={FastImage.resizeMode.cover}
                                                />
                                                {/* <Image source={{ uri: item?.image1 }} resizeMode='cover' style={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 50,
                                                    borderWidth: 3,
                                                    borderColor: COLORS.main
                                                }} /> */}
                                            </TouchableOpacity>
                                            <View style={{
                                                paddingLeft: 10,
                                            }}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                    color: COLORS.black,
                                                    paddingBottom: 5,
                                                }}>{item?.Name}</Text>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: COLORS.black
                                                }}>{item?.MediatorType == 'Match Coordinator' ? 'Dating Coach' : item?.MediatorType}</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{
                                                fontSize: 10,
                                                color: COLORS.gray
                                            }}>{item?.MonthlyRatesType}</Text>
                                            {user?.PackageId == 654 && user?.MembershipDetails?.id == 3 ?
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: COLORS.green,
                                                }}>
                                                    Free
                                                </Text>
                                                :
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: COLORS.green
                                                }}>${item?.MonthlyRates} USD </Text>
                                            }
                                        </View>

                                    </View>
                                ))}
                            </View>
                            :
                            !loading ?
                                <View style={{
                                    height: 60,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.gray,
                                    }}>Dating Coach cannot found right now!</Text>
                                </View>
                                : null}
                    </View>
                }
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
                    height: height,
                    backgroundColor: COLORS.white,
                }}>
                    <ScrollView vertical showsVerticalScrollIndicator={false}>
                        {showFilterType == 'ACTION_1' ?
                            <View style={{
                                marginBottom: 150,
                            }}>
                                <View style={{
                                    height: 60,
                                    paddingHorizontal: 20,
                                    // padding: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <TouchableOpacity
                                        onPress={() => cancleFilter()}
                                        style={{
                                            flex: 1,
                                        }}>
                                        <Image source={require('../../../assets/cross.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.black
                                        }} />
                                    </TouchableOpacity>
                                    <View style={{
                                        flex: 3,
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: COLORS.black
                                        }}>
                                            Filter
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => applyFilter()}
                                        style={{
                                            flex: 1,
                                            alignItems: 'flex-end'
                                        }}>
                                        <Image source={require('../../../assets/right.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.black,
                                        }} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                        textAlign: 'center',
                                        paddingHorizontal: 30,
                                    }}>
                                        Filter the best concierge
                                        for you.
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPressIn={() => setRecommended(!recommended)}
                                    style={{
                                        marginVertical: 20,
                                    }}>
                                    <View style={{
                                        marginHorizontal: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20,
                                        backgroundColor: COLORS.light,
                                        borderRadius: 10,
                                        height: 50,
                                    }}>
                                        <View>
                                            <Text style={{
                                                // fontSize:13,
                                                color: COLORS.black
                                            }}>Recommended</Text>
                                        </View>
                                        {recommended &&
                                            <SVGTik width={20} height={20} />
                                        }
                                    </View>
                                </TouchableOpacity>

                                {/* <View style={{
                                    marginBottom: 20,
                                }}>
                                    <View style={{
                                        marginHorizontal: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20,
                                        backgroundColor: COLORS.light,
                                        borderRadius: 10,
                                        height: 50,
                                    }}>
                                        <View>
                                            <TextInput
                                                placeholder='Religion'
                                                placeholderTextColor={COLORS.black}
                                                value={filterReligion}
                                                onChangeText={(filterReligion) => setFilterReligion(filterReligion)}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => setShowReligion(!showReligion)}
                                            style={{
                                                padding: 5,
                                                backgroundColor: COLORS.black,
                                                borderRadius: 50,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            {showReligion ?
                                                <Image source={require('../../../assets/goback.png')} resizeMode='contain' style={{
                                                    width: 10,
                                                    tintColor: COLORS.white,
                                                    height: 10,
                                                    transform: [{ rotateZ: '90deg' }]
                                                    // transform: [{ rotateZ: '-90deg' }]
                                                }} />
                                                :
                                                <Image source={require('../../../assets/goback.png')} resizeMode='contain' style={{
                                                    width: 10,
                                                    tintColor: COLORS.white,
                                                    height: 10,
                                                    // transform: [{ rotateZ: '90deg' }]
                                                    transform: [{ rotateZ: '-90deg' }]
                                                }} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {showReligion &&
                                        <>
                                            <View style={{
                                                backgroundColor: COLORS.white,
                                                marginHorizontal: 20,
                                                // elevation:4,
                                                borderWidth: 1,
                                                borderColor: COLORS.light,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                paddingHorizontal: 20
                                            }}>
                                                {RelagionType?.map((j, i) => (
                                                    <TouchableOpacity key={i}
                                                        onPress={() => { setFilterReligion(j?.name), setShowReligion(false) }}
                                                        style={{
                                                            height: 50,
                                                            justifyContent: 'center'
                                                        }}>
                                                        <Text style={{ color: COLORS.gray }}>{j.name}</Text>
                                                    </TouchableOpacity>
                                                ))}

                                            </View>
                                        </>
                                    }
                                </View> */}


                                <View style={{
                                    marginBottom: 20,
                                }}>
                                    {/* <View style={{
                                        marginHorizontal: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20,
                                        backgroundColor: COLORS.light,
                                        borderRadius: 10,
                                        height: 50,
                                    }}>
                                        <View>
                                            <TextInput
                                                placeholder='Occupation'
                                                placeholderTextColor={COLORS.black}
                                                value={filterOccupation}
                                                onChangeText={(filterOccupation) => setFilterOccupation(filterOccupation)}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => setShowOccupation(!showOccupation)}
                                            style={{
                                                padding: 5,
                                                backgroundColor: COLORS.black,
                                                borderRadius: 50,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            {showOccupation ?
                                                <Image source={require('../../../assets/goback.png')} resizeMode='contain' style={{
                                                    width: 10,
                                                    tintColor: COLORS.white,
                                                    height: 10,
                                                    transform: [{ rotateZ: '90deg' }]
                                                    // transform: [{ rotateZ: '-90deg' }]
                                                }} />
                                                :
                                                <Image source={require('../../../assets/goback.png')} resizeMode='contain' style={{
                                                    width: 10,
                                                    tintColor: COLORS.white,
                                                    height: 10,
                                                    // transform: [{ rotateZ: '90deg' }]
                                                    transform: [{ rotateZ: '-90deg' }]
                                                }} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {showOccupation &&
                                        <>
                                            <View style={{
                                                backgroundColor: COLORS.white,
                                                marginHorizontal: 20,
                                                // elevation:4,
                                                borderWidth: 1,
                                                borderColor: COLORS.light,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                paddingHorizontal: 20
                                            }}>
                                                {OccupationType?.map((j, i) => (
                                                    <TouchableOpacity key={i}
                                                        onPress={() => { setFilterOccupation(j?.name), setShowOccupation(false) }}
                                                        style={{
                                                            height: 50,
                                                            justifyContent: 'center'
                                                        }}>
                                                        <Text style={{ color: COLORS.gray }}>{j.name}</Text>
                                                    </TouchableOpacity>
                                                ))}

                                            </View>
                                        </>
                                    } */}


                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        elevation: 4,
                                        borderRadius: 10,
                                        marginHorizontal: 20,
                                        top: 0,
                                    }}>

                                        <View>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingVertical: 10,
                                                paddingHorizontal: 10,
                                            }}>
                                                <Text style={{
                                                    color: COLORS.black,
                                                    fontSize: 12
                                                }}>Distance({Math.floor(distance * 500)}miles) </Text>
                                                <Text style={{
                                                    color: COLORS.black,
                                                    fontWeight: 'bold',
                                                    fontSize: 12
                                                }}>Whole country</Text>
                                            </View>
                                            <Slider
                                                style={{ width: '100%', height: 40, }}
                                                minimumValue={0}
                                                maximumValue={1}
                                                thumbTouchSize={{
                                                    width: 50, height: 50
                                                }}
                                                thumbTintColor={COLORS.main}
                                                minimumTrackTintColor={COLORS.main}
                                                maximumTrackTintColor={COLORS.gray}
                                                value={distance}
                                                onValueChange={(value) => setDistance(value)}
                                            />
                                        </View>

                                        <View style={{
                                            // flexDirection: 'row',
                                            // alignItems: 'center'
                                        }}>
                                            {/* <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                            }}>{Math.floor(budgetStart * 100)}%</Text>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontWeight: 'bold',
                                            }}>{Math.floor(budgetEnd * 100)}%</Text>
                                        </View> */}
                                            <ViewContainer>
                                                <SliderWrapper>
                                                    <LabelWrapper>
                                                        <LabelText>${multiSliderValue[0]}</LabelText>
                                                        {/* <LabelText>Budget range</LabelText> */}
                                                        <Text style={{ fontSize: 12, color: COLORS.gray }}>Budget range</Text>
                                                        <LabelText>${multiSliderValue[1]}</LabelText>
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
                                                                    height: 20,
                                                                    width: 20,
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
                                                        sliderLength={width / 1.3}
                                                        onValuesChange={multiSliderValuesChange}
                                                        min={0}
                                                        max={100}
                                                        allowOverlap={false}
                                                        minMarkerOverlapDistance={40}
                                                    />
                                                </SliderWrapper>
                                            </ViewContainer>
                                        </View>

                                        {/* <View>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingVertical: 10,
                                                paddingHorizontal: 20,
                                            }}>
                                                <Text style={{
                                                    color: COLORS.black,
                                                }}>Compatibility Meter
                                                    Match</Text>
                                                <Text style={{
                                                    color: COLORS.black,
                                                    fontWeight: 'bold',
                                                }}>{Math.floor(meterMatch * 100)}%</Text>
                                            </View>
                                            <Slider
                                                style={{ width: '100%', height: 40, }}
                                                minimumValue={0}
                                                maximumValue={1}
                                                thumbTouchSize={{
                                                    width: 50, height: 50
                                                }}
                                                thumbTintColor={COLORS.main}
                                                minimumTrackTintColor={COLORS.main}
                                                maximumTrackTintColor={COLORS.gray}
                                                value={meterMatch}
                                                onValueChange={(value) => setMeterMatch(value)}
                                            />
                                        </View> */}

                                    </View>

                                    <TouchableOpacity
                                        onPressIn={() => setRecommended(!recommended)}
                                        style={{
                                            marginTop: 20,
                                        }}
                                    >
                                        <View
                                            style={{
                                                marginLeft: 20,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingHorizontal: 20,
                                                backgroundColor: COLORS.light,
                                                borderRadius: 10,
                                                height: 50,
                                                width: width - 40, // Adjust the width as needed
                                            }}
                                        >
                                            <AntDesign name='search1' size={20} color={COLORS.black} />
                                            <View style={{ flex: 1 }}>
                                                <TextInput
                                                    value={search}
                                                    placeholder={'Search by tags'}
                                                    placeholderTextColor={COLORS.gray}
                                                    keyboardType='default'
                                                    onChangeText={(name) => SearchTagsFuntion(name)}
                                                    style={{
                                                        paddingHorizontal: 10,
                                                        width: '100%',
                                                        alignItems: 'flex-end',
                                                        // backgroundColor: COLORS.main,
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{
                                        marginTop: 5,
                                        backgroundColor: COLORS.white,
                                        elevation: 4,
                                        borderRadius: 5,
                                        paddingVertical: 0,
                                        marginHorizontal: 20,
                                    }}>
                                        {conciergeTags?.temp?.map((j, i) => (
                                            <TouchableOpacity
                                                onPress={() => selectMulipleTags(j)}
                                                key={i}
                                                style={{
                                                    height: 50,
                                                    paddingHorizontal: 20,
                                                    justifyContent: 'space-between',
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: COLORS.gray2,
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                <Text style={{
                                                    alignSelf: 'flex-start',
                                                    // backgroundColor:COLORS.main,
                                                    paddingHorizontal: 0,
                                                    height: '95%',
                                                    justifyContent: 'center',
                                                    textAlignVertical: 'center',
                                                    borderRadius: 5,
                                                    fontSize: 14,
                                                    color: COLORS.black
                                                }}>{j}</Text>
                                                {selectedTags?.includes(j) &&
                                                    <SVGTik width={20} height={20} />
                                                }
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>


                                <View style={{
                                    alignSelf: 'center',
                                    marginTop: 70
                                }}>
                                    <CustomeButton title={'Apply'} width={width / 1.1} onpress={() => applyFilter()} />
                                </View>
                            </View>
                            :
                            showFilterType == 'ACTION_2' ?
                                <RateMediatorScreen
                                    data={ReviewCoach}
                                    setShowFilter={setShowFilter}
                                    setShowFilterType={setShowFilterType}
                                    defaultRating={defaultRating}
                                    maxRating={maxRating}
                                    datingCoachRating={datingCoachRating}
                                    newRating={newRating}
                                    setNewRating={setNewRating}
                                    comments={comments}
                                    setComments={setComments}
                                    onpress={SubmitReview}
                                    loading={loading}
                                />
                                // <View style={{
                                //     flex: 1,
                                //     // backgroundColor:COLORS.green,
                                //     justifyContent: 'center',
                                //     marginBottom: 100
                                // }}>
                                //     <View style={{
                                //         flexDirection: 'row',
                                //         height: 60,
                                //         paddingHorizontal: 20,
                                //         alignItems: 'center'
                                //     }}>
                                //         <TouchableOpacity
                                //             onPress={() => { setShowFilter(false), setShowFilterType(null) }}
                                //             style={{
                                //                 flex: 1,
                                //             }}>
                                //             <AntDesign size={20} name='arrowleft' color={COLORS.black} />
                                //         </TouchableOpacity>
                                //         <View style={{ flex: 2 }} />
                                //         <View style={{ flex: 1 }} />
                                //     </View>
                                //     <View>
                                //         <Image source={require('../../../assets/rating.png')} resizeMode='contain' style={{
                                //             height: height / 4,
                                //             alignSelf: 'center',
                                //         }} />
                                //         <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 'bold', color: COLORS.black, textAlign: "center" }}>Review your Concierge</Text>
                                //         <Text style={{ fontSize: 10, color: COLORS.gray, textAlign: "center" }}>(This is private)</Text>
                                //         {ReviewCoach ?
                                //             <View
                                //                 style={{
                                //                     backgroundColor: COLORS.light,
                                //                     flexDirection: 'row',
                                //                     alignItems: 'center',
                                //                     paddingHorizontal: 20,
                                //                     paddingVertical: 10,
                                //                     justifyContent: 'space-between',
                                //                     marginVertical: 10,
                                //                 }}>
                                //                 <View style={{
                                //                     alignItems: 'center',
                                //                     flexDirection: 'row',
                                //                 }}>
                                //                     <TouchableOpacity
                                //                     // onPress={() => navigation.navigate('ConciregeProfile', {
                                //                     //     data: item
                                //                     // })}
                                //                     >
                                //                         <Image source={{ uri: ReviewCoach?.image1 }} resizeMode='contain' style={{
                                //                             width: 80,
                                //                             height: 80,
                                //                             borderRadius: 50,
                                //                             borderWidth: 3,
                                //                             borderColor: COLORS.main
                                //                         }} />
                                //                     </TouchableOpacity>
                                //                     <View style={{
                                //                         paddingLeft: 10,
                                //                     }}>
                                //                         <Text style={{
                                //                             fontSize: 14,
                                //                             fontWeight: 'bold',
                                //                             color: COLORS.black,
                                //                             paddingBottom: 5,
                                //                         }}>{ReviewCoach?.Name}</Text>
                                //                         <View style={{
                                //                             flexDirection: 'row',
                                //                             alignItems: 'center',
                                //                         }}>
                                //                             <Text style={{ fontSize: 10, color: COLORS.black }}>{defaultRating} / {Math.max.apply(null, maxRating)}</Text>
                                //                             <CustomRatingBar size={15} />
                                //                         </View>
                                //                         <Text style={{
                                //                             fontSize: 10,
                                //                             color: COLORS.black,
                                //                         }}>({datingCoachRating ? datingCoachRating : 0} reviews)</Text>
                                //                     </View>
                                //                 </View>

                                //             </View>
                                //             :
                                //             <View>
                                //                 <Text>Dating coach cannot found!</Text>
                                //             </View>
                                //         }
                                //     </View>
                                //     <View style={{
                                //         flexDirection: 'row',
                                //         alignItems: 'center',
                                //         justifyContent: 'center',
                                //         paddingVertical: 10
                                //     }}>
                                //         <CustomRatingBar size={25} type='Get' />
                                //         <Text style={{ color: COLORS.black, fontSize: 14 }}>({newRating}/{Math.max.apply(null, maxRating)})</Text>
                                //     </View>

                                //     <View style={{
                                //         paddingHorizontal: 20,
                                //     }}>
                                //         <Text style={{ color: COLORS.black, fontSize: 12, }}>Your Comments</Text>
                                //         <TextInput
                                //             value={comments}
                                //             onChangeText={(text) => setComments(text)}
                                //             placeholder={'Type Here...'}
                                //             placeholderTextColor={COLORS.gray}
                                //             selectionColor={COLORS.black}
                                //             underlineColor={COLORS.white}
                                //             activeUnderlineColor={COLORS.white}
                                //             style={{
                                //                 padding: 0,
                                //                 backgroundColor: COLORS.white,
                                //                 // width:'100%',
                                //                 elevation: 2,
                                //                 padding: 10,
                                //                 fontSize: 12,
                                //                 borderRadius: 10,
                                //                 textAlignVertical: 'top',
                                //                 marginBottom: 10
                                //             }}
                                //             multiline
                                //             numberOfLines={8}
                                //             editable={true}
                                //         />
                                //     </View>
                                //     <View style={{
                                //         alignSelf: 'center',
                                //         marginTop: 20,
                                //         marginBottom: 50,
                                //     }}>
                                //         <CustomeButton title={'Submit'} width={width / 1.2} onpress={() => loading ? null : SubmitReview()} />
                                //     </View>
                                // </View>
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

            <Loader uploading={loading} modal={loading} />
        </SafeAreaView>
    )
}

export default Concirege

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
})