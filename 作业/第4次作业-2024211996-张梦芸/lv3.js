const arr = [1, 2, 3, 4]
const iter = arr[Symbol.iterator]()
for (let num of arr) {
    console.log(num)
    if (num >= 2) {
        console.log('>= 2, quit')
        break
    }
}

for (let num of iter) {
    console.log(num)
}