'use strict';

module.exports = (option, app) => {
    const _option = Object.assign({ switch: true }, option);
    return async function authority(ctx, next) {
        const authorization = ctx.request.header.authorization;
        const tag = ctx.request.header.tag; // 后续优化加密
        if (tag === 'nuxt') {
            await next();
        } else {
            if (_option.switch) {
                if (authorization) {
                    try {
                        ctx.helper.verifyToken(authorization);
                        await next();
                    } catch (err) {
                        ctx.body = ctx.resultData({ msg: 'access_token过期', code: 1003 });
                    }
                } else {
                    ctx.body = ctx.resultData({ msg: '缺少access_token', code: 1003 });
                }
            } else {
                await next();
            }
        }
    };
};
