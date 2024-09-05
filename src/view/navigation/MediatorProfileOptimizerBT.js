import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SVGimage1 from '../../assets/influencermain.svg';
import SVGimage2 from '../../assets/influencerfeed.svg';
import SVGimage3 from '../../assets/manage.svg';
import SVGimage4 from '../../assets/profile.svg';
import HomeScreen from '../screens/MediatorLogin/ProfileOptimizer/HomeScreen';
import ProfileScreen from '../screens/MediatorLogin/ProfileOptimizer/ProfileScreen';
import AddedScreen from '../screens/MediatorLogin/ProfileOptimizer/AddedScreen';
import SubmitTermAndCondition from '../screens/MediatorLogin/ProfileOptimizer/SubmitTermAndCondition';
import SuggestionScreen from '../screens/MediatorLogin/ProfileOptimizer/SuggestionScreen';


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


const ClientStack = ({ navigation }) => (
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
        }}/>
        <Tab.Screen name='SuggestionScreen' component={SuggestionScreen} options={{
            unmountOnBlur: true
        }}/>
        {/* <Tab.Screen name='YourClients' component={YourClients} /> */}
    </Tab.Navigator>
)
const AddedStack = ({ navigation }) => (
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
        <Tab.Screen name="AddedScreen" component={AddedScreen} options={{
            unmountOnBlur: true
        }}/>
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
        }}/>
        {/* <Tab.Screen name="PaymentTypeDetail" component={PaymentTypeDetail} />
        <Tab.Screen name="TermsAndCondition" component={TermsAndCondition} />
        <Tab.Screen name="ReligionsWorkWith" component={ReligionsWorkWith} /> */}
    </Tab.Navigator>
)

const MediatorProfileOptimizerBT = () => {
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
            <Tab.Screen name="ClientStack" component={ClientStack}
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
                                        source={require('../../assets/Friends.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12, color: COLORS.black }}>Clients</Text>
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Image
                                        source={require('../../assets/Friends.png')}
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

            {/* <Tab.Screen name="AddedStack" component={AddedStack}
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
                                    <Image
                                        source={require('../../assets/plus.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            backgroundColor: COLORS.main,
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
                            )

                            }
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }} /> */}

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

export default MediatorProfileOptimizerBT

const styles = StyleSheet.create({})