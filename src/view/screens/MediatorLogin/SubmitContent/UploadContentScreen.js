import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import CustomeButton from '../../../components/CustomeButton';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import Share2 from '../../../../assets/share.svg';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const UploadContentScreen = ({ navigation }) => {
    const [btnindex, setBtnindex] = useState(null);
    const [allEvents, setAllEvents] = useState(null);
    const [tempEvent, setTempEvent] = useState(null);
    const [tempLoading, setTempLoading] = useState(false)
    const [showPoppup, setShowPoppup] = useState(false);
    const [autoCode, setAutoCode] = useState(null);



    useEffect(() => {
        // fetchAllEvents();

        // allEvents.map((item) => {
        //     console.log(item.image1);
        // })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>

                <View style={{
                    paddingTop: 40,
                    alignItems: 'center',
                    paddingHorizontal: 50,
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: COLORS.black,
                        textAlign: 'center'
                    }}>Services</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    paddingTop: 10
                }}>
                    <Text style={{
                        color: COLORS.black
                    }}>Select your services!</Text>
                </View>
                <View style={{
                    marginTop: 20,
                }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('UploadVideoContent')}
                    >
                        <View style={{
                            backgroundColor: COLORS.transparent,
                            ...styles.NumberInput
                        }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ color: COLORS.black }}>
                                    Upload Videos
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 20,
                }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('UploadImageContent')}
                    >
                        <View style={{
                            backgroundColor: COLORS.transparent,
                            ...styles.NumberInput
                        }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ color: COLORS.black }}>
                                    Upload Images
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default UploadContentScreen

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        alignItems: 'center',
        height: height,
        // backgroundColor:COLORS.gray
    },
    NumberInput: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: 45,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4
    },
})