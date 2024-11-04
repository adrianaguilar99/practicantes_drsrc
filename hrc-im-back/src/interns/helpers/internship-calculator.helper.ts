export const internshipCalculator = (
  internshipDuration: any,
  attendances: any[],
): number => {
  const requiredHours = internshipDuration.hours; // lo pasamos a numero ya que en la db esta en string

  const totalWorkedHours = attendances.reduce((total, attendance) => {
    if (attendance.worked_hours) {
      const [hours, minutes, seconds] = attendance.worked_hours
        .split(':')
        .map(Number);
      return total + hours + minutes / 60 + seconds / 3600;
    }
    return total;
  }, 0);
  if (requiredHours === 0) return 0;

  const completionPercentage = (totalWorkedHours / requiredHours) * 100;
  return parseFloat(completionPercentage.toFixed(2));
};
