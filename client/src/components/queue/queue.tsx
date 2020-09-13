import React from "react";
import { Song } from "../../models/song";
import { Queue as QueueService } from '../../services/queue';
const Queue = () => {
  console.log('test');
  return (
    <ul className="list-group no-border" id="playlist">
      {QueueService.getCurrentQueue() && QueueService.getCurrentQueue().map((el: Song) => (
        <li
          className="list-group-item no-border no-padder padder-h-sm"
          key={el.toString()}
        >
          <div className="float-right m-l padder-h-sm">
            <a className="delete-track" data-attribute="{{id}}">
              <i className="fa fa-times-circle"></i>
            </a>
          </div>
          <span className="m-r-sm float-left padder-h-sm">
            <button
              className="playlist-play-btn player-attribute bg-light no-padder"
              data-attribute="{{id}}"
            >
              <i className="fas fa-play"></i>
            </button>
            <button className="playlist-pause-btn player-attribute bg-light no-padder hidden">
              <i className="fas fa-pause"></i>
            </button>
          </span>
          <div className="clear">
            <span className="float-left thumb-sm m-r m-t-xs">
              <img src="{{thumbnail}}" alt="..." className="r" />
            </span>
            <span className="title text-ellipsis"></span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Queue;
