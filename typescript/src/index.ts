import { sum } from './utils/math'
import background from './img/background.png'

const message: string = 'hello world'
console.log(message.length, message)
console.log(sum(11, 22))

const h2El = document.createElement("h2")
h2El.textContent = 'hello typescript'
document.body.append(h2El)


const img = document.createElement('img')
img.src = background
document.body.append(img)

//js中的全局变量
chc(zmyName)