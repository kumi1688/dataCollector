import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SensorDBScreen from './SensorDBScreen';

const Stack = createNativeStackNavigator();

export default function SensorDBStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SensorDB" component={SensorDBScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
