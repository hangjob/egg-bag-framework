'use strict';

module.exports = {
    resultData(data = {}) {
        const res = Object.assign({ msg: '请求成功', code: 200, data: null }, data);
        if (res.code !== 200 && res.msg === '请求成功') {
            res.msg = '请求失败';
        }
        if (res.msg !== '请求成功' && res.code === 200) {
            res.code = 201;
        }
        return res;
    },
};
