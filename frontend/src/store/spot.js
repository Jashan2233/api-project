import { csrfFetch } from "./csrf";

// TYPES
const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";
const CREATE_SPOT = "spot/createSpot";
const UPDATE_SPOT = "spot/updateSpot";
const CREATE_SPOT_IMAGE = "spot/createSpotImage";
const DELETE_SPOT = "spot/deleteSpot";

// ACTIONS
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

// ACTION THUNKS
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    let spots = await response.json();
    spots = spots.Spots;
    dispatch(getAllSpots(spots));
    return spots;
  }
};

export const getSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
    return spot;
  }
};

export const createSpotThunk = (spot, img) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const newSpot = await response.json();
    for (let i = 0; i < img.length; i++) {
      if (img[i]) {
        await csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: img[i],
            preview: true,
          }),
        });
      }
    }
    dispatch(createSpot(newSpot));
    return newSpot;
  }
};

export const updateSpotThunk = (spot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(updateSpot(spot));
    return spot;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSpot(spotId));
    // return true
  }
};

// INITIAL STATE
const initialState = { allSpots: {}, singleSpot: { SpotImages: [] } };

// REDUCER
const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      let allSpots = {};
      action.spots.forEach((spot) => (allSpots[spot.id] = spot));
      return { allSpots: { ...allSpots }, singleSpot: { ...state.singleSpot } };
    }
    case GET_SPOT: {
      let newState = { ...state, singleSpot: { ...state.singleSpot } }; //creates copy of state and the key we're going to change
      let oneSpot = {
        ...action.spot,
        SpotImages: [state.singleSpot.SpotImages],
      }; //spreads fetched spot data, and copies spot images (currently empty)
      action.spot.SpotImages.forEach((image, i) => {
        //iterates through fetched spot data and keys into images, iterates and assigns each image to empty spot images array
        oneSpot.SpotImages[i] = image;
      });
      newState.singleSpot = oneSpot; //reassigns spot/spot images into single spot in new copy
      return newState;
    }
    case CREATE_SPOT: {
      let singleSpot = {};
      singleSpot = { ...action.spot };
      let newState = { ...state, singleSpot };
      newState.allSpots[action.spot.id] = { ...action.spot };

      return newState;
    }
    case UPDATE_SPOT: {
      const newState = {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };

      newState.allSpots[action.spot.id] = {
        ...newState.allSpots[action.spotId],
        ...action.spot,
      };
    }
    case DELETE_SPOT: {
      const newState = {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      delete newState.allSpots[action.spotId];
      delete newState.singleSpot[action.spotId];
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
