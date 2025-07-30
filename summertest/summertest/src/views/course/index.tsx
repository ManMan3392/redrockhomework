import { FC, useState, useEffect, useRef } from 'react'
import { CourseWrapper } from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { getCurrentWeek } from '@/utils/formatDate'
import Header from '../weekCourse/c-cpns/header'
import CourseSchedule from '../weekCourse'
import { useLocation } from 'react-router-dom'

const Courses: FC = () => {
  const { weeks } = useAppSelector((state) => state.schedule, shallowEqual)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const slideWidth = useRef(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const prevLocation = useRef<string | null>(null)

  // 路由变化时处理
  useEffect(() => {
    if (prevLocation.current && prevLocation.current !== location.pathname) {
      if (weeks.length > 0) {
        setCurrentSlide(0)
        setTranslateX(0)
      }
    }
    prevLocation.current = location.pathname
  }, [location.pathname, weeks])

  // 初始化显示第一周
  useEffect(() => {
    if (weeks.length > 0 && slideWidth.current > 0) {
      setCurrentSlide(0)
      setTranslateX(0)
    }
  }, [weeks])

  // 计算滑动宽度
  useEffect(() => {
    if (carouselRef.current) {
      slideWidth.current = carouselRef.current.offsetWidth
      setTranslateX(0)
    }
  }, [])

  // 周次切换处理
  const handleWeekChange = (weekNumber: number) => {
    const index = weeks.findIndex((week) => week.weekNumber === weekNumber)
    if (index !== -1) {
      setCurrentSlide(index)
      setTranslateX(-index * slideWidth.current)
    }
  }

  // 补充缺失的事件处理函数
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

    if (diffX > threshold && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
      setTranslateX(-(currentSlide - 1) * slideWidth.current)
    } else if (diffX < -threshold && currentSlide < weeks.length - 1) {
      setCurrentSlide((prev) => prev + 1)
      setTranslateX(-(currentSlide + 1) * slideWidth.current)
    } else {
      setTranslateX(-currentSlide * slideWidth.current)
    }
  }

  const renderSlides = () => {
    return weeks.map((week) => (
      <div
        key={week.weekNumber}
        style={{ minWidth: `${slideWidth.current}px`, height: '769px' }}
      >
        <CourseSchedule weeknumber={week.weekNumber} />
      </div>
    ))
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
        currentWeek={weeks[currentSlide]?.weekNumber || 0}
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
