import React from 'react'

export default function Loader() {

    return (
        <div className="display-loader-overlay">
            <div className="display-loader">
                <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <h2>Loading ...</h2>
            </div>

        </div>
    )
}
