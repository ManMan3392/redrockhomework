import type { ReactNode, FC } from 'react'
import { memo, useState } from 'react'
import { TableWrapper } from './style'
import type { Course } from '@/service/types'
import no_course from '@/assets/img/no_course.png'
import { useNavigate } from 'react-router-dom';

interface Iprops {
  children?: ReactNode
  setSelectedCourse: (course: Course | null) => void
  filteredDates: Course[][]
  isDetailVisible: boolean
  setIsDetailVisible: (visible: boolean) => void
}
const CourseTable: FC<Iprops> = ({ setSelectedCourse, filteredDates, setIsDetailVisible, isDetailVisible = false }) => {
  // 直接通过数组索引获取对应星期的课程
  const getCoursesForDay = (dayIndex: number, section: number) => {
    const dayCourses = filteredDates[dayIndex] || [];
    return dayCourses.filter(course => course.section === section);
  }
  const weeknumber = filteredDates?.[0]?.[0]?.weekNumber
  const allSections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const [activeBoxes, setActiveBoxes] = useState<Record<string, boolean>>({});

  const navigate = useNavigate()
  const handleClick = (section: number, dayIndex: number, isTop: boolean = true) => {
    const boxKey = `${section}-${dayIndex}-${isTop ? 'top' : 'bottom'}`
    if (activeBoxes[boxKey]) {
      console.log('双击')
      navigate(
        `/change?weeknumber=${weeknumber}&daynumber=${dayIndex}&section=${section}`,
      )
    } else {
      setActiveBoxes({
        [boxKey]: true,
      })
    }
  
}
// 数据里加判断是自己的还是返回的，自己的只占一格，颜色不一样，更新一下detail的接口更通用，回到本周，整学期和关联同学内容

  return (
    <TableWrapper>
      <table
        className="course-table"
        onClick={() => {
          if(isDetailVisible){
            setIsDetailVisible(false)
          }
        }}
      >
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
                      {courses[0] ? (
                        courses.map((course) => (
                          <div
                            key={course.id}
                            className={`course-info section-${section}`}
                            onClick={() => {
                              setSelectedCourse(course)
                              setIsDetailVisible(true)
                            }}
                          >
                            <div className="course-name">{course.name}</div>
                            <div className="course-place">{course.place}</div>
                          </div>
                        ))
                      ) : (
                        <div className="no-course"> 
                          <div 
                            className="course-top" 
                            style={{ 
                              background: activeBoxes[`${section}-${dayIndex}-top`] 
                                ? `url(${no_course}) -273px -325px` 
                                : '', 
                            }} 
                            onClick={() => { 
                              handleClick(section,dayIndex)
                            }} 
                          ></div> 
                          <div 
                            className="course-bottom" 
                            style={{ 
                              background: activeBoxes[`${section}-${dayIndex}-bottom`] 
                                ? `url(${no_course}) -273px -325px` 
                                : '', 
                            }} 
                            onClick={() => { 
                             handleClick(section + 1,dayIndex,false)
                            }} 
                          ></div>
                        </div>
                      )}
                    </td>
                  )
                }
                return null
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}
export default memo(CourseTable)
