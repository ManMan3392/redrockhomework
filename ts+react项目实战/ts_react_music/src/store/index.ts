import { configureStore } from '@reduxjs/toolkit'
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import recommendReducer from '../views/discover/c-views/recommend/store'

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
  },
})

//拿到返回值类型的另一种方法：
// const state = store.getState()
// type StateType = typeof state

type GetStateFnType = typeof store.getState
//得到取仓库的函数的类型，工具底层调用getState拿到数据
//TypeScript 无法直接获取运行时值的类型：
// 编译时，store.getState() 并未执行，因此无法直接获取其返回值的类型。
// ReturnType 是编译时的类型工具：
// 它通过静态分析函数的类型定义，推导出返回值类型，无需执行函数。

type IRootState = ReturnType<GetStateFnType>
//得到该函数返回值的类型，就是数据的类型
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
// 将useSelector赋值给自定义函数，并传入返回结果的类型
//源码如下
// interface TypedUseSelectorHook<TState> {
//     <TSelected>(selector: (state: TState) => TSelected, equalityFn?: EqualityFn<NoInfer<TSelected>>): TSelected;
//函数签名
//     <Selected = unknown>(selector: (state: TState) => Selected, options?: UseSelectorOptions<Selected>): Selected;
// }
type Dispatchtype = typeof store.dispatch
export const useAppDispatch: () => Dispatchtype = useDispatch
export const shallowEqualApp = shallowEqual
export default store
