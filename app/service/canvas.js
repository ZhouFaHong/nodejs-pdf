'use strict';

const Service = require('egg').Service;

const PDFDocument = require('pdfkit');

class CanvasService extends Service {
  async getDoc() {
    const { config, app } = this;
    const { pdfSize } = config;
    app.logger.info(config.pdfSize);
    const doc = new PDFDocument({
      size: pdfSize,
      margin: 30,
      info: {
        Creator: '周发洪',
        Title: '矢量图形',
        Author: '北京好奇猫',
      },
    });
    doc.text('Hi PDFKit!');
    // doc.moveTo(0, 20) // set the current point
    //   .lineTo(100, 160) // draw a line
    //   .quadraticCurveTo(130, 200, 150, 120) // draw a quadratic curve
    //   .bezierCurveTo(190, -40, 200, 200, 300, 150) // draw a bezier curve
    //   .lineTo(400, 90) // draw another line
    //   .stroke(); // stroke the path

    // doc.path('M 0,20 L 100,160 Q 130,200 150,120 C 190,-40 200,200 300,150 L 400,90')
    //   .stroke();

    // // these examples are easier to see with a large line width
    // doc.lineWidth(25);

    // // line cap settings
    // doc.lineCap('butt')
    //   .moveTo(50, 20)
    //   .lineTo(100, 20)
    //   .stroke();

    // doc.lineCap('round')
    //   .moveTo(150, 20)
    //   .lineTo(200, 20)
    //   .stroke();

    // // square line cap shown with a circle instead of a line so you can see it
    // doc.lineCap('square')
    //   .moveTo(250, 20)
    //   .circle(275, 30, 15)
    //   .stroke();

    // // line join settings
    // doc.lineJoin('miter')
    //   .rect(50, 100, 50, 50)
    //   .stroke();


    // doc.lineJoin('round')
    //   .rect(150, 100, 50, 50)
    //   .stroke('red');


    // doc.lineJoin('bevel')
    //   .rect(250, 100, 50, 50)
    //   .stroke('green');

    // doc.circle(100, 50, 50)
    //   .dash(5, { space: 10 }) // 加了虚线，会影响后面的划线 undash()取消虚线
    //   .stroke();

    // doc.moveTo(100, 150)
    //   .lineTo(500, 150)
    //   .stroke()
    //   .restore();
    // // doc.save();

    // doc.circle(100, 250, 50)
    //   .lineWidth(3)
    //   .undash() // 不要虚线
    //   .fillOpacity(0.8)
    //   .fillAndStroke('red', '#900')
    //   .restore();

    // Create a linear gradient
    let grad = doc.linearGradient(50, 0, 150, 100);
    grad.stop(0, 'green')
      .stop(1, 'red');

    doc.rect(50, 0, 100, 100);
    doc.fill(grad);

    // Create a radial gradient
    grad = doc.radialGradient(300, 50, 0, 300, 50, 50);
    grad.stop(0, 'orange', 0)
      .stop(1, 'orange', 1);

    doc.circle(300, 50, 50);
    doc.fill(grad);

    doc.end();
    return doc;
  }
}

module.exports = CanvasService;
