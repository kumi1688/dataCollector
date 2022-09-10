import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './slices';
import TempUI from './TempUI';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';

// const store = configureStore({reducer: rootReducer});

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
