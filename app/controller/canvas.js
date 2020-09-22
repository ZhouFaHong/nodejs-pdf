'use strict';

const Controller = require('egg').Controller;

class ExampleController extends Controller {
  async index() {
    const { ctx, service } = this;

    ctx.type = 'application/pdf';
    ctx.body = await service.canvas.getDoc();

  }
}

module.exports = ExampleController;

