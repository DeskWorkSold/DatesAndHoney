import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, ProgressBarAndroid, ProgressBarIOS, Platform } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors'
import { useState } from 'react';
import CustomeButton from '../../../components/CustomeButton';
import { logout, mediatorLogin, selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Path from '../../../../assets/Path.svg';
import SVGImage from '../../../../assets/notify.svg';
import Tik from '../../../../assets/tik.svg';
import MyIcon from '../../../../assets/tik.svg';
import Facebook from '../../../../assets/Facebook.svg';
import Linkdin from '../../../../assets/Linkedin.svg';
import Twitter from '../../../../assets/Twitter.svg';
import Insta from '../../../../assets/insta.svg';
import Edite from '../../../../assets/edit2.svg';
import { RadioButton, TextInput } from 'react-native-paper';
import Loader from '../../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const allDays = [
    {
        id: 1,
        name: 'Week',
    },
    {
        id: 2,
        name: 'Daily',
    },
    {
        id: 3,
        name: 'Always',
    },
]

const ProfileScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(0.5);
    const [showPoppup, setShowPoppup] = useState(false);
    const [showPoppupTwo, setShowPoppupTwo] = useState(false);
    const mediator = useSelector(selectMediatorUser);
    const [name, setName] = useState(mediator?.userDetails?.Name);
    const [nameEdit, setNameEdit] = useState(false);
    const [email, setEmail] = useState(mediator?.userDetails?.email);
    const [emailEdit, setEmailEdit] = useState(false);
    const [number, setNumber] = useState(mediator?.userDetails?.Phonenumber ? mediator?.userDetails?.Phonenumber : null);
    const [numberEdit, setNumberEdit] = useState(false);
    const [about, setabout] = useState(mediator?.userDetails?.Bio);
    const [location, setLocation] = useState();
    const [locationEdit, setLocationEdit] = useState();
    const [duration, setDuration] = useState();
    const [editSocialAcc, setEditSocialAcc] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [userName, setUserName] = useState(editSocialAcc?.Username);
    const [password, setPassword] = useState(editSocialAcc?.Password);
    const dispatch = useDispatch();
    const [secure, setSecure] = useState(false); // set initial state to false
    const [
        defaultAnimationDialog, setDefaultAnimationDialog
    ] = useState(false);


    // console.log(editSocialAcc?.AccoutType);
    const onShowEditPanel = (item) => {
        console.log(item);
        setEditSocialAcc(item)
        setShowPoppup(true)
    }

    // console.log(userName);

    const OnLogOut = () => {
        // navigation.navigate('LoginScreen')
        try {
            auth()
                .signOut()
                .then(() =>
                    console.log('User signed out!'),
                    ToastAndroid.show('Signed out!', ToastAndroid.SHORT),
                    //   navigation.navigate('LoginScreen')
                );
            // const userData = await AsyncStorage.getItem('session');
            //   await AsyncStorage.removeItem('CurrentUserData')
            //   await AsyncStorage.removeItem('CurrentUser')
            dispatch(logout());
        }
        catch (exception) {
            return false;
        }
    }

    const OnSubmitEditAccount = async () => {
        const SocialAccounts = mediator?.SocialAccounts
        if (!editSocialAcc || !userName || userName == '' || !password || password == '') {
            if (!userName || userName == '') {
                ToastAndroid.show('Please enter new username!', ToastAndroid.SHORT)
            }
            else if (!password || password == '') {
                ToastAndroid.show('Please enter new password!', ToastAndroid.SHORT)
            }
            // else if ()
            ToastAndroid.show('Network issue please try again later!', ToastAndroid.SHORT)
        }
        else {
            setUploading(true)
            let arry = [];
            SocialAccounts.map((item) => {
                if (item?.id != editSocialAcc?.id) {
                    arry.push(item)
                }
                else {
                    let data = new Object;
                    data.AccoutType = editSocialAcc?.AccoutType;
                    data.Password = password;
                    data.Username = userName;
                    data.id = editSocialAcc?.id;
                    arry.push(data)
                }
            })
            await firestore()
                .collection('Users').doc(mediator?.userDetails?.uid).update({
                    SocialAccounts: arry,
                })
                .then(() => {
                    ToastAndroid.show(`Your ${editSocialAcc?.AccoutType} account updated successfully`, ToastAndroid.SHORT);
                    setUploading(false)
                    setEditSocialAcc(null)
                    setUserName(null)
                    setPassword(null)
                    setShowPoppup(false)
                });
            // console.log(arry);
        }
        // console.log(SocialAccounts);
    }

    const DeleteForm = () => {
        const SocialAccounts = mediator?.SocialAccounts

        if (!editSocialAcc || editSocialAcc == '') {
            ToastAndroid.show('Network issue please try again later!', ToastAndroid.SHORT)
        }
        else {
            // setUploading(true)
            let arry = [];
            SocialAccounts.map((item) => {
                if (item?.id != editSocialAcc?.id) {
                    arry.push(item)
                }
            })
            firestore()
                .collection('Users').doc(mediator?.userDetails?.uid).update({
                    SocialAccounts: arry,
                })
                .then(() => {
                    ToastAndroid.show(`Your ${editSocialAcc?.AccoutType} account deleted successfully`, ToastAndroid.SHORT);
                    setUploading(false)
                    setEditSocialAcc(null)
                    setUserName(null)
                    setPassword(null)
                    setShowPoppup(false)
                    setShowPoppupTwo(false)
                });
        }
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>

                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={{
                        marginBottom: 200,
                        backgroundColor: COLORS.white,
                    }}>
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
                                    <Image source={{ uri: mediator.userDetails.image1 }} resizeMode='cover' style={{
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
                                        {mediator?.userDetails?.Name &&
                                            mediator?.userDetails?.Name?.charAt(0).toUpperCase() + mediator?.userDetails?.Name.slice(1)
                                        }
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: COLORS.light,
                                    borderRadius: 5,
                                    // width: '100%',
                                    padding: 5,
                                    paddingHorizontal: 10,
                                    marginTop: 5,
                                }}>
                                    <Text style={{ color: COLORS.black, fontSize: 13 }}>Agency</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 0 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        // aria-disabled={true}
                                        editable={nameEdit}
                                        value={name}
                                        placeholder={'Enter your name'}
                                        keyboardType='email-address'
                                        onChangeText={name => setName(name)
                                        }
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setNameEdit(!nameEdit)}>
                                        <Image source={require('../../../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 15,
                                                height: 15,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Email </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        // aria-disabled={true}
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        editable={emailEdit}
                                        value={email}
                                        placeholder={'Enter your name'}
                                        keyboardType='email-address'
                                        onChangeText={name => setEmail(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setEmailEdit(!emailEdit)}>
                                        <Image source={require('../../../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 15,
                                                height: 15,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Location </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        // aria-disabled={true}
                                        editable={locationEdit}
                                        // editable={locationEdit}
                                        value={location}
                                        placeholder={'Enter your name'}
                                        keyboardType='email-address'
                                        onChangeText={name => setLocation(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setLocationEdit(!locationEdit)}>
                                        <Image source={require('../../../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 15,
                                                height: 15,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Phone No </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        // aria-disabled={true}
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        editable={numberEdit}
                                        value={number}
                                        placeholder={'Enter your name'}
                                        keyboardType='email-address'
                                        onChangeText={name => setNumber(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setNumberEdit(!numberEdit)}>
                                        <Image source={require('../../../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 15,
                                                height: 15,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            paddingHorizontal: 10,
                            marginTop: 20
                        }}>
                            <Text style={{
                                fontSize: 13,
                                color: COLORS.black,
                            }}>About</Text>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray,
                            }}>(anything about you that you would like to share with our marketing team or a little about you)</Text>
                        </View>

                        <View style={{
                            width: width / 1.2,
                            alignSelf: 'center',
                            borderRadius: 10,
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            padding: 10,
                            marginVertical: 20
                        }}>
                            <Text style={{
                                fontSize: 13,
                                color: COLORS.gray
                            }}>Lorem ipsum dolor sit amet, ConnectEDU advising elite. Rut rum in Masada unique consequent. Tells Eros Ohio Del donec cliquey in. Get caucus get dolor, sit nun. Odio Del donec cliquey in. Get caucus get dolor, sit nun Ohio Del done </Text>
                        </View>

                        <View>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: COLORS.black,
                                fontSize: 16
                            }}>Let us post on your behaf</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            paddingVertical: 20
                        }}>
                            <View style={{
                                marginRight: 5
                            }}>
                                <SVGImage width={20} height={20} />
                            </View>
                            <Text style={{
                                width: width / 1.2,
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                When given this permission we post at times people are on there most and when we post on all our influencers stories at the same time you have much high chance of your flowers / all followers signing up through your link, so this is beneficial we will never post a post we will only post in your story if this permission is given.
                            </Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginHorizontal: 20,
                            alignItems: 'center',
                            alignSelf: 'center',
                            elevation: 6
                        }}>

                            {allDays.map((Item, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    key={index}
                                    onPress={() => setDuration(index)}
                                    style={{
                                        width: '31%',
                                        paddingRight: 10,
                                        marginRight: 5,
                                        marginBottom: 10,
                                        // height: 40,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        backgroundColor: COLORS.white,
                                        elevation: 6,
                                        borderRadius: 5,
                                        // marginRight: 5,
                                        paddingHorizontal: 10,
                                        // paddingVertical: 5,
                                    }}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLORS.black }}>{Item.name}</Text>
                                    </View>
                                    <View style={{ paddingLeft: 5 }}>
                                        <RadioButton
                                            value={duration}
                                            status={duration === index ? 'checked' : 'unchecked'}
                                            onPress={() => setDuration('Not Public')}
                                            color={COLORS.main}
                                            uncheckedColor={COLORS.main}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}

                        </View>

                        <View style={{
                            alignSelf: 'center',
                            marginVertical: 10,
                        }}>
                            <CustomeButton width={width / 1.2} title={'Allow to post'} />
                        </View>

                        <View style={{
                            alignSelf: 'center',
                            marginBottom: 10,
                        }}>
                            <CustomeButton width={width / 1.2} bcolor={COLORS.light} title={'Stock Content'} onpress={() => navigation.navigate('StockContent')} />
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold'
                                }}>Social media handles</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AddSocialMediaAccount')}
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    backgroundColor: COLORS.main,
                                    borderRadius: 5,
                                }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: COLORS.black
                                }}>Add Handle</Text>
                            </TouchableOpacity>
                        </View>

                        {mediator?.SocialAccounts ?
                            <>
                                {mediator?.SocialAccounts.map((item, index) => (
                                    <View key={index} style={{
                                        marginTop: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: width / 1.2,
                                        alignSelf: 'center',
                                        justifyContent: 'space-between',
                                        backgroundColor: COLORS.white,
                                        elevation: 5,
                                        borderRadius: 5,
                                        paddingVertical: 15,
                                        paddingHorizontal: 20,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <View style={{
                                                marginRight: 5
                                            }}>
                                                {item.AccoutType == "Facebook" &&
                                                    <Facebook width={20} height={20} />
                                                }
                                                {item.AccoutType == "Twitter" &&
                                                    <Twitter width={20} height={20} />
                                                }
                                                {item.AccoutType == "Instagram" &&
                                                    <Insta width={20} height={20} />
                                                }
                                                {item.AccoutType == "Linkdin" &&
                                                    <Linkdin width={20} height={20} />
                                                }
                                            </View>
                                            <View>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: COLORS.gray
                                                }}>Signed in as: </Text>
                                            </View>
                                            <View>
                                                <Text style={{
                                                    fontSize: 13,
                                                    color: COLORS.black
                                                }}>{item.Username}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => onShowEditPanel(item)}>
                                            <Edite width={20} height={20} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </>
                            :
                            <View style={{
                                paddingHorizontal: 10,
                                paddingVertical: 20
                            }}>
                                <Text style={{
                                    fontSizeL: 12,
                                    color: COLORS.black
                                }}>
                                    No Social account added!
                                </Text>
                            </View>
                        }

                        {/* 

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: width / 1.2,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            borderRadius: 5,
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    marginRight: 5
                                }}>
                                    <Linkdin width={20} height={20} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.gray
                                    }}>Signed in as: </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 13,
                                        color: COLORS.black
                                    }}>Username</Text>
                                </View>
                            </View>
                            <View>
                                <Edite width={20} height={20} />
                            </View>
                        </View>


                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: width / 1.2,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            borderRadius: 5,
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    marginRight: 5
                                }}>
                                    <Twitter width={20} height={20} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.gray
                                    }}>Signed in as: </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 13,
                                        color: COLORS.black
                                    }}>Username</Text>
                                </View>
                            </View>
                            <View>
                                <Edite width={20} height={20} />
                            </View>
                        </View>

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: width / 1.2,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            borderRadius: 5,
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    marginRight: 5
                                }}>
                                    <Insta width={20} height={20} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.gray
                                    }}>Signed in as: </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 13,
                                        color: COLORS.black
                                    }}>Username</Text>
                                </View>
                            </View>
                            <View>
                                <Edite width={20} height={20} />
                            </View>
                        </View> */}





                        <View style={{
                            marginTop: 40,
                            alignSelf: 'center'
                        }}>
                            <CustomeButton width={width / 1.2} title={'Log out'} bcolor={COLORS.transparent} border={COLORS.gray} onpress={() => OnLogOut()} />
                        </View>


                        {/* <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 20 }} >
                                <TouchableOpacity style={styles.NumberInput} onPress={() => OnLogOut()}>
                                    <View>
                                        <Text style={{ color: COLORS.black }}>Log Out</Text>
                                    </View>
                                    <View>
                                        <Path width={15} height={15} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View> */}


                    </View>
                </ScrollView>



                <Modal
                    animationType="slide"
                    // transparent={true}
                    visible={showPoppup}
                    onRequestClose={() => {
                        setShowPoppup(!showPoppup);
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        // alignItems: 'center',
                        backgroundColor: COLORS.gray
                    }}>
                        {editSocialAcc ?
                            <>
                                <View style={{
                                    // marginBottom: 200,
                                    height: '70%',
                                    backgroundColor: COLORS.white,
                                }}>
                                    <View style={{
                                        paddingHorizontal: 20,
                                        paddingTop: 20,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => setShowPoppup(false)}
                                            style={{ flex: 1 }}>
                                            <Image source={require('../../../../assets/arrowleft.png')} resizeMode='contain' style={{
                                                width: 20,
                                                height: 20
                                            }} />
                                        </TouchableOpacity>
                                        <Text style={{
                                            flex: 1,
                                            fontSize: 16,
                                            color: COLORS.black,
                                            fontWeight: 'bold'
                                        }}>
                                            Handle Details
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => setShowPoppupTwo(true)}
                                            style={{
                                                flex: 1,
                                                alignItems: 'flex-end'
                                            }}>
                                            <Text style={{
                                                color: 'red',
                                                borderBottomColor: 'red',
                                                borderBottomWidth: 1,
                                                width: '42%',
                                                textAlign: 'center'
                                            }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{
                                        paddingVertical: 20,
                                        marginHorizontal: 20,
                                    }}>
                                        <View style={{
                                            paddingBottom: 5
                                        }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>Platforms</Text>
                                        </View>
                                        <View style={{
                                            alignSelf: 'center',
                                            height: 55,
                                            width: '100%',
                                            backgroundColor: COLORS.white,
                                            borderRadius: 10,
                                            paddingHorizontal: 20,
                                            alignItems: 'center',
                                            elevation: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <View style={{
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                            }}>

                                                {editSocialAcc?.AccoutType == "Facebook" &&
                                                    <Facebook width={20} height={20} />
                                                }
                                                {editSocialAcc?.AccoutType == "Twitter" &&
                                                    <Twitter width={20} height={20} />
                                                }
                                                {editSocialAcc?.AccoutType == "Instagram" &&
                                                    <Insta width={20} height={20} />
                                                }
                                                {editSocialAcc?.AccoutType == "Linkdin" &&
                                                    <Linkdin width={20} height={20} />
                                                }
                                                <View style={{
                                                    backgroundColor: COLORS.white,
                                                    width: '90%',
                                                    paddingLeft: 5
                                                }}>
                                                    <Text style={{
                                                        color: COLORS.gray
                                                    }}>
                                                        {editSocialAcc?.AccoutType}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{
                                        // paddingVertical: 20,
                                        marginHorizontal: 20,
                                    }}>
                                        <View style={{
                                            paddingBottom: 5
                                        }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>
                                                Username
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                value={userName}
                                                onChangeText={(text) => setUserName(text)}
                                                placeholder='enter user name'
                                                placeholderTextColor={COLORS.gray2}
                                                underlineColor={COLORS.transparent}
                                                activeUnderlineColor={COLORS.transparent}
                                                style={{
                                                    backgroundColor: COLORS.white,
                                                    borderRadius: 10,
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    elevation: 5,
                                                    paddingHorizontal: 20
                                                }}
                                            />
                                        </View>
                                    </View>


                                    <View style={{
                                        paddingVertical: 20,
                                        marginHorizontal: 20,
                                    }}>
                                        <View style={{
                                            paddingBottom: 5
                                        }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>
                                                Password
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                value={password}
                                                onChangeText={(text) => setPassword(text)}
                                                placeholder='enter user name'
                                                placeholderTextColor={COLORS.gray2}
                                                underlineColor={COLORS.transparent}
                                                activeUnderlineColor={COLORS.transparent}
                                                style={{
                                                    backgroundColor: COLORS.white,
                                                    borderRadius: 10,
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    elevation: 5,
                                                    paddingHorizontal: 20
                                                }}
                                                secureTextEntry={secure}
                                                right={
                                                    <TextInput.Icon color='red' icon={secure ? "eye-off" : "eye"} onPress={() => setSecure(!secure)} />
                                                }
                                            />
                                        </View>
                                    </View>



                                </View>

                                <View style={{
                                    paddingHorizontal: 30,
                                    height: '30%',
                                    backgroundColor: COLORS.white,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <CustomeButton onpress={() => setShowPoppup(false)} width={width / 2.5} title={'Back'} bcolor={COLORS.transparent} border={COLORS.gray} />
                                    {uploading ?
                                        <CustomeButton width={width / 2.5} title={'Please wait'} bcolor={COLORS.main} />
                                        :
                                        <CustomeButton onpress={() => OnSubmitEditAccount()} width={width / 2.5} title={'Save Changes'} bcolor={COLORS.main} />
                                    }
                                </View>
                            </>
                            :
                            <View>
                                <Text>No social account found!</Text>
                            </View>
                        }

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showPoppupTwo}
                            onRequestClose={() => {
                                setShowPoppupTwo(!showPoppupTwo);
                            }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                // alignItems: 'center',
                                backgroundColor: COLORS.gray,
                                opacity: 0.9
                            }}>
                                <View style={{
                                    alignSelf: 'center',
                                    // margin: 20,
                                    width: '95%',
                                    backgroundColor: COLORS.white,
                                    borderRadius: 10,
                                    // padding: 25,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                    <View>
                                        <Text style={{
                                            marginTop: 20,
                                            marginVertical: 10,
                                            color: COLORS.black,
                                            fontWeight: 'bold'
                                            // textAlign: 'center',
                                        }}>Delete Social Account?</Text>
                                    </View>
                                    <View style={{
                                        // backgroundColor: COLORS.main,
                                        // width: '50%'
                                    }}>
                                        <Text style={{
                                            paddingTop: 10,
                                            paddingBottom: 20,
                                            textAlign: 'center',
                                            color: COLORS.gray,
                                            fontSize: 12
                                        }}>
                                            Are you sure you want to delete your social account ?
                                        </Text>
                                    </View>
                                    <View style={{
                                        // flex:1,
                                        width: '100%',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => setShowPoppup(false)}
                                            style={{
                                                backgroundColor: COLORS.white,
                                                width: '50%',
                                                borderWidth: 1,
                                                borderColor: COLORS.gray2,
                                                borderBottomLeftRadius: 10,
                                                paddingVertical: 10,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                            }}>
                                                CANCEL
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => DeleteForm()}
                                            style={{
                                                width: '50%',
                                                backgroundColor: 'red',
                                                borderBottomRightRadius: 10,
                                                borderWidth: 1,
                                                borderColor: 'red',
                                                paddingVertical: 10,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Text style={{
                                                color: COLORS.black,
                                            }}>
                                                DELETE
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>

                </Modal>
                <Loader modal={uploading} uploading={uploading} />





            </View >
        </SafeAreaView >
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        width: width,
        height: height,
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
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
    NumberInput2: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 10,
        width: 340,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4,
        marginTop: 5,
    },
    TextInput2: {
        paddingTop: 10,
        backgroundColor: COLORS.transparent,
        height: 200,
        textAlignVertical: 'top',
    },
})