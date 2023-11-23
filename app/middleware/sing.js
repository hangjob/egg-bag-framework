'use strict';
const domain = 'itnvas';
const expireTime = 120;
module.exports = (option, app) => {
    return async function sing(ctx, next) {
        const sing = ctx.request.header.sing;
        if (sing) {
            const getSing = await app.redis.get(sing);
            if (getSing) {
                ctx.body = ctx.resultData({ msg: 'token过期' });
            } else {
                const decSing = ctx.helper.aesDecrypt(sing);
                if (decSing) {
                    try {
                        const singData = JSON.parse(decSing);
                        if (singData.domain === domain) {
                            await app.redis.set(sing, 1);
                            await app.redis.expire(sing, expireTime);
                            await next();
                        } else {
                            ctx.body = ctx.resultData({ msg: 'sing签名不合法' });
                        }
                    } catch (e) {
                        ctx.body = ctx.resultData({ msg: 'sing签名不合法' });
                    }
                } else {
                    ctx.body = ctx.resultData({ msg: 'sing签名不合法' });
                }
            }
        } else {
            ctx.body = ctx.resultData({ msg: '缺少sing签名' });
        }
    };
};
