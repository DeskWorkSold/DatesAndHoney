import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SVGimage1 from '../../assets/influencermain.svg';
import SVGimage2 from '../../assets/influencerfeed.svg';
import SVGimage3 from '../../assets/manage.svg';
import SVGimage4 from '../../assets/profile.svg';
import HomeScreen from '../screens/MediatorLogin/SubmitContent/HomeScreen';
import ProfileScreen from '../screens/MediatorLogin/SubmitContent/ProfileScreen';
import UploadContentScreen from '../screens/MediatorLogin/SubmitContent/UploadContentScreen';
import UploadImageContent from '../screens/MediatorLogin/SubmitContent/UploadImageContent';
import UploadVideoContent from '../screens/MediatorLogin/SubmitContent/UploadVideoContent';
import UploadedImages from '../screens/MediatorLogin/SubmitContent/UploadedImages';
import UploadedVideos from '../screens/MediatorLogin/SubmitContent/UploadedVideos';
import TermsandCondition from '../screens/MediatorLogin/SubmitContent/TermsandCondition';


const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        activeOpacity={0.8}
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 40,
            backgroundColor: COLORS.main,
            borderColor: 'white',
            borderWidth: 2,
        }}>
            {children}
        </View>
    </TouchableOpacity>
)


const HomeStack = ({ navigation }) => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBar: false,
        tabBarStyle: {
            paddingHorizontal: 20,
            paddingTop: 0,
            backgroundColor: COLORS.white,
            borderTopWidth: 0,
            elevation: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        },
    }}>
        <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
            unmountOnBlur: true
        }} />

        <Tab.Screen name='TermsandCondition' component={TermsandCondition} options={{
            unmountOnBlur: true
        }} />
        <Tab.Screen name="UploadedImages" component={UploadedImages} options={{
            unmountOnBlur: true
        }} />
        <Tab.Screen name="UploadedVideos" component={UploadedVideos} options={{
            unmountOnBlur: true
        }} />
    </Tab.Navigator>
)
const SubmitStack = ({ navigation }) => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBar: false,
        tabBarStyle: {
            paddingHorizontal: 20,
            paddingTop: 0,
            backgroundColor: COLORS.white,
            borderTopWidth: 0,
            elevation: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        },
    }}>
        <Tab.Screen name="UploadContentScreen" component={UploadContentScreen} options={{
            unmountOnBlur: true
        }} />
        <Tab.Screen name="UploadImageContent" component={UploadImageContent} options={{
            unmountOnBlur: true
        }} />
        <Tab.Screen name="UploadVideoContent" component={UploadVideoContent} options={{
            unmountOnBlur: true
        }} />
    </Tab.Navigator>
)
const ProfileStack = ({ navigation }) => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBar: false,
        tabBarStyle: {
            paddingHorizontal: 20,
            paddingTop: 0,
            backgroundColor: COLORS.white,
            borderTopWidth: 0,
            elevation: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        },
    }}>
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
            unmountOnBlur: true
        }} />
    </Tab.Navigator>
)

const MediatorSubmitContentBT = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingHorizontal: 20,
                    paddingTop: 0,
                    backgroundColor: COLORS.white,
                    position: 'absolute',
                    borderTopWidth: 0,
                    elevation: 20,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                },
            }}>
            <Tab.Screen name="HomeStack" component={HomeStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    {/* <SVGimage1 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/home.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12, color: COLORS.black }}>Home</Text>
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Image
                                        source={require('../../assets/home.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    {/* <SVGimage1 width={20} height={20} color='red'/> */}
                                </View>
                            )
                            }
                        </View>
                    )
                }} />

            <Tab.Screen name="SubmitStack" component={SubmitStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'row',
                                    // backgroundColor: COLORS.mainlight,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    {/* <SVGimage2 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/plus.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 30,
                                            width: 30,
                                            backgroundColor: COLORS.main,
                                            tintColor: COLORS.black,
                                        }}
                                    />
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {/* <SVGimage2 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/plus.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 30,
                                            width: 30,
                                            // color:COLORS.white
                                            tintColor: COLORS.white,
                                        }}
                                    />
                                </View>
                            )

                            }
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }} />


            <Tab.Screen name="ProfileStack" component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    {/* <SVGimage4 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/profile.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12, color: COLORS.black }}>Profile</Text>
                                </View>

                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {/* <SVGimage4 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/profile.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                </View>
                            )}

                        </View>
                    )
                }} />
        </Tab.Navigator>
    )
}

export default MediatorSubmitContentBT

const styles = StyleSheet.create({})