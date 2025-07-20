import type { ReactNode, FC } from 'react'
import { memo, useEffect } from 'react'
import { fetchBannerDataAction, fetchHotRecommendDataAction } from './store'
import { useAppDispatch, useAppSelector } from '@/store'
import Banners from './c-cpns/banners'
import Recommenditem from '@/base-ui/recommenditem'
import Headerv1 from '@/base-ui/headerv1'
import { RecommendWrapper } from './style'

interface Iprops {
  children?: ReactNode
}
const Recommend: FC<Iprops> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBannerDataAction())
    dispatch(fetchHotRecommendDataAction())
  }, [dispatch])

  const hotRecommend = useAppSelector((state) => state.recommend.hotrecommend)

  return (
    <RecommendWrapper>
      <Banners />
      <div className="hotRecommend">
        <Headerv1 />
        <div className="content">
          {hotRecommend.map((item) => {
            return <Recommenditem Data={item} key={item.name} />
          })}
        </div>
      </div>
    </RecommendWrapper>
  )
}
export default memo(Recommend)
