import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { ItemWrapper } from './style'
import { formatCount, getImageSize } from '@/utils/format'

interface Iprops {
  children?: ReactNode
  Data: {
    picUrl: string
    playCount?: number
    name: string
    artistName?: string
    coverUrl?: string
  }
  bottomcover?: boolean
  width?: number
  height?: number
}
const RecommendItem: FC<Iprops> = (props) => {
  const { Data, bottomcover = true, width = 140, height = width } = props
  return (
    <ItemWrapper>
      <div
        className="cover1"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="msk"></div>
        {Data.picUrl && (
          <img src={getImageSize(Data.picUrl, width, height)} alt="" />
        )}
        {bottomcover && Data.playCount && (
          <div className="cover2">
            <div className="listener"></div>
            <div className="listenCount">{formatCount(Data.playCount)}</div>
            <div className="playIcon"></div>
          </div>
        )}
      </div>
    </ItemWrapper>
  )
}
export default memo(RecommendItem)
