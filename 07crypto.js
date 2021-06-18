'use strict';

const crypto = require('crypto');

// md5是一种常用的哈希算法，用于给任意数据一个“签名”，这个签名通常用一个十六进制的字符串表示
const hash = crypto.createHash('md5');
hash.update('Hello, world!');
hash.update('Hello, nodejs!');
console.log(hash.digest('hex'));

// Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法
// 不同的是还需要一个密钥(不同的密钥，得到不同的签名，可以把Hmac理解为用随机数“增强”的哈希算法)
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');
console.log(hmac.digest('hex'));
