import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviewsThunk } from "../../store/review";
import { getSpotThunk } from "../../store/spot";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import "./SpotIdReview.css";
import DeleteReviewModal from "./DeleteReviewModal";

const SpotIdReview = ({ spotId }) => {
  const reviews = useSelector((state) => state.reviews.spot);
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.singleSpot);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getReviewsThunk(spotId));
      await dispatch(getSpotThunk(spotId));
    }
    fetchData();
  }, [dispatch, spotId]);

  const userReview = user && reviews[user.id];

  return (
    <>
      {!userReview && user?.id !== spot.Owner?.id && (
        <div id="post-review-button">
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<CreateReviewModal spotId={spotId} />}
          />
          {!Object.values(reviews).length &&
            !userReview &&
            user?.id !== spot.Owner?.id && (
              <p id="be-first">Be the first to post a review!</p>
            )}
        </div>
      )}
      <div className="all-reviews-grid">
        {Object.values(reviews)
          .reverse()
          .map((review) => (
            <div key={review.id}>
              <h3 className="review-name">{review?.User?.firstName}</h3>
              <h5>
                {new Date(review.createdAt).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {new Date(review.createdAt).getFullYear()}
              </h5>
              <h4>{review.review}</h4>
              {user.id === review.userId && (
                <div id="delete-review-home">
                  <OpenModalButton
                    buttonText="Delete Review"
                    modalComponent={
                      <DeleteReviewModal spotId={spotId} reviewId={review.id} />
                    }
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default SpotIdReview;
