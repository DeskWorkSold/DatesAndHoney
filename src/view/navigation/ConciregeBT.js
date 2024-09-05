import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SVGimage1 from '../../assets/influencermain.svg';
import SVGimage2 from '../../assets/influencerfeed.svg';
import SVGimage3 from '../../assets/manage.svg';
import SVGimage4 from '../../assets/profile.svg';
import Home from '../screens/ConciergeManagement/Home';
import Like from '../screens/ConciergeManagement/Like';
import Management from '../screens/ConciergeManagement/Management';
import Concirege from '../screens/ConciergeManagement/Concirege';
import ConciregeProfile from '../screens/ConciergeManagement/ConciregeProfile';
// import FeedScreen from '../screens/MediatorLogin/MatchCoordinator/FeedScreen';
// import ManageScreen from '../screens/MediatorLogin/MatchCoordinator/ManageScreen';
// import ProfileScreen from '../screens/MediatorLogin/MatchCoordinator/ProfileScreen';
// import ArticalDetailScreen from '../screens/MediatorLogin/MatchCoordinator/ArticalDetailScreen';
// import PaymentType from '../screens/MediatorLogin/MatchCoordinator/PaymentType';
// import PaymentTypeDetail from '../screens/MediatorLogin/MatchCoordinator/PaymentTypeDetail';
// import TermsAndCondition from '../screens/MediatorLogin/MatchCoordinator/TermsAndCondition';
// import ReligionsWorkWith from '../screens/MediatorLogin/MatchCoordinator/ReligionsWorkWith';
// import ChatingScreen from '../screens/MediatorLogin/MatchCoordinator/ChatingScreen';


const Tab = createBottomTabNavigator();


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
        <Tab.Screen name='Home' component={Home} options={{
            unmountOnBlur: true
        }} />
    </Tab.Navigator>
)
const LikeStack = ({ navigation }) => (
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
        <Tab.Screen name="Like" component={Like} options={{
            unmountOnBlur: true
        }} />
    </Tab.Navigator>
)
const ManageStack = ({ navigation }) => (
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
        <Tab.Screen name="Management" component={Management} options={{
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
        <Tab.Screen name="Concirege" component={Concirege} options={{
            unmountOnBlur: true
        }} />
        <Tab.Screen name="ConciregeProfile" component={ConciregeProfile} options={{
            unmountOnBlur: true
        }} />
    </Tab.Navigator>
)

const ConciregeBT = () => {
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
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Home</Text>
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

            <Tab.Screen name="LikeStack" component={LikeStack}
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
                                    {/* <SVGimage2 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/like.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Like</Text>
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {/* <SVGimage2 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/like.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                </View>
                            )

                            }
                        </View>
                    )
                }} />


            <Tab.Screen name="ManageStack" component={ManageStack}
                options={{
                    // tabBarBadge: 3,
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight,
                                    padding: 5,
                                    borderRadius: 5,
                                }}>
                                    {/* <SVGimage3 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/events.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Manage</Text>
                                </View>

                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {/* <SVGimage3 width={20} height={20} style={{
                                        tintColor: focused ? COLORS.black : COLORS.gray2,
                                    }} /> */}
                                    <Image
                                        source={require('../../assets/events.png')}
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
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Concierge</Text>
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

export default ConciregeBT

const styles = StyleSheet.create({})