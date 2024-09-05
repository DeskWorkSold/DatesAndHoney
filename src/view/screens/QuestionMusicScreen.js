import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';

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

const QuestionMusicScreen = ({ navigation, route }) => {
  const { email, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [music, setmusic] = useState();
  // console.log(filterMinAge, filterMaxAge , InTenYear);

  const onPoliticalview = () => {
    console.log(MusicData[selectedCategoryIndex].name);
    const selectedMusic = MusicData[selectedCategoryIndex].name;
    if (selectedMusic) {
      navigation.navigate('QuestionPoliticalviewScreen', { Music: selectedMusic, email: email, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your music!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionPoliticalviewScreen', { Music: null, email: email, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
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
                  <SVGImg width={20} height={20} />
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
            alignItems: 'center',
            paddingTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 20,

          }}>
            <View style={{
              flex: 1,
              // backgroundColor: COLORS.gray2
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              flex: 2,
              // backgroundColor: COLORS.gray,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 20
            }}>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: COLORS.gray2
            }}>
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.footer}>

            <View style={{
              paddingTop: 10,
            }}>
              <Image source={require('../../assets/music.png')}
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



            <View style={{
              // alignItems: 'center'
            }}>
              <ListMusic data={MusicData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>

            <View style={{
              alignItems: 'center',
              paddingBottom: 20
            }}>
              <View style={{
                paddingTop: 50,
              }}>
                <View style={{ marginBottom: 5 }}>
                  <CustomeButton onpress={() => onPoliticalview()}
                    title={'Continue'} />
                </View>
                <View style={{ marginHorizontal: 0 }}>
                  <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
                    title={'Skip'} />
                </View>

              </View>

              <View style={{
                paddingTop: 5,
              }}>
                <Text style={{ textAlign: 'center', fontSize: 10 }}>
                  By continue you agree our Terms and Privacy Policy.
                </Text>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>



    </SafeAreaView >
  )
}

export default QuestionMusicScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '40%',
    alignItems: 'center',
  },
  footer: {
    // height: '60%',
    // alignItems: 'center'
    alignSelf:'center',
    marginBottom:90
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