import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuditsPage from '../pages/audits/audits.page';
import NotFoundPage from '../pages/login/404.page';
import Login from '../pages/login/login.page';
import Home from '../pages/home/home.page';
import Notifications from '../pages/notifications/notifications.page';
import DepartmentsPage from '../pages/departments/departments.page';
import InternInformationPage from '../pages/Interns/intern-information.page';
import ProfilePage from '../pages/profile/profile.page';
import InternRegisterPage from '../pages/Interns/intern-register.page';
import SupervisorsPage from '../pages/supervisors/supervisors.page';
import CheckInCheckOutPage from '../pages/check-in-check-out/check-in-check-out.page';
import InternsCareersPage from '../pages/Interns/interns-careers.page';
import InternsInstitutionsPage from '../pages/Interns/interns-institutions.page';
import LoadingPage from '../pages/login/loading.page';
import { InternsPage } from '../pages/Interns/Interns.page';
import ProtectedRoute from '../components/utils/protect-routes.component';
import { useState } from 'react';

function RoutesConfig() {
  const [mode, setMode] = useState('dev');
  return (
    <BrowserRouter>
      <Routes>
        {mode != 'dev' ? (
          <>
         <Route path="/not-found-page" element={<NotFoundPage />} />
         <Route path="*" element={<NotFoundPage />} />
         <Route path="/" element={<Login />} />
         <Route
           path="/home"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR', 'SUPERVISOR', 'SUPERVISOR_RH', 'INTERN']}>
               <Home />
             </ProtectedRoute>
           }
         />
         <Route
           path="/interns"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR', 'SUPERVISOR', 'SUPERVISOR_RH']}>
               <InternsPage />
             </ProtectedRoute>
           }
         />
         <Route
           path="/notifications"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR', 'SUPERVISOR', 'SUPERVISOR_RH', 'INTERN']}>
               <Notifications />
             </ProtectedRoute>
           }
         />
         <Route
           path="/supervisors"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR']}>
               <SupervisorsPage />
             </ProtectedRoute>
           }
         />
         <Route
           path="/departments"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR']}>
               <DepartmentsPage />
             </ProtectedRoute>
           }
         />
         <Route
           path="/audits"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR']}>
               <AuditsPage />
             </ProtectedRoute>
           }
         />
         <Route
           path="/profile"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR', 'SUPERVISOR', 'SUPERVISOR_RH', 'INTERN']}>
               <ProfilePage />
             </ProtectedRoute>
           }
         />
         <Route
           path="/interns/intern-information/:userId"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR', 'SUPERVISOR', 'SUPERVISOR_RH']}>
               <InternInformationPage />
             </ProtectedRoute>
           }
         />
         <Route
           path="/interns/intern-register"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR', 'SUPERVISOR', 'SUPERVISOR_RH']}>
               <InternRegisterPage />
             </ProtectedRoute>
           }
         />
         <Route
           path="/checkin-checkout"
           element={
             <ProtectedRoute allowedRoles={['SUPERVISOR', 'SUPERVISOR_RH']}>
               <CheckInCheckOutPage />
             </ProtectedRoute>
           }
         />
         <Route
           path="/interns/interns-careers"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR','SUPERVISOR_RH']}>
               <InternsCareersPage />
             </ProtectedRoute>
           }
         />
         <Route
           path="/interns/interns-institutions"
           element={
             <ProtectedRoute allowedRoles={['ADMINISTRATOR','SUPERVISOR_RH']}>
               <InternsInstitutionsPage />
             </ProtectedRoute>
           }
         />
           <Route path="/loading-page-login" element={<LoadingPage type={'login'} />} />
           <Route path="/loading-page" element={<LoadingPage type={''} />} />
        </>
        
           ) :(
            <>
         <Route path="/loading-page-login" element={<LoadingPage type={'login'} />} />
         <Route path="/loading-page" element={<LoadingPage type={''} />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Login />} />
          <Route
            path="/home"
           
  
            element={<Home />}
          />
          <Route
            path="/interns"
            element={<InternsPage />}
          />
          <Route
            path="/notifications"
           element={<Notifications />}
          />
          <Route
            path="/supervisors"
            element={<SupervisorsPage/>}
          />
          <Route
            path="/departments"
            element={<DepartmentsPage />}
          />
          <Route
            path="/audits"
            element={<AuditsPage />}
          />
          <Route
            path="/profile"
            element={<ProfilePage />}
          />
          <Route
            path="/interns/intern-information/:userId"
            element={<InternInformationPage />}
          />
          <Route
            path="/interns/intern-register"
            element={<InternRegisterPage />}
          />
          <Route
            path="/checkin-checkout"
           element={<CheckInCheckOutPage />}
            
          />
          <Route
            path="/interns/interns-careers"
            element={<InternsCareersPage />}
          />
          <Route
            path="/interns/interns-institutions"
            element={<InternsInstitutionsPage />}
          />
          </>
          
        )};
       
     


     
         </Routes>
    </BrowserRouter>
  );
}

export default RoutesConfig;
