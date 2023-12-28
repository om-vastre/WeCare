import React from 'react'

export default function AppCell({ item }) {
  return (
    <div className="row-5" >
      <div>{item.aid}</div>
      <div>{item.date}</div>
      <div>{item.type}</div>
      <div>{item.dname}</div>
      <div>{item.status}</div>
    </div>
  )
}
