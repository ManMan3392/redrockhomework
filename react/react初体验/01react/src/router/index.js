import { Navigate } from 'react-router-dom'
import Homeindex from '../Components/Homeindex'
import HomeREcommend from '../Components/HomeREcommend'
import NotFound from '../Components/NotFound'
import Home from '../Components/Home'
const About = React.lazy(() => import('../Components/About'))
const routes = [
    {
        path: '/',
        element: <Navigate to="/home" />
    },
    {
        path: '/home',
        element: <Home />,
        Children: [
            {
                path: '/home',
                element: <Navigate to="/home/homerecommed" />
            },
            {
                path: '/home/homeindex',
                element: <Homeindex />
            },
            {
                path: '/home/homerecommed',
                element: <HomeREcommend />
            },

        ]
    },
    {
        path: '/about/:id',
        element: <About />
    },
    {
        path: '*',
        element: <NotFound />
    },

]
export default routes