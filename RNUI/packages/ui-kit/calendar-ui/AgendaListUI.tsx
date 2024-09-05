import React, { useRef, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { agendaItems, getMarkedDates } from './mockdata';
import AgendaItem from './AgendaItem';
import { getTheme, themeColor } from './themes';

const leftArrowIcon = require('./ic-back.png');
const rightArrowIcon = require('./ic-next.png');

const ITEMS: any[] = agendaItems;

interface Props {
    weekView?: boolean;
}

const AgendaListUI = (props: Props) => {
    const { weekView } = props;
    const marked = useRef(getMarkedDates());
    const theme = useRef(getTheme());
    const todayBtnTheme = useRef({
        todayButtonTextColor: themeColor
    });

    // const onDateChanged = useCallback((date, updateSource) => {
    //   console.log('AgendaList onDateChanged: ', date, updateSource);
    // }, []);

    // const onMonthChange = useCallback(({dateString}) => {
    //   console.log('AgendaList onMonthChange: ', dateString);
    // }, []);

    const renderItem = useCallback(({ item }: any) => {
        return <AgendaItem item={item} />;
    }, []);

    return (
        <CalendarProvider
            style={{ width: "100%", height: 1000}}
            date={ITEMS[1]?.title}
            // onDateChanged={onDateChanged}
            // onMonthChange={onMonthChange}
            showTodayButton
            // disabledOpacity={0.6}
            theme={todayBtnTheme.current}
        // todayBottomMargin={16}
        >
            {weekView ? (
                <WeekCalendar firstDay={1} markedDates={marked.current} />
            ) : (
                <ExpandableCalendar
                    // horizontal={false}
                    // hideArrows
                    // disablePan
                    // hideKnob
                    // initialPosition={ExpandableCalendar.positions.OPEN}
                    // calendarStyle={styles.calendar}
                    // headerStyle={styles.header} // for horizontal only
                    // disableWeekScroll
                    theme={{
                        ...theme.current,
                    }}
                    // disableAllTouchEventsForDisabledDays
                    firstDay={1}
                    markedDates={marked.current}
                    leftArrowImageSource={leftArrowIcon}
                    rightArrowImageSource={rightArrowIcon}
                    
                // animateScroll
                // closeOnDayPress={false}
                />
            )}
            <AgendaList
                sections={ITEMS}
                renderItem={renderItem}
                // scrollToNextEvent
            // sectionStyle={styles.section}
            // dayFormat={'yyyy-MM-d'}
            />
        </CalendarProvider>
    );
};

export default AgendaListUI;

const styles = StyleSheet.create({
    calendar: {
        paddingLeft: 20,
        paddingRight: 20
    },
    header: {
        backgroundColor: 'lightgrey'
    },
    section: {
        color: 'grey',
        textTransform: 'capitalize'
    }
});