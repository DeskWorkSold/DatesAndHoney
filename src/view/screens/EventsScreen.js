import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
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
  const [Events, setEvents] = useState('Explore');
  // const [yourevent, setYourEvent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValueIndex] = useState(0);
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);

  const [search, setSearch] = useState(0);
  const [xTabTwo, setxTabTwo] = useState(0);
  const dispatch = useDispatch();
  const eventExist = useSelector(selectEvents);



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
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log('User ID: ', documentSnapshot.data());
          data.push(documentSnapshot.data());
          // modalDataUid.push(documentSnapshot.id);
        });
        dispatch(events(data))
        setAllEvents(data)
        // console.log(data);
      });
    setLoading(false)
  }


  useEffect(() => {
    FetchEvents();
  }, [])

  return (
    <SafeAreaView>
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
                  color: COLORS.black
                }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {Events == 'Your Events' ?
          <ScrollView showsVerticalScrollIndicator={false}
            style={{
              paddingRight: 20
            }}>
            <EventItems width={'100%'} data={allEvents} btn={'Detail'} />
          </ScrollView>
          :
          <View>
            <View style={{
              marginBottom: 10,
            }}>
              <SearchTab search={search} setSearch={setSearch} />
            </View>
            {allEvents ?
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingTop:10,
                  justifyContent: 'space-between',
                }}>
                  <View>
                    <Text style={{ color: COLORS.black, fontSize: 20, fontWeight: 'bold' }}>New Events</Text>
                  </View>
                  <View>
                    <Text>All</Text>
                  </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <EventItems navigation={navigation} width={270} data={allEvents} />
                </ScrollView>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                }}>
                  <View>
                    <Text style={{ color: COLORS.black, fontSize: 20, fontWeight: 'bold' }}>Categories</Text>
                  </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <EventsCategory data={CategoriesEvent} value={selectedCatIndex}
                    setValue={setSelectedCatIndex} />
                </ScrollView>

                <View style={{
                  paddingLeft: 20,
                  width: '60%',
                  paddingTop: 10,
                }}>
                  <Text>
                    168 events are found matching
                    your catagories
                  </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                  style={{
                    marginBottom: 200,
                  }}>
                  <EventItems navigation={navigation} width={270} data={allEvents} />
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