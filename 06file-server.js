'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');

// 从命令行参数获取root目录，默认时当前目录
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ', root);

// 默认返回的文件地址
const index = path.join(root, '/assets/index.html');

// 创建服务器
var server = http.createServer(function(request, response) {
    // 获得URL的path，类似'/css/bootstrap.css'
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径
    var filepath = path.join(root, pathname);
    // 获取文件状态
    fs.stat(filepath, function(err, stats) {
        if (err) {
            // 出错了或者文件不存在
            console.log('404 ', request.url);
            // 发送404响应
            response.writeHead(404);
            response.end('404 Not Found');
        } else if (stats.isFile()) {
            console.log('200 ', request.url);
            // 发送200响应
            response.writeHead(200);
            // 将文件流导向response;  response对象本身是一个Writable Stream
            fs.createReadStream(filepath).pipe(response);
        } else if (stats.isDirectory()) {
            // 是目录，直接返回默认地址
            console.log('200 ', request.url);
            // 发送200响应
            response.writeHead(200);
            // 将文件流导向response;  response对象本身是一个Writable Stream
            fs.createReadStream(index).pipe(response);
        }
    });
});

// 开启服务器
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');