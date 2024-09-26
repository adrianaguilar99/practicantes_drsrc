import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.page.css';
import { Navbar } from '../../components/navbars/navbar.component';
const ProfilePage = () => {

    return (
        <div className="body-page">
            <Navbar />
            Profile Page
        </div>
    );
}

export default ProfilePage