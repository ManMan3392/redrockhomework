import { FC, useState } from 'react'
import { WeekWrapper } from './style'
import type { Course } from '@/service/types'
import DateHeader from './c-cpns/date-header'
import CourseTable from './c-cpns/course-table'
import Detail from './c-cpns/detail'

interface Props {
  weeknumber: number
}

const CourseSchedule: FC<Props> = ({ weeknumber }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course[]>([])
  const [isDetailVisible, setIsDetailVisible] = useState(false)

  return (
    <WeekWrapper>
      <DateHeader weeknumber={weeknumber} />
      <CourseTable
        key={weeknumber}
        weeknumber={weeknumber}
        setSelectedCourse={setSelectedCourse}
        setIsDetailVisible={setIsDetailVisible}
        isDetailVisible={isDetailVisible}
      />
      <Detail
        selectedCourse={selectedCourse}
        isDetailVisible={isDetailVisible}
        setIsDetailVisible={setIsDetailVisible}
      />
    </WeekWrapper>
  )
}

export default CourseSchedule
