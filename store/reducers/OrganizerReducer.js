import { OrganizerTask } from '../../models/OrganizerTask';
import { OrganizerTaskStatuses } from '../../constants/OrganizerConstants';
import { ADD_TASK, EDIT_TASK, DELETE_TASK } from '../actions/OrganizerActions';

const initialState = {
  tasks: [
    new OrganizerTask('1', new Date(), 'Task 1 title', 'Task 1 description', OrganizerTaskStatuses.active),
    new OrganizerTask('2', new Date(), 'Task 2 title', 'Task 2 description', OrganizerTaskStatuses.active),
    new OrganizerTask('3', new Date(), 'Task 3 title', 'Task 3 description', OrganizerTaskStatuses.active),
  ],
  highestId: 3,
};

const organizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const newHighestId = state.highestId + 1;
      const updatedTasks = [...state.tasks];
      action.taskToAdd.id = newHighestId.toString();
      updatedTasks.push(action.taskToAdd);
      updatedTasks.sort((taskA, taskB) => taskB.creationDate > taskA.creationDate);
      return { tasks: updatedTasks, highestId: newHighestId };
    }
    case EDIT_TASK: {
      const updatedTasks = [...state.tasks];
      const taskToEditIndex = updatedTasks.findIndex(
        task => task.id === action.taskToEdit.id
      );
      updatedTasks.splice(taskToEditIndex, 1, action.taskToEdit);
      return { ...state, tasks: updatedTasks };
    }
    case DELETE_TASK: {
      const updatedTasks = state.tasks.filter(
        task => task.id !== action.taskIdToDelete
      );
      return { ...state, tasks: updatedTasks };
    }
    default:
      return state;
  }
};

export { organizerReducer };
