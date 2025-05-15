import React, { PureComponent } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import About from './About'
import Home from './Home'
import Homeindex from './Homeindex'
import HomeREcommend from './HomeREcommend'
import NotFound from './NotFound'
// import routes from '../router'
import '../assets/router.css'

export class EXRouter extends PureComponent {
    constructor() {
        super()
        this.state = {
            id: 123
        }
    }
    render() {
        const { id } = this.state
        return (
            <div>
                <div className="app">
                    <div className="header">
                        <span>Headr</span>

                        <div className="nav">
                            <Link to={'/home'}>首页</Link>
                            <Link to={`/about/${id}`}>关于</Link>

                        </div>

                    </div>
                    <div className="content">
                        <Routes>
                            <Route path='/' element={<Navigate to="/home" />} />
                            <Route path='/home' element={<Home />} >
                                <Route path='/home' element={<Navigate to="/home/homerecommed" />}></Route>
                                <Route path='/home/homeindex' element={<Homeindex />}></Route>
                                <Route path='/home/homerecommed' element={<HomeREcommend />}></Route>

                            </Route>
                            <Route path='/about/:id' element={<About />} />
                            <Route path='*' element={<NotFound />}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        )
    }
}

export default EXRouter