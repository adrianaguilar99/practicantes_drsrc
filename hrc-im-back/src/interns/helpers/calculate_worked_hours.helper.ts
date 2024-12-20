export const calculateTotalWorkedTime = (attendances: any[]): string => {
  const totalSeconds = attendances.reduce((total, attendance) => {
    if (attendance.workedHours) {
      const [hours, minutes, seconds] = attendance.workedHours
        .split(':')
        .map(Number);
      return total + hours * 3600 + minutes * 60 + seconds;
    }
    return total;
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
