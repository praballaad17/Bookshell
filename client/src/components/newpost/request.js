import React from 'react'

export default function Request() {
    const handleTitle = () => {

    }

    const handleAuthor = () => {

    }

    const handleSubmit = () => {

    }
    return (
        <>
            <div className="newpost__head">
                <h3 className="heading-tertiary">Request Your Book</h3>
                <div>
                    <button className="btn btn--grey" onClick={handleSubmit}>Request</button>
                </div>

            </div>
            <div className="newpost__main">
                <input className="newpost__input-text" type="text" placeholder="Title" onChange={handleTitle} />
                <input className="newpost__input-text" type="text" placeholder="Author" onChange={handleAuthor} />
            </div>

        </>
    )
}
