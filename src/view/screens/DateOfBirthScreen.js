import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
// import Calendar from 'react-native-calendars/src/calendar';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';



const DateOfBirthScreen = ({ navigation, route }) => {
  const { name , image1, image2, image3, image4, image5 } = route.params;
  // console.log(image5);
  const [date, setdate] = useState();
  // const cartItems = useSelector((state) => state.reducers.selectedItems.items)
  // console.log(cartItems);

  const onGenderPress = () => {
    // console.log(dateString);
    if (!date) {
        ToastAndroid.show("Please select your Birth Date!", ToastAndroid.SHORT);
    }
    else{
      navigation.navigate('QuestionGenderScreen', { Date: date.dateString , name:name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5,  })
    }
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={{
            paddingTop: 40
          }}>
            <Image source={require('../../assets/dateofbirth.png')} resizeMode='contain' />
          </View>


          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>When were you born?</Text>
          </View>


          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Enter the full name</Text>
          </View>

          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>
              Birthday
            </Text>
          </View>


          <View style={styles.NumberInput}>
            <Calendar style={{
              width: 300,
              backgroundColor: COLORS.transparent,
            }}
              onDayPress={data => setdate(data)}
              onMonthChange={() => { }}
              markedDates={{
                '2022-12-10': { marked: true, dotColor: COLORS.gray, selected: true, selectedColor: COLORS.main, selectedTextColor: COLORS.white }
              }} />
          </View>


        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
          }}>
            <CustomeButton onpress={() => onGenderPress()}
              title={'Continue'} />
          </View>

          <View style={{
            paddingTop: 20,
            width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>



    </SafeAreaView>
  )
}

export default DateOfBirthScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%'
  },
  NumberInput: {
    alignItems: 'center',
    width: 300,
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