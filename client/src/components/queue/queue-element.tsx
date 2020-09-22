import React, { useContext } from "react";
import { player } from "../../App";
import { PlaybackContext } from "../../playback-context";

const QueueElement = (props: any) => {
  //const [isPlaying, setIsPlaying] = useState(false);
  // @ts-ignore
  const { data, setData } = useContext(PlaybackContext);
  const playTrack = (trackId: string) => {
    if (trackId) {
      player.playTrack(trackId);
      const updatedData = { ...data };
      updatedData.playerProperties.isPlaying = true;
      updatedData.playerProperties.currentTrackId = trackId;
      setData(updatedData);
    }
  };

  const pauseTrack = (trackId: string) => {
    if (trackId) {
      player.pauseTrack();
      const updatedData = { ...data };
      updatedData.playerProperties.isPlaying = false;
      updatedData.playerProperties.currentTrackId = null;
      setData(updatedData);
    }
  };
  return (
    <React.Fragment>
      {data && data.playerProperties !== undefined && (
        <React.Fragment>
          <div className="float-right m-l padder-h-sm">
            <a
              className="delete-track"
              onClick={() =>
                props.removeTrackFromQueue(props.song.getVideoId()!)
              }
            >
              <i className="fa fa-times-circle"></i>
            </a>
          </div>
          <span className="m-r-sm float-left padder-h-sm">
            <button
              className="playlist-play-btn player-attribute bg-light no-padder"
              data-attribute={props.song.getId()}
              onClick={() => playTrack(props.song.getVideoId()!)}
              hidden={data.playerProperties.isPlaying && (data.playerProperties.currentTrackId === props.song.getVideoId())}
            >
              <i className="fas fa-play"></i>
            </button>
            <button
              className="playlist-pause-btn player-attribute bg-light no-padder"
              onClick={() => pauseTrack(props.song.getVideoId())}
              hidden={!data.playerProperties.isPlaying || (data.playerProperties.currentTrackId !== props.song.getVideoId())}
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
      )}
    </React.Fragment>
  );
};

export default QueueElement;
