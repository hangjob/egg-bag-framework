'use strict';
const fs = require('mz/fs');
const path = require('path');

class AppBagHook {
    constructor(app) {
        console.log('框架启动');
        this.app = app;
    }

    // 是应用层修改配置的最后时机
    configWillLoad() {
        this.app.config.baseConfig = {
            uploaDir: path.join(this.app.baseDir, 'app', 'public', 'upload'),
            imageDir: path.join(this.app.baseDir, 'app', 'public', 'image'),
        };
    }

    // 应用已经启动完毕
    async didReady() {
        if (!fs.existsSync(this.app.config.baseConfig.uploaDir)) {
            fs.mkdir(this.app.config.baseConfig.uploaDir, err => {
                if (err) throw err; // 如果出现错误就抛出错误信息
            });
            console.log('upload文件夹创建成功');
        }
        if (!fs.existsSync(this.app.config.baseConfig.imageDir)) {
            fs.mkdir(this.app.config.baseConfig.imageDir, err => {
                if (err) throw err;
                console.log('image文件夹创建成功');
            });
        }
    }
}

module.exports = AppBagHook;
