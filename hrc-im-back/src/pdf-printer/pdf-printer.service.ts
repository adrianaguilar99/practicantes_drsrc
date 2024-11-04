import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'src/assets/fonts/Roboto-Regular.ttf',
    bold: 'src/assets/fonts/Roboto-Medium.ttf',
    italics: 'src/assets/fonts/Roboto-Italic.ttf',
    bolditalics: 'src/assets/fonts/Roboto-MediumItalic.ttf',
  },
};
@Injectable()
export class PdfPrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {},
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
