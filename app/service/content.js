'use strict';

const Service = require('egg').Service;

class ContentService extends Service {
    async find(id) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const user = await this.app.mysql.get('tpt_content', { id: '1' });
        return { user };
    }
}

module.exports = ContentService;
