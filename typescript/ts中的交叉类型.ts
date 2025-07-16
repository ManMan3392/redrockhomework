//交叉类型表多种类型要同时满足，
//通常运用于对象交叉
interface Iplay {
jump:string,
run:string
}
interface ICoder {
    name:string,
    coding:() => void
}

const info:Iplay & ICoder = {
    name:'why',
    jump:'jump',
    run:'run',
    coding:function() {
        console.log('coding~')
    }
}

export {}