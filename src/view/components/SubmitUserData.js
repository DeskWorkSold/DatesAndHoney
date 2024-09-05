import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/reducers/Reducers';

const SubmitUserData = async (data) => {
    console.log(data);
    // const [transferred, setTransferred] = useState(0);
    // const CurrentUser = auth().currentUser.uid;
    // const dispatch = useDispatch();


    // const uploadImage = async (uploadUri) => {
    //     if (uploadUri == null) {
    //         return null;
    //     }
    //     // const uploadUri = uploadUri;
    //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
    //     // Add timestamp to File Name
    //     const extension = filename.split('.').pop();
    //     const name = filename.split('.').slice(0, -1).join('.');
    //     filename = name + Date.now() + '.' + extension;
    
    //     // setUploading(true);
    //     // setTransferred(0);
    
    //     const storageRef = storage().ref(`Users/${filename}`);
    //     const task = storageRef.putFile(uploadUri);
    
    //     // Set transferred state
    //     task.on('state_changed', (taskSnapshot) => {
    //         const progress = Math.round(
    //             (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
    //         );
    //         setTransferred(progress);
    
    //     });
    
    //     try {
    //         await task;
    
    //         const url = await storageRef.getDownloadURL();
    //         // setUploading(false);
    //         // setImage(null);
    //         // Alert.alert(
    //         //   'Image uploaded!',
    //         //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
    //         // );
    //         return url;
    
    //     } catch (e) {
    //         console.log(e);
    //         return null;
    //     }
    
    // };
    
    // const uploadImage2 = async (uploadUri) => {
    //     if (uploadUri == null) {
    //         return null;
    //     }
    //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
    //     // Add timestamp to File Name
    //     const extension = filename.split('.').pop();
    //     const name = filename.split('.').slice(0, -1).join('.');
    //     filename = name + Date.now() + '.' + extension;
    
    //     // setUploading(true);
    //     // setTransferred(0);
    
    //     const storageRef = storage().ref(`Users/${filename}`);
    //     const task = storageRef.putFile(uploadUri);
    
    //     // Set transferred state
    //     task.on('state_changed', (taskSnapshot) => {
    //         const progress = Math.round(
    //             (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
    //         );
    //         setTransferred(progress);
    //     });
    
    //     try {
    //         await task;
    
    //         const url = await storageRef.getDownloadURL();
    //         // setUploading(false);
    //         // setImage(null);
    //         // Alert.alert(
    //         //   'Image uploaded!',
    //         //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
    //         // );
    //         return url;
    
    //     } catch (e) {
    //         console.log(e);
    //         return null;
    //     }
    
    // };
    // const uploadImage3 = async (uploadUri) => {
    //     if (uploadUri == null) {
    //         return null;
    //     }
    //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
    //     // Add timestamp to File Name
    //     const extension = filename.split('.').pop();
    //     const name = filename.split('.').slice(0, -1).join('.');
    //     filename = name + Date.now() + '.' + extension;
    
    //     // setUploading(true);
    //     // setTransferred(0);
    
    //     const storageRef = storage().ref(`Users/${filename}`);
    //     const task = storageRef.putFile(uploadUri);
    
    //     // Set transferred state
    //     task.on('state_changed', (taskSnapshot) => {
    //         const progress = Math.round(
    //             (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
    //         );
    //         setTransferred(progress);
    //     });
    
    //     try {
    //         await task;
    
    //         const url = await storageRef.getDownloadURL();
    //         // setUploading(false);
    //         // setImage(null);
    //         // Alert.alert(
    //         //   'Image uploaded!',
    //         //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
    //         // );
    //         return url;
    
    //     } catch (e) {
    //         console.log(e);
    //         return null;
    //     }
    
    // };
    // const uploadImage4 = async (uploadUri) => {
    //     if (uploadUri == null) {
    //         return null;
    //     }
    //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
    //     // Add timestamp to File Name
    //     const extension = filename.split('.').pop();
    //     const name = filename.split('.').slice(0, -1).join('.');
    //     filename = name + Date.now() + '.' + extension;
    
    //     // setUploading(true);
    //     // setTransferred(0);
    
    //     const storageRef = storage().ref(`Users/${filename}`);
    //     const task = storageRef.putFile(uploadUri);
    
    //     // Set transferred state
    //     task.on('state_changed', (taskSnapshot) => {
    //         const progress = Math.round(
    //             (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
    //         );
    //         setTransferred(progress);
    //     });
    
    //     try {
    //         await task;
    
    //         const url = await storageRef.getDownloadURL();
    //         // setUploading(false);
    //         // setImage(null);
    //         // Alert.alert(
    //         //   'Image uploaded!',
    //         //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
    //         // );
    //         return url;
    
    //     } catch (e) {
    //         console.log(e);
    //         return null;
    //     }
    
    // };
    // const uploadImage5 = async (uploadUri) => {
    //     if (uploadUri == null) {
    //         return null;
    //     }
    //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
    //     // Add timestamp to File Name
    //     const extension = filename.split('.').pop();
    //     const name = filename.split('.').slice(0, -1).join('.');
    //     filename = name + Date.now() + '.' + extension;
    
    //     // setUploading(true);
    //     // setTransferred(0);
    
    //     const storageRef = storage().ref(`Users/${filename}`);
    //     const task = storageRef.putFile(uploadUri);
    
    //     // Set transferred state
    //     task.on('state_changed', (taskSnapshot) => {
    //         const progress = Math.round(
    //             (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
    //         );
    //         setTransferred(progress);
    //     });
    
    //     try {
    //         await task;
    
    //         const url = await storageRef.getDownloadURL();
    //         // setUploading(false);
    //         // setImage(null);
    //         // Alert.alert(
    //         //   'Image uploaded!',
    //         //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
    //         // );
    //         return url;
    
    //     } catch (e) {
    //         console.log(e);
    //         return null;
    //     }
    
    // };

    // return
    // const update = data?.Drink
    // console.log(update);
    // return
    try {
        // setValue(true)
        // const imageUrl6 = await uploadImage();
        // const imageUrl = await uploadImage(data?.image1);
        // const imageUrl2 = await uploadImage2(data?.image2);
        // const imageUrl3 = await uploadImage3(data?.image3);
        // const imageUrl4 = await uploadImage4(data?.image4);
        // const imageUrl5 = await uploadImage5(data?.image5);
        var Data = new Object();
        Data.email = data?.email;
        Data.Category = 'User';
        Data.filterMaxAge = data?.filterMaxAge;
        Data.filterMinAge = data?.filterMinAge;
        Data.ConvertedReligion = null;
        Data.ConvertedReligionDetail = null;
        Data.languages = null;
        Data.PartnerMinHeightType = null;
        Data.PartnerMaxHeightType = null;
        Data.HairColor = null;
        Data.EyeColor = null;
        Data.Clingy = null;
        Data.Cuddling = null;
        Data.InLife = null;
        Data.InBed = null;
        Data.MovieType = null;
        Data.NextLongestRelationship = null;
        Data.LongestRelationship = null;
        Data.DealBreaker = null;
        Data.DealMakers = null;
        Data.PartnerBuildType = null;
        Data.BuildType = null;
        Data.PartnerMaxHeight = null;
        Data.PartnerMinHeight = null;
        Data.Hieght = null;
        Data.Education = null;
        Data.RelationshipType = null;
        Data.Relagion = null;
        Data.KosherType = null;
        Data.foodtype = null;
        Data.religionType = null;
        Data.ParentReligion = null;
        Data.Diet = null;
        Data.FavFood = null;
        Data.Exercise = null;
        Data.ExerciseStatus = null;
        Data.Name = data?.name;
        Data.InstaUsername = null;
        Data.Drink = data?.Drink;
        Data.Drugs = data?.Drugs;
        Data.Marijauna = data?.Marijauna;
        Data.Vape = data?.Vape;
        Data.Smoke = data?.Smoke;
        Data.Lookingfor = data?.Lookingfor;
        Data.Nature = null;
        Data.PartnerNature = null;
        Data.PoliticalPartnerView = null;
        Data.PoliticalView = data?.PoliticalView;
        Data.Experince = null;
        Data.InTenYear = null;
        Data.Bio = data?.Bio;
        Data.Kids = data?.Kids;
        Data.PartnerGender = data?.PartnerGender;
        Data.Gender = data?.Gender;
        Data.Dates = data?.DateOfBirth;
        Data.image5 = 'imageUrl5';
        Data.image4 = 'imageUrl4';
        Data.image3 = 'imageUrl3';
        Data.image2 = 'imageUrl2';
        Data.image1 = 'imageUrl';
        Data.CompanyType = null;
        Data.PositioninCompany = null;
        Data.CompanyName = null;
        Data.uid = CurrentUser;
        Data.selection1 = data?.selection1;
        // Data.PhoneNumber = userPhoneNumber ? userPhoneNumber : null;
        Data.Location = {
            latitude: 24.9028039,
            longitude: 67.1145385,
        }
        // Data.filterGender = 'Female'
        console.log('test data: ', Data);
        return;
        // console.log(CurrentUser);
        firestore()
            .collection('Users').doc(CurrentUser).set({
                userDetails: Data
            }).then(() => {
                // redux
                dispatch(login(Data))
                ToastAndroid.show('Welcome to Honey and Dates', ToastAndroid.SHORT)
                navigation.navigate('QuestionCongratulationScreen')
            })
        // setImage(null)
        setValue(false)
    } catch (error) {
        setValue(false)
        console.log('error test', error);
    }
}


export default SubmitUserData