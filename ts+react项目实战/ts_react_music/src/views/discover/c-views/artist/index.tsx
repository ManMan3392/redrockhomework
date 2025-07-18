import type { ReactNode, FC } from 'react'
import { memo } from 'react'

interface Iprops {
  children?: ReactNode
}
const Artist: FC<Iprops> = () => {
  return <div>Artist</div>
}
export default memo(Artist)
