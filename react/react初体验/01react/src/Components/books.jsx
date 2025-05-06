import React from 'react';
import { books } from '../assets/data';
import { formatmoney } from '../utils/format';
export class Books extends React.Component {
    constructor() {
        super()
        this.state = {
            message: "Hello World",
            books: books
        }
        this.btnClick = this.btnClick.bind(this)
    }
    btnClick() {
        this.setState({
            message: "Hello React"
        })
    }
    priceSum() {
        const prices = this.state.books.reduce((pre, item) => {
            return pre + item.price * item.count
        }, 0)
        return prices
    }
    changecount(index, num) {
        const newbooks = [...this.state.books]
        newbooks[index].count += num
        this.setState({
            books: newbooks
        })
    }
    removebook(index) {
        const newbooks = [...this.state.books]
        newbooks.splice(index, 1)
        this.setState({
            books: newbooks
        })
    }
    isbooks() {
        const { books } = this.state
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>书籍名称</th>
                            <th>出版日期</th>
                            <th>价格</th>
                            <th>购买数量</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.date}</td>
                                    <td>{formatmoney(item.price)}</td>
                                    <td>
                                        <button
                                            disabled={item.count <= 1}
                                            onClick={() => this.changecount(index, -1)}>-</button>
                                        {item.count}
                                        <button onClick={() => this.changecount(index, +1)}>+</button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.removebook()}>移除</button>
                                    </td>
                                </tr>)
                        })}
                    </tbody>

                </table>
                <h3>总价格：{formatmoney(this.priceSum())}</h3>
            </div>
        )
    }
    nobooks() {
        return (
            <h2>没有书籍呢，快去选购吧~</h2>
        )
    }
    render() {
        const { books } = this.state
        return books.length ? this.isbooks() : this.nobooks()
    }
}