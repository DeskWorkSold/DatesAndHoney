import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import CustomeButton from '../../../components/CustomeButton';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import Share2 from '../../../../assets/share.svg';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const EventScreen = ({ navigation }) => {
    const [btnindex, setBtnindex] = useState(null);
    const [allEvents, setAllEvents] = useState(null);
    const [tempEvent, setTempEvent] = useState(null);
    const [tempLoading, setTempLoading] = useState(false)
    const [showPoppup, setShowPoppup] = useState(false);
    const [autoCode, setAutoCode] = useState(null);


    const fetchAllEvents = async () => {
        setTempLoading(true)
        await firestore()
            .collection('Events')
            .onSnapshot(querySnapshot => {
                const data = [];
                querySnapshot.forEach((documentSnapshot) => {
                    data.push(documentSnapshot?.data());
                });
                data.sort(function (a, b) {
                    return new Date(b?.timeStamp?.toDate().toDateString() + " " + b?.timeStamp?.toDate().toTimeString()) - new Date(a?.timeStamp?.toDate().toDateString() + " " + a?.timeStamp?.toDate().toTimeString());
                });
                setAllEvents(data)
                setTempLoading(false)
            });
    }

    const GenCode = () => {
        setAutoCode(Math?.random().toString(16).slice(2))
    }

    const CopyLink = (autoCode) => {
        Clipboard.setString(autoCode);
        setShowPoppup(false)
    }

    const GetCode = (item) => {
        // console.log(item);
        setTempEvent(item)
        setShowPoppup(true)
        GenCode()
    }
    
    const shareCode = async (autoCode) => {
        // console.log(tempEvent.Title , autoCode);
        // return
        const shareOptions = {
            // title: 'Promo Code: ' + autoCode,
            message: 'Event: ' + tempEvent.Title + ', ' + 'Promo Code: ' + autoCode,  //string
        };

        // return
        try {
            const ShareResponce = await Share.open(shareOptions)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.log('Error2', err);
                });
        }
        catch (e) {
            console.log('Error', e);
        }
    }

    useEffect(() => {
        fetchAllEvents();

        // allEvents.map((item) => {
        //     console.log(item.image1);
        // })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                {!tempLoading ?
                    <View style={{
                    }}>
                        <View style={{
                            paddingTop: 20,
                            paddingHorizontal: 20
                        }}>
                            <View>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 16,
                                    color: COLORS.black,
                                    fontWeight: 'bold'
                                }}>Events Promotion</Text>
                            </View>
                            <View style={{
                                paddingVertical: 10,
                                paddingHorizontal: 10
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 12,
                                    color: COLORS.gray,
                                }}>Promote Events to earn 10% of ticket sales on tickets you sell, and your Promo code will also give your followers discounts to event.</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    paddingVertical: 20,
                                }}>Current Events</Text>
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{
                                marginBottom: 300,
                                paddingHorizontal: 10
                            }}>

                                {allEvents ?
                                    <>
                                        {allEvents.map((item, index) => (
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
                                                    backgroundColor: COLORS.white
                                                }}>
                                                <View>
                                                    <Image source={{ uri: item.image1 }} resizeMode='cover'
                                                        style={{
                                                            width: '100%',
                                                            height: 200,
                                                            borderTopLeftRadius: 10,
                                                            borderTopRightRadius: 10,
                                                        }} />
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    padding: 10,
                                                    // flex: 1
                                                }}>
                                                    <View style={{
                                                        // flex: 2
                                                        width: '70%',
                                                        // backgroundColor:COLORS.gray
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            color: COLORS.black,
                                                            marginRight: 10,
                                                        }}>{item.Title}</Text>
                                                    </View>
                                                    <View style={{
                                                        // flex:1
                                                        width: '30%',
                                                        alignItems: 'flex-end',
                                                        // justifyContent:'center',
                                                        // backgroundColor:COLORS.gray
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 15,
                                                            color: COLORS.black,
                                                            fontWeight: 'bold'
                                                        }}>${item.totalTicketPrice}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingHorizontal: 10,
                                                    paddingBottom: 10,
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        width: '70%',
                                                        // backgroundColor:COLORS.black
                                                    }}>
                                                        <View style={{
                                                            marginRight: 10,
                                                        }}>
                                                            <Image source={require('../../../../assets/location.png')} style={{
                                                                borderTopRightRadius: 20,
                                                                borderTopLeftRadius: 20,
                                                            }} />
                                                        </View>
                                                        <View style={{
                                                            // width: width / 1.2
                                                            width: '90%',
                                                            // backgroundColor:COLORS.main
                                                        }}>
                                                            <Text style={{
                                                                color: COLORS.black,
                                                                fontSize: 12
                                                            }}>{item?.location}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <TouchableOpacity
                                                            onPress={() => GetCode(item)}
                                                            style={{
                                                                padding: 5,
                                                                paddingHorizontal: 10,
                                                                backgroundColor: COLORS.main,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: 5,
                                                            }}>
                                                            <Text style={{ fontSize: 12, color: COLORS.black }}>Get Code </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>

                                        ))}
                                    </>
                                    :
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>No Events</Text>
                                        <Text style={{ color: COLORS.black, fontSize: 12, }}>Currently we do not have any events.</Text>
                                    </View>
                                }
                            </View>

                        </ScrollView>
                    </View>
                    :
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size="large" color={COLORS.main} animating={tempLoading} />
                    </View>
                }



                <Modal
                    animationType="slide"
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
                        opacity: 0.9
                    }}>
                        <View style={{
                            alignSelf: 'center',
                            // margin: 20,
                            width: '95%',
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            paddingHorizontal: 20,
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
                            <View>
                                <Text style={{
                                    marginTop: 20,
                                    marginVertical: 10,
                                    color: COLORS.dark,
                                    // fontWeight: 'bold'
                                    // textAlign: 'center',
                                }}>Your event promotion code is</Text>
                            </View>
                            <View style={{
                                // backgroundColor: COLORS.main,
                                // width: '50%'
                            }}>
                                <Text style={{
                                    paddingTop: 10,
                                    paddingBottom: 20,
                                    // textAlign: 'center',
                                    color: COLORS.gray,
                                    fontWeight: 'bold',
                                    color: COLORS.black,
                                    fontSize: 16
                                }}>
                                    {autoCode}
                                </Text>
                            </View>
                            <View style={{
                                // flex:1,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }}>
                                <TouchableOpacity
                                    onPress={() => GenCode()}
                                    style={{
                                        backgroundColor: COLORS.light,
                                        elevation: 5,
                                        width: '48%',
                                        // borderWidth: 1,
                                        // borderColor: COLORS.gray2,
                                        borderRadius: 10,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={{
                                        color: COLORS.black,
                                    }}>
                                        Change Code
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => CopyLink(autoCode)}
                                    style={{
                                        width: '48%',
                                        backgroundColor: COLORS.main,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: COLORS.main,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={{
                                        color: COLORS.black,
                                    }}>
                                        Copy Link
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => shareCode(autoCode)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // width: '48%',
                                    // backgroundColor: COLORS.main,
                                    borderRadius: 10,
                                    // borderWidth: 1,
                                    // borderColor: COLORS.main,
                                    paddingVertical: 20,
                                    justifyContent: 'center',
                                }}>
                                <Share2 width={20} height={20} />
                                <Text style={{
                                    color: COLORS.bluedark,
                                    paddingLeft: 5
                                }}>
                                    Share
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default EventScreen

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        height: height,
        // backgroundColor:COLORS.gray
    },
    NumberInput: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: 45,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4
    },
})