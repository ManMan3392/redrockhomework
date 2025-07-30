import type { ReactNode, FC } from 'react'
import { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import type { Course } from '@/service/types'
import { fetchnewstudents } from '@/store/newStudents'
import { NewStudentsWrapper } from './style'
import {clearNewStudentsData} from '@/store/newStudents'

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

  

  return (
    <NewStudentsWrapper>
      <div className="button"></div>
    </NewStudentsWrapper>
  )
}
export default memo(NewStudents)
