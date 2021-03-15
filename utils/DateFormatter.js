import { format } from 'date-fns';

import { dateFormatMask } from '../constants/DateConstants';

const formatDateToString = (dateToFormatMilliseconds) => {
    return format(dateToFormatMilliseconds, dateFormatMask);
};

export { formatDateToString };