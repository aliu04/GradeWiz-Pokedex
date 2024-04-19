import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate()
  const { login, register, logout, isLoading, isAuthenticated, user } = useKindeAuth();

  function handleHome() {
    navigate('/');
  }


  return (
    <>

      {!isLoading && !isAuthenticated && (
        <div>
          <button onClick={register} type="button">Register</button>
          <button onClick={login} type="button">Log In</button>
        </div>
      )}

      {!isLoading && isAuthenticated && (
        <div>
          <h1> User Information </h1>
          <p>Email: {user?.email}</p>
          <p>Name: {user?.given_name}</p>
          <button
            onClick={() => handleHome()}
            type="button"
          >
            Home
          </button>
          <button
            onClick={() => logout()}
            type="button" >
            Log out
          </button>
        </div>

      )}
      {isLoading && (
        <div>Loading...</div>
      )}

    </>
  );

}
