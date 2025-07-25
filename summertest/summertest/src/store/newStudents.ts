import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSchedule } from '../service/scheduleApi'

export const fetchnewstudents = createAsyncThunk(
  'newstudents/fetchnewstudents',
  async () => {
    const res = await getSchedule()
    return res.data
  },
)

const newstudentsSlice = createSlice({
  name: 'newstudents',
  initialState: {
    data: {},
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchnewstudents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchnewstudents.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchnewstudents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || '获取失败'
      })
  },
})

export default newstudentsSlice.reducer
