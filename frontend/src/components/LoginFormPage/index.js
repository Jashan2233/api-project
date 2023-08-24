// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const loginStyle =
    credential.length >= 5 && password.length >= 6
      ? { backgroundColor: "red", color: "white" }
      : { backgroundColor: "white" };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors.credential && <p id="wrong-password">{errors.credential}</p>}
        <label>
          <input
            className="modal-bars"
            placeholder="     Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="modal-bars"
            placeholder="             Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* {errors.credential && (
          <p>{errors.credential}</p>
        )} */}
        <button
          className="modal-buttons"
          type="submit"
          style={loginStyle}
          disabled={!credential.length >= 4 || !password.length >= 6}
        >
          Log In
        </button>
      </form>
    </>
  );
}

export default LoginFormPage;
