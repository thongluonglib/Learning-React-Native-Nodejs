/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  pick,
  types,
} from 'react-native-document-picker'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

async function onUploadFile() {

  const result = await pick({
    type: [types.allFiles],
    mode: 'open',
    allowMultiSelection: true
  })
  console.log('result', result)
  const formData = new FormData();
  for (const file of result) {
    formData.append('photos', {
      uri: Platform.select({
        ios: file.uri?.replace('file://', ''),
        android: file.uri
      }),
      name: file.name,
      fileName: file.name,
      size: file.size,
      type: file.type
    })
  }
  console.log(formData)
  const response = await axios.post('http://10.0.2.2:3000/upload-image',
    formData,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  console.log('result', response)
}
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <Button title='Upload' onPress={onUploadFile} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
