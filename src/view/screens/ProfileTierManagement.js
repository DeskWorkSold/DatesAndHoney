import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabTwo from '../components/HeaderTabTwo';
import { useDispatch, useSelector } from 'react-redux';
import { packages, selectUser } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { RadioButton } from 'react-native-paper';


const ProfileTierManagement = ({ navigation }) => {
  const [checked, setChecked] = useState('Silver'); //initial choice
  const [memberships, setMemberships] = useState();
  const [membershipUid, setMembershipUid] = useState();
  const [uploading, setUploading] = useState(false);
  const [buyPack, setBuyPack] = useState(false);
  const user = useSelector(selectUser);
  // console.log(user.uid);
  //   useEffect(() => {
  //   fetchMemberships();
  // }, []);



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={{
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            flexDirection: 'row',
          }}>
            <View style={{
              // backgroundColor: COLORS.black
            }}>
              <Image source={require('../../assets/nopic.png')} resizeMode="cover" style={{
                width: 150,
                height: 150,
                borderWidth: 2,
                borderColor: COLORS.main,
                borderRadius: 100,
              }} />
            </View>
            <View style={{
              justifyContent: 'flex-end',
            }}>
              <TouchableOpacity style={{
                backgroundColor: COLORS.main,
                width: 70,
                height: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginLeft: -30
              }}>
                <Image source={require('../../assets/edit1.png')} resizeMode="cover" style={{
                  width: 15,
                  height: 15,
                  borderWidth: 2,
                }} />
                <Text style={{
                  paddingLeft: 5,
                  fontSize: 12,
                  color: COLORS.black
                }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{
            paddingVertical: 10
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black
            }}>User Name</Text>
          </View>
        </View>
        <View style={{
          width: '90%',
          height: '50%',
          borderRadius: 10,
          elevation: 9,
          backgroundColor: COLORS.white,
          paddingHorizontal: 20,
          paddingTop: 20
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLORS.black
          }}>Tier Management</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 20,
          }}>
            <View style={{
              alignItems: 'center',
            }}>
              <RadioButton
                value={"Silver"}
                status={checked === 'Silver' ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                onPress={() => setChecked('Silver')} //when pressed, set the value of the checked Hook to 'Apple'
                color={COLORS.main}
                uncheckedColor={COLORS.main}
              />
              {/* <Text>Silver</Text> */}
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: COLORS.main }} />
            <View style={{
              alignItems: 'center',
            }}>
              <RadioButton
                value="Gold"
                status={checked === 'Gold' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Gold')}
                color={COLORS.main}
                uncheckedColor={COLORS.main}
              />
              {/* <Text>Gold</Text> */}
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: COLORS.main }} />
            <View style={{
              alignItems: 'center',
            }}>
              <RadioButton
                value="Diamond"
                status={checked === 'Diamond' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Diamond')}
                color={COLORS.main}
                uncheckedColor={COLORS.main}
              />
              {/* <Text>Diamond</Text> */}
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: COLORS.main }} />
            <View style={{
              alignItems: 'center',
            }}>
              <RadioButton
                value="Diamond+"
                status={checked === 'Diamond+' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Diamond+')}
                color={COLORS.main}
                uncheckedColor={COLORS.main}
              />
              {/* <Text>Diamond+</Text> */}
            </View>

          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <View style={{
              alignItems: 'center',
              width: '15%'
            }}>
              <Text>Silver</Text>
            </View>
            <View style={{
              alignItems: 'center',
              width: '40%'
            }}>
              <Text>Gold</Text>
            </View>
            <View style={{
              alignItems: 'center',
              width: '20%'
            }}>
              <Text>Diamond</Text>
            </View>
            <View style={{
              alignItems: 'center',
              width: '35%'
            }}>
              <Text>Diamond+</Text>
            </View>
          </View>
          <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Tier Management</Text>
            <Text style={{
              fontSize: 13,
              color: COLORS.black
            }}>45%/Month</Text>
          </View>

          {checked == 'Silver' &&
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10
            }}>
              <View>
                <Image source={require('../../assets/tik.png')} style={{
                  width: 15,
                  height: 15
                }} />
              </View>
              <View style={{
                paddingLeft: 10,
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 12
                }}>Unlocks Religion & Political View filters</Text>
              </View>
            </View>
          }
          {checked == 'Gold' &&
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10
            }}>
              <View>
                <Image source={require('../../assets/tik.png')} style={{
                  width: 15,
                  height: 15
                }} />
              </View>
              <View style={{
                paddingLeft: 10,
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 12
                }}>Unlocks all Filters</Text>
              </View>
            </View>
          }
          {checked == 'Diamond' &&
          <>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              paddingRight:10,
            }}>
              <View>
                <Image source={require('../../assets/tik.png')} style={{
                  width: 15,
                  height: 15
                }} />
              </View>
              <View style={{
                paddingLeft: 10,
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 12
                }}>Unlocks Concierge Service most Concierge have an extra fee</Text>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              paddingRight:10,
            }}>
              <View>
                <Image source={require('../../assets/tik.png')} style={{
                  width: 15,
                  height: 15
                }} />
              </View>
              <View style={{
                paddingLeft: 10,
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 12
                }}>Unlocks Diamond filter</Text>
              </View>
            </View>
            </>
          }
          {checked == 'Diamond+' &&
          <>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              paddingRight:10,
            }}>
              <View>
                <Image source={require('../../assets/tik.png')} style={{
                  width: 15,
                  height: 15
                }} />
              </View>
              <View style={{
                paddingLeft: 10,
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 12
                }}>Unlocks Concierge feature most Concierge have an extra fee</Text>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              paddingRight:10,
            }}>
              <View>
                <Image source={require('../../assets/tik.png')} style={{
                  width: 15,
                  height: 15
                }} />
              </View>
              <View style={{
                paddingLeft: 10,
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 12
                }}>You will be feature as a Diamond+ member</Text>
              </View>
            </View>
            </>
          }






        </View>

      </View>
    </SafeAreaView >
  )
}

export default ProfileTierManagement

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    height: '100%',
    // justifyContent: 'center',
    marginTop:50,
    alignItems: 'center'
  }
})