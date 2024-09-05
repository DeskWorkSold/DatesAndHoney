import React, { useEffect } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import MyStack from './src/view/navigation/navigation';
import store from './redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import {
  initConnection,
  endConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
} from 'react-native-iap';
//pk_test_51NqAXdDYlVq1hwGLZCMYn0syTpXCPvkQ3n1TwbrS6pDYAOQjVIEjFjqLHBWcXAFPNAVJnIZobL53stVKLVmxymFF00qhQLUtWT
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { useNavigation } from '@react-navigation/native';

const App = () => {

  useEffect(() => {
    const init = async () => {
      try {
        await initConnection();
        if (Platform.OS === 'android') {
          flushFailedPurchasesCachedAsPendingAndroid();
        }
      }
      catch (error) {
        console.error('Error occurred during initilization', error.message);
      }
    }
    init();
    return () => {
      endConnection();
    }
  }, [])


  // const HandleDeepLinking = () => {
  //   const {navigate} = useNavigation()
  //   const handleDynamicLinks = async (link) => {
  //     console.log('Foreground link handling:', link)
  //     let productId = link.url.split('=').pop()
  //     console.log('productId:', productId,)
  //       navigate('ProductDetail', { productId: productId })
  //   }
  //   useEffect(() => {
  //     const unsubscribe = dynamicLinks().onLink(handleDynamicLinks)
  //     return () => unsubscribe()
  //   }, [])

  //   return null
  // }

  // Handle dynamic links
  // useEffect(() => {

  //   const handleDynamicLinks = async (link) => {
  //     const { navigate } = useNavigation()
  //     console.log('link');
  //     if (link && link?.url) {
  //       const productId = link?.url?.split('=').pop();
  //       console.log('Foreground link handling:', link);
  //       console.log('ProductId:', productId);
  //       if (productId) {
  //         // Ensure that navigation has been initialized
  //         navigate('EventDetailsForPrivate', { productId });
  //       }
  //     }
  //   };

  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
  //   return () => unsubscribe();
  // }, []);



  return (
    <StripeProvider
      publishableKey={'pk_live_51NSEnYKK582q5wyAXZvmsElHHqPLAgqGckDA6hB56kmzGcc2mQhztlKFLCPr4WFedryOQphLPzD1DlAgqawX8UHe00CFeb967F'}
    >
      <Provider store={store}>
        <MyStack />
      </Provider>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
