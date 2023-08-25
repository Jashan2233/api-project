import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  const loginStyle =
    (!email &&
      !username &&
      !firstName &&
      !lastName &&
      !password &&
      !confirmPassword) ||
    username.length < 4 ||
    password.length < 6
      ? { backgroundColor: "white", boxShadow: "3px 3px 3px grey" }
      : {
          backgroundColor: "red",
          color: "white",
          boxShadow: "3px 3px 3px grey",
        };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.confirmPassword && (
          <p className="signup-errors">{errors.confirmPassword}</p>
        )}
        {errors.password && <p className="signup-errors">{errors.password}</p>}
        {errors.lastName && <p className="signup-errors">{errors.lastName}</p>}
        {errors.firstName && (
          <p className="signup-errors">{errors.firstName}</p>
        )}
        {errors.username && <p className="signup-errors">{errors.username}</p>}
        {errors.email && <p className="signup-errors">{errors.email}</p>}
        <label>
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          id="sign-up-btn"
          type="submit"
          style={loginStyle}
          disable={
            (!email &&
              !username &&
              !firstName &&
              !lastName &&
              !password &&
              !confirmPassword) ||
            username.length < 4 ||
            password.length < 6
          }
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormPage;
