import type { ReactNode, FC } from 'react'
import { memo, useEffect } from 'react'
import { CourseWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchSchedule } from '@/store/scheduleSlice'
import { shallowEqual } from 'react-redux'
import type { Course } from '@/service/types'

interface Iprops {
  children?: ReactNode
}
interface ScheduleData {
  data: { [key: string]: Course[] }
  loading: boolean
  error: string | null
}

const Course: FC<Iprops> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSchedule())
  }, [dispatch])

  const schedule = useAppSelector(
    (state) => state.schedule.data as ScheduleData,
    shallowEqual,
  )

  // Example: log the teacher of the first course on Monday, if it exists
  console.log(schedule?.data?.星期一?.[0]?.teacher)
  return <CourseWrapper>{}</CourseWrapper>
}
export default memo(Course)
