import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { DetailWrapper } from './style'
import type { Course } from '@/service/types'

interface Iprops {
  children?: ReactNode
  selectedCourse: Course
}
const Detail: FC<Iprops> = (props) => {
    const {selectedCourse} = props
    return (
      <DetailWrapper>
        <div className="course-detail">
          <h3>{selectedCourse.name}</h3>
          <div className="detail-item">
            <span>日期：</span>
            <span>
              {selectedCourse.date} ({selectedCourse.day})
            </span>
          </div>
          <div className="detail-item">
            <span>节次：</span>
            <span>{selectedCourse.section}</span>
          </div>
          <div className="detail-item">
            <span>地点：</span>
            <span>{selectedCourse.place || '未指定'}</span>
          </div>
          {selectedCourse.teacher && (
            <div className="detail-item">
              <span>教师：</span>
              <span>{selectedCourse.teacher}</span>
            </div>
          )}
          {selectedCourse.cycle && (
            <div className="detail-item">
              <span>周期：</span>
              <span>{selectedCourse.cycle}</span>
            </div>
          )}
          {selectedCourse.time && (
            <div className="detail-item">
              <span>时间：</span>
              <span>{selectedCourse.time}</span>
            </div>
          )}
          {selectedCourse.type && (
            <div className="detail-item">
              <span>课程类型：</span>
              <span>{selectedCourse.type}</span>
            </div>
          )}
        </div>
      </DetailWrapper>
    )
}
export default memo(Detail)
