import {StyleSheet, Text, View, Platform, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useRecord from '../hooks/useRecord';
import useRecordActions from '../hooks/useRecordActions';
import {useNavigation} from '@react-navigation/native';
import useSensorActions from '../hooks/useSensorActions';
import useSensor from '../hooks/useSensor';
import {useEffect} from 'react';
import {stopUpdates} from '../lib/sensor/sensor';
import {saveSensorData} from '../lib/firebase/sensor';

const TABBAR_HEIGHT = 49;
export default function RecordButton() {
  const {record, recordPage} = useRecord();
  const {startRecord, stopRecord} = useRecordActions();
  const {targetSensorNames, sensorData} = useSensor();
  const {clearSensorData} = useSensorActions();

  const navigation = useNavigation();

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
  });

  const onPress = () => {
    if (record) {
      stopRecord();
      if (recordPage) {
        navigation.pop();
      }
      saveSensorData(sensorData);
      clearSensorData();
    } else {
      startRecord();
    }
  };

  useEffect(() => {
    if (!record && targetSensorNames) {
      for (let sensor of targetSensorNames) {
        stopUpdates(sensor);
      }
    }
  }, [record, targetSensorNames]);

  return (
    <View style={[styles.wrapper, {bottom}]}>
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: 'red',
        }}
        style={styles.circle}>
        {record ? (
          <Icon name="stop" size={48} color="red" />
        ) : (
          <Icon name="fiber-manual-record" size={48} color="red" />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 27,
    height: 54,
    width: 54,
    position: 'absolute',
    left: '50%',
    transform: [
      {
        translateX: -27,
      },
    ],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  circle: {
    backgroundColor: 'white',
    borderRadius: 27,
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
