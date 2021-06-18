'use strict';

var fs = require('fs');

// 读取文本文件
fs.readFile('assets/sample.txt', 'utf-8', function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

// 读取二进制文件
fs.readFile('assets/syr.jpg', function(err, data){
    if (err) {
        console.log(err);
    } else {
        // data 是个Buffer对象
        console.log(data);
        console.log(data.length + ' bytes');
    }
});

// 同步读取
var readSyncData = fs.readFileSync('assets/sample.txt', 'utf-8');
console.log('同步读取： ', readSyncData);

// Buffer -> String
// var text = data.toString('utf-8');
// console.log(text);

// String -> Buffer
// var buf = Buffer.from(text, 'utf-8');
// console.log(buf);

// ---------------------------------------------

// 写文件
var writeData = '我是异步写入的内容~';
fs.writeFile('assets/output.txt', writeData, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('异步写入完成~');
    }
});

// 同步写入
var writeSyncData = '我是同步写入的内容~';
fs.writeFileSync('assets/output.txt', writeSyncData);

// 获取文件相关信息
fs.stat('assets/sample.txt', function(err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件
        console.log('isFile: ', stat.isFile());
        // 是否是目录
        console.log('isDirectory: ', stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小
            console.log('size: ', stat.size);
            // 创建时间，Data对象
            console.log('birth time: ', stat.birthtime);
            // 修改时间，Data对象
            console.log('modified time: ', stat.mtime);
        }
    }
});

// 同步 statSync()