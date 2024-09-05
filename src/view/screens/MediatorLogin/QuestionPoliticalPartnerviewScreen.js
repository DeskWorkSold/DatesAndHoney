import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';

const PoliticalData = [
  {
    id: '1',
    name: 'Any',
  },
  {
    id: '2',
    name: 'Conservative',
  },
  {
    id: '3',
    name: 'Liberal',
  },
  {
    id: '4',
    name: 'Libertarians',
  },
  {
    id: '5',
    name: 'Non Political',
  },
  {
    id: '6',
    name: 'Middle of the Road',
  },
]

const MediatorQuestionPoliticalPartnerviewScreen = ({ navigation, route }) => {
  const { name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView } = route.params;
  const [politicalpartner, setpoliticalpartner] = useState();
  // console.log(PoliticalView);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);


  const onIntroandExtro = () => {
    console.log(PoliticalData[selectedCategoryIndex].name);
    const selectedPolitics = PoliticalData[selectedCategoryIndex].name;
    if(selectedPolitics){
      navigation.navigate('MediatorQuestionIntroandExtroScreen', { PoliticalPartnerView: selectedPolitics, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else{
      ToastAndroid.show("Please select Partner Political view!", ToastAndroid.SHORT);
    }
  }


  const ListPolitics = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {PoliticalData.map((political, index) => (
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
                  {political.name}
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
            paddingTop: 20,
          }}>
            <Image source={require('../../../assets/vote.png')}
              resizeMode='contain' style={{
                width: 180,
                height: 180
              }} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 50,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Which Political views are you okay with dating?</Text>
            <Text style={{
              color: COLORS.black,
              textAlign: 'center',
            }}>(Select all that apply)</Text>
          </View>

          {/* <View style={{
            alignItems: 'center',
            paddingHorizontal: 50,
          }}>
            
          </View> */}
        </View>


        <View style={styles.footer}>

          <ScrollView showsVerticalScrollIndicator={false}>

            <View>
              <ListPolitics data={PoliticalData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
            </View>

            <View style={{
              alignItems: 'center'
            }}>

              <View style={{
                paddingTop: 60,
              }}>
                <View style={{ marginHorizontal: 5 }}>
                  <CustomeButton onpress={() => onIntroandExtro()}
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
          </ScrollView>

        </View>


      </View>



    </SafeAreaView>
  )
}

export default MediatorQuestionPoliticalPartnerviewScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '40%',
    alignItems: 'center',
  },
  footer: {
    height: '60%',
    alignItems: 'center',
    paddingTop: 20,
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