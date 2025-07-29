import React, { ReactNode, useState } from 'react'
import { WeekWrapper } from './style'
import type { Course } from '@/service/types'
import DateHeader from './c-cpns/date-header'
import CourseTable from './c-cpns/course-table'
import Detail from './c-cpns/detail'

interface Iprops {
  children?: ReactNode
  weeknumber: number
}

const CourseSchedule: React.FC<Iprops> = ({ weeknumber }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false)

  return (
    <WeekWrapper>
      <DateHeader weeknumber={weeknumber} />
      <CourseTable
        setSelectedCourse={setSelectedCourse}
        setIsDetailVisible={setIsDetailVisible}
        isDetailVisible={isDetailVisible}
        weeknumber={weeknumber}
      />
      <Detail
        selectedCourse={selectedCourse as Course}
        isDetailVisible={isDetailVisible}
        setIsDetailVisible={setIsDetailVisible}
      />
    </WeekWrapper>
  )
}

export default CourseSchedule
