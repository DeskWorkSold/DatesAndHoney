import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React from 'react'
import COLORS from '../../../consts/Colors'
import { useState } from 'react';
import CustomeButton from '../../components/CustomeButton';
import { logout, mediatorLogin, selectMediatorUser } from '../../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MediatorProfileScreen = ({ navigation }) => {
    const mediator = useSelector(selectMediatorUser);
    // console.log(mediator);
    const [name, setName] = useState(mediator?.userDetails?.Name);
    const [email, setEmail] = useState(mediator?.userDetails?.email);
    const [location, setLocation] = useState();
    const [about, setabout] = useState(mediator?.userDetails?.Bio);
    const dispatch = useDispatch();

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
                            paddingLeft: 20,
                            paddingBottom: 20
                        }}>
                            <View style={{
                                borderWidth: 3,
                                borderColor: COLORS.main,
                                borderRadius: 50
                            }}>
                                <Image source={{ uri: mediator?.userDetails?.image1 }} resizeMode='contain' style={{
                                    borderRadius: 80,
                                    width: 100,
                                    height: 100
                                }} />
                            </View>
                            <View style={{
                                justifyContent: 'center'
                                , paddingLeft: 20
                            }}>
                                <View style={{
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: COLORS.black
                                    }}>{mediator?.userDetails?.Name}</Text>
                                </View>
                                {mediator?.userDetails?.POSFood == 1 ?
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: COLORS.light,
                                        borderRadius: 5,
                                        // width: '80%',
                                        padding: 5,
                                        paddingHorizontal: 10,
                                        marginTop: 5,
                                    }}>
                                        <Text style={{ color: COLORS.black, fontSize: 13 }}>Event & Food Vendor</Text>
                                    </View>
                                    :
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: COLORS.light,
                                        borderRadius: 5,
                                        // width: '80%',
                                        padding: 5,
                                        paddingHorizontal: 10,
                                        marginTop: 5,
                                    }}>
                                        <Text style={{ color: COLORS.black, fontSize: 13 }}>Event Vendor</Text>
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={name}
                                        placeholder={'Name'}
                                        onChangeText={name => setName(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                        tintColor: COLORS.black,
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Email </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={email}
                                        placeholder={'abc@abc.com'}
                                        onChangeText={email => setEmail(email)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                        tintColor: COLORS.black,
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Location </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={location}
                                        placeholder={'business@abc.com'}
                                        onChangeText={location => setLocation(location)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                        tintColor: COLORS.black,
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> About </Text>
                                <View style={styles.NumberInput2}>
                                    <TextInput
                                        multiline
                                        numberOfLines={8}
                                        value={about}
                                        placeholder={'Details'}
                                        onChangeText={about => setabout(about)
                                        }
                                        style={styles.TextInput2}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 40,
                            // paddingHorizontal: 20,
                        }}>
                            {/* <CustomeButton onpress={() => OnLogOut()}
                                title={'Log out'} width={150} color={COLORS.black} bcolor={COLORS.transparent} border={COLORS.black} /> */}
                            <CustomeButton  onpress={() => OnLogOut()}
                                title={'Log out'} width={width/1.2} color={COLORS.white} />
                        </View>


                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default MediatorProfileScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: width,
        height: height,
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 45,
        width: 340,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4
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