import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    isLoggedIn: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const User = model('User', userSchema);