import type { ReactNode, FC } from 'react'
import { memo, useEffect, useState } from 'react'
import { ChangePageWrapper } from './style'
import Changebar from '../changebar'
import { WEEK_DAYS, SECTION, WEEKNUMBER } from '@/assets/data/weekday_section'
import { useAppDispatch, useAppSelector } from '@/store'
import { setDaynumber, setSection, addDaynumber, addSection,setWeeknumber } from '@/store/changeCourseSlice'
import { shallowEqual } from 'react-redux'



interface Iprops {
  children?: ReactNode
    isChangePage: boolean
    isPush: boolean
  setIsChangePage: (isChangePage: boolean) => void
  chooseWeek:boolean
}

const ChangePage: FC<Iprops> = ({ isChangePage, isPush, setIsChangePage, chooseWeek}) => {
  const [isChoose, setIsChoose] = useState(false)
  const weeknumber = useAppSelector(state => state.changeCourse.weeknumber,shallowEqual)
  const daynumber = useAppSelector(state => state.changeCourse.daynumber,shallowEqual)
  const section = useAppSelector(state => state.changeCourse.section,shallowEqual)
  const dispatch = useAppDispatch()

  // 添加三个状态存储子组件 activeIndex
  const [dayIndex, setDayIndex] = useState(daynumber[0])
  const [sectionIndex1, setSectionIndex1] = useState(section[0][0] - 1)
  const [sectionIndex2, setSectionIndex2] = useState(section[0][1] - 1)
  const [newweeknumber,setnewWeeknumber] = useState(weeknumber)

  useEffect(() => {
    setnewWeeknumber(weeknumber)
  }, [isChangePage])

  
  const handleClick = (item: number) => {
    console.log(item)
    // 修改前：setnewWeeknumber([...newweeknumber, item])
    setnewWeeknumber(prev => 
      prev.includes(item) 
        ? prev.filter(num => num !== item)  // 已选中则移除
        : [...prev, item]                  // 未选中则添加
    );
  }

  const handleCommit = () => {
    if (!chooseWeek) {
      setIsChoose(true)
      setIsChangePage(false)
      // 点击确定时获取三个子组件的activeIndex
      const result = {
        day: dayIndex,
        section1: sectionIndex1,
        section2: sectionIndex2,
      }
      if (isPush) {
        dispatch(addDaynumber(dayIndex))
        dispatch(addSection([sectionIndex1 + 1, sectionIndex2 + 1]))
      } else {
        dispatch(setDaynumber([dayIndex]))
        dispatch(setSection([[sectionIndex1 + 1, sectionIndex2 + 1]]))
      }
    } else {
      setIsChangePage(false)
      dispatch(setWeeknumber(newweeknumber))
    }
  }



  return (
    <ChangePageWrapper style={{ bottom: isChangePage ? '0px' : '-500px' }}>
      {chooseWeek ? (
        <div className="weeknumber">
          {WEEKNUMBER.map((item, index) => (
            <div
              className="weeknumber-item"
              style={{
                color: newweeknumber.includes(index)
                  ? 'rgb(239, 181, 181)'
                  : '',
              }}
              onClick={() => handleClick(index)}
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
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
            choose={section[0][1] - 1}
            onActiveIndexChange={setSectionIndex2} // 绑定回调
          />
        </div>
      )}

      <div
        className="button"
        onClick={handleCommit}
      >
        确定
      </div>
    </ChangePageWrapper>
  )
}

export default memo(ChangePage)
