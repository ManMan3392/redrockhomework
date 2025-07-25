import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSchedule } from '../service/scheduleApi'

export const fetchSchedule = createAsyncThunk(
  'schedule/fetchSchedule',
  async () => {
    const res = await getSchedule()
    return res.data
  },
)

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    data: {},
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || '获取失败'
      })
  },
})

export default scheduleSlice.reducer
