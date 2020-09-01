import { Schema, model } from 'mongoose';

const songSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: false
    }
});

export const Song = model('Song', songSchema);