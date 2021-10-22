import React, { useContext, useState } from 'react'
import MaterialContext from '../../context/material'
import Reader from './reader';

export default function PursMaterial() {
    const { PursMaterial } = useContext(MaterialContext)
    const [reader, setReader] = useState(false)
    const [open, setOpen] = useState()
    const handelRead = (item) => {
        setReader(true)
        setOpen(item)
    }

    return (
        <div>
            {PursMaterial && <div className="mymaterial">
                {PursMaterial.map(item => {
                    return (
                        <>
                            <div className="mymaterial__head">
                                <h2 className="heading-secondary"> {item.title}</h2>
                                <button onClick={() => handelRead(item)} className="btn btn--read">Read</button>
                            </div>
                        </>
                    )
                })}
                <Reader reader={reader} material={open} onClose={() => setReader(false)} />
            </div>}
        </div>
    )
}
