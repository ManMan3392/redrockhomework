import type { ReactNode, FC } from 'react'
import { memo, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { TableWrapper } from './style'
import type { Course } from '@/service/types'
import no_course from '@/assets/img/no_course.png'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { removeCourse, addCourseToWeek } from '@/store/scheduleSlice'
import {
  setDaynumber,
  setSection,
  setWeeknumber,
} from '@/store/changeCourseSlice'
import { shallowEqual } from 'react-redux'

interface Iprops {
  children?: ReactNode
  setSelectedCourse: (course: Course[]) => void
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
  const [stretchedHeight, setStretchedHeight] = useState<number | null>(null)
  const [newsectionend, setNewsectionend] = useState(0)
  // 从Redux获取状态（使用shallowEqual确保引用稳定）
  const { weeks } = useAppSelector((state) => state.schedule, shallowEqual)
  const { isShowStudents } = useAppSelector(
    (state) => state.showStudents,
    shallowEqual,
  )
  const { weeks: newStudentWeeks } = useAppSelector(
    (state) => state.newstudents,
    shallowEqual,
  )

  // 避免直接依赖currentWeek，改用weeknumber作为基础依赖
  const currentWeek = useMemo(() => {
    return weeks[weeknumber - 1] || { dailyCourses: [] }
  }, [weeks, weeknumber])

  // 稳定新同学课程数据引用
  const newStudentWeek = useMemo(() => {
    return (
      newStudentWeeks?.find((w) => w.weekNumber === weeknumber) || {
        dailyCourses: [],
      }
    )
  }, [newStudentWeeks, weeknumber])

  // 用useMemo稳定weekCourses引用，依赖改为基础类型和稳定引用
  const weekCourses = useMemo(() => {
    if (!currentWeek.dailyCourses) return []

    return currentWeek.dailyCourses.map((dayCourses, dayIndex) => {
      if (isShowStudents) {
        const studentDayCourses = newStudentWeek.dailyCourses[dayIndex] || []
        return [...dayCourses, ...studentDayCourses]
      }
      return dayCourses
    })
  }, [currentWeek.dailyCourses, isShowStudents, newStudentWeek.dailyCourses])

  const totalDays = 7
  const allSections = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [])
  const [activeBoxes, setActiveBoxes] = useState<Record<string, boolean>>({})
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  interface ICourseGridItem {
    id: string
    course?: Course
    section: number
    dayIndex: number
    rowSpan: number
  }
  const [courseGridItems, setCourseGridItems] = useState<ICourseGridItem[]>([])

  // 浮起的格子信息
  const [floatingBox, setFloatingBox] = useState<{
    section: number
    dayIndex: number
    isTop: boolean
    isDragging: boolean
    startX: number
    startY: number
    offsetX: number
    offsetY: number,
    initialHeight: number,
    isEmptyActiveBox: boolean,
  } | null>(null)

  // 长按相关变量
  const pressTimer = useRef<NodeJS.Timeout | null>(null)
  const LONG_PRESS_DELAY = 500 // 长按判定时间(ms)

  // 网格尺寸相关
  const gridCellSize = useRef({
    width: 0,
    height: 0,
  })
  const tableRef = useRef<HTMLDivElement>(null)
  const lastDragTime = useRef(0) // 用于拖拽防抖

  // 用useCallback稳定函数引用，避免每次渲染重建
  const getCoursesForDay = useCallback(
    (dayIndex: number, section: number) => {
      const dayCourses = weekCourses[dayIndex] || []
      return dayCourses.filter(
        (course: Course | undefined) => course?.section === section,
      )
    },
    [weekCourses],
  )

  // 计算所有课程的Grid布局信息（优化依赖）
  useEffect(() => {
    const gridItems: ICourseGridItem[] = []
    const occupiedCells: Record<string, boolean> = {}

    allSections.forEach((section) => {
      weekCourses.forEach((_, dayIndex) => {
        if (occupiedCells[`${section}-${dayIndex}`]) return

        if (section % 2 === 1) {
          const courses = getCoursesForDay(dayIndex, section)
          const uniqueCourses = Array.from(
            new Map(courses.map((c) => [c.id, c])).values(),
          )
          const course = uniqueCourses[0]

          const rowSpan =
            course && typeof course.cycle === 'number' ? course.cycle + 1 : 2

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
  }, [weekCourses, allSections, getCoursesForDay]) // 依赖稳定的回调函数

  // 获取网格单元格尺寸（优化依赖）
  useEffect(() => {
    const getGridSize = () => {
      if (tableRef.current) {
        const gridCells = tableRef.current.querySelectorAll('.courseitem')
        if (gridCells.length > 0) {
          const firstCell = gridCells[0] as HTMLElement
          gridCellSize.current = {
            width: firstCell.offsetWidth,
            height: firstCell.offsetHeight / 2,
          }
        }
      }
    }

    getGridSize()
    const resizeHandler = () => getGridSize()
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [courseGridItems.length]) // 只依赖长度变化，避免引用变化触发

  const handleClick = (
    section: number,
    dayIndex: number,
    isTop: boolean = true,
  ) => {
    if (floatingBox) {
      setFloatingBox(null)
      return
    }

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
      dispatch(setSection([[section, newsectionend]]))
    } else {
      setActiveBoxes({ [boxKey]: true })
    }
  }

  // 开始长按检测
  const startPress = useCallback(
    (section: number, dayIndex: number, isTop: boolean = true,hasCourse:boolean = true) => {

      pressTimer.current = setTimeout(() => {
        setFloatingBox({
          section,
          dayIndex,
          isTop,
          isDragging: false,
          startX: 0,
          startY: 0,
          offsetX: 0,
          offsetY: 0,
          initialHeight: hasCourse ? 0 : 58,
          isEmptyActiveBox: !hasCourse,
        })
      }, LONG_PRESS_DELAY)
    },
    [getCoursesForDay],
  )

  // 结束长按检测
  const endPress = useCallback(() => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
  }, [])

  const getDragPosition = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      return e.type.startsWith('mouse')
        ? {
            clientX: (e as React.MouseEvent).clientX,
            clientY: (e as React.MouseEvent).clientY,
          }
        : (e as React.TouchEvent).touches[0]
    },
    [],
  )

  // 开始拖拽
  const handleDragStart = useCallback(
    (
      e: React.MouseEvent | React.TouchEvent,
      box: typeof floatingBox,
      hasCourse: boolean = true,
    ) => {
      if (!box) return
      const isEmptyActiveBox =
        !hasCourse &&
        activeBoxes[
          `${box.section}-${box.dayIndex}-${box.isTop ? 'top' : 'bottom'}`
        ]
      const startPos = getDragPosition(e)
      setFloatingBox({
        ...box,
        isDragging: true,
        startX: startPos.clientX,
        startY: startPos.clientY,
        offsetX: 0,
        offsetY: 0,
        isEmptyActiveBox, // 记录是否为无课程激活盒子
        initialHeight: isEmptyActiveBox ? 58 : 0,
      })
      if (isEmptyActiveBox) {
        setStretchedHeight(58)
      }
    },
    [getDragPosition, activeBoxes],
  )

  // 拖拽中（增加防抖）
  const handleDragging = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!floatingBox || !floatingBox.isDragging) return
      e.stopPropagation()

      // 防抖处理：限制60fps更新频率
      const now = Date.now()
      if (now - lastDragTime.current < 16) return
      lastDragTime.current = now

      const currentPos = getDragPosition(e)
      const offsetX = currentPos.clientX - floatingBox.startX
      const offsetY = currentPos.clientY - floatingBox.startY
      if (floatingBox.isEmptyActiveBox) {
        // 仅在向下拖拽时增加高度
        const newHeight = Math.max(
          floatingBox.initialHeight,
          floatingBox.initialHeight + offsetY,
        )
        setStretchedHeight(newHeight)
      } else setFloatingBox((prev) => (prev ? { ...prev, offsetX, offsetY } : null))
    },
    [floatingBox, getDragPosition],
  )

  const handleDragEnd = useCallback(() => {
    if (!floatingBox || !floatingBox.isDragging) return
    if (!floatingBox.isEmptyActiveBox) {
      console.log(1)
      const { width: cellWidth, height: cellHeight } = gridCellSize.current
      const dayOffset = cellWidth
        ? Math.round(floatingBox.offsetX / cellWidth)
        : 0
      const sectionOffset = cellHeight
        ? Math.round(floatingBox.offsetY / cellHeight)
        : 0

      const newDayIndex = Math.max(
        0,
        Math.min(totalDays - 1, floatingBox.dayIndex + dayOffset),
      )
      const newSection = Math.max(
        1,
        Math.min(allSections.length, floatingBox.section + sectionOffset),
      )

      const originalCourses = getCoursesForDay(
        floatingBox.dayIndex,
        floatingBox.section,
      )
      const originalCourse =
        originalCourses.length > 0 ? originalCourses[0] : null

      if (originalCourse) {
        dispatch(removeCourse(originalCourse.id))
        const newCourse = {
          ...originalCourse,
          id: `${originalCourse.id}_${Date.now()}`,
          dayNumber: newDayIndex,
          section: newSection,
        }

        dispatch(
          addCourseToWeek({
            weekNumber: weeknumber,
            dayNumber: newDayIndex,
            course: newCourse,
          }),
        )
      }
    }
    else {
      const { height: cellHeight } = gridCellSize.current
      // 计算拉伸高度对应的节数 (假设stretchedHeight已定义)
      const heightInCells = cellHeight
        ? Math.round(stretchedHeight as number * 2 / cellHeight)
        : 1
      console.log(heightInCells)
      // 计算底部到达的节数
      const bottomSection = Math.min(
        allSections.length,
        floatingBox.section + heightInCells - 1,
      )
      // 传递起始节数和结束节数
      setNewsectionend(bottomSection)
      console.log(newsectionend)
    }
    setFloatingBox(null)
  }, [
    floatingBox,
    gridCellSize,
    totalDays,
    allSections,
    getCoursesForDay,
    dispatch,
    weeknumber,
  ])

  const handleTableClick = useCallback(() => {
    setFloatingBox(null)
    if (isDetailVisible) {
      setIsDetailVisible(false)
    }
  }, [isDetailVisible, setIsDetailVisible])

  return (
    <TableWrapper
      ref={tableRef}
      onClick={handleTableClick}
      onMouseMove={handleDragging}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={handleDragging}
      onTouchEnd={handleDragEnd}
    >
      {/* 节次标题列 */}
      <div className="section-column">
        {allSections.map((section) => (
          <div key={`section-${section}`} className="section-cell">
            {section}
          </div>
        ))}
      </div>

      {/* 课程网格区域 */}
      <div className="course-grid">
        {courseGridItems.map((item) => {
          const { course, section, dayIndex, rowSpan, id } = item
          const courses = getCoursesForDay(dayIndex, section)
          const isFloating =
            floatingBox &&
            floatingBox.section === section &&
            floatingBox.dayIndex === dayIndex
          return (
            <div
              key={id}
              className={`courseitem
                 ${courses.length > 0 ? 'has-courses' : ''}
                  ${isFloating ? 'floating' : ''}
                  ${courses.length > 1 ? 'many-courses' : ''}
                  `}
              style={{
                gridRow: `${section} / span ${rowSpan}`,
                gridColumn: `${dayIndex + 1}`,
                zIndex: isFloating ? 20 : 1,
                transform: isFloating
                  ? `translate(${floatingBox.offsetX}px, ${floatingBox.offsetY}px) translateY(-5px)`
                  : 'translateY(0)',
                transition: !floatingBox?.isDragging
                  ? 'transform 0.2s ease'
                  : 'none',
                cursor: isFloating ? 'grabbing' : 'default',
              }}
            >
              {course ? (
                <div
                  key={course.id}
                  className={`course-info section-${section} 
                  ${course.courseName === '自定义' ? 'my-course' : ''}
                  ${course.courseName === 'others' ? 'others-course' : ''}
                  `}
                  onClick={() => {
                    setSelectedCourse(courses)
                    setIsDetailVisible(true)
                    console.log(course)
                  }}
                  onMouseDown={(e) => {
                    if (course.courseName === '自定义') {
                      if (isFloating) {
                        handleDragStart(e, floatingBox)
                      } else {
                        startPress(section, dayIndex)
                      }
                    }
                  }}
                  onMouseUp={endPress}
                  onMouseLeave={() => {
                    if (
                      course.courseName === '自定义' &&
                      !floatingBox?.isDragging
                    ) {
                      endPress()
                    }
                  }}
                  onTouchStart={(e) => {
                    if (course.courseName === '自定义') {
                      if (isFloating) {
                        handleDragStart(e, floatingBox)
                      } else {
                        startPress(section, dayIndex)
                      }
                    }
                  }}
                  onTouchEnd={endPress}
                >
                  <div className="course-name">{course.name}</div>
                  <div className="course-place">{course.place}</div>
                </div>
              ) : (
                <div className="no-course">
                  <div
                    className={`course-top ${activeBoxes[`${section}-${dayIndex}-top`] ? 'active' : ''}`}
                    style={{
                      background: activeBoxes[`${section}-${dayIndex}-top`]
                        ? `url(${no_course}) -273px -325px`
                        : '',
                      ...(activeBoxes[`${section}-${dayIndex}-top`] && stretchedHeight
                        ? { '--stretched-height': `${stretchedHeight}px` }
                        : {})
                    }}
                    onClick={() => handleClick(section, dayIndex)}
                    onTouchStart={(e) => {
                      if (activeBoxes[`${section}-${dayIndex}-top`]) {
                        if (isFloating) {
                          handleDragStart(e, floatingBox, false)
                        } else {
                          startPress(section, dayIndex)
                        }
                      }
                    }}
                    onTouchEnd={endPress}
                  ></div>
                  <div
                    className={`course-bottom ${
                      activeBoxes[`${section + 1}-${dayIndex}-bottom`]
                        ? 'active'
                        : ''
                    }`}
                    style={{
                      background: activeBoxes[
                        `${section + 1}-${dayIndex}-bottom`
                      ]
                        ? `url(${no_course}) -273px -325px`
                        : '',
                      ...(activeBoxes[`${section + 1}-${dayIndex}-bottom`] &&
                      stretchedHeight
                        ? { '--stretched-height': `${stretchedHeight}px` }
                        : {}),
                    }}
                    onClick={() => handleClick(section + 1, dayIndex, false)}
                    onTouchStart={(e) => {
                      if (activeBoxes[`${section + 1}-${dayIndex}-bottom`]) {
                        if (isFloating) {
                          handleDragStart(e, floatingBox, false)
                        } else {
                          startPress(section + 1, dayIndex)
                        }
                      }
                    }}
                    onTouchEnd={endPress}
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
