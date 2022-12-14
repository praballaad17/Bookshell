import { useState, useEffect } from 'react';
import { getPost, getUserMaterialByUsername, getUserPurcMaterialByUserId } from '../services/postServices';

export default function useMaterial(user, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [material, setMaterial] = useState([]);
    const [purcMaterial, setPurcMaterial] = useState([]);
    const [hasMore, setMore] = useState(false)

    useEffect(async () => {
        setLoading(true)
        setError(false)
        async function getMaterial() {
            try {
                const material = await getUserMaterialByUsername(user?.username, 1, 10);
                setMaterial(prevPost => [...prevPost, ...material?.result]);
                const purcmaterial = await getUserPurcMaterialByUserId(user?.id);
                console.log(purcmaterial);
                setPurcMaterial(prevPost => { return [...prevPost, ...purcmaterial] });
                setMore(material?.result?.length > 0)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error);
            }

        }

        // async function getPurcMaterial() {
        //     try {
        //         const purcmaterial = await getUserPurcMaterialByUserId(user._id);
        //         console.log(purcmaterial);
        //         setPurcMaterial(prevPost => { return [...prevPost, ...purcmaterial] });
        //         setLoading(false)
        //     } catch (error) {
        //         setError(true)
        //         console.log(error);
        //     }

        // }

        getMaterial();
        // getPurcMaterial();
    }, [user?._id, pageNumber]);

    return { material, purcMaterial, loading, error, hasMore, setMaterial, setPurcMaterial };
}
