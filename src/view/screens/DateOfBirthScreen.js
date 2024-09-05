import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, TouchableNativeFeedback, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
// import Calendar from 'react-native-calendars/src/calendar';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect } from 'react';
import SVGImg1 from '../../assets/arrowleft.svg';
import moment from 'moment';
const { width, height } = Dimensions.get("window");


const DateOfBirthScreen = ({ navigation, route }) => {
  const { name, secName } = route.params;
  // console.log(image5);
  const [date, setdate] = useState(null);
  const [datePicker, setDatePicker] = useState(false);
  const [arr, setArr] = useState([]);
  const [customDate, setCustomDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  // const cartItems = useSelector((state) => state.reducers.selectedItems.items)
  // console.log(customDate, !date);

  const onGenderPress = () => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    // console.log(date.dateString);
    const years = new Date().getFullYear() - new Date(customDate).getFullYear();
    // console.log('==>',years);
    // return
    if (!date || years < 18 ) {
      if (!date) {
        ToastAndroid.show("Please select your Birth Date!", ToastAndroid.SHORT);
      }
      else if (years < 18) {
        ToastAndroid.show("Your age you must have to be 18+!", ToastAndroid.SHORT);
      }
    }
    else {
      // console.log(customDate);
      // return
      navigation.navigate('QuestionGenderScreen', { DateOfBirth: date, name: name, secName: secName })
    }
  }


  useEffect(() => {
    for (let i = dayjs().year(); i > dayjs().year() - 100; i--) {
      setArr((prev) => [...prev, i]);
    }
  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  const showDatePicker = () => {
    console.log('test');
    setDatePicker(true);
  };
  const hideDatePicker = () => {
    setDatePicker(false);
  };
  const handleConfirmDate = date => {
    const date2 = moment(date).format('yy/MM/DD')
    // console.log(date2);
    // return
    // console.warn('A date has been picked: ', date);
    setdate(date2);
    setCustomDate(date)
    hideDatePicker();
  };

  const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(0);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.contentContainer}>

          <View style={{
            alignItems: 'center',
            // padding: 10,pad
            paddingHorizontal: 20,
            flexDirection: 'row',
            // justifyContent: 'center',
            height: 60,
          }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{
              flex: 1,
              // backgroundColor: COLORS.gray2
            }}>
              <SVGImg1 width={20} height={20} />
            </TouchableOpacity>
            <View style={{
              flex: 2,
              // backgroundColor: COLORS.gray,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 20
            }}>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: COLORS.gray2
            }}>
            </View>
          </View>


          <View style={{
            alignSelf: 'center'
          }}>
            <View style={{
              paddingTop: 0,
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/dateofbirth.png')} resizeMode='contain' style={{
                height: height / 8
              }} />
            </View>


            <View style={{
              paddingTop: 10,
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black
              }}>When were you born?</Text>
            </View>


            <View style={{
              paddingTop: 5,
              alignItems: 'center'
            }}>
              <Text style={{
                color: COLORS.black,
                fontSize: 12,
              }}>Enter the Birthday</Text>
            </View>
          </View>
          <View style={styles.NumberInput}>
            <TouchableOpacity onPress={showDatePicker} style={styles.TextInput}>
              <Text style={{ fontSize: 12, color: COLORS.black }}>
                {customDate ? formatDate(new Date(customDate)) : 'Select Date'}
              </Text>
            </TouchableOpacity>
            {/* <TextInput
              style={styles.TextInput}
              placeholder={'DD/MM/YYYY'}
              value={date}
              placeholderTextColor={COLORS.gray}
              onChangeText={setdate}
              selectionColor={COLORS.black}
              underlineColor={COLORS.white}
              activeUnderlineColor={COLORS.white}
              editable={true}
              onPressIn={showDatePicker}
            /> */}
          </View>
        </View>



        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
            alignItems: 'center',
          }}>
            <CustomeButton width={width / 1.1} onpress={() => onGenderPress()}
              title={'Continue'} />
          </View>

          <View style={{
            paddingTop: 10,
            marginBottom: 30,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>


      <DateTimePickerModal
        isVisible={datePicker}
        mode="date"
        display='spinner'
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

    </SafeAreaView>
  )
}

export default DateOfBirthScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // width: '100%',
    // height: '100%'
  },
  contentContainer: {
    height: '50%',
    alignItems: 'center',
    // backgroundColor: COLORS.gray
  },
  footer: {
    // marginTop: 20,
    height: '50%',
    justifyContent: 'flex-end'

  },
  NumberInput: {
    alignItems: 'center',
    width: '100%',
    height: '58%',
    marginVertical: 20,
    // backgroundColor:COLORS.main
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    height: 50,
    width: width / 1.1,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center"
  },
})