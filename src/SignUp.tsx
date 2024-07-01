import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");
  const [isUserCreated, setIsUserCreated] = useState<boolean>(false);
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/create`;
    if (username.length === 0) return;
    const signInContent = {
      username,
      name,
      email,
      password,
      password_confirmation: password_confirmation,
    };
    // const token = document
    //   .querySelector('meta[name="csrf-token"]')
    //   ?.getAttribute("content");
    fetch(url, {
      method: "POST",
      headers: {
        // "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInContent),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Username already exists");
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setIsUserCreated(true);
        setTimeout(() => {
          navigate(`/forumThreads`);
        }, 2000);
      })
      .catch((error) => console.log(error.message));
  };

  function displaySucessfullyCreatedAccountAlert() {
    if (isUserCreated === false) {
      return;
    } else {
      return (
        <div className="alert alert-success" role="alert">
          Sucessfully created account! Redirecting to posts, please sign in...
        </div>
      );
    }
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Sign Up</h1>

          {displaySucessfullyCreatedAccountAlert()}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                id="username"
                className="form-control"
                required
                onChange={(event) => onChange(event, setUsername)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                required
                onChange={(event) => onChange(event, setName)}
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                required
                onChange={(event) => onChange(event, setEmail)}
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                required
                onChange={(event) => onChange(event, setPassword)}
              />
            </div>
            {/* Password confimation Field */}
            <div className="form-group">
              <label htmlFor="password">Password Confirmation</label>
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                className="form-control"
                required
                onChange={(event) => onChange(event, setPasswordConfirmation)}
              />
            </div>
            <button type="submit" className="btn btn-dark mt-3">
              Sign Up
            </button>
            <Link to="/forumThreads" className="btn btn-dark mt-3 ">
              Back to posts
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;