import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBanners, getHotRecommend } from '../service'
//派发异步事件
export const fetchBannerDataAction = createAsyncThunk(
  'banner',
  async (args, { dispatch }) => {
    const res = await getBanners()
    dispatch(changeBannerAction(res.data.banners))
  },
)
export const fetchHotRecommendDataAction = createAsyncThunk(
  'HotRecommend',
  async (args, { dispatch }) => {
    const res = await getHotRecommend()
    dispatch(changeHotRecommendAction(res.data.result))
  },
)
interface IRecommendState {
  banners: any[]
  hotrecommend: any[]
}

const initialState: IRecommendState = {
  banners: [],
  hotrecommend: [],
}
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannerAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotrecommend = payload
    },
  },
})

export const { changeBannerAction, changeHotRecommendAction } =
  recommendSlice.actions
export default recommendSlice.reducer
