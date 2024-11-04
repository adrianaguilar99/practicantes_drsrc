export class DateFormatter {
  static formatter = new Intl.DateTimeFormat('es-Es', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  static getDDMMMMYYYY = (date: Date): string => this.formatter.format(date);
}
