import { configureStore } from '@reduxjs/toolkit'
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import scheduleReducer from './scheduleSlice'
import newStudentsReducer from './newStudents'

const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
    newstudents: newStudentsReducer,
  },
})

type GetStateFnType = typeof store.getState

type IRootState = ReturnType<GetStateFnType>
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

type Dispatchtype = typeof store.dispatch
export const useAppDispatch: () => Dispatchtype = useDispatch
export const shallowEqualApp = shallowEqual
export default store
