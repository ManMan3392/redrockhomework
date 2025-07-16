// 枚举其实就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型；
// 枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型；
enum Direction {
    UP,
    DOWN,
    RIGHT,
    LEFT
}
const di = Direction.DOWN

function turnDirection(direction: Direction) {
    switch (direction) {
        case Direction.LEFT:
            console.log('左移')
            break
        case Direction.RIGHT:
            console.log('右移')
            break
    }
}
turnDirection(Direction.LEFT)




export { }