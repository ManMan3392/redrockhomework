import type { ReactNode, FC } from 'react'
import { memo, useRef, useState } from 'react'
import { HomeWrapper } from './style'
import Courses from '../course'

interface Iprops {
  children?: ReactNode
}

const Home: FC<Iprops> = () => {
  const [isheight, setHeight] = useState(true)
  const [startY, setStartY] = useState(0)
  const [currentHeight, setCurrentHeight] = useState(840)
  const [isDragging, setIsDragging] = useState(false)
  const coursesRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e?.touches?.[0]?.clientY)
    setIsDragging(true)
    // 获取Courses原始高度
    if (coursesRef.current) {
      const rect = coursesRef.current.getBoundingClientRect()
      setCurrentHeight(rect.height)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentY = e.touches[0].clientY
    const diff = startY - currentY // 向上拖动为正
    const coursesHeight = 840 // 原始高度
    const newHeight = Math.max(0, coursesHeight + diff)
    setCurrentHeight(newHeight)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    const coursesHeight = 840 // 原始高度
    // 判断是否拖动超过一半高度
    if (currentHeight < coursesHeight / 2) {
      setHeight(false) // 收起
    } else {
      setHeight(true) // 恢复
    }
  }

  const handleClick = () => {
    setHeight(!isheight)
  }

  return (
    <HomeWrapper>
      <div
        className="bottom"
        onClick={handleClick}
        style={{ height: isheight ? '0px' : '130px' }}
      ></div>
      <div
        className="Courses"
        ref={coursesRef}
        style={{
          height: isDragging
            ? `${currentHeight}px`
            : isheight
              ? '840px'
              : '130px',
          transition: isDragging ? 'none' : 'height 0.3s ease',
        }}
      >
        <div
          className="foldbutton"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        ></div>
        <Courses />
      </div>
    </HomeWrapper>
  )
}
export default memo(Home)
