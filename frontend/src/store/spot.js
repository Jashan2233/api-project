import { csrfFetch } from "./csrf";

// Types
const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";
const CREATE_SPOT = "spot/createSpot";
const UPDATE_SPOT = "spot/updateSpot";
const CREATE_SPOT_IMAGE = "spot/createSpotImage";
const DELETE_SPOT = "spot/deleteSpot";

// ACTION!

const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
  };
};

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

// Thunks

//Get all Spots
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    let spots = await response.json();
    spots = spots.Spots;
    dispatch(getAllSpots(spots));
  }
};

//Get One Spot
export const getSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
    return spot;
  }
};
