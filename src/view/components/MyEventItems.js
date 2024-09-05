import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../consts/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents, events } from '../../../redux/reducers/Reducers';
import { useState } from 'react';
import HeaderTabOne from './HeaderTabOne';
import CustomeButton from './CustomeButton';
import moment from 'moment';
const { width, height } = Dimensions.get("window");

const MyEventItems = ({ navigation, data, btn, widths, onpress }) => {
    const selectEventsss = useSelector(selectEvents);
    const [eventDetails, setEventDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    // console.log('==>ok', data);
    const onEventDeatilsScreen = (item) => {
        console.log(item);
        // var data = new Object
        // data.TicketModaldata = item.item.TicketModaldata;
        // data.Title = item.item.Title;
        // data.description = item.item.description;
        // data.endDate = item.item.endDate;
        // data.endTime = item.item.endTime;
        // data.fifthimageUrl = item.item.fifthimageUrl;
        // data.fourthimageUrl = item.item.fourthimageUrl;
        // data.image1 = item.item.image1;
        // data.location = item.item.location;
        // data.ownerName = item.item.ownerName;
        // data.owneremail = item.item.owneremail;
        // data.owneruid = item.item.owneruid;
        // data.secimageUrl = item.item.secimageUrl;
        // data.sixthimageUrl = item.item.sixthimageUrl;
        // data.startDate = item.item.startDate;
        // data.startTime = item.item.startTime;
        // data.thirdimageUrl = item.item.thirdimageUrl;
        // data.totalTicketPrice = item.item.totalTicketPrice;
        // data.uid = item.item.uid;

        // console.log('eventdeatils', data);
        setEventDetails(item)
        setShowModal(true)
        // navigation.navigate('EventDetails', { details: data })
        // dispatch(events(data))
    }
    return (
        <View>
            {data?.map((item, index) => (
                console.log(item?.image1),
                <TouchableOpacity key={index}
                    // onPress={() => onEventDeatilsScreen({ item })}
                    // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: COLORS.white,
                        elevation: 5,
                        borderColor: COLORS.light,
                        borderRadius: 10,
                        // borderWidth: 1,
                        // marginLeft: 20,
                        // marginRight: 5,
                        marginHorizontal:10,
                        marginVertical: 10,
                        width: widths,
                        alignSelf: 'center'
                    }}>
                    <View>
                        <Image source={{ uri: item.image1 }} resizeMode='cover'
                            style={{
                                width: widths,
                                height: 200,
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10,
                            }} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                        flex: 1,
                        width: widths
                    }}>
                        <View style={{
                            // flex: 2
                            width: width / 1.6,
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
                            // width: widths / 0.5,
                            alignItems: 'flex-end',
                            // justifyContent:'center',
                            // backgroundColor:COLORS.gray
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>{item.totalTicketPrice}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        paddingBottom: 10,
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: width / 1.6,
                            // backgroundColor: COLORS.main,
                            alignItems: 'center',
                        }}>
                            <View style={{
                                // width: '10%'
                                paddingRight: 3,
                            }}>
                                <Image source={require('../../assets/location.png')} style={{
                                    borderTopRightRadius: 20,
                                    borderTopLeftRadius: 20,
                                }} />
                            </View>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12
                            }}>{item?.location}</Text>
                        </View>
                        <View style={{
                            width: '20%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => onEventDeatilsScreen(item)}
                                style={{
                                    padding: 5,
                                    paddingHorizontal: 10,
                                    backgroundColor: COLORS.main,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                }}>
                                <Text style={{ fontSize: 12, color: COLORS.black }}>{btn}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}



            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: COLORS.white
                }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: COLORS.white,
                        height: 70,
                    }}>
                        <View style={{
                            flex: 1, alignItems: "flex-start", paddingHorizontal: 5,
                            // backgroundColor: COLORS.gray,
                        }}>
                        </View>

                        <View style={{ flex: 2, alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: COLORS.black,
                                fontFamily: 'Roboto-Medium'
                            }}>
                                Events Detail
                            </Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }}>
                        </View>
                    </View>

                    <ScrollView vertical showsVerticalScrollIndicator={false} >
                    <View style={{
                        height: '100%',
                        // backgroundColor: COLORS.main
                    }}>
                            <View style={{
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingHorizontal: 20,
                            }}>
                                <Image source={{ uri: eventDetails?.image1 }} resizeMode='cover'
                                    style={{
                                        width: '100%',
                                        height: 200,
                                        borderRadius: 10,
                                        // marginRight: 10,
                                    }} />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                paddingTop: 10,
                                paddingBottom: 5,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: width
                            }}>
                                <View style={{
                                    width: width / 1.5,
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.black,
                                        fontWeight: 'bold'
                                    }}>{eventDetails?.Title}</Text>
                                </View>
                                <View style={{
                                    alignItems: 'flex-end'
                                }}>
                                    <Text style={{
                                        fontSize: 10,
                                        color: COLORS.black
                                    }}>Starting from</Text>
                                    <Text style={{
                                        fontSize: 13,
                                        color: COLORS.black,
                                        fontWeight: 'bold'
                                    }}>${eventDetails?.totalTicketPrice}</Text>
                                </View>
                            </View>


                            <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        justifyContent: 'center'
                                    }}>
                                        <Image source={require('../../assets/location.png')} style={{
                                            borderTopRightRadius: 15,
                                            borderTopLeftRadius: 15,
                                            marginRight: 5
                                        }} />
                                    </View>
                                    <View style={{
                                        width: width / 1.7,
                                        // backgroundColor:COLORS.gray
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: COLORS.black,
                                        }}>{eventDetails?.location}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
                                }}>
                                    <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                                        marginRight: 5,
                                        width: 15,
                                        height: 15,
                                        tintColor: COLORS.black
                                    }} />
                                    <Text style={{
                                        fontSize: 10,
                                        color: COLORS.black,
                                    }}>
                                        {moment(eventDetails?.startDate, 'DD/MM/YYYY').format('D MMMM,YYYY')}
                                    </Text>
                                </View>
                            </View>

                            <View style={{
                                paddingHorizontal: 20,
                                paddingTop: 10,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontSize:13
                                }}>Description</Text>
                            </View>
                            <View style={{
                                paddingHorizontal: 20,
                                // paddingTop:10,
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                }}>{eventDetails?.description}</Text>
                            </View>

                            <View style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontSize:13
                                }}>Picture</Text>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingHorizontal: 20,
                                }}>
                                    <Image source={{ uri: eventDetails?.image1 }} resizeMode='cover' style={{
                                        width: 150,
                                        height: 80,
                                        borderRadius: 10,
                                        marginRight: 10,
                                    }} />
                                    {eventDetails?.secimageUrl &&
                                        <Image source={{ uri: eventDetails?.secimageUrl }} resizeMode='cover' style={{
                                            width: 150,
                                            height: 80,
                                            borderRadius: 10,
                                            marginRight: 10,
                                        }} />
                                    }
                                    {eventDetails?.thirdimageUrl &&
                                        <Image source={{ uri: eventDetails?.thirdimageUrl }} resizeMode='cover' style={{
                                            width: 150,
                                            height: 80,
                                            borderRadius: 10,
                                            marginRight: 10,
                                        }} />
                                    }
                                    {eventDetails?.fourthimageUrl &&
                                        <Image source={{ uri: eventDetails?.fourthimageUrl }} resizeMode='cover' style={{
                                            width: 150,
                                            height: 80,
                                            borderRadius: 10,
                                            marginRight: 10,
                                        }} />
                                    }
                                    {eventDetails?.fifthimageUrl &&
                                        <Image source={{ uri: eventDetails?.fifthimageUrl }} resizeMode='cover' style={{
                                            width: 150,
                                            height: 80,
                                            borderRadius: 10,
                                            marginRight: 10,
                                        }} />
                                    }
                                </View>
                            </ScrollView>
                            <View style={{
                                marginVertical: 20,
                                alignSelf: 'center'
                            }}>
                                <CustomeButton width={width / 1.1} title={'Go Back'} bcolor={COLORS.main} onpress={() => setShowModal(false)} />
                            </View>
                    </View>
                        </ScrollView>
                </View>
            </Modal>
        </View>
    )
}

export default MyEventItems

const styles = StyleSheet.create({})