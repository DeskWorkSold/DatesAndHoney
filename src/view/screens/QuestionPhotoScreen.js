import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import SVGImg from '../../assets/camera.svg';
import SVGImg1 from '../../assets/arrowleft.svg';
import ProgressBar from '../components/ProgressBar';
// import DraggableFlatList, { NestableScrollContainer, NestableDraggableFlatList, ScaleDecorator } from "react-native-draggable-flatlist"
import { DraggableGrid } from 'react-native-draggable-grid';
import { Animated } from 'react-native';
import { useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DragAbleComponent from '../components/DragAbleComponent';

const QuestionPhotoScreen = ({ navigation, route }) => {
  const { PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, secName, DateOfBirth, Gender } = route.params;
  const animatedValue = useRef(new Animated.Value(1)).current;
  const [images, setImages] = useState([
    { key: '1', uri: '' },
    { key: '2', uri: '' },
    { key: '3', uri: '' },
    { key: '4', uri: '' },
    { key: '5', uri: '' },
    { key: '6', uri: '' },
  ]);

  const removeImage = async (index) => {
    if (index != -1) {
      const newImages = [...images];
      newImages[index].uri = '';
      // console.log(newImages);
      setImages(newImages);
    }
  }

  const pickImage = async (index) => {
    // console.log(index);
    //     return
    let result = await launchImageLibrary({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    const newImages = [...images];

    if (result && result.assets && result.assets[0] && result.assets[0].uri) {
      const newImages = [...images];
      newImages[index].uri = result.assets[0].uri;
      // console.log(newImages);
      setImages(newImages);
    }
  };

  const renderItem = (item, drag) => (
    // <ScaleDecorator>
    <TouchableOpacity
      // onLongPress={drag}
      key={item?.key}
      // onPress={() => pickImage(images.indexOf(item))}
      style={styles.imageContainer}>
      {item?.uri ? (
        <Image source={{ uri: item.uri }} style={styles.image} />
      ) : (
        <>
          <Image source={require('../../assets/add.png')} style={styles.addIcon} />
          {item?.key === '1' && (
            <Text style={styles.addText}>Click to add profile image</Text>
          )}
        </>
      )}
    </TouchableOpacity>
    // </ScaleDecorator>
  );

  const onNamePress = () => {
    const selectedImages = images.filter(image => image.uri !== '').length;
    if (selectedImages >= 3 && images[0].uri) {
      const update = {
        ...route.params,
        image1: images[0].uri ?? null,
        image2: images[1].uri ?? null,
        image3: images[2].uri ?? null,
        image4: images[3].uri ?? null,
        image5: images[4].uri ?? null,
        image6: images[5].uri ?? null,
      };
      // console.log(update);
      //       return
      navigation.navigate('QuestionReligionScreen', update);
    } else {
      ToastAndroid.show(selectedImages < 3 ? "Please select minimum three images!" : "Please select profile images!", ToastAndroid.SHORT);
    }
  };

  const onDragsEnd = (data) => {
    // console.log(data);
    // return
    setImages(data)
  }

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };
  const onDragStart = () => {
    animatedValue.setValue(1);
    Animated.timing(animatedValue, {
      toValue: 3,
      duration: 400,
      useNativeDriver: true, // Add this line if you are using native driver
    }).start();
  };

  return (
    <GestureHandlerRootView style={styles?.safeAreaView}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{
            flex: 1,
          }}>
            <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
          </TouchableOpacity>
          <View style={{
            flex: 2,
            alignItems: 'center'
          }}>
            <Text style={styles.headerText}>Add Photos</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>

        <Text style={styles.subHeaderText}>Add Minimum 3 photos</Text>
        <DragAbleComponent data={images} setData={setImages} pickImage={pickImage} removeImage={removeImage} width={'100%'} />
        {/* <View style={{
          // flex:1,
          paddingTop: 100,
          justifyContent: 'center',
          height: '100%',
          // backgroundColor:'yellow'
        }}>
          <DraggableGrid
            numColumns={3}
            renderItem={renderItem}
            data={images}
            onDragRelease={(data) => {
              setImages({ data });// need reset the props data sort after drag release
            }}
          // onItemPress={() => onDragStart()}
          />
        </View> */}
      </View>
      <View style={styles.footer}>
        <CustomeButton onpress={onNamePress} title={'Continue'} />
        <Text style={styles.footerText}>By continuing you agree to our Terms and Privacy Policy.</Text>
      </View>
    </GestureHandlerRootView>
  );
};

export default QuestionPhotoScreen


const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    height: '80%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white
  },
  header: {
    alignItems: 'center',
    // paddingTop: 10,
    height: 60,
    // paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  headerText: {
    // flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 12,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  listContainer: {
    // flex: 1,
  },
  list: {
    justifyContent: 'space-between',

  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',

    // height: 180,
    // width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: COLORS.light,
    // margin: 5,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  addIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  addText: {
    fontSize: 10,
    color: 'gray',
    paddingTop: 5,
    textAlign: 'center',
  },
  footer: {
    height: '20%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
  },
});