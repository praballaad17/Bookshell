import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { getMaterialByTitle } from '../../services/postServices';
import ReactLoader from '../loader';

export default function Reader({ material, reader, onClose }) {
    const [fileurl, setFileurl] = useState()
    const [loading, setLoading] = useState(false)

    // useEffect( () => {
    //     setLoading(true)
    //     if(material?.files) {
    //         console.log(material);
    //         setFileurl(material?.files)
    //     }
    //     setLoading(false)
    // }, [])

    useEffect(async () => {
        setLoading(true)
        const materialFile = await getMaterialByTitle(material?.title);
        console.log(materialFile, materialFile?.files);
        setFileurl(materialFile?.files)
        setLoading(false)
    }, [])

    if (!reader) return null

    console.log(material, fileurl);

    return ReactDom.createPortal(

        <div className="reader">
            <div className="reader__header">
                <h2>{material.title}</h2>
                <div onClick={onClose}>x</div>
            </div>
            {loading ? (
                <div className="u-all-center">
                    <ReactLoader />
                </div>
            ) : (
                <div style={{ height: '750px' }}>
                    {fileurl ? (
                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                height: '100%',
                                // display: 'flex',
                                // justifyContent: 'center',
                                // alignItems: 'center'
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
            )}

        </div>,
        document.getElementById("reader")
    )
}
