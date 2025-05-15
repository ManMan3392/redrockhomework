import React, { memo, useEffect, useState } from 'react'

const Counter = memo(() => {
    const [counter, changecounter] = useState(100)
    const [message, changeMessage] = useState('Hello world')
    const setcounter = (num) => {
        const nums = counter + Number(num)
        changecounter(nums)
    }
    useEffect(
        () => {
            console.log('监听counter改变')
            return () => {
                console.log('卸载时取消counter监听')
            }
        }, [counter]
    )
    useEffect(
        () => {
            console.log('监听message改变')
            return () => {
                console.log('卸载时取消message监听')
            }
        }, [message]
    )
    useEffect(
        () => {
            console.log('发送网络请求，只在第一次渲染时执行')
        }, []
    )
    useEffect(
        () => {
            console.log('每次更新数据都执行')
            return () => {
                console.log('卸载时取消每次更新都执行的监听')
            }
        }
    )
    return (
        <div>
            <h2>{counter}</h2>
            <h2>{message}</h2>
            <button onClick={() => changeMessage('Hello react')}>改变message</button>
            <button onClick={() => setcounter(1)}>+1</button>
            <button onClick={() => setcounter(-1)}>-1</button>

        </div>
    )
})

export default Counter