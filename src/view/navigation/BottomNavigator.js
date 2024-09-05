import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import COLORS from '../../consts/Colors';

import HomeScreen from '../screens/HomeScreen.js';
import LikeScreen from '../screens/LikeScreen.js';
import EventsScreen from '../screens/EventsScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import LikeDetailScreen from '../screens/LikeDetailScreen';
import CongratsMatchScreen from '../screens/CongratsMatchScreen';
import MessageScreen from '../screens/MessageScreen';
import ChatingScreen from '../screens/ChatingScreen';
import DateModeScreen from '../screens/DateModeScreen';
import DateServayScreen from '../screens/DateServayScreen';
import CongratsServayScreen from '../screens/CongratsServayScreen';
import SettingScreen from '../screens/SettingScreen.js';
import TermsandCondition from '../screens/TermsandCondition.js';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import RemoveFlakeScreen from '../screens/RemoveFlakeScreen.js';
import CurrentBalanceScreen from '../screens/CurrentBalanceScreen';
import PaymentOptionScreen from '../screens/PaymentOptionScreen';
import AddCardScreen from '../screens/AddCardScreen';
import PaymentOptionTwoScreen from '../screens/PaymentOptionTwoScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CheckoutTwoScreen from '../screens/CheckoutTwoScreen';
import EventDetails from '../screens/EventDetails';
import EventTickets from '../screens/EventTickets';
import EventTicketsBuy from '../screens/EventTicketsBuy';
import Foodmenu from '../screens/Foodmenu';
import FoodmenuDetail from '../screens/FoodmenuDetail';
import CartItems from '../screens/CartItems';
import ProfileTierManagement from '../screens/ProfileTierManagement';
import AdditonalPackages from '../screens/AdditonalPackages';
import NetworkErrorScreen from '../screens/NetworkErrorScreen';
import { selectUser, selectUsersLikedYou } from '../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import EditUserCredentials from '../components/EditUserCredentials';
import ChatingScreenTwo from '../screens/ChatingScreenTwo';
import ConciregeProfile from '../screens/ConciergeManagement/ConciregeProfile';
import PaymentOptionScreenFood from '../screens/PaymentOptionScreenFood';
import AddCardScreenFood from '../screens/AddCardScreenFood';
import CheckoutScreenFood from '../screens/CheckoutScreenFood';
import CheckoutScreenFlakeRemove from '../screens/CheckoutScreenFlakeRemove';
import CheckoutScreenEvent from '../screens/CheckoutScreenEvents';
import CheckoutScreenDeposit from '../screens/CheckoutScreenDeposit';
import AddCardScreenDeposit from '../screens/AddCardScreenDeposit';
import PaymentOptionScreenDeposit from '../screens/PaymentOptionScreenDeposit';
import { useNavigation } from '@react-navigation/native';
import EventDetailsForPrivate from '../screens/EventDetailsForPrivate';
import { useEffect } from 'react';
import EventDetailsForPublic from '../screens/EventDetailsForPublic';


const Tab = createBottomTabNavigator();

const ProfileStack = ({ navigation }) => (
    <Tab.Navigator screenOptions={{
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
        <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
        <Tab.Screen name='SettingScreen' component={SettingScreen} />
        <Tab.Screen name='TermsandCondition' component={TermsandCondition} />
        <Tab.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
        <Tab.Screen name='RemoveFlakeScreen' component={RemoveFlakeScreen} />
        <Tab.Screen name='CurrentBalanceScreen' component={CurrentBalanceScreen} />
        <Tab.Screen name='PaymentOptionScreen' component={PaymentOptionScreen} />
        <Tab.Screen name='AddCardScreen' component={AddCardScreen} />
        <Tab.Screen name='AddCardScreenDeposit' component={AddCardScreenDeposit} />
        <Tab.Screen name='PaymentOptionTwoScreen' component={PaymentOptionTwoScreen} />
        <Tab.Screen name='PaymentOptionScreenDeposit' component={PaymentOptionScreenDeposit} />
        <Tab.Screen name='CheckoutScreenFlakeRemove' component={CheckoutScreenFlakeRemove} />
        <Tab.Screen name='CheckoutScreenDeposit' component={CheckoutScreenDeposit} />
        <Tab.Screen name='CheckoutTwoScreen' component={CheckoutTwoScreen} />
        <Tab.Screen name='ProfileTierManagement' component={ProfileTierManagement} />
        <Tab.Screen name='AdditonalPackages' component={AdditonalPackages} />
        <Tab.Screen name='EditUserCredentials' component={EditUserCredentials} />
    </Tab.Navigator>
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
        <Tab.Screen options={{
            unmountOnBlur: true
        }} name='HomeScreen' component={HomeScreen} />
        <Tab.Screen name='NetworkErrorScreen' component={NetworkErrorScreen} />
        <Tab.Screen name='CongratsMatchScreen' component={CongratsMatchScreen} />
        {/* <Tab.Screen name='MessageScreen' component={MessageScreen} /> */}
        <Tab.Screen name='ChatingScreen' component={ChatingScreen} />
        <Tab.Screen name='DateModeScreen' component={DateModeScreen} />
        <Tab.Screen name='DateServayScreen' component={DateServayScreen} />
        <Tab.Screen name='CongratsServayScreen' component={CongratsServayScreen} />
    </Tab.Navigator>
)
const LikeStack = ({ }) => {
    const usersLikedYou = useSelector(selectUsersLikedYou)
    const user = useSelector(selectUser)
    // console.log('Userlikedyou',usersLikedYou);
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBar: false,
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
            {user?.PackageId > 0 ?
                <Tab.Screen name='LikeDetailScreen' component={LikeDetailScreen} />
                :
                <Tab.Screen name='Like' component={LikeScreen} />
            }
        </Tab.Navigator>
    )
}

const EventStack = ({ }) => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBar: false,
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
            <Tab.Screen name='EventsScreen' component={EventsScreen} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='EventDetailsForPrivate' component={EventDetailsForPrivate} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='EventDetailsForPublic' component={EventDetailsForPublic} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='EventDetails' component={EventDetails} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='EventTickets' component={EventTickets} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='EventTicketsBuy' component={EventTicketsBuy} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='Foodmenu' component={Foodmenu} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='FoodmenuDetail' component={FoodmenuDetail} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='CartItems' component={CartItems} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='PaymentOptionScreen' component={PaymentOptionScreen} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='AddCardScreen' component={AddCardScreen} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='PaymentOptionTwoScreen' component={PaymentOptionTwoScreen} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='CheckoutScreenEvent' component={CheckoutScreenEvent} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='CheckoutScreenFood' component={CheckoutScreenFood} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='CurrentBalanceScreen' component={CurrentBalanceScreen} screenOptions={{ _setGestureState: false, unmountOnBlur: true }} />
            <Tab.Screen name='CheckoutTwoScreen' component={CheckoutTwoScreen} screenOptions={{ unmountOnBlur: true }} />
            {/* food card */}
            <Tab.Screen name='PaymentOptionScreenFood' component={PaymentOptionScreenFood} screenOptions={{ unmountOnBlur: true }} />
            <Tab.Screen name='AddCardScreenFood' component={AddCardScreenFood} screenOptions={{ unmountOnBlur: true }} />
            {/* <Tab.Screen name='CheckoutScreenFood' component={CheckoutScreenFood} screenOptions={{ unmountOnBlur: true }} /> */}
        </Tab.Navigator>
    )
}

const MessageStack = ({ navigation }) => (
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
        <Tab.Screen name='MessageScreen' component={MessageScreen} />
        <Tab.Screen name='ChatingScreen' component={ChatingScreen} />
        <Tab.Screen name="ConciregeProfile" component={ConciregeProfile} options={{
            unmountOnBlur: true
        }} />
    </Tab.Navigator>
    // <Tab.Navigator screenOptions={{
    //     headerShown: false,
    //     tabBar: false,
    //     tabBarStyle: {
    //         height: 70,
    //         paddingHorizontal: 20,
    //         paddingTop: 0,
    //         backgroundColor: COLORS.white,
    //         position: 'absolute',
    //         borderTopWidth: 0,
    //         elevation: 20,
    //         borderTopRightRadius: 20,
    //         borderTopLeftRadius: 20,
    //     },
    // }}>
    //     <Tab.Screen name="MessageScreen" component={MessageScreen} />
    //     <Tab.Screen name='ChatingScreen' component={ChatingScreen} />
    // </Tab.Navigator>
)


const BottomNavigator = ({ navigation }) => {
    const user = useSelector(selectUser)
    // console.log(user?.Lookingfor);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    // display: user?.Lookingfor == 'Events Only' ? 'none':'flex',
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
            {user?.Lookingfor !== 'Events Only' ?
                <Tab.Screen name="HomeScreens" component={HomeStack}
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
                                        <Image
                                            source={require('../../assets/home.png')}
                                            resizeMode='contain'
                                            style={{
                                                height: 20,
                                                width: 20,
                                                tintColor: focused ? COLORS.black : COLORS.gray2,
                                            }}
                                        />
                                        <Text style={{ paddingLeft: 5, fontSize: 12, color: COLORS.gray }}>Home</Text>
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
                                    </View>
                                )
                                }
                            </View>
                        )
                    }} />
                : null}
            {user?.Lookingfor !== 'Events Only' ?
                <Tab.Screen name="LikeScreen" component={LikeStack}
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
                                        <Image
                                            source={require('../../assets/like.png')}
                                            resizeMode='contain'
                                            style={{
                                                height: 20,
                                                width: 20,
                                                tintColor: focused ? COLORS.black : COLORS.gray2,
                                            }}
                                        />
                                        <Text style={{ paddingLeft: 5, fontSize: 12, color: COLORS.gray }}>Like</Text>
                                    </View>
                                ) : (
                                    <View style={{
                                        alignItems: 'center', justifyContent: 'center',
                                    }}>
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
                                )}
                            </View>
                        )
                    }}
                /> : null}

            <Tab.Screen name="Events" component={EventStack}
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
                                    borderRadius: 5
                                }}>
                                    <Image
                                        source={require('../../assets/events.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12, color: COLORS.gray }}>Events</Text>
                                </View>

                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
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
                }}
            />

            <Tab.Screen name="Profile" component={ProfileStack}
                options={{
                    tabBarButton: () => null,
                    // tabBarIcon: ({ focused, color }) => (
                    //     <View>
                    //         {focused == true ? (
                    //             <View style={{
                    //                 alignItems: 'center', justifyContent: 'center',
                    //                 flexDirection: 'row',
                    //                 backgroundColor: COLORS.mainlight,
                    //                 padding: 5,
                    //                 borderRadius: 5
                    //             }}>
                    //                 <Image
                    //                     source={require('../../assets/profile.png')}
                    //                     resizeMode='contain'
                    //                     style={{
                    //                         height: 20,
                    //                         width: 20,
                    //                         tintColor: focused ? COLORS.black : COLORS.gray2,
                    //                     }}
                    //                 />
                    //                 <Text style={{ paddingLeft: 5, fontSize: 12, color: COLORS.gray }}>Profile</Text>
                    //             </View>

                    //         ) : (
                    //             <View style={{
                    //                 alignItems: 'center', justifyContent: 'center',
                    //             }}>
                    //                 <Image
                    //                     source={require('../../assets/profile.png')}
                    //                     resizeMode='contain'
                    //                     style={{
                    //                         height: 20,
                    //                         width: 20,
                    //                         tintColor: focused ? COLORS.black : COLORS.gray2,
                    //                     }}
                    //                 />
                    //             </View>
                    //         )}

                    //     </View>
                    // )
                }} />
            {user?.Lookingfor !== 'Events Only' ?
                <Tab.Screen name="Message" component={MessageStack}
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
                                        <Image
                                            source={require('../../assets/message.png')}
                                            resizeMode='contain'
                                            style={{
                                                height: 20,
                                                width: 20,
                                                tintColor: focused ? COLORS.black : COLORS.gray2,
                                            }}
                                        />
                                        <Text style={{ paddingLeft: 5, fontSize: 12, color: COLORS.gray }}>Message</Text>
                                    </View>

                                ) : (
                                    <View style={{
                                        alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Image
                                            source={require('../../assets/message.png')}
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
                : null}
            {/* <Tab.Screen name='SelectionOne' component={SelectionOne}
                options={() => ({
                    tabBarButton: () => null,
                })} /> */}
            {/* <Tab.Screen name='MessageScreen' component={MessageScreen}
                options={() => ({
                    tabBarButton: () => null,
                })} />
                <Tab.Screen name='ChatingScreen' component={ChatingScreen}
                options={() => ({
                    tabBarButton: () => null,
                })} /> */}
        </Tab.Navigator>
    )
}

export default BottomNavigator

const styles = StyleSheet.create({})