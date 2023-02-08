import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';

const ParentType = [
  {
    id: '1',
    name: 'Mom born Christian',
  },
  {
    id: '2',
    name: 'Dad born Christian',
  },
  {
    id: '3',
    name: 'Both born Christian',
  },
]

export const detailReligion = [
  {
    id: '1',
    name: 'Anglican',
  }, {
    id: '2',
    name: 'Aposotlic',
  },
  {
    id: '3',
    name: 'Assembly of God',
  }, {
    id: '4',
    name: 'Baptist',
  },
  {
    id: '5',
    name: 'Catholic',
  }, {
    id: '6',
    name: 'Christian Reformed',

  }, {
    id: '7',
    name: 'Church of Christ',
  }, {

    id: '8',
    name: 'Episcopalian/ Anglican',
  }, {
    id: '9',
    name: 'Evangelical',

  }, {
    id: '10',
    name: 'Interdenominal',

  }, {
    id: '11',
    name: 'Lutheran',

  },
  {
    id: '12',
    name: 'Messianic',

  },
  {
    id: '13',
    name: 'Methodist',

  },
  {
    id: '14',
    name: 'Nazarene',

  },
  {
    id: '14',
    name: 'Non-denominational',

  },
  {
    id: '14',
    name: 'Not sure',

  },
  {
    id: '14',
    name: 'Orthodox',

  },
  {
    id: '14',
    name: 'Pentecostal',

  },
  {
    id: '14',
    name: 'Presbyterian',

  },
  {
    id: '14',
    name: 'Seventh-Day Adventist',

  },
  {
    id: '14',
    name: 'Southern Baptist',

  },

]



const QuestionMoreAboutChristianScreen = ({ navigation, route }) => {
  const { Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, PartnerNature, Nature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedParentIndex, setSelectedParentIndex] = useState(0);
  const [selectedReligionIndex, setSelectedReligionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);

  const onDietScreen = () => {
    const ParentReligion = ParentType[selectedParentIndex].name
    const religionType = detailReligion[selectedReligionIndex].name;
    console.log(religionType, ParentReligion);

    if (ParentReligion || religionType) {
      navigation.navigate('QuestionDietScreen', { ParentReligion: ParentReligion, religionType: religionType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Religion!", ToastAndroid.SHORT);
    }
  }

  const onChristian = () => {
    setShowtick(!showtick)
  }
  const onChristian2 = () => {
    setShowtick2(!showtick2)
  }
  const toggleDropdown = () => {
    setShowOptions(!showOptions);
  };


  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View style={{ height: 300 }}>
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
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>

          <View style={{
            paddingTop: 40,
            paddingHorizontal: 20,
            flexDirection: 'row',
          }}>
            <TouchableOpacity onPress={() => navigation.goBack()}  style={{ width: '10%' }}>
              <Image source={require('../../assets/arrowleft.png')} resizeMode='contain' />
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
              setValue={setSelectedParentIndex} cancle={require('../../assets/cross.png')} />
          </View>



          {/* <TouchableOpacity activeOpacity={0.8} onPress={onChristian}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  Is your mom born Christian
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


          <TouchableOpacity activeOpacity={0.8} onPress={onChristian2}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>Is your dad born Christian</Text>
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
          height: '15%'
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


export default QuestionMoreAboutChristianScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '85%',
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