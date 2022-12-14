import {NativeModules} from 'react-native';

const {
  accelerometer,
  gyroscope,
  ambientTemperature,
  gravity,
  light,
  linearAcceleration,
  magneticField,
  pressure,
  proximity,
  relativeHumidity,
  rotationVector,
} = NativeModules;

const sensorMap = new Map([
  ['accelerometer', accelerometer],
  ['gyroscope', gyroscope],
  ['ambientTemperature', ambientTemperature],
  ['gravity', gravity],
  ['light', light],
  ['linearAcceleration', linearAcceleration],
  ['magneticField', magneticField],
  ['pressure', pressure],
  ['proximity', proximity],
  ['relativeHumidity', relativeHumidity],
  ['rotationVector', rotationVector],
]);

export const sensorSubscription = new Map([
  ['accelerometer', null],
  ['gyroscope', null],
  ['ambientTemperature', null],
  ['gravity', null],
  ['light', null],
  ['linearAcceleration', null],
  ['magneticField', null],
  ['pressure', null],
  ['proximity', null],
  ['relativeHumidity', null],
  ['rotationVector', null],
]);

export const getSensorList = () => {
  return Array.from(sensorMap.keys());
};

export const getSensorModule = sensorName => {
  return sensorMap.get(sensorName);
};

export const isAvailable = async sensorName => {
  return await sensorMap.get(sensorName).isAvailable();
};
export const isAvailableAll = async () => {
  const _sensorList = await getSensorList();
  return Promise.all(_sensorList.map(sensorName => isAvailable(sensorName)));
};

export const startUpdates = sensorName =>
  sensorMap.get(sensorName).startUpdates();
export const stopUpdates = sensorName =>
  sensorMap.get(sensorName).stopUpdates();
