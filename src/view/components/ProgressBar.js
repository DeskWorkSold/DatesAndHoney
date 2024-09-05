import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const ProgressBar = ({progress}) => {
    // console.log(progress);
    return (
        <View style={{
            // marginHorizontal: 20,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            height: 2,
            backgroundColor: COLORS.light,
        }}>
            <View style={{
                width: `${progress}%`,
                height: 2,
                backgroundColor: COLORS.main,
            }}>
            </View>

        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({})