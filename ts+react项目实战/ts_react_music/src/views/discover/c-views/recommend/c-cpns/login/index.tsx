import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { LoginItemWrapper } from './style'

interface Iprops {
  children?: ReactNode
}
const LoginItem: FC<Iprops> = () => {
  return (
    <LoginItemWrapper>
      <div className="vip">
        <img src="https://music.163.com/style/web2/img/dis_vip_card.png"></img>
      </div>
      <div className="login">
        <div className="desc">
          登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
        </div>
        <div className="button">用户登录</div>
      </div>
    </LoginItemWrapper>
  )
}
export default memo(LoginItem)
