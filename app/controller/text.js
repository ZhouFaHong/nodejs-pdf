'use strict';

const Controller = require('egg').Controller;

class TextController extends Controller {
  async index() {
    const { ctx, service } = this;
    ctx.type = 'application/pdf';
    ctx.body = await service.text.getTextPdf();
  }
}

module.exports = TextController;
