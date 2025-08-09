import md from "./react的组件设计层面思考.md";
import "highlight.js/styles/github.css";

const message = "hello world";
console.log(message);

// 把渲染后的 HTML 放到页面
document.body.innerHTML = md;
