/*
 * @Descripttion: 
 * @version: 
 * @Author: Chen
 * @Date: 2020-04-29 17:16:21
 * @LastEditors: Chen
 * @LastEditTime: 2020-04-29 17:17:33
 */

const Server = require('./webscoket');//引入模块
const wss = new Server({ port: 9998 });//创建一个WebSocketServer的实例，监听端口9998
wss.on('connection', function connection(socket)  {
    socket.on('message', function incoming(message) {
console.log('received: %s', message);
    socket.send('Hi Client');
  });//当收到消息时，在控制台打印出来，并回复一条信息
});