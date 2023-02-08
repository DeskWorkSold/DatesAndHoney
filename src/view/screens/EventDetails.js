import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import { useState } from 'react';
import SearchTab from '../components/SearchTab';
import EventItems from '../components/EventItems';
import EventsCategory from '../components/EventsCategory';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { events, selectEvents } from '../../../redux/reducers/Reducers'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTabOne from '../components/HeaderTabOne';
import { color } from 'react-native-reanimated';
const { width } = Dimensions.get("window");


const EventBtn = [
  {
    id: '1',
    name: 'Explore',
  },
  {
    id: '2',
    name: 'Your Events',
  }
];

export const CategoriesEvent = [
  {
    id: '1',
    name: 'New Events',
  },
  {
    id: '2',
    name: 'Todays Event',
  },
  {
    id: '3',
    name: 'Last Events',
  },
]



const EventDetails = ({ navigation, route }) => {
  const details = route.params;
  // console.log(details.details.item.Categories);
  const [Events, setEvents] = useState('Explore');
  const dispatch = useDispatch();
  const eventExist = useSelector(selectEvents);



  const handleSlide = (index) => {
    // console.log('slide');
    setValueIndex(index)
    const viewPage = EventBtn[index].name
    setEvents(viewPage);
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.black} />
        <HeaderTabOne
          onpress={() => navigation.goBack()}
          Lefticon={require('../../assets/goback.png')}
          Righticon={'no image'}
          Title={'Events Detail'}
        />

        <View style={{
          height: '100%',
          // backgroundColor: COLORS.main
        }}>
          <ScrollView vertical showsVerticalScrollIndicator={false} >
            <View style={{
              alignItems: 'center',
              paddingTop: 10,
              paddingHorizontal:20,
            }}>
              <Image source={{ uri: details.details.item.image1 }} resizeMode='cover'
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 10,
                  // marginRight: 10,
                }} />
            </View>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: 5,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <View>
                <Text style={{
                  fontSize: 16,
                  color: COLORS.black,
                  fontWeight: 'bold'
                }}>{details.details.item.Title}</Text>
              </View>
              <View style={{
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: 10,
                  color: COLORS.black
                }}>Starting from</Text>
                <Text style={{
                  fontSize: 16,
                  color: COLORS.black,
                  fontWeight: 'bold'
                }}>${details.details.item.Startprice}</Text>
              </View>
            </View>


            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <View style={{
                flexDirection: 'row'
              }}>
                <Image source={require('../../assets/location.png')} style={{
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  marginRight: 5
                }} />
                <Text style={{
                  fontSize: 13,
                  color: COLORS.black,
                }}>{details.details.item.Location}</Text>
              </View>
              <View style={{
                alignItems: 'center',
                flexDirection: 'row'
              }}>
                <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                  marginRight: 5,
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black
                }} />
                <Text style={{
                  fontSize: 13,
                  color: COLORS.black,
                }}>{details.details.item.Date}</Text>
              </View>
            </View>

            <View style={{
              paddingHorizontal: 20,
              paddingTop: 10,
            }}>
              <Text style={{
                color: COLORS.black,
              }}>Description</Text>
            </View>
            <View style={{
              paddingHorizontal: 20,
              // paddingTop:10,
            }}>
              <Text style={{
                fontSize: 12,
              }}>{details.details.item.Description}</Text>
            </View>

            <View style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
              <Text style={{
                color: COLORS.black,
              }}>Picture</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
              }}>
                <Image source={{ uri: details.details.item.image1 }} resizeMode='cover' style={{
                  width: 150,
                  height: 80,
                  borderRadius: 10,
                  marginRight: 10,
                }} />
                <Image source={{ uri: details.details.item.image1 }} resizeMode='cover' style={{
                  width: 150,
                  height: 80,
                  borderRadius: 10,
                  marginRight: 10,
                }} />
              </View>
            </ScrollView>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
              backgroundColor: COLORS.white,
              marginHorizontal: 20,
              marginTop: 20,
              marginBottom: 200,
              borderRadius: 20,
              elevation: 8
            }}>
              <View style={{
                width: '80%'
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Image source={require('../../assets/notify.png')} resizeMode='contain' />
                  <View style={{
                    width: '60%',
                    paddingLeft: 10,
                    paddingVertical: 10,
                  }}>
                    <Text style={{
                      color: COLORS.black
                    }}>
                      Scan your  DL or ID
                      to connect (optional)
                    </Text>
                  </View>
                </View>
                <TouchableOpacity 
                onPress={() => navigation.navigate('EventTickets')}
                style={{
                  backgroundColor: COLORS.main,
                  width: '30%',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}>
                  <Text style={{
                    color: COLORS.black,
                    fontSize: 12
                  }}>Scan now</Text>
                </TouchableOpacity>
              </View>
              <View style={{
                width: '20%',
                alignItems: 'center',
                paddingRight: 20,
              }}>
                <Image source={require('../../assets/barcode.png')} resizeMode='contain'
                  style={{
                    width: 100,
                    height: 100,
                  }} />
              </View>
            </View>

          </ScrollView>
        </View>

      </View>
    </SafeAreaView >
  )
}

export default EventDetails

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white
  },
  contentContainer: {
    // borderRadius:50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:COLORS.black
  },

})