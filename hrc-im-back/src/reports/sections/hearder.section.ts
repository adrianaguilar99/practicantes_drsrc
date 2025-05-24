import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/common/utils';

const rcdLogo: Content = {
  image: 'src/assets/images/rcd-logo.png',
  width: 35,
  height: 35,
  alignment: 'center',
  margin: [30, 12, 0, 0],
};

const hrcLogo: Content = {
  image: 'src/assets/images/hrc-logo.png',
  width: 60,
  height: 33,
  alignment: 'center',
  margin: [0, 12, 0, 0],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [0, 30, 20, 30],
  width: 200,
};

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showHrcLogo?: boolean;
  showRcdLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const {
    showDate = true,
    showHrcLogo = true,
    showRcdLogo = true,
    subtitle,
    title,
  } = options;

  const headerRcdLogo: Content = showRcdLogo ? rcdLogo : null;

  const headerHrcLogo: Content = showHrcLogo ? hrcLogo : null;

  const headerDate: Content = showDate ? currentDate : null;

  const headerSubtitle: Content = subtitle
    ? {
        text: subtitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          fontSize: 14,
          bold: true,
        },
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            style: {
              bold: true,
              fontSize: 16,
            },
            margin: [0, 20, 0, 0],
          },
          headerSubtitle,
        ],
        // text: title, style: { bold: true }
      }
    : null;

  return {
    columns: [
      { width: 'auto', stack: [headerRcdLogo] },
      {
        width: 5,
        stack: [headerHrcLogo],
      },
      { width: '*', stack: [headerTitle] },
      { width: 'auto', stack: [headerDate] },
    ],
    columnGap: 20, // el espacio entre las columnas
  };
};
