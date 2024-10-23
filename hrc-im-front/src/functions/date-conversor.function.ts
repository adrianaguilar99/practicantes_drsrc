
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
  

