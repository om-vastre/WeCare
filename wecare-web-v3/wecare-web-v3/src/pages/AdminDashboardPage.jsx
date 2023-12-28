import React, { useState } from 'react'
import '../css/userStyle.css'
import AdminDoctor from '../panels/AdminDoctor'
import AdminPatient from '../panels/AdminPatient';
import AdminNurse from '../panels/AdminNurse';
import {  useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';



export default function AdminDashboardPage() {

  const [doactorPanel, setDoactorPanel] = useState(false);
  const [patientPanel, setPatientPanel] = useState(false);
  const [nursePanel, setNursePanel] = useState(false);
   const navigator = useNavigate();

  const handelPanel = (panels) => {
    switch (panels) {
      case 'doctor':
        setDoactorPanel(true);
        setPatientPanel(false);
        setNursePanel(false);
        break;
      case 'patient':
        setDoactorPanel(false);
        setPatientPanel(true);
        setNursePanel(false);
        break;
      case 'nurse':
        setDoactorPanel(false);
        setPatientPanel(false);
        setNursePanel(true);
        break;
      case 'logout':
        navigator("/",{ replace: true });
        break

      default:
        break;
    }
  }

  return (
    <>
      <div className='body-container'>
        <Navbar user="admin" onChange={handelPanel}/>
        <div className="container-a">
          <div className="header">
            <h1 className="com-name">
              WeCare
            </h1>
            <h2 id="tab-heading">
              {doactorPanel&&"Manage Doctor"}
              {patientPanel&&"Manage Patient"}
              {nursePanel&&"Manage Nurses"}
            </h2>
          </div>
          <div className="divider-h"></div>
          {doactorPanel && <AdminDoctor />}
          {patientPanel && <AdminPatient />}
          {nursePanel && <AdminNurse />}

        </div>
      </div>
    </>
  )
}
