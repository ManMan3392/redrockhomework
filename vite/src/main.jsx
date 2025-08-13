import { add, minus, multi, div } from './utils/math';
import { formatPrice, formatPriceCNY } from './ts/format';
import _ from 'lodash-es';
import './css/style.css';
import './less/style.less';
import { createApp } from 'vue';
import VueApp from './vue/index.vue';
import ReactApp from './react/index';
import React from "react";
import ReactDOM from "react-dom/client";


console.log(add(1, 2));
console.log(minus(1, 2));
console.log(multi(1, 2));
console.log(div(1, 2));
console.log(formatPrice(123.456));
console.log(formatPriceCNY(123.456));
console.log(_.camelCase('hello world'));

const titleEle = document.createElement('div')
titleEle.className = 'title';
titleEle.innerHTML = 'hello world';
document.body.appendChild(titleEle);


const app = createApp(VueApp)
app.mount(document.getElementById('app'))

//react代码
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<ReactApp/>)

