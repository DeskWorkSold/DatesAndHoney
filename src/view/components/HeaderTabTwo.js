import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import SVGmenu from '../../assets/menu3.svg'
import SVGHeart from '../../assets/Heart.svg'

const HeaderTabTwo = ({ Lefticon, logo, onpress, navigation }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      height: 70,
      paddingHorizontal: 20,
    }}>
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <SVGmenu width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2, alignItems: 'center' }}>
        <SVGHeart width={30} height={30} />
      </View>

      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={onpress}>
          <Image source={require('../../assets/editprofile.png')} resizeMode='contain'
            style={{
              height: 20
            }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HeaderTabTwo