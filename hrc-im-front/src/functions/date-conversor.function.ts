import { format, parse } from "date-fns";

export function DateConversor(dateString: string): string {
    const [datePart, timePart] = dateString.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    const isPM = timePart.toLowerCase().includes("p.m.");
    const [time] = timePart.split(" ");
    let [hours, minutes, seconds] = time.split(":").map(Number);
    if (isPM && hours < 12) {
      hours += 12;
    }
    if (!isPM && hours === 12) {
      hours = 0;
    }
    const dateWithTime = new Date(year, month - 1, day, hours, minutes, seconds);
  
    return dateWithTime.toISOString();
  }
  


  export const formatTime = (time : any) => {
    if (typeof time === 'string' && /^\d{2}:\d{2}:\d{2}$/.test(time)) {
        return time;
    }

    if (typeof time === 'string' && /^\d{2}:\d{2}$/.test(time)) {
        return `${time}:00`;
    }
    return time instanceof Date && !isNaN(time as any)
        ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : "";
};



export const formatDate = (dateString: string) => {
  const [datePart, timePart] = dateString.split('/');
  const parsedDate = parse(`${datePart} ${timePart}`, "yyyy-MM-dd HH:mm:ss", new Date());
  return format(parsedDate, "MM/dd/yyyy hh:mm a");
};

export function formatDateOther(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleDateString('en-US', options).replace(',', '');
}