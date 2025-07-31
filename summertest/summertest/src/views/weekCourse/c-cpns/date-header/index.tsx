import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { HeaderWrapper } from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import {weekDay} from '@/assets/data/time'

interface Iprops {
  children?: ReactNode
  weeknumber: number
}
const DateHeader: FC<Iprops> = (props) => {
  const { weeknumber } = props
  const { weeks } = useAppSelector((state) => state.schedule, shallowEqual)
  const currentWeek = weeks.find((w) => w.weekNumber === weeknumber) || {
    dailyCourses: Array(7).fill([]),
  }
  const weekCourses = currentWeek.dailyCourses

  return (
    <HeaderWrapper>
      <div className="date-header">
        <div className="days">
          {weekCourses && weeknumber !== -1 && (
            <div className="month">
              {Number(weekCourses[0]?.[0]?.date?.split('-')[1])}月
            </div>
          )}
          {weeknumber !== -1 ?weekCourses?.map((dateInfo, index) => {
            if (!dateInfo || !dateInfo[0]?.date) return null
            const [, , day] = dateInfo[0].date.split('-')?.map(Number)
            return (
              <div key={index} className="day-item">
                <div>{dateInfo[0].day}</div>
                <div className="miniday">{`${day}日`}</div>
              </div>
            )
          }):weekDay.map((item,index) => {
            return (
              <div key={index} className="day-item">
                <div>{item}</div>
              </div>
            )
          })}
        </div>
      </div>
    </HeaderWrapper>
  )
}
export default memo(DateHeader)
