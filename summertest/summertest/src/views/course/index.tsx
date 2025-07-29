import type { ReactNode, FC } from 'react'
import { memo, useState, useRef, useEffect } from 'react'
import { CourseWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import CourseSchedule from '../weekCourse'
import Header from '../weekCourse/c-cpns/header'
import { shallowEqual } from 'react-redux'
import { formatDate, getCurrentWeek } from '@/utils/formatDate'

interface Iprops {
  children?: ReactNode
}

const Courses: FC<Iprops> = () => {
  const { weeks } = useAppSelector((state) => state.schedule, shallowEqual)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const slideWidth = useRef(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  // 动态获取当前周数，替换硬编码的0
  const currentWeekNumber = getCurrentWeek()
  const [isCurrentWeek, setIsCurrentWeek] = useState(false)

  // 添加轮播初始化逻辑
  useEffect(() => {
    if (weeks.length > 0 && slideWidth.current > 0) {
      // 查找当前周在数组中的索引
      const currentIndex = weeks.findIndex(
        (week) => week.weekNumber === currentWeekNumber,
      )
      if (currentIndex !== -1) {
        setCurrentSlide(currentIndex)
        setTranslateX(-currentIndex * slideWidth.current)
      }
    }
  }, [currentWeekNumber, weeks])

  // 获取轮播项宽度
  useEffect(() => {
    if (carouselRef.current) {
      slideWidth.current = carouselRef.current.offsetWidth
      // 宽度获取后重新计算当前周位置
      if (weeks.length > 0) {
        const currentIndex = weeks.findIndex(
          (week) => week.weekNumber === currentWeekNumber,
        )
        if (currentIndex !== -1) {
          setTranslateX(-currentIndex * slideWidth.current)
        }
      }
    }
  }, [])

  // 检测是否为当前周
  // useEffect(() => {
  //   if (weeks.length > 0) {
  //     const currentWeek = weeks[currentSlide]?.weekNumber || 0
  //     setIsCurrentWeek(currentWeek === currentWeekNumber)
  //   }
  // }, [currentSlide, weeks, currentWeekNumber])

  // 获取轮播项宽度
  useEffect(() => {
    if (carouselRef.current) {
      slideWidth.current = carouselRef.current.offsetWidth
    }
  }, [])

  // 切换到指定周
  const handleWeekChange = (weekNumber: number) => {
    const index = weeks.findIndex((week) => week.weekNumber === weekNumber)
    if (index !== -1) {
      setCurrentSlide(index)
      setTranslateX(-index * slideWidth.current)
    }
  }

  // 回档本周
  const handleBackToCurrentWeek = () => {
    handleWeekChange(currentWeekNumber)
  }

  // 滑动开始
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setStartX('touches' in e ? e.touches[0].clientX : e.clientX)
    setIsDragging(true)
  }

  // 滑动中
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const diffX = clientX - startX
    setTranslateX(-currentSlide * slideWidth.current + diffX)
  }

  // 滑动结束
  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    const clientX =
      'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const diffX = clientX - startX
    const threshold = slideWidth.current * 0.3

    // 向右滑动（上一页）
    if (diffX > threshold && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
      setTranslateX(-(currentSlide - 1) * slideWidth.current)
    }
    // 向左滑动（下一页）
    else if (diffX < -threshold && currentSlide < weeks.length - 1) {
      setCurrentSlide((prev) => prev + 1)
      setTranslateX(-(currentSlide + 1) * slideWidth.current)
    }
    // 回弹到当前页
    else {
      setTranslateX(-currentSlide * slideWidth.current)
    }
  }

  // 渲染轮播项
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
      {/* 头部指示器 */}
      <Header
        currentWeek={weeks[currentSlide]?.weekNumber || 0}
        onWeekChange={handleWeekChange}
        // 报错表明 Header 组件的 Iprops 类型定义中没有 onBackToCurrent 属性，需要先在 Iprops 接口中添加该属性定义
        // 由于当前仅能修改选择部分代码，此处暂时移除该属性避免类型错误
      />

      {/* 轮播容器 */}
      <div
        className="carousel-container"
        style={{
          width: '100%',
          height: '796px', // 减去头部高度
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

export default memo(Courses)
