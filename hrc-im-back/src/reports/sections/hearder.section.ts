import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/common/utils';

const logo: Content = {
  image: 'src/assets/images/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 30],
  width: 200,
};

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { showDate = true, showLogo = true, subtitle, title } = options;

  const headerLogo: Content = showLogo ? logo : null;

  const headerDate: Content = showDate ? currentDate : null;

  const headerSubtitle: Content = subtitle
    ? {
        text: subtitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          fontSize: 16,
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
              fontSize: 22,
            },
            margin: [0, 20, 0, 0],
          },
          headerSubtitle,
        ],
        // text: title, style: { bold: true }
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
