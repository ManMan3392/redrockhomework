import React, { memo, useCallback, useRef, useState } from 'react'
const UseCallbacksonComponent = memo((props) => {
    const { changeNum } = props
    return (
        <div>
            <button onClick={e => changeNum()}>sonComponent+1</button>
        </div>
    )
})
const UseCallback = memo(() => {
    const [num, setnum] = useState(0)
    const countRef = useRef()
    countRef.current = num
    const changeNum = useCallback(() => setnum(countRef.current + 1), [])
    return (
        <div>
            <h2>callback数据展示{num}</h2>
            <button onClick={e => changeNum()}>+1</button>
            <UseCallbacksonComponent changeNum={changeNum} />
        </div>
    )
})

export default UseCallback 