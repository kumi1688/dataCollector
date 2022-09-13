import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function SensorDBScreen() {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>데이터 베이스 기록 확인 부분</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});
