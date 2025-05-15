import { createSlice } from "@reduxjs/toolkit";
const counterSlice = createSlice({
    name: "counter",
    initialState: {
        counter: 88
    },
    reducers: {
        changeNum(state, { payload }) {
            state.counter += payload
        }
    }
})
export const { changeNum } = counterSlice.actions
export default counterSlice.reducer