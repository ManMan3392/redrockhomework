import React, { PureComponent } from 'react'

export class Input extends PureComponent {
    constructor() {
        super()
        this.state = {
            username: "asd",
            password: "123",
            ischoose: true,
            fruit: [
                {
                    value: "apple",
                    ixcheecked: false
                },
                {
                    value: "banana",
                    ixcheecked: false
                }, {
                    value: "orange",
                    ixcheecked: false
                }, {
                    value: "watermallon",
                    ixcheecked: false
                }, {
                    value: "pitch",
                    ixcheecked: false
                },
            ],
            fruits: ['apple']
        }

    }
    submit(e) {
        e.preventDefault()
        console.log(this.state.fruit.filter(item => item.ixcheecked).map(item => item.value))
    }
    valueChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log([e.target.name] + ":" + e.target.value)
    }
    chooseAnsear(e) {
        this.setState({
            ischoose: !this.state.ischoose
        })
    }
    ixcheecked(e, index) {
        // const choose = Array.from(e.)
        const newfruit = [...this.state.fruit]
        newfruit[index].ixcheecked = e.target.checked
        this.setState({
            fruit: newfruit
        })
    }
    selectChange(e) {
        const array = Array.from(e.target.selectedOptions).map(item => item.value)
        this.setState({
            fruits: array
        })
        console.log(array)
    }
    render() {
        const { username, password, ischoose, fruit, fruits } = this.state
        return (
            <form onSubmit={(e) => this.submit(e)}>
                <input
                    type='text'
                    name='username'
                    onChange={(e) => this.valueChange(e)}
                    value={
                        username
                    }></input>
                <input
                    type='text'
                    name='password'
                    onChange={(e) => this.valueChange(e)}
                    value={
                        password
                    }></input>
                <label htmlFor="A">
                    <input
                        id='A'
                        name='answear'
                        type='checkbox'
                        checked={ischoose}
                        onChange={(e) => this.chooseAnsear(e)}
                    ></input>
                    <span>A</span></label>
                <div>
                    {fruit.map((item, index) => {
                        return (
                            <label htmlFor={item.value} key={item.value}>
                                <input
                                    id={item.value}
                                    name={item.value}
                                    type='checkbox'
                                    checked={item.ixcheecked}
                                    onChange={(e) => this.ixcheecked(e, index)}
                                    multiple
                                ></input>
                                <span>{item.value}</span></label>
                        )
                    })}
                </div>
                <select
                    value={fruits}
                    onChange={(e) => this.selectChange(e)}
                    multiple
                >
                    {fruit.map(item => {
                        return (
                            <option
                                key={item.value}

                                value={item.value}
                            >{item.value}</option>
                        )
                    })}
                </select>
                <button type='submit'>提交</button>
            </form>
        )
    }
}

export default Input