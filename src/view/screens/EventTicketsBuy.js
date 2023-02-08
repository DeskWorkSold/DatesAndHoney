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
import CustomeButton from '../components/CustomeButton';
const { width } = Dimensions.get("window");




const EventTicketsBuy = ({ navigation, route }) => {
  const { BuyTickets, paymentCard } = route.params;
  console.log(BuyTickets, paymentCard);
  const [TicketsData, setTicketData] = useState([]);
  const [ticketindex, setTicketindex] = useState(0);
  const dispatch = useDispatch();
  const eventExist = useSelector(selectEvents);
  const [quantity, setquantity] = useState(0)




  const handleTicket = (index) => {
    const BuyTickets = TicketsData[ticketindex]
    console.log(BuyTickets);
    navigation.navigate('PaymentOptionScreen', { BuyTickets: BuyTickets })
    // setValueIndex(index)
    // setEvents(viewPage);
  };


  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={{
          paddingTop: 20
        }}>
          <Image source={require('../../assets/tofi.png')} resizeMode='contain' style={{
            height: 120
          }} />
        </View>

        <View style={{
          padding: 20
        }}>
          <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: COLORS.black,
            textAlign: 'center',
          }}>Congratulations</Text>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: COLORS.black
          }}>You got the <Text style={{ backgroundColor: COLORS.main, paddingHorizontal: 5 }}>Ticket!</Text></Text>
        </View>


        <View style={{ flexDirection: 'row' }}>
          <View style={{
            marginHorizontal: 10,
            marginVertical: 5,
            borderWidth: 6,
            borderColor: COLORS.white,
            borderRadius: 60,
          }}>
            {/* <Image source={{ uri: user.image1 }} resizeMode='contain'
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
              }} /> */}
          </View>
          <View style={{
            marginHorizontal: 10,
            marginVertical: 5,
            borderWidth: 6,
            borderColor: COLORS.white,
            borderRadius: 60,
          }}>
            {/* <Image source={{ uri: userImg }} resizeMode='contain'
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
              }} /> */}
          </View>
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

        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black }}>
            {BuyTickets.Title}
          </Text>
        </View>
        <View>
          <Text style={{ color: COLORS.black }}>
            Events start at <Text style={{color:COLORS.blue, fontWeight:'bold'}}>{BuyTickets.SalesTime}</Text>
          </Text>
          <Text style={{textAlign:'center', fontSize:12}}>Come early to avoid lines</Text>
        </View>

        <View style={{
          justifyContent: 'center',
          paddingTop: 10,
          paddingHorizontal: 70
        }}>
          <Text style={{
            textAlign: 'center'
          }}>
            Take a screen screenshot of this screen and have it out for fast check in Or if you scanned your DL or ID have it out ready in line for fast check in
          </Text>
        </View>

        <View style={{
          paddingTop: 70
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Foodmenu', {
              BuyTickets: BuyTickets,
              paymentCard: paymentCard,
            })}
          >
            <View style={{
              backgroundColor: COLORS.main,
              width: 329,
              height: 50,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontWeight: 'bold', color: COLORS.black, fontSize: 16 }}>Watch Menu</Text>
            </View>
          </TouchableOpacity>
        </View>



      </View>
    </SafeAreaView>
  )
}

export default EventTicketsBuy

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white,
    alignItems: 'center'
  },

})