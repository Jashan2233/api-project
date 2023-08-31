import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spot";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./Spot.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const allSpots = Object.values(spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="spots-container">
        {allSpots.map((spot) => (
          <NavLink to={`/spots/${spot.id}`}>
            <div className="ind-spot">
              <div className="tooltip">
                <img id="spot-img" src={`${spot.previewImage}`} alt="img" />
                <span className="tooltiptext">{spot.name}</span>
              </div>
              <div className="under-img">
                <div className="city">
                  {spot.city}, {spot.state}
                </div>
                {spot.avgRating ? (
                  <div className="review">
                    <b>
                      {" "}
                      <i class="fa-solid fa-star"></i>
                      {parseFloat(spot.avgRating).toFixed(1)}
                    </b>
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
        ))}
      </div>
    </>
  );
};

export default Spots;
