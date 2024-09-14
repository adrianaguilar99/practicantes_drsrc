import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../pages/login/login.page';
import Home from '../pages/home/home.page';
import { InternsPage } from '../pages/Interns/Interns.page';
function RoutesConfig (){
 return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={< Login />} />
        <Route path="/home" element={< Home />} />
        <Route path="/interns" element={< InternsPage />} />
    </Routes>
</BrowserRouter>

 );

}

export default RoutesConfig
