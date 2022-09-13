import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SensorDBScreen from './SensorDBScreen';
import SensorHomeStack from './SensorHomeStack';
import SensorDBStack from './SensorDBStack';
import RecordButton from '../components/RecordButton';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#6200ee',
          }}>
          <Tab.Screen
            name="SensorHomeStack"
            component={SensorHomeStack}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="SensorDBScreen"
            component={SensorDBScreen}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="search" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
      <RecordButton />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});
