export const calculateWorkedHoursInHHMMSS = (
  entryTime: string,
  exitTime: string,
): string => {
  const entryDateTime = new Date(`1970-01-01T${entryTime}`);
  const exitDateTime = new Date(`1970-01-01T${exitTime}`);

  const totalSeconds =
    (exitDateTime.getTime() - entryDateTime.getTime()) / 1000;
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};
