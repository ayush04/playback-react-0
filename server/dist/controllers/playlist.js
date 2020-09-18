"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const song_1 = require("../models/song");
const playlist_1 = require("../models/playlist");
const utils_1 = require("../utils/utils");
const CURRENTLY_PLAYING = new Map();
exports.saveSong = (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const artistName = req.body.artistName;
    const thumbnail = req.body.thumbnail;
    const videoId = req.body.videoId;
    const song = new song_1.Song({
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
};
exports.getSong = (req, res) => {
    const id = req.params.id;
    song_1.Song.find({ id: id }).then(song => {
        return res.status(200).json(song);
    })
        .then(err => {
        return res.status(400).json({
            error: err
        });
    });
};
exports.createPlaylist = (req, res) => {
    const playListName = req.params.name;
    const songArr = req.body.songs;
    const playList = new playlist_1.Playlist({
        id: utils_1.randomNumber(),
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
};
exports.addSongToPlaylist = (req, res) => {
    const songArr = req.body.songs;
    const playListId = req.params.id;
    playlist_1.Playlist.findOneAndUpdate({ id: playListId }, { "$push": { "songs": songArr } }).then(response => {
        return res.status(200).json(response);
    })
        .catch(err => {
        return res.status(400).json({
            error: err
        });
    });
};
exports.removeSongFromPlaylist = (req, res) => {
    const songId = req.params.songId;
    const playlistId = req.params.id;
    playlist_1.Playlist.findOneAndUpdate({ id: playlistId }, { "$pull": { "songs": songId } }).then(response => {
        return res.status(200).json(response);
    })
        .catch(err => {
        return res.status(400).json({
            error: err
        });
    });
};
exports.getPlaylist = (req, res) => {
    const playlistId = req.params.id;
    playlist_1.Playlist.find({ id: playlistId })
        .then(playlist => {
        return res.status(200).json(playlist);
    })
        .catch(err => {
        return res.status(400).json({
            error: err
        });
    });
};
exports.addCurrentlyPlaying = (req, res) => {
    const songId = req.params.id;
    let number = 1;
    if (CURRENTLY_PLAYING.has(songId)) {
        number = CURRENTLY_PLAYING.get(songId) + number;
    }
    CURRENTLY_PLAYING.set(songId, number);
    return res.status(201).json({
        songId: songId,
        currentlyPlaying: number
    });
};
exports.removeCurrentlyPlaying = (req, res) => {
    const songId = req.params.id;
    if (CURRENTLY_PLAYING.has(songId)) {
        let number = CURRENTLY_PLAYING.get(songId);
        if (number === 1) {
            CURRENTLY_PLAYING.delete(songId);
        }
        else {
            CURRENTLY_PLAYING.set(songId, number - 1);
        }
        return res.status(200).json({
            currentlyPlaying: number - 1
        });
    }
    else {
        return res.status(400).json({
            error: 'Song ' + songId + ' is not currently playing'
        });
    }
};
exports.getAllCurrentlyPlayingSongs = (req, res) => {
    const currentlyPlaying = [];
    CURRENTLY_PLAYING.forEach((value, key) => {
        console.log(value + ' :: ' + key);
        currentlyPlaying.push(key);
    });
    return res.status(200).json({
        songs: currentlyPlaying
    });
};
//# sourceMappingURL=playlist.js.map