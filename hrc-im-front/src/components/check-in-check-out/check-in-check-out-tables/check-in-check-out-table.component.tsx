import { Divider, Paper, Typography } from "@mui/material";
import { CheckInCheckOutCard } from "./check-in-check-out-card.component";
import { TableProps } from "../../audits/audits-table.component";
import { DataAttendance } from "../../../interfaces/attendances/attendances.interface";
import { format, parse } from 'date-fns';
import { formatDate } from "../../../functions/date-conversor.function";

interface AttendanceTableProps {
  data?: DataAttendance[];
  onUpdate: () => void;
}

export const CheckInCheckOutTable: React.FC<AttendanceTableProps> = ({ data }) => {

  const groupByDate = (items: any[]) => {
    return items.reduce((acc: any, item: any) => {
      const parsedDate = formatDate(item.attendanceDate + "/" + item.entryTime);
      const date = format(parse(parsedDate, "MM/dd/yyyy hh:mm a", new Date()), "yyyy-MM-dd");
      
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };


  const groupedPracticantes = groupByDate(data || []);
  const sortedDates = Object.keys(groupedPracticantes).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="interns-table">
      <div className="table-headers">
        <span>Practicante</span>
        <span>Tipo asistencia</span>
        <span>Fecha y hora</span>
      </div>
      <div className="table-checkin-checkout-body">
        {sortedDates.map((date) => (
          <div key={date}>
            <Divider sx={{ marginY: ".5%" }} />
            <Typography variant="subtitle1" color="textSecondary">
              {format(parse(date, "yyyy-MM-dd", new Date()), "MM/dd/yyyy")}
            </Typography>
            {groupedPracticantes[date].map((attendance: DataAttendance) => (
              <CheckInCheckOutCard
                key={attendance.id}
                id={attendance.id}
                internId={attendance.intern.id}
                nombre={attendance.intern.user.firstName + " " + attendance.intern.user.lastName}
                departamento={attendance.intern.internshipDepartment.name}
                tipo={attendance.intern.externalInternCode ? "EXTERNO" : "INTERNO"}
                type_check={attendance.attendanceStatuses}
                late={attendance.isLate}
                date={formatDate(attendance.attendanceDate + "/" + attendance.entryTime)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
