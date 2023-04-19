import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../config/database.js";

export async function conectar() {
    await mongoose.connect(MONGODB_CNX_STR)
    console.log(`Base de Datos Conectada a la ruta ${MONGODB_CNX_STR}`);
}