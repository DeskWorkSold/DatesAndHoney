import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { selectUser } from '../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
const {width , height} = Dimensions.get('window')

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



const DateServayScreen = ({ navigation, route }) => {
  const { ProposalId } = route?.params
  // console.log(ProposalId);
  const [ServayCategory, setServayCategory] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);

  const [LisrtPros, setListPros] = useState(false);
  const [listCons, setListCons] = useState(false);
  const [acceptedProposal, setAcceptedProposal] = useState();
  const Currentuser = useSelector(selectUser);




  const onChristian = () => {
    setShowtick(!showtick)
  }
  const onChristian2 = () => {
    setShowtick2(!showtick2)
  }
  const toggleDropdown = (status) => {

    console.log(status);
    setShowtick(!showtick)
    setShowOptions(!showOptions);
  };

  const toggleDropdown2 = (status) => {
    console.log(status);

    setShowtick2(!showtick2)
  };

  const onCongratsScreen = (ProposalId) => {
    if (ServayCategory == 'No, I do not want to go next') {
      // console.log(acceptedProposal);
      if (!LisrtPros) {
        ToastAndroid.show(`Please enter pros.`, ToastAndroid.SHORT)
      }
      else if (!listCons) {
        ToastAndroid.show(`Please enter cons.`, ToastAndroid.SHORT)
      }
      else {
        let Data = new Object();
        Data.Category = ServayCategory;
        Data.LisrtPros = LisrtPros;
        Data.listCons = listCons;

        const test = [];
        acceptedProposal.map(a => {
          if (a?._id != ProposalId) {
            test.push(a);
          }
          else {
            const updateAccepted = {
              ...a,
              Reviews: Data
            }
            test.push(updateAccepted);
          }
        })
        console.log(test);

        if (!test.length == 0) {
          try {
            firestore()
              .collection('Proposals')
              .doc(Currentuser.uid)
              .set({
                Proposals: test,
              }, { merge: true })
              .then(() => {
                console.log('review updated');
                navigation.navigate('CongratsServayScreen')
                ToastAndroid.show(`Review Update.`, ToastAndroid.SHORT)
              })
          }
          catch (e) {
            console.log('Error', e);
          }
        }
      }

    }
    else {

      let Data = new Object();
      Data.Category = ServayCategory;

      const test = [];
      acceptedProposal.map(a => {
        if (a?._id != ProposalId) {
          test.push(a);
        }
        else {
          const updateAccepted = {
            ...a,
            Reviews: Data
          }
          test.push(updateAccepted);
        }
      })
      // console.log(test);

      if (!test.length == 0) {
        try {
          firestore()
            .collection('Proposals')
            .doc(Currentuser.uid)
            .set({
              Proposals: test,
            }, { merge: true })
            .then(() => {
              console.log('review updated');
              navigation.navigate('CongratsServayScreen')
              ToastAndroid.show(`Review Update.`, ToastAndroid.SHORT)
            })
        }
        catch (e) {
          console.log('Error', e);
        }
      }

    }

  }


  const fetchProposal = async () => {
    await
      firestore().collection('Proposals')
        .doc(Currentuser.uid)
        .onSnapshot((querySnap) => {
          // console.log(docSnapshot.data());
          const Proposals = [];
          const yourArrivald = []
          if (querySnap.data()) {
            querySnap.data().Proposals?.map(item => {
              // console.log('===>',item);
              Proposals.push(item);
            })
          }
          setAcceptedProposal(Proposals)
        })
  }


  useEffect(() => {
    fetchProposal()
  }, [])

  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View style={{
          paddingHorizontal: 20
        }}>
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
                  value={LisrtPros}
                  onChangeText={LisrtPros => setListPros(LisrtPros)
                  }
                  // onChangeText=()
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
                  value={listCons}
                  onChangeText={listCons => setListCons(listCons)
                  }
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
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
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
              }}>After date survey
              </Text>
            </View>

            <View style={{
              alignItems: 'center',
              paddingTop: 20,
              paddingHorizontal: 70,
            }}>
              <Text style={{
                textAlign: 'center'
              }}>Would you go out on a second date
                with this person?
              </Text>
            </View>

            <TouchableOpacity onPress={() => { toggleDropdown2('Yes, i want to go next'), setServayCategory('Yes, i want to go next') }}>
              <View style={styles.NumberInput}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Yes, i want to go next</Text>
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  {showtick2 && (
                    <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                      width: 20,
                      height: 20
                    }} />
                  )}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { toggleDropdown('No, I do not want to go next'), setServayCategory('No, I do not want to go next') }}>
              <View style={styles.NumberInput}>
                <View style={{ width: '90%' }}>
                  <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>No, I do not want to go next</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{
              marginHorizontal: 20
            }}>
              {renderDropdown()}
            </View>

            <View style={{
              alignItems: 'center',
              paddingBottom: 5,
              paddingTop: 80
            }}>
              <CustomeButton onpress={() => onCongratsScreen(ProposalId)}
                title={'Next'} />
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}


export default DateServayScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: COLORS.white
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
    width: width /1.2,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: width/1.2,
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