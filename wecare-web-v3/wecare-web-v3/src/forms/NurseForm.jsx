import React, { useEffect, useState } from 'react'
import { createNurse, deleteNurse, getNurseById } from '../api-client/api-model';
import AlertDialog from '../components/AlertDialog';
import { validateContact, validateEmail, validateName, validateNumber } from '../api-client/validators';

export default function NurseForm({ active, select }) {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [experience, setExperience] = useState('');
    const [education, setEducation] = useState('');
    const [diasable, setDiasable] = useState(true)

    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (active) {
            getNurseById(active).then((nurse) => {
                setName(nurse ? nurse.name : '');
                setDepartment(nurse ? nurse.department : '');
                setSalary(nurse ? nurse.salary : '');
                setContactNo(nurse ? nurse.contactNo : '');
                setExperience(nurse ? nurse.experience : '');
                setEducation(nurse ? nurse.education : '');
            })
        }
        else {
            setDiasable(false)
        }
    }, [active])

    async function handelSubmit(params) {
        if (active) {
            const data = {
                "name": name,
                "id": active,
                "education": education,
                "experience": experience,
                "contactNo": contactNo,
                "salary": salary,
                "department": department
            }
            try {
                await createNurse(data);
                const newAlert = { title: "Updated", desc: "Nurse Data Successfully Updated", type: "ok" }
                setAlertData(newAlert);
                setAlert(true);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            console.log("Update");
        }
        else {
            if (!name || !department || !experience || !education || !salary || !contactNo) {
                const newErrors = {};
                newErrors.data = "Some Fields are empty"
                if (!validateContact(contactNo)) {
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
                "education": education,
                "contactNo": contactNo,
                "experience": experience,
                "department": department,
                "salary": salary
            }
            try {
                await createNurse(data);
                const newAlert = { title: "Added", desc: "Nurse Successfully Added", type: "ok" }
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
            await deleteNurse(active);
            const newAlert = { title: "Deleted", desc: "Nurse Successfully Deleted", type: "delete" }
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
                    <h2>Nurse Details</h2>
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
                    <label htmlFor="salary" className="input-label">Salary:</label>
                    <input type="number" className="input-box" id="salary" placeholder="Enter salary" value={salary} onChange={(e) => { setSalary(e.target.value) }} disabled={diasable} />

                </div>

                <div className="input-cell">
                    <label htmlFor="type" className="input-label">Department:</label>
                    <select id="type" className="input-box" name="type" value={department} onChange={(e) => { setDepartment(e.target.value) }} disabled={diasable}>
                        <option value="">Select Department</option>
                        <option value="Pathology">Pathology</option>
                        <option value="General Consultant">General Consultant</option>
                        <option value="Radiographer">Radiographer</option>
                        <option value="Surgeon">Surgeon</option>
                    </select>
                </div>

                <div className="input-cell">
                    <label htmlFor="contact" className="input-label">Contact:</label>
                    <input type="text" className="input-box" maxLength={'10'} id="contact" placeholder="Enter Contact No." value={contactNo} onChange={(e) => {
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
                    {active && diasable && <button className="btn-g" onClick={() => { setDiasable(!diasable) }} title="1">Edit</button>}
                    {active && <button className="btn-r" onClick={handelDelete}>Delete</button>}
                    <button className="btn-r" onClick={() => { select("list"); }}>Cancel</button>
                </div>
            </div>
            {alert && <AlertDialog title={alertData.title} desc={alertData.desc} type={alertData.type} onClose={handelAlert} />}
        </>
    )
}
