const EventEmitter = require('events')

const emitter = new EventEmitter()

let count = 1
const handleWhyFn = (name) => {
    console.log('监听why事件', count++, name)
}
emitter.on('why', handleWhyFn)
emitter.on('zmy', () => { })
emitter.on('zmy', handleWhyFn)



emitter.emit('why', 'amy')

emitter.emit('why', 'zym')
console.log(emitter.eventNames())


emitter.off('why', handleWhyFn)

emitter.emit('why', 'ymz')


//获取所有监听事件的名称
console.log(emitter.eventNames())

//获取监听最大的监听个数
console.log(emitter.getMaxListeners())

// 获取一个名称对应的监听器个数
console.log(emitter.listenerCount('zmy'))

//获取一个事件名称对应的监听器函数
console.log(emitter.listeners('zmy'))