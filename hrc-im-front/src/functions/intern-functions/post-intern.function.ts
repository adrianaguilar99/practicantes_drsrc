import { enqueueSnackbar } from "notistack";
import { postIntern } from "../../api/interns/interns.api";
import { postUser } from "../../api/users/users.api";
import { PostUser, UserPostResponse } from "../../interfaces/users.interface";
import { PostIntern } from "../../interfaces/interns/interns.interface";
import { DataEmergencyContact } from "../../interfaces/interns/emergency-contacts/emergency-contacts.interface";
import { postEmergencyContact } from "../../api/interns/emergency-contacts/emergency-contacts.api";

interface InternData {
  userToken: string;
  dataUser: PostUser;
  dataIntern?: PostIntern;
  contacts?: DataEmergencyContact[];
  internType?: string;
  onSuccess?: () => void;
}

const postEmergencyContacts = async (
  userToken: string,
  internId: string,
  contacts: DataEmergencyContact[]
): Promise<void> => {
  try {
    for (const contact of contacts) {
      try {
        await postEmergencyContact(userToken, {
          name: contact.name,
          phone: contact.phone,
          relationship: contact.relationship,
          positionContact: contact.positionContact,
          internId : internId
        });
        
      } catch (error) {
        enqueueSnackbar("Error al agregar contacto de emergencia: " + error, {
          variant: "error",
        });
      }
    }
    enqueueSnackbar("Practicante agregado correctamente", { variant: "success" });
  } catch (error) {
    enqueueSnackbar("Error al agregar los contactos de emergencia: " + error, {
      variant: "error",
    });
  }

  
};

export const postInternFunction = async ({
  userToken,
  dataUser,
  dataIntern,
  internType,
  contacts = [],
  onSuccess,
}: InternData): Promise<void> => {
  try {
    const data: UserPostResponse = await postUser(userToken, {
      firstName: dataUser.firstName,
      lastName: dataUser.lastName,
      email: dataUser.email,
      password: dataUser.password,
      userRole: "INTERN",
    });

    if (data?.data?.id) {
      const userId = data.data.id;

      if (dataIntern) {
        const internPayload : PostIntern= {
          bloodType: dataIntern.bloodType,
          phone: dataIntern.phone,
          address: dataIntern.address,
          internshipStart: dataIntern.internshipStart,
          internshipEnd: dataIntern.internshipEnd,
          entryTime: dataIntern.entryTime,
          exitTime: dataIntern.exitTime,
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
              }),
          propertyId: dataIntern.propertyId,
        };

        const intern = await postIntern(userToken, internPayload);
        console.log(contacts);
        if (intern?.data?.id) {
          await postEmergencyContacts(userToken, intern.data.id, contacts);
        }
      }

      onSuccess && onSuccess();
    }
  } catch (error) {
    enqueueSnackbar("Algo salió mal: " + error, { variant: "error" });
  }
};
