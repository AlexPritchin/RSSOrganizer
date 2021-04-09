import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useMutation } from 'react-query';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';
import { alertHeaders, alertMessages } from '../../../constants/MessageConstants';
import { OrganizerScreensNames } from '../../../constants/ScreensNames';

import { addSQLTask } from '../../../services/data/Organizer/OrganizerDBDataService';

import GeneralHeaderButtonComponent from '../../../components/Navigation/NavigationHeader/GeneralHeaderButtonComponent';
import OrganizerTextFieldsEditor, { TaskTextFieldsObject } from '../../../components/Organizer/OrganizerTextFieldsEditor/OrganizerTextFieldsEditor';

import { OrganizerStackParamList } from '../../../navigation/OrganizerNavigator';

type OrganizerTaskCreatorScreenNavigationProp = StackNavigationProp<OrganizerStackParamList, OrganizerScreensNames.OrganizerTaskCreator>;
type OrganizerTaskCreatorScreenRouteProp = RouteProp<OrganizerStackParamList, OrganizerScreensNames.OrganizerTaskCreator>;

type Props = {
  navigation: OrganizerTaskCreatorScreenNavigationProp;
  route: OrganizerTaskCreatorScreenRouteProp;
};

const OrganizerTaskCreatorScreen: React.FC<Props> = props => {
  const taskToAdd = useRef(new OrganizerTask('0', 0, '', '', OrganizerTaskStatuses.active));
  const taskFormValid = useRef(false);
  const taskFormSubmitFunction = useRef(new Function());
  
  const addTaskMutation = useMutation(addSQLTask);

  const listScreenRefreshCallback = props.route.params.refreshTasksCallback;

  const saveTaskFromHeader = useCallback(() => {
    if (taskFormValid.current) {
      taskFormSubmitFunction.current();
    }
  }, [taskFormValid, taskFormSubmitFunction]);
  
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
          <Item title="Save" onPress={saveTaskFromHeader} />
        </HeaderButtons>
      ),
    });
  }, [props.navigation, saveTaskFromHeader]);
  
  const saveTask = async () => {
    try {
      taskToAdd.current.creationDate = new Date().getTime();
      await addTaskMutation.mutateAsync(taskToAdd.current);
      listScreenRefreshCallback();
      props.navigation.pop();
    } catch (error) {
      Alert.alert(alertHeaders.dbError, alertMessages.error);
    }
  };

  const updateFormValidationStateAndSubmitCallback = (isFormValid: boolean, formSubmitFunction: Function) => {
    taskFormValid.current = isFormValid;
    taskFormSubmitFunction.current = formSubmitFunction;
  };

  const updateTaskFromTextFieldsEditor = (editorData: TaskTextFieldsObject) => {
    taskToAdd.current.title = editorData.title;
    taskToAdd.current.description = editorData.description;
    saveTask();
  };

  return (
    <OrganizerTextFieldsEditor
      initialTaskTitle={taskToAdd.current.title}
      initialTaskDescription={taskToAdd.current.description}
      updateFormValidationAndSubmitCallback={updateFormValidationStateAndSubmitCallback}
      updateTaskCallback={updateTaskFromTextFieldsEditor}
    />
  );
};

export default OrganizerTaskCreatorScreen;
