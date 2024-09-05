import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors'
import SimpleHeader from '../../../components/SimpleHeader'
import { Image } from 'react-native'
import { useState } from 'react';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRef } from 'react'
import { useEffect } from 'react'
import moment from 'moment';

const { width, height } = Dimensions.get("window");



const UploadedVideos = ({ navigation, route }) => {
    const { data } = route?.params;
    // const videoRef = useRef(null);

    // console.log(data);
    const [showPoppup, setShowPoppup] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [numberOfWords, setNumberOfWords] = useState(70);
    const [playModal, setPlayModal] = useState(false);
    const [play, setPlay] = useState(false)
    const [VideoContent, setVideoContent] = useState(data ? data : null);
    const [uploading, setUploading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const CurrentUser = auth().currentUser.uid;

    // console.log(startDate, endDate);


    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleDateConfirm = (date) => {
        if (!startDate) {
            setStartDate(date);
            // console.log('here');
        } else if (!endDate) {
            if (date < startDate) {
                // Swap start and end dates if needed
                setEndDate(startDate);
                setStartDate(date);
            } else {
                // console.log('here2');
                setEndDate(date);
            }
        }

        else {
            setStartDate(date);
            setEndDate(null);
        }

        hideDatePicker();
    };


    // const fetchContent = () => {
    //     setUploading(true)
    //     firestore()
    //         .collection('PostContent')
    //         .onSnapshot(querySnapshot => {
    //             const VContent = [];
    //             querySnapshot.forEach((documentSnapshot) => {
    //                 const data = documentSnapshot.data();
    //                 // console.log(data);
    //                 if (data?.Oweruid == CurrentUser && data?.Active == 1 && data?.Type == 'Video') {
    //                     console.log('Video===>', data);
    //                     VContent.push(data);
    //                 }
    //             })
    //             // console.log('==>', VContent);
    //             setVideoContent(VContent);
    //         })
    //     setUploading(false)
    // }

    const OnSeeDetails = (item, index) => {
        let concate = { ...item, index: index }

        console.log(concate);
        // return
        setModalData(concate)
        setShowPoppup(true)
    };

    // const toggleNumberOfWords = (modalData) => {
    //     if (numberOfWords === 70) {
    //         setNumberOfWords(modalData?.Description?.split(' ').length); // Display all words
    //     } else {
    //         setNumberOfWords(70); // Display only 100 words
    //     }
    // };

    const PlayVideo = (item, index) => {

        // console.log(item , index);
        // return
        // const tempData = []

        // data.filter((j, i) => {
        //     if (j.id == item?.id) {
        //         console.log(j);
        //         let update = { 
        //             ...j,
        //             PlayVideo : false
        //         }
        //         // console.log(update);
        //         tempData.push(j)
        //     }
        //     else{
        //         tempData.push(j)
        //     }
        // })

        // return
        var data2 = data[index]
        if (item?.PlayVideo == true) {
            let update = {
                ...data2,
                PlayVideo: false
            }

            data[index] = update;
            setVideoContent(data)
            // console.log(data);
        }
        else {
            // const data2 = data[index]
            let update = {
                ...data2,
                PlayVideo: true
            }

            data[index] = update;
            // console.log(data);
            setVideoContent(data)
        }
    }

    // const onRefSet = (ref) => {
    //     if (ref) {
    //         videoRef.current = ref;
    //     }
    // };

    // const handlePlayPause = () => {
    //     if (videoRef.current) {
    //         if (isPlaying) {
    //             videoRef.current.pause();
    //             setIsPlaying(false)
    //             console.log(isPlaying);

    //         } else {
    //             videoRef.current.play();
    //             setIsPlaying(true)
    //             console.log(isPlaying);

    //         }
    //         // setIsPlaying(!isPlaying);
    //     }
    // };

    // console.log(isPlaying);

    const filterData = () => {
        // console.log('hello');
        if (startDate && endDate) {
            var f1date = firestore.Timestamp.fromDate(new Date(startDate))?.toDate()?.toLocaleDateString();
            var f2date = firestore.Timestamp.fromDate(new Date(endDate))?.toDate()?.toLocaleDateString();

            // console.log(f1date, f2date)

            var filteredArray = data?.filter(function (element) {
                const date = element?.timeStamp?.toDate().toLocaleDateString();
                // console.log(date);
                return f1date <= date && f2date >= date;
            });
            // console.log(filteredArray);
            setVideoContent(filteredArray)
        }
        else {
            setVideoContent(data)
        }
    }

    const GoBackScreen = () => {
        setStartDate(null)
        setEndDate(null)
        setVideoContent(data)
        navigation.goBack()
    }


    useEffect(() => {
        // fetchContent();
        filterData();
    }, [startDate, endDate]);

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <SimpleHeader center={'Videos Uploaded'} onpress={() => GoBackScreen()} />

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingHorizontal: 20,
                paddingBottom: 20,
                alignSelf: 'flex-end',
            }}>
                <View style={{
                    backgroundColor: COLORS.light,
                    padding: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {startDate &&
                        <Text style={{
                            fontSize: 10,
                            color: COLORS.black
                        }}>
                            {moment(startDate).format('MM/DD/yy')} to
                        </Text>
                    }
                    {endDate &&
                        <Text style={{
                            fontSize: 10,
                            color: COLORS.black
                        }}> {moment(endDate).format('MM/DD/yy')}</Text>
                    }
                    {!startDate && !endDate &&
                        <Text style={{
                            fontSize: 10,
                            color: COLORS.black
                        }}>All videos</Text>
                    }
                </View>
                <TouchableOpacity
                    onPress={() => showDatePicker()}
                    style={{
                        backgroundColor: COLORS.black,
                        padding: 5,
                        borderRadius: 5,
                    }}>
                    <Image source={require('../../../../assets/Combined-Shape.png')} resizeMode='contain' style={{
                        tintColor: COLORS.white,
                        width: 15,
                        height: 15
                    }} />
                </TouchableOpacity>
            </View>


            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    marginBottom: 300,
                    paddingHorizontal: 10
                }}>

                    {uploading ?
                        <View style={{
                            padding: 20,
                            alignSelf: 'center'
                        }}>
                            <ActivityIndicator size='small' color={COLORS.main} animating={uploading} />
                        </View>
                        :
                        <>
                            {VideoContent?.length > 0 ?
                                <View>
                                    {VideoContent.map((item, index) => (
                                        <View key={index}
                                            // onPress={() => onEventDeatilsScreen({ item })}
                                            // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                                            activeOpacity={0.7}
                                            style={{
                                                alignSelf: 'center',
                                                backgroundColor: COLORS.gray,
                                                elevation: 5,
                                                borderColor: COLORS.light,
                                                borderRadius: 10,
                                                // borderWidth: 1,
                                                // marginLeft: 20,
                                                marginRight: 5,
                                                marginBottom: 20,
                                                width: '95%',
                                                backgroundColor: COLORS.white,
                                            }}>
                                            <View>
                                                <TouchableOpacity
                                                    // onPress={() => PlayVideo(item, index)}
                                                    onPress={() => setPlay(!play)}
                                                >
                                                    <VideoPlayer source={{ uri: item?.VideoUrl }}
                                                        style={{
                                                            width: '100%',
                                                            // height: 200,
                                                            height: height / 4,
                                                            borderRadius: 10,
                                                        }}
                                                        tapAnywhereToPause={true}
                                                        paused={true}
                                                    />

                                                    {/* <Video
                                                        // ref={videoRef}
                                                        source={{ uri: item?.VideoUrl }} // Replace with your video URL
                                                        style={{
                                                            width: '100%',
                                                            // height: 200,
                                                            height: height / 4,
                                                            borderRadius: 10,
                                                        }}
                                                        // buffer={true}
                                                        controls={play}
                                                    // minLoadRetryCount={5} 
                                                    // repeat={true}
                                                    // paused={true}
                                                    // onLoad={() => setIsPlaying(true)}
                                                    /> */}
                                                </TouchableOpacity>
                                                {/* <Image source={{ uri: item.Image }} resizeMode='cover'
                                            style={{
                                                width: '100%',
                                                height: 200,
                                                borderRadius: 10,
                                            }} /> */}
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                padding: 10,
                                                // flex: 1
                                            }}>
                                                <View style={{
                                                    // flex: 2
                                                    width: '100%',
                                                    // backgroundColor:COLORS.gray
                                                }}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: COLORS.black,
                                                        marginRight: 10,
                                                    }}>{item.Title}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                paddingHorizontal: 10,
                                                paddingBottom: 10,
                                                justifyContent: 'flex-end'
                                            }}>
                                                <View style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => OnSeeDetails(item, index)}
                                                        style={{
                                                            padding: 5,
                                                            paddingHorizontal: 10,
                                                            backgroundColor: COLORS.main,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 5,
                                                        }}>
                                                        <Text style={{ fontSize: 12, color: COLORS.black }}>See Details</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>

                                    ))}
                                </View>
                                :
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>No Videos</Text>
                                    <Text style={{ color: COLORS.black, fontSize: 12, }}>Currently we do not have any videos.</Text>
                                </View>
                            }
                        </>
                    }

                </View>

            </ScrollView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={showPoppup}
                onRequestClose={() => {
                    setShowPoppup(!showPoppup);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: COLORS.gray,
                    opacity: 0.9,
                }}>
                    <View style={{
                        minHeight: height / 2,
                        maxHeight: height / 1.3,
                        margin: 20,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        // padding: 25,
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
                        {modalData ?
                            <View>
                                <View style={{
                                    height: '90%',
                                    // backgroundColor:COLORS.gray
                                }}>

                                    <VideoPlayer source={{ uri: modalData?.VideoUrl }}
                                        style={{
                                            width: '100%',
                                            height: 200,
                                            height: height / 4,
                                            borderRadius: 10,
                                        }}
                                        tapAnywhereToPause={true}
                                        paused={true}
                                    />
                                    {/* <Image source={{ uri: modalData?.Image }} resizeMode='cover' style={{
                                        width: '100%',
                                        height: '60%',
                                        borderRadius: 20,
                                    }} /> */}
                                    <View style={{
                                        padding: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: COLORS.black
                                        }}>{modalData.Title}</Text>
                                    </View>
                                    <View style={{
                                        paddingHorizontal: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: COLORS.black
                                        }}>
                                            Description:
                                        </Text>
                                        <Text style={{
                                            fontSize: 12,
                                            color: COLORS.black
                                        }}>
                                            Max(100)
                                        </Text>

                                        {/* {numberOfWords === 70 && modalData?.Description.split(' ').length > 70 && (
                                            <TouchableOpacity onPress={() => toggleNumberOfWords(modalData)}>
                                                <Text style={{
                                                    color: COLORS.blue
                                                }}>See More...</Text>
                                            </TouchableOpacity>
                                        )}
                                        {numberOfWords !== 70 && (
                                            <TouchableOpacity onPress={() => toggleNumberOfWords(modalData)}>
                                                <Text style={{
                                                    color: COLORS.blue
                                                }}>See Less</Text>
                                            </TouchableOpacity>
                                        )} */}
                                    </View>
                                    <Text style={{
                                        paddingHorizontal: 10,
                                        fontSize: 12,
                                        color: COLORS.gray,
                                    }}>
                                        {modalData?.Description.split(' ').slice(0, numberOfWords).join(' ')}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => { setShowPoppup(false), setModalData(null) }} style={{
                                    // height:'10%',
                                    padding: 5,
                                    backgroundColor: COLORS.main,
                                    borderRadius: 5,
                                    justifyContent: 'flex-end',
                                    alignSelf: 'flex-end',
                                    marginHorizontal: 10,
                                    marginTop: 5,
                                }}>
                                    <Text style={{ fontSize: 12, color: COLORS.black }}>Close Details</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ActivityIndicator size='small' color={COLORS.main} animating={true} />
                            </View>
                        }
                    </View>
                </View>
            </Modal>



            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />

        </View>
    )
}

export default UploadedVideos

const styles = StyleSheet.create({})