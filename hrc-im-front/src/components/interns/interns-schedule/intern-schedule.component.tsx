import { ButtonComponent } from "../../buttons/buttons.component";
import { FormModal } from "../../modals/form-modal.component";
import { useEffect, useState } from "react";
import {
  DataSchedule,
  ScheduleInterface,
} from "../../../interfaces/interns/intern-schedule/intern-schedule.interface";
import { getScheduleData } from "../../../api/interns/intern-schedule/intern-schedule.api";
import {
  CircularProgress,
  NothingToSee,
} from "../../utils/circular-progress.component";
import { RetryElement } from "../../utils/retry-element.component";
import { Tooltip } from "@mui/material";
import { decryptData } from "../../../functions/encrypt-data.function";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface InternsScheduleProps {
  internId: string;
 
}
export const InternsSchedule: React.FC<InternsScheduleProps> = ({
  internId,
  

}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DataSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const userRol = useSelector((state: RootState) => decryptData(state.auth.rol || "") || "");
  const userToken = sessionStorage.getItem("_Token") || "";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedData: ScheduleInterface | null = await getScheduleData(
        userToken,
        internId
      );
      if (fetchedData && fetchedData.data) {
        setData(fetchedData.data);
        setHasError(false);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken]);

 
  const daysMapping: Record<string, [keyof DataSchedule, keyof DataSchedule]> =
    {
      monday: ["mondayIn", "mondayOut"],
      tuesday: ["tuesdayIn", "tuesdayOut"],
      wednesday: ["wednesdayIn", "wednesdayOut"],
      thursday: ["thursdayIn", "thursdayOut"],
      friday: ["fridayIn", "fridayOut"],
      saturday: ["saturdayIn", "saturdayOut"],
      sunday: ["sundayIn", "sundayOut"],
    };

  const ModalClose = () => {
    setOpen(false);
  };

  const hours = [];
for (let i = 7; i < 18; i++) {
  const startHour = i < 10 ? `0${i}:00` : `${i}:00`;
  const endHour = (i + 1) < 10 ? `0${i + 1}:00` : `${i + 1}:00`;
  hours.push(`${startHour} - ${endHour}`);
}

const isHighlighted = (day: string, hourRange: string) => {
  if (!data) return false;
  const [startHour] = hourRange.split(" - ");
  const inTime = new Date(`1970-01-01T${data[daysMapping[day][0]]}`);
  const outTime = new Date(`1970-01-01T${data[daysMapping[day][1]]}`);
  const currentTime = new Date(`1970-01-01T${startHour}`);

  // Ajusta las horas al mismo timezone
  inTime.setMinutes(inTime.getMinutes() - inTime.getTimezoneOffset());
  outTime.setMinutes(outTime.getMinutes() - outTime.getTimezoneOffset());
  currentTime.setMinutes(currentTime.getMinutes() - currentTime.getTimezoneOffset());

  return currentTime >= inTime && currentTime < outTime;
};
  

  const onUpdate = () => {
    fetchData();
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress type="secondary" />
      ) : hasError ? (
        <RetryElement onClick={() => fetchData()} />
      ) : data === null ? (
        <NothingToSee />
      ) : (
        <div className="interns-schedule-container">
          <section className="schedule-table-container">
            <table className="schedule-table">
              <thead>
                <tr className="schedule-table-headers">
                  <th>Tiempo</th>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                  <th>Sábado</th>
                  <th>Domingo</th>
                </tr>
              </thead>
              <tbody>
                {hours.map((hour) => (
                  <tr key={hour}>
                    <td style={{ ...cellStyle, backgroundColor: "#dfdfdf" }}>
                      {hour}
                    </td >
                    {Object.keys(daysMapping).map((day) => (
                      <Tooltip
                        title={`Entrada: ${data[daysMapping[day][0]] || "Disponible"} Salida: ${data[daysMapping[day][1]] || "Disponible"}`}
                        followCursor
                        
                      >
                        <td
                          key={day}
                          style={{
                            ...cellStyle,
                            backgroundColor: isHighlighted(day, hour + ":00")
                              ? "rgb(99 62 255 / 43%)"
                              : "white",
                              cursor: "pointer",
                              
                          }}
                        ></td>
                      </Tooltip>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          {userRol != "SUPERVISOR" && (
             <section className="schedule-buttons">
             <ButtonComponent
               text="Editar horario"
               onClick={() => setOpen(true)}
             />
           </section>
          )}
         
        </div>
      )}

      <FormModal
        open={open}
        onConfirm={onUpdate}
        type="Edit"
        onCancel={ModalClose}
        data={data}
        title="Editar horario"
        entity={"schedule"}
      />
    </>
  );
};
const cellStyle = {
  border: "1px solid #ddd",
  padding: "15px",
  backgroundColor: "#f2f2f2",
  textAlign: "center" as const,
  fontWeight: "bold",
  boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
};
