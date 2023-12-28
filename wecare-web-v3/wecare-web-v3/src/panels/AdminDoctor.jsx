import React, { useEffect, useState } from 'react'
import { getDoctorList } from '../api-client/api-model';
import DoctorCell from '../components/DoctorCell';
import DoctorForm from '../forms/DoctorForm';

export default function AdminDoctor() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [doctorList, setDoctorList] = useState();
    const [doctorItem, setdoctorItem] = useState();
    const [select, setSelect] = useState('list')

    useEffect(() => {
        fetchData();
    }, [select]);

    const fetchData = async () => {
        try {
            const doc = await getDoctorList();
            setDoctorList(doc);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const filteredDoctors = doctorList ? doctorList.filter((doctor) => {
        return (
            (!selectedCategory || (doctor.type.trim() === selectedCategory) || selectedCategory === 'All')/* &&
          product.pname.toLowerCase().includes(searchTerm.toLowerCase())*/
        );
    }) : [];

    return (
        <>
            <div className="main-container" id="doctor">
                <div className="sidebar">
                    <div className="top-item">
                        <h1>Type of Doctors</h1>
                        <ul>
                            <li className={`top-item-li ${selectedCategory === 'All' ? 'active-li' : ''}`} onClick={() => { setSelectedCategory('All'); setSelect('list') }}>
                                All
                            </li>
                            <li className={`top-item-li ${selectedCategory === 'Pathology' ? 'active-li' : ''}`} onClick={() => { setSelectedCategory('Pathology'); setSelect('list') }}>
                                Pathology <img src="/img/line-angle-right-icon.svg" alt="" className="img" />
                            </li>
                            <li className={`top-item-li ${selectedCategory === 'General Consultant' ? 'active-li' : ''}`} onClick={() => { setSelectedCategory('General Consultant'); setSelect('list') }}>
                                General Consultant <img src="/img/line-angle-right-icon.svg" alt="" className="img" />
                            </li>
                            <li className={`top-item-li ${selectedCategory === 'Radiographer' ? 'active-li' : ''}`} onClick={() => { setSelectedCategory('Radiographer'); setSelect('list') }}>
                                Radiographer <img src="/img/line-angle-right-icon.svg" alt="" className="img" />
                            </li>
                            <li className={`top-item-li ${selectedCategory === 'Surgeon' ? 'active-li' : ''}`} onClick={() => { setSelectedCategory('Surgeon'); setSelect('list') }}>
                            Surgeon <img src="/img/line-angle-right-icon.svg" alt="" className="img" />
                            </li>
                        </ul>
                    </div>
                    <button className="btn-green" onClick={()=>setSelect('form')}>
                        <img src="/img/plus-line-icon.svg" alt="" /> Add Doctor
                    </button>
                </div>
                <div className="data-container">
                    {select==='list' && <div className="data-table">
                        <div className="table-heading">
                            <div>Id</div>
                            <div className="divider-v"></div>
                            <div>Name</div>
                            <div className="divider-v"></div>
                            <div>Username</div>
                        </div>
                        <div className="table-body">
                            {filteredDoctors.map(doctor => {
                                return (
                                    <DoctorCell key={doctor.id} item={doctor} select={setSelect} dItem={setdoctorItem}/>
                                )
                            }
                            )}

                        </div>
                    </div>}
                    {select==='data'&&<DoctorForm doctor={doctorItem} select={setSelect} />}
                    {select==='form'&&<DoctorForm select={setSelect} />}
                </div>
            </div>
        </>
    )
}
