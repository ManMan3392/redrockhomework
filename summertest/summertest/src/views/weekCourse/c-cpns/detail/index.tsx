import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { DetailWrapper } from './style'
import type { Course } from '@/service/types'

interface Iprops {
  children?: ReactNode
  selectedCourse: Course
  isDetailVisible: boolean
}
const Detail: FC<Iprops> = (props) => {
    const {selectedCourse, isDetailVisible} = props
    return (
      <DetailWrapper style={{ height: isDetailVisible ? '314px' : '0px' }}>
        {selectedCourse && (
          <div className="course-detail">
            <h3>{selectedCourse.name}</h3>
            <div className="detail-item1 detail-item">
              <span className="position">
                {selectedCourse.place || '未指定'}
              </span>
              <span className="date">{selectedCourse.teacher}</span>
            </div>
            {selectedCourse.cycle && (
              <div className="detail-item detail-item2">
                <span>周期</span>
                <span>{selectedCourse.cycle}</span>
              </div>
            )}
            {selectedCourse.time && (
              <div className="detail-item detail-item2">
                <span>时间</span>
                <span className="weightcontent">
                  {selectedCourse.day}
                  &nbsp;
                  {selectedCourse.time}
                </span>
              </div>
            )}
            {selectedCourse.type && (
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
