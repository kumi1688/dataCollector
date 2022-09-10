import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import SensorScreen from './SensorScreen';
import {subscribeAuth} from '../lib/firebase/auth';
import {useUserContext} from '../contexts/UserContext';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const {user, setUser} = useUserContext();

  useEffect(() => {
    const unsubscribe = subscribeAuth(async currentUser => {
      unsubscribe();
      console.log(currentUser);
      if (!currentUser) {
        return;
      } else {
        setUser(currentUser);
      }
    });
  }, [setUser]);

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="SensorHome"
          component={SensorScreen}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="SensorHome"
            component={SensorScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
