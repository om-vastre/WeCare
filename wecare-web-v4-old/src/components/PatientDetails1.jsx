import React, { useEffect, useState } from 'react'
import { getPatientById, getRecordHistorybyId } from '../api-client/api-model';

export default function PatientDetails1({ active, select, setSelect, setReport, pData }) {
    const [patientData, setPatientData] = useState();
    const [recordHistory, setRecordHistory] = useState();


    useEffect(() => {
        fetchData();
    }, [active]);

    const fetchData = async () => {
        try {
            const doc = await getPatientById(pData.pid);
            const lits = await getRecordHistorybyId(pData.pid);
            setPatientData(doc);
            setRecordHistory(lits);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    return (
        <>
            <div className="data-table">
                <div className="table-heading">
                    <div>{pData && pData.aid}</div>
                    <div className="divider-v"></div>
                    <div className='btn-view' onClick={() => setSelect('p-details')}>{patientData && patientData.name}</div>
                    <div className="divider-v"></div>
                    <div className='btn-view' onClick={() => {
                        setReport({ patientName: patientData.name });
                        setSelect('p-add')
                    }} style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '5px' }}>
                        Add Prescription <img src="/img/line-angle-right-icon.svg" className='img' alt="" style={{ padding: '5px', height: '15px' }} />
                    </div>

                </div>
                <div className="table-body">
                    {recordHistory && recordHistory.map(record => {
                        return (
                            <RecordHistory key={record.billNo} data={record} active={active} setActive={select} setReport={setReport} name={patientData.name} setSelect={setSelect} />
                        )
                    }
                    )}


                </div>
            </div>
        </>
    )
}

function RecordHistory({ data, setSelect, setReport, name }) {

    return (
        <div className="row-4">
            <div>{data.date}</div>
            <div>{data.type}</div>
            <div>{data.doctorName}</div>
            <div className='btn-view' onClick={() => {
                data.name = name
                setReport(data);
                switch (data.type) {
                    //Pathology, General Consultant, Radiographer, Surgery, 
                    case 'Pathology':
                        setSelect('p-report');
                        break;
                    case 'General Consultant':
                        setSelect('g-report');

                        break;
                    case 'Radiographer':
                        setSelect('r-report');

                        break;
                    case "Surgeon":
                        setSelect('s-report');

                        break;

                    default:
                        break;
                }
            }}>View Report</div>
        </div>
    )
}