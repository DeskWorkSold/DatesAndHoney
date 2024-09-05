import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SimpleHeader from '../../../components/SimpleHeader'
import COLORS from '../../../../consts/Colors'
import SVGVideo from '../../../../assets/Video.svg'
import SVGImage from '../../../../assets/post.svg'
import { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react'

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


const StockContent = ({ navigation }) => {
    const [uploading, setUploading] = useState(false);
    const [imageContent, setImageContent] = useState(null);
    const [VideoContent, setVideoContent] = useState(null);
    const CurrentUser = auth().currentUser.uid;

    const OnStrockImages = (item) => {
        navigation.navigate('StockImage', { data: imageContent })
    }
    const OnStrockVideos = (item) => {
        navigation.navigate('StockVideo', { data: VideoContent })
    }




    const fetchContent = async () => {
        setUploading(true)
        await firestore()
            .collection('PostContent')
            .orderBy("timeStamp", "desc")
            .onSnapshot(querySnapshot => {
                const IContent = [];
                const VContent = [];
                querySnapshot.forEach((documentSnapshot) => {
                    const data = documentSnapshot.data();
                    // console.log(data);
                    if (data?.Oweruid == CurrentUser && data?.Active == 1 && data?.Type == 'Image') {
                        // console.log('Image===>',data);
                        let update = {
                            ...data,
                            uploading:false
                        }
                        IContent.push(update);
                    }
                    else if (data?.Oweruid == CurrentUser && data?.Active == 1 && data?.Type == 'Video') {
                        // console.log('Video===>',data);
                        let update = {
                            ...data,
                            uploading:false
                        }
                        VContent.push(update);
                    }
                })
                setImageContent(IContent);
                setVideoContent(VContent);
                setUploading(false)
            })
    }



    useEffect(() => {
        fetchContent();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <SimpleHeader onpress={() => navigation.goBack()} center={'Stock Content'} />

                {uploading ?
                    <View style={{
                        marginTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size={'small'} color={COLORS.main} animating={uploading} />
                    </View>
                    :
                    <>
                        {imageContent?.length > 0 || VideoContent?.length > 0 ?
                            <>
                                {VideoContent?.length > 0 &&
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => OnStrockVideos(VideoContent)}
                                        style={{
                                            backgroundColor: COLORS.white,
                                            width: width / 1.1,
                                            paddingVertical: 20,
                                            elevation: 3,
                                            flexDirection: 'row',
                                            // justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            borderRadius: 10,
                                            paddingHorizontal: 20,
                                            marginBottom: 10,
                                        }}>
                                        <TouchableOpacity
                                            style={{
                                                width: '25%',
                                                // backgroundColor:COLORS.black
                                            }}
                                        //   onPress={() => navigation.navigate('SubmitStack')}
                                        >
                                            <SVGVideo width={70} height={70} />
                                        </TouchableOpacity>
                                        <View style={{
                                            width: '75%',
                                            paddingLeft: 5
                                            // backgroundColor:COLORS.light,
                                            // paddingHorizontal: 10,
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.black
                                            }}>
                                                Stock Video
                                            </Text>
                                            <Text style={{
                                                color: COLORS.gray,
                                                fontSize: 12,
                                                lineHeight: 17,
                                                // textAlign: 'center'
                                            }}>
                                                For social media such as YouTube, Instagram etc
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                                {imageContent?.length > 0 &&
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => OnStrockImages(imageContent)}
                                        style={{
                                            backgroundColor: COLORS.white,
                                            width: width / 1.1,
                                            paddingVertical: 20,
                                            elevation: 3,
                                            flexDirection: 'row',
                                            // justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            borderRadius: 10,
                                            paddingHorizontal: 20,
                                            marginBottom: 10,
                                        }}>
                                        <TouchableOpacity
                                            style={{
                                                width: '25%',
                                                // backgroundColor:COLORS.black
                                            }}
                                        //   onPress={() => navigation.navigate('SubmitStack')}
                                        >
                                            <SVGImage width={70} height={70} />
                                        </TouchableOpacity>
                                        <View style={{
                                            width: '75%',
                                            // backgroundColor:COLORS.light,
                                            // paddingHorizontal: 10,
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.black
                                            }}>
                                                Stock Posts
                                            </Text>
                                            <Text style={{
                                                color: COLORS.gray,
                                                fontSize: 12,
                                                lineHeight: 17,
                                                // textAlign: 'center'
                                            }}>
                                                For social media such as instagram, facebook etc
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </>
                            :
                            <View>
                                <Text style={{
                                    fontSize: 12,
                                    color: COLORS.gray,
                                    paddingVertical: 20,
                                }}>None of the images and videos have been uploaded!</Text>
                            </View>
                        }
                    </>
                }

                {/* {data.length > 0 ?
                    <>
                        {data.map((j, i) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => OnStrockContent(j)}
                                key={i}
                                style={{
                                    backgroundColor: COLORS.white,
                                    width: width / 1.1,
                                    paddingVertical: 20,
                                    elevation: 3,
                                    flexDirection: 'row',
                                    // justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    borderRadius: 10,
                                    paddingHorizontal: 20,
                                    marginBottom: 10,
                                }}>
                                <TouchableOpacity
                                    style={{
                                        width: '25%',
                                        // backgroundColor:COLORS.black
                                    }}
                                //   onPress={() => navigation.navigate('SubmitStack')}
                                >
                                    {j?.image}
                                </TouchableOpacity>
                                <View style={{
                                    width: '75%',
                                    // backgroundColor:COLORS.light,
                                    // paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.black
                                    }}>
                                        {j?.title}
                                    </Text>
                                    <Text style={{
                                        color: COLORS.gray,
                                        fontSize: 12,
                                        lineHeight: 17,
                                        // textAlign: 'center'
                                    }}>
                                        {j?.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </>
                    :
                    <View style={{
                        padding: 20,
                        alignItems: 'center',
                    }}>
                        <Text>No strock content found</Text>
                    </View>
                } */}


            </View>
        </SafeAreaView>
    )
}

export default StockContent

const styles = StyleSheet.create({})