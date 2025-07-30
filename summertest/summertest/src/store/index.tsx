import { configureStore } from '@reduxjs/toolkit'
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import scheduleReducer from './scheduleSlice'
import newStudentsReducer from './newStudents'
import changeCourseReducer from './changeCourseSlice'
import showStudentsReducer from './showStudents'

const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
    newstudents: newStudentsReducer,
    changeCourse: changeCourseReducer,
    showStudents: showStudentsReducer,
  },
})

type GetStateFnType = typeof store.getState

export type IRootState = ReturnType<GetStateFnType>
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

type Dispatchtype = typeof store.dispatch
export const useAppDispatch: () => Dispatchtype = useDispatch
export const shallowEqualApp = shallowEqual
export default store
