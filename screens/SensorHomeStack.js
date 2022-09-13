import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SensorHomeScreen from './SensorHomeScreen';
import SensorRecordScreen from './SensorRecordScreen';

const Stack = createNativeStackNavigator();

export default function SensorHomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SensorHomeScreen" component={SensorHomeScreen} />
      <Stack.Screen name="SensorRecordScreen" component={SensorRecordScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
