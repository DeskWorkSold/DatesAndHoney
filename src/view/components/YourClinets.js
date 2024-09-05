import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SVGImg2 from '../../assets/diamond.svg';
import Gold from '../../assets/gold.svg';
import COLORS from '../../consts/Colors';

const { width, height } = Dimensions.get("window");


const YourClinets = ({ navigation, key, item }) => {
    return (
        <View
            key={key}
            style={{
                paddingVertical: 20,
                backgroundColor: COLORS.white,
                width: width,
                marginBottom: 5,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
            }}>
            <View style={{
                borderWidth: 2,
                borderRadius: 50,
                borderColor: COLORS.main,
                alignItems: 'center',
            }}>
                <Image source={item.img} resizeMode='cover' style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                }} />
            </View>
            <View style={{
                width: '60%',
                paddingHorizontal: 10,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // width: '50%'
                    justifyContent: 'space-between'
                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '50%',
                        paddingBottom: 5
                        // backgroundColor: COLORS.gray2
                    }}>
                        <View style={{
                            paddingRight: 5
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: '500',
                                color: COLORS.black
                            }}>{item.name}</Text>
                        </View>
                        <View style={{ paddingRight: 5 }}>
                            <SVGImg2 width={20} height={20} />
                        </View>
                        <View style={{
                            // paddingLeft: 5
                        }}>
                            <Text style={{ fontSize: 12, color: COLORS.black }}>{item.type}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    // onPress={() => DeclineClientReq(item)}
                    style={{
                        // width: '95%',
                        // paddingHorizontal: 40,
                        paddingVertical: 5,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: COLORS.gray,
                        backgroundColor: COLORS.transparent,
                    }}>
                    <Text style={{
                        color: COLORS.gray,
                        fontSize: 12,
                        textAlign: 'center'
                    }}>
                        Total Earnings : <Text style={{ color: COLORS.green }}>${item.ClientEarning}</Text>
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{
                width: '20%',
                // backgroundColor: COLORS.main,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 12,
                    color: COLORS.black
                }}>You will earn</Text>
                <Text style={{
                    color: COLORS.main,
                    fontWeight: 'bold'
                }}>
                    ${item.yourEarning} </Text>
            </View>

        </View>
    )
}

export default YourClinets

const styles = StyleSheet.create({})