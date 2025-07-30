import { createSlice } from '@reduxjs/toolkit'


const changeCourseSlice = createSlice({
  name: 'changeCourse',
  initialState: {
    weeknumber: [] as number[],
    daynumber: [] as number[],
    section: [] as number[][],
  },
  reducers: {
    addWeeknumber(state, action) {
      state.weeknumber.push(action.payload)
    },
    setWeeknumber(state, action) {
      state.weeknumber = [...action.payload]
    },
    addDaynumber(state, action) {
      state.daynumber.push(action.payload)
    },
    setDaynumber(state, action) {
      state.daynumber = [...action.payload]
    },
    addSection(state, action) {
      state.section.push(action.payload)
    },
    setSection(state, action) {
      state.section = [...action.payload]
    },
    updateChangeCourseTime: (state, action) => {
      state.weeknumber = action.payload.weeknumber
      state.daynumber = action.payload.daynumber
      state.section = action.payload.section
    },
  },
})

export const { setWeeknumber, setDaynumber, setSection, addDaynumber, addSection,addWeeknumber,updateChangeCourseTime } = changeCourseSlice.actions
export default changeCourseSlice.reducer
