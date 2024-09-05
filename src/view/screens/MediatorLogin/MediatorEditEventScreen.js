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
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

// import Geocoder from 'react-native-geocoding';
// import Geocoder from 'react-native-geocoder';
// import Geocoder from 'react-native-geocoder';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// Geocoder.init("AIzaSyBWDLUnBrqcrId_1VThjFVfaFbcOZEA_Uw"); // use a valid API key


const MediatorEditEventScreen = ({ navigation, route }) => {
    const { details } = route.params;
    // console.log('==>',Details.Title);
    const currentuser = useSelector(selectMediatorUser);
    // for events states
    const [name, setName] = useState(details.Title);
    const [description, setDescription] = useState(details.description);
    const [startDate, setStartDate] = useState(details.startDate);
    const [endDate, setEndDate] = useState(details.endDate);
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [startTime, setStartTime] = useState(details.startTime);
    const [endTime, setEndTime] = useState(details.endTime);
    const [location, setLocation] = useState(details.location);
    // console.log('change location ==>', location.latitude);
    const [totalTicketPrice, setTotalTicketPrice] = useState(details.totalTicketPrice);
    const [pin, setPin] = useState({
        latitude: 24.860966,
        longitude: 66.990501,
    });
    const [image1, setImage1] = useState(details.image1);
    const [image2, setImage2] = useState(details.secimageUrl);
    const [image3, setImage3] = useState(details.thirdimageUrl);
    const [image4, setImage4] = useState(details.fourthimageUrl);
    const [image5, setImage5] = useState(details.fifthimageUrl);
    const [image6, setImage6] = useState(details.sixthimageUrl);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [LocationModalVisible, setLocationModalVisible] = useState(false);
    const [actionTriggered, setActionTriggered] = useState(false);
    const [Date, setDate] = useState('');
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [editeTicket, setEditeTicket] = useState();
    // console.log(editeTicket?.ticketTitle);


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
    const [TicketModaldata, setTicketModaldata] = useState(details.TicketModaldata);

    // const [Date, setDate] = useState('');
    // const [Date, setDate] = useState('');


    // edite tickets 
    const [editeTitle, setEditeTitle] = useState(editeTicket?.ticketTitle);
    const [editePrice, setEditePrice] = useState(editeTicket?.pricePerTicket);
    const [editeTotalTickets, setEditeTotalTickets] = useState(editeTicket?.totalTickets);
    const [editeDiscountTickets, setEditeDiscountTickets] = useState(editeTicket?.discountPerTicket);
    const [editeDiscountStartDate, setEditeDiscountStartDate] = useState(editeTicket?.discountStartDate);
    const [editeDiscountEndDate, setEditeDiscountEndDate] = useState(editeTicket?.discountendDate);
    const [editeDiscountStartTime, setEditeDiscountStartTime] = useState(editeTicket?.discountstartTime);
    const [editeDiscountEndTime, setEditeDiscountEndTime] = useState(editeTicket?.discountendTime);
    const [isEditEndDatePickerVisible, setEditEndDatePickerVisibility] = useState(false);
    const [isEditStartDatePickerVisible, setEditStartDatePickerVisibility] = useState(false);
    const [isEditStartTimePickerVisible, setEditStartTimePickerVisibility] = useState(false);
    const [isEditEndTimePickerVisible, setEditEndTimePickerVisibility] = useState(false);
    const [
        defaultAnimationDialog, setDefaultAnimationDialog
    ] = useState(false);



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



    //edit tickets
    const showEditStartDate = () => {
        setEditStartDatePickerVisibility(true);
    };
    const hideEditStartDatePicker = () => {
        setEditStartDatePickerVisibility(false);
    };
    const handleEditConfirmStartDate = date => {
        // console.warn('A date has been picked: ', date);
        setEditeDiscountStartDate(moment(date).format('MM/DD/yy'));
        hideEditStartDatePicker();
    };
    const showEditEndDate = () => {
        setEditEndDatePickerVisibility(true);
    };
    const hideEditEndDatePicker = () => {
        setEditEndDatePickerVisibility(false);
    };
    const handleEditConfirmEndDate = date => {
        // console.warn('A date has been picked: ', date);
        setEditeDiscountEndDate(moment(date).format('MM/DD/yy'));
        hideEditEndDatePicker();
    };
    const showEditStartTime = () => {
        setEditStartTimePickerVisibility(true);
    };
    const hideEditStartTimePicker = () => {
        setEditStartTimePickerVisibility(false);
    };
    const handleEditConfirmStartTime = date => {
        console.warn('A start time has been picked: ',);
        const final = date.toLocaleString('en-UK', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        setEditeDiscountStartTime(final);
        hideEditStartTimePicker();
    };
    const showEditEndTimePicker = () => {
        setEditEndTimePickerVisibility(true);
    };
    const hideEditEndTimePicker = () => {
        setEditEndTimePickerVisibility(false);
    };
    const handleEditConfirmEndTime = date => {
        // console.warn('A date has been picked: ', date);
        const final = date.toLocaleString('en-UK', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        setEditeDiscountEndTime(final);
        hideEditEndTimePicker();
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
            setLocationModalVisible(false);
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
        if (!image1 || !image2 || !image3 || !description || !startDate || !endDate || !startTime || !endTime || !location || !totalTicketPrice || TicketModaldata.length == 0) {
            if (!image1 || !image2 || !image3) {
                ToastAndroid.show("Please select at least three images!", ToastAndroid.SHORT);
            }
            else if (!description) {
                ToastAndroid.show("Please select description first!", ToastAndroid.SHORT);
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
                ToastAndroid.show("Please select total TicketPrice first!", ToastAndroid.SHORT);
            }
            else if (TicketModaldata.length == 0) {
                ToastAndroid.show("Please add you Tickets first!", ToastAndroid.SHORT);
            }
        }
        else {
            OnUpdateEvents();
        }
    }

    const OnUpdateEvents = async () => {
        // console.log('add events here: ',Data);
        setUploading(true)
        try {
            // const imageUrl = await uploadImage();
            var Data = new Object();
            Data.Title = name
            Data.description = description;
            Data.startDate = startDate;
            Data.endDate = endDate;
            Data.startTime = startTime;
            Data.endTime = endTime;
            Data.location = location;
            Data.totalTicketPrice = totalTicketPrice;
            Data.TicketModaldata = TicketModaldata;
            Data.owneruid = currentuser.uid;
            Data.ownerName = currentuser.Name;
            Data.owneremail = currentuser.email;
            Data.uid = details.uid;
            Data.image1 = image1;
            Data.secimageUrl = image2;
            Data.thirdimageUrl = image3;
            Data.fourthimageUrl = image4;
            Data.fifthimageUrl = image5;
            Data.sixthimageUrl = image6;
            // console.log(Data);
            // return;
            const Docres = firestore().collection('Events').doc(Data.uid)
            Docres.update(Data).then(() => {
                ToastAndroid.show('Event Updated successfully', ToastAndroid.SHORT)
                RefereshForm();
                navigation.goBack();
            })
            setUploading(false)
        } catch (error) {
            console.log('error test1', error);
        }
    }
    const openEditModal = (index) => {
        const data = TicketModaldata[index];
        data.index = index
        // console.log(data);
        setEditeTicket(data)
        setLocationModalVisible(!LocationModalVisible)
        setActionTriggered('ACTION_3');
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
        const storageRef = storage().ref(`Users/${filename}`);
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
        setTicketModaldata([])
    }

    const DeleteForm = () => {
        // console.log('delete' , details.uid);
        firestore()
            .collection('Events')
            .doc(details.uid)
            .delete()
            .then(() => {
                RefereshForm();
                setDefaultAnimationDialog(false)
                navigation.goBack();
                console.log('Event deleted!');
                ToastAndroid.show('Event Deleted successfully', ToastAndroid.SHORT)
            });
    }
    const CancleForm = () => {
        // setName('')
        // setDescription('')
        // setStartDate('')
        // setEndDate('')
        // setStartTime('')
        // setEndTime('')
        // setImage1(null)
        // setLocation('')
        // setTotalTicketPrice('')
        // setTicketModaldata([])
        navigation.goBack();
    }

    const UpdatediteTicket = () => {
        const index = editeTicket.index;
        // data.index = index
        // console.log(index);
        // setEditeTicket(data)


        var Data = new Object();
        Data.ticketTitle = editeTitle
        Data.pricePerTicket = editePrice;
        Data.totalTickets = editeTotalTickets;
        // Data.editeTicket = editeTicket;
        Data.discountPerTicket = editeDiscountTickets
        Data.discountStartDate = editeDiscountStartDate;
        Data.discountendDate = editeDiscountEndDate;
        Data.discountstartTime = editeDiscountStartTime;
        Data.discountendTime = editeDiscountEndTime;
        // console.log(Data);

        TicketModaldata[index] = Data;

        // setEditeTicket(Data)
        setLocationModalVisible(false)
    }
    // console.log('===>', TicketModaldata);



    return (
        <SafeAreaView>
            <View style={styles.container}>

                {/* action dialog  */}
                <Dialog
                    onTouchOutside={() => {
                        setDefaultAnimationDialog(false);
                    }}
                    width={0.9}
                    visible={defaultAnimationDialog}
                    rounded
                    actionsBordered
                    dialogAnimation={new ScaleAnimation()}
                    onHardwareBackPress={() => {
                        setDefaultAnimationDialog(false);
                        console.log('onHardwareBackPress');
                        return true;
                    }}
                    dialogTitle={
                        <DialogTitle
                            title="Delete Event?"
                            style={{
                                backgroundColor: '#F7F7F8',
                            }}
                            hasTitleBar={false}
                            align="left"
                        />
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                bordered
                                textStyle={{
                                    color: COLORS.black,
                                    fontSize: 16
                                }}
                                onPress={() => {
                                    setDefaultAnimationDialog(false);
                                }}
                                style={{
                                    backgroundColor: COLORS.light,
                                }}
                                key="button-1"
                            />
                            <DialogButton
                                text="Delete"
                                bordered
                                style={{
                                    backgroundColor: 'red',
                                }}
                                textStyle={{
                                    color: COLORS.white,
                                    fontSize: 16
                                }}
                                onPress={() => {
                                    DeleteForm();
                                }}
                                key="button-2"
                            />
                        </DialogFooter>
                    }>
                    <DialogContent
                        style={{
                            backgroundColor: '#F7F7F8',
                        }}>
                        <Text>
                            Are you sure you want to delete your event ?
                        </Text>
                    </DialogContent>
                </Dialog>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20
                }}>
                    <View style={{
                        flex: 2,
                        marginTop: 20,
                        alignItems: 'flex-end'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.black,
                        }}>Event Details</Text>
                    </View>


                    <View style={{
                        flex: 1,
                        marginTop: 20,
                        alignItems: 'flex-end'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDefaultAnimationDialog(true);
                            }}
                        // onPress={() => DeleteForm()}
                        >
                            <Text style={{
                                color: 'red'
                            }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
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
                                                    onPress={() => openEditModal(index)}
                                                    style={{
                                                        backgroundColor: COLORS.light,
                                                        alignItems: 'center',
                                                        width: 20
                                                    }}>
                                                    <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                                        tintColor: COLORS.black,
                                                        width: 15,
                                                        height: 15,
                                                    }} />
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
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    marginRight: 10
                                }}>
                                    <CustomeButton
                                        onpress={() => CancleForm()}
                                        width={100} title={'Cancel'} color={COLORS.gray} bcolor={COLORS.light} />
                                </View>

                                {!uploading == true ?
                                    <CustomeButton onpress={() => OnHandleEvents()}
                                        width={200} title={'Save Changes'} color={COLORS.black} />
                                    :
                                    <View style={{
                                        backgroundColor: COLORS.main,
                                        width: 200,
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





                    {/* select for tickets edit  */}
                    <DateTimePickerModal
                        isVisible={isEditStartDatePickerVisible}
                        mode="date"
                        // display='spinner'
                        onConfirm={handleEditConfirmStartDate}
                        onCancel={hideEditStartDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isEditEndDatePickerVisible}
                        mode="date"
                        // display='spinner'
                        onConfirm={handleEditConfirmEndDate}
                        onCancel={hideEditEndDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isEditStartTimePickerVisible}
                        mode="time"
                        // display='spinner'
                        onConfirm={handleEditConfirmStartTime}
                        onCancel={hideEditStartTimePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isEditEndTimePickerVisible}
                        mode="time"
                        // display='spinner'
                        onConfirm={handleEditConfirmEndTime}
                        onCancel={hideEditEndTimePicker}
                    />


                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={LocationModalVisible}
                        onRequestClose={() => {
                            setLocationModalVisible(!LocationModalVisible);
                        }}
                    >
                        <View style={styles.modal}>
                            {actionTriggered === 'ACTION_1' ?
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ marginTop: 20 }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 20,
                                            backgroundColor: COLORS.white,
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
                                                        <Text style={{ color: COLORS.black, paddingHorizontal: 20 }}> Price Per Ticket </Text>
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
                                                                    placeholder={'Name'}
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
                                                                    placeholder={'Name'}
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
                                                                    placeholder={'Name'}
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
                                                        {!uploading == true ?
                                                            <CustomeButton
                                                                onpress={() => OnAddTicket()}
                                                                title={'Add Ticket'} color={COLORS.white} />
                                                            :
                                                            <View style={{
                                                                backgroundColor: COLORS.main,
                                                                width: '90%',
                                                                height: 50,
                                                                borderRadius: 10,
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}>
                                                                <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
                                                            </View>
                                                        }

                                                    </View>
                                                </ScrollView>
                                            </View>
                                        </View>


                                    </View>
                                    :
                                    actionTriggered === 'ACTION_3' ?
                                        <View style={styles.modalContainer}>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{
                                                    color: COLORS.black,
                                                    paddingHorizontal: 20,
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                    marginBottom: 10
                                                }}> Edit Tickets </Text>
                                                <View style={{
                                                    marginVertical: 5
                                                }}>
                                                    <Text style={{
                                                        paddingHorizontal: 20
                                                    }}>
                                                        Ticket Title
                                                    </Text>
                                                    <View style={{
                                                        marginTop: 5,
                                                        borderRadius: 5,
                                                        height: 50,
                                                        marginHorizontal: 20,
                                                        backgroundColor: COLORS.white,
                                                        elevation: 5
                                                    }}>
                                                        <Picker
                                                            selectedValue={editeTitle}
                                                            onValueChange={(itemValue, itemIndex) =>
                                                                setEditeTitle(itemValue)
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
                                                <View style={{
                                                    marginVertical: 5
                                                }}>
                                                    <Text style={{
                                                        paddingHorizontal: 20
                                                    }}>
                                                        Price Per Tickets
                                                    </Text>
                                                    <View style={[styles.NumberInput, {
                                                        width: "90%",
                                                        alignSelf: 'center'
                                                    }]}>
                                                        <TextInput
                                                            value={editePrice}
                                                            placeholder={'Price'}
                                                            placeholderTextColor={COLORS.gray}
                                                            onChangeText={editePrice => setEditePrice(editePrice)
                                                            }
                                                            selectionColor={COLORS.black}
                                                            underlineColor={COLORS.transparent}
                                                            activeUnderlineColor={COLORS.white}
                                                            style={styles.TextInput}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{
                                                    marginVertical: 5
                                                }}>
                                                    <Text style={{
                                                        paddingHorizontal: 20
                                                    }}>
                                                        Total Tickets
                                                    </Text>
                                                    <View style={[styles.NumberInput, {
                                                        width: "90%",
                                                        alignSelf: 'center'
                                                    }]}>
                                                        <TextInput
                                                            value={editeTotalTickets}
                                                            placeholder={'Tickets'}
                                                            placeholderTextColor={COLORS.gray}
                                                            onChangeText={editeTotalTickets => setEditeTotalTickets(editeTotalTickets)
                                                            }
                                                            selectionColor={COLORS.black}
                                                            underlineColor={COLORS.transparent}
                                                            activeUnderlineColor={COLORS.white}
                                                            style={styles.TextInput}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{
                                                    marginVertical: 5
                                                }}>
                                                    <Text style={{
                                                        paddingHorizontal: 20
                                                    }}>
                                                        Discount Per Tickets
                                                    </Text>
                                                    <View style={[styles.NumberInput, {
                                                        width: "90%",
                                                        alignSelf: 'center'
                                                    }]}>
                                                        <TextInput
                                                            value={editeDiscountTickets}
                                                            placeholder={'Discount'}
                                                            placeholderTextColor={COLORS.gray}
                                                            onChangeText={editeDiscountTickets => setEditeDiscountTickets(editeDiscountTickets)
                                                            }
                                                            selectionColor={COLORS.black}
                                                            underlineColor={COLORS.transparent}
                                                            activeUnderlineColor={COLORS.white}
                                                            style={styles.TextInput}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginHorizontal: 20,
                                                    width: '100%'
                                                }}>
                                                    <View style={{ marginTop: 10, width: '45%', }}>
                                                        <Text style={{ color: COLORS.gray }}> Discount Start Date </Text>
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
                                                                value={editeDiscountStartDate}
                                                                placeholderTextColor={COLORS.gray}
                                                                // error={dateOfBirthError}
                                                                onChangeText={setEditeDiscountStartDate}
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                // activeOutlineColor={COLORS.fontColor}
                                                                activeUnderlineColor={COLORS.white}
                                                                // onFocus={() => { setDateOfBirthError(false) }}
                                                                editable={true}
                                                                onPressIn={showEditStartDate}
                                                            />
                                                            <Image source={require('../../../assets/events.png')} resizeMode='contain' style={{
                                                                tintColor: COLORS.black,
                                                                width: 15,
                                                                height: 15,
                                                            }} />
                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: 10, width: '45%' }}>
                                                        <Text style={{ color: COLORS.gray }}>Discount End Date </Text>
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
                                                                value={editeDiscountEndDate}
                                                                placeholderTextColor={COLORS.gray}
                                                                // error={dateOfBirthError}
                                                                onChangeText={setEditeDiscountEndDate}
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                // activeOutlineColor={COLORS.fontColor}
                                                                activeUnderlineColor={COLORS.white}
                                                                // onFocus={() => { setDateOfBirthError(false) }}
                                                                editable={true}
                                                                onPressIn={showEditEndDate}
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
                                                        <Text style={{ color: COLORS.gray }}> Discount Start Time </Text>
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
                                                                placeholder={'Start Time'}
                                                                value={editeDiscountStartTime}
                                                                placeholderTextColor={COLORS.gray}
                                                                // error={dateOfBirthError}
                                                                onChangeText={setEditeDiscountStartTime}
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                // activeOutlineColor={COLORS.fontColor}
                                                                activeUnderlineColor={COLORS.white}
                                                                // onFocus={() => { setDateOfBirthError(false) }}
                                                                editable={true}
                                                                onPressIn={showEditStartTime}
                                                            />
                                                            <Image source={require('../../../assets/events.png')} resizeMode='contain' style={{
                                                                tintColor: COLORS.black,
                                                                width: 15,
                                                                height: 15,
                                                            }} />
                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: 10, width: '45%' }}>
                                                        <Text style={{ color: COLORS.gray }}>Discount End Time </Text>
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
                                                                value={editeDiscountEndTime}
                                                                placeholderTextColor={COLORS.gray}
                                                                // error={dateOfBirthError}
                                                                onChangeText={setEditeDiscountEndTime}
                                                                selectionColor={COLORS.black}
                                                                underlineColor={COLORS.white}
                                                                // activeOutlineColor={COLORS.fontColor}
                                                                activeUnderlineColor={COLORS.white}
                                                                // onFocus={() => { setDateOfBirthError(false) }}
                                                                editable={true}
                                                                onPressIn={showEditEndTimePicker}
                                                            />
                                                            <Image source={require('../../../assets/events.png')} resizeMode='contain' style={{
                                                                tintColor: COLORS.black,
                                                                width: 15,
                                                                height: 15,
                                                            }} />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "row-reverse", margin: 10 }}>
                                                    <TouchableOpacity style={{ ...styles.actions, backgroundColor: COLORS.light }}
                                                        onPress={() => {
                                                            setLocationModalVisible(false);
                                                        }}>
                                                        <Text style={[styles.actionText, {
                                                            color: COLORS.black
                                                        }]}>No</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => UpdatediteTicket()}
                                                        style={{ ...styles.actions, backgroundColor: COLORS.main }}>
                                                        <Text style={styles.actionText}>Yes</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        actionTriggered == 'ACTION_4' ?
                                            <View style={[styles.modalContainer, {
                                                // width:0,
                                                // height:0,
                                            }]}>
                                                <View style={styles.modalHeader}>
                                                    <Text style={styles.title}>Delete Your Event</Text>
                                                    <View style={styles.divider}></View>
                                                </View>
                                                <View style={styles.modalBody}>
                                                    <Text style={styles.bodyText}>Are you sure you want to delete your event ?</Text>
                                                </View>
                                                <View style={styles.modalFooter}>
                                                    <View style={styles.divider}></View>
                                                    <View style={{ flexDirection: "row-reverse", margin: 10 }}>
                                                        <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#db2828" }}
                                                            onPress={() => {
                                                                setModalVisible(!modalVisible);
                                                            }}>
                                                            <Text style={styles.actionText}>No</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#21ba45" }}>
                                                            <Text style={styles.actionText}>Yes</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            : null}
                        </View>
                    </Modal>

                </ScrollView>
            </View >
        </SafeAreaView >
    )
}

export default MediatorEditEventScreen

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





    // test 
    modal: {
        backgroundColor: "#00000099",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: "#f9fafb",
        width: "100%",
        height: '100%',
        borderRadius: 5
    },
    modalHeader: {

    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 15,
        color: "#000"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "lightgray"
    },
    modalBody: {
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    modalFooter: {
    },
    actions: {
        borderRadius: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    actionText: {
        color: "#fff"
    }
})