import React from "react";
import GoogleBtn from "../oauth-btn/oauth-btn";

const Header = () => {
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
                  placeholder="Please signin to enable search"
                />
                <span className="input-group-btn">
                  <button className="btn btn-sm bg-light" id="search-button">
                    <i className="fas fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
          </form>
          <GoogleBtn />
        </div>
      </div>
    </div>
  );
};

export default Header;
