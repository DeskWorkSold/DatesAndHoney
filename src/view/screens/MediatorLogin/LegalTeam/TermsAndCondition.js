import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Modal, ToastAndroid } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import COLORS from '../../../../consts/Colors';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomeButton from '../../../components/CustomeButton';
import Twitter from '../../../../assets/Twitter.svg';
import Facebook from '../../../../assets/Facebook.svg';
import WhatsApp from '../../../../assets/WhatsApp.svg';
import Reddit from '../../../../assets/Reddit.svg';
import Linkedin from '../../../../assets/Linkedin.svg';
import TikTok from '../../../../assets/TikTok.svg';
import CopyLink from '../../../../assets/copy.svg';
import Edite from '../../../../assets/edit.svg'
import Send from '../../../../assets/send.svg'
import SVGImg1 from '../../../../assets/arrowleft.svg';
import SVGImg2 from '../../../../assets/filtermenu.svg';
import RightArrow from '../../../../assets/rightArrow.svg';

import { useState } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import YourClinets from '../../../components/YourClinets';
import ManageStaffCard from '../../../components/ManageStaffCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import Loader from '../../../components/Loader';

const { width, height } = Dimensions.get("window");

const data = [
    {
        id: 1,
        name: 'For Dating Users',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 2,
        name: 'For Staff',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 3,
        name: 'For Concierges',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 4,
        name: 'For Events',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 5,
        name: 'For Front Door POS',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 6,
        name: 'For Profile Optimizer',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 7,
        name: 'For Influencers',
        screenName: 'SubmitTermAndCondition',
    }, {
        id: 8,
        name: 'For Social Media Manager',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 9,
        name: 'For Event Coordinator',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 10,
        name: 'For In house talent agency',
        screenName: 'SubmitTermAndCondition',
    },
    {
        id: 11,
        name: 'Content Producer',
        screenName: 'SubmitTermAndCondition',
    }
]

const TermsAndCondition = ({ navigation }) => {
    const [emailAddress, setEmailAddress] = useState(null);
    const [customeCode, setCustomeCode] = useState(null);
    const [modal, setModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [UserDetails, setUserDetails] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectUser, setSelectUser] = useState(null);
    const [AdvFilter, setAdvFilter] = useState(false);
    const CurrentUser = auth().currentUser.uid;
    // const [data, setData] = useState(null);
    const mediator = useSelector(selectMediatorUser);

    // console.log(mediator.AccessGiven);

    const ShowUserDetails = (item) => {
        setUserDetails(item)
        if (UserDetails) {
            setModal(true)
        }
        else {
            setModal(false)
        }
    }

    const handleRemoval = (index, item) => {
        const newSelectedItems = selectedItems.filter((i) => i !== item);
        setSelectedItems(newSelectedItems);
        // console.log(selectedItems);
    };

    const onSelectUser = (index, item) => {
        // console.log(index);
        setSelectUser(index)
        const newSelectedItems = [...selectedItems, item];
        setSelectedItems(newSelectedItems);
        // console.log(selectedItems);
    };

    const RemoveUser = async () => {
        if (selectedItems.length != 0) {
            // console.log(selectedItems);
            setUploading(true)
            // const combinedArray = mediator.AccessGiven.concat(selectedItems);

            const uniqueArray = mediator.AccessGiven.filter((value) => !selectedItems.includes(value));

            // console.log(uniqueArray);
            // return
            selectedItems.map((j, i) => {
                firestore()
                    .collection('Users').doc(j.uid).update({
                        'userDetails.AccessGiven': null,
                        'userDetails.PanelAccess': false,
                    })
                    .then(() => {
                        // console.log('Access given to user');
                    });
            })
            // return
            await firestore()
                .collection('Users').doc(CurrentUser).update({
                    AccessGiven: uniqueArray,
                })
                .then(() => {
                    ToastAndroid.show("User remove from your list!", ToastAndroid.SHORT);
                    // setUploadingTwo(false)
                    setUploading(false)
                });
        }
        else {

        }
    };

    const SelectAll = () => {
        // const newSelectedItems = [...selectedItems, item];
        setSelectedItems(mediator.AccessGiven);
    }
    const UnSelectAll = () => {
        setSelectedItems([]);
    }


    // useEffect(() => {

    // }, [])

    return (
        <View style={{
            // paddingHorizontal:20
            flex: 1,
            backgroundColor: COLORS.white,
        }}>
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                backgroundColor: COLORS.white,
                alignItems: 'center',
            }}>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: COLORS.black,
                        fontWeight: 'bold',
                    }}>Write Terms and Conditions</Text>
                </View>
            </View>


            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    // flex: 1,
                    // backgroundColor:COLORS.white,
                    marginBottom: 60,
                    marginTop: 10,
                }}>
                    {data?.length > 0 ?
                        <>
                            {data?.map((item, index) => (
                                <View
                                    key={index}
                                    style={{
                                        paddingVertical: 10,
                                        backgroundColor: COLORS.white,
                                        width: width / 1.1,
                                        elevation: 6,
                                        marginBottom: 10,
                                        flexDirection: 'row',
                                        alignSelf: 'center',
                                        paddingHorizontal: 20,
                                        paddingVertical: 20,
                                        borderRadius: 10,
                                    }}>
                                    <View style={{
                                        paddingRight: 5,
                                        flex: 2,
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: COLORS.black,
                                        }}>{item?.name}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(item.screenName, { Title: item?.name , Id : item?.id })}
                                        style={{
                                            alignSelf: 'center',
                                            // backgroundColor:COLORS.main,
                                            flex: 1,
                                            alignItems: 'flex-end'
                                        }}>
                                        <RightArrow width={20} />
                                    </TouchableOpacity>

                                </View>
                            ))}
                        </>
                        :
                        <View style={{
                            padding: 20,
                            alignSelf: 'center'
                        }}>
                            <Text>No data!</Text>
                        </View>
                    }
                </View>
            </ScrollView>

            <Loader modal={uploading} uploading={uploading} />
        </View>
    )
}

export default TermsAndCondition


const styles = StyleSheet.create({
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        // top:'60%',
        // backgroundColor:COLORS.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: 'red',
        fontSize: 12,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 45,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 5
    },
})