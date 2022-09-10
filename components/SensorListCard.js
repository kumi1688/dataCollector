import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function SensorListCard({
  sensorName,
  isAvailable,
  isCollect,
  toggleCollectData,
}) {
  const onPress = () => {
    toggleCollectData(sensorName);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, styles.marginTop]}>
      <Text style={styles.text}>{sensorName}</Text>
      {isCollect ? (
        <Text
          style={[
            styles.text,
            isAvailable && styles.availableCollect,
            !isAvailable && styles.notAvailableCollect,
          ]}>
          {isAvailable === true ? '수집가능' : '수집불가'}
        </Text>
      ) : (
        <Text style={[styles.text, styles.stopCollect]}>수집중단</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  marginTop: {
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  availableCollect: {color: 'blue'},
  notAvailableCollect: {
    color: 'red',
  },
  stopCollect: {
    textDecorationLine: 'line-through',
    color: 'red',
  },
});
