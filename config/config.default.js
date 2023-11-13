'use strict';

const I18n = require('i18n');

I18n.configure({
    locales: [ 'zh-CN' ],
    defaultLocale: 'zh-CN',
    directory: __dirname + '/locale',
});

module.exports = appInfo => {
    const config = {};

    /**
     * some description
     * @member Config#test
     * @property {String} key - some description
     */
    config.test = {
        key: appInfo.name + '_123456',
    };
    config.mysql = {
        client: {
            // host
            host: '127.0.0.1',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: '123456',
            // 数据库名
            database: 'vip_itnavs',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };
    config.jwt = {
        secret: 'ABCD20231017QWERYSUNXSJL', // 可以自定义
        sign: {
            expiresIn: 8 * 60 * 60, // 过期时间8小时
        },
    };
    config.redis = {
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: 'auth',
            db: 0,
        },
    };
    config.security = {
        csrf: {
            enable: false,
        },
    };

    config.validate = {
        convert: true,
        translate() {
            const args = Array.prototype.slice.call(arguments);
            return I18n.__.apply(I18n, args);
        },
    };

    config.i18n = {
        defaultLocale: 'zh-CN',
        queryField: 'locale',
        cookieField: 'locale',
        // Cookie 的 domain 配置，默认为空，代表当前域名有效
        cookieDomain: '',
        // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
        cookieMaxAge: '1y',
    };
    return config;
};
