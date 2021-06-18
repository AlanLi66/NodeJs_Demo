// 应用入口
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controller = require('./controller');

app.use(bodyParser());
app.use(controller());

app.listen(8090);
console.log('Spider server started at 8090...');