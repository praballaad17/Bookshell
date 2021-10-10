import React from 'react'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function UploadPreview({ files, onChange }) {

    const handleClose = (file) => {
        onChange(file)
    }

    if (!files.length) return null;

    return (
        <div className="file-privew">
            {files.map((file) => (
                <div className="file-privew__item">
                    <FontAwesomeIcon icon={faWindowClose} className="file-privew__close" onClick={() => handleClose(file)} />
                    <img src={file} />

                </div>
            ))}
        </div>
    )
}
