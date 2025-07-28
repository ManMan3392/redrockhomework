import type { ReactNode, FC } from 'react'
import { memo, useState } from 'react'
import { ChangePageWrapper } from './style'
import Changebar from '../changebar'
import { WEEK_DAYS, SECTION } from '@/assets/data/weekday_section'
import { useAppDispatch, useAppSelector } from '@/store'
import { setDaynumber, setSection, addDaynumber, addSection } from '@/store/changeCourseSlice'

interface Iprops {
  children?: ReactNode
    isChangePage: boolean
    isPush: boolean
    setIsChangePage: (isChangePage: boolean) => void
}

const ChangePage: FC<Iprops> = ({ isChangePage, isPush, setIsChangePage }) => {
  const [isChoose, setIsChoose] = useState(false)
  const daynumber = useAppSelector(state => state.changeCourse.daynumber)
  const section = useAppSelector(state => state.changeCourse.section)
  const dispatch = useAppDispatch()

  // 添加三个状态存储子组件 activeIndex
  const [dayIndex, setDayIndex] = useState(daynumber[0])
  const [sectionIndex1, setSectionIndex1] = useState(section[0][0] - 1)
  const [sectionIndex2, setSectionIndex2] = useState(section[0][1] - 1)
  


  return (
    <ChangePageWrapper style={{ height: isChangePage ? '380px' : '0px' }}>
      <div className="choose">
        <div className="border"></div>
        <div className="msk"></div>
        <div className="msk2"></div>
        {/* 第一个子组件：day选择器 */}
        <Changebar
          items={WEEK_DAYS}
          choose={daynumber[0]}
          onActiveIndexChange={setDayIndex} // 绑定回调
        />
        {/* 第二个子组件：section选择器1 */}
        <Changebar
          items={SECTION}
          choose={section[0][0] - 1}
          onActiveIndexChange={setSectionIndex1} // 绑定回调
        />
        {/* 第三个子组件：section选择器2 */}
        <Changebar
          items={SECTION}
          choose={section[0][0] - 1}
          onActiveIndexChange={setSectionIndex2} // 绑定回调
        />
      </div>

      <div
        className="button"
        onClick={() => {
            setIsChoose(true)
            setIsChangePage(false)
          // 点击确定时获取三个子组件的activeIndex
          const result = {
            day: dayIndex,
            section1: sectionIndex1,
            section2: sectionIndex2,
          }
          console.log('三个子组件的activeIndex:', result)
            // 这里可以添加你的业务逻辑（如提交到后端）
            if(isPush) {
              dispatch(addDaynumber(dayIndex))
              dispatch(addSection([sectionIndex1 + 1, sectionIndex2 + 1]))
            } else {
              dispatch(setDaynumber([dayIndex]))
              dispatch(setSection([[sectionIndex1 + 1, sectionIndex2 + 1]]))
            }
        }}
      >
        确定
      </div>
    </ChangePageWrapper>
  )
}

export default memo(ChangePage)
