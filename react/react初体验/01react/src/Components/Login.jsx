import React, { PureComponent } from 'react'
import { islogin } from '../utils/islogin'
export class Login extends PureComponent {
    render() {
        const { token } = this.props
        console.log(this.props)
        return (
            <div>{token}</div>
        )
    }
}

export default islogin(Login)