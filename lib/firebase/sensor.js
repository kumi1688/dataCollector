import storage from '@react-native-firebase/storage';
import {v4 as uuidv4} from 'uuid';

export async function saveSensorData(data) {
  const id = uuidv4();
  const reference = storage().ref(`/sensor/${id}.json`);
  await reference.putString(JSON.stringify(data));
}
