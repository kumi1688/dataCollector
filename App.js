import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './slices';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export default function App() {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </UserContextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
