import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabTwo from '../components/HeaderTabTwo';
import { useDispatch, useSelector } from 'react-redux';
import { packages, selectUser } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';


const ProfileScreen = ({ navigation }) => {
  const [memberships, setMemberships] = useState();
  const [membershipUid, setMembershipUid] = useState();
  const [uploading, setUploading] = useState(false);
  const [buyPack, setBuyPack] = useState(false);
  const user = useSelector(selectUser);
  // console.log(user.uid);
  const dispatch = useDispatch();

  const fetchMemberships = async () => {
    setUploading(true)
    try {
      // console.log('hello');
      await firestore()
        .collection('Package')
        .get()
        .then(querySnapshot => {
          // console.log('Total user: ', querySnapshot.size);
          const membership = [];
          const membershipsuid = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log('memberships ID: ', documentSnapshot.id, documentSnapshot.data());
            membership.push(documentSnapshot.data());
            membershipsuid.push(documentSnapshot.id);
          });
          setMemberships(membership)
          setMembershipUid(membershipsuid)
        })
      // console.log('membershipData: ', memberships);

    } catch (e) {
      console.log(e);
    }
    setUploading(false)
  };

  const ByMemeberShips = (item) => {
    var Data = new Object();
    Data.discountPercentage = item.discountPercentage;
    Data.discountPrice = item.discountPrice;
    Data.id = item.id;
    Data.name = item.name;
    Data.numberOfCards = item.numberOfCards;
    Data.numberOfChats = item.numberOfChats;
    Data.otherCategory = item.otherCategory;
    Data.rate = item.rate;
    Data.status = item.status;
    console.log('test data: ', Data);
    dispatch(packages(Data))
    // console.log(item.id);
    const MembershipName = item.otherCategory.split(' ')[0]
    // console.log(MembershipName);
    const useRef = firestore().collection('Users')
      .doc(user.uid)
    useRef.update({
      'userDetails.AccountType': MembershipName,
      'userDetails.PackageId': item.id,
    }).then(() => {
      setBuyPack(true)
      // console.log('Notices send!');
    });
  }


  useEffect(() => {
    fetchMemberships();
  }, []);



  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <HeaderTabTwo onpress={() => navigation.navigate('SettingScreen')} />
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={{
            marginBottom: 200,
            backgroundColor: COLORS.white,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingBottom: 20
            }}>
              <View style={{
                borderWidth: 3,
                borderColor: COLORS.main,
                borderRadius: 50
              }}>
                {user ? (
                  <Image source={{ uri: user.image1 }} resizeMode='contain' style={{
                    borderRadius: 50,
                    width: 80,
                    height: 80
                  }} />
                ) : (
                  <Image source={require('../../assets/profile1.png')} resizeMode='contain' style={{
                    borderRadius: 30,
                    width: 80,
                    height: 80
                  }} />
                )}
              </View>
              <View style={{
                paddingHorizontal: 20,
                justifyContent: 'center'
              }}>
                {user ? (
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: COLORS.black
                  }}>{user.Name}</Text>
                ) : (
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: COLORS.black
                  }}>Jan dohn</Text>
                )}
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.light,
                  borderRadius: 5,
                  width: '80%',
                  padding: 5
                }}>
                  <Image source={require('../../assets/dates.png')} resizeMode='contain'
                    style={{
                      marginHorizontal: 5,
                      width: 20,
                      height: 20
                    }} />
                  <Text style={{ color: COLORS.black, fontSize: 13 }}>Want to date</Text>
                </View>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between'
            }}>
              <View>
                {user ? (
                  <Image source={{ uri: user.image1 }}
                    resizeMode='cover'
                    style={{
                      width: 220,
                      height: 200,
                      borderRadius: 10
                    }} />
                ) : (
                  <Image source={require('../../assets/profile6.png')} resizeMode='cover'
                    style={{
                      width: 220,
                      height: 200,
                      borderRadius: 10
                    }} />
                )}
              </View>
              <View style={{
                justifyContent: 'space-between'
              }}>
                <View>
                  {user ? (
                    <Image source={{ uri: user.image1 }} resizeMode='cover'
                      style={{
                        height: 95,
                        width: 120,
                        borderRadius: 10
                      }} />
                  ) : (
                    <Image source={require('../../assets/profile2.png')} resizeMode='cover'
                      style={{
                        height: 95,
                        width: 120,
                        borderRadius: 10
                      }} />
                  )}
                </View>
                <View>
                  {user ? (
                    <Image source={{ uri: user.image1 }} resizeMode='cover'
                      style={{
                        height: 95,
                        width: 120,
                        borderRadius: 10
                      }} />
                  ) : (
                    <Image source={require('../../assets/profile3.png')} resizeMode='cover'
                      style={{
                        height: 95,
                        width: 120,
                        borderRadius: 10
                      }} />
                  )}
                </View>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              paddingTop: 10
            }}>
              <View>
                {user ? (
                  <Image source={{ uri: user.image1 }} resizeMode='cover'
                    style={{
                      height: 95,
                      width: 110,
                      borderRadius: 10
                    }} />
                ) : (
                  <Image source={require('../../assets/profile4.png')} resizeMode='cover'
                    style={{
                      height: 95,
                      width: 110,
                      borderRadius: 10
                    }} />
                )}
              </View>
              <View>
                {user ? (
                  <Image source={{ uri: user.image1 }} resizeMode='cover'
                    style={{
                      height: 95,
                      width: 110,
                      borderRadius: 10
                    }} />
                ) : (
                  <Image source={require('../../assets/profile5.png')} resizeMode='cover'
                    style={{
                      height: 95,
                      width: 110,
                      borderRadius: 10
                    }} />
                )}
              </View>
              <View style={{
                backgroundColor: COLORS.mainlight,
                height: 95,
                width: 110,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10
              }}>
                <TouchableOpacity>
                  <Image source={require('../../assets/add.png')} resizeMode='contain'
                    style={{
                      borderRadius: 10
                    }} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 20
            }}>
              <View style={{
                flexDirection: 'row',
                backgroundColor: COLORS.white,
                elevation: 5,
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignItems: 'center',
                height: 70,
                width: '49%'
              }}>
                <View>
                  <Image source={require('../../assets/matchperson.png')} resizeMode='contain'
                    style={{
                      width: 30,
                      marginRight: 10
                    }} />
                </View>
                <View>
                  <Text style={{
                    fontSize: 12
                  }}>
                    Your Matches
                  </Text>
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    fontSize: 12
                  }}>
                    Very Low
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('CurrentBalanceScreen')}
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.white,
                  elevation: 5,
                  borderRadius: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  alignItems: 'center',
                  height: 70,
                  width: '49%'
                }}>
                <View>
                  <Image source={require('../../assets/credit.png')} resizeMode='contain'
                    style={{
                      width: 30,
                      marginRight: 10
                    }} />
                </View>
                <View>
                  <Text style={{
                    fontSize: 12
                  }}>
                    Credits
                  </Text>
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    fontSize: 12
                  }}>
                    $50
                  </Text>
                </View>
              </TouchableOpacity>


            </View>

            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingTop: 20
            }}>
              <View style={{
                height: 80,
                borderRadius: 10,
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: COLORS.light,
                flexDirection: 'row',
              }}>
                <View style={{
                  paddingRight: 30
                }}>
                  <Text>
                    What type of relationship you
                    are looking for?
                  </Text>
                </View>
                <View>
                  <Image source={require('../../assets/back.png')} resizeMode='contain' />
                </View>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
              <View style={{
                height: 80,
                borderRadius: 10,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                backgroundColor: COLORS.light,
                flexDirection: 'row',
              }}>
                <View style={{
                  paddingRight: 20
                }}>
                  <Text>
                    Are you introvert or extrovert?
                  </Text>
                </View>
                <View>
                  <Image source={require('../../assets/back.png')} resizeMode='contain' />
                </View>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              paddingVertical: 20,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: COLORS.black
                }}>Flake Meter</Text>
                <Text>Flakes on your profile</Text>
              </View>
              <View>
                <Image source={require('../../assets/flakemeter.png')} resizeMode='contain' />
              </View>
            </View>

            <View style={{
              padding: 20,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                }}>Want to remove flakes</Text>
              </View>
              <View style={{
                paddingHorizontal: 50,
                paddingBottom: 10,
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 13
                }}>You can remove flakes by paying
                  $20 per flake now</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('RemoveFlakeScreen')}
                activeOpacity={0.8} style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: COLORS.main,
                  borderRadius: 10,
                }}>
                <Text style={{ color: COLORS.black, fontSize: 13 }}>Remove Flakes</Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 20
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontWeight: 'bold',
                  fontSize: 16
                }}>Memberships</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AdditonalPackages')}>
                <Text style={{
                  color: COLORS.blue, borderBottomColor: COLORS.blue,
                  borderBottomWidth: 1,
                }}>Additional Packages</Text>
                </TouchableOpacity>
              </View>
              {memberships ? (

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {memberships.map((item, index) => (
                    <View key={index} style={{ marginVertical: 10 }}>
                      <View style={{
                        marginHorizontal: 10,
                        marginLeft: 10,
                        borderRadius: 20,
                        backgroundColor: COLORS.white,
                        elevation: 5
                      }}>
                        <View style={{
                          backgroundColor: COLORS.white,
                          borderRadius: 20,
                          elevation: 5,
                        }}>
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                          }}>
                            <Text style={{
                              color: COLORS.black,
                              fontWeight: 'bold',
                              fontSize: 15
                            }}>{item.otherCategory}</Text>
                            {!item.discountPrice == '' ? (
                              <Text style={{ color: COLORS.black }}>{item.discountPrice} OFF {item.discountPercentage}%</Text>
                            ) : (
                              <Text style={{ color: COLORS.black }}>${item.rate}/Month</Text>
                            )}
                          </View>
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                          }}>
                            <Text style={{
                              color: COLORS.black,
                              fontSize: 13
                            }}>{item.name}</Text>
                            <Image source={require('../../assets/Premium.png')} resizeMode='contain'
                              style={{
                                width: 50,
                                height: 50
                              }} />
                          </View>
                          <View style={{
                            paddingHorizontal: 20,
                            paddingBottom: 20,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                          }}>
                            <TouchableOpacity activeOpacity={0.8} style={{
                              paddingHorizontal: 20,
                              paddingVertical: 10,
                              backgroundColor: COLORS.main,
                              borderRadius: 10,
                              alignItems: 'center'
                            }}>
                              <Text style={{ color: COLORS.black, fontSize: 13 }}>View more</Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                          borderBottomColor: COLORS.light,
                          borderBottomWidth: 1,
                        }}>
                          <Text style={{
                            color: COLORS.black,
                            fontSize: 18,
                            fontWeight: 'bold'
                          }}>
                            What's in {item.otherCategory}
                          </Text>
                        </View>

                        <View>
                          <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            justifyContent: 'space-between',
                          }}>
                            <View style={{
                              flexDirection: 'row',
                            }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
                                <Image source={require('../../assets/unlock.png')} resizeMode='contain' />
                              </View>
                              <View style={{ paddingRight: 30 }}>
                                <Text>Unlock Political and religion filter</Text>
                              </View>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                              <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                            </View>
                          </View>

                          <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            justifyContent: 'space-between',
                          }}>
                            <View style={{
                              flexDirection: 'row',
                            }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                <Image source={require('../../assets/totlikes.png')} resizeMode='contain' />
                              </View>
                              <View style={{ paddingRight: 10 }}>
                                <Text>15 likes Per Day</Text>
                              </View>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                              <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                            </View>
                          </View>

                          <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            justifyContent: 'space-between',
                          }}>
                            <View style={{
                              flexDirection: 'row',
                            }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                <Image source={require('../../assets/matches.png')} resizeMode='contain' />
                              </View>
                              <View style={{ paddingRight: 30 }}>
                                <Text>10 Max Matches</Text>
                              </View>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                              <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                            </View>
                          </View>
                          <View style={{
                            padding: 20,
                          }}>
                            <TouchableOpacity
                              onPress={() => ByMemeberShips(item, membershipUid)}
                              activeOpacity={0.8} style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                backgroundColor: COLORS.main,
                                borderRadius: 10,
                                alignItems: 'center'
                              }}>
                              <Text style={{ color: COLORS.black, fontSize: 15 }}>Current Membership</Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                      </View>
                    </View>

                  ))}
                </ScrollView>
              ) : (
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}>
                  <ActivityIndicator size="small" color={COLORS.main} animating={uploading} />
                </View>
              )}
            </View>


          </View>
        </ScrollView>





      </View >
    </SafeAreaView >
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})