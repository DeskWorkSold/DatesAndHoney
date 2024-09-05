import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import SVGImg1 from '../../../../assets/tik.svg';
import CustomeButton from '../../../components/CustomeButton';
import firestore from '@react-native-firebase/firestore';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const TermsAndCondition = ({ navigation }) => {
    const mediatoruser = useSelector(selectMediatorUser);
    const [modal, setModal] = useState(mediatoruser.userDetails.TermAndCondition ? false : true);
    const [uploading, setUploading] = useState(false);

    const onTermsAndCondition = async () => {
        setUploading(true)
        await firestore()
            .collection('Users').doc(mediatoruser.userDetails.uid).update({
                'userDetails.TermAndCondition': true
            })
            .then(() => {
                setUploading(false)
                // setUploading(false)
                // ToastAndroid.show("Monthly rates updated!", ToastAndroid.SHORT);
                console.log('terms and condituion updated');
                setModal(false)
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <Loader modal={uploading} uploading={uploading} />
                <Modal
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
                </Modal>
                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={{
                        marginBottom:50
                    }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../../../assets/notebrain.png')} resizeMode='cover' style={{
                            width: width / 2,
                            height: 200,
                        }} />
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
                                Terms and conditions
                                (Last updated Feb 3, 2023)
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        paddingBottom: 10,
                    }}>
                        <Text style={{
                            fontSize: 13,
                            color: COLORS.black
                        }}>
                            Concierge employees of our services
                        </Text>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{
                            fontSize: 12,
                        }}>
                            Lorem ipsum dolor sit amet, ConnectEDU advising elite. Masada habitant ETAM ascetic cursus mi premium, Purus diam. Rivera portion sit sagittal tin. Mi cum RELIT id rectus diam, libero. Output port get used Rivera Luis sit et.
                        </Text>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        paddingBottom: 10,
                    }}>
                        <Text style={{
                            fontSize: 13,
                            color: COLORS.black
                        }}>
                            Terms and Services
                        </Text>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{
                            fontSize: 12,
                            paddingBottom: 10
                        }}>
                            Lorem ipsum dolor sit amet, ConnectEDU advising elite. Masada habitant ETAM ascetic cursus mi premium, Purus diam. Rivera portion sit sagittal tin. Mi cum RELIT id rectus diam, libero. Output port get used Rivera Luis sit et.
                        </Text>
                        <Text style={{
                            fontSize: 12,
                        }}>
                            Lorem ipsum dolor sit amet, ConnectEDU advising elite. Masada habitant ETAM ascetic cursus mi premium, Purus diam. Rivera portion sit sagittal tin. Mi cum RELIT id rectus diam, libero. Output port get used Rivera Luis sit et.
                        </Text>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        paddingBottom: 10,
                    }}>
                        <Text style={{
                            fontSize: 13,
                            color: COLORS.black
                        }}>
                            Privacy Policy
                        </Text>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{
                            fontSize: 12,
                            paddingBottom: 10
                        }}>
                            Lorem ipsum dolor sit amet, ConnectEDU advising elite. Masada habitant ETAM ascetic cursus mi premium, Purus diam. Rivera portion sit sagittal tin. Mi cum RELIT id rectus diam, libero. Output port get used Rivera Luis sit et.
                        </Text>
                        <Text style={{
                            fontSize: 12,
                        }}>
                            Lorem ipsum dolor sit amet, ConnectEDU advising elite. Masada habitant ETAM ascetic cursus mi premium, Purus diam. Rivera portion sit sagittal tin. Mi cum RELIT id rectus diam, libero. Output port get used Rivera Luis sit et.
                        </Text>
                    </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default TermsAndCondition

const styles = StyleSheet.create({})