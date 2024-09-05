import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';


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
const FeedScreen = ({ navigation }) => {
  const MediatorUser = useSelector(selectMediatorUser);
  const [coordinatorBtn, setCoordinatorBtn] = useState('News Feed');
  const [value, setValueIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [newArticals, setNewArticals] = useState(null);
  // console.log(MediatorUser.Articals);

  const handleSlide = (index) => {
    // console.log('slide');
    setValueIndex(index)
    const viewPage = CoordinatorBtn[index].name
    setCoordinatorBtn(viewPage);
  };


  const fetchArticals = async () => {
    setUploading(true)
    await firestore()
      .collection('articals')
      .onSnapshot(querySnapshot => {
        const artical = [];
        querySnapshot.forEach((documentSnapshot) => {
          const data = documentSnapshot.data();
          if (MediatorUser.Articals) {
            MediatorUser?.Articals?.map(docsnap => {
              if (data.uid == docsnap.ReadArticals.uid) {
                let pdate = data?.timeStamp.toDate().toDateString();
                let readStatus = true;
                const test = {
                  ...data,
                  timeStamp: pdate,
                  readStatus: readStatus,
                }
                artical.push(test);
                // console.log(test);
              }
              else if (data.uid != docsnap.ReadArticals.uid) {
                console.log('test');
                let pdate = data?.timeStamp.toDate().toDateString();
                const test = {
                  ...data,
                  timeStamp: pdate,
                }
                artical.push(test);
              }
            })
          }
          else {
            let pdate = documentSnapshot.data()?.timeStamp.toDate().toDateString();

            const data2 = {
              ...data,
              timeStamp: pdate,
            }
            artical.push(data2);
          }
        })
        let uniqueArr = artical.filter((obj, index, self) =>
          index === self.findIndex((t) => (
            t.uid === obj.uid
          ))
        );
        setNewArticals(uniqueArr)
        console.log(uniqueArr)
      })
    setUploading(false)
  }
  useEffect(() => {
    fetchArticals();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>

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


          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: "space-between",
            width: '100%',
            paddingVertical: 20,
            borderRadius: 10,
            paddingHorizontal: 20,
          }}>
            {CoordinatorBtn.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSlide(index)}
                style={{
                  // flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  width: '50%',
                  borderBottomColor: value == index ? COLORS.bluedark : COLORS.gray2,
                  // borderRadius: 10,
                  height: 46,
                  // backgroundColor: value == index ? COLORS.main : COLORS.light
                }}
              >
                <Text style={{
                  fontFamily: '',
                  color: value == index ? COLORS.bluedark : COLORS.gray2,
                }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>



          {coordinatorBtn == 'News Feed' ?
            <View style={{
              paddingHorizontal: 20,
              height: '100%'
            }}>
              <View style={{
                paddingBottom: 20,
              }}>
                <Text style={{
                  color: COLORS.black,
                }}>
                  The Hottest News
                </Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                  marginBottom: 600
                }}>
                  {newArticals ?
                    <>
                      {newArticals.map((item, index) => (
                        <View
                          key={index}
                          // onPress={() => onEventDeatilsScreen({ item })}
                          // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                          activeOpacity={0.7}
                          style={{
                            backgroundColor: COLORS.white,
                            elevation: 2,
                            borderRadius: 10,
                            // borderWidth: 1,
                            // marginLeft: 20,
                            marginRight: 5,
                            marginBottom: 20,
                            width: '100%',
                            // marginHorizontal:10,
                          }}>
                          <View>
                            <Image source={{ uri: item.image }} resizeMode='cover'
                              style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 10,
                              }} />
                          </View>
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                            alignItems: 'center',
                            flex: 1
                          }}>
                            <View style={{
                              // flex: 2
                              width: '70%'
                              // backgroundColor:COLORS.gray
                            }}>
                              <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                marginRight: 10,
                              }}>{item.title}</Text>
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
                              }}>{item.timeStamp}</Text>
                            </View>
                          </View>
                          <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
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
                                <Image source={{ uri: item.AutherImage }} style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 20,
                                }} />
                              </View>
                              <View style={{
                                // width: width / 1.2
                              }}>
                                <Text style={{
                                  color: COLORS.black,
                                  fontSize: 12
                                }}>{item.AutherName}</Text>
                              </View>
                            </View>
                            <View style={{
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {item.readStatus ?
                                <TouchableOpacity
                                  onPress={() => navigation.navigate('ArticalDetailScreen', { details: item })}
                                  style={{
                                    padding: 5,
                                    paddingHorizontal: 10,
                                    backgroundColor: COLORS.green,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                  }}>
                                  <Text style={{ fontSize: 12, color: COLORS.white }}>Completed</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                  onPress={() => navigation.navigate('ArticalDetailScreen', { details: item })}
                                  style={{
                                    padding: 5,
                                    paddingHorizontal: 10,
                                    backgroundColor: COLORS.main,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                  }}>
                                  <Text style={{ fontSize: 12, color: COLORS.black }}>Start reading</Text>
                                </TouchableOpacity>
                              }
                            </View>
                          </View>
                        </View>
                      ))}
                    </>
                    :
                    <View style={{
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      paddingTop: 20,
                    }}>
                      <ActivityIndicator size="large" color={COLORS.black} animating={uploading} />
                    </View>
                  }
                </View>
              </ScrollView>
            </View>
            :
            <View style={{
              paddingHorizontal: 20,
              height: '100%'
            }}>
              <View style={{
                paddingBottom: 20,
              }}>
                <Text style={{
                  color: COLORS.black,
                }}>
                  The Hottest News
                </Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                  marginBottom: 300
                }}>
                  {newArticals.map((item, index) => (
                    <View
                      key={index}
                      // onPress={() => onEventDeatilsScreen({ item })}
                      // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                      style={{
                        backgroundColor: COLORS.white,
                        elevation: 2,
                        borderRadius: 10,
                        // borderWidth: 1,
                        // marginLeft: 20,
                        marginRight: 5,
                        marginBottom: 20,
                        width: '100%',
                        // marginHorizontal:10,
                      }}>
                      <View>
                        <Image source={{ uri: item.image }} resizeMode='cover'
                          style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 10,
                          }} />
                      </View>
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                        alignItems: 'center',
                        flex: 1
                      }}>
                        <View style={{
                          // flex: 2
                          width: '70%'
                          // backgroundColor:COLORS.gray
                        }}>
                          <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                            marginRight: 10,
                          }}>{item.title}</Text>
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
                          }}>{item.timeStamp}</Text>
                        </View>
                      </View>
                      <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
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
                            <Image source={{ uri: item.AutherImage }} style={{
                              width: 20,
                              height: 20,
                              borderRadius: 20,
                            }} />
                          </View>
                          <View style={{
                            // width: width / 1.2
                          }}>
                            <Text style={{
                              color: COLORS.black,
                              fontSize: 12
                            }}>{item.AutherName}</Text>
                          </View>
                        </View>
                        <View style={{
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('ArticalDetailScreen', { details: item })}

                            style={{
                              padding: 5,
                              paddingHorizontal: 10,
                              backgroundColor: COLORS.main,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 10,
                            }}>
                            <Text style={{ fontSize: 12, color: COLORS.black }}>Start reading</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          }
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FeedScreen

const styles = StyleSheet.create({})