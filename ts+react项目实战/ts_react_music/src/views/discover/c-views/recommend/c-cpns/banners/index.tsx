import type { FC, ReactNode } from 'react'
import { memo, useRef, useState } from 'react'
import { useAppSelector } from '@/store'
import { BannersWrapper } from './style'
import { Carousel, ConfigProvider } from 'antd'
import { Link } from 'react-router-dom'
import type { CarouselRef } from 'antd/es/carousel'

interface Iprops {
  children?: ReactNode
}
const Banners: FC<Iprops> = () => {
  const banners = useAppSelector((state) => state.recommend.banners)
  const [imgIndex, setimgIndex] = useState(0)

  const handleChange = (old: number, currents: number) => {
    setimgIndex(currents)
  }

  const imgUrl = `${banners[imgIndex]?.imageUrl}?imageView&blur=40x20`

  const bannerRef = useRef<CarouselRef>(null)
  const handleLeftClick = (isLeft: boolean = true) => {
    isLeft ? bannerRef.current?.prev() : bannerRef.current?.next()
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            dotHeight: '6px',
            dotWidth: '6px',
            dotActiveWidth: '6px',
            dotGap: 8,
          },
        },
      }}
    >
      <BannersWrapper
        style={{
          background: `url(${imgUrl}) center center / 6000px`,
          transition: 'background-image 2s ease-in-out',
        }}
      >
        <div className="bannercontent">
          <div
            className="leftarrow"
            onClick={() => {
              handleLeftClick(true)
            }}
          ></div>
          <div className="banner">
            <Carousel
              autoplay
              autoplaySpeed={4500}
              fade
              beforeChange={handleChange}
              speed={2000}
              ref={bannerRef}
            >
              {banners.map((item) => {
                return <img src={item.imageUrl} alt="" key={item.imageUrl} />
              })}
            </Carousel>
          </div>
          <Link className="download" to={'/download'}></Link>
          <div
            className="rightarrow"
            onClick={() => {
              handleLeftClick(false)
            }}
          ></div>
        </div>
      </BannersWrapper>
    </ConfigProvider>
  )
}
export default memo(Banners)
