import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const AdditonalPackages = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    height:'10%',
                    alignItems:'center',
                    backgroundColor:COLORS.main,
                    justifyContent:'center'
                }}>
                    <View>
                        <Text style={{
                            fontSize:20,
                            fontWeight:'bold',
                            color:COLORS.black
                        }}>Silver</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AdditonalPackages

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.white,
        height:'100%'
    }
})