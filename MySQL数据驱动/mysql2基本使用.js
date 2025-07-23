const mysql = require("mysql2");
//1.创建一个数据库
// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   database: "music_db",
//   user: "root",
//   password: "root",
// });

// 执行操作语句操作数据库
// const statement = "SELECT * FROM `t_products`;";
// connection.query(statement, (err, values, fields) => {
//   if (err) {
//     console.log("查询失败", err);
//     return;
//   }
//   console.log(values);
//   // 数据信息
//   console.log(fields);
// });

//使用预处理语句执行优势：
// 提高性能:将创建的语句模块发送给MySQL，然后MysQL编译(解析、优化、转换) 语句模块，并且存储它但是不执行，之后我们在真正执行时会给？提供实际的参数才会执行；就算多次执行，也只会编译一次，所以性能是更高的；
// 防止SQL注入:之后传入的值不会像模块引擎那样就编译，那么一些SQL注入的内容不会被执行；or1=1不会被执行；

// const statement = "SELECT * FROM `t_products` WHERE id > ? and id < ?;";
// connection.execute(statement, [2, 5], (err, result) => {
//   console.log(result);
// });

//创建单个连接后要关闭
// connection.destroy()

//创建连接池
// 连接池可以在需要的时候自动创建连接，并且创建的连接不会被销毁，会放到连接池中，后续可以继续使用
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "music_db",
  user: "root",
  password: "root",
  connectionLimit: 5,
});

const statement = "SELECT * FROM `t_products` WHERE id > ? and id < ?;";
// connectionPool.execute(statement, [2, 5], (err, result) => {
//   console.log(result);
// });

//promise用法
// connectionPool
//   .promise()
//   .execute(statement, [2, 6])
//   .then(([value, fielids]) => {
//     console.log(value);
//   });

//await用法
async function usemysql() {
  const [value, fielids] = await connectionPool
    .promise()
    .execute(statement, [2, 6]);
  console.log(value);
}
usemysql();
