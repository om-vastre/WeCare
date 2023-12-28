import React, { useEffect, useState } from 'react'
import { getPatientById, getRecordHistorybyId } from '../api-client/api-model';
import RecordHistory from './RecordHistory';
import { useParams } from 'react-router-dom';

export default function PatientDetails({ active, select, setSelect, setReport, user }) {
    const [patientData, setPatientData] = useState();
    const [recordHistory, setRecordHistory] = useState();
    const { patientId } = useParams();


    useEffect(() => {
        fetchData();
    }, [active]);

    const fetchData = async () => {
        try {
            const doc = await getPatientById(active ? active : patientId);
            const lits = await getRecordHistorybyId(active ? active : patientId);
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
                    <div>{user !== 'patient' && patientData && patientData.id}</div>
                    {user !== 'patient' && <div className="divider-v"></div>}
                    <div>{user !== 'patient' && patientData && patientData.name}</div>

                    {user !== 'patient' && <><div className="divider-v"></div>
                        <div className='btn-view' onClick={() => setSelect('p-details')}>
                            View Details
                        </div></>}
                    {user === 'patient' && <>Records</>}

                </div>
                <div className="table-body">
                    {
                        recordHistory && recordHistory.map(record => {
                            return (
                                <RecordHistory key={record.preid} data={record} active={active} setActive={select} setReport={setReport} name={patientData.name} setSelect={setSelect} />
                            )
                        }
                        )
                    }
                    {!recordHistory && <div><center>Record Not Available</center></div>}


                </div>
            </div>
        </>
    )
}