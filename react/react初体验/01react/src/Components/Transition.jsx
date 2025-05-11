import React, { createRef, PureComponent } from 'react'
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group"
import '../assets/Transition.css'
export class Transition extends PureComponent {
    constructor() {
        super()
        this.state = {
            isShow: true,
            isLogin: true
        }
        this.nodeRef = createRef()
        this.loginRef = createRef()
    }
    Login() {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }
    render() {
        const { isShow, isLogin } = this.state
        return (
            <div>
                <button onClick={e => this.setState({ isShow: !isShow })}>切换</button>
                <CSSTransition
                    in={isShow}
                    classNames={"why"}
                    timeout={1000} // 添加动画持续时间
                    unmountOnExit
                    nodeRef={this.nodeRef}
                    appear
                >
                    <h2 ref={this.nodeRef}>
                        哈哈哈哈哈
                    </h2>
                </CSSTransition>
                <SwitchTransition mode='out-in'>
                    <CSSTransition
                        key={isLogin ? 'exit' : 'login'}
                        classNames={"login"}
                        nodeRef={this.loginRef}
                        timeout={1000}
                        appear
                    >
                        <button
                            ref={this.loginRef}
                            onClick={() => this.Login()}
                        >{isLogin ? '退出' : '登录'}</button>
                    </CSSTransition>
                </SwitchTransition>

            </div>
        )
    }
}

export default Transition