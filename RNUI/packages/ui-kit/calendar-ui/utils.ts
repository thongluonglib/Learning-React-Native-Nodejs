import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ViewStyle } from 'react-native';
import { CalendarProps, CalendarUtils } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

export const INITIAL_DATE = dayjs().format('YYYY-MM-DD'); //'2024-08-17'
const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
const workout = { key: 'workout', color: 'green' };
const SIZE_CELL = 40;
const TEXT_SIZE = 16;
const primaryColor = '#FFAABB'
const backgroundColor = '#A4a'
export const defaultStyles: MarkedDates = {
  selectedStyles: {
    color: '#FFFFFF',
    textColor: primaryColor,
    selected: true,
    customStyles: {
      container: {
        backgroundColor: primaryColor,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZE_CELL,
        height: SIZE_CELL,
        borderRadius: SIZE_CELL / 2,
      },
      // text: {
      //   color: primaryColor,
      //   backgroundColor: '#FFF5CC',
      //   borderRadius: 12,
      //   paddingHorizontal: 10,
      //   paddingVertical: 2,
      //   overflow: 'hidden',
      // },
    },
  },
  startDateStyles: {
    marked: true,
    dotColor: '#5FE877',
    // disableTouchEvent: true,
    dots: [vacation, massage, workout],
    customStyles: {
      container: {
        backgroundColor: primaryColor,
        // elevation: 2,
        borderRadius: 0,
        width: '100%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: SIZE_CELL,
      },
      text: {
        color: primaryColor,
        backgroundColor: '#FFF5CC',
        borderRadius: TEXT_SIZE,
        width: TEXT_SIZE * 2,
        paddingVertical: TEXT_SIZE / 2 - 1,
        textAlign: 'center',
        overflow: 'hidden',
        fontSize: 14,
        fontWeight: '500',
      },
    },
  },
  endDateStyles: {
    marked: true,
    dotColor: '#5FE877',
    // disableTouchEvent: true,
    customStyles: {
      container: {
        backgroundColor: primaryColor,
        // elevation: 2,
        borderRadius: 0,
        width: '100%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: SIZE_CELL,
      },
      text: {
        color: primaryColor,
        backgroundColor: '#FFF5CC',
        borderRadius: TEXT_SIZE,
        width: TEXT_SIZE * 2,
        paddingVertical: TEXT_SIZE / 2 - 1,
        // height: 32,
        // width: 32,
        textAlign: 'center',
        overflow: 'hidden',
        fontSize: 14,
        fontWeight: '500',
      },
    },
  },
  durationDateStyles: {
    // disableTouchEvent: true,
    dotColor: '#5FE877',
    marked: true,
    customStyles: {
      container: {
        backgroundColor: primaryColor,
        // elevation: 2,
        borderRadius: 0,
        width: '100%',
        height: SIZE_CELL,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: '#FFFFFF',
        width: TEXT_SIZE * 2,
        paddingVertical: TEXT_SIZE / 2 - 1,
      },
    },
  },
};
export interface IData {
  startDate: string; //YYYY-MM-DDD
  endDate: string;
}
interface IOptions {
  startDateStyles: any;
  endDateStyles: any;
  durationDateStyles: any;
  selectedStyles: any;
}

export function useSelectPeriodDate({
  data = [],
  type,
  options = {
    startDateStyles: undefined,
    endDateStyles: undefined,
    durationDateStyles: undefined,
    selectedStyles: undefined
  },
}: {
  data: any;
  type: 'period' | 'custom';
  options?: IOptions;
}) {
  const [selectedDate, setSelectedDate] = useState('');
  const {
    startDateStyles = defaultStyles.startDateStyles,
    endDateStyles = defaultStyles.endDateStyles,
    durationDateStyles = defaultStyles.durationDateStyles,
    selectedStyles = defaultStyles.selectedStyles,
  }: any = options;
  const [listMark, setListMark] = useState([
    {
      startDate: '',
      endDate: '',
    },
  ]);
  const currentMark: any = useRef({});
  const [isEnding, setIsEnding] = useState(false);
  const { data: listMarkFinal } = useListMarkHandler(
    data.length > 0 ? [...listMark, ...data] : listMark,
  );
  useEffect(() => {
    if (selectedDate && type === 'period') {
      if (isEnding === false) {
        listMark[0].startDate = selectedDate;
        listMark[0].endDate = '';
        currentMark.current[selectedDate] = {
          ...startDateStyles,
        };
      } else if (isEnding === true) {
        currentMark.current = {};
        listMark[0].endDate = selectedDate;
      }
      const sortListMark = listMark.map(item => {
        if (dayjs(item.endDate).diff(item.startDate, 'day') < 0) {
          return {
            startDate: item.endDate,
            endDate: item.startDate,
          };
        }
        return item;
      });
      setIsEnding(!isEnding);
      setListMark([...sortListMark]);
    }
  }, [selectedDate]);
  return {
    selectedDate,
    setSelectedDate,
    data: { ...listMarkFinal, ...currentMark.current },
  };
}
export function useListCustomMark(data: Array<IData>, options?: IOptions) {
  let obj: any = useMemo(() => {
    return listMarkHandler(data, options || {});
  }, [data]);
  return {
    data: obj,
  };
}
export function useListMarkHandler(data: Array<IData>, options?: IOptions) {
  let obj: any = useMemo(() => {
    return listMarkHandler(data, options || {});
  }, [data]);
  return {
    data: obj,
  };
}

export function listMarkHandler(data: Array<IData>, options?: IOptions) {
  const {
    startDateStyles = defaultStyles.startDateStyles,
    endDateStyles = defaultStyles.endDateStyles,
    durationDateStyles = defaultStyles.durationDateStyles,
    selectedStyles = defaultStyles.selectedStyles,
  }: any = options;
  let obj: any = {};
  data.map((item, index) => {
    if (item.startDate && item.endDate) {
      const count = dayjs(item.endDate).diff(item.startDate, 'day');
      for (let increment = 0; increment <= count; increment++) {
        if (increment === 0) {
          obj[getDate(item.startDate, increment)] = {
            startingDay: true,
            ...startDateStyles,
          };
        } else if (increment === count) {
          obj[getDate(item.startDate, increment)] = {
            endingDay: true,
            ...endDateStyles,
          };
        } else {
          obj[getDate(item.startDate, increment)] = {
            ...durationDateStyles,
          };
        }
      }
    } else if (item.startDate && !item.endDate) {
      obj[item.startDate] = {
        startingDay: true,
        endingDay: true,
        ...selectedStyles,
      };
    }
  });
  return obj;
}

function getDate(initDate = INITIAL_DATE, count: number) {
  const date = new Date(initDate);
  const newDate = date.setDate(date.getDate() + count);
  return CalendarUtils.getCalendarDateString(newDate);
}

type HeaderStyleSheet = {
  'stylesheet.calendar.header': Record<'headerContainer' | 'header', ViewStyle>;
};

export const themeCalendar: CalendarProps['theme'] & HeaderStyleSheet = {
  'stylesheet.calendar.header': {
    headerContainer: {
      position: 'absolute',
      flexDirection: 'row',
      left: 0,
      gap: 0,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingLeft: 0,
      paddingRight: 0,
      marginRight: -10,
      marginTop: 6,
      alignItems: 'center',
    },
  },
  monthTextColor: '#FFFFFF', // <-- Header titlle color
  backgroundColor: backgroundColor,
  calendarBackground: backgroundColor,
  textSectionTitleColor: '#99B9FF',
  selectedDayBackgroundColor: primaryColor,
  selectedDayTextColor: '#FFFFFF',
  todayTextColor: '#00adf5',
  dayTextColor: '#FFFFFF',
  textDisabledColor: '#919EAB',
  dotStyle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    top: 5,
  },
  arrowColor: '#FFFFFF', // <-- Arrow Icon Color
};
