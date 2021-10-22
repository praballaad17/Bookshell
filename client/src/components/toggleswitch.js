import React, { useState } from 'react'

export default function Toggleswitch({ label, handlePaid, }) {

    return (
        <div>
            <div className="container">
                {label}{" "}
                <div className="toggle-switch">
                    <input type="checkbox" className="checkbox"
                        name={label} id={label} onChange={handlePaid} />
                    <label className="label" htmlFor={label}>
                        <span className="inner" />
                        <span className="switch" />
                    </label>
                </div>
            </div>
        </div>
    )
}
