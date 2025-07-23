import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBanners, getHotRecommend, getNewAlbum } from '../service'
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
export const fetchNewAlbumDataAction = createAsyncThunk(
  'HotRecommend',
  async (args, { dispatch }) => {
    const res = await getNewAlbum()
    dispatch(changeNewAlbumAction(res.data.products))
  },
)

interface IRecommendState {
  banners: any[]
  hotrecommend: any[]
  newAlbum: any[]
}

const initialState: IRecommendState = {
  banners: [],
  hotrecommend: [],
  newAlbum: [],
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
    changeNewAlbumAction(state, { payload }) {
      state.newAlbum = payload
    },
  },
})

export const {
  changeBannerAction,
  changeHotRecommendAction,
  changeNewAlbumAction,
} = recommendSlice.actions
export default recommendSlice.reducer
