import type { ReactNode, FC } from 'react'
import { memo, useEffect } from 'react'
import {
  fetchBannerDataAction,
  fetchHotRecommendDataAction,
  fetchNewAlbumDataAction,
} from './store'
import { useAppDispatch, useAppSelector } from '@/store'
import Banners from './c-cpns/banners'
import Recommenditem from '@/base-ui/recommenditem'
import Headerv1 from '@/base-ui/headerv1'
import { RecommendWrapper } from './style'
import LoginItem from './c-cpns/login'
import NewAlbum from './c-cpns/newalbum'

interface Iprops {
  children?: ReactNode
}
const Recommend: FC<Iprops> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBannerDataAction())
    dispatch(fetchHotRecommendDataAction())
    dispatch(fetchNewAlbumDataAction())
  }, [dispatch])

  const hotRecommend = useAppSelector((state) => state.recommend.hotrecommend)
  const newAlbum = useAppSelector((state) => state.recommend.newAlbum)

  return (
    <RecommendWrapper>
      <div className="banner">
        <Banners />
      </div>
      <div className="content">
        <div className="left">
          <div className="hotRecommend">
            <Headerv1 />
            <div className="itemcontent">
              {hotRecommend.map((item) => {
                return (
                  <div className="items">
                    <Recommenditem Data={item} key={item.name} />
                    <div className="desc">{item.name}</div>
                    {item.artistName && (
                      <div className="artist">{item.artistName}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <NewAlbum Data={newAlbum} />
        </div>
        <div className="right">
          <LoginItem />
        </div>
      </div>
    </RecommendWrapper>
  )
}
export default memo(Recommend)
