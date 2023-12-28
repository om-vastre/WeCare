import React from 'react'

export default function PatientCell({ data, active, setActive, setSelect, pdata }) {

  function handelClick(e) {
    pdata && pdata(data)
    setActive(e.target.value);
    setSelect('details');
  }

  return (
    <>
      {pdata ? <li className={`top-item-li ${active ? data.aid === active ? 'active-li' : '' : ''}`} onClick={handelClick} value={data.aid}>{data.aid}. {data.pname}</li> :
        <li className={`top-item-li ${active ? data.id === active ? 'active-li' : '' : ''}`} onClick={handelClick} value={data.id}>{data.id}. {data.name}</li>}
    </>
  )
}
