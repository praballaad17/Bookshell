import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';

export default function Reader({ material, reader, onClose }) {
    const [fileurl, setFileurl] = useState()


    useEffect(() => {
        console.log(material);
        setFileurl(material?.files)
    })

    if (!reader) return null

    return ReactDom.createPortal(
        <div className="reader">
            <div className="reader__header">
                <h2>{material.title}</h2>
                <div onClick={onClose}>x</div>
            </div>

            <div style={{ height: '750px' }}>
                {fileurl ? (
                    <div
                        style={{
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                            <Viewer fileUrl={fileurl} />
                        </Worker>
                    </div>
                ) : (
                    <div
                        style={{
                            alignItems: 'center',
                            border: '2px dashed rgba(0, 0, 0, .3)',
                            display: 'flex',
                            fontSize: '2rem',
                            height: '100%',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        Preview area
                    </div>
                )}
            </div>

        </div>
        ,
        document.getElementById("reader")
    )
}
