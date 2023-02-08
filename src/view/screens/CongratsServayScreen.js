import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';

const RelationshipType = [
  {
    id: '1',
    name: 'Is your mom born Christian',
  },
  {
    id: '2',
    name: 'Is your dad born Christian',
  },
  {
    id: '3',
    name: 'Catholic',
  },
  {
    id: '4',
    name: 'Muslim',
  },
  {
    id: '5',
    name: 'Hinduism',
  },

  {
    id: '5',
    name: 'Buddhism',
  },

  {
    id: '5',
    name: 'Chinese traditional religion',
  },
]

export const detailReligion = [
  {
    id: '1',
    name: 'Blind',
  }, {
    id: '2',
    name: 'Deaf',
  },
  {
    id: '3',
    name: 'Wheel Chair',
  },
  {
    id: '4',
    name: 'Can be other',
  }
]



const CongratsServayScreen = ({ navigation }) => {
  const [name, setname] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);

  const onChristian = () => {
    setShowtick(!showtick)
  }
  const onChristian2 = () => {
    setShowtick2(!showtick2)
  }
  const toggleDropdown = () => {
    setShowtick(!showtick)
    setShowOptions(!showOptions);
  };

  const toggleDropdown2 = () => {
    setShowtick2(!showtick2)
  };


  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View>
              <View style={{
                paddingTop: 20,
                alignItems: 'center'
              }}>
                <Text style={{
                  color: COLORS.black
                }}>Please (Only concierge See’s this your
                  Date will Never informed as to who gave
                  this feedback)</Text>
              </View>

              <View style={{
                paddingTop: 20,
              }}>
                <Text style={{ color: COLORS.black }}>List Pros</Text>
                <TextInput
                  placeholder='Type Here!'
                  multiline
                  numberOfLines={8}
                  style={styles.TextInput} />
              </View>
              <View style={{
                paddingTop: 20,
              }}>
                <Text style={{ color: COLORS.black }}>List Cons</Text>
                <TextInput
                  placeholder='Type Here!'
                  multiline
                  numberOfLines={8}
                  style={styles.TextInput} />
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>

          <View style={{
            paddingTop: 30,
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/dateservay.png')} resizeMode='contain' style={{
              width: 250,
              height: 180,
            }} />
          </View>
          <View style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Congratulations
            </Text>
          </View>

          <View style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              textAlign: 'center'
            }}>You both want to date again. Good luck
            </Text>
          </View>
        </View>

        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          paddingTop: 80,
          height: '45%'
        }}>
          <CustomeButton onpress={() => navigation.navigate('')}
            title={'Done'} />
        </View>

      </View>
    </SafeAreaView>
  )
}


export default CongratsServayScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: COLORS.white,
    height: '55%'
  },
  footer: {
    alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
    height: 200,
    textAlignVertical: 'top',
  },
  MoreaboutReligion: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
    width: 340,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light
  }
})