import { format } from 'date-fns';

import { dateFormatMask } from '../constants/DateConstants';

class OrganizerTask {
  constructor(id, creationDate, title, description, status) {
    this.id = id;
    this.creationDate = creationDate;
    this.title = title;
    this.description = description;
    this.status = status;
  }

  static copyFromInstance(instanceToCopy) {
    if (instanceToCopy instanceof OrganizerTask) {
      return new OrganizerTask(
        instanceToCopy.id,
        instanceToCopy.creationDate,
        instanceToCopy.title,
        instanceToCopy.description,
        instanceToCopy.status
      );
    }
    return undefined;
  }

  get formattedCreationDate() {
    return format(this.creationDate, dateFormatMask);
  }
}

export { OrganizerTask };
