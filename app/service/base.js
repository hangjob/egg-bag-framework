'use strict';

const Service = require('egg').Service;


class BaseService extends Service {
    // 分页查询
    async list(modelName, { params } = {}) {
        try {
            const { page = 1, limit = 10 } = this.ctx.request.body;
            const offset = (page - 1) * limit;

            const options = Object.assign({
                limit,
                offset,
            }, params);
            return await this.app.model[modelName].findAll(options);
        } catch (err) {
            throw new Error(err);
        }
    }

    // 新增
    async create(modelName, { params } = {}) {
        try {
            return this.app.model[modelName].create(params);
        } catch (err) {
            throw new Error(err);
        }
    }

    // 查找
    async find(modelName, { params } = {}) {
        try {
            return await this.app.model[modelName].findOne({ where: params });
        } catch (err) {
            throw new Error(err);
        }
    }

    // 更新
    async update(modelName, { id, params } = {}) {
        try {
            const diary = await this.app.model[modelName].findByPk(id);
            return diary.update(params);
        } catch (err) {
            throw new Error(err);
        }
    }

    // 删除
    async destroy(modelName, { id } = {}) {
        try {
            const diary = await this.app.model[modelName].findByPk(id);
            return diary.destroy();
        } catch (err) {
            throw new Error(err);
        }
    }

    // 字段自增或自减
    async increment(modelName, { id, params } = {}) {
        return await this.app.model[modelName].increment(params, { where: { id } });
    }

    // 批量新增
    async bulkCreate(modelName, { params } = {}) {
        return await this.app.model[modelName].bulkCreate(params);
    }
}

module.exports = BaseService;
