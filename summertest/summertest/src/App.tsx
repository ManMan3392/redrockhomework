import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import Course from './views/course'

function App() {
  return (
    <div className="App">
      <Suspense fallback="">
        <div className="main">
          {useRoutes(routes)}
          <Course />
        </div>
      </Suspense>
    </div>
  )
}

export default App
