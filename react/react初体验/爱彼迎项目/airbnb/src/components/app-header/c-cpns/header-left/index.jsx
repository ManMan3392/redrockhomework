import React, { memo } from 'react'
import { LeftWrapper } from './style'
import IconLogo from '@/asset/svg/icon_logo'

const HeaderLeft = memo(() => {
    return (
        <LeftWrapper>
            <div className="logo">
                <IconLogo />
            </div>

        </LeftWrapper>
    )
})

export default HeaderLeft