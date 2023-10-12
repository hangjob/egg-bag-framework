'use strict';

module.exports = (option, app) => {
    return async function authority(ctx, next) {
        const token = ctx.request.header.token;
        if (token) {
            try {
                ctx.helper.verifyToken(token);
                await next();
            } catch (err) {
                ctx.body = ctx.resultData({ msg: 'token过期' });
            }
        } else {
            ctx.body = ctx.resultData({ msg: '缺少token' });
        }
    };
};
