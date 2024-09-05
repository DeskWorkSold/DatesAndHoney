import { Image, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/reducers/Reducers'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window')

const CongratsMatchScreen = ({ navigation, route }) => {
  const { Data } = route?.params;
  // const  Data  = 'test';

  const userName = Data?.Name ? Data?.Name : 'Test user';
  const userImg = Data?.image1;

  const dateParts = Data.Dates.split('/');
  const dob = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);
  const userYear = new Date().getFullYear() - dob.getFullYear();

  // const userYear = Data?.years;
  // const uid = Data?.uid ? Data?.uid : '832714jkdnc9821';
  const user = useSelector(selectUser)
  const fallingPosition = useRef(new Animated.Value(0)).current;
  // const [showGif, setShowGif] = useState(true);
  console.log('===>', Data);

  // useEffect(() => {
  //   const startAnimation = () => {
  //     // Start the animation by animating the translateY property of the fallingPosition
  //     Animated.timing(fallingPosition, {
  //       toValue: 1, // Set the end value to 1 (or any other value based on your preference)
  //       duration: 1000, // Set the duration of the animation (adjust as needed)
  //       easing: Easing.linear,
  //       useNativeDriver: true, // Make sure to set useNativeDriver to true
  //     }).start(onAnimationFinish); // Call onAnimationFinish when the animation completes
  //   };

  // const onAnimationFinish = () => {
  //   // Hide the GIF by setting translateY to its original value (0)
  //   Animated.timing(fallingPosition, {
  //     toValue: 0,
  //     duration: 0, // Set duration to 0 to avoid additional animation
  //     useNativeDriver: true,
  //   }).start();
  // };

  // Start the animation when the component mounts
  //   startAnimation();
  // }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
        }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flex: 1,
              alignItems: 'center'
            }}>
            <Entypo name='cross' size={20} color={COLORS.black} />
          </TouchableOpacity>
          <View style={{
            flex: 2
          }} />
          <View style={{
            flex: 2
          }} />
        </View>
        <View style={{
          paddingTop: 0
        }}>
          <Image source={require('../../assets/congratsLike.png')} resizeMode='contain' style={{
            height: height / 7
          }} />
        </View>

        <View style={{
          padding: 20
        }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: COLORS.black,
            textAlign: 'center',
          }}>Congratulations</Text>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: COLORS.black
          }}>It's a <Text style={{ backgroundColor: COLORS.main, paddingHorizontal: 5 }}>match!</Text></Text>
        </View>


        <View style={{ flexDirection: 'row' }}>
          <View style={{
            marginHorizontal: 5,
            marginVertical: 5,
            borderWidth: 6,
            borderColor: COLORS.white,
            borderRadius: 60,
          }}>
            <Image source={{ uri: user.image1 }} resizeMode='cover'
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
              }} />
          </View>
          <View style={{
            marginHorizontal: 5,
            marginVertical: 5,
            borderWidth: 6,
            borderColor: COLORS.white,
            borderRadius: 60,
          }}>
            {userImg &&
              <Image source={{ uri: userImg }} resizeMode='cover'
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                }} />
            }
          </View>
        </View>

        <View style={{
          justifyContent: 'center',
          paddingTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.black }}>
            {userName} </Text>
          <Text style={{
            // fontWeight: '400',
            fontSize: 14,
            color: COLORS.gray
          }}>, {userYear ? userYear : '00'}</Text>
        </View>

        <View style={{
          justifyContent: 'center',
          paddingTop: 10,
          paddingHorizontal: 70
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 12,
            color: COLORS.gray
          }}>
            Let’s ask her about something
            interested, or you can just say “Hi”
            for initial e-meet.
          </Text>
        </View>

        <View style={{
          paddingTop: 30
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatingScreen', {
              data: Data
            })}
          >
            <View style={{
              backgroundColor: COLORS.main,
              width: width / 1.2,
              height: 50,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontWeight: 'bold', color: COLORS.black, fontSize: 14 }}>Say "Hi"</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Animated.Image
          source={require('../../assets/test.gif')}
          style={[
            styles.fallingGif,
            { transform: [{ translateY: fallingPosition }] }
          ]}
        />

      </View>
    </SafeAreaView>
  )
}

export default CongratsMatchScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
    // alignItems: 'center'
  },
  fallingGif: {
    position: 'absolute',
    width: width / 2,
    height: height / 2,
  },
})