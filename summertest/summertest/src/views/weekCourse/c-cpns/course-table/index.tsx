import type { ReactNode, FC } from 'react'
import { memo, useState, useEffect, useRef } from 'react'
import { TableWrapper } from './style'
import type { Course } from '@/service/types'
import no_course from '@/assets/img/no_course.png'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { updateCourseTime, removeCourse,addCourseToWeek } from '@/store/scheduleSlice'
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

  // 浮起的格子信息（新增了拖拽相关属性）
  const [floatingBox, setFloatingBox] = useState<{
    section: number
    dayIndex: number
    isTop: boolean
    // 拖拽相关
    isDragging: boolean
    startX: number
    startY: number
    offsetX: number
    offsetY: number
  } | null>(null)

  // 长按相关变量
  const pressTimer = useRef<NodeJS.Timeout | null>(null)
  const LONG_PRESS_DELAY = 500 // 长按判定时间(ms)

  // 网格尺寸相关（用于计算拖拽位置）
  const gridCellSize = useRef({
    width: 0,
    height: 0,
  })
  const tableRef = useRef<HTMLDivElement>(null)

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
              ? course.cycle + 1
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

  // 获取网格单元格尺寸（用于拖拽计算）
  useEffect(() => {
    const getGridSize = () => {
      if (tableRef.current) {
        const gridCells = tableRef.current.querySelectorAll('.courseitem')
        if (gridCells.length > 0) {
          const firstCell = gridCells[0] as HTMLElement
          gridCellSize.current = {
            width: firstCell.offsetWidth,
            height: firstCell.offsetHeight / 2, // 因为每个格子包含上下两部分
          }
        }
      }
    }

    // 初始化时获取尺寸
    getGridSize()

    // 窗口大小变化时重新获取
    window.addEventListener('resize', getGridSize)
    return () => window.removeEventListener('resize', getGridSize)
  }, [courseGridItems])

  const getCoursesForDay = (dayIndex: number, section: number) => {
    const dayCourses = weekCourses[dayIndex] || [];
    // 添加对undefined课程的过滤，并使用可选链操作符
    return dayCourses.filter((course: Course | undefined) => course?.section === section);
  };

  const handleClick = (
    section: number,
    dayIndex: number,
    isTop: boolean = true,
  ) => {
    // 如果有浮起的格子，先取消浮起状态
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
      dispatch(setSection([[section, section]]))
    } else {
      setActiveBoxes({
        [boxKey]: true,
      })
    }
  }

  // 开始长按检测
  const startPress = (
    section: number,
    dayIndex: number,
    isTop: boolean = true,
  ) => {
    // 只有自定义格子才触发长按效果
    const courses = getCoursesForDay(dayIndex, section)
    if (courses.length > 0 && courses[0].courseName !== '自定义') {
      return
    }

    pressTimer.current = setTimeout(() => {
      // 初始化浮起盒子，包含拖拽相关属性
      setFloatingBox({
        section,
        dayIndex,
        isTop,
        isDragging: false,
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0,
      })
    }, LONG_PRESS_DELAY)
  }

  // 结束长按检测
  const endPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
  }

  // 开始拖拽
  const handleDragStart = (
    e: React.MouseEvent | React.TouchEvent,
    box: typeof floatingBox,
  ) => {
    if (!box) return

    // e.stopPropagation()

    // 记录初始位置
    const startPos = e.type.startsWith('mouse')
      ? {
          clientX: (e as React.MouseEvent).clientX,
          clientY: (e as React.MouseEvent).clientY,
        }
      : (e as React.TouchEvent).touches[0]

    setFloatingBox({
      ...box,
      isDragging: true,
      startX: startPos.clientX,
      startY: startPos.clientY,
      offsetX: 0,
      offsetY: 0,
    })

    // 打印拖拽开始时的课程数据
    console.log('拖拽开始 - 课程数据:', {
      section: box.section,
      daytime: box.dayIndex, // dayIndex从0开始，daytime从1开始
      weeknumber: weeknumber
    });
  };

  // 拖拽中
  const handleDragging = (e: React.MouseEvent | React.TouchEvent) => {
    if (!floatingBox || !floatingBox.isDragging) return

    e.stopPropagation()

    // 获取当前位置
    const currentPos = e.type.startsWith('mouse')
      ? {
          clientX: (e as React.MouseEvent).clientX,
          clientY: (e as React.MouseEvent).clientY,
        }
      : (e as React.TouchEvent).touches[0]

    // 计算偏移量
    const offsetX = currentPos.clientX - floatingBox.startX
    const offsetY = currentPos.clientY - floatingBox.startY

    setFloatingBox((prev) =>
      prev
        ? {
            ...prev,
            offsetX,
            offsetY,
          }
        : null,
    )
  }

  // 结束拖拽 - 重点优化了此部分的位置计算逻辑
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!floatingBox || !floatingBox.isDragging) return;

    // e.stopPropagation();

    // 获取网格单元格尺寸
    const { width: cellWidth, height: cellHeight } = gridCellSize.current;

    // 计算拖拽偏移量相当于多少个单元格
    const dayOffset = cellWidth ? Math.round(floatingBox.offsetX / cellWidth) : 0;
    const sectionOffset = cellHeight ? Math.round(floatingBox.offsetY / cellHeight) : 0;

    // 计算新的位置索引
    const newDayIndex = Math.max(0, Math.min(totalDays - 1, floatingBox.dayIndex + dayOffset));
    const newSection = Math.max(1, Math.min(allSections.length, floatingBox.section + sectionOffset));

    // 转换为实际业务中使用的daynumber（从1开始）和section
    const daynumber = newDayIndex;
    const targetSection = newSection;

    // 获取原课程信息
    const originalCourses = getCoursesForDay(floatingBox.dayIndex, floatingBox.section);
    const originalCourse = originalCourses.length > 0 ? originalCourses[0] : null;

    if (originalCourse) {
      // 删除原课程
      dispatch(removeCourse(originalCourse.id));
console.log(originalCourse)
      // 创建新课程（复制原课程信息并更新位置）
      const newCourse = {
        ...originalCourse,
        id: `${originalCourse.id}_${Date.now()}`, // 生成新ID避免冲突
        dayNumber: daynumber,
        section: targetSection,
      }

      // 添加新课程到仓库
      dispatch(
        addCourseToWeek({
          weekNumber: weeknumber,
          dayNumber: daynumber,
          course: newCourse,
        }),
      )

      // 打印拖拽结束时的课程数据
      console.log(`课程已移动：从第${floatingBox.dayIndex + 1}天${floatingBox.section}节移动到第${daynumber}天${targetSection}节`);
      console.log('拖拽课程数据:', {
        section: originalCourse.section,
        daytime: originalCourse.dayNumber,
        weeknumber: originalCourse.weekNumber,
        newSection: targetSection,
        newDaytime: daynumber
      });
    }

    // 重置拖拽状态
    setFloatingBox(null);
  };

  // 点击其他区域取消浮起状态
  const handleTableClick = () => {
    setFloatingBox(null)
    if (isDetailVisible) {
      setIsDetailVisible(false)
    }
  }

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
          // 判断当前格子是否是浮起状态
          const isFloating =
            floatingBox &&
            floatingBox.section === section &&
            floatingBox.dayIndex === dayIndex

          return (
            <div
              key={id}
              className={`courseitem ${courses.length > 0 ? 'has-courses' : ''} ${isFloating ? 'floating' : ''}`}
              style={{
                gridRow: `${section} / span ${rowSpan}`,
                gridColumn: `${dayIndex + 1}`,
                zIndex: isFloating ? 20 : 1, // 浮起的格子在遮罩层上方
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
                  ${course.courseName === '自定义' ? 'my-course' : ''}`}
                  onClick={(e) => {
                    // e.stopPropagation()
                    console.log(course)
                    setSelectedCourse(course)
                    setIsDetailVisible(true)
                  }}
                  onMouseDown={(e) => {
                    if (course.courseName === '自定义') {
                      // e.stopPropagation()
                      if (isFloating) {
                        handleDragStart(e, floatingBox)
                      } else {
                        startPress(section, dayIndex)
                      }
                    }
                  }}
                  onMouseUp={(e) => {
                    if (course.courseName === '自定义') {
                      // e.stopPropagation()
                      endPress()
                    }
                  }}
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
                      // e.stopPropagation()
                      if (isFloating) {
                        handleDragStart(e, floatingBox)
                      } else {
                        startPress(section, dayIndex)
                      }
                    }
                  }}
                  onTouchEnd={(e) => {
                    if (course.courseName === '自定义') {
                      // e.stopPropagation()
                      endPress()
                    }
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
                      // e.stopPropagation()
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
