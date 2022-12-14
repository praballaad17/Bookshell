import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import MaterialContext from '../../context/material'
import Reader from './reader';
import Skeleton from 'react-loading-skeleton';

export default function MyMaterial() {
    const { MyMaterial, loading } = useContext(MaterialContext)
    const [reader, setReader] = useState(false)
    const [open, setOpen] = useState()
    const handelRead = (item) => {
        setReader(true)
        console.log(item);
        setOpen(item)
    }

    if (loading) return (
        <Skeleton count={5} width={1100} height={90} className="mb-5" />
    )

    if (MyMaterial.length && !loading) return (
        <>
            <div className="mymaterial">
                {MyMaterial.map(item => {
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
                {reader && <Reader reader={reader} material={open} onClose={() => setReader(false)} />}
            </div>
        </>
    )

    if (!MyMaterial.length && !loading) return (
        <div className="u-all-center">Upload Your Content...</div>
    )
}
