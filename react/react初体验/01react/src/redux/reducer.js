import { ADD_NUMBER, CHANGE_NAME } from './constant'
const initialState = {
    name: 'why',
    counter: 100
}
function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_NAME:
            return { ...state, name: action.name }
        case ADD_NUMBER:
            return { ...state, counter: state.counter + action.num }
        default:
            return state
    }
}

export default reducer