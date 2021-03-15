import { OrganizerTask } from '../models/OrganizerTask';

const convertSQLObjectsArrayToTasksArray = (sqlObjectsArray) => {
    return sqlObjectsArray.map(
        sqlRow => new OrganizerTask(sqlRow.ID, sqlRow.creationDate, sqlRow.title, sqlRow.description, sqlRow.status)
    );
};

export { convertSQLObjectsArrayToTasksArray };