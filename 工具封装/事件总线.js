class myzEventBus {
    constructor() {
        this.eventMap = {}
    }
    on(eventName, eventFn) {
        let eventFns = this.eventMap[eventName]
        if (!eventFns) {
            eventFns = []
            this.eventMap[eventName] = eventFns
        }
        eventFns.push(eventFn)
    }
    off(eventName, eventFn) {
        let eventFns = this.eventMap[eventName]
        if (!eventFns) return
        for (let i = 0; i < eventFns.length; i++) {
            const fn = eventFns[i]
            if (fn == eventFn) {
                eventFns.splice(i, 1)
                break
            }
        }
    }
    emit(eventName, ...args) {
        let eventFns = this.eventMap[eventName]
        if (!eventFns) return
        eventFns.forEach(fn => fn(...args))
    }
}

export default new myzEventBus()