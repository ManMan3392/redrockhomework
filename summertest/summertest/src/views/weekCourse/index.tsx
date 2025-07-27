import React, { useState } from 'react'
import { WeekWrapper } from './style'
import type { Course} from '@/service/types'
import {useAppSelector} from '@/store'
import Head from './c-cpns/header'
import DateHeader from './c-cpns/date-header'
import CourseTable from './c-cpns/course-table'
import Detail from './c-cpns/detail'

const CourseSchedule: React.FC = () => {
  const { weeks } = useAppSelector(state => state.schedule);
  const [currentWeek, setCurrentWeek] = useState<number>(weeks[0]?.weekNumber || 1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false)
  const handleWeekChange = (newWeek: number) => {
    if (newWeek !== currentWeek) {
      setCurrentWeek(newWeek)
    }
  }

  const currentWeekData = weeks.find(
    (week) => week.weekNumber === currentWeek,
  ) || { courses: [], dailyCourses: [] }

  const dailyCourses = currentWeekData.dailyCourses as Course[][]

  return (
    <WeekWrapper>
      <Head
        uniqueWeeks={weeks.map((week) => week.weekNumber)}
        currentWeek={currentWeek}
        onWeekChange={handleWeekChange}
      />
      <DateHeader filteredDates={dailyCourses} />
      <CourseTable
        setSelectedCourse={setSelectedCourse}
        setIsDetailVisible={setIsDetailVisible}
        filteredDates={dailyCourses}
        isDetailVisible={isDetailVisible}
      />
      <Detail
        selectedCourse={selectedCourse as Course}
        isDetailVisible={isDetailVisible}
      />
    </WeekWrapper>
  )
}

export default CourseSchedule
