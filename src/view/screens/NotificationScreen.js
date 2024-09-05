import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';



const NotificationScreen = ({ navigation }) => {
  const [name, setname] = useState();

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>

        <View style={{
            paddingTop: 40
          }}>
            <Image source={require('../../assets/notification.png')} 
            resizeMode='contain' />
          </View>


          <View style={{
            paddingTop: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Allow notifications</Text>
          </View>


          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Get notifications you may have missed.</Text>
          </View>


        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
          }}>
            <CustomeButton onpress={() => navigation.navigate('QuestionGenderScreen')}
              title={'Continue'} />
          </View>

          <View style={{
            paddingTop: 5,
          }}>
            <CustomeButton bcolor={COLORS.transparent} onpress={() => navigation.navigate(goBack)}
              title={'Skip'} style={{borderBottomWidth:1}} />
          </View>
        </View>

        
      </View>



    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  contentContainer:{
    height:'70%',
    alignItems:'center',
  },
  footer: {
    height:'30%'
  },
  NumberInput: {
    marginTop: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    color: COLORS.gray,
    height: 40,
    width: 300,
    justifyContent: "center"
  },
})