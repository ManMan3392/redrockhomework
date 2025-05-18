import { getHomeGoodPriceData } from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHomeDataAction = createAsyncThunk('fetchdata', async () => {
    const res = await getHomeGoodPriceData()
    return res
})

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        goodPriceInfo: {}
    },
    reducers: {
        changeGoodPriceInfoAction(state, { payload }) {
            state.goodPriceInfo = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeDataAction.fulfilled, (state, { payload }) => {
                state.goodPriceInfo = payload
                state.isLoading = false
            })
    }
})

export const { changeGoodPriceInfoAction } = homeSlice.actions
export default homeSlice.reducer