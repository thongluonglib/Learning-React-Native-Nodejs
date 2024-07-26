import {StyleSheet, View} from 'react-native';
import React from 'react';
import RecordPlayer from './src/components/RecordPlayer';
import RNSound from './src/components/RNSound';

const App = () => {
  console.log('Record');
  return (
    <View>
      <RecordPlayer />
      <RNSound />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
