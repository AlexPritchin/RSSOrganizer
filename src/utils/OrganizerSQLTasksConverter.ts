import { OrganizerTask } from '../models/OrganizerTask';

const convertSQLObjectsArrayToTasksArray = (sqlObjectsArray) => {
    return sqlObjectsArray.map(
        sqlRow => new OrganizerTask(sqlRow.ID.toString(), sqlRow.CreationDate, sqlRow.Title, sqlRow.Description, sqlRow.Status)
    );
};

export { convertSQLObjectsArrayToTasksArray };