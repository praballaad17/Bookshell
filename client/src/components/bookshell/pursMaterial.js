import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
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

    if (!PursMaterial.length) return (
        <div className="u-all-center">Try Some New Books...</div>
    )
    console.log(PursMaterial);

    return (
        <div>
            {PursMaterial && <div className="mymaterial">
                {PursMaterial.map(item => {
                    return (
                        <>
                            <div className="mymaterial__head">
                                <h2 className="heading-secondary">
                                    <Link to={`/material/${item.title}`} className="search-result__material">
                                        {item.title}</Link>
                                </h2>
                                <button onClick={() => handelRead(item)} className="btn btn--read">Read</button>
                            </div>
                        </>
                    )
                })}
               {reader && <Reader reader={reader} material={open} onClose={() => setReader(false)} /> }
            </div>}
        </div>
    )
}
