import { format } from 'date-fns';

import { dateFormatMask } from '../constants/DateConstants';

const formatDateToString = (dateToFormatMilliseconds: number) => {
    return format(dateToFormatMilliseconds, dateFormatMask);
};

export { formatDateToString };