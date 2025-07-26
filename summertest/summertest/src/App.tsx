import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import Courses from './views/course'

function App() {
  return (
    <div className="App">
      <Suspense fallback="">
        <div className="main">
          {useRoutes(routes)}
          <Courses />
        </div>
      </Suspense>
    </div>
  )
}

export default App
