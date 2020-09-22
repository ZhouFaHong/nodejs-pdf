'use strict';

const Service = require('egg').Service;
const PDFDocument = require('pdfkit');

class TextService extends Service {
  async getTextPdf() {
    const { config, app } = this;
    const { pdfSize } = config;
    app.logger.info(config.pdfSize);
    const doc = new PDFDocument({
      size: pdfSize,
      margin: 30,
      info: {
        Creator: '周发洪',
        Title: 'Text',
        Author: '北京好奇猫',
      },
    });

    // 注册字体
    doc.registerFont('PingFang', config.baseDir + '/app/public/PingFang.ttf');
    doc.lineGap(1);


    doc.font('PingFang');
    doc.text('Hello world!');
    doc.text('1212121212', 100, 100);
    doc.moveDown(2);
    doc.text(`${doc.x} ----- ${doc.y}`);
    doc.text('什么玩意儿？', 30, doc.y);
    doc.text(`${doc.x} ----- ${doc.y}`);
    doc.text('The text will automatically wrap unless you set the lineBreak option to false. By default it will wrap to the page margin, but the width option allows you to set a different width the text should be wrapped to. If you set the height option, the text will be clipped to the number of lines that can fit in that height.');
    doc.text(`${doc.x} ----- ${doc.y}`);
    doc.text(`${doc.page.size}`);
    doc.moveDown(2);


    doc.addPage();
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.';
    doc.fontSize(12);
    doc.text(`This text is left aligned. ${lorem}`, {
      width: 410,
      align: 'left',
      fill: true,
    }
    );

    doc.moveDown();
    doc.text(`This text is centered. ${lorem}`, {
      width: 410,
      align: 'center',
      oblique: true,
    }
    );

    doc.moveDown();
    doc.text(`This text is right aligned. ${lorem}`, {
      width: 410,
      align: 'right',
      strike: true,
    }
    );

    doc.moveDown();
    doc.text(`This text is justified. ${lorem}`, {
      width: 410,
      align: 'justify',
      underline: true,
      link: 'https://pdfkit.org/docs/text.html',
    }
    );

    // draw bounding rectangle
    doc.rect(doc.x, 15, 410, doc.y).stroke();

    doc.moveDown(3);
    // 计算一段文字的高度
    const h = doc.heightOfString(lorem, {
      width: 410,
      align: 'justify',
      underline: true,
      link: 'https://pdfkit.org/docs/text.html',
    });
    const w = doc.widthOfString(lorem, {
      width: 410,
      align: 'justify',
      underline: true,
      link: 'https://pdfkit.org/docs/text.html',
    });
    doc.text(`height = ${h}  -----  width = ${w}`);

    doc.addPage();
    doc.list([
      'Zhou',
      'Fa',
      'Hong',
      [
        'Zhou',
        'Fa',
        'Hong',
        [
          'Zhou',
          'Fa',
          'Hong',
          [
            'Zhou',
            'Fa',
            'Hong',
          ],
        ],
      ],
    ]);
    doc.fillColor('green')
      .text(lorem.slice(0, 100), {
        width: 410,
        continued: true,
      }).fillColor('red')
      .text(lorem.slice(100, 150), {
        width: 410,
        continued: true,
      })
      .fillColor('blue')
      .text(lorem.slice(150))
      .moveDown(2);

    // Set the font size
    doc.fontSize(18);

    // Using a standard PDF font
    doc.font('Times-Roman')
      .fillColor('#300')
      .text('Hello from Times Roman!')
      .moveDown(0.5);

    console.log(config.baseDir + '/app/public/PingFang.ttf');
    // Using a TrueType font (.ttf)
    doc.font(config.baseDir + '/app/public/PingFang.ttf')
      .fillColor('#900')
      .text('哈哈,什么玩意儿。。。')
      .moveDown(0.5);

    // Using a collection font (.ttc or .dfont)
    // doc.font('fonts/Chalkboard.ttc', 'Chalkboard-Bold')
    //   .text('This is Chalkboard, not Comic Sans.');


    doc.end();
    return doc;
  }
}

module.exports = TextService;
