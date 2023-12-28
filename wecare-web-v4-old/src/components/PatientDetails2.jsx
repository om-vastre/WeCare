import React, { useEffect, useState } from 'react'
import RecordHistory from './RecordHistory';
import { getPatientById, getRandomSublist, getRecordHistorybyId } from '../api-client/api-model';
import { useParams } from 'react-router-dom';

export default function PatientDetails2({ active, select, setSelect, setReport }) {
    const [patientData, setPatientData] = useState();
    const [recordHistory, setRecordHistory] = useState();
    const { patientId } = useParams();


    useEffect(() => {
        fetchData();
    }, [active]);

    const fetchData = async () => {
        try {
            const doc = await getPatientById(active);
            const lits = await getRecordHistorybyId(active);
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
                    <div>{patientData && patientData.id}</div>
                    <div className="divider-v"></div>
                    <div>{patientData && patientData.name}</div>
                    <div className="divider-v"></div>
                    <div className='btn-view' onClick={() => setSelect('p-details')}>
                        View Details
                    </div>

                </div>
                <div className="table-body">
                    {
                        recordHistory && recordHistory.map(record => {
                            return (
                                <RecordHistory key={record.billNo} data={record} active={active} setActive={select} setReport={setReport} name={patientData.name} setSelect={setSelect} />
                            )
                        }
                        )
                    }


                </div>
            </div>
        </>
    )
}
