import { faPoundSign } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import LoggedInUserContext from '../../context/logged-in-user';

export default function SearchResult() {
    const { searchResult } = useContext(LoggedInUserContext);
    console.log(searchResult);
    if (!searchResult.length) return (
        <div className="u-all-center">Result Not Found...</div>
    )
    return (
        <div className="search-result">
            {searchResult && <div >
                {searchResult.map(book => (
                    <Link to={`/material/${book.title}`} className="search-result__material">
                        {/* <img className="search-result--img" src={user.profileImg.length ? user.profileImg : DEFAULT_IMAGE_PATH} /> */}
                        <div className="search-result--info">
                            <span>{book.title}</span>
                            <span className="search-result--info-author">{book.author}</span>
                        </div>
                    </Link>
                ))}
            </div>}
        </div>
    )
}
