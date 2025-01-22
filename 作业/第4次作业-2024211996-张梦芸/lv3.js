var a = { n: 1 }
var b = a // b: {n:1},a: {n:1}
a.x = a = { n: 2 }//.的运算优先级高于=
//a:{n:2},b:{n:1,x:{n:2}},a指向的值变为{ n: 2 }，再给原来的a指向的对象即b指向的对象增加一个属性x。
console.log(a)//{n:2}
console.log(b)//{n:1,x:{n:2}}
a.n = 3//修改a指向的新对象的值，影响b中的x
console.log(b)//{n:1,x:{n:3}}
//知识点参考引用值的复制