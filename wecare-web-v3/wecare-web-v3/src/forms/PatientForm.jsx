import React, { useEffect, useState } from 'react'
import { createPatient, deletePatient, getPatientById } from '../api-client/api-model';
import AlertDialog from '../components/AlertDialog';
import { validateContact, validateEmail, validateName, validateNumber, validatePassword } from '../api-client/validators';

export default function PatientForm({ active, select, dataObject, pData }) {
    const [name, setName] = useState(dataObject ? dataObject.name : '');
    const [bloodGroup, setBloodGroup] = useState(dataObject ? dataObject.bloodGroup : '');
    const [DOB, setDOB] = useState(dataObject ? dataObject.DOB : '');
    const [weight, setWeight] = useState(dataObject ? dataObject.weight : '');
    const [height, setHeight] = useState(dataObject ? dataObject.height : '');
    const [contact, setContact] = useState(dataObject ? dataObject.contact : '');
    const [email, setEmail] = useState(dataObject ? dataObject.email : '');
    const [password, setPassword] = useState(dataObject ? dataObject.password : '');
    const [diasable, setDiasable] = useState(true);
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({});
    const [errors, setErrors] = useState({});
    const currentDate = new Date()


    useEffect(() => {
        if (active) {
            pData && getPatientById(pData.pid).then((dataObject) => {
                if (dataObject) {
                    setName(dataObject.name);
                    setBloodGroup(dataObject.bloodGroup);
                    setDOB(dataObject.dob);
                    setWeight(dataObject.weight);
                    setHeight(dataObject.height);
                    setContact(dataObject.contact);
                    setEmail(dataObject.email);
                    setPassword(dataObject.password);
                }
            })
            !pData && getPatientById(active).then((dataObject) => {
                if (dataObject) {
                    setName(dataObject.name);
                    setBloodGroup(dataObject.bloodGroup);
                    setDOB(dataObject.dob);
                    setWeight(dataObject.weight);
                    setHeight(dataObject.height);
                    setContact(dataObject.contact);
                    setEmail(dataObject.email);
                    setPassword(dataObject.password);
                }
            })
        }
        else {
            setDiasable(false)
        }

    }, [active])


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
        if (active) {
            const data = {
                "id": pData?pData.pid:active,
                "name": name,
                "password": password,
                "appointmentsList": [],
                "contact": contact,
                "bloodGroup": bloodGroup,
                "email": email,
                "height": height,
                "dob": DOB,
                "weight": weight
            }
            try {
                await createPatient(data);
                const newAlert = { title: "Updated", desc: "Patient Successfully Updated", type: "ok" }
                setAlertData(newAlert);
                setAlert(true);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            console.log("Update");
        }
        else {
            if (!name || !password || !contact || !bloodGroup | !email || !height || !DOB || !weight) {
                const newErrors = {};
                newErrors.data = "Some Fields are empty"
                if(!validateEmail(email)){
                    newErrors.data = "Invalid username username shoud in email formate"
                }
                if(!validatePassword(password)){
                    newErrors.data = "Password should be minimum 6 digit"
                }
                if(!validateContact(contact)){
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
                "password": password,
                "appointmentsList": [],
                "contact": contact,
                "bloodGroup": bloodGroup,
                "email": email,
                "height": height,
                "dob": DOB,
                "weight": weight
            }
            try {
                await createPatient(data);
                const newAlert = { title: "Added", desc: "New Patient Successfully Added", type: "ok" }
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
            await deletePatient(active);
            const newAlert = { title: "Deleted", desc: "Patient Successfully Deleted", type: "delete" }
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
                    <img src="/img/line-angle-left-icon.svg" className="img" alt="" onClick={() => { select("details") }} />
                </div>
                <div>
                    <h2>Paitient Details</h2>
                </div>

            </div>
            <div className="form-field-container">
                <div className="input-cell">
                    <label htmlFor="name" className="input-label">Name:</label>
                    <input type="text" className="input-box" id="name" placeholder="Enter name" value={name} onChange={(e) => {const newName = e.target.value;
                        if (validateName(newName)) {
                            setName(newName);
                        }  }} disabled={diasable} />
                </div>
                <div className="input-cell">
                    <label htmlFor="blood-g" className="input-label">Blood Group :</label>
                    <input type="text" className="input-box" id="blood-g" placeholder="Enter Blood Group" value={bloodGroup} onChange={(e) => { 
                        const newName = e.target.value;
                        if (/^[^0-9]+$/.test(newName) || newName ==='') {
                            setBloodGroup(newName);
                        } 
                     }} disabled={diasable} />

                </div>
                <div className="input-cell">
                    <label htmlFor="dob" className="input-label">Birth Date :</label>
                    <input type="date" className="input-box" id="dob" placeholder="Enter Birth Date" max={`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`} value={DOB.toString()} onChange={(e) => { setDOB(e.target.value) }} disabled={diasable} />
                </div>

                <div className="input-cell">
                    <label htmlFor="weight" className="input-label">Weight (Kg):</label>
                    <input type="number" className="input-box" id="weight" placeholder="Enter Weight" value={weight} onChange={(e) => { setWeight(e.target.value) }} disabled={diasable} />
                </div>
                <div className="input-cell">
                    <label htmlFor="height" className="input-label">Height (In):</label>
                    <input type="number" className="input-box" id="height" placeholder="Enter Height" value={height} onChange={(e) => { setHeight(e.target.value) }} disabled={diasable} />
                </div>
                <div className="input-cell">
                    <label htmlFor="contact" className="input-label">Contact :</label>
                    <input type="text" className="input-box" maxLength={'10'} id="contact" placeholder="Enter Contact" value={contact} onChange={(e) => { if (validateNumber(e.target.value)) {
                            setContact(e.target.value) 
                          } }} disabled={diasable} />
                </div>
                <div className="input-cell">
                    <label htmlFor="email" className="input-label">Email :</label>
                    <input type="text" className="input-box" id="email" placeholder="Enter Email" value={email} onChange={(e) => { setEmail(e.target.value) }} disabled={diasable} />
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
                {errors.data && <div className="error">{errors.data}</div>}
                <div className="btn-group">
                    {!diasable && <button className="btn-g" onClick={handelSubmit}>Submit</button>}
                    {active && diasable && <button className="btn-g" onClick={() => { setDiasable(!diasable) }} title="1">Edit</button>}
                    {active && <button className="btn-r" onClick={handelDelete}>Delete</button>}
                    <button className="btn-r" onClick={() => { select("details"); }}>Cancel</button>
                </div>
            </div>
            {alert && <AlertDialog title={alertData.title} desc={alertData.desc} type={alertData.type} onClose={handelAlert} />}
        </>
    )
}
