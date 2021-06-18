'use strict';

var fs = require('fs');

// 用流读取文件
var rs = fs.createReadStream('assets/sample.txt', 'utf-8');
rs.on('data', function(chunk) {
    console.log('DATA: ');
    console.log(chunk);
});
rs.on('end', function() {
    console.log('END');
});
rs.on('error', function(err) {
    console.log('ERROR: ', ERR);
});

// 用流写入文件
var ws1 = fs.createWriteStream('assets/output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('assets/output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END', 'utf-8'));
ws2.end();

// pipe
var rs = fs.createReadStream('assets/sample.txt');
var ws = fs.createWriteStream('assets/copy.txt');
rs.pipe(ws);