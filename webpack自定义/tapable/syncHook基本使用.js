const { SyncHook } = require("tapable");

class MYCompiler {
    constructor() {
      //注册hook
      this.hooks = {
        syncHook: new SyncHook(["name", "age"]),
      };
      //监听hook
      this.hooks.syncHook.tap("1", (name, age) => {
        console.log(name, age);
      });
    }
   
}

const compiler = new MYCompiler()
compiler.hooks.syncHook.call('张三', 18)

//bail 当有返回值时，后面的函数不执行
//loop 当返回值为true时，会反复执行该事件，直到返回值为false或undefined(即不返回任何东西)
//waterfall 当有返回值时，会将返回值作为下一个函数的第一个参数



