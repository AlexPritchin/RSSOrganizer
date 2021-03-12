import React from 'react';
import { enableScreens } from 'react-native-screens';
import { LogBox } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { PersistGate } from 'redux-persist/integration/react';

import MainNavigator from './navigation/MainTabNavigator';
import { organizerReducer } from './store/reducers/OrganizerReducer';

enableScreens();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  organizerTasks: persistReducer(persistConfig, organizerReducer),
});

const globalStore = createStore(rootReducer);

const globalPersistor = persistStore(globalStore);

export default function App() {
  LogBox.ignoreLogs([
    'It appears that you are using old version of react-navigation library',
    'Deprecation in \'navigationOptions\'',
  ]);
  return (
    <Provider store={globalStore}>
      <PersistGate loading={null} persistor={globalPersistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}
