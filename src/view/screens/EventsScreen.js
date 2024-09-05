import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import { useState } from 'react';
import SearchTab from '../components/SearchTab';
import EventItems from '../components/EventItems';
import EventsCategory from '../components/EventsCategory';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { events, selectEvents, selectMyevents, selectPackages, selectUser } from '../../../redux/reducers/Reducers'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyEventItems from '../components/MyEventItems';
const { width } = Dimensions.get("window");
import moment from 'moment';
import HeaderTabOne from '../components/HeaderTabOne';

const EventBtn = [
  {
    id: '1',
    name: 'Upcoming',
  },
  {
    id: '2',
    name: 'Events Paid',
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



const EventsScreen = ({ navigation }) => {
  // state = {
  //   active: 0,
  //   xTabOne: 0,
  //   xTabTwo: 0,
  //   translateX: new Animated.Value(0),
  //   translateXTabOne: new Animated.Value(0),
  //   translateXTabTwo: new Animated.Value(width),
  //   translateY: -1000
  // };
  const [allEvents, setAllEvents] = useState();
  const [allEventsTemp, setAllEventsTemp] = useState();
  const [allEventsfilter, setAllEventsfilter] = useState(null);
  const [Events, setEvents] = useState('Explore');
  // const [yourevent, setYourEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingforMe, setLoadingforMe] = useState(false);

  const [value, setValueIndex] = useState(0);
  const [selectedCatIndex, setSelectedCatIndex] = useState('New Events');

  const [search, setSearch] = useState(0);
  const [xTabTwo, setxTabTwo] = useState(0);
  const [myEvents, setMyEvents] = useState(null);
  const [myEventsid, setMyEventsid] = useState(null);

  const dispatch = useDispatch();
  const eventExist = useSelector(selectEvents);
  const user = useSelector(selectUser)
  const myevents = useSelector(selectMyevents)
  // console.log(myevents?.length > 0);

  // const BuyMemberShips = useSelector(selectPackages)
  //   // const EventsId = SelectedEvent.item.uid;
  //   console.log(BuyMemberShips);

  const handleSlide = (index) => {
    // console.log('slide');
    setValueIndex(index)
    const viewPage = EventBtn[index].name
    setEvents(viewPage);
  };

  const FetchEvents = async () => {
    setLoading(true)
    await firestore()
      .collection('Events')
      .orderBy('timeStamp', 'desc')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach((documentSnapshot) => {
          const today = new Date();
          const startDateStr = documentSnapshot.data()?.endDate; // "09-29-2023"
          const startTimeStr = documentSnapshot.data()?.endTime; // "9:00:57 AM"
          // Parse startDate and startTime into a Date object
          // console.log('==> : ', startDateStr);
          const [month, day, year] = startDateStr.split('-').map(Number);
          const [hour, minute, second] = startTimeStr.match(/\d+/g).map(Number);
          const isAM = startTimeStr.includes('AM');
          const eventDate = new Date(year, month - 1, day, isAM ? hour : hour + 12, minute, second);
          // Compare eventDate with today's date
          const isEventInFuture = eventDate >= today;
          // console.log(eventDate , today);
          if (isEventInFuture == true) {
            // console.log('==> :',documentSnapshot.data());
            data.push(documentSnapshot.data());
          }
        });
        setAllEvents(data)
        setAllEventsTemp(data)
      });
    setLoading(false)
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = allEvents.filter((item) => {
        const itemData = item?.Title ? item?.Title?.toUpperCase()
          : ''.toUpperCase();
        const textData = text?.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      // console.log(newData);
      setAllEventsTemp(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setAllEventsTemp(allEvents);
      setSearch(text);
    }
  };


  useEffect(() => {
    FetchEvents();
    // fetchRecentTickets();  
  }, [])
  const openDrawerScreen = () => {
    navigation.openDrawer()
  }
  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: "none"
  //     }
  //   });
  //   return () => navigation.getParent()?.setOptions({
  //     tabBarStyle: undefined
  //   });
  // }, [navigation]);

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      {user?.Lookingfor === 'Events Only' ?
        <HeaderTabOne
          onpress={() => openDrawerScreen()}
          Lefticon={require('../../assets/menu3.png')}
          // Righticon={require('../../assets/menu2.png')}
          logo={require('../../assets/splashlogo.png')}
        />
        : null}
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: "space-between",
            width: '100%',
            // paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: COLORS.light
          }}>
            {EventBtn.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSlide(index)}
                style={{
                  // flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 0.5,
                  width: '50%',
                  // borderColor: value == index ? COLORS.main: COLORS.gray,
                  borderRadius: 10,
                  height: 46,
                  backgroundColor: value == index ? COLORS.main : COLORS.light
                }}
              >
                <Text style={{
                  fontFamily: '',
                  color: COLORS.black,
                  fontSize: 14,
                }}>{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {Events == 'Events Paid' ?
          <ScrollView showsVerticalScrollIndicator={false}
            style={{
              // paddingRight: 20,
              alignSelf: 'center'
            }}>
            {myevents?.length > 0 ?
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                  marginBottom: 80,
                }}>
                  <MyEventItems navigation={navigation} widths={width / 1.1} data={myevents} btn={'Detail'} />
                </View>
              </ScrollView>
              :
              <Text style={{
                paddingHorizontal: 20,
                alignItems: 'center',
                color: COLORS.gray,
                fontSize: 12
              }}>Currently you don't have any events at the moment.</Text>
            }

          </ScrollView>
          :
          <View>
            <View style={{
              marginBottom: 10,
            }}>
              {/* <SearchTab search={search} setSearch={setSearch} /> */}
              <View style={styles.NumberInput}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  height: 45,
                  alignItems: 'center',
                  // justifyContent: 'center',
                  paddingHorizontal: 20,
                  backgroundColor: COLORS.light,
                  borderRadius: 10,
                }}>
                  <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                    marginRight: 5,
                    color: COLORS.black
                  }} />
                  <TextInput
                    value={search}
                    placeholder='Search events'
                    placeholderTextColor={COLORS.gray}
                    onChangeText={search => searchFilterFunction(search)
                    }
                    style={styles.TextInput}
                  />
                </View>
                {/* <View style={{
                  alignItems: 'flex-end',
                  backgroundColor: COLORS.light,
                  width: '10%',
                  height: 45,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image source={require('../../assets/filter.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20,
                  }} />
                </View> */}
              </View>
            </View>
            {allEvents ?
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingTop: 10,
                  justifyContent: 'space-between',
                }}>
                  <View>
                    <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>New Events</Text>
                  </View>
                  <View>
                    <Text style={{ color: COLORS.gray, fontSize: 12 }}>All</Text>
                  </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {allEventsTemp?.length > 0 ?
                    <EventItems navigation={navigation} widths={width / 1.2} data={allEventsTemp} />
                    :
                    <View style={{
                      width: width,
                      backgroundColor: COLORS.light,
                      // alignSelf:'center',
                      marginVertical: 10,
                      paddingHorizontal: 20,
                    }}>
                      <View style={{
                        height: 200,
                        // width:'100%',
                        // width: width / 1.2,
                        justifyContent: 'center',
                        marginHorizontal: 20,
                        // alignSelf:'center',
                        paddingHorizontal: 20,
                        // backgroundColor: COLORS.light,
                      }}>
                        <Text style={{
                          fontSize: 12,
                          color: COLORS.black,
                          textAlign: 'center'
                        }}>Oops! No Events Found.</Text>
                        <Text style={{
                          fontSize: 10,
                          color: COLORS.gray,
                          textAlign: 'center',
                        }}>
                          It looks like there are no events available at the moment.
                          Please check back later for exciting upcoming events.
                        </Text>
                      </View>
                    </View>
                  }
                </ScrollView>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                }}>
                  <View>
                    <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>Categories</Text>
                  </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <EventsCategory data={CategoriesEvent} value={selectedCatIndex}
                    setValue={setSelectedCatIndex} filterdata={allEvents} setfilterdata={setAllEventsfilter} />
                </ScrollView>
                <View style={{
                  paddingLeft: 20,
                  width: '60%',
                  paddingTop: 10,
                }}>
                  {allEventsfilter ?
                    <Text style={{
                      fontSize: 12,
                      color: COLORS.gray
                    }}>
                      {allEventsfilter.length} events are found matching
                      your catagories
                    </Text>
                    :
                    <Text style={{
                      fontSize: 12,
                      color: COLORS.gray
                    }}>
                      {allEvents.length} events are found matching
                      your catagories
                    </Text>
                  }
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                  style={{
                    marginBottom: 200,
                  }}>
                  {allEventsfilter ?
                    <EventItems navigation={navigation} widths={width / 1.2} data={allEventsfilter} />
                    :
                    <EventItems navigation={navigation} widths={width / 1.2} data={allEvents} />
                  }
                </ScrollView>

              </ScrollView>
              :
              <View style={{
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
                <ActivityIndicator size="small" color={COLORS.white} animating={loading} />
              </View>
            }
          </View>
        }
      </View>
    </SafeAreaView >
  )
}

export default EventsScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // flex:1,
    backgroundColor: COLORS.white
  },
  contentContainer: {
    // borderRadius:50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:COLORS.black
  },
  NumberInput: {
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 20,
    // paddingHorizontal: 20,
    // height: 45,
    // width: '100%',
    // backgroundColor: COLORS.light,
    // borderRadius: 5,
  },
  TextInput: {
    backgroundColor: COLORS.transparent,
    width: '90%',
    color: COLORS.black
  },
})