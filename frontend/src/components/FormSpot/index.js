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
};

const [country, setCountry] = useState("");
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [description, setDescription] = useState("");
const [name, setName] = useState("");
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
  if (!country) errors.country = "Country is required";
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
};
