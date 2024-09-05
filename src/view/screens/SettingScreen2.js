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
    },
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
        id: '6',
        name: '#I love trying new food',
    },
    {
        id: '7',
        name: '#I hate trying new food',
    },
    {
        id: '8',
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


const Data1 = [
    {
        id: '1',
        name: 'Platonic Relationship',
    },
    {
        id: '2',
        name: 'Long term Relationship',
    },
    {
        id: '3',
        name: 'Short term Relationship',
    },
    {
        id: '4',
        name: 'One night stand',
    },
    {
        id: '5',
        name: 'Polymerous',
    },
    {
        id: '6',
        name: 'Monogamous',
    },
    {
        id: '7',
        name: 'Open relationship',
    },
    {
        id: '8',
        name: 'Regular FWB',
    },
    {
        id: '9',
        name: 'Life partner',
    },
]
const Data2 = [
    {
        id: '1',
        name: 'Christian',
        onpress: 'QuestionMoreAboutChristianScreen'
    },
    {
        id: '2',
        name: 'Jewish',
        onpress: 'QuestionMoreAboutJewishScreen'
    },
    {
        id: '3',
        name: 'Catholic',
        onpress: 'QuestionMoreAboutCatholicScreen'
    },
    {
        id: '4',
        name: 'Muslim',
        onpress: 'QuestionMoreAboutMuslimScreen'
    },
    {
        id: '5',
        name: 'Hinduism',
    },

    {
        id: '5',
        name: 'Buddhism',
    },

    {
        id: '5',
        name: 'Chinese traditional religion',
    },
]

const Data3 = [
    {
        id: '1',
        name: 'Male',
    },
    {
        id: '2',
        name: 'Female',
    },
    {
        id: '3',
        name: 'Non binaray',
    },
    {
        id: '4',
        name: 'Trans Male to Female',
    },
    {
        id: '5',
        name: 'Trans Female to Male',
    },
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

    const [bio, setBio] = useState(user?.Bio ? user?.Bio : null);
    const [bioEdit, setBioEdit] = useState(false);
    const [bioIndex, setBioIndex] = useState(null);
    const [BuildType, setBuildType] = useState(user?.BuildType ? user?.BuildType : null);
    const [BuildTypeEdit, setBuildTypeEdit] = useState(false);
    const [BuildTypeIndex, setBuildTypeindex] = useState(null);
    const [Clingy, setClingy] = useState(user?.Clingy ? user?.Clingy : null);
    const [ClingyEdit, setClingyEdit] = useState(false);
    const [ClingyIndex, setClingyIndex] = useState(null);
    const [CompanyName, setCompanyName] = useState(user?.CompanyName ? user?.CompanyName : null);
    const [CompanyNameEdit, setCompanyNameEdit] = useState(false);
    const [CompanyNameIndex, setCompanyNameIndex] = useState(null);
    const [CompanyType, setCompanyType] = useState(user?.CompanyType ? user?.CompanyType : null);
    const [CompanyTypeEdit, setCompanyTypeEdit] = useState(false);
    const [CompanyTypeIndex, setCompanyTypeIndex] = useState(null);
    const [Relagion, setRelagion] = useState(user?.Relagion ? user?.Relagion : null);
    const [RelagionEdit, setRelagionEdit] = useState(false);
    const [RelagionIndex, setRelagionIndex] = useState(null);
    const [religionType, setreligionType] = useState(user?.religionType ? user?.religionType : null);
    const [religionTypeEdit, setreligionTypeEdit] = useState(false);
    const [religionTypeIndex, setreligionTypeIndex] = useState(null);
    const [ConvertedReligion, setConvertedReligion] = useState(user?.ConvertedReligion ? user?.ConvertedReligion : null);
    const [ConvertedReligionEdit, setConvertedReligionEdit] = useState(false);
    const [ConvertedReligionIndex, setConvertedReligionIndex] = useState(null);
    const [ConvertedReligionDetail, setConvertedReligionDetail] = useState(user?.ConvertedReligionDetail ? user?.ConvertedReligionDetail : null);
    const [ConvertedReligionDetailEdit, setConvertedReligionDetailEdit] = useState(false);
    const [ConvertedReligionDetailIndex, setConvertedReligionDetailIndex] = useState(null);
    const [ParentReligion, setParentReligion] = useState(user?.ParentReligion ? user?.ParentReligion : null);
    const [ParentReligionEdit, setParentReligionEdit] = useState(false);
    const [ParentReligionIndex, setParentReligionIndex] = useState(null);
    const [KosherType, setKosherType] = useState(user?.KosherType ? user?.KosherType : null);
    const [KosherTypeEdit, setKosherTypeEdit] = useState(false);
    const [KosherTypeIndex, setKosherTypeIndex] = useState(null);
    const [foodtype, setfoodtype] = useState(user?.foodtype ? user?.foodtype : null);
    const [foodtypeEdit, setfoodtypeEdit] = useState(false);
    const [foodtypeIndex, setfoodtypeIndex] = useState(null);
    const [CoupleOption, setCoupleOption] = useState(user?.CoupleOption ? user?.CoupleOption : null);
    const [CoupleOptionEdit, setCoupleOptionEdit] = useState(false);
    const [CoupleOptionIndex, setCoupleOptionIndex] = useState(null);
    const [Cuddling, setCuddling] = useState(user?.Cuddling ? user?.Cuddling : null);
    const [CuddlingEdit, setCuddlingEdit] = useState(false);
    const [CuddlingIndex, setCuddlingIndex] = useState(null);
    const [Dates, setDates] = useState(user?.Dates ? user?.Dates : null);
    const [DatesEdit, setDatesEdit] = useState(false);
    const [DatesIndex, setDatesIndex] = useState(null);
    const [DealBreaker, setDealBreaker] = useState(user?.DealBreaker ? user?.DealBreaker : null);
    const [DealBreakerEdit, setDealBreakerEdit] = useState(false);
    const [DealBreakerIndex, setDealBreakerIndex] = useState(null);
    const [DealMakers, setDealMakers] = useState(user?.DealMakers ? user?.DealMakers : null);
    const [DealMakersEdit, setDealMakersEdit] = useState(false);
    const [DealMakersIndex, setDealMakersIndex] = useState(null);
    const [Diet, setDiet] = useState(user?.Diet ? user?.Diet : null);
    const [DietEdit, setDietEdit] = useState(false);
    const [DietIndex, setDietIndex] = useState(null);
    const [Drink, setDrink] = useState(user?.Drink ? user?.Drink : null);
    // console.log(user.Drink);
    const [DrinkEdit, setDrinkEdit] = useState(false);
    const [DrinkIndex, setDrinkIndex] = useState(null);
    const [Drugs, setDrugs] = useState(user?.Drugs ? user?.Drugs : null);
    const [DrugsEdit, setDrugsEdit] = useState(false);
    const [DrugsIndex, setDrugsIndex] = useState(null);
    const [educationObj, setEducationObj] = useState(user?.Education ? user?.Education : null);
    const [EducationEdit, setEducationEdit] = useState(false);
    const [EducationIndex, setEducationIndex] = useState(null);
    const [Ethnicity, setEthnicity] = useState(user?.Ethnicity ? user?.Ethnicity : null);
    const [EthnicityEdit, setEthnicityEdit] = useState(false);
    const [EthnicityIndex, setEthnicityIndex] = useState(null);
    const [Exercise, setExercise] = useState(user?.Exercise ? user?.Exercise : null);
    const [ExerciseEdit, setExerciseEdit] = useState(false);
    const [ExerciseIndex, setExerciseIndex] = useState(null);
    const [ExerciseStatus, setExerciseStatus] = useState(user?.ExerciseStatus ? user?.ExerciseStatus : null);
    const [ExerciseStatusEdit, setExerciseStatusEdit] = useState(false);
    const [ExerciseStatusIndex, setExerciseStatusIndex] = useState(null);
    const [EyeColor, setEyeColor] = useState(user?.EyeColor ? user?.EyeColor : null);
    const [EyeColorEdit, setEyeColorEdit] = useState(false);
    const [EyeColorIndex, setEyeColorIndex] = useState(null);
    const [FavFood, setFavFood] = useState(user?.FavFood ? user?.FavFood : null);
    const [FavFoodEdit, setFavFoodEdit] = useState(false);
    const [FavFoodIndex, setFavFoodIndex] = useState(null);
    const [gender, setGender] = useState(user?.Gender ? user?.Gender : null);
    const [genderIndex, setGenderIndex] = useState(null);
    const [GenderEdit, setGenderEdit] = useState(false);
    const [GenderDetail, setGenderDetail] = useState(user?.GenderDetial ? user?.GenderDetial : null);
    const [GenderDetailEdit, setGenderDetailEdit] = useState(false);
    const [GenderDetailIndex, setGenderDetailIndex] = useState(null);
    const [HairColor, setHairColor] = useState(user?.HairColor ? user?.HairColor : null);
    const [HairColorEdit, setHairColorEdit] = useState(false);
    const [HairColorIndex, setHairColorIndex] = useState(null);
    const [Hieght, setHieght] = useState(user?.Hieght ? user?.Hieght : null);
    const [HieghtEdit, setHieghtEdit] = useState(false);
    const [HieghtIndex, setHieghtIndex] = useState(null);
    const [InFiveYear, setInFiveYear] = useState(user?.InFiveYear ? user?.InFiveYear : null);
    const [InFiveYearEdit, setInFiveYearEdit] = useState(false);
    const [InFiveYearIndex, setInFiveYearIndex] = useState(null);
    const [InTenYear, setInTenYear] = useState(user?.InTenYear ? user?.InTenYear : null);
    const [InTenYearEdit, setInTenYearEdit] = useState(false);
    const [InTenYearIndex, setInTenYearIndex] = useState(null);
    const [InstaUsername, setInstaUsername] = useState(user?.InstaUsername ? user?.InstaUsername : null);
    const [InstaUsernameEdit, setInstaUsernameEdit] = useState(false);
    const [InstaUsernameIndex, setInstaUsernameIndex] = useState(null);
    const [Nature, setNature] = useState(user?.Nature ? user?.Nature : null);
    const [NatureEdit, setNatureEdit] = useState(false);
    const [NatureIndex, setNatureIndex] = useState(null);
    const [Kids, setKids] = useState(user?.Kids ? user?.Kids : null);
    const [KidsEdit, setKidsEdit] = useState(false);
    const [KidsIndex, setKidsIndex] = useState(null);
    const [LongestRelationship, setLongestRelationship] = useState(user?.LongestRelationship ? user?.LongestRelationship : null);
    const [LongestRelationshipEdit, setLongestRelationshipEdit] = useState(false);
    const [LongestRelationshipIndex, setLongestRelationshipIndex] = useState(null);
    const [Lookingfor, setLookingfor] = useState(user?.Lookingfor ? user?.Lookingfor : null);
    const [LookingforEdit, setLookingforEdit] = useState(false);
    const [LookingforIndex, setLookingforIndex] = useState(null);
    const [Marijauna, setMarijauna] = useState(user?.Marijauna ? user?.Marijauna : null);
    const [MarijaunaEdit, setMarijaunaEdit] = useState(false);
    const [MarijaunaIndex, setMarijaunaIndex] = useState(null);
    const [MovieType, setMovieType] = useState(user?.MovieType ? user?.MovieType : null);
    const [MovieTypeEdit, setMovieTypeEdit] = useState(false);
    const [MovieTypeIndex, setMovieTypeIndex] = useState(null);
    const [PoliticalView, setPoliticalView] = useState(user?.PoliticalView ? user?.PoliticalView : null);
    const [PoliticalViewEdit, setPoliticalViewEdit] = useState(false);
    const [PoliticalViewIndex, setPoliticalViewIndex] = useState(null);
    const [PoliticalViewStatus, setPoliticalViewStatus] = useState(user?.PoliticalViewStatus ? user?.PoliticalViewStatus : null);
    const [PoliticalViewStatusEdit, setPoliticalViewStatusEdit] = useState(false);
    const [PoliticalViewStatusIndex, setPoliticalViewStatusIndex] = useState(null);
    const [PositioninCompany, setPositioninCompany] = useState(user?.PositioninCompany ? user?.PositioninCompany : null);
    const [PositioninCompanyEdit, setPositioninCompanyEdit] = useState(false);
    const [PositioninCompanyIndex, setPositioninCompanyIndex] = useState(null);
    const [RelationshipType, setRelationshipType] = useState(user?.RelationshipType ? user?.RelationshipType : null);
    const [RelationshipTypeEdit, setRelationshipTypeEdit] = useState(false);
    const [RelationshipTypeIndex, setRelationshipTypeIndex] = useState(null);
    const [Smoke, setSmoke] = useState(user?.Smoke ? user?.Smoke : null);
    const [SmokeEdit, setSmokeEdit] = useState(false);
    const [SmokeIndex, setSmokeIndex] = useState(null);
    const [Vape, setVape] = useState(user?.Vape ? user?.Vape : null);
    const [VapeEdit, setVapeEdit] = useState(false);
    const [VapeIndex, setVapeIndex] = useState(null);
    const [languages, setlanguages] = useState(user?.languages ? user?.languages : null);
    const [languagesEdit, setlanguagesEdit] = useState(false);
    const [languagesIndex, setlanguagesIndex] = useState(null);


    const [actionTriggered, setActionTriggered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // const [relationshipTypeyour, setRelationshipTypeyour] = useState(user.RelationshipType ? user.RelationshipType : null);
    // const [religionyour, setReligionyour] = useState(user.Relagion ? user.Relagion : null);
    // const [religionTypeyour, setReligionTypeyour] = useState(user.religionType ? user.religionType : null);
    // const [genderyour, setGenderyour] = useState(user.Gender ? user.Gender : null);
    // const [relationShipLookingyour, setRelationShipLookingyour] = useState(user.relationshipLookingType ? user.relationshipLookingType : null);








    // question
    // const [relationshipType, setRelationshipType] = useState(0);
    // const [religion, setReligion] = useState(0);
    // const [religionType, setReligionType] = useState(0);
    // const [gender, setGender] = useState(0);
    // const [relationShipLooking, setRelationShipLooking] = useState(0);
    const [uploading, setUploading] = useState(false);


    const dispatch = useDispatch();
    const phoneInput = useRef(null);


    const OnSaveChanges = () => {
        setUploading(true)
        if (!name ||
            !email ||
            !number ||
            !bio ||
            !BuildType ||
            !Clingy ||
            !CompanyName ||
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
            if (!name) {
                ToastAndroid.show('Please enter your new name!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!email) {
                ToastAndroid.show('Please enter your new email!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!number) {
                ToastAndroid.show('Please enter your new number!', ToastAndroid.SHORT)
                setUploading(false)
            }
            else if (!bio) {
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
            else if (!CompanyName || !PositioninCompany || !CompanyType) {
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
            const userRef = firestore().collection('Users')
                .doc(user?.uid)
            userRef.update({
                'userDetails.Name': name,
                'userDetails.email': email,
                'userDetails.Number': number,
                'userDetails.Bio': bio,
                'userDetails.BuildType': BuildType,
                'userDetails.Clingy': Clingy,
                'userDetails.CompanyName': CompanyName,
                'userDetails.CompanyType': CompanyType,
                'userDetails.PositioninCompany': PositioninCompany,
                'userDetails.ConvertedReligion': ConvertedReligion,
                'userDetails.ConvertedReligionDetail': ConvertedReligionDetail,
                'userDetails.CoupleOption': CoupleOption,
                'userDetails.Cuddling': Cuddling,
                'userDetails.Dates': Dates,
                'userDetails.DealBreaker': DealBreaker,
                'userDetails.DealMakers': DealMakers,
                'userDetails.Diet': Diet,
                'userDetails.Drink': Drink,
                'userDetails.Drugs': Drugs,
                'userDetails.Education': Education,
                'userDetails.Ethnicity': Ethnicity,
                'userDetails.Exercise': Exercise,
                'userDetails.ExerciseStatus': ExerciseStatus,
                'userDetails.EyeColor': EyeColor,
                'userDetails.FavFood': FavFood,
                'userDetails.Gender': gender,
                'userDetails.GenderDetial': GenderDetail,
                'userDetails.HairColor': HairColor,
                'userDetails.Hieght': Hieght,
                'userDetails.InFiveYear': InFiveYear,
                'userDetails.InTenYear': InTenYear,
                'userDetails.InstaUsername': InstaUsername,
                'userDetails.Kids': Kids,
                'userDetails.LongestRelationship': LongestRelationship,
                'userDetails.Lookingfor': Lookingfor,
                'userDetails.Marijauna': Marijauna,
                'userDetails.MovieType': MovieType,
                'userDetails.Nature': Nature,
                'userDetails.ParentReligion': ParentReligion,
                'userDetails.PoliticalView': PoliticalView,
                'userDetails.Relagion': Relagion,
                'userDetails.RelationshipType': RelationshipType,
                'userDetails.Smoke': Smoke,
                'userDetails.Vape': Vape,
                'userDetails.foodtype': foodtype,
                'userDetails.KosherType': KosherType,
                'userDetails.languages': languages,
            }).then(() => {
                setUploading(false)
                navigation.navigate('ProfileScreen')
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
                    paddingHorizontal: 20,
                }}>
                    <View style={{ width: '20%' }}>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <SVGmenu width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '60%', alignItems: 'center', }}>
                        <Text style={{
                            fontSize: 20,
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
                                <Text style={{ color: COLORS.black, fontSize: 14, }}> Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        // aria-disabled={true}
                                        editable={nameEdit}
                                        value={name}
                                        placeholder={'Enter your name'}
                                        keyboardType='email-address'
                                        onChangeText={name => setName(name)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setNameEdit(!nameEdit)}>
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
                                <Text style={{ color: COLORS.black, fontSize: 14, }}> Email </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        editable={emailEdit}
                                        value={email}
                                        placeholder={'Enter your email'}
                                        keyboardType='email-address'
                                        onChangeText={email => setEmail(email)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setEmailEdit(!emailEdit)}>
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
                                <Text style={{ color: COLORS.black, fontSize: 14, }}> Phone Number </Text>
                                <PhoneInput
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
                                />
                                {/* <View style={styles.NumberInput}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>

                                        <Image source={require('../../assets/USflag.png')} resizeMode='contain' style={{
                                            marginRight: 10,
                                            borderRadius: 3
                                        }} />
                                        <Text> | </Text>
                                        <TextInput
                                            value={number}
                                            placeholder={'Enter your number'}
                                            keyboardType='email-address'
                                            onChangeText={number => setNumber(number)
                                            }
                                            style={styles.TextInput}
                                        />
                                    </View>
                                    <View>
                                        <Image source={require('../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </View>
                                </View> */}
                            </View>
                        </View>

                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black,
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
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 14
                                    }}>
                                        Selected : {bio ? bio : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('bio') }}
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
                                        Selected : {gender ? gender : 'not selected'}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('gender') }}
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
                                        What is your Height in Feets?
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
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text>
                                        What is your religion?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected :
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('ACTION_2') }}
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
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text>
                                        What do you identify as?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected :
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('ACTION_3') }}
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
                            height: 100,
                        }}>
                            <View style={{
                                width: '90%',
                                paddingRight: 50,
                            }}>
                                <View>
                                    <Text>
                                        What type of relationship you are looking for?
                                    </Text>
                                </View>
                                <View style={{
                                    paddingTop: 10
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 15
                                    }}>
                                        Selected :
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => { setShowModal(true), setActionTriggered('ACTION_4') }}
                                style={{
                                    width: '10%',
                                    alignItems: 'flex-end'
                                }}>
                                <Image source={require('../../assets/Edit2.png')} />
                            </TouchableOpacity>
                        </View>

                        {name !== user.Name || email !== user.email || number != user.PhoneNumber.substring(3) ?
                            <View style={{ marginVertical: 20, alignSelf: 'center' }}>
                                <CustomeButton
                                    width={width / 1.2}
                                    title={'Save Changes'}
                                    onpress={() => OnSaveChanges()}
                                    bcolor={COLORS.main}
                                />
                            </View>
                            : null
                        }

                        <View style={{
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
                        </View>
                    </View>







                    {/* //here modal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => {
                            setShowModal(!showModal);
                        }}
                    >
                        {actionTriggered == 'ACTION_1' &&
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 22,
                            }}>
                                <View style={{
                                    margin: 20,
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    padding: 35,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                    {Data1.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.8}
                                            onPress={() => onRelationshipType(index)}>
                                            <View style={{
                                                backgroundColor: relationshipType == index ? COLORS.main : COLORS.transparent,
                                                flexDirection: 'row',
                                                marginTop: 10,
                                                alignItems: 'center',
                                                marginHorizontal: 20,
                                                paddingHorizontal: 20,
                                                height: 45,
                                                width: 340,
                                                backgroundColor: COLORS.light,
                                                borderRadius: 5,
                                            }}>
                                                <View style={{ width: '90%' }}>
                                                    <Text style={{ color: COLORS.black }}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    alignItems: 'flex-end',
                                                }}>
                                                    {relationshipType == index ? (
                                                        <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                                                            width: 20,
                                                            height: 20
                                                        }} />
                                                    ) : (<View></View>
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                    <View style={{
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        flexDirection: 'row',
                                        marginTop: 10
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => setShowModal(false)}
                                            style={{
                                                width: '90%',
                                                borderWidth: 1,
                                                borderColor: COLORS.black,
                                                borderRadius: 10,
                                                marginHorizontal: 5,
                                                paddingVertical: 10,
                                                alignItems: 'center',
                                            }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>
                                                Back
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>}

                        {actionTriggered == 'ACTION_2' &&
                            <ScrollView vertical showsVerticalScrollIndicator={false}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 22,
                                }}>
                                    <View style={{
                                        margin: 20,
                                        backgroundColor: 'white',
                                        borderRadius: 20,
                                        padding: 35,
                                        alignItems: 'center',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5,
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black }}>Religion</Text>
                                        {Data2.map((item, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={0.8}
                                                onPress={() => onRelagion(index)}
                                            >
                                                <View style={{
                                                    backgroundColor: religion == index ? COLORS.main : COLORS.transparent,
                                                    flexDirection: 'row',
                                                    marginTop: 10,
                                                    alignItems: 'center',
                                                    marginHorizontal: 20,
                                                    paddingHorizontal: 20,
                                                    height: 45,
                                                    width: 340,
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 5,
                                                }}>
                                                    <View style={{ width: '90%' }}>
                                                        <Text style={{ color: COLORS.black }}>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        alignItems: 'flex-end',
                                                    }}>
                                                        {religion == index ? (
                                                            <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                                                                width: 20,
                                                                height: 20
                                                            }} />
                                                        ) : (<View></View>
                                                        )}
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginTop: 10 }}>Religion Type</Text>
                                        {detailReligion.map((item, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={0.8}
                                                onPress={() => onRelagionType(index)}
                                            >
                                                <View style={{
                                                    backgroundColor: religionType == index ? COLORS.main : COLORS.transparent,
                                                    flexDirection: 'row',
                                                    marginTop: 10,
                                                    alignItems: 'center',
                                                    marginHorizontal: 20,
                                                    paddingHorizontal: 20,
                                                    height: 45,
                                                    width: 340,
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 5,
                                                }}>
                                                    <View style={{ width: '90%' }}>
                                                        <Text style={{ color: COLORS.black }}>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        alignItems: 'flex-end',
                                                    }}>
                                                        {religionType == index ? (
                                                            <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                                                                width: 20,
                                                                height: 20
                                                            }} />
                                                        ) : (<View></View>
                                                        )}
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                        <View style={{
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                            flexDirection: 'row',
                                            marginTop: 10
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => setShowModal(false)}
                                                style={{
                                                    width: '90%',
                                                    borderWidth: 1,
                                                    borderColor: COLORS.black,
                                                    borderRadius: 10,
                                                    marginHorizontal: 5,
                                                    paddingVertical: 10,
                                                    alignItems: 'center',
                                                }}>
                                                <Text style={{
                                                    color: COLORS.black
                                                }}>
                                                    Back
                                                </Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        }

                        {actionTriggered == 'ACTION_3' &&
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 22,
                            }}>
                                <View style={{
                                    margin: 20,
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    padding: 35,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                    {Data3.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.8}
                                            onPress={() => onGender(index)}>
                                            <View style={{
                                                backgroundColor: gender == index ? COLORS.main : COLORS.transparent,
                                                flexDirection: 'row',
                                                marginTop: 10,
                                                alignItems: 'center',
                                                marginHorizontal: 20,
                                                paddingHorizontal: 20,
                                                height: 45,
                                                width: 340,
                                                backgroundColor: COLORS.light,
                                                borderRadius: 5,
                                            }}>
                                                <View style={{ width: '90%' }}>
                                                    <Text style={{ color: COLORS.black }}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    alignItems: 'flex-end',
                                                }}>
                                                    {gender == index ? (
                                                        <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                                                            width: 20,
                                                            height: 20
                                                        }} />
                                                    ) : (<View></View>
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                    <View style={{
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        flexDirection: 'row',
                                        marginTop: 10
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => setShowModal(false)}
                                            style={{
                                                width: '90%',
                                                borderWidth: 1,
                                                borderColor: COLORS.black,
                                                borderRadius: 10,
                                                marginHorizontal: 5,
                                                paddingVertical: 10,
                                                alignItems: 'center',
                                            }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>
                                                Back
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>}


                        {actionTriggered == 'ACTION_4' &&
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 22,
                            }}>
                                <View style={{
                                    margin: 20,
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    padding: 35,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                    {Data1.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.8}
                                            onPress={() => onRelagionTypeLooking(index)}>
                                            <View style={{
                                                backgroundColor: relationShipLooking == index ? COLORS.main : COLORS.transparent,
                                                flexDirection: 'row',
                                                marginTop: 10,
                                                alignItems: 'center',
                                                marginHorizontal: 20,
                                                paddingHorizontal: 20,
                                                height: 45,
                                                width: 340,
                                                backgroundColor: COLORS.light,
                                                borderRadius: 5,
                                            }}>
                                                <View style={{ width: '90%' }}>
                                                    <Text style={{ color: COLORS.black }}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    alignItems: 'flex-end',
                                                }}>
                                                    {relationShipLooking == index ? (
                                                        <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                                                            width: 20,
                                                            height: 20
                                                        }} />
                                                    ) : (<View></View>
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                    <View style={{
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        flexDirection: 'row',
                                        marginTop: 10
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => setShowModal(false)}
                                            style={{
                                                width: '90%',
                                                borderWidth: 1,
                                                borderColor: COLORS.black,
                                                borderRadius: 10,
                                                marginHorizontal: 5,
                                                paddingVertical: 10,
                                                alignItems: 'center',
                                            }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>
                                                Back
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>}




                    </Modal>
                </ScrollView>
            </View>
            <Loader modal={uploading} uploading={uploading} />
        </SafeAreaView>
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
    TextInput: {
        padding: 0,
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