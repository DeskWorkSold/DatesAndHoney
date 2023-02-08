import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, ScrollView, ActivityIndicator, StatusBar, ToastAndroid } from 'react-native';
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
import CustomeButton from '../components/CustomeButton';
const { width } = Dimensions.get("window");


const QTY = [
  {
    id: '1',
    qty: '1',
  },
  {
    id: '1',
    qty: '1',
  },
  {
    id: '1',
    qty: '1',
  },
  {
    id: '1',
    qty: '1',
  },
  {
    id: '1',
    qty: '1',
  }
]


const Ticketsss = [
  {
    id: '1',
    Title: 'Early Bird general admissions',
    price: '100$',
    cancleprice: '120$',
    SalesEnd: 'Sales end on Oct 9, 2022',
    SalesTime: '5:00AM–8:45AM. ',
    TicketLeft: '2',
    TimeLeft: '01:12:03',
    qty: 0
  },
  {
    id: '2',
    Title: 'Early Bird VIP',
    price: '100$',
    cancleprice: '120$',
    SalesEnd: 'Sales end on Oct 9, 2022',
    SalesTime: '5:00AM–8:45AM. ',
    TicketLeft: '2',
    TimeLeft: '01:12:03',
    qty: 0

  },
  {
    id: '3',
    Title: 'Regular Admissions',
    price: '100$',
    cancleprice: '120$',
    SalesEnd: 'Sales end on Oct 9, 2022',
    SalesTime: '5:00AM–8:45AM. ',
    TicketLeft: '2',
    TimeLeft: '01:12:03',
    qty: 0

  },
  {
    id: '4',
    Title: 'VIP Admsitions ',
    price: '100$',
    cancleprice: '120$',
    SalesEnd: 'Sales end on Oct 9, 2022',
    SalesTime: '5:00AM–8:45AM. ',
    TicketLeft: '2',
    TimeLeft: '01:12:03',
    qty: 0

  },
  {
    id: '5',
    Title: 'Front row seats',
    price: '100$',
    cancleprice: '120$',
    SalesEnd: 'Sales end on Oct 9, 2022',
    SalesTime: '5:00AM–8:45AM. ',
    TicketLeft: '2',
    TimeLeft: '01:12:03',
    qty: 0
  }
];



const EventTickets = ({ navigation, route }) => {
  // const details = route.params;
  // console.log(details.details.item.Categories);
  const [TicketsData, setTicketData] = useState([]);
  const [ticketindex, setTicketindex] = useState();
  const dispatch = useDispatch();
  const eventExist = useSelector(selectEvents);
  const [quantity, setquantity] = useState(0)


  const handleDecrement = (ticket_id) => {
    // console.log(ticket_id);
    // if (ticket_id > 1) {
      setTicketData(TicketsData =>
        TicketsData.map((item) =>
        // console.log(item.id),
          ticket_id === item.id ? {
            // console.log('test')
            ...item,
            qty: item.qty - (item.qty > 1 ? 1:0)
          } : item
        ))
    // }
    // console.log(TicketsData);
  }
  const handleIncrement = (ticket_id) => {
    // console.log(ticket_id);
    // if (ticket_id < 10) {
      setTicketData(TicketsData =>
        TicketsData.map((item) =>
          ticket_id === item.id ? {
            ...item,
            qty: item.qty + 1
          } : item
        ))
      // setquantity(pervCount => pervCount + 1)
    // }
  }

  useEffect(() => {
    setTicketData(Ticketsss)
    console.log(TicketsData);
  }, [])



  const handleTicket = (index) => {
    const BuyTickets = TicketsData[ticketindex]
    if(BuyTickets){
      console.log(BuyTickets);
      navigation.navigate('PaymentOptionScreen', { BuyTickets: BuyTickets })
    }
    else{
      ToastAndroid.show("Please select any ticket to continue!", ToastAndroid.SHORT);
    }
    // setValueIndex(index)
    // setEvents(viewPage);
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.black} />
        <HeaderTabOne
          onpress={() => navigation.goBack()}
          Lefticon={require('../../assets/goback.png')}
          Righticon={'no image'}
          Title={'Tickets '}
        />

        <View style={{
          height: '100%',
          // backgroundColor: COLORS.main
        }}>

          <ScrollView vertical showsVerticalScrollIndicator={false}>
            <View style={{
              // alignItems: 'center',
              // backgroundColor: COLORS.main,
              // elevation:8,
            }}>
              <View style={{ alignItems: 'center', }}>
                <Image source={require('../../assets/tickets.png')} resizeMode='contain'
                  style={{
                    width: '70%',
                    height: 300,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: COLORS.light,
                    elevation: 8,
                  }}
                />
              </View>
            </View>

            <View >
              {TicketsData?.map((item, index) => (
                // console.log('==>',item.Title),
                <TouchableOpacity key={index}
                  onPress={() => setTicketindex(index)}
                  style={{
                    padding: 20,
                    backgroundColor: ticketindex === index ? COLORS.main : COLORS.white,
                    marginHorizontal: 20,
                    marginTop: 20,
                    // marginBottom: 200,
                    borderRadius: 20,
                    elevation: 8
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{
                        color: COLORS.black,
                        fontSize: 16,
                      }}>
                        {item.Title}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => handleDecrement(item.id)}
                        style={{
                          backgroundColor: COLORS.light,
                          alignItems: 'center',
                          width: 20
                        }}>
                        <Text style={{
                          color: COLORS.black,
                          fontSize: 12,
                          // marginRight: 5,
                          // paddingRight: 5,
                          textAlign: 'center',
                          fontSize: 15,
                        }}>-</Text>
                      </TouchableOpacity>
                      <Text style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: 3,
                        fontSize: 15,
                      }}>{item.qty}</Text>
                      <TouchableOpacity
                        onPress={() => handleIncrement(item.id)}
                        style={{
                          backgroundColor: COLORS.light,
                          alignItems: 'center',
                          width: 20
                        }}>
                        <Text style={{
                          color: COLORS.black,
                          fontSize: 12,
                          marginRight: 5,
                          paddingLeft: 5,
                          fontSize: 15,
                        }}>+</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <View style={{
                      // paddingVertical: 10,
                    }}>
                      <Text style={{
                        color: COLORS.green,
                        fontWeight: 'bold',
                      }}>
                        ${item.price}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('EventTickets')}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 5
                      }}>
                      <Text style={{
                        color: COLORS.black,
                        fontSize: 12,
                        marginRight: 5,
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                      }}>${item.cancleprice}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{
                      fontSize: 12
                    }}>{item.SalesEnd}</Text>
                  </View>
                  <View style={{
                    paddingVertical: 2
                  }}>
                    <Text style={{
                      fontSize: 12
                    }}>Access to enter the between {item.SalesTime} </Text>
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 10, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('../../assets/left.png')} resizeMode='contain'
                        style={{
                          width: 20,
                          height: 20,
                          tintColor: 'red'
                        }} />
                      <View>
                        <Text style={{ fontSize: 12, color: 'red' }}>{item.TicketLeft}Left</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                      <Text style={{ color: COLORS.black, fontSize: 12, marginRight: 5, }}>Time Left:</Text>
                      <View>
                        <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: 'bold' }}>{item.TimeLeft}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ marginBottom: 120, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => handleTicket()}
                activeOpacity={0.8} style={{
                  width: '80%',
                  borderRadius: 10,
                  backgroundColor: COLORS.main,
                  marginVertical: 20,
                  paddingVertical: 20,
                }}>
                <Text style={{
                  textAlign: 'center',
                  color: COLORS.black
                }}>CHECKOUT</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>

        </View>

      </View>
    </SafeAreaView >
  )
}

export default EventTickets

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