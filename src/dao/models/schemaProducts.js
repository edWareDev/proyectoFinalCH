import mongoose from "mongoose";

export const schemaProducts = new mongoose.Schema({
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productStatus: { type: Boolean, required: true },
    productCategory: { type: String, required: true },
    productThumbnail: { type: Array, required: false },
    productCode: { type: String, required: true },
    productStock: { type: Number, required: true }
}, { versionKey: false });
