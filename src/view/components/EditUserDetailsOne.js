import { Image, StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, ToastAndroid, Dimensions, Modal } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import SVGSelect from '../../assets/tik.svg';
import COLORS from '../../consts/Colors';
import CustomeButton from './CustomeButton';
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Slider from '@react-native-community/slider';
const { width, height } = Dimensions.get('window');
import SVGInfo from '../../assets/info.svg';



const EditUserDetailsOne = ({ navigation, filter, type, title, image, data1, data2, setModal, Modal, setValue, value, setValueTwo, valueTwo, setValueThree, valueThree, setValueIndex, valueIndex, setData2 }) => {

    const [editData1, setEditData1] = useState(data1);
    const [editData2, setEditData2] = useState(data2);
    const [datePicker, setDatePicker] = useState(false);
    const [customDate, setCustomDate] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState(null);

    const onUpdateRelationship = (item) => {
        const isSelected = value.some(i => i?.name === item?.name);

        if (isSelected) {
            // Item is already in the array, so remove it
            const newSelectedItems = value.filter(i => i?.name !== item?.name);
            setValue(newSelectedItems);

        }
        else {
            // Item is not in the array, so add it
            const newSelectedItems = [...value, item];
            setValue(newSelectedItems);
        }
    }
    const updateSubRelationship = (item2, item) => {
        const isExist = value.some(i => i?.name == item?.name);

        if (isExist) {
            const newSelectedCategoryIndex = value.map(i => {
                if (i?.name === item?.name) {
                    return {
                        ...i,
                        subOptions: item2
                    };
                }
                return i;
            });

            // Update the state with the new array
            setValue(newSelectedCategoryIndex);
        }
    }
    const SearchFunc = (e) => {
        if (e) {
            const newData = data1.length > 0 && data1.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = e.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData2(newData)
            setSearch(e)
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setData2(data1)
            setSearch(e);
        }
    }
    const onSelectCategory = (props) => {
        if (setValue) {
            if (value?.includes(props?.name)) {
                setValue((prevValue) => prevValue.filter((item) => item !== props?.name));
            } else {
                setValue([...value, props?.name]);
            }
        }
        setIsVisible(false);
    }

    const onPress = (item) => {
        if (type == 'array') {
            handleSelection(item)
        }
        else {
            setValue(item?.name)
        }
    }
    const handleSelection = (item) => {
        // console.log(data1?.includes(item));
        // return
        if (value?.includes(item?.name)) {
            // Item is already in the array, so remove it
            const newSelectedItems = value?.filter((i) => i !== item?.name);
            setValue(newSelectedItems);
        }
        else {
            // console.log('hello' , value);
            // return
            // Item is not in the array, so add it
            const newSelectedItems = [...value ?? [], item?.name];
            setValue(newSelectedItems);
        }
    };

    const showDatePicker = () => {
        // console.log('test');
        setDatePicker(true);
    };
    const hideDatePicker = () => {
        setDatePicker(false);
    };
    const handleConfirmDate = date => {
        // const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        const date2 = moment(date).format('yy/MM/DD')
        // console.log(date2);
        // return
        setCustomDate(date)
        if (date2) {
            const years = new Date().getFullYear() - new Date(date).getFullYear();
            // console.log(years);
            if (years < 18 || !date2) {
                if (years < 18) {
                    ToastAndroid.show("Your age you must have to be 18+!", ToastAndroid.SHORT);
                }
                else if (!date2) {
                    ToastAndroid.show("Input Date is not in the correct format.!", ToastAndroid.SHORT);
                }
            }
            else {
                setValue(date2);
                hideDatePicker();
            }
        }
        else {
            ToastAndroid.show("Network error please try again!", ToastAndroid.SHORT);
        }
    };
    const OnHeightChange = (value) => {
        const convertedValue = value * 15.0;
        // var feet = Math.floor(realFeet);
        // console.log(convertedValue.toFixed(1));
        // const convert = Math.floor(value * 15)
        setValue(convertedValue.toFixed(1))
    }



    const searchFilterType = (text) => {
        if (text) {
            const newData = data1?.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setEditData1(newData);
            setValueTwo(text);
        } else {
            setEditData1(data1);
            setValueTwo(text);
        }
    };
    const searchFilterPosition = (text) => {
        if (text) {
            const newData = data2?.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setEditData2(newData);
            setValueThree(text);
        } else {
            setEditData2(data1);
            setValueThree(text);
        }
    };


    const renderDropdown = () => {
        return (
            <View style={{
                paddingHorizontal: 20
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View>
                        <View style={{
                            paddingTop: 20,
                            // flexDirection:'row'
                            // alignItems: 'center',
                        }}>
                            <Text style={{
                                color: COLORS.black
                            }}>
                                Please explain
                            </Text>
                            <Text style={{
                                color: COLORS.black
                            }}>
                                (Your Mother, your mothers, etc.)
                            </Text>
                        </View>

                        <View style={{
                            paddingTop: 20,
                        }}>
                            <TextInput
                                value={valueTwo}
                                onChangeText={valueTwo => setValueTwo(valueTwo)
                                }
                                // onChangeText=()
                                placeholderTextColor={COLORS.gray}
                                placeholder='Type Here!'
                                multiline
                                numberOfLines={8}
                                style={styles.TextInput} />
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: COLORS.white
        }}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                    }}>
                        <TouchableOpacity
                            onPress={() => setModal(false)}
                            style={{
                                flex: 1,
                                // backgroundColor: COLORS.gray2
                            }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{
                            flex: 2,
                            // backgroundColor: COLORS.gray,
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: 20
                        }}>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: COLORS.gray2
                        }}>
                        </View>
                    </View>
                    {image &&
                        <View style={{
                            alignItems: 'center',
                        }}>
                            {image}
                        </View>
                    }
                    <View style={{
                        alignItems: 'center',
                        marginTop: 20,
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: COLORS.black
                        }}>{title}</Text>
                    </View>
                    <View>
                        {filter == 'FavFood' ?
                            <View style={{
                                marginTop: 20,
                                paddingHorizontal: 20
                            }}>
                                {data1?.map((item, index) => (
                                    <View
                                        key={index}
                                        activeOpacity={0.8}
                                        // onPress={() => setValue(index)}
                                        onPress={() => onPress(item)}
                                        // style={styles.button}
                                        style={styles.itemContainer}
                                    >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={{
                                                backgroundColor: value?.includes(item?.name) ? COLORS.main : COLORS.transparent,
                                                borderWidth: value?.includes(item?.name) ? 0 : 1,
                                                borderColor: value?.includes(item?.name) ? COLORS.main : COLORS.gray,
                                                borderRadius: 10,
                                                paddingHorizontal: 15,
                                                paddingVertical: 5,
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}
                                            onPress={() => onPress(item)}
                                        >
                                            <View style={{
                                                flexDirection: 'row',
                                                paddingHorizontal: 5
                                            }}>
                                                <Text style={{ color: COLORS.black }}>
                                                    {item?.name}
                                                </Text>
                                            </View>
                                            {value?.includes(item?.name) ? (
                                                <TouchableOpacity onPress={() => handleRemoval(item?.name)}>
                                                    <Image source={require('../../assets/cancle.png')} resizeMode='contain' style={{
                                                        color: COLORS.black,
                                                        width: 10,
                                                        height: 10
                                                    }} />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={() => handleRemoval(item?.name)}>
                                                    <Image source={require('../../assets/add2.png')} resizeMode='contain' style={{
                                                        color: COLORS.black,
                                                        width: 10,
                                                        height: 10
                                                    }} />
                                                </TouchableOpacity>
                                            )
                                            }
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            :
                            filter == 'clingy' ?
                                <View style={{
                                    alignItems: 'center',
                                }}>
                                    {data1.map((item, index) => (
                                        <View key={index} >
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => onPress(item)}>
                                                <View style={{
                                                    // backgroundColor: value == index ? COLORS.main : COLORS.transparent,
                                                    ...styles.NumberInput2,
                                                }}>
                                                    <View style={{ width: '90%' }}>
                                                        <Text style={{ color: COLORS.black }}>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        alignItems: 'flex-end',
                                                    }}>
                                                        {type == 'array' ?
                                                            <>
                                                                {value.includes(item?.name) ? (
                                                                    <SVGSelect width={20} height={20} />
                                                                ) : (<View></View>
                                                                )}
                                                            </>
                                                            :
                                                            <>
                                                                {value == item.name ? (
                                                                    <SVGSelect width={20} height={20} />
                                                                ) : (null
                                                                )}
                                                            </>
                                                        }
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))}

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ color: COLORS.black }}> Other </Text>
                                            <View style={styles.ClingyInput2}>
                                                <TextInput
                                                    value={value}
                                                    placeholder={'Write here'}
                                                    placeholderTextColor={COLORS.gray}
                                                    onChangeText={clingy => setValue(clingy)
                                                    }
                                                    style={styles.ClingyTextInput}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
                                        <Text style={{ color: COLORS.green }}>Attention!</Text>
                                        <View style={{ paddingTop: 10, paddingRight: 50 }}>
                                            <Text style={{ color: COLORS.gray }}>Being clingy is not a Bad thing it's
                                                preference Some couples Love it
                                                Some hate it. we Only use it for
                                                Preference in concierge service
                                                responses are Not public!</Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                filter == 'InstaUsername' ?
                                    <View style={styles.InstaUsername}>
                                        <TextInput
                                            value={value}
                                            placeholder={'Enter your username'}
                                            placeholderTextColor={COLORS.gray}
                                            onChangeText={value => setValue(value)}
                                            underlineColor={COLORS.white}
                                            activeUnderlineColor={COLORS.transparent}
                                            style={styles.TextInputInstaUsername}
                                        />
                                    </View>
                                    :
                                    filter == 'InFiveYear' ?
                                        <View style={{
                                            paddingTop: 20,
                                            marginHorizontal: 20
                                            // alignItems: 'center'
                                        }}>
                                            <TextInput
                                                placeholder='Type Here!'
                                                placeholderTextColor={COLORS.gray}
                                                multiline
                                                value={value}
                                                onChangeText={value => setValue(value)}
                                                numberOfLines={8}
                                                style={styles.TextInputDeals} />
                                            <View style={{
                                                flexDirection: 'row',
                                                paddingHorizontal: 0,
                                                marginVertical: 10,
                                                justifyContent: 'center'
                                            }}>
                                                <SVGInfo width={20} height={20} />
                                                <Text style={{
                                                    width: '90%',
                                                    paddingLeft: 10,
                                                    fontSize: 12,
                                                    color: COLORS.gray
                                                }}>
                                                    Your response is not public. We recommend mentioning filling it out. This is only for your match coordinator to help you with better matches. Additional benefits: You will also be shown to our diamond members.

                                                </Text>
                                            </View>
                                        </View>
                                        :
                                        filter == 'DealBreaker' ?
                                            <View style={{
                                                paddingTop: 20,
                                                marginHorizontal: 20
                                                // alignItems: 'center'
                                            }}>
                                                <TextInput
                                                    placeholder='Type Here!'
                                                    multiline
                                                    value={value}
                                                    placeholderTextColor={COLORS.gray}
                                                    onChangeText={value => setValue(value)}
                                                    numberOfLines={8}
                                                    style={styles.TextInputDeals} />
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingHorizontal: 0,
                                                    marginVertical: 10,
                                                    justifyContent: 'center'
                                                }}>
                                                    <SVGInfo width={20} height={20} />
                                                    <Text style={{
                                                        width: '90%',
                                                        paddingLeft: 10,
                                                        fontSize: 12,
                                                        color: COLORS.gray
                                                    }}>
                                                        Your response is private. We recommend mentioning three of your major deal makers and breakers. This is only for your match coordinator to help you with better matches. Additional benefits: You will also be shown to our diamond members.
                                                    </Text>
                                                </View>
                                            </View>
                                            :
                                            filter == 'DealMakers' ?
                                                <View style={{
                                                    paddingTop: 20,
                                                    // alignItems: 'center'
                                                    marginHorizontal: 20
                                                }}>
                                                    <TextInput
                                                        placeholder='Type Here!'
                                                        multiline
                                                        numberOfLines={8}
                                                        value={value}
                                                        placeholderTextColor={COLORS.gray}
                                                        onChangeText={value => setValue(value)}
                                                        style={styles.TextInputDeals} />
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        paddingHorizontal: 0,
                                                        marginVertical: 10,
                                                        justifyContent: 'center'
                                                    }}>
                                                        <SVGInfo width={20} height={20} />
                                                        <Text style={{
                                                            width: '90%',
                                                            paddingLeft: 10,
                                                            fontSize: 12,
                                                            color: COLORS.gray
                                                        }}>
                                                            Your response is private. We recommend mentioning three of your major deal makers and breakers. This is only for your match coordinator to help you with better matches. Additional benefits: You will also be shown to our diamond members.
                                                        </Text>
                                                    </View>
                                                </View>
                                                :
                                                filter == 'Company' ?
                                                    <View>
                                                        <View style={{
                                                            alignItems: 'center',
                                                        }}>
                                                            <View style={[styles.CompanynameInput, { marginTop: -0, }]}>
                                                                <TextInput
                                                                    value={value}
                                                                    placeholder={'Company name or type'}
                                                                    placeholderTextColor={COLORS.gray
                                                                    }
                                                                    // error={inputfirstName}
                                                                    onChangeText={value => setValue(value)
                                                                    }
                                                                    style={styles.Companyname}
                                                                />
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            paddingHorizontal: 20
                                                        }}>
                                                            <View style={styles.CompanynameInput}>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                                    <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                                                                        marginRight: 5,
                                                                        width: 20,
                                                                        height: 20
                                                                    }} />
                                                                    <TextInput
                                                                        value={valueTwo}
                                                                        placeholder={'Type of Company'}
                                                                        placeholderTextColor={COLORS.gray}
                                                                        onChangeText={valueTwo => searchFilterType(valueTwo)
                                                                        }
                                                                        style={styles.Companyname}
                                                                    />
                                                                </View>
                                                            </View>
                                                            <View>
                                                                <View>
                                                                    {editData1.map((TypeTestimonial, index) => (
                                                                        <TouchableOpacity
                                                                            key={index}
                                                                            activeOpacity={0.8}
                                                                            onPress={() => setValueTwo(TypeTestimonial.name)}
                                                                            style={styles.button}>
                                                                            <View style={{
                                                                                backgroundColor: valueTwo == TypeTestimonial.name ? COLORS.main : COLORS.transparent,
                                                                                borderWidth: valueTwo == TypeTestimonial.name ? 0 : 1,
                                                                                borderColor: valueTwo == TypeTestimonial.name ? COLORS.main : COLORS.gray,
                                                                                // ...styles.toggelbtn
                                                                                borderRadius: 10,
                                                                                paddingHorizontal: 10,
                                                                                alignItems: 'center',
                                                                                flexDirection: 'row',
                                                                            }}>
                                                                                <View style={{ paddingLeft: 10 }}>
                                                                                    <Text style={{ color: COLORS.gray }}>{TypeTestimonial.name}</Text>
                                                                                </View>
                                                                                <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                                                                                    {valueTwo == TypeTestimonial.name ? (
                                                                                        <Image source={require('../../assets/cancle.png')} resizeMode='contain' style={{
                                                                                            color: COLORS.black,
                                                                                            width: 10,
                                                                                            height: 10
                                                                                        }} />) : (
                                                                                        <Image source={require('../../assets/add2.png')} resizeMode='contain' />
                                                                                    )}
                                                                                </View>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    ))}

                                                                </View>
                                                            </View>


                                                            <View style={{
                                                                alignItems: 'center',
                                                            }}>
                                                                <View style={styles.CompanynameInput}>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                                        <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                                                                            marginRight: 5,
                                                                            width: 20,
                                                                            height: 20
                                                                        }} />
                                                                        <TextInput
                                                                            value={valueThree}
                                                                            placeholder={'Position in Company'}
                                                                            placeholderTextColor={COLORS.gray}
                                                                            onChangeText={valueThree => searchFilterPosition(valueThree)
                                                                            }
                                                                            style={styles.Companyname}
                                                                        />
                                                                    </View>
                                                                </View>
                                                            </View>

                                                            <View>
                                                                <View>
                                                                    {editData2.map((TypeTestimonial, index) => (
                                                                        <TouchableOpacity
                                                                            key={index}
                                                                            activeOpacity={0.8}
                                                                            onPress={() => setValueThree(TypeTestimonial.name)}
                                                                            style={styles.button}>
                                                                            <View style={{
                                                                                backgroundColor: valueThree == TypeTestimonial.name ? COLORS.main : COLORS.transparent,
                                                                                borderWidth: valueThree == TypeTestimonial.name ? 0 : 1,
                                                                                borderColor: valueThree == TypeTestimonial.name ? COLORS.main : COLORS.gray,
                                                                                // ...styles.toggelbtn
                                                                                borderRadius: 10,
                                                                                paddingHorizontal: 10,
                                                                                alignItems: 'center',
                                                                                flexDirection: 'row',
                                                                            }}>
                                                                                <View style={{ paddingLeft: 10 }}>
                                                                                    <Text style={{ color: COLORS.gray }}>{TypeTestimonial.name}</Text>
                                                                                </View>
                                                                                <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                                                                                    {valueThree == TypeTestimonial.name ? (
                                                                                        <Image source={require('../../assets/cancle.png')} resizeMode='contain' style={{
                                                                                            color: COLORS.black,
                                                                                            width: 10,
                                                                                            height: 10
                                                                                        }} />) : (
                                                                                        <Image source={require('../../assets/add2.png')} resizeMode='contain' />
                                                                                    )}
                                                                                </View>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    ))}

                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    :
                                                    filter == 'Hieght' ?
                                                        <View style={{ paddingTop: 20 }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                paddingHorizontal: 30,
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                            }}>
                                                                <View>
                                                                    <Text style={{ color: COLORS.gray }}>
                                                                        {value} ft
                                                                    </Text>
                                                                </View>
                                                                <View
                                                                    style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                    <Text style={{
                                                                        color: COLORS.gray,
                                                                        fontSize: 14,
                                                                    }}>
                                                                        feets
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                paddingHorizontal: 20,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}>
                                                                <Slider
                                                                    style={{ width: '100%', height: 40, }}
                                                                    minimumValue={0}
                                                                    maximumValue={1}
                                                                    thumbTouchSize={{
                                                                        width: 40, height: 40
                                                                    }}
                                                                    thumbTintColor={COLORS.main}
                                                                    minimumTrackTintColor={COLORS.main}
                                                                    maximumTrackTintColor={COLORS.gray}
                                                                    value={Math.floor(value) / 15}
                                                                    onValueChange={(value) => OnHeightChange(value)}
                                                                />
                                                            </View>
                                                        </View>
                                                        :
                                                        filter == 'Dates' ?
                                                            <View>
                                                                <View style={{
                                                                    paddingTop: 5,
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Text style={{
                                                                        color: COLORS.black,
                                                                        fontSize: 12,
                                                                    }}>Enter the Birthday</Text>
                                                                </View>
                                                                <TouchableOpacity
                                                                    onPress={() => showDatePicker()}
                                                                    style={styles.NumberInputDate}>
                                                                    <Text style={styles.TextInputDate}>
                                                                        {value}
                                                                    </Text>
                                                                </TouchableOpacity>

                                                                <DateTimePickerModal
                                                                    isVisible={datePicker}
                                                                    mode="date"
                                                                    display='spinner'
                                                                    onConfirm={handleConfirmDate}
                                                                    onCancel={hideDatePicker}
                                                                />
                                                            </View>
                                                            :
                                                            filter == 'bio' ?
                                                                <View style={{
                                                                    paddingTop: 20,
                                                                    alignItems: 'center',
                                                                }}>
                                                                    <TextInput
                                                                        placeholder='Type Here!'
                                                                        multiline
                                                                        numberOfLines={8}
                                                                        value={value}
                                                                        placeholderTextColor={COLORS.gray}
                                                                        onChangeText={value => setValue(value)}
                                                                        style={styles.TextInputBio} />
                                                                </View>
                                                                :
                                                                filter == 'languages' ?
                                                                    <View style={{
                                                                        paddingTop: 20,
                                                                        // alignItems: 'center',
                                                                    }}>
                                                                        <View style={
                                                                            {
                                                                                flexDirection: 'row',
                                                                                marginTop: 30,
                                                                                alignItems: 'center',
                                                                                paddingLeft: 10,
                                                                                paddingHorizontal: 10,
                                                                                marginHorizontal: 20,
                                                                                height: 45,
                                                                                // width: 340,
                                                                                backgroundColor: COLORS.light,
                                                                                borderRadius: 5,
                                                                            }
                                                                        }>
                                                                            <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                <View style={{
                                                                                    padding: 0,
                                                                                    backgroundColor: COLORS.transparent,
                                                                                    width: '88%',
                                                                                    color: COLORS.black
                                                                                }}>
                                                                                    <Text style={{
                                                                                        color: value ? COLORS.black : COLORS.gray
                                                                                    }}>
                                                                                        {value?.join(', ') ?? 'Select Language'}
                                                                                    </Text>
                                                                                </View>
                                                                                <AntDesign name={isVisible ? 'up' : 'down'} color={COLORS.black} size={15} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        {isVisible &&
                                                                            <View style={{
                                                                                marginHorizontal: 20,
                                                                                borderWidth: 1,
                                                                                // width:'100%',
                                                                                marginHorizontal: 20,
                                                                                maxHeight: 300,
                                                                                borderColor: COLORS.gray2,
                                                                                borderBottomLeftRadius: 5,
                                                                                borderBottomRightRadius: 5,
                                                                                paddingHorizontal: 10
                                                                            }}>
                                                                                <TextInput
                                                                                    placeholder={"Search"}
                                                                                    value={search}
                                                                                    // disabled={true}
                                                                                    onChangeText={(text) => SearchFunc(text)}
                                                                                    keyboardType="default"
                                                                                    placeholderTextColor={COLORS.gray}
                                                                                    // autoCapitalize="none"    
                                                                                    // autoCompleteType="email"
                                                                                    // error={!isEmailValid}
                                                                                    outlineColor={COLORS.main}
                                                                                    activeOutlineColor={COLORS.main}
                                                                                    style={{
                                                                                        color: COLORS.black,
                                                                                        backgroundColor: COLORS.light,
                                                                                        // height: 35,
                                                                                        marginTop: 5,
                                                                                        fontSize: 12,
                                                                                        borderRadius: 5
                                                                                    }}
                                                                                />
                                                                                <ScrollView showsVerticalScrollIndicator={false}>
                                                                                    {data2.length > 0 && data2?.map((item, i) => (
                                                                                        <TouchableOpacity
                                                                                            key={i}
                                                                                            onPress={() => onSelectCategory(item)}
                                                                                            style={{
                                                                                                // height: 30,
                                                                                                paddingVertical: 10,
                                                                                                borderBottomWidth: 1,
                                                                                                borderColor: COLORS.gray2,
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'space-between',
                                                                                                flexDirection: 'row',
                                                                                                paddingHorizontal: 10,
                                                                                                backgroundColor: value?.includes(item?.name) ? COLORS.mainlight : COLORS.transparent
                                                                                            }}>
                                                                                            <Text style={{
                                                                                                color: COLORS.black,
                                                                                                // backgroundColor: COLORS.yellow,
                                                                                                fontSize: 12,
                                                                                                textAlign: 'left',
                                                                                                alignSelf: 'flex-start'
                                                                                            }}>
                                                                                                {item?.name}
                                                                                            </Text>
                                                                                            <Text style={{
                                                                                                color: COLORS.black,
                                                                                                // backgroundColor: COLORS.yellow,
                                                                                                fontSize: 12,
                                                                                                textAlign: 'left',
                                                                                                alignSelf: 'flex-start'
                                                                                            }}>
                                                                                                {item?.code}
                                                                                            </Text>
                                                                                        </TouchableOpacity>
                                                                                    ))}
                                                                                </ScrollView>

                                                                            </View>
                                                                        }

                                                                    </View>
                                                                    :
                                                                    filter == 'RelationshipType' ?
                                                                        <View style={{
                                                                            paddingTop: 20,
                                                                            // alignItems: 'center',
                                                                        }}>
                                                                            {data1.map((item, index) => (
                                                                                <View key={index} >
                                                                                    <TouchableOpacity
                                                                                        activeOpacity={0.8}
                                                                                        onPress={() => onUpdateRelationship(item)}>
                                                                                        <View style={{
                                                                                            // backgroundColor: value == index ? COLORS.main : COLORS.transparent,
                                                                                            ...styles.NumberInput2,
                                                                                        }}>
                                                                                            <View style={{ width: '90%' }}>
                                                                                                <Text style={{ color: COLORS.black }}>
                                                                                                    {item.name}
                                                                                                </Text>
                                                                                            </View>
                                                                                            <View style={{
                                                                                                alignItems: 'flex-end',
                                                                                            }}>
                                                                                                {type == 'array' ?
                                                                                                    <>
                                                                                                        {value.some(i => i?.name === item?.name) && (
                                                                                                            <SVGSelect width={20} height={20} />
                                                                                                        )}
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                        {value == item.name ? (
                                                                                                            <SVGSelect width={20} height={20} />
                                                                                                        ) : (null
                                                                                                        )}
                                                                                                    </>
                                                                                                }
                                                                                            </View>
                                                                                        </View>
                                                                                    </TouchableOpacity>
                                                                                    {value.some(item => item?.name == item?.name) && !['1', '3', '4', '5', '6', '7', '8'].includes(item.id) && (
                                                                                        <View style={{
                                                                                            backgroundColor: COLORS.white,
                                                                                            marginHorizontal: 20,
                                                                                            // elevation:4,
                                                                                            borderWidth: 1,
                                                                                            borderColor: COLORS.light,
                                                                                            borderBottomLeftRadius: 10,
                                                                                            borderBottomRightRadius: 10,
                                                                                            paddingHorizontal: 20
                                                                                        }}>
                                                                                            {item?.subOptions?.map((item2, i) => (
                                                                                                <TouchableOpacity
                                                                                                    key={i}
                                                                                                    onPress={() => updateSubRelationship(item2, item)}
                                                                                                    style={{
                                                                                                        height: 40,
                                                                                                        justifyContent: 'center',
                                                                                                        alignSelf: 'flex-start',
                                                                                                        // backgroundColor: selectedCategoryIndex?.some(i => i?.name == TypeTestimonial?.name && i?.subOptions?.name == item?.name) ? COLORS.main : COLORS.transparent
                                                                                                    }}>
                                                                                                    <Text style={{ color: value?.some(i => i?.name == item?.name && i?.subOptions?.name == item2?.name) ? COLORS.black : COLORS.gray, fontSize: 13, }}>{item2?.name}</Text>
                                                                                                </TouchableOpacity>
                                                                                            ))}

                                                                                        </View>
                                                                                    )}
                                                                                </View>
                                                                            ))}
                                                                        </View>
                                                                        :
                                                                        <View style={{
                                                                            // alignItems: 'center',
                                                                        }}>
                                                                            {data1.map((item, index) => (
                                                                                <View key={index} >
                                                                                    <TouchableOpacity
                                                                                        activeOpacity={0.8}
                                                                                        onPress={() => onPress(item)}>
                                                                                        <View style={{
                                                                                            // backgroundColor: value == index ? COLORS.main : COLORS.transparent,
                                                                                            ...styles.NumberInput2,
                                                                                        }}>
                                                                                            <View style={{ width: '90%' }}>
                                                                                                <Text style={{ color: COLORS.black }}>
                                                                                                    {item.name}
                                                                                                </Text>
                                                                                            </View>
                                                                                            <View style={{
                                                                                                alignItems: 'flex-end',
                                                                                            }}>
                                                                                                {type == 'array' ?
                                                                                                    <>
                                                                                                        {value?.includes(item?.name) && (
                                                                                                            <SVGSelect width={20} height={20} />
                                                                                                        )}
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                        {value == item.name ? (
                                                                                                            <SVGSelect width={20} height={20} />
                                                                                                        ) : (null
                                                                                                        )}
                                                                                                    </>
                                                                                                }
                                                                                            </View>
                                                                                        </View>
                                                                                    </TouchableOpacity>
                                                                                    {filter == 'Gender' ?
                                                                                        <>
                                                                                            {index < 2 && value == item?.name && data2?.length > 0 &&
                                                                                                <View style={{
                                                                                                    backgroundColor: COLORS.white,
                                                                                                    marginHorizontal: 20,
                                                                                                    // elevation:4,
                                                                                                    borderWidth: 1,
                                                                                                    borderColor: COLORS.light,
                                                                                                    borderBottomLeftRadius: 10,
                                                                                                    borderBottomRightRadius: 10,
                                                                                                    paddingHorizontal: 20
                                                                                                }}>
                                                                                                    {data2.map((j, i) => (
                                                                                                        <View
                                                                                                            key={i}
                                                                                                            style={{
                                                                                                                flexDirection: 'row',
                                                                                                                alignItems: 'center'
                                                                                                            }}>
                                                                                                            <TouchableOpacity
                                                                                                                onPress={() => setValueTwo(j?.name)}
                                                                                                                style={{
                                                                                                                    height: 40,
                                                                                                                    justifyContent: 'center',
                                                                                                                    width: '90%'
                                                                                                                }}>
                                                                                                                <Text style={{ color: COLORS.gray, fontSize: 13, }}>{j?.name}</Text>
                                                                                                            </TouchableOpacity>
                                                                                                            <View style={{
                                                                                                                alignItems: 'flex-end',
                                                                                                            }}>
                                                                                                                {valueTwo == j?.name ? (
                                                                                                                    <SVGSelect width={20} height={20} />
                                                                                                                ) : (null
                                                                                                                )}
                                                                                                            </View>
                                                                                                        </View>
                                                                                                    ))}
                                                                                                </View>
                                                                                            }
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            {value == item?.name && data2?.length > 0 &&
                                                                                                <View style={{
                                                                                                    backgroundColor: COLORS.white,
                                                                                                    marginHorizontal: 20,
                                                                                                    // elevation:4,
                                                                                                    borderWidth: 1,
                                                                                                    borderColor: COLORS.light,
                                                                                                    borderBottomLeftRadius: 10,
                                                                                                    borderBottomRightRadius: 10,
                                                                                                    paddingHorizontal: 20
                                                                                                }}>
                                                                                                    {data2.map((j, i) => (
                                                                                                        <View
                                                                                                            key={i}
                                                                                                            style={{
                                                                                                                flexDirection: 'row',
                                                                                                                alignItems: 'center'
                                                                                                            }}>
                                                                                                            <TouchableOpacity
                                                                                                                onPress={() => setValueTwo(j?.name)}
                                                                                                                style={{
                                                                                                                    height: 40,
                                                                                                                    justifyContent: 'center',
                                                                                                                    width: '90%'
                                                                                                                }}>
                                                                                                                <Text style={{ color: COLORS.gray, fontSize: 13, }}>{j?.name}</Text>
                                                                                                            </TouchableOpacity>
                                                                                                            <View style={{
                                                                                                                alignItems: 'flex-end',
                                                                                                            }}>
                                                                                                                {valueTwo == j?.name ? (
                                                                                                                    <SVGSelect width={20} height={20} />
                                                                                                                ) : (null
                                                                                                                )}
                                                                                                            </View>
                                                                                                        </View>
                                                                                                    ))}
                                                                                                </View>
                                                                                            }
                                                                                        </>
                                                                                    }
                                                                                </View>
                                                                            ))}
                                                                            {value == 'Yes' &&
                                                                                renderDropdown()
                                                                            }
                                                                            {title == 'How often do you Exercise?' || title == 'Political Views' || title == 'What is your religion?'  ?
                                                                                <View style={{
                                                                                    flexDirection: 'row',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    paddingTop: 20,
                                                                                }}>
                                                                                    <RadioButton
                                                                                        value="Public"
                                                                                        status={valueTwo === 'Public' ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                                                                                        onPress={() => setValueTwo('Public')} //when pressed, set the value of the checked Hook to 'Apple'
                                                                                        color={COLORS.main}
                                                                                        uncheckedColor={COLORS.main}
                                                                                    />
                                                                                    <Text style={{ color: COLORS.gray }}>Public</Text>
                                                                                    <RadioButton
                                                                                        value="Not Public"
                                                                                        status={valueTwo === 'Not Public' ? 'checked' : 'unchecked'}
                                                                                        onPress={() => setValueTwo('Not Public')}
                                                                                        color={COLORS.main}
                                                                                        uncheckedColor={COLORS.main}
                                                                                    />
                                                                                    <Text style={{ color: COLORS.gray }}>Not Public</Text>

                                                                                </View>
                                                                                : null}
                                                                        </View>
                        }
                    </View>
                    <View style={{
                        marginVertical: 30,
                        alignItems: 'center'
                    }}>
                        <CustomeButton onpress={() => setModal(false)}
                            title={'Continue'} width={width / 1.1} />
                    </View>
                </View>
            </ScrollView>


        </View>
    )
}

export default EditUserDetailsOne

const styles = StyleSheet.create({
    NumberInput2: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        // marginBottom:5,
        height: 45,
        // width: 340,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    TextInput: {
        padding: 10,
        backgroundColor: COLORS.light,
        color: COLORS.gray,
        width: 320,
        borderRadius: 10,
        height: 200,
        textAlignVertical: 'top',
    },
    itemContainer: {
        flexDirection: 'row',
        height: 30,
        marginTop: 5,
        borderRadius: 10,
        // flexDirection: 'row',
        // // height: 30,

        // alignItems: 'center',
        // justifyContent: 'space-between',
        // // padding: 10,
        // // paddingHorizontal: 10,
        // margin: 5,
        // borderWidth: 1,
        // borderColor: '#ddd',
    },
    removeButton: {
        color: 'red',
        fontWeight: 'bold',
    },
    TextInputBio: {
        padding: 10,
        backgroundColor: COLORS.light,
        color: COLORS.gray,
        width: 320,
        borderRadius: 10,
        height: 200,
        textAlignVertical: 'top',
    },
    NumberInputDate: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
        // backgroundColor:COLORS.main
    },
    TextInputDate: {
        paddingVertical: 20,
        backgroundColor: COLORS.light,
        color: COLORS.gray,
        // height: 50,
        width: width / 1.1,
        borderRadius: 10,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: 'center',
    },
    CompanynameInput: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 45,
        width: width / 1.1,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    Companyname: {
        padding: 0,
        backgroundColor: COLORS.transparent,
        width: '88%',
        color: COLORS.black
    },
    button: {
        flexDirection: 'row',
        height: 30,
        marginTop: 5,
        borderRadius: 10,
    },

    TextInputDeals: {
        padding: 10,
        backgroundColor: COLORS.light,
        color: COLORS.gray,
        // width: 320,
        width: '100%',
        alignItems: 'center',
        // marginHorizontal: 120,
        borderRadius: 10,
        height: 200,
        textAlignVertical: 'top',
    },


    InstaUsername: {
        marginTop: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        // paddingHorizontal: 20,
        height: 45,
        width: 340,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    TextInputInstaUsername: {
        paddingHorizontal: 20,
        backgroundColor: COLORS.transparent,
        color: COLORS.black
    },


    ClingyInput2: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 50,
        width: 340,
        backgroundColor: COLORS.light,
        borderRadius: 5,
        color: COLORS.black
    },
    ClingyTextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
        color: COLORS.black
    },
})