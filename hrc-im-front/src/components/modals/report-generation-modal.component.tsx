import { Box, Button } from "@mui/material";
import { ButtonComponent } from "../buttons/buttons.component";
import { RegisterRow } from "../inputs/register-row.component";
import { useState } from "react";

interface ReportGenerationModalProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const ReportGenerationModal: React.FC<ReportGenerationModalProps> = ({
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
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    setInitialDate(formatDate(lastWeek));
    setFinalDate(formatDate(today));
  };

  const GetLastMonthClick = () => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    setInitialDate(formatDate(lastMonth));
    setFinalDate(formatDate(today));
  };

  return (
    <div>
      <div className="report-modal-body">
        <p>Fechas predefinidas</p>
        <div className="report-modal-buttons">
          <button onClick={GetLastWeekClick}>Hace una semana</button>
          <button onClick={GetLastMonthClick}>Hace un mes</button>
          <button>Tiempo total</button>
        </div>

        <p>Fechas personalizadas</p>
        <div className="report-modal-inputs">
          <RegisterRow
            label="Fecha inicial"
            id={"InitialDate"}
            show={true}
            type="date"
            value={InitialDate} // Mostrar la fecha en el input
            onChange={() => setInitialDate}
          />
          <RegisterRow
            label="Fecha final"
            id="FinalDate"
            show={true}
            type="date"
            value={FinalDate} // Mostrar la fecha en el input
            onChange={() => setFinalDate}
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
          <ButtonComponent text="Aceptar" onClick={onSuccess} />
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
