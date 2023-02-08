import React from 'react';
import {
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


const App = () => {
  
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
