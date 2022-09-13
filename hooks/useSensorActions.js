import {useDispatch} from 'react-redux';
import {
  saveSensorData,
  setTargetSensors,
  clearSensorData,
} from '../slices/sensor';

export default function useSensorActions() {
  const dispatch = useDispatch();
  return {
    saveSensorData: data => dispatch(saveSensorData(data)),
    setTargetSensors: data => dispatch(setTargetSensors(data)),
    clearSensorData: () => dispatch(clearSensorData()),
  };
}
