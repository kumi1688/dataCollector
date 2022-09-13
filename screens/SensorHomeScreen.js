import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  NativeEventEmitter,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SensorListCard from '../components/SensorListCard';
import {getSensorList, isAvailableAll} from '../lib/sensor/sensor';
import useRecord from '../hooks/useRecord';
import {getSensorModule, startUpdates, stopUpdates} from '../lib/sensor/sensor';
import useSensorActions from '../hooks/useSensorActions';

export default function SensorHomeScreen() {
  const [sensorList, setSensorList] = useState();
  const {record} = useRecord();
  const {saveSensorData, setTargetSensors} = useSensorActions();

  useEffect(() => {
    async function _checkAvailable() {
      let _sensorList = getSensorList().map(item => {
        return {sensorName: item, isAvailable: false, isCollect: true};
      });

      const _isAvailable = await isAvailableAll();
      for (let i = 0; i < _sensorList.length; i++) {
        _sensorList[i].isAvailable = _isAvailable[i];
      }
      setSensorList(_sensorList);
      setTargetSensors(_sensorList.map(item => item.sensorName));
    }
    _checkAvailable();
  }, []);

  useEffect(() => {
    if (record) {
      async function _startSensorUpdates() {
        for (let sensor of sensorList) {
          if (sensor.isAvailable && sensor.isCollect) {
            const {sensorName} = sensor;
            const emitter = new NativeEventEmitter(getSensorModule(sensorName));
            emitter.addListener(sensorName, event => {
              const data = JSON.parse(event);
              saveSensorData({sensorName, newValue: data});
            });
            startUpdates(sensorName);
          }
        }
      }
      _startSensorUpdates();
    }
  }, [record, sensorList]);

  const toggleCollectData = sensorName => {
    const newList = sensorList.map(item => {
      return item.sensorName !== sensorName
        ? item
        : {
            ...item,
            isCollect: !item.isCollect,
          };
    });
    setSensorList(newList);
  };

  if (!sensorList) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.block}>
      <FlatList
        data={sensorList}
        keyExtractor={item => item.sensorName}
        renderItem={({item}) => (
          <SensorListCard
            sensorName={item.sensorName}
            isAvailable={item.isAvailable}
            isCollect={item.isCollect}
            toggleCollectData={toggleCollectData}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    padding: 16,
  },
});
