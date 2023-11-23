'use strict';

const I18n = require('i18n');

I18n.configure({
    locales: [ 'zh-CN' ],
    defaultLocale: 'zh-CN',
    directory: __dirname + '/locale',
});

function deepMerge(obj1, obj2) {
    let key;
    if (!obj2) {
        return obj1;
    }
    for (key in obj2) {
        // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
        // 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
        obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]' && (obj2[key] && obj2[key].toString() === '[object Object]') ? deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key]);
    }
    return obj1;
}


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
    config.mysql = deepMerge({
        client: {
            // host
            host: '127.0.0.1',
            // 端口号
            port: '3306',
            // 用户名
            user: 'vip_itnavs',
            // 密码
            password: '123456',
            // 数据库名
            database: 'vip_itnavs',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    }, appInfo?.bag?.mysql); // bag配置应用

    config.jwt = deepMerge({
        secret: 'ABCD20231017QWERYSUNXSJL', // 可以自定义
        sign: {
            expiresIn: 8 * 60 * 60, // 过期时间8小时
        },
    }, appInfo?.bag?.jwt); // bag配置应用

    config.redis = deepMerge({
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: 'auth',
            db: 0,
        },
    }, appInfo?.bag?.redis);
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
    config.sequelize = deepMerge({
        dialect: 'mysql',
        database: 'vip_itnavs',
        host: '127.0.0.1',
        port: '3306',
        username: 'vip_itnavs',
        password: '123456',
        underscored: false,
        timezone: '+08:00',
        define: {
            timestamps: true,
            freezeTableName: true,
        },
    }, appInfo?.bag?.sequelize);
    config.multipart = deepMerge({
        mode: 'file',
        fileSize: '3mb', // 接收文件大小
        whitelist: [ // 允许接收的文件类型
            '.png',
            '.jpg',
            '.webp',
            '.gif',
        ],
    }, appInfo?.bag?.multipart);
    return config;
};
