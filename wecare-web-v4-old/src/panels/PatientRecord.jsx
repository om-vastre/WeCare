import React, { useState } from 'react'
import PatientDetails from '../components/PatientDetails'
import ReportPathology from '../forms/ReportPathology';
import ReportOpd from '../forms/ReportOpd';
import ReportSurgen from '../forms/ReportSurgen';
import ReportRadiographer from '../forms/ReportRadiographer';

export default function PatientRecord() {
  const [select, setSelect] = useState('details');
  const [report, setReport] = useState();
  return (
    <div className="main-container-1">
      {select === "details" && <PatientDetails  select={() => { }} setSelect={setSelect} setReport={setReport} user={"patient"}/>}
      {select === "p-report" && <ReportPathology select={setSelect} data={report} user={"patient"}/>}
      {select === "g-report" && <ReportOpd select={setSelect} data={report} user={"patient"} />}
      {select === "s-report" && <ReportSurgen select={setSelect} data={report} user={"patient"}/>}
      {select === "r-report" && <ReportRadiographer select={setSelect} data={report} user={"patient"}/>}
    </div>
  )
}
