import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';

const MusicData = [
  {
    id: '1',
    name: 'Country',
  },
  {
    id: '2',
    name: 'Hip Hop',
  },
  {
    id: '3',
    name: 'Classical',
  },
  {
    id: '4',
    name: 'Electric',
  },
  {
    id: '5',
    name: 'Rock',
  },
  {
    id: '6',
    name: 'Intrenational Music',
  },
  {
    id: '7',
    name: 'Ethnic Music',
  },
  {
    id: '8',
    name: 'Rap',
  },
  {
    id: '9',
    name: 'Etc',
  },
]

const MediatorQuestionMusicScreen = ({ navigation, route }) => {
  const { name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [music, setmusic] = useState();

  const onPoliticalview = () => {
    console.log(MusicData[selectedCategoryIndex].name);
    const selectedMusic = MusicData[selectedCategoryIndex].name;
    if(selectedMusic){
      navigation.navigate('MediatorQuestionPoliticalviewScreen', { Music: selectedMusic, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else{
      ToastAndroid.show("Please select your music!", ToastAndroid.SHORT);
    }
  }

  const ListMusic = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {MusicData.map((music, index) => (
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
                  {music.name}
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
            <Image source={require('../../../assets/music.png')}
              resizeMode='contain' />
          </View>


          <View style={{
            alignItems: 'center',
            paddingTop: 10,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>What type of music you like to listen too?</Text>
          </View>

          <View style={{
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 12,
              color: COLORS.black
            }}>(Select all that apply)</Text>
          </View>

        </View>


        <View style={styles.footer}>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <ListMusic data={MusicData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
            </View>

            <View style={{
              alignItems: 'center'
            }}>
              <View style={{
                paddingTop: 50,
              }}>
                <View style={{ marginHorizontal: 5 }}>
                  <CustomeButton onpress={() => onPoliticalview()}
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

export default MediatorQuestionMusicScreen

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
    alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 10,
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