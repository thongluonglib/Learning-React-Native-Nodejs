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
import { launchImageLibrary } from 'react-native-image-picker';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

async function onUploadFile() {

  const result = await launchImageLibrary({
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
  });
  console.log('result', JSON.stringify(result, null, 2))
  const formData = new FormData();
  for (const file of result.assets) {
    formData.append('photos', {
      uri: Platform.select({
        ios: file.uri?.replace('file://', ''),
        android: file.uri
      }),
      name: file.fileName,
      fileName: file.fileName,
      size: file.fileSize,
      type: file.type
    })
  }
  console.log(formData)
  const response = await axios.post('http://localhost:3000/upload-image',
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
