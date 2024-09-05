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
import CalendarPeriod, { ICalendarData } from './packages/ui-kit/calendar-ui/CalendarPeriod';
import ModalUI from './packages/ui-kit/modal-ui';
import TimeSeriesLineChart from './packages/ui-kit/chart-ui/time-series-line-chart-screen';
import CombineChart from './packages/ui-kit/chart-ui/combine-chart';
import CarouselUI from './packages/ui-kit/carousel-ui';
import TabView from './packages/ui-kit/tab-view';
import CalendarUI from './packages/ui-kit/calendar-ui/CalendarUI';
import AgendaUI from './packages/ui-kit/calendar-ui/AgendaUI';
import AgendaListUI from './packages/ui-kit/calendar-ui/AgendaListUI';
import GradientButton from './packages/ui-kit/gradient-button';
import BottomSheetModal from './packages/ui-kit/modal-ui/bottom-sheet-modal';
import CenteredModal from './packages/ui-kit/modal-ui/centered-modal';
import TopSheetModal from '@packages/ui-kit/modal-ui/top-sheet-modal';
import ButtonUI from '@packages/ui-kit/button-ui';
import InputUI from '@packages/ui-kit/input-ui';
import GradientSearchBar from './packages/ui-kit/gradient-search-bar';
import InputDropdown from '@packages/ui-kit/input-dropdown';
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
                <GradientButton
                    linerGradientProps={{
                        style: {
                            paddingHorizontal: 10,
                        },
                    }}
                />
                <InputDropdown />

                <ButtonUI />

                <InputUI type="search" />
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
                <GradientSearchBar containerBorderWidth={2} />
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
                        );
                    }}
                />
                <ModalUI
                    modalType="bottom"
                    animationType="TranslateLeftToRight"
                    renderContent={({ onClose }) => {
                        return (
                            <View>
                                <Text style={styles.modalTitle}>Hello, World!</Text>
                                <Text style={styles.modalContent}>This is a modal content.</Text>
                                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
                <CenteredModal />
                <TopSheetModal />
                <CarouselUI />

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
