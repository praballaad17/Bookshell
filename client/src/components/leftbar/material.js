import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { addReview, checkPurchased, getReviewByMaterialId } from '../../services/postServices';
import * as ROUTES from '../../constants/routes';
import { useUser } from '../../context/userContext';
import { buyMaterialById, getMaterialByTitle } from '../../services/postServices';
import Skeleton from 'react-loading-skeleton';

export default function Material() {
    const { user: loggedInUser } = useUser();
    const { title } = useParams();
    const [material, setMaterial] = useState()
    const [loading, setLoading] = useState(false)
    const [reviews, setReviews] = useState([])
    const [message, setMessage] = useState("")
    const [isPurc, setisPurc] = useState(false)
    const [show, setShow] = useState(false)
    const history = useHistory();

    useEffect(() => {
        setLoading(true)
        async function checkMaterialExists() {
            const material = await getMaterialByTitle(title);
            console.log(material);
            const reviews = await getReviewByMaterialId(material?._id)
            const isPurchesed = await checkPurchased(loggedInUser?.id, material?._id)
            console.log(isPurchesed);
            setisPurc(isPurchesed)

            if (material?._id) {
                setMaterial({ ...material });
                setLoading(false)
                setReviews(prevreview => [...prevreview, ...reviews])

            } else {
                history.push(ROUTES.NOT_FOUND);
            }
        }
        checkMaterialExists();
    }, [title, history]);

    const handleBuy = async () => {
        try {
            const { data } = await buyMaterialById(material._id, loggedInUser.id, loggedInUser.username, material.author)
            history.push(ROUTES.PURSMATERIAL);
        } catch (error) {
            console.log(error.response);
        }
    }

    const showReview = () => {
        setShow(!show)
    }

    const handleReview = (e) => {
        setMessage(e.target.value)
    }

    const reviewSubmit = async () => {
        try {
            const data = await addReview(message, loggedInUser._id, material._id)
            setReviews(prevreview => [...prevreview, data])
            setMessage("")
            setShow(false)
            // history.push(ROUTES.PURSMATERIAL);
        } catch (error) {
            console.log(error.response);
        }
    }
    console.log(isPurc);
    return (
        <>
            {loading ? (
                <>
                    <Skeleton count={1} width={1100} height={90} className="mb-5" />
                    <Skeleton count={1} width={1100} height={200} className="mb-5" />
                    <Skeleton count={1} width={1100} height={200} className="mb-5" />
                </>
            ) :
                (
                    <div>
                        {material && <div className="material">
                            <div className="material__head">
                                <div className="material__title">
                                    <h2 className="heading-primary">{material.title}</h2>
                                    <h3 className="material__author">By <span>{material.author}</span></h3>
                                </div>
                                {isPurc &&
                                    <div className="material__price-box">
                                        <h5 className="heading-black">₹ {material.paid.price}</h5>
                                        <button className="btn btn--grey">Bought</button>
                                    </div>}
                                {!isPurc && loggedInUser.username != material?.author &&
                                    <div className="material__price-box">
                                        <h5 className="heading-black">₹ {material.paid.price}</h5>
                                        <button className="btn btn--orange" onClick={handleBuy}>Buy</button>
                                    </div>
                                }
                                {!isPurc && loggedInUser.username === material?.author &&
                                    <div className="material__price-box">
                                        <h5 className="heading-black">₹ {material.paid.price}</h5>
                                        <button className="btn btn--green">Read</button>
                                    </div>
                                }
                            </div>
                            <p className="material__discription">
                                <h4 className="heading-black">Disciption</h4>
                                {material.caption}
                            </p>
                            <p className="material__review">
                                <div className="material__review-head">
                                    <h4 className="heading-black">Reviews</h4>
                                    <div className="material__review__box">
                                        <button className="btn btn--grey" onClick={showReview}>write your review</button>
                                        {show && <><input type="text" placeholder="Review" className="login__form--input" onChange={handleReview} />
                                            <button className="btn btn--grey" onClick={reviewSubmit}>Submit</button>
                                        </>}
                                    </div>
                                </div>
                                {reviews && <div>
                                    {reviews.map(review => {
                                        return (
                                            <>
                                                <div className="material__review__box">
                                                    <p>{review.message}</p>
                                                    <span>{review.date}</span>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>}
                            </p>
                        </div>
                        }
                    </div>
                )}
        </>
    )
}
