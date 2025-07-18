import type { ReactNode, FC } from 'react'
import { memo } from 'react'

interface Iprops {
  children?: ReactNode
}
const Songs: FC<Iprops> = () => {
  return <div>Songs</div>
}
export default memo(Songs)
