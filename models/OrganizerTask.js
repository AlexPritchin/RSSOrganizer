import { format } from 'date-fns';

import { dateFormatMask } from '../constants/DateConstants';

class OrganizerTask {
    constructor(id, dueDate, title, description) {
        this.id = id;
        this.dueDate = dueDate;
        this.title = title;
        this.description = description;
    }

    get formattedDueDate() {
        return format(this.dueDate, dateFormatMask);
    }

};

export { OrganizerTask };