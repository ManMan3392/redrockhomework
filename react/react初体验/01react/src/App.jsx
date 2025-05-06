import React from 'react';
import { Books } from './Components/books';
export class App extends React.Component {
    constructor() {
        super()
        this.state = {
            message: "Hello World"
        }
        this.btnClick = this.btnClick.bind(this)
    }
    btnClick() {
        this.setState({
            message: "Hello React"
        })
    }
    render() {
        const { message } = this.state
        return (
            <div>
                <h2> {message}</h2>
                <button onClick={this.btnClick}></button>
                <Books></Books>
            </div>
        )
    }
}