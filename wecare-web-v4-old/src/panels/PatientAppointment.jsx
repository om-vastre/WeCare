import React, { useEffect, useState } from 'react'
import {getAppointmentListByPId } from '../api-client/api-model';
import AppCell from '../components/AppCell';
import { useParams } from 'react-router-dom';

export default function PatientAppointment() {
    const [appList, setAppList] = useState();
    const {patientId}= useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const doc = await getAppointmentListByPId(patientId);
            setAppList(doc);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    return (
        <>
            <div className="main-container-1">
                <div className="data-container">
                    <div className="data-table">
                        <div className="table-heading table-heading-1">
                            <div>Id</div>
                            <div className="divider-v"></div>
                            <div>Date</div>
                            <div className="divider-v"></div>
                            <div>Type</div>
                            <div className="divider-v"></div>
                            <div>Doctor Name</div>
                            <div className="divider-v"></div>
                            <div>Status</div>
                        </div>
                        <div className="table-body">
                            {appList&&appList.map(app => {
                                return (
                                    <AppCell key={app.aid} item={app}/>
                                )
                            }
                            )}

                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
