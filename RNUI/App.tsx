import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  SearchBar,
  TabView,
  CalendarUI,
} from './@module/UIKit/index';
import { ICalendarData } from './@module/UIKit/CalendarUI';
const listMarkDate: ICalendarData = [
  {
    startDate: '2024-08-20',
    endDate: '2024-08-23',
  },
  {
    startDate: '2024-08-25',
    // endDate: '2024-08-25',
  },
  {
    startDate: '2024-08-28',
    endDate: '2024-09-03',
  },
];
const App = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <TabView
        data={['Hello 1', 'Hello 2']}
        defaultIndex={0}
        onChangeTab={({ item }) => {
          console.log('sadasd', item);
        }}
        scrollEnabled={false}
        containerStyle={{
          marginLeft: 10,
        }}
        activeContainerStyle={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          borderWidth: 0,
        }}
        inActiveContainerStyle={{
          backgroundColor: '#1E3A8A',
          borderRadius: 20,
          borderWidth: 0,
        }}
        renderItem={({ item, index, isSelected }) => {
          return (
            <Text style={{ color: isSelected ? '#1E3A8A' : '#FFFFFF' }}>
              {item}
            </Text>
          );
        }}
      />
      <SearchBar />
      {/* <GradientText /> */}
      <CalendarUI data={listMarkDate} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
