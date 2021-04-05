import SQLite, { DatabaseParams } from 'react-native-sqlite-storage';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { convertSQLObjectsArrayToTasksArray } from '../../../utils/OrganizerSQLTasksConverter';

const organizerDatabaseParams: DatabaseParams = {
    name: 'OrganizerTasksDB',
    location: 'default'
};

SQLite.enablePromise(true);

const initializeDatabase = async () => {
    try {
        const db = await SQLite.openDatabase(organizerDatabaseParams);
        db.executeSql(
            `CREATE TABLE IF NOT EXISTS Tasks (
            ID integer primary key not null,
            CreationDate integer,
            Title text,
            Description text,
            Status text
            )`
        );
    } catch (error) {
        console.log(error);
    }
};

const selectSQLTasks = async () => {
    try {
        const db = await SQLite.openDatabase(organizerDatabaseParams);
        const rowsArray = await db.executeSql(
            `SELECT * FROM Tasks
            WHERE Status != 'deleted'
            ORDER BY Status, CreationDate DESC`
        );
        return convertSQLObjectsArrayToTasksArray(rowsArray[0].rows.raw());
    } catch (error) {
        return error;
    }
};

const addSQLTask = async (taskToAdd: OrganizerTask) => {
    try {
        const db = await SQLite.openDatabase(organizerDatabaseParams);
        await db.executeSql(
            `INSERT INTO Tasks (CreationDate, Title, Description, Status)
            VALUES (?, ?, ?, ?)`,
            [ taskToAdd.creationDate,
              taskToAdd.title,
              taskToAdd.description,
              taskToAdd.status ]
        );
        return;
    } catch (error) {
        return error;
    }
};

const updateSQLTask = async (taskToUpdate: OrganizerTask) => {
    try {
        const db = await SQLite.openDatabase(organizerDatabaseParams);
        await db.executeSql(
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
    } catch (error) {
        return error;
    }
};

const deleteSQLTask = async (taskToDeleteId: string) => {
    try {
        const db = await SQLite.openDatabase(organizerDatabaseParams);
        await db.executeSql(
            `UPDATE Tasks
            SET Status = 'deleted'
            WHERE ID = ?`,
            [ taskToDeleteId ]
        );
        return;
    } catch (error) {
        return error;
    }
};

export { initializeDatabase, selectSQLTasks, addSQLTask, updateSQLTask, deleteSQLTask };