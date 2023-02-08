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


const Tab = createBottomTabNavigator();

const ProfileStack = ({ navigation }) => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
            // height: 70,
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
        <Tab.Screen name='PaymentOptionTwoScreen' component={PaymentOptionTwoScreen} />
        <Tab.Screen name='CheckoutScreen' component={CheckoutScreen} />
        <Tab.Screen name='CheckoutTwoScreen' component={CheckoutTwoScreen} />
        <Tab.Screen name='ProfileTierManagement' component={ProfileTierManagement} />
        <Tab.Screen name='AdditonalPackages' component={AdditonalPackages} />
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
        <Tab.Screen name='HomeScreen' component={HomeScreen} />
        <Tab.Screen name='CongratsMatchScreen' component={CongratsMatchScreen} />
        <Tab.Screen name='MessageScreen' component={MessageScreen} />
        <Tab.Screen name='ChatingScreen' component={ChatingScreen} />
        <Tab.Screen name='DateModeScreen' component={DateModeScreen} />
        <Tab.Screen name='DateServayScreen' component={DateServayScreen} />
        <Tab.Screen name='CongratsServayScreen' component={CongratsServayScreen} />
    </Tab.Navigator>
)
const LikeStack = ({ }) => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBar: false,
        tabBarStyle: {
            // height: 70,
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
        <Tab.Screen name='Like' component={LikeScreen} />
        <Tab.Screen name='LikeDetailScreen' component={LikeDetailScreen} />
    </Tab.Navigator>
)

const EventStack = ({ }) => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBar: false,
        tabBarStyle: {
            // height: 70,
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
        <Tab.Screen name='EventsScreen' component={EventsScreen} />
        <Tab.Screen name='EventDetails' component={EventDetails} />
        <Tab.Screen name='EventTickets' component={EventTickets} />
        <Tab.Screen name='PaymentOptionScreen' component={PaymentOptionScreen} />
        <Tab.Screen name='EventTicketsBuy' component={EventTicketsBuy} />
        <Tab.Screen name='Foodmenu' component={Foodmenu} />
        <Tab.Screen name='FoodmenuDetail' component={FoodmenuDetail} />
        <Tab.Screen name='CartItems' component={CartItems} />
    </Tab.Navigator>
)

const ChatApp = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
)

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    // height: 70,
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
                                </View>
                            )
                            }
                        </View>
                    )
                }} />

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
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Like</Text>
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
                            )

                            }
                        </View>
                    )
                }} />


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
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Events</Text>
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
                }} />


            <Tab.Screen name="Profile" component={ProfileStack}
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
                                        source={require('../../assets/profile.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Profile</Text>
                                </View>

                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
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
            {/* <Tab.Screen name='CongratsMatchScreen' component={CongratsMatchScreen}
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