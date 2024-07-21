import {StyleSheet, View} from 'react-native';
import React from 'react';
import RecordPlayer from './src/components/RecordPlayer';

const App = () => {
  console.log('Record');
  return (
    <View>
      <RecordPlayer />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
