import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { GoogleButtonComponent } from '../components/buttons/google_button.component';
import Login from '../pages/login/login.page';
import Home from '../pages/home/home.page';
function RoutesConfig (){
 return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={< Login />} />
        <Route path="/home" element={< Home />} />
    </Routes>
</BrowserRouter>

 );

}

export default RoutesConfig
