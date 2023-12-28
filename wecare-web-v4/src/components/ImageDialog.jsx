import React from 'react'

export default function ImageDialog({ setImage, image }) {
    return (
        <div className="display-overlay">
            <div className="image-box-container">
                <div className="btn-close">
                    <img src="/img/close-round-line-icon.svg" alt="" onClick={() => setImage(false)} />
                </div>
                <div className="image-1">
                    <img src={image} alt="" />
                </div>

            </div>
        </div>
    )
}
