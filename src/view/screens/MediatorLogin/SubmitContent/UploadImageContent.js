import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, ToastAndroid, Alert } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import COLORS from '../../../../consts/Colors';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
import Pie from 'react-native-pie';
import CustomeButton from '../../../components/CustomeButton';
import SVGImg1 from '../../../../assets/arrowleft.svg';
import SVGImage2 from '../../../../assets/CameraImage.svg';
import SVGImage from '../../../../assets/ImageUpload.svg';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import YourClinets from '../../../components/YourClinets';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Loader from '../../../components/Loader';

const { width, height } = Dimensions.get("window");

// const data = [
//     {
//         id: 1,
//         name: 'Jan',
//         img: require('../../../../assets/profilepic.png'),
//         yourEarning: 380,
//         ClientEarning: 15,
//         type: 'Diamond'
//     },
//     {
//         id: 2,
//         name: 'Roy',
//         img: require('../../../../assets/profilepic.png'),
//         yourEarning: 380,
//         ClientEarning: 15,
//         type: 'Diamond'
//     },
//     {
//         id: 3,
//         name: 'Mendela',
//         img: require('../../../../assets/profilepic.png'),
//         yourEarning: 380,
//         ClientEarning: 390,
//         type: 'Gold'
//     },
//     {
//         id: 4,
//         name: 'Sam',
//         img: require('../../../../assets/profilepic.png'),
//         yourEarning: 380,
//         ClientEarning: 390,
//         type: 'Gold'
//     },
//     {
//         id: 5,
//         name: 'Arun',
//         img: require('../../../../assets/profilepic.png'),
//         yourEarning: 380,
//         ClientEarning: 390,
//         type: 'Gold'
//     }
// ]

const UploadImageContent = ({ navigation }) => {
    const [emailAddress, setEmailAddress] = useState(null);
    const [customeCode, setCustomeCode] = useState(null);
    const [maxNumber, setMaxNumber] = useState(100);
    const [image1, setImage1] = useState(null);
    const [title, setTitle] = useState(null);
    const [titleError, setTitleError] = useState(false);
    const [description, setDescription] = useState(null);
    const [descriptionError, setDescriptionError] = useState(false);
    const [imageUpload, setImageUpload] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const mediator = useSelector(selectMediatorUser);
    const [transferred, setTransferred] = useState(0);

    // console.log(mediator.userDetails);



    const PostContent = async () => {
        if (!title || title == '' || !description || description == '' || !image1 || image1 == '') {
            if (!image1 || image1 == '') {
                ToastAndroid.show('Please select image to post', ToastAndroid.SHORT)
                setImageError(true)
            }
            else if (!title || title == '') {
                ToastAndroid.show('Please enter post image title!', ToastAndroid.SHORT)
                setTitleError(true)
            }
            else if (!description || description == '') {
                ToastAndroid.show('Please enter post image description!', ToastAndroid.SHORT)
                setDescriptionError(true)
            }
        }
        else {
            const id = Math.random().toString(16).slice(2);
            setImageError(false)
            setUploading(true)
            const imageUrl = await uploadImage();
            // console.log("==>",id, imageUrl, title, description , mediator?.userDetails?.uid);
            // return
            firestore()
                .collection('PostContent').doc(id).set({
                    id: id,
                    Active: 0,
                    Image: imageUrl,
                    Title: title,
                    Description: description,
                    Oweruid: mediator?.userDetails?.uid,
                    Type: 'Image',
                    timeStamp: firestore.FieldValue.serverTimestamp(),
                })
                .then(() => {
                    setUploading(false)
                    setImage1(null)
                    setTitle(null)
                    setDescription(null)
                    ToastAndroid.show('New post Added!', ToastAndroid.SHORT)
                })
        }
    }

    const uploadImage = async () => {
        if (image1 == null) {
            return null;
        }
        const uploadUri = image1;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Content/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };


    const pickImage = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        setImage1(result.assets[0].uri);
        setImageError(false)
    };


    const handleTextChange = (text) => {
        const numberCount = text.length;
        // console.log(numberCount);
        // return
        if (numberCount <= 100) {
            setDescription(text);
            // if(numberCount < maxNumber){
            //     const max = maxNumber - numberCount;
            //     setMaxNumber(max);
            // }
        }
        else {
            Alert.alert('Error', 'Number count exceeds the limit.');
            // console.log(text.slice(0, -1));
        }
    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white,
            // marginBottom: 30,
        }}>
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 20,
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        flex: 1
                    }}>
                    <SVGImg1 width={20} height={20} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>New Image</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
            <ScrollView>
                <TouchableOpacity
                    onPress={() => pickImage()}
                    style={{
                        backgroundColor: COLORS.white,
                        width: width / 1.1,
                        height: height / 4.4,
                        alignSelf: 'center',
                        paddingVertical: 10,
                        // elevation: 3,
                        borderWidth: 1,
                        borderColor: imageError ? COLORS.pink : COLORS.gray2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginVertical: 20,
                    }}>
                    {imageUpload ?
                        <ActivityIndicator size={'small'} color={COLORS.gray} animating={videoUpload} />
                        :
                        <>
                            {image1 ?
                                <Image source={{ uri: image1 }} resizeMode='cover' style={{
                                    width: '100%',
                                    height: '100%',
                                }} />
                                :
                                <>
                                    <SVGImage2 width={60} height={60} />
                                    <View style={{
                                        paddingHorizontal: 50,
                                        paddingTop: 10,
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 16,
                                            textAlign: 'center'
                                        }}>Upload Image
                                        </Text>
                                    </View>
                                </>
                            }
                        </>
                    }
                </TouchableOpacity>

                <View style={{ alignItems: 'center' }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Title </Text>
                        <View style={styles.NumberInput}>
                            <TextInput
                                // aria-disabled={true}
                                error={titleError}
                                onFocus={() => setTitleError(false)}
                                underlineColor={COLORS.transparent}
                                activeUnderlineColor={COLORS.transparent}
                                value={title}
                                placeholder={'Enter your Title'}
                                placeholderTextColor={COLORS.gray2}
                                onChangeText={title => setTitle(title)
                                }
                                style={styles.TextInput}
                            />
                        </View>
                    </View>
                </View>


                <View style={{ alignItems: 'center' }}>
                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Description </Text>
                            <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Max ({maxNumber}) </Text>
                        </View>
                        <View style={{
                            width: width / 1.1,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: COLORS.gray2
                        }}>
                            <TextInput
                                error={descriptionError}
                                onFocus={() => setDescriptionError(false)}
                                underlineColor={COLORS.transparent}
                                activeUnderlineColor={COLORS.transparent}
                                // editable={aboutEdit}
                                multiline={true}
                                value={description}
                                placeholder={'Enter description'}
                                placeholderTextColor={COLORS.gray2}
                                onChangeText={description => handleTextChange(description)
                                }
                                style={{
                                    backgroundColor: COLORS.white,
                                    // height: 190,
                                    // width: '90%',
                                    textAlignVertical: 'top',
                                    paddingBottom: 90,
                                }}
                            />
                        </View>
                    </View>
                </View>

                {/* <View style={{
                    paddingHorizontal: 20,
                }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Select Thumbnail </Text>
                        <TouchableOpacity style={{
                            // width:width/2,
                            alignItems: 'flex-start',
                            backgroundColor: COLORS.light,
                            alignSelf: 'flex-start',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // paddingHorizontal:30,
                            // paddingVertical:10,
                            borderRadius: 10,
                            // height:40
                            width: width / 3,
                            height: height / 9
                        }}>
                            <SVGImage width={20} height={20} />
                            <Text style={{
                                color: COLORS.black,
                            }}>Upload One</Text>
                        </TouchableOpacity>
                    </View>
                </View>
 */}


                <View style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 90,
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                }}>
                    <View>
                        <CustomeButton
                            onpress={() => navigation.goBack()}
                            title={'Cancle'}
                            bcolor={COLORS.light}
                            width={width / 3}
                        />
                    </View>
                    {uploading ?
                        <View style={{
                            backgroundColor: COLORS.main,
                            width: width / 2,
                            height: 50,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: COLORS.transparent
                        }}>
                            <Text style={{
                                color: COLORS.black,
                            }}>Please wait..</Text>
                        </View>
                        :
                        <CustomeButton
                            onpress={() => PostContent()}
                            image={require('../../../../assets/right.png')}
                            title={'Upload Image'}
                            bcolor={COLORS.main}
                            width={width / 2}
                            imagew={20}
                            imageh={20}
                        />
                    }

                </View>
            </ScrollView>


            <Loader uploading={uploading} modal={uploading} />
        </View>
    )
}

export default UploadImageContent


const styles = StyleSheet.create({
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        // top:'60%',
        // backgroundColor:COLORS.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: 'red',
        fontSize: 12,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        height: 45,
        width: width / 1.1,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        // elevation: 5
        borderColor: COLORS.gray2,
        borderWidth: 1,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
})