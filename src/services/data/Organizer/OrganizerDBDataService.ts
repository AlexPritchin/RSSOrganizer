import SQLite, { DatabaseParams } from 'react-native-sqlite-storage';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { convertSQLObjectsArrayToTasksArray } from '../../../utils/OrganizerSQLTasksConverter';

const organizerDatabaseParams: DatabaseParams = {
    name: 'OrganizerTasksDB',
    location: 'default'
};

let mainDB: SQLite.SQLiteDatabase;

SQLite.enablePromise(true);

const initializeDatabase = async () => {
    try {
        mainDB = await SQLite.openDatabase(organizerDatabaseParams);
        await mainDB.executeSql(
            `CREATE TABLE IF NOT EXISTS Tasks (
            ID integer primary key not null,
            CreationDate integer,
            Title text,
            Description text,
            Status text
            )`
        );
    } catch (error) {
        throw error;
    }
};

const selectSQLTasks = async () => {
        const rowsArray = await mainDB.executeSql(
            `SELECT * FROM Tasks
            WHERE Status != 'deleted'
            ORDER BY Status, CreationDate DESC`
        );
        return convertSQLObjectsArrayToTasksArray(rowsArray[0].rows.raw());
};

const addSQLTask = async (taskToAdd: OrganizerTask) => {
        await mainDB.executeSql(
            `INSERT INTO Tasks (CreationDate, Title, Description, Status)
            VALUES (?, ?, ?, ?)`,
            [ taskToAdd.creationDate,
              taskToAdd.title,
              taskToAdd.description,
              taskToAdd.status ]
        );
        return;
};

const updateSQLTask = async (taskToUpdate: OrganizerTask) => {
        await mainDB.executeSql(
            `UPDATE Tasks
            SET CreationDate = ?, Title = ?, Description = ?, Status = ?
            WHERE ID = ?`,
            [ taskToUpdate.creationDate,
              taskToUpdate.title,
              taskToUpdate.description,
              taskToUpdate.status,
              taskToUpdate.id ]
        );
        return;
};

const deleteSQLTask = async (taskToDeleteId: string) => {
        await mainDB.executeSql(
            `UPDATE Tasks
            SET Status = 'deleted'
            WHERE ID = ?`,
            [ taskToDeleteId ]
        );
        return;
};

export { initializeDatabase, selectSQLTasks, addSQLTask, updateSQLTask, deleteSQLTask };