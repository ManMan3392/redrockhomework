import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { changeNum } from '../store/features/counter'

class Reactredux extends PureComponent {
    caclnumber(num) {
        const nums = num - 0
        this.props.addNumberAction(nums)

    }
    render() {
        const { counter } = this.props
        return (
            <div>Reactredux
                <h2>{counter.count}</h2>
                <button onClick={() => this.caclnumber(+1)}>+1</button>
                <button onClick={() => this.caclnumber(-1)}>-1</button>

                <button onClick={() => this.caclnumber(+10)}>+10</button>

                <button onClick={() => this.caclnumber(-10)}>-10</button>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    counter: state.counter
})
const mapDispatchToProps = (dispatch) => ({
    addNumberAction: (num) => dispatch(changeNum(num))
})
export default connect(mapStateToProps, mapDispatchToProps)(Reactredux)