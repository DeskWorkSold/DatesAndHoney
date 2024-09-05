import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../consts/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents, events, selectUser } from '../../../redux/reducers/Reducers';
import CustomeButton from './CustomeButton';
import FastImage from 'react-native-fast-image';
const { height, width } = Dimensions.get('window');

const EventItems = ({ navigation, data, btn, widths, onpress }) => {
    // data[0].selection1 = 6;
    const user = useSelector(selectUser)


    // console.log('==>', data);


    const selectEventsss = useSelector(selectEvents);
    const dispatch = useDispatch();
    // console.log('==>ok', data);
    const onEventDeatilsScreen = (item) => {
        var data = new Object
        data.TicketModaldata = item.item.TicketModaldata;
        data.Title = item.item.Title;
        data.description = item.item.description;
        data.endDate = item.item.endDate;
        data.endTime = item.item.endTime;
        data.fifthimageUrl = item.item.fifthimageUrl;
        data.fourthimageUrl = item.item.fourthimageUrl;
        data.image1 = item.item.image1;
        data.location = item.item.location;
        data.ownerName = item.item.ownerName;
        data.owneremail = item.item.owneremail;
        data.owneruid = item.item.owneruid;
        data.secimageUrl = item.item.secimageUrl;
        data.sixthimageUrl = item.item.sixthimageUrl;
        data.startDate = item.item.startDate;
        data.startTime = item.item.startTime;
        data.thirdimageUrl = item.item.thirdimageUrl;
        data.totalTicketPrice = item.item.totalTicketPrice;
        data.promoterReward = item.item.promoterReward;
        data.discountedReferral = item.item.discountedReferral;
        data.uid = item.item.uid;

        // console.log('eventdeatils', data);

        navigation.navigate('EventDetails', { details: data })
        dispatch(events(data))
    }
    return (
        <>
            {data?.map((item, index) => (
                console.log(item.location?.latitude),
                <TouchableOpacity key={index}
                    onPress={() => user?.SelectionOne < 5 && index !== 0 ? console.log('test') : onEventDeatilsScreen({ item })}
                    // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: COLORS.white,
                        elevation: 5,
                        borderColor: COLORS.light,
                        borderRadius: 10,
                        // borderWidth: 1,
                        marginLeft: 20,
                        marginRight: 5,
                        marginVertical: 20,
                        width: widths,
                        alignSelf: 'center'
                    }}>
                    {user?.SelectionOne < 5 && index !== 0 &&
                        <View style={{
                            position: 'absolute',
                            zIndex: 1,
                            alignSelf: 'center',
                            top: '40%',
                            paddingHorizontal: 20,
                        }}>
                            <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 10 }}>To unlock more events please answering a few more questions, </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SelectionOne')}
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    backgroundColor: COLORS.main,
                                    borderColor: COLORS.main,
                                    width: width / 4,
                                    borderRadius: 5,
                                    alignSelf: 'center',
                                    marginTop: 5,
                                }}>
                                <Text style={{ fontSize: 12, color: COLORS.black }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{
                        opacity: user?.SelectionOne < 5 && index !== 0 ? 0.1 : 1
                    }}>
                        <View>
                            <FastImage
                                style={{
                                    width: widths,
                                    height: 200,
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                }}
                                source={{
                                    uri: item.image1,
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            {/* <Image source={{ uri: item.image1 }} resizeMode='cover'
                                style={{
                                    width: widths,
                                    height: 200,
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                }} /> */}
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
                                width: width / 1.7,
                                // backgroundColor:COLORS.gray
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    color: COLORS.black,
                                    marginRight: 10,
                                    fontWeight: 'bold'
                                }}>{item.Title}</Text>
                            </View>
                            <View style={{
                                // flex: 1,
                                alignItems: 'flex-end',
                                // width: widths / 0.5,
                                // alignItems: 'flex-end',
                                // justifyContent:'center',
                                // backgroundColor:COLORS.gray
                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    color: COLORS.black,
                                    fontWeight: 'bold'
                                }}>${item.totalTicketPrice}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            paddingBottom: 10,
                            justifyContent: 'space-between',
                            width: widths
                        }}>
                            <View style={{
                                // flex:1,
                                flexDirection: 'row',
                                width: '80%',
                                // backgroundColor:COLORS.gray
                            }}>
                                <View style={{
                                    marginRight: 5,
                                }}>
                                    <Image source={require('../../assets/location.png')} resizeMode='contain' style={{
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                                <View style={{
                                    // backgroundColor:COLORS.gray
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 12
                                    }}>{item?.location ? item?.location : 'Location not confirm'}</Text>
                                </View>
                            </View>
                            {btn &&
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <TouchableOpacity style={{
                                        padding: 5,
                                        paddingHorizontal: 10,
                                        backgroundColor: COLORS.main,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20,
                                    }}>
                                        <Text style={{ fontSize: 12, }}>{btn}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>

                </TouchableOpacity>
            ))}
        </>
    )
}

export default EventItems

const styles = StyleSheet.create({})