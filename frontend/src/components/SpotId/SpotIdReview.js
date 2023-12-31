import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getReviewsThunk } from "../../store/review";
import { getSpotThunk } from "../../store/spot";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import "./SpotIdReview.css";
import DeleteReviewModal from "./DeleteReviewModal";

const SpotIdReview = ({ spotId }) => {
  const review = useSelector((state) => state.reviews);
  const reviewArr = Object.values(review.spot);

  const user = useSelector((state) => state.session.user);

  const spot = useSelector((state) => state.spots.singleSpot);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewsThunk(spotId));
    dispatch(getSpotThunk(spotId));
  }, [dispatch]);

  let userReview;

  if (user) {
    userReview = reviewArr.find((review) => review.User?.id === user?.id);
  }

  if (!user || !user.id) {
    return (
      <>
        <div className="all-reviews-grid">
          {reviewArr.toReversed().map((review) => (
            <>
              <h3 className="review-name">{review?.User?.firstName}</h3>
              <h5>
                {new Date(review.createdAt).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {new Date(review.createdAt).getFullYear()}
              </h5>
              <h4>{review.review}</h4>
            </>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {!userReview && user?.id !== spot.Owner?.id && (
        <div id="post-review-button">
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<CreateReviewModal spotId={spotId} />}
          />
          {!reviewArr.length && !userReview && user?.id !== spot.Owner?.id && (
            <p id="be-first">Be the first to post a review!</p>
          )}
        </div>
      )}
      <div className="all-reviews-grid">
        {reviewArr.toReversed().map((review) => (
          <>
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
          </>
        ))}
      </div>
    </>
  );
};

export default SpotIdReview;
