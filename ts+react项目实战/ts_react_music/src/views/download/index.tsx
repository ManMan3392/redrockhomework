import type { ReactNode, FC } from 'react'
import { memo } from 'react'

interface Iprops {
  children?: ReactNode
}
const Dowload: FC<Iprops> = () => {
  return <div>Dowload</div>
}
export default memo(Dowload)
