import type { ReactNode, FC } from 'react'
import { memo } from 'react'

interface Iprops {
  children?: ReactNode
}
const AppFooter: FC<Iprops> = () => {
  return <div>AppFooter</div>
}
export default memo(AppFooter)
