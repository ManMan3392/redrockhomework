import type { ReactNode, FC } from 'react'
import { memo, useState, useEffect } from 'react'
import { TableWrapper } from './style'
import type { Course } from '@/service/types'
import no_course from '@/assets/img/no_course.png'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import {
  setDaynumber,
  setSection,
  setWeeknumber,
} from '@/store/changeCourseSlice'
import { shallowEqual } from 'react-redux'

interface Iprops {
  children?: ReactNode
  setSelectedCourse: (course: Course | null) => void
  weeknumber: number
  isDetailVisible: boolean
  setIsDetailVisible: (visible: boolean) => void
}

const CourseTable: FC<Iprops> = ({
  setSelectedCourse,
  weeknumber,
  setIsDetailVisible,
  isDetailVisible = false,
}) => {
  // 从Redux获取当前周数据
  const { weeks } = useAppSelector((state) => state.schedule, shallowEqual)
  const currentWeek = weeks[weeknumber - 1]
  const weekCourses = currentWeek?.dailyCourses || []
  const totalDays = weekCourses.length // 一周的天数
  const allSections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const [activeBoxes, setActiveBoxes] = useState<Record<string, boolean>>({})
  const [courseGridItems, setCourseGridItems] = useState<
    Array<{
      id: string
      course?: Course
      section: number
      dayIndex: number
      rowSpan: number
    }>
  >([])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // 计算所有课程的Grid布局信息
  useEffect(() => {
    const gridItems: Array<{
      id: string
      course?: Course
      section: number
      dayIndex: number
      rowSpan: number
    }> = []

    // 标记已被跨节课程占用的格子
    const occupiedCells: Record<string, boolean> = {}

    allSections.forEach((section) => {
      weekCourses.forEach((_, dayIndex) => {
        // 跳过已被占用的格子
        if (occupiedCells[`${section}-${dayIndex}`]) return

        if (section % 2 === 1) {
          const courses = getCoursesForDay(dayIndex, section)
          const uniqueCourses = Array.from(
            new Map(courses.map((c) => [c.id, c])).values(),
          )
          const course = uniqueCourses[0]

          // 计算跨节数量，默认2节
          const rowSpan =
            course && typeof course.cycle === 'number'
              ? course.cycle - section + 1
              : 2

          // 标记被跨节占用的格子
          for (let i = 1; i < rowSpan; i++) {
            occupiedCells[`${section + i}-${dayIndex}`] = true
          }

          gridItems.push({
            id: `grid-${section}-${dayIndex}`,
            course,
            section,
            dayIndex,
            rowSpan,
          })
        }
      })
    })

    setCourseGridItems(gridItems)
  }, [weekCourses, weeknumber])

  const getCoursesForDay = (dayIndex: number, section: number) => {
    const dayCourses = weekCourses[dayIndex] || []
    return dayCourses.filter((course: Course) => course.section === section)
  }

  const handleClick = (
    section: number,
    dayIndex: number,
    isTop: boolean = true,
  ) => {
    const boxKey = `${section}-${dayIndex}-${isTop ? 'top' : 'bottom'}`
    if (activeBoxes[boxKey]) {
      navigate(`/change`, {
        state: {
          weeknumber,
          daynumber: dayIndex,
          section,
        },
      })
      dispatch(setWeeknumber([weeknumber]))
      dispatch(setDaynumber([dayIndex]))
      dispatch(setSection([[section, section]]))
    } else {
      setActiveBoxes({
        [boxKey]: true,
      })
    }
  }

  return (
    <TableWrapper
    >
      {/* 节次标题列 */}
      <div
        className="section-column"
        onClick={() => {
          if (isDetailVisible) {
            setIsDetailVisible(false)
            console.log(1)
          }
        }}
      >
        {allSections.map((section) => (
          <div key={`section-${section}`} className="section-cell">
            {section}
          </div>
        ))}
      </div>

      {/* 课程网格区域 */}
      <div
        className="course-grid"
        onClick={() => {
          if (isDetailVisible) {
            setIsDetailVisible(false)
            console.log(1)
          }
        }}
      >
        {courseGridItems.map((item) => {
          const { course, section, dayIndex, rowSpan, id } = item
          const courses = getCoursesForDay(dayIndex, section)

          return (
            <div
              key={id}
              className={`courseitem ${courses.length > 0 ? 'has-courses' : ''}`}
              style={{
                gridRow: `${section} / span ${rowSpan}`,
                gridColumn: `${dayIndex + 1}`,
              }}
            >
              {course ? (
                <div
                  key={course.id}
                  className={`course-info section-${section} 
                  ${course.courseName === '自定义' ? 'my-course' : ''}`}
              
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedCourse(course)
                    setIsDetailVisible(true)
                  }}
                >
                  <div className="course-name">{course.name}</div>
                  <div className="course-place">{course.place}</div>
                </div>
              ) : (
                <div className="no-course">
                  <div
                    className="course-top"
                    style={{
                      background: activeBoxes[`${section}-${dayIndex}-top`]
                        ? `url(${no_course}) -273px -325px`
                        : '',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClick(section, dayIndex)
                    }}
                  ></div>
                  <div
                    className="course-bottom"
                    style={{
                      background: activeBoxes[
                        `${section + 1}-${dayIndex}-bottom`
                      ]
                        ? `url(${no_course}) -273px -325px`
                        : '',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClick(section + 1, dayIndex, false)
                    }}
                  ></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </TableWrapper>
  )
}

export default memo(CourseTable)
