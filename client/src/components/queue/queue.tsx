import React, { useContext } from "react";
import { Song } from "../../models/song";
import { Queue as QueueService } from "../../services/queue";
import { PlaybackContext } from "../../playback-context";
import QueueElement from "./queue-element";

const Queue = (props: any) => {
  const removeTrackFromQueue = (trackId: string) => {
    if (trackId) {
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
            <QueueElement song={song} removeTrackFromQueue={removeTrackFromQueue} />
          </li>
        ))}
    </ul>
  );
};

export default Queue;
