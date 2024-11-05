import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import {
  BufferOptions,
  CustomTableLayout,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'src/assets/fonts/Roboto-Regular.ttf',
    bold: 'src/assets/fonts/Roboto-Medium.ttf',
    italics: 'src/assets/fonts/Roboto-Italic.ttf',
    bolditalics: 'src/assets/fonts/Roboto-MediumItalic.ttf',
  },
};

const custumTableLayouts: Record<string, CustomTableLayout> = {
  cumtomLayout01: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: function (i) {
      return 0;
    },
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#bbbbbb';
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    fillColor: function (i, node) {
      if (i === 0) {
        return '#7b90be';
      }
      return i % 2 === 0 ? '#f3f3f3' : null;
    },
  },
};

@Injectable()
export class PdfPrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      tableLayouts: custumTableLayouts,
    },
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
