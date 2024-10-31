import { Box, Button } from "@mui/material";
import { ButtonComponent } from "../buttons/buttons.component";
import { RegisterRow } from "../inputs/register-row.component";
import { useState } from "react";
import { InputValidators } from "../../functions/input-validators.functions";

interface ReportGenerationModalProps {
  initialDate: string;
  finalDate: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const ReportGenerationModal: React.FC<ReportGenerationModalProps> = ({
  initialDate,
  finalDate,
  onCancel,
  onSuccess,
}) => {
  const [InitialDate, setInitialDate] = useState<string>("");
  const [FinalDate, setFinalDate] = useState<string>("");

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const GetLastWeekClick = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); 
  
    const lastWeek = new Date(yesterday);
    lastWeek.setDate(yesterday.getDate() - 6);
  
    setInitialDate(formatDate(lastWeek));
    setFinalDate(formatDate(yesterday));
  };
  
  const GetLastMonthClick = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); 
  
    const lastMonth = new Date(yesterday);
    lastMonth.setMonth(yesterday.getMonth() - 1); 
  
    setInitialDate(formatDate(lastMonth));
    setFinalDate(formatDate(yesterday));
  };

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    internBeginDate: undefined,
    InternEndDate: undefined,
  });
  const formSubmit = () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};
   


    const resultBeginDate = validators.date(InitialDate);
    if (resultBeginDate) {
      newErrors.internBeginDate = resultBeginDate;
    }
    if (InitialDate < initialDate || InitialDate > finalDate) {
      newErrors.internBeginDate = "La fecha inicial no puede ser menor o mayor al periodo de practicas";
    }

    const resultEndDate = validators.date(FinalDate);
    if (resultEndDate) {
      newErrors.InternEndDate = resultEndDate;
    }
    if (FinalDate < InitialDate) {
      newErrors.InternEndDate = "La fecha final no puede ser menor a la inicial";
    }
    

    setErrors(newErrors);
    if (!newErrors.internBeginDate && !newErrors.InternEndDate) {
        
      }
    if(FinalDate > finalDate){
      newErrors.InternEndDate = "La fecha final no puede ser mayor al periodo de practicas";
    }  
  };
  

  return (
    <div>
      <div className="report-modal-body">
        <p>Fechas predefinidas</p>
        <div className="report-modal-buttons">
          <button onClick={GetLastWeekClick}>Hace una semana</button>
          <button onClick={GetLastMonthClick}>Hace un mes</button>
          <button onClick={() => {setInitialDate(initialDate); setFinalDate(finalDate)}}>Tiempo total</button>
        </div>

        <p>Fechas personalizadas</p>
        <div className="report-modal-inputs">
          <RegisterRow
            label="Fecha inicial"
            id={"InitialDate"}
            show={true}
            type="date"
            value={InitialDate} 
            onChange={(value) => setInitialDate(value as string ||  "")}
            validate={errors.internBeginDate ? "Error" : "Normal"}
            typeError={errors.internBeginDate}
          />
          <RegisterRow
            label="Fecha final"
            id="FinalDate"
            show={true}
            type="date"
            value={FinalDate} 
            onChange={(value) => setFinalDate(value  as string || "")}
            validate={errors.InternEndDate ? "Error" : "Normal"}
            typeError={errors.InternEndDate}
         
          />
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ maxWidth: "70%" }}>
          <ButtonComponent text="Aceptar" onClick={formSubmit} />
        </div>

        <Button
          variant="contained"
          color="secondary"
          sx={{
            bgcolor: "#A0522D",
            "&:hover": { bgcolor: "#8b4513" },
          }}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </Box>
    </div>
  );
};
