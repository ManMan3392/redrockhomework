import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { ChangeWeekWrapper } from './style'

interface Iprops {
  children?: ReactNode
}
const ChangeWeek: FC<Iprops> = () => {
  return <ChangeWeekWrapper>ChangeWeek</ChangeWeekWrapper>
}
export default memo(ChangeWeek)
