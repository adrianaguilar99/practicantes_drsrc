import { enqueueSnackbar } from "notistack";
import { postIntern } from "../../api/interns/interns.api";
import { postUser, rollbackUser } from "../../api/users/users.api";
import { PostUser, UserPostResponse } from "../../interfaces/users.interface";
import { PostIntern } from "../../interfaces/interns/interns.interface";
import { DataEmergencyContact } from "../../interfaces/interns/emergency-contacts/emergency-contacts.interface";
import { postEmergencyContact } from "../../api/interns/emergency-contacts/emergency-contacts.api";
import { DataInternFiles, PostInternFilesInterface } from "../../interfaces/interns/intern-files/intern-files.interface";
import { postInternFiles } from "../../api/interns/intern-files/intern-files.api";
import { DataSchedule, PostSchedule } from "../../interfaces/interns/intern-schedule/intern-schedule.interface";
import { postInternSchedule } from "../../api/interns/intern-schedule/intern-schedule.api";

interface InternData {
  userToken: string;
  dataUser: PostUser;
  dataIntern?: PostIntern;
  contacts?: DataEmergencyContact[];
  dataFiles?: PostInternFilesInterface;
  dataSchedule?: PostSchedule[];
  internType?: string;
  onSuccess?: () => void;
  onError?: () => void;
}

const postEmergencyContacts = async (
  userToken: string,
  internId: string,
  contacts: DataEmergencyContact[]
): Promise<void> => {
  for (const contact of contacts) {
    try {
      await postEmergencyContact(userToken, {
        ...contact,
        internId
      });
    } catch (error) {
      enqueueSnackbar("Error al agregar contacto de emergencia: " + error, {
        variant: "error",
      });
    }
  }
};


const postInternsFiles = async (
  userToken: string,
  internId: string,
  files: PostInternFilesInterface
): Promise<void> => {
  if (!files.photo || !files.compiledDocuments) {
    enqueueSnackbar("Archivos incompletos: se requieren photo y compiledDocuments", {
      variant: "warning",
    });
    return;
  }

  const formData = new FormData();
  formData.append("photo", files.photo);
  formData.append("compiledDocuments", files.compiledDocuments);

  try {
    await postInternFiles(userToken, internId, formData as any).then(() => {
    });
  } catch (error) {
    enqueueSnackbar("Error al agregar los archivos del practicante: " + error, {
      variant: "error",
    });
  }
};
const postInternSchedules = async (
  userToken: string,
  internId: string,
  schedule: PostSchedule[]
): Promise<boolean> => {
  try {
    console.log("Contenido de schedule:", schedule);
    const scheduleData = schedule[0];
    const payload = {
      mondayIn: scheduleData.mondayIn,
      mondayOut: scheduleData.mondayOut,
      tuesdayIn: scheduleData.tuesdayIn,
      tuesdayOut: scheduleData.tuesdayOut,
      wednesdayIn: scheduleData.wednesdayIn,
      wednesdayOut: scheduleData.wednesdayOut,
      thursdayIn: scheduleData.thursdayIn,
      thursdayOut: scheduleData.thursdayOut,
      fridayIn: scheduleData.fridayIn,
      fridayOut: scheduleData.fridayOut,
      saturdayIn: scheduleData.saturdayIn,
      saturdayOut: scheduleData.saturdayOut,
      sundayIn: scheduleData.sundayIn,
      sundayOut: scheduleData.sundayOut,
      internId,
    };
    console.log("Payload para postInternSchedule:", payload);

    await postInternSchedule(userToken, payload);

    enqueueSnackbar("Practicante agregado correctamente", { variant: "success" });
    return true; 
  } catch (error: any) {
    enqueueSnackbar("Error al agregar el horario del practicante: " + (error.message || error), {
      variant: "error",
    });
    return false; 
  }
};





export const postInternFunction = async ({
  userToken,
  dataUser,
  dataIntern,
  internType,
  contacts = [],
  dataFiles,
  dataSchedule,
  onSuccess,
  onError,
}: InternData): Promise<void> => {
  try {
    const userResponse: UserPostResponse = await postUser(userToken, {
      ...dataUser,
      userRole: "INTERN",
    });

    const userId = userResponse?.data?.id;
    if (!userId) throw new Error("No se pudo crear el usuario");
    if (dataIntern) {
      const internPayload: PostIntern = {
        bloodType: dataIntern.bloodType,
        phone: dataIntern.phone,
        address: dataIntern.address,

        internshipStart: dataIntern.internshipStart,
        internshipEnd: dataIntern.internshipEnd,
        internshipDuration: dataIntern.internshipDuration,
        status: "ACTIVE",
        userId,
        ...(internType === "Externo"
          ? {
              schoolEnrollment: dataIntern.schoolEnrollment,
              careerId: dataIntern.careerId,
              internshipDepartmentId: dataIntern.internshipDepartmentId,
              institutionId: dataIntern.institutionId,
            }
          : {
              departmentId: dataIntern.departmentId,
              internshipDepartmentId: dataIntern.internshipDepartmentId,
              internalInternCode: dataIntern.internalInternCode,
            }),
        propertyId: dataIntern.propertyId,
      };

      const internResponse = await postIntern(userToken, internPayload).catch(
        (error) => {
          rollbackUser(userToken, userId).then(() => {
            enqueueSnackbar("Se revirtieron todos los cambios "  + error, { variant: "warning" });
          }).catch((rollbackError) => {
            enqueueSnackbar("Ocurrio un error en el rollback "  + rollbackError, { variant: "error" });
          });
        }
      );
      const internId = internResponse?.data?.id;
      console.log(internResponse);
      if (!internId) throw new Error("No se pudo crear el practicante");
      if (contacts.length > 0) {
        await postEmergencyContacts(userToken, internId, contacts);
      }
      if (dataFiles && internId) {
        await postInternsFiles(userToken, internId, dataFiles);
      }
      if (dataSchedule && internId) {
        await postInternSchedules(userToken, internId, dataSchedule);
      }
    }

   
    onSuccess && onSuccess();
  } catch (error) {
    enqueueSnackbar("Algo salió mal: " + error, { variant: "error" });
    onError && onError();
  }
};
