import React, { useRef, useLayoutEffect, useContext, useEffect } from "react";
import "./App.css";
import "./assets/styles/app.scss";
import Header from "./components/header/header";
import { Player as YTPlayer } from "./services/player";
import Queue from "./components/queue/queue";
import { Queue as QueueService } from "./services/queue";
import SearchResults from "./components/search-results/search-results";
import Player from "./components/player/player";
import { PlaybackContext } from "./playback-context";
import { Song } from "./models/song";

export let player: YTPlayer;

function App() {
  // @ts-ignore
  const { data, setData } = useContext(PlaybackContext);
  const playerRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    player = YTPlayer.getInstance("#" + playerRef.current?.id!);
  });

  useEffect(() => {
    QueueService.initalize();
    handleQueueUpdate();
  }, []);

  const handleQueueUpdate = () => {
    let currentQueue: Song[] = QueueService.getCurrentQueue();
    let updatedData = { ...data };
    updatedData.queueData = currentQueue;
    setData(updatedData);
  };

  return (
    <div className="App">
      <Header />
      <div id="player" ref={playerRef}></div>
      <div className="app-content">
        <div className="app-content-body">
          <div className="h-box">
            <div className="col wrapper-lg">
              <h3 className="font-weight-light mt-2 mb-3">Title</h3>
              <div className="row row-cols-sm-1" id="search-results">
                <SearchResults onQueueingSong={handleQueueUpdate} />
              </div>
            </div>
            <div className="col w-md bg-light">
              <div className="wrapper-sm">
                <div className="text-black-50 text-muted">
                  Playlist
                  <a
                    className="float-right"
                    title="Save playlist"
                    id="save-playlist"
                  >
                    <i className="fas fa-cloud-upload-alt"></i>
                  </a>
                </div>
                <Queue onSongDelete={handleQueueUpdate}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="app-footer fixed-bottom">
        <Player />
      </div>
    </div>
  );
}

export default App;
