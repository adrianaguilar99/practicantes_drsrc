import { Box, Button, CircularProgress } from "@mui/material";
import { ButtonComponent } from "../buttons/buttons.component";
import { RegisterRow } from "../inputs/register-row.component";
import { useState, useEffect } from "react";
import { InputValidators } from "../../functions/input-validators.functions";
import { postReport } from "../../api/interns/reports/reports.api";

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
  const [report, setReport] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({
    BeginDate: undefined,
    EndDate: undefined,
  });

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

  const formSubmit = async () => {
    const validators = InputValidators();
    const newErrors: { [key: string]: string | undefined } = {};

    const resultBeginDate = validators.date(InitialDate);
    if (resultBeginDate) {
      newErrors.BeginDate = resultBeginDate;
    }

    const resultEndDate = validators.date(FinalDate);
    if (resultEndDate) {
      newErrors.EndDate = resultEndDate;
    }
    if (FinalDate < InitialDate) {
      newErrors.EndDate = "La fecha final no puede ser menor a la inicial";
    }

    setErrors(newErrors);
    const userToken = sessionStorage.getItem("_Token") || "";
    if (!newErrors.BeginDate && !newErrors.EndDate) {
      setIsLoading(true);
      try {
        const response = await postReport(userToken, {
          start: InitialDate,
          end: FinalDate,
        });

        const fileBlob = new Blob([response], { type: "application/pdf" });
        const fileUrl = URL.createObjectURL(fileBlob);
        setReport(fileUrl);
        setShowReport(true);
        onSuccess();
      } catch (error) {
        console.error("Error al generar el reporte:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {showReport ? (
            <iframe
              src={report}
              width="100%"
              height="600px"
              title="Reporte PDF"
              style={{ border: "none" }}
            />
          ) : (
            <>
              <div className="report-modal-body">
                <p>Fechas predefinidas</p>
                <div className="report-modal-buttons">
                  <button onClick={GetLastWeekClick}>Hace una semana</button>
                  <button onClick={GetLastMonthClick}>Hace un mes</button>
                </div>

                <p>Fechas personalizadas</p>
                <div className="report-modal-inputs">
                  <RegisterRow
                    label="Fecha inicial"
                    id={"InitialDate"}
                    show={true}
                    type="date"
                    value={InitialDate}
                    onChange={(value) => setInitialDate(value as string || "")}
                    validate={errors.BeginDate ? "Error" : "Normal"}
                    typeError={errors.BeginDate}
                  />
                  <RegisterRow
                    label="Fecha final"
                    id="FinalDate"
                    show={true}
                    type="date"
                    value={FinalDate}
                    onChange={(value) => setFinalDate(value as string || "")}
                    validate={errors.EndDate ? "Error" : "Normal"}
                    typeError={errors.EndDate}
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
                    bgcolor: "#D32F2F",
                    "&:hover": { bgcolor: "#8b4513" },
                  }}
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
              </Box>
            </>
          )}
        </>
      )}
    </div>
  );
};
