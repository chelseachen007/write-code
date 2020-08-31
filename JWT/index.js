
const crypto = require('crypto')

// 加密：Encrypt
//解密：Decryption

// base64
function base64Encrypt(value) {
    return new Buffer(value).toString("base64");
}
// console.log(base64Encrypt('测试一下base64'))
const base64Data = base64Encrypt('测试一下base64')
function base64Decryption(value) {
    return new Buffer(value, "base64").toString();
}
console.log(base64Decryption(base64Data))

//MD5
var md5c = crypto.createHash("md5").update("加密内容ABCD1234").digest("hex");
console.log("MD5加密后结果： %s", md5c);
//sha-1 or sha - 2
var SHA1 = crypto.createHash("sha1"/* sha2 */).update("加密内容ABCD1234").digest("hex");

// SHA256加密(Hmac方式)
// HMAC是密钥相关的哈希运算消息认证码，HMAC运算利用哈希算法，以一个密钥和一个消息为输入，生成一个消息摘要作为输出。
const HMAC = function HMACEncrypt(key, value) {
    return crypto.createHmac('SHA256', key).update(value).digest('base64');
}

//对称加密和非对称加密

//AES对称加密
var secretkey = "passwd";//唯一（公共）秘钥
var content = "需要加密的内容ABC";
var cipher = crypto.createCipher('aes192', secretkey);//使用aes192加密
var enc = cipher.update(content, "utf8", "hex");//编码方式从utf-8转为hex;
enc += cipher.final('hex');//编码方式转为hex;
//
//AES对称解密
var decipher = crypto.createDecipher('aes192', secretkey);
var dec = decipher.update(enc, "hex", "utf8");
dec += decipher.final("utf8");
console.log("AES对称解密结果：" + dec);

// log输出: AES对称解密结果：需要加密的内容ABC


//RSA非对称加密

//RSA非对称加密解密
const fs = require("fs");

const privatepem2 = fs.readFileSync("./privatekey.pem");//私有key【需要 pem 编码的key】server.pem
const publicpem2 = fs.readFileSync("./publickey.pem");//公有key【需要 pem 编码的key】cert.pem
const prikey2 = privatepem2.toString();
const pubkey2 = publicpem2.toString();
// 加密方法
var encrypt = (data, key) => {
    // 注意，第二个参数是Buffer类型
    return crypto.publicEncrypt(key, Buffer.from(data));
};
// 解密方法
var decrypt = (encrypted, key) => {
    // 注意，encrypted是Buffer类型
    return crypto.privateDecrypt(key, encrypted);
};

const plainText = "我是RSA非对称加密字符串内容";
const crypted = encrypt(plainText, pubkey2); // 加密
const decrypted = decrypt(crypted, prikey2); // 解密
console.log("RSA非对称解密结果:%s", decrypted.toString());

// log输出:RSA非对称解密结果:我是RSA非对称加密字符串内容


//非对称签名校验
const privatepem = fs.readFileSync("./privatekey.pem");//私有key【需要 pem 编码的key】server.pem
const publicpem = fs.readFileSync("./publickey.pem");//公有key【需要 pem 编码的key】cert.pem
const otherkeys = require("./otherkeys.js");//其它公钥和私钥(测试用，如果用其它的公钥进行校验签名肯定是无法通过的)

const prikey = privatepem.toString();
const pubkey = publicpem.toString();

//! 重点 是对摘要进行加密
var data = "我是信息内容摘要"
var sign = crypto.createSign('RSA-SHA256');//创建签名算法
sign.update(data);
var sig = sign.sign(prikey, 'hex');//得到签名

var verify = crypto.createVerify('RSA-SHA256');
verify.update(data);
var t = verify.verify(pubkey, sig, 'hex');
// var t=verify.verify(otherkeys.pubKey, sig, 'hex');//用其它公钥校验无法通过！
console.log("非对称签名校验结果结果：" + t);

// log输出：非对称签名校验结果结果：true