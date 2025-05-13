const { createStore } = require('redux')
const reducer = require('./reducer.js')
const store = createStore(reducer)
module.exports = store