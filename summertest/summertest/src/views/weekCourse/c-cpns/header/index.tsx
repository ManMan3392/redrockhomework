import type { ReactNode, FC } from 'react'
import { memo, useState } from 'react'
import { HeaderWrapper } from './style'
import { formatNumber } from '@/utils/formatnumber'
import { useAppDispatch, useAppSelector } from '@/store'
import { clearNewStudentsData, fetchnewstudents } from '@/store/newStudents'
import { showStudents, hideStudents } from '@/store/showStudents'
import single_bg from '@/assets/img/single_person_bg.png'
import paterner_bg from '@/assets/img/parterner_bg.png'

interface Iprops {
  children?: ReactNode
  currentWeek: number
  onWeekChange: (week: number) => void
}
const Head: FC<Iprops> = (props) => {
  const { currentWeek, onWeekChange } = props
  const { weeks } = useAppSelector((state) => state.schedule)
  const dispatch = useAppDispatch()
  const { isShowStudents } = useAppSelector((state) => state.showStudents)
  const dates = weeks
    .flatMap((week) =>
      week.courses.map((course) => ({
        date: course.date,
        weekNumber: week.weekNumber,
      })),
    )
    .filter(
      (item, index, self) =>
        self.findIndex((i) => i.date === item.date) === index,
    )

  const handleClick = () => {
    console.log(1)
    if (isShowStudents) {
      dispatch(clearNewStudentsData())
      dispatch(hideStudents())
    } else {
      dispatch(fetchnewstudents())
      dispatch(showStudents())
    }
  }

  return (
    <HeaderWrapper>
      <div className="header">
        <div className="week-navigation">
          {currentWeek === 0 ? (
            <h2>整学期</h2>
          ) : (
            <h2>第{formatNumber(currentWeek)}周</h2>
          )}
        </div>
        <div
          className="newstudents"
          onClick={handleClick}
          style={{
            background: isShowStudents
              ? `url(${paterner_bg}) no-repeat`
              : `url(${single_bg}) no-repeat`,
          }}
        ></div>
        <button
          className="back-to-today"
          onClick={() => {
            const today = new Date().toISOString().split('T')[0]
            const todayInfo = dates.find((info) => info.date === today)
            if (todayInfo) {
              onWeekChange(todayInfo.weekNumber)
            } else {
              onWeekChange(-1)
            }
            
          }}
        >
          回到本周
        </button>
      </div>
    </HeaderWrapper>
  )
}
export default memo(Head)

