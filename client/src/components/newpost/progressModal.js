import React, { useEffect } from 'react'
import ReactDom from 'react-dom'

export default function ProgressModal({ open, onClose, progress }) {
    // useEffect(() => {
    //     document.querySelector(".progress__bar").style.width = progress
    // }, [progress])

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className="modal-layout"></div>
            <div className="modal-box">
                <div className="modal-box__heading heading-black u-center-text">Posting...</div>
                <ul className="modal-box__list">
                    <li className="progress__box">
                        <span class="progress-bar"></span>
                    </li>
                    {/* <li className="modal-box__item" >{progress}</li> */}
                </ul>
            </div>
        </>,
        document.getElementById("modal")
    )
}
