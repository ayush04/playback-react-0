import { Song } from "../models/song";
import { AppEvent } from './event';
import { Storage } from './storage';
import { Playlist } from "./playlist";

export class Queue {
    private static _queue: Array<Song>;
    private static _currentTrack = -1;

    static initalize() {
        Queue._queue = Queue._fetchPreviousQueue();
        AppEvent.emit('queue-updated');
    }
    private static _fetchPreviousQueue(): any {
        const value = Storage.get('CURRENT_QUEUE');
        const _tempQueue = new Array<Song>();
        if (value) {
            value.forEach((item: any) => {
                _tempQueue.push(new Song(item.id, item.title, item.description, item.artistName, item.thumbnail, item.videoId));
            });
        }
        return _tempQueue;
    }
    static queue(song: Song): void {
        Queue._queue.push(song);
        Playlist.addSongToPlaylist(song.getId());
        Storage.save('CURRENT_QUEUE', Queue._queue);
        AppEvent.emit('queue-updated');
    }

    static dequeue(): Song | undefined {
        const song = Queue._queue.shift();
        AppEvent.emit('queue-updated');
        Storage.save('CURRENT_QUEUE', Queue._queue);
        return song;
    }

    static next(): Song | undefined {
        if (Queue._queue[Queue._currentTrack + 1]) {
            return Queue._queue[++Queue._currentTrack];
        }
        return undefined;
    }

    static previous(): Song | undefined {
        if (Queue._queue[Queue._currentTrack - 1]) {
            return Queue._queue[--Queue._currentTrack];
        }
        return undefined;
    }

    static getCurrentQueue(): Array<Song> {
        return Queue._queue;
    }

    static getCurrentSongIds(): Array<String> {
        return Queue._queue.map(song => song.getId());
    }

    static updateCurrentPlayingTrack(trackId: string): void {
        Queue._currentTrack = Queue._queue.findIndex(song => song.getId() === trackId);
    }

    static getSongFromTrackId(trackId: string): Song {
        const song = Queue._queue.filter(song => song.getVideoId() === trackId);
        return song[0];
    }

    static deleteTrack(videoId: string): void {
        const pos = Queue._queue.findIndex(song => song.getVideoId() === videoId);
        const song = Queue._queue[pos];
        Queue._queue.splice(pos, 1);
        Playlist.removeSongFromPlaylist(song.getId());
        AppEvent.emit('queue-updated');
        Storage.save('CURRENT_QUEUE', Queue._queue);
    }
}