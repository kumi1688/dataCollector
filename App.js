import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './slices';
import TempUI from './TempUI';

const store = configureStore({reducer: rootReducer});

export default function App() {
  return <TempUI />;
}

const styles = StyleSheet.create({});
