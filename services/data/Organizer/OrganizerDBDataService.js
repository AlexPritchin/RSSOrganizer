import { openDatabase } from 'expo-sqlite';

import { convertSQLObjectsArrayToTasksArray } from '../../../utils/OrganizerSQLTasksConverter';

const databaseName = 'OrganizerTasksDB';

const initializeDatabase = () => {
    const db = openDatabase(databaseName);
    db.transaction(
        transaction => {
            transaction.executeSql(
                `CREATE TABLE IF NOT EXISTS Tasks (
                    ID integer primary key not null,
                    CreationDate integer,
                    Title text,
                    Description text,
                    Status text
                )`
                //'DROP TABLE Tasks'
            );
        }
    );
};

const selectTasks = (tasksSelectedCallback) => {
    const db = openDatabase(databaseName);
    db.transaction(
        transaction => {
            transaction.executeSql(
                `SELECT * FROM Tasks
                 WHERE Status != 'Deleted'
                 GROUP BY Status
                 ORDER BY CreationDate DESC`,
                [],
                (_, resultSet) => {
                    const tasksArray = convertSQLObjectsArrayToTasksArray(resultSet.rows._array);
                    tasksSelectedCallback(tasksArray);
                },
                error => tasksSelectedCallback(null)
            );
        },
        error => tasksSelectedCallback(null)
    );
};

const addTask = (taskToAdd, resultCallback) => {
    const db = openDatabase(databaseName);
    db.transaction(
        transaction => {
            transaction.executeSql(
                `INSERT INTO Tasks (CreationDate, Title, Description, Status)
                 VALUES (?, ?, ?, ?)`,
                [taskToAdd.creationDate, taskToAdd.title, taskToAdd.description, taskToAdd.status],
                (_, __) => resultCallback(true),
                error => resultCallback(false)
            );
        },
        error => resultCallback(false)
    );
};

const updateTask = (taskToUpdate, resultCallback) => {
    const db = openDatabase(databaseName);
    db.transaction(
        transaction => {
            transaction.executeSql(
                `UPDATE Tasks
                 SET CreationDate = ?, Title = ?, Description = ?, Status = ?
                 WHERE ID = ?`,
                [taskToUpdate.creationDate, taskToUpdate.title, taskToUpdate.description, taskToUpdate.status, taskToUpdate.id],
                (_, __) => resultCallback(true),
                error => resultCallback(false)
            );
        },
        error => resultCallback(false)
    );
};

const deleteTask = (taskToDeleteId, resultCallback) => {
    const db = openDatabase(databaseName);
    db.transaction(
        transaction => {
            transaction.executeSql(
                `UPDATE Tasks
                 SET Status = 'Deleted'
                 WHERE ID = ?`,
                [taskToDeleteId],
                (_, __) => resultCallback(true),
                error => resultCallback(false)
            );
        },
        error => resultCallback(false)
    );
};

export { initializeDatabase, selectTasks, addTask, updateTask, deleteTask };