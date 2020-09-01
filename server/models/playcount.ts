import { Schema, model } from 'mongoose';

const playcountSchema = new Schema({
    songId: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

export const Playcount = model('Playcount', playcountSchema);