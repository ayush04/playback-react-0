import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID: string =
  "897342243120-5gqs1rne58kd214i5q81dof7g2kafvqi.apps.googleusercontent.com";

const GoogleBtn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const logout = (): void => {
    setIsLoggedIn(false);
    setAccessToken("");
  };

  const login = (response: any): void => {
    if (response.accessToken) {
      setIsLoggedIn(true);
        setAccessToken(response.accessToken);
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
    <div>
      {isLoggedIn ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      )}
      {accessToken ? (
        <h5>
          Your Access Token: <br />
          <br /> {accessToken}
        </h5>
      ) : null}
    </div>
  );
};

export default GoogleBtn;