import mongoose from "mongoose";

export const schemaChats = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Number, required: true },
}, { versionKey: false });
