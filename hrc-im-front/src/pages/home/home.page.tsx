import { Navbar } from "../../components/navbars/navbar.component"
import './home.page.css'

const HomePage = () => {
    return (
        <>
        <Navbar />
        <div style={{ display: 'flex' }}>
           
            
            <div className="lateral-menu">
            </div>
            <div className="body-page">
              <h1>Home</h1>
            </div>
        </div>
        </>
        
    )
}

export default HomePage