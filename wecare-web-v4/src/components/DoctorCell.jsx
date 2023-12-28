import React from 'react'

export default function DoctorCell({ item, select, dItem }) {
    return (
        <div className="row" onClick={() => { select('data'); dItem(item) }}>
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div>{item.username}</div>
        </div>
    )
}
