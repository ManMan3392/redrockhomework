import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSchedule } from '../service/scheduleApi'

const newstudentsSlice = createSlice({
  name: 'newstudents',
  initialState: {
    isShowStudents: false,
  },
  reducers: {
    showStudents: (state) => {
      state.isShowStudents = true
    },
    hideStudents: (state) => {
      state.isShowStudents = false
    },
  },
})

export const { showStudents, hideStudents } = newstudentsSlice.actions
export default newstudentsSlice.reducer
