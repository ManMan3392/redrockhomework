import type { ReactNode, FC } from 'react'
import { memo, useEffect } from 'react'
import { CourseWrapper } from './style'
import { useAppDispatch} from '@/store'
import { fetchSchedule } from '@/store/scheduleSlice'
import CourseSchedule from '../weekCourse'

interface Iprops {
  children?: ReactNode
}

const Courses: FC<Iprops> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSchedule())
  }, [dispatch])

  return (
    <CourseWrapper>
      <CourseSchedule/> 
      
    </CourseWrapper>
  )
}
export default memo(Courses)
