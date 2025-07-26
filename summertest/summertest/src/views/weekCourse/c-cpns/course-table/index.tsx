import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { TableWrapper } from './style'
import type { Course } from '@/service/types'

interface Iprops {
  children?: ReactNode
  setSelectedCourse: (course: Course | null) => void
  filteredDates: Course[][] // 直接使用接口返回的课程数据数组
}
const CourseTable: FC<Iprops> = ({ setSelectedCourse, filteredDates }) => {
  // 直接通过数组索引获取对应星期的课程
  const getCoursesForDay = (dayIndex: number, section: number) => {
    const dayCourses = filteredDates[dayIndex] || [];
    return dayCourses.filter(course => course.section === section);
  }

  const allSections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  return (
    <TableWrapper>
      <table className="course-table">
        <tbody>
          {allSections?.map((section) => (
            <tr key={section}>
              <td className="section-cell">{section}</td>
              {filteredDates?.map((_, dayIndex) => {
                if (section % 2 === 1) {
                  const courses = getCoursesForDay(dayIndex, section)
                  return (
                    <td
                      key={`day-${dayIndex}-section-${section}`}
                      rowSpan={2}
                      className={`courseitem ${courses.length > 0 ? 'has-courses' : ''}`}
                    >
                      {courses?.map((course) => (
                        <div
                          key={course.id}
                          className={`course-info section-${section}`}
                          onClick={() => setSelectedCourse(course)}
                        >
                          <div className="course-name">{course.name}</div>
                          <div className="course-place">{course.place}</div>
                        </div>
                      ))}
                    </td>
                  )
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}
export default memo(CourseTable)
