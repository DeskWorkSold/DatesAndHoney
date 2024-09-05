import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import CustomeButton from '../../../components/CustomeButton';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
const { width, height } = Dimensions.get("window");


const CoordinatorBtn = [
  {
    id: '1',
    name: 'News Feed',
  },
  {
    id: '2',
    name: 'Training Pages',
  }
];
const ArticalDetailScreen = ({ navigation, route }) => {
  const { details } = route.params;
  const mediatoruser = useSelector(selectMediatorUser)
  const [coordinatorBtn, setCoordinatorBtn] = useState('News Feed');
  const [value, setValueIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [newArticals, setNewArticals] = useState(null);

  const onRead = async () => {
    const data = new Object();
    data.uid = details.uid
    data.status = 'read'
    // console.log(data);
    setUploading(true)
    await firestore()
      .collection('Users').doc(mediatoruser?.userDetails?.uid).update({
        Articals: firestore.FieldValue.arrayUnion({
          ReadArticals: data
        }),
      })
      .then(() => {
        setUploading(false)
        ToastAndroid.show("Artical completed!", ToastAndroid.SHORT);
        navigation.goBack()
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.contentContainer}>
          <View style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingHorizontal: 60,
          }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
            }}>
              View news feed and
              training pages.
            </Text>
          </View>
          <View style={{
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 12,
            }}>
              (In min time)
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
          // stickyHeaderIndices={[0]}
          >
            {/* <TouchableOpacity style={{
              // position: 'absolute',
              width: 100,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.green,
            }}>
              <Text style={{
                color: COLORS.black,
                fontSize: 12,
              }}>12 : 44s</Text>
            </TouchableOpacity> */}
            <View
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 20,
              }}>
              <View style={{
                paddingTop: 30,
              }}>
                <Image source={{ uri: details.image }} resizeMode='cover'
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 10,
                  }} />
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                alignItems: 'center',
                // flex: 1
              }}>
                <View style={{
                  // flex: 2
                  width: '75%'
                  // backgroundColor:COLORS.gray
                }}>
                  <Text style={{
                    fontSize: 20,
                    color: COLORS.black,
                    marginRight: 10,
                    fontWeight: 'bold'
                  }}>{details.title}</Text>
                </View>
                <View style={{
                  // flex:1
                  // width: widths / 0.5,
                  alignItems: 'flex-end',
                  // justifyContent:'center',
                  // backgroundColor:COLORS.gray
                }}>
                  <Text style={{
                    fontSize: 10,
                    color: COLORS.gray2,
                  }}>{details.timeStamp}</Text>
                </View>
              </View>
              <View style={{
                flexDirection: 'row',
                // paddingHorizontal: 10,
                paddingBottom: 10,
                justifyContent: 'space-between'
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <View style={{
                    marginRight: 10,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      // fontWeight: 'bold',
                      color: COLORS.black
                    }}>
                      Description
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={{
                  fontSize: 13,
                }}>
                  {details.Description}
                </Text>
              </View>
              <View style={{
                paddingVertical: 20,
                marginBottom: 300,
              }}>
                {!uploading == true ?
                  <CustomeButton title={'Mark as completed'} bcolor={COLORS.black} color={COLORS.white} onpress={() => onRead()} />
                  :
                  <View style={{
                    backgroundColor: COLORS.black,
                    width: 350,
                    height: 50,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{
                      color: COLORS.white
                    }}>Please wait...</Text>
                  </View>
                }
              </View>
            </View>
          </ScrollView>
        </View>
        <Loader modal={uploading} uploading={uploading} />
      </View>
    </SafeAreaView >
  )
}

export default ArticalDetailScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    // justifyContent:'center'
  },
  contentContainer: {
    // flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})