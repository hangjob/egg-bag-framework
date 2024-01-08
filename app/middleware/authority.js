'use strict';

module.exports = () => {
    return async function authority(ctx, next) {
        const authorization = ctx.request.header.authorization;
        if (authorization) {
            try {
                ctx.helper.verifyToken(authorization); // 验证jwt
                await next();
            } catch (err) {
                ctx.body = ctx.resultData({ msg: 'access_token过期', code: 1003 });
            }
        } else {
            ctx.body = ctx.resultData({ msg: '缺少access_token', code: 1003 });
        }
    };
};
