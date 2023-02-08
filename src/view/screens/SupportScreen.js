import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const SupportScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          height: 80
        }}>
          <View style={{ width: '20%' }}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image source={require('../../assets/menu.png')} resizeMode='contain'
                style={{
                  height: 45,
                  color: COLORS.black
                }} />
            </TouchableOpacity>
          </View>

          <View style={{ width: '60%', alignItems: 'center', }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Customer Support</Text>
          </View>

          <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SupportScreen

const styles = StyleSheet.create({})