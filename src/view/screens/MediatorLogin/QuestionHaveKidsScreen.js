import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import SVGImg1 from '../../../assets/tik.svg';

const RelationshipTypes = [
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
    name: 'Are they all married',
  }, {
    id: '2',
    name: 'Are they not all married',
  }
]

const Disability = [
  {
    id: '1',
    name: 'No',
  },
]



const MediatorQuestionHaveKidsScreen = ({ navigation, route }) => {
  const { relationshipStatus, bio, email, DateOfBirth, name } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedDisabilityIndex, setDisabilityIndex] = useState(0);
  const [haveKids, setHaveKids] = useState(null);
  const [haveKidsDetail, setHaveKidsDetail] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showtick2, setShowtick2] = useState(false);
  // const [valueGS, setValueGS] = useState('');
  // const [showtick, setShowtick] = useState(false);



  const onDisabilityPartnerScreen = () => {
    if (haveKids) {
      if (haveKids == 'Yes') {
        // const detailReligion2 = detailReligion[selectedCategoryIndex]?.name
        if (haveKidsDetail) {
          // console.log(haveKids +' '+ haveKidsDetail);return
          navigation.navigate('MediatorQuestionOrganizationScreen', { HaveKids: haveKids + ' ' + haveKidsDetail, relationshipStatus: relationshipStatus, bio: bio, email: email, DateOfBirth: DateOfBirth, name: name })
        }
        else {
          ToastAndroid.show("Please select detail of kids!", ToastAndroid.SHORT);
        }
      }
      else {
        // console.log(haveKids);
        navigation.navigate('MediatorQuestionOrganizationScreen', { HaveKids: haveKids, relationshipStatus: relationshipStatus, bio: bio, email: email, DateOfBirth: DateOfBirth, name: name })
      }
    }
    else {
      ToastAndroid.show("Please select Have kids!", ToastAndroid.SHORT);
    }
  }

  const toggleDropdown = () => {
    setShowtick(!showtick)
    setShowOptions(!showOptions);
  };

  const yesAbility = (index) => {
    setSelectedCategoryIndex(index)
    setHaveKidsDetail(detailReligion[index]?.name)
  }

  const toggleDropdown2 = (index) => {
    setDisabilityIndex(index)
    setDisable(Disability[selectedDisabilityIndex].name)
    setShowtick2(!showtick2)
  };


  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View style={{ height: 100 }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {detailReligion.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => yesAbility(index)}
              >
                <View style={styles.MoreaboutReligion}>

                  <View style={{ width: '90%' }}>
                    <Text style={{ color: COLORS.black }}>{item.name}</Text>
                  </View>
                  <View style={{
                    alignItems: 'flex-end'
                  }}>
                    {selectedCategoryIndex == index ? (
                       <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
                    ) : (<View></View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
            alignItems: 'center',
            paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Do you have kids?
            </Text>
          </View>


          <TouchableOpacity onPress={() => { setHaveKids('Yes'), setShowOptions(!showOptions) }}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Yes</Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {haveKids == 'Yes' && (
                   <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
                )}
              </View>
            </View>
          </TouchableOpacity>
          {haveKids == 'Yes' &&
            renderDropdown()
          }

          <TouchableOpacity onPress={() => { setHaveKids('No'), setShowOptions(!showOptions) }}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>No</Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {haveKids == 'No' && (
                   <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* {renderDropdown()}

          {Disability.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => toggleDropdown2(index)}>
              <View style={styles.NumberInput}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>{item.name}</Text>
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  {showtick2 && (
                    <Image source={require('../../../assets/tik.png')} resizeMode='contain' style={{
                      width: 20,
                      height: 20
                    }} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))} */}

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
              <CustomeButton width={170} onpress={() => onDisabilityPartnerScreen()}
                title={'Continue'} />
            </View>

          </View>
          <View style={{
            paddingTop: 5,
            // width: 310,
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


export default MediatorQuestionHaveKidsScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
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
    backgroundColor: COLORS.transparent,
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