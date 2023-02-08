import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../consts/Colors';
import { useSelector } from 'react-redux';
import { selectEvents } from '../../../redux/reducers/Reducers';


const EventItems = ({ navigation, data, btn, width, onpress }) => {
    const events = useSelector(selectEvents);
    console.log(events);
    const onEventDeatilsScreen = (item) => {
        // console.log('eventdeatils', item);
        navigation.navigate('EventDetails', { details : item })
    }
    return (
        <>
            {events?.map((item, index) => (
                // console.log(item.image1),
                <TouchableOpacity key={index}
                    onPress={() => onEventDeatilsScreen({ item })}
                    // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: COLORS.white,
                        elevation: 5,
                        borderColor: COLORS.light,
                        borderRadius: 20,
                        borderWidth: 1,
                        marginLeft: 20,
                        marginVertical: 20,
                    }}>
                    <View>
                        <Image source={{ uri: item.image1 }} resizeMode='cover'
                            style={{
                                width: width,
                                height: 200,
                                borderRadius: 10,
                            }} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                    }}>
                        <View>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                            }}>{item.Title}</Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>${item.Startprice}</Text>
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
                        }}>
                            <View style={{
                                marginRight: 10,
                            }}>
                                <Image source={require('../../assets/location.png')} style={{
                                    borderTopRightRadius: 20,
                                    borderTopLeftRadius: 20,
                                }} />
                            </View>
                            <View>
                                <Text style={{
                                    color: COLORS.black,
                                }}>{item.Location}</Text>
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
                </TouchableOpacity>
            ))}
        </>
    )
}

export default EventItems

const styles = StyleSheet.create({})