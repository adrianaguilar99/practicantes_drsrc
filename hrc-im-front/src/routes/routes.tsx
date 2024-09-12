import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../pages/login/login.page';
export const RoutesConfig = () =>{
 
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={< Login />} />

            </Routes>
        </BrowserRouter>

}
