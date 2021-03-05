import React from 'react';
import { enableScreens } from 'react-native-screens';
import { LogBox } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MainNavigator from './navigation/MainTabNavigator';
import { organizerReducer } from './store/reducers/OrganizerReducer';

enableScreens();

const rootReducer = combineReducers({
  organizerTasks: organizerReducer,
});

const globalStore = createStore(rootReducer);

export default function App() {
  LogBox.ignoreLogs([
    'It appears that you are using old version of react-navigation library',
    'Deprecation in \'navigationOptions\'',
  ]);
  return (
    <Provider store={globalStore}>
      <MainNavigator />
    </Provider>
  );
}
