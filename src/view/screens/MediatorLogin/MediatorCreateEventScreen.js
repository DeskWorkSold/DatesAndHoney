import { Button, Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import COLORS from '../../../consts/Colors'
import { useState } from 'react';
import CustomeButton from '../../components/CustomeButton';
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Geocoder from 'react-native-geocoding';
// import Geocoder from 'react-native-geocoder';
// import Geocoder from 'react-native-geocoder';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// Geocoder.init("AIzaSyBWDLUnBrqcrId_1VThjFVfaFbcOZEA_Uw"); // use a valid API key


const MediatorCreateEventScreen = ({ navigation }) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    // const [startDate, setStartDate] = useState('');
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [location, setLocation] = useState();
    // console.log('change location ==>', location.latitude);
    const [totalTicketPrice, setTotalTicketPrice] = useState();
    const [pin, setPin] = useState({
        latitude: 24.860966,
        longitude: 66.990501,
    });
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);

    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [LocationModalVisible, setLocationModalVisible] = useState(false);
    const [actionTriggered, setActionTriggered] = useState(false);
    const [TicketModalVisible, setTicketModalVisible] = useState(false);
    const [Date, setDate] = useState('');

    const [ticketTitle, setTicketTitle] = useState('');
    const [PricePerTicket, setPricePerTicket] = useState('');
    const [totalTickets , setTotalTickets] = useState('');
    // const [Date, setDate] = useState('');
    // const [Date, setDate] = useState('');


    // console.log(pin.latitude , pin.longitude);
    // const getAddress = async (pin) => {
    //     // console.log(pin.latitude, pin.longitude);
    //     Geocoder.geocodePosition(pin)
    //         .then(json => {
    //             // var addressComponent = json.results[0].address_components[0];
    //             console.log('==>',json);
    //         })
    //         .catch(error =>
    //             console.log('errro', error)
    //         );
    //     // await Geocoder.fallbackToGoogle('AIzaSyBWDLUnBrqcrId_1VThjFVfaFbcOZEA_Uw');
    //     // let res = await Geocoder.geocodePosition({
    //     //     latitude , longitude
    //     // });
    //     // console.log(res[0]);
    // }


    const pickImage1 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        setImage1(result.assets[0].uri);
    };


    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };
    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };
    const handleConfirmEndDate = date => {
        // console.warn('A date has been picked: ', date);
        setEndDate(moment(date).format('MM/DD/yy'));
        hideEndDatePicker();
    };



    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };
    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };
    const handleConfirmStartTime = date => {
        console.warn('A start time has been picked: ',);
        const final = date.toLocaleString('en-UK', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        setStartTime(final);
        hideStartTimePicker();
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };
    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };
    const handleConfirmEndTime = date => {
        // console.warn('A date has been picked: ', date);
        const final = date.toLocaleString('en-UK', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        setEndTime(final);
        hideEndTimePicker();
    };




    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };
    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };
    const handleConfirmStartDate = date => {
        // console.warn('A date has been picked: ', date);
        setStartDate(moment(date).format('MM/DD/yy'));
        hideStartDatePicker();
    };
    const OpenLocationModalView = () => {
        setLocationModalVisible(!LocationModalVisible)
        setActionTriggered('ACTION_1');
    }

    const OnSetLocation = (pin) => {
        // console.log(pin);
        if (pin) {
            setLocation(pin)
            setLocationModalVisible(false)
        }
        else {
            ToastAndroid.show("Please select location first!", ToastAndroid.SHORT);
        }
    }

    // const OnMapScreen = () => {
    //     Geocoder.from(pin.latitude, pin.longitude)
    //         .then(json => {
    //             console.log(json);
    //             var addressComponent = json.results[0].address_components;
    //             // this.setState({
    //             //     Address: addressComponent
    //             // })
    //             console.log(addressComponent);
    //         })
    //         .catch(error => console.warn(error));
    // }

    // useEffect(() => {
    //     getAddress(pin);
    // }, [])


    const OnSubmitEvents = () => {
        var Data = new Object();
        Data.image1 = image1;
        Data.description = description;
        Data.startDate = startDate;
        Data.endDate = endDate;
        Data.startTime = startTime;
        Data.endTime = endTime;
        Data.location = location;
        Data.totalTicketPrice = totalTicketPrice;

        console.log(Data);
    }



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
                    }}>Post Event</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{
                        backgroundColor: COLORS.white,
                        paddingBottom: 20,
                        marginBottom: 300,
                        height: '100%'
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-end',
                            alignContent: 'stretch',
                            alignItems: 'stretch',
                            maxWidth: '100%',
                            margin: 'auto',
                            paddingHorizontal: 20,
                            paddingTop: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                width: '70%',
                                height: 200,
                                paddingRight: 5
                            }}>
                                {image1 ?
                                    <TouchableOpacity
                                        onPress={pickImage1}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            backgroundColor: COLORS.mainlight,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Image source={{ uri: image1 }} resizeMode='cover' style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 10,
                                        }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={pickImage1}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            backgroundColor: COLORS.mainlight,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Image source={require('../../../assets/uploadimage.png')} style={{
                                            width: 30,
                                            height: 30,
                                        }} />
                                        <Text style={{
                                            width: '70%'
                                        }}>
                                            Click to add main
                                            event image
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                width: '30%',
                                height: 200,
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    height: 98,
                                    backgroundColor: COLORS.mainlight,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image source={require('../../../assets/add.png')} style={{
                                        width: 20,
                                        height: 20,
                                    }} />
                                </View>
                                <View style={{
                                    height: 98,
                                    backgroundColor: COLORS.mainlight,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image source={require('../../../assets/add.png')} style={{
                                        width: 20,
                                        height: 20,
                                    }} />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            // width: '100%',
                            paddingHorizontal: 20,
                            marginTop: 5,
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                height: 98,
                                width: '34%',
                                marginRight: 5,
                                backgroundColor: COLORS.mainlight,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image source={require('../../../assets/add.png')} style={{
                                    width: 20,
                                    height: 20,
                                }} />
                            </View>
                            <View style={{
                                height: 98,
                                width: '34%',
                                marginRight: 5,
                                backgroundColor: COLORS.mainlight,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image source={require('../../../assets/add.png')} style={{
                                    width: 20,
                                    height: 20,
                                }} />
                            </View>
                            <View style={{
                                height: 98,
                                width: '30%',
                                marginRight: 5,
                                backgroundColor: COLORS.mainlight,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image source={require('../../../assets/add.png')} style={{
                                    width: 20,
                                    height: 20,
                                }} />
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Title </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={name}
                                        placeholder={'Name'}
                                        placeholderTextColor={COLORS.gray}
                                        onChangeText={name => setName(name)
                                        }
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Description </Text>
                                <View style={styles.NumberInput2}>
                                    <TextInput
                                        multiline
                                        numberOfLines={8}
                                        value={description}
                                        placeholderTextColor={COLORS.gray}
                                        placeholder={'Details'}
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        onChangeText={description => setDescription(description)
                                        }
                                        style={styles.TextInput2}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 20,
                            width: '100%'
                        }}>
                            <View style={{ marginTop: 10, width: '45%', }}>
                                <Text style={{ color: COLORS.black }}> Start Date </Text>
                                <View style={{
                                    height: 45,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 5,
                                    elevation: 4,
                                    paddingRight: 10,
                                    marginRight: 2,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    {/* <TextInput
                                        value={startDate}
                                        placeholder={'Start Date'}
                                        onChangeText={startDate => setStartDate(startDate)
                                        }
                                        style={styles.TextInput}
                                    /> */}
                                    <TextInput
                                        style={styles.TextInput}
                                        placeholder={'Start Date'}
                                        value={startDate}
                                        placeholderTextColor={COLORS.gray}
                                        // error={dateOfBirthError}
                                        onChangeText={setStartDate}
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        // activeOutlineColor={COLORS.fontColor}
                                        activeUnderlineColor={COLORS.white}
                                        // onFocus={() => { setDateOfBirthError(false) }}
                                        editable={true}
                                        onPressIn={showStartDatePicker}
                                    />
                                    <Image source={require('../../../assets/events.png')} resizeMode='contain' style={{
                                        tintColor: COLORS.black,
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                            </View>
                            <View style={{ marginTop: 10, width: '45%' }}>
                                <Text style={{ color: COLORS.black }}> End Date </Text>
                                <View style={{
                                    height: 45,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 5,
                                    elevation: 4,
                                    paddingRight: 10,
                                    marginLeft: 2,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <TextInput
                                        style={styles.TextInput}
                                        placeholder={'End Date'}
                                        value={endDate}
                                        placeholderTextColor={COLORS.gray}
                                        // error={dateOfBirthError}
                                        onChangeText={setEndDate}
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        // activeOutlineColor={COLORS.fontColor}
                                        activeUnderlineColor={COLORS.white}
                                        // onFocus={() => { setDateOfBirthError(false) }}
                                        editable={true}
                                        onPressIn={showEndDatePicker}
                                    />
                                    <Image source={require('../../../assets/events.png')} resizeMode='contain' style={{
                                        tintColor: COLORS.black,
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                            </View>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 20,
                            width: '100%'
                        }}>
                            <View style={{ marginTop: 10, width: '45%', }}>
                                <Text style={{ color: COLORS.black }}> Start Time </Text>
                                <View style={{
                                    height: 45,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 5,
                                    elevation: 4,
                                    paddingRight: 10,
                                    marginRight: 2,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'

                                }}>
                                    {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}

                                    {/* <TextInput
                                        value={dateOfBirth}
                                        placeholder={'Start Time'}
                                        onChangeText={dateOfBirth => setDateOfBirth(dateOfBirth)
                                        }
                                        style={styles.TextInput}
                                        // onPressIn={() => showDatePicker()}
                                        onPressIn={showDatePicker}
                                        editable={false}<TextInput
                                        style={styles.TextInput}
                                        placeholder={'End Date'}
                                        value={endDate}
                                        // error={dateOfBirthError}
                                        onChangeText={setEndDate}
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        // activeOutlineColor={COLORS.fontColor}
                                        activeUnderlineColor={COLORS.white}
                                        // onFocus={() => { setDateOfBirthError(false) }}
                                        editable={true}
                                        onPressIn={showEndDatePicker}
                                    />showStartTimePicker
                                    /> */}
                                    <TextInput
                                        style={styles.TextInput}
                                        placeholder={'Start Time'}
                                        value={startTime}
                                        placeholderTextColor={COLORS.gray}
                                        error={dateOfBirthError}
                                        onChangeText={setStartTime}
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        // onFocus={() => { setDateOfBirthError(false) }}
                                        // editable={true}
                                        onPressIn={showStartTimePicker}
                                    />
                                    <Image source={require('../../../assets/clock.png')} resizeMode='contain' style={{
                                        width: 15,
                                        height: 15,
                                        tintColor: COLORS.black,
                                    }} />
                                </View>
                            </View>
                            <View style={{ marginTop: 10, width: '45%' }}>
                                <Text style={{ color: COLORS.black }}> End Time </Text>
                                <View style={{
                                    height: 45,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 5,
                                    elevation: 4,
                                    paddingRight: 10,
                                    marginLeft: 2,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <TextInput
                                        style={styles.TextInput}
                                        placeholder={'End Time'}
                                        value={endTime}
                                        // error={dateOfBirthError}
                                        onChangeText={setEndTime}
                                        placeholderTextColor={COLORS.gray}
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        // activeOutlineColor={COLORS.fontColor}
                                        activeUnderlineColor={COLORS.white}
                                        // onFocus={() => { setDateOfBirthError(false) }}
                                        onPressIn={showEndTimePicker}
                                    />
                                    {/* <TextInput
                                        value={endDate}
                                        placeholder={'End Time'}
                                        onChangeText={endDate => setEndDate(endDate)
                                        }
                                        style={styles.TextInput}
                                    /> */}
                                    <Image source={require('../../../assets/clock.png')} resizeMode='contain' style={{
                                        tintColor: COLORS.black,
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Location </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={location}
                                        placeholder={'Add location of event'}
                                        onChangeText={location => setLocation(location)
                                        }
                                        placeholderTextColor={COLORS.gray}
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        style={styles.TextInput}
                                        onPressIn={OpenLocationModalView}
                                        editable={true}
                                    />
                                    <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                        tintColor: COLORS.black,
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Ticket Price </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={totalTicketPrice}
                                        placeholderTextColor={COLORS.gray}
                                        placeholder={'Ticket Price'}
                                        onChangeText={totalTicketPrice => setTotalTicketPrice(totalTicketPrice)
                                        }
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        style={styles.TextInput}
                                        editable={true}
                                    />
                                    <TouchableOpacity onPress={() => {
                                        setLocationModalVisible(true);
                                        setActionTriggered('ACTION_2');
                                    }}>
                                        <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.black,
                                            width: 15,
                                            height: 15,
                                        }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => setTicketindex(index)}
                            style={{
                                padding: 20,
                                backgroundColor: COLORS.white,
                                marginHorizontal: 20,
                                marginTop: 20,
                                // marginBottom: 200,
                                borderRadius: 20,
                                elevation: 8
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 16,
                                    }}>
                                        Early Bird general admissions
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        // onPress={() => handleDecrement(item.id)}
                                        style={{
                                            backgroundColor: COLORS.light,
                                            alignItems: 'center',
                                            width: 20
                                        }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 12,
                                            // marginRight: 5,
                                            // paddingRight: 5,
                                            textAlign: 'center',
                                            fontSize: 15,
                                        }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{
                                        backgroundColor: COLORS.white,
                                        paddingHorizontal: 3,
                                        fontSize: 15,
                                    }}>0</Text>
                                    <TouchableOpacity
                                        onPress={() => handleIncrement(item.id)}
                                        style={{
                                            backgroundColor: COLORS.light,
                                            alignItems: 'center',
                                            width: 20,
                                        }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 12,
                                            marginRight: 5,
                                            paddingLeft: 5,
                                            fontSize: 15,
                                        }}>+</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    // paddingVertical: 10,
                                }}>
                                    <Text style={{
                                        color: COLORS.green,
                                        fontWeight: 'bold',
                                    }}>
                                        $100
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('EventTickets')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingHorizontal: 10,
                                        paddingVertical: 5
                                    }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 12,
                                        marginRight: 5,
                                        textDecorationLine: 'line-through',
                                        textDecorationStyle: 'solid',
                                    }}>$120</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 12
                                }}>Sales end on Oct 9, 2022</Text>
                            </View>
                            <View style={{
                                paddingVertical: 2
                            }}>
                                <Text style={{
                                    fontSize: 12
                                }}>Access to enter the between 5:00AM–8:45AM. </Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingTop: 10, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/left.png')} resizeMode='contain'
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: 'red'
                                        }} />
                                    <View>
                                        <Text style={{ fontSize: 12, color: 'red' }}>2Left</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                                    <Text style={{ color: COLORS.black, fontSize: 12, marginRight: 5, }}>Time Left:</Text>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: 'bold' }}>01:12:03</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 40,
                        }}>
                            <CustomeButton onpress={() => OnSubmitEvents()}
                                title={'Create Events'} color={COLORS.white} />
                        </View>
                    </View>
                    <DateTimePickerModal
                        isVisible={isStartDatePickerVisible}
                        mode="date"
                        // display='spinner'
                        onConfirm={handleConfirmStartDate}
                        onCancel={hideStartDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isEndDatePickerVisible}
                        mode="date"
                        // display='spinner'
                        onConfirm={handleConfirmEndDate}
                        onCancel={hideEndDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isStartTimePickerVisible}
                        mode="time"
                        // display='spinner'
                        onConfirm={handleConfirmStartTime}
                        onCancel={hideStartTimePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isEndTimePickerVisible}
                        mode="time"
                        // display='spinner'
                        onConfirm={handleConfirmEndTime}
                        onCancel={hideEndTimePicker}
                    />

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={LocationModalVisible}
                        onRequestClose={() => {
                            setLocationModalVisible(!LocationModalVisible);
                        }}
                    >
                        {actionTriggered === 'ACTION_1' ?
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ marginTop: 0 }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20,
                                        height: 50
                                    }}>
                                        <TouchableOpacity
                                            style={{
                                                flex: 1,
                                            }}
                                            onPress={() => navigation.goBack()}>
                                            <Icon name='arrow-back' size={20} onPress={() => setLocationModalVisible(false)} color={COLORS.black} />
                                        </TouchableOpacity>
                                        <View style={{
                                            flex: 2,
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 20,
                                                fontWeight: 'bold'
                                            }}> Add Location </Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                    }}>
                                        <MapView
                                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                            style={styles.map}
                                            initialRegion={{
                                                latitude: 24.860966,
                                                longitude: 66.990501,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421,
                                            }}
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude: 24.860966,
                                                    longitude: 66.990501,
                                                }}
                                                // image={require('../../../assets/map.png')}
                                                draggable={true}
                                                onDragEnd={(e) => {
                                                    console.log('Drag end', e.nativeEvent.coordinate)
                                                    setPin({
                                                        latitude: e.nativeEvent.coordinate.latitude,
                                                        longitude: e.nativeEvent.coordinate.longitude,
                                                    })
                                                }}
                                                title={'Test Marker'}
                                                description={'This is description of marker'} >
                                                <Image
                                                    source={require('../../../assets/map.png')}
                                                    style={{ width: 26, height: 28 }}
                                                    resizeMode="contain"
                                                />
                                            </Marker>
                                            <Circle center={pin} radius={200} />

                                            {/* <Callout>
                                            <Text>Click Me!</Text>
                                        </Callout> */}

                                            {/* <TouchableOpacity>
                                            <Text>
                                                Add location
                                            </Text>
                                        </TouchableOpacity> */}
                                        </MapView>
                                        <View
                                            style={{
                                                position: 'absolute',//use absolute position to show button on top of the map
                                                top: '70%', //for center align
                                                alignSelf: 'center' //for align to right
                                            }}
                                        >
                                            <CustomeButton title={'Add Location'} onpress={() => OnSetLocation(pin)} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            :
                            actionTriggered === 'ACTION_2' ?
                                <View style={{
                                    height: '100%',
                                    backgroundColor: COLORS.white
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20,
                                        height: 50
                                    }}>
                                        <TouchableOpacity
                                            style={{
                                                flex: 1,
                                            }}
                                            onPress={() => navigation.goBack()}>
                                            <Icon name='arrow-back' size={20} onPress={() => setLocationModalVisible(false)} color={COLORS.black} />
                                        </TouchableOpacity>
                                        <View style={{
                                            flex: 2,
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 20,
                                                fontWeight: 'bold'
                                            }}> Ticket Details </Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        marginHorizontal: 5,
                                    }}>
                                        <View style={{
                                            // height:height,
                                            marginBottom: 20,
                                            backgroundColor: COLORS.white,
                                        }}>
                                            <ScrollView vertical showsVerticalScrollIndicator={false}>
                                                <View style={{ alignItems: 'center', }}>
                                                    <Image source={require('../../../assets/tickets.png')} resizeMode='contain'
                                                        style={{
                                                            width: '70%',
                                                            height: 300,
                                                            borderWidth: 1,
                                                            borderRadius: 10,
                                                            borderColor: COLORS.light,
                                                            elevation: 8,
                                                        }}
                                                    />
                                                </View>
                                                <View style={{ alignItems: 'center', }}>
                                                    <View style={{ marginTop: 10 }}>
                                                        <Text style={{ color: COLORS.black }}> Title </Text>
                                                        <View style={styles.NumberInput}>
                                                            <TextInput
                                                                value={description}
                                                                placeholderTextColor={COLORS.gray}
                                                                placeholder={'Details'}
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                activeUnderlineColor={COLORS.white}
                                                                onChangeText={description => setDescription(description)
                                                                }
                                                                style={styles.TextInput2}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: 'center' }}>
                                                    <View style={{ marginTop: 10 }}>
                                                        <Text style={{ color: COLORS.black }}> Price Per Ticket </Text>
                                                        <View style={styles.NumberInput}>
                                                            <TextInput
                                                                value={name}
                                                                placeholder={'Name'}
                                                                placeholderTextColor={COLORS.gray}
                                                                onChangeText={name => setName(name)
                                                                }
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                activeUnderlineColor={COLORS.white}
                                                                style={styles.TextInput}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: 'center' }}>
                                                    <View style={{ marginTop: 10 }}>
                                                        <Text style={{ color: COLORS.black }}> Total Tickets </Text>
                                                        <View style={styles.NumberInput}>
                                                            <TextInput
                                                                value={name}
                                                                placeholder={'Name'}
                                                                placeholderTextColor={COLORS.gray}
                                                                onChangeText={name => setName(name)
                                                                }
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                activeUnderlineColor={COLORS.white}
                                                                style={styles.TextInput}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: 'center' }}>
                                                    <View style={{ marginTop: 10 }}>
                                                        <Text style={{ color: COLORS.black }}> Discount Per Tickets </Text>
                                                        <View style={styles.NumberInput}>
                                                            <TextInput
                                                                value={name}
                                                                placeholder={'Name'}
                                                                placeholderTextColor={COLORS.gray}
                                                                onChangeText={name => setName(name)
                                                                }
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                activeUnderlineColor={COLORS.white}
                                                                style={styles.TextInput}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginHorizontal: 20,
                                                    width: '100%'
                                                }}>
                                                    <View style={{ marginTop: 10, width: '45%', }}>
                                                        <Text style={{ color: COLORS.black }}> Discount Start Date </Text>
                                                        <View style={{
                                                            height: 45,
                                                            backgroundColor: COLORS.white,
                                                            borderRadius: 5,
                                                            elevation: 4,
                                                            paddingRight: 10,
                                                            marginRight: 2,
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                        }}>
                                                            {/* <TextInput
                                        value={startDate}
                                        placeholder={'Start Date'}
                                        onChangeText={startDate => setStartDate(startDate)
                                        }
                                        style={styles.TextInput}
                                    /> */}
                                                            <TextInput
                                                                style={styles.TextInput}
                                                                placeholder={'Start Date'}
                                                                value={startDate}
                                                                placeholderTextColor={COLORS.gray}
                                                                // error={dateOfBirthError}
                                                                onChangeText={setStartDate}
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                // activeOutlineColor={COLORS.fontColor}
                                                                activeUnderlineColor={COLORS.white}
                                                                // onFocus={() => { setDateOfBirthError(false) }}
                                                                editable={true}
                                                                onPressIn={showStartDatePicker}
                                                            />
                                                            <Image source={require('../../../assets/events.png')} resizeMode='contain' style={{
                                                                tintColor: COLORS.black,
                                                                width: 15,
                                                                height: 15,
                                                            }} />
                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: 10, width: '45%' }}>
                                                        <Text style={{ color: COLORS.black }}>Discount End Date </Text>
                                                        <View style={{
                                                            height: 45,
                                                            backgroundColor: COLORS.white,
                                                            borderRadius: 5,
                                                            elevation: 4,
                                                            paddingRight: 10,
                                                            marginLeft: 2,
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <TextInput
                                                                style={styles.TextInput}
                                                                placeholder={'End Date'}
                                                                value={endDate}
                                                                placeholderTextColor={COLORS.gray}
                                                                // error={dateOfBirthError}
                                                                onChangeText={setEndDate}
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                // activeOutlineColor={COLORS.fontColor}
                                                                activeUnderlineColor={COLORS.white}
                                                                // onFocus={() => { setDateOfBirthError(false) }}
                                                                editable={true}
                                                                onPressIn={showEndDatePicker}
                                                            />
                                                            <Image source={require('../../../assets/events.png')} resizeMode='contain' style={{
                                                                tintColor: COLORS.black,
                                                                width: 15,
                                                                height: 15,
                                                            }} />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginHorizontal: 20,
                                                    width: '100%',
                                                    
                                                }}>
                                                    <View style={{ marginTop: 10, width: '45%', }}>
                                                        <Text style={{ color: COLORS.black }}>Discount Start Time </Text>
                                                        <View style={{
                                                            height: 45,
                                                            backgroundColor: COLORS.white,
                                                            borderRadius: 5,
                                                            elevation: 4,
                                                            paddingRight: 10,
                                                            marginRight: 2,
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'

                                                        }}>
                                                            <TextInput
                                                                style={styles.TextInput}
                                                                placeholder={'Start Time'}
                                                                value={startTime}
                                                                placeholderTextColor={COLORS.gray}
                                                                error={dateOfBirthError}
                                                                onChangeText={setStartTime}
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                activeUnderlineColor={COLORS.white}
                                                                // onFocus={() => { setDateOfBirthError(false) }}
                                                                // editable={true}
                                                                onPressIn={showStartTimePicker}
                                                            />
                                                            <Image source={require('../../../assets/clock.png')} resizeMode='contain' style={{
                                                                width: 15,
                                                                height: 15,
                                                                tintColor: COLORS.black,
                                                            }} />
                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: 10, width: '45%' }}>
                                                        <Text style={{ color: COLORS.black }}>Discount End Time </Text>
                                                        <View style={{
                                                            height: 45,
                                                            backgroundColor: COLORS.white,
                                                            borderRadius: 5,
                                                            elevation: 4,
                                                            paddingRight: 10,
                                                            marginLeft: 2,
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <TextInput
                                                                style={styles.TextInput}
                                                                placeholder={'End Time'}
                                                                value={endTime}
                                                                // error={dateOfBirthError}
                                                                onChangeText={setEndTime}
                                                                placeholderTextColor={COLORS.gray}
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                // activeOutlineColor={COLORS.fontColor}
                                                                activeUnderlineColor={COLORS.white}
                                                                // onFocus={() => { setDateOfBirthError(false) }}
                                                                onPressIn={showEndTimePicker}
                                                            />
                                                            <Image source={require('../../../assets/clock.png')} resizeMode='contain' style={{
                                                                tintColor: COLORS.black,
                                                                width: 15,
                                                                height: 15,
                                                            }} />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    alignItems: 'center',
                                                    marginTop:50,
                                                    marginBottom: 100
                                                }}>
                                                    <CustomeButton 
                                                    // onpress={() => OnAddTicket()}
                                                        title={'Add Ticket'} color={COLORS.white} />
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </View>


                                </View>
                                :
                                null}
                    </Modal>

                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default MediatorCreateEventScreen

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
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        height: 45,
        width: 340,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
    NumberInput2: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 20,
        width: 340,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4,
        marginTop: 5,
    },
    TextInput2: {
        // paddingTop: 10,
        backgroundColor: COLORS.transparent,
        // height: 200,
        // textAlignVertical: 'top',
    },
    map: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: '100%',
        width: width,
        borderRadius: 15,
    },
})