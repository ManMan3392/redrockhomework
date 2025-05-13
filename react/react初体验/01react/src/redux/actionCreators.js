const changeNameAction = (name) => ({
    type: 'change_name',
    name
})
const addNumberAction = (num) => ({
    type: 'add_number',
    num
})
module.exports = {
    changeNameAction,
    addNumberAction
}