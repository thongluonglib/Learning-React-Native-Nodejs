/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import useApiHook from './src/hooks/useApiHook'
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { loading, data, callApi, loadMorePage } = useApiHook('/get-books', { limit: 20 })
  console.log('loading', loading)
  console.log('data', JSON.stringify(data, null, 2))

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    callApi().then(() => { });
  }, [])
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Button title='Click here' onPress={async () => {
          await callApi();
        }} />
        <Button title='Load More' onPress={async () => {
          await loadMorePage();
        }} />

      </ScrollView>
      <FlatList
        style={{ height: '100%' }}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <Text key={index.toString()} style={{ padding: 20 }}>{item.sBookName}</Text>
          )
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => loadMorePage()}
      />
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
