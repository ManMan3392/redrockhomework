import React from 'react';
import { Books } from './Components/books';
import Titles from './Components/titles';
import Input from './Components/Input';
import themecontext from './utils/themecontext';
import Hoc from './Components/Hoc';
export class App extends React.Component {
    constructor() {
        super()
        this.state = {
            message: "Hello World",
            title: ['流行', '新款', '精选'],
            currenIndex: 0
        }
        this.btnClick = this.btnClick.bind(this)
    }
    btnClick() {
        this.setState({
            message: "Hello React",
        })
    }
    changeindex(index) {
        this.setState({
            currenIndex: index
        })
    }
    render() {
        const { message, title, currenIndex } = this.state
        return (
            <div>
                <h2> {message}</h2>
                <button onClick={this.btnClick}></button>
                <Books></Books>
                <Titles title={title} changeindex={(index) => this.changeindex(index)} />
                <h2>{title[currenIndex]}</h2>
                <Input></Input>
                <themecontext.Provider value={{ color: "red" }}>
                    <Hoc></Hoc>
                </themecontext.Provider>
            </div>
        )
    }
}