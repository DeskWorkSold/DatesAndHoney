import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, ProgressBarAndroid, ProgressBarIOS, Platform } from 'react-native'
import React from 'react';
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const socialMediaAccounts = [
    {
        id: 1,
        name: 'Facebook',
        icon: require('../../../../assets/Socialmedia1.png'),
    },
    {
        id: 2,
        name: 'Twitter',
        icon: require('../../../../assets/Socialmedia2.png'),
    },
    {
        id: 3,
        name: 'Instagram',
        icon: require('../../../../assets/Socialmedia4.png'),
    },
    {
        id: 4,
        name: 'Linkdin',
        icon: require('../../../../assets/Socialmedia3.png'),
    },
]

const AddSocialMediaAccount = ({ navigation }) => {
    const mediator = useSelector(selectMediatorUser);
    const [isModalVisible, setIsModalVisible] = useState(false); // set initial state to false
    const [selectedAccount, setSelectedAccount] = useState({
        id: 1,
        name: 'Facebook',
        icon: require('../../../../assets/Socialmedia1.png'),
    },); // set initial state to empty string
    const [username, setUserName] = useState(null); // set initial state to false
    const [editUsername, setEditUsername] = useState(null); // set initial state to false
    const [password, setPassword] = useState(null); // set initial state to false
    const [editPassword, setEditPassword] = useState(null); // set initial state to false
    const [secure, setSecure] = useState(false); // set initial state to false
    const [uploading, setUploading] = useState(false); // set initial state to false

    const dispatch = useDispatch();

    // console.log(mediator.userDetails);

    const handleAccountSelect = (account) => {
        setSelectedAccount(account);
        setIsModalVisible(false);
    };

    const OnSubmitAccount = async () => {
        if (!selectedAccount || selectedAccount == '' || !username || username == '' || !password || password == '') {
            if (!selectedAccount || selectedAccount == '') {
                ToastAndroid.show("Please select social account type!", ToastAndroid.SHORT);
            }
            else if (!username || username == '') {
                ToastAndroid.show("Please enter user name!", ToastAndroid.SHORT);
                setEditUsername(true)
            }
            else if (!password || password == '') {
                ToastAndroid.show("Please enter user password!", ToastAndroid.SHORT);
                setEditPassword(true)
            }
        }
        else {
            // console.log('hello');
            setUploading(true)
            await firestore()
                .collection('Users').doc(mediator?.userDetails?.uid).update({
                    SocialAccounts: firestore.FieldValue.arrayUnion({
                        AccoutType: selectedAccount.name,
                        Username: username,
                        Password: password,
                        id: Math.random().toString(16).slice(2)
                    }),
                })
                .then(() => {
                    ToastAndroid.show(`Your ${selectedAccount.name} account added successfully`, ToastAndroid.SHORT);
                    navigation.goBack()
                    setUploading(false)
                });
        }
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>

                {/* <ScrollView vertical showsVerticalScrollIndicator={false}> */}
                <View style={{
                    // marginBottom: 200,
                    height: '70%',
                    backgroundColor: COLORS.white,
                }}>
                    <View style={{
                        paddingHorizontal: 20,
                        // paddingVertical:10,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                            fontWeight: 'bold'
                        }}>
                            Add social media handle
                        </Text>
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
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <Image source={selectedAccount.icon} width={20} height={20} />
                                <View style={{
                                    backgroundColor: COLORS.white,
                                    width: '90%',
                                    paddingLeft: 5
                                }}>
                                    <Text style={{
                                        color: COLORS.gray
                                    }}>
                                        {selectedAccount.name}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(!isModalVisible)}>
                                <Image source={require('../../../../assets/back.png')} resizeMode='contain' style={{
                                    transform: [{ rotateZ: '-270deg' }],
                                    width: 10,
                                    height: 10,
                                    tintColor: COLORS.black
                                }} />
                            </TouchableOpacity>
                        </View>
                        {isModalVisible &&
                            <View style={{
                                marginTop: 10
                            }}>
                                {socialMediaAccounts.map((account, index) => (
                                    <TouchableOpacity
                                        onPress={() => handleAccountSelect(account)}
                                        key={index} style={{
                                            alignSelf: 'center',
                                            height: 50,
                                            marginBottom: 5,
                                            width: '100%',
                                            backgroundColor: COLORS.white,
                                            borderRadius: 10,
                                            paddingHorizontal: 20,
                                            alignItems: 'center',
                                            elevation: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'center'
                                        }}>
                                        <View style={{
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                            <Image source={account.icon} width={20} height={20} />
                                            <View style={{
                                                backgroundColor: COLORS.white,
                                                width: '90%',
                                                paddingLeft: 5
                                            }}>
                                                <Text style={{
                                                    color: COLORS.gray
                                                }}>
                                                    {account.name}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        }

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
                                error={editUsername}
                                onFocus={() => setEditUsername(false)}
                                value={username}
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
                                error={editPassword}
                                onFocus={() => setEditPassword(false)}
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
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <CustomeButton onpress={() => navigation.goBack()} width={width / 2.5} title={'Back'} bcolor={COLORS.transparent} border={COLORS.gray} />
                    {uploading ?
                        <CustomeButton width={width / 2.5} title={'Please wait'} bcolor={COLORS.main} />
                        :
                        <CustomeButton onpress={() => OnSubmitAccount()} width={width / 2.5} title={'Add Account'} bcolor={COLORS.main} />
                    }
                </View>
                {/* </ScrollView> */}


                <Loader modal={uploading} uploading={uploading} />
            </View >
        </SafeAreaView >
    )
}

export default AddSocialMediaAccount

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        // justifyContent: 'center',
        width: width,
        height: height,
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
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
        paddingHorizontal: 10,
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