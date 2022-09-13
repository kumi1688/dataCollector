import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  record: false,
  recordPage: false,
};

const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    startRecord(state, action) {
      state.record = true;
    },
    stopRecord(state, action) {
      state.record = false;
    },
    isRecordPage(state, action) {
      state.recordPage = action.payload;
    },
  },
});

export default recordSlice.reducer;
export const {startRecord, stopRecord, isRecordPage} = recordSlice.actions;
