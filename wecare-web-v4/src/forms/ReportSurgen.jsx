import React, { useState } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { deleteRecord } from '../api-client/api-model';
import AlertDialog from '../components/AlertDialog';

export default function ReportSurgen({ data, select,user }) {
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({});

    const generatePDF = (data) => {
        const doc = new jsPDF();
        doc.text('Bill Details', 90, 10);
        const tableData = [
            ["Bill No.", data.billNo],
            ["Date", data.date],
            ["Patient Name :", data.name],
            ["Type :", data.type],
            ["Doctor Name :", data.doctorName],
            ["Time :", data.surgeryTime],
            ["Procedure :", data.prescription],
            ["Bill :", `Rs. ${data.billAmount}`]
        ];

            const columns = [
                { dataKey: 0, width: 10 }, // Adjust the width as needed
                { dataKey: 1, width:50 },
              ];
        doc.autoTable({
            columnStyles: { 0: {cellWidth:30 , fontStyle:"bold"} },
            body: tableData,
            columns: columns,
        });

        doc.save('bill.pdf');
    };

    async function handelDelete() {
        try {
            await deleteRecord(data.preid);
            const newAlert = { title: "Deleted", desc: "Record Successfully Deleted", type: "delete" }
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
        <> <div className="header-menu">
            <div>
                <img src="/img/line-angle-left-icon.svg" className="img" alt="" onClick={() => { select("details") }} />
            </div>
            <div>
                <h2>Record</h2>
            </div>
            {user!=='patient'&&<div>
                <button className='btn-r' onClick={handelDelete}>
                    <img src="/img/trash-can-icon.svg" alt="" />Delete</button>
            </div>}

        </div>

            <div className="form-field-container-r">
                <div className="group-field">
                    <div className="data-field-1">
                        <div>Bill No.</div>
                        <div>{data.billNo}</div>
                    </div>
                    <div className="btn-download" onClick={() => generatePDF(data)}>
                        Download Bill
                    </div>
                </div>
                <div className="data-field">
                    <div>Date</div>
                    <div>{data.date}</div>
                </div>
                <div className="data-field">
                    <div>Patient Name :</div>
                    <div>{data.name}</div>
                </div>
                <div className="data-field">
                    <div>Type :</div>
                    <div>{data.type}</div>
                </div>
                <div className="data-field">
                    <div>Doctor Name :</div>
                    <div>{data.doctorName}</div>
                </div>
                <div className="data-field">
                    <div>Time :</div>
                    <div>{data.surgeryTime}</div>
                </div>
                <div className="data-field">
                    <div>Procedure :</div>
                    <div><textarea name="" id="" value={data.prescription} readOnly></textarea>
                    </div>
                </div>
                <div className="data-field">
                    <div>Bill :</div>
                    <div>Rs. {data.billAmount}</div>
                </div>

            </div>
            {alert && <AlertDialog title={alertData.title} desc={alertData.desc} type={alertData.type} onClose={handelAlert} />}
            
            </>
    )
}
