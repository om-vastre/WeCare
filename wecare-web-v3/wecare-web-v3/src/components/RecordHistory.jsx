

export default function RecordHistory({ data, setSelect, setReport, name }) {

    return (
        <div className="row-4">
            <div>{data.date}</div>
            <div>{data.type}</div>
            <div>{data.doctorName}</div>
            <div className='btn-view' onClick={() => {
                data.name = name
                setReport(data);
                switch (data.type) {
                    case 'Pathology':
                        setSelect('p-report');
                        break;
                    case 'General Consultant':
                        setSelect('g-report');
                        break;
                    case 'Radiographer':
                        setSelect('r-report');
                        break;
                    case 'Surgeon':
                        setSelect('s-report');
                        break;
                    default:
                        break;
                }
            }}>View Report</div>
        </div>
    )
}