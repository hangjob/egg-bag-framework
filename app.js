'use strict';

// app.js
module.exports = app => {
    // 是否开启验证接口-sing 默认关闭
    if (app.config.website.verifySing) {
        app.config.coreMiddleware.unshift('sing');
    }
};
