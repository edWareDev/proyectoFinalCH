import { Router } from "express";
import { productsManager } from "../dao/mongoose.products.manager.js";
import { cartsManager } from "../dao/mongoose.carts.manager.js";

export const routerVistas = Router()

routerVistas.get('/', async (req, res, next) => {
    const queryParams = req.query;
    console.log(queryParams);
    const products = await productsManager.getProductsWithFilters(queryParams.limit, queryParams.page, queryParams.query, queryParams.sort);
    const carts = await cartsManager.getCarts()
    res.render('inicio', {
        cssName: 'inicio',
        pageTitle: 'Inicio',
        hayProducts: products.length > 0,
        products,
        hayCarts: carts.length > 0,
        carts
    });
});
routerVistas.get('/products', async (req, res, next) => {
    const products = await productsManager.getProducts();
    res.render('products', {
        cssName: 'products',
        pageTitle: 'Administrar Productos',
        hayProducts: products.length > 0,
        products
    });
});
routerVistas.get('/chat', async (req, res, next) => {
    res.render('chat', {
        cssName: 'chat',
        pageTitle: 'Chat'
    }
    )
})