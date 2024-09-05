import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../consts/Colors';
import { useSelector } from 'react-redux';
import { logout, selectMediatorUser, selectUser } from '../../../redux/reducers/Reducers';
import { useState } from 'react';
import SVGTik from '../../assets/tik.svg'


const DrawerContentForMediator = (props) => {
    const mediator = useSelector(selectMediatorUser);
    const [indexActive, steIndexActive] = useState(0)

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

    const onNavigateBWDrawer = (props, j , i) => {
        // console.log(props?.state?.index, indexActive);
        steIndexActive(i)
        props.navigation.navigate(j)
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.dark }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: COLORS.dark }}>
                <View style={{
                    flexDirection: 'row',
                    paddingLeft: 20,
                    paddingVertical: 30,
                    borderBottomColor: COLORS.gray,
                    borderBottomWidth: 0.4
                }}>
                    <View style={{
                        borderWidth: 3,
                        borderColor: COLORS.main,
                        borderRadius: 50
                    }}>
                        <Image
                            source={{ uri: mediator?.userDetails?.image1 }}
                            style={{ height: 60, width: 60, borderRadius: 40, }}
                        />
                    </View>
                    <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                        <Title style={styles.title}>{mediator?.userDetails?.Name}</Title>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}>
                            {/* <Image source={require('../../assets/dates.png')} resizeMode='contain'
                                style={{
                                    marginRight: 5,
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.white
                                }} /> */}
                            <Caption style={styles.caption}>Vendor Log In</Caption>
                        </View>
                    </View>
                </View>
                {/* <View style={{ flex: 1, paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View> */}

                {props?.state?.routeNames.map((j, i) => (
                    <TouchableOpacity

                        key={i}
                        onPress={() => onNavigateBWDrawer(props, j, i)}
                        style={{
                            flexDirection: 'row',
                            marginTop: 15,
                            height: 50,
                            backgroundColor: '#3A485F',
                            marginHorizontal: 10,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Title style={{
                                fontSize: 13,
                                color: COLORS.white,
                            }}>{j}</Title>
                        </View>
                        {i == indexActive &&
                            <SVGTik width={20} height={20} />
                        }
                    </TouchableOpacity>

                ))}

            </DrawerContentScrollView>
            <View style={{ padding: 20 }}>
                {/* <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} color={COLORS.white} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                                color: COLORS.white
                            }}>
                            Close
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DrawerContentForMediator

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingVertical: 20,
        borderBottomColor: COLORS.light,
        borderBottomWidth: 0.4,
    },
    title: {
        fontSize: 15,
        color: COLORS.white,
        marginTop: 3,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium',
    },
    caption: {
        color: COLORS.white,
        fontSize: 12,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: COLORS.light,
        borderTopWidth: 0.4
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    itemstyle: {
        borderBottomColor: '#F9F9F9',
        // borderBottomWidth: 1,
    }
})