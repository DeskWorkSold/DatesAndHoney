import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const Eventdata = [
    {
        id: '1',
        title: 'Grand Party at salvik',
        location: 'South Karolina, New City',
        price: '155',
        image: require('../../../assets/event1.png')
    },
    {
        id: '2',
        title: 'Grand Party at khi',
        location: 'Karachi, New City',
        price: '255',
        image: require('../../../assets/event1.png')
    }
];

const MediatorDashboardScreen = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [Date, setDate] = useState('');

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={{
                    alignItems: 'center',
                    paddingTop: 20
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: COLORS.black,
                    }}>Added Events</Text>
                </View>
                <ScrollView vertical showsVerticalScrollIndicator={false}
                    style={{
                        paddingHorizontal: 20,
                        width: '100%',
                        paddingTop:20
                    }}
                >
                    <View>
                        {Eventdata?.map((item, index) => (
                            <TouchableOpacity key={index}
                                // onPress={() => onEventDeatilsScreen({ item })}
                                // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                                activeOpacity={0.7}
                                style={{
                                    width: '100%',
                                    backgroundColor: COLORS.white,
                                    elevation: 5,
                                    borderColor: COLORS.light,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    // marginLeft: 20,
                                    marginBottom: 20,
                                }}>
                                <View>
                                    <Image source={item.image} resizeMode='cover'
                                        style={{
                                            width: '100%',
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
                                        }}>{item.title}</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontSize: 16,
                                            color: COLORS.black,
                                            fontWeight: 'bold'
                                        }}>${item.price}</Text>
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
                                            <Image source={require('../../../assets/location.png')} style={{
                                                borderTopRightRadius: 20,
                                                borderTopLeftRadius: 20,
                                            }} />
                                        </View>
                                        <View>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize:12
                                            }}>{item.location}</Text>
                                        </View>
                                    </View>
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
                                            <Text style={{ fontSize: 12, }}>Detail</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default MediatorDashboardScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
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