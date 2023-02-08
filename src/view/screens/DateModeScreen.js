import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import MapView, { Marker } from 'react-native-maps';


const DateModeScreen = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <ScrollView>
        <View style={styles.container}>

          <View style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Date Mode
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Current Location </Text>
              <View style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 24.860966,
                    longitude: 66.990501,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker 
                  draggable
                  coordinate={{
                    latitude: 24.860966,
                    longitude: 66.990501,
                  }}
                  onDragEnd={
                    (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                  title={'Test Marker'}
                  description={'This is description of marker'} />
                </MapView>
              </View>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Where going for date? </Text>
              <View style={styles.NumberInput}>
                <TextInput
                  value={email}
                  placeholder={'Enter date location'}
                  keyboardType='email-address'
                  onChangeText={email => setEmail(email)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>


          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Expected arrival time? </Text>
              <View style={styles.NumberInput}>
                <TextInput
                  value={number}
                  placeholder={'Arrival time'}
                  keyboardType='number-pad'
                  onChangeText={number => setNumber(number)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Tracking time </Text>
              <View style={styles.NumberInput}>
                <TextInput
                  value={name}
                  placeholder={'Time'}
                  onChangeText={name => setName(name)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>

            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 80,
              paddingBottom: 10,
            }}>
              <View style={{ marginHorizontal: 5 }}>
                <CustomeButton onpress={() => navigation.navigate('DateServayScreen')}
                  title={'Continue'} />
              </View>
            </View>
          </View>

        </View>

      </ScrollView>



    </SafeAreaView >
  )
}

export default DateModeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: '100%'
  },
  contentContainer: {
    height: '90%',
  },
  footer: {
    alignItems: 'center',
  },
  map: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 200,
    width: 340,
    borderRadius: 15,
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})