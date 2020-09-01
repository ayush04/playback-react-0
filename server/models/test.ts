import { Schema, model } from 'mongoose';

const testSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    value: {
        type: Object,
        required: true
    }
});

export const Test = model('Test', testSchema);