import { Router } from 'express';
import { cartsManager } from '../dao/mongoose.carts.manager.js';

export const cartsRouter = Router();


cartsRouter.get('/', async (req, res) => {
    const queryParams = req.query;
    const allCarts = await cartsManager.getCarts()
    console.log(allCarts);
    res.json(allCarts)
    // res.json({ "todo": "ok" })
})

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartsManager.addCart()

        console.log(newCart);
        res.json(newCart)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const cartId = req.params.cid
    try {
        const cart = await cartsManager.getCartByID(cartId)
        res.json(cart.products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    try {
        const newProds = await cartsManager.addProductsToCart(cartId, productId)
        res.json(newProds)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Ha ocurrido un error inesperado' })
    }
})

cartsRouter.put('/:cid', async (req, res) => {
    console.log('Estamos aqui');
    try {
        console.log(req.body);
        const products = await cartsManager.updateProductsOfCart(req.params.cid, req.body)
        res.json(products)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

cartsRouter.put('/:cid/products/:pid', async (req, res) => {
    console.log('Estaremos aqui?');
    try {
        const products = await cartsManager.updateProductOfCart(req.params.cid, req.params.pid, req.body.quantity)
        res.json(products)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

cartsRouter.delete('/:cid', async (req, res) => {
    try {
        const products = await cartsManager.deleteProductsOfCart(req.params.cid)
        res.json(products)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const products = await cartsManager.deleteProductOfCart(req.params.cid, req.params.pid)
        res.json(products)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})