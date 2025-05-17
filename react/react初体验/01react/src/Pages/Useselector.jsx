import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { changeNum } from '../store/features/counter'
import { shallowEqual } from 'react-redux'

const Useselector = memo(() => {
    const { count } = useSelector((state) => ({
        count: state.counter.count
    }), shallowEqual)
    const dispatch = useDispatch()
    const changeNameHandle = (num) => {
        num = num - 0
        dispatch(changeNum(num))
    }
    return (
        <div>
            <h2>useselector数据展示：{count}</h2>
            <button onClick={e => changeNameHandle(1)}>+1</button>
            <button onClick={e => changeNameHandle(-1)}>-1</button>

            <button onClick={e => changeNameHandle(10)}>+10</button>

            <button onClick={e => changeNameHandle(-10)}>-10</button>

        </div>
    )
})

export default Useselector