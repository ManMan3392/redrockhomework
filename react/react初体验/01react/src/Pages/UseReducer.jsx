
import React, { memo, useReducer } from 'react'
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + action.num }
        case 'decrement':
            return { ...state, count: state.count - action.num }
        case 'changmessage':
            return { ...state, message: action.message }
        default:
            return state
    }
}

const UseReducer = memo(() => {
    const [state, dispatch] = useReducer(reducer, { count: 0, message: 'why' })
    return (
        <div>
            <h2>当前计数：{state.count}</h2>

            <button onClick={e => dispatch({ type: 'increment', num: 1 })}>+1</button>
            <button onClick={e => dispatch({ type: 'decrement', num: 1 })}>-1</button>

            <button onClick={e => dispatch({ type: 'increment', num: 5 })}>+5</button>

            <button onClick={e => dispatch({ type: 'decrement', num: 5 })}>-5</button>
            <h2>message:{state.message}</h2>
            <button onClick={e => dispatch({ type: 'changmessage', message: 'zmy' })}>改变message</button>

        </div>
    )
})

export default UseReducer