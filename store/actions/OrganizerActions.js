const ADD_TASK = 'ADD_TASK';
const EDIT_TASK = 'EDIT_TASK';
const DELETE_TASK = 'DELETE_TASK';

const addTask = task => {
  return { type: ADD_TASK, taskToAdd: task };
};

const editTask = task => {
  return { type: EDIT_TASK, taskToEdit: task };
};

const deleteTask = taskId => {
  return { type: DELETE_TASK, taskIdToDelete: taskId };
};

export { ADD_TASK, EDIT_TASK, DELETE_TASK, addTask, editTask, deleteTask };
