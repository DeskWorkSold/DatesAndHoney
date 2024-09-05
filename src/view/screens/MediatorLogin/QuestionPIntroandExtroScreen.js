import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';

const IntroExtroData = [
  {
    id: '1',
    name: 'Introvert',
  },
  {
    id: '2',
    name: 'Extrovert',
  },
  {
    id: '3',
    name: 'Doesnt matter',
  },
]

const MediatorQuestionPIntroandExtroScreen = ({ navigation, route }) => {
  const { name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, IntroandExtro } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const onTypeofRelation = () => {
    console.log(IntroExtroData[selectedCategoryIndex].name);
    const selectedPolitics = IntroExtroData[selectedCategoryIndex].name;
    if(selectedPolitics){
      navigation.navigate('MediatorQuestionTypeofRelationScreen', { PartnerNature: selectedPolitics, Nature: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else{
      ToastAndroid.show("Please select your partner nature!", ToastAndroid.SHORT);
    }
  }


  const ListPIntroExtro = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {IntroExtroData.map((item, index) => (
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
          }}>
            <Image source={require('../../../assets/group.png')}
              resizeMode='contain' />
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
              textAlign: 'center',
            }}>Would you be open to date introvert/extrovert?</Text>
          </View>

          <View style={{
            alignItems: 'center',
            paddingHorizontal: 70,
          }}>
            <Text style={{
              color: COLORS.black,
              textAlign: 'center',
            }}>(select all that apply)</Text>
          </View>

          <View style={{
            paddingTop: 20
          }}>
            <View>
              <ListPIntroExtro data={IntroExtroData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
            </View>
          </View>

        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 60,
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton onpress={() => onTypeofRelation()}
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

export default MediatorQuestionPIntroandExtroScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%',
    alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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