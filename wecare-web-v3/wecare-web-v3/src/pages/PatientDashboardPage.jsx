import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PatientAppointment from '../panels/PatientAppointment';
import PatientBookApp from '../panels/PatientBookApp';
import PatientRecord from '../panels/PatientRecord';

export default function PatientDashboardPage() {
  const [appointmentPanel, setAppointmentPanel] = useState(true);
  const [bookAppPanel, setBookAppPanel] = useState(false);
  const [recordPanel, setRecordPanel] = useState(false);
   const navigator = useNavigate();

  const handelPanel = (panels) => {
    switch (panels) {
      case 'appointment':
        setAppointmentPanel(true);
        setBookAppPanel(false);
        setRecordPanel(false);
        break;
      case 'bookApp':
        setAppointmentPanel(false);
        setBookAppPanel(true);
        setRecordPanel(false);
        break;
      case 'record':
        setAppointmentPanel(false);
        setBookAppPanel(false);
        setRecordPanel(true);
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
        <Navbar user="patient" onChange={handelPanel}/>
        <div className="container-a">
          <div className="header">
            <h1 className="com-name">
              WeCare
            </h1>
            <h2 id="tab-heading">
              {appointmentPanel&&"Appointments"}
              {bookAppPanel&&"Book Appointment"}
              {recordPanel&&"Old Records"}
            </h2>
          </div>
          {/* PatientAppointment
PatientBookApp
PatientRecort */}
          <div className="divider-h"></div>
          {appointmentPanel && <PatientAppointment />}
          {bookAppPanel && <PatientBookApp />}
          {recordPanel && <PatientRecord />}

        </div>
      </div>
    </>
  )
}
