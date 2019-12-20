import React, { useState } from "react";
import axios from "axios";

const Login = () => {
const [formValues, setFormValues] = useState({
  username: "Lambda School",
  password: "i<3Lambd4"
});
const [error, setError] = useState(null);

const handleChange = event => {
  setFormValues({
    ...formValues,
    [event.target.name]: event.target.value
  });
};

const handleSubmit = evt => {
  evt.preventDefault();
  axios
    .post("http://localhost:5000/api/login", formValues)
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      // props.history.push("/friends");
    })
    .catch(error => {
      console.log(error);
      setError(error);
    });
};

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={formValues.username}
          />
        </div>
        <div>
          Password
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formValues.password}
          />
        </div>
        {error ? <p>Invalid Password. Retry!</p> : null}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
