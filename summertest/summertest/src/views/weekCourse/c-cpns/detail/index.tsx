import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { DetailWrapper } from './style'
import type { Course } from '@/service/types'
import { formatNumber } from '@/utils/formatnumber'
import { timeList } from '@/assets/data/time'
import { useAppDispatch } from '@/store'
import { removeCourse } from '@/store/scheduleSlice'
import { useNavigate } from 'react-router-dom'

interface Iprops {
  children?: ReactNode
  selectedCourse: Course
  isDetailVisible: boolean
  setIsDetailVisible: (isDetailVisible: boolean) => void
}
const Detail: FC<Iprops> = (props) => {
  const { selectedCourse, isDetailVisible, setIsDetailVisible } = props
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDelete = () => {
    dispatch(removeCourse(selectedCourse.id))
    setIsDetailVisible(false)
  }

  const handleChange = () => {
    navigate('/change', {
      state: {
        selectedCourse,
      },
    })
    handleDelete()
  }

  return (
    <DetailWrapper style={{ height: isDetailVisible ? '314px' : '0px' }}>
      {isDetailVisible && (
        <div
          className="msk"
          onClick={() => {
            setIsDetailVisible(false)
          }}
        ></div>
      )}
      {selectedCourse && (
        <div className="course-detail">
          <h3>{selectedCourse.name}</h3>
          {selectedCourse.courseName === '自定义' && (
            <div className="buttons">
              <div className="delete" onClick={handleDelete}>
                删除
              </div>
              <div className="delete change" onClick={handleChange}>
                修改
              </div>
            </div>
          )}
          {selectedCourse.courseName === '自定义' && (
            <div className="infos">
              
                <div className="details-info">{`第${formatNumber(selectedCourse?.weekNumber)}周 周${formatNumber(selectedCourse.dayNumber as number + 1)} ${timeList[selectedCourse.section]}`}</div>
              
              <div className="detailcontent">{selectedCourse.content}</div>
            </div>
          )}
          {selectedCourse.courseName !== '自定义' && selectedCourse.place && (
            <div className="detail-item1 detail-item">
              <span className="position">
                {selectedCourse.place || '未指定'}
              </span>
              <span className="date">{selectedCourse.teacher}</span>
            </div>
          )}
          {selectedCourse.cycle && selectedCourse.courseName !== '自定义' && (
            <div className="detail-item detail-item2">
              <span>周期</span>
              <span>{selectedCourse.cycle}</span>
            </div>
          )}
          {selectedCourse.time && selectedCourse.courseName !== '自定义' && (
            <div className="detail-item detail-item2">
              <span>时间</span>
              <span className="weightcontent">
                {selectedCourse.day}
                &nbsp;
                {selectedCourse.time}
              </span>
            </div>
          )}
          {selectedCourse.type && selectedCourse.courseName !== '自定义' && (
            <div className="detail-item detail-item2">
              <span>课程类型：</span>
              <span className="weightcontent">{selectedCourse.type}</span>
            </div>
          )}
        </div>
      )}
    </DetailWrapper>
  )
}
export default memo(Detail)
