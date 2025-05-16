import React, { memo, useContext } from 'react'
import { ThemeContext, UserContext } from '../context'

const UseContext = memo(() => {
    const user = useContext(UserContext)
    const theme = useContext(ThemeContext)

    return (
        <div>
            <div className="usertab">
                <h2>{user.name}</h2>
                <h2>{user.age}</h2>
            </div>
            <div className="theme"
                style={{ color: theme.color, fontSize: theme.size }}
            >Theme</div>
        </div>
    )
})

export default UseContext