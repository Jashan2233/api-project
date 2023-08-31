import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./UserSpot.css";
import { getAllSpotsThunk } from "../../store/spot";
import { NavLink, useHistory } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import OpenModalButton from "../OpenModalButton";

const UserSpot = () => {
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.allSpots);
  const allSpots = Object.values(spots);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  const userSpots = allSpots.filter((spot) => {
    return spot.ownerId === user.id;
  });

  //If there is no User
  if (!user) {
    history.push("/");
    console.log("Please log in!");
  }

  const renderCreateSpotButton = userSpots.length === 0;

  return (
    <>
      <div className="manage">
        <h2>Manage Spots</h2>
        {renderCreateSpotButton && (
          <div id="new-spot-manage">
            <NavLink id="manage-spot-button" to="/spots/new">
              Create a new Spot
            </NavLink>
          </div>
        )}
      </div>
      <div className="manage-spots-grid">
        {userSpots.map((spot) => (
          <div key={spot.id}>
            <>
              <NavLink to={`/spots/${spot.id}`}>
                <div className="spot-card">
                  <img
                    id="spot-card-img"
                    src={`${spot.previewImage}`}
                    alt="img"
                  />
                  <div className="manage-review">
                    <div className="manage-city">
                      {spot.city}, {spot.state}
                    </div>
                    {spot.avgRating ? (
                      <div className="review">
                        <b> {parseFloat(spot.avgRating).toFixed(1)}</b>
                      </div>
                    ) : (
                      <div className="review">
                        <b>New</b>
                      </div>
                    )}
                  </div>
                  <div className="price">
                    <b>${spot.price}</b> night
                  </div>
                </div>
              </NavLink>
              <div className="update-delete-button">
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`/spots/${spot.id}/edit`}
                  id="update-button"
                >
                  Update
                </NavLink>
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteModal spotId={spot.id} />}
                />
              </div>
            </>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserSpot;
