import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const CustomeButton = ({ border, width, title, image, color , bcolor, onpress}) => {
    return (
        <View>
            {!image && (
                <TouchableOpacity onPress={onpress} activeOpacity={0.7}>
                    <View style={{
                        backgroundColor: bcolor ? bcolor : COLORS.main,
                        width: width ? width : 350,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth:1,
                        borderColor: border ? border : COLORS.transparent
                    }}>
                        <Text style={{
                            color: color? color : COLORS.black,
                        }}>{title}</Text>
                    </View>
                </TouchableOpacity>
            )}

            {image && (
                <TouchableOpacity onPress={onpress} activeOpacity={0.7}>
                    <View style={{
                        backgroundColor: bcolor ? bcolor : COLORS.main,
                        width: 329,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'row',
                        borderWidth:1,
                        borderColor: border ? COLORS.main : COLORS.transparent
                    }}>
                        <Image source={image} resizeMode="contain" style={{
                            width:25,
                            height:25,
                            marginRight:4
                        }} />
                        <Text style={{
                            color: color? color : COLORS.black
                        }}>{title}</Text>
                    </View>
                </TouchableOpacity>

            )}
        </View>
    )
}

export default CustomeButton

const styles = StyleSheet.create({})