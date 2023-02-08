import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const LikesCard = ({image, name, description , navigation}) => {
  return (
    <View style={{
        height: 200,
        // width: '100%',
        borderRadius: 10,
        backgroundColor: COLORS.white,
        elevation: 5
      }}>
        <View>
          <Image source={image} resizeMode='cover'
            style={{
              height: 150,
              width: '100%',
              borderRadius: 10,
            }} />
          <View style={{
            position: 'absolute',
            marginTop: 110,
            paddingHorizontal: 5
          }}>
            <Text style={{
              color: COLORS.white,
              fontWeight: 'bold'
            }}>{name}</Text>
          </View>
          <View style={{
            position: 'absolute',
            marginTop: 125,
            paddingHorizontal: 5
          }}>
            <Text style={{
              color: COLORS.white,
              fontSize: 12
            }}>{description}</Text>
          </View>
        </View>



        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 5,
          justifyContent:'center'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')} style={{
            padding: 5,
            marginHorizontal:10,
            borderRadius: 20,
            borderWidth: 1,
            elevation: 5,
            backgroundColor: COLORS.white,
            borderColor: COLORS.light,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image source={require('../../assets/message.png')} resizeMode='contain'
              style={{
                width: 20,
                height: 20,
              }} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            padding: 5,
            borderRadius: 20,
            borderWidth: 1,
            marginHorizontal:10,
            elevation: 5,
            backgroundColor: COLORS.white,
            borderColor: COLORS.light,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image source={require('../../assets/heart.png')} resizeMode='contain'
              style={{
                tintColor: 'red',
                width: 20,
                height: 20,
              }} />
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default LikesCard

const styles = StyleSheet.create({})