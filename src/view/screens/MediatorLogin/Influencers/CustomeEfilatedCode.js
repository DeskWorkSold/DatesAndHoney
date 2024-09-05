import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import COLORS from '../../../../consts/Colors';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
import Pie from 'react-native-pie';
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
import Share from 'react-native-share';
import firestore from '@react-native-firebase/firestore';

import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import Clipboard from '@react-native-clipboard/clipboard';
import { useEffect } from 'react';

const { width, height } = Dimensions.get("window");

const CustomeEfilatedCode = ({ navigation }) => {
    const [emailAddress, setEmailAddress] = useState(null);
    const [customeCode, setCustomeCode] = useState(null);
    const [customeCodeEdit, setCustomeCodeEdit] = useState(false);
    const [allUser, setAllUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const mediator = useSelector(selectMediatorUser);

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async () => {
        await firestore()
            .collection('Users')
            .onSnapshot(querySnapshot => {
                const users = [];
                querySnapshot.forEach((documentSnapshot) => {
                    const data = documentSnapshot.data().userDetails;
                    users.push(data);
                })
                setAllUser(users)
            })
    }

    const AutoGenCode = () => {
        setCustomeCode(Math.random().toString(16).slice(2))
    }

    const SaveChanges = async () => {
        if (customeCode) {
            if (!allUser.length == 0) {
                allUser.map((item) => {
                    // console.log(item.RefCode);
                    if (item.RefCode == customeCode) {
                        ToastAndroid.show("The given referel code is already in used please try anther one!", ToastAndroid.SHORT);
                    }
                    else {
                        setLoading(true)
                        firestore()
                            .collection('Users').doc(mediator?.userDetails?.uid).update({
                                'userDetails.RefCode': customeCode
                            })
                            .then(() => {
                                ToastAndroid.show(`Your referel code updated successfully`, ToastAndroid.SHORT);
                                setLoading(false)
                            });
                    }
                })
            }
            else {
                ToastAndroid.show("Network error please try again later!", ToastAndroid.SHORT);
            }
        }
        else {
            ToastAndroid.show("Referel code cannot be empty!", ToastAndroid.SHORT);
        }
    }


    const SendToAll = async (autoCode) => {
        // console.log(autoCode);
        // return
        const shareOptions = {
            title: 'Share via',
            // title: 'Promo Code: ' + autoCode,
            message: 'Referal Code: ' + autoCode,  //string
        };

        // return
        try {
            const ShareResponce = await Share.open(shareOptions)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.log('Error2', err);
                });
        }
        catch (e) {
            console.log('Error', e);
        }
    }
    const SendToSocial = async (autoCode, id) => {
        // console.log(id);
        // return;
        if (id == 7) {
            Clipboard.setString(autoCode);
            ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT);
            // console.log('tes');
        }
        else {
            let shareOptions
            if (id == 1) {
                shareOptions = {
                    title: 'Share via',
                    message: 'Referal Codsse: ' + autoCode,  //string
                    social: Share.Social.TWITTER,
                    Twitter: 'test'
                    // whatsAppNumber: "9199999999",
                };
                try {
                    const { isInstalled } = await Share.isPackageInstalled(
                        "com.twitter.android"
                    );

                    if (isInstalled) {
                        await Share.shareSingle(shareOptions);
                    } else {
                        Alert.alert(
                            "TWITTER not installed",
                            "TWITTER not installed, please install.",
                            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            else if (id == 2) {
                shareOptions = {
                    title: 'Share via',
                    message: 'Referal Codsse: ' + autoCode,  //string
                    social: Share.Social.FACEBOOK,
                    Facebook: 'test',
                };
                try {
                    const { isInstalled } = await Share.isPackageInstalled(
                        "com.facebook.android"
                    );

                    if (isInstalled) {
                        await Share.shareSingle(shareOptions);
                    } else {
                        Alert.alert(
                            "FACEBOOK not installed",
                            "FACEBOOK not installed, please install.",
                            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            else if (id == 3) {
                shareOptions = {
                    title: 'Share via',
                    message: 'Referal Codsse: ' + autoCode,  //string
                    social: Share.Social.WHATSAPP,
                    whatsAppNumber: "9199999999",
                };
                try {
                    const { isInstalled } = await Share.isPackageInstalled(
                        "com.whatsapp.android"
                    );

                    if (isInstalled) {
                        await Share.shareSingle(shareOptions);
                    } else {
                        Alert.alert(
                            "Whatsapp not installed",
                            "Whatsapp not installed, please install.",
                            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            else if (id == 4) {
                shareOptions = {
                    title: 'Share via',
                    message: 'Referal Codsse: ' + autoCode,  //string
                    social: Share.Social.PINTEREST,
                    PINTEREST: 'test'
                };
                try {
                    const { isInstalled } = await Share.isPackageInstalled(
                        "com.pinterest.android"
                    );

                    if (isInstalled) {
                        await Share.shareSingle(shareOptions);
                    } else {
                        Alert.alert(
                            "PINTEREST not installed",
                            "PINTEREST not installed, please install.",
                            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            else if (id == 5) {
                shareOptions = {
                    title: 'Share via',
                    message: 'Referal Codsse: ' + autoCode,  //string
                    social: Share.Social.LINKEDIN,
                    Linkedin: 'teset'
                };
                try {
                    const { isInstalled } = await Share.isPackageInstalled(
                        "com.linkedin.android"
                    );

                    if (isInstalled) {
                        await Share.shareSingle(shareOptions);
                    } else {
                        Alert.alert(
                            "LINKEDIN not installed",
                            "LINKEDIN not installed, please install.",
                            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            else if (id == 6) {
                shareOptions = {
                    title: 'Share via',
                    message: 'Referal Codsse: ' + autoCode,  //string
                    social: Share.Social.TELEGRAM,
                    TELEGRAM: 'test'
                };
                try {
                    const { isInstalled } = await Share.isPackageInstalled(
                        "com.telegram.android"
                    );

                    if (isInstalled) {
                        await Share.shareSingle(shareOptions);
                    } else {
                        Alert.alert(
                            "TELEGRAM not installed",
                            "TELEGRAM not installed, please install.",
                            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            }


        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white,
            // paddingHorizontal:20
        }}>
            <ScrollView>
                <View style={{
                    marginBottom: 30
                }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                flex: 1,
                            }}>
                            <SVGImg1 width={20} height={20} />
                        </TouchableOpacity>
                        <View style={{
                            flex: 2,
                        }}>
                            <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>Learn more about
                                referral program</Text>
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                        </View>
                    </View>

                    <View style={{
                        // top: -20,
                        alignSelf: 'center',
                        width: width / 1.1,
                        // flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        elevation: 5,
                        // alignItems: 'center',
                        paddingRight: 20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: COLORS.black,
                            fontSize: 15
                        }}>Referral Program Details</Text>

                        <View style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                borderRadius: 100,
                                color: COLORS.white,
                                backgroundColor: COLORS.black,
                            }}>1</Text>
                            <View style={{
                                width: '90%',
                                paddingLeft: 5,
                                fontSize: 13,
                                color: COLORS.gray
                            }}>
                                <Text style={{ color: COLORS.black }}>Onboard talent/modeling agencies
                                    and earn 2.5%</Text>
                            </View>
                        </View>
                        <View style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                borderRadius: 100,
                                color: COLORS.white,
                                backgroundColor: COLORS.black,
                            }}>2</Text>
                            <View style={{
                                width: '90%',
                                paddingLeft: 5,
                                fontSize: 13,
                                color: COLORS.gray
                            }}>
                                <Text style={{ color: COLORS.black }}>Talent agencies will earn 5% of
                                    subscription</Text>
                            </View>
                        </View>
                        <View style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                borderRadius: 100,
                                color: COLORS.white,
                                backgroundColor: COLORS.black,
                            }}>3</Text>
                            <View style={{
                                width: '90%',
                                paddingLeft: 5,
                                fontSize: 13,
                                color: COLORS.gray
                            }}>
                                <Text style={{ color: COLORS.black }}>Influnacers/ models will earn 10%
                                    of subscription</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 10,
                        }}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                borderRadius: 100,
                                color: COLORS.white,
                                backgroundColor: COLORS.black,
                            }}>4</Text>
                            <View style={{
                                width: '90%',
                                paddingLeft: 5,
                                fontSize: 13,
                                color: COLORS.gray
                            }}>
                                <Text style={{ color: COLORS.black }}>You will earn most money when you sign up talent/ modeling Agancy’s that have the most influencers</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        // top: -20,
                        marginTop: 30,
                        alignSelf: 'center',
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        elevation: 5,
                        alignItems: 'center',
                        paddingRight: 20,
                        paddingVertical: 5,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TextInput
                                placeholder='Enter your custom code'
                                value={customeCode}
                                editable={customeCodeEdit}
                                placeholderTextColor={COLORS.gray}
                                onChangeText={(text) => setCustomeCode(text)}
                                underlineColor={COLORS.transparent}
                                activeUnderlineColor={COLORS.transparent}
                                backgroundColor={COLORS.transparent}
                                style={{
                                    width: width / 1.5,
                                    padding: 0,
                                    margin: 0,
                                    backgroundColor: COLORS.transparent
                                }}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setCustomeCodeEdit(!customeCodeEdit)} style={{
                            color: COLORS.black,
                            fontSize: 13
                        }}>
                            <Edite width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        paddingVertical: 20,
                        paddingHorizontal: 20,
                        // alignSelf: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        {loading ?
                            <View style={{
                                backgroundColor: COLORS.transparent,
                                width: width / 2.3,
                                height: 50,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: COLORS.gray
                            }}>
                                <ActivityIndicator size="small" color={COLORS.gray} animating={loading} />
                            </View>
                            :
                            <CustomeButton title={'Save'} width={width / 2.3} border={COLORS.gray} bcolor={COLORS.transparent} onpress={() => SaveChanges()} />
                        }
                        <CustomeButton title={'Autogenerate'} width={width / 2.3} onpress={() => AutoGenCode()} />
                    </View>

                    <View style={{
                        paddingVertical: 20,
                        paddingHorizontal: 20
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: COLORS.black,
                            textAlign: 'center'
                        }}>
                            Send Invite
                        </Text>
                    </View>

                    <View style={{
                        // top: -20,
                        alignSelf: 'center',
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        elevation: 5,
                        alignItems: 'center',
                        paddingRight: 20,
                        paddingVertical: 5,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TextInput
                                placeholder='enter email address'
                                value={emailAddress}
                                placeholderTextColor={COLORS.gray}
                                onChangeText={(text) => setEmailAddress(text)}
                                underlineColor={COLORS.transparent}
                                activeUnderlineColor={COLORS.transparent}
                                backgroundColor={COLORS.transparent}
                                style={{
                                    width: width / 1.5,
                                    padding: 0,
                                    margin: 0,
                                    backgroundColor: COLORS.transparent
                                }}
                            />
                        </View>
                        <View style={{
                            color: COLORS.black,
                            fontSize: 13
                        }}>
                            <Send width={20} height={20} />
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View>
                            <Text>Log in to email to send mass emails</Text>
                        </View>
                        <TouchableOpacity style={{
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            backgroundColor: COLORS.main
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.black
                            }}>
                                Log in
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 5
                    }}>
                        <TouchableOpacity
                            onPress={() => SendToSocial(mediator?.userDetails?.RefCode, 1)}
                            style={{
                                width: '45%',
                                elevation: 5,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                alignItems: 'center'
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Twitter width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Twitter</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => SendToSocial(mediator?.userDetails?.RefCode, 2)}
                            style={{
                                width: '45%',
                                elevation: 5,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                alignItems: 'center'
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Facebook width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Facebook</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // backgroundColor: COLORS.white,
                        // borderRadius: 10,
                        // elevation: 5,
                        alignItems: 'center',
                        // paddingRight: 20,
                        paddingVertical: 5
                    }}>
                        <TouchableOpacity
                            onPress={() => SendToSocial(mediator?.userDetails?.RefCode, 3)}
                            style={{
                                width: '45%',
                                elevation: 5,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                alignItems: 'center'
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <WhatsApp width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>WhatsApp</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => SendToSocial(mediator?.userDetails?.RefCode, 3)}
                            style={{
                                width: '45%',
                                elevation: 5,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                alignItems: 'center'
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <WhatsApp width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Send to all on WhatsApp</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        width: width / 1.1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // backgroundColor: COLORS.white,
                        // borderRadius: 10,
                        // elevation: 5,
                        alignItems: 'center',
                        // paddingRight: 20,
                        paddingVertical: 5
                    }}>
                        <TouchableOpacity
                            onPress={() => SendToSocial(mediator?.userDetails?.RefCode, 4)}
                            style={{
                                width: '45%',
                                elevation: 5,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                alignItems: 'center'
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Reddit width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Reddit</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => SendToSocial(mediator?.userDetails?.RefCode, 5)}

                            style={{
                                width: '45%',
                                elevation: 5,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                alignItems: 'center'
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Linkedin width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Linked in </Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View
                        style={{
                            alignSelf: 'center',
                            marginTop: 10,
                            width: width / 1.1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            // backgroundColor: COLORS.white,
                            // borderRadius: 10,
                            // elevation: 5,
                            alignItems: 'center',
                            // paddingRight: 20,
                            paddingVertical: 5
                        }}>
                        <TouchableOpacity
                            onPress={() => SendToSocial(mediator?.userDetails?.RefCode, 6)}
                            style={{
                                width: '45%',
                                elevation: 5,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                alignItems: 'center'
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <TikTok width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>TikTok</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => SendToSocial(mediator?.userDetails?.RefCode, 7)}
                            style={{
                                width: '45%',
                                elevation: 5,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                alignItems: 'center'
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <CopyLink width={20} height={20} />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontSize: 13,
                                    color: COLORS.black
                                }}>Copy Link</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        paddingVertical: 20,
                        alignSelf: 'center'
                    }}>
                        <CustomeButton title={'Send to all'} width={width / 1.1} onpress={() => SendToAll(mediator?.userDetails?.RefCode)} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CustomeEfilatedCode


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
})