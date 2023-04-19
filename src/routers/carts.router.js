import { Router } from 'express';
import { cartsManager } from '../dao/mongoose.carts.manager.js';

export const cartsRouter = Router();


cartsRouter.get('/', async (req, res) => {
    const queryParams = req.query;
    const allCarts = await cartsManager.getCarts()
    console.log(allCarts);
    const resultado = [];

    if (queryParams.limit) {
        for (let product = 0; product <= queryParams.limit - 1; product++) {
            if (allCarts[product]) {
                resultado.push(allCarts[product]);
            }
        }
        res.json(resultado);
    } else {
        res.json(allCarts)
    }
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


// cartsRouter.delete('/:pid', async (req, res) => {
//     try {
//         const deletedProduct = await productManager.deleteProduct(req.params.pid)
//         res.json(deletedProduct)
//     } catch (error) {
//         res.status(404).json({ error: error.message })
//     }
// })