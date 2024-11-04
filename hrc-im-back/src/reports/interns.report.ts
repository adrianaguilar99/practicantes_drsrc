import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/hearder.section';

export const getInternsReport = (): TDocumentDefinitions => {
  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: 'Interns Report',
      subtitle: 'List of Interns',
    }),
    pageMargins: [40, 120, 40, 60],
    content: {
      layout: 'lightHorizontalLines',
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: ['*', 'auto', 100, '*'],

        body: [
          ['First', 'Second', 'Third', 'The last one'],
          ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
          [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
          [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
          [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
          [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
          [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
          [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
        ],
      },
    },
  };
};
