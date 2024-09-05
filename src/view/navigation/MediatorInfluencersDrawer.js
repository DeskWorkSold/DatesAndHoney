import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SettingScreen from '../screens/SettingScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import PremiumMembershipScreen from '../screens/PremiumMembershipScreen.js';
import SupportScreen from '../screens/SupportScreen.js';
import RateUsScreen from '../screens/RateUsScreen.js';
import PrivacyPolicy from '../screens/PrivacyPolicy.js';
import HomeScreen from '../screens/HomeScreen.js';
import DrawerContent from '../components/DrawerContent.js';
import BottomNavigator from './BottomNavigator.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../consts/Colors.js';
import MediatorTalentAgencyBT from './MediatorTalentAgencyBT.js';
import MediatorSubmitContentBT from './MediatorSubmitContentBT.js';
import DrawerContentForMediator from '../components/DrawerContentForMediator.js';
import MediatorInfluencersBT from './MediatorInfluencersBT.js';



const Drawer = createDrawerNavigator();

const MediatorInfluencersDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Agency"
            drawerContent={props => <DrawerContentForMediator {...props} />}
            screenOptions={{
                headerShown: false,
                drawerInactiveBackgroundColor: '#3A485F',
                drawerActiveBackgroundColor: COLORS.main,
                drawerActiveTintColor: COLORS.gray,
                drawerInactiveTintColor: COLORS.white,
                drawerLabelStyle: {
                    // marginLeft: -25,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                },
                // drawerHideStatusBarOnOpen:true
            }}>
            <Drawer.Screen name="Influencers" component={MediatorInfluencersBT}
            options={{ drawerLabel: 'Influencers' }}
            />
            <Drawer.Screen name="Submit Content" component={MediatorSubmitContentBT}
            options={{ drawerLabel: 'Submit Content' }}
            />
            
            {/* <Drawer.Screen name="Premium Membership" component={ProfileScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="crown" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Support" component={SupportScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <AntDesign name="customerservice" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Rate Us" component={RateUsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="star" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="shield-key" size={22} color={color} />
                    ),
                }}
            /> */}
        </Drawer.Navigator>
    )
}

export default MediatorInfluencersDrawer