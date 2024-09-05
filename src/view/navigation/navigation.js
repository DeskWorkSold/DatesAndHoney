import React, { useState, useEffect } from 'react';
import { NavigationContainer, useFocusEffect, useIsFocused } from '@react-navigation/native';
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
import Toast from 'react-native-simple-toast';
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
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import { login, mediatorLogin, packages, selectMediatorUser, selectUser, selectWalletAmount, status } from '../../../redux/reducers/Reducers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DrawerNavigator from './DrawerNavigator';
import QuestionPartnerAge from '../screens/QuestionPartnerAge';
import QuestionDoyouSmoke from '../screens/QuestionDoyouSmoke';
import QuestionConvertedReligion from '../screens/QuestionConvertedReligion';
import QuestionHairColorScreen from '../screens/QuestionHairColorScreen';
import QuestionEyeColorScreen from '../screens/QuestionEyeColorScreen';
import QuestionLanguageScreen from '../screens/QuestionLanguageScreen';
import QuestionMultipleSubstance from '../screens/QuestionMultipleSubstance';


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
import SelectionTwoQuestionBioScreen from '../screens/SelectionTwo/SelectionTwoQuestionBioScreen';
import SelectionTwoQuestionBuildTypeScreen from '../screens/SelectionTwo/SelectionTwoQuestionBuildTypeScreen';
import SelectionTwoQuestionClingyScreen from '../screens/SelectionTwo/SelectionTwoQuestionClingyScreen';
import SelectionTwoQuestionCuddlingScreen from '../screens/SelectionTwo/SelectionTwoQuestionCuddlingScreen';
import SelectionTwoQuestionDietScreen from '../screens/SelectionTwo/SelectionTwoQuestionDietScreen';
import SelectionTwoQuestionEducationScreen from '../screens/SelectionTwo/SelectionTwoQuestionEducationScreen';
import SelectionTwoQuestionExersizeScreen from '../screens/SelectionTwo/SelectionTwoQuestionExersizeScreen';
import SelectionTwoQuestionFavFoodScreen from '../screens/SelectionTwo/SelectionTwoQuestionFavFoodScreen';
import SelectionTwoQuestionHeightScreen from '../screens/SelectionTwo/SelectionTwoQuestionHeightScreen';
import SelectionTwoQuestionLanguageScreen from '../screens/SelectionTwo/SelectionTwoQuestionLanguageScreen';
import SelectionTwoQuestionOccupationScreen from '../screens/SelectionTwo/SelectionTwoQuestionOccupationScreen';
import SelectionTwoQuestionRelationshipScreen from '../screens/SelectionTwo/SelectionTwoQuestionRelationshipScreen';
import SelectionTwoQuestionWantKidsScreen from '../screens/SelectionTwo/SelectionTwoQuestionWantKidsScreen';
import SelectionThreeQuestionDealBreakandMakeScreen from '../screens/SelectionThree/SelectionThreeQuestionDealBreakandMakeScreen';
import SelectionThreeQuestionEyeColorScreen from '../screens/SelectionThree/SelectionThreeQuestionEyeColorScreen';
import SelectionThreeQuestionHairColorScreen from '../screens/SelectionThree/SelectionThreeQuestionHairColorScreen';
import SelectionThreeQuestionInstagramScreen from '../screens/SelectionThree/SelectionThreeQuestionInstagramScreen';
import SelectionThreeQuestionIntroandExtroScreen from '../screens/SelectionThree/SelectionThreeQuestionIntroandExtroScreen';
import SelectionThreeQuestionLongestRelationshipScreen from '../screens/SelectionThree/SelectionThreeQuestionLongestRelationshipScreen';
import SelectionThreeQuestionMovieTypeScreen from '../screens/SelectionThree/SelectionThreeQuestionMovieTypeScreen';
import SelectionThreeQuestionProfessionallyScreen from '../screens/SelectionThree/SelectionThreeQuestionProfessionallyScreen';
import { useCallback } from 'react';
import { constants } from '../../consts/constants';
import {
    getAvailablePurchases,
    getSubscriptions,
    initConnection,
} from 'react-native-iap';
import { requestNotificationPermission } from '../components/Permissions';
import EventDetailsForPrivate from '../screens/EventDetailsForPrivate';


const Stack = createNativeStackNavigator();
// const MediatorUser = useSelector(selectMediatorUser);

const MyStack = () => {
    const [initializing, setInitializing] = useState(true);
    const [regester, setRegester] = useState();
    const [allAffiliateCode, setAllAffiliateCode] = useState(null);

    const dispatch = useDispatch();
    const regesterUser = useSelector(selectUser);
    const walletAmount = useSelector(selectWalletAmount);
    // const MediatorUser = useSelector(selectMediatorUser);
    // console.log('==>', MediatorUser);
    const [userExist, setUserExit] = useState()
    const [userData, setUserData] = useState()
    const [memberships, setMemberships] = useState();
    const [membershipUid, setMembershipUid] = useState();
    const [LoginMediatorAccess, setLoginMediatorAccess] = useState();
    // const focus = useIsFocused()
    // const user = useSelector(selectUser);

    const GetAllAffiliateCode = async () => {
        const firestoreIp = await firestore().collection('AffiliateCode')
        firestoreIp.onSnapshot(querSnapshot => {
            const data = []
            querSnapshot.forEach((documentSnapShot) => {
                data.push(documentSnapShot.data().VipCode)
            });
            setAllAffiliateCode(data)
        })
    }

    const SelectionOne = () => {
        // console.log('here im');
        // return
        return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="SelectionOneQuestionPoliticalviewScreen" component={SelectionOneQuestionPoliticalviewScreen} />
                <Stack.Screen name="SelectionTwoQuestionBioScreen" component={SelectionTwoQuestionBioScreen} />
                <Stack.Screen name="SelectionOneQuestionConvertedReligion" component={SelectionOneQuestionConvertedReligion} />
                <Stack.Screen name="SelectionOneQuestionEthnicityScreen" component={SelectionOneQuestionEthnicityScreen} />
                <Stack.Screen name="SelectionTwoQuestionRelationshipScreen" component={SelectionTwoQuestionRelationshipScreen} />
                <Stack.Screen name="SelectionOneQuestionMultipleSubstance" component={SelectionOneQuestionMultipleSubstance} />
            </Stack.Navigator>
        )
    }

    const SelectionTwo = () => {
        // console.log('here im');
        // return
        return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="SelectionTwoQuestionWantKidsScreen" component={SelectionTwoQuestionWantKidsScreen} />
                {/* <Stack.Screen name="SelectionTwoQuestionBioScreen" component={SelectionTwoQuestionBioScreen} /> */}
                <Stack.Screen name="SelectionTwoQuestionEducationScreen" component={SelectionTwoQuestionEducationScreen} />
                <Stack.Screen name="SelectionTwoQuestionOccupationScreen" component={SelectionTwoQuestionOccupationScreen} />
                <Stack.Screen name="SelectionTwoQuestionHeightScreen" component={SelectionTwoQuestionHeightScreen} />
                <Stack.Screen name="SelectionTwoQuestionLanguageScreen" component={SelectionTwoQuestionLanguageScreen} />
                <Stack.Screen name="SelectionThreeQuestionLongestRelationshipScreen" component={SelectionThreeQuestionLongestRelationshipScreen} />
                {/* remove screen */}
                <Stack.Screen name="SelectionTwoQuestionDietScreen" component={SelectionTwoQuestionDietScreen} />
                {/* remove screen */}
                <Stack.Screen name="SelectionTwoQuestionFavFoodScreen" component={SelectionTwoQuestionFavFoodScreen} />
                {/* remove screen */}
                <Stack.Screen name="SelectionTwoQuestionExersizeScreen" component={SelectionTwoQuestionExersizeScreen} />
                {/* remove screen */}
                <Stack.Screen name="SelectionTwoQuestionBuildTypeScreen" component={SelectionTwoQuestionBuildTypeScreen} />
                {/* <Stack.Screen name="SelectionTwoQuestionOccupationScreen" component={SelectionTwoQuestionOccupationScreen} /> */}
            </Stack.Navigator>
        )
    }


    const SelectionThree = () => {
        // console.log('here im');
        // return
        return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="SelectionThreeQuestionInstagramScreen" component={SelectionThreeQuestionInstagramScreen} />
                <Stack.Screen name="SelectionThreeQuestionDealBreakandMakeScreen" component={SelectionThreeQuestionDealBreakandMakeScreen} />
                <Stack.Screen name="SelectionThreeQuestionProfessionallyScreen" component={SelectionThreeQuestionProfessionallyScreen} />
                <Stack.Screen name="SelectionTwoQuestionCuddlingScreen" component={SelectionTwoQuestionCuddlingScreen} />
                <Stack.Screen name="SelectionTwoQuestionClingyScreen" component={SelectionTwoQuestionClingyScreen} />
                {/* remove screen */}
                <Stack.Screen name="SelectionThreeQuestionIntroandExtroScreen" component={SelectionThreeQuestionIntroandExtroScreen} />
                {/* remove screen */}
                <Stack.Screen name="SelectionThreeQuestionMovieTypeScreen" component={SelectionThreeQuestionMovieTypeScreen} />
                {/* remove screen */}
                <Stack.Screen name="SelectionThreeQuestionHairColorScreen" component={SelectionThreeQuestionHairColorScreen} />
                {/* remove screen */}
                <Stack.Screen name="SelectionThreeQuestionEyeColorScreen" component={SelectionThreeQuestionEyeColorScreen} />
            </Stack.Navigator>
        )
    }


    async function onAuthStateChanged(user) {
        // console.log('user: ', user);
        if (user) {
            // await updateFlakeInsurance(user?.uid)
            // await updateConciergeService(user?.uid)
            firestore().collection('Users')
                .doc(user.uid)
                .onSnapshot(async documentSnapshot => {
                    console.log(documentSnapshot.exists);
                    if (documentSnapshot.exists) {
                        const data = documentSnapshot.data().userDetails
                        // console.log(data);
                        if (data.Category == 'Mediator') {
                            console.log(user.uid);
                            // dispatch(mediatorLogin(documentSnapshot.data()))
                            // MediatorUserLogin(user.uid);
                            return
                        }
                        else {
                            // await updateMembershipStatus(data)
                            GetFcmToken(data)
                            dispatch(login(data))
                            setRegester(data)
                            getPurchaseSubscription(data)
                            getPurchaseProducts(data)
                            getPurchaseFlakeInsurance(data)
                            // dispatchLoginUser(data)
                            return
                        }
                    }
                    else {
                        dispatch(login(null))
                        dispatch(mediatorLogin(null))
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

    const GetFcmToken = async (data) => {
        // const permissionGranted = await requestNotificationPermission();

        // if (!permissionGranted) {
        //     console.log('Permission Denied');
        //     return;
        // }
        //get device token
        // console.log('====================================');
        // console.log();
        // console.log('====================================');
        try {
            messaging()
                .getToken()
                .then(fcmToken => {
                    if (fcmToken) {
                        // console.log(fcmToken, 'ppp');
                        firestore()
                            .collection('token')
                            .doc(data?.uid)
                            .set({
                                token: fcmToken,
                                create_date: new Date(),
                            })
                            .then(() => {
                                console.log('token succssfully saved');
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    } else {
                        console.log("user doesn't have a device token yet");
                    }
                });
        } catch (err) {
            console.log('FcmError: ', err);
        }
    }

    // const updateMembershipStatus = useCallback(async (data) => {

    //     await updateRefferalProgram(data)
    //     return
    //     // console.log(!user || !user.AccountType || !user.PackageId || !user.MembershipDetails);
    //     if (!data || !data?.AccountType || !data?.PackageId || !data?.MembershipDetails) {
    //         return;
    //     }

    //     const { id: membershipId, limits, time: membershipTime } = data?.MembershipDetails;

    //     // console.log('====>',membershipId, limits, membershipTime);
    //     // return
    //     const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
    //     const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;
    //     const currentTime = Date.now();
    //     const membershipTimestamp = new Date(membershipTime).getTime();

    //     if (
    //         (limits === '1 month' && currentTime - membershipTimestamp > oneMonthInMillis) ||
    //         (limits === '1 year' && currentTime - membershipTimestamp > oneYearInMillis)
    //     ) {
    //         const packageDoc = await firestore().collection('Package').doc(data.PackageId).get();
    //         const membershipRate = packageDoc?.data()?.Prices?.find(item => item.id === membershipId)?.rate;
    //         if (!membershipRate) {
    //             return;
    //         }
    //         const walletAmountAvailable = walletAmount?.totalBalance;

    //         // console.log('====================', 'membershipRate', membershipRate <= walletAmountAvailable, membershipRate, walletAmountAvailable,);
    //         // return
    //         if (membershipRate <= walletAmountAvailable) {
    //             const updatedMembership = {
    //                 ...user.MembershipDetails,
    //                 time: new Date().toISOString(),
    //             };

    //             try {
    //                 const userRef = firestore().collection('Users').doc(data.uid);
    //                 await userRef.update({
    //                     'userDetails.MembershipDetails': updatedMembership,
    //                 });

    //                 const walletData = {
    //                     expend: membershipRate,
    //                     fare: 0,
    //                     currency: 'usd',
    //                     deposit: 0,
    //                     type: membershipId === 3 ? `${data.AccountType} & Diamond+ Membership` : data.AccountType,
    //                     date: new Date().toString(),
    //                 };

    //                 await firestore().collection('Wallet').doc(data.uid).set(
    //                     {
    //                         wallet: firestore.FieldValue.arrayUnion(walletData),
    //                     },
    //                     { merge: true }
    //                 );


    //                 // Log success or perform additional actions if needed
    //             } catch (error) {
    //                 Toast.show(`Error: ${error}`, Toast.LONG);
    //             }

    //             return;
    //         }

    //         if (membershipRate > walletAmountAvailable) {
    //             try {
    //                 const userRef = await firestore().collection('Users')
    //                     .doc(user.uid)
    //                 userRef.update({
    //                     'userDetails.AccountType': null,
    //                     'userDetails.PackageId': null,
    //                     'userDetails.MembershipDetails': null,
    //                     // 'userDetails.FlakeTime': FlakeBill?.FlakeTime
    //                 }).then(() => {
    //                     setShowPoppup(true),
    //                         setShowPoppupDetail('ACTION_8')
    //                 })
    //             } catch (e) {
    //                 console.log('Erorr', e);
    //             }
    //             return
    //         }
    //     }
    // }, []);
    // function addNumbers(a, b) {
    //     const precision = 10; // Adjust the precision as needed
    //     return Math.round((Number(a) + Number(b)) * Math.pow(10, precision)) / Math.pow(10, precision);
    // }
    // const updateRefferalProgram = async (data) => {
    //     // console.log(AffiliatePrices?.tairFour?.percent, AffiliatePrices?.tairThree?.percent, AffiliatePrices?.tairTwo?.percent, AffiliatePrices?.tairOne?.percent);
    //     // return
    //     const tenPercent = (AffiliatePrices?.tairOne?.percent / 100) * data?.MembershipDetails?.rate;
    //     const fivePercent = (AffiliatePrices?.tairTwo?.percent / 100) * data?.MembershipDetails?.rate;
    //     const ninePercent = (AffiliatePrices?.tairFour?.percent / 100) * data?.MembershipDetails?.rate;
    //     const twofivePercent = (AffiliatePrices?.tairThree?.percent / 100) * data?.MembershipDetails?.rate;
    //     // parseFloat((totalAmount * 7.5 / 100)).toFixed(2)
    //     console.log('reeferal programs', tenPercent, ninePercent, fivePercent, twofivePercent);
    //     return
    //     try {
    //         if (user?.Refferals) {
    //             const refferalsDoc = firestore().collection('Users').doc(user?.Refferals?.uid);

    //             if (user?.Refferals?.typeId === 0 && user?.Refferals?.uid && user?.Refferals?.level) {
    //                 // console.log(user?.Refferals?.uid, 'In-house Talent Agency onboarding 10%');
    //                 const reftair0 = await refferalsDoc.get();
    //                 if (reftair0?.exists) {
    //                     const findrefferal0 = reftair0?.data()?.userDetails?.Refferals
    //                     let amountupdate = addNumbers(findrefferal0?.earn?.amount || 0, tenPercent);
    //                     await refferalsDoc.update({
    //                         'userDetails.Refferals': {
    //                             ...findrefferal0,
    //                             earn: {
    //                                 date: new Date().toString(),
    //                                 amount: amountupdate?.toFixed(2),
    //                             },
    //                         },
    //                     });

    //                     // Update wallet information
    //                     await firestore().collection('Wallet').doc(user?.Refferals?.uid).set(
    //                         {
    //                             wallet: firestore.FieldValue.arrayUnion({
    //                                 expend: 0,
    //                                 fare: 0,
    //                                 currency: 'usd',
    //                                 deposit: tenPercent.toFixed(2),
    //                                 type: '10% referral amount for customer subscription',
    //                                 date: new Date().toString(),
    //                                 eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
    //                             }),
    //                         },
    //                         { merge: true },
    //                     );

    //                 }
    //             }
    //             else if (user?.Refferals?.level && user?.Refferals?.typeId == 1) {
    //                 const reftair1 = await refferalsDoc.get();
    //                 let tair = 1;
    //                 if (reftair1?.exists) {
    //                     tair = 2;
    //                     const findrefferal = reftair1?.data()?.userDetails?.Refferals
    //                     if ((findrefferal?.level != null || findrefferal?.typeId == 1 || findrefferal?.typeId == 0 || findrefferal?.typeId != null) && tair <= 3) {
    //                         // console.log(user?.Refferals?.uid, '10%');
    //                         // return
    //                         let amountupdate = addNumbers(findrefferal?.earn?.amount || 0, tenPercent);
    //                         await refferalsDoc.update({
    //                             'userDetails.Refferals': {
    //                                 ...findrefferal,
    //                                 earn: {
    //                                     date: new Date().toString(),
    //                                     amount: amountupdate?.toFixed(2),
    //                                     // amount: (findrefferal?.earn?.amount || 0) + tenPercent,
    //                                 },
    //                             },
    //                         });
    //                         // Update wallet information for first level
    //                         await firestore().collection('Wallet').doc(user?.Refferals?.uid).set(
    //                             {
    //                                 wallet: firestore.FieldValue.arrayUnion({
    //                                     expend: 0,
    //                                     fare: 0,
    //                                     currency: 'usd',
    //                                     deposit: tenPercent.toFixed(2),
    //                                     type: '10% referral amount for customer subscription',
    //                                     date: new Date().toString(),
    //                                     eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
    //                                 }),
    //                             },
    //                             { merge: true },
    //                         );


    //                         if (findrefferal?.level && (findrefferal?.typeId == 1 || findrefferal?.typeId == 0) && tair <= 2) {
    //                             // console.log(findrefferal?.uid, '5%');
    //                             const reftair2 = await firestore().collection('Users').doc(findrefferal?.uid).get();
    //                             if (reftair2?.exists) {
    //                                 const findrefferal2 = reftair2?.data()?.userDetails?.Refferals
    //                                 // const findrefferal3 = reftair3?.data()?.userDetails?.Refferals
    //                                 let amountupdate = addNumbers(findrefferal2?.earn?.amount || 0, fivePercent);
    //                                 await firestore().collection('Users').doc(findrefferal?.uid).update({
    //                                     'userDetails.Refferals': {
    //                                         ...findrefferal2,
    //                                         earn: {
    //                                             date: new Date().toString(),
    //                                             amount: amountupdate.toFixed(2),
    //                                             // amount: (findrefferal2?.earn?.amount || 0) + fivePercent,
    //                                         },
    //                                     },
    //                                 })
    //                                 await firestore().collection('Wallet').doc(findrefferal?.uid).set(
    //                                     {
    //                                         wallet: firestore.FieldValue.arrayUnion({
    //                                             expend: 0,
    //                                             fare: 0,
    //                                             currency: 'usd',
    //                                             deposit: fivePercent.toFixed(2),
    //                                             type: '5% referral amount for customer subscription',
    //                                             date: new Date().toString(),
    //                                             eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
    //                                         }),
    //                                     },
    //                                     { merge: true },
    //                                 );
    //                             }
    //                             const reftair3 = await firestore().collection('Users').doc(findrefferal?.uid).get();
    //                             if (reftair3?.exists) {
    //                                 tair = 3;
    //                                 const findrefferal3 = reftair3?.data()?.userDetails?.Refferals
    //                                 if (findrefferal3?.level && findrefferal3?.typeId == 0 && tair <= 3) {
    //                                     // console.log(findrefferal2?.uid, '2.5%');
    //                                     const onbraoduserrefferal = firestore().collection('Users').doc(findrefferal3?.uid)
    //                                     const onbraoduserrefferalget = await onbraoduserrefferal?.get()
    //                                     if (onbraoduserrefferalget?.exists) {
    //                                         const findrefferal4 = onbraoduserrefferalget?.data()?.userDetails?.Refferals;
    //                                         // let amountupdate = (findrefferal4?.earn?.amount || 0) + twofivePercent;
    //                                         let amountupdate = addNumbers(findrefferal4?.earn?.amount || 0, twofivePercent);

    //                                         await onbraoduserrefferal.update({
    //                                             'userDetails.Refferals': {
    //                                                 level: null,
    //                                                 type: null,
    //                                                 typeId: null,
    //                                                 uid: null,
    //                                                 earn: {
    //                                                     date: new Date().toString(),
    //                                                     amount: amountupdate.toFixed(2),
    //                                                     // amount: (findrefferal4?.earn?.amount || 0) + twofivePercent,
    //                                                 },
    //                                             },
    //                                         })
    //                                         await firestore().collection('Wallet').doc(findrefferal3?.uid).set(
    //                                             {
    //                                                 wallet: firestore.FieldValue.arrayUnion({
    //                                                     expend: 0,
    //                                                     fare: 0,
    //                                                     currency: 'usd',
    //                                                     deposit: twofivePercent.toFixed(2),
    //                                                     type: '2.5% referral amount for customer subscription',
    //                                                     date: new Date().toString(),
    //                                                     eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
    //                                                 }),
    //                                             },
    //                                             { merge: true },
    //                                         );
    //                                     }

    //                                 }
    //                             }
    //                             // const reftair1 = await firestore().collection('Users').doc(user?.Refferals?.uid).get();
    //                         }
    //                         // if (findrefferal?.level && findrefferal?.typeId == 0 && tair <= 3) {
    //                         //     console.log(findrefferal?.uid, '5% onborad agency');
    //                         //     const reftair2 = await firestore().collection('Users').doc(findrefferal?.uid).get();
    //                         //     console.log(findrefferal?.uid, 'Agency onboarding 10%');
    //                         // }
    //                     }
    //                     else {
    //                         // let amountupdate = (findrefferal?.earn?.amount || 0) + ninePercent
    //                         let amountupdate = addNumbers(findrefferal?.earn?.amount || 0, ninePercent);

    //                         await refferalsDoc.update({
    //                             'userDetails.Refferals': {
    //                                 ...findrefferal,
    //                                 earn: {
    //                                     date: new Date().toString(),
    //                                     amount: amountupdate.toFixed(2),
    //                                     // amount: (findrefferal?.earn?.amount || 0) + ninePercent,
    //                                 },
    //                             },
    //                         });
    //                         await firestore().collection('Wallet').doc(user?.Refferals?.uid).set(
    //                             {
    //                                 wallet: firestore.FieldValue.arrayUnion({
    //                                     expend: 0,
    //                                     fare: 0,
    //                                     currency: 'usd',
    //                                     deposit: ninePercent.toFixed(2),
    //                                     type: '9% referral amount for customer subscription',
    //                                     date: new Date().toString(),
    //                                     eventEnddate: new Date().toLocaleDateString('en-US').replace(/\//g, '-'),
    //                                 }),
    //                             },
    //                             { merge: true },
    //                         );
    //                         // console.log(user?.Refferals?.uid, '9%');
    //                     }
    //                     // if (!findrefferal?.level || !findrefferal?.typeId == 2 || !findrefferal?.typeId == 1)
    //                 }
    //                 // console.log(user?.Refferals?.level);
    //             }

    //         }
    //     } catch (e) {
    //         ToastAndroid.show(`Error : ${e}`, ToastAndroid.SHORT);
    //         console.log(e);
    //     }
    // }


    // const updateFlakeInsurance = useCallback(async () => {
    //     if (!user?.FlakeInsurance) {
    //         return;
    //     }

    //     const { time, limits, id } = user.FlakeInsurance;
    //     const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
    //     const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;
    //     const currentTime = Date.now();
    //     const timestamp = new Date(time).getTime();

    //     if (
    //         (limits === '1 month' && currentTime - timestamp > oneMonthInMillis) ||
    //         (limits === '1 year' && currentTime - timestamp > oneYearInMillis)
    //     ) {
    //         const packageDoc = await firestore().collection('Package').doc('789').get();
    //         const insuranceInfo = packageDoc?.data()?.AdditionalPackages?.find(item => item.id === id);

    //         if (!insuranceInfo) {
    //             return;
    //         }

    //         const walletAmountAvailable = parseFloat(walletAmount?.totalBalance);
    //         const insuranceRate = limits === '1 month' ? parseFloat(insuranceInfo?.Price) : parseFloat(insuranceInfo?.PriceTwo);
    //         // console.log(insuranceRate && insuranceRate >= walletAmountAvailable,insuranceRate , walletAmountAvailable, '=============1========');
    //         // return
    //         if (insuranceRate && insuranceRate <= walletAmountAvailable) {
    //             const userRef = firestore().collection('Users').doc(user.uid);

    //             try {
    //                 // Update user details with new insurance rate and time
    //                 await userRef.update({
    //                     'userDetails.FlakeInsurance.rate': insuranceRate,
    //                     'userDetails.FlakeInsurance.time': new Date().toISOString(),
    //                 });

    //                 // Create wallet entry
    //                 const walletData = {
    //                     expend: insuranceRate,
    //                     fare: 0,
    //                     currency: 'usd',
    //                     deposit: 0,
    //                     type: 'Flake Insurance',
    //                     date: new Date().toString(),
    //                 };

    //                 // Check if the wallet entry already exists
    //                 const walletEntryExists = await firestore()
    //                     .collection('Wallet')
    //                     .doc(user?.uid)
    //                     .get();

    //                 if (walletEntryExists.exists) {
    //                     // Update existing wallet entry
    //                     await firestore()
    //                         .collection('Wallet')
    //                         .doc(user?.uid)
    //                         .update({
    //                             wallet: firestore.FieldValue.arrayUnion(walletData),
    //                         });
    //                 } else {
    //                     // Create a new wallet entry if it doesn't exist
    //                     await firestore()
    //                         .collection('Wallet')
    //                         .doc(user?.uid)
    //                         .set({
    //                             wallet: [walletData],
    //                         });
    //                 }
    //                 return
    //                 // Log success or perform additional actions if needed
    //             } catch (error) {
    //                 Toast.show(`Error: ${error}`, Toast.LONG);
    //             }

    //             return;
    //         }

    //         if (insuranceRate && insuranceRate > walletAmountAvailable) {
    //             try {
    //                 const userRef = await firestore().collection('Users').doc(user.uid);
    //                 // Remove FlakeInsurance details if the rate is greater than the available balance
    //                 await userRef.update({
    //                     'userDetails.FlakeInsurance': null,
    //                 });

    //                 setShowPoppup(true);
    //                 setShowPoppupDetail('ACTION_9');
    //             } catch (e) {
    //                 console.log('Error', e);
    //             }

    //             return;
    //         }
    //         return
    //     }
    //     return
    // }, []);

    // const updateConciergeService = useCallback(async () => {
    //     try {
    //         if (!user?.ConciergeService) {
    //             return;
    //         }

    //         const { DCId, timeStamp } = user.ConciergeService;
    //         const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
    //         const twoDayInMillis = 2 * 24 * 60 * 60 * 1000;
    //         const currentTime = Date.now();

    //         // Fetch user details from Firestore
    //         const userRef = firestore().collection('Users').doc(DCId);
    //         const userDoc = await userRef.get();
    //         const conciergeUserTime = userDoc?.data()?.userDetails;

    //         if (conciergeUserTime?.MonthlyRatesType === 'Donation') {
    //             // Handle Donation type separately if needed
    //             return;
    //         }

    //         if (conciergeUserTime?.MonthlyRatesType === 'Monthly') {
    //             const timeDifference = currentTime - new Date(timeStamp).getTime();

    //             // Notify the user that the Concierge package is about to expire
    //             if (timeDifference >= oneMonthInMillis - twoDayInMillis && timeDifference < oneMonthInMillis) {
    //                 SendPushNotify(user?.uid, 'Concierge Package Expiring Soon', 'Your Concierge package is about to expire. Renew now to continue enjoying the service!');
    //                 return;
    //             }


    //             const walletAmountAvailable = parseFloat(walletAmount?.totalBalance);
    //             const ConciergePrice = parseFloat(conciergeUserTime?.MonthlyRates);

    //             // console.log('============================',ConciergePrice && ConciergePrice <= walletAmountAvailable && timeDifference >= oneMonthInMillis);
    //             if (ConciergePrice && ConciergePrice > walletAmountAvailable) {
    //                 // Handle the case where the Concierge fee is greater than the available balance
    //                 // Remove ConciergeService details and update requestes
    //                 await handleInsufficientBalance(user, conciergeUserTime);
    //                 return;
    //             }

    //             if (ConciergePrice && ConciergePrice <= walletAmountAvailable) {
    //                 // Update user details and create wallet entry
    //                 await handleSuccessfulConciergeUpdate(user?.uid, ConciergePrice);
    //                 return
    //             }
    //             return
    //         }
    //     } catch (error) {
    //         Toast.show(`Error: ${error}`, Toast.LONG);
    //     }
    // }, []);

    async function handleInsufficientBalance(user, conciergeUserTime) {
        try {
            const userRef = await firestore().collection('Users').doc(user.uid);
            // Remove ConciergeService details if the rate is greater than the available balance
            await userRef.update({
                'userDetails.ConciergeService': null,
            });

            // Update requestes by removing entries related to Concierge
            await updateRequestes(user, conciergeUserTime);

            // setShowPoppup(true);
            // setShowPoppupDetail('ACTION_10');
        } catch (e) {
            console.log('Error handling insufficient balance:', e);
        }
    }

    async function updateRequestes(user, conciergeUserTime) {
        try {
            const RequestesRef = firestore().collection('Requestes');
            const myRef = RequestesRef?.doc(user?.uid);
            const ConciergeRef = RequestesRef?.doc(conciergeUserTime?.uid);

            const myRequestesDoc = await myRef?.get();
            const conciergeRequestesDoc = await ConciergeRef?.get();

            const myfilterRequestes = myRequestesDoc?.data().MoreRequestes?.filter(item => item?.sendby !== conciergeUserTime?.uid);
            const ConciergefilterRequestes = conciergeRequestesDoc?.data()?.MoreRequestes?.filter(item => item?.sendby !== user?.uid);

            // Update my requestes
            await myRef.update({
                MoreRequestes: myfilterRequestes,
            });
            // Update concierge requestes
            await ConciergeRef.update({
                MoreRequestes: ConciergefilterRequestes,
            });
        } catch (error) {
            console.log('Error updating requestes:', error);
        }
    }

    async function handleSuccessfulConciergeUpdate(userId, ConciergePrice) {
        try {
            // Update user details with new ConciergeService timestamp
            await firestore().collection('Users').doc(userId).update({
                'userDetails.ConciergeService.timeStamp': new Date().toString(),
            });

            // Create wallet entry
            const walletData = {
                expend: ConciergePrice,
                fare: 0,
                currency: 'usd',
                deposit: 0,
                type: 'Concierge Fee',
                date: new Date().toString(),
            };

            // Check if the wallet entry already exists
            await firestore()
                .collection('Wallet')
                .doc(userId)
                .set(
                    {
                        wallet: firestore.FieldValue.arrayUnion(walletData),
                    },
                    { merge: true },
                );
            console.log('Updated successfully ====>');
        } catch (error) {
            console.log('Error handling successful Concierge update:', error);
        }
    }

    // useEffect(() => {
    //     console.log(constants?.subscriptionSkus[1]);

    //     getPurchaseSubscription();
    // }, [])
    const getPurchaseFlakeInsurance = async (props) => {
        // await clearsub();
        try {
            const checkFlakeInsurance = ['flakesubscription1']
            const result = await getAvailablePurchases();
            const purchasedFlakeInsurance = result.filter((product) => checkFlakeInsurance?.includes(product?.productId)) ?? [];
            // console.log(purchasedFlakeInsurance, 'falke=====');
            // result?.map((item) => {
            //     console.log(item?.productId, constants.subscriptionSkus);
            // })
            // if (props?.FlakeInsurance) {
            //     checkFlakes(props)
            // }
            if (purchasedFlakeInsurance.length === 0 || !purchasedFlakeInsurance) {
                // console.log('yessss' , props);
                if (props?.FlakeInsurance) {
                    checkFlakes(props)
                }
                return
            }
        }
        catch (error) {
            console.log('Error occurred while fetching purchases', error);
        }
    }
    const RemoveFlakeInsurance = async (props) => {
        try {
            // console.log(props?.uid);
            // return
            await firestore().collection('Users').doc(props?.uid).update({
                'userDetails.FlakeInsurance': null,
                'userDetails.AdditionalPackageId': null,
            })
                .then(async () => {
                    dispatch(packages(null))
                })
                .catch((err) => {
                    console.log(`${err} : 'hello'`);
                })
        }
        catch (e) {
            console.log(e, 'er');
        }
    }
    function checkFlakes(user) {
        let Flakes = user?.FlakeInsurance;
        // console.log(subscription);
        const { limits, basePlanId, subscriptionid, time } = Flakes;
        const subscriptionDate = new Date(time).getTime(); // Convert to milliseconds
        const currentDate = new Date().getTime(); // Convert to milliseconds

        let subscriptionPeriod = 0;
        if (basePlanId?.includes("monthly")) {
            subscriptionPeriod = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        } else if (basePlanId?.includes("yearly")) {
            subscriptionPeriod = 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds
        }

        const expirationDate = subscriptionDate + subscriptionPeriod;

        if (currentDate >= expirationDate) {
            // console.log(`Falke Insurance ${subscriptionid} has expired.`);
            RemoveFlakeInsurance(user);
            // Code to delete subscription
        } else {
            console.log(`Falke Insurance ${basePlanId} is still active.`);
        }
    }


    const getPurchaseSubscription = async (props) => {
        // await clearsub();
        try {
            const checkmemberships = ['diamondsubscriptionmonthly1', 'goldsubscription1', 'silversubscription1', 'diamondsubscriptionunlimited']
            const result = await getAvailablePurchases();
            // console.log("Available Purchases:", result);
            const purchasedSubscriptions = result.filter((product) => checkmemberships?.includes(product?.productId)) ?? [];
            // console.log(purchasedSubscriptions,props?.PackageId, '=====');
            // return

            // console.log(props?.MembershipDetails);

            if (purchasedSubscriptions.length === 0 || !purchasedSubscriptions) {
                if (props?.PackageId) {
                    checkSubscription(props)
                }
                return
            }
        } catch (error) {
            console.log('Error occurred while fetching purchases', error);
        }
    };
    function checkSubscription(user) {
        let subscription = user?.MembershipDetails;
        // console.log(subscription);
        const { limits, basePlanId, subscriptionid, time } = subscription;
        const subscriptionDate = new Date(time).getTime(); // Convert to milliseconds
        const currentDate = new Date().getTime(); // Convert to milliseconds

        if (limits?.toLowerCase() === "unlimited") {
            console.log(`Subscription ${subscriptionid} has unlimited limits.`);
            return; // Exit function, no need to check expiration or delete
        }


        let subscriptionPeriod = 0;
        if (basePlanId?.includes("monthly")) {
            subscriptionPeriod = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        } else if (basePlanId?.includes("yearly")) {
            subscriptionPeriod = 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds
        }

        const expirationDate = subscriptionDate + subscriptionPeriod;

        if (currentDate >= expirationDate) {
            console.log(`Subscription ${subscriptionid} has expired. Deleting subscription...`);
            RemoveSubscription(user);
            // Code to delete subscription
        } else {
            console.log(`Subscription ${basePlanId} is still active.`);
        }
    }
    const RemoveSubscription = async (props) => {
        try {
            // console.log(props?.uid);
            // return
            await firestore().collection('Users').doc(props?.uid).update({
                'userDetails.AccountType': null,
                'userDetails.PackageId': null,
                'userDetails.MembershipDetails': null,
            })
                .then(async () => {
                    dispatch(packages(null))
                })
                .catch((err) => {
                    console.log(`${err} : 'hello'`);
                })
        }
        catch (e) {
            console.log(e, 'er');
        }
    }


    const getPurchaseProducts = async (props) => {
        // await clearsub();
        try {
            const checkproducts = ['starterpackage1', 'boostprofile1', 'subpackage2']
            const result = await getAvailablePurchases();
            const purchasedproducts = result.filter((product) => checkproducts?.includes(product?.productId)) ?? [];
            // console.log(purchasedproducts, '=====products');
            // result?.map((item) => {
            //     console.log(item?.productId, constants.subscriptionSkus);
            // })
            // return
            if (purchasedproducts.length === 0 || !purchasedproducts) {
                if (props?.AdditionalPackageDetails) {
                    checkProducts(props);
                    // console.log('delete purchasedproducts');
                    return;
                }
                return
            }
        }
        catch (error) {
            console.log('Error occurred while fetching purchases', error);
        }
    }
    function checkProducts(user) {
        let Products = user?.AdditionalPackageDetails;
        // console.log(subscription);
        const { limits, basePlanId, subscriptionid, time } = Products;
        const subscriptionDate = new Date(time).getTime(); // Convert to milliseconds
        const currentDate = new Date().getTime(); // Convert to milliseconds
        if (subscriptionid === "subpackage2") {
            console.log(`Product ${subscriptionid} only for book download.`);
            return; // Exit function, no need to check expiration or delete
        }

        let subscriptionPeriod = 0;
        if (basePlanId?.includes("weekly")) {
            subscriptionPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        }
        else if (basePlanId?.includes("daily")) {
            subscriptionPeriod = 7 * 24 * 60 * 60 * 1000; // 1 days in milliseconds
        }

        const expirationDate = subscriptionDate + subscriptionPeriod;

        if (currentDate >= expirationDate) {
            // console.log(`Products ${subscriptionid} has expired.`);
            RemoveAdditionalPackage(user);
            // Code to delete subscription
        } else {
            console.log(`Products ${basePlanId} is still active.`);
        }
    }
    const RemoveAdditionalPackage = async (props) => {
        try {
            // console.log(props?.uid);
            // return
            await firestore().collection('Users').doc(props?.uid).update({
                'userDetails.AdditionalPackageDetails': null,
                'userDetails.AdditionalPackageId': null,
            })
                .then(async () => {
                    dispatch(packages(null))
                })
                .catch((err) => {
                    console.log(`${err} : 'hello'`);
                })
        }
        catch (e) {
            console.log(e, 'er');
        }
    }



    const updatesubscription = async (props, subscription) => {
        try {
            const serializedTime = subscription.toISOString(); // Convert to ISO string

            console.log(props, serializedTime);

            return

            // await firestore().collection('Users').doc(props?.uid).update({
            //     'userDetails.MembershipDetails.time': serializedTime, // Update with the serializable time
            // })
            //     .then(async () => {
            //         dispatch(packages(null))
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     })
        }
        catch (e) {
            console.log(e, 'ee');
        }
    }



    // const dispatchLoginUser = (data) => {
    //     if (data) {
    //         //     const userRef = firestore().collection('Users')
    //         //     .doc(user.uid)
    //         // userRef.update({
    //         //     'userDetails.LoginStatus': 'Online',
    //         // })
    //         // console.log(data.image1);
    //         // if (data.userLock == true) {
    //         //     dispatch(status(data.userLock))
    //         // } else {
    //         //     dispatch(status(false))
    //         // }
    //         if (data.PackageId) {
    //             const Packageids = data.PackageId;
    //             firestore().collection('Package')
    //                 .doc(Packageids)
    //                 .onSnapshot(documentSnapshot => {
    //                     if (documentSnapshot.exists) {
    //                         const data = documentSnapshot.data()
    //                         dispatchMemberships(data)
    //                     }
    //                 });
    //         }
    //         else {
    //             dispatch(packages(null))
    //         }
    //         // console.log('yesssssssssssss',data.MembershipDetails);
    //         dispatch(login(data))
    //         setRegester(regesterUser)
    //     }
    //     else {
    //         dispatch(login(null))
    //     }
    // }

    // const dispatchMemberships = (data) => {
    //     var Data = new Object();
    //     Data.discountPercentage = data.discountPercentage;
    //     Data.discountPrice = data.discountPrice;
    //     Data.id = data.id;
    //     Data.name = data.name;
    //     Data.numberOfCards = data.numberOfCards;
    //     Data.numberOfChats = data.numberOfChats;
    //     Data.otherCategory = data.otherCategory;
    //     Data.rate = data.rate;
    //     Data.status = data.status;
    //     Data.description = data.description;
    //     // console.log(Data);
    //     dispatch(packages(Data))
    // }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);




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




    if (!regesterUser) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="LoginWithNumberScreen" component={LoginWithNumberScreen} />
                    <Stack.Screen name="LoginWithOTPScreen" component={LoginWithOTPScreen} />
                    <Stack.Screen name="NameScreen" component={NameScreen} />
                    <Stack.Screen name="DateOfBirthScreen" component={DateOfBirthScreen} />
                    <Stack.Screen name="QuestionGenderScreen" component={QuestionGenderScreen} />
                    <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
                    <Stack.Screen name="QuestionPhotoScreen" component={QuestionPhotoScreen} />
                    <Stack.Screen name="QuestionReligionScreen" component={QuestionReligionScreen} />
                    {/* <Stack.Screen name="QuestionMoreAboutChristianScreen" component={QuestionMoreAboutChristianScreen} />
                    <Stack.Screen name="QuestionMoreAboutJewishScreen" component={QuestionMoreAboutJewishScreen} />
                    <Stack.Screen name="QuestionMoreAboutCatholicScreen" component={QuestionMoreAboutCatholicScreen} />
                    <Stack.Screen name="QuestionMoreAboutMuslimScreen" component={QuestionMoreAboutMuslimScreen} /> */}
                    <Stack.Screen name="QuestionTypeofRelationScreen" component={QuestionTypeofRelationScreen} />


                    {/* section1 */}
                    <Stack.Screen name="QuestionPoliticalviewScreen" component={QuestionPoliticalviewScreen} />
                    <Stack.Screen name="QuestionConvertedReligion" component={QuestionConvertedReligion} />
                    <Stack.Screen name="QuestionEthnicityScreen" component={QuestionEthnicityScreen} />
                    <Stack.Screen name="QuestionMultipleSubstance" component={QuestionMultipleSubstance} />


                    {/* section2 */}
                    <Stack.Screen name="QuestionRelationshipScreen" component={QuestionRelationshipScreen} />
                    <Stack.Screen name="QuestionWantKidsScreen" component={QuestionWantKidsScreen} />
                    <Stack.Screen name="QuestionBioScreen" component={QuestionBioScreen} />
                    <Stack.Screen name="QuestionEducationScreen" component={QuestionEducationScreen} />
                    <Stack.Screen name="QuestionOccupationScreen" component={QuestionOccupationScreen} />
                    {/* remove screen */}
                    <Stack.Screen name="QuestionDietScreen" component={QuestionDietScreen} />
                    {/* remove screen */}
                    <Stack.Screen name="QuestionFavFoodScreen" component={QuestionFavFoodScreen} />
                    {/* remove screen */}
                    <Stack.Screen name="QuestionExersizeScreen" component={QuestionExersizeScreen} />
                    <Stack.Screen name="QuestionCuddlingScreen" component={QuestionCuddlingScreen} />
                    <Stack.Screen name="QuestionClingyScreen" component={QuestionClingyScreen} />
                    <Stack.Screen name="QuestionHeightScreen" component={QuestionHeightScreen} />
                    {/* remove screen */}
                    <Stack.Screen name="QuestionBuildTypeScreen" component={QuestionBuildTypeScreen} />
                    <Stack.Screen name="QuestionLanguageScreen" component={QuestionLanguageScreen} />


                    {/* section3 */}
                    <Stack.Screen name="QuestionInstagramScreen" component={QuestionInstagramScreen} />
                    <Stack.Screen name="QuestionDealBreakandMakeScreen" component={QuestionDealBreakandMakeScreen} />
                    {/* remove screen */}
                    <Stack.Screen name="QuestionIntroandExtroScreen" component={QuestionIntroandExtroScreen} />
                    <Stack.Screen name="QuestionProfessionallyScreen" component={QuestionProfessionallyScreen} />
                    <Stack.Screen name="QuestionLongestRelationshipScreen" component={QuestionLongestRelationshipScreen} />
                    {/* remove screen */}
                    <Stack.Screen name="QuestionMovieTypeScreen" component={QuestionMovieTypeScreen} />
                    {/* remove screen */}
                    <Stack.Screen name="QuestionHairColorScreen" component={QuestionHairColorScreen} />
                    {/* remove screen */}
                    <Stack.Screen name="QuestionEyeColorScreen" component={QuestionEyeColorScreen} />


                    {/* section 4 */}
                    <Stack.Screen name="QuestionYourInterestScreen" component={QuestionYourInterestScreen} />
                    <Stack.Screen name="QuestionPartnerAge" component={QuestionPartnerAge} />
                    <Stack.Screen name="QuestionInterestScreen" component={QuestionInterestScreen} />
                    <Stack.Screen name="QuestionHeightPartnerScreen" component={QuestionHeightPartnerScreen} />
                    <Stack.Screen name="QuestionBuildTypePartnerScreen" component={QuestionBuildTypePartnerScreen} />
                    <Stack.Screen name="QuestionEthnicityPartnerScreen" component={QuestionEthnicityPartnerScreen} />
                    <Stack.Screen name="QuestionMusicScreen" component={QuestionMusicScreen} />
                    <Stack.Screen name="QuestionPoliticalPartnerviewScreen" component={QuestionPoliticalPartnerviewScreen} />
                    <Stack.Screen name="QuestionPIntroandExtroScreen" component={QuestionPIntroandExtroScreen} />
                    <Stack.Screen name="QuestionSmokeScreen" component={QuestionSmokeScreen} />
                    <Stack.Screen name="QuestionVapeScreen" component={QuestionVapeScreen} />
                    <Stack.Screen name="QuestionMarijuanaScreen" component={QuestionMarijuanaScreen} />
                    <Stack.Screen name="QuestionDrugsScreen" component={QuestionDrugsScreen} />
                    <Stack.Screen name="QuestionDrinkScreen" component={QuestionDrinkScreen} />
                    <Stack.Screen name="QuestionPartnerDietScreen" component={QuestionPartnerDietScreen} />
                    <Stack.Screen name="QuestionExersizePartnerScreen" component={QuestionExersizePartnerScreen} />
                    <Stack.Screen name="QuestionDescribeYouScreen" component={QuestionDescribeYouScreen} />
                    <Stack.Screen name="QuestionDescribePartnerScreen" component={QuestionDescribePartnerScreen} />
                    <Stack.Screen name="QuestionDisabilityScreen" component={QuestionDisabilityScreen} />
                    <Stack.Screen name="QuestionDisabilityPartnerScreen" component={QuestionDisabilityPartnerScreen} />
                    <Stack.Screen name="QuestionReferenceEmailScreen" component={QuestionReferenceEmailScreen} />
                    <Stack.Screen name="QuestionPartnerConditionScreen" component={QuestionPartnerConditionScreen} />
                    <Stack.Screen name="QuestionNextRelationshipTimeScreen" component={QuestionNextRelationshipTimeScreen} />
                    <Stack.Screen name="QuestionInBedScreen" component={QuestionInBedScreen} />
                    <Stack.Screen name="QuestionInLifeScreen" component={QuestionInLifeScreen} />
                    <Stack.Screen name="QuestionRelationshipLookingScreen" component={QuestionRelationshipLookingScreen} />
                    <Stack.Screen name="QuestionDoyouSmoke" component={QuestionDoyouSmoke} />
                    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                    <Stack.Screen name="QuestionCongratulationScreen" component={QuestionCongratulationScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
                <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
                <Stack.Screen name='EventDetailsForPrivate' component={EventDetailsForPrivate} />
                <Stack.Screen name="SelectionOne" component={SelectionOne} />
                <Stack.Screen name="SelectionTwo" component={SelectionTwo} />
                <Stack.Screen name="SelectionThree" component={SelectionThree} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default MyStack