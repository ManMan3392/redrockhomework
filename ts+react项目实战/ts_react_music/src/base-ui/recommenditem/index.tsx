import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { ItemWrapper } from './style'
import { formatCount, getImageSize } from '@/utils/format'

interface Iprops {
  children?: ReactNode
  Data: {
    picUrl: string
    playCount: number
  }
}
const RecommendItem: FC<Iprops> = (props) => {
  const { Data } = props
  return (
    <ItemWrapper>
      <div className="cover1">
        <img src={getImageSize(Data.picUrl, 140)} />
        <div className="cover2">
          <div className="listener"></div>
          <div className="listenCount">{formatCount(Data.playCount)}</div>
          <div className="playIcon"></div>
        </div>
      </div>
    </ItemWrapper>
  )
}
export default memo(RecommendItem)
