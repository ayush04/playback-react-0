import React, { useState } from "react";
import GoogleBtn from "../oauth-btn/oauth-btn";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const handleLogin = (data: any) => {
    setIsLoggedIn(true);
    setAccessToken(data.accessToken);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken("");
  };
  return (
    <div>
      <div className="navbar-top bg-white">
        <div className="navbar-header bg-black">
          <a className="navbar-brand txt-lt" href="/">
            <span>Playback</span>
          </a>
        </div>
        <div className="navbar-main padder-v-m bg-white">
          <form
            className="navbar-form m-t-sm m-b-sm float-left"
            id="search-form"
          >
            <div className="form-group">
              <div className="input-group w-md">
                <input
                  type="text"
                  id="search-bar"
                  className="no-border bg-light form-control input-sm"
                  placeholder={!isLoggedIn ? "Please signin to enable search" : "Search songs and artists"}
                  disabled={!isLoggedIn}
                />
                <span className="input-group-btn">
                  <button className="btn btn-sm bg-light" id="search-button">
                    <i className="fas fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
          </form>
          <GoogleBtn login={handleLogin} logout={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Header;
