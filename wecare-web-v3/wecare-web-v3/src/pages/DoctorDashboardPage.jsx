import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DoctorDoctor from '../panels/DoctorDoctor';
import { getDoctorById } from '../api-client/api-model';

export default function DoctorDashboardPage() {

  const navigator = useNavigate();
  const { doctorId } = useParams();
  const [doctorObj, setDoctorObj] = useState({})

  const handelPanel = (panels) => {
    switch (panels) {

      case 'logout':
        navigator("/", { replace: true });
        break

      default:
        break;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const doc = await getDoctorById(doctorId);
      setDoctorObj(doc);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>
      <div className='body-container'>
        <Navbar user='doctor' onChange={handelPanel} />
        <div className="container-a">
          <div className="header">
            <h1 className="com-name">
              WeCare
            </h1>
            <h2 id="tab-heading">
              Manage Appointments
            </h2>
          </div>
          <div className="divider-h"></div>
          {/* Pathology, General Consultant, Radiographer, Surgery */}
          <DoctorDoctor doctorId={doctorId} doctorType={doctorObj.type} doctorName={doctorObj.name} />

        </div>
      </div>
    </>
  )
}
