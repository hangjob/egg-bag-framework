'use strict';
const domain = 'itnvas';
const expireTime = 120;
module.exports = (option, app) => {
    return async function sing(ctx, next) {
        const sing = ctx.request.header.sing;
        const getSing = await app.redis.get(sing);
        if (sing) {
            if (getSing) {
                ctx.body = ctx.resultData({ msg: 'token过期' });
            } else {
                const singData = JSON.parse(ctx.helper.aesDecrypt(sing));
                if (singData.domain === domain) {
                    ctx.body = ctx.resultData({ msg: 'sing签名不合法' });
                } else {
                    await app.redis.set(sing, 1);
                    await app.redis.expire(sing, expireTime);
                    await next();
                }
            }
        } else {
            ctx.body = ctx.resultData({ msg: '缺少sing签名' });
        }
    };
};
