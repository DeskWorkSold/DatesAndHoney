import { Image, SafeAreaView, StatusBar, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect } from 'react';
import COLORS from '../../../consts/Colors';
import CustomeButton from '../../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import { mediatorLogin, selectMediatorUser } from '../../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';

const MediatorApprovalScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const MediatorUser = useSelector(selectMediatorUser);

  const CheckApproval = () => {
    // console.log(MediatorUser?.PanelAccess)
    if(MediatorUser?.PanelAccess == true){
      setTimeout(() => {
        navigation.navigate('MediatorDashboardScreen');
        console.log('Approval Accepted');
      }, 1000);
    }
    else{
      console.log('Approval unaccepted');
    }
  }

  const OnApprovalWait = () => {
    // navigation.navigate('LoginScreen')
    try {
      auth()
        .signOut()
        .then(() =>
          console.log('User signed out!'),
          // ToastAndroid.show('Signed out!', ToastAndroid.SHORT)
          // navigation.('SignUpScreen')
        );
      // const userData = await AsyncStorage.getItem('session');
    //   await AsyncStorage.removeItem('CurrentUserData')
    //   await AsyncStorage.removeItem('CurrentUser')
      dispatch(mediatorLogin(null));
    }
    catch (exception) {
      return false;
    }
  }

  useEffect(() => {
    CheckApproval();
  }, [])
  

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={{
          height: '85%',
          alignItems:'center'
        }}>
          <View style={{
            paddingHorizontal: 20,
            paddingVertical: 20
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
            }}>Waiting for approval</Text>
          </View>
          <View style={{
            marginHorizontal: 130
          }}>
            <Image source={require('../../../assets/waitingapproval.png')} resizeMode='contain' style={{
              width: 300,
              height: 400
            }} />
          </View>
          <View style={{
            paddingHorizontal: 20,
            paddingVertical: 20
          }}>
            <Text style={{
              fontSize: 15,
              color: COLORS.black,
            }}>Usually with in 24 hours</Text>
          </View>
        </View>
        <View style={{
          height: '15%',
          alignItems:'center'
        }}>
          <CustomeButton onpress={() => OnApprovalWait()}
            title={'Ok'} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MediatorApprovalScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
})