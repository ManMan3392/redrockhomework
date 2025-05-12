import React, { PureComponent } from 'react'
import { SectionWrapper } from '../utils/Style'
export class Style extends PureComponent {
    render() {
        return (
            <SectionWrapper>
                <div>
                    <div className="father">
                        <div className="son"></div>
                        <div className="daughter"></div>
                    </div>
                </div>
            </SectionWrapper>
        )
    }
}

export default Style