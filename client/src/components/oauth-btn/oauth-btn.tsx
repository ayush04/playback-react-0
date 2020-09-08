import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Authentication } from "../../services/authentication";

const CLIENT_ID: string =
  "897342243120-5gqs1rne58kd214i5q81dof7g2kafvqi.apps.googleusercontent.com";

const GoogleBtn = ({login, logout}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(Authentication.isAuthenticated());

  const logoutUser = (): void => {
    setIsLoggedIn(false);
    logout();
  };

  const loginUser = (response: any): void => {
    if (response.accessToken) {
      setIsLoggedIn(true);
      login(response);
      console.log(response.profileObj);
    }
  };

  const handleLoginFailure = (): void => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = (): void => {
    alert("Failed to log out");
  };
  return (
    <div className="float-right">
      {isLoggedIn ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={logoutUser}
          onFailure={handleLogoutFailure}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={loginUser}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      )}
    </div>
  );
};

export default GoogleBtn;
