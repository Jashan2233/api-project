import { csrfFetch } from "./csrf";
import { getSpotThunk } from "./spot";

// Type

const GET_REVIEW = "/review/getReview";
const CREATE_REVIEW = "review/createReview";
const DELETE_REVIEW = "review/deleteReview";

// Actions

const getReviews = (reviews) => {
  return {
    type: GET_REVIEW,
    reviews,
  };
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

//Thunks
export const getReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(getReviews(reviews));
    return reviews;
  }
};

export const createReviewThunk = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(createReview(review));
    dispatch(getReviewsThunk(spotId));
    return review;
  }
};

export const deleteReviewThunk = (reviewId, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
    dispatch(getSpotThunk(spotId));
  }
};

// INITIAL STATE as per Wireframe
const initialState = { spot: {}, user: {} };

// REDUCER
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW: {
      const newState = { ...state, spot: {}, user: {} };
      const reviews = action.reviews.Reviews;
      reviews.forEach((review) => (newState.spot[review.id] = review));
      return newState;
    }
    case CREATE_REVIEW: {
      const newState = {
        ...state,
        spot: { ...state.spot },
        user: { ...state.user },
      };
      newState.spot[action.review.id] = action.review;
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = {
        ...state,
        spot: { ...state.spot },
        user: { ...state.user },
      };
      delete newState.spot[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
