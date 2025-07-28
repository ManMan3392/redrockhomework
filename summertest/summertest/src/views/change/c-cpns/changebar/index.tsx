import type { ReactNode, FC } from 'react'
import { memo, useState } from 'react'
import { ChangeBarWrapper } from './style'
import { useAppDispatch } from '@/store'
import { useEffect } from 'react'

interface Iprops {
  children?: ReactNode
  items: string[]
  choose: number
  onActiveIndexChange?: (index: number) => void  // 添加新回调
}
const ChangeBar: FC<Iprops> = ({  items, choose,
  onActiveIndexChange  // 接收回调
}) => {
  const [activeIndex, setActiveIndex] = useState(choose)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const dispatch = useAppDispatch()
  

  // 配置参数
  const BOX_HEIGHT = 63
  const CONTAINER_HEIGHT = 244
  const ROTATION_STEP = 20
  const POSITION_STEP = BOX_HEIGHT * 0.6
  const Z_OFFSET = 60
  const VISIBILITY_THRESHOLD = 120
  const TOP_BOX_Z = 30 // 上方盒子Z轴值
  const handleDragStart = (y: number) => {
    setIsDragging(true)
    setStartY(y)
    setDragOffset(0)
  }

  const handleDragMove = (y: number) => {
    if (!isDragging) return
    setDragOffset(y - startY)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const threshold = 50 // 拖动阈值保持不变
    // 计算拖动步数（根据拖动距离除以阈值）
    const steps = Math.floor(Math.abs(dragOffset) / threshold)
    if (dragOffset < -threshold && activeIndex + steps < items.length) {
      setActiveIndex(prev => prev + steps)
    } else if (dragOffset > threshold && activeIndex - steps >= 0) {
      setActiveIndex(prev => prev - steps)
    } else {
      // 处理边界情况
      if (dragOffset < 0) {
        setActiveIndex(items.length - 1)
      } else if (dragOffset > 0) {
        setActiveIndex(0)
      }
    }
  }
  
  // 添加依赖数组
  useEffect(() => {
    onActiveIndexChange?.(activeIndex) // 触发父组件回调
  }, [activeIndex, onActiveIndexChange])
    return (
      <ChangeBarWrapper>
        <div
          className="carousel-container"
          style={{ pointerEvents: 'auto' }}
          onMouseDown={(e) => handleDragStart(e.clientY)}
          onMouseMove={(e) => handleDragMove(e.clientY)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
        >
          {items.map((item, index) => {
            const offset = index - activeIndex
            const rotateAngle = offset * ROTATION_STEP

            // Y轴计算完全保留原始逻辑
            let translateY =
              CONTAINER_HEIGHT / 2 - BOX_HEIGHT / 2 + offset * POSITION_STEP
            if (isDragging) {
              //灵敏度系数，直接用原始数据会拖走太多
              translateY += dragOffset * 0.5
            }

            // Z轴逻辑：上方盒子固定30px，其他不变
            const translateZ =
              offset < 0 ? -TOP_BOX_Z : Math.abs(offset) * -Z_OFFSET

            // 缩放、选中状态、可见性均保留原始逻辑
            const scale = 1 - Math.abs(offset) * 0.12
            const isSelected = index === activeIndex
            const isVisible = Math.abs(rotateAngle) < VISIBILITY_THRESHOLD

            return (
              <div
                key={index}
                className={`carousel-item ${isSelected ? 'selected' : ''}`}
                style={{
                  transform: `rotateX(${-rotateAngle}deg) translateY(${translateY}px) translateZ(${-translateZ}px) scale(${scale})`,
                  transition: isDragging
                    ? 'none'
                    : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  //自定义滑动，吸附弹性
                  visibility: isVisible ? 'visible' : 'hidden',
                  // 控制3D变换时背面是否可见，在这没啥用，写着吧
                  backfaceVisibility: 'hidden',
                  pointerEvents: 'auto',
                }}
              >
                <div className="face-content">{item}</div>
              </div>
            )
          })}
        </div>

        {/* <div className="button" onClick={() => {
          onSelect([activeIndex], type, isPush)
          console.log(type)
        }}>
          确定
        </div> */}
      </ChangeBarWrapper>
    )
  // 添加监听 activeIndex 变化的副作用
  
}
export default memo(ChangeBar)
