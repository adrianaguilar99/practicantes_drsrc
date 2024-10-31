import { enqueueSnackbar } from "notistack";
import { postIntern } from "../../api/interns/interns.api";
import { postUser } from "../../api/users/users.api";
import { PostUser, UserPostResponse } from "../../interfaces/users.interface";
import { PostIntern } from "../../interfaces/interns/interns.interface";
import { DataEmergencyContact } from "../../interfaces/interns/emergency-contacts/emergency-contacts.interface";
import { postEmergencyContact } from "../../api/interns/emergency-contacts/emergency-contacts.api";
import { DataInternFiles, PostInternFilesInterface } from "../../interfaces/interns/intern-files/intern-files.interface";
import { postInternFiles } from "../../api/interns/intern-files/intern-files.api";

interface InternData {
  userToken: string;
  dataUser: PostUser;
  dataIntern?: PostIntern;
  contacts?: DataEmergencyContact[];
  dataFiles?: PostInternFilesInterface;
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
    await postInternFiles(userToken, internId, formData as any);
    enqueueSnackbar("Practicante agregado correctamente", { variant: "success" });
  } catch (error) {
    enqueueSnackbar("Error al agregar los archivos del practicante: " + error, {
      variant: "error",
    });
  }
};



// Función principal para crear el practicante
export const postInternFunction = async ({
  userToken,
  dataUser,
  dataIntern,
  internType,
  contacts = [],
  dataFiles,
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

      const internResponse = await postIntern(userToken, internPayload);
      const internId = internResponse?.data?.id;
      if (!internId) throw new Error("No se pudo crear el internado");
      if (contacts.length > 0) {
        await postEmergencyContacts(userToken, internId, contacts);
      }
      if (dataFiles) {
        await postInternsFiles(userToken, internId, dataFiles);
      }
    }

   
    onSuccess && onSuccess();
  } catch (error) {
    enqueueSnackbar("Algo salió mal: " + error, { variant: "error" });
    onError && onError();
  }
};
