import { OrganizerTask } from '../models/OrganizerTask';

const convertSQLObjectsArrayToTasksArray = (sqlObjectsArray: any[]) => {
    return sqlObjectsArray.map(
        sqlRow => new OrganizerTask(sqlRow.ID.toString(), sqlRow.CreationDate, sqlRow.Title, sqlRow.Description, sqlRow.Status)
    );
};

export { convertSQLObjectsArrayToTasksArray };