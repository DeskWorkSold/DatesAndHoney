import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderTabOne from '../components/HeaderTabOne';
import COLORS from '../../consts/Colors';
import CustomeButton from '../../view/components/CustomeButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/reducers/Reducers';


const LikeScreen = ({ navigation }) => {
  
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <HeaderTabOne Lefticon={require('../../assets/menu.png')}
          logo={require('../../assets/logo2.png')} />


        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: 50
        }}>
          <View style={{ justifyContent: 'center', marginRight: -10 }}>
            <Image source={require('../../assets/like2.png')} resizeMode='contain'
              style={{
                width: 80,
                height: 80,
                borderRadius: 30,
              }} />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Image source={require('../../assets/like3.png')} resizeMode='contain'
              style={{
                width: 100,
                height: 100,
                borderRadius: 30,
              }} />
          </View>
          <View style={{ justifyContent: 'center', marginLeft: -10 }}>
            <Image source={require('../../assets/like1.png')} resizeMode='contain'
              style={{
                width: 80,
                height: 80,
                borderRadius: 30,
              }} />
          </View>

        </View>


        <View style={{
          alignItems: 'center',
          paddingTop: 30,
          paddingHorizontal: 40
        }}>
          <Text style={{
            color: COLORS.black,
            fontSize: 20,
            fontWeight: 'bold'
          }}>Hoping for more likes?</Text>
          <Text style={{
            textAlign: 'center'
          }}>Meet more women-and if you’re looking
            to boost your chances, try our premium features!</Text>
        </View>


        <View style={{
          alignItems: 'center',
          paddingTop: 80
        }}>
          <View style={{ paddingVertical: 5 }}>
            <CustomeButton title={'Get extra match'}
              onpress={() => navigation.navigate('LikeDetailScreen')}
            />
          </View>
          <View style={{ paddingVertical: 5 }}>
            <CustomeButton title={'Premium Options'} image={require('../../assets/Crown.png')}
              bcolor={COLORS.transparent} border={COLORS.main} />
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default LikeScreen

const styles = StyleSheet.create({})