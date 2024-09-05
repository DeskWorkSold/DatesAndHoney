import { ActivityIndicator, Dimensions, Modal, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SimpleHeader from '../../../components/SimpleHeader'
import COLORS from '../../../../consts/Colors'
import SVGVideo from '../../../../assets/Video.svg';
import Share from 'react-native-share';
import SVGImage from '../../../../assets/post.svg'
import firestore from '@react-native-firebase/firestore';
import { Image } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';
import { useState } from 'react';
import { useEffect } from 'react';
// import RNFetchBlob from 'react-native-fetch-blob'


const { width, height } = Dimensions.get("window");


const data = [
    {
        id: 1,
        image: <SVGVideo width={70} height={70} />,
        title: 'Stock Video',
        description: 'For social media such as YouTube, Instagram etc',
        type: 'video',
    },
    {
        id: 2,
        image: <SVGImage width={70} height={70} />,
        title: 'Stock Posts',
        description: 'For social media such as instagram, facebook etc',
        type: 'image',
    }
]


const StockImage = ({ navigation, route }) => {
    const { data } = route?.params;
    const [confirmDowload, setConfirmDownload] = useState(false)
    const [uploading, setUploading] = useState(false)
    console.log(data);

    const checkPermission = async (item, index) => {
        if (Platform.OS === 'ios') {
            downloadImage(item, index);
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'App needs access to your storage to download Photos',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Once user grant the permission start downloading
                    console.log('Storage Permission Granted.');
                    downloadImage(item, index);
                } else {
                    // If permission denied then show alert
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.warn(err);
            }
        }
    }

    const downloadImage = async (item, index) => {

        // console.log(data); 
        // return
        if (item) {
            let concate = { ...item, index: index, uploading: true }
            // console.log(concate);
            data[index] = concate
            // setUploading(true);
            let date = new Date();
            let image_URL = item?.Image;
            let ext = getExtention(image_URL);
            ext = '.' + ext[0];
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    // Related to the Android only
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        Math.floor(date.getTime() + date.getSeconds() / 2) +
                        '.jpg',
                    description: 'file download',
                },
            };
            // console.log(options);
            // return
            config(options)
                .fetch('GET', image_URL)
                .then(res => {
                    setConfirmDownload(true);
                    // setUploading(false);
                    let concateTwo = { ...item, uploading: false }
                    // console.log(concate);
                    data[index] = concateTwo
                    console.log('res =>', JSON.stringify(res));
                    // ToastAndroid.show('Image Downloaded Successfully!', ToastAndroid.SHORT)
                })
        }
    }
    const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
            /[^.]+$/.exec(filename) : undefined;
    };
    const onShare = async (item) => {
        console.log(item);
        // return
        const shareOptions = {
            url: item?.Image,
            title: `Title:  ${item?.Description}`,
            message: `Title: ${item?.Title}`,
        };
        try {
            const ShareResponce = await Share.open(shareOptions)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.log('Error2', err);
                });
        }
        catch (e) {
            console.log('Error', e);
        }
    }



    useEffect(() => {
        if (confirmDowload) {
            setTimeout(() => {
                setConfirmDownload(false)
            }, 3000);
        }
    }, [confirmDowload])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <SimpleHeader onpress={() => navigation.goBack()} center={'Stock Posts'} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        marginBottom: 100,
                        paddingHorizontal: 10
                    }}>
                        {data.length > 0 ?
                            <>
                                {data?.map((item, i) => (
                                    <View key={i}
                                        // onPress={() => onEventDeatilsScreen({ item })}
                                        // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                                        activeOpacity={0.7}
                                        style={{
                                            alignSelf: 'center',
                                            backgroundColor: COLORS.gray,
                                            elevation: 5,
                                            borderColor: COLORS.light,
                                            borderRadius: 10,
                                            // borderWidth: 1,
                                            // marginLeft: 20,
                                            marginRight: 5,
                                            marginBottom: 20,
                                            width: '95%',
                                            backgroundColor: COLORS.white
                                        }}>
                                        <View>
                                            <Image source={{ uri: item.Image }} resizeMode='cover'
                                                style={{
                                                    width: '100%',
                                                    height: 200,
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                }} />
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            padding: 10,
                                            // flex: 1
                                        }}>
                                            <View style={{
                                                // flex: 2
                                                width: '100%',
                                                // backgroundColor:COLORS.gray
                                            }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: COLORS.black,
                                                    marginRight: 10,
                                                }}>{item.Title}</Text>
                                                <Text style={{
                                                    fontSize: 13,
                                                    color: COLORS.gray,
                                                    marginRight: 10,
                                                    paddingVertical: 5,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: COLORS.gray2
                                                }}>{item.Description}</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 20,
                                            paddingBottom: 10,
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            {item?.uploading == true ?
                                                <View
                                                    style={{
                                                        width: '45%',
                                                        height: height / 22,
                                                        borderRadius: 5,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: COLORS.black
                                                    }}>
                                                    <ActivityIndicator color={COLORS.white} size={'small'} animating={item?.uploading} />
                                                </View>
                                                :
                                                <TouchableOpacity
                                                    onPress={() => checkPermission(item, i)}
                                                    style={{
                                                        width: '45%',
                                                        height: height / 22,
                                                        borderRadius: 5,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: COLORS.black
                                                    }}>
                                                    <Text style={{
                                                        color: COLORS.white,
                                                        fontSize: 13
                                                    }}>Download</Text>
                                                </TouchableOpacity>
                                            }
                                            <TouchableOpacity
                                                onPress={() => onShare(item)}
                                                style={{
                                                    width: '45%',
                                                    height: height / 22,
                                                    borderRadius: 5,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: COLORS.main
                                                }}>
                                                <Text style={{
                                                    color: COLORS.black,
                                                    fontSize: 13
                                                }}>Share</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                ))}
                            </>
                            :
                            <View style={{
                                padding: 20,
                                alignItems: 'center',
                            }}>
                                <Text>No strock content found</Text>
                            </View>
                        }
                    </View>
                </ScrollView>

            </View>



            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmDowload}
                onRequestClose={() => {
                    setConfirmDownload(!confirmDowload);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: COLORS.gray,
                    opacity: 0.9
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 25,
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
                        <Image source={require('../../../../assets/flakeremove.png')} resizeMode='contain' style={{
                            width: 90,
                            height: 90
                        }} />
                        <Text style={{
                            marginBottom: 10,
                            color: COLORS.black,
                            fontWeight: 'bold'
                            // textAlign: 'center',
                        }}>Image Dowloaded!</Text>
                        <Text style={{
                            marginBottom: 10,
                            textAlign: 'center'
                        }}>
                            Congratulations image hase been downloaded click to open image.
                        </Text>

                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default StockImage

const styles = StyleSheet.create({})