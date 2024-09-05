import { ActivityIndicator, Button, Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
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
import SearchTab from '../../components/SearchTab';
import EventItems from '../../components/EventItems';
// import Geocoder from 'react-native-geocoding';
// import Geocoder from 'react-native-geocoder';
// import Geocoder from 'react-native-geocoder';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// Geocoder.init("AIzaSyBWDLUnBrqcrId_1VThjFVfaFbcOZEA_Uw"); // use a valid API key


// const FoodType = [
//     {
//         id: '1',
//         name: 'Burgers',
//         image: 'cat1.png'
//     },
//     {
//         id: '2',
//         name: 'Pizzas',
//         image: 'cat2.png'
//     },
//     {
//         id: '3',
//         name: 'Cakes',
//         image: 'cat3.png'
//     },
// ]




const MediatorCreateFoodScreen = ({ navigation }) => {
    const currentuser = useSelector(selectMediatorUser);
    // for events states
    // console.log(currentuser);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [endTime, setEndTime] = useState();
    const [location, setLocation] = useState();
    // console.log('change location ==>', location.latitude);
    const [pin, setPin] = useState({
        latitude: 24.860966,
        longitude: 66.990501,
    });
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
    const [Date, setDate] = useState('');
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

    //for food states
    const [foodTypeindex, setFoodTypeIndex] = useState(0);
    const [FoodType, setFoodType] = useState(0);
    const [search, setSearch] = useState(0);
    const [yourEvents, setYourEvents] = useState();
    const [selectEvent, setSelectEvent] = useState(0);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [PricePerItem, setPricePerItem] = useState();
    const [DeliveryTime, setDeliveryTime] = useState();








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

    const FetchEvents = async () => {
        // setLoading(true)
        await firestore()
            .collection('Events')
            .onSnapshot(querySnapshot => {
                // console.log('==>' , querySnapshot.data());
                const data = [];
                querySnapshot.forEach((documentSnapshot) => {
                    const eventdata = documentSnapshot.data()
                    data.push(documentSnapshot.data());
                    if (eventdata.owneruid == currentuser?.userDetails?.uid) {
                        // console.log('User ID: ', documentSnapshot.data());
                    }
                    //   // modalDataUid.push(documentSnapshot.id);
                });
                // dispatch(events(data))
                setYourEvents(data)
                // console.log(data);
            });
        // setLoading(false)
    }



    const fectchCategroy = async () => {
        try {
            await firestore()
                .collection('FoodsCategory')
                .onSnapshot(querySnapshot => {
                    const categoryfilter = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        // console.log(documentSnapshot.data().category);
                        categoryfilter.push(documentSnapshot.data());
                    });
                    setFoodType(categoryfilter)
                })
        }
        catch (e) {
            console.log(e);
        }
    }



    useEffect(() => {
        FetchEvents();
        fectchCategroy();
    }, [])


    const pickImage1 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        setImage1(result.assets[0].uri);
    };
    const pickImage2 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        setImage2(result.assets[0].uri);
    };
    const pickImage3 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        setImage3(result.assets[0].uri);
    };
    const pickImage4 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        setImage4(result.assets[0].uri);
    };
    const pickImage5 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        setImage5(result.assets[0].uri);
    };
    const pickImage6 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
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
        setDeliveryTime(final);
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

            // console.log('Ticket data', Data);
            // nopeee.push(Data);
            TicketModaldata.push(Data);

            // console.log('final data', nopeee);
            // setLocationModalVisible(false);
        }

    }
    // console.log(TicketModaldata);
    // setTicketModaldata(nopeee)





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



    const OnHandleEvents = () => {
        if (!image1 || !name || !description || !PricePerItem || !DeliveryTime || !selectEvent < 0 || !foodTypeindex < 0) {
            if (!image1) {
                ToastAndroid.show("Please Select At Least One Image!", ToastAndroid.SHORT);
            }
            else if (!name) {
                ToastAndroid.show("Please Enter Food Name First!", ToastAndroid.SHORT);
            }
            else if (!description) {
                ToastAndroid.show("Please Add Description First!", ToastAndroid.SHORT);
            }
            else if (!PricePerItem) {
                ToastAndroid.show("Please Add Price Per Item First!", ToastAndroid.SHORT);
            }
            else if (!DeliveryTime) {
                ToastAndroid.show("Please Add Delivery Time First!", ToastAndroid.SHORT);
            }
            else if (!selectEvent < 0) {
                ToastAndroid.show("Please select Event first!", ToastAndroid.SHORT);
            }
            else if (!foodTypeindex < 0) {
                ToastAndroid.show("Please select Food Category first!", ToastAndroid.SHORT);
            }
        }
        else {
            OnSubmitEvents();
        }
    }

    const OnSubmitEvents = async () => {
        const categoryName = FoodType[foodTypeindex]?.category
        const categoryid = FoodType[foodTypeindex]?.uid
        // const categoryImage = FoodType[foodTypeindex].image
        const Eventid = yourEvents[selectEvent]?.uid
        // console.log(
        //     category,
        //     'id here',categoryid,
        //     categoryImage,
        //     Eventid,
        //     image1,
        //     name,
        //     description,
        //     PricePerItem,
        //     DeliveryTime,
        // );
        // return;
        if (Eventid) {

            try {
                setUploading(true)
                const imageUrl = await uploadImage();
                const secimageUrl = await uploadSecondImage();
                const thirdimageUrl = await uploadThirdImage();
                const fourthimageUrl = await uploadFourthImage();
                const fifthimageUrl = await uploadFifthImage();
                const sixthimageUrl = await uploadSixthImage();
                var Data = new Object();
                Data.categoryid = categoryid;
                Data.categoryName = categoryName;
                Data.Eventid = Eventid;
                Data.name = name;
                Data.description = description;
                Data.PricePerItem = PricePerItem;
                Data.DeliveryTime = DeliveryTime;
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
                // console.log(Data);
                // return;
                firestore()
                    .collection('Foods')
                    .doc(Data.uid)
                    .set(Data)
                    .then(() => {
                        ToastAndroid.show('Food created successfully', ToastAndroid.SHORT)
                        RefereshForm();
                        setUploading(false)
                    })
                // // setImage(null)
            } catch (error) {
                console.log('error test1', error);
            }
        }
        else {
            ToastAndroid.show('Events cannot be empty please event you are adding foods', ToastAndroid.SHORT)
            // console.log('Events cannot be empty please add event before adding food menu');
        }
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
        const storageRef = storage().ref(`Foods/${filename}`);
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
        const storageRef = storage().ref(`Foods/${filename}`);
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
        const storageRef = storage().ref(`Foods/${filename}`);
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
        const storageRef = storage().ref(`Foods/${filename}`);
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
        const storageRef = storage().ref(`Foods/${filename}`);
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
        const storageRef = storage().ref(`Foods/${filename}`);
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
        // setUploading(false)
        setName('')
        setDescription('')
        setPricePerItem('')
        setDeliveryTime('')
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setImage5(null)
        setImage6(null)
        setSelectEvent(null)
        // setYourEvents([])
        // console.log('change location ==>', location.latitude);
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
                    }}>Add Foods</Text>
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
                                <Text style={{ color: COLORS.black }}> Food Name </Text>
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
                            <View style={{
                                marginTop: 10,
                                width: 340,
                            }}>
                                <Text style={{ color: COLORS.black }}>Food Type</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: 10,
                                    width: 400,
                                }}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {FoodType ?
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingRight: 50,
                                            }}>
                                                {FoodType.map((item, index) => (
                                                    // console.log(item.menu),
                                                    <TouchableOpacity key={index}
                                                        onPress={() => setFoodTypeIndex(index)}
                                                        style={{
                                                            marginRight: 10,
                                                            borderRadius: 10,
                                                            backgroundColor: foodTypeindex == index ? COLORS.mainlight : COLORS.transparent,
                                                            // paddingHorizontal: 10,
                                                            borderWidth: 1,
                                                            borderColor: foodTypeindex == index ? COLORS.transparent : COLORS.gray2,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            paddingHorizontal: 10,
                                                            height: 40,
                                                            width: 120,
                                                            justifyContent: 'space-between'
                                                        }}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}>
                                                            <Image source={{ uri: item.image }} resizeMode="contain" style={{
                                                                width: 30,
                                                                height: 30,
                                                                borderRadius: 10,
                                                                // padding:15,
                                                                justifyContent: 'center',
                                                            }} />
                                                            <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 5 }}>{item.category}</Text>
                                                        </View>
                                                        {foodTypeindex == index ?
                                                            <Image source={require('../../../assets/add2.png')} resizeMode="contain" style={{
                                                                width: 10,
                                                                height: 10,
                                                                borderRadius: 10,
                                                                padding: 6,
                                                                backgroundColor: COLORS.main,
                                                                // padding:15,
                                                                tintColor: COLORS.black,
                                                                justifyContent: 'center',
                                                            }} />
                                                            :
                                                            <Image source={require('../../../assets/cross.png')} resizeMode="contain" style={{
                                                                width: 10,
                                                                height: 10,
                                                                borderRadius: 10,
                                                                // padding:15,
                                                                tintColor: COLORS.black,
                                                                justifyContent: 'center',
                                                            }} />
                                                        }
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                            :
                                            null}
                                    </ScrollView>
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

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Price Per Item </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={PricePerItem}
                                        placeholderTextColor={COLORS.gray}
                                        placeholder={'Enter Price'}
                                        onChangeText={PricePerItem => setPricePerItem(PricePerItem)
                                        }
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        style={styles.TextInput}
                                        editable={true}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Delivery Time </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={DeliveryTime}
                                        placeholder={'00 : 00'}
                                        onChangeText={DeliveryTime => setDeliveryTime(DeliveryTime)
                                        }
                                        placeholderTextColor={COLORS.gray}
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        style={styles.TextInput}
                                        editable={true}
                                    // onPressIn={showStartTimePicker}
                                    />
                                    <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                        tintColor: COLORS.black,
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            paddingVertical: 20
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>
                                Select Event
                            </Text>
                        </View>
                        <View>
                            <View style={{
                                marginBottom: 10,
                                paddingHorizontal: 20
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: 45,
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                    paddingHorizontal: 20,
                                    backgroundColor: COLORS.light,
                                    borderRadius: 10,
                                }}>
                                    <Image source={require('../../../assets/search.png')} resizeMode='contain' style={{
                                        marginRight: 5
                                    }} />
                                    <TextInput
                                        value={search}
                                        placeholder={'Type of Company'}
                                        onChangeText={search => setSearch(search)
                                        }
                                        style={styles.TextInput}
                                        underlineColor={COLORS.transparent}
                                    />
                                </View>
                            </View>
                            {yourEvents ?
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                    style={{
                                        // marginBottom: 200,
                                    }}>
                                    {yourEvents?.map((item, index) => (
                                        <TouchableOpacity key={index}
                                            // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                                            activeOpacity={0.7}
                                            style={{
                                                backgroundColor: COLORS.white,
                                                elevation: 5,
                                                borderColor: COLORS.light,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                marginLeft: 20,
                                                marginVertical: 20,
                                                width: 270,
                                            }}>
                                            <View>
                                                <Image source={{ uri: item.image1 }} resizeMode='cover'
                                                    style={{
                                                        // width: 270,
                                                        height: 200,
                                                        borderRadius: 10,
                                                    }} />
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                padding: 10,
                                            }}>
                                                <View style={{
                                                    width: '70%',
                                                    paddingRight: 5,
                                                    // backgroundColor:COLORS.gray
                                                }}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: COLORS.black,
                                                    }}>{item.Title}</Text>
                                                </View>
                                                <View style={{
                                                    width: '30%',
                                                    alignItems: 'flex-end'
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
                                                        }}>{item.location.latitude}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => setSelectEvent(index)}
                                                    >
                                                        {selectEvent == index ?
                                                            <Text style={{
                                                                fontSize: 12,
                                                                padding: 5,
                                                                paddingHorizontal: 10,
                                                                backgroundColor: COLORS.green,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: 5,
                                                                color: COLORS.white
                                                            }}>Selected</Text>
                                                            :
                                                            <Text style={{
                                                                fontSize: 12,
                                                                padding: 5,
                                                                paddingHorizontal: 10,
                                                                backgroundColor: COLORS.main,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: 5,
                                                            }}>Select</Text>
                                                        }
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                    {/* <EventItems navigation={navigation} width={270} data={yourEvents} /> */}
                                </ScrollView>
                                :
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: 20
                                }}>
                                    <Text>No events found</Text>
                                </View>
                            }
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 40,
                        }}>
                            {!uploading == true ?
                                <CustomeButton onpress={() => OnHandleEvents()}
                                    title={'Add Food'} color={COLORS.white} />
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

                </ScrollView>
            </View >
        </SafeAreaView>
    )
}

export default MediatorCreateFoodScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
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