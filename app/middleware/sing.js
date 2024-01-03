'use strict';
module.exports = (option, app) => {
    return async function sing(ctx, next) {
        const sing = ctx.request.header.sing;
        const { domain, expireTime } = ctx.app.config.website;
        if (sing) {
            const getSing = await app.redis.get(sing);
            if (getSing) {
                // 在redis中存在说明既过期
                ctx.body = ctx.resultData({ msg: 'sing签名已过期' });
            } else {
                try {
                    const decSing = ctx.helper.aesDecrypt(sing);
                    const singData = JSON.parse(decSing);
                    if (singData.domain === domain) {
                        await app.redis.set(sing, 1);
                        await app.redis.expire(sing, expireTime);
                        await next();
                    } else {
                        ctx.body = ctx.resultData({ msg: 'sing签名不合法,缺少字符串' });
                    }
                } catch (e) {
                    ctx.body = ctx.resultData({ msg: 'sing签名不合法' });
                }
            }
        } else {
            ctx.body = ctx.resultData({ msg: '缺少sing签名' });
        }
    };
};
