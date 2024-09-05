import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import SVGImg from '../../../assets/camera.svg';
import SVGImg1 from '../../../assets/arrowleft.svg';
import ProgressBar from '../../components/ProgressBar';
const {height , width} = Dimensions.get('window')


const SelectionOneQuestionPhotoScreen = ({ navigation, route }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  // console.log(route.params);
  //      
  // console.log(user);
  const onNamePress = () => {
    // console.log(imageArray?.length );
    // return
    if (imageArray?.length >= 3) {

      const update = {
        ...route?.params,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4,
        image5: image5,
        selection1: route?.params?.selection1 + 1,
      }
      navigation.navigate('SelectionOneQuestionReligionScreen', update)
    }
    else {
      ToastAndroid.show("Please select minimum three images!", ToastAndroid.SHORT);
    }
  }



  const pickImage1 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    if (result.assets[0].uri) {
      const newSelectedItems = [...imageArray, result.assets[0].uri];
      setImageArray(newSelectedItems);
    }
    setImage1(result.assets[0].uri);
  };
  const pickImage2 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    if (result.assets[0].uri) {
      const newSelectedItems = [...imageArray, result.assets[0].uri];
      setImageArray(newSelectedItems);
    }
    setImage2(result.assets[0].uri);
  };
  const pickImage3 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    if (result.assets[0].uri) {
      const newSelectedItems = [...imageArray, result.assets[0].uri];
      setImageArray(newSelectedItems);
    }
    setImage3(result.assets[0].uri);
  };
  const pickImage4 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    if (result.assets[0].uri) {
      const newSelectedItems = [...imageArray, result.assets[0].uri];
      setImageArray(newSelectedItems);
    }
    setImage4(result.assets[0].uri);
  };
  const pickImage5 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    if (result.assets[0].uri) {
      const newSelectedItems = [...imageArray, result.assets[0].uri];
      setImageArray(newSelectedItems);
    }
    setImage5(result.assets[0].uri);
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 20,
            height:60,
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

          <ProgressBar progress={'28.6'} />

          <View style={{
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Add Photos</Text>
          </View>

          <View style={{
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 12,
              color: COLORS.black
            }}>Add Minimum 3 photos</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingTop: 40,
            paddingHorizontal:20,
          }}>

            {image1 ? (
              <TouchableOpacity
                onPress={pickImage1}
                style={{
                  height: height/5.2,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  marginHorizontal: 10,
                }}>
                <Image source={{ uri: image1 }} style={{
                  height: 150,
                  width: 90,
                  marginHorizontal: 10,
                  resizeMode: 'cover'
                }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={pickImage1}
                style={{
                  height: height/5.2,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  marginHorizontal: 10,
                }}>
                <SVGImg width={30.5} height={25.5} />
              </TouchableOpacity>
            )}

            {image2 ? (
              <TouchableOpacity
                onPress={pickImage2}
                style={{
                  height: height/5.2,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  marginHorizontal: 10,
                }}>
                <Image source={{ uri: image2 }} style={{
                  height: 150,
                  width: 90,
                  marginHorizontal: 10,
                  resizeMode: 'cover'
                }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={pickImage2}
                style={{
                  height: height/5.2,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  marginHorizontal: 10,
                }}>
                <SVGImg width={30.5} height={25.5} />
              </TouchableOpacity>
            )}


            {image3 ? (
              <TouchableOpacity
                onPress={pickImage3}
                style={{
                  height: height/5.2,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  marginHorizontal: 10,
                }}>
                <Image source={{ uri: image3 }} style={{
                  height: 150,
                  width: 90,
                  marginHorizontal: 10,
                  resizeMode: 'cover'
                }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={pickImage3}
                style={{
                  height: height/5.2,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  marginHorizontal: 10,
                }}>
                <SVGImg width={30.5} height={25.5} />
              </TouchableOpacity>
            )}

          </View>

          <View style={{
            flexDirection: 'row',
            paddingTop: 20,
            paddingHorizontal:20,
          }}>

            {image4 ? (
              <TouchableOpacity
                onPress={pickImage4}
                style={{
                  height: height/5.2,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  marginHorizontal: 10,
                }}>
                <Image source={{ uri: image4 }} style={{
                  height: 150,
                  width: 90,
                  marginHorizontal: 10,
                  resizeMode: 'cover'
                }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={pickImage4}
                style={{
                  height: height/5.2,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  marginHorizontal: 10,
                }}>
                <SVGImg width={30.5} height={25.5} />
              </TouchableOpacity>
            )}

            {image5 ? (
              <TouchableOpacity
                onPress={pickImage5}
                style={{
                  height: height/5.2,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  marginHorizontal: 10,
                }}>
                <Image source={{ uri: image5 }} style={{
                  height: 150,
                  width: 90,
                  marginHorizontal: 10,
                  resizeMode: 'cover'
                }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={pickImage5}
                style={{
                  height: height/5.2,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.light,
                  marginHorizontal: 10,
                }}>
                <SVGImg width={30.5} height={25.5} />
              </TouchableOpacity>
            )}
          </View>
          </ScrollView>

        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
            flexDirection: 'row'
          }}>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton onpress={() => onNamePress()}
                title={'Continue'} />
            </View>

          </View>

          <View style={{
            paddingTop: 20,
            width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10,color:COLORS.gray }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>



    </SafeAreaView>
  )
}

export default SelectionOneQuestionPhotoScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '80%',
  },
  footer: {
    height: '20%',
    alignItems: 'center'
  },
  NumberInput: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    height:height/8,
    width: '60%',
    backgroundColor: COLORS.main,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})