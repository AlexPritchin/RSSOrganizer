import SQLite from 'react-native-sqlite-storage';

import { convertSQLObjectsArrayToTasksArray } from '../../../utils/OrganizerSQLTasksConverter';

const databaseName = 'OrganizerTasksDB';

SQLite.enablePromise(true);

const initializeDatabase = async () => {
    try {
        const db = await SQLite.openDatabase(databaseName);
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
    // const db = openDatabase(databaseName);
    // db.transaction(
    //     transaction => {
    //         transaction.executeSql(
    //             `CREATE TABLE IF NOT EXISTS Tasks (
    //                 ID integer primary key not null,
    //                 CreationDate integer,
    //                 Title text,
    //                 Description text,
    //                 Status text
    //             )`
    //             //'DROP TABLE Tasks'
    //         );
    //     }
    // );
};

const selectSQLTasks = async () => {
    try {
        const db = await SQLite.openDatabase(databaseName);
        const rowsArray = await db.executeSql(
            `SELECT * FROM Tasks
            WHERE Status != 'deleted'
            ORDER BY Status, CreationDate DESC`
        );
        return convertSQLObjectsArrayToTasksArray(rowsArray);
    } catch (error) {
        return error;
    }

    // const db = openDatabase(databaseName);
    // db.transaction(
    //     transaction => {
    //         transaction.executeSql(
    //             `SELECT * FROM Tasks
    //              WHERE Status != 'deleted'
    //              ORDER BY Status, CreationDate DESC`,
    //             [],
    //             (_, resultSet) => {
    //                 const tasksArray = convertSQLObjectsArrayToTasksArray(resultSet.rows._array);
    //                 tasksSelectedCallback(tasksArray);
    //             },
    //             error => tasksSelectedCallback(null)
    //         );
    //     },
    //     error => tasksSelectedCallback(null)
    // );
};

const addSQLTask = async (taskToAdd) => {
    try {
        const db = await SQLite.openDatabase(databaseName);
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

    // const db = openDatabase(databaseName);
    // db.transaction(
    //     transaction => {
    //         transaction.executeSql(
    //             `INSERT INTO Tasks (CreationDate, Title, Description, Status)
    //              VALUES (?, ?, ?, ?)`,
    //             [taskToAdd.creationDate, taskToAdd.title, taskToAdd.description, taskToAdd.status],
    //             (_, __) => resultCallback(true),
    //             error => resultCallback(false)
    //         );
    //     },
    //     error => resultCallback(false)
    // );
};

const updateSQLTask = async (taskToUpdate) => {
    try {
        const db = await SQLite.openDatabase(databaseName);
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

    // const db = openDatabase(databaseName);
    // db.transaction(
    //     transaction => {
    //         transaction.executeSql(
    //             `UPDATE Tasks
    //              SET CreationDate = ?, Title = ?, Description = ?, Status = ?
    //              WHERE ID = ?`,
    //             [taskToUpdate.creationDate, taskToUpdate.title, taskToUpdate.description, taskToUpdate.status, taskToUpdate.id],
    //             (_, __) => resultCallback(true),
    //             error => resultCallback(false)
    //         );
    //     },
    //     error => resultCallback(false)
    // );
};

const deleteSQLTask = async (taskToDeleteId) => {
    try {
        const db = await SQLite.openDatabase(databaseName);
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

    // const db = openDatabase(databaseName);
    // db.transaction(
    //     transaction => {
    //         transaction.executeSql(
    //             `UPDATE Tasks
    //              SET Status = 'deleted'
    //              WHERE ID = ?`,
    //             [taskToDeleteId],
    //             (_, __) => resultCallback(true),
    //             error => resultCallback(false)
    //         );
    //     },
    //     error => resultCallback(false)
    // );
};

export { initializeDatabase, selectSQLTasks, addSQLTask, updateSQLTask, deleteSQLTask };