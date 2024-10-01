export function dateToFormattedTimestamp(dateString: string): Date {
  const [datePart, timePart] = dateString.split(', ');
  const [day, month, year] = datePart.split('/').map(Number);
  let [time, period] = timePart.split(' ');
  let [hours, minutes, seconds] = time.split(':').map(Number);

  if (period.toLowerCase() === 'p.m.' && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'a.m.' && hours === 12) {
    hours = 0;
  }

  return new Date(year, month - 1, day, hours, minutes, seconds);
}
