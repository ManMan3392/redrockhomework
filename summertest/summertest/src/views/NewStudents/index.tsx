import type { ReactNode, FC } from 'react'
import { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchSchedule } from '@/store/scheduleSlice'
import { shallowEqual } from 'react-redux'
import type { Course } from '@/service/types'
import { fetchnewstudents } from '@/store/newStudents'

interface Iprops {
  children?: ReactNode
}
interface ScheduleData {
  data: { [key: string]: Course[] }
  loading: boolean
  error: string | null
}

const NewStudents: FC<Iprops> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchnewstudents())
  }, [dispatch])

  const schedule = useAppSelector(
    (state) => state.newstudents.data as ScheduleData,
    shallowEqual,
  )

  // 安全访问
  console.log(schedule?.data?.星期一?.[0]?.teacher)

  return (
    <div>
      {schedule?.data?.星期一
        ? schedule.data.星期一.map((course, idx) => (
            <div key={idx}>{course.teacher}</div>
          ))
        : '加载中...'}
    </div>
  )
}
export default memo(NewStudents)
