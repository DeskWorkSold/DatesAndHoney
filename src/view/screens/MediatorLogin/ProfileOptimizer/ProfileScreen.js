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
    const CurrentUser = auth().currentUser.uid;

    const [progress, setProgress] = useState(0.5);
    const [showPoppup, setShowPoppup] = useState(false);
    const [showPoppupTwo, setShowPoppupTwo] = useState(false);
    const mediator = useSelector(selectMediatorUser);
    const [name, setName] = useState(mediator?.userDetails?.Name);
    const [nameEdit, setNameEdit] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState(mediator?.userDetails?.email);
    const [emailEdit, setEmailEdit] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [number, setNumber] = useState(mediator?.userDetails?.Phonenumber ? mediator?.userDetails?.Phonenumber : null);
    const [numberEdit, setNumberEdit] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [about, setabout] = useState(mediator?.userDetails?.Bio);
    const [aboutEdit, setaboutEdit] = useState(false);
    const [aboutError, setaboutError] = useState(false);
    const [location, setLocation] = useState(mediator?.userDetails?.Address ? mediator?.userDetails?.Address : null);
    const [locationEdit, setLocationEdit] = useState(false);
    const [locationError, setLocationError] = useState(false);
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

    const OnSaveChanges = async () => {
        if (name == null || name == '' || email == null || email == '' || location == null || location == '' || number == null || number == '' || about == null || about == '') {
            if (name == null || name == '') {
                ToastAndroid.show('Please enter new username!', ToastAndroid.SHORT)
                setNameError(true)
            }
            else if (email == null || email == '') {
                ToastAndroid.show('Please enter new email address!', ToastAndroid.SHORT)
                setEmailError(true)
            }
            else if (number == null || number == '') {
                ToastAndroid.show('Please enter new phone number!', ToastAndroid.SHORT)
                setNumberError(true)
            }
            else if (about == null || about == '') {
                ToastAndroid.show('Please enter detail about yourself !', ToastAndroid.SHORT)
                setaboutError(true)
            }
            else if (location == null || location == '') {
                ToastAndroid.show('Please enter new address!', ToastAndroid.SHORT)
                setLocationError(true)
            }
        }
        else {
            setUploading(true)
            await firestore()
                .collection('Users').doc(CurrentUser).update({
                    'userDetails.Name': name,
                    'userDetails.Bio': about,
                    'userDetails.Phonenumber': number,
                    'userDetails.email': email,
                    'userDetails.Address': location,
                })
                .then(() => {
                    setUploading(false)
                    ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT)
                    // console.log('Access given to user');
                });
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
                                    justifyContent: 'center',
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
                                    alignSelf:'flex-start',
                                    backgroundColor: COLORS.light,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginTop: 5,
                                }}>
                                    <Text style={{ color: COLORS.black, fontSize: 13 }}>{mediator?.userDetails?.MediatorType}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 0 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        error={nameError}
                                        onFocus={() => setNameError(false)}
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
                                        error={emailError}
                                        onFocus={() => setEmailError(false)}
                                        // aria-disabled={true}
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        editable={emailEdit}
                                        value={email}
                                        placeholder={'Enter your email'}
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
                                        error={locationError}
                                        onFocus={() => setLocationError(false)}
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        // aria-disabled={true}
                                        editable={locationEdit}
                                        // editable={locationEdit}
                                        value={location}
                                        placeholder={'Enter your address'}
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
                                        error={numberError}
                                        onFocus={() => setNumberError(false)}
                                        // aria-disabled={true}
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        editable={numberEdit}
                                        value={number}
                                        placeholder={'Enter your number'}
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

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> About </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // justifyContent: 'space-between',
                                    paddingHorizontal: 10,
                                    width: width / 1.2,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 10,
                                    elevation: 5
                                }}>
                                    <TextInput
                                        error={aboutError}
                                        onFocus={() => setaboutError(false)}
                                        // aria-disabled={true}
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        editable={aboutEdit}
                                        value={about}
                                        placeholder={'Enter details'}
                                        keyboardType='email-address'
                                        onChangeText={name => setabout(name)
                                        }
                                        style={{
                                            backgroundColor: COLORS.white,
                                            paddingBottom: 50,
                                            width: '90%',
                                            textAlignVertical: 'bottom',
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => setaboutEdit(!aboutEdit)}>
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
                            alignSelf: 'center',
                            flexDirection: 'row'
                        }}>
                            {name != mediator?.userDetails?.Name || email != mediator?.userDetails?.email || number != mediator?.userDetails?.Phonenumber || about != mediator?.userDetails?.Bio ?
                                <>
                                    {uploading ?
                                        <View style={{
                                            backgroundColor: COLORS.main,
                                            width: width / 1.2,
                                            height: 50,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: COLORS.transparent
                                        }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>Please wait...</Text>
                                        </View>
                                        :
                                        <CustomeButton width={width / 1.2} title={'Save Changes'} bcolor={COLORS.main} border={COLORS.main} onpress={() => OnSaveChanges()} />
                                    }
                                </>
                                :
                                <View style={{
                                    marginRight: 5,
                                }}>
                                    <CustomeButton width={width / 1.2} title={'Log out'} bcolor={COLORS.transparent} border={COLORS.gray} onpress={() => OnLogOut()} />
                                </View>
                            }
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