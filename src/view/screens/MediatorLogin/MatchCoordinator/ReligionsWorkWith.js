import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import SVGImg1 from '../../../../assets/tik.svg';
import CustomeButton from '../../../components/CustomeButton';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import Notify from '../../../../assets/notify.svg';
import Tik from '../../../../assets/tik.svg';
import firestore from '@react-native-firebase/firestore';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const religiondata = [
    {
        id: 1,
        name: 'All',
    },
    {
        id: 1,
        name: 'Christian',
    },
    {
        id: 1,
        name: 'Jewish',
    },
    {
        id: 1,
        name: 'None',
    },
    {
        id: 1,
        name: 'Any',
    },
    {
        id: 1,
        name: 'Muslim',
    },
    {
        id: 1,
        name: 'Hindu',
    },
    {
        id: 1,
        name: 'Buddhist',
    },
    {
        id: 1,
        name: 'Chinese traditional Religion',
    }
]

const ReligionsWorkWith = ({ navigation }) => {
    const mediatoruser = useSelector(selectMediatorUser);
    const [modal, setModal] = useState(mediatoruser.userDetails.TermAndCondition ? false : true);
    const [uploading, setUploading] = useState(false);
    const [dataindex, setdataIndex] = useState(null);

    // const onTermsAndCondition = async () => {
    //     setUploading(true)
    //     await firestore()
    //         .collection('Users').doc(mediatoruser.userDetails.uid).update({
    //             'userDetails.TermAndCondition': true
    //         })
    //         .then(() => {
    //             setUploading(false)
    //             // setUploading(false)
    //             // ToastAndroid.show("Monthly rates updated!", ToastAndroid.SHORT);
    //             console.log('terms and condituion updated');
    //             setModal(false)
    //         });
    // }
    const onSelectReligion = (index) => {
        console.log(index);
        setdataIndex(index)
    };

    const onApplyReligion = async () => {
        // console.log('test');
        const data = religiondata[dataindex].name
        // console.log(data);
        if (data) {
            setUploading(true)
            await firestore()
                .collection('Users').doc(mediatoruser.userDetails.uid).update({
                    'userDetails.FilterReligion': data
                })
                .then(() => {
                    setUploading(false)
                    // setUploading(false)
                    ToastAndroid.show("Prefer work updated!", ToastAndroid.SHORT);
                    console.log('prefer work update');
                    // setModal(false)
                });
        }
        else {
            ToastAndroid.show("Please select your prefer work!", ToastAndroid.SHORT);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <Loader modal={uploading} uploading={uploading} />
                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(!modal);
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        bottom: 100,
                        // alignItems: 'center',
                    }}>
                        <View style={{
                            margin: 20,
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 25,
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
                            <View style={{
                                flexDirection: 'row',
                                paddingBottom: 40,
                                // backgroundColor:COLORS.gray,
                                width: '100%'
                                // alignItems:'center'
                            }}>
                                <SVGImg1 width={20} height={20} />
                                <View style={{
                                    paddingLeft: 5
                                }}>
                                    <Text>
                                        I agree to all the terms and conditions.
                                    </Text>
                                </View>
                            </View>
                            <CustomeButton onpress={() => onTermsAndCondition()} width={width / 1.3} title={'Agree and continue'} />
                        </View>
                    </View>
                </Modal> */}
                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={{
                        marginBottom: 50
                    }}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <View style={{
                                paddingHorizontal: 60,
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: COLORS.black,
                                    textAlign: 'center',
                                    paddingTop: 20
                                }}>
                                    Prefer to work with.
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            paddingHorizontal: 25,
                            paddingTop: 20,
                            flexDirection: 'row',
                            // justifyContent: 'center',
                            // alignItems:'center',
                        }}>
                            <View style={{
                                paddingRight: 5,
                            }}>
                                <Notify width={20} height={20} />
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 12,
                                }}>
                                    This is meant mostly for religious figures that want to help people of their own community/ religion and are working donation based or with $18/ monthly fee.
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                marginTop: 30,
                                width: width / 1.1,
                                backgroundColor: COLORS.white,
                                elevation: 2,
                                borderRadius: 10,
                                alignSelf: 'center'
                            }}>
                            {religiondata.map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => onSelectReligion(index)}
                                    key={index} style={{
                                        height: 50,
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20,
                                        flexDirection: 'row',
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1,
                                    }}>
                                    <Text style={{
                                        color: COLORS.black
                                    }}>{item.name}</Text>
                                    {dataindex == index &&
                                        <Tik width={20} height={20} />
                                    }
                                </TouchableOpacity>
                            ))}

                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                            <CustomeButton onpress={() => onApplyReligion()} title={'Apply'} />
                        </View>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ReligionsWorkWith

const styles = StyleSheet.create({})