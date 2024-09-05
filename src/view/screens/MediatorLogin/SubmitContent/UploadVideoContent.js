import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator, ToastAndroid, PermissionsAndroid, Platform, Alert } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import COLORS from '../../../../consts/Colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
// import Pie from 'react-native-pie';
import CustomeButton from '../../../components/CustomeButton';
import SVGImg1 from '../../../../assets/arrowleft.svg';
import SVGVideo from '../../../../assets/Video.svg';
import SVGImage from '../../../../assets/ImageUpload.svg';

import { launchImageLibrary } from 'react-native-image-picker';

import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';

const { width, height } = Dimensions.get("window");

const data = [
    {
        id: 1,
        name: 'Upload Images',
    },
    {
        id: 2,
        name: 'Upload Videos',
    }
]

const UploadVideoContent = ({ navigation }) => {
    const [emailAddress, setEmailAddress] = useState(null);
    const [customeCode, setCustomeCode] = useState(null);
    const [title, setTitle] = useState(null);
    const [titleError, setTitleError] = useState(false);
    const [description, setDescription] = useState(null);
    const [descriptionError, setDescriptionError] = useState(false);
    const [thumbNail, setThumbNial] = useState(null);
    const [video, setVideo] = useState([]);
    const [TempVideo, setTempVideo] = useState(null);
    const [videoError, setVideoError] = useState(false);
    const [process, setProcess] = useState(false);
    const [uploading, setUploading] = useState({
        One: false,
        Two: false,
    });
    const mediator = useSelector(selectMediatorUser);
    // console.log(TempVideo);
    // const [downloadURL, setDownloadURL] = useState(null);

    async function pickVideo() {
        try {
            // setUploading(true)
            // setUploading({ ...uploading, Two: true })
            const result = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.video],
                copyTo: 'cachesDirectory'
            });
            console.log(result);
            setTempVideo(result);
            // return
            // Use result.uri to get the video file path
            // uploadVideo(result.uri);
        } catch (err) {
            console.log(err);
            setTempVideo(null)
        }
    }

    async function uploadVideo() {
        // console.log('asd');
        if (TempVideo) {
            try {
                // console.log(TempVideo.fileCopyUri.replace('file://' , ''));
                // console.log(TempVideo.name);
                // console.log(filePath.fileCopyUri.replace('file://' , ''));
                // return
                const storageRef = storage().ref(`/videos/${TempVideo?.name}`);
                const task = storageRef.putFile(
                    TempVideo.fileCopyUri.replace('file://', '')
                );

                // const fileUri = Platform.OS === 'ios' ? filePath.replace('file://', '') : filePath;
                // const response = await fetch(fileUri);
                // const blob = await response.blob();

                // const uploadTask = storageRef.put(blob);
                task.on(
                    'state_changed',
                    taskSnapshot => {
                        // Handle progress updates
                        setProcess(
                            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
                        )
                        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,);
                    }
                );
                await task;
                const url = await storageRef.getDownloadURL();
                // task.then(() => {
                //     ToastAndroid.show('Video uploaded succesfully!', ToastAndroid.SHORT)
                //     setProcess(null)
                //     // return url;
                // })
                return url;
            } catch (err) {
                console.log('==>', err);
            }
        }
        else {
            return null
        }
    }


    const checkPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'App needs read permission',
                        message: 'App needs read permission',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Permission granted');
                    return granted === PermissionsAndroid.RESULTS.GRANTED
                } else {
                    console.log('Permission denied');
                    // return granted === PermissionsAndroid.RESULTS.GRANTED
                }
            } catch (err) {
                console.warn(err);
                ToastAndroid.show('Media storage permission err!', ToastAndroid.SHORT)
            }
            return false;
        } else return true;
    };


    const uploadVideo2 = async (videoFile) => {
        // console.log(videoFile);
        // return
        // Generate a unique filename for the video
        const filename = Date.now() + '-' + videoFile.name;

        // Create a reference to the Firebase Storage location where the video will be stored
        const videoRef = storage.ref().child('videos/' + filename);

        // Upload the video to Firebase Storage
        const snapshot = await videoRef.put(videoFile);

        // Get the download URL for the uploaded video
        const downloadURL = await snapshot.ref.getDownloadURL();

        return downloadURL;
    };



    const pickVideo2 = async (type) => {
        let options = {
            title: 'Video Picker',
            mediaType: 'video',
            maxWidth: 300,
            marHeight: 550,
            quality: 1,
        };
        let isStoragePermitted = await checkPermission();
        if (isStoragePermitted) {
            // console.log(isStoragePermitted);
            // return
            try {
                await launchImageLibrary(options, (response) => {
                    console.log('Responce==> ', response);

                    if (response.didCancel) {
                        ToastAndroid.show('User cancelled camera picker!', ToastAndroid.SHORT)
                        return
                    }
                    else if (response.errorCode == 'camera_unavailable') {
                        ToastAndroid.show('Please enter post video description!', ToastAndroid.SHORT)
                        return;
                    }
                    else if (response.errorCode == 'permission') {
                        ToastAndroid.show('Permission not satisfied!', ToastAndroid.SHORT)
                        return;
                    }
                    else if (response.errorCode == 'others') {
                        ToastAndroid.show(response.errorCode, ToastAndroid.SHORT)
                        return;
                    }
                    // console.log('test',response);
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const PostContent = async () => {
        if (!title || title == '' || !description || description == '' || !TempVideo || TempVideo == '') {
            if (!TempVideo || TempVideo == '') {
                ToastAndroid.show('Please select video to post', ToastAndroid.SHORT)
                setVideoError(true)
            }
            else if (!title || title == '') {
                ToastAndroid.show('Please enter post video title!', ToastAndroid.SHORT)
                setTitleError(true)
            }
            else if (!description || description == '') {
                ToastAndroid.show('Please enter post video description!', ToastAndroid.SHORT)
                setDescriptionError(true)
            }
        }
        else {
            setUploading({ ...uploading, One: true })

            const id = Math.random().toString(16).slice(2);

            const videoUploaded = await uploadVideo(TempVideo);

            console.log('final===>', videoUploaded);

            firestore()
                .collection('PostContent').doc(id).set({
                    id: id,
                    Active: 0,
                    VideoUrl: videoUploaded,
                    Title: title,
                    Description: description,
                    Oweruid: mediator?.userDetails?.uid,
                    Type: 'Video',
                    timeStamp: firestore.FieldValue.serverTimestamp(),
                    PlayVideo:false
                }).then(() => {
                    setTempVideo(null);
                    setTitle(null);
                    setDescription(null);
                    setUploading({ ...uploading, One: false })
                    ToastAndroid.show('Video posted to DatesandHoney', ToastAndroid.SHORT)
                    // setUploading(false)
                    console.log('success');
                })
        }
    }

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




    // useEffect(() => {
    //     checkPermission();
    // },[])

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
                    <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>New Video</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
            <ScrollView>
                <TouchableOpacity
                    onPress={() => pickVideo('video')}
                    style={{
                        backgroundColor: COLORS.white,
                        width: width / 1.1,
                        height: height / 4.4,
                        alignSelf: 'center',
                        paddingVertical: 10,
                        // elevation: 3,
                        borderWidth: 1,
                        borderColor: videoError ? COLORS.pink : COLORS.gray2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginVertical: 20,
                    }}>
                    {TempVideo ?
                        <Image source={{ uri: TempVideo?.uri }} resizeMode='cover' style={{
                            width: '100%',
                            height: '100%',
                        }} />
                        // <ActivityIndicator size={'small'} color={COLORS.gray} animating={uploading.Two} />
                        :
                        <>
                            <SVGVideo width={60} height={60} />
                            <View style={{
                                paddingHorizontal: 50,
                                paddingTop: 10,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontSize: 16,
                                    textAlign: 'center'
                                }}>Upload Video
                                </Text>
                            </View>
                        </>
                    }
                </TouchableOpacity>

                {/* <>
                    {video &&
                        <Text>{video}</Text>
                    }
                </> */}

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
                        <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Description </Text>
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

                <View style={{
                    paddingHorizontal: 20,
                }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Selected Thumbnail </Text>
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
                            {TempVideo ?
                                <Image
                                    source={{ uri: TempVideo?.uri }}
                                    resizeMode='cover'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                                :
                                <>
                                    <SVGImage width={20} height={20} />
                                    <Text style={{
                                        color: COLORS.black,
                                    }}>Upload One</Text>
                                </>
                            }
                        </TouchableOpacity>
                    </View>
                </View>



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
                    {uploading.One ?
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
                            <ActivityIndicator size={'small'} color={COLORS.white} animating={uploading.One} />
                        </View>
                        :
                        <CustomeButton
                            onpress={() => PostContent()}
                            image={require('../../../../assets/right.png')}
                            title={'Upload Video'}
                            bcolor={COLORS.main}
                            width={width / 2}
                            imagew={20}
                            imageh={20}
                        />
                    }

                </View>



            </ScrollView>
            <Loader modal={uploading.One} uploading={uploading.One} />
        </View>
    )
}

export default UploadVideoContent


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