/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1605768508308_4920';

    // add your middleware config here
    config.middleware = [];
    config.security = {
        csrf: {
            enable: false,
        },
    };
    // 定义前端错误日志
    config.customLogger = {
        frontendLogger: {
            file: path.join(appInfo.root, 'logs/frontend.log')
        }
    }
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};
