import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import { faImage, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { v4 as uuidV4 } from "uuid"
import { useUser } from '../../context/userContext'
import { BOOKSHELL } from '../../constants/routes'
import { postByUsername, uploadFileToStorage } from '../../services/postServices';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Toggleswitch from '../toggleswitch';
import ProgressModal from './progressModal';


export default function Newpost() {
    const { user: loggedInUser } = useUser();
    const [selectedFiles, setSelectedFiles] = useState()
    const [fileurl, setfileurl] = useState('')
    const [files, setFiles] = useState([])
    const [paid, setPaid] = useState(false)
    const [caption, setCaption] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState()
    let [modal, setModal] = useState(false);
    let [progress, setProgress] = useState();
    let history = useHistory()
    
    const handleFileUpload = (e) => {
        if (!e.target.files.length) return;

        setfileurl(URL.createObjectURL(e.target.files[0]))

        let reader = new FileReader();
        // Convert the file to base64 text
        reader.readAsDataURL(e.target.files[0]);
        // on reader load somthing...
        reader.onload = () => {
            // Make a fileInfo Object
            const baseURL = reader.result;
            setFiles(baseURL)
        }

        // setFiles(e.target.files[0])

    }

    const handleCaption = (e) => {
        setCaption(e.target.value)
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handlePaid = () => {
        setPaid(!paid)
    }

    const progressfn = {
        onUploadProgress: (progressEvent) => {
            let progressper = Math.round(progressEvent.loaded / progressEvent.total * 100) + "%";
            console.log(progressper);
            setProgress(progressper)
        }
    }

    const handleSubmit = async () => {
        setModal(true)
        // const _id = uuidV4()
        // console.log(_id);
        console.log(files);
        // const fileurl = await uploadFileToStorage(files, `/file/${loggedInUser?.username}/${_id}`)
        console.log(fileurl);
        try {
            const { data } = await postByUsername( files, title, caption, loggedInUser.username, paid, price, progressfn)
            console.log(data);
            history.push(BOOKSHELL)
        } catch (error) {
            console.log(error.response);
        }
    }

    const progressUpdate = {
        width: progress,
    }

    console.log(progress);
    return (
        <>
            <div className="newpost__head">
                <h3 className="heading-tertiary">New Post</h3>
                <div>
                    <Toggleswitch label="Paid" handlePaid={handlePaid} />
                    <button className="btn btn--grey" onClick={handleSubmit}>Post</button>
                </div>

            </div>
            <div className="newpost__main">
                <input className="newpost__input-text" type="text" placeholder="Title" onChange={handleTitle} />
                <textarea className="newpost__input-text" placeholder="Description..." onChange={handleCaption} />
                <label className="newpost__media">
                    <FontAwesomeIcon icon={faImage} />
                    <input type="file" style={{ opacity: 0, position: "absolute", left: "-99999px" }} onChange={handleFileUpload} />
                </label>

                <input type="text" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div style={{ height: '750px' }}>
                {fileurl ? (
                    <div
                        style={{
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            height: '100%',
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

            {modal && <ProgressModal />}
        </>
    )
}
