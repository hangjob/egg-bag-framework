'use strict';
const { RateLimiterMemory } = require('rate-limiter-flexible'); // 限流中间件
module.exports = () => {
    // 创建一个基于内存的令牌桶速率限制器，每秒限制 18 次请求
    const opts = {
        points: 18,
        duration: 1,
    };
    const rateLimiter = new RateLimiterMemory(opts);
    return async function limiter(ctx, next) {
        rateLimiter.consume(ctx.request.ip)
            .then(rateLimiterRes => {
                next();
            })
            .catch(rateLimiterRes => {
                ctx.body = ctx.resultData({ msg: '触发限流了', code: 2001 });
            });
    };
};
