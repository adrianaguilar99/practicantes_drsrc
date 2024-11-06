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
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Reporte de Practicantes',
      subtitle: subtitle ?? '',
    }),
    footer: footerSection,
    pageMargins: [40, 120, 40, 60],
    content: [
      {
        layout: 'cumtomLayout01',
        table: {
          headerRows: 1,
          widths: [
            50,
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
              'ID',
              'Nombre',
              'Apellido',
              'Departamento',
              'Institución',
              'Fecha',
              'Hora de entrada',
              'Hora de salida',
              'Total de horas',
              'Retardo',
              'Activo',
            ],
            ...allInternsAttendances
              .slice(0, -4)
              .map((internAttendance) => [
                internAttendance.intern.institution
                  ? internAttendance.intern.externalInternCode
                  : internAttendance.intern.internalInternCode,
                internAttendance.intern.user.firstName,
                internAttendance.intern.user.lastName,
                internAttendance.intern.internshipDepartment.name,
                internAttendance.intern.institution?.name ?? 'INTERNO',
                internAttendance.attendanceDate,
                internAttendance.entryTime,
                internAttendance.exitTime,
                internAttendance.workedHours,
                internAttendance.isLate ? 'RETARDO' : 'NO',
                internAttendance.intern?.user.isActive ? 'ACTIVO' : 'INACTIVO',
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
                  fontSize: 15,
                  bold: true,
                },
              },
            ],
            [{ text: optionalStartMessage ?? '', alignment: 'left' }],
            [{ text: optionalEndMessage ?? '', alignment: 'left' }],
            [
              {
                text: `Total de practicantes internos: ${internalInternsCount ?? 0}`,
                alignment: 'left',
              },
            ],
            [
              {
                text: `Total de practicantes externos: ${externalInternsCount ?? 0}`,
                alignment: 'left',
              },
            ],
          ],
        },
      },
    ],
  };
};
