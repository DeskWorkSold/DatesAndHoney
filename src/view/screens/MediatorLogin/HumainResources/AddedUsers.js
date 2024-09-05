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
import Gold from '../../../../assets/gold.svg';

import { useState } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import YourClinets from '../../../components/YourClinets';
import ManageStaffCard from '../../../components/ManageStaffCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import Loader from '../../../components/Loader';

const { width, height } = Dimensions.get("window");

// const data = [
//     {
//         id: 1,
//         name: 'Jan',
//         img: require('../../../../assets/profilepic.png'),
//         yourEarning: 380,
//         ClientEarning: 15,
//         type: 'Diamond'
//     },
//     {
//         id: 2,
//         name: 'Roy',
//         img: require('../../../../assets/profilepic.png'),
//         yourEarning: 380,
//         ClientEarning: 15,
//         type: 'Diamond'
//     },
//     {
//         id: 3,
//         name: 'Mendela',
//         img: require('../../../../assets/profilepic.png'),
//         yourEarning: 380,
//         ClientEarning: 390,
//         type: 'Gold'
//     },
//     {
//         id: 4,
//         name: 'Sam',
//         img: require('../../../../assets/profilepic.png'),
//         yourEarning: 380,
//         ClientEarning: 390,
//         type: 'Gold'
//     },
//     {
//         id: 5,
//         name: 'Arun',
//         img: require('../../../../assets/profilepic.png'),
//         yourEarning: 380,
//         ClientEarning: 390,
//         type: 'Gold'
//     }
// ]

const AddedUsers = ({ navigation }) => {
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
            backgroundColor: COLORS.light,
            marginBottom: 30,
        }}>
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: 'row',
                backgroundColor: COLORS.white,
                alignItems: 'center',
                // paddingHorizontal: 20,
            }}>
                <TouchableOpacity
                    onPress={() => setAdvFilter(!AdvFilter)}
                    style={{
                        // elevation: 90,
                        flex: 1,
                    }}>
                    <SVGImg2 width={46} height={46} />
                </TouchableOpacity>
                <View style={{
                    flex: 2,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: COLORS.black,
                        fontWeight: 'bold',
                    }}>Manage Staff</Text>
                </View>
                <View style={{
                    flex: 1,
                }}>
                </View>
            </View>



            {AdvFilter &&
                <View style={{
                    backgroundColor: COLORS.white,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingVertical: 5,
                    paddingHorizontal: 20
                }}>
                    <TouchableOpacity
                        onPress={() => UnSelectAll()}
                        style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 5,
                            backgroundColor: COLORS.pink,
                            marginRight: 5,
                        }}>
                        <Text style={{
                            color: COLORS.white,
                            fontSize: 12,
                        }}>Unselect all</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => SelectAll()}
                        style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 5,
                            backgroundColor: COLORS.black,
                            marginRight: 5,
                        }}>
                        <Text style={{
                            color: COLORS.white,
                            fontSize: 12,
                        }}>Select all</Text>
                    </TouchableOpacity>
                </View>
            }


            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    // marginTop: 5,
                    flex: 1,
                    // backgroundColor:COLORS.white,
                }}>
                    {mediator?.AccessGiven?.length > 0 ?
                        <>
                            {mediator?.AccessGiven.map((item, index) => (
                                <View
                                    key={index}
                                    style={{
                                        paddingVertical: 20,
                                        backgroundColor: COLORS.white,
                                        width: width,
                                        marginBottom: 5,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                    }}>
                                    <View style={{
                                        borderWidth: 2,
                                        borderRadius: 50,
                                        borderColor: COLORS.main,
                                        alignItems: 'center',
                                    }}>
                                        <Image source={{ uri: item?.image1 }} resizeMode='cover' style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 50,
                                        }} />
                                    </View>
                                    <View style={{
                                        width: '50%',
                                        paddingHorizontal: 10,
                                    }}>
                                        <View style={{
                                            paddingRight: 5,
                                        }}>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: '500',
                                                color: COLORS.black
                                            }}>{item?.Name}</Text>
                                        </View>
                                        <View
                                            style={{
                                                marginVertical: 5,
                                                paddingVertical: 5,
                                                backgroundColor: COLORS?.light,
                                                alignSelf: 'flex-start',
                                                paddingHorizontal: 5
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 12,
                                                // textAlign: 'center'
                                            }}>{item?.MediatorType}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        width: '30%',
                                        // backgroundColor: COLORS.main,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <RadioButton
                                            value={selectUser}
                                            status={selectedItems?.includes(item) ? 'checked' : 'unchecked'}
                                            // {selectedItems.includes(item) ? 
                                            // }
                                            onPress={() =>
                                                selectedItems?.includes(item) ?
                                                    handleRemoval(index, item)
                                                    :
                                                    onSelectUser(index, item)
                                            }
                                            color={COLORS.black}
                                            uncheckedColor={COLORS.black}
                                        />
                                        <TouchableOpacity
                                            onPress={() => ShowUserDetails(item)}
                                            style={{
                                                paddingHorizontal: 10,
                                                paddingVertical: 5,
                                                borderRadius: 5,
                                                backgroundColor: COLORS.main,
                                                marginRight: 5,
                                            }}>
                                            <Text style={{
                                                color: COLORS.white,
                                                fontSize: 12,
                                            }}>Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </>
                        :
                        <View style={{
                            padding: 20,
                            alignSelf: 'center'
                        }}>
                            <Text>No Mediator founds!</Text>
                        </View>
                    }
                    {selectedItems.length != 0 &&
                        <View style={{
                            alignSelf: 'center'
                        }}>
                            {uploading ?
                                <View style={{
                                    backgroundColor: COLORS.pink,
                                    width: 350,
                                    height: 50,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: COLORS.transparent
                                }}>
                                    <Text style={{ color: COLORS.white }}>Please wait...</Text>
                                </View>
                                :
                                <CustomeButton title={'Remove'} bcolor={COLORS.pink} color={COLORS.white} onpress={() => RemoveUser()} />
                            }
                        </View>
                    }
                </View>
            </ScrollView>


            <Modal
                animationType="slide"
                transparent={false}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}
            >
                <View style={{
                    height: height,
                    backgroundColor: COLORS.white,
                    padding: 20,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={() => setModal(false)}>
                            <Image source={require('../../../../assets/cancle.png')} resizeMode='contain'
                                style={{
                                    width: 15,
                                    height: 15,
                                    fontWeight: 'bold',
                                    tintColor: COLORS.black,
                                }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        // backgroundColor: COLORS.gray,
                        //   paddingHorizontal: 20,
                        alignItems: 'stretch',
                        paddingBottom: 20
                    }}>
                        <View>
                            <View style={{
                                borderWidth: 3,
                                borderColor: COLORS.main,
                                borderRadius: 100
                            }}>
                                <Image source={{ uri: UserDetails?.image1 }} resizeMode='cover' style={{
                                    borderRadius: 80,
                                    width: 100,
                                    height: 100
                                }} />
                            </View>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            paddingLeft: 20
                        }}>
                            <View style={{
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>
                                    {UserDetails?.Name &&
                                        UserDetails?.Name?.charAt(0).toUpperCase() + UserDetails?.Name.slice(1)
                                    }
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                backgroundColor: COLORS.light,
                                borderRadius: 5,
                                // width: '100%',
                                padding: 5,
                                marginTop: 5,
                            }}>
                                <Text style={{ color: COLORS.black, fontSize: 13 }}>{UserDetails?.MediatorType}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ marginTop: 0 }}>
                            <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Name </Text>
                            <View style={styles.NumberInput}>
                                <Text>{UserDetails?.Name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ marginTop: 0 }}>
                            <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Email </Text>
                            <View style={styles.NumberInput}>
                                <Text>{UserDetails?.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ marginTop: 0 }}>
                            <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Phone Number </Text>
                            <View style={styles.NumberInput}>
                                <Text>{UserDetails?.Phonenumber}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ marginTop: 0 }}>
                            <Text style={{ color: COLORS.black, paddingBottom: 5 }}> About </Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 10,
                                height: 75,
                                width: width / 1.2,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                elevation: 5
                            }}>
                                <Text>{UserDetails?.Bio}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </Modal>


            <Loader modal={uploading} uploading={uploading} />
        </View>
    )
}

export default AddedUsers


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