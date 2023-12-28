import React, { useEffect, useState } from 'react'
import { logoutUser } from '../api-client/api-model';

export default function Navbar({ onChange, user }) {
    const [active, setActive] = useState('doctor')
    useEffect(() => {
        if (user === 'patient') {
            setActive('appointment');
        }
    }, []);
    useEffect(() => {
        onChange(active)
    }, [active])


    async function handelLogout(params) {
        await logoutUser();
        setActive('logout')
    }
    return (
        <> {user === "admin" && <div className="side-navbar">
            <div className="logo">
                <img src="/img/logo.svg" alt="" />
            </div>
            <div className="menu-list">
                <ul>
                    <li className={`menu-option ${active === 'doctor' ? 'active-menu' : ''}`} onClick={() => { setActive('doctor') }}>
                        <img src="/img/doctor-icon.svg" alt="" />
                    </li>
                    <li className={`menu-option ${active === 'patient' ? 'active-menu' : ''}`} onClick={() => { setActive('patient') }}>
                        <img src="/img/patient-icon.svg" alt="/" />
                    </li>
                    <li className={`menu-option ${active === 'nurse' ? 'active-menu' : ''}`} onClick={() => { setActive('nurse') }}>
                        <img src="/img/nurses-icon.svg" alt="" />
                    </li>
                    <li className={`menu-option ${active === 'logout' ? 'active-menu' : ''}`} onClick={handelLogout}>
                        <img src="/img/logout.svg" alt="" />
                    </li>
                </ul>
            </div>
        </div>}
            {user === "patient" && <div className="side-navbar">
                <div className="logo">
                    <img src="/img/logo.svg" alt="" />
                </div>
                <div className="menu-list">
                    <ul>
                        <li className={`menu-option ${active === 'appointment' ? 'active-menu' : ''}`} onClick={() => { setActive('appointment') }}>
                            <img src="/img/calender-icon.svg" alt="" />
                        </li>
                        <li className={`menu-option ${active === 'bookApp' ? 'active-menu' : ''}`} onClick={() => { setActive('bookApp') }}>
                            <img src="/img/calender-add-icon.svg" alt="/" />
                        </li>
                        <li className={`menu-option ${active === 'record' ? 'active-menu' : ''}`} onClick={() => { setActive('record') }}>
                            <img src="/img/calender-history-icon.svg" alt="" />
                        </li>
                        <li className={`menu-option ${active === 'logout' ? 'active-menu' : ''}`} onClick={handelLogout}>
                            <img src="/img/logout.svg" alt="" />
                        </li>
                    </ul>
                </div>
            </div>}
            {user === "doctor" && <div className="side-navbar">
                <div className="logo">
                    <img src="/img/logo.svg" alt="" />
                </div>
                <div className="menu-list">
                    <ul>
                        <li className={`menu-option ${active === 'logout' ? 'active-menu' : ''}`} onClick={handelLogout}>
                            <img src="/img/logout.svg" alt="" />
                        </li>
                    </ul>
                </div>
            </div>}
        </>
    )
}
