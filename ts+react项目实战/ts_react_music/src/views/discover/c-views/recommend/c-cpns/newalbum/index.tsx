import type { ReactNode, FC } from 'react'
import { memo, useRef } from 'react'
import React from 'react'
import { Carousel } from 'antd'
import { NewAlbumWrapper } from './style'
import Headerv1 from '@/base-ui/headerv1'
import Recommenditem from '@/base-ui/recommenditem'
import { CarouselRef } from 'antd/es/carousel'
import Item from 'antd/es/list/Item'

interface Obj {
  albumName: string
  artistName: string
  coverUrl: string
  albumId: number
}
interface Iprops {
  children?: ReactNode
  Data: Obj[]
}

const NewAlbum: FC<Iprops> = (props) => {
  const { Data } = props

  const bannerRef = useRef<CarouselRef>(null)
  const handleChange = (isLast: boolean = false) => {
    isLast ? bannerRef.current?.prev() : bannerRef.current?.next()
  }

  return (
    <NewAlbumWrapper>
      <Headerv1 title="新碟上架" navitem={[]} />
      <div className="newAlbumbanner">
        <div className="leftArrow" onClick={() => handleChange(true)}></div>
        <Carousel ref={bannerRef} speed={1200}>
          {[0, 1].map((iten) => (
            <div className="newAlbum">
              <div className="msk"></div>
              {Data.slice(5 * iten, 5 + 5 * iten).map((item) => (
                <div className="newAlbunItem" key={item.albumId}>
                  <Recommenditem
                    bottomcover={false}
                    width={100}
                    Data={{
                      name: item.albumName,
                      picUrl: item.coverUrl,
                      artistName: item.artistName,
                    }}
                  />
                  <div className="desc">
                    <div className="title">{item.albumName}</div>
                    <div className="aritist">{item.artistName}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
        <div className="rightArrow" onClick={() => handleChange()}></div>
      </div>
    </NewAlbumWrapper>
  )
}
export default memo(NewAlbum)
