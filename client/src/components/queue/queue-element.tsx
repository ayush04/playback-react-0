import React, { useState } from "react";
import { player } from "../../App";

const QueueElement = (props: any) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (trackId: string) => {
    if (trackId) {
      player.playTrack(trackId);
      setIsPlaying(true);
    }
  };

  const pauseTrack = (trackId: string) => {
    if (trackId) {
      player.pauseTrack();
      setIsPlaying(false);
    }
  };
  return (
    <React.Fragment>
      <div className="float-right m-l padder-h-sm">
        <a
          className="delete-track"
          onClick={() => props.removeTrackFromQueue(props.song.getVideoId()!)}
        >
          <i className="fa fa-times-circle"></i>
        </a>
      </div>
      <span className="m-r-sm float-left padder-h-sm">
        <button
          className="playlist-play-btn player-attribute bg-light no-padder"
          data-attribute={props.song.getId()}
          onClick={() => playTrack(props.song.getVideoId()!)}
          hidden={isPlaying}
        >
          <i className="fas fa-play"></i>
        </button>
        <button
          className="playlist-pause-btn player-attribute bg-light no-padder"
          onClick={() => pauseTrack(props.song.getVideoId())}
          hidden={!isPlaying}
        >
          <i className="fas fa-pause"></i>
        </button>
      </span>
      <div className="clear">
        <span className="float-left thumb-sm m-r m-t-xs">
          <img src={props.song.getThumbnail()} alt="..." className="r" />
        </span>
        <span className="title text-ellipsis">{props.song.getTitle()}</span>
      </div>
    </React.Fragment>
  );
};

export default QueueElement;
