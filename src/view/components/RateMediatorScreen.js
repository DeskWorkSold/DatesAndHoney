import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import CustomeButton from './CustomeButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import COLORS from '../../consts/Colors'
const { height, width } = Dimensions.get('window')
const RateMediatorScreen = ({ data,
    setShowFilter,
    setShowFilterType,
    defaultRating,
    maxRating,
    datingCoachRating,
    newRating,
    comments,
    setComments,
    loading,
    setNewRating,
    onpress }) => {
    // console.log(onpress);

    const CustomRatingBar = (size, type) => {
        // console.log(size);
        return (
            <View style={{
                justifyContent: size?.size ? 'flex-start' : 'center',
                flexDirection: 'row',
                marginTop: size?.size ? 0 : 30,
            }}>
                {maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => size.type ? setNewRating(item) : null}>
                            {size.type ?
                                <>
                                    {item <= newRating
                                        ? <AntDesign name='star' color={COLORS.main} size={size?.size ? size?.size : 40} />
                                        : <AntDesign name='staro' color={COLORS.main} size={size?.size ? size?.size : 40} />}
                                </>
                                :
                                <>
                                    {item <= defaultRating
                                        ? <AntDesign name='star' color={COLORS.main} size={size?.size ? size?.size : 40} />
                                        : <AntDesign name='staro' color={COLORS.main} size={size?.size ? size?.size : 40} />}
                                </>
                            }
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <View style={{
            flex: 1,
            // backgroundColor:COLORS.green,
            justifyContent: 'center',
            marginBottom: 100
        }}>
            <View style={{
                flexDirection: 'row',
                height: 60,
                paddingHorizontal: 20,
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => { setShowFilter(false), setShowFilterType(null) }}
                    style={{
                        flex: 1,
                    }}>
                    <AntDesign size={20} name='arrowleft' color={COLORS.black} />
                </TouchableOpacity>
                <View style={{ flex: 2 }} />
                <View style={{ flex: 1 }} />
            </View>
            <View>
                <Image source={require('../../assets/rating.png')} resizeMode='contain' style={{
                    height: height / 4,
                    alignSelf: 'center',
                }} />
                <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 'bold', color: COLORS.black, textAlign: "center" }}>Review your Concierge</Text>
                <Text style={{ fontSize: 10, color: COLORS.gray, textAlign: "center" }}>(This is private)</Text>
                {data ?
                    <View
                        style={{
                            backgroundColor: COLORS.light,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            justifyContent: 'space-between',
                            marginVertical: 10,
                        }}>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity
                            // onPress={() => navigation.navigate('ConciregeProfile', {
                            //     data: item
                            // })}
                            >
                                <Image source={{ uri: data?.image1 }} resizeMode='contain' style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 50,
                                    borderWidth: 3,
                                    borderColor: COLORS.main
                                }} />
                            </TouchableOpacity>
                            <View style={{
                                paddingLeft: 10,
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: COLORS.black,
                                    paddingBottom: 5,
                                }}>{data?.Name}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ fontSize: 10, color: COLORS.black }}>{defaultRating} / {Math.max.apply(null, maxRating)}</Text>
                                    <CustomRatingBar size={15} />
                                </View>
                                <Text style={{
                                    fontSize: 10,
                                    color: COLORS.black,
                                }}>({datingCoachRating ? datingCoachRating : 0} reviews)</Text>
                            </View>
                        </View>

                    </View>
                    :
                    <View>
                        <Text>Dating coach cannot found!</Text>
                    </View>
                }
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10
            }}>
                <CustomRatingBar size={25} type='Get' />
                <Text style={{ color: COLORS.black, fontSize: 14 }}>({newRating}/{Math.max.apply(null, maxRating)})</Text>
            </View>

            <View style={{
                paddingHorizontal: 20,
            }}>
                <Text style={{ color: COLORS.black, fontSize: 12, }}>Your Comments</Text>
                <TextInput
                    value={comments}
                    onChangeText={(text) => setComments(text)}
                    placeholder={'Type Here...'}
                    placeholderTextColor={COLORS.gray}
                    selectionColor={COLORS.black}
                    underlineColor={COLORS.white}
                    activeUnderlineColor={COLORS.white}
                    style={{
                        padding: 0,
                        backgroundColor: COLORS.white,
                        // width:'100%',
                        elevation: 2,
                        padding: 10,
                        fontSize: 12,
                        borderRadius: 10,
                        textAlignVertical: 'top',
                        marginBottom: 10
                    }}
                    multiline
                    numberOfLines={8}
                    editable={true}
                />
            </View>
            <View style={{
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 50,
            }}>
                <CustomeButton title={'Submit'} width={width / 1.2} onpress={loading ? null : onpress} />
            </View>
        </View>
    )
}

export default RateMediatorScreen

const styles = StyleSheet.create({})