import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SettingScreen from '../screens/SettingScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
// import 
import PremiumMembershipScreen from '../screens/PremiumMembershipScreen.js';
import SupportScreen from '../screens/SupportScreen.js';
import RateUsScreen from '../screens/RateUsScreen.js';
import PrivacyPolicy from '../screens/PrivacyPolicy.js';
import HomeScreen from '../screens/HomeScreen.js';
import DrawerContent from '../components/DrawerContent.js';
import BottomNavigator from './BottomNavigator.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../consts/Colors.js';
import ConciregeBT from './ConciregeBT.js';
import { selectUser } from '../../../redux/reducers/Reducers.js';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectionOneQuestionGenderScreen from '../screens/SelectionOne/SelectionOneQuestionGenderScreen.js';
import SelectionOneQuestionMoreAboutCatholicScreen from '../screens/SelectionOne/SelectionOneQuestionMoreAboutCatholicScreen.js';
import SelectionOneQuestionMoreAboutChristianScreen from '../screens/SelectionOne/SelectionOneQuestionMoreAboutChristianScreen.js';
import SelectionOneQuestionMoreAboutJewishScreen from '../screens/SelectionOne/SelectionOneQuestionMoreAboutJewishScreen.js';
import SelectionOneQuestionMoreAboutMuslimScreen from '../screens/SelectionOne/SelectionOneQuestionMoreAboutMuslimScreen.js';
import SelectionOneQuestionMultipleSubstance from '../screens/SelectionOne/SelectionOneQuestionMultipleSubstance.js';
import SelectionOneQuestionPhotoScreen from '../screens/SelectionOne/SelectionOneQuestionPhotoScreen.js';
import SelectionOneQuestionPoliticalviewScreen from '../screens/SelectionOne/SelectionOneQuestionPoliticalviewScreen.js';
import SelectionOneQuestionReligionScreen from '../screens/SelectionOne/SelectionOneQuestionReligionScreen.js';
import SelectionOneQuestionConvertedReligion from '../screens/SelectionOne/SelectionOneQuestionConvertedReligion.js';
import SelectionOneQuestionEthnicityScreen from '../screens/SelectionOne/SelectionOneQuestionEthnicityScreen.js';
import PaymentOptionScreen from '../screens/PaymentOptionScreen.js';
import AddCardScreen from '../screens/AddCardScreen.js';
import CheckoutScreen from '../screens/CheckoutScreen.js';
import PremiumMembershipDetailScreen from '../screens/PremiumMembershipDetailScreen.js';
import Concirege from '../screens/ConciergeManagement/Concirege.js';
import ConciregeProfile from '../screens/ConciergeManagement/ConciregeProfile.js';
import ChatingScreen from '../screens/ConciergeManagement/ChatingScreen.js';
import CurrentBalanceScreen from '../screens/CurrentBalanceScreen.js';
import CheckoutScreenMembership from '../screens/CheckoutScreenMembership.js';
import CheckoutScreenAdditionalPackage from '../screens/CheckoutScreenAdditionalPackage.js';
import CheckoutScreenConcriege from '../screens/CheckoutScreenConcriege.js';
import PaymentOptionScreenDeposit from '../screens/PaymentOptionScreenDeposit.js';
import Paywall from '../screens/Paywall.js';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


// const SelectionOne = () => {
//     // console.log('here im');
//     return (
//         <Drawer.Navigator screenOptions={{
//             headerShown: false,
//         }}>
//             <Drawer.Screen name="SelectionOneQuestionGenderScreen" component={SelectionOneQuestionGenderScreen} />
//             <Drawer.Screen name="SelectionOneQuestionPoliticalviewScreen" component={SelectionOneQuestionPoliticalviewScreen} />
//             <Drawer.Screen name="SelectionOneQuestionPhotoScreen" component={SelectionOneQuestionPhotoScreen} />
//             <Drawer.Screen name="SelectionOneQuestionReligionScreen" component={SelectionOneQuestionReligionScreen} />
//             <Drawer.Screen name="SelectionOneQuestionMoreAboutCatholicScreen" component={SelectionOneQuestionMoreAboutCatholicScreen} />
//             <Drawer.Screen name="SelectionOneQuestionMoreAboutChristianScreen" component={SelectionOneQuestionMoreAboutChristianScreen} />
//             <Drawer.Screen name="SelectionOneQuestionMoreAboutJewishScreen" component={SelectionOneQuestionMoreAboutJewishScreen} />
//             <Drawer.Screen name="SelectionOneQuestionMoreAboutMuslimScreen" component={SelectionOneQuestionMoreAboutMuslimScreen} />
//             <Drawer.Screen name="SelectionOneQuestionConvertedReligion" component={SelectionOneQuestionConvertedReligion} />
//             <Drawer.Screen name="SelectionOneQuestionEthnicityScreen" component={SelectionOneQuestionEthnicityScreen} />
//             <Drawer.Screen name="SelectionOneQuestionMultipleSubstance" component={SelectionOneQuestionMultipleSubstance} />
//         </Drawer.Navigator>
//     )
// }


const PremiumMembershipStack = ({ navigation }) => (
    <Stack.Navigator initialRouteName='PremiumMembershipScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PremiumMembershipScreen" component={PremiumMembershipScreen} />
        <Stack.Screen name="PremiumMembershipDetailScreen" component={PremiumMembershipDetailScreen} />
        <Stack.Screen name="PaymentOptionScreen" component={PaymentOptionScreen} />
        <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
        <Stack.Screen name="CheckoutScreenMembership" component={CheckoutScreenMembership} />
        <Stack.Screen name="CheckoutScreenAdditionalPackage" component={CheckoutScreenAdditionalPackage} />
        <Stack.Screen name="PaymentOptionScreenDeposit" component={PaymentOptionScreenDeposit} />
        <Stack.Screen name="CurrentBalanceScreen" component={CurrentBalanceScreen} />
        {/* <Stack.Screen name="Paywall" component={Paywall} /> */}
    </Stack.Navigator>
);


const ConciergeManagementStack = ({ navigation }) => (
    <Stack.Navigator initialRouteName='Concirege' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Concirege" component={Concirege} options={{
            unmountOnBlur: true
        }} />
        <Stack.Screen name="ConciregeProfile" component={ConciregeProfile} options={{
            unmountOnBlur: true
        }} />
        <Stack.Screen name="PaymentOptionScreen" component={PaymentOptionScreen} />
        <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
        {/* <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} /> */}
        <Stack.Screen name="CheckoutScreenConcriege" component={CheckoutScreenConcriege} />
        <Stack.Screen name="ChatingScreen" component={ChatingScreen} />
    </Stack.Navigator>
);


const DrawerNavigator = () => {
    // const dispatch = useDispatch();
    const user = useSelector(selectUser)
    // console.log(user?.PackageId);

    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: COLORS.main,
                drawerActiveTintColor: COLORS.gray,
                drawerInactiveTintColor: COLORS.white,
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                },
                // drawerHideStatusBarOnOpen:true
            }}>

            <Drawer.Screen name="Home" component={BottomNavigator}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icons name="home" size={18} color={color} />
                    ),
                }} />

            <Drawer.Screen name="Setting" component={SettingScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icons name="settings-sharp" size={18} color={color} />
                    ),
                }}
            />

            <Drawer.Screen name="Premium Membership" component={PremiumMembershipStack}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="crown" size={18} color={color} />
                    ),
                }}
            />

            {user?.Lookingfor != 'Events Only' &&
                <Drawer.Screen name="Concierge Management" component={ConciergeManagementStack}
                    options={{
                        drawerIcon: ({ color }) => (
                            <FontAwesome5 name="user-friends" size={18} color={color} />
                        ),
                    }}
                />
            }

            <Drawer.Screen name="Support" component={SupportScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <AntDesign name="customerservice" size={18} color={color} />
                    ),
                }}
            />

            <Drawer.Screen name="Rate Us" component={RateUsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="star" size={18} color={color} />
                    ),
                }}
            />

            <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="shield-key" size={18} color={color} />
                    ),
                }}
            />

            {/* {false &&
                <Drawer.Screen name="SelectionOne" component={SelectionOne}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon name="shield-key" size={22} color={color} />
                        ),
                    }}
                />
            } */}

        </Drawer.Navigator>
    )
}

export default DrawerNavigator