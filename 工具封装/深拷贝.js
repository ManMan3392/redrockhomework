export default function isObject(value) {
    const valueType = typeof value
    return (value !== null) && (valueType === "object" || valueType === "function")
}
function deepCopy(originValue, map = new WeakMap()) {
    if (typeof originValue === "symbol") {
        return Symbol(originValue.description)
    }
    if (!isObject(originValue)) {
        return originValue
    }
    if (originValue instanceof Set) {
        const newSet = new set()
        for (const setItem of originValue) {
            newSet.add(deepCopy(setItem, map))
        }
    }
    if (typeof originValue === "function") {
        return originValue
    }
    if (map.get(originValue)) {
        return map.get(originValue)
    }
    const newObj = Array.isArray(originValue) ? [] : {}
    map.set(originValue, newObj)
    for (const key in originValue) {
        newObj[key] = deepCopy(originValue[key], map)
    }
    const symbolKeys = Object.getOwnPropertySymbols(originValue)
    for (const symbolKey of symbolKeys) {
        newObj[Symbol(symbolKey.description)] = deepCopy(originValue[symbolKey], map)
    }
    return newObj
}