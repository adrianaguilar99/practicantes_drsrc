import MyAvatar from '../../assets/images/avatar-test.jpg';
import './profile.page.css';
import { Navbar } from '../../components/navbars/navbar.component';
import { ProfileData } from '../../components/profile/profile-data.component';
import { ProfileProgress } from '../../components/profile/profile-progress.component';
import { Footer } from '../../components/navbars/footer.component';

const ProfilePage = () => {

    return (
        <div className="body-page">
            <Navbar />
            <div className="container-profile">
                <section className="profile-left-container">
                <div className="profile-intern-card-img">
                        <img src={MyAvatar} alt="Avatar" />
                    </div>
                    <div className="profile-intern-card-info">
                        <h3>Leonardo Daniel Rebollo Calero</h3>
                        <p>Practicante Interno</p>
                    </div>
                </section>
                <section className="profile-right-container">
                    
                 <ProfileData />
                 <ProfileProgress />

                </section>
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage