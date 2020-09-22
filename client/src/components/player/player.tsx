import React, { useContext } from "react";
import { player } from "../../App";
import { PlaybackContext } from "../../playback-context";

const Player = () => {
  // @ts-ignore
  const { data, setData } = useContext(PlaybackContext);
  const handlePlay = () => {
    const updatedData = { ...data };
    updatedData.playerProperties.isPlaying = true;
    setData(updatedData);
    player.playTrack();
  };

  const handlePause = () => {
    const updatedData = { ...data };
    updatedData.playerProperties.isPlaying = false;
    setData(updatedData);
    player.pauseTrack();
  };
  return (
    <React.Fragment>
      {data && data.playerProperties !== undefined && (
        <div className="container-fluid bg-light wrapper-sm">
          <div className="player">
            <div className="player-controls">
              <button
                className="player-attribute"
                id="previous-button"
                onClick={() => player.previousTrack()}
              >
                <i className="fas fa-backward"></i>
              </button>
              <button
                className="player-attribute"
                id="play-button"
                onClick={() => handlePlay()}
                hidden={data.playerProperties.isPlaying}
              >
                <i className="fas fa-play"></i>
              </button>
              <button
                className="player-attribute"
                id="pause-button"
                onClick={() => handlePause()}
                hidden={!data.playerProperties.isPlaying}
              >
                <i className="fas fa-pause"></i>
              </button>
              <button
                className="player-attribute"
                id="next-button"
                onClick={() => player.nextTrack()}
              >
                <i className="fas fa-forward"></i>
              </button>
              <div className="col-md-8 inline-block">
                <div className="track-data">
                  <span id="elapsed-time"></span>
                </div>
                <div className="col-md-9 track-data ellipsis">
                  <span id="title"></span>
                </div>
                <div className="track-data">
                  <span id="total-time"></span>
                </div>
              </div>
              <div className="inline-block float-right">
                <button className="player-attribute" id="next-button">
                  <i className="fas fa-random"></i>
                </button>
                <button className="player-attribute" id="next-button">
                  <i className="fas fa-retweet"></i>
                </button>
                <button className="player-attribute" id="vol-up">
                  <i className="fas fa-volume-up"></i>
                </button>
                <button className="player-attribute hidden" id="vol-mute">
                  <i className="fas fa-volume-mute"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Player;
