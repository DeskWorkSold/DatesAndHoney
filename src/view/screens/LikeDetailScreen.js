import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderTabOne from '../components/HeaderTabOne';
import COLORS from '../../consts/Colors';
import CustomeButton from '../components/CustomeButton'
import LikesCard from '../components/LikesCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { selectChatuser, selectUser } from '../../../redux/reducers/Reducers';

const LikeDetailScreen = ({ navigation }) => {
  const [likedusers, setLikedUser] = useState();
  const [modalDataUid, setModalDataUid] = useState();
  const user = useSelector(selectUser)
  const MatchUser = useSelector(selectChatuser);

  // console.log(user.uid);

  const fetchLikedUser = async () => {
    const userGender = user.Gender
    // console.log(userGender);
    if (userGender == 'Male') {
      fetchLikedUserFemale();
    }
    else {
      fetchLikedUserMale();
    }
  }

  const fetchLikedUserMale = async () => {
    const likedUser = [];
    await firestore()
      .collection('Users')
      .where("userDetails.Gender", '==', "Male")
      .onSnapshot(querySnapshot => {
        // console.log('Total user: ', querySnapshot.size);
        const modalDataUid = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log('User ID: ', documentSnapshot.data());
          if (documentSnapshot.data()?.PrivateChat) {
            // console.log(documentSnapshot.data()?.PrivateChat);
            documentSnapshot.data()?.PrivateChat.map(LikedUser => {
              if (LikedUser.ChatuserDetails.uid == user.uid) {
                likedUser.push(documentSnapshot.data().userDetails)
                // console.log('test', documentSnapshot.data().userDetails);
              } else {
                console.log('no like found');
                // setChatUserDetail('')
              }
            })
            // console.log('final', likedUser);
            // users.push(documentSnapshot.data().userDetails);
            // modalDataUid.push(documentSnapshot.id);
          }
        });
        setLikedUser(likedUser)
        setModalDataUid(modalDataUid)
      })
    // console.log('==>' , likedusers);
  }


  const fetchLikedUserFemale = async () => {
    const likedUser = [];
    await firestore()
      .collection('Users')
      .where("userDetails.Gender", '==', "Female")
      .onSnapshot(querySnapshot => {
        // console.log('Total user: ', querySnapshot.size);
        const modalDataUid = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log('User ID: ', documentSnapshot.data());
          if (documentSnapshot.data()?.PrivateChat) {
            // console.log(documentSnapshot.data()?.PrivateChat);
            documentSnapshot.data()?.PrivateChat.map(LikedUser => {
              if (LikedUser.ChatuserDetails.uid == user.uid) {
                likedUser.push(documentSnapshot.data().userDetails)
                // console.log('test', documentSnapshot.data().userDetails);
              } else {
                console.log('no like found');
                // setChatUserDetail('')
              }
            })
            // console.log('final', likedUser);
            // users.push(documentSnapshot.data().userDetails);
            // modalDataUid.push(documentSnapshot.id);
          }
        });
        setLikedUser(likedUser)
        setModalDataUid(modalDataUid)
      })
    // console.log('==>' , likedusers);
  }
  useEffect(() => {
    fetchLikedUser();
  }, [])


  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          height: '8%'
        }}>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>

          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: COLORS.black
            }}>Liked you</Text>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 20 }}>
            <TouchableOpacity>
              <Image source={require('../../assets/menu2.png')} resizeMode='contain' />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} vertical>
          <View style={{
            backgroundColor: COLORS.white,
            paddingBottom: 20,
            marginBottom: 300,
            height: '92%'
          }}>
            <View style={{
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 20,
              paddingHorizontal: 40
            }}>
              <Text style={{
                textAlign: 'center'
              }}>These people would like to Chat with you.Like
                them back to start a conservation.</Text>
            </View>

            <View style={{
              marginHorizontal: 20,
              padding: 20,
              alignItems: 'center',
              borderRadius: 20,
              elevation: 5,
              backgroundColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                }}>Want to remove flakes</Text>
              </View>
              <View style={{
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 12
                }}>You can remove flakes by paying
                  $20 per flake now</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: COLORS.main,
                borderRadius: 10,
              }}>
                <Text style={{ color: COLORS.black, fontSize: 13 }}>Remove Flakes</Text>
              </TouchableOpacity>
            </View>

            <View style={{
              paddingHorizontal: 0,
            }}>
              <View style={{
                paddingTop: 20,
                width: '30%',
                paddingLeft: 20,
              }}>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  fontFamily: 'Roboto-Medium',
                  color: COLORS.main,
                  borderBottomColor: COLORS.main,
                  borderBottomWidth: 0.5,
                  textAlign: 'center'
                }}>Your Matches</Text>
              </View>

              {MatchUser ? (
                // <View style={{ height: 170, width:'100%' }}>
                <>
                {MatchUser.map((item, index) => (
                    <View key={index} style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      paddingVertical: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray2,
                      width: '100%',
                      // backgroundColor:COLORS.main,
                      height: 85,
                    }}>
                      <View style={{
                        marginHorizontal: 10,
                        borderRadius: 50,
                        width: '15%',
                      }}>
                        <Image source={{ uri: item.image1 }} resizeMode='contain'
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: 10,
                          }} />
                      </View>

                      <View style={{
                        width: '45%',
                        justifyContent: 'center',
                      }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{
                            fontWeight: 'bold',
                            color: COLORS.black,
                            paddingRight: 10,
                          }}>{item.Name}</Text>
                          <Text>now</Text>
                        </View>
                        <Text>6:13PM</Text>
                      </View>
                      <View style={{
                        width: '40%',
                        paddingHorizontal: 20
                      }}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('CongratsMatchScreen', {
                            userName: item.Name,
                            userImg: item.image1,
                            uid: item.uid,
                          })}
                          style={{
                            padding: 5,
                            borderRadius: 20,
                            borderWidth: 1,
                            elevation: 5,
                            backgroundColor: COLORS.white,
                            borderColor: COLORS.light,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Text style={{
                            paddingHorizontal: 5,
                            textAlign: 'center',
                            fontSize: 10,
                            // width: '80%',
                            color: 'red',
                          }}>Match Found!</Text>
                          <Image source={require('../../assets/heart.png')} resizeMode='contain'
                            style={{
                              tintColor: 'red',
                              width: 20,
                              height: 20,
                            }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    ))}
                    </>
                // </View>
              ) : (
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.gray2,
                  width: '100%',
                  // backgroundColor:COLORS.main,
                  height: 85,
                }}>
                  <Text>
                    (No Matches)Liked them back to get your matches..
                  </Text>
                </View>
              )}
            </View>

            <View style={{
              // alignItems: 'center',
              // justifyContent:'center',
              paddingHorizontal: 10,
            }}>
              {likedusers ? (
                <View  style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: "space-between",
                  width:'100%',
                  paddingHorizontal:10
              }}>
                  {likedusers.map((item, index) => (
                    <View key={index}
                      style={{
                        marginTop: 20,
                        width: '45%',
                        marginHorizontal: 5,
                      }}>
                      <LikesCard image={{ uri: item.image1 }} name={item.Name} navigation={navigation}
                        description='Model at Instagram' />
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  width: '100%',
                }}>
                  <Text>
                    User's not found who's like to chat with you..
                  </Text>
                </View>
              )}

            </View>


            {/* 
            <View style={{
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LikesCard image={require('../../assets/profile6.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
                <LikesCard image={require('../../assets/profile4.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
              </View>
            </View>

            <View style={{
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LikesCard image={require('../../assets/profile6.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
                <LikesCard image={require('../../assets/profile4.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
              </View>
            </View> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default LikeDetailScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})