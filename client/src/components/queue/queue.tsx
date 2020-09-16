import React, { useContext } from "react";
import { Song } from "../../models/song";
import { Queue as QueueService } from "../../services/queue";
import { PlaybackContext } from '../../playback-context';

const Queue = (props: any) => {
  const removeTrackFromQueue = (trackId: string) => {
    if(trackId) {
      QueueService.deleteTrack(trackId).then(() => {
        props.onSongDelete();
      });
    }
  };
  // @ts-ignore
  const { data, setData } = useContext(PlaybackContext);

  return (
    <ul className="list-group no-border" id="playlist">
      {data.queueData &&
        data.queueData.map((song: Song) => (
          <li
            className="list-group-item no-border no-padder padder-h-sm"
            key={song.getId()}
          >
            <div className="float-right m-l padder-h-sm">
              <a className="delete-track" onClick={() => removeTrackFromQueue(song.getVideoId()!)}>
                <i className="fa fa-times-circle"></i>
              </a>
            </div>
            <span className="m-r-sm float-left padder-h-sm">
              <button
                className="playlist-play-btn player-attribute bg-light no-padder"
                data-attribute={song.getId()}
              >
                <i className="fas fa-play"></i>
              </button>
              <button className="playlist-pause-btn player-attribute bg-light no-padder hidden">
                <i className="fas fa-pause"></i>
              </button>
            </span>
            <div className="clear">
              <span className="float-left thumb-sm m-r m-t-xs">
                <img src={song.getThumbnail()} alt="..." className="r" />
              </span>
              <span className="title text-ellipsis">{song.getTitle()}</span>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Queue;
