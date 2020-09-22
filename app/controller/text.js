'use strict';

const Controller = require('egg').Controller;

class TextController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'Hi Text';
  }
}

module.exports = TextController;
