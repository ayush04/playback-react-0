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
import { Utils } from "./services/utils";
import { StorageService } from "./services/storage";
import { Playlist } from "./services/playlist";

export let player: YTPlayer;

function App() {
  // @ts-ignore
  const { data, setData } = useContext(PlaybackContext);
  const playerRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    player = YTPlayer.getInstance("#" + playerRef.current?.id!);
    player.registerEventHandlers();
  }, []);

  useEffect(() => {
    QueueService.initalize();
    //handleQueueUpdate();
    const updatedData = { ...data };
    let currentQueue: Song[] = QueueService.getCurrentQueue();
    updatedData.queueData = currentQueue;
    updatedData.playerProperties = {};
    updatedData.playerProperties.isPlaying = false;
    setData(updatedData);
  }, []);

  const handleQueueUpdate = () => {
    let currentQueue: Song[] = QueueService.getCurrentQueue();
    const updatedData = { ...data };
    updatedData.queueData = currentQueue;
    setData(updatedData);
  };

  const savePlayList = (event: any) => {;
    event.preventDefault();
    if (!StorageService.get("CURRENT_PLAYLIST_ID")) {
      Playlist.savePlaylist(Utils.randomNumber(), QueueService.getCurrentSongIds(), data.userData.id)
        .then((response) => {
          console.log(response);
          if (response && response.id) {
            StorageService.save("CURRENT_PLAYLIST_ID", response.id);
          }
        })
        .catch((err) => console.log(err));
    } else {
      //TODO: Update playlist
    }
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
                    onClick={(event) => savePlayList(event)}
                  >
                    <i className="fas fa-cloud-upload-alt"></i>
                  </a>
                </div>
                <Queue onSongDelete={handleQueueUpdate} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="app-footer fixed-bottom">
        <div className="progress-bar-container">
            <div id="progress-bar" className="progress-bar progress-bar-animated progress-bar-striped"></div>
        </div>
        <Player />
      </div>
    </div>
  );
}

export default App;
