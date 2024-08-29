import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Calendar, CalendarProps, LocaleConfig } from 'react-native-calendars';
import { defaultStyles, INITIAL_DATE, themeCalendar, useSelectPeriodDate } from './utils';
import { ContextProp } from 'react-native-calendars/src/types';
import CalendarHeader, { CustomArrow } from './components/CalendarHeader';
LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  dayNames: ['TH2', 'TH3', 'TH4', 'TH5', 'TH6', 'TH7', 'CN'],
  dayNamesShort: ['TH2', 'TH3', 'TH4', 'TH5', 'TH6', 'TH7', 'CN'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'vi';

export type ICalendarData = Array<{
  startDate: string,
  endDate?: string
}>
interface IProps {
  data: ICalendarData
  others?: CalendarProps;
}
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
const CalendarPeriod = ({ data, ...others }: IProps & CalendarProps & ContextProp) => {
  const {
    selectedDate,
    setSelectedDate,
    data: currentMark,
  } = useSelectPeriodDate({ type: 'period', data });
  return (
    <Calendar
      onDayPress={(day: any) => {
        setSelectedDate(day.dateString);
      }}
      renderHeader={(date: string) => <CalendarHeader date={date} />}
      renderArrow={(direction: 'left' | 'right') => (
        <CustomArrow direction={direction} />
      )}
      markingType={'custom'}
      markedDates={{
        [selectedDate]: defaultStyles.selectedStyles,
        // ...listMarkFinal,
        ...currentMark,
      }}
      style={styles.calendarContainer}
      current={INITIAL_DATE}
      theme={themeCalendar}
      {...others}
    />
  );
};

export default CalendarPeriod;

const styles = StyleSheet.create({
  calendarContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginHorizontal: 10,
    paddingBottom: 20,
    marginTop: 100
  },
});
