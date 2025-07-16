import React, { memo } from 'react'
import { EntireWrapper } from './style'
import EntireFilter from './c-cpns/entire-fiter'

const Entire = memo(() => {
    return (
        <EntireWrapper>
            <EntireFilter />
            <div className="rooms"></div>
            <div className="pagination"></div>
        </EntireWrapper>
    )
})

export default Entire