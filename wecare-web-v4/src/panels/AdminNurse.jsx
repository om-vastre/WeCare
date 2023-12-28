import React, { useEffect, useState } from 'react'
import NurseCell from '../components/NurseCell';
import NurseForm from '../forms/NurseForm';
import { getNurseList } from '../api-client/api-model';

export default function AdminNurse() {
    const [select, setSelect] = useState('list');
    const [nursesList, setNursesList] = useState();
    const [active, setActive] = useState()
    
    useEffect(() => {
        fetchData();
    }, [select]);

    

    const fetchData = async () => {
        try {
            const doc = await getNurseList();
            setNursesList(doc);
  
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <>
            <div className="main-container" id="nurses" >
                <div className="sidebar">
                    <div className="top-item">
                        <h1>List Of Nurses</h1>
                        <ul>
                            {nursesList && nursesList.map(nurse => {
                                return (
                                    <NurseCell key={nurse.id} data={nurse} active={active} setActive={setActive} setSelect={setSelect}/>
                                )
                            }
                            )}
                        </ul>
                    </div>
                    <button className="btn-green" onClick={()=>setSelect('form')}>
                        <img src="/img/plus-line-icon.svg" alt="" /> Add Nurse
                    </button>
                </div>
                <div className="data-container">
                {select==='details'&& <NurseForm  active={active} select={setSelect}/>}
                {select==='form'&& <NurseForm  select={setSelect}/>}
                </div>
            </div>
        </>
    )
}
