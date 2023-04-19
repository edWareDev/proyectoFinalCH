import mongoose from "mongoose";

export const schemaCarts = new mongoose.Schema({
    products: { type: Array, required: false }
}, { versionKey: false });
