import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';

const ParentType = [
  {
    id: '1',
    name: 'Mom born Jewish',
  },
  {
    id: '2',
    name: 'Dad born Jewish',
  },
  {
    id: '3',
    name: 'Both born Jewish',
  },
]

export const detailReligion = [
  {
    id: '1',
    name: 'Orthodox',
  }, {
    id: '2',
    name: 'Modern Orthodox',
  },
  {
    id: '3',
    name: 'Conservative',
  }, {
    id: '4',
    name: 'Reformed',
  },
  {
    id: '5',
    name: 'Just Jewish',
  }, {
    id: '6',
    name: 'Converted',

  }, {
    id: '7',
    name: 'Traditional',
  }, {

    id: '8',
    name: 'Secular',
  },

];

export const KosherTypeReligion = [
  {
    id: '1',
    name: 'Not kosher at all',

  }, {
    id: '2',
    name: 'To some degree',

  }, {
    id: '3',
    name: 'Always',

  },
  {
    id: '4',
    name: 'At Home',

  },
  {
    id: '5',
    name: 'Keep Kosher only at home eat dairy out Non=kosher restaurant',
  }
];



const MediatorQuestionMoreAboutJewishScreen = ({ navigation, route }) => {
  const { Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, PartnerNature, Nature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedParentIndex, setSelectedParentIndex] = useState(0);
  const [selectedReligionIndex, setSelectedReligionIndex] = useState(0);
  const [selectedkosherIndex, setSelectedKosherIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);

  const onDietScreen = () => {
    const ParentReligion = ParentType[selectedParentIndex].name
    const religionType = detailReligion[selectedReligionIndex].name;
    const KosherType = KosherTypeReligion[selectedkosherIndex].name;
    // console.log(religionType, KosherType, ParentReligion);

    if (ParentReligion || religionType || KosherType) {
      navigation.navigate('MediatorQuestionDietScreen', { ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: null, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Religion!", ToastAndroid.SHORT);
    }
  }

  const onJewaish = () => {
    setShowtick(!showtick)
  }
  const onJewaish2 = () => {
    setShowtick2(!showtick2)
  }
  const toggleDropdown = () => {
    setShowOptions(!showOptions);
  };
  const toggleDropdown2 = () => {
    setShowOptions2(!showOptions2);
  };


  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View style={{ height: 120 }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {detailReligion.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setSelectedReligionIndex(index)}
              >
                <View style={styles.MoreaboutReligion}>

                  <View style={{ width: '90%' }}>
                    <Text style={{ color: COLORS.black }}>{item.name}</Text>
                  </View>
                  <View style={{
                    alignItems: 'flex-end'
                  }}>
                    {selectedReligionIndex == index ? (
                      <Image source={require('../../../assets/tik.png')} resizeMode='contain' style={{
                        width: 20,
                        height: 20
                      }} />
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



  const renderDropdown2 = () => {
    if (showOptions2) {
      return (
        <View style={{ height: 120 }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {KosherTypeReligion.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => selectedkosherIndex(index)}
              >
                <View style={styles.MoreaboutReligion}>

                  <View style={{ width: '90%' }}>
                    <Text style={{ color: COLORS.black }}>{item.name}</Text>
                  </View>
                  <View style={{
                    alignItems: 'flex-end'
                  }}>
                    {selectedkosherIndex == index ? (
                      <Image source={require('../../../assets/tik.png')} resizeMode='contain' style={{
                        width: 20,
                        height: 20
                      }} />
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

  const ParentReligion = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {ParentType.map((item, index) => (
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
                  {item.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end',
              }}>
                {value == index ? (
                  <Image source={require('../../../assets/tik.png')} resizeMode='contain' style={{
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
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>

          <View style={{
            paddingTop: 40,
            paddingHorizontal: 20,
            flexDirection: 'row',
          }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '10%' }}>
              <Image source={require('../../../assets/arrowleft.png')} resizeMode='contain' />
            </TouchableOpacity>
            <View style={{ width: '80%' }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center'
              }}>More About Religion</Text>
            </View>
          </View>

          <View>
            <ParentReligion data={ParentType} value={selectedParentIndex}
              setValue={setSelectedParentIndex} cancle={require('../../../assets/cross.png')} />
          </View>

          {/* <TouchableOpacity activeOpacity={0.8} onPress={onJewaish}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  Is your mom born Jewaish
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {showtick && (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                )}
              </View>
            </View>
          </TouchableOpacity>


          <TouchableOpacity activeOpacity={0.8} onPress={onJewaish2}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>Is your dad born Jewaish</Text>
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
          </TouchableOpacity> */}


          <TouchableOpacity onPress={toggleDropdown}>
            <View style={styles.NumberInput}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Type</Text>
            </View>
          </TouchableOpacity>

          {renderDropdown()}


          <TouchableOpacity onPress={toggleDropdown2}>
            <View style={styles.NumberInput}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>How Kosher are you?</Text>
            </View>
          </TouchableOpacity>

          {renderDropdown2()}
        </View>

        {/* <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Muslim</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Hinduism</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Buddhism</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Chainese traditional religion</Text>
              </View>
            </TouchableOpacity> */}


        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          height: '10%'
        }}>
          <CustomeButton onpress={() => onDietScreen()}
            title={'Continue'} />

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


export default MediatorQuestionMoreAboutJewishScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '90%',
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