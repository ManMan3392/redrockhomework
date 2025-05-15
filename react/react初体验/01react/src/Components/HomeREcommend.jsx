import React, { PureComponent } from 'react'
import { Navigate } from 'react-router-dom'

export class HomeREcommend extends PureComponent {
    constructor() {
        super()
        this.state = {
            islogin: false
        }
    }
    Login() {
        this.setState({
            islogin: !this.state.islogin
        })
    }
    render() {
        const { islogin } = this.state
        return (
            <div>
                <h2>HomeREcommend</h2>
                {!islogin ? <button onClick={() => this.Login()}>登录</button> : <Navigate to={'/home/homeindex'} />}
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
            </div>
        )
    }
}

export default HomeREcommend