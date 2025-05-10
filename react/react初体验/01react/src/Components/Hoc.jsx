import React, { PureComponent } from 'react'
import { withtheme } from '../utils/withtheme'
export class Hoc extends PureComponent {
    render() {
        const { color } = this.props
        return (
            <div>Hoc
                <h2>{color}</h2>
            </div>

        )
    }
}

export default withtheme(Hoc)