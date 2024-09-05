import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, TouchableNativeFeedback, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
// import Calendar from 'react-native-calendars/src/calendar';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import SVGImg1 from '../../assets/arrowleft.svg';
const { width, height } = Dimensions.get("window");


const DateOfBirthScreen = ({ navigation, route }) => {
  const { name, image1, image2, image3, image4, image5 } = route.params;
  // console.log(image5);
  const [date, setdate] = useState(dayjs());
  const [arr, setArr] = useState([]);
  const [customDate, setCustomDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  // const cartItems = useSelector((state) => state.reducers.selectedItems.items)
  // console.log(cartItems);

  const onGenderPress = () => {
    // console.log(date.dateString);
    const years = new Date().getFullYear() - new Date(customDate).getFullYear();
    // console.log('==>',customDate);
    // return
    if (!customDate || years < 18) {
      if (!customDate) {
        ToastAndroid.show("Please select your Birth Date!", ToastAndroid.SHORT);
      }
      else if (years < 18) {
        ToastAndroid.show("Your age you must have to be 18+!", ToastAndroid.SHORT);
      }
    }
    else {
      // console.log(customDate);
      // return
      navigation.navigate('QuestionGenderScreen', { DateOfBirth: customDate, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, })
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>

            <View style={{
              alignItems: 'center',
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <View style={{
                flex: 1,
                // backgroundColor: COLORS.gray2
              }}>
                <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
              </View>
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
              // height: '32%',
              // backgroundColor: COLORS.main,
              alignSelf: 'center'
            }}>
              <View style={{
                paddingTop: 0,
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/dateofbirth.png')} resizeMode='contain' style={{
                  width: width - 240,
                  // height:'70%'
                }} />
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
              <Calendar
                // calendarHeight={150}
                style={{
                  // height: 250,
                  width: width / 1.3,
                  backgroundColor: COLORS.transparent,
                }}
                renderHeader={(year) => (
                  <TouchableNativeFeedback onPress={() => setIsModalVisible(true)}>
                    <View style={{
                      alignItems: 'center'
                    }}>
                      {/* <Text style={{ color: COLORS.black }}>Birthday</Text> */}
                      <Text style={{
                        color: COLORS.main,
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                        {monthNames[date?.month()]} {date?.year()}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                )}
                onPressArrowLeft={() => setdate((prev) => dayjs(prev.format('YYYY-MM-DD')).subtract(1, 'month'))}
                onPressArrowRight={() => setdate((prev) => dayjs(prev.format('YYYY-MM-DD')).add(1, 'month'))}
                onDayPress={({ dateString }) => {
                  console.log(dateString);
                  setCustomDate(dateString)
                }}
                initialDate={date.format('YYYY-MM-DD')}
                current={date.format('YYYY-MM-DD').toString()}
                allowSelectionOutOfRange
                markingType='multi-dot'
                onMonthChange={() => { }}
                // onPressYear={() => onPressYear()}
                markedDates={{ [customDate]: { selected: true, selectedColor: COLORS.main } }}
              />

              {isModalVisible && arr.length > 0 && (
                <View
                  style={{
                    zIndex: 10,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: COLORS.white,
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TouchableNativeFeedback
                      onPress={() => setIsModalVisible(false)}
                      style={{
                        flex: 7,
                        alignItems: 'center'
                      }}
                    >
                      <Text style={{ fontSize: 16, color: COLORS.gray }}>Select Year</Text>
                    </TouchableNativeFeedback>
                    {/* <TouchableNativeFeedback onPress={() => setIsModalVisible(false)}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text>
                        Cancle
                      </Text>
                    </View>
                  </TouchableNativeFeedback> */}
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                    <View
                      style={{
                        alignItems: 'center',
                        zIndex: 25,
                        padding: 15,
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      {arr.map((year, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            // const new = 
                            // console.log('year', new Date(year), date);
                            setdate((prev) => dayjs().subtract(dayjs().year() - year, 'years'));
                            setIsModalVisible(false);
                          }}
                        >
                          <View style={{ padding: 20, width: '100%' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black }}>{year}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              )}
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
              // width: 310,
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10 }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>



    </SafeAreaView>
  )
}

export default DateOfBirthScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
    // backgroundColor: COLORS.gray
  },
  footer: {
    marginTop: 20,
    height: '20%',
    alignItems: 'center'

  },
  NumberInput: {
    alignItems: 'center',
    width: '100%',
    height: '58%',
    // backgroundColor:COLORS.main
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