import { enqueueSnackbar } from "notistack";
import { patchIntern } from "../../api/interns/interns.api";
import { patchUser } from "../../api/users/users.api";
import { PatchIntern } from "../../interfaces/interns/interns.interface";
import { PatchUser } from "../../interfaces/users.interface";

interface InternData {
  userToken: string;
  dataUser: PatchUser;
  internId: string;
  dataIntern?: PatchIntern;
  internType?: string;
  userId: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export const patchInternFunction = async ({
  userToken,
  dataUser,
  dataIntern,
  internId,
  userId,
  internType,
  onSuccess,
  onError,
}: InternData): Promise<void> => {
  try {
    const userResponse: any = await patchUser(userToken, userId, dataUser);

    if (dataIntern && userResponse) {
      const internPayload: PatchIntern = {
        bloodType: dataIntern.bloodType,
        phone: dataIntern.phone,
        address: dataIntern.address,
        internshipStart: dataIntern.internshipStart,
        internshipEnd: dataIntern.internshipEnd,
        internshipDuration: dataIntern.internshipDuration,
        internshipDepartmentId: dataIntern.internshipDepartmentId,
        ...(internType === "Externo"
          ? {
              schoolEnrollment: dataIntern.schoolEnrollment,
              careerId: dataIntern.careerId,
              externalInternCode: dataIntern.externalInternCode,
              institutionId: dataIntern.institutionId,
            }
          : {
              departmentId: dataIntern.departmentId,
              internalInternCode: dataIntern.internalInternCode,
            }),
        propertyId: dataIntern.propertyId,
      };

      await patchIntern(userToken, internId, internPayload);
      enqueueSnackbar("Practicante actualizado correctamente", { variant: "success" });
      onSuccess && onSuccess();
    }
  } catch (error) {
    enqueueSnackbar("No se pudo actualizar el practicante: " + error, { variant: "error" });
    onError && onError();
  }
};
