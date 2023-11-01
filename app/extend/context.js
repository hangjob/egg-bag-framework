'use strict';

module.exports = {
    resultData(data = {}) {
        const res = Object.assign({ msg: '请求成功', code: 1, data: null }, data);
        if (res.code !== 1 && res.msg === '请求成功') {
            res.msg = '请求失败';
        }
        if (res.msg !== '请求成功' && res.code === 1) {
            res.code = 101;
        }
        return res;
    },
};
