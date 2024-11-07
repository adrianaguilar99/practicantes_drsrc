import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/hearder.section';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  allTypeInternAttendances: any[];
}

export const getTypeInternReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { subtitle, title, allTypeInternAttendances } = options;
  const [optionalStartMessage, optionalEndMessage] =
    allTypeInternAttendances.slice(-2);

  return {
    header: headerSection({
      title: title ?? 'Reporte de Practicantes',
      subtitle: subtitle ?? '',
    }),
    footer: footerSection,
    pageMargins: [10, 80, 20, 50],
    content: [
      {
        layout: 'cumtomLayout01',
        table: {
          headerRows: 1,
          widths: [
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
          ],
          body: [
            [
              { text: 'ID', fontSize: 8, bold: true },
              { text: 'Nombre', fontSize: 8, bold: true },
              { text: 'Apellido', fontSize: 8, bold: true },
              { text: 'Departamento de Practicas', fontSize: 8, bold: true },
              { text: 'Institución', fontSize: 8, bold: true },
              { text: 'Fecha', fontSize: 8, bold: true },
              { text: 'Hora de entrada', fontSize: 8, bold: true },
              { text: 'Hora de salida', fontSize: 8, bold: true },
              { text: 'Total de horas', fontSize: 8, bold: true },
              { text: 'Retardo', fontSize: 8, bold: true },
              { text: 'Falta', fontSize: 8, bold: true },
              { text: 'Activo', fontSize: 8, bold: true },
            ],
            ...allTypeInternAttendances.slice(0, -2).map((internAttendance) => [
              {
                text: internAttendance.intern.institution
                  ? internAttendance.intern.externalInternCode
                  : internAttendance.intern.internalInternCode,
                fontSize: 8,
              },
              { text: internAttendance.intern.user.firstName, fontSize: 8 },
              { text: internAttendance.intern.user.lastName, fontSize: 8 },
              {
                text: internAttendance.intern.internshipDepartment.name,
                fontSize: 8,
              },
              {
                text: internAttendance.intern.institution?.name ?? 'INTERNO',
                fontSize: 8,
              },
              { text: internAttendance.attendanceDate, fontSize: 8 },
              { text: internAttendance.entryTime, fontSize: 8 },
              { text: internAttendance.exitTime, fontSize: 8 },
              { text: internAttendance.workedHours, fontSize: 8 },
              { text: internAttendance.isLate ? 'RETARDO' : 'NO', fontSize: 8 },
              {
                text:
                  !internAttendance.entryTime && !internAttendance.exitTime
                    ? 'SI'
                    : null,
                fontSize: 8,
              },
              {
                text: internAttendance.intern?.user.isActive ? 'SI' : 'NO',
                fontSize: 8,
              },
            ]),
          ],
        },
      },
      {
        text: '\n\n',
      },
      {
        layout: 'noBorders',
        table: {
          widths: ['auto'],
          body: [
            [
              {
                text: 'Información Adicional',
                style: {
                  fontSize: 10,
                  bold: true,
                },
              },
            ],
            [
              {
                text:
                  allTypeInternAttendances.length === 0 ? 'No hay datos' : null,
                alignment: 'left',
                style: { fontSize: 8 },
              },
            ],
            [
              {
                text: optionalStartMessage ?? '',
                alignment: 'left',
                style: { fontSize: 8 },
              },
            ],
            [
              {
                text: optionalEndMessage ?? '',
                alignment: 'left',
                style: { fontSize: 8 },
              },
            ],
          ],
        },
      },
    ],
  };
};
