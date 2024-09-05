import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../../consts/Colors';
import { useState } from 'react';
import Menu2 from '../../../assets/menu2.svg';
import SVGBio from '../../../assets/bio.svg';
import SVGNotify from '../../../assets/notify.svg';
import CustomeButton from '../../components/CustomeButton';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux';
import { ConciergeSendRequest, selectPaymentCards, selectUser } from '../../../../redux/reducers/Reducers';
const { width, height } = Dimensions.get("window");
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import Loader from '../../components/Loader';
import { useEffect } from 'react';
import FastImage from 'react-native-fast-image';




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


const ConciregeProfile = ({ navigation, route }) => {
    const { data } = route?.params

    // console.log(data.Address);
    const [coordinatorBtn, setCoordinatorBtn] = useState('Your Concierges');
    const [value, setValueIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalContent, setShowModalContent] = useState({
        title: null,
        descrition: null,
        type: null
    });
    const [coordinatorReqStatus, setCoordinatorReqStatus] = useState({
        enable: 0,
        note: null
    });
    const user = useSelector(selectUser)
    const PaymentCards = useSelector(selectPaymentCards)
    const dispatch = useDispatch()
    const handleSlide = (index) => {
        // console.log('slide');
        setValueIndex(index)
        const viewPage = CoordinatorBtn[index].name
        setCoordinatorBtn(viewPage);
    };

    const SendRequest = async () => {
        // console.log('tttt', data?.MonthlyRates);
        // return
        setLoading(true)
        if (user?.PackageId == 654 && user?.MembershipDetails?.id == 3) {
            // console.log('send', data.uid);
            try {
                const ref = firestore().collection('Requestes').doc(data?.uid)
                const documentSnapShot = await ref.get();
                const requestData = {
                    display: true,
                    sendby: user?.uid,
                    sendto: data?.uid,
                    MonthlyRatesType: data?.MonthlyRatesType,
                    servicetype: "Match coordinator",
                    type: 'Get',
                    status: false,
                    price: data?.MonthlyRates,
                    chargeid: null,
                    date: new Date().toString(),
                    // time: new Date().toString()
                };
                if (documentSnapShot?.exists) {
                    const dataArray = documentSnapShot?.data()?.MoreRequestes
                    const index = dataArray.findIndex(item => item.sendby == user?.uid);
                    if (index !== -1) {
                        dataArray[index] = {
                            ...dataArray[index], // Copy existing data
                            status: requestData.status, // Update status
                            display: requestData.display, // Update price
                            price: requestData.price, // Update price
                            MonthlyRatesType: requestData?.MonthlyRatesType,
                            DateAndHoneyFee: 0,
                            transactionFee: 0,
                            chargeid: null,
                            // You can update other fields here as well
                        };
                        await ref.update({
                            MoreRequestes: dataArray,
                        });
                    }
                    else {
                        await ref.update({
                            MoreRequestes: firestore.FieldValue.arrayUnion(requestData)
                        })
                    }
                    // setLoading(false)
                    // return
                }
                else {
                    ToastAndroid.show(`Network Error try again later...`, ToastAndroid.SHORT)
                }
                setLoading(false);
                Toast.show(`Request sent to ${data?.Name}`, Toast.LONG);
                setShowModalContent({
                    ...showModalContent,
                    title: 'Request Sent!',
                    descrition: `Your request has been sent to ${data?.Name}, the Match Coordinator. Please wait for their response. Your amount of ${requestData.price} has been deducted when the match coordinator accepts your request.`,
                    type: 'Success'
                })
                setShowModal(true)
                dispatch(ConciergeSendRequest(null))
                // navigation.goBack()
            } catch (e) {
                Toast.show(`Error : ${e}`, Toast.LONG)
                setLoading(false)
                setShowModal(false)
            }
        }
        else {
            const requestData = {
                display: true,
                sendby: user?.uid,
                sendto: data?.uid,
                servicetype: "Match coordinator",
                type: 'Get',
                status: false,
                price: data?.MonthlyRates,
                date: new Date().toString(),
                mediatorName: data?.Name,
                MonthlyRatesType: data?.MonthlyRatesType,
                // mediatorid: data?.uid,33
            };
            setLoading(false)
            // console.log(requestData);
            // return
            // console.log(requestData);
            // dispatch(ConciergeSendRequest(requestData))
            // navigation.replace('PaymentOptionScreen')
            if (PaymentCards?.length > 0) {
                navigation.navigate('CheckoutScreenConcriege', {
                    data: requestData
                })
            }
            else {
                navigation.navigate('PaymentOptionScreen')
            }
        }
    }

    const GetConciergeUserStatus = async () => {
        // console.log(data?.uid);
        try {
            const ref = firestore().collection('Requestes').doc(data?.uid)
            const documentSnapShot = await ref.get();
            if (documentSnapShot?.exists) {
                const dataArray = documentSnapShot?.data()?.MoreRequestes
                const doesExist = dataArray.some(item => item.sendby == user?.uid);
                const ReqAccepted = dataArray.some(item => item.sendby == user?.uid && item.status == true);
                const ReqRejected = dataArray.some(item => item.sendby == user?.uid && item.status == false && item.display == false);

                if (doesExist) {
                    console.log('exist');
                    setCoordinatorReqStatus({
                        ...coordinatorReqStatus,
                        enable: 1,
                        note: 'Request send please wait...'
                    })
                    if (ReqAccepted) {
                        setCoordinatorReqStatus({
                            ...coordinatorReqStatus,
                            enable: 2,
                            note: 'Request Accepted...'
                        })
                    }
                    else if (ReqRejected) {
                        setCoordinatorReqStatus({
                            ...coordinatorReqStatus,
                            enable: 3,
                            note: 'Request Accepted...'
                        })
                        setShowModalContent({
                            ...showModalContent,
                            title: `Request Rejected!`,
                            descrition: `Dating Coach ${data?.Name} has rejected  your request. Please try again later.`,
                            type: 'reject'
                        })
                        setShowModal(true)
                        // Toast.show(`Dating Coach ${data?.Name} has rejected  your request!`, Toast.LONG, {
                        //     backgroundColor: 'red',
                        // });
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        GetConciergeUserStatus()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        height: 50,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.navigate('Concirege')} style={{ flex: 1, }} >
                        <Image source={require('../../../assets/arrowleft.png')} resizeMode='contain' style={{
                            width: 25,
                            height: 25,
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
                        }}>Concierge Profile</Text>
                    </View>
                    <View style={{ flex: 1, }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        marginHorizontal: 20,
                        marginBottom: 50,
                    }}>
                        <View>
                            <FastImage
                                style={{
                                    height: height / 2.2,
                                    width: '100%',
                                    borderRadius: 10,
                                }}
                                source={{
                                    uri: data?.image1,
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            {/* <Image source={{ uri: data?.image1 }} resizeMode='cover' style={{
                                height: height / 2.2,
                                width: '100%',
                                borderRadius: 10,
                            }} /> */}
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
                            }}>{data?.MediatorType != 'Match Coordinator' ? data?.MediatorType : 'Dating Coach'}</Text>
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
                            {!data?.MondayOpen && !data?.TuesdayOpendata?.TuesdayOpen && !data?.WednesdayOpen && !data?.ThursdayOpen && !data?.FridayOpen && !data?.SaturdayOpen && !data?.SundayOpen &&
                                <Text style={{
                                    fontSize: 13, color: COLORS.gray
                                }}>
                                    Time is not available for the moment!
                                </Text>
                            }
                            {data?.MondayOpen &&
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
                                </View>}
                            {data?.TuesdayOpen &&
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
                                </View>}
                            {data?.WednesdayOpen &&
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
                                </View>}
                            {data?.ThursdayOpen &&
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
                                </View>}
                            {data?.FridayOpen &&
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
                                </View>}
                            {data?.SaturdayOpen &&
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
                                </View>}
                            {data?.SundayOpen &&
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
                                </View>}
                        </View>
                        <View style={{
                            marginVertical: 30,
                            // height: 50,
                            paddingVertical: 5,
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
                                {/* user?.PackageId == 654 && user?.MembershipDetails?.id == 3 && user?.MembershipDetails?.limits == 'unlimited' */}
                                <Text style={{
                                    fontSize: 12,
                                    color: COLORS.green,
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                    // borderBottomWidth: 1,
                                    // borderBottomColor: COLORS.black
                                }}>{user?.PackageId == 654 && user?.MembershipDetails?.id == 3 && user?.MembershipDetails?.limits == 'unlimited'
                                    ? 'Free' :
                                    `$${data?.MonthlyRates}`
                                    } </Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: COLORS.black,
                                    borderBottomWidth: 1,
                                    borderBottomColor: COLORS.black
                                }}>{data?.MonthlyRatesType} Based</Text>
                            </View>
                        </View>


                        <View style={{
                            alignSelf: 'center'
                        }}>
                            {coordinatorReqStatus?.enable == 2 ?
                                <CustomeButton
                                    // onpress={() => loading ? null : SendRequest()}
                                    title={coordinatorReqStatus?.note}
                                    width={width / 1.1}
                                    bcolor={COLORS.green}
                                />
                                :
                                coordinatorReqStatus?.enable == 1 ?
                                    <CustomeButton
                                        // onpress={() => loading ? null : SendRequest()}
                                        title={coordinatorReqStatus?.note}
                                        bcolor={COLORS.light}
                                        width={width / 1.1}
                                    />
                                    :
                                    coordinatorReqStatus?.enable == 3 ?
                                        <CustomeButton
                                            onpress={() => loading ? null : SendRequest()}
                                            title={loading ? 'Please wait...' : `Request to work with ${data?.Name?.split(' ')[0]}`}
                                            width={width / 1.1}
                                        />
                                        :
                                        <CustomeButton
                                            onpress={() => loading ? null : SendRequest()}
                                            title={loading ? 'Please wait...' : `Request to work with ${data?.Name?.split(' ')[0]}`}
                                            width={width / 1.1}
                                        />
                            }
                        </View>

                    </View>
                </ScrollView>
            </View >

            <Loader uploading={loading} modal={loading} />

            <Modal
                animationType='fade'
                visible={showModal}
                transparent={true}
                onRequestClose={() => {
                    setShowModal(false)
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
                        {!showModalContent?.type == 'reject' &&
                            <Image source={require('../../../assets/flakeremove.png')} resizeMode='contain' style={{
                                width: 50,
                                height: 50
                            }} />
                        }
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
                        {showModalContent?.type == 'reject' ?
                            <TouchableOpacity
                                onPress={() =>
                                    setShowModal(false)}
                                style={{
                                    // width:90,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                    // height:30,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: 'red'
                                }}>
                                <Text style={{
                                    color: COLORS.white,
                                    fontSize: 12,
                                }}>Continue</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModal(false)
                                    navigation.goBack()
                                }}
                                style={{
                                    // width:90,
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
                                }}>Completed</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    )
}

export default ConciregeProfile

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