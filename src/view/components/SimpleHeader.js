import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import { Image } from 'react-native'
import SVGImage from '../../assets/arrowleft.svg'

const SimpleHeader = ({ left, right, center , onpress }) => {
    return (
        <View style={{
            paddingHorizontal:20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            height: 70,
        }}>
            <TouchableOpacity 
            onPress={onpress}
            style={{flex:1}}>
                <SVGImage width={20} height={20} />
            </TouchableOpacity>
            <View style={{flex:2 , alignItems:'center'}}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'bold',
                    color:COLORS.black
                }}>{center ? center : 'Null'}</Text>
            </View>
            <View style={{flex:1}} />
        </View>
    )
}

export default SimpleHeader

const styles = StyleSheet.create({})