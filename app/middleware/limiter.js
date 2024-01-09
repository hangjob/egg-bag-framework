'use strict';
const { RateLimiterMemory } = require('rate-limiter-flexible'); // 限流中间件
module.exports = () => {
    let rateLimiter = null;
    return async function limiter(ctx, next) {
        if (!rateLimiter) {
            // 创建一个基于内存的令牌桶速率限制器，每秒限制 12 次请求
            rateLimiter = new RateLimiterMemory({
                points: ctx.app.config.website.points,
                duration: 1,
            });
        }
        rateLimiter.consume(ctx.request.ip)
            .then(rateLimiterRes => {
                next();
            })
            .catch(rateLimiterRes => {
                ctx.body = ctx.resultData({ msg: '触发限流了', code: 2001 });
            });
    };
};
