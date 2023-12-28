import React, { useEffect, useState } from 'react'
import { getAppointmentListByDId } from '../api-client/api-model';
import PatientCell from '../components/PatientCell';
import PatientForm from '../forms/PatientForm';
import ReportPathology from '../forms/ReportPathology';
import ReportOpd from '../forms/ReportOpd';
import ReportSurgen from '../forms/ReportSurgen';
import ReportRadiographer from '../forms/ReportRadiographer';
import PatientDetails1 from '../components/PatientDetails1';
import FormPathology from '../forms/FormPathology';
import FormOpd from '../forms/FormOpd';
import FormRadiographer from '../forms/FormRadiographer';
import FormSurgen from '../forms/FormSurgen';

export default function DoctorDoctor({doctorId,doctorName,doctorType}) {
    const [patientList, setPatientList] = useState();
    const [active, setActive] = useState();
    const [select, setSelect] = useState('list');
    const [report, setReport] = useState();
    const [patientData, setPatientData] = useState()

  
    useEffect(() => {
      fetchData();
    }, [select]);
  
    const fetchData = async () => {
      try {
        const doc = await getAppointmentListByDId(doctorId);
        // const lits = await getRandomSublist();
        setPatientList(doc);
  
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    const filteredPatientList = patientList?patientList.filter((data)=>{
      return data.status ==="Scheduled";
    }):[]
    
    return (
      <>
        <div className="main-container" id="patient">
          <div className="sidebar">
            <div className="top-item">
              <h1>Appointments</h1>
              <ul style={{height:'68vh'}}>
                {filteredPatientList && filteredPatientList.map(data => {
                  return (
                    <PatientCell key={data.aid} data={data} active={active} setActive={setActive} setSelect={setSelect} pdata={setPatientData}/>
                  )
                }
                )}
  
              </ul>
            </div>
          </div>
          <div className="data-container">
                {select==='list'&& <div style={{margin:"auto",alignItems:"center",textAlign:'center'}}> <h1>Welcome Doctor</h1><h2 style={{fontWeight:100}}>{doctorName}</h2><p style={{fontWeight:100}}>{doctorType}</p></div>} 
               {select==="details"&& <PatientDetails1 active={active} pData={patientData} select={setSelect} setSelect={setSelect} setReport={setReport}/>}
               {select==="p-details"&& <PatientForm pData={patientData} active={active} select={setSelect}/>}
               {select==="form"&& <PatientForm select={setSelect}/>}

                {/* Pathology, General Consultant, Radiographer, Surgery */}
                {select==='p-add'&& doctorType==='Pathology'&& <FormPathology pData={patientData}  select={setSelect} dataItem={{doctorName:doctorName, type:doctorType, patientName:report.patientName}}/>}
                {select==='p-add'&& doctorType==='General Consultant'&& <FormOpd pData={patientData} select={setSelect} dataItem={{doctorName:doctorName, type:doctorType, patientName:report.patientName}}/>}
                {select==='p-add'&& doctorType==='Radiographer'&& <FormRadiographer pData={patientData} select={setSelect} dataItem={{doctorName:doctorName, type:doctorType, patientName:report.patientName}}/>}
                {select==='p-add'&& doctorType==='Surgeon'&& <FormSurgen pData={patientData} select={setSelect}  dataItem={{doctorName:doctorName, type:doctorType, patientName:report.patientName}}/>}


               {select==="p-report" && <ReportPathology select={setSelect} data={report}/>}
               {select==="g-report"&& <ReportOpd select={setSelect} data={report}/>}
               {select==="s-report"&& <ReportSurgen select={setSelect} data={report}/>}
               {select==="r-report"&& <ReportRadiographer select={setSelect} data={report}/>}
               

          </div>
        </div>
      </>
    )
}
