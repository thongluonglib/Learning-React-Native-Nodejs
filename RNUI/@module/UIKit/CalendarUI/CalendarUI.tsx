import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Calendar, CalendarProps, CalendarUtils, LocaleConfig } from 'react-native-calendars';
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

const CalendarUI = ({ data, ...others }: IProps & CalendarProps & ContextProp) => {
    const [selected, setSelected] = useState()
    const onDayPress = useCallback((day) => {
        setSelected(day.dateString);
    }, []);

    const getDate = (count: number) => {
        const date = new Date(INITIAL_DATE);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
    };

    const marked = useMemo(() => {
        return {
            [getDate(-1)]: {
                dotColor: 'red',
                marked: true
            },
            [selected]: {
                // selected: true,
                // disableTouchEvent: true,
                // selectedColor: 'orange',
                // selectedTextColor: 'red'
                ...defaultStyles?.selectedStyles
            }
        };
    }, [selected]);
    return (
        <Calendar
            onDayPress={onDayPress}
            renderHeader={(date: string) => <CalendarHeader date={date} />}
            renderArrow={(direction: 'left' | 'right') => (
                <CustomArrow direction={direction} />
            )}
            markingType={'custom'}
            markedDates={marked}
            style={styles.calendarContainer}
            current={INITIAL_DATE}
            theme={themeCalendar}
            {...others}
        />
    );
};

export default CalendarUI;

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
