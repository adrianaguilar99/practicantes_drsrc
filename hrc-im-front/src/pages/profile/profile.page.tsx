import MyAvatar from "../../assets/images/avatar-test.jpg";
import "./profile.page.css";
import { Navbar } from "../../components/navbars/navbar.component";
import { ProfileData } from "../../components/profile/profile-data.component";
import { ProfileProgress } from "../../components/profile/profile-progress.component";
import { Footer } from "../../components/navbars/footer.component";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ca } from "date-fns/locale";
import { Avatar } from "@mui/material";
import { DataIntern } from "../../interfaces/interns/interns.interface";

const InternInfo = {
  message: "Data fetched successfully.",
  data: {
    id: "aceed6a0-73da-4933-b220-94a7420497ee",
    internCode: "733802",
    bloodType: "O+",
    phone: "9988774455",
    address:
      "Blvd. Kukulcan Km 14, Zona Hotelera, 77500 Cancun, Quintana Roo · 15 km",
    schoolEnrollment: "202100142",
    internshipStart: "2024-09-01",
    internshipEnd: "2025-03-23",
    status: "ACTIVE",
    career: {
      id: "23e9c9ca-13d4-40d8-8d92-85ec693e5def",
      name: "DASD",
    },
    department: null,
    internshipDepartment: {
      id: "87eca3e6-dddf-459f-90e8-fe3fa1434293",
      name: "TECONOLOGIAS DE LA INFORMACION",
    },
    institution: {
      id: "fdcd33b1-3269-414d-83a6-3e1d9ce18d0c",
      name: "UNIVERSIDAD POLITECNICA DE QUINTANA ROO",
      phone: "9983847682",
    },
    property: {
      id: "5d451476-14cd-4583-bb3c-1d5e076a1b6e",
      name: "HARD ROCK HOTEL CANCUN",
    },
    user: {
      id: "f5d90cb0-f66b-43c8-9ea2-ded85c5ad9e7",
      firstName: "Leonardo",
      lastName: "Rebollo",
      email: "202100167@upqroo.edu.mx",
      userRole: "INTERN",
      createdAt: "2024-10-19T00:48:07.649Z",
      isActive: true,
    },
  },
};

const ProfilePage = () => {
  const [option, setOption] = useState(0);
  const [dataInfo, setDataInfo] = useState<DataIntern | null>(null); 
  const [internType, setInternType] = useState("");

  useEffect(() => {
    setDataInfo(InternInfo.data as unknown as DataIntern); 
    setInternType(dataInfo?.department === null ? "Interno" : "Externo");
  }, []);

  return (
    <div className="body-page">
      <Navbar />
      <div className="container-profile">
        <section className="profile-left-container">
        <Avatar alt="Remy Sharp" sx={{ width:  200, height: 200 }} src="https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGVudCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" />
          <div className="profile-intern-card-img">
        
           
          </div>
          <div className="profile-intern-card-info">
            <h3>{dataInfo ? `${dataInfo.user.firstName} ${dataInfo.user.lastName}` : "Cargando..."}</h3>
            {internType === "Externo" ? (
              <p>Practicante Externo</p>
            ) : (
              <p>Practicante Interno</p>
            )}
          </div>
          <div className="profile-intern-card-options">
            <p
              className={`intern-type ${option === 0 ? "active" : "inactive"}`}
              onClick={() => setOption(0)}
            >
              Información
            </p>
            <p
              className={`intern-type ${option === 1 ? "active" : "inactive"}`}
              onClick={() => setOption(1)}
            >
              Mi progreso
            </p>
          </div>
        </section>
        <section className="profile-right-container">
          <TransitionGroup>
            <CSSTransition key={option} timeout={300} classNames="fade">
              {option === 0 ? (
                dataInfo ? <ProfileData data={dataInfo} type={internType} /> : <p>Cargando...</p>
              ) : (
                <ProfileProgress />
              )}
            </CSSTransition>
          </TransitionGroup>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
