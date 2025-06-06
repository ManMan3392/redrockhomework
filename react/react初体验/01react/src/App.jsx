import React from 'react';
import { Books } from './Components/books';
import Titles from './Components/titles';
import Input from './Components/Input';
import themecontext from './utils/themecontext';
import Hoc from './Components/Hoc';
import Login from './Components/Login';
import Transition from './Components/Transition';
import Style from './Components/Style';
import Reactredux from './Components/Reactredux';
import EXRouter from './Components/EXRouter';
import Counter from './Pages/Counter';
import UseContext from './Pages/UseContext';
import UseReducer from './Pages/UseReducer';
import UseCallback from './Pages/UseCallback';
import Useselector from './Pages/Useselector';
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            message: "Hello World",
            title: ['流行', '新款', '精选'],
            currenIndex: 0,
            islogining: false
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
    loginIn() {
        localStorage.setItem('token', '1234')
        this.setState({
            islogining: true
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
                <button onClick={() => this.loginIn()}>登录</button>
                <Login />
                <Transition />
                <Style />
                <Reactredux />
                <EXRouter />
                <Counter />
                <UseContext />
                <UseReducer />
                <UseCallback />
                <Useselector />
            </div>
        )
    }
}
export default App