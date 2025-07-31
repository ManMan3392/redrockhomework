import { FC, useState, useEffect, useRef } from 'react'
import { CourseWrapper } from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import Header from '../weekCourse/c-cpns/header'
import CourseSchedule from '../weekCourse'
import { useLocation } from 'react-router-dom'

const Courses: FC = () => {
  const { weeks } = useAppSelector((state) => state.schedule, shallowEqual)
  // currentSlide 表示实际轮播索引（0 代表额外页面，1 代表第一周，以此类推）
  const [currentSlide, setCurrentSlide] = useState(1)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [translateX, setTranslateX] = useState(1)
  const slideWidth = useRef(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const prevLocation = useRef<string | null>(null)

  // 路由变化时处理
  useEffect(() => {
    if (prevLocation.current && prevLocation.current !== location.pathname) {
      if (weeks.length > 0) {
        setCurrentSlide(1) // 重置到第一周
        setTranslateX(1)
      }
    }
    prevLocation.current = location.pathname
  }, [location.pathname, weeks])

  useEffect(() => {
    if (carouselRef.current) {
      slideWidth.current = carouselRef.current.offsetWidth
      setTranslateX(0)
    }
  }, [])

  // 处理周数切换（对外暴露的周数是实际周数，需要转换为轮播索引）
  const handleWeekChange = (weekNumber: number) => {
    const index = weeks.findIndex((week) => week.weekNumber === weekNumber)
      setCurrentSlide(index + 1)
      setTranslateX(-(index + 1) * slideWidth.current)
  }

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setStartX('touches' in e ? e.touches[0].clientX : e.clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const diffX = clientX - startX
    setTranslateX(-currentSlide * slideWidth.current + diffX)
  }

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    const clientX =
      'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const diffX = clientX - startX
    const threshold = slideWidth.current * 0.3

    // 滑动逻辑：额外页面(0) -> 第一周(1) -> 第二周(2) ...
    if (diffX > threshold && currentSlide > 0) {
      // 向左滑动，索引减小
      setCurrentSlide((prev) => prev - 1)
      setTranslateX(-(currentSlide - 1) * slideWidth.current)
    } else if (diffX < -threshold && currentSlide < weeks.length) {
      // 向右滑动，索引增大，最大为 weeks.length（最后一周）
      setCurrentSlide((prev) => prev + 1)
      setTranslateX(-(currentSlide + 1) * slideWidth.current)
    } else {
      // 未达到阈值，回弹
      setTranslateX(-currentSlide * slideWidth.current)
    }
  }

  const renderSlides = () => {
    // 先渲染额外页面，再渲染周刊表
    return (
      <>
        {/* 额外页面 - 不参与轮播计数 */}
        <div
          key="extra-page"
          style={{ minWidth: `${slideWidth.current}px`, height: '769px' }}
        >
          <CourseSchedule weeknumber={-1} />
        </div>

        {/* 周课表页面 */}
        {weeks.map((week) => (
          <div
            key={week.weekNumber}
            style={{ minWidth: `${slideWidth.current}px`, height: '769px' }}
          >
            <CourseSchedule weeknumber={week.weekNumber} />
          </div>
        ))}
      </>
    )
  }

  // 获取当前显示的周数（额外页面时显示0或其他标识）
  const getDisplayWeekNumber = () => {
    if (currentSlide === 0) return 0 // 额外页面
    return weeks[currentSlide - 1]?.weekNumber || 0
  }

  return (
    <CourseWrapper
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={() => setIsDragging(false)}
    >
      <Header
        currentWeek={getDisplayWeekNumber()}
        onWeekChange={handleWeekChange}
      />

      <div
        className="carousel-container"
        style={{
          width: '100%',
          height: '796px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          className="carousel-slider"
          style={{
            display: 'flex',
            height: '100%',
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {renderSlides()}
        </div>
      </div>
    </CourseWrapper>
  )
}

export default Courses
