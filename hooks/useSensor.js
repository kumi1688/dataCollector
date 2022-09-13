import {useSelector} from 'react-redux';

export default function useSensor() {
  return useSelector(state => state.sensor);
}
