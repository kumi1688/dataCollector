import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  targetSensorNames: [],
  sensorData: {
    accelerometer: [],
    gyroscope: [],
    ambientTemperature: [],
    gravity: [],
    light: [],
    linearAcceleration: [],
    magneticField: [],
    pressure: [],
    proximity: [],
    relativeHumidity: [],
    rotationVector: [],
  },
};

const sensorSlice = createSlice({
  name: 'sensor',
  initialState,
  reducers: {
    setTargetSensors(state, action) {
      state.targetSensorNames = action.payload;
    },
    saveSensorData(state, action) {
      const {sensorName, newValue} = action.payload;
      state.sensorData[sensorName].push(newValue);
    },
    clearSensorData(state, action) {
      state.sensorData = initialState.sensorData;
    },
  },
});

export default sensorSlice.reducer;
export const {saveSensorData, setTargetSensors, clearSensorData} =
  sensorSlice.actions;
