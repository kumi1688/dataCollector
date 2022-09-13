import storage from '@react-native-firebase/storage';

export async function saveSensorData(data) {
  const reference = storage().ref('/sensor/1');
  await reference.put(data);
}
