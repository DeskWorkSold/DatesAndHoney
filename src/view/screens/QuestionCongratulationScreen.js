import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';


const Education = [
  {
    id: '1',
    name: 'Very I like to stay with my partner 24/7 even go to work together if possible',
  },
  {
    id: '2',
    name: 'I am not clingy at all',
  }
]



const QuestionCongratulationScreen = ({ navigation }) => {

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [checked, setChecked] = React.useState('Apple'); //initial choice




  const ListEducation = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              ...styles.NumberInput
            }}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  {TypeTestimonial.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {value == index ? (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                ) : (<View></View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </View>
    )
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>


        <View style={styles.contentContainer}>


          <View style={{
            paddingTop: 30,
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/congrats.png')} resizeMode='contain' style={{
              width: 200,
              height: 160,
            }} />
          </View>

          <View style={{
            paddingTop: 30,
            alignItems: 'center',
            paddingHorizontal: 60,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Congratulation! your profile
              has been created
            </Text>
          </View>

          <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
            <View style={{ paddingTop: 10, }}>
              <Text>Please make sure to follow our guidlines and to
                be respectful of others. We hope you
                meet your match!.... </Text>
            </View>
          </View>


          <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
            <View style={{ paddingTop: 10 }}>
              <Text>If you would like to get matchs that suit you better
                fill out the <Text style={{ color: COLORS.main }}> extra questions here </Text> (these answers
                will not show up on your profile).</Text>
            </View>
          </View>

        </View>

        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          height: '10%'
        }}>
          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={170} onpress={() => navigation.navigate('')}
                title={'Skip'} bcolor={COLORS.light} />
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton width={170} onpress={() => navigation.navigate('HomeScreen')}
                title={'Continue'} />
            </View>
          </View>

          <View style={{
            paddingTop: 5,
            width: 310,
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


export default QuestionCongratulationScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignItems: 'center',
    height: '90%'
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
    height: 50,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  NumberInput2: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})