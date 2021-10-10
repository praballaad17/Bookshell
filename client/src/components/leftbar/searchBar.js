import { faCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { DEFAULT_IMAGE_PATH, LOADING_ANI_PATH } from '../../constants/paths';
import useSearch from '../../hooks/use-search';
import LoadingAni from '../loadingAni';
import { Link } from 'react-router-dom';

export default function SearchBar() {
    const [search, setSearch] = useState()
    const [searchResult, setSearchResult] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    const handleSearch = (e) => {
        // e.preventDefault() 
        setSearch(e.target.value)
        setPageNumber(1)
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
        <>
            <div className="search-box">
                <input id="input" className="search__input" onChange={handleSearch} placeholder="Search Users" />
                {!search && <div className="search__icon"><FontAwesomeIcon icon={faSearch} /></div>}
                {search && !loading && <FontAwesomeIcon onClick={handleClear} icon={faTimes} />}
                {loading && <img className="search__loading" src={LOADING_ANI_PATH} />}
            </div>
            {search && <div className="search-result">
                {searchResult.map(user =>
                (<Link to={`/user/${user.username}`} className="search-result__user">
                    <img className="search-result--img" src={user.profileImg.length ? user.profileImg : DEFAULT_IMAGE_PATH} />
                    <div className="search-result--info">
                        <span>{user.username}</span>
                        <span>{user.fullname}</span>
                    </div>
                </Link>)
                )}
            </div>}
        </>
    )
}
