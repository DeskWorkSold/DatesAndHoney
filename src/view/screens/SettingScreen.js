import { Image, StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout, selectUser } from '../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';

const SettingScreen = ({ navigation }) => {
    const user = useSelector(selectUser);
    const [name, setName] = useState(user.Name);
    const [email, setEmail] = useState(user.email);
    const [number, setNumber] = useState();
    const dispatch = useDispatch();


    const OnLogOut = async () => {
        console.log('logout');
        try {
          auth()
            .signOut()
            .then(() =>
              console.log('User signed out!'),
              ToastAndroid.show('Signed out!', ToastAndroid.SHORT)
              // navigation.('SignUpScreen')
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
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    height: 80
                }}>
                    <View style={{ width: '20%' }}>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Image source={require('../../assets/menu.png')} resizeMode='contain'
                                style={{
                                    height: 45,
                                    color: COLORS.black
                                }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '60%', alignItems: 'center', }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.black
                        }}>Profile Settings</Text>
                    </View>

                    <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                    </View>
                </View>

                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={name}
                                        placeholder={'Enter your name'}
                                        keyboardType='email-address'
                                        onChangeText={name => setName(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <Image source={require('../../assets/edit.png')} resizeMode='contain'
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: COLORS.black
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Email </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={email}
                                        placeholder={'Enter your email'}
                                        keyboardType='email-address'
                                        onChangeText={email => setEmail(email)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <Image source={require('../../assets/edit.png')} resizeMode='contain'
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: COLORS.black
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Phone Number </Text>
                                <View style={styles.NumberInput}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>

                                        <Image source={require('../../assets/USflag.png')} resizeMode='contain' style={{
                                            marginRight: 10,
                                            borderRadius: 3
                                        }} />
                                        <Text> | </Text>
                                        <TextInput
                                            value={number}
                                            placeholder={'Enter your number'}
                                            keyboardType='email-address'
                                            onChangeText={number => setNumber(number)
                                            }
                                            style={styles.TextInput}
                                        />
                                    </View>
                                    <View>

                                        <Image source={require('../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 20
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Questions Settings</Text>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text>
                                        What type of relationship you are looking for?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {user.RelationshipType}
                                    </Text>
                                </View>
                            </View>

                            <View style={{
                                width: '10%',
                                alignItems: 'flex-end'
                            }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </View>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text>
                                        What is your religion?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {user.Relagion}, {user.religionType}
                                    </Text>
                                </View>
                            </View>

                            <View style={{
                                width: '10%',
                                alignItems: 'flex-end'
                            }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </View>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text>
                                        What do you identify as?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {user.Gender}
                                    </Text>
                                </View>
                            </View>

                            <View style={{
                                width: '10%',
                                alignItems: 'flex-end'
                            }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </View>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text>
                                        What type of relationship you are looking for?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {user.relationshipLookingType}
                                    </Text>
                                </View>
                            </View>

                            <View style={{
                                width: '10%',
                                alignItems: 'flex-end'
                            }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            paddingTop: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <View style={{ marginHorizontal: 5 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('TermsandCondition')}
                                        activeOpacity={0.7}>
                                        <View style={{
                                            backgroundColor: COLORS.white,
                                            elevation: 5,
                                            width: 150,
                                            height: 50,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                            }}>Terms or Conditions</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginHorizontal: 5 }}>
                                    <TouchableOpacity activeOpacity={0.7}
                                        onPress={() => navigation.navigate('PrivacyPolicy')}>
                                        <View style={{
                                            backgroundColor: COLORS.white,
                                            elevation: 5,
                                            width: 150,
                                            height: 50,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                            }}>Privacy Policy</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                alignItems: 'center',
                                paddingVertical:10,
                                marginBottom:20,
                            }}>
                                <TouchableOpacity activeOpacity={0.7}
                                    onPress={() => OnLogOut()}>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        elevation: 5,
                                        width: 150,
                                        height: 50,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                        }}>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginBottom: 80
                        }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <View style={{ marginHorizontal: 5 }}>
                                    <CustomeButton width={170} onpress={() => navigation.navigate('')}
                                        title={'Skip'} bcolor={COLORS.light} />
                                </View>
                                <View style={{ marginHorizontal: 5 }}>
                                    <CustomeButton width={170} onpress={() => navigation.navigate('')}
                                        title={'Continue'} color={COLORS.white} />
                                </View>
                            </View>
                        </View>


                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%',
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: 45,
        width: 340,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },

})