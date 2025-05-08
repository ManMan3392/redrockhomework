import React from 'react';
import '../assets/titles.css'
class Titles extends React.Component {
    constructor() {
        super()
        this.state = {
            currentIndex: 0
        }
    }
    indexchange(index) {
        const { changeindex } = this.props
        this.setState({
            currentIndex: index
        })
        changeindex(index)
    }
    render() {
        const { title } = this.props
        const { currentIndex } = this.state
        return (
            <div className='tabbar'>
                {title.map((item, index) => {
                    return (
                        <div key={index}
                            className={`tabbaritem ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => this.indexchange(index)}
                        >{item}</div>)
                })}
            </div>
        )
    }

}
export default Titles