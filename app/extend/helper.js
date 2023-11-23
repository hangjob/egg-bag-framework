'use strict';
const fs = require('fs');
const path = require('path');
const JSEncrypt = require('node-jsencrypt');
const CryptoJS = require('crypto-js');
const dayjs = require('dayjs');

const { customAlphabet } = require('nanoid');

const alphabet = Array.from(new Array(26), (ele, idx) => {
    return String.fromCharCode(65 + idx) + idx;
});
const key = '2021062310041005';
const iv = '2021062310041005';
const publicKey = fs.readFileSync(path.join(__dirname, '../utils/rsa_public_key.pem'));
const privateKey = fs.readFileSync(path.join(__dirname, '../utils/rsa_private_key.pem'));
const _default = {
    key: '2021062310041005', // 默认key
    iv: '2021062310041005', // 默认偏移量
};


module.exports = {
    generateToken(data) {
        return this.app.jwt.sign(data, this.app.config.jwt.secret); // 生成token
    },
    verifyToken(token) {
        return this.app.jwt.verify(token, this.app.config.jwt.secret); // 验证token
    },
    nanoid(size = 12) {
        const nanoid = customAlphabet(alphabet.join(''), size);
        if (size >= 12) {
            return dayjs()
                .format('YYYYMMDD') + nanoid(); // 获取不重复随机ID
        }
        return nanoid(); // 获取重复随机ID

    },
    md5(data) {
        let str = data;
        if (typeof data === 'object') {
            str = JSON.stringify(data);
        }
        return CryptoJS.MD5(str)
            .toString();
    },
    aesEncrypt(data, options) {
        options = Object.assign({ key, iv }, options);
        let str = data;
        if (typeof data === 'object') {
            str = JSON.stringify(data);
        }
        str = CryptoJS.enc.Utf8.parse(str);
        const crypto = CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse(options.key), {
            iv: CryptoJS.enc.Utf8.parse(options.iv),
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        });
        return crypto.toString(); // 对称加密内容
    },
    aesDecrypt(data, options) {
        options = Object.assign({ key, iv }, options);
        const decrypt = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(options.key), {
            iv: CryptoJS.enc.Utf8.parse(options.iv),
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        });
        return CryptoJS.enc.Utf8.stringify(decrypt); // 对称解密内容
    },
    encrypt(str, options) {
        options = Object.assign({ publicKey }, options);
        const encrypted = new JSEncrypt();
        encrypted.setPublicKey(options.publicKey.toString());
        return encrypted.encrypt(str); // 非对称加密字符串
    },
    decrypt(str, options) {
        options = Object.assign({ privateKey }, options);
        const decrypted = new JSEncrypt(); // 创建解密对象实例
        decrypted.setPrivateKey(options.privateKey.toString()); // 设置私钥
        return decrypted.decrypt(str); // 非对称解密内容
    },
};
