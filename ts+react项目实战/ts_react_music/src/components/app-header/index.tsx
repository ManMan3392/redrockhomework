import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { SearchOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style'
import headerTitles from '@/assets/data/header_titles.json'

interface Iprops {
  children?: ReactNode
}
const AppHeader: FC<Iprops> = () => {
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <div className="logo"></div>
          <div className="navbar">
            {headerTitles.map((item) => {
              return item.type === 'path' ? (
                <NavLink to={item.link} key={item.title}>
                  {item.title}
                </NavLink>
              ) : (
                <a
                  key={item.title}
                  href={item.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.title}
                </a>
              )
            })}
            <div className="navbarhot"></div>
          </div>
        </HeaderLeft>
        <HeaderRight>
          <div className="headersearch">
            <Space.Compact size="large">
              <Input
                addonBefore={<SearchOutlined />}
                placeholder="音乐/视频/电台/用户"
                size="middle"
                className="search"
                variant="borderless"
              />
            </Space.Compact>
          </div>
          <div className="headercreater">创作者中心</div>
          <div className="headerlogin">
            <a href="#">登录</a>
          </div>
        </HeaderRight>
      </div>
      <div className="headerbottom"></div>
    </HeaderWrapper>
  )
}
export default memo(AppHeader)
