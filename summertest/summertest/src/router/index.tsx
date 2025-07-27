import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/views/home'))
const Change = lazy(() => import('@/views/change'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/change',  // 仅保留基础路径
    element: <Change />
  }
]
export default routes
  