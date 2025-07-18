import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Discover = lazy(() => import('@/views/discover'))
const Mine = lazy(() => import('@/views/mine'))
const Download = lazy(() => import('@/views/download'))
const Foucs = lazy(() => import('@/views/foucs'))
const Album = lazy(() => import('@/views/discover/c-views/album'))
const Artist = lazy(() => import('@/views/discover/c-views/artist'))
const Djradio = lazy(() => import('@/views/discover/c-views/djradio'))
const Ranking = lazy(() => import('@/views/discover/c-views/ranking'))
const Recommend = lazy(() => import('@/views/discover/c-views/recommend'))
const Songs = lazy(() => import('@/views/discover/c-views/songs'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />,
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      { path: '/discover', element: <Navigate to="/discover/recommend" /> },
      { path: '/discover/album', element: <Album /> },
      { path: '/discover/artist', element: <Artist /> },
      { path: '/discover/djradio', element: <Djradio /> },
      { path: '/discover/ranking', element: <Ranking /> },
      { path: '/discover/recommend', element: <Recommend /> },
      { path: '/discover/songs', element: <Songs /> },
    ],
  },
  {
    path: '/mine',
    element: <Mine />,
  },
  {
    path: '/foucs',
    element: <Foucs />,
  },
  {
    path: '/download',
    element: <Download />,
  },
]
export default routes
