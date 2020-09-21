import React, { useState, useContext } from "react";
import GoogleBtn from "../oauth-btn/oauth-btn";
import { Authentication } from "../../services/authentication";
import Search from "../../services/search";
import { Song } from "../../models/song";
import { PlaybackContext } from "../../playback-context";
import { User } from "../../services/user";
import { User as UserModel } from "../../models/user";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Authentication.isAuthenticated()
  );
  const [accessToken, setAccessToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({});

  // @ts-ignore
  const { data, setData } = useContext(PlaybackContext);
  const handleLogin = (loginData: any) => {
    setIsLoggedIn(true);
    setAccessToken(loginData.accessToken);
    Authentication.loadGAPIClient();
    const userObj = new UserModel(
      loginData.profileObj.googleId,
      loginData.profileObj.email,
      loginData.profileObj.name,
      loginData.profileObj.imageUrl
    );
    userObj.setIsLoggedIn(true);
    User.updateLoginStatus(userObj);
    setUser(userObj);
    let updatedData = {...data};
    updatedData.userData = userObj;
    setData(updatedData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken("");
    // @ts-ignore
    User.updateLoginStatus(user);
  };

  const search = (event: any) => {
    event.preventDefault();
    Search.search(searchTerm).then((response: Array<Song>) => {
      let updatedData = { ...data };
      updatedData.searchData = response;
      setData(updatedData);
    });
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
                  placeholder={
                    !isLoggedIn
                      ? "Please signin to enable search"
                      : "Search songs and artists"
                  }
                  disabled={!isLoggedIn}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-sm bg-light"
                    onClick={(event) => search(event)}
                  >
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
