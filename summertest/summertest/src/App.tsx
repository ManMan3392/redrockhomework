import { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import { useAppDispatch } from './store'
import { fetchSchedule } from './store/scheduleSlice'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSchedule())
  }, [])
  return (
    <div className="App">
      <Suspense fallback="">
        <div className="main">
          {useRoutes(routes)}
          {/* <Courses/> */}
        </div>
      </Suspense>
    </div>
  )
}

export default App
