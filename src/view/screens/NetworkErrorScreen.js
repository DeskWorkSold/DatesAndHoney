import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const NetworkErrorScreen = () => {
  return (
    <View style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColorL:COLORS.main
    }}>
      <Text style={{color:'red'}}>Network Connection Error!!</Text>
    </View>
  )
}

export default NetworkErrorScreen

const styles = StyleSheet.create({})