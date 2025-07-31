import type { ReactNode, FC } from 'react'
import { memo, useState, useRef } from 'react'
import { DetailWrapper } from './style'
import type { Course } from '@/service/types'
import { formatNumber } from '@/utils/formatnumber'
import { timeList } from '@/assets/data/time'
import { useAppDispatch } from '@/store'
import { removeCourse } from '@/store/scheduleSlice'
import { useNavigate } from 'react-router-dom'

interface Iprops {
  children?: ReactNode
  selectedCourse: Course[]
  isDetailVisible: boolean
  setIsDetailVisible: (isDetailVisible: boolean) => void
}
const Detail: FC<Iprops> = (props) => {
  const { selectedCourse, isDetailVisible, setIsDetailVisible } = props
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const startX = useRef(0)
  const isDragging = useRef(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation()
    startX.current = e.touches[0].clientX
    isDragging.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation()
    if (!isDragging.current) return
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation()
    if (!isDragging.current) return
    const endX = e.changedTouches[0].clientX
    const diffX = endX - startX.current
    if (diffX > 50 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    } else if (diffX < -50 && currentIndex < selectedCourse.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
    isDragging.current = false
  }

  const handleDelete = () => {
    dispatch(removeCourse(selectedCourse[currentIndex].id))
    setIsDetailVisible(false)
  }

  const handleChange = () => {
    navigate('/change', {
      state: {
        selectedCourse: selectedCourse[currentIndex],
      },
    })
    handleDelete()
  }

  return (
    <DetailWrapper style={{ bottom: isDetailVisible ? '0px' : '-314px' }}>
      <div 
        ref={carouselRef}
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          display: 'flex',
          transition: 'transform 0.3s ease',
          transform: `translateX(-${currentIndex * 100}%)`,
          height: '100%'
        }}
      >
        {selectedCourse?.map((item, index) => (
          <div 
            key={index} 
            className="item-container"
            style={{ minWidth: '100%', height: '100%' }}
          >
            {isDetailVisible && (
              <div
                className="msk"
                onClick={() => {
                  setIsDetailVisible(false)
                }}
              ></div>
            )}

            <div className="course-detail">
              <h3>{item.name}</h3>
              {item.courseName === '自定义' && (
                <div className="buttons">
                  <div className="delete" onClick={handleDelete}>
                    删除
                  </div>
                  <div className="delete change" onClick={handleChange}>
                    修改
                  </div>
                </div>
              )}
              {item.courseName === '自定义' && (
                <div className="infos">
                  <div className="details-info">{`第${formatNumber(item.weekNumber)}周 周${formatNumber((item.dayNumber as number) + 1)} ${timeList[item.section]}`}</div>

                  <div className="detailcontent">{selectedCourse[0].content}</div>
                </div>
              )}
              {item.courseName !== '自定义' && item.place && (
                <div className="detail-item1 detail-item">
                  <span className="position">{item.place || '未指定'}</span>
                  <span className="date">{item.teacher}</span>
                </div>
              )}
              {item.cycle && item.courseName !== '自定义' && (
                <div className="detail-item detail-item2">
                  <span>周期</span>
                  <span>{item.cycle}</span>
                </div>
              )}
              {item.time && item.courseName !== '自定义' && (
                <div className="detail-item detail-item2">
                  <span>时间</span>
                  <span className="weightcontent">
                    {item.day}
                    &nbsp;
                    {item.time}
                  </span>
                </div>
              )}
              {item.type && item.courseName !== '自定义' && (
                <div className="detail-item detail-item2">
                  <span>课程类型：</span>
                  <span className="weightcontent">{item.type}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedCourse.length > 1 && (
        <div className="carousel-indicators">
          {selectedCourse.map((_, index) => (
            <span 
              key={index}
              className={index === currentIndex ? 'active' : ''}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      )}
    </DetailWrapper>
  )
}
export default memo(Detail)
