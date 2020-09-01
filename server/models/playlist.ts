import { Schema, model } from 'mongoose';

const playlistSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    songs: [String]
});

export const Playlist = model('Playlist', playlistSchema);