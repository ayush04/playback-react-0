import { Song } from "../models/song";
import { Playlist } from "./playlist";
import { Queue } from "./queue";
import Search from "./search";
import { player } from '../App';

export const getSongFromId = (data: Song[], songId: string): Song | null => {
  return Song.getSongFromList(data, songId);
};
export const playSong = (song: Song, action: string): void => {
  Playlist.getSong(song.getId()).then((savedSong) => {
    if (savedSong && savedSong.length > 0) {
      song.setVideoId(savedSong[0].videoId);
      if (action === "play") {
        player.queueAndPlay(song);
      } else {
        Queue.queue(song);
      }
    } else {
      // fetch videoId and save song
      Search.youTubeSearch(song.getTitle() + " " + song.getArtistName()).then(
        (videoId) => {
          //const action = element.getAttribute('data-attribute-action');
          if (videoId) {
            song.setVideoId(videoId);
            if (action === "play") {
              player.queueAndPlay(song);
            } else {
              Queue.queue(song);
            }
            Playlist.saveSong(song)
              .then(() => console.log("Song saved"))
              .catch((err) => console.log(err));
            console.log(Queue.getCurrentQueue());
          } else {
            console.log("Invalid song ID : ", song.getId());
          }
        }
      );
    }
  });
};
