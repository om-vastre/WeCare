import React from 'react'
import '../css/style.css'
import { Link, useNavigate } from 'react-router-dom'


export default function HomePage() {
    const navigator = useNavigate()
    const handelClick = (userType) => {
        switch (userType) {
            case 'admin':
                navigator('login/admin');
                break;
            case 'doctor':
                navigator('login/doctor');
                break;
            case 'patient':
                navigator('login/patient');
                break;

            default:
                break;
        }
    }

    return (
        <div className='body-container'><div className="side-navbar">
            <div className="logo">
                <img src="img/logo.svg" alt="" />
            </div>
        </div>
            <div className="container">
                <div className="contex-container">
                    <div className="info f">
                        <h1 className="com-name">WeCare</h1>
                        <p>Choose your title to Login</p>
                        <div className="footer-container">
                            <h2><Link to="/about">About Us</Link></h2>
                            <h2><Link to="/contact">Contact Us</Link></h2>
                        </div>
                    </div>
                    <div className="divider-v"></div>
                    <div className="options-container" >
                        <div className="option-btn" onClick={() => { handelClick('admin') }}>
                            <h1>Admin</h1>
                            <h2>Manage Accounts</h2>
                            <img src="img/line-angle-right-icon.svg" alt="" className="img" />
                        </div>
                        <div className="option-btn" onClick={() => { handelClick('doctor') }}>
                            <h1>Doctor</h1>
                            <h2>Check Appointments</h2>
                            <img src="img/line-angle-right-icon.svg" alt="" className="img" />
                        </div>
                        <div className="option-btn" onClick={() => { handelClick('patient') }}>
                            <h1>Patient</h1>
                            <h2>Book Appointment</h2>
                            <img src="img/line-angle-right-icon.svg" alt="" className="img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
