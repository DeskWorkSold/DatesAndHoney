import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
// import { SvgUri } from 'react-native-svg';
import SVGImg from '../../assets/splashlogo.svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { selectUser } from '../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';


const SplashScreen = ({ navigation }) => {
    const regesterUser = useSelector(selectUser);
    const focus = useIsFocused()


    setTimeout(() => {
        handleNavigationBasedOnUser();
    }, 3000);


    const handleNavigationBasedOnUser = () => {
        // return
        // if (!regesterUser) {
        navigation.navigate('LoginScreen');
        // } else {
        // navigation.navigate('HomeScreen');
        // }/
    };

    return (
        <View style={styles.container}>
            <SVGImg width={137} height={97} />

            {/* <Image source={require('../../assets/gif/d&H5.gif')} resizeMode='contain' style={{
                    width:300,
                    height:200
                }} /> */}
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