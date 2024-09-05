import { Image, StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, ToastAndroid, Dimensions, Modal } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout, selectUser } from '../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';
import { useRef } from 'react';
const { width, height } = Dimensions.get("window");
import SVGmenu from '../../assets/menu3.svg'
import { detailReligion } from './QuestionMoreAboutMuslimScreen';
import Loader from '../components/Loader';
import { GenderData, GenderMore } from './QuestionGenderScreen';
import SVGSelect from '../../assets/tik.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditUserDetailsOne from '../components/EditUserDetailsOne';
import { Education } from './QuestionEducationScreen';
import { RelagionType } from './QuestionReligionScreen';
import { convertdata } from './QuestionConvertedReligion';
import { DatesData } from './QuestionTypeofRelationScreen';
import { dietData } from './QuestionDietScreen';
import { DrinksData } from './QuestionDrinkScreen';
import { EthnicityData } from './QuestionEthnicityScreen';
import { ExerciseData } from './QuestionExersizeScreen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CompanyBusiness, PositionTestimonial } from './QuestionOccupationScreen';
import { WantKidData } from './QuestionWantKidsScreen';
import { LongestRelationshipData } from './QuestionLongestRelationshipScreen';
import { IntroExtroData } from './QuestionIntroandExtroScreen';
import { PoliticalData } from './QuestionPoliticalviewScreen';
import { RelationshipTypes } from './QuestionRelationshipLookingScreen';
import { useEffect } from 'react';
import EditUserCredentials from '../components/EditUserCredentials';
import { languagesArray } from './SelectionTwo/SelectionTwoQuestionLanguageScreen';
import { RelationshipTypeArray } from './SelectionTwo/SelectionTwoQuestionRelationshipScreen';


const ClingyData = [
    {
        id: '1',
        name: 'Very I like to stay with my partner 24/7 even go to work together if possible',
    },
    {
        id: '2',
        name: 'I am not clingy at all',
    }
]

const languagesData = [
    {
        id: '1',
        name: 'English',
    },
    {
        id: '2',
        name: 'Spanish',
    },
    {
        id: '3',
        name: ' Italian',
    },
    {
        id: '4',
        name: 'Japanese',
    },
    {
        id: '5',
        name: 'Chinese',
    },
    {
        id: '6',
        name: 'Korean',
    },
    {
        id: '7',
        name: 'Hebrew',
    },
    {
        id: '8',
        name: 'Farsi',
    }
]


const MovieData = [
    {
        id: '1',
        name: 'Action',
    },
    {
        id: '2',
        name: 'Documantries',
    },
    {
        id: '3',
        name: 'Drama',
    },
    {
        id: '4',
        name: 'Romantic',
    },
    {
        id: '5',
        name: 'Etc',
    },
    {
        id: '6',
        name: 'i dont like movies at all',
    },
]

const HairColorData = [
    {
        id: '1',
        name: 'Black',
    },
    {
        id: '2',
        name: 'Brown',
    },
    {
        id: '3',
        name: 'Grey',
    },
    {
        id: '4',
        name: 'blond',
    },
    {
        id: '5',
        name: 'White',
    },
    {
        id: '6',
        name: 'red',
    },
    {
        id: '7',
        name: 'Multicolor',
    },
]
const FavFoodData = [
    {
        id: '1',
        name: '#Sushi',
    },
    {
        id: '2',
        name: '#Foodie i love Everything',
    },
    {
        id: '3',
        name: '#Italian',
    },
    {
        id: '4',
        name: '#Japanese',
    },
    {
        id: '5',
        name: '#Mitterrandian',
    },
    {
        id: '5',
        name: '#I love trying new food',
    },
    {
        id: '5',
        name: '#I hate trying new food',
    },
    {
        id: '5',
        name: '#I like simple bland food',
    }
]

const EyeData = [
    {
        id: '1',
        name: 'amber',
    },
    {
        id: '2',
        name: 'blue',
    },
    {
        id: '3',
        name: 'brown',
    },
    {
        id: '4',
        name: 'gray',
    },
    {
        id: '5',
        name: 'green',
    },
    {
        id: '6',
        name: 'hazel',
    },
    {
        id: '7',
        name: 'red',
    },
]

const CuddlingData = [
    {
        id: '1',
        name: 'All night',
    },
    {
        id: '2',
        name: 'Not at all',
    },
    {
        id: '3',
        name: 'Sometimes',
    },
    {
        id: '4',
        name: 'For a few hours before bed',
    }
]
const CoupleOptionData = [
    {
        id: '1',
        name: 'MFF',
    },
    {
        id: '2',
        name: 'MMF',
    },
    {
        id: '3',
        name: 'Not interested',
    },
]

const BuildTypeData = [
    {
        id: '1',
        name: 'Athletic/Fit',
    },
    {
        id: '2',
        name: 'BBW',
    },
    {
        id: '3',
        name: 'Mascular',
    },
    {
        id: '4',
        name: 'Slender',
    },
    {
        id: '5',
        name: 'Petite',
    }
]

const JewishParentType = [
    {
        id: '1',
        name: 'Mom born Jewish',
    },
    {
        id: '2',
        name: 'Dad born Jewish',
    },
    {
        id: '3',
        name: 'Both born Jewish',
    },
]
const JewishDetailReligion = [
    {
        id: '1',
        name: 'Orthodox',
    }, {
        id: '2',
        name: 'Modern Orthodox',
    },
    {
        id: '3',
        name: 'Conservative',
    }, {
        id: '4',
        name: 'Reformed',
    },
    {
        id: '5',
        name: 'Just Jewish',
    }, {
        id: '6',
        name: 'Converted',

    }, {
        id: '7',
        name: 'Traditional',
    }, {

        id: '8',
        name: 'Secular',
    },

];
const JewishKosherTypeReligion = [
    {
        id: '1',
        name: 'Not kosher at all',

    }, {
        id: '2',
        name: 'To some degree',

    }, {
        id: '3',
        name: 'Always',

    },
    {
        id: '4',
        name: 'At Home',

    },
    {
        id: '5',
        name: 'Keep Kosher only at home eat dairy out Non=kosher restaurant',
    }
];
const MuslimParentType = [
    {
        id: '1',
        name: 'Mom born Muslim',
    },
    {
        id: '2',
        name: 'Dad born Muslim',
    },
    {
        id: '3',
        name: 'Both born Muslim',
    },
]
const MuslimDetailReligion = [
    {
        id: '1',
        name: 'Sunni - Hanafi',
    },
    {
        id: '2',
        name: 'Sunni - Shafi',
    },
    {
        id: '3',
        name: 'Sunni - Maliki',
    },
    {
        id: '4',
        name: 'Sunni - hanbali',
    },
    {
        id: '5',
        name: 'Shia',
    },
    {
        id: '6',
        name: 'Ibadi',
    },
    {
        id: '7',
        name: 'Other',
    },
    {
        id: '8',
        name: 'Not Sure',
    }

];
const MuslimFoodTypeReligion = [
    {
        id: '1',
        name: 'Keeps Halal',
    }, {
        id: '2',
        name: 'Sometimes Halal',

    }, {
        id: '3',
        name: 'Never Halal',
    }
];
const ChristianParentType = [
    {
        id: '1',
        name: 'Mom born Christian',
    },
    {
        id: '2',
        name: 'Dad born Christian',
    },
    {
        id: '3',
        name: 'Both born Christian',
    },
]

const ChristianDetailReligion = [
    {
        id: '1',
        name: 'Anglican',
    }, {
        id: '2',
        name: 'Aposotlic',
    },
    {
        id: '3',
        name: 'Assembly of God',
    }, {
        id: '4',
        name: 'Baptist',
    },
    {
        id: '5',
        name: 'Catholic',
    }, {
        id: '6',
        name: 'Christian Reformed',

    }, {
        id: '7',
        name: 'Church of Christ',
    }, {

        id: '8',
        name: 'Episcopalian/ Anglican',
    }, {
        id: '9',
        name: 'Evangelical',

    }, {
        id: '10',
        name: 'Interdenominal',

    }, {
        id: '11',
        name: 'Lutheran',

    },
    {
        id: '12',
        name: 'Messianic',

    },
    {
        id: '13',
        name: 'Methodist',

    },
    {
        id: '14',
        name: 'Nazarene',

    },
    {
        id: '15',
        name: 'Non-denominational',

    },
    {
        id: '16',
        name: 'Not sure',

    },
    {
        id: '17',
        name: 'Orthodox',

    },
    {
        id: '18',
        name: 'Pentecostal',

    },
    {
        id: '19',
        name: 'Presbyterian',

    },
    {
        id: '20',
        name: 'Seventh-Day Adventist',

    },
    {
        id: '21',
        name: 'Southern Baptist',

    },

]

const CatholicParentType = [
    {
        id: '1',
        name: 'Mom born Catholic',
    },
    {
        id: '2',
        name: 'Dad born Catholic',
    },
    {
        id: '3',
        name: 'Both born Catholic',
    },
]

const CatholicDetailReligion = [
    {
        id: '1',
        name: 'Orthodox',
    }, {
        id: '2',
        name: 'Non-practicing',
    },
    {
        id: '3',
        name: 'Reformed',
    }
]




const SettingScreen = ({ navigation }) => {
    const user = useSelector(selectUser);
    // console.log(user.PhoneNumber);
    const [name, setName] = useState(user.Name ? user.Name : null);
    const [nameEdit, setNameEdit] = useState(false);
    const [email, setEmail] = useState(user.email ? user.email : null);
    const [emailEdit, setEmailEdit] = useState(false);
    const [number, setNumber] = useState(user.PhoneNumber ? user.PhoneNumber?.substring(3) : null);
    const [numberEdit, setNumberEdit] = useState(false);

    const [bio, setBio] = useState(user.Bio ? user.Bio : null);
    const [bioEdit, setBioEdit] = useState(false);
    const [bioIndex, setBioIndex] = useState(null);
    const [BuildType, setBuildType] = useState(user.BuildType ? user.BuildType : null);
    const [BuildTypeEdit, setBuildTypeEdit] = useState(false);
    const [BuildTypeIndex, setBuildTypeindex] = useState(null);
    const [Clingy, setClingy] = useState(user.Clingy ? user.Clingy : null);
    const [ClingyEdit, setClingyEdit] = useState(false);
    const [ClingyIndex, setClingyIndex] = useState(null);
    const [CompanyName, setCompanyName] = useState(user.CompanyName ? user.CompanyName : null);
    const [CompanyNameEdit, setCompanyNameEdit] = useState(false);
    const [CompanyNameIndex, setCompanyNameIndex] = useState(null);
    const [CompanyType, setCompanyType] = useState(user.CompanyType ? user.CompanyType : null);
    const [CompanyTypeEdit, setCompanyTypeEdit] = useState(false);
    const [CompanyTypeIndex, setCompanyTypeIndex] = useState(null);
    const [Relagion, setRelagion] = useState(user.Relagion ? user.Relagion : null);
    const [RelagionEdit, setRelagionEdit] = useState(false);
    const [RelagionIndex, setRelagionIndex] = useState(null);
    const [relagionStatus,setRelagionStatus] = useState(user.RelagionStatus ? user.RelagionStatus : null)
    const [relagionStatusEdit, setrelagionStatusEdit] = useState(false);
    const [relagionStatusIndex, setrelagionStatusIndex] = useState(null);
    const [religionType, setreligionType] = useState(user.religionType ? user.religionType : null);
    const [religionTypeEdit, setreligionTypeEdit] = useState(false);
    const [religionTypeIndex, setreligionTypeIndex] = useState(null);
    const [ConvertedReligion, setConvertedReligion] = useState(user.ConvertedReligion ? user.ConvertedReligion : null);
    const [ConvertedReligionEdit, setConvertedReligionEdit] = useState(false);
    const [ConvertedReligionIndex, setConvertedReligionIndex] = useState(null);
    const [ConvertedReligionDetail, setConvertedReligionDetail] = useState(user.ConvertedReligionDetail ? user.ConvertedReligionDetail : null);
    const [ConvertedReligionDetailEdit, setConvertedReligionDetailEdit] = useState(false);
    const [ConvertedReligionDetailIndex, setConvertedReligionDetailIndex] = useState(null);
    const [ParentReligion, setParentReligion] = useState(user.ParentReligion ? user.ParentReligion : null);
    const [ParentReligionEdit, setParentReligionEdit] = useState(false);
    const [ParentReligionIndex, setParentReligionIndex] = useState(null);
    const [KosherType, setKosherType] = useState(user.KosherType ? user.KosherType : null);
    const [KosherTypeEdit, setKosherTypeEdit] = useState(false);
    const [KosherTypeIndex, setKosherTypeIndex] = useState(null);
    const [foodtype, setfoodtype] = useState(user.foodtype ? user.foodtype : null);
    const [foodtypeEdit, setfoodtypeEdit] = useState(false);
    const [foodtypeIndex, setfoodtypeIndex] = useState(null);
    const [CoupleOption, setCoupleOption] = useState(user.CoupleOption ? user.CoupleOption : null);
    const [CoupleOptionEdit, setCoupleOptionEdit] = useState(false);
    const [CoupleOptionIndex, setCoupleOptionIndex] = useState(null);
    const [Cuddling, setCuddling] = useState(user.Cuddling ? user.Cuddling : null);
    const [CuddlingEdit, setCuddlingEdit] = useState(false);
    const [CuddlingIndex, setCuddlingIndex] = useState(null);
    const [Dates, setDates] = useState(user.Dates ? user.Dates : null);
    const [DatesEdit, setDatesEdit] = useState(false);
    const [DatesIndex, setDatesIndex] = useState(null);
    const [DealBreaker, setDealBreaker] = useState(user.DealBreaker ? user.DealBreaker : null);
    const [DealBreakerEdit, setDealBreakerEdit] = useState(false);
    const [DealBreakerIndex, setDealBreakerIndex] = useState(null);
    const [DealMakers, setDealMakers] = useState(user.DealMakers ? user.DealMakers : null);
    const [DealMakersEdit, setDealMakersEdit] = useState(false);
    const [DealMakersIndex, setDealMakersIndex] = useState(null);
    const [Diet, setDiet] = useState(user.Diet ? user.Diet : null);
    const [DietEdit, setDietEdit] = useState(false);
    const [DietIndex, setDietIndex] = useState(null);
    const [Drink, setDrink] = useState(user.Drink ? user.Drink : null);
    // console.log(user.Drink);
    const [DrinkEdit, setDrinkEdit] = useState(false);
    const [DrinkIndex, setDrinkIndex] = useState(null);
    const [Drugs, setDrugs] = useState(user.Drugs ? user.Drugs : null);
    const [DrugsEdit, setDrugsEdit] = useState(false);
    const [DrugsIndex, setDrugsIndex] = useState(null);
    const [educationObj, setEducationObj] = useState(user.Education ? user.Education : null);
    const [EducationEdit, setEducationEdit] = useState(false);
    const [EducationIndex, setEducationIndex] = useState(null);
    const [Ethnicity, setEthnicity] = useState(user.Ethnicity ? user.Ethnicity : null);
    const [EthnicityEdit, setEthnicityEdit] = useState(false);
    const [EthnicityIndex, setEthnicityIndex] = useState(null);
    const [Exercise, setExercise] = useState(user.Exercise ? user.Exercise : null);
    const [ExerciseEdit, setExerciseEdit] = useState(false);
    const [ExerciseIndex, setExerciseIndex] = useState(null);
    const [ExerciseStatus, setExerciseStatus] = useState(user.ExerciseStatus ? user.ExerciseStatus : null);
    const [ExerciseStatusEdit, setExerciseStatusEdit] = useState(false);
    const [ExerciseStatusIndex, setExerciseStatusIndex] = useState(null);
    const [EyeColor, setEyeColor] = useState(user.EyeColor ? user.EyeColor : null);
    const [EyeColorEdit, setEyeColorEdit] = useState(false);
    const [EyeColorIndex, setEyeColorIndex] = useState(null);
    const [FavFood, setFavFood] = useState(user.FavFood ? user.FavFood : null);
    const [FavFoodEdit, setFavFoodEdit] = useState(false);
    const [FavFoodIndex, setFavFoodIndex] = useState(null);
    const [gender, setGender] = useState(user.Gender ? user.Gender : null);
    const [genderIndex, setGenderIndex] = useState(null);
    const [GenderEdit, setGenderEdit] = useState(false);
    const [GenderDetail, setGenderDetail] = useState(user.GenderDetial ? user.GenderDetial : null);
    const [GenderDetailEdit, setGenderDetailEdit] = useState(false);
    const [GenderDetailIndex, setGenderDetailIndex] = useState(null);
    const [HairColor, setHairColor] = useState(user.HairColor ? user.HairColor : null);
    const [HairColorEdit, setHairColorEdit] = useState(false);
    const [HairColorIndex, setHairColorIndex] = useState(null);
    const [Hieght, setHieght] = useState(user.Hieght ? user.Hieght : null);
    const [HieghtEdit, setHieghtEdit] = useState(false);
    const [HieghtIndex, setHieghtIndex] = useState(null);
    const [InFiveYear, setInFiveYear] = useState(user.InFiveYear ? user.InFiveYear : null);
    const [InFiveYearEdit, setInFiveYearEdit] = useState(false);
    const [InFiveYearIndex, setInFiveYearIndex] = useState(null);
    const [InTenYear, setInTenYear] = useState(user.InTenYear ? user.InTenYear : null);
    const [InTenYearEdit, setInTenYearEdit] = useState(false);
    const [InTenYearIndex, setInTenYearIndex] = useState(null);
    const [InstaUsername, setInstaUsername] = useState(user.InstaUsername ? user.InstaUsername : null);
    const [InstaUsernameEdit, setInstaUsernameEdit] = useState(false);
    const [InstaUsernameIndex, setInstaUsernameIndex] = useState(null);
    const [Nature, setNature] = useState(user.Nature ? user.Nature : null);
    const [NatureEdit, setNatureEdit] = useState(false);
    const [NatureIndex, setNatureIndex] = useState(null);
    const [Kids, setKids] = useState(user.Kids ? user.Kids : null);
    const [KidsEdit, setKidsEdit] = useState(false);
    const [KidsIndex, setKidsIndex] = useState(null);
    const [LongestRelationship, setLongestRelationship] = useState(user.LongestRelationship ? user.LongestRelationship : null);
    const [LongestRelationshipEdit, setLongestRelationshipEdit] = useState(false);
    const [LongestRelationshipIndex, setLongestRelationshipIndex] = useState(null);
    const [Lookingfor, setLookingfor] = useState(user.Lookingfor ? user.Lookingfor : null);
    const [LookingforEdit, setLookingforEdit] = useState(false);
    const [LookingforIndex, setLookingforIndex] = useState(null);
    const [Marijauna, setMarijauna] = useState(user.Marijauna ? user.Marijauna : null);
    const [MarijaunaEdit, setMarijaunaEdit] = useState(false);
    const [MarijaunaIndex, setMarijaunaIndex] = useState(null);
    const [MovieType, setMovieType] = useState(user.MovieType ? user.MovieType : null);
    const [MovieTypeEdit, setMovieTypeEdit] = useState(false);
    const [MovieTypeIndex, setMovieTypeIndex] = useState(null);
    const [PoliticalView, setPoliticalView] = useState(user.PoliticalView ? user.PoliticalView : null);
    const [PoliticalViewEdit, setPoliticalViewEdit] = useState(false);
    const [PoliticalViewIndex, setPoliticalViewIndex] = useState(null);
    const [PoliticalViewStatus, setPoliticalViewStatus] = useState(user.PoliticalViewStatus ? user.PoliticalViewStatus : null);
    const [PoliticalViewStatusEdit, setPoliticalViewStatusEdit] = useState(false);
    const [PoliticalViewStatusIndex, setPoliticalViewStatusIndex] = useState(null);
    const [PositioninCompany, setPositioninCompany] = useState(user.PositioninCompany ? user.PositioninCompany : null);
    const [PositioninCompanyEdit, setPositioninCompanyEdit] = useState(false);
    const [PositioninCompanyIndex, setPositioninCompanyIndex] = useState(null);
    const [RelationshipType, setRelationshipType] = useState(user.RelationshipType ? user.RelationshipType : null);
    const [RelationshipTypeEdit, setRelationshipTypeEdit] = useState(false);
    const [RelationshipTypeIndex, setRelationshipTypeIndex] = useState(null);
    const [Smoke, setSmoke] = useState(user.Smoke ? user.Smoke : null);
    const [SmokeEdit, setSmokeEdit] = useState(false);
    const [SmokeIndex, setSmokeIndex] = useState(null);
    const [Vape, setVape] = useState(user.Vape ? user.Vape : null);
    const [VapeEdit, setVapeEdit] = useState(false);
    const [VapeIndex, setVapeIndex] = useState(null);
    const [languages, setlanguages] = useState(user.languages ? user.languages : null);
    const [languageArray, setLanguageArray] = useState(languagesArray);
    const [TemplanguageArray, setTempLanguageArray] = useState(languagesArray);
    const [languagesEdit, setlanguagesEdit] = useState(false);
    const [languagesIndex, setlanguagesIndex] = useState(null);
    const [actionTriggered, setActionTriggered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editModalComment, setEditModalComment] = useState(null);
    const dispatch = useDispatch();
    const phoneInput = useRef(null);


    // useEffect(() => {

    const newPhoneNumber = '+1234567890';

    //     if (newPhoneNumber && newPhoneNumber.trim() !== '') {
    //         const user = auth().currentUser;
    //         if (user) {
    //             // Call the updatePhoneNumberAndDetails function only if the user is logged in
    //             updatePhoneNumberAndDetails(newPhoneNumber);
    //         } else {
    //             console.error('User is not logged in.');
    //         }
    //     } else {
    //         console.error('Invalid phone number. Please provide a valid phone number.');
    //     }
    // }, [])


    const updatePhoneNumberAndDetails = async (newPhoneNumber) => {
        // console.log(newPhoneNumber);
        // return
        if (newPhoneNumber) {
            const number2 = newPhoneNumber.toString()
            // console.log(number2);
            // return
            try {
                // Step 1: Get the current authenticated user
                // Step 2: Update the phone number in Firebase Authentication
                await auth()?.currentUser?.updatePhoneNumber({
                    phoneNumber: number2
                }).then(function () {
                    console.log('success');
                    // Actions.Users();
                }).catch(function (error) {
                    console.log(error)
                });
                // console.log('Phone number updated successfully!');
                console.log('Updated User:', auth().currentUser);

            } catch (error) {
                console.error('Error updating phone number and details:', error.message);
            }
        }
    };

    const OnSaveChanges = () => {
        // updatePhoneNumberAndDetails(number)
        setUploading(true)
        if (!bio ||
            !BuildType ||
            !Clingy ||
            !CompanyType ||
            !Relagion ||
            !religionType ||
            !ConvertedReligion ||
            !ParentReligion ||
            !CoupleOption ||
            !Cuddling ||
            !Dates ||
            !DealBreaker ||
            !DealMakers ||
            !Diet ||
            !Drink ||
            !Drugs ||
            !educationObj ||
            !Ethnicity ||
            !Exercise ||
            !ExerciseStatus ||
            !EyeColor ||
            !FavFood ||
            !gender ||
            !GenderDetail ||
            !HairColor ||
            !Hieght ||
            !InFiveYear ||
            !InTenYear ||
            !InstaUsername ||
            !Nature ||
            !Kids ||
            !LongestRelationship ||
            !Lookingfor ||
            !Marijauna ||
            !MovieType ||
            !PoliticalView ||
            !PoliticalViewStatus ||
            !PositioninCompany ||
            !RelationshipType ||
            !Smoke ||
            !Vape ||
            !languages) {
            if (!bio) {
                ToastAndroid.show('Please enter your bio!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!BuildType) {
                ToastAndroid.show('Please enter your Build Type!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Dates) {
                ToastAndroid.show('Please enter your Date of Birth!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!gender) {
                ToastAndroid.show('Please select your gender!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!GenderDetail) {
                ToastAndroid.show('Please select your gender Type!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Hieght) {
                ToastAndroid.show('Please enter your height!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!educationObj) {
                ToastAndroid.show('Please select your education!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!educationObj) {
                ToastAndroid.show('Please select your education!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Relagion) {
                ToastAndroid.show('Please enter your new Relagion!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!ParentReligion) {
                ToastAndroid.show('Please enter your new Parent Religion!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!religionType) {
                ToastAndroid.show('Please enter your religion Type!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!ConvertedReligion) {
                ToastAndroid.show('Please enter your converted Religion!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Lookingfor) {
                ToastAndroid.show('Please enter what are you looking for!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Lookingfor) {
                ToastAndroid.show('Please enter what are you looking for!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!PositioninCompany || !CompanyType) {
                ToastAndroid.show('Please enter your occupation!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!CoupleOption) {
                ToastAndroid.show('Please enter your Couple Option!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Cuddling) {
                ToastAndroid.show('Please enter your cuddling type!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Clingy) {
                ToastAndroid.show('Please enter your clingy type!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!DealBreaker) {
                ToastAndroid.show('Please select your Deal Breaker!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!DealMakers) {
                ToastAndroid.show('Please select your Deal Makers!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Diet) {
                ToastAndroid.show('Please select your diet type!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Drink) {
                ToastAndroid.show('Please select do you Drink!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Drugs) {
                ToastAndroid.show('Please select do you use Drugs!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Ethnicity) {
                ToastAndroid.show('Please select your ethnicity!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Exercise) {
                ToastAndroid.show('Please select your Exercise!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!EyeColor) {
                ToastAndroid.show('Please select your Eye Color!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!HairColor) {
                ToastAndroid.show('Please select your Hair Color!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!FavFood) {
                ToastAndroid.show('Please select your Fav Food!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!InFiveYear) {
                ToastAndroid.show('Please enter where do you see your self in five years!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!InTenYear) {
                ToastAndroid.show('Please enter where do you see your self in ten year!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!InstaUsername) {
                ToastAndroid.show('Please enter your instagram username!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Kids) {
                ToastAndroid.show('Please enter dop you want kids!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!LongestRelationship) {
                ToastAndroid.show('Please enter your longest relationship!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!MovieType) {
                ToastAndroid.show('Please enter what type of movies you like!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Nature) {
                ToastAndroid.show('Please enter are you introvert or extrovert!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!PoliticalView) {
                ToastAndroid.show('Please enter your political view!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!PoliticalViewStatus) {
                ToastAndroid.show('Please select your political view stats!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!RelationshipType) {
                ToastAndroid.show('Please enter your relationship type you are looking for!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Smoke) {
                ToastAndroid.show('Please enter do you Smoke!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Vape) {
                ToastAndroid.show('Please enter do you Vape!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!Marijauna) {
                ToastAndroid.show('Please enter do you Marijauna!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!languages) {
                ToastAndroid.show('Please select your languages you speak!', ToastAndroid.SHORT)
                setUploading(false)
            }
            setUploading(false)
        }
        else {
            // console.log(bio,
            //     BuildType,
            //     Clingy,
            //     CompanyName,
            //     CompanyType,
            //     Relagion,
            //     religionType,
            //     ConvertedReligion,
            //     ParentReligion,
            //     CoupleOption,
            //     Cuddling,
            //     Dates,
            //     DealBreaker,
            //     DealMakers,
            //     Diet,
            //     Drink,
            //     Drugs,
            //     educationObj,
            //     Ethnicity,
            //     Exercise,
            //     ExerciseStatus,
            //     EyeColor,
            //     FavFood,
            //     gender,
            //     GenderDetail,
            //     HairColor,
            //     Hieght,
            //     InFiveYear,
            //     InTenYear,
            //     InstaUsername,
            //     Nature,
            //     Kids,
            //     LongestRelationship,
            //     Lookingfor,
            //     Marijauna,
            //     MovieType,
            //     PoliticalView,
            //     PoliticalViewStatus,
            //     PositioninCompany,
            //     RelationshipType,
            //     Vape,
            //     languages
            // );
            // setUploading(false)
            // return

            const userRef = firestore().collection('Users')
                .doc(user.uid)
            userRef.update({
                'userDetails.Bio': bio,
                'userDetails.Dates': Dates,
                'userDetails.Gender': gender,
                'userDetails.GenderDetial': (gender == 'Male' || gender == 'Female') ? GenderDetail : null,
                'userDetails.Hieght': Hieght,
                'userDetails.Education': educationObj,
                'userDetails.Relagion': Relagion,
                'userDetails.RelagionStatus': relagionStatus,
                'userDetails.ParentReligion': ParentReligion,
                'userDetails.religionType': religionType,
                'userDetails.foodtype': foodtype,
                'userDetails.KosherType': KosherType,
                'userDetails.ConvertedReligion': ConvertedReligion,
                'userDetails.ConvertedReligionDetail': ConvertedReligionDetail,
                'userDetails.Lookingfor': Lookingfor,
                'userDetails.BuildType': BuildType,
                'userDetails.CompanyName': CompanyName,
                'userDetails.CompanyType': CompanyType,
                'userDetails.PositioninCompany': PositioninCompany,
                'userDetails.CoupleOption': CoupleOption,
                'userDetails.Cuddling': Cuddling,
                'userDetails.DealBreaker': DealBreaker,
                'userDetails.DealMakers': DealMakers,
                'userDetails.Diet': Diet,
                'userDetails.Drink': Drink,
                'userDetails.Drugs': Drugs,
                'userDetails.Ethnicity': Ethnicity,
                'userDetails.Exercise': Exercise,
                'userDetails.ExerciseStatus': ExerciseStatus,
                'userDetails.EyeColor': EyeColor,
                'userDetails.FavFood': FavFood,
                'userDetails.HairColor': HairColor,
                'userDetails.InFiveYear': InFiveYear,
                'userDetails.InTenYear': InTenYear,
                'userDetails.InstaUsername': InstaUsername,
                'userDetails.Kids': Kids,
                'userDetails.LongestRelationship': LongestRelationship,
                'userDetails.MovieType': MovieType,
                'userDetails.Nature': Nature,
                'userDetails.PoliticalView': PoliticalView,
                'userDetails.PoliticalViewStatus': PoliticalViewStatus,
                'userDetails.RelationshipType': RelationshipType,
                'userDetails.Smoke': Smoke,
                'userDetails.Vape': Vape,
                'userDetails.Marijauna': Marijauna,
                'userDetails.languages': languages,
                'userDetails.Clingy': Clingy,
                'userDetails.SelectionOne': 7,
                'userDetails.SelectionTwo': 13,
                'userDetails.SelectionThree': 8,
            }).then(() => {
                setUploading(false)
                // navigation.navigate('ProfileScreen')
                ToastAndroid.show('Your Profile hase been updated!', ToastAndroid.SHORT)
            })
            // console.log('here');
            //             
            // email
            // Number

            // RelationshipType
            // Relagion
            // religionType
            // Gender
            // relationshipLookingType
            // console.log(
            //     name,
            //     email,
            //     number,
            //     relationshipTypeyour,
            //     religionyour,
            //     religionTypeyour,
            //     genderyour,
            //     relationShipLookingyour,
            // );
        }
    }


    const OnLogOut = async () => {

        // firestore().collection('Users')
        //     .doc(user.uid)
        //     .update({
        //         'userDetails.LoginStatus': 'Offline',
        //     })
        try {
            auth()
                .signOut()
                .then(() =>
                    console.log('User signed out!'),
                    ToastAndroid.show('Signed out!', ToastAndroid.SHORT)
                    // navigation.('SignUpScreen')
                );
            // const userData = await AsyncStorage.getItem('session');
            //   await AsyncStorage.removeItem('CurrentUserData')
            //   await AsyncStorage.removeItem('CurrentUser')
            dispatch(logout());
        }
        catch (exception) {
            return false;
        }
    }

    const onRelationshipType = (index) => {
        setRelationshipType(index)
        setRelationshipTypeyour(Data1[index].name)
        // const data = Data1[index].name
        // console.log(data);
        setShowModal(false)
    }
    const onRelagion = (index) => {
        setReligion(index)
        setReligionyour(Data2[index].name)
        setShowModal(false)
    }
    const onRelagionType = (index) => {
        setReligionType(index)
        setReligionTypeyour(detailReligion[index].name)
        setShowModal(false)
    }
    const onGender = (index) => {
        setGender(index)
        setGenderyour(Data3[index].name)
        setShowModal(false)
    }
    const onRelagionTypeLooking = (index) => {
        setRelationShipLooking(index)
        setRelationShipLookingyour(Data1[index].name)
        setShowModal(false)
    }


    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    height: 70,
                    paddingHorizontal: 20
                }}>
                    <View style={{ width: '20%' }}>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <SVGmenu width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '60%', alignItems: 'center', }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: COLORS.black
                        }}>Profile Settings</Text>
                    </View>

                    <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                    </View>
                </View>

                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, fontSize: 14 }}> Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        // aria-disabled={true}
                                        editable={nameEdit}
                                        value={name}
                                        placeholder={'Enter your new name'}
                                        placeholderTextColor={COLORS.gray}
                                        keyboardType='email-address'
                                        onChangeText={name => setName(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => { setShowModal(true), setActionTriggered('Name') }}>
                                        <Image source={require('../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, fontSize: 14 }}> Email </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        editable={emailEdit}
                                        value={email}
                                        placeholder={'Enter your new email'}
                                        placeholderTextColor={COLORS.gray}
                                        keyboardType='email-address'
                                        onChangeText={email => setEmail(email)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => { setShowModal(true), setActionTriggered('Email') }}>
                                        <Image source={require('../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, fontSize: 14 }}> Phone Number </Text>
                                {/* <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={number}
                                    defaultCode="PK"
                                    layout="first"
                                    // disabled={true}
                                    // withShadow
                                    // autoFocus
                                    containerStyle={styles.phoneNumberView}
                                    textContainerStyle={{ paddingVertical: 0, borderRadius: 5, backgroundColor: COLORS.light }}
                                    onChangeFormattedText={text => {
                                        setNumber(text);
                                    }}
                                    flagButtonStyle={{ color: "black" }}
                                    textInputProps={{ placeholderTextColor: COLORS.gray }}
                                /> */}
                                <View style={styles.NumberInput}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <TextInput
                                            editable={numberEdit}
                                            value={user?.PhoneNumber}
                                            placeholderTextColor={COLORS.gray}
                                            placeholder={'Enter your number'}
                                            keyboardType='email-address'
                                            onChangeText={number => setNumber(number)
                                            }
                                            style={styles.TextInput}
                                        />
                                    </View>
                                    {/* <TouchableOpacity onPress={() => { setShowModal(true), setActionTriggered('Number') }}>
                                        <Image source={require('../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>

                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 20
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Questions Settings</Text>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}>
                                        What is your Bio?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10,
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                    }}>
                                        Selected : {bio ? bio.split(' ').slice(0, 15).join(' ') + '...' : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('bio') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}>
                                        What is your Date of Birth?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14
                                    }}>
                                        Selected : {Dates ? Dates : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Dates') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>



                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}>
                                        What is your Gender?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14
                                    }}>
                                        Selected : {gender ? gender + ',' + GenderDetail ?? null : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('gender') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        {/* <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}>
                                        What is your Gender Type?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14
                                    }}>
                                        Selected : {GenderDetail ? GenderDetail : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('GenderDetail') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>
 */}

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}>
                                        Height in feet?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14
                                    }}>
                                        Selected : {Hieght ? Hieght : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Hieght') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}>
                                        What is your Education?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                    }}>
                                        Selected : {educationObj ? educationObj : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Education') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end',
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        What is your Religion?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {Relagion ? Relagion : 'not selected'}, {relagionStatus ? relagionStatus : 'ot selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Relagion') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}>
                                        What is your Parent Religion?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                    }}>
                                        Selected : {ParentReligion ? ParentReligion : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('ParentReligion') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end',
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}>
                                        What is your Religion Type?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                    }}>
                                        Selected : {religionType ? religionType : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('religionType') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end',
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>
                        {
                            Relagion == 'Muslim' &&
                            <View style={{
                                marginHorizontal: 20,
                                margin: 10,
                                borderRadius: 20,
                                backgroundColor: COLORS.white,
                                elevation: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                alignItems: 'center',
                                paddingVertical: 20,
                            }}>
                                <View style={{
                                    width: '90%',
                                    paddingRight: 40,
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            color: COLORS.gray,
                                        }}>
                                            What is your Food Type?
                                        </Text>
                                    </View>
                                    <View style={{
                                        paddingTop: 10
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 14,
                                        }}>
                                            Selected : {foodtype ? foodtype : 'not selected'}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => { setShowModal(true), setActionTriggered('foodtype') }}
                                    style={{
                                        width: '10%',
                                        alignItems: 'flex-end',
                                    }}>
                                    <Image source={require('../../assets/Edit2.png')} />
                                </TouchableOpacity>
                            </View>
                        }
                        {
                            Relagion == 'Jewish' &&
                            <View style={{
                                marginHorizontal: 20,
                                margin: 10,
                                borderRadius: 20,
                                backgroundColor: COLORS.white,
                                elevation: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                alignItems: 'center',
                                paddingVertical: 20,
                            }}>
                                <View style={{
                                    width: '90%',
                                    paddingRight: 40,
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            color: COLORS.gray,
                                        }}>
                                            What is your Kosher Type?
                                        </Text>
                                    </View>
                                    <View style={{
                                        paddingTop: 10
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 14,
                                        }}>
                                            Selected : {KosherType ? KosherType : 'not selected'}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => { setShowModal(true), setActionTriggered('KosherType') }}
                                    style={{
                                        width: '10%',
                                        alignItems: 'flex-end',
                                    }}>
                                    <Image source={require('../../assets/Edit2.png')} />
                                </TouchableOpacity>
                            </View>
                        }


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        Did you ever convert your religion?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15,
                                    }}>
                                        Selected : {ConvertedReligion ? ConvertedReligion : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('ConvertedReligion') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end',
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>




                        {
                            ConvertedReligion == 'Yes' &&
                            <View style={{
                                marginHorizontal: 20,
                                margin: 10,
                                borderRadius: 20,
                                backgroundColor: COLORS.white,
                                elevation: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                alignItems: 'center',
                                paddingVertical: 20,
                            }}>
                                <View style={{
                                    width: '90%',
                                    paddingRight: 50,
                                }}>
                                    <View>
                                        <Text style={{ color: COLORS.gray }}>
                                            Did Aver convert your religion?
                                        </Text>
                                    </View>
                                    <View style={{
                                        paddingTop: 10
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 15,
                                        }}>
                                            Selected : {ConvertedReligionDetail ? ConvertedReligionDetail : 'not selected'}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => { setShowModal(true), setActionTriggered('ConvertedReligionDetail') }}
                                    style={{
                                        width: '10%',
                                        alignItems: 'flex-end',
                                    }}>
                                    <Image source={require('../../assets/Edit2.png')} />
                                </TouchableOpacity>
                            </View>

                        }

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}>
                                        What are you looking for?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10,
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                    }}>
                                        Selected : {Lookingfor ? Lookingfor : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Lookingfor') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end',
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 40,
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}>
                                        What is your Build Type?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                    }}>
                                        Selected : {BuildType ? BuildType : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('BuildType') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end',
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        What is your Occupation?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15,
                                    }}>
                                        Selected : {CompanyName ? CompanyName : 'not selected'}, {CompanyType ? CompanyType : 'not selected'}, {PositioninCompany ? PositioninCompany : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('CompanyName') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        What are your throuple options?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {CoupleOption ? CoupleOption : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('CoupleOption') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        What is your Cuddling Type?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {Cuddling ? Cuddling : 'not selected'}

                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Cuddling') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        What is your Deal Breaker?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {DealBreaker ? DealBreaker : 'not selected'}

                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('DealBreaker') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        What is your Deal Maker?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {DealMakers ? DealMakers : 'not selected'}

                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('DealMakers') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        What is your Diet Type?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {Diet?.length > 0 ?
                                            Diet.join(', ')
                                            : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Diet') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View
                            style={{
                                marginHorizontal: 20,
                                margin: 10,
                                borderRadius: 20,
                                backgroundColor: COLORS.white,
                                elevation: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                alignItems: 'center',
                                paddingVertical: 20,
                            }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray,
                                        fontSize: 15,
                                    }}>
                                        Do you Drink?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10,
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15,
                                    }}>
                                        Selected : {Drink ?
                                            Drink
                                            : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Drink') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end',
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        Do you use Drugs?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {Drugs ?
                                            Drugs
                                            : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Drugs') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        What is your Ethnicity?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected : {Ethnicity ?
                                            Ethnicity
                                            : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Ethnicity') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        How often do you Exercise?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10,
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14
                                    }}>
                                        Selected : {Exercise ?
                                            Exercise
                                            : 'not selected'},  {ExerciseStatus ?
                                                ExerciseStatus
                                                : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Exercise') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{ color: COLORS.gray }}>
                                        What is your Eye Color?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14
                                    }}>
                                        Selected : {EyeColor?.length > 0 ? EyeColor?.join(', ') : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('EyeColor') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray
                                    }}>
                                        What is your Fav Food?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                    }}>
                                        Selected : {FavFood?.length > 0 ? FavFood?.join(', ') : 'not selected'}

                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('FavFood') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray

                                    }}>
                                        What is your Hair Color?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        Selected : {HairColor?.length > 0 ? HairColor.join(', ') : 'not selected'}

                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('HairColor') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray

                                    }}>
                                        Where do you see your self in Five Years?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        Selected : {InFiveYear ? InFiveYear : 'not selected'}

                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('InFiveYear') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray

                                    }}>
                                        Where do you see your self in Ten Years?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        Selected : {InTenYear ? InTenYear : 'not selected'}

                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('InTenYear') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray

                                    }}>
                                        What is your Intagram user name?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        Selected : {InstaUsername ? InstaUsername : 'not selected'}

                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('InstaUsername') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>



                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray

                                    }}>
                                        Do you want kids?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        Selected : {Kids ? Kids : 'not selected'}

                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Kids') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray

                                    }}>
                                        What is the longest relationship you had?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        Selected : {LongestRelationship?.length > 0 ? LongestRelationship.join(', ') : 'not selected'}

                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('LongestRelationship') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray

                                    }}>
                                        What type of movies do you are like to watch?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        Selected : {MovieType?.length > 0 ? MovieType.join(', ') : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('MovieType') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray

                                    }}>
                                        Are you introvert or extrovert?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        Selected : {Nature ? Nature : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Nature') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray

                                    }}>
                                        What is your Political View?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        Selected : {PoliticalView ? PoliticalView : 'not selected'}, {PoliticalViewStatus ? PoliticalViewStatus : 'ot selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('PoliticalView') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray
                                    }}>
                                        What type of relationship you are looking for?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        Selected : {RelationshipType?.length > 0 ? RelationshipType.map(item => item.name).join(', ') : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('RelationshipType') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray
                                    }}>
                                        Do you smoke?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        Selected : {Smoke ? Smoke : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Smoke') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>



                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray
                                    }}>
                                        Do you use vape?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        Selected : {Vape ? Vape : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Vape') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray
                                    }}>
                                        Do you use marijauna?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        Selected : {Marijauna ? Marijauna : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Marijauna') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray
                                    }}>
                                        What languages you speak?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        Selected : {languages?.length > 0 ? languages?.join(', ') : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('languages') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            marginHorizontal: 20,
                            margin: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text style={{
                                        color: COLORS.gray
                                    }}>
                                        Are you Clingy?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        Selected : {Clingy ? Clingy : 'not selected'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('Clingy') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>



                        <View style={{
                            alignItems: 'center',
                            paddingTop: 10,
                            marginBottom: 150,
                        }}>

                            {name !== user?.Name || email !== user?.email || number !== user?.PhoneNumber?.substring(3) || bio !== user?.Bio || Dates !== user?.Dates || gender !== user?.Gender || Hieght !== user?.Hieght || JSON?.stringify(educationObj) !== JSON?.stringify(user?.Education) || Relagion !== user?.Relagion || ParentReligion !== user?.ParentReligion || religionType !== user?.religionType || foodtype !== user?.foodtype || ConvertedReligion !== user?.ConvertedReligion || Lookingfor !== user?.Lookingfor || BuildType !== user?.BuildType || CompanyName !== user?.CompanyName || CompanyType !== user?.CompanyType || PositioninCompany !== user?.PositioninCompany || CoupleOption !== user?.CoupleOption || Cuddling !== user?.Cuddling || DealBreaker !== user?.DealBreaker || DealMakers !== user?.DealMakers || JSON?.stringify(Diet) !== JSON?.stringify(user?.Diet) || Drink !== user?.Drink || Drugs !== user?.Drugs || Ethnicity !== user?.Ethnicity || Exercise !== user?.Exercise || JSON?.stringify(EyeColor) !== JSON?.stringify(user?.EyeColor) || JSON?.stringify(FavFood) !== JSON?.stringify(user?.FavFood) || JSON?.stringify(HairColor) !== JSON?.stringify(user?.HairColor) || InFiveYear !== user?.InFiveYear || InTenYear !== user?.InTenYear || InstaUsername !== user?.InstaUsername || Kids !== user?.Kids || JSON?.stringify(LongestRelationship) !== JSON?.stringify(user?.LongestRelationship) || JSON?.stringify(MovieType) !== JSON?.stringify(user?.MovieType) || Nature !== user?.Nature || PoliticalView !== user?.PoliticalView || JSON?.stringify(RelationshipType) !== JSON?.stringify(user?.RelationshipType) || Smoke !== user?.Smoke || Vape !== user?.Vape || Marijauna !== user?.Marijauna || JSON?.stringify(languages) !== JSON?.stringify(user?.languages) || Clingy !== user?.Clingy ?

                                <View style={{
                                    flexDirection: 'row',
                                    marginHorizontal: 20,
                                    alignSelf: 'center',
                                    marginTop: 20
                                }}>
                                    <View style={{ marginHorizontal: 5 }}>
                                        <CustomeButton
                                            width={width / 3}
                                            title={'Cancle'}
                                            onpress={() => navigation.goBack()}
                                            bcolor={COLORS.light}
                                        />
                                    </View>
                                    <View style={{ marginHorizontal: 5 }}>
                                        {uploading ?
                                            <CustomeButton
                                                width={width / 2}
                                                title={'Please wait...'}
                                                bcolor={COLORS.main}
                                            />
                                            :
                                            <CustomeButton
                                                width={width / 2}
                                                title={'Save Changes'}
                                                onpress={() => OnSaveChanges()}
                                                bcolor={COLORS.main}
                                            />
                                        }
                                    </View>
                                </View>
                                : null
                            }
                        </View>
                        {/* <View style={{
                            alignItems: 'center',
                            paddingTop: 10,
                            marginBottom: 80,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                marginHorizontal: 20,
                            }}>
                                <View style={{ marginHorizontal: 5 }}>
                                    <CustomeButton
                                        width={width / 2.5}
                                        title={'Terms or Conditions'}
                                        onpress={() => navigation.navigate('TermsandCondition')}
                                        bcolor={COLORS.light}
                                    />
                                </View>
                                <View style={{ marginHorizontal: 5 }}>
                                    <CustomeButton
                                        width={width / 2.5}
                                        title={'Privacy Policy'}
                                        onpress={() => navigation.navigate('PrivacyPolicy')}
                                        bcolor={COLORS.light}
                                    />
                                </View>
                            </View>
                            <View style={{
                                alignItems: 'center',
                                paddingVertical: 10,
                                marginBottom: 20,
                            }}>
                                <View style={{ marginHorizontal: 5 }}>
                                    <CustomeButton
                                        width={width / 2.5}
                                        title={'Logout'}
                                        onpress={() => OnLogOut()}
                                        bcolor={COLORS.main}
                                    />
                                </View>
                            </View>
                        </View> */}
                    </View>







                    {/* //here modal */}
                    < Modal
                        animationType="slide"
                        transparent={false}
                        visible={showModal}
                        onRequestClose={() => {
                            setShowModal(!showModal);
                        }}
                    >
                        {actionTriggered == 'bio' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/bio.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                filter={'bio'}
                                title={'Public Bio'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setBio}
                                value={bio}
                            />
                        }

                        {
                            actionTriggered == 'Dates' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/dateofbirth.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                filter={'Dates'}
                                title={'When were you born?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setDates}
                                value={Dates}
                            />
                        }
                        {
                            actionTriggered == 'gender' || actionTriggered == 'GenderDetail' ?
                                <EditUserDetailsOne
                                    image={
                                        <Image source={require('../../assets/gender.png')} resizeMode='contain' style={{
                                            // width: 150,
                                            height: height / 8,
                                        }} />
                                    }
                                    title={'What do you identify as?'}
                                    data1={GenderData}
                                    filter={'Gender'}
                                    data2={GenderMore}
                                    setModal={setShowModal}
                                    Modal={showModal}
                                    setValue={setGender}
                                    value={gender}
                                    setValueTwo={setGenderDetail}
                                    valueTwo={GenderDetail}
                                />
                                : null
                        }
                        {
                            actionTriggered == 'Hieght' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/height.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                filter={'Hieght'}
                                title={'Your Height?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setHieght}
                                value={Hieght}
                            />
                        }
                        {
                            actionTriggered == 'Education' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/education.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                // type={'array'}
                                title={'What is your Education?'}
                                data1={Education}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setEducationObj}
                                value={educationObj}
                            />
                        }
                        {
                            actionTriggered == 'Relagion' &&
                            <EditUserDetailsOne
                                title={'What is your religion?'}
                                data1={RelagionType}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setRelagion}
                                value={Relagion}
                                setValueTwo={setRelagionStatus}
                                valueTwo={relagionStatus}
                            />
                        }
                        {
                            actionTriggered == 'ParentReligion' &&
                            <EditUserDetailsOne
                                title={'What is your parents religion?'}
                                data1={
                                    Relagion == 'Muslim' ?
                                        MuslimParentType :
                                        Relagion == 'Catholic' ?
                                            CatholicParentType :
                                            Relagion == 'Jewish' ?
                                                JewishParentType :
                                                Relagion == 'Christian' ?
                                                    ChristianParentType : null
                                }
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setParentReligion}
                                value={ParentReligion}
                            />
                        }
                        {
                            actionTriggered == 'religionType' &&
                            <EditUserDetailsOne
                                title={'What is your religion type?'}
                                data1={
                                    Relagion == 'Muslim' ?
                                        MuslimDetailReligion :
                                        Relagion == 'Catholic' ?
                                            CatholicDetailReligion :
                                            Relagion == 'Jewish' ?
                                                JewishDetailReligion :
                                                Relagion == 'Christian' ?
                                                    ChristianDetailReligion : null
                                }
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setreligionType}
                                value={religionType}
                            />
                        }
                        {
                            actionTriggered == 'foodtype' &&
                            <EditUserDetailsOne
                                title={'What is your religion food type?'}
                                data1={MuslimFoodTypeReligion}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setfoodtype}
                                value={foodtype}
                            />
                        }
                        {
                            actionTriggered == 'KosherType' &&
                            <EditUserDetailsOne
                                title={'How kosher are you?'}
                                data1={JewishKosherTypeReligion}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setKosherType}
                                value={KosherType}
                            />
                        }
                        {
                            actionTriggered == 'ConvertedReligion' &&
                            <EditUserDetailsOne
                                title={'Any converted religion?'}
                                data1={convertdata}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setConvertedReligion}
                                value={ConvertedReligion}
                                setValueTwo={setConvertedReligionDetail}
                                valueTwo={ConvertedReligionDetail}
                            />
                        }
                        {
                            actionTriggered == 'ConvertedReligionDetail' &&
                            <EditUserDetailsOne
                                title={'Any converted religion?'}
                                data1={convertdata}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setConvertedReligion}
                                value={ConvertedReligion}
                                setValueTwo={setConvertedReligionDetail}
                                valueTwo={ConvertedReligionDetail}
                            />
                        }
                        {
                            actionTriggered == 'Lookingfor' &&
                            <EditUserDetailsOne
                                title={'What are you looking for?'}
                                data1={DatesData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setLookingfor}
                                value={Lookingfor}
                            />
                        }
                        {
                            actionTriggered == 'BuildType' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/buildtype.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                title={'Your Build Type?'}
                                data1={BuildTypeData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setBuildType}
                                value={BuildType}
                            />
                        }
                        {
                            actionTriggered == 'CompanyName' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/occupassion.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                filter={'Company'}
                                title={'Occupation'}
                                data1={CompanyBusiness}
                                data2={PositionTestimonial}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setCompanyName}
                                value={CompanyName}
                                setValueTwo={setCompanyType}
                                valueTwo={CompanyType}
                                setValueThree={setPositioninCompany}
                                valueThree={PositioninCompany}
                            />
                        }
                        {
                            actionTriggered == 'CoupleOption' &&
                            <EditUserDetailsOne
                                title={'Throuple options?'}
                                data1={CoupleOptionData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setCoupleOption}
                                value={CoupleOption}
                            />
                        }
                        {
                            actionTriggered == 'Cuddling' &&
                            <EditUserDetailsOne
                                title={'Do you like Cuddling?'}
                                data1={CuddlingData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setCuddling}
                                value={Cuddling}
                            />
                        }
                        {
                            actionTriggered == 'DealBreaker' &&
                            <EditUserDetailsOne
                                filter={'DealBreaker'}
                                title={'Major Deal Breakers'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setDealBreaker}
                                value={DealBreaker}
                            />
                        }
                        {
                            actionTriggered == 'DealMakers' &&
                            <EditUserDetailsOne
                                filter={'DealMakers'}
                                title={'Major Deal Makers'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setDealMakers}
                                value={DealMakers}
                            />
                        }
                        {
                            actionTriggered == 'Diet' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/diet.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                type={'array'}
                                title={'Diet'}
                                data1={dietData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setDiet}
                                value={Diet}
                            />
                        }
                        {
                            actionTriggered == 'Drink' &&
                            <EditUserDetailsOne
                                title={'Do you Drink?'}
                                data1={DrinksData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setDrink}
                                value={Drink}
                            />
                        }
                        {
                            actionTriggered == 'Drugs' &&
                            <EditUserDetailsOne
                                title={'Do you use Drugs?'}
                                data1={DrinksData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setDrugs}
                                value={Drugs}
                            />
                        }
                        {
                            actionTriggered == 'Ethnicity' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/ethnicity.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                title={'What is your Ethnicity?'}
                                data1={EthnicityData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setEthnicity}
                                value={Ethnicity}
                            />
                        }

                        {
                            actionTriggered == 'Exercise' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/exersize2.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                title={'How often do you Exercise?'}
                                data1={ExerciseData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setExercise}
                                value={Exercise}
                                setValueTwo={setExerciseStatus}
                                valueTwo={ExerciseStatus}
                            />
                        }

                        {
                            actionTriggered == 'EyeColor' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/eyecolor.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                type={'array'}
                                title={'Which color of eye do you have?'}
                                data1={EyeData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setEyeColor}
                                value={EyeColor}
                            />
                        }
                        {
                            actionTriggered == 'HairColor' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/haircolor.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                type={'array'}
                                title={'Which color of hair do you have?'}
                                data1={HairColorData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setHairColor}
                                value={HairColor}
                            />
                        }
                        {
                            actionTriggered == 'FavFood' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/diet.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                filter={'FavFood'}
                                type={'array'}
                                title={'Favorite Food'}
                                data1={FavFoodData}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setFavFood}
                                value={FavFood}
                            />
                        }
                        {
                            actionTriggered == 'InFiveYear' &&
                            <EditUserDetailsOne
                                filter={'InFiveYear'}
                                title={'Where do you see your self in five years'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setInFiveYear}
                                value={InFiveYear}
                            />
                        }
                        {
                            actionTriggered == 'InTenYear' &&
                            <EditUserDetailsOne
                                filter={'InFiveYear'}
                                title={'Where do you see your self in ten years'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setInTenYear}
                                value={InTenYear}
                            />
                        }
                        {
                            actionTriggered == 'InstaUsername' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/insta.png')} resizeMode='contain' style={{
                                        // width: 150,
                                        height: height / 8,
                                    }} />
                                }
                                filter={'InstaUsername'}
                                title={'What is your Instagram?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setInstaUsername}
                                value={InstaUsername}
                            />
                        }
                        {
                            actionTriggered == 'Kids' &&
                            <EditUserDetailsOne
                                title={'Do you want Kids?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setKids}
                                value={Kids}
                                data1={WantKidData}
                            />
                        }
                        {
                            actionTriggered == 'LongestRelationship' &&
                            <EditUserDetailsOne
                                type={'array'}
                                title={'What is the longest relationship you had?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setLongestRelationship}
                                value={LongestRelationship}
                                data1={LongestRelationshipData}
                            />
                        }

                        {
                            actionTriggered == 'MovieType' &&
                            <EditUserDetailsOne
                                type={'array'}
                                title={'What type of movies do you like to watch too?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setMovieType}
                                value={MovieType}
                                data1={MovieData}
                            />
                        }

                        {
                            actionTriggered == 'Nature' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/group.png')} resizeMode='contain' style={{
                                        height: height / 8,
                                    }} />
                                }
                                title={'Are you introvert or extrovert?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setNature}
                                value={Nature}
                                data1={IntroExtroData}
                            />
                        }

                        {
                            actionTriggered == 'PoliticalView' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/vote.png')} resizeMode='contain' style={{
                                        height: height / 8,
                                    }} />
                                }
                                title={'Political Views'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setPoliticalView}
                                value={PoliticalView}
                                setValueTwo={setPoliticalViewStatus}
                                valueTwo={PoliticalViewStatus}
                                data1={PoliticalData}
                            />
                        }

                        {
                            actionTriggered == 'RelationshipType' &&
                            <EditUserDetailsOne
                                type={'array'}
                                title={'What type of relationship you are looking for?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setRelationshipType}
                                value={RelationshipType}
                                filter={'RelationshipType'}
                                data1={RelationshipTypeArray}
                            />
                        }

                        {
                            actionTriggered == 'Smoke' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/smoke2.png')} resizeMode='contain' style={{
                                        height: height / 8,
                                    }} />
                                }
                                title={'Do you smoke?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setSmoke}
                                value={Smoke}
                                data1={DrinksData}
                            />
                        }
                        {
                            actionTriggered == 'Vape' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/vape2.png')} resizeMode='contain' style={{
                                        height: height / 8,
                                    }} />
                                }
                                title={'Do you use Vape?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setVape}
                                value={Vape}
                                data1={DrinksData}
                            />
                        }
                        {
                            actionTriggered == 'Marijauna' &&
                            <EditUserDetailsOne
                                image={
                                    <Image source={require('../../assets/marijuana.png')} resizeMode='contain' style={{
                                        height: height / 8,
                                    }} />
                                }
                                title={'Do you use Marijauna?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setMarijauna}
                                value={Marijauna}
                                data1={DrinksData}
                            />
                        }
                        {
                            actionTriggered == 'languages' &&
                            <EditUserDetailsOne
                                type={'array'}
                                image={
                                    <Image source={require('../../assets/language.png')} resizeMode='contain' style={{
                                        height: height / 8,
                                    }} />
                                }
                                title={'What language you speak?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setlanguages}
                                value={languages}
                                filter={'languages'}
                                data1={languageArray}
                                data2={TemplanguageArray}
                                setData2={setTempLanguageArray}
                            />
                        }
                        {
                            actionTriggered == 'Clingy' &&
                            <EditUserDetailsOne
                                filter={'clingy'}
                                title={'Are you clingy?'}
                                setModal={setShowModal}
                                Modal={showModal}
                                setValue={setClingy}
                                value={Clingy}
                                data1={ClingyData}
                            />
                        }


                        {
                            actionTriggered == 'Name' &&
                            <EditUserCredentials
                                image={
                                    <Image source={require('../../assets/namescreen.png')} resizeMode='contain' style={{
                                        height: height / 8,
                                    }} />
                                }
                                filter={'Name'}
                                title={'What is your new Name?'}
                                data={name}
                                setModal={setShowModal}
                                Modal={showModal}
                            />
                        }
                        {
                            actionTriggered == 'Email' &&
                            <EditUserCredentials
                                filter={'Email'}
                                title={'What is your new Email?'}
                                data={email}
                                setModal={setShowModal}
                                Modal={showModal}
                            />
                        }
                        {
                            actionTriggered == 'Number' &&
                            <EditUserCredentials
                                title={'What is your new Number?'}
                                data={number}
                                filter={'Number'}
                                setModal={setShowModal}
                                Modal={showModal}
                            />
                        }
                    </Modal>
                </ScrollView>
            </View >
            <Loader modal={uploading} uploading={uploading} />
        </SafeAreaView >
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%',
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: 45,
        width: 340,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    NumberInput2: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        // marginBottom:5,
        height: 45,
        width: 340,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        color: COLORS.gray,
        backgroundColor: COLORS.transparent,
    },
    phoneNumberView: {
        width: 340,
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.light,
        // marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light
    },

})