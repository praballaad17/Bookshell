import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import * as ROUTES from '../../constants/routes';
import LoggedInUserContext from '../../context/logged-in-user';
import { buyMaterialById, getMaterialByTitle } from '../../services/postServices';

export default function Material() {
    const { user: loggedInUser } = useContext(LoggedInUserContext);
    const { title } = useParams();
    const [material, setMaterial] = useState()
    const history = useHistory();
    console.log(loggedInUser);
    useEffect(() => {

        async function checkMaterialExists() {
            const material = await getMaterialByTitle(title);

            if (material?._id) {
                setMaterial({ ...material });

            } else {
                history.push(ROUTES.NOT_FOUND);
            }
        }
        checkMaterialExists();
    }, [title, history]);

    const handleBuy = async () => {
        try {
            const { data } = await buyMaterialById(material._id, loggedInUser._id, loggedInUser.username, material.author)
            history.push(ROUTES.PURSMATERIAL);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div>
            {material && <div className="material">
                <div className="material__head">
                    <div className="material__title">
                        <h2 className="heading-primary">{material.title}</h2>
                        <h3 className="material__author">By <span>{material.author}</span></h3>
                    </div>
                    <div className="material__price-box">
                        <h5 className="heading-black">₹ {material.paid.price}</h5>
                        <button className="btn btn--grey" onClick={handleBuy}>Buy</button>
                    </div>
                </div>
                <p className="material__discription">
                    <h4 className="heading-black">Disciption</h4>
                    {material.caption}
                </p>
                <p className="material__review">
                    <h4 className="heading-black">Reviews</h4>
                    {material.caption}
                </p>
            </div>
            }
        </div>
    )
}
