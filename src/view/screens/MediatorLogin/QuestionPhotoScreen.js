import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import { launchImageLibrary } from 'react-native-image-picker';
import SVGImg from '../../../assets/camera.svg';


const MediatorQuestionPhotoScreen = ({ navigation, route }) => {
  const { organization, HaveKids, relationshipStatus, bio, email, DateOfBirth, name } = route.params;
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);

  const onNamePress = () => {
    // console.log(image1, image2, image3, image4, image5);
    if (image1 || image2 || image3 || image4 || image5) {
      navigation.navigate('MediatorQuestionRequestAcess', { image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, organization: organization, HaveKids: HaveKids, relationshipStatus: relationshipStatus, bio: bio, email: email, DateOfBirth: DateOfBirth, name: name })
    }
    else {
      ToastAndroid.show("Please select minimum one photo!", ToastAndroid.SHORT);
    }
  }



  const pickImage1 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage1(result.assets[0].uri);
  };
  const pickImage2 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage2(result.assets[0].uri);
  };
  const pickImage3 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage3(result.assets[0].uri);
  };
  const pickImage4 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage4(result.assets[0].uri);
  };
  const pickImage5 = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setImage5(result.assets[0].uri);
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            alignItems: 'center',
            paddingTop: 40,
          }}>
            <Text style={{
              fontSize: 20,
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
            }}>Add Minimum 1 photos</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingTop: 40,
            paddingHorizontal: 20
          }}>

            {image1 ? (
              <TouchableOpacity
                onPress={pickImage1}>
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
                  height: 150,
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
                onPress={pickImage2}>
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
                  height: 150,
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
                onPress={pickImage3}>
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
                  height: 150,
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
            paddingTop: 40,
            paddingHorizontal: 20
          }}>

            {image4 ? (
              <TouchableOpacity
                onPress={pickImage4}>
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
                  height: 150,
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
                onPress={pickImage5}>
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
                  height: 150,
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


        </View>





        <View style={styles.footer}>

          <View style={{
            alignItems: 'center',
            paddingBottom: 5,
            paddingTop: 20,
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
              <CustomeButton width={170} onpress={() => onNamePress()}
                title={'Continue'} />
            </View>
          </View>

          <View style={{
            paddingTop: 20,
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

export default MediatorQuestionPhotoScreen

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
    height: 95,
    width: '60%',
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})