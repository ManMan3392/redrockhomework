import React, { PureComponent } from 'react'
import { Link, Outlet } from 'react-router-dom'

export class Home extends PureComponent {
    render() {
        return (
            <div>
                <h2>Home</h2>
                <Link to={'/home/homeindex?keyword=react'}>首页</Link>
                <Link to={'/home/homerecommed'}>推荐</Link>
                <Outlet></Outlet>
            </div>
        )
    }
}

export default Home