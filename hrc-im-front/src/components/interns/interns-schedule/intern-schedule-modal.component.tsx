import { useEffect, useState } from "react";
import { RegisterRow } from "../../inputs/register-row.component";
import { FormModal, FormModalProps } from "../../modals/form-modal.component";
import { Box, Button, Checkbox, DialogTitle } from "@mui/material";
import { ButtonComponent } from "../../buttons/buttons.component";
import { da } from "date-fns/locale";
import { InputValidators } from "../../../functions/input-validators.functions";
import { set } from "date-fns";
import { Close } from "@mui/icons-material";
import { patchSchedule } from "../../../api/interns/intern-schedule/intern-schedule.api";
import { enqueueSnackbar } from "notistack";
import { formatTime } from "../../../functions/date-conversor.function";
import { DataSchedule } from "../../../interfaces/interns/intern-schedule/intern-schedule.interface";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
export interface FormScheduleModalProps {
    type: string;
    data?: any;
    onCancel: () => void;
    onSuccess: () => void;
    onAddSchedule?: (schelude: DataSchedule) => void;
    onOpen?: boolean;
    onClose?: () => void;
  }
export const InternScheduleModal: React.FC<FormScheduleModalProps> = ({
  type,
  data,
  onSuccess,
  onCancel,
  onAddSchedule,
  onOpen,
  onClose

}) => {
  const [mondayIn, setMondayIn] = useState(data?.mondayIn || "09:00");
  const [mondayOut, setMondayOut] = useState(data?.mondayOut || "17:00");
  const [tuesdayIn, setTuesdayIn] = useState(data?.tuesdayIn || "09:00");
  const [tuesdayOut, setTuesdayOut] = useState(data?.tuesdayOut || "17:00");
  const [wednesdayIn, setWednesdayIn] = useState(data?.wednesdayIn || "09:00");
  const [wednesdayOut, setWednesdayOut] = useState(data?.wednesdayOut || "17:00");
  const [thursdayIn, setThursdayIn] = useState(data?.thursdayIn || "09:00");
  const [thursdayOut, setThursdayOut] = useState(data?.thursdayOut || "17:00");
  const [fridayIn, setFridayIn] = useState(data?.fridayIn || "09:00");
  const [fridayOut, setFridayOut] = useState(data?.fridayOut || "17:00");
  const [saturdayIn, setSaturdayIn] = useState(data?.saturdayIn || "09:00");
  const [saturdayOut, setSaturdayOut] = useState(data?.saturdayOut || "17:00");
  const [sundayIn, setSundayIn] = useState(data?.sundayIn || "09:00");
  const [sundayOut, setSundayOut] = useState(data?.sundayOut || "17:00");

  const [mondayChecked, setMondayChecked] = useState(data?.mondayIn ||false);
  const [tuesdayChecked, setTuesdayChecked] = useState(data?.tuesdayIn || false);
  const [wednesdayChecked, setWednesdayChecked] = useState(data?.wednesdayIn || false);
  const [thursdayChecked, setThursdayChecked] = useState(data?.thursdayIn || false);
  const [fridayChecked, setFridayChecked] = useState(data?.fridayIn || false);
  const [saturdayChecked, setSaturdayChecked] = useState(data?.saturdayIn || false);
  const [sundayChecked, setSundayChecked] = useState(data?.sundayIn || false);

  const parseTime = (timeStr : string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const startTime = parseTime("07:00");
  const endTime = parseTime("18:00");

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    MondayIn: undefined,
    MondayOut: undefined,
    TuesdayIn: undefined,
    TuesdayOut: undefined,
    WednesdayIn: undefined,
    WednesdayOut: undefined,
    ThursdayIn: undefined,
    ThursdayOut: undefined,
    FridayIn: undefined,
    FridayOut: undefined,
    SaturdayIn: undefined,
    SaturdayOut: undefined,
    SundayIn: undefined,
    SundayOut: undefined,
  });

  const SummitForm = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};
    if(mondayChecked){
        const resultMondayIn = validators.string(mondayIn);
        if (resultMondayIn) {
          newErrors.MondayIn = resultMondayIn;
        }
        const resultMondayOut = validators.string(mondayOut);
        if (resultMondayOut) {
          newErrors.MondayOut = resultMondayOut;
        }
        if(mondayIn >= mondayOut){
          newErrors.MondayIn = "La hora de salida debe ser mayor a la hora de entrada";
          newErrors.MondayOut = "La hora de salida debe ser mayor a la hora de entrada";
        }

        if (mondayIn < startTime || mondayIn > endTime) {
          newErrors.MondayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
        }
        if (mondayOut < startTime || mondayOut > endTime) {
          newErrors.MondayOut = "La hora de salida debe estar entre las 07:00 y las 18:00";
        }
    }

    if(tuesdayChecked){
        const resultTuesdayIn = validators.string(tuesdayIn);
        if (resultTuesdayIn) {
          newErrors.TuesdayIn = resultTuesdayIn;
        }
        const resultTuesdayOut = validators.string(tuesdayOut);
        if (resultTuesdayOut) {
          newErrors.TuesdayOut = resultTuesdayOut;
        }
        if(tuesdayIn >= tuesdayOut){
          newErrors.TuesdayIn = "La hora de salida debe ser mayor a la hora de entrada";
          newErrors.TuesdayOut = "La hora de salida debe ser mayor a la hora de entrada";
        }

        if (tuesdayIn < startTime || tuesdayIn > endTime) {
          newErrors.TuesdayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
        }
        if (tuesdayOut < startTime || tuesdayOut > endTime) {
          newErrors.TuesdayOut = "La hora de salida debe estar entre las 07:00 y las 18:00";
        }
    }

    if(wednesdayChecked){
        const resultWednesdayIn = validators.string(wednesdayIn);
        if (resultWednesdayIn) {
          newErrors.WednesdayIn = resultWednesdayIn;
        }
        const resultWednesdayOut = validators.string(wednesdayOut);
        if (resultWednesdayOut) {
          newErrors.WednesdayOut = resultWednesdayOut;
        }
        if(wednesdayIn >= wednesdayOut){
          newErrors.WednesdayIn = "La hora de salida debe ser mayor a la hora de entrada";
          newErrors.WednesdayOut = "La hora de salida debe ser mayor a la hora de entrada";
        }

        if (wednesdayIn < startTime || wednesdayIn > endTime) {
          newErrors.WednesdayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
        }
        if (wednesdayOut < startTime || wednesdayOut > endTime) {
          newErrors.WednesdayOut = "La hora de salida debe estar entre las 07:00 y las 18:00";
        }
    }

    if(thursdayChecked){
        const resultThursdayIn = validators.string(thursdayIn);
        if (resultThursdayIn) {
          newErrors.ThursdayIn = resultThursdayIn;
        }
        const resultThursdayOut = validators.string(thursdayOut);
        if (resultThursdayOut) {
          newErrors.ThursdayOut = resultThursdayOut;
        }
        if(thursdayIn >= thursdayOut){
          newErrors.ThursdayOut = "La hora de salida debe ser mayor a la hora de entrada";
          newErrors.ThursdayIn = "La hora de salida debe ser mayor a la hora de entrada";
        }

        if (thursdayIn < startTime || thursdayIn > endTime) {
          newErrors.ThursdayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
        }
        if (thursdayOut < startTime || thursdayOut > endTime) {
          newErrors.ThursdayOut = "La hora de salida debe estar entre las 07:00 y las 18:00";
        }
    }

    if(fridayChecked){
        const resultFridayIn = validators.string(fridayIn);
        if (resultFridayIn) {
          newErrors.FridayIn = resultFridayIn;
        }
        const resultFridayOut = validators.string(fridayOut);
        if (resultFridayOut) {
          newErrors.FridayOut = resultFridayOut;
        }
        if(fridayIn >= fridayOut){
          newErrors.FridayOut = "La hora de salida debe ser mayor a la hora de entrada";
          newErrors.FridayIn = "La hora de salida debe ser mayor a la hora de entrada";
        }

        if (fridayIn < startTime || fridayIn > endTime) {
          newErrors.FridayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
        }
        if (fridayOut < startTime || fridayOut > endTime) {
          newErrors.FridayOut = "La hora de salida debe estar entre las 07:00 y las 18:00";
        }
    }

    if(saturdayChecked){
        const resultSaturdayIn = validators.string(saturdayIn);
        if (resultSaturdayIn) {
          newErrors.SaturdayIn = resultSaturdayIn;
        }
        const resultSaturdayOut = validators.string(saturdayOut);
        if (resultSaturdayOut) {
          newErrors.SaturdayOut = resultSaturdayOut;
        }
        if(saturdayIn >= saturdayOut){
          newErrors.SaturdayOut = "La hora de salida debe ser mayor a la hora de entrada";
          newErrors.SaturdayIn = "La hora de salida debe ser mayor a la hora de entrada";
        }

        if (saturdayIn < startTime || saturdayIn > endTime) {
          newErrors.SaturdayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
        }
        if (saturdayOut < startTime || saturdayOut > endTime) {
          newErrors.SaturdayOut = "La hora de salida debe estar entre las 07:00 y las 18:00";
        }
    }
    
    if(sundayChecked){
        const resultSundayIn = validators.string(sundayIn);
        if (resultSundayIn) {
          newErrors.SundayIn = resultSundayIn;
        }
        const resultSundayOut = validators.string(sundayOut);
        if (resultSundayOut) {
          newErrors.SundayOut = resultSundayOut;
        }
        if(sundayIn >= sundayOut){
          newErrors.SundayOut = "La hora de salida debe ser mayor a la hora de entrada";
          newErrors.SundayIn = "La hora de salida debe ser mayor a la hora de entrada";
        }

        if (sundayIn < startTime || sundayIn > endTime) {
          newErrors.SundayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
        }
        if (sundayOut < startTime || sundayOut > endTime) {
          newErrors.SundayOut = "La hora de salida debe estar entre las 07:00 y las 18:00";
        }
    }

    setErrors(newErrors);
  
    const userToken = sessionStorage.getItem("_Token") || "";
    if (Object.keys(newErrors).length === 0) {
      if(mondayChecked || tuesdayChecked || wednesdayChecked || thursdayChecked || fridayChecked || saturdayChecked || sundayChecked){
        
    
        const scheduleData = {
            ...(mondayChecked ? { mondayIn: formatTime(mondayIn), mondayOut: formatTime(mondayOut)} : {mondayIn: null, mondayOut: null}),
            ...(tuesdayChecked ? { tuesdayIn: formatTime(tuesdayIn), tuesdayOut: formatTime(tuesdayOut) } : {tuesdayIn: null, tuesdayOut: null}),
            ...(wednesdayChecked ? { wednesdayIn: formatTime(wednesdayIn), wednesdayOut: formatTime(wednesdayOut) }: {wednesdayIn: null, wednesdayOut: null}),
            ...(thursdayChecked ? { thursdayIn: formatTime(thursdayIn), thursdayOut: formatTime(thursdayOut) }: {thursdayIn: null, thursdayOut: null}),
            ...(fridayChecked ? { fridayIn: formatTime(fridayIn), fridayOut: formatTime(fridayOut) }: {fridayIn: null, fridayOut: null}),
            ...(saturdayChecked ? { saturdayIn: formatTime(saturdayIn), saturdayOut: formatTime(saturdayOut) }: {saturdayIn: null, saturdayOut: null}),
            ...(sundayChecked ? { sundayIn: formatTime(sundayIn), sundayOut: formatTime(sundayOut) }: {sundayIn: null, sundayOut: null}),
        };
    
    if (type === "Edit") {
        
        
            
            patchSchedule(userToken, data.id, scheduleData as any).then(() => {
                enqueueSnackbar("Horario actualizado correctamente", {
                    variant: "success",
                });
                
                onSuccess();
                onCancel();
            }).catch((error) => {
                enqueueSnackbar("Error al actualizar el horario: " + error, {
                    variant: "error",
                });
            });
        
        
        
      }else{
        if(onAddSchedule){
            onAddSchedule({...scheduleData} as any) ;
            onCancel();
        }
         
      }
    }
    else{
      enqueueSnackbar("Seleccione al menos un dia" , {
        variant: "warning",
    });
    }
    }
 

  };

  return (
    <>
    {type === "Edit" ? (
         <>
         <div className="schedule-modal-container">
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th></th>
            <th>Días</th>
            <th>Hora de entrada</th>
            <th>Hora de salida</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td><Checkbox checked={mondayChecked} onChange={(e) => setMondayChecked(e.target.checked)} /></td>  
              <td><label>Lunes</label></td>
              <td>
                <label className="error-label">
                {errors.MondayIn}
                </label>
                <input className="edit-mode" value={mondayIn} onChange={(e) => setMondayIn(e.target.value)} type="time" hidden={!mondayChecked} />
                </td>
              <td><label className="error-label">
                {errors.MondayOut}
                </label>
                <input className="edit-mode" value={mondayOut} onChange={(e) => setMondayOut(e.target.value)} type="time" hidden={!mondayChecked} /></td>
            </tr>
            <tr>
             <td><Checkbox checked={tuesdayChecked} onChange={(e) => setTuesdayChecked(e.target.checked)}/></td>  
              <td><label>Martes</label></td>
              <td><label className="error-label">
                {errors.TuesdayIn}
                </label>
                <input className="edit-mode" value={tuesdayIn} onChange={(e) => setTuesdayIn(e.target.value)} type="time" hidden={!tuesdayChecked} /></td>
              <td><label className="error-label">
                {errors.TuesdayOut}
                </label>
                <input className="edit-mode" value={tuesdayOut} onChange={(e) => setTuesdayOut(e.target.value)} type="time" hidden={!tuesdayChecked} /></td>
            </tr>
            <tr>
              <td><Checkbox checked={wednesdayChecked} onChange={(e) => setWednesdayChecked(e.target.checked)}/></td>  
              <td><label>Miercoles</label></td>
              <td><label className="error-label">
                {errors.WednesdayIn}
                </label>
                <input className="edit-mode" value={wednesdayIn} onChange={(e) => setWednesdayIn(e.target.value)} type="time" hidden={!wednesdayChecked} /></td>
              <td><label className="error-label">
                {errors.WednesdayOut}
                </label>
                <input className="edit-mode" value={wednesdayOut} onChange={(e) => setWednesdayOut(e.target.value)} type="time" hidden={!wednesdayChecked} /></td>
            </tr>
            <tr>
              <td><Checkbox checked={thursdayChecked} onChange={(e) => setThursdayChecked(e.target.checked)} /></td>  
              <td><label>Jueves</label></td>
              <td><label className="error-label">
                {errors.ThursdayIn}
                </label>
                <input className="edit-mode" value={thursdayIn} onChange={(e) => setThursdayIn(e.target.value)} type="time" hidden={!thursdayChecked} /></td>
              <td><label className="error-label">
                {errors.ThursdayOut}
                </label>
                <input className="edit-mode" value={thursdayOut} onChange={(e) => setThursdayOut(e.target.value)} type="time" hidden={!thursdayChecked}/></td>
            </tr>
            <tr>
              <td><Checkbox checked={fridayChecked} onChange={(e) => setFridayChecked(e.target.checked)} /></td>  
              <td><label>Viernes</label></td>
              <td><label className="error-label">
                {errors.FridayIn}
                </label>
                <input className="edit-mode" value={fridayIn} onChange={(e) => setFridayIn(e.target.value)} type="time" hidden={!fridayChecked} /></td>
              <td><label className="error-label">
                {errors.FridayOut}
                </label>
                <input className="edit-mode" value={fridayOut} onChange={(e) => setFridayOut(e.target.value)} type="time"  hidden={!fridayChecked}/></td>
            </tr>
            <tr> 
              <td><Checkbox checked={saturdayChecked} onChange={(e) => setSaturdayChecked(e.target.checked)} /></td>     
              <td><label>Sabado</label></td>
              <td><label className="error-label">
                {errors.SaturdayIn}
                </label>
                <input className="edit-mode" value={saturdayIn} onChange={(e) => setSaturdayIn(e.target.value)} type="time" hidden={!saturdayChecked} /></td>
              <td><label className="error-label">
                {errors.SaturdayOut}
                </label>
                <input className="edit-mode" value={saturdayOut} onChange={(e) => setSaturdayOut(e.target.value)} type="time" hidden={!saturdayChecked} /></td>
            </tr>
            <tr>
              <td><Checkbox checked={sundayChecked} onChange={(e) => setSundayChecked(e.target.checked)} /></td>  
              <td><label>Domingo</label></td>
              <td><label className="error-label">
                {errors.SundayIn}
                </label>
                <input className="edit-mode" value={sundayIn} onChange={(e) => setSundayIn(e.target.value)} type="time" hidden={!sundayChecked} /></td>
              <td><label className="error-label">
                {errors.SundayOut}
                </label>
                <input className="edit-mode" value={sundayOut} onChange={(e) => setSundayOut(e.target.value)} type="time" hidden={!sundayChecked} /></td>
            </tr>
    
        </tbody>
      </table>
    </div>
    
              <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div style={{ maxWidth: "80%" }}>
                <ButtonComponent text="Aceptar" onClick={() => SummitForm()} />
              </div>
    
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: "#A0522D",
                  "&:hover": { bgcolor: "#8b4513" },
                }}
                onClick={()=> {onCancel()}}
              >
                Cancelar
              </Button>
            </Box>
            </>          
    ):(
        <Dialog
        open={onOpen || false}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
         <DialogTitle
      sx={{
        bgcolor: "#2E3B4E", 
        color: "#fff",      
        padding: 2,
        textAlign: "start",
        fontSize: ".9rem",
        height: 5,
        lineHeight: 1,
      }}
    >
      {"Agregar un horario"}
    </DialogTitle>
        <DialogContent  sx={{
      backgroundColor: "#EDEDED",
    }
    }>
        <>
         <div className="schedule-modal-container">
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th></th>
            <th>Días</th>
            <th>Hora de entrada</th>
            <th>Hora de salida</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td><Checkbox checked={mondayChecked} onChange={(e) => setMondayChecked(e.target.checked)} /></td>  
              <td><label>Lunes</label></td>
              <td>
                <label className="error-label">
                {errors.MondayIn}
                </label>
                <input className="edit-mode" value={mondayIn} onChange={(e) => setMondayIn(e.target.value)} type="time" hidden={!mondayChecked} />
                </td>
              <td><label className="error-label">
                {errors.MondayOut}
                </label>
                <input className="edit-mode" value={mondayOut} onChange={(e) => setMondayOut(e.target.value)} type="time" hidden={!mondayChecked} /></td>
            </tr>
            <tr>
             <td><Checkbox checked={tuesdayChecked} onChange={(e) => setTuesdayChecked(e.target.checked)}/></td>  
              <td><label>Martes</label></td>
              <td><label className="error-label">
                {errors.TuesdayIn}
                </label>
                <input className="edit-mode" value={tuesdayIn} onChange={(e) => setTuesdayIn(e.target.value)} type="time" hidden={!tuesdayChecked} /></td>
              <td><label className="error-label">
                {errors.TuesdayOut}
                </label>
                <input className="edit-mode" value={tuesdayOut} onChange={(e) => setTuesdayOut(e.target.value)} type="time" hidden={!tuesdayChecked} /></td>
            </tr>
            <tr>
              <td><Checkbox checked={wednesdayChecked} onChange={(e) => setWednesdayChecked(e.target.checked)}/></td>  
              <td><label>Miercoles</label></td>
              <td><label className="error-label">
                {errors.WednesdayIn}
                </label>
                <input className="edit-mode" value={wednesdayIn} onChange={(e) => setWednesdayIn(e.target.value)} type="time" hidden={!wednesdayChecked} /></td>
              <td><label className="error-label">
                {errors.WednesdayOut}
                </label>
                <input className="edit-mode" value={wednesdayOut} onChange={(e) => setWednesdayOut(e.target.value)} type="time" hidden={!wednesdayChecked} /></td>
            </tr>
            <tr>
              <td><Checkbox checked={thursdayChecked} onChange={(e) => setThursdayChecked(e.target.checked)} /></td>  
              <td><label>Jueves</label></td>
              <td><label className="error-label">
                {errors.ThursdayIn}
                </label>
                <input className="edit-mode" value={thursdayIn} onChange={(e) => setThursdayIn(e.target.value)} type="time" hidden={!thursdayChecked} /></td>
              <td><label className="error-label">
                {errors.ThursdayOut}
                </label>
                <input className="edit-mode" value={thursdayOut} onChange={(e) => setThursdayOut(e.target.value)} type="time" hidden={!thursdayChecked}/></td>
            </tr>
            <tr>
              <td><Checkbox checked={fridayChecked} onChange={(e) => setFridayChecked(e.target.checked)} /></td>  
              <td><label>Viernes</label></td>
              <td><label className="error-label">
                {errors.FridayIn}
                </label>
                <input className="edit-mode" value={fridayIn} onChange={(e) => setFridayIn(e.target.value)} type="time" hidden={!fridayChecked} /></td>
              <td><label className="error-label">
                {errors.FridayOut}
                </label>
                <input className="edit-mode" value={fridayOut} onChange={(e) => setFridayOut(e.target.value)} type="time"  hidden={!fridayChecked}/></td>
            </tr>
            <tr> 
              <td><Checkbox checked={saturdayChecked} onChange={(e) => setSaturdayChecked(e.target.checked)} /></td>     
              <td><label>Sabado</label></td>
              <td><label className="error-label">
                {errors.SaturdayIn}
                </label>
                <input className="edit-mode" value={saturdayIn}  onChange={(e) => setSaturdayIn(e.target.value)} type="time" hidden={!saturdayChecked} /></td>
              <td><label className="error-label">
                {errors.SaturdayOut}
                </label>
                <input className="edit-mode" value={saturdayOut} onChange={(e) => setSaturdayOut(e.target.value)} type="time" hidden={!saturdayChecked} /></td>
            </tr>
            <tr>
              <td><Checkbox checked={sundayChecked} onChange={(e) => setSundayChecked(e.target.checked)} /></td>  
              <td><label>Domingo</label></td>
              <td><label className="error-label">
                {errors.SundayIn}
                </label>
                <input className="edit-mode" value={sundayIn} onChange={(e) => setSundayIn(e.target.value)} type="time" hidden={!sundayChecked} /></td>
              <td><label className="error-label">
                {errors.SundayOut}
                </label>
                <input className="edit-mode" value={sundayOut} onChange={(e) => setSundayOut(e.target.value)} type="time" hidden={!sundayChecked} /></td>
            </tr>
    
        </tbody>
      </table>
    </div>
    
              <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div style={{ maxWidth: "80%" }}>
                <ButtonComponent text="Aceptar" onClick={() => SummitForm()} />
              </div>
    
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: "#A0522D",
                  "&:hover": { bgcolor: "#8b4513" },
                }}
                onClick={()=> {onCancel()}}
              >
                Cancelar
              </Button>
            </Box>
            </>  
        </DialogContent>
      </Dialog>
    )}
    
    </>
  )
}

export const ScheduleRegister = ({ triggerAction = false, onReceiveContacts = (schedules: DataSchedule[]) => {} }) => {
    const [schedules, setSchedules] = useState<DataSchedule[]>([]);
    const [open, setOpen] = useState<boolean>(false);
  
    const addSchedule = (newSchedule: DataSchedule) => {
        setSchedules((prevSchedules) => {
          const scheduleExists = prevSchedules.some(schedule => schedule.id === newSchedule.id);
      
          if (scheduleExists) {
            return prevSchedules.map(schedule => 
              schedule.id === newSchedule.id ? newSchedule : schedule
            );
          } else {
            return [...prevSchedules, newSchedule];
          }
        });
      
        console.log("Horario agregado o reemplazado:", newSchedule);
      };
  
    useEffect(() => {
      if (triggerAction) {
        console.log("Acción activada por el componente padre");
        onReceiveContacts(schedules);
      }
    }, [triggerAction, schedules, onReceiveContacts]);
  
    return (
      <div>
        <button onClick={() => setOpen(true)}>Añadir horario</button>
        <InternScheduleModal 
          onOpen={open} 
          onCancel={() => setOpen(false)} 
          onAddSchedule={addSchedule} 
          type={"register"} 
          onSuccess={() => {
            console.log("Horario agregado exitosamente.");
            setOpen(false);
          }} 
          onClose={() => setOpen(false)}
        />
        {schedules.map((schedule, index) => (
          <div key={schedule.id} className="schedule-add-map">
            <label>Lunes: {schedule.mondayIn} - {schedule.mondayOut}</label>
            <label>Martes: {schedule.tuesdayIn} - {schedule.tuesdayOut}</label>
            <label>Miercoles: {schedule.wednesdayIn} - {schedule.wednesdayOut}</label>
            <label>Jueves: {schedule.thursdayIn} - {schedule.thursdayOut}</label>
            <label>Viernes: {schedule.fridayIn} - {schedule.fridayOut}</label>
            <label>Sabado: {schedule.saturdayIn} - {schedule.saturdayOut}</label>
            <label>Domingo: {schedule.sundayIn} - {schedule.sundayOut}</label>
          </div>
        ))}
      </div>
    );
  };