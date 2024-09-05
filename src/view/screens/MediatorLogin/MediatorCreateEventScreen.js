import { ActivityIndicator, Button, Dimensions, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
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
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { selectMediatorUser, selectUser } from '../../../../redux/reducers/Reducers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GoogleMapKey from '../../../consts/GoogleMapKey';
// import Geocoder from 'react-native-geocoding';
// import Geocoder from 'react-native-geocoder';
// import Geocoder from 'react-native-geocoder';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// Geocoder.init("AIzaSyBWDLUnBrqcrId_1VThjFVfaFbcOZEA_Uw"); // use a valid API key


const MediatorCreateEventScreen = ({ navigation }) => {
    const currentuser = useSelector(selectMediatorUser);
    const api = GoogleMapKey?.GOOGLE_MAP_KEY
    // for events states
    // console.log(currentuser);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
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
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const [imageArray, setImageArray] = useState([]);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [image6, setImage6] = useState(null);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [LocationModalVisible, setLocationModalVisible] = useState(false);
    const [actionTriggered, setActionTriggered] = useState(false);
    // const [Date, setDate] = useState(new Date());
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);


    // for tickets states 
    const [ticketTitle, setTicketTitle] = useState('Early Bird general admissions');
    const [pricePerTicket, setPricePerTicket] = useState('');
    const [totalTickets, setTotalTickets] = useState('');
    const [discountPerTicket, setDiscountPerTicket] = useState('');
    const [discountStartDate, setDiscountStartDate] = useState();
    const [discountendDate, setDiscountEndDate] = useState();
    const [discountstartTime, setDiscountStartTime] = useState();
    const [discountendTime, setDiscountEndTime] = useState();
    const [isDiscountEndDatePickerVisible, setDiscountEndDatePickerVisibility] = useState(false);
    const [isDiscountStartDatePickerVisible, setDiscountStartDatePickerVisibility] = useState(false);
    const [isDiscountStartTimePickerVisible, setDiscountStartTimePickerVisibility] = useState(false);
    const [isDiscountEndTimePickerVisible, setDiscountEndTimePickerVisibility] = useState(false);
    const [TicketModaldata, setTicketModaldata] = useState([]);

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
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage1(result.assets[0].uri);
    };
    const pickImage2 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage2(result.assets[0].uri);
    };
    const pickImage3 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage3(result.assets[0].uri);
    };
    const pickImage4 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage4(result.assets[0].uri);
    };
    const pickImage5 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage5(result.assets[0].uri);
    };
    const pickImage6 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage6(result.assets[0].uri);
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






    // for tickets data select 
    const showDiscountStartDatePicker = () => {
        setDiscountStartDatePickerVisibility(true);
    };
    const hideDiscountStartDatePicker = () => {
        setDiscountStartDatePickerVisibility(false);
    };
    const handleDiscountConfirmStartDate = date => {
        // console.warn('A date has been picked: ', date);
        setDiscountStartDate(moment(date).format('MM/DD/yy'));
        hideDiscountStartDatePicker();
    };
    const showDiscountEndDatePicker = () => {
        setDiscountEndDatePickerVisibility(true);
    };
    const hideDiscountEndDatePicker = () => {
        setDiscountEndDatePickerVisibility(false);
    };
    const handleDiscountConfirmEndDate = date => {
        // console.warn('A date has been picked: ', date);
        setDiscountEndDate(moment(date).format('MM/DD/yy'));
        hideDiscountEndDatePicker();
    };
    const showDiscountStartTimePicker = () => {
        setDiscountStartTimePickerVisibility(true);
    };
    const hideDiscountStartTimePicker = () => {
        setDiscountStartTimePickerVisibility(false);
    };
    const handleDiscountConfirmStartTime = date => {
        console.warn('A start time has been picked: ',);
        const final = date.toLocaleString('en-UK', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        setDiscountStartTime(final);
        hideDiscountStartTimePicker();
    };
    const showDiscountEndTimePicker = () => {
        setDiscountEndTimePickerVisibility(true);
    };
    const hideDiscountEndTimePicker = () => {
        setDiscountEndTimePickerVisibility(false);
    };
    const handleDiscountConfirmEndTime = date => {
        // console.warn('A date has been picked: ', date);
        const final = date.toLocaleString('en-UK', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        setDiscountEndTime(final);
        hideDiscountEndTimePicker();
    };

    // const test = () => {
    //     setTicketModaldata(nopeee)

    //     console.log(TicketModaldata);
    // }
    // const nopeee = [];
    const OnAddTicket = () => {
        if (!ticketTitle || !pricePerTicket || !totalTickets || !discountPerTicket || !discountStartDate || !discountendDate || !discountstartTime || !discountendTime) {
            if (!ticketTitle) {
                ToastAndroid.show("Please select Ticket Title first!", ToastAndroid.SHORT);
            }
            else if (!pricePerTicket) {
                ToastAndroid.show("Please select Price PerTicket first!", ToastAndroid.SHORT);
            }
            else if (!totalTickets) {
                ToastAndroid.show("Please select Total Tickets first!", ToastAndroid.SHORT);
            }
            else if (!discountPerTicket) {
                ToastAndroid.show("Please select Discount Per Tickets first!", ToastAndroid.SHORT);
            }
            else if (!discountStartDate) {
                ToastAndroid.show("Please select Start Date first!", ToastAndroid.SHORT);
            }
            else if (!discountendDate) {
                ToastAndroid.show("Please select End Date first!", ToastAndroid.SHORT);
            }
            else if (!discountstartTime) {
                ToastAndroid.show("Please select Start Time first!", ToastAndroid.SHORT);
            }
            else if (!discountendTime) {
                ToastAndroid.show("Please select end Time first!", ToastAndroid.SHORT);
            }
        }
        else {
            var Data = new Object();
            Data.ticketTitle = ticketTitle;
            Data.pricePerTicket = pricePerTicket;
            Data.totalTickets = totalTickets;
            Data.discountPerTicket = discountPerTicket;
            Data.discountStartDate = discountStartDate;
            Data.discountendDate = discountendDate;
            Data.discountstartTime = discountstartTime;
            Data.discountendTime = discountendTime;
            Data.qty = 0;

            // console.log('Ticket data', Data);
            // nopeee.push(Data);
            TicketModaldata.push(Data);

            // console.log('final data', nopeee);
            setLocationModalVisible(false);
        }

    }
    // console.log(TicketModaldata);
    // setTicketModaldata(nopeee)





    const OpenLocationModalView = () => {
        setLocationModalVisible(!LocationModalVisible)
        setActionTriggered('ACTION_1');
    }

    const OnSetLocation = () => {
        // console.log(pin);
        if (region) {
            // setLocation(pin)
            setLocationModalVisible(false)
        }
        else {
            ToastAndroid.show("Please select location first!", ToastAndroid.SHORT);
        }
    }



    const OnHandleEvents = () => {
        if (imageArray?.length < 3 || !name || !description || !startDate || !endDate || !startTime || !endTime || !location || !totalTicketPrice || TicketModaldata.length == 0) {
            if (imageArray?.length < 3) {
                // console.log('aklxjn');
                ToastAndroid.show("Please select at least three images!", ToastAndroid.SHORT);
            }
            else if (!name) {
                ToastAndroid.show("Please Events Title first!", ToastAndroid.SHORT);
            }
            else if (!description) {
                ToastAndroid.show("Please add description first!", ToastAndroid.SHORT);
            }
            else if (!startDate) {
                ToastAndroid.show("Please select start Date first!", ToastAndroid.SHORT);
            }
            else if (!endDate) {
                ToastAndroid.show("Please select end Date first!", ToastAndroid.SHORT);
            }
            else if (!startTime) {
                ToastAndroid.show("Please select Start Time first!", ToastAndroid.SHORT);
            }
            else if (!endTime) {
                ToastAndroid.show("Please select End Time first!", ToastAndroid.SHORT);
            }
            else if (!location) {
                ToastAndroid.show("Please select location first!", ToastAndroid.SHORT);
            }
            else if (!totalTicketPrice) {
                ToastAndroid.show("Please add total TicketPrice first!", ToastAndroid.SHORT);
            }
            else if (TicketModaldata.length == 0) {
                ToastAndroid.show("Please add you Tickets first!", ToastAndroid.SHORT);
            }
            // console.log('jzhb');
        }
        else {
            // console.log('test');
            // return
            OnSubmitEvents();
        }
    }

    const OnSubmitEvents =async () => {
        // console.log('add events here: ',Data);
        setUploading(true)
        const imageUrl = await uploadImage();
        const secimageUrl = await uploadSecondImage();
        const thirdimageUrl = await uploadThirdImage();
        const fourthimageUrl = await uploadFourthImage();
        const fifthimageUrl = await uploadFifthImage();
        const sixthimageUrl = await uploadSixthImage();
        var Data = new Object();
        Data.Title = name;
        Data.description = description;
        Data.startDate = startDate;
        Data.endDate = endDate;
        Data.startTime = startTime;
        Data.endTime = endTime;
        Data.location = location;
        Data.Address = region;
        Data.totalTicketPrice = totalTicketPrice;
        Data.TicketModaldata = TicketModaldata;
        Data.owneruid = currentuser?.userDetails?.uid;
        Data.ownerName = currentuser?.userDetails?.Name;
        Data.owneremail = currentuser?.userDetails?.email;
        Data.uid = Math.random().toString(16).slice(2);
        Data.image1 = imageUrl;
        Data.secimageUrl = secimageUrl;
        Data.thirdimageUrl = thirdimageUrl;
        Data.fourthimageUrl = fourthimageUrl;
        Data.fifthimageUrl = fifthimageUrl;
        Data.sixthimageUrl = sixthimageUrl;
        timeStamp = new Date().toString();
        // console.log(Data);
        // return;
        firestore()
            .collection('Events')
            .doc(Data.uid)
            .set(Data)
            .then(() => {
                ToastAndroid.show('Event created successfully', ToastAndroid.SHORT)
                RefereshForm();
                setUploading(false)
            })
        // // setImage(null)

    }

    const uploadImage = async () => {
        if (image1 == null) {
            return null;
        }
        const uploadUri = image1;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Events/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    const uploadSecondImage = async () => {
        if (image2 == null) {
            return null;
        }
        const uploadUri = image2;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Events/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    const uploadThirdImage = async () => {
        if (image3 == null) {
            return null;
        }
        const uploadUri = image3;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Events/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    const uploadFourthImage = async () => {
        if (image4 == null) {
            return null;
        }
        const uploadUri = image4;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Events/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    const uploadFifthImage = async () => {
        if (image5 == null) {
            return null;
        }
        const uploadUri = image5;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Events/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    const uploadSixthImage = async () => {
        if (image6 == null) {
            return null;
        }
        const uploadUri = image6;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Events/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };


    const RefereshForm = () => {
        setName('')
        setDescription('')
        setStartDate()
        setEndDate()
        setStartTime()
        setEndTime()
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setImage5(null)
        setImage6(null)
        setLocation()
        // console.log('change location ==>', location.latitude);
        setTotalTicketPrice('')
        setTicketModaldata()
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.black} />
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
                            alignItems: 'center',
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
                                {image2 ?
                                    <TouchableOpacity
                                        onPress={pickImage2}
                                        style={{
                                            height: 98,
                                            backgroundColor: COLORS.mainlight,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Image source={{ uri: image2 }} resizeMode='cover' style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 10,
                                        }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={pickImage2}
                                        style={{
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
                                    </TouchableOpacity>
                                }

                                {image3 ?
                                    <TouchableOpacity
                                        onPress={pickImage3}
                                        style={{
                                            height: 98,
                                            backgroundColor: COLORS.mainlight,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Image source={{ uri: image3 }} resizeMode='cover' style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 10,
                                        }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={pickImage3}
                                        style={{
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
                                    </TouchableOpacity>
                                }
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
                            {image4 ?
                                <TouchableOpacity
                                    onPress={pickImage4}
                                    style={{
                                        height: 98,
                                        width: '34%',
                                        marginRight: 5,
                                        backgroundColor: COLORS.mainlight,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <Image source={{ uri: image4 }} resizeMode='cover' style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 10,
                                    }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={pickImage4}
                                    style={{
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
                                </TouchableOpacity>
                            }

                            {image5 ?
                                <TouchableOpacity
                                    onPress={pickImage5}
                                    style={{
                                        height: 98,
                                        width: '34%',
                                        marginRight: 5,
                                        backgroundColor: COLORS.mainlight,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <Image source={{ uri: image4 }} resizeMode='cover' style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 10,
                                    }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={pickImage5}
                                    style={{
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
                                </TouchableOpacity>
                            }

                            {image6 ?
                                <TouchableOpacity
                                    onPress={pickImage6}
                                    style={{
                                        height: 98,
                                        width: '30%',
                                        marginRight: 5,
                                        backgroundColor: COLORS.mainlight,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <Image source={{ uri: image4 }} resizeMode='cover' style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 10,
                                    }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={pickImage6}
                                    style={{
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
                                </TouchableOpacity>
                            }
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
                            alignSelf: 'center',
                            justifyContent: 'center',
                            // marginHorizontal: 20,
                            width: width,
                            // backgroundColor:COLORS.black
                        }}>
                            <View style={{ marginTop: 10, width: width / 2.2 }}>
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
                            <View style={{ marginTop: 10, width: width / 2.2 }}>
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
                            justifyContent: 'center',
                            // marginHorizontal: 20,
                            width: width,
                        }}>
                            <View style={{ marginTop: 10, width: width / 2.2, }}>
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
                            <View style={{ marginTop: 10, width: width / 2.2 }}>
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
                        <View style={{
                            alignItems: 'center',

                        }}>
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

                        {!TicketModaldata?.length == 0 ?
                            <View>
                                {TicketModaldata.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        // onPress={() => setTicketindex(index)}
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
                                                    {item.ticketTitle}
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
                                                }}>{0}</Text>
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
                                                    ${item.pricePerTicket}
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
                                                }}>${item.pricePerTicket}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontSize: 12
                                            }}>Sales start from {item.discountStartDate} to {item.discountendDate}</Text>
                                        </View>
                                        <View style={{
                                            paddingVertical: 2
                                        }}>
                                            <Text style={{
                                                fontSize: 12
                                            }}>Access to enter the between {item.discountstartTime}–{item.discountendTime}. </Text>
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
                                                    <Text style={{ fontSize: 12, color: 'red' }}>{item.totalTickets}Left</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                                                <Text style={{ color: COLORS.black, fontSize: 12, marginRight: 5, }}>Time on:</Text>
                                                <View>
                                                    <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: 'bold' }}>{item.discountStartDate}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            :
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 20
                            }}>
                                <Text style={{
                                    color: 'red'
                                }}>
                                    Add Your Tickets For The Event!
                                </Text>
                            </View>
                        }

                        <View style={{
                            alignItems: 'center',
                            marginTop: 40,
                        }}>
                            {!uploading == true ?
                                <CustomeButton onpress={() => OnHandleEvents()}
                                    title={'Create Events'} color={COLORS.white} />
                                :
                                <View style={{
                                    backgroundColor: COLORS.main,
                                    width: 329,
                                    height: 50,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>
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


                {/* for tickert select picker  */}
                <DateTimePickerModal
                    isVisible={isDiscountStartDatePickerVisible}
                    mode="date"
                    // display='spinner'
                    onConfirm={handleDiscountConfirmStartDate}
                    onCancel={hideDiscountStartDatePicker}
                />
                <DateTimePickerModal
                    isVisible={isDiscountEndDatePickerVisible}
                    mode="date"
                    // display='spinner'
                    onConfirm={handleDiscountConfirmEndDate}
                    onCancel={hideDiscountEndDatePicker}
                />
                <DateTimePickerModal
                    isVisible={isDiscountStartTimePickerVisible}
                    mode="time"
                    // display='spinner'
                    onConfirm={handleDiscountConfirmStartTime}
                    onCancel={hideDiscountStartTimePicker}
                />
                <DateTimePickerModal
                    isVisible={isDiscountEndTimePickerVisible}
                    mode="time"
                    // display='spinner'
                    onConfirm={handleDiscountConfirmEndTime}
                    onCancel={hideDiscountEndTimePicker}
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
                                    flex: 1,
                                    marginTop: 20
                                }}>
                                    <GooglePlacesAutocomplete
                                        placeholder="Type a place"
                                        query={{
                                            key: api,
                                            // language: 'en',
                                            // components: "country:pk",
                                            types: "establishment",
                                            radius: 30000,
                                            location: `${region.latitude}, ${region.longitude}`
                                        }}
                                        fetchDetails={true}
                                        // ref={ref => setSearchTextRef(ref)}
                                        // placeholder='Search'
                                        // fetchDetails={true}
                                        autoFocus={true}
                                        // keyboardShouldPersistTaps={'handled'}
                                        // listUnderlayColor={'transparent'}
                                        // minLength={1} // minimum length of text to search
                                        // returnKeyType={'search'}
                                        // listViewDisplayed={'auto'}
                                        GooglePlacesSearchQuery={{
                                            rankby: "distance"
                                        }}
                                        // onFail={error => console.log(error)}
                                        // onNotFound={() => console.log('no results')}
                                        onPress={(data, details = null) => {
                                            console.log('======>data', data, '====>details', details)
                                            setRegion({
                                                latitude: details.geometry.location.lat,
                                                longitude: details.geometry.location.lng,
                                            })
                                            setLocation(data.description)
                                        }
                                        }
                                        // query={{
                                        //     key: api,
                                        //     language: 'en',
                                        //     components: "country:pk",
                                        //     types: "establishment",
                                        //     radius: 30000,
                                        //     location: `${region.latitude}, ${region.longitude}`
                                        // }}
                                        // nearbyPlacesAPI='GooglePlacesSearch'
                                        styles={{
                                            container: {
                                                flex: 0, position: 'absolute', width: "100%", zIndex: 1,
                                                // marginHorizontal: 20,
                                                // marginTop: 10,
                                            },
                                            listView: { backgroundColor: "white" }
                                        }}
                                    // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                                    // debounce={200}
                                    />
                                    <MapView
                                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: region.latitude,
                                            longitude: region.longitude,
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
                                    </MapView>
                                    <View
                                        style={{
                                            position: 'absolute',//use absolute position to show button on top of the map
                                            top: '70%', //for center align
                                            alignSelf: 'center' //for align to right
                                        }}
                                    >
                                        <CustomeButton title={'Add Location'} onpress={() => OnSetLocation()} />
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

                                            <View>
                                                <Text style={{ color: COLORS.black, paddingHorizontal: 20 }}> Ticket Title </Text>
                                                <View style={{
                                                    marginTop: 5,
                                                    borderRadius: 5,
                                                    height: 50,
                                                    marginHorizontal: 20,
                                                    backgroundColor: COLORS.white,
                                                    elevation: 5
                                                }}>
                                                    <Picker
                                                        selectedValue={ticketTitle}
                                                        onValueChange={(itemValue, itemIndex) =>
                                                            setTicketTitle(itemValue)
                                                        }
                                                        style={{
                                                            color: COLORS.gray,
                                                            // height: 85,
                                                            marginTop: -2
                                                        }}>
                                                        <Picker.Item label="Early Bird general admissions" value="Early Bird general admissions" />
                                                        <Picker.Item label="Early Bird VIP" value="Early Bird VIP" />
                                                        <Picker.Item label="Regular Admissions" value="Regular Admissions" />
                                                        <Picker.Item label="VIP Admissions" value="VIP Admissions" />
                                                        <Picker.Item label="Front row seats" value="Front row seats" />
                                                    </Picker>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <View style={{ marginTop: 10 }}>
                                                    <Text style={{ color: COLORS.black }}> Price Per Ticket </Text>
                                                    <View style={styles.NumberInput}>
                                                        <TextInput
                                                            value={pricePerTicket}
                                                            placeholder={'price'}
                                                            placeholderTextColor={COLORS.gray}
                                                            onChangeText={pricePerTicket => setPricePerTicket(pricePerTicket)
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
                                                            value={totalTickets}
                                                            placeholder={'total tickets'}
                                                            placeholderTextColor={COLORS.gray}
                                                            onChangeText={totalTickets => setTotalTickets(totalTickets)
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
                                                            value={discountPerTicket}
                                                            placeholder={'discount'}
                                                            placeholderTextColor={COLORS.gray}
                                                            onChangeText={discountPerTicket => setDiscountPerTicket(discountPerTicket)
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
                                                        <TextInput
                                                            style={styles.TextInput}
                                                            placeholder={'Start Date'}
                                                            value={discountStartDate}
                                                            placeholderTextColor={COLORS.gray}
                                                            // error={dateOfBirthError}
                                                            onChangeText={setDiscountStartDate}
                                                            selectionColor={COLORS.black}
                                                            underlineColor={COLORS.white}
                                                            // activeOutlineColor={COLORS.fontColor}
                                                            activeUnderlineColor={COLORS.white}
                                                            // onFocus={() => { setDateOfBirthError(false) }}
                                                            editable={true}
                                                            onPressIn={showDiscountStartDatePicker}
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
                                                            value={discountendDate}
                                                            placeholderTextColor={COLORS.gray}
                                                            // error={dateOfBirthError}
                                                            onChangeText={setDiscountEndDate}
                                                            selectionColor={COLORS.black}
                                                            underlineColor={COLORS.white}
                                                            // activeOutlineColor={COLORS.fontColor}
                                                            activeUnderlineColor={COLORS.white}
                                                            // onFocus={() => { setDateOfBirthError(false) }}
                                                            editable={true}
                                                            onPressIn={showDiscountEndDatePicker}
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
                                                            value={discountstartTime}
                                                            placeholderTextColor={COLORS.gray}
                                                            error={dateOfBirthError}
                                                            onChangeText={setDiscountStartTime}
                                                            selectionColor={COLORS.black}
                                                            underlineColor={COLORS.white}
                                                            activeUnderlineColor={COLORS.white}
                                                            // onFocus={() => { setDateOfBirthError(false) }}
                                                            // editable={true}
                                                            onPressIn={showDiscountStartTimePicker}
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
                                                            value={discountendTime}
                                                            // error={dateOfBirthError}
                                                            onChangeText={setDiscountEndTime}
                                                            placeholderTextColor={COLORS.gray}
                                                            selectionColor={COLORS.black}
                                                            underlineColor={COLORS.white}
                                                            // activeOutlineColor={COLORS.fontColor}
                                                            activeUnderlineColor={COLORS.white}
                                                            // onFocus={() => { setDateOfBirthError(false) }}
                                                            onPressIn={showDiscountEndTimePicker}
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
                                                marginTop: 50,
                                                marginBottom: 100
                                            }}>
                                                <CustomeButton
                                                    onpress={() => OnAddTicket()}
                                                    title={'Add Ticket'} color={COLORS.white} />
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>


                            </View>
                            :
                            null}
                </Modal>

            </View >
        </SafeAreaView >
    )
}

export default MediatorCreateEventScreen

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        backgroundColor: COLORS.white,
        flex: 1,
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
        // width: 340,
        width: width / 1.1,
        // marginHorizontal:20,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4
    },
    TextInput: {
        width: '80%',
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
    NumberInput2: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 20,
        width: width / 1.1,
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