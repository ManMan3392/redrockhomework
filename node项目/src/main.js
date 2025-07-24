const { SERVER_PORT } = require('./config/server')
const app = require('./app')

app.listen(SERVER_PORT, () => {
  console.log('服务启动成功~')
})
