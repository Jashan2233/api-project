import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk } from "../../store/spot";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllSpotsThunk } from "../../store/spot";
import { getReviewsThunk } from "../../store/review";
import SpotIdReview from "./SpotIdReview";
import "./SpotId.css";
import "./SpotIdReview.css";

const SpotId = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const oneSpot = useSelector((state) => state.spots.singleSpot);
  const reviewObj = useSelector((state) => state.reviews.spot);
  const newReview = Object.values(reviewObj);

  //Getting average Rating for a Spot
  let avg = 0;
  if (newReview.length) {
    let sum = 0;
    for (let i = 0; i < newReview.length; i++) {
      sum += newReview[i].stars;
    }
    avg = sum / newReview.length;
  }

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSpotThunk(spotId));
    dispatch(getAllSpotsThunk()).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(getReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (!newReview || !oneSpot) return null;

  const handleReserve = () => {
    alert("Feature Coming Soon");
  };

  if (!oneSpot.SpotImages) return null;

  return (
    isLoaded && (
      <>
        <div className="spotId-container">
          {oneSpot?.id && (
            <>
              <div className="title-info">
                <h2 className="spotId-name">{oneSpot.name}</h2>
                <p className="spotId-location">
                  {oneSpot.city}, {oneSpot.state}, {oneSpot.country}
                </p>
              </div>
              <div className="image-container">
                <img
                  id="spotId-main-image"
                  src={
                    oneSpot?.SpotImages?.find((img) => img.preview === true)
                      ?.url
                  }
                  alt="image-screen"
                />

                <div className="image-grid">
                  {oneSpot.SpotImages.filter((img, index) => index > 0).map(
                    (img, index) =>
                      index < 4 && img ? (
                        <img src={img.url} className="grid-images" alt="img" />
                      ) : null
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="description-container">
          <div className="left-description">
            Hosted by {oneSpot?.Owner?.firstName} {oneSpot?.Owner?.lastName}
            <p>{oneSpot.description}</p>
          </div>
          <div className="right-description">
            <div className="price-star">
              <div>
                <b>${oneSpot.price}</b> night
              </div>
              <div className="inside-price-star">
                <i class="fa-solid fa-star"></i>
                <div></div>

                <div>
                  {avg > 0 ? `${avg} ` : "New"}
                  {oneSpot.numReviews ? <span>·</span> : ""}
                  {oneSpot.numReviews ? (
                    <span>
                      {oneSpot.numReviews}
                      {oneSpot.numReviews === 1 ? " Review" : "reviews"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <button onClick={handleReserve} id="reserve-button">
              Reserve
            </button>
          </div>
        </div>
        <div className="reviews-container">
          <div className="top-reviews">
            <div>
              <i className="fa-solid fa-star"></i>
            </div>
            {oneSpot.numReviews ? (
              <div>
                {parseFloat(avg)?.toFixed(1)} · {oneSpot.numReviews}{" "}
                {oneSpot.numReviews === 1 ? "Review" : "Reviews"}
              </div>
            ) : (
              <div>New</div>
            )}
          </div>
          <SpotIdReview spotId={spotId} />
        </div>
      </>
    )
  );
};

export default SpotId;
