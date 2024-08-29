import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CalendarPeriod, { ICalendarData } from './@module/UIKit/CalendarUI/CalendarPeriod';
import ModalUI from './@module/UIKit/ModalUI/ModalUI';
import TimeSeriesLineChart from './@module/UIKit/chart-ui/time-series-line-chart-screen';
import CombineChart from './@module/UIKit/chart-ui/combine-chart';
import CarouselUI from './@module/UIKit/CarouselUI';
import TabView from './@module/UIKit/TabView';
import SearchBar from './@module/UIKit/SearchBar';
import { BottomSheetModal, CenteredModal, TopSheetModal } from './@module/UIKit/ModalUI';
import CalendarUI from './@module/UIKit/CalendarUI/CalendarUI';
import AgendaUI from './@module/UIKit/CalendarUI/AgendaUI';
import AgendaListUI from './@module/UIKit/CalendarUI/AgendaListUI';
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
      <ScrollView>
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
        <CalendarPeriod data={listMarkDate} />
        <CalendarUI />
        <AgendaUI />
        <AgendaListUI />
        <BottomSheetModal
          renderContent={({ onClose }) => {
            return (
              <View>
                <Text style={styles.modalTitle}>Hello, World!</Text>
                <Text style={styles.modalContent}>This is a modal content.</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <ModalUI
          modalType='bottom'
          animationType='TranslateLeftToRight'
          renderContent={({ onClose }) => {
            return (
              <View>
                <Text style={styles.modalTitle}>Hello, World!</Text>
                <Text style={styles.modalContent}>This is a modal content.</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <CarouselUI />
        <CenteredModal />
        <TopSheetModal />
        <TimeSeriesLineChart />
        <CombineChart />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    fontSize: 16,
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
