import {Dimensions, NativeEventEmitter, TouchableOpacity} from 'react-native';
import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {startUpdates, stopUpdates, getSensorModule} from '../lib/sensor/sensor';
import {useNavigation, useRoute} from '@react-navigation/native';
import useRecordActions from '../hooks/useRecordActions';
import useSensor from '../hooks/useSensor';
import sensor from '../slices/sensor';

export default function SensorRecordScreen() {
  const {params} = useRoute();
  const {sensorName} = params;
  const navigation = useNavigation();
  const {isRecordPage} = useRecordActions();
  const {sensorData} = useSensor();

  // useEffect(() => {
  //   console.log(sensorData[sensorName].slice(-1)[0]);
  // }, [sensorData, sensorName]);

  const dataText = () => {
    const sample = sensorData[sensorName].slice(-1)[0];
    if (!sample) {
      return <View />;
    }

    const {x, y, z, scalar, value} = sensorData[sensorName].slice(-1)[0];

    if (scalar !== undefined) {
      return rotationVectorText();
    } else if (x !== undefined && y !== undefined && z !== undefined) {
      return threeAxisText();
    } else if (value !== undefined) {
      return oneValueText();
    } else {
      return <View />;
    }
  };

  const rotationVectorText = () => {
    const {x, y, z, scalar} = sensorData[sensorName].slice(-1)[0];
    return (
      <View>
        <Text style={styles.text}>x: {x}</Text>
        <Text style={styles.text}>y: {y}</Text>
        <Text style={styles.text}>z: {z}</Text>
        <Text style={styles.text}>scalar: {scalar}</Text>
      </View>
    );
  };

  const oneValueText = () => {
    const {value} = sensorData[sensorName].slice(-1)[0];

    return (
      <View>
        <Text style={styles.text}>value: {value}</Text>
      </View>
    );
  };

  const threeAxisText = () => {
    const {x, y, z} = sensorData[sensorName].slice(-1)[0];
    return (
      <View>
        <Text style={styles.text}>x: {x}</Text>
        <Text style={styles.text}>y: {y}</Text>
        <Text style={styles.text}>z: {z}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.block}>
      <Text style={styles.text}>{`${sensorName} 데이터 수집 중...`}</Text>
      {dataText()}
      <Text style={styles.text}>
        수집된 데이터 개수: {sensorData[sensorName].length}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          isRecordPage(false);
          navigation.pop();
        }}>
        <Text style={styles.textButton}>뒤로가기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  textButton: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    height: 40,
    borderWidth: 2,
    borderColor: '#6200ee',
    borderRadius: 4,
    position: 'absolute',
    bottom: '10%',
    width: Dimensions.get('window').width - 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ee',
  },
});
