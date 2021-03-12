import { format } from 'date-fns';

import { dateFormatMask } from '../constants/DateConstants';

const formatDateToString = (dateToFormatMilliseconds) => {
    //const dateToFormatDateObject = new Date(dateToFormatMilliseconds);
    return format(dateToFormatMilliseconds, dateFormatMask);
};

export { formatDateToString };