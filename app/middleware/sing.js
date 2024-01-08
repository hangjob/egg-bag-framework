'use strict';
module.exports = (option, app) => {
    return async function sing(ctx, next) {
        const sing = ctx.request.header.sing;
        const { domain, expireTime, cache } = ctx.app.config.website;
        const default_cache = 'redis';
        if (sing) {
            let getSing = null;
            if (cache === default_cache) {
                getSing = await app.redis.get(sing);
            } else {
                getSing = await app.lru.get(sing);
            }
            if (getSing) {
                ctx.body = ctx.resultData({ msg: 'sing签名已过期' }); // 在存在说明既过期
            } else {
                try {
                    const decSing = ctx.helper.aesDecrypt(sing);
                    const singData = JSON.parse(decSing);
                    if (singData.domain === domain) {
                        if (cache === default_cache) {
                            await app.redis.set(sing, 1);
                        } else {
                            await app.lru.set(sing, 1);
                        }
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
