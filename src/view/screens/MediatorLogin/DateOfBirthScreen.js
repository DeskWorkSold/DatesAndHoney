import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, TouchableNativeFeedback, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
// import Calendar from 'react-native-calendars/src/calendar';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import dayjs from 'dayjs';
const { width, height } = Dimensions.get("window");

// import dayjs



const MediatorDateOfBirthScreen = ({ navigation, route }) => {
  const { bio, email, name } = route.params;
  // console.log(name);
  const [date, setdate] = useState(dayjs());
  const [arr, setArr] = useState([]);
  const [customDate, setCustomDate] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  // const cartItems = useSelector((state) => state.reducers.selectedItems.items)
  // console.log('====>date', date);
  // console.log('====>customDate', customDate);

  const onGenderPress = () => {
    const years = new Date().getFullYear() - new Date(customDate).getFullYear();
    // console.log(customDate);
    // return;
    if (!customDate || years < 18) {
      if (!customDate) {
        ToastAndroid.show("Please select your Birth Date!", ToastAndroid.SHORT);
      }
      else if (years < 18) {
        ToastAndroid.show("You must have to be 18+ to continue!", ToastAndroid.SHORT);
      }
    }
    else {
      // console.log(customDate);
      // return
      navigation.navigate('MediatorQuestionRelationshipStatus', { DateOfBirth: customDate, name: name, email: email, bio: bio })
    }
  }

  // const onPressYear = (month) => {

  //   const current = month.toString('yyyy-MM-dd');
  //   // this.setState({
  //   // 	yearListVisible: true,
  //   // 	month,
  //   // 	current
  //   // })
  //   setdate(month)
  //   setYearListVisible(true)
  //   setCurrent(current)

  // }

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

        <View style={styles.contentContainer}>
          <View style={{
            height: '42%',
            alignSelf: 'center'
          }}>
            <View style={{
              paddingTop: 20
            }}>
              <Image source={require('../../../assets/dateofbirth.png')} resizeMode='contain' />
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
          </View>



          <View style={styles.NumberInput}>
            <Calendar style={{
              width: 300,
              backgroundColor: COLORS.transparent,
            }}
              renderHeader={(year) => (
                <TouchableNativeFeedback onPress={() => setIsModalVisible(true)}>
                  <View>
                    <Text style={{
                      color: COLORS.main,
                      fontWeight: 'bold',
                      fontSize: 20
                    }}>
                      {monthNames[date?.month()]} {date?.year()}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              )}
              onPressArrowLeft={() => setdate((prev) => dayjs(prev.format('YYYY-MM-DD')).subtract(1, 'month'))}
              onPressArrowRight={() => setdate((prev) => dayjs(prev.format('YYYY-MM-DD')).add(1, 'month'))}
              onDayPress={({ dateString }) => {
                setCustomDate(dateString)
              }}
              initialDate={date.format('YYYY-MM-DD')}
              current={date.format('YYYY-MM-DD').toString()}
              allowSelectionOutOfRange
              markingType='multi-dot'
              onMonthChange={() => { }}
              onPressYear={() => onPressYear()}
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
                    <Text style={{ fontSize: 20, color: COLORS.black }}>Select Year</Text>
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
                <ScrollView>
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
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{
              marginRight: 2.5
            }}>
              <CustomeButton width={170} onpress={() => navigation.goBack()} title={'Back'} bcolor={COLORS.light} />
            </View>
            <View style={{
              marginLeft: 2.5
            }}>
              <CustomeButton width={170} onpress={() => onGenderPress()}
                title={'Continue'} />
            </View>
          </View>

          <View style={{
            paddingTop: 20,
            width: 310,
            alignItems: 'center'
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

export default MediatorDateOfBirthScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%',
    alignItems: 'center'
  },
  NumberInput: {
    alignItems: 'center',
    width: 300,
    height: '58%',
    // backgroundColor: COLORS.gray
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