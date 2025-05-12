import React, { PureComponent } from 'react'
import { SectionWrapper } from '../utils/Style'
import classNames from 'classnames'
export class Style extends PureComponent {
    constructor() {
        super()
        this.state = {
            themecolor: 'green',
            isbbb: true
        }
    }
    changeColor() {
        this.setState({
            themecolor: 'black'
        })

    }
    render() {
        const { themecolor, isbbb } = this.state
        return (
            <div>
                <button onClick={() => this.changeColor()}>变黑</button>
                <SectionWrapper $themecolor={themecolor}>

                    <div className="father">father
                        <div className={classNames("son", { bbb: isbbb })}>son</div>
                        <div className="daughter">daughter</div>
                    </div>

                </SectionWrapper>
            </div>
        )
    }
}

export default Style