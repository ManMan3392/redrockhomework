import { createSlice } from "@reduxjs/toolkit";
const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 88
    },
    reducers: {
        changeNum(state, { payload }) {
            state.count += payload
        }
    }
})
export const { changeNum } = counterSlice.actions
export default counterSlice.reducer