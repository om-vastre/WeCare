import React from 'react'

export default function NurseCell({ data, active, setActive, setSelect }) {

  function handelClick(e) {
    setActive(e.target.value);

    setSelect('details');
  }

  return (
    <>
      <li className={`top-item-li ${active ? data.id === active ? 'active-li' : '' : ''}`} onClick={handelClick} value={data.id}>{data.id}. {data.name}</li>
    </>
  )
}
