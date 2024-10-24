import { enqueueSnackbar } from "notistack";
import { postIntern } from "../../api/interns/interns.api";
import { postUser } from "../../api/users/users.api";
import { PostUser, UserPostResponse } from "../../interfaces/users.interface";
import { PostIntern } from "../../interfaces/interns/interns.interface";

interface InternData {
  userToken: string;
  dataUser: PostUser;
  dataIntern?: PostIntern;
  internType?: string;
  onSuccess?: () => void;
}

export const postInternFunction = async ({
  userToken,
  dataUser,
  dataIntern,
  internType,
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

    if (data && data.data && data.data.id) {
      enqueueSnackbar("Usuario agregado correctamente", {
        variant: "success",
      });
      const UserId = data.data.id;
      if (dataIntern) {
        if(internType === "Externo") {
            await postIntern(userToken, {
                bloodType: dataIntern.bloodType,
                phone: dataIntern.phone,
                address: dataIntern.address,
                schoolEnrollment: dataIntern.schoolEnrollment,
                internshipStart: dataIntern.internshipStart,
                internshipEnd: dataIntern.internshipEnd,
                status: "ACTIVE",
                careerId: dataIntern.careerId,
                internshipDepartmentId: dataIntern.internshipDepartmentId,
                institutionId: dataIntern.institutionId,
                propertyId: dataIntern.propertyId,
                userId: UserId,
              });
        }else{
            await postIntern(userToken, {
                bloodType: dataIntern.bloodType,
                phone: dataIntern.phone,
                address: dataIntern.address,
                internshipStart: dataIntern.internshipStart,
                internshipEnd: dataIntern.internshipEnd,
                status: "ACTIVE",
                departmentId: dataIntern.departmentId,
                internshipDepartmentId: dataIntern.internshipDepartmentId,
                propertyId: dataIntern.propertyId,
                userId: UserId,
              });
        }
        
      }

      // Llama a onSuccess si se proporciona
      onSuccess && onSuccess();
    }
  } catch (error) {
    enqueueSnackbar("Algo salió mal: " + error, { variant: "error" });
  }
};
