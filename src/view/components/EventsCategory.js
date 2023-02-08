import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import COLORS from '../../consts/Colors';
import { useSelector } from 'react-redux';
import { selectEvents } from '../../../redux/reducers/Reducers';




const EventsCategory = ({ navigation, data, value, setValue }) => {
    const events = useSelector(selectEvents);
    const ShowCategory = (index) => {
        const showCategory = data[index].name
        setValue(index)
    }
    return (
        <>
            {data?.map((item, index) => (
                <View
                    key={index}
                    style={{
                        paddingLeft: 20,
                    }}>
                    <TouchableOpacity
                        onPress={() => ShowCategory(index)}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: 150,
                            marginVertical: 5,
                            backgroundColor: value == index ? COLORS.main : COLORS.light,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            paddingVertical: 10
                            // justifyContent: 'space-between',
                        }}>
                            <View style={{ width: '80%', alignItems: 'center' }}>
                                <Text style={{ color: COLORS.black }}>{item.name}</Text>
                            </View>
                            <View style={{ width: '20%', justifyContent: 'center' }}>
                                <Image source={require('../../assets/cross.png')} style={{
                                    width: 10,
                                    height: 10,
                                    tintColor: COLORS.black
                                }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </>
    )
}

export default EventsCategory

const styles = StyleSheet.create({})