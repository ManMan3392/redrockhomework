const store = require('./index')
const { addNumberAction, changeNameAction } = require('./actionCreators')
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(changeNameAction('zzz'))
store.dispatch(changeNameAction('zmy'))
store.dispatch(addNumberAction(10))
store.dispatch(addNumberAction(20))
unsubscribe()
store.dispatch(addNumberAction(100))



