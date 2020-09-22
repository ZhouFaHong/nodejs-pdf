'use strict';

const Controller = require('egg').Controller;
const PDFDocument = require('pdfkit');

class HomeController extends Controller {
  async index() {
    const { ctx, config } = this;
    const {
      pdfSize,
    } = config;
    const doc = new PDFDocument({
      size: pdfSize,
      margin: 30,
      info: {
        Creator: '周发洪',
        Title: `${config.name}系统状态`,
        Author: '北京好奇猫',
      },
      bufferPages: true,
    });
    doc.on('pageAdded', () => {
      doc.fontSize(12).text('pageAdded', 30, 30, {
        align: 'right',
      });
      // doc.moveDown();
    });
    ctx.body = doc;
    ctx.type = 'application/pdf';
    doc.text('Hi PDFKit!');
    let i;
    let end;
    // add some content...
    doc.addPage();
    // ...
    doc.addPage();
    doc.addPage();

    // see the range of buffered pages
    const range = doc.bufferedPageRange(); // => { start: 0, count: 2 }

    for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
      doc.switchToPage(i);
      doc.text(`Page ${i + 1} of ${range.count}`);
    }

    // manually flush pages that have been buffered
    // doc.flushPages();

    // or, if you are at the end of the document anyway,
    // doc.end() will call it for you automatically.
    // doc.end();

    doc.end();
  }
}

module.exports = HomeController;
