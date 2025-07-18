import type { ReactNode, FC } from 'react'
import { memo } from 'react'

interface Iprops {
  children?: ReactNode
}
const Foucs: FC<Iprops> = () => {
  return <div>Foucs</div>
}
export default memo(Foucs)
