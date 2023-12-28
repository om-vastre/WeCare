import React, { useEffect, useState } from 'react'
import { getPatientList} from '../api-client/api-model';
import PatientDetails from '../components/PatientDetails';
import PatientCell from '../components/PatientCell';
import PatientForm from '../forms/PatientForm';
import ReportPathology from '../forms/ReportPathology';
import ReportOpd from '../forms/ReportOpd';
import ReportSurgen from '../forms/ReportSurgen';
import ReportRadiographer from '../forms/ReportRadiographer';

export default function AdminPatient() {
  const [patientList, setPatientList] = useState();
  const [active, setActive] = useState();
  const [select, setSelect] = useState('list');
  const [report, setReport] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [select]);

  const fetchData = async () => {
    try {
      const doc = await getPatientList();
      setPatientList(doc);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const searchpatientList = patientList? patientList.filter((product) => {

    return (
        product.name.toLowerCase().includes(search.toLowerCase())
    );
  }):[];
  
  return (
    <>
      <div className="main-container" id="patient">
        <div className="sidebar">
          <div className="top-item">
            <h1>List of Patient</h1>
            <div className='search-bar'>
              <input value={search} onChange={(event)=>{setSearch(event.target.value)}} type="text" className='input-box'placeholder='Search Patient'/>
            </div>
            <ul>
              {searchpatientList && searchpatientList.map(nurse => {
                return (
                  <PatientCell key={nurse.id} data={nurse} active={active} setActive={setActive} setSelect={setSelect} />
                )
              }
              )}

            </ul>
          </div>
          <button className="btn-green" onClick={()=>{setSelect('form')}}>
            <img src="/img/plus-line-icon.svg" alt="" /> Add Patient
          </button>
        </div>
        <div className="data-container">
             {select==="details"&& <PatientDetails active={active} select={setSelect} setSelect={setSelect} setReport={setReport}/>}
             {select==="p-details"&& <PatientForm active={active} select={setSelect}/>}
             {select==="form"&& <PatientForm select={setSelect}/>}
             {select==="p-report"&& <ReportPathology select={setSelect} data={report}/>}
             {select==="g-report"&& <ReportOpd select={setSelect} data={report}/>}
             {select==="s-report"&& <ReportSurgen select={setSelect} data={report}/>}
             {select==="r-report"&& <ReportRadiographer select={setSelect} data={report}/>}
        </div>
      </div>
    </>
  )
}
