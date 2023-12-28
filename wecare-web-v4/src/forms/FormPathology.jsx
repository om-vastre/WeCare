import React, { useState } from 'react'
import AlertDialog from '../components/AlertDialog';
import { addPrescription } from '../api-client/api-model';


export default function FormPathology({ dataItem, select, pData }) {
    const date = new Date().toISOString().split('T')[0];
    const [test, setTest] = useState(dataItem.test || '');
    const [testResult, setTestResult] = useState(dataItem.testResult || '');
    const [prescription, setPrescription] = useState(dataItem.prescription || '');
    const [billAmount, setBillAmount] = useState(dataItem.billAmount || '');
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({});
    const [errors, setErrors] = useState({});

    async function handelSubmit(params) {

        if (!test || !testResult || !billAmount) {
            const newErrors = {};
            newErrors.data = "Some Fields are empty"
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return
            }
        }

        try {
            const formData = new FormData();
            formData.append("img", "");
            formData.append("id", 0);
            formData.append("appointment", pData.aid);
            formData.append("prescription", prescription);
            formData.append("bodyPartName", '');
            formData.append("test", test);
            formData.append("testResult", testResult);
            formData.append("billAmount", billAmount);
            formData.append("surgeryTime", '');
            await addPrescription(formData).then((nj) => {
                if (nj) {
                    const newAlert = { title: "Added", desc: "New Prescription Successfully Added", type: "ok" }
                    setAlertData(newAlert);
                    setAlert(true);
                }
            })

        } catch (error) {
            console.error('Error fetching products:', error);
        }
        console.log("Add New User");

    }

    function handelAlert(params) {
        setAlert(false);
        select("list");
    }

    return (
        <> <div className="header-menu">
            <div>
                <img src="/img/line-angle-left-icon.svg" className="img" alt="" onClick={() => { select("details") }} />
            </div>
            <div>
                <h2>Record</h2>
            </div>
            <div>
                <button className='btn-g' onClick={handelSubmit} style={{ backgroundColor: "#FFFFFF" }}>
                    <img src="/img/plus-line-icon.svg" alt="" />Submit</button>
            </div>

        </div>

            <div className="form-field-container-r">
                {errors.data && <div className="error">{errors.data}</div>}

                <div className="data-field">
                    <div>Date :</div>
                    <div>{date}</div>
                </div>
                <div className="data-field">
                    <div>Patient Name :</div>
                    <div>{dataItem.patientName}</div>
                </div>
                <div className="data-field">
                    <div>Type :</div>
                    <div>{dataItem.type}</div>
                </div>
                <div className="data-field">
                    <div>Doctor Name :</div>
                    <div>{dataItem.doctorName}</div>
                </div>
                <div className="data-field">
                    <div>Test :</div>
                    <div><input type="text" name="test" className='input-box' value={test} onChange={(e) => setTest(e.target.value)} /></div>
                </div>
                <div className="data-field">
                    <div>Test Result:</div>
                    <div ><input type="text" className='input-box' value={testResult} onChange={(e) => setTestResult(e.target.value)} /></div>
                </div>
                <div className="data-field">
                    <div>Interpretation :</div>
                    <div><textarea name="" id="" className='input-box' value={prescription} onChange={(e) => setPrescription(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="data-field">
                    <div>Bill :</div>
                    <div><input type="number" className='input-box' value={billAmount} onChange={(e) => setBillAmount(e.target.value)} /></div>
                </div>

            </div>
            {alert && <AlertDialog title={alertData.title} desc={alertData.desc} type={alertData.type} onClose={handelAlert} />}

        </>
    )
}
