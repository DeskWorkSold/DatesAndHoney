import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const SplashScreen = ({navigation}) => {
    setTimeout(() => {
        navigation.navigate('LoginScreen');
        console.log('LoginScreen');
      }, 3000);
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/splashlogo.png')} style={{
                resizeMode: 'contain',
            }} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    }
})