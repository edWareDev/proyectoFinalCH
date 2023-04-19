import { Router } from "express";
import { cartsRouter } from "./carts.router.js";
import { productsRouter } from "./products.router.js";

export const routerApi = Router();

routerApi.use('/products', productsRouter)
routerApi.use('/carts', cartsRouter)
