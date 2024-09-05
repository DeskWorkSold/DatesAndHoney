import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const CustomeButton = ({ border, width, title, image, imagew, imageh, color, bcolor, onpress, elevation, disable }) => {
    return (
        <View>
            {!image && (
                <TouchableOpacity onPress={onpress} activeOpacity={0.7} disabled={disable ? disable : false}>
                    <View style={{
                        backgroundColor: bcolor ? bcolor : COLORS.main,
                        width: width ? width : 350,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        elevation: elevation ? elevation : 0,
                        borderColor: border ? border : COLORS.transparent,
                    }}>
                        <Text style={{
                            color: color ? color : COLORS.black,
                        }}>{title}</Text>
                    </View>
                </TouchableOpacity>
            )}

            {image && (
                <TouchableOpacity onPress={onpress} activeOpacity={0.7}>
                    <View style={{
                        backgroundColor: bcolor ? bcolor : COLORS.main,
                        width: width ? width : 370,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: border ? COLORS.main : COLORS.transparent
                    }}>
                        <Image source={image} resizeMode="contain" style={{
                            width: imagew ? imagew : 25,
                            height: imageh ? imageh : 25,
                            marginRight: 4
                        }} />
                        <Text style={{
                            color: color ? color : COLORS.black
                        }}>{title}</Text>
                    </View>
                </TouchableOpacity>

            )}
        </View>
    )
}

export default CustomeButton

const styles = StyleSheet.create({})