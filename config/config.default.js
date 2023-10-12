'use strict';

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
        secret: 'ABCDQWER123YSUNXSJL', // 可以自定义
        sign: {
            expiresIn: 30, // 过期时间8小时
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
    return config;
};
