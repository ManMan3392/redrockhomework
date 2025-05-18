import React, { memo, useEffect, useState } from 'react'
import { RightWrapper } from './style'
import IconGlobal from '@/asset/svg/icon_global'
import IconMenu from '@/asset/svg/icon_menu'
import IconAvatar from '@/asset/svg/icon_avatar'

const HeaderRight = memo(() => {
    const [showPanel, setShowPanel] = useState(false)

    useEffect(() => {
        const windowHandleClick = () => {
            setShowPanel(false)
        }
        window.addEventListener('click', windowHandleClick, true)
        return () => {
            window.removeEventListener('click', windowHandleClick, true)
        }
    }, [])
    const profileClickHandle = () => {
        setShowPanel(true)
    }

    return (
        <RightWrapper>
            <div className="btns">
                <span className="btn">登录</span>
                <span className="btn">注册</span>
                <span className="btn"><IconGlobal /></span>
            </div>
            <div className="profile" onClick={profileClickHandle}>
                <IconMenu />
                <IconAvatar />
                {showPanel && (<div className="panel">
                    <div className="top">
                        <div className="item register">登录</div>
                        <div className="item login">注册</div>
                    </div>
                    <div className="bottom">
                        <div className="item">出租房源</div>
                        <div className="item">开展体验</div>
                        <div className="item">帮助</div>
                    </div>
                </div>)}
            </div>
        </RightWrapper>
    )
})

export default HeaderRight