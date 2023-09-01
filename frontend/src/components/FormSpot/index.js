import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpotThunk, createSpotImageThunk } from "../../store/spot";
import { useHistory } from "react-router-dom";

import "./FormSpot.css";

const FormCreation = ({ spot }) => {
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  // const [lat, setLat] = useState(1);
  // const [lng, setLng] = useState(1);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!currentUser) {
    history.push("/");
  }

  useEffect(() => {
    const errors = {};
    if (!country || !String(country)) errors.country = "Country is required";
    if (country.length < 5 || country.length > 50)
      errors.country = "Please enter a valid country";

    if (!address) errors.address = "Address is required";
    if (address.length < 10 || address.length > 250)
      errors.address = "Please enter a valid address";

    if (!city) errors.city = "City is required";
    if (city.length < 5 || city.length > 50)
      errors.city = "Please enter a valid city";

    if (!state) errors.state = "State is required";
    if (state.length < 5 || state.length > 50)
      errors.state = "Please enter a valid state";

    if (!description) errors.description = "Description is required";
    if (description.length < 30)
      errors.description = "Description needs a minimum of 30 characters";

    if (!name) errors.name = "Name is required";
    if (name.length < 5 || name.length > 50)
      errors.name = "Please enter a valid name";

    if (!price || !Number(price)) errors.price = "Price is required";

    if (!image.trim()) {
      errors.image = "Preview image is required";
    } else if (
      !image.endsWith(".jpg") &&
      !image.endsWith(".jpeg") &&
      !image.endsWith(".png")
    ) {
      errors.image = "Image URL must end in .png, .jpg, or .jpeg";
    }

    setValidationErrors(errors);
  }, [
    country,
    address,
    city,
    state,
    description,
    name,
    price,
    image,
    img2,
    img3,
    img4,
    img5,
  ]);
  const onSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (!Object.values(validationErrors).length) {
      const payload = {
        address,
        address,
        city,
        state,
        country,
        name,
        description,
        price,
        lat: 15,
        lng: 10,
      };
      const images = [image, img2, img3, img4, img5];

      const newSpot = await dispatch(createSpotThunk(payload, images));
      history.push(`/spots/${newSpot.id}`);
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="spot-form">
          <form onSubmit={onSubmit}>
            <div className="top-info">
              <h2>Create a new Spot</h2>
              <h3>Where's your place located?</h3>
              <p>
                Guests will only get your exact address once they have a
                booking.
              </p>
            </div>
            <div className="country-label"></div>
            <label className="form-labels">
              <div className="type-label" id="ct-label">
                Country
              </div>
              {validationErrors.country && submitted && (
                <p className="errors">{validationErrors.country}</p>
              )}
              <input
                id="form-country"
                placeholder="Country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            {/* {validationErrors.country && submitted && <p className="errors">{validationErrors.country}</p>} */}
            <label className="form-labels">
              <div className="type-label" id="addy">
                Street Address
              </div>
              {validationErrors.address && submitted && (
                <p className="errors">{validationErrors.address}</p>
              )}
              <input
                id="form-address"
                placeholder="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            {/* {validationErrors.address && submitted && <p className="errors">{validationErrors.address}</p>} */}
            <div className="city-state">
              <label className="form-labels" id="city-label">
                <div className="cs-labels">City</div>
                {validationErrors.city && submitted && (
                  <p className="errors">{validationErrors.city}</p>
                )}
                <input
                  id="form-city"
                  placeholder="City"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              {/* {validationErrors.city && submitted && <p className="errors">{validationErrors.city}</p>} */}
              <label className="form-labels" id="state-label">
                <div className="cs-labels">State</div>
                {validationErrors.state && submitted && (
                  <p className="errors">{validationErrors.state}</p>
                )}
                <input
                  id="form-state"
                  placeholder="State"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </label>
              {/* {validationErrors.state && submitted && <p className="errors">{validationErrors.state}</p>} */}
            </div>
            <div className="form-words">
              <h3>Describe your place to guests</h3>
              <p>
                Mention the best features of your space, any special amenities
                like fast wifi or parking, and what you love about the
                neighborhood.
              </p>
            </div>
            <label className="form-labels" id="descrip-label">
              <textarea
                rows="5"
                cols="50"
                id="form-description"
                placeholder="Please write at least 30 characters"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {validationErrors.description && submitted && (
                <p className="errors">{validationErrors.description}</p>
              )}
            </label>
            {/* {validationErrors.description && submitted && <p className="errors">{validationErrors.description}</p>} */}
            <div className="form-words">
              <h3>Create a title for your spot</h3>
              <p>
                Catch guests' attention with a spot title that highlights what
                makes your place special.
              </p>
            </div>
            <label className="form-labels" id="name-label">
              <input
                id="form-name"
                placeholder="Name of your spot"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {validationErrors.name && submitted && (
                <p className="errors">{validationErrors.name}</p>
              )}
            </label>
            {/* {validationErrors.name && submitted && <p className="errors">{validationErrors.name}</p>} */}
            <div className="form-words">
              <h3>Set a base price for your spot</h3>
              <p>
                Competitive pricing can help your listing stand out and rank
                higher in search results.
              </p>
            </div>
            <label className="form-labels" id="price-label">
              <input
                id="form-price"
                placeholder="Price per night (USD)"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {validationErrors.price && submitted && (
                <p className="errors">{validationErrors.price}</p>
              )}
            </label>
            {/* {validationErrors.price && submitted && <p className="errors">{validationErrors.price}</p>} */}
            <div className="form-words">
              <h3>Liven up your spot with photos</h3>
              <p>Submit a link to at least one photo to publish your spot</p>
            </div>
            <label className="img-link-box">
              <input
                className="form-pic"
                placeholder="Preview Image URL"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              {validationErrors.image && submitted && (
                <p className="errors">{validationErrors.image}</p>
              )}
              <input
                className="form-pic"
                placeholder="Image URL"
                type="text"
                value={img2}
                onChange={(e) => setImg2(e.target.value)}
              />
              <input
                className="form-pic"
                placeholder="Image URL"
                type="text"
                value={img3}
                onChange={(e) => setImg3(e.target.value)}
              />
              <input
                className="form-pic"
                placeholder="Image URL"
                type="text"
                value={img4}
                onChange={(e) => setImg4(e.target.value)}
              />
              <input
                className="form-pic"
                placeholder="Image URL"
                type="text"
                value={img5}
                onChange={(e) => setImg5(e.target.value)}
              />
            </label>
            <div className="cushion">
              <button type="submit" id="spot-create">
                Create Spot
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormCreation;
