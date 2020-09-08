import React, { useContext } from "react";
import { PlaybackContext } from "../../playback-context";
import { Song } from "../../models/song";

const SearchResults = () => {
  // @ts-ignore
  const { data } = useContext(PlaybackContext);
  console.log(data);

  return (
    <React.Fragment>
      {data &&
        data.searchData &&
        data.searchData.map((song: Song) => (
          <div className="col-xs-4 col-sm-3 col-md-3 col-lg-2">
            <div className="item">
              <div className="pos-rlt">
                <div className="item-overlay bg-black-opacity">
                  <div className="center text-center w-full m-t-n">
                    <a
                      href=""
                      className="playLink"
                      data-attribute={song.getId()}
                      data-attribute-action="play"
                    >
                      <i className="fa fa-2x fa-play-circle text-white m-r-sm"></i>
                    </a>
                    <a
                      href=""
                      className="playLink"
                      data-attribute={song.getId()}
                      data-attribute-action="queue"
                    >
                      <i className="fa fa-2x fa-arrow-alt-circle-down text-white"></i>
                    </a>
                  </div>
                </div>
                <div className="r-2x">
                  <a>
                    <img className="img-fluid" src={song.getThumbnail()} />
                  </a>
                </div>
              </div>
              <div className="p-2 text-center text-muted text-ellipsis">
                {song.getTitle()}
              </div>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};

export default SearchResults;
