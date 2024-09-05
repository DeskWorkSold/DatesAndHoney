import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import COLORS from '../../consts/Colors';
import { useSelector } from 'react-redux';
import { selectEvents } from '../../../redux/reducers/Reducers';
import moment from 'moment';



const EventsCategory = ({ navigation, data, value, setValue, filterdata, setfilterdata }) => {
    const events = useSelector(selectEvents);
    // console.log('ok', filterdata);


    const ShowCategory = (index) => {
        const showCategory = data[index].name
        // console.log(showCategory);
        // return
        const today = new Date()
        setValue(index)
        if (showCategory) {
            const test = [];
            if (showCategory == 'New Events') {
                const newData = filterdata?.filter((item) => {
                    const momentDate = moment(item?.startDate, 'DD/MM/YYYY');
                    const eventDate = momentDate.toDate().toDateString();
                    if (eventDate > today?.toDateString()) {
                        test.push(item);
                    }
                });
            }
            else if (showCategory == 'Todays Event') {
                const newData = filterdata?.filter((item) => {
                    const momentDate = moment(item?.startDate, 'DD/MM/YYYY');
                    const eventDate = momentDate.toDate().toDateString();
                    // console.log(item?.uid, eventDate, today?.toDateString());
                    if (eventDate == today?.toDateString()) {
                        test.push(item);
                    }
                });
            }
            else if (showCategory == 'Last Events') {
                const newData = filterdata?.filter((item) => {
                    const momentDate = moment(item?.startDate, 'DD/MM/YYYY');
                    const eventDate = momentDate.toDate().toDateString();
                    console.log(item?.uid, eventDate, today?.toDateString());
                    if (eventDate < today?.toDateString()) {
                        test.push(item);
                    }
                })
            }
            setfilterdata(test)
        } else {
        }
    }

    // const filterMenu = (id) => {
    //     console.log(id);
    //     if (id) {
    //         const test = [];
    //         const newData = foods.filter((item) => {
    //             if (item.categoryid == id) {
    //                 console.log(item);
    //                 test.push(item);
    //             }
    //         });
    //         setFoodsTemp(test)
    //     } else {
    //         setFoodsTemp(foods)
    //     }
    // }
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
                                <Text style={{ color: COLORS.black, fontSize: 14, }}>{item.name}</Text>
                            </View>
                            <View style={{ width: '20%', justifyContent: 'center' }}>
                                {value == index ?
                                    <Image source={require('../../assets/cross.png')} style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: COLORS.black
                                    }} />
                                    :
                                    <Image source={require('../../assets/add2.png')} style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: COLORS.black
                                    }} />
                                }
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