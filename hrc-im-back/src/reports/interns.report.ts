import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/hearder.section';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  allInternsAttendances: any[];
}

export const getInternsReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { subtitle, title, allInternsAttendances } = options;
  const [
    optionalStartMessage,
    optionalEndMessage,
    internalInternsCount,
    externalInternsCount,
  ] = allInternsAttendances.slice(-4);

  return {
    header: headerSection({
      title: title ?? 'Reporte de Practicantes',
      subtitle: subtitle ?? '',
    }),
    footer: footerSection,
    pageMargins: [20, 80, 20, 50],
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
          ],
          body: [
            [
              { text: 'ID', fontSize: 8, bold: true },
              { text: 'Nombre', fontSize: 8, bold: true },
              { text: 'Apellido', fontSize: 8, bold: true },
              { text: 'Departamento', fontSize: 8, bold: true },
              { text: 'Institución', fontSize: 8, bold: true },
              { text: 'Fecha', fontSize: 8, bold: true },
              { text: 'Hora de entrada', fontSize: 8, bold: true },
              { text: 'Hora de salida', fontSize: 8, bold: true },
              { text: 'Total de horas', fontSize: 8, bold: true },
              { text: 'Retardo', fontSize: 8, bold: true },
              { text: 'Activo', fontSize: 8, bold: true },
            ],
            ...allInternsAttendances.slice(0, -4).map((internAttendance) => [
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
                text: internAttendance.intern?.user.isActive
                  ? 'ACTIVO'
                  : 'INACTIVO',
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
            [
              {
                text: `Total de practicantes internos: ${internalInternsCount ?? 0}`,
                alignment: 'left',
                style: { fontSize: 8 },
              },
            ],
            [
              {
                text: `Total de practicantes externos: ${externalInternsCount ?? 0}`,
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
