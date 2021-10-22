import axios from 'axios';
import { useState, useEffect } from 'react';
import { apiUrl } from "../config.json";

export default function useSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [result, setResult] = useState([]);
    const [hasMore, setMore] = useState(false)
    const apiEndpoint = apiUrl + "/post";

    useEffect(() => {
        setResult([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel;
        axios({
            method: 'GET',
            url: `${apiEndpoint}/search/${query}`,
            params: { page: pageNumber, limit: 5 },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then((res) => {
            console.log(res);
            setMore(res.data.length > 0)
            setLoading(false)
            setResult(res.data)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            setLoading(false)
            console.log(e);
        })
        return () => cancel()
    }, [query, pageNumber]);

    return { result, loading, error, hasMore };
}
