import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
// import routes from './router'
import { getSchedule } from './service/scheduleApi'
import Schedule from './views/course'
import NewStudents from './views/NewStudents'

function App() {
  return (
    <div className="App">
      <Suspense fallback="">
        <div className="main">
          <Schedule />
          <NewStudents />
        </div>
      </Suspense>
    </div>
  )
}

export default App
