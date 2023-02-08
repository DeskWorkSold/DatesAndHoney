import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginWithNumberScreen from '../screens/LoginWithNumberScreen';
import LoginWithOTPScreen from '../screens/LoginWithOTPScreen';
import NameScreen from '../screens/NameScreen';
import DateOfBirthScreen from '../screens/DateOfBirthScreen';
import LoginWithEmail from '../screens/LoginWithEmail';
import NotificationScreen from '../screens/NotificationScreen';
import QuestionGenderScreen from '../screens/QuestionGenderScreen';
import QuestionYourInterestScreen from '../screens/QuestionYourInterestScreen';
import QuestionWantKidsScreen from '../screens/QuestionWantKidsScreen';
import QuestionBioScreen from '../screens/QuestionBioScreen';
import QuestionProfessionallyScreen from '../screens/QuestionProfessionallyScreen';
import QuestionMusicScreen from '../screens/QuestionMusicScreen';
import QuestionPoliticalviewScreen from '../screens/QuestionPoliticalviewScreen';
import QuestionPoliticalPartnerviewScreen from '../screens/QuestionPoliticalPartnerviewScreen';
import QuestionIntroandExtroScreen from '../screens/QuestionIntroandExtroScreen';
import QuestionPIntroandExtroScreen from '../screens/QuestionPIntroandExtroScreen';
import QuestionPhotoScreen from '../screens/QuestionPhotoScreen';
import QuestionTypeofRelationScreen from '../screens/QuestionTypeofRelationScreen';
import QuestionSmokeScreen from '../screens/QuestionSmokeScreen';
import QuestionVapeScreen from '../screens/QuestionVapeScreen';
import QuestionMarijuanaScreen from '../screens/QuestionMarijuanaScreen';
import QuestionDrugsScreen from '../screens/QuestionDrugsScreen';
import QuestionDrinkScreen from '../screens/QuestionDrinkScreen';
import QuestionInstagramScreen from '../screens/QuestionInstagramScreen';
import QuestionOccupationScreen from '../screens/QuestionOccupationScreen';
import QuestionInterestScreen from '../screens/QuestionInterestScreen';
import QuestionEducationScreen from '../screens/QuestionEducationScreen';
import QuestionRelationshipScreen from '../screens/QuestionRelationshipScreen';
import QuestionReligionScreen from '../screens/QuestionReligionScreen';
import QuestionMoreAboutChristianScreen from '../screens/QuestionMoreAboutChristianScreen';
import QuestionMoreAboutJewishScreen from '../screens/QuestionMoreAboutJewishScreen';
import QuestionMoreAboutCatholicScreen from '../screens/QuestionMoreAboutCatholicScreen';
import QuestionMoreAboutMuslimScreen from '../screens/QuestionMoreAboutMuslimScreen';
import QuestionDietScreen from '../screens/QuestionDietScreen';
import QuestionPartnerDietScreen from '../screens/QuestionPartnerDietScreen';
import QuestionFavFoodScreen from '../screens/QuestionFavFoodScreen';
import QuestionExersizeScreen from '../screens/QuestionExersizeScreen';
import QuestionExersizePartnerScreen from '../screens/QuestionExersizePartnerScreen';
import QuestionEthnicityScreen from '../screens/QuestionEthnicityScreen';
import QuestionEthnicityPartnerScreen from '../screens/QuestionEthnicityPartnerScreen';
import QuestionDescribeYouScreen from '../screens/QuestionDescribeYouScreen';
import QuestionDescribePartnerScreen from '../screens/QuestionDescribePartnerScreen';
import QuestionDisabilityScreen from '../screens/QuestionDisabilityScreen';
import QuestionDisabilityPartnerScreen from '../screens/QuestionDisabilityPartnerScreen';
import QuestionHeightScreen from '../screens/QuestionHeightScreen';
import QuestionHeightPartnerScreen from '../screens/QuestionHeightPartnerScreen';
import QuestionBuildTypeScreen from '../screens/QuestionBuildTypeScreen';
import QuestionBuildTypePartnerScreen from '../screens/QuestionBuildTypePartnerScreen';
import QuestionReferenceEmailScreen from '../screens/QuestionReferenceEmailScreen';
import QuestionDealBreakandMakeScreen from '../screens/QuestionDealBreakandMakeScreen';
import QuestionPartnerConditionScreen from '../screens/QuestionPartnerConditionScreen';
import QuestionLongestRelationshipScreen from '../screens/QuestionLongestRelationshipScreen';
import QuestionNextRelationshipTimeScreen from '../screens/QuestionNextRelationshipTimeScreen';
import QuestionMovieTypeScreen from '../screens/QuestionMovieTypeScreen';
import QuestionInBedScreen from '../screens/QuestionInBedScreen';
import QuestionInLifeScreen from '../screens/QuestionInLifeScreen';
import QuestionCuddlingScreen from '../screens/QuestionCuddlingScreen';
import QuestionRelationshipLookingScreen from '../screens/QuestionRelationshipLookingScreen';
import QuestionClingyScreen from '../screens/QuestionClingyScreen';
import QuestionCongratulationScreen from '../screens/QuestionCongratulationScreen';

//Mediator screens
import MediatorLoginWithNumberScreen from '../screens/MediatorLogin/LoginWithNumberScreen';
import MediatorLoginWithOTPScreen from '../screens/MediatorLogin/LoginWithOTPScreen';
import MediatorNameScreen from '../screens/MediatorLogin/NameScreen';
import MediatorDateOfBirthScreen from '../screens/MediatorLogin/DateOfBirthScreen';
// import LoginWithEmail from '../screens/MediatorLogin/LoginWithEmail';
// import NotificationScreen from '../screens/MediatorLogin/NotificationScreen';
import MediatorQuestionGenderScreen from '../screens/MediatorLogin/QuestionGenderScreen';
import MediatorQuestionYourInterestScreen from '../screens/MediatorLogin/QuestionYourInterestScreen';
import MediatorQuestionWantKidsScreen from '../screens/MediatorLogin/QuestionWantKidsScreen';
import MediatorQuestionBioScreen from '../screens/MediatorLogin/QuestionBioScreen';
import MediatorQuestionProfessionallyScreen from '../screens/MediatorLogin/QuestionProfessionallyScreen';
import MediatorQuestionMusicScreen from '../screens/MediatorLogin/QuestionMusicScreen';
import MediatorQuestionPoliticalviewScreen from '../screens/MediatorLogin/QuestionPoliticalviewScreen';
import MediatorQuestionPoliticalPartnerviewScreen from '../screens/MediatorLogin/QuestionPoliticalPartnerviewScreen';
import MediatorQuestionIntroandExtroScreen from '../screens/MediatorLogin/QuestionIntroandExtroScreen';
import MediatorQuestionPIntroandExtroScreen from '../screens/MediatorLogin/QuestionPIntroandExtroScreen';
import MediatorQuestionPhotoScreen from '../screens/MediatorLogin/QuestionPhotoScreen';
import MediatorQuestionTypeofRelationScreen from '../screens/MediatorLogin/QuestionTypeofRelationScreen';
import MediatorQuestionSmokeScreen from '../screens/MediatorLogin/QuestionSmokeScreen';
import MediatorQuestionVapeScreen from '../screens/MediatorLogin/QuestionVapeScreen';
import MediatorQuestionMarijuanaScreen from '../screens/MediatorLogin/QuestionMarijuanaScreen';
import MediatorQuestionDrugsScreen from '../screens/MediatorLogin/QuestionDrugsScreen';
import MediatorQuestionDrinkScreen from '../screens/MediatorLogin/QuestionDrinkScreen';
import MediatorQuestionInstagramScreen from '../screens/MediatorLogin/QuestionInstagramScreen';
import MediatorQuestionOccupationScreen from '../screens/MediatorLogin/QuestionOccupationScreen';
import MediatorQuestionInterestScreen from '../screens/MediatorLogin/QuestionInterestScreen';
import MediatorQuestionEducationScreen from '../screens/MediatorLogin/QuestionEducationScreen';
import MediatorQuestionRelationshipScreen from '../screens/MediatorLogin/QuestionRelationshipScreen';
import MediatorQuestionReligionScreen from '../screens/MediatorLogin/QuestionReligionScreen';
import MediatorQuestionMoreAboutChristianScreen from '../screens/MediatorLogin/QuestionMoreAboutChristianScreen';
import MediatorQuestionMoreAboutJewishScreen from '../screens/MediatorLogin/QuestionMoreAboutJewishScreen';
import MediatorQuestionMoreAboutCatholicScreen from '../screens/MediatorLogin/QuestionMoreAboutCatholicScreen';
import MediatorQuestionMoreAboutMuslimScreen from '../screens/MediatorLogin/QuestionMoreAboutMuslimScreen';
import MediatorQuestionDietScreen from '../screens/MediatorLogin/QuestionDietScreen';
import MediatorQuestionPartnerDietScreen from '../screens/MediatorLogin/QuestionPartnerDietScreen';
import MediatorQuestionFavFoodScreen from '../screens/MediatorLogin/QuestionFavFoodScreen';
import MediatorQuestionExersizeScreen from '../screens/MediatorLogin/QuestionExersizeScreen';
import MediatorQuestionExersizePartnerScreen from '../screens/MediatorLogin/QuestionExersizePartnerScreen';
import MediatorQuestionEthnicityScreen from '../screens/MediatorLogin/QuestionEthnicityScreen';
import MediatorQuestionEthnicityPartnerScreen from '../screens/MediatorLogin/QuestionEthnicityPartnerScreen';
import MediatorQuestionDescribeYouScreen from '../screens/MediatorLogin/QuestionDescribeYouScreen';
import MediatorQuestionDescribePartnerScreen from '../screens/MediatorLogin/QuestionDescribePartnerScreen';
import MediatorQuestionDisabilityScreen from '../screens/MediatorLogin/QuestionDisabilityScreen';
import MediatorQuestionDisabilityPartnerScreen from '../screens/MediatorLogin/QuestionDisabilityPartnerScreen';
import MediatorQuestionHeightScreen from '../screens/MediatorLogin/QuestionHeightScreen';
import MediatorQuestionHeightPartnerScreen from '../screens/MediatorLogin/QuestionHeightPartnerScreen';
import MediatorQuestionBuildTypeScreen from '../screens/MediatorLogin/QuestionBuildTypeScreen';
import MediatorQuestionBuildTypePartnerScreen from '../screens/MediatorLogin/QuestionBuildTypePartnerScreen';
import MediatorQuestionReferenceEmailScreen from '../screens/MediatorLogin/QuestionReferenceEmailScreen';
import MediatorQuestionDealBreakandMakeScreen from '../screens/MediatorLogin/QuestionDealBreakandMakeScreen';
import MediatorQuestionPartnerConditionScreen from '../screens/MediatorLogin/QuestionPartnerConditionScreen';
import MediatorQuestionLongestRelationshipScreen from '../screens/MediatorLogin/QuestionLongestRelationshipScreen';
import MediatorQuestionNextRelationshipTimeScreen from '../screens/MediatorLogin/QuestionNextRelationshipTimeScreen';
import MediatorQuestionMovieTypeScreen from '../screens/MediatorLogin/QuestionMovieTypeScreen';
import MediatorQuestionInBedScreen from '../screens/MediatorLogin/QuestionInBedScreen';
import MediatorQuestionInLifeScreen from '../screens/MediatorLogin/QuestionInLifeScreen';
import MediatorQuestionCuddlingScreen from '../screens/MediatorLogin/QuestionCuddlingScreen';
import MediatorQuestionRelationshipLookingScreen from '../screens/MediatorLogin/QuestionRelationshipLookingScreen';
import MediatorQuestionClingyScreen from '../screens/MediatorLogin/QuestionClingyScreen';
import MediatorLoginWithEmail from '../screens/MediatorLogin/LoginWithEmail';
import MediatorQuestionRelationshipStatus from '../screens/MediatorLogin/QuestionRelationshipStatus';
import MediatorQuestionRequestAcess from '../screens/MediatorLogin/QuestionRequestAcess';


import HomeScreen from '../screens/HomeScreen';
import LikeDetailScreen from '../screens/LikeDetailScreen';
import { useDispatch, useSelector } from 'react-redux';
import { login, mediatorLogin, packages, selectMediatorUser, selectUser, status } from '../../../redux/reducers/Reducers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DrawerNavigator from './DrawerNavigator';
import MediatorApprovalScreen from '../screens/MediatorLogin/MediatorApprovalScreen';
import MediatorDashboardScreen from '../screens/MediatorLogin/MediatorDashboardScreen';
import MediatorBottomNavigator from './MediatorBottomNavigator';



const Stack = createNativeStackNavigator();

const MadiatorStack = ({ navigation }) => (
    <Stack.Navigator initialRouteName='MediatorLoginWithNumberScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MediatorLoginWithNumberScreen" component={MediatorLoginWithNumberScreen} />
        <Stack.Screen name="MediatorLoginWithOTPScreen" component={MediatorLoginWithOTPScreen} />
        {/* <Stack.Screen name="MediatorLoginWithEmail" component={MediatorLoginWithEmail} /> */}
        <Stack.Screen name="MediatorQuestionPhotoScreen" component={MediatorQuestionPhotoScreen} />
        <Stack.Screen name="MediatorNameScreen" component={MediatorNameScreen} />
        <Stack.Screen name="MediatorDateOfBirthScreen" component={MediatorDateOfBirthScreen} />
        <Stack.Screen name="MediatorQuestionGenderScreen" component={MediatorQuestionGenderScreen} />
        <Stack.Screen name="MediatorQuestionYourInterestScreen" component={MediatorQuestionYourInterestScreen} />
        <Stack.Screen name="MediatorQuestionWantKidsScreen" component={MediatorQuestionWantKidsScreen} />
        <Stack.Screen name="MediatorQuestionBioScreen" component={MediatorQuestionBioScreen} />
        <Stack.Screen name="MediatorQuestionProfessionallyScreen" component={MediatorQuestionProfessionallyScreen} />
        <Stack.Screen name="MediatorQuestionMusicScreen" component={MediatorQuestionMusicScreen} />
        <Stack.Screen name="MediatorQuestionPoliticalviewScreen" component={MediatorQuestionPoliticalviewScreen} />
        <Stack.Screen name="MediatorQuestionPoliticalPartnerviewScreen" component={MediatorQuestionPoliticalPartnerviewScreen} />
        <Stack.Screen name="MediatorQuestionIntroandExtroScreen" component={MediatorQuestionIntroandExtroScreen} />
        <Stack.Screen name="MediatorQuestionPIntroandExtroScreen" component={MediatorQuestionPIntroandExtroScreen} />
        <Stack.Screen name="MediatorQuestionTypeofRelationScreen" component={MediatorQuestionTypeofRelationScreen} />
        <Stack.Screen name="MediatorQuestionSmokeScreen" component={MediatorQuestionSmokeScreen} />
        <Stack.Screen name="MediatorQuestionVapeScreen" component={MediatorQuestionVapeScreen} />
        <Stack.Screen name="MediatorQuestionMarijuanaScreen" component={MediatorQuestionMarijuanaScreen} />
        <Stack.Screen name="MediatorQuestionDrugsScreen" component={MediatorQuestionDrugsScreen} />
        <Stack.Screen name="MediatorQuestionDrinkScreen" component={MediatorQuestionDrinkScreen} />
        <Stack.Screen name="MediatorQuestionInstagramScreen" component={MediatorQuestionInstagramScreen} />
        <Stack.Screen name="MediatorQuestionOccupationScreen" component={MediatorQuestionOccupationScreen} />
        <Stack.Screen name="MediatorQuestionInterestScreen" component={MediatorQuestionInterestScreen} />
        <Stack.Screen name="MediatorQuestionEducationScreen" component={MediatorQuestionEducationScreen} />
        <Stack.Screen name="MediatorQuestionRelationshipScreen" component={MediatorQuestionRelationshipScreen} />
        <Stack.Screen name="MediatorQuestionReligionScreen" component={MediatorQuestionReligionScreen} />
        <Stack.Screen name="MediatorQuestionMoreAboutChristianScreen" component={MediatorQuestionMoreAboutChristianScreen} />
        <Stack.Screen name="MediatorQuestionMoreAboutJewishScreen" component={MediatorQuestionMoreAboutJewishScreen} />
        <Stack.Screen name="MediatorQuestionMoreAboutCatholicScreen" component={MediatorQuestionMoreAboutCatholicScreen} />
        <Stack.Screen name="MediatorQuestionMoreAboutMuslimScreen" component={MediatorQuestionMoreAboutMuslimScreen} />
        <Stack.Screen name="MediatorQuestionDietScreen" component={MediatorQuestionDietScreen} />
        <Stack.Screen name="MediatorQuestionPartnerDietScreen" component={MediatorQuestionPartnerDietScreen} />
        <Stack.Screen name="MediatorQuestionFavFoodScreen" component={MediatorQuestionFavFoodScreen} />
        <Stack.Screen name="MediatorQuestionExersizeScreen" component={MediatorQuestionExersizeScreen} />
        <Stack.Screen name="MediatorQuestionExersizePartnerScreen" component={MediatorQuestionExersizePartnerScreen} />
        <Stack.Screen name="MediatorQuestionEthnicityScreen" component={MediatorQuestionEthnicityScreen} />
        <Stack.Screen name="MediatorQuestionEthnicityPartnerScreen" component={MediatorQuestionEthnicityPartnerScreen} />
        <Stack.Screen name="MediatorQuestionDescribeYouScreen" component={MediatorQuestionDescribeYouScreen} />
        <Stack.Screen name="MediatorQuestionDescribePartnerScreen" component={MediatorQuestionDescribePartnerScreen} />
        <Stack.Screen name="MediatorQuestionDisabilityScreen" component={MediatorQuestionDisabilityScreen} />
        <Stack.Screen name="MediatorQuestionDisabilityPartnerScreen" component={MediatorQuestionDisabilityPartnerScreen} />
        <Stack.Screen name="MediatorQuestionHeightScreen" component={MediatorQuestionHeightScreen} />
        <Stack.Screen name="MediatorQuestionHeightPartnerScreen" component={MediatorQuestionHeightPartnerScreen} />
        <Stack.Screen name="MediatorQuestionBuildTypeScreen" component={MediatorQuestionBuildTypeScreen} />
        <Stack.Screen name="MediatorQuestionBuildTypePartnerScreen" component={MediatorQuestionBuildTypePartnerScreen} />
        <Stack.Screen name="MediatorQuestionReferenceEmailScreen" component={MediatorQuestionReferenceEmailScreen} />
        <Stack.Screen name="MediatorQuestionDealBreakandMakeScreen" component={MediatorQuestionDealBreakandMakeScreen} />
        <Stack.Screen name="MediatorQuestionPartnerConditionScreen" component={MediatorQuestionPartnerConditionScreen} />
        <Stack.Screen name="MediatorQuestionLongestRelationshipScreen" component={MediatorQuestionLongestRelationshipScreen} />
        <Stack.Screen name="MediatorQuestionNextRelationshipTimeScreen" component={MediatorQuestionNextRelationshipTimeScreen} />
        <Stack.Screen name="MediatorQuestionMovieTypeScreen" component={MediatorQuestionMovieTypeScreen} />
        <Stack.Screen name="MediatorQuestionInBedScreen" component={MediatorQuestionInBedScreen} />
        <Stack.Screen name="MediatorQuestionInLifeScreen" component={MediatorQuestionInLifeScreen} />
        <Stack.Screen name="MediatorQuestionCuddlingScreen" component={MediatorQuestionCuddlingScreen} />
        <Stack.Screen name="MediatorQuestionRelationshipLookingScreen" component={MediatorQuestionRelationshipLookingScreen} />
        <Stack.Screen name="MediatorQuestionClingyScreen" component={MediatorQuestionClingyScreen} />
        <Stack.Screen name="MediatorLoginWithEmail" component={MediatorLoginWithEmail} />
        <Stack.Screen name="MediatorQuestionRelationshipStatus" component={MediatorQuestionRelationshipStatus} />
        <Stack.Screen name="MediatorQuestionRequestAcess" component={MediatorQuestionRequestAcess} />
    </Stack.Navigator>
);

const MediatorDashboardStack = ({ navigation }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MediatorApprovalScreen" component={MediatorApprovalScreen} />
        <Stack.Screen name="MediatorDashboardScreen" component={MediatorBottomNavigator} />
    </Stack.Navigator>
)



const MyStack = () => {
    const [initializing, setInitializing] = useState(true);
    const [regester, setRegester] = useState();

    const dispatch = useDispatch();
    const regesterUser = useSelector(selectUser);
    const MediatorUser = useSelector(selectMediatorUser);
    // console.log('==>', MediatorUser);
    const [userExist, setUserExit] = useState()
    const [userData, setUserData] = useState()
    const [memberships, setMemberships] = useState();
    const [membershipUid, setMembershipUid] = useState();
    const [LoginMediatorAccess, setLoginMediatorAccess] = useState();

    const MediatorUserLogin = (user) => {
        // console.log('========',user);
        firestore().collection('Users')
            .doc(user)
            .onSnapshot(documentSnapshot => {
                console.log(documentSnapshot.exists);
                if (documentSnapshot.exists) {
                    const data = documentSnapshot.data().userDetails
                    dispatch(mediatorLogin(data))
                    console.log('mediator user found');
                    // setUserExit('found')
                }
                else {
                    dispatch(mediatorLogin(null))
                    console.log('mediator user not exit');
                }
            });
    }


    function onAuthStateChanged(user) {
        console.log('user: ', user);
        if (user) {
            firestore().collection('Users')
                .doc(user.uid)
                .onSnapshot(documentSnapshot => {
                    console.log(documentSnapshot.exists);
                    if (documentSnapshot.exists) {
                        const data = documentSnapshot.data().userDetails
                        if (data.Category == 'Mediator') {
                            console.log(user.uid);
                            MediatorUserLogin(user.uid);
                        }
                        else {
                            dispatchLoginUser(data)
                        }
                        // console.log(data.Category);
                        setUserExit('found')
                    }
                    else {
                        dispatch(login(null))
                        console.log('user not exit');
                    }
                });
        }
        else {
            // dispatch(login(null))
            console.log('user not found');
        }
        if (initializing) setInitializing(false);
    }

    const dispatchLoginUser = (data) => {
        if (data) {
            // console.log(data.image1);
            // if (data.userLock == true) {
            //     dispatch(status(data.userLock))
            // } else {
            //     dispatch(status(false))
            // }
            if (data.PackageId) {
                const Packageids = data.PackageId;
                firestore().collection('Package')
                    .doc(Packageids)
                    .onSnapshot(documentSnapshot => {
                        if (documentSnapshot.exists) {
                            const data = documentSnapshot.data()
                            dispatchMemberships(data)
                        }
                    });
            }
            else {
                dispatch(packages(null))
            }
            dispatch(login(data))
            setRegester(regesterUser)
        }
        else {
            dispatch(login(null))
        }
    }

    const dispatchMemberships = (data) => {
        var Data = new Object();
        Data.discountPercentage = data.discountPercentage;
        Data.discountPrice = data.discountPrice;
        Data.id = data.id;
        Data.name = data.name;
        Data.numberOfCards = data.numberOfCards;
        Data.numberOfChats = data.numberOfChats;
        Data.otherCategory = data.otherCategory;
        Data.rate = data.rate;
        Data.status = data.status;
        Data.description = data.description;
        // console.log(Data);
        dispatch(packages(Data))
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // useEffect(() =>{

    // },[regester])

    if (initializing) return null;

    // if (!LoginMediatorAccess) {
    //     return (
    //         <NavigationContainer>
    //             <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
    //                 <Stack.Screen name="MadiatorStack" component={MadiatorStack} />
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     )
    // }
    // return (
    //     <NavigationContainer>
    //         <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
    //             <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
    //             <Stack.Screen name="LikeDetailScreen" component={LikeDetailScreen} />
    //         </Stack.Navigator>
    //     </NavigationContainer>
    // );



    if (!regesterUser && !MediatorUser) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="LoginWithNumberScreen" component={LoginWithNumberScreen} />
                    <Stack.Screen name="LoginWithOTPScreen" component={LoginWithOTPScreen} />
                    <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
                    <Stack.Screen name="QuestionPhotoScreen" component={QuestionPhotoScreen} />
                    <Stack.Screen name="NameScreen" component={NameScreen} />
                    <Stack.Screen name="DateOfBirthScreen" component={DateOfBirthScreen} />
                    <Stack.Screen name="QuestionGenderScreen" component={QuestionGenderScreen} />
                    <Stack.Screen name="QuestionYourInterestScreen" component={QuestionYourInterestScreen} />
                    <Stack.Screen name="QuestionWantKidsScreen" component={QuestionWantKidsScreen} />
                    <Stack.Screen name="QuestionBioScreen" component={QuestionBioScreen} />
                    <Stack.Screen name="QuestionProfessionallyScreen" component={QuestionProfessionallyScreen} />
                    <Stack.Screen name="QuestionMusicScreen" component={QuestionMusicScreen} />
                    <Stack.Screen name="QuestionPoliticalviewScreen" component={QuestionPoliticalviewScreen} />
                    <Stack.Screen name="QuestionPoliticalPartnerviewScreen" component={QuestionPoliticalPartnerviewScreen} />
                    <Stack.Screen name="QuestionIntroandExtroScreen" component={QuestionIntroandExtroScreen} />
                    <Stack.Screen name="QuestionPIntroandExtroScreen" component={QuestionPIntroandExtroScreen} />
                    <Stack.Screen name="QuestionTypeofRelationScreen" component={QuestionTypeofRelationScreen} />
                    <Stack.Screen name="QuestionSmokeScreen" component={QuestionSmokeScreen} />
                    <Stack.Screen name="QuestionVapeScreen" component={QuestionVapeScreen} />
                    <Stack.Screen name="QuestionMarijuanaScreen" component={QuestionMarijuanaScreen} />
                    <Stack.Screen name="QuestionDrugsScreen" component={QuestionDrugsScreen} />
                    <Stack.Screen name="QuestionDrinkScreen" component={QuestionDrinkScreen} />
                    <Stack.Screen name="QuestionInstagramScreen" component={QuestionInstagramScreen} />
                    <Stack.Screen name="QuestionOccupationScreen" component={QuestionOccupationScreen} />
                    <Stack.Screen name="QuestionInterestScreen" component={QuestionInterestScreen} />
                    <Stack.Screen name="QuestionEducationScreen" component={QuestionEducationScreen} />
                    <Stack.Screen name="QuestionRelationshipScreen" component={QuestionRelationshipScreen} />
                    <Stack.Screen name="QuestionReligionScreen" component={QuestionReligionScreen} />
                    <Stack.Screen name="QuestionMoreAboutChristianScreen" component={QuestionMoreAboutChristianScreen} />
                    <Stack.Screen name="QuestionMoreAboutJewishScreen" component={QuestionMoreAboutJewishScreen} />
                    <Stack.Screen name="QuestionMoreAboutCatholicScreen" component={QuestionMoreAboutCatholicScreen} />
                    <Stack.Screen name="QuestionMoreAboutMuslimScreen" component={QuestionMoreAboutMuslimScreen} />
                    <Stack.Screen name="QuestionDietScreen" component={QuestionDietScreen} />
                    <Stack.Screen name="QuestionPartnerDietScreen" component={QuestionPartnerDietScreen} />
                    <Stack.Screen name="QuestionFavFoodScreen" component={QuestionFavFoodScreen} />
                    <Stack.Screen name="QuestionExersizeScreen" component={QuestionExersizeScreen} />
                    <Stack.Screen name="QuestionExersizePartnerScreen" component={QuestionExersizePartnerScreen} />
                    <Stack.Screen name="QuestionEthnicityScreen" component={QuestionEthnicityScreen} />
                    <Stack.Screen name="QuestionEthnicityPartnerScreen" component={QuestionEthnicityPartnerScreen} />
                    <Stack.Screen name="QuestionDescribeYouScreen" component={QuestionDescribeYouScreen} />
                    <Stack.Screen name="QuestionDescribePartnerScreen" component={QuestionDescribePartnerScreen} />
                    <Stack.Screen name="QuestionDisabilityScreen" component={QuestionDisabilityScreen} />
                    <Stack.Screen name="QuestionDisabilityPartnerScreen" component={QuestionDisabilityPartnerScreen} />
                    <Stack.Screen name="QuestionHeightScreen" component={QuestionHeightScreen} />
                    <Stack.Screen name="QuestionHeightPartnerScreen" component={QuestionHeightPartnerScreen} />
                    <Stack.Screen name="QuestionBuildTypeScreen" component={QuestionBuildTypeScreen} />
                    <Stack.Screen name="QuestionBuildTypePartnerScreen" component={QuestionBuildTypePartnerScreen} />
                    <Stack.Screen name="QuestionReferenceEmailScreen" component={QuestionReferenceEmailScreen} />
                    <Stack.Screen name="QuestionDealBreakandMakeScreen" component={QuestionDealBreakandMakeScreen} />
                    <Stack.Screen name="QuestionPartnerConditionScreen" component={QuestionPartnerConditionScreen} />
                    <Stack.Screen name="QuestionLongestRelationshipScreen" component={QuestionLongestRelationshipScreen} />
                    <Stack.Screen name="QuestionNextRelationshipTimeScreen" component={QuestionNextRelationshipTimeScreen} />
                    <Stack.Screen name="QuestionMovieTypeScreen" component={QuestionMovieTypeScreen} />
                    <Stack.Screen name="QuestionInBedScreen" component={QuestionInBedScreen} />
                    <Stack.Screen name="QuestionInLifeScreen" component={QuestionInLifeScreen} />
                    <Stack.Screen name="QuestionCuddlingScreen" component={QuestionCuddlingScreen} />
                    <Stack.Screen name="QuestionRelationshipLookingScreen" component={QuestionRelationshipLookingScreen} />
                    <Stack.Screen name="QuestionClingyScreen" component={QuestionClingyScreen} />
                    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                    <Stack.Screen name="QuestionCongratulationScreen" component={QuestionCongratulationScreen} />
                    <Stack.Screen name="MadiatorStack" component={MadiatorStack} />
                    {/* <Stack.Screen name="HomeScreen" component={BottomNavigator} />
                <Stack.Screen name="LikeDetailScreen" component={LikeDetailScreen} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {MediatorUser ?
                    <Stack.Screen name="MediatorDashboardStack" component={MediatorDashboardStack} />
                    :
                    <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
                }
            </Stack.Navigator>
            {/* {MediatorUser && MediatorUser.PanelAccess == true ? */}
            {/* <Stack.Screen name="LikeDetailScreen" component={LikeDetailScreen} /> */}
        </NavigationContainer>
    );
};

// export default () => {
//     return (
//         <NavigationContainer>
//             <MyStack />
//         </NavigationContainer>
//     )
// }

export default MyStack