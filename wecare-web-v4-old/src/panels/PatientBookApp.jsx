import React, { useEffect, useState } from 'react'
import { createAppointment, getDoctorList, getPatientById } from '../api-client/api-model';
import AlertDialog from '../components/AlertDialog';
import { useParams } from 'react-router-dom';

export default function PatientBookApp() {
  const [name, setName] = useState('');
  const [time, setBloodGroup] = useState('');
  const [type, setType] = useState('');
  const [doctor, setDoctor] = useState('')
  const [doctorList, setDoctorList] = useState();
  const [date, setDate] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [errors, setErrors] = useState({});
  const { patientId } = useParams();
  const currentDate = new Date()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const doc = await getDoctorList();
      const dar = await getPatientById(patientId);
      setName(dar.name)
      setDoctorList(doc);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  async function handelSubmit(params) {
    if (!name || !type || !doctor || !date || !time) {
      const newErrors = {};
      newErrors.data = "Some Fields are empty"
      const newTime = time;
      const currentTime = new Date();
      const selectedTime = new Date(currentTime.toDateString() + ' ' + newTime);

      const minimumAllowedTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // Adding 1 hour
      const formattedCurrentDate = currentDate.toISOString().split('T')[0];

      if (date === formattedCurrentDate) {
        if (selectedTime <= minimumAllowedTime) {
          newErrors.data = 'Appointment time should be at least 1 hour from now.';
        }
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return
      }
    }
    const data = {
      "no": 0,
      "doctorId": doctor,
      "patientId": patientId,
      "prescriptionId": 0,
      "type": type,
      "date": date,
      "time": time + ':00',
      "status": "Scheduled"
    }
    try {
      await createAppointment(data);
      const newAlert = { title: "Added", desc: "New Appointment Successfully Added", type: "ok" }
      setAlertData(newAlert);
      setAlert(true);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    console.log("Add New User");
  }

  function handelAlert(params) {
    setAlert(false);
  }

  const filteredDoctor = doctorList ? doctorList.filter((doc) => {
    return (
      (doc.type === type)
    );
  }) : [];



  return (
    <>
      <div className="form-field-container">
        <div className="input-cell">
          <label htmlFor="name" className="input-label">Name :</label>
          <input type="text" className="input-box" id="name" placeholder="Enter Name" value={name} onChange={(e) => { setName(e.target.value) }} disabled />
        </div>

        <div className="input-cell">
          <label htmlFor="type" className="input-label">Type:</label>
          <select id="type" className="input-box" name="type" placeholder='Select Type' value={type} onChange={(e) => { setType(e.target.value) }}>
            <option value="">Select Type </option>
            <option value="Pathology">Pathology</option>
            <option value="General Consultant">General Consultant</option>
            <option value="Radiographer">Radiographer</option>
            <option value="Surgeon">Surgeon</option>
          </select>
        </div>

        <div className="input-cell">
          <label htmlFor="type" className="input-label">Doctor Name:</label>
          <select id="type" className="input-box" name="type" placeholder='Select Type' value={doctor} onChange={(e) => { setDoctor(e.target.value) }}>
            <option value="">Select Doctor </option>

            {filteredDoctor && filteredDoctor.map((doc) => {
              return <Options value={doc} />
            })}


          </select>
        </div>

        <div className="input-cell">
          <label htmlFor="date" className="input-label">Choose Date:</label>
          <input type="date" className="input-box" id="date" min={`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`} value={date} onChange={(e) => { setDate(e.target.value) }} />
        </div>
        <div className="input-cell">
          <label htmlFor="time" className="input-label">Choose Time :</label>
          <input type="time" className="input-box" id="time" placeholder="time" value={time} onChange={(e) => { setBloodGroup(e.target.value) }} />

        </div>
        {errors.data && <div className="error">{errors.data}</div>}

        <div className="btn-group">
          <button className="btn-g" onClick={handelSubmit}>Submit</button>
        </div>
      </div>
      {alert && <AlertDialog title={alertData.title} desc={alertData.desc} type={alertData.type} onClose={handelAlert} />}

    </>
  )
}


function Options(params) {
  return (
    <option value={params.value.id}>{params.value.name}</option>
  )
}