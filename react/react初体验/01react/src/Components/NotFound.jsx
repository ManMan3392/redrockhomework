import React, { PureComponent } from 'react'

export class NotFound extends PureComponent {
    render() {
        return (
            <div>
                <h2>404 NOT FOUND!</h2>
                <h3>请检查您的路径再尝试访问</h3>
            </div>
        )
    }
}

export default NotFound