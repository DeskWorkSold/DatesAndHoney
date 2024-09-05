import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Modal, ToastAndroid, StatusBar, SafeAreaView } from 'react-native';
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
import SvgImage from '../../../../assets/arrowleft.svg'
import { useState } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import YourClinets from '../../../components/YourClinets';
import ManageStaffCard from '../../../components/ManageStaffCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
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

const ScanDoc = ({ navigation }) => {
    const [emailAddress, setEmailAddress] = useState(null);
    const [customeCode, setCustomeCode] = useState(null);
    const [modal, setModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [scan, setScan] = useState(true);
    const [result, setResult] = useState('23334df8c4828a1');
    const [selectUser, setSelectUser] = useState(null);
    const [AdvFilter, setAdvFilter] = useState(false);
    const CurrentUser = auth().currentUser.uid;
    // const [data, setData] = useState(null);
    const mediator = useSelector(selectMediatorUser);


    const onSuccess = (e) => {
        setResult(e.data);
        setScan(false)
        // console.log('QR Result==> :', e.data);
        // return;
        if (e.data) {
            navigation.navigate('AttendeDetails', { Id: e.data })
            setScan(true)
            setResult(null)
        }
        else {
            ToastAndroid.show("Please wait...", ToastAndroid.SHORT);
        }
    }
    const onGoBack = () => {
        navigation.goBack()
        setScan(true)
        setResult(null)
    }

    // useEffect(() => {
    //     navigation.navigate('AttendeDetails', { Id: result })
    // }, [result])


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <View style={styles.container}>
                <StatusBar backgroundColor={COLORS.black} />
                <View style={{
                    alignItems: 'center',
                    paddingVertical: 20,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                }}>
                    <TouchableOpacity onPress={() => onGoBack()} style={{
                        flex: 1
                    }}>
                        <SvgImage width={20} height={20} />
                    </TouchableOpacity>
                    <View style={{
                        flex: 2,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 20, color: COLORS.black, fontWeight: 'bold'
                        }}> Scan</Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                    </View>
                </View>




                <View style={{
                    height: '100%',
                    backgroundColor: COLORS.light,
                    // backgroundColor: COLORS.main 23334df8c4828a1
                }}>
                    {scan ?
                        <View style={{
                            height: height / 1.3, // desired height
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <QRCodeScanner
                                reactivate={true}
                                showMarker={true}
                                ref={(node) => { scanner = node }}
                                onRead={onSuccess}
                            // flashMode={RNCamera.Constants.FlashMode.torch}
                            // topContent={
                            //     <Text style={styles.centerText}>
                            //         Scan your Ticket QRCode!
                            //     </Text>
                            // }
                            // bottomContent={
                            //     <TouchableOpacity style={styles.buttonTouchable}>
                            //         <Text style={styles.buttonText}>OK. Got it!</Text>
                            //     </TouchableOpacity>
                            // }
                            />
                        </View>
                        :
                        <ScrollView vertical showsVerticalScrollIndicator={false} >
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: width / 1.1,
                                alignSelf: 'center',
                                paddingVertical: 20,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}>Here is result: </Text>
                                <Text style={{
                                    color: COLORS.black
                                }}>{result}</Text>
                            </View>
                        </ScrollView>
                    }
                </View>

                <Loader modal={uploading} uploading={uploading} />
            </View>
        </SafeAreaView>
    )
}

export default ScanDoc


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
    centerText: {
        color: COLORS.black,
        fontSize: 16,
        paddingVertical: 10,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})