import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import timezonePlugin from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezonePlugin);
dayjs.extend(isSameOrBefore);
dayjs.extend(advancedFormat);

dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(duration);

export const TIME_ZONE = 'Asia/Ho_Chi_Minh';
export const FORMAT_DATE_TIME = 'HH:mm dddd, D MMMM, YYYY';
export const FORMAT_DATE_TIME_SHORTER = 'HH:mm, D MMMM, YYYY';
export const FORMAT_TIME = 'HH:mm';
export const FORMAT_DATE = 'D MMMM, YYYY';
export const FORMAT_DATE_DAY = 'dddd, D MMMM, YYYY';

dayjs.tz.setDefault(TIME_ZONE);
dayjs.locale('vi');
