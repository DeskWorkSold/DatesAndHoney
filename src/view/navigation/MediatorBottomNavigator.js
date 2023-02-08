import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MediatorDashboardScreen from '../screens/MediatorLogin/MediatorDashboardScreen';
import MediatorProfileScreen from '../screens/MediatorLogin/MediatorProfileScreen';
import MediatorCreateEventScreen from '../screens/MediatorLogin/MediatorCreateEventScreen';
import COLORS from '../../consts/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


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
            width: 60,
            height: 60,
            borderRadius: 35,
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
        <Tab.Screen name='MediatorDashboardScreen' component={MediatorDashboardScreen} />
        {/* <Tab.Screen name='CongratsMatchScreen' component={CongratsMatchScreen} />
        <Tab.Screen name='MessageScreen' component={MessageScreen} /> */}
    </Tab.Navigator>
)

const MediatorBottomNavigator = () => {
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


            <Tab.Screen name="MediatorCreateEventScreen" component={MediatorCreateEventScreen}
                options={{
                    // tabBarBadge: 3,
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: COLORS.mainlight
                                }}>
                                    <Image
                                        source={require('../../assets/plus.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            backgroundColor:COLORS.main,
                                            tintColor: COLORS.black,
                                        }}
                                    />
                                </View>

                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Image
                                        source={require('../../assets/plus.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            // color:COLORS.white
                                            tintColor: COLORS.white,
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }} />

            <Tab.Screen name="MediatorProfileScreen" component={MediatorProfileScreen}
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
                            )

                            }
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

export default MediatorBottomNavigator

const styles = StyleSheet.create({})