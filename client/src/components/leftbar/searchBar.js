import { faCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_IMAGE_PATH, LOADING_ANI_PATH } from '../../constants/paths';
import useSearch from '../../hooks/use-search';
import LoadingAni from '../loadingAni';
import { Link } from 'react-router-dom';
import LoggedInUserContext from '../../context/logged-in-user';

export default function SearchBar() {
    let history = useHistory();
    const [search, setSearch] = useState()
    const { searchResult, setSearchResult } = useContext(LoggedInUserContext);
    // const [searchResult, setSearchResult] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    const handleSearch = (e) => {
        // e.preventDefault() 
        setSearch(e.target.value)
        setPageNumber(1)
        history.push("/search-result");
    }

    const { result, hasMore, loading, error } = useSearch(search, pageNumber)

    useEffect(() => {
        if (!loading)
            setSearchResult(result)
        if (!search)
            setSearchResult([])
    }, [result, loading])


    const handleClear = () => {
        setSearch("")
        let input = document.getElementById('input')
        input.value = ""
    }
    return (
        <div>
            <div className="search-box">
                <input id="input" className="search__input" onChange={handleSearch} placeholder="Search Users" />
                {!search && <div className="search__icon"><FontAwesomeIcon icon={faSearch} /></div>}
                {search && !loading && <FontAwesomeIcon onClick={handleClear} icon={faTimes} />}
                {loading && <img className="search__loading" src={LOADING_ANI_PATH} />}
            </div>

        </div>
    )
}
