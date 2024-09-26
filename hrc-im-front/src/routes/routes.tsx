import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AuditsPage from '../pages/audits/audits.page';
import Login from '../pages/login/login.page';
import Home from '../pages/home/home.page';
import Notifications from '../pages/notifications/notifications.page';
import DepartmentsPage from '../pages/departments/departments.page';
import InternInformationPage from '../pages/Interns/intern-information.page';
import ProfilePage from '../pages/profile/profile.page';
import InternRegisterPage from '../pages/Interns/intern-register.page';
import SupervisorsPage from '../pages/supervisors/supervisors.page';
import CheckInCheckOutPage from '../pages/check-in-check-out/check-in-check-out.page';
import { InternsPage } from '../pages/Interns/Interns.page';

function RoutesConfig (){
 return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={< Login />} />
        <Route path="/home" element={< Home />} />
        <Route path="/interns" element={< InternsPage />} />
        <Route path="/notifications" element={< Notifications />} />
        <Route path="/supervisors" element={< SupervisorsPage />} />
        <Route path="/departments" element={< DepartmentsPage />} />
        <Route path="/audits" element={< AuditsPage />} />
        <Route path="/profile" element={< ProfilePage />} />
        <Route path="/interns/intern-information/:userId" element={< InternInformationPage />} />
        <Route path="/interns/intern-register" element={< InternRegisterPage />} />
        <Route path="/checkin-checkout" element={< CheckInCheckOutPage />} />
    </Routes>
</BrowserRouter>

 );

}

export default RoutesConfig
