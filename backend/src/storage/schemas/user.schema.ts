import mongoose from 'mongoose';

const { Schema } = mongoose;

export const user_list = new Schema({
    username: {
        type: String,
        unique: [true, 'username must be unique'],
        required: true
    },
    email: {
        type: String,
        unique: [true, 'email must be unique'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
    hidden: Boolean,
});

