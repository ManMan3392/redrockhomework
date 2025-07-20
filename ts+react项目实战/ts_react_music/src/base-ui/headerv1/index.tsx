import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { HeaderV1Wrapper } from './style'
import { Link } from 'react-router-dom'

interface Iprops {
  children?: ReactNode
  title?: string
  navitem?: string[]
  moretext?: string
}
const Headerv1: FC<Iprops> = (props) => {
  const {
    title = '热门推荐',
    navitem = ['华语', '流行', '摇滚', '民谣', '电子'],
  } = props
  return (
    <HeaderV1Wrapper>
      <div className="left">
        <div className="icon"></div>
        <h2>{title}</h2>
        <div className="hotrecommendnav">
          {navitem.map((item, index) => (
            <span key={index}>
              <Link to={'/discover/songs'}>{item}</Link>
              {index < navitem.length - 1 && <span className="line">|</span>}
            </span>
          ))}
        </div>
      </div>
      <div className="right">
        <Link to={'/discover/songs'}>更多</Link>
        <div className="righticon"></div>
      </div>
    </HeaderV1Wrapper>
  )
}
export default memo(Headerv1)
