// //并行，监听函数同时执行，等所有函数执行完毕后，才会执行回调函数

// const { AsyncParallelHook } = require("tapable")

// class MYCompiler {
//     constructor() {
//       //注册hook
//       this.hooks = {
//         AsyncParallelHook: new AsyncParallelHook(["name", "age"]),
//       };
//       //监听hook
//       this.hooks.AsyncParallelHook.tapAsync("1", (name, age, callback) => {
//        setTimeout(() => {
//          console.log(name, age);
//          callback();
//        }, 1000);

//       })
//       this.hooks.AsyncParallelHook.tapAsync("2", (name, age, callback) => {
//         setTimeout(() => {
//           console.log(name, age);
//           callback();
//         }, 1000);

//       });
//     }
   
// }

// const compiler = new MYCompiler()
// compiler.hooks.AsyncParallelHook.callAsync("张三", 18, (err, data) => {
//     console.log(err, data);
// })


//串行，监听函数顺序执行，每个函数执行完毕后，才会执行下一个函数，等所有函数执行完毕后，才会执行回调函数
const { AsyncSeriesHook } = require("tapable")

class MYCompiler {
    constructor() {
      //注册hook
      this.hooks = {
        AsyncSeriesHook: new AsyncSeriesHook(["name", "age"]),
      };
      //监听hook
      this.hooks.AsyncSeriesHook.tapAsync("1", (name, age, callback) => {
        setTimeout(() => {
          console.log(name, age);
          callback();
        }, 1000);

      });
      this.hooks.AsyncSeriesHook.tapAsync("2", (name, age, callback) => {
        setTimeout(() => {
          console.log(name, age);
          callback(n);
        }, 1000);

      });
    }
   
}

const compiler = new MYCompiler()
compiler.hooks.AsyncSeriesHook.callAsync("张三", 18, (err, data) => {
  console.log(err, data);
});



