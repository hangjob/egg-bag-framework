'use strict';

module.exports = {
    write: true,
    prefix: '^',
    plugin: 'autod-egg',
    test: [
        'test',
        'benchmark',
    ],
    dep: [
        'egg'
    ],
    devdep: [
        'egg-ci',
        'egg-bin',
        'autod',
        'eslint',
        'eslint-config-egg',
    ],
    exclude: [
        './test/fixtures',
        './dist',
    ],
};

