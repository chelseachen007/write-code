'use strict';

const Controller = require('egg').Controller;

class RrwebController extends Controller {
    async index () {
        const { ctx } = this;
        const { info } = ctx.query
        ctx.body = 'hi, egg';
    }
}

module.exports = RrwebController;
