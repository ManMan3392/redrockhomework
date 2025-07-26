import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { ChangeWrapper } from './style'

interface Iprops {
  children?: ReactNode
}
const Change: FC<Iprops> = () => {
  return <ChangeWrapper>Change</ChangeWrapper>
}
export default memo(Change)
