import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import SVGImg1 from '../../../assets/tik.svg';

const RelationshipTypes = [
  {
    id: '1',
    name: 'Single',
  },
  {
    id: '2',
    name: 'In a Relationship',
  },
  {
    id: '3',
    name: 'Engaged',
  },
  {
    id: '4',
    name: 'Married',
  },
  {
    id: '5',
    name: 'Complicated',
  },
]



const MediatorQuestionRelationshipStatus = ({ navigation, route }) => {
  const { bio, email, DateOfBirth, name } = route.params;
  // console.log(image1);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  // console.log(Education);

  const onReligionScreen = () => {
    const selectitem = RelationshipTypes[selectedCategoryIndex]?.name;
    if (selectitem) {
      // const Occupation = occupation;
      // console.log(selectitem);
      // return
      navigation.navigate('MediatorQuestionHaveKidsScreen', {
        relationshipStatus: selectitem, bio: bio, email: email, DateOfBirth: DateOfBirth, name: name
      })
    }
    else {
      ToastAndroid.show("Please select relationship status!", ToastAndroid.SHORT);
    }
  }

  const ListRelationShips = ({ value, setValue }) => {
    return (
      <View>
        {RelationshipTypes.map((TypeTestimonial, index) => (
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
                  <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
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
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>


          <View style={{
            paddingTop: 40,
            alignItems: 'center',
            paddingHorizontal: 50,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>What type of relationship you are looking for?</Text>
          </View>
          <View style={{
            alignItems: 'center',
            paddingTop: 10
          }}>
            <Text style={{
              color: COLORS.black
            }}>Select all that apply</Text>
          </View>
          <View>
            <ListRelationShips value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} />
          </View>


        </View>

        <View style={styles.footer}>
        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          // height: '30%',
          flexDirection: 'row',
        }}>
          <View style={{
            marginRight: 2.5
          }}>
            <CustomeButton width={170} onpress={() => navigation.goBack()} title={'Back'} bcolor={COLORS.light} />
          </View>
          <View style={{
            marginLeft: 2.5
          }}>
            <CustomeButton width={170} onpress={() => onReligionScreen()}
              title={'Continue'} />
          </View>
        </View>
        <View style={{
          paddingTop: 10,
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


export default MediatorQuestionRelationshipStatus

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
    height: '80%',
  },
  footer: {
    alignItems: 'center',
    height:'20%'
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
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})