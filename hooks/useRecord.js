import {useSelector} from 'react-redux';

export default function useRecord() {
  return useSelector(state => state.record);
}
