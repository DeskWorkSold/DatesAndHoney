import { ActivityIndicator, Animated, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import HeaderTabOne from './HeaderTabOne';
import COLORS from '../../consts/Colors';
import { useEffect } from 'react';
import { getPreciseDistance } from 'geolib';
import { selectMediatorUser, selectUser } from '../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import Geocoder from 'react-native-geocoding';
import SVGImg1 from '../../assets/image.svg';
import SVGStatus from '../../assets/Status.svg';
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
import YourBodyType from '../../assets/YourBodyType.svg';
import Music from '../../assets/Music.svg';
import FavoriteFood from '../../assets/FavoriteFood.svg';
import Exercise from '../../assets/Exercise.svg';
import Ethnicity from '../../assets/Ethnicity.svg';
import Cuddle from '../../assets/Cuddle.svg';
import Clingy from '../../assets/Clingy.svg';
import HairColour from '../../assets/HairColour.svg';
import EyeColour from '../../assets/EyeColour.svg';
import Builttype from '../../assets/Builttype.svg';
import Notes from '../../assets/notes.svg';
import Matchnotes from '../../assets/matchnotes.svg';
import Gallery from '../../assets/gallery.svg';
import Match from '../../assets/match.svg';
import Bio from '../../assets/bio.svg';
import Location from '../../assets/location.svg';
import Cup from '../../assets/cup.svg';
import { ProgressBar } from 'react-native-paper';
import CustomeButton from './CustomeButton';
import firestore from '@react-native-firebase/firestore';
import Loader from './Loader';
import axios from 'axios';
const { width, height } = Dimensions.get("window");

const SuggestMatche = ({ navigation, suggestedData, data, modal, setModal }) => {
    const mediatoruser = useSelector(selectMediatorUser);
    // console.log(mediatoruser.userDetails);
    const [uploading, setUploading] = useState(false);
    const [userData, setUserData] = useState({
        dataName: data?.Name,
        dataIndex: 1,
        dataUid: data?.uid,
    });
    const [search, setSearch] = useState(null);
    const requestDetail = () => {
        setModal(false)
        setData(null)
        // setDistance(null)
    }
    // console.log('client data', data);
    // console.log('suggested data', suggestedData);

    const handleSlide = (data) => {
        setUserData({ ...userData, dataName: data?.Name })
        setUserData({ ...userData, dataIndex: 0 })
    }
    const handleSlide2 = (suggestedData) => {
        setUserData({ ...userData, dataName: suggestedData?.Name })
        setUserData({ ...userData, dataIndex: 1 })
    }

    const SuggestMatcheFunc = async (suggestedData, data) => {
        // console.log(itemOne , itemTwo); 
        // console.log('test'); 
        if (suggestedData && data) {
            // console.log('yes', props.userdata.suggestUser);
            setUploading(true)
            SendPushNotify(suggestedData, data);
            // return
            await firestore()
                .collection('Users').doc(data.uid).update({
                    Suggestion: firestore.FieldValue.arrayUnion({
                        SuggestedUsers: {
                            AuthorName: mediatoruser.userDetails.Name,
                            AuthorUid: mediatoruser.userDetails.uid,
                            AuthorAccountType: mediatoruser.userDetails.MediatorType,
                            SuggestedUserUid: suggestedData.uid,
                            SuggestedUserName: suggestedData.Name,
                        }
                    }),
                })
                .then(() => {
                    console.log('client req accepted');
                    ToastAndroid.show(`Suggestion send to ${data.Name}`, ToastAndroid.SHORT);
                    setUploading(false)
                    setModal(false)
                    // navigation.goBack()
                });
        }
        else {
            console.log('no');
            ToastAndroid.show("Network error try again later!", ToastAndroid.SHORT);
        }
    }
    const SendPushNotify = (suggestedData, data) => {
        firestore()
            .collection('token')
            .doc(data.uid)
            .get()
            .then(doc => {
                let token = doc.data().token;
                // console.log(token);

                // return
                if (token) {
                    var data = JSON.stringify({
                        notification: {
                            title: `Best Match suggestion from ${mediatoruser.userDetails.Name}(MC)`,
                            body: `${suggestedData.Name} is your best match found click to open the app`,
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
                            console.log(res);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                setModal(!modal);
            }}
        >
            <View style={{
                height: height,
                backgroundColor: COLORS.white,
                // paddingVertical: 20,
                // marginHorizontal:20,
                padding: 20
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // paddingHorizontal: 20,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    borderRadius: 10,
                    backgroundColor: COLORS.bluedark,
                    paddingVertical: 10,
                }}>
                    <TouchableOpacity>
                        <Text style={{ color: COLORS.white }}>{data?.Name}</Text>
                    </TouchableOpacity>
                    <Text style={{
                        paddingHorizontal: 10,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: COLORS.white
                    }}>&</Text>
                    <TouchableOpacity>
                        <Text style={{ color: COLORS.white }}>{suggestedData?.Name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 20,
                }}>
                    <View style={{
                        padding: 5,
                        backgroundColor: COLORS.white,
                        borderRadius: 30,
                        elevation: 4,
                        marginRight: 10,
                    }}>
                        <Match width={15} height={15} />
                    </View>
                    <Text>{suggestedData?.matchpercent} match chances</Text>
                </View>
                <View style={{
                    // marginTop: 0, 
                    // paddingHorizontal: 20, 
                    // backgroundColor: COLORS.white 
                    backgroundColor: COLORS.white,
                    // paddingHorizontal: 10,
                    paddingBottom: 20,
                    marginTop: 10,
                    marginBottom: 50
                }}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: "space-between",
                        width: '100%',
                        // paddingHorizontal: 10,
                        // borderRadius: 10,
                        // backgroundColor: COLORS.light
                    }}>
                        <TouchableOpacity
                            onPress={() => handleSlide2(suggestedData)}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                width: '50%',
                                width: '50%',
                                height: 46,
                                borderBottomColor: userData?.dataIndex == 1 ? COLORS.bluedark : COLORS.gray2
                            }}
                        >
                            <Text style={{
                                fontFamily: '',
                                color: userData?.dataIndex == 1 ? COLORS.bluedark : COLORS.gray
                            }}>{suggestedData?.Name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleSlide(data)}
                            style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                width: '50%',
                                width: '50%',
                                height: 46,
                                borderBottomColor: userData?.dataIndex == 0 ? COLORS.bluedark : COLORS.gray2
                            }}
                        >
                            <Text style={{
                                fontFamily: '',
                                color: userData?.dataIndex == 0 ? COLORS.bluedark : COLORS.gray
                            }}>{data?.Name}</Text>
                        </TouchableOpacity>
                    </View>
                    {userData?.dataName == data.Name && userData?.dataIndex == 1 ?
                        <View>
                            <ScrollView vertical showsVerticalScrollIndicator={false}>
                                <UserCard moreabout={suggestedData?.Interest} uploading={uploading} onpress={() => SuggestMatcheFunc(suggestedData, data)} userdata={{ ...suggestedData, suggestUser: userData?.dataUid }} search={search} setSearch={setSearch} loc={data?.Location} />
                            </ScrollView>
                        </View>
                        :
                        <View>
                            <ScrollView vertical showsVerticalScrollIndicator={false}>
                                <UserCard moreabout={data?.Interest} uploading={uploading} onpress={() => SuggestMatcheFunc(suggestedData, data)} client={true} userdata={{ ...data, suggestUser: userData?.dataUid }} search={search} setSearch={setSearch} loc={suggestedData?.Location} />
                            </ScrollView>
                        </View>
                    }

                </View>

            </View>
        </Modal>
    )
}

export default SuggestMatche


const UserCard = (props) => {
    // console.log(props?.userdata , 'test');
    const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);
    // const [filterSearch, setFilterSearch] = useState(props?.userdata?.Interest);
    // const [filterSearchtwo, setFilterSearchtwo] = useState(props?.moreabout);
    const [search2, setSearch2] = useState(false);

    return (
        <View style={{
            // borderRadius: 20,
            marginBottom: 300,
            justifyContent: 'center'
        }}>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 20,
            }}>
                <View style={{
                    borderWidth: 5,
                    borderColor: COLORS.main,
                    borderRadius: 80,
                }}>
                    <Image source={{ uri: props?.userdata?.image1 }} resizeMode='contain' style={{
                        borderRadius: 80,
                        width: width / 4,
                        height: width / 4
                    }} />
                </View>
                <View style={{
                    justifyContent: 'center'
                    , paddingLeft: 20
                }}>
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.black
                        }}>{props?.userdata?.Name}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.light,
                        borderRadius: 5,
                        padding: 5,
                        paddingHorizontal: 10,
                        marginTop: 5,
                    }}>
                        <Cup width={20} height={20} />
                        <Text style={{ color: COLORS.black, fontSize: 13, paddingLeft: 5, textAlignVertical: 'center' }}>Want to date</Text>
                    </View>
                </View>
            </View>
            <View style={{
                // marginHorizontal: 20,
                paddingBottom: 10,
            }}>
                <Text style={{
                    fontSize: 15,
                    color: COLORS.black
                }}>
                    I'm interested in
                </Text>
            </View>
            <View style={{
                // marginHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.gray2,
                // marginHorizontal: 20,
            }}>
                <View
                    // key={index}
                    // onPress={() => setSelectGender(index)}
                    style={{
                        borderWidth: props?.userdata?.Gender == 'Male' ? 1 : 0,
                        borderColor: props?.userdata?.Gender == 'Male' ? '#2A3182' : COLORS.transparent,
                        borderRadius: 10,
                        // paddingHorizontal: 20,
                        paddingVertical: 10,
                        width: '33%'
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        color: props?.userdata?.Gender == 'Male' ? '#2A3182' : COLORS.gray,
                    }}>
                        {props?.userdata?.Gender == 'Male' ? 'Boys' : 'Boys'}
                    </Text>
                </View>
                <View
                    // key={index}
                    // onPress={() => setSelectGender(index)}
                    style={{
                        borderWidth: props?.userdata?.Gender == 'Female' ? 1 : 0,
                        borderColor: props?.userdata?.Gender == 'Female' ? '#2A3182' : COLORS.transparent,
                        borderRadius: 10,
                        // paddingHorizontal: 20,
                        paddingVertical: 10,
                        width: '33%'
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        color: props?.userdata?.Gender == 'Female' ? '#2A3182' : COLORS.gray,
                    }}>
                        {props?.userdata?.Gender == 'Female' ? 'Girls' : 'Girls'}
                    </Text>
                </View>
                <View
                    // key={index}
                    // onPress={() => setSelectGender(index)}
                    style={{
                        borderWidth: props?.userdata?.Gender == 'Both' ? 1 : 0,
                        borderColor: props?.userdata?.Gender == 'Both' ? '#2A3182' : COLORS.gray,
                        borderRadius: 10,
                        // paddingHorizontal: 20,
                        paddingVertical: 10,
                        width: '33%'
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        color: props?.userdata?.Gender == 'Both' ? '#2A3182' : COLORS.gray,
                    }}>
                        Both
                    </Text>
                </View>
            </View>
            <View style={{
                // marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 20,
            }}>
                <Text style={{
                    color: COLORS.black,
                    fontSize: 15,
                }}>
                    Age Range
                </Text>
                <Text style={{
                    color: COLORS.black,
                    fontSize: 15,
                }}>
                    {/* {props?.data?.Age} */}
                    {new Date().getFullYear() - new Date(props?.userdata?.Dates).getFullYear()}

                </Text>
            </View>
            <View style={{
                // marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={{
                    width: `${new Date().getFullYear() - new Date(props?.userdata?.Dates).getFullYear()}%`,
                    height: 2,
                    backgroundColor: COLORS.main,
                }}>
                </View>
                <View style={{
                    padding: 5,
                    backgroundColor: COLORS.main,
                    borderRadius: 60,
                }}></View>
                <View style={{
                    width: width,
                    height: 2,
                    backgroundColor: COLORS.mainlight,
                }}>
                </View>
            </View>
            <View style={{
                // marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 20,
            }}>
                <Text style={{
                    color: COLORS.black,
                    fontSize: 15,
                }}>
                    Distance({props?.userdata?.Location ? (getPreciseDistance(
                        { latitude: props?.userdata?.Location.latitude, longitude: props?.userdata?.Location?.longitude, },
                        { latitude: props?.loc?.latitude, longitude: props?.loc?.longitude }
                    ) * 0.000621).toFixed(1) : 'no'} miles)
                </Text>
                <Text style={{
                    color: COLORS.black,
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>
                    Whole country
                    {/* { props?.loc?.longitude} */}
                    {/* {new Date().getFullYear() - new Date(props?.userdata?.Dates).getFullYear()} */}


                    {/* {props?.userdata?.Location ? (getPreciseDistance(
                    { latitude: props?.userdata?.Location.latitude, longitude: props?.userdata?.Location?.longitude, },
                    { latitude: props?.loc?.latitude, longitude: props?.loc?.longitude }
                ) * 0.000621).toFixed(1) : 'no'} */}

                </Text>
            </View>
            <View style={{
                // marginHorizontal: 20,
                // alignSelf:'center',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={{
                    width: (getPreciseDistance(
                        { latitude: props?.userdata?.Location.latitude, longitude: props?.userdata?.Location?.longitude, },
                        { latitude: props?.loc?.latitude, longitude: props?.loc?.longitude }
                    ) * 0.000621),
                    height: 2,
                    backgroundColor: COLORS.main,
                }}>
                </View>
                <View style={{
                    padding: 5,
                    backgroundColor: COLORS.main,
                    borderRadius: 60,
                }}></View>
                <View style={{
                    width: width,
                    height: 2,
                    backgroundColor: COLORS.mainlight,
                }}>
                </View>
            </View>
            {props?.moreabout &&
                <>
                    <View style={{
                        // marginHorizontal: 20,
                        flexDirection: 'row',
                        // alignSelf: 'center',
                        width: '100%',
                        height: 45,
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        backgroundColor: COLORS.light,
                        borderRadius: 10,
                        marginTop: 20
                    }}>
                        <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                            marginRight: 5,
                            width: 15,
                            height: 15,
                            tintColor: COLORS.gray
                        }} />
                        <TextInput
                            value={search2}
                            placeholder={'Search'}
                            onChangeText={text => searchFilterFunction(text)
                            }
                            style={styles.TextInput}
                        />
                    </View>
                    <View style={{
                        // marginHorizontal: 20,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: 10,
                        alignItems: 'center',
                    }}>
                        {props?.moreabout.map((item, index) => (
                            // console.log(item)
                            <View
                                key={index}
                                style={{
                                    backgroundColor: COLORS.main,
                                    borderWidth: 1,
                                    marginRight: 3,
                                    borderColor: COLORS.main,
                                    borderRadius: 10,
                                    paddingHorizontal: 15,
                                    paddingVertical: 5,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                <Text style={{
                                    flexDirection: 'row',
                                    paddingHorizontal: 5
                                }}>{item}</Text>
                                <TouchableOpacity
                                // onPress={() => handleRemoval(TypeTestimonial.name)}
                                >
                                    <Image source={require('../../assets/cross.png')} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </>
            }
            <View style={{
                paddingVertical: 20,
                marginHorizontal: 20,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLORS.black
                }}>About</Text>
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
                    justifyContent: 'center',
                    // bottom:-10
                }}>
                {showAdvanceFilter ?
                    <Image source={require('../../assets/dropdown.png')} resizeMode='contain'
                        style={{ transform: [{ rotateZ: '-180deg' }] }}
                    />
                    :
                    <Image source={require('../../assets/dropdown.png')} resizeMode='contain' />
                }
            </TouchableOpacity>

            {showAdvanceFilter &&
                // console.log(props?.userdata?.FavFood)
                <>
                    {props?.userdata?.DescribeYou &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Personality width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.DescribeYou}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.Cuddling &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Cuddle width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Cuddling}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.Drink &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Drinker width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Drink}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.Education &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Education width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Education}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.Ethnicity &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Ethnicity width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Ethnicity}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.Exercise &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Exercise width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Exercise}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.FavFood && Array.isArray(props?.userdata?.FavFood) == true &&
                        <>
                            {props?.userdata?.FavFood.map((item, index) => (
                                <View
                                    key={index}
                                    // onPress={() => SelectedAdvanceFilter(item)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20,
                                        // width:width,
                                        backgroundColor: COLORS.light,
                                        paddingVertical: 10,
                                        // marginBottom: 20,
                                    }}>
                                    <View style={{
                                        width: '15%',
                                        alignItems: 'flex-start'
                                    }}>
                                        <FavoriteFood width={30} height={30} />
                                    </View>
                                    <View style={{
                                        width: '85%',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: COLORS.black
                                        }}>
                                            {item}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </>
                    }
                    {props?.userdata?.Hieght &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Height width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Hieght}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.Kids &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Kids width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Kids}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.Music &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Music width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Music}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.Nature &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Orientation width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Nature}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.PoliticalView &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <PoliticalViews width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.PoliticalView}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.Relagion &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <Religion width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Relagion}
                                </Text>
                            </View>
                        </View>
                    }
                    {props?.userdata?.Smoke &&
                        <View
                            // onPress={() => SelectedAdvanceFilter(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                // width:width,
                                backgroundColor: COLORS.light,
                                paddingVertical: 10,
                                // marginBottom: 20,
                            }}>
                            <View style={{
                                width: '15%',
                                alignItems: 'flex-start'
                            }}>
                                <NonSmoker width={30} height={30} />
                            </View>
                            <View style={{
                                width: '85%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black
                                }}>
                                    {props?.userdata?.Smoke}
                                </Text>
                            </View>
                        </View>
                    }
                </>
            }
            <View style={{
                alignSelf: 'center',
                marginTop: 30
            }}>
                {props?.uploading ?
                    <View style={{
                        backgroundColor: COLORS.main,
                        width: 350,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: COLORS.transparent
                    }}>
                        <ActivityIndicator size="small" color={COLORS.white} animating={props?.uploading} />
                    </View>
                    :
                    <CustomeButton title={'Suggest Match'} onpress={props.onpress} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    progressBar: {
        height: 20,
        flexDirection: "row",
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    absoluteFill: {
        backgroundColor: COLORS.main
    },
    NumberInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 10
    },
})