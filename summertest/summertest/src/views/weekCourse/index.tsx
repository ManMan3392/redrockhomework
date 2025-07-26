import React, { useState } from 'react'
import { useEffect } from 'react'
import { WeekWrapper } from './style'
import type { Course} from '@/service/types'
import {useAppSelector} from '@/store'
import Head from './c-cpns/header'
import DateHeader from './c-cpns/date-header'
import CourseTable from './c-cpns/course-table'
import { shallowEqual } from 'react-redux'

const CourseSchedule: React.FC = () => {
  // 移除dates数据依赖
  const { weeks } = useAppSelector(state => state.schedule);
  const [currentWeek, setCurrentWeek] = useState<number>(weeks[0]?.weekNumber || 1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
console.log(weeks)
  const handleWeekChange = (newWeek: number) => {
    if (newWeek !== currentWeek) {
      setCurrentWeek(newWeek);
    }
  };

  const currentWeekData = weeks.find(week => week.weekNumber === currentWeek) || { courses: [], dailyCourses: [] };
  // const { courses: currentCourses = [], dailyCourses = {} } = currentWeekData as { courses: Course[]; dailyCourses: Record<string, any> };
  // 从当前周数据中提取日期，替代原filteredDates
  // const currentDates = Object.keys(dailyCourses).sort();
  console.log(currentWeekData)
  const dailyCourses = currentWeekData.dailyCourses as Course[][]

  return (
    <WeekWrapper className="course-schedule-wrapper">
      <div className="course-schedule-container">
        <Head
          uniqueWeeks={weeks.map((week) => week.weekNumber)}
          currentWeek={currentWeek}
          onWeekChange={handleWeekChange}
        />
        <DateHeader filteredDates={dailyCourses} />
        <CourseTable
          setSelectedCourse={setSelectedCourse}
          filteredDates={dailyCourses}
        />
        {selectedCourse && (
          <div className="course-detail">
            <h3>{selectedCourse.name}</h3>
            <div className="detail-item">
              <span>日期：</span>
              <span>
                {selectedCourse.date} ({selectedCourse.day})
              </span>
            </div>
            <div className="detail-item">
              <span>节次：</span>
              <span>{selectedCourse.section}</span>
            </div>
            <div className="detail-item">
              <span>地点：</span>
              <span>{selectedCourse.place || '未指定'}</span>
            </div>
            {selectedCourse.teacher && (
              <div className="detail-item">
                <span>教师：</span>
                <span>{selectedCourse.teacher}</span>
              </div>
            )}
            {selectedCourse.cycle && (
              <div className="detail-item">
                <span>周期：</span>
                <span>{selectedCourse.cycle}</span>
              </div>
            )}
            {selectedCourse.time && (
              <div className="detail-item">
                <span>时间：</span>
                <span>{selectedCourse.time}</span>
              </div>
            )}
            {selectedCourse.type && (
              <div className="detail-item">
                <span>课程类型：</span>
                <span>{selectedCourse.type}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </WeekWrapper>
  )
}

export default CourseSchedule
