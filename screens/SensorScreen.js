import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SensorListCard from '../components/SensorListCard';
import {getSensorList, isAvailableAll} from '../lib/sensor/sensor';

export default function SensorScreen() {
  const [sensorList, setSensorList] = useState();

  useEffect(() => {
    let _sensorList = getSensorList().map(item => {
      return {sensorName: item, isAvailable: false, isCollect: true};
    });
    async function _checkAvailable() {
      const _isAvailable = await isAvailableAll();
      for (let i = 0; i < _sensorList.length; i++) {
        _sensorList[i].isAvailable = _isAvailable[i];
      }
      setSensorList(_sensorList);
    }
    _checkAvailable();
  }, []);

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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
