import type { ReactNode, FC } from 'react'
import { memo, Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { DiscoverWrapper } from './style'
import { discoverMenu } from '@/assets/data/dixcover_menu'

interface Iprops {
  children?: ReactNode
}
const Discover: FC<Iprops> = () => {
  return (
    <DiscoverWrapper>
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => {
          return (
            <div className="navitem" key={item.title}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          )
        })}
      </div>
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </DiscoverWrapper>
  )
}
export default memo(Discover)
