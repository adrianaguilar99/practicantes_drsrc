import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/hearder.section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  allInternsAttendances: any[];
}

export const getInternsReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { subtitle, title, allInternsAttendances } = options;
  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Interns Report',
      subtitle: subtitle ?? 'List of Interns',
    }),
    pageMargins: [40, 120, 40, 60],
    content: {
      layout: 'lightHorizontalLines',
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
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
          ...allInternsAttendances.map((internAttendance) => [
            internAttendance.intern.institution
              ? internAttendance.intern.externalInternCode
              : internAttendance.intern.internalInternCode,
            internAttendance.intern.user.firstName,
            internAttendance.intern.user.lastName,
            internAttendance.intern.internshipDepartment.name,
            internAttendance.intern.institution.name ?? 'INTERNO',
            internAttendance.attendanceDate,
            internAttendance.entryTime,
            internAttendance.exitTime,
            internAttendance.workedHours,
            internAttendance.isLate ? 'RETARDO' : 'NO',
            internAttendance.intern.user.isActive ? 'ACTIVO' : 'INACTIVO',
            // internAttendance.
          ]),
        ],
      },
    },
  };
};
