import {useDispatch} from 'react-redux';
import {startRecord, stopRecord, isRecordPage} from '../slices/record';

export default function useRecordActions() {
  const dispatch = useDispatch();
  return {
    startRecord: () => dispatch(startRecord()),
    stopRecord: () => dispatch(stopRecord()),
    isRecordPage: state => dispatch(isRecordPage(state)),
  };
}
