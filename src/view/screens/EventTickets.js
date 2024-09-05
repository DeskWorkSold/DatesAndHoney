import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, ScrollView, ActivityIndicator, StatusBar, ToastAndroid } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import { useState } from 'react';
import SearchTab from '../components/SearchTab';
import EventItems from '../components/EventItems';
import EventsCategory from '../components/EventsCategory';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { events, selectEvents, selectPaymentCards, selectTicketsAddToCard, TicketsAddtoCard } from '../../../redux/reducers/Reducers'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTabOne from '../components/HeaderTabOne';
import { color } from 'react-native-reanimated';
import CustomeButton from '../components/CustomeButton';
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
  const { details } = route.params;
  const Doc = route.params?.Doc;
  // console.log(details, Doc);
  const [TicketsData, setTicketData] = useState([]);
  const [ticketindex, setTicketindex] = useState();
  const dispatch = useDispatch();
  const eventExist = useSelector(selectEvents);
  const [quantity, setquantity] = useState(0)
  const [addToCard, setAddToCard] = useState();
  const TicketsCard = useSelector(selectTicketsAddToCard)
  const dicpatch = useDispatch()
  const PaymentCards = useSelector(selectPaymentCards)


  const handleDecrement = (item, index) => {
    setTicketindex(index)
    const updatedQuantity = quantity - (quantity >= 1 ? 1 : 0);
    setquantity(updatedQuantity)
    if (item?.totalTickets > 0) {
      setTicketData(TicketsData =>
        TicketsData.map((item, i) =>
          // console.log(item.id),
          i === index ? {
            ...item,
            qty: updatedQuantity
          } : item
        ))
      if (item) {
        const totalQty = updatedQuantity;
        const TotalPrice = item?.discountedPrice ? item?.discountedPrice * totalQty : item?.pricePerTicket * totalQty;
        if (item?.qty < 1) {
          ToastAndroid.show('Please add Tickets Qty', ToastAndroid.SHORT)
        }
        else {
          let Data = new Object();
          Data.image1 = details?.image1;
          Data.euid = details?.uid;
          Data.title = details?.Title;
          Data.description = details?.description;
          Data.startDate = details?.startDate;
          Data.endDate = details?.endDate;
          Data.startTime = details?.startTime;
          Data.endTime = details?.endTime;
          Data.location = details?.location;
          Data.eventOrganizer = details?.owneruid;
          Data.TicketsQty = totalQty;
          Data.totalPrice = TotalPrice;
          Data.ScanDoc = Doc;
          Data.promoterReward = details?.promoterReward;
          Data.discountedReferral = details?.discountedReferral;
          Data.uid = Math.random().toString(16).slice(2) + 1;
          Data.Tickets = { ...item, qty: updatedQuantity };
          Data.promoCode = details?.promoCode ?? null;
          // console.log('===>', Data)
          setAddToCard(Data)
        }
      }
      else {
        ToastAndroid.show('Please Select Your Tickets', ToastAndroid.SHORT)
      }
    }
    else {
      ToastAndroid.show('Tickets Out Off the Strock', ToastAndroid.SHORT)
    }
  }
  const handleIncrement = (item, index) => {
    const updatedQuantity = quantity + 1;
    setquantity((prevQuantity) => prevQuantity + 1);
    setTicketindex(index)

    if (item?.totalTickets >= updatedQuantity) {
      setTicketData((TicketsData) =>
        TicketsData.map((item2, i) =>
          index === i ? {
            ...item2,
            qty: updatedQuantity
          } : item2,
        ));
      const totalQty = quantity + 1;
      if (item) {
        const TotalPrice = item?.discountedPrice ? item?.discountedPrice * totalQty : item?.pricePerTicket * totalQty;
        if (totalQty < 1) {
          ToastAndroid.show('Please add Tickets Qty', ToastAndroid.SHORT)
        }
        else {
          let Data = new Object();
          Data.image1 = details?.image1;
          Data.euid = details?.uid;
          Data.title = details?.Title;
          Data.description = details?.description;
          Data.startDate = details?.startDate;
          Data.endDate = details?.endDate;
          Data.startTime = details?.startTime;
          Data.endTime = details?.endTime;
          Data.location = details?.location;
          Data.eventOrganizer = details?.owneruid;
          Data.TicketsQty = totalQty;
          Data.totalPrice = TotalPrice;
          Data.discountedReferral = details?.discountedReferral;
          Data.promoterReward = details?.promoterReward;
          Data.ScanDoc = Doc;
          Data.promoCode = details?.promoCode ?? null;
          Data.uid = Math.random().toString(16).slice(2) + 1;
          Data.Tickets = { ...item, qty: totalQty };
          // console.log('===>', Data)
          setAddToCard(Data)
          // dicpatch(ticketsAddtoCard(Data))
        }
      }
      else {
        ToastAndroid.show('Please Select Your Tickets', ToastAndroid.SHORT)
      }
    }
    else {
      ToastAndroid.show('Tickets Out Off the Strock', ToastAndroid.SHORT)
      setquantity(0)
    }
    // setquantity(0)
  }

  const AddtoCard = (item) => {
    if (item.qty < 1) {
      ToastAndroid.show('Please select Tickets Qty', ToastAndroid.SHORT)
    }
    // return
    // const totalQty = item.qty;
    // const TotalPrice = item.pricePerTicket * totalQty;
    // if (item) {
    //   if (item.qty < 1) {
    //     ToastAndroid.show('Please add Tickets Qty', ToastAndroid.SHORT)
    //   }
    //   else {
    //     let Data = new Object();
    //     Data.image1 = details?.image1;
    //     Data.euid = details?.uid;
    //     Data.title = details?.Title;
    //     Data.description = details?.description;
    //     Data.startDate = details?.startDate;
    //     Data.endDate = details?.endDate;
    //     Data.startTime = details?.startTime;
    //     Data.endTime = details?.endTime;
    //     Data.location = details?.location;
    //     Data.promoterReward = details?.promoterReward;
    //     Data.discountedReferral = details?.discountedReferral;
    //     Data.TicketsQty = totalQty;
    //     Data.totalPrice = TotalPrice;
    //     Data.ScanDoc = Doc;
    //     Data.uid = Math.random().toString(16).slice(2) + 1;
    //     Data.Tickets = item;
    //     // console.log('===>', Data)
    //     setAddToCard(Data)
    //     dicpatch(ticketsAddtoCard(Data))
    //   }
    // }
    // else {
    //   ToastAndroid.show('Please Select Your Tickets', ToastAndroid.SHORT)
    // }

  }
  combineDateAndTime = function (date, time) {
    let timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();
    var dateString = '' + year + '-' + month + '-' + day;
    var combined = new Date(dateString + ' ' + timeString);

    return combined;
  };
  const updateTicketPrice = (item) => {
    // console.log(item.discountStartDate, item.discountstartTime);
    if (item?.length > 0) {
      const updatedItems = item.map((e, i) => {
        const dateTime = moment(`${e.discountStartDate} ${e.discountstartTime}`, 'YYYY-MM-DD HH:mm:ss').format();
        const currentTime = Date.now();
        const ticketTime = new Date(dateTime).getTime();
        if (currentTime > ticketTime) {
          return {
            ...e, // Copy existing data
            discountedPrice: e.pricePerTicket, // Update discountedPrice
            // You can update other fields here as well
          };
        }
        else {
          return e; // If not expired, return the original item
        }
      })
      return updatedItems; // Return the updated array
    }
  }

  const addTrendingFlag = (ticketData) => {
    // Find the ticket with the minimum totalTickets
    const minTickets = Math.min(...ticketData.map(ticket => parseInt(ticket.totalTickets, 10)));

    // Add the trending attribute to the ticket with the minimum totalTickets
    const updatedTickets = ticketData.map(ticket => ({
      ...ticket,
      trending: parseInt(ticket.totalTickets, 10) === minTickets,
    }));

    return updatedTickets;
  };

  useEffect(() => {
    const updatedTicketData = addTrendingFlag(details?.TicketModaldata);
    // console.log('==>', updatedTicketData);

    setTicketData(updatedTicketData)
    dicpatch(TicketsAddtoCard(null))
    const updatedTickets = updateTicketPrice(updatedTicketData);
    // console.log(updatedTickets);
    // setTicketData()
    if (updatedTickets?.length > 0) {
      setTicketData(updatedTickets)
    }
  }, [])



  const handleTicket = () => {
    // const BuyTickets = TicketsData[ticketindex]
    // console.log(TicketsCard);
    if (addToCard) {
      if (addToCard?.Tickets?.qty < 1) {
        ToastAndroid.show('Please add Tickets Qty', ToastAndroid.SHORT)
      }
      else {
        // console.log(addToCard);
        // return
        dicpatch(TicketsAddtoCard(addToCard))
        if (PaymentCards?.length > 0) {
          navigation.navigate('CheckoutScreenEvent', { details: details })
        }
        else {
          navigation.navigate('PaymentOptionScreen')
        }
        // navigation.navigate('PaymentOptionScreen')
      }
    }
    else {
      ToastAndroid.show('Please Select Your Tickets', ToastAndroid.SHORT)
    }
    // return
    // if (TicketsCard) {
    //   // console.log(TicketsCard);
    //   // return;
    //   navigation.navigate('PaymentOptionScreen', { BuyTickets: TicketsCard })
    // }
    // else {
    //   ToastAndroid.show("Please select your ticket to continue!", ToastAndroid.SHORT);
    // }
    // setValueIndex(index)
    // setEvents(viewPage);
  };

  const GoBack = () => {
    navigation?.goBack()
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.black} />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor:COLORS.gray2,
          height: 60,
          paddingHorizontal: 20,
        }}>
          <View style={{ width: '20%' }}>
            <TouchableOpacity
              onPress={() => GoBack()}>
              <Ionicons name='arrow-back' size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <View style={{ width: '60%', alignItems: 'center', }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Tickets</Text>
          </View>

          <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
          </View>
        </View>

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
              {TicketsData?.map((item, index) => {
                var isoDate;
                var currentTime;
                var givenDateTime;
                var remainingTime;
                var remainingHours;
                var remainingMinutes;
                var remainingSeconds;
                var hoursLeft;
                if (item?.discountendDate && item?.discountendTime) {
                  const [month, day, year] = item?.discountendDate?.split('/');
                  const [time, period] = item?.discountendTime?.split(/:| /);
                  isoDate = new Date(`${year}-${month}-${day}T${period.toLowerCase() === 'pm' ? parseInt(time, 10) + 12 : time}:00:00Z`).toISOString();
                  currentTime = new Date();
                  givenDateTime = new Date(isoDate);
                  remainingTime = givenDateTime - currentTime;
                  remainingHours = Math?.floor(remainingTime / (1000 * 60 * 60));
                  remainingMinutes = Math?.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                  remainingSeconds = Math?.floor((remainingTime % (1000 * 60)) / 1000);
                  hoursLeft = remainingHours + ':' + remainingMinutes + ':' + remainingSeconds;
                  if (remainingTime < 0) {
                    hoursLeft = '0:00:00'; // Set hoursLeft to '0:00:00' if remainingTime is negative
                  }
                }
                return (
                  // console.log('==>',item),
                  <TouchableOpacity key={index}
                    onPress={() => item?.totalTickets > 0 ? AddtoCard(item) : null}
                    disabled={item?.totalTickets > 0 ? false : true}
                    style={{
                      padding: 20,
                      backgroundColor: ticketindex === index ? COLORS.main : COLORS.white,
                      marginHorizontal: 20,
                      marginTop: 20,
                      // marginBottom: 200,
                      borderRadius: 20,
                      elevation: 8,
                      opacity: item?.totalTickets > 0 ? 1 : 0.5
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
                          {item?.ticketTitle}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                          onPress={() => handleDecrement(item, index)}
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
                          color: COLORS.black,
                        }}>{item.qty ? item.qty : 0}</Text>
                        <TouchableOpacity
                          onPress={() => handleIncrement(item, index)}
                          style={{
                            backgroundColor: COLORS.light,
                            alignItems: 'center',
                            width: 20,
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
                        {item?.discountedPrice ?
                          <Text style={{
                            color: COLORS.green,
                            fontWeight: 'bold',
                          }}>
                            ${item?.discountedPrice}
                          </Text>
                          :
                          <Text style={{
                            color: COLORS.green,
                            fontWeight: 'bold',
                          }}>
                            ${item?.pricePerTicket}
                          </Text>
                        }
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
                        }}>${item?.pricePerTicket}</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      {moment(item?.discountStartDate, 'MM/DD/YYYY').format('MMMM D, YYYY') != 'Invalid date' && moment(item?.discountendDate, 'MM/DD/YYYY').format('MMMM D, YYYY') != 'Invalid date' ?
                        <Text style={{
                          fontSize: 12,
                          color: COLORS.black
                        }}>
                          Sales start from  {moment(item?.discountStartDate, 'MM/DD/YYYY').format('MMMM D, YYYY')} to {moment(item?.discountendDate, 'MM/DD/YYYY').format('MMMM D, YYYY')}
                        </Text>
                        :
                        <Text style={{
                          fontSize: 12,
                          color: COLORS.black
                        }}>
                          Sales not available
                        </Text>
                      }
                    </View>
                    <View style={{
                      paddingVertical: 2
                    }}>
                      <Text style={{
                        fontSize: 12,
                        color: COLORS.black
                      }}>Access to enter between {details?.startTime ? details?.startTime : '00'}–{details?.endTime ? details?.endTime : '00'}. </Text>
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
                          <Text style={{ fontSize: 12, color: 'red' }}>{item?.totalTickets}Left</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                        {item.trending && (
                          <Text style={{ color: COLORS.white, fontSize: 12, marginRight: 5, backgroundColor: COLORS.green, padding: 5, borderRadius: 5 }}>Trending</Text>
                        )}
                        <Text style={{ color: COLORS.black, fontSize: 12, marginRight: 5, }}>Time Left:</Text>
                        <View>
                          <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: 'bold' }}> {hoursLeft ? hoursLeft : 'not available'}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
              )}
            </View>

            <View style={{ marginBottom: 150, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => handleTicket()}
                activeOpacity={0.8} style={{
                  width: width / 1.1,
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