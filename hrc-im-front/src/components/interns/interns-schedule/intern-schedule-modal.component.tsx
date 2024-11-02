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
  const [mondayIn, setMondayIn] = useState(data?.mondayIn || "");
  const [mondayOut, setMondayOut] = useState(data?.mondayOut || "");
  const [tuesdayIn, setTuesdayIn] = useState(data?.tuesdayIn || "");
  const [tuesdayOut, setTuesdayOut] = useState(data?.tuesdayOut || "");
  const [wednesdayIn, setWednesdayIn] = useState(data?.wednesdayIn || "");
  const [wednesdayOut, setWednesdayOut] = useState(data?.wednesdayOut || "");
  const [thursdayIn, setThursdayIn] = useState(data?.thursdayIn || "");
  const [thursdayOut, setThursdayOut] = useState(data?.thursdayOut || "");
  const [fridayIn, setFridayIn] = useState(data?.fridayIn || "");
  const [fridayOut, setFridayOut] = useState(data?.fridayOut || "");
  const [saturdayIn, setSaturdayIn] = useState(data?.saturdayIn || "");
  const [saturdayOut, setSaturdayOut] = useState(data?.saturdayOut || "");
  const [sundayIn, setSundayIn] = useState(data?.sundayIn || "");
  const [sundayOut, setSundayOut] = useState(data?.sundayOut || "");

  const [mondayChecked, setMondayChecked] = useState(data?.mondayIn ||false);
  const [tuesdayChecked, setTuesdayChecked] = useState(data?.tuesdayIn || false);
  const [wednesdayChecked, setWednesdayChecked] = useState(data?.wednesdayIn || false);
  const [thursdayChecked, setThursdayChecked] = useState(data?.thursdayIn || false);
  const [fridayChecked, setFridayChecked] = useState(data?.fridayIn || false);
  const [saturdayChecked, setSaturdayChecked] = useState(data?.saturdayIn || false);
  const [sundayChecked, setSundayChecked] = useState(data?.sundayIn || false);

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

        if(mondayIn < "07:00" || mondayIn > "18:00" || mondayOut < "07:00" || mondayOut > "18:00"){
          newErrors.MondayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
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
        if(tuesdayIn < "07:00" || tuesdayIn > "18:00" || tuesdayOut < "07:00" || tuesdayOut > "18:00"){
          newErrors.TuesdayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
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
        if(wednesdayIn < "07:00" || wednesdayIn > "18:00" || wednesdayOut < "07:00" || wednesdayOut > "18:00"){
          newErrors.WednesdayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
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
        if(thursdayIn < "07:00" || thursdayIn > "18:00" || thursdayOut < "07:00" || thursdayOut > "18:00"){
          newErrors.ThursdayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
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
        if(fridayIn < "07:00" || fridayIn > "18:00" || fridayOut < "07:00" || fridayOut > "18:00"){
          newErrors.FridayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
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
        if(saturdayIn < "07:00" || saturdayIn > "18:00" || saturdayOut < "07:00" || saturdayOut > "18:00"){
          newErrors.SaturdayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
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
        if(sundayIn < "07:00" || sundayIn > "18:00" || sundayOut < "07:00" || sundayOut > "18:00"){
          newErrors.SundayIn = "La hora de entrada debe estar entre las 07:00 y las 18:00";
          newErrors.SundayOut = "La hora de salida debe estar entre las 07:00 y las 18:00";
        }
    }

    setErrors(newErrors);
    const userToken = sessionStorage.getItem("_Token") || "";
    if (Object.keys(newErrors).length === 0) {
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
        <DialogTitle id="alert-dialog-title">{"Agregar un horario"}</DialogTitle>
        <DialogContent>
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