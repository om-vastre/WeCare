import React, { useEffect, useState } from 'react'
import { createDoctor, deleteDoctor } from '../api-client/api-model';
import AlertDialog from '../components/AlertDialog';
import { validateContact, validateEmail, validateName, validateNumber } from '../api-client/validators';

export default function DoctorForm({ doctor, select }) {

    const [name, setName] = useState(doctor ? doctor.name : '');
    const [username, setUsername] = useState(doctor ? doctor.username : '');
    const [password, setPassword] = useState(doctor ? doctor.password : '');
    const [type, setType] = useState(doctor ? doctor.type : '');
    const [contactNo, setContactNo] = useState(doctor ? doctor.contactNo : '');
    const [experience, setExperience] = useState(doctor ? doctor.experience : '');
    const [education, setEducation] = useState(doctor ? doctor.education : '');
    const [diasable, setDiasable] = useState(true);
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!doctor) {
            setDiasable(false)
        }
    }, [doctor]);


    function togglePasswordVisibility() {
        const passwordInput = document.getElementById("password");
        const img = document.getElementById("pass-img");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            img.src = "/img/hide-private-hidden-icon (1).svg";
        } else {
            passwordInput.type = "password";
            img.src = "/img/eye-look-icon.svg";

        }
    }

    async function handelSubmit(params) {
        if (doctor) {
            const data = {
                "id": doctor.id,
                "name": name,
                "type": type,
                "experience": experience,
                "password": password,
                "contactNo": contactNo,
                "username": username,
                "education": education,
                "appointmentList": []
            }
            try {
                await createDoctor(data);
                const newAlert = { title: "Updated", desc: "Doctor Successfully Updated", type: "ok" }
                setAlertData(newAlert);
                setAlert(true);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            console.log("Update");
        }
        else {
            if (!name || !type || !experience || !education || !password || !contactNo || !username) {
                const newErrors = {};
                newErrors.data = "Some Fields are empty"
                if(!validateEmail(username)){
                    newErrors.data = "Invalid username username shoud in email formate"
                }
                if(!validateContact(contactNo)){
                    newErrors.data = "Invalid Number Enter 10 digit No."
                }
                if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                    return
                }
            }
            const data = {
                "id": 0,
                "name": name,
                "type": type,
                "experience": experience,
                "password": password,
                "contactNo": contactNo,
                "username": username,
                "education": education,
                "appointmentList": []
            }
            try {
                await createDoctor(data);
                const newAlert = { title: "Added", desc: "New Doctor Successfully Added", type: "ok" }
                setAlertData(newAlert);
                setAlert(true);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            console.log("Add New User");
        }
    }

    async function handelDelete() {
        try {
            await deleteDoctor(doctor.id);
            const newAlert = { title: "Deleted", desc: "Doctor Successfully Deleted", type: "delete" }
            setAlertData(newAlert);
            setAlert(true);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        console.log("Deleted");
    }

    function handelAlert(params) {
        setAlert(false);
        select("list");
    }


    return (
        <>
            <div className="header-menu">
                <div>
                    <img src="/img/line-angle-left-icon.svg" className="img" alt="" onClick={() => { select("list") }} />
                </div>
                <div>
                    <h2>Doctor Details</h2>
                </div>

            </div>
            <div className="form-field-container">
                <div className="input-cell">
                    <label htmlFor="name" className="input-label">Name:</label>
                    <input type="text" className="input-box" id="name" placeholder="Enter name" value={name} onChange={(e) => {
                        const newName = e.target.value;
                        if (validateName(newName)) {
                            setName(newName);
                        } 
                    }} disabled={diasable} />
                </div>
                <div className="input-cell">
                    <label htmlFor="username" className="input-label">UserName:</label>
                    <input type="text" className="input-box" id="username" placeholder="Enter username" value={username} onChange={(e) => { setUsername(e.target.value) }} disabled={diasable} />
                </div>
                <div className="input-cell">
                    <label htmlFor="password" className="input-label">Password:</label>
                    <div className="pass-group">
                        <input type="password" className="input-box" id="password" placeholder="Enter a password" value={password} onChange={(e) => { setPassword(e.target.value) }} disabled={diasable} />
                        <div onClick={() => togglePasswordVisibility()}>
                            <img id="pass-img" src="/img/eye-look-icon.svg"
                                alt="" />
                        </div>
                    </div>
                </div>

                <div className="input-cell">
                    <label htmlFor="type" className="input-label">Type:</label>
                    <select id="type" className="input-box" name="type" value={type} onChange={(e) => { setType(e.target.value) }} disabled={diasable}>
                        <option value="">Select type</option>
                        <option value="Pathology">Pathology</option>
                        <option value="General Consultant">General Consultant</option>
                        <option value="Radiographer">Radiographer</option>
                        <option value="Surgeon">Surgeon</option>
                    </select>
                </div>

                <div className="input-cell">
                    <label htmlFor="contact" className="input-label">Contact:</label>
                    <input type="tel" pattern="[0-9]{5}-[0-9]{5}" className="input-box" maxLength='10' id="contact" placeholder="Enter Contact No." value={contactNo} onChange={(e) => { 
                        if (validateNumber(e.target.value)) {
                            setContactNo(e.target.value) 
                          }
                        }} disabled={diasable} />
                </div>
                <div className="input-cell">
                    <label htmlFor="education" className="input-label">Education:</label>
                    <input type="text" className="input-box" id="education" placeholder="Enter Education" value={education} onChange={(e) => { setEducation(e.target.value) }} disabled={diasable} />
                </div>
                <div className="input-cell">
                    <label htmlFor="experience" className="input-label">Experience (Year):</label>
                    <input type="number" className="input-box" id="experience" placeholder="Enter Experience" value={experience} onChange={(e) => { setExperience(e.target.value) }} disabled={diasable} />
                </div>
                {errors.data && <div className="error">{errors.data}</div>}
                <div className="btn-group">
                    {!diasable && <button className="btn-g" onClick={handelSubmit}>Submit</button>}
                    {doctor && diasable && <button className="btn-g" onClick={() => { setDiasable(!diasable) }} title="1">Edit</button>}
                    {doctor && <button className="btn-r" onClick={handelDelete}>Delete</button>}
                    <button className="btn-r" onClick={() => { select("list"); }}>Cancel</button>
                </div>
            </div>
            {alert && <AlertDialog title={alertData.title} desc={alertData.desc} type={alertData.type} onClose={handelAlert} />}
        </>
    )
}