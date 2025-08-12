import _ from 'lodash'

const sum = (a, b) => {
  return a + b
}

const sub = (a, b) => {
  return a - b
}

const mul = (a, b) => {
  return a * b
}

const foo = () => {
    console.log('foo exec')
    console.log(sum(20,30))
    console.log(_.join(['a', 'b', 'c'], '~'))

}

export {
    sum,
    sub,
    mul,
    foo
}


