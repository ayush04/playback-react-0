import { RequestHandler, Request, Response } from 'express';
import { Song } from '../models/song';
import { Playlist } from '../models/playlist';
import { randomNumber } from '../utils/utils';

const CURRENTLY_PLAYING = new Map<String, number>();

export const saveSong: RequestHandler = (req: Request, res: Response) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const artistName = req.body.artistName;
    const thumbnail = req.body.thumbnail;
    const videoId = req.body.videoId;

    const song = new Song({
        id,
        title,
        description,
        artistName,
        thumbnail,
        videoId
    });

    song.save().then(response => {
        return res.status(201).json(response);
    })
    .then(err => {
        return res.status(400).json({
            error: err
        });
    });
}

export const getSong: RequestHandler = (req: Request, res: Response) => {
    const id = req.params.id;

    Song.find({ id: id }).then(song => {
        return res.status(200).json(song);
    })
    .then(err => {
        return res.status(400).json({
            error: err
        });
    });
}

export const createPlaylist: RequestHandler = (req: Request, res: Response) => {
    const playListName = req.params.name;
    const songArr = req.body.songs;

    const playList = new Playlist({
        id: randomNumber(),
        name: playListName,
        createdBy: '1',
        songs: songArr
    });

    playList.save().then(response => {
        return res.status(201).json(response);
    })
    .catch(err => {
        return res.status(400).json({
            error: err
        });    
    });
}

export const addSongToPlaylist: RequestHandler = (req: Request, res: Response) => {
    const songArr = req.body.songs;
    const playListId = req.params.id;

    Playlist.findOneAndUpdate({ id: playListId }, {"$push": {"songs": songArr} }).then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        return res.status(400).json({
            error: err
        });    
    });
}

export const removeSongFromPlaylist: RequestHandler = (req: Request, res: Response) => {
    const songId = req.params.songId;
    const playlistId = req.params.id;

    Playlist.findOneAndUpdate({ id: playlistId }, { "$pull": { "songs": songId } }).then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        return res.status(400).json({
            error: err
        });    
    });
}

export const getPlaylist: RequestHandler = (req: Request, res: Response) => {
    const playlistId = req.params.id;

    Playlist.find({ id: playlistId })
        .then(playlist => {
            return res.status(200).json(playlist);
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            })
        });
}

export const addCurrentlyPlaying: RequestHandler = (req: Request, res: Response) => {
    const songId = req.params.id;

    let number = 1;
    if (CURRENTLY_PLAYING.has(songId)) {
        number = CURRENTLY_PLAYING.get(songId)! + number;
    }
    CURRENTLY_PLAYING.set(songId, number);
    return res.status(201).json({
        songId: songId,
        currentlyPlaying: number
    });
}

export const removeCurrentlyPlaying: RequestHandler = (req: Request, res: Response) => {
    const songId = req.params.id;

    if (CURRENTLY_PLAYING.has(songId)) {
        let number = CURRENTLY_PLAYING.get(songId);
        if (number === 1) {
            CURRENTLY_PLAYING.delete(songId);
        }
        else {
            CURRENTLY_PLAYING.set(songId, number! - 1);
        }
        return res.status(200).json({
            currentlyPlaying: number! - 1
        });
    }
    else {
        return res.status(400).json({
            error: 'Song ' + songId + ' is not currently playing'
        });
    }
}

export const getAllCurrentlyPlayingSongs: RequestHandler = (req: Request, res: Response) => {
    const currentlyPlaying: String[] = [];
    CURRENTLY_PLAYING.forEach((value, key) => { 
        console.log(value + ' :: ' + key);
        currentlyPlaying.push(key);
    });
    
    return res.status(200).json({
        songs: currentlyPlaying
    });
}