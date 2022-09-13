import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import useRecord from '../hooks/useRecord';
import {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import useRecordActions from '../hooks/useRecordActions';

export default function SensorListCard({
  sensorName,
  isAvailable,
  isCollect,
  toggleCollectData,
}) {
  const {record} = useRecord();
  const {isRecordPage} = useRecordActions();
  const navigation = useNavigation();

  const onPress = () => {
    if (record) {
      isRecordPage(true);
      navigation.push('SensorRecordScreen', {sensorName});
    } else {
      isRecordPage(false);
      toggleCollectData(sensorName);
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, styles.marginTop]}>
      <View style={styles.row}>
        <Text style={styles.text}>{sensorName}</Text>
        {cardText(isCollect, isAvailable, record)}
      </View>
    </TouchableOpacity>
  );
}

function cardText(isCollect, isAvailable, record) {
  // 센서를 사용하지 못하는 경우
  if (!isAvailable) {
    return (
      <Text style={[styles.text, styles.notAvailableCollect]}>수집불가</Text>
    );
  } else if (!isCollect) {
    // 센서를 사용할 수 있지만 수집하지 않는 경우
    return (
      <Text style={[styles.text, styles.notAvailableCollect]}>수집중단</Text>
    );
  } else if (!record) {
    // 센서 사용 가능하고 수집대상이지만, 아직 수집하지 않는 경우
    return <Text style={[styles.text, styles.availableCollect]}>수집가능</Text>;
  } else if (record) {
    // 수집 대상이며, 현재 수집중인 경우
    return <Text style={[styles.text, styles.whileCollect]}>수집중...</Text>;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 2,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  whileCollect: {
    color: 'purple',
  },
  stopCollect: {
    textDecorationLine: 'line-through',
    color: 'red',
  },
});
